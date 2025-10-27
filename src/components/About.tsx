/*
 * component: About.tsx
 * purpose: About section with company information
 * 
 * EDIT INSTRUCTIONS:
 * - Change company description: Edit the paragraphs (lines 30-50)
 * - Update stats: Modify the 'stats' array (lines 18-25)
 */

import { Award, Users, Package, Clock } from "lucide-react";

// EDIT: Company statistics
const stats = [
  { icon: Package, value: "10,000+", label: "Projects Completed" },
  { icon: Users, value: "5,000+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "24/7", label: "Customer Support" }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Barak Advert</span>
            </h2>
            {/* EDIT: Company description */}
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Barak Advert is your trusted partner for all printing and signage solutions. 
                With over 15 years of experience in the industry, we've helped thousands of 
                businesses bring their brand vision to life.
              </p>
              <p>
                From eye-catching neon signs to professional corporate printing, we combine 
                cutting-edge technology with traditional craftsmanship to deliver exceptional 
                results every time.
              </p>
              <p>
                Our commitment to quality, fast turnaround times, and competitive pricing has 
                made us the preferred choice for businesses across the region. We don't just 
                print – we create lasting impressions.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="bg-card p-6 rounded-xl shadow-orange text-center hover:-translate-y-2 transition-transform"
                >
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
