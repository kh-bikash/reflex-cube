// frontend/src/components/HeroSection.tsx
import { Button } from "../components/ui/button";
import { ArrowRight, Cpu, Zap } from "lucide-react";
import heroCube from "@/assets/hero-cube.jpg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: `url(${heroCube})` }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-card backdrop-blur-sm border border-primary/20 mb-8 animate-glow-pulse">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI Model Generation Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
            Reflex Cube
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Transform ideas into intelligent models with AI agents that handle everything for you.
            <br />
            <span className="text-primary font-medium">Think it. Prompt it. Train it. Test it. Download it.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="hero"
              size="lg"
              className="group"
              onClick={() => navigate("/generate")}
            >
              Start Building Models
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="ai-outline" size="lg" onClick={() => navigate("/generate")}>
              <Zap className="w-5 h-5" />
              View Demo
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10x</div>
              <div className="text-muted-foreground text-sm">Faster Model Training</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ai-blue mb-2">Zero</div>
              <div className="text-muted-foreground text-sm">ML Expertise Required</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ai-green mb-2">100%</div>
              <div className="text-muted-foreground text-sm">Local & Secure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
