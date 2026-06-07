"use client"

import type React from "react"

interface AnimatedNoiseProps {
  opacity?: number
  className?: string
}

export function AnimatedNoise({ opacity = 0.05, className = "" }: AnimatedNoiseProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 ${className}`}
      style={{ opacity }}
    >
      <div
        className="absolute w-[150%] h-[150%] -left-[25%] -top-[25%] bg-repeat animate-noise-buzz"
        style={{
          backgroundImage: 'url("/noise.bmp")',
          backgroundSize: '128px 128px',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
