/*
 * FILE: Index.tsx
 * PURPOSE: Main homepage that combines all sections
 * 
 * EDIT INSTRUCTIONS:
 * - Change page structure: Rearrange component order (lines 25-35)
 * - Add/remove sections: Import and add new components
 * - All section content is in individual components for easy editing
 * 
 * COMPONENT LOCATIONS:
 * - Navigation: src/components/Navigation.tsx
 * - Hero Slider: src/components/HeroSlider.tsx
 * - Services: src/components/ServicesGrid.tsx
 * - Portfolio: src/components/Portfolio.tsx
 * - Product Configurator: src/components/ProductConfigurator.tsx
 * - Quote Form: src/components/QuoteForm.tsx
 * - About: src/components/About.tsx
 * - Contact: src/components/Contact.tsx
 * - Footer: src/components/Footer.tsx
 */

import Navigation from "@/components/Navigation";
import HeroSlider from "@/components/HeroSlider";
import ServicesGrid from "@/components/ServicesGrid";
import Portfolio from "@/components/Portfolio";
import ProductConfigurator from "@/components/ProductConfigurator";
import QuoteForm from "@/components/QuoteForm";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Fixed Navigation */}
      <Navigation />
      
      {/* Hero Section with Auto-Rotating Slider */}
      <HeroSlider />
      
      {/* Services Grid - All 12 Services */}
      <ServicesGrid />
      
      {/* Portfolio Gallery with Filters */}
      <Portfolio />
      
      {/* Interactive Product Configurator */}
      <ProductConfigurator />
      
      {/* Multi-Step Quote Form */}
      <QuoteForm />
      
      {/* About Section */}
      <About />
      
      {/* Contact Section with Map */}
      <Contact />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
