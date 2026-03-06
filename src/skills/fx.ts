export default `
# fx — Interactive JSON viewer

## When to use
Explore and filter JSON data interactively. Complements jq with a visual, navigable interface.

## Trusted commands
- View JSON file: \`fx data.json\`
- Pipe JSON: \`cat data.json | fx\`
- Apply JS expression: \`fx data.json '.items.map(x => x.name)'\`
- Filter with dot notation: \`fx data.json '.users[0].email'\`
- Reduce: \`fx data.json '.items.length'\`

## Why it matters for agents
Agents exploring unfamiliar API responses or config files can quickly navigate nested structures and extract paths for jq queries.

## Gotchas
- Accepts JavaScript expressions, not jq syntax.
- Interactive mode requires a TTY — use expressions for scripting.
- Reads from stdin or file argument.
`.trim();
