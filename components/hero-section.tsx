"use client"

import { useEffect, useRef } from "react"
import { ScrambleTextOnHover } from "@/components/scramble-text"
import { SplitFlapLogo, SplitFlapMuteToggle, SplitFlapAudioProvider } from "@/components/split-flap-logo"
import { AnimatedNoise } from "@/components/animated-noise"
import { BitmapChevron } from "@/components/bitmap-chevron"
import { SentientSphere } from "@/components/sentient-sphere"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pl-6 md:pl-28 pr-6 md:pr-12">
      <AnimatedNoise opacity={0.03} />

      {/* Sentient Sphere — background layer, far right */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] opacity-40 pointer-events-auto mr-[-100px] md:mr-0">
          <SentientSphere />
        </div>
      </div>

      {/* Left vertical labels */}
      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-10">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground -rotate-90 origin-left block whitespace-nowrap">
          4SIGHT
        </span>
      </div>

      {/* Main content */}
      <div ref={contentRef} className="flex-1 w-full relative z-10">
        <SplitFlapAudioProvider>
          <div className="relative">
            <SplitFlapLogo speed={80} />
            <div className="mt-4">
              <SplitFlapMuteToggle />
            </div>
          </div>
        </SplitFlapAudioProvider>

        <h2 className="font-[var(--font-bebas)] text-muted-foreground/60 text-[clamp(1rem,3vw,2rem)] mt-4 tracking-wide">
          Systems-Focused Technology Agency
        </h2>

        <p className="mt-12 max-w-lg font-mono text-sm text-muted-foreground leading-relaxed">
          We engineer systems that eliminate operational bottlenecks and accelerate growth. From websites and SaaS platforms to AI automation and business systems.
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <a
            href="#solutions"
            className="group btn-primary"
          >
            <ScrambleTextOnHover text="Book Strategy Call" as="span" duration={0.6} />
            <BitmapChevron className="transition-transform duration-[400ms] ease-in-out group-hover:rotate-45" />
          </a>
          <a
            href="#work"
            className="btn-secondary"
          >
            View Our Work
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-10 flex flex-col items-end gap-2">
        <div className="border border-border/40 bg-background/40 backdrop-blur-md px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground flex items-center gap-2 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span>SYSTEM STATUS: OPERATIONAL</span>
        </div>
        <div className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-widest">
          LATENCY: 12MS // COMPUTE: 100%
        </div>
      </div>
    </section>
  )
}
