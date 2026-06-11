import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

// Import all cubes
import { ChefCube } from "../components/cubes/ChefCube";
import { AlphaCube } from "../components/cubes/AlphaCube";
import { NexusCube } from "../components/cubes/NexusCube";
import { LensCube } from "../components/cubes/LensCube";
import CareerCube from "../components/cubes/CareerCube";
import BrandCube from "../components/cubes/BrandCube";
import LegalCube from "../components/cubes/LegalCube";
import FitPalCube from "../components/cubes/FitPalCube";
import TravelCube from "../components/cubes/TravelCube";
import SentinelCube from "../components/cubes/SentinelCube";
import LedgerCube from "../components/cubes/LedgerCube";
import TalentCube from "../components/cubes/TalentCube";
import { DreamCube } from "../components/cubes/DreamCube";
import ForgeCube from "../components/cubes/ForgeCube";
import LegacyCube from "../components/cubes/LegacyCube";
import { VisionCube } from "../components/cubes/VisionCube";
import { ResearchCube } from "../components/cubes/ResearchCube";
import { SocialCube } from "../components/cubes/SocialCube";

const CubePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const renderCube = () => {
        switch (id) {
            case "chef": return <ChefCube />;
            case "alpha": return <AlphaCube />;
            case "nexus": return <NexusCube />;
            case "lens": return <LensCube />;
            case "career": return <CareerCube />;
            case "brand": return <BrandCube />;
            case "legal": return <LegalCube />;
            case "travel": return <TravelCube />;
            case "fitpal": return <FitPalCube />;
            case "sentinel": return <SentinelCube />;
            case "ledger": return <LedgerCube />;
            case "talent": return <TalentCube />;
            case "dream": return <DreamCube />;
            case "forge": return <ForgeCube />;
            case "vision": return <VisionCube />;
            case "legacy": return <LegacyCube />;
            case "research": return <ResearchCube />;
            case "social": return <SocialCube />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-foreground">
                        <h2 className="text-3xl font-bold mb-4">Engine Offline</h2>
                        <p className="text-muted-foreground mb-8">This cube is currently undergoing maintenance.</p>
                        <button onClick={() => navigate(-1)} className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:opacity-90">
                            Return to Hub
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-[#000] overflow-hidden text-foreground font-sans selection:bg-primary/30 relative flex flex-col pt-32 pb-24 px-6 z-10">
            {/* Global Abstract Background for Cube Page */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2a1b54] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#0f2e4a] rounded-full blur-[150px] opacity-20"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
            </div>

            <div className="max-w-[1600px] w-full mx-auto flex-1 flex flex-col relative z-10">
                <div className="mb-8 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 px-6 py-2.5 rounded-full border border-white/10 shadow-lg backdrop-blur-md hover:bg-white/10"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm font-bold tracking-wide">Back to Hub</span>
                    </button>
                    <div className="px-4 py-1.5 rounded-full text-xs font-bold font-mono tracking-wider bg-white/5 border border-white/10 text-emerald-400 backdrop-blur-md">
                        SYSTEM ONLINE
                    </div>
                </div>
                
                {/* 
                    This container gives the cube a defined height and border so it doesn't stretch infinitely 
                    and looks like a proper web application embedded in the page.
                */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex-1 w-full bg-[#0a0a0a]/80 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden min-h-[80vh] relative"
                >
                    {/* Inner Edge Glow */}
                    <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] pointer-events-none z-50"></div>
                    {renderCube()}
                </motion.div>
            </div>
        </div>
    );
};

export default CubePage;
