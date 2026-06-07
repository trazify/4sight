"use client"

import { useState } from "react"
import { AnimatedLogo } from "@/components/animated-logo"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Download, ExternalLink, RefreshCw } from "lucide-react"

const ANIMATION_VARIANTS = [
  {
    id: "draw",
    name: "Draw",
    desc: "Line-drawing stroke entrance followed by a smooth solid fill.",
    bgColor: "from-slate-900 to-slate-950",
  },
  {
    id: "fade-in",
    name: "Fade In",
    desc: "Smooth opacity fade, slight upward translation, and hover scaling.",
    bgColor: "from-zinc-900 to-zinc-950",
  },
  {
    id: "neon-flicker",
    name: "Neon Flicker",
    desc: "Cyberpunk flicker-in entrance and a pulsing neon glow on hover.",
    bgColor: "from-neutral-900 to-neutral-950",
  },
  {
    id: "glitch",
    name: "Glitch",
    desc: "Digital chromatic aberration splitting red and cyan subchannels on hover.",
    bgColor: "from-stone-900 to-stone-950",
  },
  {
    id: "pulse-glow",
    name: "Pulse Glow",
    desc: "Continuously breathing aura background glow with a premium easing curve.",
    bgColor: "from-slate-950 to-black",
  },
  {
    id: "cinematic",
    name: "Cinematic",
    desc: "Scale-up with blur-to-sharp animation and interactive 3D tilt skew.",
    bgColor: "from-zinc-950 to-black",
  },
  {
    id: "sonar-ripple",
    name: "Sonar Ripple",
    desc: "Staggered radar echo rings pulsing outwards behind the solid logo.",
    bgColor: "from-cyan-950/20 to-slate-950",
  },
  {
    id: "matrix-scan",
    name: "Matrix Scan",
    desc: "Glowing green/cyan scanline sweeping down the logo.",
    bgColor: "from-emerald-950/20 to-zinc-950",
  },
  {
    id: "electric-current",
    name: "Electric Current",
    desc: "Sparks of light flowing continuously along the outer stroke paths.",
    bgColor: "from-blue-950/20 to-neutral-950",
  },
  {
    id: "liquid-fill",
    name: "Liquid Fill",
    desc: "A sloshing wave clip-path rising to fill the logo with fluid blue.",
    bgColor: "from-sky-950/20 to-slate-950",
  },
  {
    id: "hologram-hud",
    name: "Hologram HUD",
    desc: "Sci-fi interface look with grid patterns, scanning laser, and opacity glitches.",
    bgColor: "from-cyan-950/30 to-black",
  },
  {
    id: "prism-split",
    name: "Prism Split",
    desc: "Split RGB chromatic refraction shifting dynamically on hover.",
    bgColor: "from-purple-950/20 to-zinc-950",
  },
] as const

export default function LogosPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [colorOverrides, setColorOverrides] = useState<Record<string, string>>({})
  const [resetKeys, setResetKeys] = useState<Record<string, number>>({})

  const handleCopy = (variantId: string) => {
    const code = `<AnimatedLogo variant="${variantId}" inverted />`
    navigator.clipboard.writeText(code)
    setCopiedId(variantId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleReset = (variantId: string) => {
    setResetKeys((prev) => ({
      ...prev,
      [variantId]: (prev[variantId] || 0) + 1,
    }))
  }

  const colors = [
    { label: "Default (White)", value: "" },
    { label: "Cyan", value: "#00e5ff" },
    { label: "Green", value: "#10b981" },
    { label: "Gold", value: "#f59e0b" },
    { label: "Rose", value: "#f43f5e" },
  ]

  return (
    <main className="min-h-screen bg-black text-foreground relative py-12 px-6 md:px-12 lg:px-24">
      {/* Background Grid */}
      <div className="grid-bg fixed inset-0 opacity-20 z-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200 mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="border-b border-border/20 pb-8 mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Interactive Playground</span>
          <h1 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
            4SIGHT ANIMATION LAB
          </h1>
          <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
            A developer showroom showcasing the 12 cinema-grade branding animation variants. Each logo variant is available as both a dynamic React component and a standalone, pure-CSS animated SVG asset.
          </p>
        </div>

        {/* Grid of Variants */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ANIMATION_VARIANTS.map((v) => {
            const currentOverride = colorOverrides[v.id] || undefined
            const key = resetKeys[v.id] || 0

            return (
              <div
                key={v.id}
                className={`flex flex-col border border-border/30 bg-gradient-to-b ${v.bgColor} p-6 rounded-none relative group transition-all duration-300 hover:border-accent/40`}
              >
                {/* Variant Label */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono text-sm uppercase tracking-wider text-white">
                    {v.name}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleReset(v.id)}
                      className="p-1.5 text-muted-foreground hover:text-white transition-colors duration-200"
                      title="Replay Entrance Animation"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCopy(v.id)}
                      className="p-1.5 text-muted-foreground hover:text-white transition-colors duration-200"
                      title="Copy React Code"
                    >
                      {copiedId === v.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Logo Canvas */}
                <div className="h-64 flex items-center justify-center border border-border/20 bg-black/40 relative overflow-hidden group-hover:bg-black/60 transition-colors duration-300">
                  <AnimatedLogo
                    key={`${v.id}-${key}`}
                    variant={v.id}
                    inverted={!currentOverride}
                    color={currentOverride}
                    className="w-32 h-32 md:w-36 md:h-36 transition-all duration-300"
                  />

                  {/* Copy tooltip popup */}
                  {copiedId === v.id && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm transition-all duration-200">
                      <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                        Copied React Code!
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="mt-4 font-mono text-xs text-muted-foreground leading-relaxed flex-grow">
                  {v.desc}
                </p>

                {/* Color customization */}
                <div className="mt-4 pt-4 border-t border-border/20">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">Color Palette</span>
                    <div className="flex gap-1.5">
                      {colors.map((c) => (
                        <button
                          key={c.label}
                          onClick={() =>
                            setColorOverrides((prev) => ({
                              ...prev,
                              [v.id]: c.value,
                            }))
                          }
                          className={`w-3.5 h-3.5 rounded-full border transition-all duration-200 ${
                            (c.value === "" && !currentOverride) || currentOverride === c.value
                              ? "border-white scale-120"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                          style={{
                            backgroundColor: c.value || "#ffffff",
                          }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Resource links */}
                <div className="mt-4 pt-4 border-t border-border/10 flex items-center justify-between gap-4">
                  <a
                    href={`/assets/4sight-${v.id}.svg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors duration-200"
                  >
                    View SVG <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={`/assets/4sight-${v.id}.svg`}
                    download={`4sight-${v.id}.svg`}
                    className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-accent hover:text-white transition-colors duration-200"
                  >
                    Download SVG <Download className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer info banner */}
        <div className="mt-16 border border-accent/20 bg-accent/5 p-6 md:p-8 rounded-none">
          <h4 className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Integrating Standalone SVGs</h4>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed max-w-4xl">
            The standalone SVGs in <code className="text-white">public/assets/</code> contain self-encapsulated CSS and SMIL animations. They can be loaded directly as standard images:
            <br />
            <code className="block bg-black/60 p-3 border border-border/30 rounded mt-3 text-emerald-400 overflow-x-auto">
              {`<!-- Standard HTML -->\n<img src="/assets/4sight-matrix-scan.svg" alt="4Sight Logo" width="200" />\n\n/* Tailwind / Next.js Background */\n<div className="bg-[url('/assets/4sight-neon-flicker.svg')] bg-contain bg-no-repeat" />`}
            </code>
          </p>
        </div>
      </div>
    </main>
  )
}
