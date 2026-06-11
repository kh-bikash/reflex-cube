// frontend/src/lib/api.ts
const BASE = import.meta.env.VITE_API_URL || "";

export async function createModel(payload: { name: string; prompt: string; task?: string; }) {
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

export async function deleteModel(jobId: string) {
  const res = await fetch(`${BASE}/api/models/${jobId}`, {
    method: "DELETE"
  });
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
  const url = `${base}/api/logs/${jobId}`;
  return new EventSource(url);
}

export async function getAllModels() {
  const res = await fetch(`${BASE}/api/models/all`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function testModel(jobId: string, text: string) {
  const res = await fetch(`${BASE}/api/models/${jobId}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function downloadPdf(title: string, markdown: string) {
  const res = await fetch(`${BASE}/api/cubes/pdf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, markdown })
  });
  if (!res.ok) throw new Error(await res.text());
  
  // Download the blob
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${title.replace(/\s+/g, '_')}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}


export const api = {
  post: async (endpoint: string, data: unknown) => {
    const res = await fetch(`${BASE}/api${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return { data: await res.json() };
  },
  get: async (endpoint: string) => {
    const res = await fetch(`${BASE}/api${endpoint}`);
    if (!res.ok) throw new Error(await res.text());
    return { data: await res.json() };
  }
};
