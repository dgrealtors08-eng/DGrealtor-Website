"use client"

import { useState, useEffect, useCallback } from "react"

const ChevronUpIcon = ({
  className,
  strokeWidth = 2.5,
  size,
}: { className?: string; strokeWidth?: number; size: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ width: size, height: size }}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
)

const ChevronDownIcon = ({
  className,
  strokeWidth = 2.5,
  size,
}: { className?: string; strokeWidth?: number; size: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{ width: size, height: size }}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export default function ScrollNavigation() {
  const [showNav, setShowNav] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [atBottom, setAtBottom] = useState(false)
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024)
    }

    const handleScroll = () => {
      const container = document.querySelector(".mobile-snap-container")
      const scrollElement = isMobileOrTablet && container ? container : window
      const scrollY = isMobileOrTablet && container ? container.scrollTop : window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight =
        isMobileOrTablet && container ? container.scrollHeight : document.documentElement.scrollHeight

      setShowNav(scrollY > 100)
      setAtTop(scrollY < 100)
      setAtBottom(scrollY + windowHeight >= documentHeight - 50)
    }

    checkScreenSize()
    handleScroll()

    const container = document.querySelector(".mobile-snap-container")
    window.addEventListener("scroll", handleScroll, { passive: true })
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }
    window.addEventListener("resize", checkScreenSize, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [isMobileOrTablet])

  const scrollToTop = useCallback(() => {
    const container = document.querySelector(".mobile-snap-container")
    if (isMobileOrTablet && container) {
      container.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [isMobileOrTablet])

  const scrollToBottom = useCallback(() => {
    const container = document.querySelector(".mobile-snap-container")
    if (isMobileOrTablet && container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })
    } else {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ top: maxScroll, behavior: "smooth" })
    }
  }, [isMobileOrTablet])

  const buttonSize = isMobileOrTablet ? "1.125rem" : "2rem"
  const iconSize = isMobileOrTablet ? "0.75rem" : "1rem"
  const buttonRight = isMobileOrTablet ? "0.625rem" : "0.75rem"

  const upButtonTop = isMobileOrTablet ? "calc(50% - 2.5rem)" : "calc(50% - 2rem)"
  const downButtonTop = isMobileOrTablet ? "calc(50% + 1.375rem)" : "calc(50% + 0.5rem)"

  return (
    <>
      <button
        onClick={scrollToTop}
        disabled={atTop}
        className={`fixed z-40 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 ${
          showNav ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${atTop ? "bg-transparent cursor-not-allowed" : "bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-sm"}`}
        style={{
          right: buttonRight,
          width: buttonSize,
          height: buttonSize,
          top: upButtonTop,
        }}
        aria-label="Scroll to top"
      >
        <ChevronUpIcon
          className={`transition-colors ${atTop ? "text-gray-500" : "text-gray-200"}`}
          strokeWidth={2.5}
          size={iconSize}
        />
      </button>

      <button
        onClick={scrollToBottom}
        disabled={atBottom}
        className={`fixed z-40 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 ${
          showNav ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${atBottom ? "bg-transparent cursor-not-allowed" : "bg-gray-800/60 hover:bg-gray-700/80 backdrop-blur-sm"}`}
        style={{
          right: buttonRight,
          width: buttonSize,
          height: buttonSize,
          top: downButtonTop,
        }}
        aria-label="Scroll to bottom"
      >
        <ChevronDownIcon
          className={`transition-colors ${atBottom ? "text-gray-500" : "text-gray-200"}`}
          strokeWidth={2.5}
          size={iconSize}
        />
      </button>
    </>
  )
}
