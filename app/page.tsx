import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionsSection } from "@/components/solutions-section"
import { WorkSection } from "@/components/work-section"
import { ProcessSection } from "@/components/process-section"
import { ContactSection } from "@/components/contact-section"
import { SideNav } from "@/components/side-nav"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <SideNav />
      <div className="grid-bg fixed inset-0 opacity-30 z-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <HeroSection />
        <ProblemSection />
        <SolutionsSection />
        <WorkSection />
        <ProcessSection />
        <ContactSection />
      </div>
    </main>
  )
}
