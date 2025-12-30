"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()

    const desktopId = `${sectionId}-desktop`
    const element = document.getElementById(desktopId)

    if (element) {
      const headerHeight = 96
      const elementRect = element.getBoundingClientRect()
      const absoluteElementTop = elementRect.top + window.pageYOffset
      const offsetPosition = absoluteElementTop - headerHeight

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth",
      })

      history.replaceState(null, "", window.location.pathname)
    }
    setIsMenuOpen(false)
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMenuOpen
          ? "bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20 sm:h-20 md:h-24 lg:h-24">
          <a
            href="#hero-desktop"
            onClick={(e) => scrollToSection(e, "hero")}
            className="flex items-center group focus:outline-none z-50"
          >
            <div className="relative w-24 h-24 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-28 lg:h-28">
              <Image
                src="/images/header-image/Header.png"
                alt="DG Realtors Logo"
                fill
                className="object-contain pointer-events-none select-none"
                draggable={false}
                priority
              />
            </div>
            <div className="flex flex-col -ml-1 sm:-ml-2 md:-ml-2 lg:-ml-3">
              <span
                className={`font-serif font-semibold text-xl sm:text-xl md:text-2xl lg:text-2xl tracking-tight transition-colors duration-300 ${
                  isScrolled || isMenuOpen ? "text-foreground" : "text-white"
                }`}
              >
                realtors
              </span>
              <span
                className={`font-bold text-[10px] sm:text-[10px] md:text-[11px] lg:text-xs uppercase tracking-[0.14em] sm:tracking-[0.16em] md:tracking-[0.18em] lg:tracking-[0.2em] transition-colors duration-300 ${
                  isScrolled || isMenuOpen ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                Property Consultants
              </span>
            </div>
          </a>

          <button
            className="lg:hidden z-50 p-2 -mr-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation"
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-5 flex flex-col justify-between">
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  isScrolled || isMenuOpen ? "bg-foreground" : "bg-white"
                } ${isMenuOpen ? "rotate-45 translate-y-[9px]" : ""}`}
              />
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  isScrolled || isMenuOpen ? "bg-foreground" : "bg-white"
                } ${isMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                  isScrolled || isMenuOpen ? "bg-foreground" : "bg-white"
                } ${isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""}`}
              />
            </div>
          </button>

          {/* Desktop nav - Updated links to use scrollToSection */}
          <nav className="hidden lg:flex items-center gap-8 lg:gap-12">
            <a
              href="#about-desktop"
              onClick={(e) => scrollToSection(e, "about")}
              className={`relative text-lg lg:text-xl font-medium tracking-wide transition-colors duration-300 py-2 group ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
            <a
              href="#footer-desktop"
              onClick={(e) => scrollToSection(e, "footer")}
              className={`relative text-lg lg:text-xl font-medium tracking-wide transition-colors duration-300 py-2 group ${
                isScrolled ? "text-foreground" : "text-white"
              }`}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          </nav>

          {/* Mobile nav - Updated links to use scrollToSection */}
          <div
            className={`lg:hidden fixed left-0 right-0 top-20 sm:top-20 md:top-24 z-40 transition-all duration-300 bg-background/95 backdrop-blur-xl rounded-xl border border-border/50 shadow-xl overflow-hidden`}
          >
            <nav className="mx-4 sm:mx-6">
              <div className="flex flex-col">
                <a
                  href="#about-desktop"
                  onClick={(e) => scrollToSection(e, "about")}
                  className="text-lg font-medium text-foreground hover:bg-muted/50 hover:text-accent transition-colors duration-200 px-6 py-4 border-b border-border/30"
                >
                  About
                </a>
                <a
                  href="#footer-desktop"
                  onClick={(e) => scrollToSection(e, "footer")}
                  className="text-lg font-medium text-foreground hover:bg-muted/50 hover:text-accent transition-colors duration-200 px-6 py-4"
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>

          {/* Backdrop overlay for closing menu */}
          {isMenuOpen && (
            <div
              className="lg:hidden fixed inset-0 top-20 sm:top-20 md:top-24 z-30 bg-black/20"
              onClick={handleLinkClick}
            />
          )}
        </div>
      </div>
    </header>
  )
}
