import subprocess
import sys
import os

print(f"Current Executable: {sys.executable}")
print(f"CWD: {os.getcwd()}")

worker_script = "train_worker.py"
job_id = "test-spawn-job"
req_json = "{}"

try:
    with open("spawn_test_log.txt", "w") as f:
        f.write("Starting spawn...\n")
        subprocess.Popen([sys.executable, worker_script, job_id, req_json], stdout=f, stderr=subprocess.STDOUT)
    print("Spawned process. Check spawn_test_log.txt")
except Exception as e:
    print(f"Failed: {e}")
