from sqlalchemy import Column, String, Integer, Text, Float
from .db import Base

class TrainingJob(Base):
    __tablename__ = "training_jobs"

    id = Column(String, primary_key=True, index=True)
    name = Column(String)
    prompt = Column(Text)
    task = Column(String, default="text-generation")
    status = Column(String, default="queued")
    progress = Column(Integer, default=0)
    epoch = Column(Float, default=0.0)
    loss = Column(Float, nullable=True)
    accuracy = Column(Float, nullable=True)
    result_path = Column(String, nullable=True)
    error = Column(Text, nullable=True)
