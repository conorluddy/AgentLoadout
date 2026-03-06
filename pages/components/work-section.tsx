"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const featuredTools = [
  {
    title: "ripgrep",
    category: "Core",
    description:
      "Fastest code search available. 10-100x faster than grep. Agents use it constantly to locate symbols and patterns across large codebases.",
    meta: "Rust · Unlicense · 60.6k ★",
    span: "col-span-2 row-span-2",
  },
  {
    title: "ast-grep",
    category: "Agent",
    description:
      "Structural code search using AST patterns. Find usages, rename methods, enforce patterns without false positives.",
    meta: "Rust · MIT · 12.8k ★",
    span: "col-span-1 row-span-1",
  },
  {
    title: "duckdb",
    category: "Agent",
    description:
      "Embedded SQL engine that queries CSV, JSON, and Parquet files directly. Ideal for log analysis and data exploration.",
    meta: "C++ · MIT · 36.5k ★",
    span: "col-span-1 row-span-2",
  },
  {
    title: "jq",
    category: "Core",
    description:
      "The standard tool for slicing and transforming JSON from APIs, config files, and CLI output.",
    meta: "C · 33.8k ★",
    span: "col-span-1 row-span-1",
  },
  {
    title: "trivy",
    category: "Security",
    description:
      "Comprehensive vulnerability scanner for containers, filesystems, git repos, and IaC configs. Surface CVEs before they ship.",
    meta: "Go · Apache-2.0 · 32.9k ★",
    span: "col-span-2 row-span-1",
  },
  {
    title: "biome",
    category: "Agent",
    description:
      "Fast, zero-config linter and formatter for JS/TS. Format and lint in a single pass before committing.",
    meta: "Rust · Apache-2.0 · 23.9k ★",
    span: "col-span-1 row-span-1",
  },
]

interface CatalogTool {
  name: string
  pkg: string
  desc: string
  meta: string
  repo: string
}

interface Category {
  id: string
  label: string
  count: number
  default: boolean
  tools: CatalogTool[]
}

const categories: Category[] = [
  {
    id: "core",
    label: "Core",
    count: 9,
    default: true,
    tools: [
      { name: "ripgrep", pkg: "ripgrep", desc: "Fastest code search available -- 10-100x faster than grep. Respects .gitignore by default.", meta: "Rust · Unlicense · 60.6k ★ · active", repo: "BurntSushi/ripgrep" },
      { name: "fd", pkg: "fd", desc: "Modern find replacement that's faster and has sane defaults. Output is clean and scriptable.", meta: "Rust · Apache-2.0 · 41.9k ★ · active", repo: "sharkdp/fd" },
      { name: "jq", pkg: "jq", desc: "The standard tool for slicing and transforming JSON from APIs, config files, and CLI output.", meta: "C · 33.8k ★ · active", repo: "jqlang/jq" },
      { name: "yq", pkg: "yq", desc: "Does for YAML what jq does for JSON -- reads, writes, and transforms YAML/TOML/XML.", meta: "Go · MIT · 15.0k ★ · active", repo: "mikefarah/yq" },
      { name: "bat", pkg: "bat", desc: "cat with syntax highlighting, line numbers, and git diff markers.", meta: "Rust · Apache-2.0 · 57.5k ★ · active", repo: "sharkdp/bat" },
      { name: "tree", pkg: "tree", desc: "Prints a directory as an ASCII tree -- one of the most token-efficient ways to understand project structure.", meta: "C · GPL-2.0 · stable since 1996", repo: "nodakai/tree-command" },
      { name: "GitHub CLI", pkg: "gh", desc: "Full GitHub API access from the terminal -- PRs, issues, releases, workflows, and more.", meta: "Go · MIT · 42.9k ★ · active", repo: "cli/cli" },
      { name: "fzf", pkg: "fzf", desc: "Interactive fuzzy finder that makes any list selectable. Pipe file lists, git branches, or command history.", meta: "Go · MIT · 78.3k ★ · active", repo: "junegunn/fzf" },
      { name: "xh", pkg: "xh", desc: "Friendly, fast HTTP client with sensible defaults and coloured output.", meta: "Rust · MIT · 7.6k ★ · active", repo: "ducaale/xh" },
    ],
  },
  {
    id: "agent",
    label: "Agent",
    count: 20,
    default: true,
    tools: [
      { name: "shellcheck", pkg: "shellcheck", desc: "Static analyser for bash/sh scripts that catches bugs and bad practices before they run.", meta: "Haskell · GPL-3.0 · 39.1k ★ · active", repo: "koalaman/shellcheck" },
      { name: "ast-grep", pkg: "ast-grep", desc: "Structural code search and replace using AST patterns rather than text.", meta: "Rust · MIT · 12.8k ★ · active", repo: "ast-grep/ast-grep" },
      { name: "just", pkg: "just", desc: "A make alternative with clean syntax that doubles as a project task menu.", meta: "Rust · CC0-1.0 · 31.9k ★ · active", repo: "casey/just" },
      { name: "grex", pkg: "grex", desc: "Generates regex patterns from example strings you provide.", meta: "Rust · Apache-2.0 · 8.1k ★ · active", repo: "pemistahl/grex" },
      { name: "knip", pkg: "knip", desc: "Finds unused exports, files, and dependencies in TypeScript/JavaScript projects.", meta: "TypeScript · ISC · 10.4k ★ · active", repo: "webpro-nl/knip" },
      { name: "sd", pkg: "sd", desc: "Simpler, safer sed for find-and-replace across files. Literal by default.", meta: "Rust · MIT · 7.0k ★ · active", repo: "chmln/sd" },
      { name: "hyperfine", pkg: "hyperfine", desc: "Benchmarking tool that runs commands repeatedly and reports statistical results.", meta: "Rust · Apache-2.0 · 27.6k ★ · active", repo: "sharkdp/hyperfine" },
      { name: "tokei", pkg: "tokei", desc: "Reports lines of code by language across a project.", meta: "Rust · 14.0k ★ · active", repo: "XAMPPRocky/tokei" },
      { name: "tldr", pkg: "tldr", desc: "Community-maintained cheat sheets for CLI tools, focused on practical examples.", meta: "Markdown · 61.6k ★ · active", repo: "tldr-pages/tldr" },
      { name: "biome", pkg: "biome", desc: "Fast, zero-config linter and formatter for JavaScript and TypeScript.", meta: "Rust · Apache-2.0 · 23.9k ★ · active", repo: "biomejs/biome" },
      { name: "difftastic", pkg: "difftastic", desc: "Structural diff that compares files by AST rather than line-by-line.", meta: "Rust · MIT · 24.3k ★ · active", repo: "Wilfred/difftastic" },
      { name: "pandoc", pkg: "pandoc", desc: "Converts documents between virtually any format -- Markdown, HTML, PDF, DOCX, LaTeX.", meta: "Haskell · GPL-2.0 · 42.4k ★ · active", repo: "jgm/pandoc" },
      { name: "duckdb", pkg: "duckdb", desc: "Embedded SQL engine that queries CSV, JSON, and Parquet files directly.", meta: "C++ · MIT · 36.5k ★ · active", repo: "duckdb/duckdb" },
      { name: "htmlq", pkg: "htmlq", desc: "Extracts content from HTML using CSS selectors, like jq for web pages.", meta: "Rust · MIT · 7.5k ★ · last push 2024", repo: "mgdm/htmlq" },
      { name: "typos", pkg: "typos-cli", desc: "Source code spell checker that finds common typos in identifiers, comments, and strings.", meta: "Rust · Apache-2.0 · 3.8k ★ · active", repo: "crate-ci/typos" },
      { name: "gum", pkg: "gum", desc: "Beautiful, interactive UI primitives (prompts, spinners, filters) for shell scripts.", meta: "Go · MIT · 23.0k ★ · active", repo: "charmbracelet/gum" },
      { name: "oha", pkg: "oha", desc: "HTTP load tester with JSON output. Benchmarks endpoints with structured latency and throughput data.", meta: "Rust · MIT · 10.1k ★ · active", repo: "hatoo/oha" },
      { name: "gron", pkg: "gron", desc: "Flattens JSON into greppable assignment statements. Find paths in complex API responses without jq.", meta: "Go · MIT · 14.4k ★ · last push 2025", repo: "tomnomnom/gron" },
      { name: "lychee", pkg: "lychee", desc: "Fast link checker for markdown, HTML, and websites. Catches broken and dead URLs.", meta: "Rust · Apache-2.0 · 3.4k ★ · active", repo: "lycheeverse/lychee" },
      { name: "vale", pkg: "vale", desc: "Prose linter that enforces writing style guides on documentation and README files.", meta: "Go · MIT · 5.3k ★ · active", repo: "errata-ai/vale" },
    ],
  },
  {
    id: "media",
    label: "Media",
    count: 4,
    default: false,
    tools: [
      { name: "ffmpeg", pkg: "ffmpeg", desc: "Industry-standard tool for audio and video processing -- transcoding, trimming, extracting frames.", meta: "C · LGPL/GPL · 57.6k ★ · active", repo: "FFmpeg/FFmpeg" },
      { name: "exiftool", pkg: "exiftool", desc: "Reads and writes metadata from images, video, audio, and documents.", meta: "Perl · GPL-3.0 · 4.5k ★ · active", repo: "exiftool/exiftool" },
      { name: "ImageMagick", pkg: "imagemagick", desc: "Comprehensive image manipulation -- resize, crop, convert, annotate, composite.", meta: "C · Apache-2.0 · 15.9k ★ · active", repo: "ImageMagick/ImageMagick" },
      { name: "libvips", pkg: "vips", desc: "Fast image processing pipeline with low memory usage. Powers Sharp. Faster than ImageMagick for batch operations.", meta: "C · LGPL-2.1 · 11.1k ★ · active", repo: "libvips/libvips" },
    ],
  },
  {
    id: "design",
    label: "Design",
    count: 7,
    default: false,
    tools: [
      { name: "svgo", pkg: "svgo", desc: "Optimises SVG files by removing redundant data. Often 30-70% smaller.", meta: "JavaScript · MIT · 22.4k ★ · active", repo: "svg/svgo" },
      { name: "resvg", pkg: "resvg", desc: "High-fidelity SVG-to-PNG renderer. Handles complex SVGs that other tools misrender.", meta: "Rust · Apache-2.0 · 3.7k ★ · active", repo: "linebender/resvg" },
      { name: "chafa", pkg: "chafa", desc: "Renders images as ANSI text art in the terminal. Lets agents visually inspect images without a GUI.", meta: "C · LGPL-3.0 · 4.4k ★ · active", repo: "hpjansson/chafa" },
      { name: "pastel", pkg: "pastel", desc: "Colour manipulation tool for generating, converting, and inspecting colours and palettes.", meta: "Rust · Apache-2.0 · 6.3k ★ · active", repo: "sharkdp/pastel" },
      { name: "d2", pkg: "d2", desc: "Declarative diagramming language. Generate architecture diagrams, flowcharts, and ERDs from text.", meta: "Go · MPL-2.0 · 23.2k ★ · active", repo: "terrastruct/d2" },
      { name: "pngquant", pkg: "pngquant", desc: "Lossy PNG compressor that cuts 50-80% off file size with minimal visual quality loss.", meta: "C · 5.6k ★ · active", repo: "kornelski/pngquant" },
      { name: "oxipng", pkg: "oxipng", desc: "Lossless PNG optimizer. Guaranteed size reduction with zero quality loss.", meta: "Rust · MIT · 3.8k ★ · active", repo: "oxipng/oxipng" },
    ],
  },
  {
    id: "dx",
    label: "DX",
    count: 18,
    default: false,
    tools: [
      { name: "eza", pkg: "eza", desc: "Modern ls replacement with colour-coded output, git status integration, and tree view.", meta: "Rust · EUPL-1.2 · 20.4k ★ · active", repo: "eza-community/eza" },
      { name: "zoxide", pkg: "zoxide", desc: "Learns your most-used directories and lets you jump to them by partial name.", meta: "Rust · MIT · 34.0k ★ · active", repo: "ajeetdsouza/zoxide" },
      { name: "delta", pkg: "git-delta", desc: "Syntax-highlighted, side-by-side git diffs with line numbers.", meta: "Rust · MIT · 29.3k ★ · active", repo: "dandavison/delta" },
      { name: "glow", pkg: "glow", desc: "Renders Markdown beautifully in the terminal.", meta: "Go · MIT · 23.4k ★ · active", repo: "charmbracelet/glow" },
      { name: "mise", pkg: "mise", desc: "Manages runtime versions (Node, Python, Ruby, Go) per project via .mise.toml.", meta: "Rust · MIT · 25.3k ★ · active", repo: "jdx/mise" },
      { name: "watchexec", pkg: "watchexec", desc: "Runs a command whenever files change. Reduces the feedback loop.", meta: "Rust · Apache-2.0 · 6.8k ★ · active", repo: "watchexec/watchexec" },
      { name: "mkcert", pkg: "mkcert", desc: "Creates locally-trusted HTTPS certificates for development with zero configuration.", meta: "Go · BSD-3-Clause · 58.3k ★ · stable", repo: "FiloSottile/mkcert" },
      { name: "lazygit", pkg: "lazygit", desc: "Full-featured TUI git client for staging, committing, branching, and rebasing.", meta: "Go · MIT · 73.6k ★ · active", repo: "jesseduffield/lazygit" },
      { name: "dust", pkg: "dust", desc: "Visual disk usage tree that shows what's consuming space, sorted by size.", meta: "Rust · Apache-2.0 · 11.3k ★ · active", repo: "bootandy/dust" },
      { name: "bottom", pkg: "bottom", desc: "System resource monitor (CPU, memory, network, processes) as a TUI.", meta: "Rust · MIT · 13.0k ★ · active", repo: "ClementTsang/bottom" },
      { name: "direnv", pkg: "direnv", desc: "Loads and unloads environment variables automatically when entering/leaving a directory.", meta: "Go · MIT · 14.7k ★ · active", repo: "direnv/direnv" },
      { name: "procs", pkg: "procs", desc: "Modern ps replacement with search, colour coding, and tree view.", meta: "Rust · MIT · 6.0k ★ · active", repo: "dalance/procs" },
      { name: "uv", pkg: "uv", desc: "Extremely fast Python package installer and virtual environment manager.", meta: "Rust · Apache-2.0 · 80.3k ★ · active", repo: "astral-sh/uv" },
      { name: "hexyl", pkg: "hexyl", desc: "Hex viewer with colour-coded output distinguishing printable characters and control codes.", meta: "Rust · Apache-2.0 · 10.0k ★ · active", repo: "sharkdp/hexyl" },
      { name: "taplo", pkg: "taplo", desc: "TOML formatter, linter, and query tool for Rust projects and pyproject.toml.", meta: "Rust · MIT · 2.2k ★ · active", repo: "tamasfe/taplo" },
      { name: "fx", pkg: "fx", desc: "Interactive JSON viewer with JavaScript expression support. Visual exploration of nested data.", meta: "Go · MIT · 20.3k ★ · active", repo: "antonmedv/fx" },
      { name: "csview", pkg: "csview", desc: "CSV and TSV viewer with aligned columns for readable tabular data in the terminal.", meta: "Rust · Apache-2.0 · 690 ★ · last push 2025", repo: "wfxr/csview" },
      { name: "asciinema", pkg: "asciinema", desc: "Records terminal sessions as lightweight text files for documentation and demos.", meta: "Rust · GPL-3.0 · 16.9k ★ · active", repo: "asciinema/asciinema" },
    ],
  },
  {
    id: "security",
    label: "Security",
    count: 6,
    default: false,
    tools: [
      { name: "trivy", pkg: "trivy", desc: "Comprehensive vulnerability scanner for containers, filesystems, git repos, and IaC configs.", meta: "Go · Apache-2.0 · 32.9k ★ · active", repo: "aquasecurity/trivy" },
      { name: "act", pkg: "act", desc: "Runs GitHub Actions workflows locally using Docker. Faster iteration on workflow files.", meta: "Go · MIT · 69.2k ★ · active", repo: "nektos/act" },
      { name: "gitleaks", pkg: "gitleaks", desc: "Scans git history and working trees for accidentally committed secrets.", meta: "Go · MIT · 25.2k ★ · active", repo: "gitleaks/gitleaks" },
      { name: "semgrep", pkg: "semgrep", desc: "Multi-language static analysis using pattern rules -- finds security bugs and anti-patterns.", meta: "OCaml · LGPL-2.1 · 14.3k ★ · active", repo: "semgrep/semgrep" },
      { name: "age", pkg: "age", desc: "Simple, modern file encryption with a clean CLI. Resistant to misuse by design.", meta: "Go · BSD-3-Clause · 21.5k ★ · active", repo: "FiloSottile/age" },
      { name: "doggo", pkg: "doggo", desc: "Modern DNS lookup tool with JSON output and DNS-over-HTTPS support.", meta: "Go · GPL-3.0 · 4.2k ★ · active", repo: "mr-karan/doggo" },
    ],
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
    <section ref={sectionRef} id="catalog" className="relative py-32 pl-6 md:pl-28 pr-6 md:pr-12">
      {/* Section header */}
      <div ref={headerRef} className="mb-16 flex items-end justify-between">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02 / Catalog
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-5xl md:text-7xl tracking-tight">
            FEATURED TOOLS
          </h2>
        </div>
        <p className="hidden md:block max-w-xs font-mono text-xs text-muted-foreground text-right leading-relaxed">
          64 curated terminal tools across core utilities, agent tooling, media, DX, and security.
        </p>
      </div>

      {/* Asymmetric grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[180px] md:auto-rows-[200px]"
      >
        {featuredTools.map((tool, index) => (
          <ToolCard key={index} tool={tool} index={index} persistHover={index === 0} />
        ))}
      </div>

      {/* Full catalog by category */}
      <FullCatalog />
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Featured Tool Card (unchanged)                                     */
/* ------------------------------------------------------------------ */

function ToolCard({
  tool,
  index,
  persistHover = false,
}: {
  tool: {
    title: string
    category: string
    description: string
    meta: string
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
        "group relative border border-border/40 p-5 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden",
        tool.span,
        isActive && "border-accent/60",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "absolute inset-0 bg-accent/5 transition-opacity duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="relative z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {tool.category}
        </span>
        <h3
          className={cn(
            "mt-3 font-[var(--font-bebas)] text-2xl md:text-4xl tracking-tight transition-colors duration-300",
            isActive ? "text-accent" : "text-foreground",
          )}
        >
          {tool.title}
        </h3>
      </div>
      <div className="relative z-10">
        <p
          className={cn(
            "font-mono text-xs text-muted-foreground leading-relaxed transition-all duration-500 max-w-[280px]",
            isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
          )}
        >
          {tool.description}
        </p>
        <p className="mt-1.5 font-mono text-[9px] tracking-wider text-muted-foreground/90">
          {tool.meta}
        </p>
      </div>
      <span
        className={cn(
          "absolute bottom-4 right-4 font-mono text-[10px] transition-colors duration-300",
          isActive ? "text-accent" : "text-muted-foreground/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={cn(
          "absolute top-0 right-0 w-12 h-12 transition-all duration-500",
          isActive ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="absolute top-0 right-0 w-full h-[1px] bg-accent" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-accent" />
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------ */
/*  Full Catalog — grouped by category                                 */
/* ------------------------------------------------------------------ */

function FullCatalog() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  useEffect(() => {
    if (!wrapperRef.current || !headerRef.current) return

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
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={wrapperRef} className="mt-32">
      {/* Sub-header */}
      <div ref={headerRef} className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            02.1 / Full Inventory
          </span>
          <h2 className="mt-4 font-[var(--font-bebas)] text-4xl md:text-6xl tracking-tight">
            ALL 64 TOOLS
          </h2>
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
            Health data as of March 2026
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-300",
              activeCategory === null
                ? "border-accent text-accent bg-accent/10"
                : "border-border/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
              className={cn(
                "font-mono text-[10px] uppercase tracking-widest px-4 py-2 border transition-all duration-300",
                activeCategory === cat.id
                  ? "border-accent text-accent bg-accent/10"
                  : "border-border/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {cat.label}
              <span className="ml-2 text-muted-foreground/60">{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category groups */}
      <div className="flex flex-col gap-16">
        {categories
          .filter((cat) => activeCategory === null || activeCategory === cat.id)
          .map((cat) => (
            <CategoryGroup key={cat.id} category={cat} />
          ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Category Group                                                     */
/* ------------------------------------------------------------------ */

function CategoryGroup({ category }: { category: Category }) {
  const groupRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!groupRef.current || !labelRef.current || !listRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: groupRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        },
      )

      const rows = listRef.current?.querySelectorAll("[data-tool-row]")
      if (rows && rows.length > 0) {
        gsap.set(rows, { opacity: 0, y: 24 })
        gsap.to(rows, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, groupRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={groupRef}>
      {/* Category label bar */}
      <div ref={labelRef} className="flex items-center gap-4 mb-6">
        <h3 className="font-[var(--font-bebas)] text-2xl md:text-3xl tracking-tight text-foreground">
          {category.label}
        </h3>
        <span className="font-mono text-[10px] text-accent uppercase tracking-widest">
          {category.count} tools
        </span>
        {category.default && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border/40 px-2 py-0.5">
            Default
          </span>
        )}
        <div className="flex-1 h-[1px] bg-border/40" />
      </div>

      {/* Tool rows */}
      <div ref={listRef} className="flex flex-col">
        {category.tools.map((tool, index) => (
          <CatalogRow key={tool.name} tool={tool} index={index} />
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Catalog Row                                                        */
/* ------------------------------------------------------------------ */

function CatalogRow({ tool, index }: { tool: CatalogTool; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      data-tool-row
      className={cn(
        "group relative flex items-start md:items-center gap-4 md:gap-8 py-4 px-4 border-b border-border/20 transition-all duration-300 cursor-default",
        isHovered && "bg-accent/[0.04] border-accent/20",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Index */}
      <span
        className={cn(
          "shrink-0 w-6 font-mono text-[10px] tabular-nums transition-colors duration-300",
          isHovered ? "text-accent" : "text-muted-foreground/30",
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Tool name */}
      <a
        href={`https://github.com/${tool.repo}`}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "shrink-0 w-28 md:w-36 font-[var(--font-bebas)] text-lg md:text-xl tracking-tight transition-colors duration-300",
          isHovered ? "text-accent" : "text-foreground",
        )}
      >
        {tool.name}
      </a>

      {/* Package */}
      <span className="hidden md:block shrink-0 w-28 font-mono text-[10px] text-muted-foreground/60 truncate">
        {tool.pkg}
      </span>

      {/* Description + meta */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
          {tool.desc}
        </p>
        <p className="mt-1.5 font-mono text-[9px] tracking-wider text-muted-foreground/90">
          {tool.meta}
        </p>
      </div>

      {/* Hover accent line */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[2px] bg-accent transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  )
}
