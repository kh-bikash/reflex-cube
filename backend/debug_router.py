from app.utils.ai_router import get_local_llm, query_ai
import os

print("--- DIAGNOSTIC START ---")

# 1. Test Import
try:
    import ctransformers
    print("[PASS] ctransformers imported successfully.")
except ImportError as e:
    print(f"[FAIL] ctransformers import failed: {e}")

# 2. Test Model Loading
print("Attempting to load local LLM...")
llm = get_local_llm()
if llm:
    print("[PASS] Local LLM loaded.")
else:
    print("[FAIL] Local LLM failed to load. Check console for 'Failed to load local model' error above.")

# 3. Test Query (Force Fail Pollinations)
# We can't easily force fail requests without mocking, but we can see if llm is None.
if llm:
    print("Testing local generation...")
    try:
        response = llm("Hello, are you working?", max_new_tokens=20)
        print(f"Generation Result: {response}")
    except Exception as e:
        print(f"Generation Error: {e}")

print("--- DIAGNOSTIC END ---")
