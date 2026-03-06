export default `
# asciinema — Terminal session recorder

## When to use
Record terminal sessions as lightweight asciicast files for documentation, demos, or bug reports.

## Trusted commands
- Record session: \`asciinema rec demo.cast\`
- Play recording: \`asciinema play demo.cast\`
- Record with idle limit: \`asciinema rec --idle-time-limit 2 demo.cast\`
- Record specific command: \`asciinema rec --command "pnpm test" demo.cast\`
- Upload to asciinema.org: \`asciinema upload demo.cast\`

## Why it matters for agents
Agents can record their terminal workflows for review, create reproducible demos, or capture test runs for debugging.

## Gotchas
- Recordings are text-based (not video) — tiny file sizes and searchable.
- Set \`--idle-time-limit\` to trim long pauses.
- \`.cast\` files can be embedded in web pages with the asciinema player.
`.trim();
