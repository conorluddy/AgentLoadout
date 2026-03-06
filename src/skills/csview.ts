export default `
# csview — CSV/TSV viewer

## When to use
View tabular data (CSV, TSV) with aligned columns and optional styling in the terminal.

## Trusted commands
- View CSV: \`csview data.csv\`
- View TSV: \`csview -t data.tsv\`
- Custom delimiter: \`csview -d ';' data.csv\`
- No header row: \`csview --no-headers data.csv\`
- Pipe from stdin: \`cat data.csv | csview\`

## Why it matters for agents
Agents inspecting exported data, build reports, or log tables get clean columnar output instead of comma-separated noise.

## Gotchas
- Rust-based — handles large files efficiently.
- Use \`-t\` flag for TSV files.
- For SQL-level queries on CSV, use duckdb instead.
`.trim();
