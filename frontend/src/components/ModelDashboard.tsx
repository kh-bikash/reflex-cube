import React, { useEffect, useState } from "react";
import { getAllModels, requestModelZip } from "../lib/api";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Badge } from "../components/ui/badge";
import { Play, Download, Cpu, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface ModelJob {
  id: string;
  name: string;
  prompt: string;
  status: string;
  progress: number;
  result_path?: string;
  metadata?: any;
  error?: string;
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
                {jobs.filter(j => j.status !== "completed").length === 0 ? (
                  <p className="text-muted-foreground text-sm">No active sessions. Start training a new model!</p>
                ) : (
                  jobs
                    .filter(j => j.status !== "completed")
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
                            <span className="text-muted-foreground">Progress</span>
                            <span className="text-foreground">{job.progress?.toFixed(1)}%</span>
                          </div>
                          <Progress value={job.progress || 0} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{job.status === "running" ? "Training in progress..." : "Queued"}</span>
                            <span>ID: {job.id.slice(0, 8)}...</span>
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
                          <CheckCircle className="w-4 h-4 text-ai-green" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Completed model • {job.id.slice(0, 6)}...</p>
                        <Button
                          size="sm"
                          variant="ai-outline"
                          className="w-full"
                          onClick={() => handleDownload(job.id)}
                        >
                          <Download className="w-3 h-3" />
                          Download ZIP
                        </Button>
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
