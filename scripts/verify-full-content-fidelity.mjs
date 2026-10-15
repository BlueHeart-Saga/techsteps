import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

function checkFile(relPath, requiredSnippets) {
  const fullPath = join(process.cwd(), 'dist', relPath);
  if (!existsSync(fullPath)) {
    console.error(`❌ File missing: ${relPath}`);
    return false;
  }
  const content = readFileSync(fullPath, 'utf8');
  let allPass = true;
  for (const snippet of requiredSnippets) {
    if (content.includes(snippet)) {
      console.log(`  ✓ Found: "${snippet.substring(0, 50)}..."`);
    } else {
      console.error(`  ❌ MISSING in ${relPath}: "${snippet}"`);
      allPass = false;
    }
  }
  return allPass;
}

console.log('=== 1. VERIFYING HOMEPAGE (dist/index.html) ===');
checkFile('index.html', [
  'Creating Value',
  'From Each Device',
  'Why Choose TechSteps?',
  'Security &amp; Compliance',
  'Complete Lifecycle Solutions',
  'Sustainable Outcomes',
  'Reliable Service',
  'Supporting Businesses Across Every Sector',
  '/images/services/why choose us.webp',
]);

console.log('\n=== 2. VERIFYING ABOUT US (dist/about-us/index.html) ===');
checkFile('about-us/index.html', [
  'We are one of the UK’s leading providers of secure and confidential shredding services',
  'Technology',
  'With a Purpose',
  'Nationwide network, local expertise',
  'Built on Trust',
  'Driven by Impact',
  'Committed to sustainability: 0% landfill shredding',
  '100K+',
  'Devices Processed',
  '500+',
  'Businesses Served',
  '0%',
  'To Landfill (Recoverable)',
  'From a Simple',
  'Idea to a Bigger',
  'Impact.',
  'Founded',
  'Expanded',
  'Partnered',
  'Driving',
  'building (1).webp',
  'about hero.webp',
  'More Than Recycling. A Brighter Future. (1).webp',
  'People. Planet. Progress. (1).webp',
]);

console.log('\n=== 3. VERIFYING LEADERSHIP (dist/leadership/index.html) ===');
checkFile('leadership/index.html', [
  'Leadership with',
  'purpose.',
  'Leadership that puts',
  'responsibility into action.',
  'Experience that',
  'moves us forward.',
  'CHIEF EXECUTIVE OFFICER',
  'OPERATIONS DIRECTOR',
  'COMMERCIAL DIRECTOR',
  'Principles that',
  'shape our leadership.',
  'Integrity',
  'Responsibility',
  'Innovation',
  'Long-term thinking',
  'Turning responsible',
  'ideas into action.',
  'Leading with a focus on',
  'what matters most.',
  'People',
  'Planet',
  'Technology',
]);

console.log('\n=== 4. VERIFYING SERVICE PAGES ===');
checkFile('services/secure-it-disposal/index.html', [
  'secure-it-disposal.webp',
  'Secure IT Disposal',
]);
