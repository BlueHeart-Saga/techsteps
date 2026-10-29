import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Running Chrome to dump DOM of Google search...');
const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--virtual-time-budget=10000',
  '--dump-dom',
  'https://www.google.com/search?q=site%3Ahttps%3A%2F%2Ftechsteps.co.uk%2F&hl=en'
];

try {
  const stdout = execFileSync(chromePath, args, { maxBuffer: 50 * 1024 * 1024, encoding: 'utf8' });
  console.log('Received DOM size from Chrome:', stdout.length);
  fs.writeFileSync('scripts/chrome-google-dump.html', stdout, 'utf8');

  const titleMatch = stdout.match(/<title>([^<]+)<\/title>/i);
  console.log('Page Title:', titleMatch ? titleMatch[1] : 'No title');

  if (stdout.includes('Before you continue to Google') || stdout.includes('consent.google.com')) {
    console.log('Google redirected to cookie consent page!');
  }

  const links = new Set();
  const regex = /href=[\"'](https?:\/\/(?:www\.)?techsteps\.co\.uk[^\"'#\s]*)[\"']/gi;
  let match;
  while ((match = regex.exec(stdout)) !== null) {
    links.add(match[1]);
  }

  console.log('Techsteps links found in Google DOM:', links.size);
  for (const l of links) {
    console.log(' ->', l);
  }

  const allOccurrences = [...stdout.matchAll(/techsteps\.co\.uk[a-zA-Z0-9_\-\/\.\?]*/gi)].map(m => m[0]);
  const uniqueOccurrences = [...new Set(allOccurrences)];
  console.log('\nAll raw techsteps.co.uk occurrences:', uniqueOccurrences.length);
  uniqueOccurrences.slice(0, 30).forEach(u => console.log(' *', u));
} catch (err) {
  console.error('Error executing Chrome:', err);
}
