"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useHeroImages } from "@/hooks/use-hero-images"

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { images: backgroundImages, isLoading } = useHeroImages()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (backgroundImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 15000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  useEffect(() => {
    if (currentIndex >= backgroundImages.length && backgroundImages.length > 0) {
      setCurrentIndex(0)
    }
  }, [backgroundImages.length, currentIndex])

  return (
    <section
      id="hero-desktop"
      className="relative h-[100svh] lg:h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Slideshow */}
      {isLoading ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f] via-[#5c4a3d] to-[#8b7355]" />
      ) : backgroundImages.length === 0 ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f] via-[#5c4a3d] to-[#8b7355]" />
      ) : (
        backgroundImages.map((img, index) => (
          <div
            key={img.src}
            className={`absolute inset-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={85}
              className={`object-cover object-center scale-105 pointer-events-none select-none ${img.blur ? "blur-[2px]" : ""}`}
              draggable={false}
            />
          </div>
        ))
      )}

      <div
        className="absolute inset-0 z-[5]"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      <div className="hero-overlay absolute inset-0 pointer-events-none z-10" />

      <div className="relative z-20 w-full max-w-6xl mx-auto text-center px-4 sm:px-6 md:px-12 flex flex-col justify-center items-center h-full pt-16 sm:pt-20 md:pt-0">
        <div
          className={`transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-[1.1] mb-4 sm:mb-6 md:mb-8 text-balance drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]">
            Find your next business
            <br />
            <span className="text-accent">location with us.</span>
          </h1>
        </div>

        <div
          className={`flex flex-col items-center gap-8 transition-all duration-1000 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <button
            onClick={() => {
              const companiesSection = document.getElementById("companies-desktop")
              if (companiesSection) {
                companiesSection.scrollIntoView({ behavior: "smooth", block: "start" })
                history.replaceState(null, "", window.location.pathname)
              }
            }}
            className="group flex flex-col items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            <span className="text-sm uppercase tracking-[0.25em] font-medium">Scroll</span>
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all">
              <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
