"use client"

import { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { AnimatedLogo } from "@/components/animated-logo"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    projectType: "",
    message: "",
  })

  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill out all required parameters.")
      return
    }
    
    setStatus("loading")
    
    // Simulate API submission to webhook/system ingestion pipeline
    setTimeout(() => {
      setStatus("success")
      setFormData({
        name: "",
        company: "",
        email: "",
        projectType: "",
        message: "",
      })
    }, 2000)
  }

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12 border-t border-border/30"
    >
      {/* Section header */}
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">05 / System Ingestion</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight flex flex-wrap items-center gap-x-[0.25em] gap-y-1">
          <img
            src="/images/engineer-logo.png"
            alt="ENGINEER"
            className="h-[0.8em] w-auto object-contain"
          />
          <span>YOUR ADVANTAGE</span>
        </h2>
        <p className="mt-4 max-w-lg font-mono text-xs text-muted-foreground leading-relaxed">
          Initiate a diagnostic review. We audit your infrastructure, pinpoint operational bottlenecks, and architect custom systems designed to scale.
        </p>
      </div>

      {/* Contact form and info */}
      <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form Container */}
        <div className="relative border border-border/40 p-8 bg-background/20 backdrop-blur-xs">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-12 h-12 rounded-full border border-accent flex items-center justify-center text-accent mb-6 animate-pulse">
                ✓
              </div>
              <h3 className="font-[var(--font-bebas)] text-3xl tracking-tight text-accent">TRANSMISSION RECEIVED</h3>
              <p className="mt-4 font-mono text-xs text-muted-foreground max-w-sm leading-relaxed">
                Your parameters have been logged into our triage pipeline. A systems architect will follow up within 4 hours.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-8 font-mono text-[10px] uppercase tracking-widest text-accent hover:text-foreground transition-colors duration-200"
              >
                [ Send Another Transmission ]
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-2 block">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    disabled={status === "loading"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-card/40 border border-border px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent/25 focus:outline-none transition-all duration-200"
                    placeholder="E.g., Marcus Aurelius"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-2 block">
                    Company
                  </label>
                  <input
                    type="text"
                    disabled={status === "loading"}
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-card/40 border border-border px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent/25 focus:outline-none transition-all duration-200"
                    placeholder="E.g., Roma Ventures"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-2 block">
                  Email Address <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  disabled={status === "loading"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-card/40 border border-border px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent/25 focus:outline-none transition-all duration-200"
                  placeholder="E.g., name@domain.com"
                />
              </div>

              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-2 block">
                  Project Classification
                </label>
                <select
                  disabled={status === "loading"}
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-card/40 border border-border px-4 py-3 font-mono text-xs text-foreground focus:border-accent focus:ring-1 focus:ring-accent/25 focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                  style={{ backgroundImage: "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2300D9FF%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')", backgroundPosition: "right 1rem center", backgroundSize: "1em", backgroundRepeat: "no-repeat" }}
                >
                  <option value="" className="bg-background text-muted-foreground">Select Category</option>
                  <option value="website" className="bg-background">Custom Web Interface</option>
                  <option value="saas" className="bg-background">SaaS Cloud Architecture</option>
                  <option value="automation" className="bg-background">Event-Driven Automation</option>
                  <option value="crm" className="bg-background">ERP / Operations Infrastructure</option>
                  <option value="custom" className="bg-background">Bespoke Software Suite</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground mb-2 block">
                  Message parameters <span className="text-accent">*</span>
                </label>
                <textarea
                  required
                  disabled={status === "loading"}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full bg-card/40 border border-border px-4 py-3 font-mono text-xs text-foreground placeholder:text-muted-foreground/30 focus:border-accent focus:ring-1 focus:ring-accent/25 focus:outline-none transition-all duration-200 resize-none"
                  placeholder="Outline the operational bottleneck or design scope..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group btn-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ScrambleTextOnHover 
                  text={status === "loading" ? "Triaging Parameters..." : "Book Diagnostic Call"} 
                  as="span" 
                  duration={0.6} 
                />
                {status !== "loading" && (
                  <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
                )}
              </button>
            </form>
          )}

          {/* Subtle accent border overlays */}
          <div className="absolute top-0 left-0 w-3 h-[1px] bg-accent/40" />
          <div className="absolute top-0 left-0 w-[1px] h-3 bg-accent/40" />
          <div className="absolute bottom-0 right-0 w-3 h-[1px] bg-accent/40" />
          <div className="absolute bottom-0 right-0 w-[1px] h-3 bg-accent/40" />
        </div>

        {/* Contact info / Core Principles */}
        <div className="space-y-12">
          {/* Why 4Sight */}
          <div>
            <h3 className="font-[var(--font-bebas)] text-2xl tracking-tight mb-6">BUILT AROUND SYSTEMS THINKING</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "DIAGNOSTIC FIRST", desc: "Every engineering sprint is preceded by a comprehensive systems and bottlenecks audit." },
                { title: "ZERO-TRUST PIPELINES", desc: "Resilient message queues, serverless triggers, and clean logic boundaries to prevent downtime." },
                { title: "MODULAR TOPOLOGY", desc: "Decoupled web interfaces and high-availability endpoints that grow with transaction volume." },
                { title: "MEASURABLE METRICS", desc: "Systems aligned with business KPIs: latency reduction, processing throughput, and lead speed." },
              ].map((item, index) => (
                <div key={index} className="border-l border-accent/40 pl-4 py-1">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-2">{item.title}</h4>
                  <p className="font-mono text-xs text-muted-foreground/80 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick contact */}
          <div className="space-y-4 border-t border-border/20 pt-8">
            <h4 className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Direct Inquiries</h4>
            <a
              href="mailto:hello@4sight.agency"
              className="font-mono text-sm text-foreground hover:text-accent transition-colors duration-200 block"
            >
              hello@4sight.agency
            </a>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div
        ref={footerRef}
        className="mt-24 pt-8 border-t border-border/20"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex items-center gap-6">
            <AnimatedLogo
              className="h-12 w-auto"
              variant="fade-in"
              inverted
            />
            <div className="h-8 w-px bg-border/30 hidden md:block" />
            <p className="font-mono text-[10px] text-muted-foreground hidden md:block">
              Technology should remove friction,<br />not create it.
            </p>
          </div>

          {/* Copyright */}
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            © 2025 4Sight. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
