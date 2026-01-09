import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MagneticButton } from "./ui/MagneticButton";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const titleWords = ["Reflex", "Cube"];
  const subtitle = "Think it. Prompt it. Train it.";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12"
        >
          <Sparkles className="w-4 h-4 text-neon-cyan" />
          <span className="text-sm font-medium text-white tracking-widest uppercase">Next Gen AI Platform</span>
        </motion.div>

        <h1 className="text-[12vw] leading-[0.85] font-black tracking-tighter text-white mb-8 mix-blend-difference">
          {titleWords.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
              {i < titleWords.length - 1 && <span className="inline-block w-[2vw]">&nbsp;</span>}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto font-light"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <MagneticButton onClick={() => navigate("/generate")}>
            Start Building <ArrowRight className="inline-block ml-2 w-5 h-5" />
          </MagneticButton>

          <MagneticButton className="bg-transparent border border-white/20 hover:bg-white text-white hover:text-black" onClick={() => navigate("/generate")}>
            View Documentation
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
