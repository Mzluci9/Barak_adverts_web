/**
 * COMPONENT: About
 * PURPOSE: Display company background, experience, and core values
 * NOTE: Safe to edit description, values, or team/media sections
 */

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* TEXT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Barak Advert
            </h2>

            {/* Intro paragraphs */}
            <p className="text-lg text-muted-foreground mb-4">
              With over 15 years of experience in the printing and signage
              industry, Barak Advert has become a trusted partner for 
              businesses of all sizes.
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              We specialize in creating eye-catching advertising solutions,
              from traditional billboards to modern neon signs and custom
              merchandise. Our team of skilled professionals is dedicated
              to bringing your vision to life with precision and creativity.
            </p>

            {/* CORE VALUES SECTION */}
            <div className="space-y-4">

              {/* Value Item */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Quality First</h3>
                  <p className="text-muted-foreground">
                    Premium materials and expert craftsmanship in every project
                  </p>
                </div>
              </div>

              {/* Value Item */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Fast Turnaround</h3>
                  <p className="text-muted-foreground">
                    Quick delivery without compromising on quality
                  </p>
                </div>
              </div>

              {/* Value Item */}
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Customer Support</h3>
                  <p className="text-muted-foreground">
                    Dedicated team ready to help with your needs
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* IMAGE / MEDIA BLOCK */}
          <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=400&width=400"
              alt="Barak Advert team"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
