from app.db import engine, Base
from app.models import TrainingJob

print("Resetting database...")
try:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    print("Database reset complete. 'task' column is now active.")
except Exception as e:
    print(f"Error resetting DB: {e}")
