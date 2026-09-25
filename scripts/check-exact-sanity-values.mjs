import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function main() {
  const sus = await client.fetch('*[_type == "sustainabilityPage"][0].approach.steps');
  console.log('Sustainability steps in Sanity:');
  console.log(sus);

  const inv = await client.fetch('*[_type == "investorsPage"][0].esgPillars');
  console.log('\nInvestors ESG pillars in Sanity:');
  console.log(inv);

  const it = await client.fetch('*[_type == "division" && slug.current == "it-lifecycle-services-destruction"][0]');
  console.log('\nIT Lifecycle division in Sanity:');
  console.log('heroTitle:', it?.heroTitle);
  console.log('aboutTitle:', it?.aboutTitle);

  const tc = await client.fetch('*[_type == "legalPage" && slug.current == "terms-and-conditions"][0].sections');
  console.log('\nTerms & Conditions sections in Sanity:');
  console.log(tc?.map(s => s.heading));
}

main().catch(console.error);
