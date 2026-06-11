@echo off
REM backend/run_dev.bat
cd /d "%~dp0"

IF EXIST "venv\Scripts\activate.bat" (
    ECHO Activating virtual environment...
    CALL venv\Scripts\activate.bat
) ELSE (
    ECHO Virtual environment not found. Ensure you have created one or installed dependencies.
)

ECHO Starting ReflexCube Backend...
uvicorn app.api:app --reload --host 0.0.0.0 --port 8000

IF ERRORLEVEL 1 (
    ECHO Failed to start backend.
    PAUSE
)
