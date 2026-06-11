import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full pt-24 pb-12 flex justify-center px-4 md:px-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[1400px] min-h-[65vh] rounded-[2rem] overflow-hidden relative flex flex-col justify-center"
      >
        {/* Actual Video Background */}
        <div className="absolute inset-0 bg-[#0f0f0f] overflow-hidden">
            <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60"
            >
                <source src="/hero-bg.mp4" type="video/mp4" />
            </video>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center p-12 md:p-24 z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-8 inline-block"
            >
                <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
                    Introducing The Reflex Framework
                </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white leading-tight max-w-5xl"
            >
              Architect intelligence.<br />
              Build anything from a prompt.
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 flex gap-4"
            >
               <button
                    onClick={() => navigate("/generate")}
                    className="px-8 py-3 bg-white text-black font-bold rounded-full transition-transform hover:scale-105"
                >
                    Build with Reflex
                </button>
            </motion.div>
        </div>
        
        {/* Subtle Dark Gradient to fade video into black */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10 pointer-events-none"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
