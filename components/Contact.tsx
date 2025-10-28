/**
 * COMPONENT: Contact
 * PURPOSE: Contact information and location
 * EDIT: Change phone, email, address, or social links
 */

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Get In Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Contact us today!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* PHONE */}
          <div className="bg-background rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary/5 cursor-pointer">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-bold text-foreground mb-2">Phone</h3>
            <a href="tel:+251911234567" className="text-primary hover:text-primary-dark font-bold">
              +251 911 234 567
            </a>
          </div>

          {/* EMAIL */}
          <div className="bg-background rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary/5 cursor-pointer">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-bold text-foreground mb-2">Email</h3>
            <a href="mailto:info@barakadvert.com" className="text-primary hover:text-primary-dark font-bold">
              info@barakadvert.com
            </a>
          </div>

          {/* WHATSAPP */}
          <div className="bg-background rounded-lg p-8 text-center transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-primary/5 cursor-pointer">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-bold text-foreground mb-2">WhatsApp</h3>
            <a href="https://wa.me/251911234567" className="text-primary hover:text-primary-dark font-bold">
              Chat with us
            </a>
          </div>
        </div>

        {/* MAP PLACEHOLDER */}
        <div className="bg-muted rounded-lg h-96 overflow-hidden mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6829123456!2d38.7469!3d9.0320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnOTIuNyJOIDM4wrA0NCc0NC4wIkU!5e0!3m2!1sen!2set!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* CONTACT FORM */}
        <div className="max-w-2xl mx-auto bg-background rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
          <form className="space-y-4">
            <div>
              <label className="block font-bold text-foreground mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block font-bold text-foreground mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block font-bold text-foreground mb-2">Message</label>
              <textarea
                className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Your message..."
                rows={5}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold transition-all neon-glow"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
