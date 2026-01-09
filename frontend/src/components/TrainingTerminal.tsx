import React, { useEffect, useRef, useState } from "react";
import { openJobSSE } from "../lib/api";
import { Terminal, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TrainingTerminalProps {
    jobId: string;
    className?: string;
}

export const TrainingTerminal: React.FC<TrainingTerminalProps> = ({ jobId, className = "" }) => {
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (!jobId) return;

        let evtSource: EventSource | null = null;
        let retryTimeout: NodeJS.Timeout;

        const connect = () => {
            setLogs(prev => [...prev, "Connecting to REFLEX Kernel..."]);
            evtSource = openJobSSE(jobId);

            evtSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.stage) {
                        setLogs(prev => [...prev, `[${data.stage.toUpperCase()}] ${JSON.stringify(data)}`]);
                    } else if (data.loss) {
                        setLogs(prev => [...prev, `[TRAIN] Epoch ${data.epoch?.toFixed(2) || '?'} | Loss: ${data.loss.toFixed(4)} | LR: ${data.learning_rate?.toExponential(2) || 'N/A'}`]);
                    } else {
                        setLogs(prev => [...prev, JSON.stringify(data)]);
                    }
                } catch {
                    // Ignore parsing errors for raw text or keepalives
                }
            };

            evtSource.onerror = () => {
                evtSource?.close();
                // Auto-retry connection if dropped (e.g. backend restarting)
                retryTimeout = setTimeout(connect, 3000);
            };
        };

        connect();

        return () => {
            evtSource?.close();
            clearTimeout(retryTimeout);
        };
    }, [jobId]);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <motion.div
            layout
            className={`rounded-lg overflow-hidden border border-white/10 bg-black/90 font-mono text-sm shadow-2xl ${className} ${expanded ? 'fixed inset-4 z-50' : 'relative h-64'}`}
        >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2 text-zinc-400">
                    <Terminal className="w-4 h-4" />
                    <span className="text-xs font-medium tracking-wider">REFLEX//KERNEL_LOGS</span>
                </div>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-1 hover:bg-white/10 rounded transition-colors text-zinc-400"
                >
                    {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
            </div>

            {/* Logs Area */}
            <div
                ref={scrollRef}
                className={`p-4 overflow-y-auto space-y-1 font-mono text-xs md:text-sm ${expanded ? 'h-[calc(100%-40px)]' : 'h-[calc(100%-40px)]'}`}
            >
                {logs.length === 0 && <span className="text-zinc-600 animate-pulse">Waiting for stream...</span>}
                {logs.map((log, i) => (
                    <div key={i} className="break-all mb-1 font-mono text-xs md:text-sm">
                        <span className="text-zinc-500 mr-2">$</span>
                        <span className={log.toLowerCase().includes("error") ? "text-red-500" : "text-green-400 font-bold"}>
                            {log}
                        </span>
                    </div>
                ))}
                {/* Blinking cursor */}
                <div className="inline-block w-2 h-4 bg-neon-cyan/50 animate-pulse align-middle ml-1" />
            </div>
        </motion.div>
    );
};
