export default `
# lychee — Fast link checker

## When to use
Scan documentation, markdown files, and websites for broken links. Catches dead URLs, redirects, and timeouts.

## Trusted commands
- Check markdown files: \`lychee "**/*.md"\`
- Check a URL: \`lychee https://example.com\`
- Check with config: \`lychee --config lychee.toml "**/*.md"\`
- JSON output: \`lychee --format json "**/*.md"\`
- Exclude patterns: \`lychee --exclude "localhost" "**/*.md"\`

## Why it matters for agents
Agents validate documentation links after edits — catch broken references before they ship to production.

## Gotchas
- Rust-based — extremely fast, checks links concurrently.
- Use \`.lycheeignore\` or \`--exclude\` for known-flaky URLs.
- Supports markdown, HTML, and plain text files.
`.trim();
