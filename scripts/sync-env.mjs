import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(join(home, '.config', 'sanity', 'config.json'), 'utf8'));
let env = readFileSync('.env', 'utf8');
if (!env.includes('SANITY_API_TOKEN=')) {
  env += `\nSANITY_API_TOKEN=${cfg.authToken}\nSANITY_TOKEN=${cfg.authToken}\n`;
  writeFileSync('.env', env, 'utf8');
  console.log('Added SANITY_API_TOKEN to .env');
} else {
  console.log('Token already in .env');
}
