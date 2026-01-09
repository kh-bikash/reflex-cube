import random
from huggingface_hub import HfApi
from transformers import pipeline

# Safe print helper
def safe_print(msg):
    try:
        print(msg, flush=True)
    except:
        pass

class PromptInterpreter:
    def __init__(self):
        self.api = HfApi()
        # Initializing this might be slow, so we can do it lazily or keep it simple
        # For strict real execution, we rely on trainer's classifier first, but here we define logic
        pass

    def parse_and_resolve(self, prompt: str, detected_task: str):
        """
        Parses the prompt to find a suitable REAL dataset and model.
        """
        safe_print(f"[Interpreter] 🧠 Analyzing prompt: '{prompt}' for task '{detected_task}'")
        
        # 1. Extract Keywords for Search
        # Simple stopword removal
        stopwords = {"a", "an", "the", "in", "on", "at", "for", "to", "of", "with", "build", "create", "train", "model", "ai", "using", "dataset", "about", "classify", "detect", "analyze", "summarize", "translate"}
        words = [w.lower() for w in prompt.split() if w.lower().isalnum() and w.lower() not in stopwords]
        search_query = " ".join(words[:3]) # Use top 3 distinct words
        
        safe_print(f"[Interpreter] 🔍 Search Query: '{search_query}'")
        
        # 2. Search Hugging Face Hub for a REAL Dataset
        found_dataset = self.search_dataset(search_query, detected_task, prompt)
        
        # 3. Resolve Model Architecture
        model_name = self.resolve_model(detected_task, prompt)
        
        return {
            "task": detected_task,
            "dataset_name": found_dataset,
            "model_name": model_name
        }

    def search_dataset(self, query, task, prompt=""):
        """
        Searches HF Hub for a dataset matching the query and task.
        """
        try:
            # Map internal task to HF task identifiers
            hf_task_map = {
                "text-generation": "text-generation",
                "summarization": "summarization",
                "translation": "translation",
                "text-classification": "text-classification",
                "token-classification": "token-classification",
                "question-answering": "question-answering"
            }
            
            # If query is empty (e.g. "Build a model"), fallback to a generic benchmark
            if not query.strip():
                return self.get_fallback_dataset(task, prompt)

            # Search
            safe_print(f"[Interpreter] 🌍 Searching Hub for '{query}'...")
            datasets = list(self.api.list_datasets(
                search=query,
                filter=hf_task_map.get(task, "text-classification"),
                limit=5,
                sort="downloads" # Prefer popular/reliable ones
            ))
            
            if datasets:
                top_ds = datasets[0].id
                safe_print(f"[Interpreter] ✅ Found Dataset: {top_ds}")
                return top_ds
            else:
                safe_print(f"[Interpreter] ⚠️ No exact match for '{query}'. Using fallback.")
                return self.get_fallback_dataset(task, prompt)
                
        except Exception as e:
            safe_print(f"[Interpreter] ❌ Search failed ({e}). Using fallback.")
            return self.get_fallback_dataset(task, prompt)

    def get_fallback_dataset(self, task, prompt=""):
        # Smart Fallbacks based on domain keywords
        p = prompt.lower()
        if "bank" in p or "finance" in p or "money" in p: return "banking77"
        if "spam" in p or "junk" in p: return "sms_spam"
        if "medic" in p or "health" in p: return "pubmed"
        if "legal" in p or "law" in p: return "lex_glue"
        
        # Robust defaults if search yields nothing (e.g. obscure topic)
        defaults = {
            "text-classification": "ag_news",
            "summarization": "xsum",
            "text-generation": "wikitext",
            "translation": "wmt16",
            "token-classification": "conll2003",
            "question-answering": "squad",
        }
        return defaults.get(task, "ag_news")

    def resolve_model(self, task, prompt=""):
        # 1. Check for explicit user request in prompt
        p = prompt.lower()
        if "roberta" in p: return "roberta-base"
        if "distilbert" in p: return "distilbert-base-uncased"
        if "bert" in p: return "bert-base-uncased"
        if "gpt2" in p: return "gpt2"
        if "t5" in p: return "t5-small"
        if "bart" in p: return "facebook/bart-base"
        
        # 2. Default efficient architectures (Standard Production Choice)
        mapping = {
            "text-classification": "distilbert-base-uncased",
            "summarization": "t5-small",
            "text-generation": "distilgpt2",
            "translation": "t5-small",
            "token-classification": "distilbert-base-cased",
            "question-answering": "distilbert-base-cased-distilled-squad",
        }
        return mapping.get(task, "distilbert-base-uncased")

# Singleton instance
interpreter = PromptInterpreter()
