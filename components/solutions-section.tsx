"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const solutionCategories = [
  {
    category: "BUILD",
    number: "01",
    services: [
      { title: "Bespoke Web Platforms", description: "Performant marketing systems built on React, Next.js, and serverless architectures with near-zero latency." },
      { title: "SaaS Architectures", description: "Multi-tenant cloud systems designed with robust API layouts, resilient caching, and real-time database synchronization." },
      { title: "Decoupled Web Apps", description: "Secure, decoupled single-page architectures engineered for enterprise workflows and complex data visualization." },
      { title: "Portal Ecosystems", description: "Self-service customer suites featuring real-time client collaboration, document workflows, and encrypted messaging." },
    ],
  },
  {
    category: "AUTOMATE",
    number: "02",
    services: [
      { title: "Autonomous Agents", description: "Cognitive LLM chains that automate manual analysis, complex classification tasks, and client-facing communication." },
      { title: "Event-Driven Logic", description: "Resilient backends utilizing message queues and serverless functions to automate cross-platform sync pipelines." },
      { title: "Pipeline Automation", description: "Advanced pipelines to score, deduplicate, route, and engage leads within seconds of ingestion." },
      { title: "Custom ERP Integrations", description: "Connect and unify inventory systems, accounting pipelines, and customer support channels under one API hub." },
    ],
  },
  {
    category: "SCALE",
    number: "03",
    services: [
      { title: "Real-Time Observability", description: "Interactive performance dashboards visualizing operational KPIs, core metrics, and active pipeline statuses." },
      { title: "Data Synthesizers", description: "Custom BI tools compiling logs and databases into predictive dashboards for immediate operational decision-making." },
      { title: "System Refactoring", description: "We audit database indexes, minimize bundle sizes, and restructure slow backend endpoints to maximize throughput." },
      { title: "High-Availability Infrastructure", description: "Cloud infrastructure migration featuring auto-scaling, geographic replication, and automated disaster recovery." },
    ],
  },
]

export function SolutionsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState(0)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !categoriesRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = categoriesRef.current?.querySelectorAll(".solution-category")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="solutions" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">02 / Solutions</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight flex flex-wrap items-center gap-x-[0.25em] gap-y-1">
            <span>WHAT WE</span>
            <img
              src="/images/build-logo.png"
              alt="BUILD"
              className="h-[0.8em] w-auto object-contain"
            />
          </h2>
        </div>
        <p className="max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          From architecture blueprints to engineering execution, we build systems that optimize operations.
        </p>
      </div>

      {/* Category tabs */}
      <div className="flex gap-4 mb-12 border-b border-border/30 pb-4">
        {solutionCategories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(index)}
            className={cn(
              "font-mono text-xs uppercase tracking-widest transition-all duration-300 relative py-2",
              activeCategory === index ? "text-accent" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {cat.category}
            {activeCategory === index && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent shadow-[0_0_8px_var(--accent)]" />
            )}
          </button>
        ))}
      </div>

      {/* Solutions grid */}
      <div ref={categoriesRef} className="space-y-16">
        {solutionCategories.map((category, catIndex) => (
          <div
            key={catIndex}
            className={cn(
              "solution-category transition-all duration-500",
              activeCategory === catIndex ? "block" : "hidden md:block",
            )}
          >
            <div className="flex items-baseline gap-4 mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">{category.number}</span>
              <h3 className="font-[var(--font-bebas)] text-3xl md:text-4xl tracking-tight">{category.category}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {category.services.map((service, index) => (
                <SolutionCard key={index} service={service} index={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function SolutionCard({ service, index }: { service: { title: string; description: string }; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const { left, top } = cardRef.current.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top
    cardRef.current.style.setProperty("--mouse-x", `${x}px`)
    cardRef.current.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative border border-border/50 p-6 transition-all duration-500 overflow-hidden bg-card/40 backdrop-blur-md",
        "hover:border-accent/40 hover:shadow-[0_0_30px_rgba(0,217,255,0.02)]"
      )}
    >
      {/* Dynamic spot lighting radial gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
        style={{
          background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 217, 255, 0.05), transparent 80%)"
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full min-h-[120px]">
        <div>
          <h4 className="font-[var(--font-bebas)] text-xl tracking-wide group-hover:text-accent transition-colors duration-300">
            {service.title}
          </h4>
          <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
            {service.description}
          </p>
        </div>
        
        <span className="self-end mt-4 font-mono text-[10px] text-muted-foreground/40 group-hover:text-accent transition-colors duration-300">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Subtle corner tech tick */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border/40 group-hover:border-accent/40 transition-colors duration-300" />
    </article>
  )
}
