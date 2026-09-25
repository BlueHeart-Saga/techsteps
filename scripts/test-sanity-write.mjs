import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(`${home}/.config/sanity/config.json`, 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

async function run() {
  try {
    const user = await client.users.getById('me');
    console.log('Sanity authenticated user:', user?.name || user?.email || user?.id);
  } catch (err) {
    console.error('Auth error:', err);
  }
}

run();
