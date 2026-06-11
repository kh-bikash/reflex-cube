import os
import json
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from sentence_transformers import SentenceTransformer
from turbovec import IdMapIndex
from e2b_code_interpreter import Sandbox
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HF_TOKEN")
E2B_API_KEY = os.getenv("E2B_API_KEY")

class ReflexBrain:
    """
    The Core Brain of ReflexCube.
    Uses a quantized Gemma model to orchestrate reasoning,
    and E2B Code Interpreter to execute tools and data scrapers.
    """
    def __init__(self):
        print("Initializing ReflexBrain...")
        
        if not HF_TOKEN:
            print("WARNING: HF_TOKEN is not set. Brain will run in mock mode or fail to download weights.")
            
        try:
            quantization_config = BitsAndBytesConfig(
                load_in_4bit=True,
                bnb_4bit_compute_dtype=torch.float16
            )
            
            # Using Gemma-2b-it as it fits within <1.5GB when 4-bit quantized.
            model_id = "google/gemma-2b-it"
            
            self.tokenizer = AutoTokenizer.from_pretrained(model_id, token=HF_TOKEN)
            self.model = AutoModelForCausalLM.from_pretrained(
                model_id,
                quantization_config=quantization_config,
                device_map="auto",
                token=HF_TOKEN
            )
            
            # Initialize Memory Engine (sentence-transformers + turbovec)
            print("Initializing Memory Engine (SentenceTransformers + Turbovec)...")
            self.embedder = SentenceTransformer('all-MiniLM-L6-v2')
            
            # 384 is the dimension of all-MiniLM-L6-v2, 4 is the bit_width for high compression
            memory_file = "nexus_memory.tvim"
            if os.path.exists(memory_file):
                self.memory_index = IdMapIndex.load(memory_file)
            else:
                self.memory_index = IdMapIndex(dim=384, bit_width=4)
                
            self.memory_db = [] # Simple in-memory map for the text (in prod use SQLite)
            if os.path.exists("nexus_db.json"):
                with open("nexus_db.json", "r") as f:
                    self.memory_db = json.load(f)

            print("Gemma Model and Memory initialized successfully.")
        except Exception as e:
            print(f"Error initializing Brain: {e}")
            self.model = None
            self.tokenizer = None
            self.embedder = None
            self.memory_index = None

    def generate(self, prompt: str) -> str:
        """Raw generation from Gemma"""
        if not self.model:
            return "Error: Model not loaded."
            
        inputs = self.tokenizer(prompt, return_tensors="pt").to("cuda")
        outputs = self.model.generate(**inputs, max_new_tokens=512)
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)

    def run_agent(self, user_request: str, cube_type: str) -> str:
        """
        Agentic Loop:
        1. Gemma receives the request.
        2. Gemma decides if it needs data (Apify) or calculation.
        3. Gemma writes Python code.
        4. E2B executes the Python code.
        5. Gemma formats the final output.
        """
        system_prompt = f"""You are the highly capable intelligent agent for the '{cube_type}' cube.
Your goal is to answer the user's request. You have access to a secure Python execution environment.

If you need live web research, you can write Python code to use the `requests` library to call SerpApi.
The SERPAPI_API_KEY is available in `os.environ['SERPAPI_API_KEY']`.
(Example: requests.get('https://serpapi.com/search', params={{'q': 'query', 'api_key': os.environ['SERPAPI_API_KEY']}}))

If you need to scrape pages or social media, you can use the Apify API.
The APIFY_API_TOKEN is available in `os.environ['APIFY_API_TOKEN']`.

Output your code inside ```python blocks. Ensure you print() the results you need to see.

User Request: {user_request}
"""
        # Step 1: Initial reasoning
        reasoning_prompt = system_prompt + "\nThought process and code to execute (if any):"
        response = self.generate(reasoning_prompt)
        
        # Step 2: Check if code was generated (Look for ```python blocks)
        code_blocks = self._extract_code(response)
        
        if not code_blocks:
            return response # No tools needed, just return the answer
            
        # Step 3: Execute code in E2B
        print(f"Executing {len(code_blocks)} code block(s) in E2B sandbox...")
        sandbox_results = []
        
        # We inject the API keys into the sandbox environment
        env_vars = {
            "SERPAPI_API_KEY": os.getenv("SERPAPI_API_KEY", ""),
            "APIFY_API_TOKEN": os.getenv("APIFY_API_TOKEN", "")
        }
        
        with Sandbox(api_key=E2B_API_KEY) as sandbox:
            for code in code_blocks:
                # Prepend the env var setter to the code to ensure it's available
                injected_code = f"import os\nos.environ['SERPAPI_API_KEY']='{env_vars['SERPAPI_API_KEY']}'\nos.environ['APIFY_API_TOKEN']='{env_vars['APIFY_API_TOKEN']}'\n" + code
                execution = sandbox.run_code(injected_code)
                sandbox_results.append({
                    "stdout": execution.logs.stdout,
                    "stderr": execution.logs.stderr,
                    "error": execution.error.name if execution.error else None
                })
                
        # Step 4: Final synthesis
        synthesis_prompt = reasoning_prompt + f"\n\nSandbox Execution Results:\n{json.dumps(sandbox_results, indent=2)}\n\nBased on these results, write a comprehensive and beautifully formatted Markdown report for the user."
        final_answer = self.generate(synthesis_prompt)
        
        return final_answer

    def _extract_code(self, text: str):
        """Extracts python code blocks from markdown"""
        import re
        blocks = re.findall(r'```python\n(.*?)\n```', text, re.DOTALL)
        return blocks

    def remember(self, text: str):
        """Stores text into the turbovec memory index."""
        if not self.embedder or not self.memory_index:
            return
            
        import numpy as np
        vector = self.embedder.encode(text)
        new_id = len(self.memory_db)
        
        self.memory_db.append(text)
        with open("nexus_db.json", "w") as f:
            json.dump(self.memory_db, f)
            
        self.memory_index.add_with_ids(np.array([vector]), np.array([new_id], dtype=np.uint64))
        self.memory_index.write("nexus_memory.tvim")
        
    def recall(self, query: str, k: int = 3) -> list[str]:
        """Retrieves top k relevant memories."""
        if not self.embedder or not self.memory_index or len(self.memory_db) == 0:
            return []
            
        import numpy as np
        query_vector = self.embedder.encode(query)
        scores, ids = self.memory_index.search(np.array([query_vector]), k=k)
        
        results = []
        for doc_id in ids[0]:
            if doc_id != 18446744073709551615: # turbovec empty slot max uint64
                results.append(self.memory_db[int(doc_id)])
        return results

# Singleton instance
brain_instance = ReflexBrain()
