import sys
import os

print("Testing imports...", flush=True)
try:
    from app.trainer import run_training_job
    print("SUCCESS: app.trainer imported correctly.", flush=True)
except Exception as e:
    print(f"FAILURE: {e}", flush=True)
    import traceback
    traceback.print_exc()
