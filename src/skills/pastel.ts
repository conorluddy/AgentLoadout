export default `
# pastel — Color manipulation tool

## When to use
Generate, convert, inspect, and manipulate colours from the terminal. Ideal for design token generation and palette work.

## Trusted commands
- Show color info: \`pastel color "#ff6b35"\`
- Convert format: \`pastel format hsl "#ff6b35"\`
- Generate palette: \`pastel gradient -n 5 "#ff6b35" "#1a1a2e"\`
- Lighten colour: \`pastel lighten 0.2 "#ff6b35"\`
- Darken colour: \`pastel darken 0.2 "#ff6b35"\`
- Complementary: \`pastel complement "#ff6b35"\`
- Mix colours: \`pastel mix "#ff6b35" "#1a1a2e"\`

## Why it matters for agents
Agents generating design tokens, theme files, or CSS variables can programmatically derive entire palettes from brand colours.

## Gotchas
- Supports hex, RGB, HSL, Lab, and named CSS colours.
- Use \`pastel list\` to see all named colours.
- Output can be piped — combine with sd for bulk colour replacement.
`.trim();
