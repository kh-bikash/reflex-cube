FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Create storage data dirs
RUN mkdir -p /data/models /data/huggingface
ENV STORAGE_PATH=/data/models
ENV HF_HOME=/data/huggingface

EXPOSE 8000

CMD ["uvicorn", "app.api:app", "--host", "0.0.0.0", "--port", "8000"]
