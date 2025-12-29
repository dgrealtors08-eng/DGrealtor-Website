"use client"

import { useState } from "react"

const companies = [
  { name: "Amazon Logistics", logo: "/images/company-logos-image/amazon-logistics.png", scale: "scale-100" },
  { name: "ICICI Bank", logo: "/images/company-logos-image/icici-bank.png", scale: "scale-150" },
  { name: "Clove Dental", logo: "/images/company-logos-image/clove-dental.png", scale: "scale-125" },
  { name: "Domino's", logo: "/images/company-logos-image/dominos.png", scale: "scale-90" },
  { name: "DMart", logo: "/images/company-logos-image/dmart.png", scale: "scale-125" },
  { name: "Lodha Group", logo: "/images/company-logos-image/lodha.png", scale: "scale-[1.75]" },
  { name: "Canara Bank", logo: "/images/company-logos-image/canara-bank.png", scale: "scale-90" },
  { name: "Honda BigWing", logo: "/images/company-logos-image/honda-bigwing.png", scale: "scale-125" },
  { name: "Godrej Group", logo: "/images/company-logos-image/godrej.png", scale: "scale-[2]" },
  { name: "McDonald's", logo: "/images/company-logos-image/mcdonalds.png", scale: "scale-75" },
  { name: "TBZ", logo: "/images/company-logos-image/tbz.png", scale: "scale-100" },
  { name: "The EleFant", logo: "/images/company-logos-image/the-elefant.png", scale: "scale-150" },
  { name: "Wellness Forever", logo: "/images/company-logos-image/wellness-forever.png", scale: "scale-150" },
  { name: "NKGSB Bank", logo: "/images/company-logos-image/nkgsb-bank.png", scale: "scale-110" },
]

export function MobileCompanies() {
  const allCompanies = [...companies, ...companies]
  const [errorImages, setErrorImages] = useState<Set<string>>(new Set())

  const handleImageError = (logo: string) => {
    setErrorImages((prev) => new Set(prev).add(logo))
  }

  return (
    <section id="companies" className="relative py-10 lg:hidden" style={{ backgroundColor: "#FAEBD7" }}>
      {/* Top shadow line */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, transparent 100%)",
        }}
      />

      <div className="mx-4">
        {" "}
        {/* Increased spacing with mx-4 on container */}
        {/* Header */}
        <div className="text-center mb-6 px-5">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium mb-1">Our Clients</p>
          <h2 className="font-serif text-foreground text-[22px] font-medium">Companies We Have Worked With</h2>
        </div>
        <div className="relative w-full overflow-hidden mask-gradient-x">
          <div className="carousel-track">
            {allCompanies.map((company, index) => (
              <div key={index} className="carousel-item">
                <div className="relative w-32 h-20 flex-shrink-0 flex items-center justify-center mx-4">
                  {" "}
                  {/* Increased horizontal margin from mx-3 to mx-4 for better spacing */}
                  {!errorImages.has(company.logo) ? (
                    <img
                      src={company.logo || "/placeholder.svg"}
                      alt={company.name}
                      className={`max-w-full max-h-full object-contain pointer-events-none select-none ${company.scale}`}
                      draggable={false}
                      onError={() => handleImageError(company.logo)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/50 rounded-lg px-2">
                      <span className="text-xs text-center text-muted-foreground font-medium">{company.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
