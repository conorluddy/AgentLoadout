"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const designTools = [
  {
    name: "libvips",
    preset: "media",
    designUse: "Batch-resize product images, generate thumbnails, convert formats. 5-10x faster than ImageMagick with flat memory usage.",
    agentUse: "Agents process image assets in bulk without hitting memory limits. Powers Sharp under the hood.",
  },
  {
    name: "resvg",
    preset: "design",
    designUse: "Render SVG designs to pixel-perfect PNGs for social cards, OG images, and icon sets.",
    agentUse: "Agents generate production PNGs from SVG templates — OG images, favicons, app icons in one pass.",
  },
  {
    name: "chafa",
    preset: "design",
    designUse: "Quick-preview images directly in the terminal without switching to a GUI app.",
    agentUse: "Agents can visually inspect generated images, screenshots, and thumbnails without leaving the terminal.",
  },
  {
    name: "oha",
    preset: "agent",
    designUse: "Load-test your portfolio site or API endpoints before launch. Get real latency numbers.",
    agentUse: "Agents benchmark API changes with structured JSON output — compare p50/p99 latencies before and after.",
  },
  {
    name: "fx",
    preset: "dx",
    designUse: "Explore design token JSON files, Figma API responses, or CMS content interactively.",
    agentUse: "Agents navigate unfamiliar JSON structures visually and extract the right paths for jq queries.",
  },
  {
    name: "pastel",
    preset: "design",
    designUse: "Generate palettes, convert between colour spaces, derive tints and shades from brand colours.",
    agentUse: "Agents programmatically build design token files — derive entire palettes from a single brand colour.",
  },
  {
    name: "csview",
    preset: "dx",
    designUse: "Inspect exported analytics, content spreadsheets, or font metrics as aligned terminal tables.",
    agentUse: "Agents read tabular data cleanly without guessing column boundaries in raw CSV.",
  },
  {
    name: "asciinema",
    preset: "dx",
    designUse: "Record terminal demos for documentation, README files, or tutorial content.",
    agentUse: "Agents capture their own workflows as reviewable recordings — great for debugging and auditing.",
  },
]

const presetColors: Record<string, string> = {
  media: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  design: "text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/5",
  agent: "text-accent border-accent/30 bg-accent/5",
  dx: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
}

export function DesignersSection() {
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
    <section ref={sectionRef} id="designers" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          03 / For Designers
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          DESIGN TOOLS FOR AI AGENTS
        </h2>
        <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          CLI tools aren't just for backend engineers. These 8 additions let designers and indie hackers
          process images, manipulate colours, preview assets, and record demos — all from the terminal,
          all agent-accessible.
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {designTools.map((tool) => (
          <DesignToolCard key={tool.name} tool={tool} />
        ))}
      </div>
    </section>
  )
}

function DesignToolCard({
  tool,
}: {
  tool: {
    name: string
    preset: string
    designUse: string
    agentUse: string
  }
}) {
  return (
    <article className="group relative border border-border/40 p-6 transition-all duration-500 hover:border-accent/60">
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="font-[var(--font-bebas)] text-2xl tracking-tight group-hover:text-accent transition-colors duration-300">
            {tool.name}
          </h3>
          <span
            className={cn(
              "font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border",
              presetColors[tool.preset] ?? "text-muted-foreground border-border/30",
            )}
          >
            {tool.preset}
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent mb-1 block">
              Design use
            </span>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              {tool.designUse}
            </p>
          </div>

          <div className="w-8 h-px bg-border/60" />

          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-accent mb-1 block">
              Agent use
            </span>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              {tool.agentUse}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}
