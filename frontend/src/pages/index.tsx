import HeroSection from "../components/HeroSection";
import { FeaturesGrid } from "../components/FeaturesGrid";
import { ProjectGallery } from "../components/visuals/ProjectGallery";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent">
      <main>
        <HeroSection />
        <div className="px-4 md:px-0 mt-8">
          <FeaturesGrid />
        </div>
        <div className="px-4 md:px-0 mt-16 mb-24">
          <div className="container mx-auto max-w-6xl">
            <ProjectGallery />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;