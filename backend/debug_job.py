import sys
import os
import uuid
import json
from pathlib import Path

# Add project root to sys.path
sys.path.append(os.getcwd())

try:
    from app.trainer import run_training_job
    from app.config import STORAGE_PATH
except ImportError as e:
    print(f"Import Error: {e}")
    sys.exit(1)

print("Starting debug training job...")
job_id = f"debug-{uuid.uuid4()}"
job_data = {
    "prompt": "Test sentiment analysis for movies",
    "name": "debug-run",
    "task": "sentiment-analysis"
}

try:
    run_training_job(job_data, job_id)
    print("Job finished successfully (check storage for logs)")
except Exception as e:
    print(f"CRITICAL ERROR RUNNING JOB: {e}")
    import traceback
    traceback.print_exc()

# Check logs
log_file = Path(STORAGE_PATH) / job_id / "training_log.jsonl"
if log_file.exists():
    print(f"\n--- LOG CONTENTS ({log_file}) ---")
    with open(log_file, "r") as f:
        print(f.read())
else:
    print(f"\nNO LOG FILE FOUND AT {log_file}")
