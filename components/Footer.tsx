"use client"

import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

/**
 * COMPONENT: Footer
 * PURPOSE: Modern, visually striking footer with links and social media
 * EDIT: Change company info, links, social handles, or contact details
 * STYLE: Orange/white theme with dark background, animations, and hover effects
 */

const TikTok = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 0 1-2.4 2.4 2.4 2.4 0 0 1-2.4-2.4 2.4 2.4 0 0 1 2.4-2.4c.34 0 .67.05.98.15V9.48a5.64 5.64 0 0 0-.98-.08c-3.14 0-5.68 2.54-5.68 5.68s2.54 5.68 5.68 5.68a5.68 5.68 0 0 0 5.68-5.68v-2.7a7.63 7.63 0 0 0 3.77 1.02V9.71a4.83 4.83 0 0 1-1.02-.12z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-slate-950 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MAIN FOOTER CONTENT */}
        <div className="py-16">
          <div className="grid md:grid-cols-5 gap-12 mb-12">
            {/* COMPANY INFO */}
            <div className="md:col-span-1">
              <h4 className="text-xl font-bold mb-6 text-primary">Barak Advert</h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Professional printing and sign services for your business needs.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors cursor-pointer group">
                  <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors cursor-pointer group">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">info@barakadvert.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-primary transition-colors cursor-pointer group">
                  <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">123 Business St, City</span>
                </div>
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="font-bold mb-6 text-white">Services</h4>
              <ul className="space-y-3">
                {["Advertising", "Neon Signs", "Lightbox", "T-Shirt Printing", "Mug Printing", "ID Printing"].map(
                  (service) => (
                    <li key={service}>
                      <a
                        href="#services"
                        className="text-slate-400 hover:text-primary transition-colors text-sm group flex items-center gap-2"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                        {service}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="font-bold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Portfolio", "Contact", "Shop", "Blog", "Careers"].map((item) => (
                  <li key={item}>
                    <a
                      href={
                        item === "About Us"
                          ? "#about"
                          : item === "Portfolio"
                            ? "#portfolio"
                            : item === "Contact"
                              ? "#contact"
                              : "#"
                      }
                      className="text-slate-400 hover:text-primary transition-colors text-sm group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="font-bold mb-6 text-white">Legal</h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-slate-400 hover:text-primary transition-colors text-sm group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOCIAL MEDIA */}
            <div>
              <h4 className="font-bold mb-6 text-white">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, label: "Facebook", href: "#" },
                  { icon: Instagram, label: "Instagram", href: "#" },
                  { icon: Twitter, label: "Twitter", href: "#" },
                  { icon: Linkedin, label: "LinkedIn", href: "#" },
                  { icon: TikTok, label: "TikTok", href: "https://www.tiktok.com/@barakadvert?_r=1&_t=ZM-912jTA13xuO" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 bg-slate-900 hover:bg-primary text-slate-400 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 group hover:scale-110"
                    title={label}
                  >
                    <Icon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent mb-8"></div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
            <p>&copy; 2025 Barak Advert. All rights reserved. | Crafted with passion for your brand.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-primary transition-colors">
                Sitemap
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                RSS Feed
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
