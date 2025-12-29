"use client"

import { MobileHeader } from "./mobile-header"
import { MobileHero } from "./mobile-hero"
import { MobileCompanies } from "./mobile-companies"
import { MobileAbout } from "./mobile-about"
import { MobileAwards } from "./mobile-awards"
import { MobileFooter } from "./mobile-footer"
import { MobileContactFab } from "./mobile-contact-fab"

// Mobile: 0 - 767px (below md breakpoint)
export function MobileLayout() {
  return (
    <div className="block md:hidden min-h-screen bg-background overflow-x-hidden">
      <MobileHeader />
      <main className="mobile-main">
        <MobileHero />
        <MobileCompanies />
        <MobileAbout />
        <MobileAwards />
      </main>
      <MobileFooter />
      <MobileContactFab />
    </div>
  )
}
