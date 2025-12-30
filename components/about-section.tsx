"use client"

import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about-desktop" className="relative" style={{ backgroundColor: "#FAF0E6" }}>
      <div className="py-4 sm:py-8 lg:py-[clamp(2.5rem,6vw,10rem)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 items-center gap-4 sm:gap-6 lg:gap-20">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] w-full max-w-[200px] sm:max-w-sm md:max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <Image
                  src="/images/about-me-image/Owners-About-Me-Pic.jpg"
                  alt="Dattaram B Gorivale - Proprietor of DG Realtors"
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 384px, (max-width: 1024px) 448px, 50vw"
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                />
                <div className="absolute inset-0 z-20" onContextMenu={(e) => e.preventDefault()} />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-secondary rounded-2xl -z-10 hidden lg:block" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent/30 rounded-2xl -z-10 hidden lg:block" />
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-accent mb-1 sm:mb-2 font-semibold">
                About Me
              </p>
              <p className="text-sm sm:text-lg text-muted-foreground mb-1 sm:mb-2 md:mb-4">
                DG realtors &bull; Since 2008
              </p>
              <h2 className="font-serif text-foreground text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-1 sm:mb-2 md:mb-4">
                Dattaram B Gorivale
              </h2>
              <p className="text-sm sm:text-lg text-accent font-medium mb-2 sm:mb-6 md:mb-8">
                Proprietor &bull; Property Consultants
              </p>

              <blockquote className="border-l-4 border-accent pl-3 sm:pl-4 md:pl-6 py-1 mb-2 sm:mb-6 md:mb-8">
                <p className="font-serif text-foreground/80 text-base sm:text-xl md:text-2xl italic leading-relaxed">
                  "Sign of Trust"
                </p>
              </blockquote>

              <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed mb-2 sm:mb-6 md:mb-8">
                For over 17 years, DG Realtors has helped business in Maharashtra find the right Commercial retail and
                Office spaces. Our commitment to integrity and personalized service ensures you secure a location that
                perfectly matches your specific requirements.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-6 md:gap-8">
                <div>
                  <p className="font-serif text-2xl sm:text-4xl md:text-5xl font-medium text-foreground">17+</p>
                  <p className="text-[10px] sm:text-sm text-muted-foreground uppercase tracking-wider mt-1">
                    Years Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #F5DEB3 100%)",
        }}
      />
    </section>
  )
}
