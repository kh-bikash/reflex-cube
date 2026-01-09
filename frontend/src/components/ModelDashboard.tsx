import React, { useEffect, useState } from "react";
import { getAllModels, requestModelZip, deleteModel, testModel } from "../lib/api";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Play, Download, Cpu, Clock, CheckCircle, AlertTriangle, Trash2 } from "lucide-react";

interface ModelJob {
  id: string;
  name: string;
  prompt: string;
  status: string;
  progress: number;
  epoch?: number;
  loss?: number;
  accuracy?: number;
  result_path?: string;

  metadata?: any;
  error?: string;
  task?: string;
}

const ModelDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<ModelJob[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      const res = await getAllModels();
      setJobs(res);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch models:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = async (id: string) => {
    try {
      const z = await requestModelZip(id);
      if (z?.url) {
        window.open(z.url, "_blank");
      } else {
        alert("ZIP creation failed. Try again later.");
      }
    } catch {
      alert("Download failed. Please check the backend logs.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this model?")) return;
    try {
      await deleteModel(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch (e) {
      console.error(e);
      alert("Failed to delete model");
    }
  };

  const colorByStatus = (status: string) => {
    switch (status) {
      case "completed": return "text-ai-green";
      case "running": return "text-ai-blue";
      case "queued": return "text-muted-foreground";
      case "failed": return "text-red-500";
      default: return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <section className="py-24 text-center text-muted-foreground">
        <p>Loading models...</p>
      </section>
    );
  }

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Your AI Model Dashboard
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Monitor real-time training progress, analyze metrics, and manage your AI models — powered by your own backend.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="p-8 bg-gradient-card backdrop-blur-sm border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Live Jobs */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">Active Training Sessions</h3>
                {jobs.filter(j => j.status !== "completed" && j.status !== "failed").length === 0 ? (
                  <p className="text-muted-foreground text-sm">No active sessions. Start training a new model!</p>
                ) : (
                  jobs
                    .filter(j => j.status !== "completed" && j.status !== "failed")
                    .map((job) => (
                      <Card key={job.id} className="p-4 bg-secondary/30 border-ai-green/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-ai-green/20">
                              <Cpu className="w-4 h-4 text-ai-green" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">{job.name}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-1">{job.prompt}</p>
                            </div>
                          </div>
                          <Badge className="bg-ai-green/20 text-ai-green capitalize">{job.status}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-zinc-300">Progress</span>
                            <span className="text-white font-mono">{job.progress?.toFixed(1)}%</span>
                          </div>
                          <Progress value={job.progress || 0} className="h-2 bg-white/10" indicatorClassName="bg-ai-green" />
                          <div className="flex justify-between text-xs text-zinc-400 pt-2">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Epoch {job.epoch?.toFixed(1) || "0.0"}
                            </span>
                            <span className="flex items-center gap-1 text-red-400">
                              Loss: {job.loss?.toFixed(4) || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-zinc-500">
                            <span>{job.status === "running" ? "Training in progress..." : "Queued"}</span>
                            <span className="uppercase text-[10px] border border-white/10 px-1 rounded bg-black/50 text-zinc-300">{job.task || "GENERIC"}</span>
                          </div>
                        </div>
                      </Card>
                    ))
                )}
              </div>

              {/* Completed Jobs */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Models</h3>
                <div className="space-y-3">
                  {jobs
                    .filter(j => j.status === "completed")
                    .slice(0, 4)
                    .map((job) => (
                      <Card key={job.id} className="p-3 bg-secondary/20">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm text-foreground">{job.name}</h4>
                          <span className="text-xs bg-green-900/40 text-green-400 px-2 py-0.5 rounded-full border border-green-800">
                            Ready
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-400 mt-2">
                          <span>{job.prompt.substring(0, 30)}...</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="h-6 text-xs" onClick={() => handleDownload(job.id)}>
                              <Download className="w-3 h-3 mr-1" /> Save
                            </Button>
                            <Button size="sm" variant="destructive" className="h-6 text-xs" onClick={() => handleDelete(job.id)}>
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Test Interface */}
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <details className="text-xs group">
                            <summary className="cursor-pointer hover:text-primary transition-colors py-2 font-medium flex items-center gap-2">
                              <Play className="w-3 h-3" /> Test {job.task ? job.task.replace("-", " ") : "Model"}
                            </summary>
                            <div className="mt-2 space-y-2 pl-4 border-l border-white/10">
                              <textarea
                                id={`test-input-${job.id}`}
                                className="w-full text-xs bg-zinc-900 border border-white/20 rounded p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-neon-cyan/50 transition-colors font-mono"
                                placeholder={job.task === 'summarization' ? "Paste text to summarize..." : "Enter prompt..."}
                                rows={3}
                              />
                              <Button
                                size="sm"
                                className="w-full h-8 text-xs bg-primary/20 hover:bg-primary/30 border border-primary/30 text-white font-medium tracking-wide mt-2"
                                onClick={async () => {
                                  const input = (document.getElementById(`test-input-${job.id}`) as HTMLTextAreaElement).value;
                                  if (!input) return;
                                  const btn = document.getElementById(`test-btn-${job.id}`) as HTMLButtonElement;
                                  const out = document.getElementById(`test-out-${job.id}`) as HTMLDivElement;

                                  btn.disabled = true;
                                  btn.innerText = "Running Inference...";
                                  out.innerHTML = "<span class='animate-pulse'>Processing...</span>";

                                  try {
                                    const res = await testModel(job.id, input);
                                    let output = res.result;

                                    // Formatting based on task
                                    if (Array.isArray(output)) {
                                      // Classification / Sentiment
                                      if (output[0]?.label) {
                                        const score = (output[0].score * 100).toFixed(1);
                                        out.innerHTML = `
                                                            <div class="flex items-center gap-2">
                                                                <span class="px-2 py-1 rounded bg-purple-500/20 text-purple-200 font-bold uppercase border border-purple-500/30">${output[0].label}</span>
                                                                <span class="text-white font-mono text-xs">${score}% confidence</span>
                                                            </div>
                                                        `;
                                      } else {
                                        out.innerText = JSON.stringify(output, null, 2);
                                      }
                                    } else if (typeof output === 'object') {
                                      out.innerText = JSON.stringify(output, null, 2);
                                    } else {
                                      // Text Generation / Summarization
                                      out.innerText = output;
                                    }
                                  } catch (e) {
                                    out.innerText = "Error: Model not ready or inference failed.";
                                  } finally {
                                    btn.disabled = false;
                                    btn.innerText = "Run Prediction";
                                  }
                                }}
                                id={`test-btn-${job.id}`}
                              >
                                Run Prediction
                              </Button>
                              <div id={`test-out-${job.id}`} className="text-xs font-mono text-cyan-400 bg-black/60 p-3 rounded min-h-[40px] whitespace-pre-wrap border border-white/5"></div>
                            </div>
                          </details>
                        </div>
                      </Card>
                    ))}

                  {jobs.filter(j => j.status === "failed").length > 0 && (
                    <Card className="p-3 bg-secondary/20 border-red-500/30">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm text-foreground">Failed Models</h4>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      </div>
                      {jobs
                        .filter(j => j.status === "failed")
                        .map((f) => (
                          <p key={f.id} className="text-xs text-red-400 mb-1">
                            {f.name || f.id.slice(0, 8)} — {f.error?.slice(0, 80)}...
                          </p>
                        ))}
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ModelDashboard;
