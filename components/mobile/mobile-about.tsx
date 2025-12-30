"use client"

import { useState } from "react"

export function MobileAbout() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="about" className="relative py-10 lg:hidden scroll-mt-16" style={{ backgroundColor: "#FAF0E6" }}>
      <div className="px-5">
        {/* Profile Card */}
        <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="relative aspect-[4/3] overflow-hidden">
            {!imgError ? (
              <img
                src="/images/about-me-image/Owners-About-Me-Pic.jpg"
                alt="Dattaram B Gorivale"
                className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
                draggable={false}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#3d2b1f] via-[#5c4a3d] to-[#8b7355] flex items-center justify-center">
                <div className="text-center text-white/80">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-3xl font-serif font-bold">DG</span>
                  </div>
                </div>
              </div>
            )}
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)",
              }}
            />
            {/* Name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-accent text-[10px] uppercase tracking-[0.2em] font-semibold mb-1">About Me</p>
              <h2 className="font-serif text-white text-2xl font-medium leading-tight">Dattaram B Gorivale</h2>
              <p className="text-white/80 text-sm mt-1">Proprietor &bull; Property Consultants</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-5 pt-6">
            {/* Quote */}
            <div className="flex items-start gap-3 mb-5">
              <div className="w-1 h-12 bg-accent rounded-full flex-shrink-0" />
              <p className="font-serif text-foreground/80 text-xl italic leading-relaxed">"Sign of Trust"</p>
            </div>

            {/* Description */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              For over 17 years, DG Realtors has helped business in Maharashtra find the right Commercial retail and
              Office spaces. Our commitment to integrity and personalized service ensures you secure a location that
              perfectly matches your specific requirements.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-6 pt-5 border-t border-border/50">
              <div>
                <p className="font-serif text-4xl font-medium text-foreground">17+</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Years Experience</p>
              </div>
              <div className="w-px h-12 bg-border/50" />
              <div>
                <p className="font-serif text-4xl font-medium text-foreground">2008</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Established</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #F5DEB3 100%)",
        }}
      />
    </section>
  )
}
