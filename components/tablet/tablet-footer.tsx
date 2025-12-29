import Image from "next/image"

export function TabletFooter() {
  return (
    <footer
      id="footer-tablet"
      className="bg-[#FFEFD5] border-t border-[#3d2b1f]/10"
      style={{ paddingTop: "clamp(2rem, 5vw, 5rem)", paddingBottom: "clamp(1rem, 2vw, 2rem)" }}
    >
      <div className="max-w-[1000px] mx-auto px-8">
        <div className="pb-8 border-b border-[#3d2b1f]/10">
          {/* Logo */}
          <div className="flex justify-start mb-10">
            <div className="flex items-center bg-white/[0.04] p-3 px-4 rounded-lg">
              <div className="relative w-32 h-32 flex-shrink-0 pointer-events-none select-none" draggable={false}>
                <Image
                  src="/images/footer-image/Footer.png"
                  alt="DG Realtors Logo"
                  fill
                  loading="lazy"
                  sizes="128px"
                  className="object-contain"
                />
              </div>
              <div className="-ml-4 flex flex-col justify-center">
                <span className="font-serif font-semibold text-2xl md:text-3xl text-[#3d2b1f] block">realtors</span>
                <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#3d2b1f]/60 font-bold">
                  Property Consultants
                </span>
              </div>
            </div>
          </div>

          {/* Address & Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Address */}
            <div className="text-center md:text-left">
              <h4 className="text-[#C2703E] text-xs font-bold uppercase tracking-[0.2em] mb-4">Address</h4>
              <div className="text-[#5c4a3d] text-base leading-7 space-y-1 font-semibold">
                <p>Shop No 19, Shahu Market Basement</p>
                <p>M.G.Road, Naupada</p>
                <p>Opp Naupada Police Station</p>
                <p>Thane (W), Thane 400602</p>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right">
              <h4 className="text-[#C2703E] text-xs font-bold uppercase tracking-[0.2em] mb-4">Contact</h4>
              <div className="text-base leading-7 space-y-1">
                <p>
                  <span className="text-[#C2703E] font-medium">Telephone: </span>
                  <a
                    href="tel:022-25300113"
                    className="text-[#3d2b1f] font-semibold hover:text-[#C2703E] transition-colors"
                  >
                    022-25300113
                  </a>
                </p>
                <p>
                  <span className="text-[#C2703E] font-medium">Email: </span>
                  <a
                    href="mailto:dgrealtors@ymail.com"
                    className="text-[#3d2b1f] font-semibold hover:text-[#C2703E] transition-colors"
                  >
                    dgrealtors@ymail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 text-center">
          <p className="text-[#3d2b1f]/70 text-xs tracking-wider font-bold">© 2025 DG realtors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
