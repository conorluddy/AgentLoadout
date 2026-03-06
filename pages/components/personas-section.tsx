"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface PersonaTool {
  name: string
  preset: string
  useCase: string
  agentUse: string
}

interface Persona {
  id: string
  title: string
  pitch: string
  tools: PersonaTool[]
}

const personas: Persona[] = [
  {
    id: "designers",
    title: "Designers",
    pitch: "CLI tools aren't just for backend engineers. Process images, manipulate colours, render SVGs, generate diagrams, and compress assets — all from the terminal, all agent-accessible.",
    tools: [
      { name: "svgo", preset: "design", useCase: "Optimise SVGs by 30-70%. Strip redundant metadata from icons and illustrations.", agentUse: "Agents optimise SVG assets in bulk before deployment — smaller bundles, faster loads." },
      { name: "resvg", preset: "design", useCase: "Render SVG designs to pixel-perfect PNGs for social cards, OG images, and icon sets.", agentUse: "Agents generate production PNGs from SVG templates — OG images, favicons, app icons in one pass." },
      { name: "chafa", preset: "design", useCase: "Quick-preview images directly in the terminal without switching to a GUI app.", agentUse: "Agents visually inspect generated images, screenshots, and thumbnails without leaving the terminal." },
      { name: "pastel", preset: "design", useCase: "Generate palettes, convert between colour spaces, derive tints and shades from brand colours.", agentUse: "Agents programmatically build design token files — derive entire palettes from a single brand colour." },
      { name: "d2", preset: "design", useCase: "Write architecture diagrams, flowcharts, and ERDs as text. Render to SVG or PNG.", agentUse: "Agents generate diagrams from code analysis — describe structure in text, get publication-ready visuals." },
      { name: "pngquant", preset: "design", useCase: "Lossy PNG compression — cut 50-80% off file size with minimal visual quality loss.", agentUse: "Agents compress screenshots and generated images before committing — smaller repos, faster pages." },
      { name: "oxipng", preset: "design", useCase: "Lossless PNG optimization. Run after pngquant or standalone for zero-loss compression.", agentUse: "Agents run oxipng as a final pass on all PNG assets — guaranteed size reduction, zero quality loss." },
      { name: "libvips", preset: "media", useCase: "Batch-resize product images, generate thumbnails, convert formats. 5-10x faster than ImageMagick.", agentUse: "Agents process image assets in bulk without hitting memory limits. Powers Sharp under the hood." },
    ],
  },
  {
    id: "engineers",
    title: "Engineers",
    pitch: "Your agent becomes a 10x pair programmer. Structural code search, dead code detection, AST-level diffing, and benchmarking — tools that make every code review faster.",
    tools: [
      { name: "ripgrep", preset: "core", useCase: "Fastest code search available — 10-100x faster than grep. Respects .gitignore by default.", agentUse: "Agents locate symbols and patterns across large codebases in milliseconds." },
      { name: "ast-grep", preset: "agent", useCase: "Structural code search using AST patterns. Find usages, rename methods, enforce patterns.", agentUse: "Agents refactor code structurally — no false positives from string matching." },
      { name: "biome", preset: "agent", useCase: "Fast, zero-config linter and formatter for JS/TS. Format and lint in a single pass.", agentUse: "Agents auto-fix lint errors and format code before committing — consistent style every time." },
      { name: "duckdb", preset: "agent", useCase: "SQL analytics on CSV, JSON, and Parquet files. Explore logs and data without a database.", agentUse: "Agents query structured data with SQL — log analysis, data exploration, CSV transforms." },
      { name: "gron", preset: "agent", useCase: "Flatten nested JSON into greppable lines. Find paths without writing jq expressions.", agentUse: "Agents explore unfamiliar API responses — grep for field names across deeply nested structures." },
      { name: "knip", preset: "agent", useCase: "Find unused exports, files, and dependencies in TypeScript/JavaScript projects.", agentUse: "Agents detect dead code and unused dependencies — keep codebases lean automatically." },
      { name: "hyperfine", preset: "agent", useCase: "Benchmark commands with statistical analysis. Compare before/after performance.", agentUse: "Agents measure the impact of optimizations with rigorous statistical comparisons." },
      { name: "difftastic", preset: "agent", useCase: "Structural diff that compares files by AST rather than line-by-line.", agentUse: "Agents get meaningful diffs that understand code structure — fewer false positives in reviews." },
    ],
  },
  {
    id: "security",
    title: "Security",
    pitch: "Shift left with agents that scan automatically. Vulnerability detection, secret scanning, link checking, and prose linting — catch issues before they ship.",
    tools: [
      { name: "trivy", preset: "security", useCase: "Comprehensive vulnerability scanner for containers, filesystems, git repos, and IaC configs.", agentUse: "Agents scan dependencies and Docker images for CVEs before merging PRs." },
      { name: "semgrep", preset: "security", useCase: "Multi-language static analysis using pattern rules. Finds security bugs and anti-patterns.", agentUse: "Agents run custom security rules on every code change — catch OWASP issues automatically." },
      { name: "gitleaks", preset: "security", useCase: "Scan git history and working trees for accidentally committed secrets.", agentUse: "Agents check for leaked API keys and credentials before code reaches remote." },
      { name: "act", preset: "security", useCase: "Run GitHub Actions workflows locally using Docker. Faster iteration on CI configs.", agentUse: "Agents test workflow changes locally — no more push-and-pray CI debugging." },
      { name: "age", preset: "security", useCase: "Simple, modern file encryption with a clean CLI. Resistant to misuse by design.", agentUse: "Agents encrypt sensitive files and secrets — simple key management, no GPG complexity." },
      { name: "doggo", preset: "security", useCase: "Modern DNS lookup tool with JSON output and DNS-over-HTTPS support.", agentUse: "Agents diagnose DNS issues with structured output — JSON results for automated checks." },
      { name: "lychee", preset: "agent", useCase: "Fast link checker for markdown, HTML, and websites. Catches broken references.", agentUse: "Agents validate documentation links after edits — catch dead URLs before they ship." },
      { name: "vale", preset: "agent", useCase: "Prose linter that enforces style guides on docs. Catches jargon and passive voice.", agentUse: "Agents validate documentation quality against Google, Microsoft, or custom style rules." },
    ],
  },
  {
    id: "indie",
    title: "Indie Hackers",
    pitch: "One person, 64 tools. Ship faster with a terminal that handles GitHub workflows, load testing, document conversion, runtime management, and terminal recording.",
    tools: [
      { name: "GitHub CLI", preset: "core", useCase: "Full GitHub API access — PRs, issues, releases, workflows, and repo management.", agentUse: "Agents create PRs, manage issues, trigger workflows — full GitHub automation." },
      { name: "just", preset: "agent", useCase: "A make alternative with clean syntax that doubles as a project task menu.", agentUse: "Agents discover and run project tasks from justfiles — self-documenting automation." },
      { name: "oha", preset: "agent", useCase: "Load-test your API endpoints before launch. Get real latency numbers and throughput.", agentUse: "Agents benchmark API changes with structured JSON — compare p50/p99 latencies automatically." },
      { name: "fx", preset: "dx", useCase: "Interactive JSON viewer. Explore design token files, API responses, or CMS content.", agentUse: "Agents navigate unfamiliar JSON structures and extract the right paths for jq queries." },
      { name: "mise", preset: "dx", useCase: "Manage runtime versions (Node, Python, Ruby) per project via .mise.toml.", agentUse: "Agents ensure correct runtime versions per project — no more 'works on my machine'." },
      { name: "lazygit", preset: "dx", useCase: "Full-featured TUI git client for staging, committing, branching, and rebasing.", agentUse: "Agents get visual git context — understand branch state and history at a glance." },
      { name: "pandoc", preset: "agent", useCase: "Convert documents between any format — Markdown, HTML, PDF, DOCX, LaTeX.", agentUse: "Agents transform documentation between formats — generate PDFs from markdown, HTML from DOCX." },
      { name: "asciinema", preset: "dx", useCase: "Record terminal sessions as lightweight text files for documentation and demos.", agentUse: "Agents capture their own workflows as reviewable recordings — great for debugging and auditing." },
    ],
  },
]

const presetColors: Record<string, string> = {
  media: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  design: "text-fuchsia-400 border-fuchsia-400/30 bg-fuchsia-400/5",
  agent: "text-accent border-accent/30 bg-accent/5",
  dx: "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  core: "text-sky-400 border-sky-400/30 bg-sky-400/5",
  security: "text-rose-400 border-rose-400/30 bg-rose-400/5",
}

export function PersonasSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activePersona, setActivePersona] = useState("designers")

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return

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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const animateGrid = useCallback(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll("article")
    if (cards.length === 0) return

    gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      },
    )
  }, [])

  useEffect(() => {
    animateGrid()
  }, [activePersona, animateGrid])

  const currentPersona = personas.find((p) => p.id === activePersona) ?? personas[0]

  return (
    <section ref={sectionRef} id="personas" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      <div ref={headerRef} className="mb-16">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          03 / Who It&apos;s For
        </span>
        <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
          WHO IS THIS FOR
        </h2>
        <p className="mt-6 max-w-2xl font-mono text-sm text-muted-foreground leading-relaxed">
          Different roles, same superpower. Pick your perspective to see which tools matter most for your workflow.
        </p>

        {/* Persona selector pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setActivePersona(persona.id)}
              className={cn(
                "font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-300",
                activePersona === persona.id
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {persona.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active persona pitch */}
      <p className="mb-8 max-w-3xl font-mono text-sm text-muted-foreground leading-relaxed">
        {currentPersona.pitch}
      </p>

      {/* Tool grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {currentPersona.tools.map((tool) => (
          <PersonaToolCard key={`${currentPersona.id}-${tool.name}`} tool={tool} />
        ))}
      </div>
    </section>
  )
}

function PersonaToolCard({ tool }: { tool: PersonaTool }) {
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
              Use case
            </span>
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              {tool.useCase}
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
