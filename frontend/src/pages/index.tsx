import { SkillGraph } from "../components/visuals/SkillGraph";
import { ProjectGallery } from "../components/visuals/ProjectGallery";
import HeroSection from "../components/HeroSection";
// import DashboardPreview from "../components/DashboardPreview"; // Deprecated
import ModelDashboard from "../components/ModelDashboard";
import { AboutSection } from "../components/AboutSection";
import { TextReveal } from "../components/ui/TextReveal";
import { Footer } from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <main>
        <HeroSection />
        <TextReveal text="We are entering a new era of intelligence. Where ideas become reality at the speed of thought. Powered by autonomous agents." />
        <AboutSection />
        <div id="skills" className="relative z-20 mt-20 border-t border-white/10 overflow-hidden">
          <SkillGraph />
        </div>
        <div id="work" className="relative z-20 mt-20 border-t border-white/10 overflow-hidden px-4 md:px-0">
          <div className="container mx-auto">
            <ProjectGallery />
          </div>
        </div>
        <div id="dashboard" className="relative z-20 mt-20 border-t border-white/10 overflow-hidden">
          <ModelDashboard />
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Index;