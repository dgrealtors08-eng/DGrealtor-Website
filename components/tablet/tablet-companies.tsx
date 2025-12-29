"use client"

import Image from "next/image"

const companies = [
  {
    name: "Wellness Forever",
    logo: "/images/company-logos-image/wellness-forever.png",
    height: 200,
    widthMultiplier: 1.2,
  },
  { name: "ICICI Bank", logo: "/images/company-logos-image/icici-bank.png", height: 120, widthMultiplier: 1.2 },
  { name: "The EleFant", logo: "/images/company-logos-image/the-elefant.png", height: 180, widthMultiplier: 1.8 },
  {
    name: "Amazon Logistics",
    logo: "/images/company-logos-image/amazon-logistics.png",
    height: 140,
    widthMultiplier: 1.2,
  },
  { name: "Honda BigWing", logo: "/images/company-logos-image/honda-bigwing.png", height: 180, widthMultiplier: 1.2 },
  { name: "Clove Dental", logo: "/images/company-logos-image/clove-dental.png", height: 130, widthMultiplier: 1.6 },
  { name: "Godrej Group", logo: "/images/company-logos-image/godrej.png", height: 200, widthMultiplier: 0.9 },
  { name: "Lodha Group", logo: "/images/company-logos-image/lodha.png", height: 200, widthMultiplier: 0.9 },
  { name: "Dominos", logo: "/images/company-logos-image/dominos.png", height: 90, widthMultiplier: 1.4 },
  { name: "Canara Bank", logo: "/images/company-logos-image/canara-bank.png", height: 80, widthMultiplier: 1.4 },
  { name: "TBZ", logo: "/images/company-logos-image/tbz.png", height: 90, widthMultiplier: 1.5 },
  { name: "McDonalds", logo: "/images/company-logos-image/mcdonalds.png", height: 70, widthMultiplier: 1.4 },
  { name: "DMart", logo: "/images/company-logos-image/dmart.png", height: 140, widthMultiplier: 1.4 },
  { name: "NKGSB Bank", logo: "/images/company-logos-image/nkgsb-bank.png", height: 100, widthMultiplier: 2.2 },
]

export function TabletCompanies() {
  const allCompanies = [...companies, ...companies]

  return (
    <section id="companies-tablet" className="w-full" style={{ scrollMarginTop: "5rem", backgroundColor: "#FAEBD7" }}>
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 100%)",
        }}
      />

      <div className="py-12 md:py-16">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="text-center mb-8 md:mb-12 px-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-4 font-medium">Our Clients</p>
            <h2 className="font-serif text-foreground text-2xl md:text-3xl font-medium">
              Companies We Have Worked With
            </h2>
          </div>

          <div className="relative w-full overflow-hidden mask-gradient-x">
            <div className="carousel-track">
              {allCompanies.map((company, index) => (
                <div key={index} className="carousel-item">
                  <div
                    className="relative shrink-0"
                    style={{
                      height: `clamp(${company.height * 0.5}px, ${company.height * 0.12}vw, ${company.height * 0.8}px)`,
                      width: `clamp(${company.height * company.widthMultiplier * 0.5}px, ${company.height * company.widthMultiplier * 0.12}vw, ${company.height * company.widthMultiplier * 0.8}px)`,
                    }}
                  >
                    <Image
                      src={company.logo || "/placeholder.svg"}
                      alt={`${company.name} logo`}
                      fill
                      sizes="160px"
                      loading="lazy"
                      className="object-contain object-center pointer-events-none select-none"
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
