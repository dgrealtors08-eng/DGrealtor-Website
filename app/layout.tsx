import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import "./globals.css"

/* 
  =============================================
  FONTS CONFIGURATION - Change fonts here
  =============================================
  Currently using:
  - Montserrat: Clean, modern sans-serif for body text
  - Playfair Display: Elegant serif for headings
  
  To change fonts, replace the imports above.
  Google Fonts alternatives: Open Sans, Roboto, Lato, Merriweather
*/
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "DG realtors | Maharera Registered",
  description:
    "DG realtors - Maharera Registered commercial real estate experts with 17+ years of experience in Maharashtra. Your trusted partner for retail and IT sector properties.",
  keywords: [
    "DG realtors",
    "Maharera registered",
    "commercial real estate",
    "Maharashtra",
    "retail space",
    "IT sector",
    "commercial property",
  ],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "DG realtors | Maharera Registered",
    description:
      "DG realtors - Maharera Registered commercial real estate experts with 17+ years of experience in Maharashtra.",
    type: "website",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#c4703e",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <link rel="preload" href="/images/header-image/Header.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/images/homepage-image/hero-2.jpg" as="image" fetchPriority="high" />
        {/* Preconnect to external image domains */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
