import os
import time
import psutil
from pathlib import Path
from app.db import init_db

DB_PATH = Path(r"d:\Projects\reflexcube-v2\backend\reflex.db")

def kill_uvicorn():
    print("Searching for uvicorn processes...")
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            if 'uvicorn' in proc.info['name'] or 'uvicorn' in (proc.info['cmdline'] or []):
                print(f"Killing process {proc.info['pid']}")
                proc.kill()
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

def reset_db():
    print(f"Resetting DB at {DB_PATH}")
    if DB_PATH.exists():
        try:
            os.remove(DB_PATH)
            print("Deleted old DB.")
        except PermissionError:
            print("ERROR: File locked. Killing processes...")
            kill_uvicorn()
            time.sleep(2)
            try:
                os.remove(DB_PATH)
                print("Deleted old DB (Retry).")
            except Exception as e:
                print(f"FATAL: Could not delete DB: {e}")
                return

    print("Initializing new DB...")
    init_db()
    print("Database reset complete.")

if __name__ == "__main__":
    reset_db()
