// frontend/src/lib/api.ts
const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function createModel(payload: { name: string; prompt: string; }) {
  const res = await fetch(`${BASE}/api/models/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getJobStatus(jobId: string) {
  const res = await fetch(`${BASE}/api/training/status/${jobId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function requestModelZip(jobId: string) {
  const res = await fetch(`${BASE}/api/models/download-zip/${jobId}`, {
    method: "POST"
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function subscribeNewsletter(email: string) {
  const res = await fetch(`${BASE}/api/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

// SSE helper: returns EventSource (caller listens)
export function openJobSSE(jobId: string) {
  const base = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const url = `${base}/api/train/logs/${jobId}`;
  return new EventSource(url);
}

export async function getAllModels() {
  const res = await fetch(`${BASE}/api/models/all`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

