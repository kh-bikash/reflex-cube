import sys
sys.path.append('d:/Projects/reflexcube-v2/backend')
from app.utils.ai_router import query_ai, extract_json

sys_p = """You are an Expert Travel Guide.
Create a 3-day itinerary.
OUTPUT FORMAT (JSON ONLY):
{
  "destination_name": "Kyoto",
  "tagline": "City of Shrines",
  "total_budget_est": "1500 USD",
  "best_time": "March",
  "days": [
    {
      "day": 1,
      "theme": "Sacred",
      "activities": [
        {"time": "Morning", "title": "Shrine", "desc": "Hike early.", "cost_usd": 0},
        {"time": "Afternoon", "title": "Market", "desc": "Try food.", "cost_usd": 30}
      ]
    }
  ],
  "local_tips": ["Use a train card."]
}
RULES:
1. Output exactly ONE valid JSON object.
2. Do NOT use unescaped quotes inside strings.
3. Every key MUST be wrapped in double quotes."""

user_p = 'Plan a trip to Manipur. JSON Only.'

print('Querying AI...')
raw = query_ai(sys_p, user_p, engine_type='general')
print('--- RAW AI OUTPUT ---')
print(raw)
print('--- EXTRACT ATTEMPT ---')
print(extract_json(raw))
