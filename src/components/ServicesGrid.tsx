/*
 * component: ServicesGrid.tsx
 * purpose: Display all services in a responsive grid
 * 
 * EDIT INSTRUCTIONS:
 * - Add/remove services: Edit the 'services' array below (lines 17-100)
 * - Change service images: Replace image paths in the array
 * - Edit service descriptions: Modify 'title' and 'description' fields
 * - Change grid layout: Adjust the grid classes on line 115
 */

import { Card, CardContent } from "@/components/ui/card";
import { 
  Megaphone, Zap, Lightbulb, Shirt, Coffee, Gift, 
  CreditCard, IdCard, FileText, Calendar, MoreHorizontal 
} from "lucide-react";

// EDIT: Services data - add/remove/modify services as needed
const services = [
  {
    icon: Megaphone,
    title: "Advertising",
    description: "Billboard installations, banners, posters, and comprehensive outdoor advertising solutions that capture attention.",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Neon Light Signs",
    description: "Custom-crafted neon signs with vibrant colors and stunning glow effects for businesses and events.",
    color: "text-primary neon-text"
  },
  {
    icon: Lightbulb,
    title: "Light Box",
    description: "Illuminated display boxes perfect for storefronts, exhibitions, and promotional displays.",
    color: "text-primary"
  },
  {
    icon: Shirt,
    title: "T-Shirt Printing",
    description: "High-quality custom t-shirt printing with advanced techniques for vibrant, long-lasting designs.",
    color: "text-primary"
  },
  {
    icon: Shirt,
    title: "Cape Printing",
    description: "Professional garment branding and cape printing for corporate events and promotional campaigns.",
    color: "text-primary"
  },
  {
    icon: Coffee,
    title: "Mug Printing",
    description: "Personalized ceramic mug printing perfect for corporate gifts, events, and retail merchandise.",
    color: "text-primary"
  },
  {
    icon: Gift,
    title: "Gift Shop & Merch",
    description: "Complete branded merchandise solutions including notebooks, bags, keychains, and promotional items.",
    color: "text-primary"
  },
  {
    icon: IdCard,
    title: "ID Printing",
    description: "Professional ID card printing with high-resolution photos, lamination, and security features.",
    color: "text-primary"
  },
  {
    icon: CreditCard,
    title: "Online Payments",
    description: "Secure payment processing with MasterCard and Visa support for seamless transactions.",
    color: "text-primary"
  },
  {
    icon: Calendar,
    title: "Urgent e-Passport",
    description: "Fast-track e-Passport appointment services with priority processing and expedited delivery.",
    color: "text-primary"
  },
  {
    icon: FileText,
    title: "Normal e-Passport",
    description: "Standard e-Passport appointment booking and processing with professional document support.",
    color: "text-primary"
  },
  {
    icon: MoreHorizontal,
    title: "More Services",
    description: "Vehicle wraps, window graphics, exhibition stands, and custom printing solutions tailored to your needs.",
    color: "text-primary"
  }
];

const ServicesGrid = () => {
  return (
    <section id="services" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to completion, we offer comprehensive printing and signage solutions for businesses of all sizes.
          </p>
        </div>

        {/* Services Grid - EDIT: Adjust grid columns here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-orange transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 hover:border-primary/50"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-secondary group-hover:bg-primary/10 transition-colors">
                      <Icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Payment Badges */}
        <div className="mt-16 flex justify-center items-center gap-8 flex-wrap">
          <div className="flex items-center gap-3">
            <CreditCard className="w-8 h-8 text-primary" />
            <span className="text-lg font-semibold">We Accept</span>
          </div>
          <div className="flex gap-4">
            <div className="px-6 py-3 bg-card border-2 border-border rounded-lg font-bold text-foreground">
              MASTERCARD
            </div>
            <div className="px-6 py-3 bg-card border-2 border-border rounded-lg font-bold text-foreground">
              VISA
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
