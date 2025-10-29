import os
import uuid
import zipfile
from pathlib import Path
from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from .db import init_db, SessionLocal
from .models import TrainingJob
from .schemas import CreateModelRequest, JobStatus
from .trainer import run_training_job
from .config import STORAGE_PATH

app = FastAPI(title="ReflexCube Backend")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()
os.makedirs(STORAGE_PATH, exist_ok=True)

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/api/models/create")
async def create_model(req: CreateModelRequest, bg: BackgroundTasks):
    job_id = str(uuid.uuid4())
    db = SessionLocal()
    job = TrainingJob(id=job_id, name=req.name, prompt=req.prompt)
    db.add(job)
    db.commit()
    db.close()
    bg.add_task(run_training_job, req.dict(), job_id)
    return {"job_id": job_id, "status": "queued"}

@app.get("/api/training/status/{job_id}")
def status(job_id: str):
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    db.close()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return JobStatus(id=job.id, status=job.status, progress=job.progress, result_path=job.result_path)

@app.get("/api/models/download/{job_id}")
def download(job_id: str):
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    db.close()
    if not job or not job.result_path:
        raise HTTPException(status_code=404, detail="Model not ready")
    zip_name = f"{job_id}.zip"
    zip_path = Path(STORAGE_PATH) / zip_name
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for file in Path(job.result_path).rglob("*"):
            zf.write(file, arcname=file.relative_to(job.result_path))
    return FileResponse(str(zip_path), filename=zip_name, media_type="application/zip")
