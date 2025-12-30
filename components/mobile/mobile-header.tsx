"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MobileMenu } from "./mobile-menu"

export function MobileHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 72
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      history.replaceState(null, "", window.location.pathname)
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 lg:hidden ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-border/30"
            : "bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-[72px] px-5">
          <a href="#hero" onClick={(e) => scrollToSection(e, "hero")} className="flex items-center gap-1 z-50">
            <div className="relative w-24 h-24 flex items-center justify-center">
              {!imgError ? (
                <img
                  src="/images/header-image/Header.png"
                  alt="DG Realtors"
                  className="w-full h-full object-contain pointer-events-none select-none"
                  draggable={false}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent font-serif font-bold text-xl">DG</span>
                </div>
              )}
            </div>
            <div className="flex flex-col -ml-4">
              <span
                className={`font-serif font-semibold text-xl tracking-tight leading-tight transition-colors duration-300 ${
                  isScrolled ? "text-foreground" : "text-white"
                }`}
              >
                realtors
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-[0.12em] -mt-0.5 transition-colors duration-300 ${
                  isScrolled ? "text-muted-foreground" : "text-white/70"
                }`}
              >
                Property Consultants
              </span>
            </div>
          </a>

          {/* Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`relative z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled || isMenuOpen ? "bg-primary/10 hover:bg-primary/20" : "bg-white/10 hover:bg-white/20"
            }`}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-[5px] w-5">
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  isScrolled || isMenuOpen ? "bg-foreground" : "bg-white"
                } ${isMenuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  isScrolled || isMenuOpen ? "bg-foreground" : "bg-white"
                } ${isMenuOpen ? "opacity-0 scale-0" : ""}`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  isScrolled || isMenuOpen ? "bg-foreground" : "bg-white"
                } ${isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} scrollToSection={scrollToSection} />
    </>
  )
}
