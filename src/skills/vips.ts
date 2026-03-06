export default `
# libvips — Fast image processing

## When to use
Batch-process images with lower memory usage and higher speed than ImageMagick. Powers the Sharp Node.js library.

## Trusted commands
- Get image info: \`vipsheader image.jpg\`
- Resize image: \`vips resize input.jpg output.jpg 0.5\`
- Convert format: \`vips copy input.png output.webp\`
- Create thumbnail: \`vips thumbnail input.jpg output.jpg 300\`
- Extract area: \`vips crop input.jpg output.jpg 0 0 100 100\`

## Why it matters for agents
Agents processing images in bulk get significantly faster throughput with lower memory overhead than ImageMagick.

## Gotchas
- Commands use \`vips\` or \`vipsthumbnail\` — check both are available.
- Output format is inferred from the file extension.
- Streaming pipeline architecture means memory stays flat even for large images.
`.trim();
