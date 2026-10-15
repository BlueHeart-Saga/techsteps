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

let totalPass = true;

console.log('=== 1. VERIFYING HOMEPAGE (dist/index.html) ===');
if (!checkFile('index.html', [
  'Creating Value',
  'From Each Device',
  'Why Choose TechSteps?',
  'Security &amp; Compliance',
  'Complete Lifecycle Solutions',
  'Sustainable Outcomes',
  'Reliable Service',
  'Supporting Businesses Across Every Sector',
  '/images/services/why choose us.webp',
])) totalPass = false;

console.log('\n=== 2. VERIFYING ABOUT US (dist/about-us/index.html) ===');
if (!checkFile('about-us/index.html', [
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
  'Idea to a Lasting',
  'Impact.',
  'Founded',
  'Expanded',
  'Partnered',
  'Driving',
  'building (1).webp',
  'about hero.webp',
  'More Than Recycling. A Brighter Future. (1).webp',
  'People. Planet. Progress. (1).webp',
])) totalPass = false;

console.log('\n=== 3. VERIFYING LEADERSHIP (dist/leadership/index.html) ===');
if (!checkFile('leadership/index.html', [
  'Leadership Team',
  'People. Experience. Purpose.',
  'Experience That Moves Us Forward',
  'CHIEF EXECUTIVE OFFICER',
  'OPERATIONS DIRECTOR',
  'COMMERCIAL DIRECTOR',
  'HEAD OF SUSTAINABILITY &amp; COMPLIANCE',
  'Leading Technology Towards a More Responsible Future',
  'Security',
  'Recovery',
  'Sustainability',
  'Building the next chapter of responsible technology.',
  'Let&#39;s Build a More Responsible Technology Future',
])) totalPass = false;

console.log('\n=== 4. VERIFYING SERVICE PAGES ===');
if (!checkFile('services/secure-it-disposal/index.html', [
  'secure-it-disposal.webp',
  'Secure IT Disposal',
])) totalPass = false;

console.log('\n=== 5. VERIFYING INVESTORS (dist/investors/index.html) ===');
if (!checkFile('investors/index.html', [
  'Market leadership in essential lifecycle services.',
  'Environmental Stewardship',
  'Social &amp; Community Responsibility',
  'Defensible Board Governance',
  'Techsteps plc has four businesses providing leading services in the management of data.',
  'Restoring our World',
  'Committed to Transparent Corporate Governance',
])) totalPass = false;

console.log('\n=== 6. VERIFYING SUSTAINABILITY (dist/sustainability/index.html) ===');
if (!checkFile('sustainability/index.html', [
  'A Smarter Lifecycle for Every Asset.',
  'Zero-Landfill Guarantee',
  'Chain-of-Custody',
  'Triage &amp; Verification',
])) totalPass = false;

console.log('\n=== 7. VERIFYING DIVISIONS ===');
if (!checkFile('information-management/index.html', [
  'Information Management Services UK',
  'Information Management Built Around Your Business',
])) totalPass = false;

if (!checkFile('it-lifecycle-services-destruction/index.html', [
  'IT Lifecycle &amp; Destruction Services UK',
  'Sustainable, Secure IT Asset Management for Modern Enterprise',
])) totalPass = false;

if (!checkFile('secure-shredding-document-integrity/index.html', [
  'Secure Shredding &amp; Destruction Services UK',
  'Certified Data Destruction Built for Total Peace of Mind',
])) totalPass = false;

if (!checkFile('moving-relocation-services/index.html', [
  'Specialist Moving &amp; Commercial Relocation Services UK',
  'Precision Relocation Engineered for Critical Infrastructure',
])) totalPass = false;

console.log('\n=== 8. VERIFYING LEGAL PAGES ===');
if (!checkFile('terms-and-conditions/index.html', [
  'Terms &amp; Conditions',
  '1. Scope &amp; Application of Terms',
])) totalPass = false;

if (!checkFile('privacy-policy/index.html', [
  'Privacy Policy',
  'Categories of Information We Collect',
])) totalPass = false;

console.log('\n=== 9. VERIFYING CONTACT (dist/contact/index.html) ===');
if (!checkFile('contact/index.html', [
  'Contact Us',
  'Get in touch',
  'Unit B, Roebuck road',
  'Hainault business park',
])) totalPass = false;

if (totalPass) {
  console.log('\n=========================================');
  console.log('🎉 ALL FULL-CONTENT FIDELITY AUDITS PASSED!');
  console.log('=========================================');
} else {
  console.error('\n❌ SOME AUDITS FAILED');
  process.exit(1);
}
