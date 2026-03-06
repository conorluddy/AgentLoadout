export default `
# pngquant — Lossy PNG compressor

## When to use
Reduce PNG file size by 50-80% with minimal visual quality loss. Ideal for web assets, screenshots, and icons.

## Trusted commands
- Compress with default quality: \`pngquant image.png\`
- Set quality range: \`pngquant --quality=65-80 image.png\`
- Overwrite original: \`pngquant --force --ext .png image.png\`
- Batch compress: \`pngquant --force --ext .png *.png\`
- Output to stdout: \`pngquant - < input.png > output.png\`

## Why it matters for agents
Agents optimise generated screenshots, OG images, and icon sets — often cutting 60-70% off PNG sizes before deployment.

## Gotchas
- Lossy compression — visually near-identical but not bit-perfect.
- Combine with oxipng for lossy + lossless pipeline.
- Exit code 99 means quality target can't be met — widen the range.
`.trim();
