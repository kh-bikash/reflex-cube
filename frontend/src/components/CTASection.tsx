// frontend/src/components/CTASection.tsx
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";
import { ArrowRight, Mail, Rocket, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { subscribeNewsletter } from "../lib/api";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      await subscribeNewsletter(email);
      setIsSubscribed(true);
      setEmail("");
    } catch (err) {
      console.error("Newsletter subscribe failed", err);
      alert("Failed to subscribe — please try again.");
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-ai-green/10 animate-gradient-shift" 
           style={{ backgroundSize: '200% 200%' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-card backdrop-blur-sm border border-primary/20 mb-8 animate-glow-pulse">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Join the AI Revolution</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
            Ready to Transform Your Ideas?
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Join thousands of developers, researchers, and innovators who are building the future with Reflex Cube.
            <br />
            <span className="text-primary font-medium">Start your AI journey today.</span>
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="p-8 bg-gradient-card backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-hero group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">Start Building Now</h3>
              <p className="text-muted-foreground mb-6">
                Get instant access to the platform and start training your first AI model in minutes.
              </p>
              
              <Button
                variant="hero"
                size="lg"
                className="w-full group/btn"
                onClick={() => navigate("/generate")}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                No credit card required • 5 free models included
              </p>
            </Card>
            
            <Card className="p-8 bg-gradient-card backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-ai-blue/20 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-8 h-8 text-ai-blue" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6">
                Get the latest AI insights, platform updates, and exclusive tips delivered to your inbox.
              </p>
              
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <Input 
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/50 border-primary/20 focus:border-primary"
                    required
                  />
                  <Button type="submit" variant="ai-outline" size="lg" className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </form>
              ) : (
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-green/20 text-ai-green mb-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Successfully subscribed!</span>
                  </div>
                  <p className="text-muted-foreground">Thank you for joining our community.</p>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground mt-4">
                Join 10,000+ AI enthusiasts • Unsubscribe anytime
              </p>
            </Card>
          </div>
          
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              Loved by developers at leading companies
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold">Google</div>
              <div className="text-lg font-semibold">Microsoft</div>
              <div className="text-lg font-semibold">OpenAI</div>
              <div className="text-lg font-semibold">NVIDIA</div>
              <div className="text-lg font-semibold">Meta</div>
              <div className="text-lg font-semibold">Apple</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
