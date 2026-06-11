import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { openJobSSE } from "../lib/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LogEntry {
  step: number;
  loss?: number;
}

const TrainingMonitor = ({ jobId }: { jobId: string }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    if (!jobId) return;

    // Use centralized API helper
    const eventSrc = openJobSSE(jobId);

    eventSrc.onmessage = (e) => {
      try {
        const entry = JSON.parse(e.data);
        if (entry.loss) setLogs((prev) => [...prev, entry]);
      } catch (err) {
        console.warn("Failed to parse log message", err);
      }
    };

    eventSrc.onerror = (e) => {
      // Optional: handle error or close if needed
      // console.error("SSE error", e);
    };

    return () => eventSrc.close();
  }, [jobId]);

  const data = {
    labels: logs.map((l) => l.step),
    datasets: [
      {
        label: "Training Loss",
        data: logs.map((l) => l.loss),
        borderColor: "#4F46E5",
        fill: false,
      },
    ],
  };

  return (
    <div className="mt-6 p-4 bg-gray-900 rounded-xl text-white">
      <h3 className="text-lg mb-2 font-semibold">📈 Real-Time Training Logs</h3>
      {logs.length === 0 ? <p>Waiting for logs...</p> : <Line data={data} />}
    </div>
  );
};

export default TrainingMonitor;
