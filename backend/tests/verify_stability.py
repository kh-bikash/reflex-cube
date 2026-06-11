import sys
import os
import requests

# Add backend app to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.utils.ai_router import generate_image, query_ai

def test_image_generation():
    print("--- Testing Image Generation ---")
    
    # Test 1: Normal Generation (Should ideally be Pollinations)
    print("\n1. Testing Normal Generation...")
    url_1 = generate_image("delicious pizza", seed=42, fallback_keyword="pizza")
    print(f"Result 1: {url_1}")
    
    if "pollinations" in url_1:
        print("[OK] Primary (Pollinations) working.")
    elif "loremflickr" in url_1:
        print("[WARNING] Primary failed, Fallback (Stock) working. (This is acceptable if API is down)")
    else:
        print("[ERROR] Unknown result.")
        
    # Test 2: Fallback Logic 
    # We can't easily force requests to fail without mocking, 
    # but we can verify the function handles exceptions if we pass a bad prompt to generate_image 
    # (though generate_image cleans it).
    # Instead, let's manually verify the fallback URL construction by calling it with a known fallback scenario/feature if I had added a 'force_fallback' param,
    # but I didn't. 
    # So we will just trust the logic for now, or we could monkeypatch requests.head.
    
    print("\n2. Testing Fallback (Simulated failure via Monkeypatch)...")
    original_head = requests.head
    
    def mock_fail_head(url, timeout=None):
        class MockResponse:
            status_code = 500
        return MockResponse()
        
    requests.head = mock_fail_head
    
    url_2 = generate_image("delicious burger", seed=123, fallback_keyword="burger")
    print(f"Result 2 (Simulated Failure): {url_2}")
    
    if "loremflickr" in url_2 and "burger" in url_2:
        print("[OK] Fallback logic confirmed.")
    else:
        print("[ERROR] Fallback logic failed.")
        
    requests.head = original_head # Restore

def test_text_generation():
    print("\n--- Testing Text Generation (AI Router) ---")
    # Just a quick check to see if text works too
    try:
        res = query_ai("System: be short.", "User: say hi")
        print(f"AI Response: {res}")
        if res:
            print("[OK] Text Generation working.")
        else:
            print("[ERROR] Text Generation returned None (All providers failed).")
    except Exception as e:
        print(f"[ERROR] Text Generation Exception: {e}")

if __name__ == "__main__":
    test_image_generation()
    # test_text_generation() # Optional, can be slow
