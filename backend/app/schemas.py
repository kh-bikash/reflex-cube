from pydantic import BaseModel

class CreateModelRequest(BaseModel):
    name: str
    prompt: str
    task: str | None = None

class JobStatus(BaseModel):
    id: str
    name: str = ""
    task: str = "text-generation"
    status: str
    progress: int
    result_path: str | None = None
