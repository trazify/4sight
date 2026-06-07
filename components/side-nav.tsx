"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "hero", label: "Home" },
  { id: "problem", label: "Problem" },
  { id: "solutions", label: "Solutions" },
  { id: "work", label: "Work" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
]

export function SideNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100
        setScrollProgress(progress)
      }
    }
    window.addEventListener("scroll", handleScroll)
    // Initial check
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2, rootMargin: "-10% 0px -60% 0px" },
    )

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-16 md:w-20 hidden md:flex flex-col justify-center border-r border-border/30 bg-background/80 backdrop-blur-sm">
      {/* Dynamic Right Border Scroll Progress Indicator */}
      <div
        className="absolute right-[-1px] top-0 w-[2px] bg-accent transition-all duration-100 ease-out z-10 shadow-[0_0_8px_var(--accent)]"
        style={{ height: `${scrollProgress}%` }}
      />

      {/* Decorative vertical guide line behind the dots */}
      <div className="absolute left-[31px] md:left-[39px] top-[15%] bottom-[15%] w-[1px] bg-border/20 pointer-events-none z-0" />

      <div className="flex flex-col gap-8 px-4 relative z-10">
        {navItems.map(({ id, label }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group relative flex items-center justify-center h-8 w-8 mx-auto focus:outline-none"
            >
              {/* Glowing Outer Ring for active state */}
              <span
                className={cn(
                  "absolute inset-0 rounded-full border border-accent/0 transition-all duration-500 scale-75 opacity-0",
                  isActive && "border-accent/40 scale-110 opacity-100 animate-pulse",
                  "group-hover:border-accent/30 group-hover:scale-100 group-hover:opacity-100"
                )}
              />

              {/* Core Dot */}
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-300 z-10",
                  isActive
                    ? "bg-accent scale-150 shadow-[0_0_8px_var(--accent)]"
                    : "bg-muted-foreground/30 group-hover:bg-foreground/60 group-hover:scale-110"
                )}
              />

              {/* Slide-out Text Label */}
              <span
                className={cn(
                  "absolute left-10 font-mono text-[10px] uppercase tracking-widest opacity-0 translate-x-[-4px] transition-all duration-350 ease-out group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap pointer-events-none",
                  isActive ? "text-accent font-semibold" : "text-muted-foreground"
                )}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
