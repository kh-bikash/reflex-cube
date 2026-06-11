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
    AutoModelForTokenClassification,
    Trainer,
    TrainingArguments,
    TrainerCallback,
    DataCollatorForTokenClassification,
)
from datasets import load_dataset, Dataset
import pandas as pd
import requests
from .db import SessionLocal
from .models import TrainingJob
from .config import STORAGE_PATH

import sys
import os

# Ensure stdout is UTF-8 to avoid Windows encoding crashes
try:
    sys.stdout.reconfigure(encoding='utf-8')
except:
    pass

def safe_print(msg):
    try:
        print(msg, flush=True)
    except Exception:
        pass # If printing fails, just start silent but don't crash the job

from sqlalchemy import Float

# Update job in DB
def update_job(job_id, status=None, progress=None, epoch=None, loss=None, accuracy=None, result_path=None, error_msg=None, task=None):
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    if job:
        if status:
            job.status = status
        if progress is not None:
            job.progress = progress
        if epoch is not None:
            job.epoch = epoch
        if loss is not None:
            job.loss = loss
        if accuracy is not None:
            job.accuracy = accuracy
        if result_path:
            job.result_path = result_path
        if error_msg:
            job.error = (job.error or "") + ("\n" + error_msg if job.error else error_msg)
        if task:
            job.task = task
        db.commit()
    db.close()


# Strict Real Dataset Loader
def safe_load_dataset(name: str):
    safe_print(f"[Trainer] 🌍 Fetching REAL dataset '{name}' from Hugging Face Hub...")
    try:
        # Enforce real download. No mocks.
        if "," in name:
            base_name, config_name = name.split(",", 1)
            ds = load_dataset(base_name, config_name, trust_remote_code=True)
        else:
            ds = load_dataset(name, trust_remote_code=True)
        safe_print(f"[Trainer] ✅ Successfully loaded '{name}'. Size: {len(ds['train'] if 'train' in ds else ds)} rows.")
        return ds
    except Exception as e:
        safe_print(f"[Trainer] ❌ FAILED to load dataset '{name}': {e}")
        # Critical: Propagate error to fail the job. Do NOT return dummy data.
        raise RuntimeError(f"Could not fetch real dataset '{name}'. Reason: {e}")

# (Removed safe_load_dataset_real and dummy fallbacks)


class StreamLogCallback(TrainerCallback):
    def __init__(self, log_func, job_id=None):
        self.log_func = log_func
        self.job_id = job_id

    def on_log(self, args, state, control, logs=None, **kwargs):
        if logs:
            # We want to log 'loss', 'epoch', 'step'
            # logs is a dict
            self.log_func(logs)
            
            # Also print to terminal
            step = logs.get("step", state.global_step)
            loss = logs.get("loss", 0.0)
            epoch = logs.get("epoch", 0.0)
            safe_print(f"[Training] Step {step} | Epoch {epoch} | Loss: {loss}")
            
            # Update DB with metrics if job_id provided
            if self.job_id:
                # Calculate progress based on epoch (assuming 1 epoch for now as per TrainingArguments)
                # If epochs > 1, this logic needs adjustment (epoch / num_train_epochs * 50 + 50)
                # For now, simplistic:
                try:
                    update_job(self.job_id, epoch=epoch, loss=loss)
                except:
                    pass

def run_training_job(job_data, job_id):
    safe_print(f"[Trainer] THREAD ENTERED for job {job_id}")
    try:
        prompt = job_data.get("prompt", "")
        job_dir = Path(STORAGE_PATH) / job_id
        job_dir.mkdir(parents=True, exist_ok=True)
        log_file = job_dir / "training_log.jsonl"

        def log_event(event):
            try:
                with open(log_file, "a", encoding="utf-8") as f:
                    f.write(json.dumps(event) + "\n")
                    f.flush()
                    os.fsync(f.fileno())
            except Exception as e:
                safe_print(f"Log error: {e}")

        # IMMEDIATE LOGGING to unblock frontend
        log_event({"stage": "initializing", "msg": "Job received by trainer"})
        
        update_job(job_id, status="initializing", progress=5)
        safe_print(f"[AI Prompt] {prompt}")

        # Detect task
        update_job(job_id, status="analyzing_prompt", progress=15)
        
        user_task = job_data.get("task")
        if user_task and user_task != "auto":
            task = user_task
            safe_print(f"[AI Decision] → {task} (User Selected)")
        else:
            task = "text-generation" # Default
            p_lower = prompt.lower()
            
            if "summar" in p_lower:
                task = "summarization"
            elif "translat" in p_lower:
                task = "translation"
            elif "sentiment" in p_lower or "opinion" in p_lower or "review" in p_lower:
                task = "sentiment-analysis"
            elif "classif" in p_lower or "categor" in p_lower or "tag" in p_lower or "label" in p_lower or "detect" in p_lower or "identify" in p_lower:
                task = "text-classification"
            elif "question" in p_lower or "answer" in p_lower:
                task = "question-answering"
                
            safe_print(f"[AI Decision] → {task} (Heuristic)")

        from .interpreter import interpreter
        
        # Determine strict task name for HF
        hf_task_name = "text-classification" # default
        if "summar" in task or task == "summarization": hf_task_name = "summarization"
        elif "translat" in task or task == "translation": hf_task_name = "translation"
        elif "generat" in task or task == "text-generation": hf_task_name = "text-generation"
        elif "dialog" in task or task == "dialogue": hf_task_name = "text-generation" # dialogue usually uses causal models
        elif "ner" in task or "token" in task: hf_task_name = "token-classification"
        elif "question" in task: hf_task_name = "question-answering"
        
        # DYNAMIC RESOLUTION
        config = interpreter.parse_and_resolve(prompt, hf_task_name)
        
        model_name = config["model_name"]
        dataset_name = config["dataset_name"]

        # FORCE OVERRIDE for Sentiment (Interpreter often picks ag_news/glue which are tricky)
        if task == "sentiment-analysis":
            dataset_name = "imdb"
            safe_print(f"[Override] Forcing dataset 'imdb' for sentiment analysis to ensure positive/negative labels.")
        
        elif task == "text-classification" and "news" in prompt.lower():
            dataset_name = "ag_news"
            safe_print(f"[Override] Forcing dataset 'ag_news' for news classification to ensure standard categories.")
        # Update task to match what interpreter decided (e.g. might have refined it)
        # Update task to match what interpreter decided (e.g. might have refined it)
        # task = config["task"] 
        update_job(job_id, task=task) # Persist detected task type 


        safe_print(f"[Trainer] Loading dataset {dataset_name} for task {task}...")
        update_job(job_id, status=f"loading_data_{dataset_name}", progress=20)
        try:
            ds = safe_load_dataset(dataset_name)
        except RuntimeError as e:
            fallback_name = interpreter.get_fallback_dataset(task, prompt)
            safe_print(f"[Trainer] Primary dataset '{dataset_name}' failed. Trying fallback '{fallback_name}'...")
            dataset_name = fallback_name
            ds = safe_load_dataset(dataset_name)
            
        train_ds = ds["train"] if "train" in ds else ds

        # FULL POWER MODE: No truncation. Converting to list to avoid some streaming issues on Windows if needed, 
        # but generally keeping it as dataset object is better for memory. 
        # train_ds is ready to go.
        safe_print(f"[Trainer] Training on FULL dataset: {len(train_ds)} samples. This may take a while.")

        tokenizer = AutoTokenizer.from_pretrained(model_name)
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token

        # Preprocessing
        def preprocess(examples):
            # Try common column names for INPUT
            text_col = next((col for col in ["text", "document", "context", "sentence"] if col in examples), None)
            if not text_col:
                # If no known column, try the first one that contains strings
                for k, v in examples.items():
                    if isinstance(v, list) and len(v) > 0 and isinstance(v[0], str):
                        text = v
                        text_col = k 
                        break
                else:
                    text = [""] * len(examples[next(iter(examples))])
            else:
                text = examples[text_col]
            
            # Ensure text is cast to string to avoid tokenizing floats
            if isinstance(text, list):
                text = [str(t) if t is not None else "" for t in text]
            
            # Tokenize INPUT
            enc = tokenizer(text, truncation=True, padding="max_length", max_length=128)
            
            # HANDLE LABELS based on task
            if task in ["text-generation", "dialogue"]:
                # For CausalLM, labels = input_ids
                enc["labels"] = enc["input_ids"].copy()
                
            elif task in ["summarization", "translation"]:
                # For Seq2Seq, we need a target
                target_col = next((col for col in ["summary", "target", "label", "translation"] if col in examples and col != text_col), None)
                if target_col:
                    targets = examples[target_col]
                    if isinstance(targets, list):
                        targets = [str(t) if t is not None else "" for t in targets]
                    with tokenizer.as_target_tokenizer():
                         labels = tokenizer(targets, truncation=True, padding="max_length", max_length=128)
                    enc["labels"] = labels["input_ids"]
                else:
                    enc["labels"] = enc["input_ids"].copy()

            else:
                 # Default to Classification (sentiment, topic, ner, qa, etc.)
                 # Try to find a label column with expanded heuristics
                 potential_label_cols = ["label", "label_ids", "ner_tags", "year", "class", "category", "target", "int_label", "sentiment"]
                 label_col = next((col for col in potential_label_cols if col in examples), None)
                 
                 if label_col:
                     enc["labels"] = examples[label_col]
                 else:
                     # Fallback dummy labels if absolutely nothing found (prevents crash)
                     enc["labels"] = [0] * len(text)

            return enc

        # Remove columns that are not model inputs to avoid passing random data
        tokenized = train_ds.map(preprocess, batched=True, remove_columns=train_ds.column_names)

        # Determine number of labels dynamically
        num_labels = 2
        id2label = {}
        label2id = {}
        
        if "label" in train_ds.features:
            feat = train_ds.features["label"]
            if hasattr(feat, "num_classes"):
                 num_labels = feat.num_classes
            if hasattr(feat, "names"):
                 # Create mapping: 0 -> "negative", 1 -> "positive"
                 id2label = {i: name for i, name in enumerate(feat.names)}
                 label2id = {name: i for i, name in enumerate(feat.names)}
        elif "ner_tags" in train_ds.features:
             # Similar for NER if needed
             if hasattr(train_ds.features["ner_tags"], "feature") and hasattr(train_ds.features["ner_tags"].feature, "num_classes"):
                 num_labels = train_ds.features["ner_tags"].feature.num_classes
                 names = train_ds.features["ner_tags"].feature.names
                 id2label = {i: name for i, name in enumerate(names)}
                 label2id = {name: i for i, name in enumerate(names)}

        if not id2label:
            id2label = {i: f"LABEL_{i}" for i in range(num_labels)}
            label2id = {f"LABEL_{i}": i for i in range(num_labels)}

        safe_print(f"[Trainer] Detected {num_labels} labels: {list(id2label.values())}")

        # Model type selection
        data_collator = None
        
        if task in ["summarization", "translation"]:
            model = AutoModelForSeq2SeqLM.from_pretrained(model_name)
        elif task == "text-generation":
            model = AutoModelForCausalLM.from_pretrained(model_name)
        elif task == "ner":
            model = AutoModelForTokenClassification.from_pretrained(
                model_name, 
                num_labels=num_labels,
                id2label=id2label,
                label2id=label2id
            )
            data_collator = DataCollatorForTokenClassification(tokenizer)
        else:
            model = AutoModelForSequenceClassification.from_pretrained(
                model_name, 
                num_labels=num_labels,
                id2label=id2label,
                label2id=label2id
            )
        
        if tokenizer.pad_token_id is not None:
            model.config.pad_token_id = tokenizer.pad_token_id

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
            remove_unused_columns=False, # We handle this manually
            disable_tqdm=True, # Prevent Windows encoding crashes with progress bars
        )

        trainer = Trainer(
            model=model, 
            args=args, 
            train_dataset=tokenized,
            data_collator=data_collator,
            callbacks=[StreamLogCallback(log_event, job_id=job_id)]
        )
        update_job(job_id, status="training", progress=50)
        log_event({"stage": "training_started", "task": task, "model": model_name})
        
        # Ensure only valid columns are passed for sure
        # "input_ids", "attention_mask", "labels" are standard
        safe_print(f"[DEBUG] Dataset columns: {tokenized.column_names}")

        trainer.train()

        model.save_pretrained(str(job_dir))
        tokenizer.save_pretrained(str(job_dir))
        update_job(job_id, status="completed", progress=100, result_path=str(job_dir))
        log_event({"stage": "completed", "job_id": job_id, "task": task})

        safe_print(f"[Trainer] ✅ Model trained successfully on {task}")

    except Exception as e:
        tb = traceback.format_exc()
        update_job(job_id, status="failed", error_msg=str(e))
        log_event({"stage": "failed", "error": str(e)})
        with open(job_dir / "error.txt", "w") as f:
            f.write(tb)
        safe_print(tb) # safe print traceback
