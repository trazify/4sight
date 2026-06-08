"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const caseStudies = [
  {
    title: "Lead Response System",
    industry: "Real Estate",
    challenge: "Lead inquiries were being handled manually with 12+ hour response times.",
    solution: "Implemented automated lead qualification with AI and CRM integration.",
    metric: "45 sec",
    metricLabel: "Response Time",
    previousMetric: "from 12 hours",
    span: "col-span-2 row-span-2",
  },
  {
    title: "Operations Dashboard",
    industry: "Logistics",
    challenge: "Disconnected systems causing visibility gaps.",
    solution: "Centralized analytics dashboard with real-time data.",
    metric: "68%",
    metricLabel: "Efficiency Gain",
    previousMetric: "vs previous quarter",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Workflow Automation",
    industry: "Financial Services",
    challenge: "Manual data entry consuming team hours.",
    solution: "End-to-end workflow automation with AI agents.",
    metric: "50%",
    metricLabel: "Workload Reduction",
    previousMetric: "manual tasks automated",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Sales Platform",
    industry: "E-Commerce",
    challenge: "Low conversion rates and abandoned carts.",
    solution: "Custom checkout flow with automated follow-ups.",
    metric: "35%",
    metricLabel: "Conversion Increase",
    previousMetric: "year over year",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Client Portal",
    industry: "Professional Services",
    challenge: "Time-consuming client communication and reporting.",
    solution: "Self-service portal with automated reporting.",
    metric: "40hrs",
    metricLabel: "Saved Weekly",
    previousMetric: "per team member",
    span: "col-span-2 row-span-1",
  },
  {
    title: "CRM Integration",
    industry: "Healthcare",
    challenge: "Patient data scattered across multiple systems.",
    solution: "Unified CRM with automated scheduling.",
    metric: "3x",
    metricLabel: "Booking Rate",
    previousMetric: "appointment efficiency",
    span: "col-span-1 row-span-1",
  },
]

export function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return

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
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const cards = gridRef.current?.querySelectorAll("article")
      if (cards && cards.length > 0) {
        gsap.set(cards, { y: 60, opacity: 0 })
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="work" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">03 / Work</span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight flex flex-wrap items-center gap-x-[0.25em] gap-y-1">
            <img
              src="/images/results-logo.png"
              alt="RESULTS"
              className="h-[0.8em] w-auto object-contain"
            />
            <span>THAT MATTER</span>
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          Real outcomes from businesses that transformed their operations.
        </p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
      >
        {caseStudies.map((study, index) => (
          <WorkCard key={index} study={study} index={index} persistHover={index === 0} />
        ))}
      </div>
    </section>
  )
}

function WorkCard({
  study,
  index,
  persistHover = false,
}: {
  study: {
    title: string
    industry: string
    challenge: string
    solution: string
    metric: string
    metricLabel: string
    previousMetric: string
    span: string
  }
  index: number
  persistHover?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLElement>(null)
  const [isScrollActive, setIsScrollActive] = useState(false)

  useEffect(() => {
    if (!persistHover || !cardRef.current) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top 80%",
        onEnter: () => setIsScrollActive(true),
      })
    }, cardRef)

    return () => ctx.revert()
  }, [persistHover])

  const isActive = isHovered || isScrollActive

  return (
    <article
      ref={cardRef}
      className={cn(
        "group relative border border-border/50 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden bg-card/30 backdrop-blur-xs",
        study.span,
        isActive && "border-accent/40",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background layer */}
      <div
        className={cn(
          "absolute inset-0 bg-accent/[0.02] transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Content */}
      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{study.industry}</span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {study.title}
        </h3>
      </div>

      {/* Metric display */}
      <div className="relative z-10">
        <div
          className={cn(
            "transition-all duration-500",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          <span className="font-[var(--font-bebas)] text-3xl md:text-5xl text-accent">{study.metric}</span>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
            {study.metricLabel}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground/60">{study.previousMetric}</p>
        </div>
      </div>

      {/* Index marker */}
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Corner line */}
      <div
        className={cn(
          "absolute top-0 right-0 w-8 h-8 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent/40" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent/40" />
      </div>
    </article>
  )
}
