// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://subdominio.com',
  integrations: [
    react(), 
    tailwind(), 
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://subdominio.com/',
        'https://subdominio.com/nosotros',
        'https://subdominio.com/servicios/web',
        'https://subdominio.com/servicios/ecommerce',
        'https://subdominio.com/servicios/automatizacion',
        'https://subdominio.com/servicios/personalizado',
        'https://subdominio.com/servicios/apps-automatizacion',
        'https://subdominio.com/proyectos',
        'https://subdominio.com/blog',
        'https://subdominio.com/contacto'
      ],
      serialize(item) {
        if (item.url === 'https://subdominio.com/') {
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
