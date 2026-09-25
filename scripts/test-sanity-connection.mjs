import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'zjv69ibt',
  dataset: 'techsteps',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function run() {
  try {
    const siteSettings = await client.fetch('*[_type == "siteSettings"][0]');
    console.log('SiteSettings from Sanity:', siteSettings?.companyName, siteSettings?.phone, siteSettings?.email);

    const home = await client.fetch('*[_type == "homePage"][0]');
    console.log('HomePage from Sanity:', home?.hero?.heading, 'intro heading:', home?.intro?.heading);

    const about = await client.fetch('*[_type == "aboutPage"][0]');
    console.log('AboutPage from Sanity:', about?.hero?.headline);

    const services = await client.fetch('*[_type == "service"]{title, slug}');
    console.log('Services in Sanity count:', services.length, services.slice(0, 3));

    const sectors = await client.fetch('*[_type == "sector"]{title, slug}');
    console.log('Sectors in Sanity count:', sectors.length, sectors.map(s => s.title));

    const articles = await client.fetch('*[_type == "article"]{title, slug}');
    console.log('Articles in Sanity count:', articles.length, articles.map(a => a.title));

    const caseStudies = await client.fetch('*[_type == "caseStudy"]{title, slug}');
    console.log('Case studies in Sanity count:', caseStudies.length, caseStudies.map(c => c.title));
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

run();
