import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, DollarSign, Activity, PieChart, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

interface AlphaCubeProps {
    onClose: () => void;
}

export const AlphaCube = ({ onClose }: AlphaCubeProps) => {
    const [ticker, setTicker] = useState('AAPL');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = async () => {
        if (!ticker) return;
        setLoading(true);
        try {
            const response = await api.post('/cubes/run', {
                cube_id: 'alpha',
                input: { text: ticker }
            });
            if (response.data.status === 'error') {
                toast.error(response.data.message);
            } else {
                setResult(response.data);
                toast.success("Analysis complete!");
            }
        } catch (error) {
            toast.error("Failed to analyze stock.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
        >
            <div className="bg-midnight-900 border border-white/10 w-full max-w-4xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[600px]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/60 hover:text-white transition-colors z-20"
                >
                    <X size={20} />
                </button>

                {/* Left Panel: Input */}
                <div className="w-full md:w-1/3 p-8 border-b md:border-b-0 md:border-r border-white/5 flex flex-col bg-black/40">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center text-green-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">Alpha Cube</h2>
                            <p className="text-white/40 text-sm">Autonomous Analyst</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Stock Ticker</label>
                            <input
                                type="text"
                                value={ticker}
                                onChange={(e) => setTicker(e.target.value.toUpperCase())}
                                placeholder="E.g. TSLA"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-green-500/50 transition-colors font-mono text-xl"
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className="w-full py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>Analyzing...</>
                            ) : (
                                <>
                                    <Activity size={18} /> Run Analysis
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/5 text-xs text-white/30">
                        <p>Powered by yFinance & LLM.</p>
                        <p>Not financial advice.</p>
                    </div>
                </div>

                {/* Right Panel: Result */}
                <div className="w-full md:w-2/3 p-8 bg-black/20 overflow-y-auto custom-scrollbar relative">
                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-midnight-900/80 backdrop-blur-sm z-10">
                            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                            <p className="text-green-400 font-mono animate-pulse">READING MARKET DATA...</p>
                        </div>
                    )}

                    {result ? (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Header Stats */}
                            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                                <div>
                                    <h1 className="text-5xl font-mono font-bold text-white tracking-tighter mb-1">{result.ticker}</h1>
                                    <p className="text-white/40 text-sm">{result.sector}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-mono font-bold text-white">${result.price}</p>
                                    <div className={`inline-flex items-center gap-1 text-sm font-bold px-2 py-0.5 rounded ${result.rating === 'BUY' ? 'bg-green-500/20 text-green-400' : result.rating === 'SELL' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                        {result.rating}
                                    </div>
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 text-white/40 mb-2">
                                        <PieChart size={16} />
                                        <span className="text-xs uppercase font-bold tracking-wider">P/E Ratio</span>
                                    </div>
                                    <p className="text-2xl font-mono text-white">{result.pe_ratio ? result.pe_ratio.toFixed(2) : "N/A"}</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="flex items-center gap-2 text-white/40 mb-2">
                                        <DollarSign size={16} />
                                        <span className="text-xs uppercase font-bold tracking-wider">Market Cap</span>
                                    </div>
                                    <p className="text-lg font-mono text-white truncate">
                                        {result.market_cap ? (result.market_cap / 1e9).toFixed(2) + "B" : "N/A"}
                                    </p>
                                </div>
                            </div>

                            {/* Thesis */}
                            <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-xl border border-white/10">
                                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                    Investment Thesis
                                </h3>
                                <p className="text-white/80 leading-relaxed font-light italic border-l-2 border-green-500 pl-4 py-1">
                                    "{result.thesis}"
                                </p>
                            </div>

                            <div className="text-sm text-white/40 leading-relaxed">
                                {result.description}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-white/20">
                            <TrendingUp className="w-24 h-24 mb-4 opacity-20" />
                            <p className="text-lg">Ready to analyze markets.</p>
                            <p className="text-sm">Enter a ticker to begin.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
