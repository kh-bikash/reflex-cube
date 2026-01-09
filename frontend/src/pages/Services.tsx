import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChefHat, TrendingUp, Brain, Scan, FileText, Palette, Scale, Dumbbell, Map, Shield, DollarSign,
    Terminal,
    Users
} from 'lucide-react';
import { FloatingNavbar } from '../components/ui/FloatingNavbar';
import { Footer } from '../components/Footer';
import { ChefCube } from '../components/cubes/ChefCube';
import { AlphaCube } from '../components/cubes/AlphaCube';
import { NexusCube } from '../components/cubes/NexusCube';
import { LensCube } from '../components/cubes/LensCube';
import CareerCube from '../components/cubes/CareerCube';
import BrandCube from '../components/cubes/BrandCube';
import LegalCube from '../components/cubes/LegalCube';
import FitPalCube from '../components/cubes/FitPalCube';
import TravelCube from '../components/cubes/TravelCube';
import Link from 'next/link'; // Not strictly needed but keeping structure
import SentinelCube from '../components/cubes/SentinelCube';
import LedgerCube from '../components/cubes/LedgerCube';
import TalentCube from '../components/cubes/TalentCube';

const services = [
    {
        id: 'chef',
        title: 'Chef Cube',
        icon: ChefHat,
        description: 'Autonomous Nutritionist',
        detail: 'Upload a fridge photo -> Get Recipies + Calories + Final Dish Image.',
        color: 'from-orange-400 to-red-600',
        status: 'Ready'
    },
    {
        id: 'alpha',
        title: 'Alpha Cube',
        icon: TrendingUp,
        description: 'Financial Analyst',
        detail: 'Real-time stock analysis (P/E, Debt) with Invest/Hold ratings.',
        color: 'from-green-400 to-emerald-600',
        status: 'Ready'
    },
    {
        id: 'nexus',
        title: 'Nexus Cube',
        icon: Brain,
        description: 'The Second Brain',
        detail: 'Persistent memory assistant that remembers your life context.',
        color: 'from-indigo-400 to-purple-600',
        status: 'Ready'
    },
    {
        id: 'lens',
        title: 'Lens Cube',
        icon: Scan,
        description: 'Universal Scanner',
        detail: 'Identify plants, coins, or extract text from documents (OCR).',
        color: 'from-blue-400 to-cyan-600',
        status: 'Ready'
    },
    {
        id: 'career',
        title: 'Career Cube',
        icon: FileText,
        description: 'Resume Optimizer',
        detail: 'Rewrites your PDF resume to pass ATS filters instantly.',
        color: 'from-yellow-400 to-amber-600',
        status: 'New'
    },
    {
        id: 'brand',
        title: 'Brand Cube',
        icon: Palette,
        description: 'AI Creative Director. Generates logos, slogans, and color palettes.',
        detail: 'Generates Logos, Color Palettes, and Slogans from a vibe.', // Kept original detail for consistency
        color: 'from-pink-500 to-rose-500',
        status: 'New'
    },
    {
        id: 'legal',
        title: 'Legal Cube',
        icon: Scale,
        detail: 'Scans PDFs for dangerous clauses and red flags.',
        color: 'from-slate-400 to-slate-600',
        status: 'Beta'
    },

    {
        id: 'travel',
        title: 'Travel Cube',
        icon: Map,
        description: 'Itinerary Planner',
        detail: 'Scan a map -> Get a 3-day budget itinerary.',
        color: 'from-sky-400 to-sky-600',
        status: 'Beta'
    },
    {
        id: 'fitpal',
        title: 'FitPal Cube',
        description: 'AI Personal Trainer. Custom workouts based on your equipment.',
        icon: Dumbbell,
        color: 'from-orange-500 to-red-600'
    },
    {
        id: 'sentinel',
        title: 'Sentinel Cube',
        description: 'Autonomous Security. Detects SQLi, XSS, and DDOS in real-time.',
        icon: Shield,
        color: 'from-green-500 to-emerald-900',
        status: 'PROD READY v1.0'
    },
    {
        id: 'ledger',
        title: 'Ledger Cube',
        description: 'AI Forensic Accountant. Audits invoices against bank feeds.',
        icon: DollarSign,
        color: 'from-emerald-400 to-teal-700',
        status: 'Beta'
    },
    {
        id: 'talent',
        title: 'Talent Cube',
        description: 'The Headhunter. AI Recruitment & Resume Screening.',
        icon: Users,
        color: 'from-blue-500 to-indigo-600',
        status: 'New'
    }
];

export default function Services() {
    const [activeCube, setActiveCube] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
            <FloatingNavbar />

            <AnimatePresence>
                {activeCube === 'chef' && <ChefCube onClose={() => setActiveCube(null)} />}
                {activeCube === 'alpha' && <AlphaCube onClose={() => setActiveCube(null)} />}
                {activeCube === 'nexus' && <NexusCube onClose={() => setActiveCube(null)} />}
                {activeCube === 'lens' && <LensCube onClose={() => setActiveCube(null)} />}
                {activeCube === 'career' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[85vh] bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveCube(null)}
                                className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <CareerCube />
                        </motion.div>
                    </div>
                )}
                {activeCube === 'brand' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[85vh] bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveCube(null)}
                                className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <BrandCube />
                        </motion.div>
                    </div>
                )}
                {activeCube === 'ledger' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, y: 10, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 10, opacity: 0 }}
                            className="w-full max-w-6xl h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 z-50 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors"
                                onClick={() => setActiveCube(null)}
                            >
                                ✕
                            </button>
                            <LedgerCube />
                        </motion.div>
                    </div>
                )}
                {activeCube === 'legal' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[85vh] bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveCube(null)}
                                className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <LegalCube />
                        </motion.div>
                    </div>
                )}
                {activeCube === 'fitpal' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[85vh] bg-[#0A0A0A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveCube(null)}
                                className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <FitPalCube />
                        </motion.div>
                    </div>
                )}
                {activeCube === 'travel' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[85vh] bg-[#0F172A] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveCube(null)}
                                className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <TravelCube />
                        </motion.div>
                    </div>
                )}
                {activeCube === 'sentinel' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            className="relative w-full max-w-6xl h-[85vh] bg-black rounded-3xl border border-green-900/50 shadow-2xl overflow-hidden shadow-green-900/20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveCube(null)}
                                className="absolute top-6 right-6 z-50 text-green-500/40 hover:text-green-500 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <SentinelCube />
                        </motion.div>
                    </div>
                )}
                {activeCube === 'talent' && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveCube(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ scale: 0.95, y: 10, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: 10, opacity: 0 }}
                            className="relative w-full max-w-7xl h-[90vh] bg-slate-50 rounded-xl overflow-hidden shadow-2xl border border-slate-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 z-50 p-2 bg-slate-200 hover:bg-slate-300 text-slate-500 hover:text-slate-800 rounded-full transition-colors"
                                onClick={() => setActiveCube(null)}
                            >
                                ✕
                            </button>
                            <TalentCube />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                        The Cube Collection
                    </h1>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto">
                        Selected works of autonomous intelligence. <br />
                        Choose a specialized engine to solve your specific problem.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative p-1 rounded-3xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                            <div className="relative h-full bg-black/80 backdrop-blur-xl rounded-[22px] p-8 border border-white/5 group-hover:border-white/10 flex flex-col">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 shadow-lg shadow-${service.color}/20 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className="w-7 h-7 text-white" />
                                </div>

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-colors">
                                        {service.title}
                                    </h3>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-white/60 border border-white/5">
                                        {service.status}
                                    </span>
                                </div>

                                <p className="text-lg text-white/80 font-medium mb-2">{service.description}</p>
                                <p className="text-sm text-white/40 mb-8 leading-relaxed flex-grow">
                                    {service.detail}
                                </p>

                                <button
                                    onClick={() => setActiveCube(service.id)}
                                    className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                >
                                    <span className="font-medium">Launch Cube</span>
                                    <Scan className="w-4 h-4 text-white/40 group-hover/btn:text-white transition-colors" />
                                </button>
                            </div >
                        </motion.div >
                    ))}
                </div >
            </main >

            <Footer />
        </div >
    );
}
