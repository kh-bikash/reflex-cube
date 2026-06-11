"""Cancel all active/queued training sessions and clean up."""
from app.db import SessionLocal
from app.models import TrainingJob

db = SessionLocal()
active = db.query(TrainingJob).filter(
    TrainingJob.status.in_(["queued", "initializing", "analyzing_prompt", "loading_data", "training", "loading_data_SetFit/enron_spam", "loading_data_imdb"])
).all()

print(f"Found {len(active)} active/queued jobs.")
for job in active:
    print(f"  Cancelling: {job.id} | Status: {job.status} | Prompt: {job.prompt[:50]}")
    job.status = "failed"
    job.error = "Manually cancelled by user."

db.commit()
db.close()
print("Done! All active sessions cancelled.")
