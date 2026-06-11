import requests
import json

API_URL = "http://localhost:8000/api/cubes/run"

def test_status():
    payload = {
        "cube_id": "vision",
        "input": {
            "action": "status"
        }
    }
    try:
        response = requests.post(API_URL, json=payload)
        res_json = response.json()
        print("--- Backend Status ---")
        if res_json.get("status") == "success":
            result = res_json.get("result", {})
            print(f"Classes: {result.get('classes')}")
            print(f"Counts: {result.get('dataset_counts')}")
        else:
            print("Failed:", res_json)
    except Exception as e:
        print("Error:", e)

test_status()
