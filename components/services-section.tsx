const Building2Icon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const FileSearchIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3" />
    <path d="m9 18-1.5-1.5" />
    <circle cx="5" cy="14" r="3" />
  </svg>
)

const HandshakeIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
    <path d="m21 3 1 11h-2" />
    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
    <path d="M3 4h8" />
  </svg>
)

const services = [
  {
    Icon: Building2Icon,
    title: "Property Search",
    description:
      "Access our extensive database of commercial properties. From retail storefronts to corporate offices, we find spaces that match your vision.",
  },
  {
    Icon: MapPinIcon,
    title: "Location Analysis",
    description:
      "In-depth market research and demographic analysis to ensure your business thrives in its new location. Data-driven decisions for lasting success.",
  },
  {
    Icon: FileSearchIcon,
    title: "Lease Negotiation",
    description:
      "Expert negotiation to secure favorable terms. We advocate for your interests, ensuring transparent and fair lease agreements.",
  },
  {
    Icon: HandshakeIcon,
    title: "Full-Service Support",
    description:
      "From initial consultation to final walkthrough, we're with you every step. Comprehensive support that goes beyond the transaction.",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32 bg-card">
      <div className="max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 lg:mb-14 xl:mb-16 2xl:mb-20">
          <span className="text-primary text-xs md:text-sm xl:text-sm 2xl:text-base font-medium tracking-[0.3em] uppercase">
            What We Do
          </span>
          <h2 className="mt-3 md:mt-4 xl:mt-5 2xl:mt-6 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-foreground tracking-tight text-balance">
            Our Services
          </h2>
          <p className="mt-3 md:mt-4 xl:mt-5 2xl:mt-6 max-w-2xl 2xl:max-w-3xl mx-auto text-muted-foreground leading-relaxed text-sm md:text-base xl:text-base 2xl:text-lg">
            Comprehensive commercial real estate solutions tailored to your business needs. We simplify the complex.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
          {services.map((service, index) => (
            <article
              key={index}
              className="group p-5 md:p-6 lg:p-8 xl:p-9 2xl:p-10 bg-background rounded-sm border border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 xl:w-16 xl:h-16 2xl:w-18 2xl:h-18 bg-primary/10 rounded-sm flex items-center justify-center mb-4 md:mb-6 xl:mb-7 2xl:mb-8 group-hover:bg-primary transition-colors">
                <service.Icon className="w-6 h-6 md:w-7 md:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-lg md:text-xl xl:text-xl 2xl:text-2xl text-foreground mb-2 md:mb-3 xl:mb-4 2xl:mb-5">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm xl:text-sm 2xl:text-base leading-relaxed">
                {service.description}
              </p>

              {/* Decorative line */}
              <div className="mt-4 md:mt-6 xl:mt-7 2xl:mt-8 w-8 h-0.5 bg-primary/30 group-hover:w-full group-hover:bg-primary transition-all duration-300" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
