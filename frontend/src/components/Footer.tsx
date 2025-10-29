import { Box, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/10 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-hero">
                <Box className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Reflex Cube</h3>
                <p className="text-sm text-muted-foreground">AI Model Platform</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Democratizing AI model creation with intelligent automation. 
              Transform your ideas into intelligent models with ease.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Features</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Dashboard</li>
              <li className="hover:text-primary cursor-pointer transition-colors">API</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Pricing</li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition-colors">Documentation</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Tutorials</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Examples</li>
              <li className="hover:text-primary cursor-pointer transition-colors">Community</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary/10 mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Reflex Cube. Where ideas transform into intelligent models.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;