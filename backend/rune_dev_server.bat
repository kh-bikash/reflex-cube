@echo off
REM Activate virtualenv first or create one if absent
if not exist .venv (
  python -m venv .venv
  call .venv\Scripts\activate
  pip install --upgrade pip
  REM install CPU torch then requirements
  pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
  pip install -r requirements.txt
) else (
  call .venv\Scripts\activate
)
REM Run uvicorn
uvicorn app.api:app --reload --host 0.0.0.0 --port 8000
pause
