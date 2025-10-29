import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeatureSection from "../components/FeatureSection";
import DashboardPreview from "../components/DashboardPreview";
import TestimonialsSection from "../components/TestimonialsSection";
import UseCasesSection from "../components/UseCasesSection";
import PricingSection from "../components/PricingSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <div id="features">
          <FeatureSection />
        </div>
        <div id="dashboard">
          <DashboardPreview />
        </div>
        <UseCasesSection />
        <TestimonialsSection />
        <div id="pricing">
          <PricingSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;