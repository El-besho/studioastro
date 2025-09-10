import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://enqaz.org',
  integrations: [
    tailwind(),
    react(),
    mdx()
  ],
  output: 'static',
  build: {
    assets: 'assets'
  },
  vite: {
    define: {
      'process.env': process.env
    }
  }
});