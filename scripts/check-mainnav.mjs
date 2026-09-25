import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const home = process.env.USERPROFILE || process.env.HOME;
const cfg = JSON.parse(readFileSync(`${home}/.config/sanity/config.json`, 'utf8'));

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  token: cfg.authToken,
  useCdn: false,
});

const settings = await client.fetch('*[_type == "siteSettings"][0]{ _id, mainNav }');
console.log('Live Sanity mainNav:');
(settings.mainNav || []).forEach((item, i) => {
  const dest = item.externalUrl || (item.internalRef ? '[ref:' + item.internalRef._ref + ']' : '?');
  console.log(`${i + 1}. ${item.label} -> ${dest}`);
});
