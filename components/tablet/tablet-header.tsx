"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { TabletMenu } from "./tablet-menu"

export function TabletHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
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
    const tabletId = `${sectionId}-tablet`
    const element = document.getElementById(tabletId)
    if (element) {
      const headerHeight = 96
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 md:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <a
              href="#hero-tablet"
              onClick={(e) => scrollToSection(e, "hero")}
              className="flex items-center group focus:outline-none z-50"
            >
              <div className="relative w-24 h-24">
                <Image
                  src="/images/header-image/Header.png"
                  alt="DG Realtors Logo"
                  fill
                  className="object-contain pointer-events-none select-none"
                  draggable={false}
                  priority
                />
              </div>
              <div className="flex flex-col -ml-2">
                <span
                  className={`font-serif font-semibold text-2xl tracking-tight transition-colors duration-300 ${
                    isScrolled || isMenuOpen ? "text-foreground" : "text-white"
                  }`}
                >
                  realtors
                </span>
                <span
                  className={`font-bold text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isScrolled || isMenuOpen ? "text-muted-foreground" : "text-white/70"
                  }`}
                >
                  Property Consultants
                </span>
              </div>
            </a>

            {/* Hamburger Menu Button */}
            <button
              className="z-50 p-2 -mr-2 focus:outline-none"
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
          </div>
        </div>
      </header>

      <TabletMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} scrollToSection={scrollToSection} />
    </>
  )
}
