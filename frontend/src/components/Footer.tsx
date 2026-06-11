import { Button } from "./ui/button";
import { Github, Twitter, Linkedin, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="relative z-20 bg-[#000] border-t border-white/5 pt-24 overflow-hidden rounded-t-[3rem] mt-20">
      
      {/* Animated Glowing Orbs in Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-32">
          
          <div className="col-span-1 md:col-span-6 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/20 backdrop-blur-md">
                    <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" />
                </div>
                <span className="text-3xl font-bold tracking-tight text-white">Reflex<span className="text-white/60">Cube</span></span>
                </div>
                <p className="text-white/60 text-xl font-light max-w-md leading-relaxed">
                The cognitive architecture for autonomous AI models.
                Built for speed. Designed for scale.
                </p>
            </div>

            <div className="mt-12 group relative inline-flex">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative flex items-center bg-[#0a0a0a] border border-white/10 rounded-full p-1 w-full max-w-md">
                    <input
                    type="email"
                    placeholder="Subscribe to updates"
                    className="bg-transparent px-6 py-3 w-full text-white placeholder-white/30 focus:outline-none text-sm"
                    />
                    <button className="bg-white hover:bg-white/90 text-black rounded-full h-10 px-6 font-semibold flex items-center gap-2 transition-transform hover:scale-105">
                    <span>Join</span>
                    <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h4 className="text-white font-semibold mb-8 text-lg">Platform</h4>
            <ul className="space-y-4">
              {['AI Cubes', 'Generate Model', 'Dashboard', 'API Docs', 'Changelog'].map((link) => {
                  let path = `/${link.toLowerCase().replace(' ', '-')}`;
                  if (link === 'AI Cubes') path = '/services';
                  if (link === 'Generate Model') path = '/generate';
                  return (
                      <li key={link}>
                          <Link to={path} className="group flex items-center text-white/50 hover:text-white transition-colors text-lg font-light">
                              {link}
                              <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                          </Link>
                      </li>
                  );
              })}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h4 className="text-white font-semibold mb-8 text-lg">Resources</h4>
            <ul className="space-y-4">
              {['Documentation', 'Blog', 'Community', 'Support', 'Status'].map((link) => (
                  <li key={link}>
                      <Link to={`/${link.toLowerCase()}`} className="group flex items-center text-white/50 hover:text-white transition-colors text-lg font-light">
                          {link}
                          <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                      </Link>
                  </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Massive Typography */}
        <div className="w-full border-t border-white/10 pt-16 pb-8 flex flex-col items-center">
            <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="text-[12vw] font-bold tracking-tighter text-white/5 leading-none select-none"
            >
                REFLEXCUBE
            </motion.h1>
            
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
                <div className="text-white/40 text-sm font-light">
                    © 2026 ReflexCube Inc. All rights reserved.
                </div>
                <div className="flex gap-8">
                    <a href="#" className="text-white/40 hover:text-white transition-transform hover:scale-110"><Github className="w-5 h-5" /></a>
                    <a href="#" className="text-white/40 hover:text-white transition-transform hover:scale-110"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="text-white/40 hover:text-white transition-transform hover:scale-110"><Linkedin className="w-5 h-5" /></a>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};