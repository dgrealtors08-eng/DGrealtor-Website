import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import CompaniesCarousel from "@/components/companies-carousel"
import AboutSection from "@/components/about-section"
import AwardsCertificates from "@/components/awards-certificates"
import Footer from "@/components/footer"
import ContactPanel from "@/components/contact-panel"
import ScrollNavigation from "@/components/scroll-navigation"
import { MobileLayout } from "@/components/mobile/mobile-layout"
import { TabletLayout } from "@/components/tablet/tablet-layout"

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      {/* Mobile: 0 - 767px */}
      <MobileLayout />

      {/* Tablet: 768px - 1023px */}
      <TabletLayout />

      <div className="hidden lg:block">
        <Header />
        <HeroSection />
        <CompaniesCarousel />
        <AboutSection />
        <AwardsCertificates />
        <Footer />

        {/* Fixed UI Elements */}
        <ContactPanel />
        <ScrollNavigation />
      </div>
    </main>
  )
}
