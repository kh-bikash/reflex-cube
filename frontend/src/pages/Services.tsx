import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChefHat, TrendingUp, Brain, Scan, FileText, Palette, Scale, Dumbbell, Map, Shield, DollarSign,
    Terminal, Users, Eye, Sparkles, Database, Code, Globe, AtSign
} from 'lucide-react';

const services = [
    {
        id: 'research',
        title: 'Research Cube',
        icon: Globe,
        description: 'OSINT & Web Research',
        detail: 'Deep dive topics using SerpApi and Apify.',
        color: 'from-blue-500 to-indigo-600',
        status: 'New',
        category: 'Data & Intelligence',
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'social',
        title: 'Social Cube',
        icon: AtSign,
        description: 'Instagram Profiler',
        detail: 'Scrape and analyze Instagram brands.',
        color: 'from-pink-500 to-rose-600',
        status: 'New',
        category: 'Data & Intelligence',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'alpha',
        title: 'Alpha Cube',
        icon: TrendingUp,
        description: 'Financial Analyst',
        detail: 'Real-time stock analysis (P/E, Debt) with Invest/Hold ratings.',
        color: 'from-green-400 to-emerald-600',
        status: 'Ready',
        category: 'Data & Intelligence',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'lens',
        title: 'Lens Cube',
        icon: Scan,
        description: 'Universal Scanner',
        detail: 'Identify plants, coins, or extract text from documents (OCR).',
        color: 'from-blue-400 to-cyan-600',
        status: 'Ready',
        category: 'Data & Intelligence',
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'ledger',
        title: 'Ledger Cube',
        description: 'AI Forensic Accountant',
        detail: 'Audits invoices against bank feeds.',
        icon: DollarSign,
        color: 'from-emerald-400 to-teal-700',
        status: 'Beta',
        category: 'Finance & Operations',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'legal',
        title: 'Legal Cube',
        icon: Scale,
        description: 'Contract Auditor',
        detail: 'Scans PDFs for dangerous clauses and red flags.',
        color: 'from-slate-400 to-slate-600',
        status: 'Beta',
        category: 'Finance & Operations',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'sentinel',
        title: 'Sentinel Cube',
        description: 'Autonomous Security',
        detail: 'Detects SQLi, XSS, and DDOS in real-time.',
        icon: Shield,
        color: 'from-green-500 to-emerald-900',
        status: 'PROD READY v1.0',
        category: 'Finance & Operations',
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'legacy',
        title: 'Legacy Cube',
        description: 'Data Migration',
        detail: 'Automates ETL pipelines from legacy systems.',
        icon: Database,
        color: 'from-slate-500 to-slate-700',
        status: 'Ready',
        category: 'Finance & Operations',
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'chef',
        title: 'Chef Cube',
        icon: ChefHat,
        description: 'Autonomous Nutritionist',
        detail: 'Upload a fridge photo -> Get Recipies + Calories + Final Dish Image.',
        color: 'from-orange-400 to-red-600',
        status: 'Ready',
        category: 'Creative & Lifestyle',
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'brand',
        title: 'Brand Cube',
        icon: Palette,
        description: 'AI Creative Director',
        detail: 'Generates Logos, Color Palettes, and Slogans from a vibe.',
        color: 'from-pink-500 to-rose-500',
        status: 'New',
        category: 'Creative & Lifestyle',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'dream',
        title: 'Dream Cube',
        description: 'Generative Art',
        detail: 'Text-to-Image Generation with style control.',
        icon: Sparkles,
        color: 'from-fuchsia-500 to-purple-600',
        status: 'New',
        category: 'Creative & Lifestyle',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'travel',
        title: 'Travel Cube',
        icon: Map,
        description: 'Itinerary Planner',
        detail: 'Scan a map -> Get a 3-day budget itinerary.',
        color: 'from-sky-400 to-sky-600',
        status: 'Beta',
        category: 'Creative & Lifestyle',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'fitpal',
        title: 'FitPal Cube',
        description: 'AI Personal Trainer',
        detail: 'Custom workouts based on your equipment.',
        icon: Dumbbell,
        color: 'from-orange-500 to-red-600',
        status: 'Ready',
        category: 'Creative & Lifestyle',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'career',
        title: 'Career Cube',
        icon: FileText,
        description: 'Resume Optimizer',
        detail: 'Rewrites your PDF resume to pass ATS filters instantly.',
        color: 'from-yellow-400 to-amber-600',
        status: 'New',
        category: 'Career & Engineering',
        colSpan: 'md:col-span-2',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'talent',
        title: 'Talent Cube',
        description: 'The Headhunter',
        detail: 'AI Recruitment & Resume Screening.',
        icon: Users,
        color: 'from-blue-500 to-indigo-600',
        status: 'New',
        category: 'Career & Engineering',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'forge',
        title: 'Forge Cube',
        description: 'Code Architecture',
        detail: 'Generates entire codebases from a single prompt.',
        icon: Code,
        color: 'from-emerald-500 to-cyan-600',
        status: 'Beta',
        category: 'Career & Engineering',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'nexus',
        title: 'Nexus Cube',
        icon: Brain,
        description: 'The Second Brain',
        detail: 'Persistent memory assistant that remembers your life context.',
        color: 'from-indigo-400 to-purple-600',
        status: 'Ready',
        category: 'Career & Engineering',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    },
    {
        id: 'vision',
        title: 'Vision Cube',
        description: 'Spatial Computing',
        detail: 'Advanced video analysis and object tracking.',
        icon: Eye,
        color: 'from-amber-400 to-orange-600',
        status: 'Ready',
        category: 'Career & Engineering',
        colSpan: 'md:col-span-1',
        rowSpan: 'md:row-span-1'
    }
];

export default function Services() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#000] overflow-hidden text-foreground font-sans selection:bg-primary/30 relative">
            
            {/* Global Abstract Background for Services Page */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2a1b54] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#0f2e4a] rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
            </div>

            <main className="relative z-10 pt-40 pb-32 px-6 max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-24 relative"
                >
                    {/* Background glow for hero text */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter text-white">
                        The AI <span className="text-white/40">App Store.</span>
                    </h1>
                    <p className="text-2xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
                        Selected works of autonomous intelligence. <br />
                        Choose a specialized engine to solve your specific problem instantly.
                    </p>
                </motion.div>

                {/* Categories Iteration */}
                {Array.from(new Set(services.map(s => s.category))).map((category) => (
                    <div key={category} className="mb-24">
                        <div className="flex items-center gap-4 mb-10">
                            <h2 className="text-3xl font-bold text-white">{category}</h2>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
                            {services.filter(s => s.category === category).map((service, i) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
                                    className={`group relative rounded-[2.5rem] p-8 overflow-hidden border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-2xl flex flex-col justify-between cursor-pointer transition-all hover:bg-[#111]/90 ${service.colSpan} ${service.rowSpan}`}
                                    onClick={() => navigate(`/cube/${service.id}`)}
                                >
                                    {/* Inner Background Glow */}
                                    <div className={`absolute -right-20 -bottom-20 w-64 h-64 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 blur-[80px] transition-opacity duration-700 rounded-full pointer-events-none`}></div>
                                    
                                    {/* Top Section */}
                                    <div className="relative z-10 flex justify-between items-start">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} p-[1px] shadow-lg`}>
                                            <div className="w-full h-full bg-[#0a0a0a] rounded-2xl flex items-center justify-center">
                                                <service.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider bg-white/5 border border-white/10 ${
                                            service.status === 'Ready' || service.status.includes('PROD') ? 'text-emerald-400' : 
                                            service.status === 'Beta' ? 'text-blue-400' : 'text-amber-400'
                                        }`}>
                                            {service.status}
                                        </span>
                                    </div>

                                    {/* Bottom Section */}
                                    <div className="relative z-10 mt-auto pt-8">
                                        <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">
                                            {service.title}
                                        </h3>
                                        <p className="text-lg text-white/60 font-medium mb-3">
                                            {service.description}
                                        </p>
                                        <p className="text-sm text-white/40 line-clamp-2">
                                            {service.detail}
                                        </p>

                                        {/* Hover Action Button */}
                                        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white/0 group-hover:text-white transition-colors duration-300">
                                            <span>Launch Cube</span>
                                            <Scan className="w-4 h-4 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
