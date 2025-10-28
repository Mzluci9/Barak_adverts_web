"use client"

import { useState } from "react"
import Image from "next/image"

/**
 * COMPONENT: FeaturedProjects
 * PURPOSE: Portfolio showcase with filterable gallery and lightbox
 * EDIT: Add or remove projects in the projects array
 * IMAGES: Replace placeholder images in /public/placeholders/
 * IMPORTANT: Projects can be filtered by service type
 */

interface Project {
  id: number
  title: string
  description: string
  service: string
  image: string
  details: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "Downtown Billboard Campaign",
    description: "Large-scale advertising billboard installation",
    service: "advertising",
    image: "/placeholder.svg?height=600&width=800",
    details: "High-impact billboard design and installation for major retail campaign",
  },
  {
    id: 2,
    title: "Neon Bar Sign",
    description: "Custom neon sign for nightlife venue",
    service: "neon",
    image: "/placeholder.svg?height=600&width=800",
    details: "Custom neon design with professional installation and maintenance",
  },
  {
    id: 3,
    title: "Retail Lightbox",
    description: "Illuminated storefront signage",
    service: "lightbox",
    image: "/placeholder.svg?height=600&width=800",
    details: "Modern LED lightbox with custom branding and design",
  },
  {
    id: 4,
    title: "Corporate T-Shirt Line",
    description: "Branded apparel for company events",
    service: "tshirt",
    image: "/placeholder.svg?height=600&width=800",
    details: "High-quality screen-printed t-shirts for corporate branding",
  },
  {
    id: 5,
    title: "Promotional Mug Collection",
    description: "Custom printed mugs for client gifts",
    service: "mug",
    image: "/placeholder.svg?height=600&width=800",
    details: "Personalized ceramic mugs with company logo and branding",
  },
  {
    id: 6,
    title: "Gift Shop Merchandise",
    description: "Complete branded merchandise line",
    service: "gifts",
    image: "/placeholder.svg?height=600&width=800",
    details: "Full range of custom branded merchandise items",
  },
]

export default function FeaturedProjects() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const services = ["all", "advertising", "neon", "lightbox", "tshirt", "mug", "gifts"]
  const filteredProjects = activeFilter === "all" ? projects : projects.filter((p) => p.service === activeFilter)

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful projects across all services
          </p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {services.map((service) => (
            <button
              key={service}
              onClick={() => setActiveFilter(service)}
              className={`px-6 py-2 rounded-lg font-medium transition-all capitalize ${
                activeFilter === service ? "bg-primary text-white" : "bg-background text-foreground hover:bg-primary/10"
              }`}
            >
              {service === "all" ? "All Projects" : service}
            </button>
          ))}
        </div>

        {/* MASONRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-105"
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all flex flex-col justify-end p-4">
                <h3 className="text-white font-bold text-lg">{project.title}</h3>
                <p className="text-gray-200 text-sm">{project.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <Image
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                width={600}
                height={400}
                className="w-full h-auto"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">{selectedProject.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
              <p className="text-foreground mb-6">{selectedProject.details}</p>
              <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold transition-all">
                Request Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
