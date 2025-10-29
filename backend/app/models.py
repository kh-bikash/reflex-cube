from sqlalchemy import Column, String, Integer, Text
from .db import Base

class TrainingJob(Base):
    __tablename__ = "training_jobs"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    prompt = Column(Text)
    status = Column(String, default="queued")
    progress = Column(Integer, default=0)
    result_path = Column(String, nullable=True)
    error = Column(Text, nullable=True)
