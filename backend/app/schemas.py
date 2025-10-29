from pydantic import BaseModel

class CreateModelRequest(BaseModel):
    name: str
    prompt: str

class JobStatus(BaseModel):
    id: str
    status: str
    progress: int
    result_path: str | None = None
