"use client"

const clients = [
  { name: "Urban Retail Co.", type: "Retail" },
  { name: "TechSpace Inc.", type: "Office" },
  { name: "Green Valley Foods", type: "Warehouse" },
  { name: "Artisan Collective", type: "Mixed-Use" },
  { name: "Metro Finance Group", type: "Office" },
  { name: "Fresh Market", type: "Retail" },
]

const highlights = [
  { metric: "2.5M+", label: "Square Feet Leased" },
  { metric: "$120M", label: "Transaction Volume" },
  { metric: "150+", label: "Happy Clients" },
]

export default function ShowcaseSection() {
  return (
    <section id="showcase" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">Our Track Record</span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground tracking-tight text-balance">
            Trusted by Growing Businesses
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
            From startups to established enterprises, we've helped businesses of all sizes find their perfect space.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-16 max-w-3xl mx-auto">
          {highlights.map((item, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-card rounded-sm shadow-sm">
              <div className="font-serif text-2xl sm:text-3xl lg:text-4xl text-primary mb-1">{item.metric}</div>
              <div className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Client Logos / Names Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {clients.map((client, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-sm border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 text-center"
            >
              {/* 
                =============================================
                CLIENT LOGOS - Replace with actual logos
                =============================================
                Replace the placeholder with <img> tags for actual client logos
                Example: <img src="/logos/client-logo.png" alt="Client Name" className="h-8 mx-auto" />
              */}
              <div className="w-12 h-12 mx-auto mb-3 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="font-serif text-lg text-primary">{client.name.charAt(0)}</span>
              </div>
              <div className="font-medium text-sm text-foreground truncate">{client.name}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mt-1">{client.type}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <blockquote className="mt-16 max-w-3xl mx-auto text-center">
          <p className="font-serif text-xl sm:text-2xl text-foreground italic leading-relaxed">
            "Prime Locations helped us find the perfect headquarters in just three weeks. Their market knowledge and
            negotiation skills saved us over $200K on our 5-year lease."
          </p>
          <footer className="mt-6">
            <div className="font-medium text-foreground">Sarah Chen</div>
            <div className="text-sm text-muted-foreground">CEO, TechSpace Inc.</div>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
