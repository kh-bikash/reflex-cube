import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Terminal, Play, Zap } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

export const NexusLLM = () => {
    const [prompt, setPrompt] = useState('Write a haiku about a robot who loves to cook.');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRun = async () => {
        if (!prompt.trim()) return;
        setLoading(true);
        setOutput('');
        try {
            const response = await api.post('/cubes/run', {
                cube_id: 'nexus',
                input: {
                    text: prompt,
                    mode: 'raw'
                }
            });

            if (response.data.status === 'error') {
                toast.error("Generation Failed");
                setOutput(`Error: ${response.data.message}`);
            } else {
                setOutput(response.data.reply);
            }
        } catch (error) {
            toast.error("Connection Failed");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-background font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full h-full bg-[#0D1117] border border-border shadow-2xl flex flex-col overflow-hidden font-mono"
            >
                {/* Header */}
                <div className="h-12 border-b border-border flex items-center px-4 bg-[#161B22]">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Terminal size={14} className="text-indigo-400" />
                        <span>Nexus LLM Runtime</span>
                        <span className="bg-indigo-500/20 text-[10px] px-1.5 py-0.5 rounded text-indigo-200 border border-indigo-500/30">NEXUS-CORE-V1</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Input Panel */}
                    <div className="w-full md:w-1/2 p-0 flex flex-col border-r border-border bg-[#0D1117]">
                        <div className="flex-1 relative">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full h-full bg-transparent p-6 text-emerald-100 resize-none focus:outline-none placeholder:text-foreground/20 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/10"
                                placeholder="// Enter your prompt here..."
                                spellCheck={false}
                            />
                            <div className="absolute bottom-6 right-6">
                                <button
                                    onClick={handleRun}
                                    disabled={loading || !prompt.trim()}
                                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-foreground px-5 py-2.5 rounded shadow-lg shadow-emerald-900/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {loading ? (
                                        <Zap size={16} className="animate-spin" />
                                    ) : (
                                        <Play size={16} className="fill-current" />
                                    )}
                                    <span className="font-bold text-xs tracking-wider uppercase">{loading ? 'Running...' : 'Generate'}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className="w-full md:w-1/2 flex flex-col bg-[#010409]">
                        <div className="px-4 py-2 border-b border-border text-xs text-muted-foreground uppercase tracking-widest font-bold flex justify-between">
                            <span>Console Output</span>
                            {output && <span className="text-emerald-500">Finished</span>}
                        </div>
                        <div className="flex-1 p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                            {output ? (
                                <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono leading-relaxed animate-in fade-in duration-300">
                                    {output}
                                </pre>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-foreground/10 select-none">
                                    <Terminal size={48} className="mb-4 opacity-50" />
                                    <p className="text-sm">Ready to execute.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
