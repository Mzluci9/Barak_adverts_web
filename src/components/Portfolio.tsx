/*
 * component: Portfolio.tsx
 * purpose: Filterable portfolio gallery with masonry grid layout
 * 
 * EDIT INSTRUCTIONS:
 * - Add/remove portfolio items: Edit the 'portfolioItems' array below (lines 18-80)
 * - Add new filter categories: Update 'categories' array (line 15)
 * - Change layout: Modify grid classes on line 140
 */

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// EDIT: Filter categories
const categories = ["All", "Neon", "T-shirt", "Lightbox", "Mug", "ID", "Advertising"];

// EDIT: Portfolio items - add your own projects here
const portfolioItems = [
  {
    id: 1,
    title: "Corporate Neon Signage",
    category: "Neon",
    image: "/placeholder.svg",
    description: "Custom neon sign for tech startup office",
    tags: ["Neon", "Corporate"]
  },
  {
    id: 2,
    title: "Event T-Shirt Design",
    category: "T-shirt",
    image: "/placeholder.svg",
    description: "Custom printed shirts for music festival",
    tags: ["T-shirt", "Events"]
  },
  {
    id: 3,
    title: "Restaurant Lightbox",
    category: "Lightbox",
    image: "/placeholder.svg",
    description: "Illuminated menu board installation",
    tags: ["Lightbox", "Restaurant"]
  },
  {
    id: 4,
    title: "Corporate Gift Mugs",
    category: "Mug",
    image: "/placeholder.svg",
    description: "Branded ceramic mugs for client gifts",
    tags: ["Mug", "Corporate"]
  },
  {
    id: 5,
    title: "Employee ID Cards",
    category: "ID",
    image: "/placeholder.svg",
    description: "Professional ID card system for enterprise",
    tags: ["ID", "Corporate"]
  },
  {
    id: 6,
    title: "Billboard Campaign",
    category: "Advertising",
    image: "/placeholder.svg",
    description: "Large format outdoor advertising campaign",
    tags: ["Advertising", "Outdoor"]
  },
  {
    id: 7,
    title: "Retail Neon Display",
    category: "Neon",
    image: "/placeholder.svg",
    description: "Eye-catching storefront neon installation",
    tags: ["Neon", "Retail"]
  },
  {
    id: 8,
    title: "Team Uniform Printing",
    category: "T-shirt",
    image: "/placeholder.svg",
    description: "Custom sports team jerseys with numbers",
    tags: ["T-shirt", "Sports"]
  }
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All"
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Portfolio</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of completed projects across printing and signage services.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-orange scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid - EDIT: Adjust grid layout here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card 
              key={item.id}
              className="group overflow-hidden hover:shadow-orange transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative h-64 bg-secondary overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-primary-foreground text-sm">{item.description}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
