"use client"

import type React from "react"
import { useState, useEffect } from "react"

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

interface TabletContactSheetProps {
  isOpen: boolean
  onClose: () => void
}

export function TabletContactSheet({ isOpen, onClose }: TabletContactSheetProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactInfo: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

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
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      const GOOGLE_FORM_URL =
        "https://docs.google.com/forms/d/e/1FAIpQLSf6MJGcRjek2oSYrb7V9OhIOMuFSypwxEL0S6U7HirzP1KG8Q/formResponse"
      const formBody = new FormData()
      formBody.append("entry.1633928210", formData.fullName)
      formBody.append("entry.2056528554", formData.contactInfo)
      formBody.append("entry.1138649828", formData.subject)
      formBody.append("entry.1347963777", formData.message)

      await fetch(GOOGLE_FORM_URL, { method: "POST", mode: "no-cors", body: formBody })

      setIsSuccess(true)
      setFormData({ fullName: "", contactInfo: "", subject: "", message: "" })
      setErrors({})

      setTimeout(() => {
        setIsSuccess(false)
        onClose()
      }, 2500)
    } catch {
      // Handle error silently
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
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal - Centered */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-8 transition-all duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto transition-transform duration-500 ${
            isOpen ? "scale-100" : "scale-95"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4 bg-[#3d2b1f] rounded-t-3xl">
            <div>
              <h3 className="font-serif text-2xl font-semibold text-white">Get in Touch</h3>
              <p className="text-sm text-white/70 mt-1">
                Fill out the form below and I'll respond as soon as possible.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2" strokeLinecap="round" />
                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">
                    <CheckIcon />
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#3d2b1f] mb-2 font-semibold">Sent Successfully!</h3>
                <p className="text-muted-foreground text-sm">I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label htmlFor="t-fullName" className="block text-sm font-medium text-[#3d2b1f] mb-2">
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="t-fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 bg-transparent text-base transition-colors focus:outline-none ${
                      errors.fullName ? "border-destructive" : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                </div>

                {/* Contact Info */}
                <div>
                  <label htmlFor="t-contactInfo" className="block text-sm font-medium text-[#3d2b1f] mb-2">
                    Email or Phone (+91) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactInfo"
                    id="t-contactInfo"
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 bg-transparent text-base transition-colors focus:outline-none ${
                      errors.contactInfo ? "border-destructive" : "border-border focus:border-accent"
                    }`}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Only Gmail or Yahoo emails are accepted</p>
                  {errors.contactInfo && <p className="text-xs text-destructive mt-1">{errors.contactInfo}</p>}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="t-subject" className="block text-sm font-medium text-[#3d2b1f] mb-2">
                    Subject <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="t-subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 bg-transparent text-base transition-colors focus:outline-none ${
                      errors.subject ? "border-destructive" : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="t-message" className="block text-sm font-medium text-[#3d2b1f] mb-2">
                    Your Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    name="message"
                    id="t-message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-b-2 bg-transparent text-base resize-none transition-colors focus:outline-none ${
                      errors.message ? "border-destructive" : "border-border focus:border-accent"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 bg-accent text-white rounded-xl font-semibold text-base shadow-lg shadow-accent/20 hover:bg-accent/90 active:scale-[0.98] transition-all disabled:opacity-60"
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
      </div>
    </>
  )
}
