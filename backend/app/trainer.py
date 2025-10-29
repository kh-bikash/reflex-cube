import json
import traceback
from pathlib import Path
import torch
from transformers import (
    pipeline,
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
    AutoModelForSequenceClassification,
    AutoModelForCausalLM,
    Trainer,
    TrainingArguments,
)
from datasets import load_dataset, Dataset
import pandas as pd
import requests
from .db import SessionLocal
from .models import TrainingJob
from .config import STORAGE_PATH


# Update job in DB
def update_job(job_id, status=None, progress=None, result_path=None, error_msg=None):
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    if job:
        if status:
            job.status = status
        if progress is not None:
            job.progress = progress
        if result_path:
            job.result_path = result_path
        if error_msg:
            job.error = (job.error or "") + ("\n" + error_msg if job.error else error_msg)
        db.commit()
    db.close()


# Safe dataset loader with fallback
def safe_load_dataset(name: str):
    try:
        print(f"[Trainer] Loading HuggingFace dataset: {name}")
        ds = load_dataset(name)
        return ds
    except Exception as e:
        print(f"[Trainer] load_dataset failed for {name}: {e}")

        if name.lower() == "imdb":
            url = "https://raw.githubusercontent.com/dD2405/Twitter_Sentiment_Analysis/master/train.csv"
            df = pd.read_csv(url).dropna().head(500)
            df = df.rename(columns={"tweet": "text", "label": "label"})
            return {"train": Dataset.from_pandas(df)}

        elif name.lower() == "xsum":
            url = "https://huggingface.co/datasets/xsum/resolve/main/xsum_sample.jsonl"
            text = requests.get(url).text
            data = [json.loads(line) for line in text.splitlines() if line.strip()]
            df = pd.DataFrame(data).head(200)
            return {"train": Dataset.from_pandas(df)}

        elif name.lower() == "wikitext":
            url = "https://raw.githubusercontent.com/karpathy/char-rnn/master/data/tinyshakespeare/input.txt"
            text = requests.get(url).text[:20000]
            df = pd.DataFrame({"text": [text[i:i+512] for i in range(0, len(text), 512)]})
            return {"train": Dataset.from_pandas(df)}

        raise RuntimeError(f"Dataset {name} could not be loaded.")


def run_training_job(job_data, job_id):
    prompt = job_data.get("prompt", "")
    job_dir = Path(STORAGE_PATH) / job_id
    job_dir.mkdir(parents=True, exist_ok=True)
    log_file = job_dir / "training_log.jsonl"

    def log_event(event):
        with open(log_file, "a", encoding="utf-8") as f:
            f.write(json.dumps(event) + "\n")

    try:
        update_job(job_id, status="analyzing", progress=5)
        print(f"[AI Prompt] {prompt}")

        # Detect task
        detector = pipeline("zero-shot-classification", model="facebook/bart-large-mnli", device=-1)
        result = detector(
            prompt,
            ["sentiment-analysis", "summarization", "text-generation", "translation", "question-answering"],
        )
        task = result["labels"][0]
        print(f"[AI Decision] → {task} ({result['scores'][0]:.2f})")

        # Task → model + dataset
        mapping = {
            "sentiment-analysis": ("distilbert-base-uncased", "imdb"),
            "summarization": ("t5-small", "xsum"),
            "text-generation": ("distilgpt2", "wikitext"),
            "translation": ("t5-small", "wmt14"),
            "question-answering": ("distilbert-base-cased-distilled-squad", "squad"),
        }
        model_name, dataset_name = mapping.get(task, ("distilbert-base-uncased", "imdb"))

        update_job(job_id, status=f"loading_dataset_{dataset_name}", progress=15)
        ds = safe_load_dataset(dataset_name)
        train_ds = ds["train"] if "train" in ds else ds

        tokenizer = AutoTokenizer.from_pretrained(model_name)

        # Preprocessing
        def preprocess(examples):
            text = examples.get("text") or examples.get("document") or examples.get("context") or [""]
            return tokenizer(text, truncation=True, padding="max_length", max_length=128)

        tokenized = train_ds.map(preprocess, batched=True)

        # Model type selection
        if task in ["summarization", "translation"]:
            model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        elif task == "text-generation":
            model = AutoModelForCausalLM.from_pretrained(model_name)
        else:
            model = AutoModelForSequenceClassification.from_pretrained(model_name, num_labels=2)

        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model.to(device)

        args = TrainingArguments(
            output_dir=str(job_dir),
            num_train_epochs=1,
            per_device_train_batch_size=4,
            learning_rate=2e-5,
            logging_dir=str(job_dir / "logs"),
            logging_steps=10,
            report_to="none",
            save_strategy="epoch",
        )

        trainer = Trainer(model=model, args=args, train_dataset=tokenized)
        update_job(job_id, status="training", progress=50)
        log_event({"stage": "training_started", "task": task, "model": model_name})

        trainer.train()

        model.save_pretrained(str(job_dir))
        tokenizer.save_pretrained(str(job_dir))
        update_job(job_id, status="completed", progress=100, result_path=str(job_dir))
        log_event({"stage": "completed", "job_id": job_id, "task": task})

        print(f"[Trainer] ✅ Model trained successfully on {task}")

    except Exception as e:
        tb = traceback.format_exc()
        update_job(job_id, status="failed", error_msg=str(e))
        log_event({"stage": "failed", "error": str(e)})
        with open(job_dir / "error.txt", "w") as f:
            f.write(tb)
        print(tb)
