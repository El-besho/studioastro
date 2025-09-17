// Dynamic sitemap generation endpoint
import type { APIRoute } from 'astro';
import { generateSitemap } from '../lib/sitemap-generator';

export const GET: APIRoute = async () => {
  const sitemap = generateSitemap();
  
  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
    },
  });
};