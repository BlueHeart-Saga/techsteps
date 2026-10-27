// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { EnumChangefreq } from 'sitemap';
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
  'https://techsteps.co.uk';

// https://astro.build/config
export default defineConfig({
  server: {
    port: 3000
  },
  site: productionSite,
  trailingSlash: 'never',
  redirects: {
    '/insights/case-studies': '/case-studies',
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
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
        const rawPath = page.replace(productionSite, '').replace('https://techsteps.co.uk', '');
        const path = rawPath.replace(/\/$/, '') || '/';

        // Exclude system/studio, 404, sitemaps themselves, and non-canonical redirect aliases
        const excludedExactPaths = new Set([
          '/404',
          '/terms',
          '/cta-preview',
          '/cta-preview.html',
          '/certifications-accreditations',
          '/partners-associations',
          '/our-people-culture',
          '/people-culture',
          '/request-a-collection',
          '/insights/case-studies',
          '/sitemap.xml',
          '/sitemap-index.xml',
          // Exclude single-level division aliases under /services/ (canonical division hubs are at root /information-management etc.)
          '/services/information-management',
          '/services/it-lifecycle',
          '/services/it-lifecycle-services-destruction',
          '/services/moving-relocation-services',
          '/services/relocation',
          '/services/secure-destruction',
          '/services/secure-shredding-document-integrity',
        ]);

        if (excludedExactPaths.has(path) || path.startsWith('/admin') || path.startsWith('/studio')) {
          return false;
        }

        // Canonical services filtering (/services/[slug])
        if (path.startsWith('/services/')) {
          const parts = path.split('/').filter(Boolean); // ['services', ...]

          // Canonical service routes: /services/[serviceSlug]
          if (parts.length === 2) {
            const serviceSlug = parts[1];

            const canonicalServiceSlugs = new Set([
              // Information Management
              'document-storage',
              'tape-media-storage',
              'heritage-storage',
              'vault-storage',
              'document-scanning',
              'digital-mailroom',
              'document-management',

              // IT Lifecycle Services & Destruction
              'secure-it-disposal',
              'secure-collection-services',
              'it-asset-disposition-services',
              'it-asset-tracking-services',
              'remarketing-recycling',
              'ultra-secure-hard-drive-destruction',

              // Secure Shredding & Document Integrity
              'home-shredding',
              'on-site-shredding',
              'off-site-shredding',
              'product-shredding',
              'simpler-recycling-services',
              'disposal-services',
              'cardboard-recycling',
              'dry-mixed-recycling',

              // Moving & Relocation Services
              'business-relocations',
              'laboratory-relocations-storage',
              'heritage-relocations-storage',
              'europe-international-domestic-moves',
              'it-relocations-specialist',
              'project-management',
            ]);

            return canonicalServiceSlugs.has(serviceSlug);
          }

          // Exclude hierarchical aliases from sitemap since /services/[slug] is canonical
          return false;
        }

        // Canonical insights filtering
        if (path.startsWith('/insights/')) {
          const parts = path.split('/').filter(Boolean); // ['insights', ...]

          const validInsightCategories = new Set([
            'blogs',
            'community',
            'awards-milestones',
            'company-announcements',
            'impact-metrics',
            'achievements',
          ]);

          // Level 1: /insights/[param]
          if (parts.length === 2) {
            const catSlug = parts[1];
            // Only keep real category archive pages; exclude single-level post redirects
            return validInsightCategories.has(catSlug);
          }

          // Level 2: /insights/[category]/[postSlug]
          if (parts.length === 3) {
            const catSlug = parts[1];
            const postSlug = parts[2];

            if (!validInsightCategories.has(catSlug)) {
              return false;
            }

            // Exclude raw 24-hex-char MongoDB ObjectIDs
            if (/^[a-f0-9]{24}$/i.test(postSlug)) {
              return false;
            }

            return true;
          }

          return false;
        }

        return true;
      },

      serialize(item) {
        const path = item.url.replace(productionSite, '').replace('https://techsteps.co.uk', '');
        if (path === '' || path === '/') {
          item.changefreq = EnumChangefreq.DAILY;
          item.priority = 1.0;
        } else if (
          path.startsWith('/services') ||
          path.startsWith('/sectors') ||
          path === '/information-management' ||
          path === '/it-lifecycle-services-destruction' ||
          path === '/secure-shredding-document-integrity' ||
          path === '/moving-relocation-services'
        ) {
          item.changefreq = EnumChangefreq.WEEKLY;
          item.priority = 0.9;
        } else if (path.startsWith('/insights') || path.startsWith('/case-studies')) {
          item.changefreq = EnumChangefreq.WEEKLY;
          item.priority = 0.8;
        } else if (
          path === '/about-us' ||
          path === '/contact' ||
          path === '/sustainability' ||
          path === '/request-a-quote' ||
          path === '/investors'
        ) {
          item.changefreq = EnumChangefreq.WEEKLY;
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
          item.changefreq = EnumChangefreq.MONTHLY;
          item.priority = 0.4;
        } else {
          item.changefreq = EnumChangefreq.MONTHLY;
          item.priority = 0.7;
        }
        return item;
      }
    })
  ],
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'dev-api-middleware',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/newsletter/subscribe' && req.method === 'POST') {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: 'Subscribed successfully!' }));
              return;
            }
            next();
          });
        }
      }
    ],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      exclude: ['maplibre-gl']
    },
    define: {
      // Fixes the "process is not defined" error in client-side code
      'process.env': {}
    }
  }
});