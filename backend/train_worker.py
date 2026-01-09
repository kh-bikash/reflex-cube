import sys
import json
import os

# Panic Log to prove life
try:
    with open("worker_life.txt", "a") as f:
        f.write(f"Worker Alive: {sys.argv}\n")
except:
    pass

# Add current directory to path so we can import app modules
sys.path.append(os.getcwd())

from app.trainer import run_training_job
from app.db import init_db

if __name__ == "__main__":
    try:
        if len(sys.argv) < 3:
            print("Usage: python train_worker.py <job_id> <json_data>")
            sys.exit(1)

        job_id = sys.argv[1]
        # Raw JSON string might contain quotes, ensure it's parsed correctly
        job_data_str = sys.argv[2]
        
        print(f"[Worker] Starting job {job_id}...", flush=True)
        job_data = json.loads(job_data_str)
        
        # Run the training
        run_training_job(job_data, job_id)
        
    except Exception as e:
        print(f"[Worker] CRITICAL FAILURE: {e}", flush=True)
        import traceback
        traceback.print_exc()
