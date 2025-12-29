"use client"

import type React from "react"

const HomeIcon = () => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const UserIcon = () => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const AwardIcon = () => (
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
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
)

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

interface TabletMenuProps {
  isOpen: boolean
  onClose: () => void
  scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void
}

const menuItems = [
  { id: "hero", label: "Home", icon: HomeIcon },
  { id: "about", label: "About", icon: UserIcon },
  { id: "awards", label: "Awards", icon: AwardIcon },
  { id: "footer", label: "Contact", icon: PhoneIcon },
]

export function TabletMenu({ isOpen, onClose, scrollToSection }: TabletMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-[320px] bg-gradient-to-b from-[#FDF8F3] to-[#F5E6D3] shadow-2xl transition-transform duration-500 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

        <div className="flex flex-col h-full pt-28 pb-8 px-8">
          {/* Menu Items */}
          <nav className="flex-1">
            <ul className="space-y-4">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  className={`transform transition-all duration-500 ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: isOpen ? `${index * 75}ms` : "0ms" }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl text-foreground bg-white/40 border border-white/60 shadow-sm hover:bg-white/70 hover:shadow-md hover:border-accent/30 hover:text-accent transition-all duration-300 group"
                  >
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <item.icon />
                    </span>
                    <span className="font-semibold text-lg tracking-wide">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer Info */}
          <div
            className={`mt-auto pt-6 transform transition-all duration-500 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
          >
            <div className="bg-white/30 rounded-xl py-4 px-3 border border-white/50">
              <p className="text-sm font-medium text-foreground/80 text-center">
                DG realtors <span className="text-accent">&bull;</span> Since 2008
              </p>
              <p className="text-[11px] text-muted-foreground/70 text-center mt-1 tracking-wide">MAHARERA Registered</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
