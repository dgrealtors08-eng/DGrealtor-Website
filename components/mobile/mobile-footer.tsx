"use client"

import { useState } from "react"

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export function MobileFooter() {
  const [imgError, setImgError] = useState(false)

  return (
    <footer id="footer" className="relative py-10 lg:hidden" style={{ backgroundColor: "#FAE8D4" }}>
      <div className="px-5">
        <div className="flex justify-center mb-8">
          <div className="flex items-center p-2 px-3">
            <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
              {!imgError ? (
                <img
                  src="/images/footer-image/Footer.png"
                  alt="DG Realtors"
                  className="w-full h-full object-contain pointer-events-none select-none"
                  draggable={false}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-serif font-bold text-2xl">DG</span>
                </div>
              )}
            </div>
            <div className="-ml-5 flex flex-col">
              <span className="font-serif font-semibold text-2xl text-[#3d2b1f]">realtors</span>
              <span className="text-[9px] uppercase tracking-[0.12em] text-[#3d2b1f]/60 font-bold">
                Property Consultants
              </span>
            </div>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="space-y-3 mb-8">
          {/* Phone Card */}
          <a
            href="tel:022-25300113"
            className="flex items-center gap-4 p-4 bg-[#F5E1C8]/30 rounded-xl active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <PhoneIcon />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-accent font-medium">Telephone</p>
              <p className="text-[#3d2b1f] font-semibold">022-25300113</p>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:dgrealtors@ymail.com"
            className="flex items-center gap-4 p-4 bg-[#F5E1C8]/30 rounded-xl active:scale-[0.98] transition-transform"
          >
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <MailIcon />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-accent font-medium">Email</p>
              <p className="text-[#3d2b1f] font-semibold">dgrealtors@ymail.com</p>
            </div>
          </a>

          {/* Address Card */}
          <div className="flex items-start gap-4 p-4 bg-[#F5E1C8]/30 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-0.5">
              <MapPinIcon />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-accent font-medium mb-1">Address</p>
              <p className="text-[#5c4a3d] text-sm leading-relaxed font-medium">
                Shop No 19, Shahu Market Basement
                <br />
                M.G.Road, Naupada
                <br />
                Opp Naupada Police Station
                <br />
                Thane (W), Thane 400602
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-[#3d2b1f]/10">
          <p className="text-[#3d2b1f]/70 text-xs tracking-wide font-bold">© 2025 DG realtors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
