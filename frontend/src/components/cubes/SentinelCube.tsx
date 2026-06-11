import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Activity, Lock, Search, AlertTriangle, CheckCircle, Server, FileText, Settings, Download, Database } from 'lucide-react';
import { api } from '../../lib/api';

interface Threat {
    id: string;
    timestamp: string;
    ip: string;
    type: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    payload: string;
    action: string;
    explanation?: string;
}

interface LogEntry {
    id: string;
    timestamp: string;
    level: 'INFO' | 'WARN' | 'ERROR';
    source: string;
    message: string;
}

interface SentinelResult {
    logs: string[];
    threats: Threat[];
    system_status: string;
    active_firewall_rules: number;
}

const parseLog = (raw: string): LogEntry => {
    const parts = raw.match(/\[(.*?)\] \[(.*?)\] (.*?) - (.*)/);
    if (!parts) return { id: Math.random().toString(), timestamp: '-', level: 'INFO', source: 'UNKNOWN', message: raw };
    return {
        id: Math.random().toString(),
        timestamp: parts[1],
        level: parts[2] as 'INFO' | 'WARN' | 'ERROR',
        source: parts[3],
        message: parts[4]
    };
};

export default function SentinelCube() {
    const [activeTab, setActiveTab] = useState<'dashboard' | 'incidents' | 'rules' | 'compliance'>('dashboard');
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState<'normal' | 'attack'>('normal');
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [threats, setThreats] = useState<Threat[]>([]); // This is our 'history' now
    const [status, setStatus] = useState("SECURE");
    const [stats, setStats] = useState({ reqPerSec: 0, blocked: 1240, activeRules: 420 });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (running && activeTab === 'dashboard') {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs, running, activeTab]);

    // No auto-polling. We rely on manual triggers or websocket stream (future).
    useEffect(() => {
        if (!running) {
            setStatus("STANDBY");
        } else {
            setStatus(threats.length > 0 ? "CRITICAL" : "SECURE");
        }
    }, [running, threats]);


    // --- SUB-VIEWS ---

    const DashboardView = () => (
        <div className="flex-1 overflow-hidden flex bg-slate-950/50 relative">
            {/* Background Grid Pattern (Subtle) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            {/* Left Panel: Live Traffic & Logs */}
            <div className="flex-1 flex flex-col border-r border-slate-800 p-6 gap-6 overflow-hidden z-10">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-4 gap-4">
                    <div className="bg-background border border-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-slate-500 text-xs font-bold uppercase mb-1 flex items-center gap-2"><Activity size={12} /> Req / Sec</div>
                        <div className="text-2xl font-semibold text-foreground">{stats.reqPerSec.toLocaleString()}</div>
                    </div>
                    <div className="bg-background border border-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-slate-500 text-xs font-bold uppercase mb-1 flex items-center gap-2"><Lock size={12} /> Threats Blocked</div>
                        <div className="text-2xl font-semibold text-foreground">{stats.blocked.toLocaleString()}</div>
                    </div>
                    <div className="bg-background border border-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-slate-500 text-xs font-bold uppercase mb-1 flex items-center gap-2"><Server size={12} /> Active Nodes</div>
                        <div className="text-2xl font-semibold text-foreground">42</div>
                    </div>
                    <div className="bg-background border border-slate-800 p-4 rounded-lg shadow-sm">
                        <div className="text-slate-500 text-xs font-bold uppercase mb-1 flex items-center gap-2"><Search size={12} /> Log Volume</div>
                        <div className="text-2xl font-semibold text-foreground">1.2 TB</div>
                    </div>
                </div>

                {/* Live Log Table */}
                <div className="flex-1 bg-background border border-slate-800 rounded-lg overflow-hidden flex flex-col shadow-lg">
                    <div className="h-10 border-b border-slate-800 bg-slate-800/50 flex items-center px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        <div className="w-24">Timestamp</div>
                        <div className="w-20">Level</div>
                        <div className="w-40">Source IP</div>
                        <div className="flex-1">Message</div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 font-mono text-xs">
                        {logs.length === 0 && (
                            <div className="h-full flex items-center justify-center text-slate-600 italic">
                                System Standby. Initialize monitoring to view live streams.
                            </div>
                        )}
                        {logs.map((log) => (
                            <div key={log.id} className="flex hover:bg-slate-800/50 rounded p-1 transition-colors cursor-default items-start">
                                <div className="w-24 text-slate-500 shrink-0">{log.timestamp}</div>
                                <div className={`w-20 shrink-0 font-bold ${log.level === 'WARN' || log.message.includes('WARN') ? 'text-orange-400' : 'text-emerald-400'}`}>
                                    {log.level === 'WARN' || log.message.includes('WARN') ? 'WARN' : 'INFO'}
                                </div>
                                <div className="w-40 text-blue-400 shrink-0">{log.source}</div>
                                <div className={`flex-1 break-all ${log.message.includes('WARN') ? 'text-orange-200' : 'text-slate-300'}`}>
                                    {log.message}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>

            {/* Right Panel: Incident Feed */}
            <div className="w-96 bg-background border-l border-slate-800 flex flex-col z-10">
                <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-background">
                    <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                        <ShieldAlert size={16} className="text-red-500" /> Security Incidents
                    </h3>
                    {status === 'CRITICAL' && (
                        <span className="text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded animate-pulse">
                            LIVE THREATS
                        </span>
                    )}
                </div>

                {/* Manual Penetration Test Console */}
                <div className="p-4 border-b border-slate-800 bg-background/50">
                    <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 flex items-center gap-1">
                        <Activity size={10} /> Live Penetration Test
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Enter payload (e.g. <script>...)"
                            className="flex-1 bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    const target = e.target as HTMLInputElement;
                                    const payload = target.value;
                                    if (!payload) return;

                                    // Send Manual Check
                                    api.post('/cubes/run', {
                                        cube_id: 'sentinel',
                                        input: { manual_payload: payload }
                                    }).then(res => res.data).then(data => {
                                        if (data.status === 'success') {
                                            const resData = data.data as SentinelResult;
                                            const newLogs = resData.logs.map(parseLog);
                                            setLogs(prev => [...prev.slice(-100), ...newLogs]);

                                            // Handle manual threat visual
                                            if (resData.threats.length > 0) {
                                                const newThreats = resData.threats.map((t: Omit<Threat, 'id'>) => ({
                                                    id: Math.random().toString(),
                                                    timestamp: t.timestamp,
                                                    ip: t.ip,
                                                    type: t.type,
                                                    severity: 'CRITICAL' as const,
                                                    payload: t.payload,
                                                    action: t.action,
                                                    explanation: t.explanation
                                                }));
                                                setThreats(prev => [...newThreats, ...prev].slice(0, 50));
                                                setStatus("CRITICAL");
                                            }
                                        }
                                    });
                                    target.value = '';
                                }
                            }}
                        />
                    </div>
                    <div className="text-[10px] text-slate-600 mt-1 italic">
                        Try: &lt;script&gt;alert(1)&lt;/script&gt; or ' OR 1=1
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    <AnimatePresence>
                        {threats.map((threat) => (
                            <motion.div
                                key={threat.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-slate-800 border border-slate-700 rounded-lg p-3 hover:border-slate-500 transition-colors shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle size={14} className="text-red-500" />
                                        <span className="text-red-400 font-bold text-xs">{threat.type}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-500">{threat.timestamp}</span>
                                </div>

                                <div className="space-y-1 mb-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Source:</span>
                                        <span className="font-mono text-slate-300">{threat.ip}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Action:</span>
                                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                                            <CheckCircle size={10} /> {threat.action}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-slate-950 p-2 rounded border border-slate-800">
                                    <code className="text-[10px] text-orange-300 break-all font-mono block">
                                        {threat.payload}
                                    </code>
                                </div>
                                {threat.explanation && (
                                    <div className="mt-2 bg-indigo-500/10 border border-indigo-500/20 p-2 rounded">
                                        <div className="text-[10px] font-bold text-indigo-400 mb-1 flex items-center gap-1">
                                            <Database size={10} /> AI Analysis
                                        </div>
                                        <p className="text-[10px] text-indigo-200 leading-relaxed">
                                            {threat.explanation}
                                        </p>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {threats.length === 0 && (
                        <div className="text-center py-12">
                            <CheckCircle size={48} className="text-slate-800 mx-auto mb-4" />
                            <p className="text-slate-600 text-sm">No active threats detected.</p>
                            <p className="text-slate-700 text-xs">System is monitoring traffic.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const IncidentsView = () => (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <ShieldAlert className="text-red-500" /> Incident History (Last 30 Days)
                </h2>
                <div className="bg-background border border-slate-800 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-800 text-slate-200 uppercase text-xs font-bold">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Severity</th>
                                <th className="px-6 py-4">Type</th>
                                <th className="px-6 py-4">Source IP</th>
                                <th className="px-6 py-4">Action Taken</th>
                                <th className="px-6 py-4">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {threats.map((t: Threat) => (
                                <tr key={t.id} className="hover:bg-slate-800/50">
                                    <td className="px-6 py-4 font-mono">{t.timestamp}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${t.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                                            {t.severity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-foreground font-medium">{t.type}</td>
                                    <td className="px-6 py-4 font-mono">{t.ip}</td>
                                    <td className="px-6 py-4 text-emerald-400 font-bold">{t.action}</td>
                                    <td className="px-6 py-4 max-w-xs truncate font-mono text-slate-500" title={t.payload}>{t.payload}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    interface SentinelRule {
        id: string;
        name: string;
        desc: string;
        pattern?: string;
        matches: number;
        status: 'Active' | 'Inactive';
    }

    const [showRuleModal, setShowRuleModal] = useState(false);
    const [newRule, setNewRule] = useState({ name: '', pattern: '', desc: '' });
    const [rulesList, setRulesList] = useState<SentinelRule[]>([]);

    useEffect(() => {
        // Fetch initial rules
        api.post('/cubes/run', { cube_id: 'sentinel', input: { action: 'get_rules' } })
        .then(res => res.data).then(data => {
            if (data.status === 'success') setRulesList(data.data);
        });
    }, []);

    // Re-enable polling for SIMULATION MODE ONLY
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (running && mode === 'attack') {
            interval = setInterval(async () => {
                try {
                    const res = await api.post('/cubes/run', {
                        cube_id: 'sentinel',
                        input: { simulation_mode: 'attack' }
                    });
                    const data = res.data;
                    if (data.status === 'success') {
                        const resData = data.data as SentinelResult;
                        const newLogs = resData.logs.map(parseLog);
                        setLogs(prev => [...prev.slice(-100), ...newLogs]);

                        if (resData.threats.length > 0) {
                            const newThreats = resData.threats.map((t: Omit<Threat, 'id'>) => ({
                                id: Math.random().toString(),
                                timestamp: t.timestamp,
                                ip: t.ip,
                                type: t.type,
                                severity: 'CRITICAL' as const,
                                payload: t.payload,
                                action: t.action
                            }));
                            setThreats(prev => [...newThreats, ...prev].slice(0, 50));
                            setStatus("CRITICAL");
                        }
                    }
                } catch (e) { console.error(e); }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [running, mode]);

    const handleAddRule = async () => {
        if (!newRule.name || !newRule.pattern) return;
        await api.post('/cubes/run', {
            cube_id: 'sentinel',
            input: { action: 'add_rule', rule: newRule }
        });
        // Refresh rules
        const res = await api.post('/cubes/run', { cube_id: 'sentinel', input: { action: 'get_rules' } });
        const data = res.data;
        setRulesList(data.data);
        setShowRuleModal(false);
        setNewRule({ name: '', pattern: '', desc: '' });
    };

    const RulesEngineView = () => (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto h-full relative">
            {showRuleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                    <div className="bg-background border border-slate-700 p-6 rounded-lg w-96 shadow-2xl">
                        <h3 className="text-xl font-bold text-foreground mb-4">Add WAF Rule</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Rule Name</label>
                                <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-foreground"
                                    value={newRule.name} onChange={e => setNewRule({ ...newRule, name: e.target.value })} placeholder="e.g. Block Admin Login" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Regex Pattern</label>
                                <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm font-mono text-orange-300"
                                    value={newRule.pattern} onChange={e => setNewRule({ ...newRule, pattern: e.target.value })} placeholder="e.g. /admin|root/" />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Description</label>
                                <input className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-foreground"
                                    value={newRule.desc} onChange={e => setNewRule({ ...newRule, desc: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setShowRuleModal(false)} className="px-4 py-2 text-sm text-slate-400 hover:text-foreground">Cancel</button>
                            <button onClick={handleAddRule} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-foreground rounded text-sm font-bold">Add Rule</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto pb-20">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                        <Settings className="text-indigo-500" /> Rules Engine & Heuristics
                    </h2>
                    <button onClick={() => setShowRuleModal(true)} className="bg-indigo-600 hover:bg-indigo-500 text-foreground px-4 py-2 rounded text-sm font-bold flex items-center gap-2">
                        + Add New WAF Rule
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {rulesList.length === 0 && <p className="text-slate-500">Loading rules...</p>}
                    {rulesList.map((rule: SentinelRule) => (
                        <div key={rule.id} className="bg-background border border-slate-800 p-6 rounded-lg flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-bold text-lg text-foreground">{rule.name}</h3>
                                    <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">{rule.id}</span>
                                </div>
                                <p className="text-slate-400 text-sm">{rule.desc}</p>
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <div className="text-xl font-bold text-foreground">{rule.matches.toLocaleString()}</div>
                                    <div className="text-xs text-slate-500 uppercase">Hits</div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${rule.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>
                                    {rule.status}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const handleDownload = async (reportType: string) => {
        try {
            const res = await api.post('/cubes/run', {
                cube_id: 'sentinel',
                input: { action: 'generate_report', report_type: reportType }
            });
            const data = res.data;

            if (data.status === 'success') {
                // Trigger Browser Download
                const blob = new Blob([data.content], { type: data.mime });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = data.filename;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } else {
                alert("Failed to generate report: " + data.message);
            }
        } catch (e) {
            console.error(e);
            alert("Error downloading report.");
        }
    };

    const ComplianceView = () => (
        <div className="flex-1 bg-slate-950 p-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto text-center py-12">
                <Shield className="w-24 h-24 text-indigo-500 mx-auto mb-6 opacity-20" />
                <h2 className="text-3xl font-bold text-foreground mb-4">Enterprise Compliance Center</h2>
                <p className="text-slate-400 mb-12 max-w-lg mx-auto">
                    Generate audit-ready reports for SOC2, ISO 27001, and GDPR compliance verification.
                    Sentinel logs are immutable and cryptographically signed.
                </p>

                <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {[
                        { name: "SOC2 Security Report", fmt: "JSON", size: "LIVE", type: "SOC2" },
                        { name: "GDPR Data Access Log", fmt: "CSV", size: "LIVE", type: "GDPR" },
                        { name: "ISO 27001 Threat Audit", fmt: "TXT", size: "LIVE", type: "ISO" },
                    ].map((file, i) => (
                        <div key={i} className="bg-background border border-slate-800 p-6 rounded-lg text-left hover:border-indigo-500/50 transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-slate-800 p-3 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                                    <FileText className="text-indigo-400" size={24} />
                                </div>
                                <span className="text-xs font-mono text-slate-500">{file.fmt}</span>
                            </div>
                            <h3 className="font-bold text-slate-200 mb-1">{file.name}</h3>
                            <p className="text-sm text-slate-500 mb-4">{file.size}</p>
                            <button
                                onClick={() => handleDownload(file.type)}
                                className="w-full py-2 rounded border border-slate-700 text-slate-300 text-sm font-bold hover:bg-slate-800 hover:text-foreground flex items-center justify-center gap-2"
                            >
                                <Download size={14} /> Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="h-full w-full bg-slate-950 text-slate-200 font-sans overflow-hidden flex flex-col">
            {/* Top Navigation Bar - Enterprise Style */}
            <header className="h-16 border-b border-slate-800 bg-background/50 backdrop-blur-md flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-indigo-400">
                        <Shield className="w-6 h-6" />
                        <span className="font-bold tracking-tight text-foreground">SENTINEL</span>
                    </div>
                    <div className="h-6 w-px bg-slate-700 mx-2" />
                    <nav className="flex gap-6 text-sm font-medium text-slate-400">
                        <button
                            onClick={() => setActiveTab('dashboard')}
                            className={`${activeTab === 'dashboard' ? 'text-foreground border-b-2 border-indigo-500 pb-[21px]' : 'hover:text-foreground transition-colors pb-[23px]'}`}
                        >
                            Dashboard
                        </button>
                        <button
                            onClick={() => setActiveTab('incidents')}
                            className={`${activeTab === 'incidents' ? 'text-foreground border-b-2 border-indigo-500 pb-[21px]' : 'hover:text-foreground transition-colors pb-[23px]'}`}
                        >
                            Incidents
                        </button>
                        <button
                            onClick={() => setActiveTab('rules')}
                            className={`${activeTab === 'rules' ? 'text-foreground border-b-2 border-indigo-500 pb-[21px]' : 'hover:text-foreground transition-colors pb-[23px]'}`}
                        >
                            Rules Engine
                        </button>
                        <button
                            onClick={() => setActiveTab('compliance')}
                            className={`${activeTab === 'compliance' ? 'text-foreground border-b-2 border-indigo-500 pb-[21px]' : 'hover:text-foreground transition-colors pb-[23px]'}`}
                        >
                            Compliance
                        </button>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${status === 'CRITICAL' ? 'bg-red-500 animate-pulse' : running ? 'bg-green-500' : 'bg-slate-500'}`} />
                        {status}
                    </div>
                    {activeTab === 'dashboard' && (
                        <div className="flex items-center gap-2">
                            <div className="text-[10px] text-emerald-500 font-mono bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 mr-2">
                                LIVE PROTECTION ACTIVE
                            </div>
                            <button
                                onClick={() => {
                                    setMode(mode === 'normal' ? 'attack' : 'normal');
                                    setRunning(true);
                                }}
                                className={`text-xs font-bold px-3 py-1.5 rounded transition-colors uppercase tracking-wider ${mode === 'attack' ? 'bg-red-500/20 text-red-400 border border-red-500/50 animate-pulse' : 'bg-slate-800 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/10'}`}
                            >
                                {mode === 'attack' ? 'STOP ATTACK SIM' : '▶ RUN ATTACK SIMULATION'}
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Content Area Switcher */}
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'incidents' && <IncidentsView />}
            {activeTab === 'rules' && <RulesEngineView />}
            {activeTab === 'compliance' && <ComplianceView />}

        </div>
    );
}
