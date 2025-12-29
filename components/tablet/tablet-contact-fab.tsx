"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import { TabletContactSheet } from "./tablet-contact-sheet"

export function TabletContactFab() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Contact Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-2 px-5 py-3 bg-[#3d2b1f] text-white rounded-full shadow-lg hover:bg-[#2d1f15] active:scale-95 transition-all"
        aria-label="Contact us"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium">Contact Me</span>
      </button>

      <TabletContactSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
