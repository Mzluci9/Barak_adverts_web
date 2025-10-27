/*
 * component: HeroSlider.tsx
 * purpose: Homepage hero slider with auto-rotate and swipe support
 * 
 * EDIT INSTRUCTIONS:
 * - Change slide images: Update the 'slides' array below (lines 20-40)
 * - Replace images: Put new images in /src/assets/ and import them at top
 * - Change rotation speed: Edit SLIDE_INTERVAL constant (line 18)
 * - Edit headlines/text: Modify 'title' and 'description' in slides array
 * 
 * PLACEHOLDER IMAGES: 
 * All images are AI-generated and located in /src/assets/hero-*.jpg
 */

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAdvertising from "@/assets/hero-advertising.jpg";
import heroNeon from "@/assets/hero-neon.jpg";
import heroLightbox from "@/assets/hero-lightbox.jpg";
import heroTshirt from "@/assets/hero-tshirt.jpg";
import heroMug from "@/assets/hero-mug.jpg";
import heroGiftshop from "@/assets/hero-giftshop.jpg";

// Auto-rotation interval in milliseconds (5 seconds)
const SLIDE_INTERVAL = 5000;

// EDIT: Slide content - modify title, description, and image for each slide
const slides = [
  {
    image: heroAdvertising,
    title: "Bold Advertising That Gets Noticed",
    description: "From billboards to banners, we create impactful advertising solutions that drive results.",
    alt: "Urban billboard advertising installation at golden hour"
  },
  {
    image: heroNeon,
    title: "Custom Neon Light Signs",
    description: "Illuminate your brand with stunning custom neon signage crafted by our expert artisans.",
    alt: "Glowing neon sign displaying BARAK ADVERT"
  },
  {
    image: heroLightbox,
    title: "Premium Light Box Solutions",
    description: "Eye-catching illuminated displays that make your business shine day and night.",
    alt: "Illuminated storefront lightbox sign"
  },
  {
    image: heroTshirt,
    title: "Professional T-Shirt Printing",
    description: "High-quality custom apparel printing for businesses, events, and personal branding.",
    alt: "Custom printed orange branded t-shirt"
  },
  {
    image: heroMug,
    title: "Custom Mug Printing",
    description: "Personalized mugs perfect for corporate gifts, promotions, and special occasions.",
    alt: "White ceramic mug with orange logo print"
  },
  {
    image: heroGiftshop,
    title: "Complete Gift Shop Solutions",
    description: "From notebooks to tote bags, create memorable branded merchandise for your business.",
    alt: "Assorted custom printed gift products flatlay"
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section 
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Hero slider showcasing services"
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 parallax"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
              transition: "transform 10s ease-out"
            }}
          />
          
          {/* Orange Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          
          {/* Content */}
          <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
            <div className="max-w-2xl animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
                {slide.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  className="shadow-orange hover:shadow-glow transition-all duration-300"
                  onClick={() => document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Request Quote
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  See Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-12 bg-primary shadow-glow" 
                : "w-2 bg-primary-foreground/50 hover:bg-primary-foreground/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
