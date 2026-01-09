from typing import Dict, Any, List
from .base import Cube
import requests
import json
import random

class TravelCube(Cube):
    @property
    def name(self) -> str:
        return "Travel Cube"

    @property
    def description(self) -> str:
        return "AI Travel Guide - Itineraries & Budget Planner."

    def run(self, input_data: Any) -> Dict[str, Any]:
        destination = input_data.get("destination", "").strip()
        vibe = input_data.get("vibe", "Balanced")
        budget_level = input_data.get("budget", "Mid-Range")
        
        if not destination:
            return {"status": "error", "message": "No destination provided."}

        # AI Analysis & Itinerary Generation
        try:
            system_prompt = (
                "You are an Expert Travel Guide and Local Concierge.\n"
                "Your goal is to create a detailed 3-day itinerary and realistic budget estimate for a specific destination.\n"
                "Focus on 'Hidden Gems' over 'Tourist Traps' where possible, unless they are must-sees.\n\n"
                "INPUT:\n"
                f"- Destination: {destination}\n"
                f"- Vibe: {vibe} (e.g., Adventure, Romantic, Foodie)\n"
                f"- Budget Level: {budget_level}\n\n"
                "OUTPUT FORMAT (JSON ONLY):\n"
                "{\n"
                '  "destination_name": "Kyoto, Japan",\n'
                '  "tagline": "The City of Ten Thousand Shrines",\n'
                '  "total_budget_est": "$1,200 - $1,500 USD",\n'
                '  "best_time": "March-May or Oct-Nov",\n'
                '  "days": [\n'
                '    {\n'
                '      "day": 1,\n'
                '      "theme": "Sacred Beginnings",\n'
                '      "activities": [\n'
                '        {"time": "Morning", "title": "Fushimi Inari Taisha", "desc": "Hike the torii gates early to beat crowds.", "cost": "Free"},\n'
                '        {"time": "Afternoon", "title": "Nishiki Market", "desc": "Try the octopus skewers and matcha sweets.", "cost": "$30"},\n'
                '        {"time": "Evening", "title": "Pontocho Alley", "desc": "Atmospheric dinner by the river.", "cost": "$50+"}\n'
                '      ]\n'
                '    }\n'
                '  ],\n'
                '  "local_tips": [\n'
                '    "Purchase an ICOCA card for trains.",\n'
                '    "Don\'t tip at restaurants."\n'
                '  ]\n'
                "}"
            )
            
            user_prompt = f"Plan a trip to {destination}. JSON Only."
            
            # API Call
            response = requests.post(
                "https://text.pollinations.ai/",
                headers={"Content-Type": "application/json"},
                json={
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "model": "mistral",
                    "seed": random.randint(0, 1000)
                },
                timeout=60
            )

            if response.status_code == 200:
                content = response.text
                
                # Robust JSON Extraction
                def extract_json(text):
                    if isinstance(text, dict): return text
                    text = str(text).strip()
                    if "```json" in text: text = text.split("```json")[1].split("```")[0]
                    elif "```" in text: text = text.split("```")[1].split("```")[0]
                    try: return json.loads(text)
                    except: pass
                    start, end = text.find("{"), text.rfind("}")
                    if start != -1 and end != -1:
                        try: return json.loads(text[start:end+1])
                        except: pass
                    return None
                
                data = extract_json(content)
                if not data:
                    raise Exception("Failed to parse AI response.")
                
                # Add default structure if missing
                data["destination_name"] = data.get("destination_name", destination)
                data["days"] = data.get("days", [])
                if len(data["days"]) < 3:
                     # Fallback logic could go here, but AI usually complies
                     pass
                
                return {
                    "status": "success",
                    "data": data
                }
            else:
                 raise Exception(f"AI Provider Error: {response.status_code}")

        except Exception as e:
            print(f"[Travel Cube Error] {str(e)}")
            return {
                "status": "error", 
                "message": f"Planning failed: {str(e)}"
            }
