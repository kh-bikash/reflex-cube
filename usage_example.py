import os
import zipfile
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification, AutoModelForCausalLM, AutoModelForSeq2SeqLM, AutoModelForTokenClassification

# 1. Path to your downloaded ZIP file
# (After you download it from the dashboard, put it here)
ZIP_PATH = "model.zip" 
EXTRACT_DIR = "my_trained_model"

def load_and_predict():
    # 1. Extract
    if not os.path.exists(EXTRACT_DIR):
        print(f"Extracting {ZIP_PATH}...")
        try:
            with zipfile.ZipFile(ZIP_PATH, 'r') as zf:
                zf.extractall(EXTRACT_DIR)
        except Exception:
            print("Please place your downloaded 'job-id.zip' here and rename it to 'model.zip'")
            return

    # 2. Load Tokenizer
    print("Loading tokenizer...")
    tokenizer = AutoTokenizer.from_pretrained(EXTRACT_DIR)

    # 3. Load Model (Auto-detect type based on directory contents or your knowledge)
    # The default simple way: use 'AutoModel' or pipeline
    from transformers import pipeline
    
    # We can inspect config to know task, or just try common ones
    # For this example, we'll assume the task you trained (e.g., text-classification)
    try:
        # Try Pipeline (Easiest Way)
        print("Initializing Inference Pipeline...")
        # Note: You might need to specify task if not inferable, e.g. "text-classification"
        # We try to infer from the model
        classifier = pipeline("text-classification", model=EXTRACT_DIR, tokenizer=tokenizer)
        
        # 4. Predict
        text = "This startup is revolutionizing the AI industry."
        print(f"\nInput: {text}")
        result = classifier(text)
        print(f"Result: {result}")
        
    except Exception as e:
        # Fallback for other tasks like generation
        print(f"Classification pipeline failed ({e}), trying generation...")
        generator = pipeline("text-generation", model=EXTRACT_DIR, tokenizer=tokenizer)
        text = "The future of AI is"
        print(f"\nInput: {text}")
        result = generator(text, max_length=50)
        print(f"Result: {result}")

if __name__ == "__main__":
    if not os.path.exists(ZIP_PATH) and not os.path.exists(EXTRACT_DIR):
        print("Usage Step 1: Download your model from the Dashboard.")
        print("Usage Step 2: Save it as 'model.zip' in this folder.")
        print("Usage Step 3: Run this script.")
    else:
        load_and_predict()
