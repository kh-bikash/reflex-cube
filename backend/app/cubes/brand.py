from typing import Dict, Any
from .base import Cube
import requests
import json
import random
import urllib.parse
import os

class BrandCube(Cube):
    @property
    def name(self) -> str:
        return "Brand Cube"

    @property
    def description(self) -> str:
        return "The Brand Alchemist - Archetype & Identity System."

    def run(self, input_data: Any) -> Dict[str, Any]:
        brand_input = input_data.get("brand_input", "").strip()
        industry = input_data.get("industry", "general")
        
        if not brand_input:
            return {"status": "error", "message": "No brand input provided."}
        
        # The Alchemist Persona - Focus on Archetypes
        try:
            system_prompt = (
                "You are an Elite Brand Alchemist and Jungian Psychologist.\n"
                "Your goal is to deconstruct a brand into its primal Archetype and build a visual system around it.\n\n"
                "ARCHETYPES: The Innocent, The Explorer, The Sage, The Hero, The Outlaw, The Magician, "
                "The Regular Guy/Gal, The Lover, The Jester, The Caregiver, The Creator, The Ruler.\n\n"
                "INPUT: Brand Name & Vibe.\n"
                "TASK:\n"
                "1. IDENTIFY ARCHETYPE: Choose the single most fitting archetype.\n"
                "2. PERSONALITY: Define 3 key traits and the 'Brand Voice' (adjectives).\n"
                "3. MANIFESTO: A 1-sentence powerful statement defining the brand's belief.\n"
                "4. VISUALS: Suggest a color palette (5 hex codes) and font pairing that matches the psychology of the archetype.\n"
                "   - EXAMPLE: 'The Rebel' might use Red/Black and bold, aggressive fonts.\n"
                "   - EXAMPLE: 'The Sage' might use Navy/Gold and clean serif fonts.\n"
                "5. LOGO CONCEPT: Abstract geometric description for the archetype.\n\n"
                "OUTPUT JSON FORMAT ONLY:\n"
                "{\n"
                '  "archetype": "The Magician",\n'
                '  "traits": ["Visionary", "Charismatic", "Transformational"],\n'
                '  "voice": "Mysterious and confident",\n'
                '  "manifesto": "We turn the impossible into reality.",\n'
                '  "colors": [\n'
                '    {"hex": "#2C3E50", "name": "Mystic Dark", "usage": "Primary"},\n'
                '    {"hex": "#8E44AD", "name": "Alchemy Purple", "usage": "Accent"},\n'
                '    {"hex": "#ECF0F1", "name": "Smoke White", "usage": "Background"},\n'
                '    {"hex": "#F1C40F", "name": "Gold Dust", "usage": "Highlights"},\n'
                '    {"hex": "#2980B9", "name": "Ether Blue", "usage": "Secondary"}\n'
                "  ],\n"
                '  "fonts": {"header": "Playfair Display", "body": "Lato"},\n'
                '  "logo_concept": "Infinity loop merging with a spark"\n'
                "}"
            )
            
            user_prompt = f"Brand: {brand_input}\nIndustry: {industry}\n\nPerform the Alchemical Analysis. JSON Only."
            
            # API Call
            max_retries = 3
            response = None
            
            for attempt in range(max_retries):
                try:
                    print(f"[Brand Alchemist] Distilling essence... (Attempt {attempt+1})")
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
                        break
                except Exception as req_err:
                    print(f"[Brand Alchemist] Connection Error: {req_err}. Retrying...")
                    import time
                    time.sleep(2 ** attempt)
            
            if response and response.status_code == 200:
                content = response.text
                
                # Parse JSON helper (same robust logic as before)
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
                if not data: raise Exception("Failed to distill JSON from Alchemist.")
                
                # Enforce Schema / Defaults
                data["archetype"] = data.get("archetype", "The Creator")
                data["traits"] = data.get("traits", ["Innovative", "Authentic", "Expressive"])
                data["colors"] = data.get("colors", [{"hex": "#000000", "name": "Void", "usage": "Primary"}])
                
                # Generate Abstract Archetype Logo (SVG)
                # This ensures we always have a clean, scalable visual representing the archetype
                # fallback if we can't get external images
                primary_hex = data['colors'][0]['hex']
                accent_hex = data['colors'][1]['hex'] if len(data['colors']) > 1 else "#FFFFFF"
                
                # Dynamic SVG generation based on archetype name (simple visual metaphors)
                archetype_lower = data['archetype'].lower()
                
                svg_shape = f"<circle cx='256' cy='256' r='100' fill='{primary_hex}' />" # Default circle
                if "ruler" in archetype_lower or "king" in archetype_lower:
                    svg_shape = f"<rect x='156' y='156' width='200' height='200' fill='{primary_hex}' />" # Square/Stability
                elif "creator" in archetype_lower or "artist" in archetype_lower:
                    svg_shape = f"<path d='M256 50 L300 200 L450 200 L320 280 L360 420 L256 340 L152 420 L192 280 L62 200 L212 200 Z' fill='{primary_hex}' />" # Star
                elif "innovation" in archetype_lower or "magician" in archetype_lower:
                     svg_shape = f"<polygon points='256,50 350,350 150,150 362,150 162,350' fill='{primary_hex}' opacity='0.8' />"
                
                # Construct clean SVG string
                svg_content = (
                    f"<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'>"
                    f"<rect width='512' height='512' fill='#1a1a1a'/>"
                    f"{svg_shape}"
                    f"<text x='50%' y='50%' font-family='serif' font-size='200' text-anchor='middle' fill='{accent_hex}' dy='.35em' opacity='0.9'>{brand_input[0].upper()}</text>"
                    f"<text x='50%' y='85%' font-family='sans-serif' font-size='24' text-anchor='middle' fill='white' opacity='0.6' letter-spacing='4'>{data['archetype'].upper()}</text>"
                    f"</svg>"
                )
                
                # Encode to Base64 for safe Data URI
                import base64
                b64_svg = base64.b64encode(svg_content.encode('utf-8')).decode('utf-8')
                logo_svg = f"data:image/svg+xml;base64,{b64_svg}"
                
                return {
                    "status": "success",
                    "data": {
                        "brand_name": brand_input,
                        "archetype": data["archetype"],
                        "manifesto": data.get("manifesto", "We create the future."),
                        "traits": data["traits"],
                        "voice": data.get("voice", "Unique"),
                        "colors": data["colors"][:5],
                        "fonts": data.get("fonts", {"header": "Inter", "body": "Inter"}),
                        "logo_url": logo_svg,
                        "logo_concept": data.get("logo_concept", "Abstract form")
                    }
                }
            else:
                 raise Exception(f"Alchemist timed out: {response.status_code if response else 'Time'}")
                 
        except Exception as e:
            print(f"[Brand Alchemist Error] {str(e)}")
            return {"status": "error", "message": f"Alchemy failed: {str(e)}"}
