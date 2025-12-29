"use client"

import Image from "next/image"

export function TabletAbout() {
  return (
    <section id="about-tablet" className="relative" style={{ backgroundColor: "#FAF0E6" }}>
      <div className="py-12 md:py-20">
        <div className="max-w-[1000px] mx-auto px-8">
          <div className="grid md:grid-cols-2 items-center gap-10 md:gap-16">
            {/* Photo - Left on tablet */}
            <div className="relative order-2 md:order-1">
              <div className="aspect-[4/5] w-full max-w-sm mx-auto md:max-w-none rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <Image
                  src="/images/about-me-image/Owners-About-Me-Pic.jpg"
                  alt="Dattaram B Gorivale - Proprietor of DG Realtors"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 384px, 50vw"
                  className="object-cover pointer-events-none select-none"
                  draggable={false}
                />
                <div className="absolute inset-0 z-20" onContextMenu={(e) => e.preventDefault()} />
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-secondary rounded-2xl -z-10 hidden md:block" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-accent/30 rounded-2xl -z-10 hidden md:block" />
            </div>

            {/* Text Content - Right on tablet */}
            <div className="order-1 md:order-2 text-center md:text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-accent mb-2 font-semibold">About Me</p>
              <p className="text-base md:text-lg text-muted-foreground mb-3">DG realtors &bull; Since 2008</p>
              <h2 className="font-serif text-foreground text-3xl md:text-4xl font-medium leading-tight mb-3">
                Dattaram B Gorivale
              </h2>
              <p className="text-base md:text-lg text-accent font-medium mb-6">
                Proprietor &bull; Property Consultants
              </p>

              <blockquote className="border-l-4 border-accent pl-4 md:pl-6 py-1 mb-6">
                <p className="font-serif text-foreground/80 text-xl md:text-2xl italic leading-relaxed">
                  "Sign of Trust"
                </p>
              </blockquote>

              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                For over 17 years, DG Realtors has helped businesses in Maharashtra find the right retail and office
                spaces. Our commitment to integrity and personalized service ensures you secure a location that
                perfectly matches your specific requirements.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <div>
                  <p className="font-serif text-4xl md:text-5xl font-medium text-foreground">17+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Years Experience</p>
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
