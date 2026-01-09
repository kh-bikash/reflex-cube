// frontend/src/components/PromptModel.tsx
import React, { useState, useEffect } from "react";
import { createModel, getJobStatus, requestModelZip } from "../lib/api";
import { TrainingTerminal } from "./TrainingTerminal";
import { motion } from "framer-motion";

const PromptModel: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [jobId, setJobId] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("idle");
  const [progress, setProgress] = useState<number>(0);
  const [busy, setBusy] = useState(false);
  const [resultPath, setResultPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [zipBusy, setZipBusy] = useState(false);
  const [selectedTask, setSelectedTask] = useState("auto");

  const handleGenerate = async () => {
    if (!prompt.trim()) return setError("Please enter a prompt.");
    setBusy(true);
    setError(null);
    setStatus("queued");
    setProgress(0);
    setResultPath(null);
    try {
      const res = await createModel({
        name: "frontend-demo",
        prompt,
        task: selectedTask === "auto" ? undefined : selectedTask
      });
      setJobId(res.job_id);
    } catch (e: any) {
      setError(e.message || "Failed to create job");
      setBusy(false);
      setStatus("failed");
    }
  };

  useEffect(() => {
    if (!jobId) return;
    let stopped = false;
    const pollOnce = async () => {
      try {
        const data = await getJobStatus(jobId);
        if (stopped) return;
        setStatus(data.status);
        setProgress(Math.round(data.progress ?? 0));
        if (data.status === "completed") {
          setBusy(false);
          setResultPath(data.result_path ?? null);
        } else if (data.status === "failed") {
          setBusy(false);
        }
      } catch (e) {
        console.error("poll status error", e);
      }
    };

    // immediate poll + interval
    pollOnce();
    const intervalId = setInterval(pollOnce, 3000);

    return () => {
      stopped = true;
      clearInterval(intervalId);
    };
  }, [jobId]);

  const handleDownloadZip = async () => {
    if (!jobId) return alert("No job available to download.");
    setZipBusy(true);
    setError(null);

    try {
      const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

      // Prefer streaming endpoint which builds a zip in a temp dir and streams back
      const streamUrl = `${API}/api/models/download-zip-stream/${jobId}`;

      // Open the streaming URL in a new tab to trigger browser download.
      // Opening immediately on user click avoids popup blocking in most browsers.
      const win = window.open(streamUrl, "_blank");
      if (!win) {
        // Popup blocked — as a fallback, request the zip URL via the POST endpoint and navigate
        const z = await requestModelZip(jobId);
        const url = z?.url ?? z?.download_url;
        if (!url) throw new Error("No zip URL returned by server");
        const abs = url.startsWith("http") ? url : `${API}${url}`;
        window.location.href = abs;
      }
    } catch (err: any) {
      // Fallback: try POST /download-zip which creates a persistent zip in storage and returns URL
      try {
        const z = await requestModelZip(jobId);
        const API = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
        const url = z?.url ?? z?.download_url;
        if (url) {
          const abs = url.startsWith("http") ? url : `${API}${url}`;
          window.open(abs, "_blank");
        } else {
          throw new Error("No url returned from download-zip fallback");
        }
      } catch (fallbackErr: any) {
        console.error("zip fallback failed", fallbackErr);
        setError(
          "Failed to create or download zip. Check backend logs or try again. (" +
          (fallbackErr?.message || String(fallbackErr)) +
          ")"
        );
      }
    } finally {
      setZipBusy(false);
    }
  };

  return (
    <div className="prompt-model-wrapper max-w-2xl mx-auto p-4 pt-32">
      <h3 className="text-2xl font-semibold mb-4">Generate AI Model</h3>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type the prompt for model generation..."
        rows={6}
        className="prompt-textarea w-full rounded-md p-3 bg-background/30 border border-primary/10"
      />

      <div className="flex gap-4 mt-4 items-center">
        <select
          className="bg-zinc-900 border border-white/10 rounded px-3 py-2 text-sm text-zinc-300 focus:border-neon-cyan focus:outline-none"
          value={selectedTask}
          onChange={(e) => setSelectedTask(e.target.value)}
        >
          <option value="auto">Auto-Detect Service</option>
          <option value="text-generation">Text Generation (GPT)</option>
          <option value="sentiment-analysis">Sentiment Analysis</option>
          <option value="summarization">Summarization</option>
          <option value="translation">Translation</option>
          <option value="question-answering">Question Answering</option>
        </select>
        <span className="text-xs text-zinc-500">
          {selectedTask === 'auto' ? 'AI will decide the best architecture.' : 'Forces a specific model pipeline.'}
        </span>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={handleGenerate}
          disabled={busy}
          className="generate-btn px-4 py-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          {busy ? "Generating..." : "Generate Model"}
        </button>

        {status !== "idle" && (
          <button
            onClick={() => {
              setJobId(null);
              setStatus("idle");
              setProgress(0);
              setBusy(false);
              setResultPath(null);
              setError(null);
            }}
            className="px-4 py-2 rounded-md border border-primary/20 text-sm"
          >
            Reset
          </button>
        )}
      </div>

      {error && <div className="error-msg text-red-400 mt-3">{error}</div>}

      {status !== "idle" && (
        <div className="status-block mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium text-zinc-400">
              Status: <span className="text-neon-cyan uppercase">{status}</span>
            </div>
            <div className="text-xs font-mono text-zinc-500">{progress}%</div>
          </div>

          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden mb-6">
            <motion.div
              className="h-full bg-neon-cyan"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 50 }}
            />
          </div>

          <TrainingTerminal jobId={jobId!} />
        </div>
      )}

      {status === "completed" && jobId && (
        <div className="mt-4">
          <div className="mb-2">
            Job completed. ID: <code>{jobId}</code>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(jobId);
                alert("Job ID copied to clipboard");
              }}
              className="ml-3 px-2 py-1 text-xs border rounded"
            >
              Copy ID
            </button>
          </div>

          <a
            href={`${import.meta.env.VITE_API_URL}/api/models/download/${jobId}`}
            className="inline-block mr-3 underline"
            target="_blank"
            rel="noreferrer"
          >
            View model metadata (JSON)
          </a>

          <button
            className="px-3 py-2 rounded-md bg-ai-blue text-white"
            onClick={handleDownloadZip}
            disabled={zipBusy}
          >
            {zipBusy ? "Preparing ZIP..." : "Create & Download ZIP"}
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptModel;
