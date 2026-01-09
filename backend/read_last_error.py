from app.db import SessionLocal
from app.models import TrainingJob
import sys

try:
    db = SessionLocal()
    # Get last job
    job = db.query(TrainingJob).order_by(TrainingJob.id.desc()).first()
    if job:
        print(f"Job ID: {job.id}")
        print(f"Status: {job.status}")
        print(f"Progress: {job.progress}")
        print(f"Error: {job.error}")
        print(f"Epoch: {getattr(job, 'epoch', 'N/A')}")
    else:
        print("No jobs found.")
    db.close()
except Exception as e:
    print(f"DB Read Error: {e}")
