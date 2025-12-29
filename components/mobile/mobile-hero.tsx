"use client"

import { useState, useEffect } from "react"
import { useHeroImages } from "@/hooks/use-hero-images"

export function MobileHero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set())
  const { images: backgroundImages, isLoading } = useHeroImages()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (backgroundImages.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 12000)
    return () => clearInterval(interval)
  }, [backgroundImages.length])

  useEffect(() => {
    if (currentIndex >= backgroundImages.length && backgroundImages.length > 0) {
      setCurrentIndex(0)
    }
  }, [backgroundImages.length, currentIndex])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  const handleImageError = (index: number) => {
    setErrorImages((prev) => new Set(prev).add(index))
  }

  return (
    <section id="hero" className="relative h-[100svh] flex flex-col justify-end overflow-hidden lg:hidden">
      {isLoading || backgroundImages.length === 0 ? (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f] via-[#5c4a3d] to-[#8b7355]" />
      ) : (
        backgroundImages.map((img, index) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {!errorImages.has(index) ? (
              <img
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none blur-[1.5px] ${loadedImages.has(index) ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                draggable={false}
                onLoad={() => handleImageLoad(index)}
                onError={() => handleImageError(index)}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f] via-[#5c4a3d] to-[#8b7355]" />
            )}
          </div>
        ))
      )}

      {/* Fallback gradient background if no images load */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3d2b1f] via-[#5c4a3d] to-[#8b7355] -z-10" />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0.2) 0%,
            rgba(0,0,0,0.1) 40%,
            rgba(0,0,0,0.4) 70%,
            rgba(0,0,0,0.85) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="relative z-20 px-6 pb-28 pt-20">
        {/* Badge */}
        <div
          className={`transform transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            MAHARERA Registered
          </span>
        </div>

        {/* Headline */}
        <div
          className={`mt-5 transform transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <h1 className="font-serif text-white text-[32px] leading-[1.15] font-medium tracking-tight">
            Find your next
            <br />
            business location
            <br />
            <span className="text-accent">with us.</span>
          </h1>
        </div>

        <div
          className={`mt-8 transform transition-all duration-700 ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <a
            href="#about"
            className="block w-full py-4 bg-accent hover:bg-accent/90 text-white text-center text-sm font-medium rounded-lg transition-colors duration-200"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  )
}
