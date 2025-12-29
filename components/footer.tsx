import Image from "next/image"

export default function Footer() {
  return (
    <footer
      id="footer-desktop"
      className="bg-[#FFEFD5] border-t border-[#3d2b1f]/10"
      style={{ paddingTop: "clamp(2rem, 5vw, 6rem)", paddingBottom: "clamp(1rem, 2vw, 3rem)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="pb-6 sm:pb-12 border-b border-[#3d2b1f]/10">
          <div className="flex justify-center md:justify-start mb-6 sm:mb-10 pt-2 sm:pt-4 md:pt-0">
            <div className="flex items-center bg-white/[0.04] p-2 sm:p-3 px-3 sm:px-4 rounded-lg">
              <div
                className="relative w-28 h-28 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 flex-shrink-0 pointer-events-none select-none"
                draggable={false}
              >
                <Image
                  src="/images/footer-image/Footer.png"
                  alt="DG Realtors Logo"
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 112px, 160px"
                  className="object-contain"
                />
              </div>
              <div className="-ml-2 sm:-ml-3 md:-ml-4 flex flex-col justify-center">
                <span className="font-serif font-semibold text-xl sm:text-2xl md:text-3xl text-[#3d2b1f] block">
                  realtors
                </span>
                <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[#3d2b1f]/60 font-bold">
                  Property Consultants
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Address */}
            <div className="text-center md:text-left">
              <h4 className="text-[#C2703E] text-xs font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">Address</h4>
              <div className="text-[#5c4a3d] text-sm sm:text-base leading-6 sm:leading-7 space-y-0.5 sm:space-y-1 font-medium">
                <p>Shop No 19, Shahu Market Basement</p>
                <p>M.G.Road, Naupada</p>
                <p>Opp Naupada Police Station</p>
                <p>Thane (W), Thane 400602</p>
              </div>
            </div>

            {/* Right: Contact */}
            <div className="text-center md:text-right">
              <h4 className="text-[#C2703E] text-xs font-bold uppercase tracking-[0.2em] mb-3 sm:mb-4">Contact</h4>
              <div className="text-sm sm:text-base leading-6 sm:leading-7 space-y-0.5 sm:space-y-1">
                <p>
                  <span className="text-[#8b7355] font-medium">Telephone: </span>
                  <a
                    href="tel:022-25300113"
                    className="text-[#3d2b1f] font-semibold hover:text-[#C2703E] transition-colors"
                  >
                    022-25300113
                  </a>
                </p>
                <p>
                  <span className="text-[#8b7355] font-medium">Email: </span>
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
        <div className="pt-6 sm:pt-8 text-center">
          <p className="text-[#3d2b1f]/70 text-xs tracking-wider font-bold">© 2025 DG realtors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
