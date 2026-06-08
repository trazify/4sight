"use client"

import { useRef, useEffect } from "react"
import { HighlightText } from "@/components/highlight-text"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: "01",
      titleParts: [
        { text: "DISCOVER", highlight: true },
      ],
      description: "Understand business goals, challenges, and opportunities. We map your current systems and identify bottlenecks.",
      align: "left",
    },
    {
      number: "02",
      titleParts: [
        { text: "ARCHITECT", highlight: true },
      ],
      description: "Design scalable systems and workflows. We create blueprints for solutions that grow with your business.",
      align: "right",
    },
    {
      number: "03",
      titleParts: [
        { text: "BUILD", highlight: true },
      ],
      description: "Develop websites, software, and automation systems. We build with precision and attention to detail.",
      align: "left",
    },
    {
      number: "04",
      titleParts: [
        { text: "AUTOMATE", highlight: true },
      ],
      description: "Integrate workflows, AI, and business tools. We connect your systems for seamless operations.",
      align: "right",
    },
    {
      number: "05",
      titleParts: [
        { text: "SCALE", highlight: true },
      ],
      description: "Optimize performance and support future growth. We ensure your systems evolve with your business.",
      align: "left",
    },
  ]

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !stepsRef.current) return

    const ctx = gsap.context(() => {
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

      const articles = stepsRef.current?.querySelectorAll("article")
      articles?.forEach((article, index) => {
        const isRight = steps[index].align === "right"
        gsap.from(article, {
          x: isRight ? 80 : -80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: article,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">04 / Process</span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight flex flex-wrap items-center gap-x-[0.25em] gap-y-1">
          <span>OUR</span>
          <img
            src="/images/process-logo.png"
            alt="PROCESS"
            className="h-[0.8em] w-auto object-contain"
          />
        </h2>
      </div>

      {/* Staggered steps */}
      <div ref={stepsRef} className="space-y-24 md:space-y-32">
        {steps.map((step, index) => (
          <article
            key={index}
            className={`flex flex-col ${
              step.align === "right" ? "items-end text-right" : "items-start text-left"
            }`}
          >
            {/* Annotation label */}
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
              {step.number} / {step.titleParts[0].text}
            </span>

            <h3 className="font-[var(--font-bebas)] text-4xl md:text-6xl lg:text-8xl tracking-tight leading-none">
              {step.titleParts.map((part, i) =>
                part.highlight ? (
                  <HighlightText key={i} parallaxSpeed={0.6}>
                    {part.text}
                  </HighlightText>
                ) : (
                  <span key={i}>{part.text}</span>
                ),
              )}
            </h3>

            {/* Description */}
            <p className="mt-6 max-w-md font-mono text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>

            {/* Decorative line */}
            <div className={`mt-8 h-[1px] bg-border w-24 md:w-48 ${step.align === "right" ? "mr-0" : "ml-0"}`} />
          </article>
        ))}
      </div>
    </section>
  )
}
