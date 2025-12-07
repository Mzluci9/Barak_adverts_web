/**
 * COMPONENT: Contact
 * PURPOSE: Display contact information, map, and a simple contact form
 * NOTE: Safe to modify phone/email/address/social links as needed
 */

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>

          {/* Short description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Contact us today!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">

          {/* PHONE */}
          <div
            className="
              bg-background p-8 rounded-lg text-center cursor-pointer
              transition-all duration-300
              hover:shadow-lg hover:scale-105 hover:bg-primary/5
            "
          >
            <div className="text-4xl mb-4">📞</div>
            <h3 className="font-bold text-foreground mb-2">Phone</h3>
            <a
              href="tel:+251911234567"
              className="text-primary hover:text-primary-dark font-bold"
            >
              +251 911 234 567
            </a>
          </div>

          {/* EMAIL */}
          <div
            className="
              bg-background p-8 rounded-lg text-center cursor-pointer
              transition-all duration-300
              hover:shadow-lg hover:scale-105 hover:bg-primary/5
            "
          >
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-bold text-foreground mb-2">Email</h3>
            <a
              href="mailto:info@barakadvert.com"
              className="text-primary hover:text-primary-dark font-bold"
            >
              info@barakadvert.com
            </a>
          </div>

          {/* WHATSAPP */}
          <div
            className="
              bg-background p-8 rounded-lg text-center cursor-pointer
              transition-all duration-300
              hover:shadow-lg hover:scale-105 hover:bg-primary/5
            "
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-bold text-foreground mb-2">WhatsApp</h3>
            <a
              href="https://wa.me/251911234567"
              className="text-primary hover:text-primary-dark font-bold"
            >
              Chat with us
            </a>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="bg-muted rounded-lg h-96 overflow-hidden mb-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6829123456!2d38.7469!3d9.0320"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-background rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Send us a Message
          </h3>

          <form className="space-y-4">

            {/* Name Field */}
            <div>
              <label className="block font-bold text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                className="
                  w-full px-4 py-3 rounded-lg border border-border
                  focus:ring-2 focus:ring-primary
                "
                placeholder="Your name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block font-bold text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                className="
                  w-full px-4 py-3 rounded-lg border border-border
                  focus:ring-2 focus:ring-primary
                "
                placeholder="your@email.com"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block font-bold text-foreground mb-2">
                Message
              </label>
              <textarea
                className="
                  w-full px-4 py-3 rounded-lg border border-border
                  focus:ring-2 focus:ring-primary
                "
                placeholder="Your message..."
                rows={5}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
                w-full px-6 py-3 rounded-lg font-bold text-white
                bg-primary hover:bg-primary-dark transition-all neon-glow
              "
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
