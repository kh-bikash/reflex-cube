import requests
import json
import time

def test_sentinel_ai():
    print("Testing Sentinel Cube AI Integration...")
    
    # 1. Test Standard Simulation (Heartbeat)
    print("\n[1] Testing Heartbeat (Simulation Mode)...")
    try:
        payload = {
            "cube_id": "sentinel",
            "input": {"simulation_mode": "normal"}
        }
        # Assuming we can mock the cube registry run or just import class directly
        # Since server is running, let's try to hit the endpoint if possible, 
        # but we are in the backend folder, so let's import the class directly for unit testing
        from app.cubes.sentinel import SentinelCube
        cube = SentinelCube()
        
        res = cube.run({"simulation_mode": "normal"})
        if res['status'] == 'success' and len(res['data']['logs']) > 0:
            print("✅ Heartbeat OK. Logs generated.")
        else:
            print("❌ Heartbeat FAILED.")
    except Exception as e:
        print(f"❌ Heartbeat Error: {e}")

    # 2. Test AI Analysis (Manual Payload)
    print("\n[2] Testing AI Threat Analysis (External API Call)...")
    start_time = time.time()
    try:
        # malicious payload
        malice = "<script>alert(document.cookie)</script>"
        res = cube.run({"manual_payload": malice})
        
        duration = time.time() - start_time
        
        data = res.get('data', {})
        threats = data.get('threats', [])
        
        if len(threats) > 0:
            t = threats[0]
            print(f"✅ Threat Detected: {t['type']}")
            print(f"✅ Severity: {t['severity']}")
            print(f"✅ AI Explanation: {t.get('explanation', 'MISSING')[:100]}...")
            print(f"⏱️ Response Time: {duration:.2f}s")
            
            if "Analysis" in t.get('explanation', '') or "Matched" in t.get('explanation', ''):
                 print("✅ AI Content seems valid.")
            else:
                 print("⚠️ AI Content might be generic fallback.")
        else:
            print("❌ Detection FAILED for known payload.")
            
    except Exception as e:
        print(f"❌ AI Test Error: {e}")

if __name__ == "__main__":
    test_sentinel_ai()
