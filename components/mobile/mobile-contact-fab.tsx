"use client"

import { useState } from "react"
import { MobileContactSheet } from "./mobile-contact-sheet"

const MessageIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </svg>
)

export function MobileContactFab() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed z-40 lg:hidden flex items-center justify-center w-14 h-14 bg-accent text-white rounded-full shadow-lg shadow-accent/30 active:scale-95 transition-all duration-300 ${
          isOpen ? "opacity-0 pointer-events-none scale-90" : "opacity-100"
        }`}
        style={{
          bottom: "1.25rem",
          right: "1.25rem",
        }}
        aria-label="Open contact form"
      >
        <MessageIcon />
      </button>

      <MobileContactSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
