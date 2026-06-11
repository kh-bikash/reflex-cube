# 🧊 Reflex Cube v2
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
  <img src="https://img.shields.io/badge/LLM--Sandbox-NanoGPT-ff007f?logo=pytorch"/>
  <img src="https://img.shields.io/badge/Cubes%20Registry-15%20Active-00f2fe"/>
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue?logo=python"/>
  <img src="https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi"/>
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?logo=react"/>
  <img src="https://img.shields.io/badge/Three.js-3D_UI-black?logo=three.js"/>
</p>

---

## 🚀 Overview

**Reflex Cube v2** is a modular AI-powered platform designed to build, run, and visualize custom **AI models and intelligent applications directly from natural language prompts**. Combining deep learning backends with an immersive, interactive 3D WebGL user interface, it provides developers and researchers with a comprehensive playground for model generation, log monitoring, and intelligent agent simulation.

At the core of the platform is the **"Cube Architecture"**: independent, task-oriented AI modules (Cubes) executing isolated business logic, data evaluation, and ML predictions.

---

## 🧠 Core AI Engine: NanoGPT Architecture

The LLM Training Sandbox (**Forge Cube**) leverages a custom-implemented, hyper-scalable **NanoGPT Causal Transformer** model built in PyTorch. Below is the interactive visual mapping of the forward pass dataflow inside a single Transformer Block.

### 📊 Interactive Dataflow Diagram

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 850 980" width="100%" style="background:#0b0f19; border-radius:12px; font-family:system-ui, -apple-system, sans-serif;">
  <defs>
    <!-- Glow filter -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="subtle-glow" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <!-- Gradients -->
    <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="100%" stop-color="#4facfe" />
    </linearGradient>
    <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#b92b27" />
      <stop offset="100%" stop-color="#1565c0" />
    </linearGradient>
    <linearGradient id="grad-pink" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ff007f" />
      <stop offset="100%" stop-color="#7f00ff" />
    </linearGradient>
    <linearGradient id="grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd700" />
      <stop offset="100%" stop-color="#ff8c00" />
    </linearGradient>
    <linearGradient id="grad-green" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00ff87" />
      <stop offset="100%" stop-color="#60efff" />
    </linearGradient>
  </defs>

  <style>
    @keyframes pulse {
      0% { stroke-dashoffset: 80; }
      100% { stroke-dashoffset: 0; }
    }
    @keyframes pulse-fast {
      0% { stroke-dashoffset: 40; }
      100% { stroke-dashoffset: 0; }
    }
    .flow-line {
      stroke-dasharray: 8, 8;
      animation: pulse 3s linear infinite;
    }
    .flow-line-fast {
      stroke-dasharray: 6, 6;
      animation: pulse-fast 1.5s linear infinite;
    }
    .block-card {
      transition: all 0.3s ease;
    }
    .block-card:hover {
      filter: brightness(1.2);
    }
    .text-title {
      font-size: 18px;
      font-weight: bold;
      fill: #ffffff;
    }
    .text-subtitle {
      font-size: 11px;
      fill: #8a99ad;
    }
    .text-node {
      font-size: 12px;
      font-weight: 600;
      fill: #ffffff;
    }
    .text-dim {
      font-size: 10px;
      fill: #a0aec0;
      font-family: monospace;
    }
  </style>

  <!-- Title / Header -->
  <rect x="0" y="0" width="850" height="70" fill="#0f172a" rx="12" />
  <text x="30" y="42" class="text-title" fill="url(#grad-cyan)" filter="url(#subtle-glow)">NanoGPT LLM Block Architecture</text>
  <text x="30" y="58" class="text-subtitle">Execution Dataflow Visualizer (FastAPI &lt;&gt; PyTorch Causal Transformer)</text>
  <rect x="700" y="23" width="120" height="26" fill="#1e293b" rx="6" stroke="#334155" />
  <text x="760" y="40" font-size="11" font-weight="bold" fill="#00ff87" text-anchor="middle" filter="url(#subtle-glow)">● ACTIVE CUBE</text>

  <!-- Step 1: Input Tokens & Embedding -->
  <g transform="translate(100, 100)">
    <rect x="0" y="0" width="220" height="50" fill="#131924" rx="8" stroke="#3b82f6" stroke-width="1.5" />
    <text x="15" y="22" class="text-node">Input Sequence (Prompt)</text>
    <text x="15" y="38" class="text-dim">idx: [B, T] (integer tokens)</text>
    <circle cx="200" cy="25" r="5" fill="#3b82f6" />
  </g>

  <!-- WTE (Token Embed) -->
  <g transform="translate(100, 180)">
    <rect x="0" y="0" width="100" height="50" fill="#1e293b" rx="6" stroke="#4facfe" stroke-width="1" />
    <text x="10" y="24" class="text-node">wte (Embed)</text>
    <text x="10" y="40" class="text-dim">wte: [V, C]</text>
  </g>

  <!-- WPE (Positional Embed) -->
  <g transform="translate(220, 180)">
    <rect x="0" y="0" width="100" height="50" fill="#1e293b" rx="6" stroke="#4facfe" stroke-width="1" />
    <text x="10" y="24" class="text-node">wpe (Pos)</text>
    <text x="10" y="40" class="text-dim">wpe: [T, C]</text>
  </g>

  <!-- Add Node (WTE + WPE) -->
  <circle cx="210" cy="270" r="16" fill="#1e293b" stroke="#00f2fe" stroke-width="2" filter="url(#subtle-glow)" />
  <text x="210" y="274" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">+</text>
  <text x="235" y="274" class="text-dim">x = tok_emb + pos_emb [B, T, C]</text>

  <!-- Links Token Input to Embeddings -->
  <path d="M 210,150 L 150,150 L 150,180" fill="none" stroke="#3b82f6" stroke-width="2" />
  <path d="M 210,150 L 270,150 L 270,180" fill="none" stroke="#3b82f6" stroke-width="2" />
  
  <path d="M 150,230 L 150,250 L 196,264" fill="none" stroke="#4facfe" stroke-width="2" />
  <path d="M 270,230 L 270,250 L 224,264" fill="none" stroke="#4facfe" stroke-width="2" />

  <!-- Flow lines to Transformer Block -->
  <path d="M 210,286 L 210,320" fill="none" stroke="#00f2fe" stroke-dasharray="6,6" stroke-width="2" class="flow-line" />

  <!-- SECTION 2: TRANSFORMER BLOCK (n_layer repetitions) -->
  <!-- Outer Box for Block -->
  <g transform="translate(60, 320)">
    <rect x="0" y="0" width="730" height="380" fill="#0c111d" rx="10" stroke="#ff007f" stroke-width="1.5" stroke-opacity="0.6" />
    <text x="20" y="25" fill="#ff007f" font-weight="bold" font-size="13" filter="url(#subtle-glow)">TRANSFORMER BLOCK [Block Layer - Pre-LN Pattern]</text>
    <text x="710" y="25" class="text-dim" text-anchor="end">Block x (Layer Norm -> Attn/MLP -> Residual)</text>
  </g>

  <!-- LayerNorm 1 -->
  <g transform="translate(110, 360)">
    <rect x="0" y="0" width="200" height="40" fill="#1e293b" rx="6" stroke="#ffd700" stroke-width="1" />
    <text x="15" y="24" class="text-node">ln_1 (LayerNorm)</text>
    <text x="140" y="24" class="text-dim">[B, T, C]</text>
  </g>

  <!-- Causal Self-Attention (Attention Heads) -->
  <g transform="translate(110, 430)">
    <rect x="0" y="0" width="200" height="90" fill="#161b26" rx="8" stroke="#00ff87" stroke-width="2" />
    <text x="15" y="25" class="text-node">CausalSelfAttention</text>
    <text x="15" y="42" font-size="10" fill="#8a99ad">Q, K, V Projections (c_attn)</text>
    <text x="15" y="58" font-size="10" fill="#8a99ad">Masked Scaled Dot-Product</text>
    <text x="15" y="75" font-size="9" fill="#00ff87" font-weight="bold">Multi-Head (n_head=4)</text>
    <text x="140" y="75" class="text-dim">c_proj</text>
  </g>

  <!-- Residual Add 1 -->
  <circle cx="210" cy="570" r="16" fill="#1e293b" stroke="#ff007f" stroke-width="2" />
  <text x="210" y="575" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">+</text>
  <text x="235" y="575" class="text-dim">x = x + attn(ln_1(x))</text>

  <!-- Data Flow LayerNorm 1 -> Attn -> Add 1 -->
  <path d="M 210,306 L 210,360" fill="none" stroke="#00f2fe" stroke-width="2" />
  <path d="M 210,400 L 210,430" fill="none" stroke="#ffd700" stroke-width="2" />
  <path d="M 210,520 L 210,554" fill="none" stroke="#00ff87" stroke-width="2" />

  <!-- Residual Bypass Path 1 -->
  <!-- Starts before LN1 (y=340) goes left, down, and into Add 1 (y=570) -->
  <path d="M 210,340 L 90,340 L 90,570 L 194,570" fill="none" stroke="#ff007f" stroke-width="2" stroke-dasharray="6,6" class="flow-line-fast" />

  <!-- Flow Line to LayerNorm 2 -->
  <path d="M 210,586 L 210,630 M 210,630 L 460,630 L 460,340 M 460,340 L 510,340" fill="none" stroke="#00f2fe" stroke-width="2" />

  <!-- LayerNorm 2 -->
  <g transform="translate(510, 360)">
    <rect x="0" y="0" width="200" height="40" fill="#1e293b" rx="6" stroke="#ffd700" stroke-width="1" />
    <text x="15" y="24" class="text-node">ln_2 (LayerNorm)</text>
    <text x="140" y="24" class="text-dim">[B, T, C]</text>
  </g>

  <!-- MLP Block -->
  <g transform="translate(510, 430)">
    <rect x="0" y="0" width="200" height="90" fill="#161b26" rx="8" stroke="#7f00ff" stroke-width="2" />
    <text x="15" y="25" class="text-node">MLP (Feed Forward)</text>
    <text x="15" y="45" font-size="10" fill="#8a99ad">c_fc: linear C → 4C</text>
    <text x="15" y="60" font-size="10" fill="#00ff87">GELU Non-linearity</text>
    <text x="15" y="75" font-size="10" fill="#8a99ad">c_proj: linear 4C → C</text>
  </g>

  <!-- Residual Add 2 -->
  <circle cx="610" cy="570" r="16" fill="#1e293b" stroke="#ff007f" stroke-width="2" />
  <text x="610" y="575" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">+</text>
  <text x="635" y="575" class="text-dim">x = x + mlp(ln_2(x))</text>

  <!-- Data Flow LayerNorm 2 -> MLP -> Add 2 -->
  <path d="M 610,340 L 610,360" fill="none" stroke="#00f2fe" stroke-width="2" />
  <path d="M 610,400 L 610,430" fill="none" stroke="#ffd700" stroke-width="2" />
  <path d="M 610,520 L 610,554" fill="none" stroke="#7f00ff" stroke-width="2" />

  <!-- Residual Bypass Path 2 -->
  <!-- Starts before LN2 (y=340) goes right, down, and into Add 2 (y=570) -->
  <path d="M 610,340 L 730,340 L 730,570 L 626,570" fill="none" stroke="#ff007f" stroke-width="2" stroke-dasharray="6,6" class="flow-line-fast" />

  <!-- SECTION 3: OUTPUT PIPELINE -->
  <!-- Flow out of Block -->
  <path d="M 610,586 L 610,720 L 460,720 L 460,740" fill="none" stroke="#00f2fe" stroke-width="2" />

  <!-- final LayerNorm -->
  <g transform="translate(360, 740)">
    <rect x="0" y="0" width="200" height="40" fill="#1e293b" rx="6" stroke="#ffd700" stroke-width="1" />
    <text x="15" y="24" class="text-node">ln_f (Final LayerNorm)</text>
    <text x="140" y="24" class="text-dim">[B, T, C]</text>
  </g>

  <!-- lm_head (Linear Output Projection) -->
  <g transform="translate(360, 810)">
    <rect x="0" y="0" width="200" height="50" fill="#1e293b" rx="6" stroke="#ffd700" stroke-width="2" />
    <text x="15" y="25" class="text-node">lm_head (Linear Projection)</text>
    <text x="15" y="42" class="text-dim">tied weights with wte [C, V]</text>
  </g>

  <!-- Connection to Logits -->
  <path d="M 460,780 L 460,810" fill="none" stroke="#ffd700" stroke-width="2" />
  <path d="M 460,860 L 460,890" fill="none" stroke="#ff8c00" stroke-width="2" stroke-dasharray="6,6" class="flow-line" />

  <!-- Logits Box -->
  <g transform="translate(340, 890)">
    <rect x="0" y="0" width="240" height="60" fill="#131924" rx="8" stroke="#ff8c00" stroke-width="1.5" />
    <text x="15" y="22" class="text-node">Logits &amp; Inference Pipeline</text>
    <text x="15" y="38" class="text-dim">Softmax Probability (Temperature, Top-K)</text>
    <text x="15" y="52" class="text-dim">Output token prediction: [B, T, V]</text>
  </g>
</svg>
```

### 🧱 Core Architecture Sub-components

Based on the [model.py](file:///d:/Projects/reflexcube-v2/backend/app/cubes/forge_core/model.py) definition, here are the core sub-components governing training:

1. **`CausalSelfAttention`**:
   - Batched projection of input tokens into Query ($Q$), Key ($K$), and Value ($V$) tensors using `nn.Linear(n_embd, 3 * n_embd)`.
   - Single-sequence multi-head self-attention splitting with dimensions transposed for parallel head computation.
   - Strict causal triangular mask (`torch.tril`) registered as a buffer buffer, filling upcoming tokens to $-\infty$ to avoid looking ahead.
   - High-precision probability scoring via Softmax scaled by $1 / \sqrt{d_k}$.
2. **`MLP` (Multi-Layer Perceptron)**:
   - Feed forward expansion projecting the context from $C \to 4C$.
   - **GELU** (Gaussian Error Linear Unit) activation layer ensuring continuous gradient flow.
   - Down-projection returning to dimension $C$ with dropout regularization.
3. **`Block` (Transformer Block)**:
   - Implements **Pre-Layer Normalization** (Pre-LN) layout: normalization is applied *before* attention and MLP blocks, which stabilizes deeper model optimization.
   - Double residual additions ($x + \text{attn}(x)$ and $x + \text{mlp}(x)$) creating bypass pathways for easy backpropagation.
4. **`NanoGPT`**:
   - Consolidates a custom token vocabulary index dictionary `wte` and positional slot dictionary `wpe`.
   - Implements **Weight Tying** between the token embedding matrix and the final linear modeling head (`lm_head.weight = wte.weight`), reducing parameter counts and regularizing logit distribution.
   - Configurable hyperparameters include context length `block_size` (defaults to 128), layers `n_layer` (4), heads `n_head` (4), and embeddings `n_embd` (64).

---

## ✨ Key Capabilities

- **Prompt-Driven Generative ML Models**: Generate fully packaged PyTorch models (`.pt`) and configurations on the server through automated training subprocesses decoupled from the main FastAPI server loop.
- **Immersive 3D WebGL Canvas**: Interactive 3D visualization canvas powered by React Three Fiber (`@react-three/fiber`) allowing direct inspection and control of active AI cubes.
- **Asynchronous Worker Pipelines**: Real-time log streaming using Server-Sent Events (SSE) directly from isolated CLI workers (`train_worker.py`), preventing GIL locks or server blockages.
- **Impenetrable Security Shield (WAF)**: Active threat monitoring, custom rules engine, and compliance auditing in the Sentinel Cube.
- **Offline Mode & Model Archival**: Export trained weights instantly into standard zipped state-dicts (`.zip`), or test custom model predictions directly inside the browser.
- **State-driven local memory**: Persistent SQLite database containing job details, loss logs, and active configurations.

---

## 🧠 The 15 Intelligence Cubes Registry

The **Reflex Cube Registry** includes 15 specialized, isolated AI agents accessible from the gateway:

| Icon | Cube Name | Primary Function | Key Features & Implementation |
| :---: | :--- | :--- | :--- |
| 🧑‍💼 | **Talent Cube** | Recruitment & CV Parsing | Batchscreens candidate resumes against dynamic job descriptions, outputting match scores and hire recommendations. |
| 🔗 | **Nexus Cube** | Memory & Relational context | Collects continuous contextual knowledge and acts as a secondary brain database. |
| ⚖️ | **Legal Cube** | Contract Compliance | Parses legal documents, highlights liabilities, and evaluates contract compliance scores. |
| 🍳 | **Chef Cube** | Culinary AI | Analyzes food descriptions or ingredients and generates safety analysis and recipe steps. |
| 📈 | **Alpha Cube** | Financial Analysis | Fetches market details and calculates P/E, market capitalization, ratings, and investment theses. |
| 💼 | **Career Cube** | Career Growth | Builds personalized career paths and analyzes trajectory growth steps. |
| 🏷️ | **Brand Cube** | Marketing & Identity | Generates copy, corporate branding, and logo guidelines. |
| 🏋️ | **FitPal Cube** | Biometrics & Health | Designs custom workout regimens and monitors fitness metrics. |
| ✈️ | **Travel Cube** | Travel Planner | Generates comprehensive travel itineraries, budget estimates, and weather guides. |
| 🛡️ | **Sentinel Cube** | Cybersecurity & WAF | Monitors logs, simulates attack prevention, and manages custom firewall rules. |
| 📓 | **Ledger Cube** | Financial Forensic Audit | Compares invoice details with bank transactions, flagging discrepancies and fake vendors. |
| 🔨 | **Forge Cube** | LLM Training Sandbox | Architect, configure (layers, attention heads), and train mini language models from scratch. |
| 👁️ | **Vision Cube** | Neural Network Lab | Interactive image dataset loader with data augmentation configs, custom classification training, and X-Ray visualizer. |
| 💭 | **Dream Cube** | Generative Art & Ideation | Custom generative model pipeline for image-text prompt synthesis. |
| 🔍 | **Lens Cube** | OCR & Content Summarization | Performs optical character recognition on uploaded images and extracts clean text details. |

---

## 🛠️ Technology Stack

### Frontend UI / Visuals
- **Framework**: React 18, Vite, TypeScript
- **3D Render**: Three.js, React Three Fiber, React Three Drei
- **State Management**: Valtio
- **Animations**: Framer Motion, GSAP (Lenis Smooth Scroll)
- **Visualizations**: Recharts, TailwindCSS
- **Design System**: Shadcn UI (Radix Primitives)

### Backend Services
- **API Gateway**: Python 3.10+, FastAPI, Uvicorn
- **Execution Concurrency**: `subprocess.Popen` task delegation for CPU-bound training tasks.
- **Deep Learning**: PyTorch, Hugging Face Transformers
- **Database**: SQLite (via SQLAlchemy) configured with volume persistence.

---

## 📂 System Directory Structure

```text
📦 ReflexCube-v2
 ┣ 📂 backend
 ┃ ┣ 📂 app
 ┃ ┃ ┣ 📂 cubes           # The 15 Intelligence Cubes (e.g. sentinel.py, forge.py)
 ┃ ┃ ┣ 📂 routes          # Gateway API endpoints
 ┃ ┃ ┣ 📂 utils           # AI routers and db connectivity
 ┃ ┃ ┣ 📜 api.py          # FastAPI server entry point
 ┃ ┃ ┣ 📜 brain.py        # Relational inference logic
 ┃ ┃ ┣ 📜 models.py       # SQLAlchemy DB schemas
 ┃ ┃ ┗ 📜 trainer.py      # ML Model generation pipelines
 ┃ ┣ 📂 tests             # Verification tests
 ┃ ┣ 📜 train_worker.py   # Background process runner for ML models
 ┃ ┗ 📜 requirements.txt  # Python environment requirements
 ┣ 📂 frontend
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 components      # UI Bento grids, footers, & cubes pages
 ┃ ┃ ┃ ┗ 📂 cubes         # Frontend views for the 15 Registry cubes
 ┃ ┃ ┣ 📂 pages           # Router routes (e.g. CubePage, Services, Home)
 ┃ ┃ ┣ 📂 lib             # Core API wrappers & utilities
 ┃ ┃ ┣ 📜 App.tsx         # Route mappings
 ┃ ┃ ┗ 📜 main.tsx        # Render entrypoint
 ┃ ┗ 📜 eslint.config.js  # Code quality rules
 ┣ 📂 storage             # Output folder for zip models and SQLite DB files
 ┣ 📜 docker-compose.yml  # Deployment configuration
 ┗ 📜 README.md           # Documentation
```

---

## 🔌 API Reference

### 1. Training & Inference Models
* `POST /api/models/create` — Queues a prompt to start background model generation.
  * *Request*: `{ "name": "Model-Name", "prompt": "Text description...", "task": "classification" }`
  * *Response*: `{ "status": "queued", "job_id": "job-uuid" }`
* `GET /api/training/status/{job_id}` — Returns current compilation progress, epoch metrics, and status.
* `GET /api/logs/{job_id}` — Text/Event-Stream (SSE) logs streamed directly from standard out.
* `POST /api/models/{job_id}/predict` — Runs custom text inference with the trained model.
  * *Request*: `{ "text": "Inference input" }`
* `GET /api/models/download-zip-stream/{job_id}` — Streams the compiled `.pt` state dict zip archive.

### 2. Direct Cube Actions
* `POST /api/cubes/run` — Executes actions on a specific registered Cube.
  * *Payload Example (yFinance audit)*: `{ "cube_id": "alpha", "input": { "text": "TSLA" } }`
  * *Payload Example (Forensic check)*: `{ "cube_id": "ledger", "input": { "invoices": "...", "bank_feed": "..." } }`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- **Python 3.10+** (with pip)
- **Git & Git LFS** (Required to pull local `.pt` test weight cache)

### 📦 Git LFS Installation
Ensure you pull the large tensor files before running the project:
```bash
git lfs install
git lfs pull
```

### 1. Backend Launch
Setup a virtual environment and launch FastAPI:
```bash
cd backend
python -m venv venv

# Activate venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.api:app --reload --host 0.0.0.0 --port 8000
```
FastAPI Swagger will be live at `http://localhost:8000/docs`.

### 2. Frontend Launch
Install dependencies and run the Vite dev server:
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` to explore the dashboard.

### 3. Running Stability Tests
Ensure correct routing and fallback connectivity:
```bash
python backend/tests/verify_stability.py
```

---

## 🤝 Contributing
Feel free to open issues or submit PRs to expand the AI Cube Registry, improve WebGL rendering, or build additional deep learning models.

## 📄 License
MIT License.
