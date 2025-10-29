from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import time
from pathlib import Path
from ..config import STORAGE_PATH

router = APIRouter(prefix="/api/logs", tags=["Logs"])

@router.get("/{job_id}")
def stream_logs(job_id: str):
    job_dir = Path(STORAGE_PATH) / job_id
    log_file = job_dir / "training_log.jsonl"

    def event_stream():
        last_size = 0
        while True:
            if log_file.exists():
                with open(log_file, "r", encoding="utf-8") as f:
                    f.seek(last_size)
                    new_lines = f.readlines()
                    last_size = f.tell()
                    for line in new_lines:
                        yield f"data: {line}\n\n"
            time.sleep(2)

    return StreamingResponse(event_stream(), media_type="text/event-stream")
