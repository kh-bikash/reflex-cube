import os
import time
import psutil
from pathlib import Path
import sqlite3

PATHS_TO_CLEAN = [
    Path(r"d:\Projects\reflexcube-v2\reflex.db"),
    Path(r"d:\Projects\reflexcube-v2\backend\reflex.db")
]

def kill_locking_processes(filepath):
    """Kills processes locking the file."""
    print(f"Checking locks for {filepath}")
    for proc in psutil.process_iter(['pid', 'name', 'open_files']):
        try:
            for f in proc.info['open_files'] or []:
                if str(f.path) == str(filepath):
                    print(f"Killing {proc.info['name']} ({proc.info['pid']}) locking DB")
                    proc.kill()
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

def clean():
    # 1. Kill generic uvicorn/python to be safe
    for proc in psutil.process_iter(['pid', 'name']):
        if 'uvicorn' in proc.info['name'] or 'python' in proc.info['name']:
            # Be careful not to kill self
            if proc.pid != os.getpid():
                 # print(f"Terminating potential lock holder: {proc.info['name']}")
                 pass # Let's try file-specific first
    
    # 2. Delete files
    for p in PATHS_TO_CLEAN:
        if p.exists():
            kill_locking_processes(p)
            try:
                os.remove(p)
                print(f"Deleted {p}")
            except Exception as e:
                print(f"Failed to delete {p}: {e}")
                # Try harder
                try:
                    time.sleep(1)
                    os.remove(p)
                except:
                    print(f"Persistent lock on {p}")

    # 3. Init DB
    print("Initializing DB...")
    # Import config to see where it points
    from app.config import DATABASE_URL
    print(f"Config points to: {DATABASE_URL}")
    
    from app.db import init_db, engine
    init_db()
    
    # 4. Verify
    print("Verifying Schema...")
    with engine.connect() as conn:
        columns = conn.execute("PRAGMA table_info(training_jobs)").fetchall()
        col_names = [c[1] for c in columns]
        print(f"Columns: {col_names}")
        if "epoch" in col_names:
            print("SUCCESS: 'epoch' column exists.")
        else:
            print("FAILURE: 'epoch' column MISSING.")

if __name__ == "__main__":
    clean()
