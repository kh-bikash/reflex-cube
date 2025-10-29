import { Card } from "../components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    role: "AI Researcher, Stanford",
    company: "Stanford University",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    content: "Reflex Cube has revolutionized how we approach model training. What used to take weeks of setup now happens in minutes. The automated pipeline is incredible.",
    rating: 5
  },
  {
    name: "Marcus Rodriguez",
    role: "ML Engineer",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    content: "The local training capabilities are a game-changer. We can fine-tune models on sensitive data without any privacy concerns. Brilliant platform!",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Data Scientist",
    company: "HealthAI Inc",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    content: "From prototype to production in record time. The MLflow integration makes experiment tracking seamless. This is the future of AI development.",
    rating: 5
  },
  {
    name: "Alex Kim",
    role: "PhD Student",
    company: "MIT",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    content: "As a student, this platform makes advanced ML accessible. No more struggling with complex setup - I can focus on my research instead.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Trusted by AI Innovators
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From researchers to engineers, see how Reflex Cube is transforming AI development across the globe.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="p-6 bg-gradient-card backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-glow group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4 mb-4">
                <Quote className="w-8 h-8 text-primary/60 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-foreground leading-relaxed mb-4 group-hover:text-primary/90 transition-colors">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-ai-orange text-ai-orange" />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} • {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Trusted by leading institutions worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-lg font-semibold">Stanford</div>
            <div className="text-lg font-semibold">MIT</div>
            <div className="text-lg font-semibold">Google</div>
            <div className="text-lg font-semibold">Microsoft</div>
            <div className="text-lg font-semibold">OpenAI</div>
            <div className="text-lg font-semibold">NVIDIA</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;