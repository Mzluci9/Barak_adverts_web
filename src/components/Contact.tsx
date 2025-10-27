/*
 * component: Contact.tsx
 * purpose: Contact information and map section
 * 
 * EDIT INSTRUCTIONS:
 * - Update contact details: Edit lines 18-35
 * - Change map location: Update the iframe src on line 80
 * - Modify social links: Edit contactInfo array
 */

import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// EDIT: Contact information
const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567"
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+1 (555) 123-4567",
    link: "https://wa.me/15551234567"
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@barakadvert.com",
    link: "mailto:info@barakadvert.com"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "123 Business St, City, Country",
    link: "#"
  }
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a question or ready to start your project? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Information Cards */}
          <div className="space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="hover:shadow-orange transition-all">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <a 
                        href={info.link}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            <Button 
              className="w-full shadow-orange"
              size="lg"
              onClick={() => window.open("https://wa.me/15551234567", "_blank")}
            >
              <MessageCircle className="mr-2" />
              Chat on WhatsApp
            </Button>
          </div>

          {/* Map - EDIT: Replace with your actual location */}
          <Card className="overflow-hidden shadow-orange">
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Barak Advert Location"
              />
            </CardContent>
          </Card>
        </div>

        {/* Business Hours */}
        <Card className="max-w-2xl mx-auto mt-8 shadow-orange">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">Business Hours</h3>
            <div className="grid grid-cols-2 gap-4 text-left max-w-md mx-auto">
              <div className="font-semibold">Monday - Friday:</div>
              <div className="text-muted-foreground">8:00 AM - 6:00 PM</div>
              <div className="font-semibold">Saturday:</div>
              <div className="text-muted-foreground">9:00 AM - 4:00 PM</div>
              <div className="font-semibold">Sunday:</div>
              <div className="text-muted-foreground">Closed</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
