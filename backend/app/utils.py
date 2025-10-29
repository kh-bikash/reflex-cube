# backend/app/utils.py
from pathlib import Path
from .config import STORAGE_PATH

def job_dir(job_id: str) -> Path:
    p = Path(STORAGE_PATH) / job_id
    p.mkdir(parents=True, exist_ok=True)
    return p

def append_log(job_id: str, msg: str):
    p = job_dir(job_id) / "train.log"
    with open(p, "a", encoding="utf-8") as f:
        f.write(msg.rstrip() + "\n")

def read_log(job_id: str) -> str:
    p = job_dir(job_id) / "train.log"
    if p.exists():
        return p.read_text(encoding="utf-8")
    return ""
