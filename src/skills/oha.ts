export default `
# oha — HTTP load tester

## When to use
Benchmark HTTP endpoints with concurrent requests and get structured JSON results. Complements xh (single requests) with load testing.

## Trusted commands
- Basic load test: \`oha -n 100 -c 10 http://localhost:3000\`
- JSON output: \`oha -n 100 -c 10 --json http://localhost:3000\`
- Set duration: \`oha -z 10s -c 50 http://localhost:3000\`
- POST with body: \`oha -n 100 -m POST -d '{"key":"val"}' http://localhost:3000/api\`
- Custom headers: \`oha -n 100 -H "Authorization: Bearer token" http://localhost:3000\`

## Why it matters for agents
Agents benchmarking API changes get structured latency percentiles, throughput, and error rates as JSON they can compare programmatically.

## Gotchas
- \`-n\` = number of requests, \`-c\` = concurrent connections, \`-z\` = duration.
- JSON output with \`--json\` is ideal for piping to jq.
- Rust-based — extremely low overhead compared to other load testers.
`.trim();
