import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const lightningcss = require('lightningcss');

/**
 * Robustly unwraps CSS Cascade Layers (@layer <name> { ... })
 * while preserving the exact inner rule order and balanced braces.
 */
export function unwrapLayers(css) {
  let result = '';
  let i = 0;
  while (i < css.length) {
    const layerIdx = css.indexOf('@layer', i);
    if (layerIdx === -1) {
      result += css.slice(i);
      break;
    }
    result += css.slice(i, layerIdx);

    const openBrace = css.indexOf('{', layerIdx);
    if (openBrace === -1) {
      // No block found, check if it's a statement like @layer a, b;
      const semiIdx = css.indexOf(';', layerIdx);
      if (semiIdx !== -1) {
        i = semiIdx + 1;
        continue;
      }
      result += css.slice(layerIdx);
      break;
    }

    const semiIdx = css.indexOf(';', layerIdx);
    if (semiIdx !== -1 && semiIdx < openBrace) {
      // Just a layer declaration statement like @layer theme, base; -> skip it!
      i = semiIdx + 1;
      continue;
    }

    // Find the matching closing brace for this @layer block
    let depth = 1;
    let j = openBrace + 1;
    while (j < css.length && depth > 0) {
      if (css[j] === '{') depth++;
      else if (css[j] === '}') depth--;
      j++;
    }

    // Extract the inner content of the layer
    const content = css.slice(openBrace + 1, j - 1);
    // Recursively unwrap if there are nested layers inside
    result += unwrapLayers(content);
    i = j;
  }
  return result;
}

/**
 * Transforms CSS for comprehensive legacy Safari (Safari 14, 15, 16.0-16.3) compatibility:
 * 1. Strips @property declarations (fatal syntax errors in Safari < 16.4)
 * 2. Unwraps all @layer blocks (fatal syntax errors in Safari < 15.4)
 * 3. Provides vh fallbacks for dvh units (unsupported in Safari < 15.4)
 * 4. Transpiles oklch() colors to universal rgb()/rgba()/hex via LightningCSS
 * 5. Flattens CSS nesting (Safari < 17.2 bugs) and adds -webkit- vendor prefixes
 */
export function downlevelCssForSafari(css, filename = 'bundle.css') {
  if (!css || typeof css !== 'string') return css;

  let processed = css;

  // 1. Remove @property declarations
  processed = processed.replace(/@property\s+[^{]+{[^}]*}/g, '');

  // 2. Unwrap all @layer blocks
  processed = unwrapLayers(processed);

  // 3. Add vh fallbacks for dvh viewport units (including inside min(), max(), calc())
  processed = processed.replace(
    /([a-zA-Z\-]+)\s*:\s*([^;}{]*?\b\d+dvh[^;}{]*)/g,
    (match, prop, val) => {
      const vhVal = val.replace(/(\d+)dvh/g, '$1vh');
      return vhVal !== val ? `${prop}:${vhVal};${prop}:${val}` : match;
    }
  );

  // 4. Downlevel via Lightning CSS targeting Safari 14+ / iOS Safari 14+
  try {
    const targets = {
      safari: (14 << 16) | (0 << 8),
      ios_saf: (14 << 16) | (0 << 8),
    };

    const result = lightningcss.transform({
      filename,
      code: Buffer.from(processed),
      targets,
      minify: true,
    });

    return result.code.toString();
  } catch (err) {
    console.warn(`[Safari CSS Downleveler] LightningCSS notice for ${filename}:`, err.message);
    return processed;
  }
}

/**
 * Process all CSS files in dist/_astro
 */
export function processDistCss(distDir = path.resolve('dist')) {
  const astroAssetsDir = path.join(distDir, '_astro');
  if (!fs.existsSync(astroAssetsDir)) {
    console.warn('[Safari CSS Downleveler] dist/_astro directory does not exist yet.');
    return;
  }

  const files = fs.readdirSync(astroAssetsDir).filter((f) => f.endsWith('.css'));
  console.log(`[Safari CSS Downleveler] Found ${files.length} CSS files in dist/_astro`);

  let processedCount = 0;
  for (const file of files) {
    const filePath = path.join(astroAssetsDir, file);
    const original = fs.readFileSync(filePath, 'utf8');

    const downleveled = downlevelCssForSafari(original, file);

    if (downleveled !== original) {
      fs.writeFileSync(filePath, downleveled, 'utf8');
      const oklchCount = (downleveled.match(/oklch\(/g) || []).length;
      const layerCount = (downleveled.match(/@layer/g) || []).length;
      const propertyCount = (downleveled.match(/@property/g) || []).length;
      console.log(`  ✓ ${file}: @layer=${layerCount}, @property=${propertyCount}, oklch=${oklchCount} (${original.length} -> ${downleveled.length} bytes)`);
      processedCount++;
    }
  }

  console.log(`[Safari CSS Downleveler] Successfully downleveled ${processedCount} CSS files for legacy Safari!`);
}

// Auto-run if executed directly as a script
if (process.argv[1] && process.argv[1].endsWith('downlevel-css-safari.mjs')) {
  processDistCss();
}
