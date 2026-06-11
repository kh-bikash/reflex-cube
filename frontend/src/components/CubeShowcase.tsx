import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChefHat, TrendingUp, Brain, Scan, Shield, FileText } from "lucide-react";

const cubes = [
  {
    id: "chef",
    title: "Chef Cube",
    description: "Upload a fridge photo, get recipes + calories.",
    icon: ChefHat,
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "alpha",
    title: "Alpha Cube",
    description: "Real-time stock analysis with invest/hold ratings.",
    icon: TrendingUp,
    gradient: "from-emerald-400 to-green-600",
  },
  {
    id: "nexus",
    title: "Nexus Cube",
    description: "Persistent memory assistant for your life context.",
    icon: Brain,
    gradient: "from-indigo-400 to-purple-600",
  },
  {
    id: "lens",
    title: "Lens Cube",
    description: "Identify plants, coins, or extract text via OCR.",
    icon: Scan,
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: "sentinel",
    title: "Sentinel Cube",
    description: "Detects SQLi, XSS, and DDoS in real-time.",
    icon: Shield,
    gradient: "from-green-500 to-emerald-700",
  },
  {
    id: "career",
    title: "Career Cube",
    description: "Rewrites your resume to pass ATS filters instantly.",
    icon: FileText,
    gradient: "from-yellow-400 to-amber-600",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export const CubeShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="relative z-10 py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Specialized AI Cubes
          </h2>
          <p className="text-muted-foreground text-base">
            Pre-built autonomous agents for specific problems.
          </p>
        </div>
        <button
          onClick={() => navigate("/services")}
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all 12+ cubes
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {cubes.map((cube) => (
          <motion.div
            key={cube.id}
            variants={item}
            onClick={() => navigate("/services")}
            className="group flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 cursor-pointer transition-all duration-200 shadow-sm"
          >
            <div className={`w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${cube.gradient} flex items-center justify-center shadow-sm`}>
              <cube.icon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                {cube.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {cube.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile "View all" link */}
      <div className="mt-8 text-center md:hidden">
        <button
          onClick={() => navigate("/services")}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View all 12+ cubes
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
