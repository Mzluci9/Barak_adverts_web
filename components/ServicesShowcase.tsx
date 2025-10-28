"use client"

import { useState } from "react"
import Image from "next/image"

/**
 * COMPONENT: ServicesShowcase
 * PURPOSE: Display services with tabs and embedded galleries
 * EDIT: Change service names, descriptions, or add new services in the services array
 * IMAGES: Replace placeholder images in /public/placeholders/
 * IMPORTANT: Each service can have multiple gallery images
 */

interface Service {
  id: string
  name: string
  description: string
  icon: string
  images: string[]
  features: string[]
}

const services: Service[] = [
  {
    id: "advertising",
    name: "Advertising",
    description: "Professional billboard and signage solutions for maximum visibility",
    icon: "📢",
    images: [
      "/professional-billboard-advertising-installation.jpg",
      "/urban-billboard-advertisement-campaign.jpg",
      "/storefront-advertising-signage.jpg",
    ],
    features: ["Custom designs", "Large format printing", "Weather-resistant", "Quick turnaround"],
  },
  {
    id: "neon",
    name: "Neon Lights",
    description: "Custom neon signs that make your brand glow",
    icon: "✨",
    images: [
      "/neon-sign-workshop-glowing-tubes.jpg",
      "/custom-neon-sign-installation.jpg",
      "/neon-light-display-storefront.jpg",
    ],
    features: ["Custom shapes", "Energy efficient", "Long-lasting", "Professional installation"],
  },
  {
    id: "lightbox",
    name: "Lightbox",
    description: "Illuminated lightbox signs for retail and corporate spaces",
    icon: "💡",
    images: [
      "/illuminated-lightbox-sign-storefront.jpg",
      "/modern-lightbox-display.jpg",
      "/retail-lightbox-signage.jpg",
    ],
    features: ["LED technology", "Customizable", "Durable materials", "Easy maintenance"],
  },
  {
    id: "tshirt",
    name: "T-Shirt Printing",
    description: "High-quality custom t-shirt printing with vibrant colors",
    icon: "👕",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    features: ["Direct-to-garment", "Screen printing", "Bulk orders", "Fast delivery"],
  },
  {
    id: "mug",
    name: "Mug Printing",
    description: "Personalized ceramic mugs perfect for gifts and branding",
    icon: "☕",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    features: ["High-quality ceramic", "Dishwasher safe", "Vibrant colors", "Custom designs"],
  },
  {
    id: "gifts",
    name: "Gift Shop",
    description: "Complete merchandise solutions with branded items",
    icon: "🎁",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    features: ["Wide selection", "Bulk discounts", "Custom branding", "Quality assured"],
  },
]

export default function ServicesShowcase() {
  const [activeService, setActiveService] = useState("advertising")
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const currentService = services.find((s) => s.id === activeService)!
  const currentImage = currentService.images[activeImageIndex]

  const handleRequestQuote = () => {
    const quoteSection = document.getElementById("quote")
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive printing and sign solutions tailored to your business needs
          </p>
        </div>

        {/* SERVICE TABS */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => {
                setActiveService(service.id)
                setActiveImageIndex(0)
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeService === service.id
                  ? "bg-primary text-white neon-glow"
                  : "bg-muted text-foreground hover:bg-primary/10"
              }`}
            >
              <span className="mr-2">{service.icon}</span>
              {service.name}
            </button>
          ))}
        </div>

        {/* SERVICE CONTENT */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* GALLERY */}
          <div className="space-y-4">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={currentImage || "/placeholder.svg"}
                alt={currentService.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* THUMBNAIL NAVIGATION */}
            <div className="flex gap-2">
              {currentService.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === activeImageIndex ? "border-primary" : "border-border"
                  }`}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${currentService.name} ${idx + 1}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* SERVICE DETAILS */}
          <div>
            <h3 className="text-3xl font-bold text-foreground mb-4">{currentService.name}</h3>
            <p className="text-lg text-muted-foreground mb-6">{currentService.description}</p>

            {/* FEATURES LIST */}
            <div className="space-y-3 mb-8">
              <h4 className="font-bold text-foreground">Key Features:</h4>
              {currentService.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRequestQuote}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg font-bold transition-all neon-glow"
              >
                Request Quote
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
