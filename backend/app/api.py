import os
import uuid
import zipfile
from pathlib import Path
from fastapi import FastAPI, BackgroundTasks, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import traceback
from .db import init_db, SessionLocal
from .models import TrainingJob
from .schemas import CreateModelRequest, JobStatus, BaseModel
from .trainer import run_training_job
from .config import STORAGE_PATH

from transformers import pipeline, AutoTokenizer, AutoModelForSequenceClassification, AutoModelForCausalLM, AutoModelForSeq2SeqLM, AutoModelForTokenClassification

def safe_print(msg):
    try:
        print(msg, flush=True)
    except:
        pass

app = FastAPI(title="ReflexCube Backend")

class PredictRequest(BaseModel):
    text: str

@app.post("/api/models/{job_id}/predict")
def predict(job_id: str, req: PredictRequest):
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    db.close()
    
    if not job or not job.result_path or not os.path.exists(job.result_path):
        raise HTTPException(status_code=404, detail="Model not found or not ready")
        
    try:
        from transformers import pipeline
        
        # Use the persisted task type! No more guessing.
        target_task = job.task or "text-generation"
        safe_print(f"[Inference] Loading pipeline for task: {target_task}")
        
        nlp = pipeline(target_task, model=job.result_path, tokenizer=job.result_path)
        
        # Handle specific arguments per task if needed
        if target_task == "text-generation":
            # Better defaults for generation
            return {"result": nlp(req.text, max_length=100, num_return_sequences=1)}
        else:
            return {"result": nlp(req.text)}

    except Exception as e:
        print(f"Inference Error: {e}")
        raise HTTPException(status_code=500, detail=f"Pipeline error: {str(e)}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()
os.makedirs(STORAGE_PATH, exist_ok=True)

@app.on_event("startup")
def startup_event():
    # Reset stuck jobs
    db = SessionLocal()
    stuck_jobs = db.query(TrainingJob).filter(TrainingJob.status.in_(["queued", "initializing", "analyzing_prompt", "loading_data", "training"])).all()
    for job in stuck_jobs:
        safe_print(f"[Startup] Making zombie job {job.id} as failed.")
        job.status = "failed"
        job.error = "Job interrupted by server restart."
    db.commit()
    db.close()

    # Pre-load Brain to show status logs on startup (and catch errors early)
    try:
        safe_print("[Startup] Warming up ReflexBrain...")
        from .brain import brain_instance
        safe_print("[Startup] Brain initialized successfully.")
    except Exception as e:
        safe_print(f"[Startup] Warning: Brain warmup failed: {e}")

@app.get("/")
def root():
    return {"status": "ok"}

@app.post("/api/cubes/run")
async def run_cube(request: Request):
    try:
        data = await request.json()
        cube_id = data.get("cube_id")
        input_data = data.get("input")
        
        from .brain import brain_instance
        
        # Offload blocking inference to a threadpool
        from starlette.concurrency import run_in_threadpool
        
        # The brain processes the request using Gemma + E2B + Apify
        result_text = await run_in_threadpool(brain_instance.run_agent, input_data, cube_id)
        
        return {"status": "success", "result": result_text}
    except Exception as e:
        print(f"Cube Error: {e}")
        traceback.print_exc()
        return {"status": "error", "message": str(e)}

class PDFRequest(BaseModel):
    title: str
    markdown: str

@app.post("/api/cubes/pdf")
async def generate_pdf(req: PDFRequest):
    import markdown
    from xhtml2pdf import pisa
    from io import BytesIO
    from fastapi.responses import StreamingResponse

    # Convert Markdown to HTML
    html_content = markdown.markdown(req.markdown, extensions=['fenced_code', 'tables'])
    
    # Wrap in a beautiful template
    full_html = f"""
    <html>
    <head>
        <style>
            @page {{
                size: a4 portrait;
                @frame header_frame {{           /* Static Frame */
                    -pdf-frame-content: header_content;
                    left: 50pt; width: 512pt; top: 50pt; height: 40pt;
                }}
                @frame content_frame {{          /* Content Frame */
                    left: 50pt; width: 512pt; top: 90pt; height: 632pt;
                }}
            }}
            body {{
                font-family: Helvetica, Arial, sans-serif;
                font-size: 11pt;
                color: #222222;
                line-height: 1.5;
            }}
            h1 {{ color: #111111; font-size: 24pt; border-bottom: 1px solid #dddddd; padding-bottom: 5px; }}
            h2 {{ color: #333333; font-size: 18pt; margin-top: 20px; }}
            h3 {{ color: #444444; font-size: 14pt; }}
            p {{ margin-bottom: 10px; }}
            code {{ background-color: #f4f4f4; padding: 2px 4px; border-radius: 4px; font-family: Courier, monospace; font-size: 10pt; }}
            pre {{ background-color: #f4f4f4; padding: 10px; border-radius: 4px; font-family: Courier, monospace; font-size: 9pt; white-space: pre-wrap; }}
            blockquote {{ border-left: 4px solid #dddddd; padding-left: 10px; color: #555555; font-style: italic; }}
            ul, ol {{ margin-bottom: 10px; padding-left: 20px; }}
            li {{ margin-bottom: 5px; }}
            .title {{ font-size: 28pt; font-weight: bold; text-align: center; margin-bottom: 30px; color: #000; }}
            .watermark {{ color: #eeeeee; font-size: 60pt; text-align: center; position: absolute; top: 300px; z-index: -1; transform: rotate(-45deg); }}
        </style>
    </head>
    <body>
        <div id="header_content">
            <div style="font-size: 10pt; color: #888888; border-bottom: 1px solid #eeeeee; padding-bottom: 5px;">
                ReflexCube Autonomous Engine - {req.title}
            </div>
        </div>
        <div class="title">{req.title}</div>
        {html_content}
    </body>
    </html>
    """
    
    result_file = BytesIO()
    pisa_status = pisa.CreatePDF(BytesIO(full_html.encode('utf-8')), dest=result_file)
    
    if pisa_status.err:
        raise HTTPException(status_code=500, detail="Failed to generate PDF")
        
    result_file.seek(0)
    
    # Return as downloadable file
    return StreamingResponse(
        result_file,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={req.title.replace(' ', '_')}.pdf"}
    )

@app.post("/api/models/create")
async def create_model(req: CreateModelRequest):
    print(f"Received create_model request: {req}", flush=True)
    job_id = str(uuid.uuid4())
    db = SessionLocal()
    job = TrainingJob(id=job_id, name=req.name, prompt=req.prompt, task=req.task)
    db.add(job)
    db.commit()
    db.close()
    
    # Use Threading for reliability on Windows/Uvicorn
    # Use Subprocess for COMPLETE Isolation (fixes threading deadlocks)
    import subprocess
    import sys
    import json
    
    req_dict = req.dict()
    req_json = json.dumps(req_dict)
    
    # Use the same python interpreter as the running server
    python_exe = sys.executable
    
    # Resolve absolute path to worker script
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    worker_script = os.path.join(base_dir, "train_worker.py")
    
    safe_print(f"[API] Spawning subprocess: {python_exe} {worker_script} {job_id}")
    
    try:
        # Redirect output to file for debugging
        debug_log = os.path.join(base_dir, "worker_debug.log")
        with open(debug_log, "a") as f:
            f.write(f"\n--- Spawning job {job_id} ---\n")
            # Popen is non-blocking
            # Windows-specific: CREATE_NEW_CONSOLE ensures complete isolation
            CREATE_NEW_CONSOLE = 0x00000010
            
            subprocess.Popen(
                [python_exe, worker_script, job_id, req_json],
                cwd=base_dir, 
                stdout=f,
                stderr=subprocess.STDOUT,
                creationflags=CREATE_NEW_CONSOLE, # Force new console group
                close_fds=True # Don't inherit file descriptors
            )
        safe_print(f"[API] Process spawned successfully. Logs at {debug_log}")
    except Exception as e:
        safe_print(f"[API] FAILED to spawn process: {e}")
        import traceback
        traceback.print_exc()
    
    return {"job_id": job_id, "status": "queued"}

@app.delete("/api/models/{job_id}")
def delete_model(job_id: str):
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    if not job:
        db.close()
        raise HTTPException(status_code=404, detail="Job not found")
    
    # Delete artifacts
    if job.result_path and os.path.exists(job.result_path):
        import shutil
        try:
            shutil.rmtree(job.result_path)
        except Exception:
            pass # logging.error here in real app
            
    db.delete(job)
    db.commit()
    db.close()
    return {"status": "deleted", "id": job_id}

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
    
    # Create zip if not exists
    if not zip_path.exists():
        with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
            for file in Path(job.result_path).rglob("*"):
                zf.write(file, arcname=file.relative_to(job.result_path))
                
    return FileResponse(str(zip_path), filename=zip_name, media_type="application/zip")

@app.get("/api/models/download-zip-stream/{job_id}")
def download_zip_stream(job_id: str):
    return download(job_id)

@app.post("/api/models/download-zip/{job_id}")
def prepare_download_zip(job_id: str):
    # Check if job exists and is completed
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    db.close()
    
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    if job.status != "completed":
        raise HTTPException(status_code=400, detail="Job not completed yet")
        
    # We essentially rely on the GET endpoint to generate on demand if needed, 
    # but this endpoint returns the URL as JSON for the frontend to use.
    return {"url": f"/api/models/download/{job_id}"} 

@app.get("/api/models/all")
def get_all_models():
    db = SessionLocal()
    jobs = db.query(TrainingJob).order_by(TrainingJob.id.desc()).all()
    db.close()
    return jobs

import asyncio
import json
from fastapi.responses import StreamingResponse

@app.get("/api/logs/{job_id}")
async def stream_logs(job_id: str):
    # Check if job exists
    db = SessionLocal()
    job = db.query(TrainingJob).filter(TrainingJob.id == job_id).first()
    db.close()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    async def event_generator():
        log_path = Path(STORAGE_PATH) / job_id / "training_log.jsonl"
        # Wait for file to appear
        retries = 0
        while not log_path.exists():
            if retries > 20: # 20 seconds timeout waiting for start
                yield f"data: {json.dumps({'error': 'Log file not found'})}\n\n"
                return
            await asyncio.sleep(1)
            retries += 1

        # Stream new lines
        with open(log_path, "r", encoding="utf-8") as f:
            while True:
                line = f.readline()
                if line:
                    yield f"data: {line}\n\n"
                else:
                    # If job is done and we read everything, stop? 
                    # For now just wait for more. user can close connection.
                    # We should check if job status is completed/failed to stop eventually.
                    await asyncio.sleep(1)
                    
                    # Optional: check DB again to exit if completed
                    # But that queries DB in loop. simpler to just keep open until client disconnects
                    # or perhaps check file mtime? 
                    
    return StreamingResponse(event_generator(), media_type="text/event-stream")
