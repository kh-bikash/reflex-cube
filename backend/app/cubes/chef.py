from typing import Dict, Any, List
from .base import Cube
import base64
import io
import torch
from PIL import Image
from transformers import pipeline
import re
import urllib.parse
import random
import requests
import json

# Global Caches for Vision (Switching to BLIP for Scene Understanding)
_vision_model = None

def get_vision_model():
    global _vision_model
    if _vision_model is None:
        print("[Chef Cube] Loading BLIP Image Captioning...")
        # Use BLIP Base - it's fast enough on CPU and gives great descriptions
        _vision_model = pipeline("image-to-text", model="Salesforce/blip-image-captioning-base")
    return _vision_model

class ChefCube(Cube):
    @property
    def name(self) -> str:
        return "Chef Cube"

    @property
    def description(self) -> str:
        return "Advanced AI Culinary Assistant."

    def run(self, input_data: Any) -> Dict[str, Any]:
        image_b64 = input_data.get("image")
        text_input = input_data.get("text")
        
        vision_context = ""

        # 1. Vision (BLIP - Local)
        if image_b64:
            try:
                if "base64," in image_b64:
                    image_b64 = image_b64.split("base64,")[1]
                
                image_data = base64.b64decode(image_b64)
                image = Image.open(io.BytesIO(image_data)).convert("RGB")
                
                vision = get_vision_model()
                # Generate a descriptive caption
                results = vision(image) 
                vision_context = results[0]['generated_text']
                print(f"[Chef Cube] Vision Caption: {vision_context}")
                
            except Exception as e:
                return {"status": "error", "message": f"Vision Error: {str(e)}"}
        elif text_input:
            vision_context = f"User explicitly lists: {text_input}"
        
        if not vision_context:
             return {"status": "error", "message": "I couldn't clearly see or understand the ingredients. Please try again."}

        # Context is the "candidate"
        candidates = [vision_context] if vision_context else []

        # 2. Expert Chef Logic (Pollinations AI - Text)
        print(f"[Chef Cube] Context: {vision_context}")

        try:
            # Massive System Prompt based on User Spec
            system_prompt = (
                "You are an Advanced AI Culinary Assistant and Food Vision Expert.\n"
                "Your goal is to be helpful, accurate, friendly, and beginner-focused.\n\n"
                "INPUT: A visual description of a fridge or ingredients.\n"
                "TASK:\n"
                "1. ANALYZE: Extract ingredients from the description. Ignore non-food. Mention if unsure.\n"
                "2. SUGGEST: Propose 3 distinct dishes (give Cuisine, Difficulty, Time).\n"
                "3. SELECT: Choose the BEST dish from the suggestions to cook right now.\n"
                "4. RECIPE: Provide a full step-by-step recipe for the SELECTED dish.\n"
                "5. SAFETY: Warn about allergies or unsafe combinations.\n"
                "6. IMAGE PROMPT: Write a simple 5-word visual prompt for the dish.\n\n"
                "OUTPUT FORMAT: Valid JSON only. Do not wrap in markdown code blocks. Structure:\n"
                "{\n"
                "  'analysis': 'I see [ingredients]...',\n"
                "  'suggestions': [\n"
                "    {'name': 'Dish Name', 'cuisine': 'Italian', 'difficulty': 'Easy', 'time': '20m'}\n"
                "  ],\n"
                "  'selected_dish': {\n"
                "    'name': 'The Chosen Dish',\n"
                "    'description': 'Why this is great...',\n"
                "    'ingredients_list': ['Item 1', 'Item 2'],\n"
                "    'steps': ['1. Step one...', '2. Step two...'],\n"
                "    'tips': 'Chef tip...',\n"
                "    'calories': '500 kcal'\n"
                "  },\n"
                "  'safety_warning': 'None' or 'Warning text...'\n"
                "}"
            )
            
            user_prompt = f"Visual Description: {vision_context}. Please guide me."
            
            # Request Retry Logic (Robustness Upgrade)
            max_retries = 3
            response = None
            
            for attempt in range(max_retries):
                try:
                    print(f"[Chef Cube] Asking AI (Attempt {attempt+1}/{max_retries})...")
                    response = requests.post(
                        "https://text.pollinations.ai/",
                        headers={"Content-Type": "application/json"},
                        json={
                            "messages": [
                                {"role": "system", "content": system_prompt},
                                {"role": "user", "content": user_prompt}
                            ],
                            "model": "openai", 
                            "seed": random.randint(0, 1000),
                            "jsonMode": True
                        },
                        timeout=120 # Increased timeout for complex logic
                    )
                    if response.status_code == 200:
                        break # Success
                    else:
                        print(f"[Chef Cube] AI Error: {response.status_code}. Retrying...")
                except Exception as req_err:
                     print(f"[Chef Cube] Connection Error: {req_err}. Retrying...")
                
                # Exponential Backoff (1s, 2s, 4s)
                import time
                time.sleep(2 ** attempt)

            if response and response.status_code == 200:
                content = response.text
                print(f"[Chef Cube] AI Response: {content}")
                
                # Robust Extraction Logic
                # Try to find the largest JSON-like block enclosed in {}
                def extract_json(text):
                    text = text.strip()
                    # Remove markdown blocks if present
                    if "```json" in text:
                        text = text.split("```json")[1].split("```")[0]
                    elif "```" in text:
                         text = text.split("```")[1].split("```")[0]
                    
                    # Try direct load
                    try: return json.loads(text)
                    except: pass
                    
                    # If that fails, try regex to find the outermost {}
                    # This is simple recursive matching or just finding first { and last }
                    start = text.find("{")
                    end = text.rfind("}")
                    if start != -1 and end != -1:
                        json_str = text[start:end+1]
                        try: return json.loads(json_str)
                        except: pass
                    
                    return None

                data = extract_json(content)
                if not data:
                     raise Exception("Failed to parse JSON response from AI.")
                
                # Extract parts
                analysis = data.get("analysis", "Ingredients analyzed.")
                suggestions = data.get("suggestions", [])
                selected = data.get("selected_dish", {})
                safety = data.get("safety_warning", None)
                
                # 3. Image Generation (Flux - Enhanced & Safer)
                def sanitize(text): return "".join([c for c in text if c.isalnum() or c in " ,"])
                
                # Fallback to Simple Prompt if complex one fails (which it seems to be doing)
                clean_title = sanitize(selected.get("name", "Food"))
                visual_prompt = f"delicious {clean_title} michelin presentation 8k"
                
                encoded_prompt = urllib.parse.quote(visual_prompt)
                
                # Pollinations is currently down/migrating, switching to LoremFlickr for reliable food images
                # extracted keywords from dish name for better searching
                search_terms = clean_title.replace(" ", ",").lower()
                image_url = f"https://loremflickr.com/1024/768/{search_terms},food/all"
                
                print(f"[Chef Cube] Image URL: {image_url}")

                # Return structure matching what frontend WILL expect
                return {
                    "status": "success",
                    "detected": candidates,
                    "analysis": analysis,
                    "suggestions": suggestions,
                    "safety": safety,
                    "recipe": {
                        "title": selected.get("name", "Chef's Choice"),
                        "description": selected.get("description", ""),
                        "calories": selected.get("calories", "N/A"),
                        "time": suggestions[0].get("time", "30m") if suggestions else "30m",
                        "ingredients": selected.get("ingredients_list", candidates),
                        "steps": selected.get("steps", ["Cook well.", "Enjoy."]),
                        "tips": selected.get("tips", ""),
                        "image_url": image_url
                    }
                }
                
            else:
                 raise Exception(f"AI Provider Error: {response.status_code if response else 'Timeout'}")

        except Exception as e:
            print(f"[Chef Cube Error] {str(e)}")
            # Fallback
            return {
                "status": "error",
                "message": f"My culinary brain is offline: {str(e)}"
            }
