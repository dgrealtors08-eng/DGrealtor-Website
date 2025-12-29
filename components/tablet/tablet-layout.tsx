"use client"

import { TabletHeader } from "./tablet-header"
import { TabletHero } from "./tablet-hero"
import { TabletCompanies } from "./tablet-companies"
import { TabletAbout } from "./tablet-about"
import { TabletAwards } from "./tablet-awards"
import { TabletFooter } from "./tablet-footer"
import { TabletContactFab } from "./tablet-contact-fab"

// Tablet: 768px - 1023px (md to lg breakpoint)
export function TabletLayout() {
  return (
    <div className="hidden md:block lg:hidden min-h-screen bg-background overflow-x-hidden">
      <TabletHeader />
      <main className="tablet-main">
        <TabletHero />
        <TabletCompanies />
        <TabletAbout />
        <TabletAwards />
      </main>
      <TabletFooter />
      <TabletContactFab />
    </div>
  )
}
