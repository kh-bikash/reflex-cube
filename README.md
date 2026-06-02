# Reflex Cube

**AI Model Generation Platform — Build, Fine-Tune, and Deploy LLMs from Simple Prompts**

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/PyTorch-ML_Engine-EE4C2C?logo=pytorch&logoColor=white"/>
  <img src="https://img.shields.io/badge/Three.js-3D_UI-black?logo=three.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white"/>
</p>

---

## What is Reflex Cube?

Reflex Cube is a platform for **AI model generation without complexity**. Describe what you want, and Reflex Cube handles the rest — from training a fine-tuned model to spinning up a specialized LLM agent — all through a clean UI backed by a high-performance FastAPI engine.

You interact with a **registry of 15 pre-built Intelligence Cubes**, each a focused AI module for a specific domain (legal, finance, fitness, travel, and more). You can also prompt the platform to generate and train entirely custom models from scratch.

---

## Core Features

**Prompt-to-Model Generation**
Describe the model you need in plain language. Reflex Cube triggers an isolated training subprocess, streams live logs to your terminal UI, and delivers a downloadable `.zip` of the trained model when complete.

**LLM Fine-Tuning**
Leverage Hugging Face Transformers and PyTorch to fine-tune language models. Expanded LoRA adapter support is on the roadmap.

**15 Specialized Intelligence Cubes**
A registry of ready-to-use AI agents, each tailored for a distinct task. Send a prompt, get a response — no setup required.

**Immersive 3D Interface**
Built on React Three Fiber, the frontend lets you visualize and interact with your deployed Cubes in a real-time 3D canvas.

**Live Training Monitor**
Server-Sent Events (SSE) stream real-time training logs straight to the frontend terminal — no polling, no refresh.

**End-to-End Model Pipeline**
Train → Predict → Download. Every model is packaged as a `.zip` (state dict + config) and available via API.

---

## Intelligence Cube Registry

Each Cube is an isolated, asynchronous AI agent managed by FastAPI's ThreadPool. Current roster:

| # | Cube | Purpose |
|---|------|---------|
| 1 | 🧑‍💼 Talent Cube | Resume evaluation, candidate ranking |
| 2 | 🔗 Nexus Cube | Contextual memory and relational retrieval |
| 3 | ⚖️ Legal Cube | Contract analysis, liability extraction |
| 4 | 🍳 Chef Cube | Culinary intelligence and recipe generation |
| 5 | 📈 Alpha Cube | Financial strategy and heuristics |
| 6 | 💼 Career Cube | Career trajectory design and analysis |
| 7 | 🏷️ Brand Cube | Marketing and corporate identity reasoning |
| 8 | 🏋️ FitPal Cube | Fitness, health, and biometric logic |
| 9 | ✈️ Travel Cube | Itinerary generation and logistics |
| 10 | 🛡️ Sentinel Cube | Security, logging, and infrastructure monitoring |
| 11 | 📓 Ledger Cube | Financial log parsing and immutable tracking |
| 12 | 🔨 Forge Cube | Core tool-building agent |
| 13 | 👁️ Vision Cube | Perception-based reasoning and image-text tasks |
| 14 | 💭 Dream Cube | Abstract generation and ideation |
| 15 | 🔍 Lens Cube | Deep analytical parsing and summarization |

---

## Tech Stack

**Frontend**
- React 18, Vite, TypeScript
- Three.js, React Three Fiber, React Three Drei (3D engine)
- TailwindCSS, Shadcn UI / Radix Primitives
- Framer Motion, GSAP, Lenis (animation & scrolling)
- Valtio, TanStack React Query, Recharts

**Backend**
- Python 3.10+, FastAPI, Uvicorn
- Hugging Face `transformers`, PyTorch
- `subprocess.Popen` isolated worker pipelines (zero GIL lockups)
- SQLite via SQLAlchemy (`reflex.db`)

**DevOps**
- Docker, Docker Compose
- Git LFS (for `.pt` model files)

---

## Project Structure

```
ReflexCube-v2/
├── backend/
│   ├── app/
│   │   ├── cubes/          # 15 Intelligence Agents (registry.py)
│   │   ├── routes/         # Modular API routers
│   │   ├── utils/          # Core helpers
│   │   ├── api.py          # FastAPI main application
│   │   ├── trainer.py      # Transformers / LLM setup
│   │   ├── db.py
│   │   └── models.py
│   ├── train_worker.py     # Isolated CLI subprocess for AI training
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── canvas/         # React Three Fiber 3D UI
│   │   ├── components/     # Animated UI & Shadcn registry
│   │   ├── cubes/          # Frontend bindings for Intelligence Agents
│   │   ├── visuals/        # Charts, Recharts, WebGL layers
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── storage/                # Exported .zip models and DB output
└── docker-compose.yml
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Docker (optional, recommended)

### 1. Backend

```bash
cd backend
python -m venv venv

# Activate
source venv/bin/activate       # Linux / macOS
venv\Scripts\activate          # Windows

pip install -r requirements.txt
uvicorn app.api:app --reload --host 0.0.0.0 --port 8000
```

API available at `http://localhost:8000`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

UI available at `http://localhost:5173`

### 3. Docker (Recommended)

```bash
docker-compose up --build -d
```

### 4. Git LFS (Required for Model Files)

This repo uses Git LFS to track serialized `.pt` tensor models. Pull them after cloning:

```bash
git lfs install
git lfs pull
```

---

## API Reference

### Model Training

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/models/create` | Submit a prompt to start background model training. Returns a job ID. |
| `GET` | `/api/training/status/{job_id}` | Poll training progress from the SQLite DB. |
| `GET` | `/api/logs/{job_id}` | SSE stream of real-time JSONL training logs from the active subprocess. |
| `POST` | `/api/models/{job_id}/predict` | Run inference using the compiled local Hugging Face pipeline. |
| `GET` | `/api/models/download/{job_id}` | Download trained model as a `.zip` (tensors + config). |

### Intelligence Cubes

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/cubes/run` | Execute a command against a specific Cube agent. |

**Example payload:**
```json
{
  "cube_id": "legal",
  "input": "Review this contract for liability clauses..."
}
```

---

## Screenshots

| | |
|--|--|
| ![m1](./m1.png) | ![m2](./m2.png) |
| ![m3](./m3.png) | ![m4](./m4.png) |
| ![m5](./m5.png) | ![m6](./m6.png) |

---

## Roadmap

- [ ] **Cube Marketplace** — Hot-load new agent logic from the UI
- [ ] **LoRA Fine-Tuning** — Expanded adapter parameters via the UI
- [ ] **Vector DB Upgrade** — Nexus Cube migrating from SQLite to Milvus / Pinecone
- [ ] **Multi-Tenancy Auth** — JWT handling for multi-tenant state persistence
- [ ] **Cloud Templates** — Terraform templates for AWS EC2 / SageMaker

---

## Contributing

Contributions are welcome — whether that's new 3D visualizations, additional Cubes, inference optimizations, or bug fixes. Open a PR or submit an issue.

## License

License information pending.
