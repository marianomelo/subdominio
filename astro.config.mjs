// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://subdominio.cl',
  output: 'static',
  trailingSlash: 'never',
  integrations: [
    react(), 
    tailwind(), 
    mdx(),
    icon(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/_'),
      serialize(item) {
        // Remove trailing slashes for consistency
        if (item.url.endsWith('/') && item.url !== 'https://subdominio.cl/') {
          item.url = item.url.slice(0, -1);
        }
        
        if (item.url === 'https://subdominio.cl/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        if (item.url.includes('/servicios/')) {
          item.changefreq = 'monthly';
          item.priority = 0.8;
        }
        if (item.url.includes('/blog')) {
          item.changefreq = 'weekly';
          item.priority = 0.6;
        }
        return item;
      }
    })
  ],
});
