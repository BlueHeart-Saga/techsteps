const sharp = require('sharp');

const svgOverlay = Buffer.from(`
<svg width="240" height="50" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="240" height="50" fill="#f1f4ef" />
  <text x="120" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14.5" font-weight="500" fill="#222" text-anchor="middle">Refurbish, repair and</text>
  <text x="120" y="38" font-family="system-ui, -apple-system, sans-serif" font-size="14.5" font-weight="500" fill="#222" text-anchor="middle">prepare for reuse.</text>
</svg>
`);

sharp('public/images/services/process-flow-graphic.jpg')
  .composite([{
    input: svgOverlay,
    left: 580,
    top: 332
  }])
  .toFile('public/images/services/process-flow-graphic-clean.png')
  .then(() => console.log('fixed typo successfully!'));
