import { Card } from "../components/ui/card";
import { Bot, Download, BarChart3, Zap, Shield, Cpu } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Prompt to Model",
    description: "Just describe what you want in natural language, and our AI agents handle the full lifecycle of training and deployment.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Automated Training",
    description: "Supports local fine-tuning (LoRA) and pluggable extensions to scale training without the complexity.",
    color: "text-ai-orange"
  },
  {
    icon: BarChart3,
    title: "Real-time Dashboard",
    description: "Intuitive dashboards to monitor performance, accuracy, and metrics in real-time with MLflow tracking.",
    color: "text-ai-blue"
  },
  {
    icon: Download,
    title: "Instant Downloads",
    description: "Once training is complete, download ready-to-use models instantly for integration into your applications.",
    color: "text-ai-green"
  },
  {
    icon: Shield,
    title: "Local & Secure",
    description: "Everything runs locally on your machine. Your data and models never leave your environment.",
    color: "text-accent"
  },
  {
    icon: Cpu,
    title: "MLflow Integration",
    description: "Every experiment is tracked automatically, ensuring reproducibility and easy comparison between models.",
    color: "text-primary-glow"
  }
];

const FeatureSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Why Choose Reflex Cube?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Democratizing AI model creation with intelligent automation, powerful features, and seamless user experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-secondary/50 ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;