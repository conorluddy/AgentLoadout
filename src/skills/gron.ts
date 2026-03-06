export default `
# gron — Flatten JSON for grepping

## When to use
Turn nested JSON into greppable assignment statements. Find paths in complex API responses without writing jq expressions.

## Trusted commands
- Flatten JSON: \`gron data.json\`
- Flatten from URL: \`gron https://api.example.com/data\`
- Pipe from stdin: \`cat data.json | gron\`
- Grep for field: \`gron data.json | grep "name"\`
- Unflatten back to JSON: \`gron data.json | grep "users" | gron --ungron\`

## Why it matters for agents
Agents exploring unfamiliar JSON APIs can grep for field names across deeply nested structures, then reconstruct filtered subsets.

## Gotchas
- Output format: \`json.users[0].name = "Alice";\` — each line is a full path.
- \`--ungron\` converts flattened output back to valid JSON.
- Combine with rg for regex filtering of JSON paths.
`.trim();
