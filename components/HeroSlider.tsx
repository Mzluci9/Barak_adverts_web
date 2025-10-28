"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

/**
 * COMPONENT: HeroSlider
 * PURPOSE: Full-width auto-rotating hero slider with parallax effect
 * EDIT: Change slide content, images, or text in the slides array below
 * IMPORTANT: SLIDE_INTERVAL controls rotation speed (in milliseconds)
 * IMAGES: Located in /public/placeholders/ - replace with your own
 */

const SLIDE_INTERVAL = 5000 // Change rotation speed here (5 seconds)

interface Slide {
  id: number
  title: string
  subtitle: string
  image: string
  primaryCTA: string
  secondaryCTA: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Professional Advertising Solutions",
    subtitle: "Eye-catching billboards and signage for maximum impact",
    image: "/professional-advertising-billboard-installation-go.jpg",
    primaryCTA: "Request Quote",
    secondaryCTA: "See Portfolio",
  },
  {
    id: 2,
    title: "Stunning Neon Signs",
    subtitle: "Custom neon lighting that brings your brand to life",
    image: "/neon-sign-workshop-glowing-tubes-orange-smoke-cine.jpg",
    primaryCTA: "Request Quote",
    secondaryCTA: "See Portfolio",
  },
  {
    id: 3,
    title: "Illuminated Lightboxes",
    subtitle: "Modern lightbox solutions for retail and corporate spaces",
    image: "/illuminated-lightbox-sign-storefront-warm-orange-g.jpg",
    primaryCTA: "Request Quote",
    secondaryCTA: "See Portfolio",
  },
  {
    id: 4,
    title: "Custom T-Shirt Printing",
    subtitle: "High-quality apparel printing with vibrant colors",
    image: "/person-wearing-custom-printed-orange-tshirt-bold-l.jpg",
    primaryCTA: "Request Quote",
    secondaryCTA: "See Portfolio",
  },
  {
    id: 5,
    title: "Premium Mug Printing",
    subtitle: "Personalized mugs perfect for gifts and branding",
    image: "/white-ceramic-mug-orange-logo-print-studio-lightin.jpg",
    primaryCTA: "Request Quote",
    secondaryCTA: "See Portfolio",
  },
  {
    id: 6,
    title: "Custom Merchandise",
    subtitle: "Complete gift shop solutions with branded items",
    image: "/flatlay-assorted-printed-gifts-notebook-keychain-m.jpg",
    primaryCTA: "Request Quote",
    secondaryCTA: "See Portfolio",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const sliderRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef(0)

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, SLIDE_INTERVAL)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX
    if (touchStartX.current - touchEndX > 50) goToNext()
    if (touchEndX - touchStartX.current > 50) goToPrevious()
  }

  const handleLearnMore = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleRequestQuote = () => {
    const quoteSection = document.getElementById("quote")
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const slide = slides[currentSlide]

  return (
    <section
      ref={sliderRef}
      className="relative w-full h-screen overflow-hidden bg-muted"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Hero slider"
    >
      {/* SLIDE IMAGE WITH PARALLAX */}
      <div className="absolute inset-0">
        <Image
          src={slide.image || "/placeholder.svg"}
          alt={slide.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* ORANGE GRADIENT OVERLAY FOR TEXT READABILITY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
      </div>

      {/* SLIDE CONTENT */}
      <div className="relative h-full flex flex-col justify-center items-center px-6 sm:px-12 lg:px-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">{slide.title}</h1>
        <p className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl text-balance">{slide.subtitle}</p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRequestQuote}
            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-all neon-glow"
          >
            {slide.primaryCTA}
          </button>
          <button
            onClick={handleLearnMore}
            className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-bold transition-all"
          >
            {slide.secondaryCTA}
          </button>
        </div>
      </div>

      {/* NAVIGATION ARROWS */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoPlay(false)
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-primary w-8" : "bg-white/50 w-2 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
