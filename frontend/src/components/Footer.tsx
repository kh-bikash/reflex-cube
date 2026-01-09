import { Button } from "./ui/button";
import { Github, Twitter, Linkedin, ArrowRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative z-20 bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
      {/* Background enhancement */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-neon-cyan/20 rounded-lg flex items-center justify-center border border-neon-cyan/50">
                <div className="w-3 h-3 bg-neon-cyan rounded-full shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white">ReflexCube</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              The next generation AI model training and deployment platform.
              Built for speed, designed for scale, engineered for the future.
            </p>
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-64 text-white focus:outline-none focus:border-neon-purple/50 transition-colors"
                />
                <Button size="sm" className="absolute right-1 top-1 bg-white/10 hover:bg-white/20 text-white h-8 px-3">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Platform</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Neural Engine</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Model Zoo</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Deployments</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Analytics</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-neon-cyan transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-neon-cyan transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2024 ReflexCube Inc. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};