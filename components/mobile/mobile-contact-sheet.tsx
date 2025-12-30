"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"

const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
)

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-8 h-8"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

interface FormData {
  fullName: string
  contactInfo: string
  subject: string
  message: string
}

interface FormErrors {
  fullName?: string
  contactInfo?: string
  subject?: string
  message?: string
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const isAllowedEmailProvider = (email: string): boolean => {
  const lowercaseEmail = email.toLowerCase()
  return lowercaseEmail.endsWith("@gmail.com") || lowercaseEmail.endsWith("@yahoo.com")
}

const isIndianPhoneNumber = (value: string): boolean => {
  const cleaned = value.replace(/[\s\-()]/g, "")
  const indianPhoneRegex = /^(?:\+?91)?[6-9]\d{9}$/
  return indianPhoneRegex.test(cleaned)
}

interface MobileContactSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileContactSheet({ isOpen, onClose }: MobileContactSheetProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactInfo: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required"
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters"
    }

    const contactValue = formData.contactInfo.trim()
    if (!contactValue) {
      newErrors.contactInfo = "Email or phone is required"
    } else if (contactValue.includes("@")) {
      if (!isValidEmail(contactValue)) {
        newErrors.contactInfo = "Please enter a valid email"
      } else if (!isAllowedEmailProvider(contactValue)) {
        newErrors.contactInfo = "Only Gmail and Yahoo accepted"
      }
    } else if (!isIndianPhoneNumber(contactValue)) {
      newErrors.contactInfo = "Please enter a valid Indian phone"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      console.log("[v0] Mobile form validation failed:", errors)
      return
    }

    setIsSubmitting(true)
    console.log("[v0] Mobile - Starting form submission with data:", formData)

    try {
      const GOOGLE_FORM_URL =
        "https://docs.google.com/forms/d/e/1FAIpQLSf6MJGcRjek2oSYrb7V9OhIOMuFSypwxEL0S6U7HirzP1KG8Q/formResponse"

      const form = document.createElement("form")
      form.method = "POST"
      form.action = GOOGLE_FORM_URL
      form.target = "mobile_hidden_iframe"

      const fields = [
        { name: "entry.2005620554", value: formData.fullName },
        { name: "entry.1045781291", value: formData.contactInfo },
        { name: "entry.1065046570", value: formData.subject },
        { name: "entry.839337160", value: formData.message },
      ]

      fields.forEach(({ name, value }) => {
        const input = document.createElement("input")
        input.type = "hidden"
        input.name = name
        input.value = value
        form.appendChild(input)
      })

      document.body.appendChild(form)

      console.log("[v0] Mobile - Submitting via iframe - Name:", formData.fullName, "Contact:", formData.contactInfo)

      form.submit()
      document.body.removeChild(form)

      console.log("[v0] Mobile - Form submitted via iframe successfully")

      setIsSuccess(true)
      setFormData({ fullName: "", contactInfo: "", subject: "", message: "" })
      setErrors({})

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 2500)
    } catch (error) {
      console.log("[v0] Mobile - Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      {/* Hidden iframe for form submission */}
      <iframe
        ref={iframeRef}
        name="mobile_hidden_iframe"
        style={{ display: "none" }}
        title="Hidden form submission iframe"
      />

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "90vh" }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-4 border-b border-border/50">
          <div>
            <h3 className="font-serif text-xl font-semibold text-foreground">Get in Touch</h3>
            <p className="text-xs text-muted-foreground mt-0.5">We'll respond as soon as possible</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-muted/80 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5 overflow-y-auto" style={{ maxHeight: "calc(90vh - 100px)" }}>
          {isSuccess ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">
                  <CheckIcon />
                </span>
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2 font-semibold">Sent Successfully!</h3>
              <p className="text-muted-foreground text-sm">I'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="m-fullName"
                  className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="m-fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-muted/50 border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                    errors.fullName ? "border-destructive" : "border-transparent focus:border-accent"
                  }`}
                  placeholder="Your name"
                />
                {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
              </div>

              {/* Contact Info */}
              <div>
                <label
                  htmlFor="m-contactInfo"
                  className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Email or Phone <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="contactInfo"
                  id="m-contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-muted/50 border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                    errors.contactInfo ? "border-destructive" : "border-transparent focus:border-accent"
                  }`}
                  placeholder="Gmail, Yahoo, or +91"
                />
                {errors.contactInfo && <p className="text-xs text-destructive mt-1">{errors.contactInfo}</p>}
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="m-subject"
                  className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Subject <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  id="m-subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-muted/50 border text-base transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                    errors.subject ? "border-destructive" : "border-transparent focus:border-accent"
                  }`}
                  placeholder="What's this about?"
                />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="m-message"
                  className="block text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  name="message"
                  id="m-message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl bg-muted/50 border text-base resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-accent/30 ${
                    errors.message ? "border-destructive" : "border-transparent focus:border-accent"
                  }`}
                  placeholder="Your message..."
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-white rounded-xl font-semibold text-base shadow-lg shadow-accent/20 active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <SendIcon />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  )
}
