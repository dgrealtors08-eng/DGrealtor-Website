"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

const NEW_YEAR_START = new Date("2025-12-31T00:00:00").getTime()
const NEW_YEAR_END = new Date("2026-01-01T00:00:00").getTime()

const PREVIEW_MODE = true

interface GoldParticle {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  delay: number
}

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export default function NewYearOverlay() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [goldParticles, setGoldParticles] = useState<GoldParticle[]>([])
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const now = Date.now()
    const isWithinPeriod = now >= NEW_YEAR_START && now <= NEW_YEAR_END

    const wasDismissed = PREVIEW_MODE ? false : localStorage.getItem("newYearDismissed2026") === "true"

    if ((PREVIEW_MODE || isWithinPeriod) && !wasDismissed) {
      setIsVisible(true)

      // Generate gold particles
      const particles: GoldParticle[] = []
      for (let i = 0; i < 60; i++) {
        particles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          opacity: Math.random() * 0.5 + 0.3,
          speed: Math.random() * 20 + 15,
          delay: Math.random() * 5,
        })
      }
      setGoldParticles(particles)

      // Generate sparkles
      const sparks: Sparkle[] = []
      for (let i = 0; i < 30; i++) {
        sparks.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 3,
        })
      }
      setSparkles(sparks)

      setTimeout(() => setShowContent(true), 300)
    }
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    if (!PREVIEW_MODE) {
      localStorage.setItem("newYearDismissed2026", "true")
    }
    setTimeout(() => setIsVisible(false), 600)
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] transition-all duration-700 ${
        isDismissed ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Dark luxurious background */}
      <div className="absolute inset-0 bg-[#080808]" />

      {/* Subtle gold ambient glow - top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.4) 0%, transparent 70%)",
        }}
      />

      {/* Subtle gold ambient glow - bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-15"
        style={{
          background: "radial-gradient(ellipse, rgba(212,175,55,0.3) 0%, transparent 70%)",
        }}
      />

      {/* Floating gold particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {goldParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: "linear-gradient(135deg, #D4AF37, #F5E6D3)",
              opacity: particle.opacity,
              animation: `floatDown ${particle.speed}s linear infinite`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Twinkling sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              animation: `twinkle 2s ease-in-out infinite`,
              animationDelay: `${sparkle.delay}s`,
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path fill="#D4AF37" d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/10 transition-all duration-300 group"
          aria-label="Close"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/70 group-hover:text-[#D4AF37] transition-colors" />
        </button>

        {/* Content container */}
        <div
          className={`flex flex-col items-center transition-all duration-1000 ${
            showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Welcome badge */}
          <div
            className={`mb-4 sm:mb-6 transition-all duration-700 delay-100 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-[#D4AF37]/80 border border-[#D4AF37]/30 rounded-full">
              Welcome to
            </span>
          </div>

          {/* Large 2026 */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h1
              className="text-[80px] sm:text-[120px] md:text-[180px] lg:text-[240px] xl:text-[280px] font-bold leading-none tracking-tighter"
              style={{
                background: "linear-gradient(180deg, #D4AF37 0%, #F5E6D3 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 80px rgba(212,175,55,0.3)",
              }}
            >
              2026
            </h1>

            {/* Shimmer effect */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                animation: "shimmer 3s ease-in-out infinite",
              }}
            />
          </div>

          {/* Happy New Year */}
          <h2
            className={`mt-2 sm:mt-4 text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase text-[#F5E6D3] transition-all duration-1000 delay-300 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Happy New Year
          </h2>

          {/* Decorative line */}
          <div
            className={`my-5 sm:my-6 md:my-8 w-16 sm:w-24 md:w-32 h-[1px] transition-all duration-1000 delay-400 ${
              showContent ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
            style={{
              background: "linear-gradient(90deg, transparent, #D4AF37, transparent)",
            }}
          />

          {/* Wish message */}
          <p
            className={`text-center text-xs sm:text-sm md:text-base lg:text-lg text-[#F5E6D3]/60 max-w-[280px] sm:max-w-sm md:max-w-md leading-relaxed transition-all duration-1000 delay-500 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Wishing you a year of prosperity, success, and beautiful new beginnings
          </p>

          {/* From DG Realtors */}
          <p
            className={`mt-4 sm:mt-6 text-xs sm:text-sm md:text-base tracking-[0.1em] sm:tracking-[0.15em] text-[#D4AF37]/70 transition-all duration-1000 delay-600 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            From DG Realtors
          </p>

          {/* Enter button */}
          <button
            onClick={handleDismiss}
            className={`mt-8 sm:mt-10 md:mt-12 relative overflow-hidden group px-6 sm:px-8 md:px-10 py-3 sm:py-4 border border-[#D4AF37]/50 rounded-none transition-all duration-500 delay-700 ${
              showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {/* Button background fill on hover */}
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            <span className="relative z-10 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#D4AF37] group-hover:text-[#080808] transition-colors duration-500">
              Enter Website
            </span>
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes floatDown {
          0% {
            transform: translateY(-100vh) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  )
}
