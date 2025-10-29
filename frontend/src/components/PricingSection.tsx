import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Check, Zap, Crown, Rocket } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for students and hobbyists",
    icon: Zap,
    features: [
      "5 models per month",
      "Basic LoRA fine-tuning",
      "Community support",
      "MLflow tracking",
      "Local training only",
      "Basic dashboard"
    ],
    buttonText: "Get Started",
    buttonVariant: "ai-outline" as const,
    popular: false
  },
  {
    name: "Pro",
    price: "₹2000",
    period: "/month",
    description: "For professional developers and small teams",
    icon: Crown,
    features: [
      "50 models per month",
      "Advanced LoRA + QLoRA",
      "Priority support",
      "Advanced MLflow analytics",
      "Cloud training options",
      "Custom model templates",
      "API access",
      "Team collaboration"
    ],
    buttonText: "Start Pro Trial",
    buttonVariant: "hero" as const,
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations and research institutions",
    icon: Rocket,
    features: [
      "Unlimited models",
      "Full training pipeline",
      "Dedicated support",
      "Custom integrations",
      "On-premise deployment",
      "Advanced security",
      "SLA guarantees",
      "Custom training algorithms"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "ai-outline" as const,
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Choose Your AI Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From learning to enterprise deployment, we have the perfect plan to accelerate your AI development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`p-8 bg-gradient-card backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow relative group animate-fade-in ${
                plan.popular ? 'ring-2 ring-primary/50 scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-hero text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <plan.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                
                <Button variant={plan.buttonVariant} className="w-full mb-8">
                  {plan.buttonText}
                </Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground mb-4">What's included:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-ai-green flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            All plans include 30-day money-back guarantee
          </p>
          <p className="text-sm text-muted-foreground">
            Need a custom solution? <span className="text-primary cursor-pointer hover:underline">Contact our team</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;