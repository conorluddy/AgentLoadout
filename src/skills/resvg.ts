export default `
# resvg — High-fidelity SVG renderer

## When to use
Render SVG files to PNG with accurate results. Handles complex SVGs that other tools misrender.

## Trusted commands
- Render SVG to PNG: \`resvg input.svg output.png\`
- Set output width: \`resvg input.svg output.png -w 1024\`
- Set output height: \`resvg input.svg output.png -h 768\`
- Set DPI: \`resvg input.svg output.png --dpi 300\`

## Why it matters for agents
Agents generating social images, OG cards, or icons from SVG templates get pixel-perfect PNG output.

## Gotchas
- Rust-based — very fast but no interactive mode.
- Pairs well with svgo: optimise SVG first, then render with resvg.
- Supports most SVG features including filters and gradients.
`.trim();
