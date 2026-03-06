export default `
# chafa — Image-to-ANSI art renderer

## When to use
Preview images directly in the terminal as coloured text art. Useful when agents need to "see" an image without a GUI.

## Trusted commands
- Preview image: \`chafa image.png\`
- Set output size: \`chafa -s 80x24 image.png\`
- Use specific symbols: \`chafa --symbols block image.png\`
- ASCII-only output: \`chafa --symbols ascii image.png\`
- Preview with transparency: \`chafa --bg white image.png\`

## Why it matters for agents
Agents can inspect image outputs without leaving the terminal — verify screenshots, check generated graphics, review thumbnails.

## Gotchas
- Quality depends on terminal capabilities. Use \`--format symbols\` for widest compatibility.
- Works with PNG, JPEG, GIF, WebP, and many other formats.
- Pipe support: \`curl -s url | chafa -\`
`.trim();
