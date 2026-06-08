"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const painPoints = [
  {
    icon: "01",
    title: "Leaky Sales Pipelines",
    description: "Lead ingestion is bottlenecked by manual entries. Automated parsing and immediate CRM routing guarantees responses in under 60 seconds.",
  },
  {
    icon: "02",
    title: "Fragile Operational Glue",
    description: "Teams lose hundreds of productive hours pasting data between disparate tools instead of letting event-driven webhooks handle the work.",
  },
  {
    icon: "03",
    title: "Siloed Data Landscapes",
    description: "Fragmented tools prevent a unified operational view. We synthesize API-first databases to unlock a singular source of truth.",
  },
  {
    icon: "04",
    title: "High Response Latency",
    description: "Delayed customer engagement directly degrades conversion rates. Automated dispatch engines alert correct personnel immediately.",
  },
  {
    icon: "05",
    title: "Brittle Legacy Infrastructure",
    description: "Monolithic designs and unmonitored scripts break during growth spikes. We deploy resilient, serverless edge architectures.",
  },
  {
    icon: "06",
    title: "Process Friction",
    description: "Internal systems suffer from manual handoffs and redundant approvals. We map and automate end-to-end business workflows.",
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !cardsRef.current) return

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

      const cards = cardsRef.current?.querySelectorAll("article")
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section id="problem" ref={sectionRef} className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">01 / The Problem</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight text-balance flex flex-wrap items-center gap-x-[0.25em] gap-y-1">
          <span>MOST</span>
          <img
            src="/images/businesses-logo.png"
            alt="BUSINESSES"
            className="h-[0.8em] w-auto object-contain"
          />
          <span>DON&apos;T HAVE A GROWTH PROBLEM</span>
        </h2>
        <p className="mt-4 font-[var(--font-bebas)] text-3xl md:text-5xl tracking-tight text-muted-foreground">
          They have a systems problem.
        </p>
      </div>

      {/* Pain points grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {painPoints.map((point, index) => (
          <ProblemCard key={index} point={point} />
        ))}
      </div>
    </section>
  )
}

function ProblemCard({ point }: { point: typeof painPoints[0] }) {
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

      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent/80 group-hover:text-accent transition-colors duration-300">
          {point.icon}
        </span>
        <h3 className="mt-4 font-[var(--font-bebas)] text-2xl tracking-wide group-hover:text-accent transition-colors duration-300">
          {point.title}
        </h3>
        <p className="mt-2 font-mono text-xs text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors duration-300">
          {point.description}
        </p>
      </div>

      {/* Subtle corner tech tick */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-border/40 group-hover:border-accent/40 transition-colors duration-300" />
    </article>
  )
}
