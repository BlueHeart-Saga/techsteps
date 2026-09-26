// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

const sanityProjectId =
  process.env.PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_PROJECT_ID ||
  'zjv69ibt';
const sanityDataset =
  process.env.PUBLIC_SANITY_DATASET ||
  process.env.SANITY_DATASET ||
  'techsteps';

const productionSite =
  process.env.PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://techsteps-azhjfdhnacfqaeh3.southindia-01.azurewebsites.net';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },
  site: productionSite,
  trailingSlash: 'never',
  integrations: [
    react(),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: '2026-03-01',
      useCdn: false,
      studioBasePath: '/admin',
    }),
    sitemap({
      filter: (page) => {
        const path = page.replace(productionSite, '').replace('https://techsteps.co.uk', '');
        // Exclude 404 error page, admin studio, and legacy /terms alias
        if (path === '/404' || path === '/terms' || path.startsWith('/admin')) return false;
        return true;
      },
      serialize(item) {
        const path = item.url.replace(productionSite, '').replace('https://techsteps.co.uk', '');
        if (path === '' || path === '/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (path.startsWith('/services') || path.startsWith('/sectors')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (path.startsWith('/insights') || path.startsWith('/case-studies')) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (
          path === '/about-us' ||
          path === '/contact' ||
          path === '/sustainability' ||
          path === '/request-a-quote' ||
          path === '/investors'
        ) {
          item.changefreq = 'weekly';
          item.priority = 0.8;
        } else if (
          path === '/privacy-policy' ||
          path === '/cookie-policy' ||
          path === '/terms-and-conditions' ||
          path === '/accessibility' ||
          path === '/modern-slavery-statement' ||
          path === '/environmental-policy' ||
          path === '/information-security-policy'
        ) {
          item.changefreq = 'monthly';
          item.priority = 0.4;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.7;
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      exclude: ['maplibre-gl']
    }
  }
});
