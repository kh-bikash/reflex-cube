import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { 
  MessageCircle, 
  Image, 
  FileText, 
  BarChart3, 
  Code, 
  Brain,
  ArrowRight,
  Users,
  Shield,
  Zap
} from "lucide-react";

const useCases = [
  {
    title: "Conversational AI",
    description: "Build intelligent chatbots and virtual assistants tailored to your domain.",
    icon: MessageCircle,
    color: "text-ai-blue",
    bgColor: "bg-ai-blue/20",
    examples: ["Customer support bots", "Personal assistants", "Educational tutors"],
    difficulty: "Beginner",
    time: "2-4 hours"
  },
  {
    title: "Computer Vision",
    description: "Create powerful image recognition and analysis models for any industry.",
    icon: Image,
    color: "text-ai-green",
    bgColor: "bg-ai-green/20",
    examples: ["Medical imaging", "Quality control", "Content moderation"],
    difficulty: "Intermediate",
    time: "4-8 hours"
  },
  {
    title: "Document Intelligence",
    description: "Extract insights and automate processing of complex documents.",
    icon: FileText,
    color: "text-ai-orange",
    bgColor: "bg-ai-orange/20",
    examples: ["Contract analysis", "Invoice processing", "Research summarization"],
    difficulty: "Intermediate",
    time: "3-6 hours"
  },
  {
    title: "Predictive Analytics",
    description: "Forecast trends and make data-driven decisions with custom models.",
    icon: BarChart3,
    color: "text-primary",
    bgColor: "bg-primary/20",
    examples: ["Sales forecasting", "Risk assessment", "Demand planning"],
    difficulty: "Advanced",
    time: "6-12 hours"
  },
  {
    title: "Code Generation",
    description: "Build models that understand and generate code in multiple languages.",
    icon: Code,
    color: "text-accent",
    bgColor: "bg-accent/20",
    examples: ["Auto-completion", "Bug detection", "Code translation"],
    difficulty: "Advanced",
    time: "8-16 hours"
  },
  {
    title: "Sentiment Analysis",
    description: "Understand emotions and opinions in text for better decision making.",
    icon: Brain,
    color: "text-primary-glow",
    bgColor: "bg-primary/30",
    examples: ["Social media monitoring", "Review analysis", "Brand sentiment"],
    difficulty: "Beginner",
    time: "1-3 hours"
  }
];

const UseCasesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Endless Possibilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From simple sentiment analysis to complex computer vision, discover what you can build with Reflex Cube.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card 
              key={index}
              className="p-6 bg-gradient-card backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg ${useCase.bgColor} ${useCase.color} group-hover:scale-110 transition-transform duration-300`}>
                  <useCase.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {useCase.description}
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {useCase.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {useCase.time}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Popular examples:</h4>
                      <ul className="space-y-1">
                        {useCase.examples.map((example, exampleIndex) => (
                          <li key={exampleIndex} className="text-sm text-muted-foreground">
                            • {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full group/btn">
                    <span>Start Building</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/10 text-center">
            <div className="flex justify-center mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">50,000+</div>
            <div className="text-muted-foreground">Models Trained</div>
          </Card>
          
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/10 text-center">
            <div className="flex justify-center mb-4">
              <Zap className="w-8 h-8 text-ai-orange" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">95%</div>
            <div className="text-muted-foreground">Faster Training</div>
          </Card>
          
          <Card className="p-6 bg-gradient-card backdrop-blur-sm border-primary/10 text-center">
            <div className="flex justify-center mb-4">
              <Shield className="w-8 h-8 text-ai-green" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">100%</div>
            <div className="text-muted-foreground">Secure & Local</div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;