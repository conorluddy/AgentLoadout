export default `
# vale — Prose linter for documentation

## When to use
Enforce writing style guides on documentation, README files, and technical content. Catches jargon, passive voice, and style violations.

## Trusted commands
- Lint a file: \`vale README.md\`
- Lint a directory: \`vale docs/\`
- JSON output: \`vale --output JSON README.md\`
- Initialize config: \`vale sync\`
- List installed styles: \`vale ls-config\`

## Why it matters for agents
Agents writing or editing documentation can validate prose quality against style guides — Google, Microsoft, or custom rules.

## Gotchas
- Requires a \`.vale.ini\` config file in the project root.
- Install styles with \`vale sync\` after configuring packages.
- Common styles: Google, Microsoft, write-good, proselint.
`.trim();
