export default `
# d2 — Declarative diagramming language

## When to use
Generate architecture diagrams, flowcharts, sequence diagrams, and ERDs from text. Output SVG or PNG without a GUI.

## Trusted commands
- Render to SVG: \`d2 input.d2 output.svg\`
- Render to PNG: \`d2 input.d2 output.png\`
- Watch mode: \`d2 --watch input.d2 output.svg\`
- Set theme: \`d2 --theme 200 input.d2 output.svg\`
- Set layout engine: \`d2 --layout elk input.d2 output.svg\`

## Why it matters for agents
Agents generate architecture and flow diagrams from code analysis — describe structure in text, get publication-ready SVGs.

## Gotchas
- D2 files use a simple DSL: \`a -> b: label\`.
- Supports sequence diagrams, classes, ERDs, and grid diagrams.
- Multiple layout engines: dagre (default), elk, tala.
`.trim();
