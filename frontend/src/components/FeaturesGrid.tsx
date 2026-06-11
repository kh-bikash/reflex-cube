import { motion } from "framer-motion";
import { Sparkles, Cpu, BarChart3, Rocket, LayoutDashboard, Code2 } from "lucide-react";
import React, { useEffect, useState } from "react";

// --- Live Animation Components ---

const AnimatedTerminal = () => {
  const [text, setText] = useState("");
  const fullText = "build a sentiment analysis model using the latest dataset...";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(interval);
        setTimeout(() => { setText(""); i = 0; }, 3000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] rounded-xl border border-white/5 p-4 font-mono text-sm relative overflow-hidden flex flex-col">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-white/10"></div>
        <div className="w-3 h-3 rounded-full bg-white/10"></div>
        <div className="w-3 h-3 rounded-full bg-white/10"></div>
      </div>
      <div className="text-white/40 mb-2">$ reflex generate</div>
      <div className="text-white h-10">
        <span className="text-white/60">prompt:</span> {text}
        <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-white/50 ml-1 translate-y-1"></motion.span>
      </div>
      {text.length === fullText.length && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 text-white/60 border-t border-white/5 pt-4">
          <p>Processing request...</p>
          <div className="h-1 w-full bg-white/5 mt-2 rounded-full overflow-hidden">
            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2 }} className="h-full bg-white/40"></motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const AnimatedTerminalWithCubes = () => {
    // Generate small floating cubes
    const cubes = Array.from({ length: 6 }).map((_, i) => {
        const size = Math.random() * 25 + 10;
        const left = Math.random() * 90;
        const delay = Math.random() * 3;
        const duration = Math.random() * 8 + 8;
        return (
            <motion.div
                key={i}
                initial={{ y: "200px", rotate: 0, opacity: 0 }}
                animate={{ y: "-50px", rotate: 360, opacity: [0, 0.4, 0] }}
                transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
                className="absolute bottom-0 rounded-md bg-white/10 backdrop-blur-sm border border-white/5"
                style={{ width: size, height: size, left: `${left}%` }}
            />
        );
    });

    return (
        <div className="relative w-full h-full flex flex-col">
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                {cubes}
            </div>
            <div className="relative z-10 w-full h-full p-2">
                <AnimatedTerminal />
            </div>
        </div>
    );
};

const AnimatedGraph = () => {
  return (
    <div className="w-full h-full flex items-end gap-2 p-4 bg-[#050505] rounded-xl border border-white/5">
      {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-white/10 rounded-t-sm"
          initial={{ height: "10%" }}
          animate={{ height: `${height}%` }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
        ></motion.div>
      ))}
    </div>
  );
};

const AnimatedConnections = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-[#050505] rounded-xl border border-white/5">
      <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10">
        <Cpu size={24} className="text-white/80" />
      </div>
      {/* Orbits */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute w-32 h-32 border border-white/5 rounded-full border-t-white/20"></motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute w-48 h-48 border border-white/5 rounded-full border-b-white/20"></motion.div>
    </div>
  );
};

// --- Features Config ---

const features = [
  {
    icon: Sparkles,
    title: "Prompt-to-Model",
    description: "Describe what you need in plain English and the architecture generates a fully trained model instantly.",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
    bgGradient: "bg-[#0a0a0a]",
    visual: <AnimatedTerminalWithCubes />
  },
  {
    icon: Cpu,
    title: "12+ Specialized Cubes",
    description: "Pre-built AI agents for distinct domains.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bgGradient: "bg-[#0a0a0a]",
    visual: <AnimatedConnections />
  },
  {
    icon: BarChart3,
    title: "Live Training Logs",
    description: "Watch your model train with real-time metrics.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bgGradient: "bg-[#0a0a0a]",
    visual: <AnimatedGraph />
  },
  {
    icon: Rocket,
    title: "One-Click Deploy",
    description: "Download weights or deploy to a live endpoint instantly.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-2",
    bgGradient: "bg-[#0a0a0a]",
    visual: (
      <div className="flex flex-col items-center justify-center h-full relative bg-[#050505] rounded-xl border border-white/5">
         <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
            <Rocket size={48} className="text-white/80" />
         </motion.div>
         <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-16 h-16 bg-white/5 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"></motion.div>
      </div>
    )
  },
  {
    icon: LayoutDashboard,
    title: "Global Dashboard",
    description: "Monitor and manage all jobs.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bgGradient: "bg-[#0a0a0a]",
    visual: null
  },
  {
    icon: Code2,
    title: "Open Architecture",
    description: "Fully extensible via HuggingFace & PyTorch.",
    colSpan: "md:col-span-1",
    rowSpan: "md:row-span-1",
    bgGradient: "bg-[#0a0a0a]",
    visual: null
  },
];

export const FeaturesGrid = () => {
  return (
    <section className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
          Everything you need.<br/>
          <span className="text-white/60">In a single platform.</span>
        </h2>
        <p className="text-white/40 text-lg max-w-xl leading-relaxed">
          The bento-style architecture of ReflexCube allows for modular, highly concurrent agent workflows. Watch it happen in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-[250px]">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`group relative rounded-3xl p-8 overflow-hidden border border-white/5 shadow-2xl ${feature.colSpan} ${feature.rowSpan} ${feature.bgGradient} flex flex-col`}
          >
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

            {/* Top Content */}
            <div className="relative z-10 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300 shadow-lg">
                    <feature.icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-[90%]">{feature.description}</p>
            </div>

            {/* Bottom Visual Animation Area */}
            {feature.visual && (
                <div className="relative z-10 h-48 mt-8 rounded-xl overflow-hidden">
                    {feature.visual}
                </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};
