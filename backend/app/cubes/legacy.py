from typing import Dict, Any, List
from .base import Cube
import requests
import json
import re

class LegacyCube(Cube):
    @property
    def name(self) -> str:
        return "Legacy Cube"

    @property
    def description(self) -> str:
        return "The Modernizer. Converts legacy code to modern paradigms."

    def run(self, input_data: Any) -> Dict[str, Any]:
        source_code = input_data.get("source_code", "")
        target_lang = input_data.get("target_lang", "Python 3")
        
        if not source_code:
            return {"status": "error", "message": "No source code provided"}

        # Construct Prompt for AI
        prompt = f"""
You are an expert Senior Software Architect specializing in Legacy Code Modernization.
Your task is to REFACTOR and TRANSLATE the following legacy code into clean, modern, production-ready {target_lang}.

RULES:
1. Return ONLY the JSON response.
2. The JSON must have two fields: "modern_code" (string) and "explanation" (string).
3. "modern_code": The full rewritten code. Use modern best practices (e.g. type hinting, async/await, list comprehensions).
4. "explanation": A brief Markdown summary of what you changed (e.g. "Replaced loop with map", "Added error handling").
5. Do not include markdown fencing (```json) in your response, just the raw JSON.

LEGACY CODE:
{source_code}
"""
        
        # Call AI API (Pollinations - Mistral/OpenAI compatible)
        try:
            response = requests.post(
                "https://text.pollinations.ai/",
                json={
                    "messages": [
                        {"role": "system", "content": "You are a code modernization engine. Output valid JSON only."},
                        {"role": "user", "content": prompt}
                    ],
                    "model": "mistral-large"
                },
                timeout=30
            )
            
            if response.status_code == 200:
                ai_text = response.text.strip()
                
                # Robust Pattern Matching for JSON
                # Sometimes models chat "Here is the JSON: ```json ... ```"
                # We want to extract just the {...} block.
                
                # 1. Try to find the first '{' and the last '}'
                start_idx = ai_text.find('{')
                end_idx = ai_text.rfind('}')
                
                if start_idx != -1 and end_idx != -1:
                    json_candidate = ai_text[start_idx : end_idx + 1]
                else:
                    json_candidate = ai_text # Fallback to full text if no braces found
                
                print(f"[Legacy Cube] Raw AI: {ai_text[:100]}...") # Debug log
                print(f"[Legacy Cube] Extracted Candidate: {json_candidate[:100]}...")
                
                try:
                    data = json.loads(json_candidate)
                    return {
                        "status": "success",
                        "data": data
                    }
                except json.JSONDecodeError:
                    # Fallback if JSON fails
                    print(f"JSON Parse Error. Raw: {ai_text}")
                    return {
                        "status": "success",
                        "data": {
                            "modern_code": ai_text,
                            "explanation": "AI generated code but returned invalid JSON structure. See code pane."
                        }
                    }
                    
        except Exception as e:
            print(f"AI Error: {e}")
            # Fallback Mock if AI fails
            return {
                "status": "success",
                "data": {
                    "modern_code": f"# AI Service Unavailable. Mock Conversion:\n\ndef modern_version():\n    print('Converted to {target_lang}')",
                    "explanation": "Service timeout. Showing mock result."
                }
            }

        return {"status": "error", "message": "Unknown error"}
