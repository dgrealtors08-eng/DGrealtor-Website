"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

const XIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "1.25rem", height: "1.25rem" }}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const MessageCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "1.125rem", height: "1.125rem" }}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
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
    style={{ width: "0.875rem", height: "0.875rem" }}
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
    style={{ width: "1.5rem", height: "1.5rem" }}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "1rem", height: "1rem" }}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
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
  // Remove all spaces, dashes, and parentheses
  const cleaned = value.replace(/[\s\-()]/g, "")
  // Check for Indian phone number: optional +91 or 91 prefix, followed by 10 digits starting with 6-9
  const indianPhoneRegex = /^(?:\+?91)?[6-9]\d{9}$/
  return indianPhoneRegex.test(cleaned)
}

export default function ContactPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactInfo: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const panelRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false)
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name is required"
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters"
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
      newErrors.fullName = "Name can only contain letters and spaces"
    }

    const contactValue = formData.contactInfo.trim()
    if (!contactValue) {
      newErrors.contactInfo = "Email or phone is required"
    } else if (contactValue.includes("@")) {
      if (!isValidEmail(contactValue)) {
        newErrors.contactInfo = "Please enter a valid email address"
      } else if (!isAllowedEmailProvider(contactValue)) {
        newErrors.contactInfo = "Only Gmail and Yahoo emails are accepted"
      }
    } else if (!isIndianPhoneNumber(contactValue)) {
      newErrors.contactInfo = "Please enter a valid Indian phone number (+91)"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters"
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
      console.log("[v0] Form validation failed:", errors)
      return
    }

    setIsSubmitting(true)
    console.log("[v0] Starting form submission with data:", formData)

    try {
      const GOOGLE_FORM_URL =
        "https://docs.google.com/forms/d/e/1FAIpQLSf6MJGcRjek2oSYrb7V9OhIOMuFSypwxEL0S6U7HirzP1KG8Q/formResponse"

      const form = document.createElement("form")
      form.method = "POST"
      form.action = GOOGLE_FORM_URL
      form.target = "hidden_iframe"

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

      console.log("[v0] Form URL:", GOOGLE_FORM_URL)
      console.log(
        "[v0] Submitting via iframe - Name:",
        formData.fullName,
        "Contact:",
        formData.contactInfo,
        "Subject:",
        formData.subject,
      )

      form.submit()
      document.body.removeChild(form)

      console.log("[v0] Form submitted via iframe successfully")

      setIsSuccess(true)
      setFormData({ fullName: "", contactInfo: "", subject: "", message: "" })
      setErrors({})

      setTimeout(() => {
        setIsSuccess(false)
        setIsOpen(false)
      }, 3000)
    } catch (error) {
      console.log("[v0] Form submission error:", error)
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
      <iframe ref={iframeRef} name="hidden_iframe" style={{ display: "none" }} title="Hidden form submission iframe" />

      <button
        onClick={() => setIsOpen(true)}
        className={`fixed z-40 flex items-center gap-3 bg-primary text-white rounded-full shadow-lg hover:bg-accent transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-accent/30 active:scale-95 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          bottom: "clamp(1.5rem, 3vw, 1.5rem)",
          right: "clamp(1.5rem, 3vw, 1.5rem)",
          paddingLeft: "clamp(1rem, 2vw, 1.25rem)",
          paddingRight: "clamp(1.25rem, 2.5vw, 1.5rem)",
          paddingBlock: "clamp(0.75rem, 1.5vw, 0.875rem)",
        }}
        aria-label="Open contact form"
      >
        <MessageCircleIcon />
        <span className="font-medium tracking-wide" style={{ fontSize: "clamp(0.875rem, 0.5vw + 0.7rem, 1rem)" }}>
          Contact Me
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={panelRef}
            className="bg-white w-full rounded-2xl shadow-2xl relative z-10 transform transition-all duration-300 flex flex-col overflow-hidden"
            style={{ maxWidth: "28rem", maxHeight: "90vh" }}
          >
            <div
              className="p-6 text-white flex justify-between items-center border-b border-white/10"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <div>
                <h3
                  className="font-serif font-bold tracking-tight"
                  style={{ fontSize: "clamp(1.25rem, 1vw + 1rem, 1.5rem)" }}
                >
                  Get in Touch
                </h3>
                <p className="text-white/80 mt-1" style={{ fontSize: "clamp(0.75rem, 0.4vw + 0.6rem, 0.875rem)" }}>
                  Fill out the form below and I'll respond as soon as possible.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 focus:outline-none"
                aria-label="Close contact form"
              >
                <XIcon />
              </button>
            </div>

            <div className="p-8 overflow-y-auto bg-white">
              {isSuccess ? (
                <div className="py-8 text-center">
                  <div
                    className="mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center"
                    style={{ width: "4rem", height: "4rem" }}
                  >
                    <span className="text-green-600">
                      <CheckIcon />
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2 font-bold">Sent Successfully!</h3>
                  <p className="text-muted-foreground text-sm">I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-group">
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className={`form-control ${errors.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                      placeholder=" "
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="fullName" className="form-label">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    {errors.fullName && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircleIcon />
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="contactInfo"
                      id="contactInfo"
                      className={`form-control ${errors.contactInfo ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                      placeholder=" "
                      value={formData.contactInfo}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="contactInfo" className="form-label">
                      Email or Phone (+91) <span className="text-red-500">*</span>
                    </label>
                    {errors.contactInfo && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircleIcon />
                        {errors.contactInfo}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">Only Gmail or Yahoo emails are accepted</p>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className={`form-control ${errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                      placeholder=" "
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="subject" className="form-label">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircleIcon />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      className={`form-control resize-none ${errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}`}
                      placeholder=" "
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="message" className="form-label">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <AlertCircleIcon />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-accent transition-all duration-300 shadow-lg transform active:scale-[0.98] flex justify-center items-center gap-2 group mt-8 disabled:opacity-60"
                    style={{ fontSize: "clamp(0.9375rem, 0.5vw + 0.75rem, 1.125rem)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <SendIcon />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
