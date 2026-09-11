// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://techsteps.co.uk',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        const path = page.replace('https://techsteps.co.uk', '');
        // Exclude 404 error page and legacy /terms alias (canonical is /terms-and-conditions)
        if (path === '/404' || path === '/terms') return false;
        return true;
      },
      serialize(item) {
        const path = item.url.replace('https://techsteps.co.uk', '');
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
