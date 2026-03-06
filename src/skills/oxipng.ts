export default `
# oxipng — Lossless PNG optimizer

## When to use
Reduce PNG file size without any quality loss. Run after pngquant for maximum compression, or standalone for lossless-only workflows.

## Trusted commands
- Optimize in place: \`oxipng -o 4 image.png\`
- Max compression: \`oxipng -o max image.png\`
- Batch optimize: \`oxipng -o 4 -r ./images/\`
- Strip metadata: \`oxipng -o 4 --strip safe image.png\`
- Preserve original: \`oxipng -o 4 --out optimized.png image.png\`

## Why it matters for agents
Agents run oxipng as a final pass on all PNG assets — guaranteed size reduction with zero quality loss.

## Gotchas
- \`-o\` levels: 0 (fast) to max (slow). Level 4 is a good default.
- \`--strip safe\` removes metadata without breaking rendering.
- Rust-based — fast even on large batches.
`.trim();
