# 🧊 Reflex Cube
### Prompt-Driven Modular AI Systems & 3D Intelligence Platform

<p align="center">
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" width="48" alt="Python"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" width="48" alt="React"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" width="48" alt="TypeScript"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" width="48" alt="FastAPI"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" width="48" alt="Docker"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/threejs/threejs-original.svg" width="48" alt="ThreeJs"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/pytorch/pytorch-original.svg" width="48" alt="PyTorch"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Machine%20Learning-Enabled-brightgreen"/>
  <img src="https://img.shields.io/badge/Artificial%20Intelligence-Modular-blueviolet"/>
  <img src="https://img.shields.io/badge/NLP-Prompt--Driven-orange"/>
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue?logo=python"/>
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi"/>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?logo=react"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker"/>
  <img src="https://img.shields.io/badge/Three.js-3D_UI-black?logo=three.js"/>
</p>

---

## 🚀 Overview

**Reflex Cube v2** is a highly modular AI-powered platform that enables the dynamic building of **AI models and intelligent applications directly from prompts**. Built with a deep focus on **Natural Language Processing (NLP)** through Hugging Face Transformers, it features an interactive 3D frontend interface allowing users to visualize and interact with deployed "Cubes".

The core architecture relies on the **"Cube Architecture"**, where each Cube acts as a specialized, independent AI module or intelligent agent tailored for a distinct business, creative, or utility function.

---

## ✨ Key Capabilities

- **Prompt-Driven Generative Models**: Trigger server-side sub-process model training isolated from the main event loop, utilizing `transformers` for custom ML generation tasks.
- **The Intelligence Cubes Registry**: Access 15 pre-built, specialized intelligence agents handling everything from Career management to Legal analysis.
- **Real-Time Log Streaming**: Live Training Monitor utilizing server-sent events (SSE) to push training and inference logs straight to the frontend terminal UI.
- **Immersive 3D Visualization**: A specialized canvas built on React Three Fiber (`@react-three/fiber`) allowing dynamic 3D interactions with your AI Cubes.
- **High-Performance Architecture**: FastAPI gateway routing asynchronous processes while maintaining a persistent SQLite memory database (`reflex.db`).
- **Complete End-to-End Pipeline**: Train, Predict, and Download (`.zip`) packaged state-dict ML models seamlessly via API.

---


## 📸 Screenshots

<p align="center">
  <img src="./screenshots/m1.png" width="30%" />
  <img src="./screenshots/m2.png" width="30%" />
  <img src="./screenshots/m3.png" width="30%" />
</p>

<p align="center">
  <img src="./screenshots/m4.png" width="30%" />
  <img src="./screenshots/m5.png" width="30%" />
  <img src="./screenshots/m6.png" width="30%" />
</p>


## 🧠 The Cube Architecture Registry

Each **Cube** is isolated, task-specific, and asynchronously managed by the FastAPI ThreadPool system to prevent event loop bottlenecks.

The fully integrated **Reflex Cube Engine** currently supports **15 Specialized Cubes**:
1. 🧑‍💼 **Talent Cube** — Evaluates resumes, extracts job criteria, and ranks candidates.
2. 🔗 **Nexus Cube** — Acts as a continuous secondary brain, retrieving context and storing relational memory.
3. ⚖️ **Legal Cube** — Analyzes contracts, extracts liability clauses, and reviews compliance.
4. 🍳 **Chef Cube** — Custom culinary intelligence.
5. 📈 **Alpha Cube** — Advanced strategic and financial heuristics.
6. 💼 **Career Cube** — Career trajectory design and analysis.
7. 🏷️ **Brand Cube** — Marketing and corporate identity reasoning.
8. 🏋️ **FitPal Cube** — Fitness, health, and biometric AI logic.
9. ✈️ **Travel Cube** — Dynamic itinerary generation and logistical mapping.
10. 🛡️ **Sentinel Cube** — Security, logging, and infrastructure monitoring agent.
11. 📓 **Ledger Cube** — Immutable data tracking and financial log parsing.
12. 🔨 **Forge Cube** — Core foundational tool-building agent.
13. 👁️ **Vision Cube** — Specialized in perception-based reasoning and image-text tasks.
14. 💭 **Dream Cube** — Abstract generation and ideation agent.
15. 🔍 **Lens Cube** — Deep-dive analytical parsing and summarization.

---

## 🛠️ Complete Technology Stack

### Frontend Architecture
- **Framework**: React 18, Vite, TypeScript
- **3D Engine**: Three.js, React Three Fiber, React Three Drei
- **Styling**: TailwindCSS, Shadcn UI (Radix Primitives)
- **Animation**: Framer Motion, GSAP (Lenis Smooth Scrolling)
- **State & Data**: Valtio, TanStack React Query, Recharts

### Backend Architecture
- **Gateway**: Python 3.10+, FastAPI, Uvicorn
- **AI & NLP**: Hugging Face `transformers`, PyTorch
- **Concurrency**: `subprocess.Popen` isolated worker pipelines for zero GIL/Threading lockups. Wait-free SSE streaming logs.
- **Database**: SQLite (via SQLAlchemy) configured in local volume `/data`.

### DevOps & Infrastructure
- **Containerization**: Docker, Docker Compose
- **Versioning**: Git & Git LFS (Large File System for `.pt` AI models)

---

## 📂 System Directory Structure

```text
📦 ReflexCube-v2
 ┣ 📂 backend
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 cubes           # The 15 Intelligence Agents (registry.py)
 ┃ ┃ ┣ 📂 routes          # Specialized modular routers
 ┃ ┃ ┣ 📂 utils           # Core helpers
 ┃ ┃ ┣ 📜 api.py          # FastAPI Main Application
 ┃ ┃ ┣ 📜 trainer.py      # LLM / Transformers setup
 ┃ ┃ ┗ 📜 db.py / models.py
 ┃ ┣ 📜 train_worker.py   # Isolated CLI subprocess runner for AI training
 ┃ ┗ 📜 Dockerfile & requirements.txt
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 canvas          # React Three Fiber 3D UI
 ┃ ┃ ┣ 📂 components      # Animated UI & Shadcn Registry
 ┃ ┃ ┣ 📂 cubes           # Frontend bindings for the intelligence agents
 ┃ ┃ ┣ 📂 visuals         # Charts, Recharts, and WebGL layers
 ┃ ┃ ┗ 📜 App.tsx / main.tsx
 ┃ ┗ 📜 package.json & vite.config.ts
 ┣ 📂 storage             # Output directory for exported .zip models and DB
 ┗ 📜 docker-compose.yml
```

---

## 🔌 API Reference

### Models & Training
* `POST /api/models/create` — Submits a prompt to invoke a background subprocess (`train_worker.py`) that generates the model. Returns an ID.
* `GET /api/training/status/{job_id}` — Polls the SQLite DB for model compilation progress.
* `GET /api/logs/{job_id}` — Text/Event-Stream (SSE) endpoint to stream real-time JSONL stdout logs directly from the active subprocess worker.
* `POST /api/models/{job_id}/predict` — Re-loads the compiled Hugging Face local pipeline to run inference.
* `GET /api/models/download/{job_id}` — Dynamically compresses the trained `.pt` tensors & configs into a `.zip` file for immediate download.

### Intelligence Cubes
* `POST /api/cubes/run` — Executes a direct command to a specific Cube agent via the ThreadPool registry wrapper.
  * *Payload*: `{ "cube_id": "legal", "input": "...text..." }`

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+**
- **Node.js 18+**
- **Docker** (optional but recommended)

### 1. Backend Setup

The backend leverages a dedicated internal environment for isolated AI processes.

```bash
cd backend
python -m venv venv

# Activate environment
source venv/bin/activate        # Linux/macOS
venv\Scripts\activate           # Windows

# Install libraries
pip install -r requirements.txt

# Run the FastAPI server
uvicorn app.api:app --reload --host 0.0.0.0 --port 8000
```
> The API will be available at `http://localhost:8000`

### 2. Frontend Setup

The frontend operates a rich 3D UI using Vite.

```bash
cd frontend
npm install
npm run dev
```
> The web interface will be available at `http://localhost:5173`

### 3. Docker Deployment (Recommended)

Containers abstract away local PyTorch configuration variances. 

```bash
# Build the backend environment with volume mounts
docker-compose up --build -d
```

### 📦 Git LFS & Model Caching
Because this repository holds serialized `temp_fp32.pt` tensor models under `/backend/`, **Git Large File Storage (LFS)** is strictly required to clone properly.

```bash
git lfs install
git lfs pull
```

---

## 🔮 Roadmap
- [ ] **Cube Marketplace** – User UI for hot-loading new agent logic.
- [ ] **Custom Fine-Tuning** – Expanded parameters for LoRa adapters via the UI.
- [ ] **Vector Database Expansion** – Upgrading Nexus Cube from SQLite to Milvus/Pinecone.
- [ ] **Multi-Tenancy Auth** – JWT handling for multi-tenant state persistence.
- [ ] **Cloud Deployment Templates** – Terraform templates for AWS EC2 / SageMaker orchestration.

---

## 🤝 Contributing
Contributions are highly welcomed! Whether adding new 3D visualizations, expanding the Cube Registry, or optimizing inference time—feel free to open a PR or submit an issue.

## 📄 License
*License information pending.*

⭐ **Final Note:** Reflex Cube v2 merges cutting-edge full-stack React principles with raw headless machine learning deployment architectures. Built for researchers, startups, and data-scientists who need an immersive interface for rigorous data logic.
