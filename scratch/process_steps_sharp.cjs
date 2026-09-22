const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const images = [
  {
    src: 'C:\\Users\\mani\\.gemini\\antigravity-ide\\brain\\e8f9bf42-124d-4c7f-9909-5bbfe2756360\\process_step1_collect_1790069380026.jpg',
    out: 'step-1-collect.png',
  },
  {
    src: 'C:\\Users\\mani\\.gemini\\antigravity-ide\\brain\\e8f9bf42-124d-4c7f-9909-5bbfe2756360\\process_step2_secure_1790069408204.jpg',
    out: 'step-2-secure.png',
  },
  {
    src: 'C:\\Users\\mani\\.gemini\\antigravity-ide\\brain\\e8f9bf42-124d-4c7f-9909-5bbfe2756360\\process_step3_sanitise_1790069453807.jpg',
    out: 'step-3-sanitise.png',
  },
  {
    src: 'C:\\Users\\mani\\.gemini\\antigravity-ide\\brain\\e8f9bf42-124d-4c7f-9909-5bbfe2756360\\process_step4_recover_1790069496617.jpg',
    out: 'step-4-recover.png',
  },
  {
    src: 'C:\\Users\\mani\\.gemini\\antigravity-ide\\brain\\e8f9bf42-124d-4c7f-9909-5bbfe2756360\\process_step5_recycle_1790069543182.jpg',
    out: 'step-5-recycle.png',
  },
];

const outDir = path.resolve('public/images/process/new');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processImage(srcPath, outName) {
  console.log(`Processing ${srcPath}...`);
  // Resize to 512x512 for optimal sharpness and performance
  const { data, info } = await sharp(srcPath)
    .resize(600, 600, { fit: 'inside' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  function isBgCandidate(idx) {
    const r = data[idx * 4];
    const g = data[idx * 4 + 1];
    const b = data[idx * 4 + 2];
    const minVal = Math.min(r, g, b);
    const maxVal = Math.max(r, g, b);
    // Almost pure white or light grey studio background
    return minVal >= 236 && (maxVal - minVal) <= 20;
  }

  // Seed boundary edges
  for (let x = 0; x < width; x++) {
    // top edge
    const topIdx = x;
    if (isBgCandidate(topIdx)) {
      visited[topIdx] = 1;
      queue[tail++] = topIdx;
    }
    // bottom edge
    const btmIdx = (height - 1) * width + x;
    if (isBgCandidate(btmIdx)) {
      visited[btmIdx] = 1;
      queue[tail++] = btmIdx;
    }
  }

  for (let y = 0; y < height; y++) {
    // left edge
    const leftIdx = y * width;
    if (visited[leftIdx] === 0 && isBgCandidate(leftIdx)) {
      visited[leftIdx] = 1;
      queue[tail++] = leftIdx;
    }
    // right edge
    const rightIdx = y * width + (width - 1);
    if (visited[rightIdx] === 0 && isBgCandidate(rightIdx)) {
      visited[rightIdx] = 1;
      queue[tail++] = rightIdx;
    }
  }

  // BFS flood fill for background
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1,
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
    ];

    for (let i = 0; i < 4; i++) {
      const n = neighbors[i];
      if (n !== -1 && visited[n] === 0 && isBgCandidate(n)) {
        visited[n] = 1;
        queue[tail++] = n;
      }
    }
  }

  // Apply transparency with soft edge feathering
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const p = idx * 4;

      if (visited[idx] === 1) {
        // Pure background
        data[p + 3] = 0;
      } else {
        // Check if neighboring a visited bg pixel for smooth antialiasing
        let bgNeighborCount = 0;
        const checkOffsets = [-1, 1, -width, width];
        for (const off of checkOffsets) {
          const n = idx + off;
          if (n >= 0 && n < width * height && visited[n] === 1) {
            bgNeighborCount++;
          }
        }

        if (bgNeighborCount > 0) {
          const r = data[p];
          const g = data[p + 1];
          const b = data[p + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum > 220) {
            // Soft blend out
            const factor = Math.max(0, Math.min(1, (255 - lum) / 35));
            data[p + 3] = Math.round(data[p + 3] * factor);
          }
        }
      }
    }
  }

  // Find tight bounding box of subject so we can crop/align the bottom perfectly
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = y * width + x;
      const alpha = data[idx * 4 + 3];
      if (alpha > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Bounds for ${outName}: x [${minX}, ${maxX}], y [${minY}, ${maxY}]`);

  // Trim and save
  const targetPath = path.join(outDir, outName);
  const subjectWidth = maxX - minX + 1;
  const subjectHeight = maxY - minY + 1;

  await sharp(data, {
    raw: { width, height, channels: 4 },
  })
    .extract({
      left: Math.max(0, minX - 10),
      top: Math.max(0, minY - 10),
      width: Math.min(width - Math.max(0, minX - 10), subjectWidth + 20),
      height: Math.min(height - Math.max(0, minY - 10), subjectHeight + 10), // keep bottom tight!
    })
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(targetPath);

  console.log(`Saved ${targetPath}`);
}

(async () => {
  for (const img of images) {
    await processImage(img.src, img.out);
  }
  console.log('All images processed successfully!');
})();
