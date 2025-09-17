// Sitemap Generator for Enqaz Platform
import { getAllServices } from './services';
import { getAllCities } from './cities';
import { siteConfig } from '../config/site';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const currentDate = new Date().toISOString().split('T')[0];
  const baseUrl = siteConfig.url;

  // Static pages with high priority
  const staticPages = [
    { path: '/', changefreq: 'daily' as const, priority: 1.0 },
    { path: '/emergency', changefreq: 'weekly' as const, priority: 0.95 }, // High priority for emergency
    { path: '/services', changefreq: 'weekly' as const, priority: 0.9 },
    { path: '/locations', changefreq: 'weekly' as const, priority: 0.9 },
    { path: '/about', changefreq: 'monthly' as const, priority: 0.7 },
    { path: '/contact', changefreq: 'monthly' as const, priority: 0.8 },
    { path: '/search', changefreq: 'weekly' as const, priority: 0.8 },
    { path: '/blog', changefreq: 'daily' as const, priority: 0.8 },
    { path: '/terms', changefreq: 'yearly' as const, priority: 0.3 },
    { path: '/privacy', changefreq: 'yearly' as const, priority: 0.3 },
    { path: '/join-provider', changefreq: 'monthly' as const, priority: 0.7 },
  ];

  // Add static pages
  staticPages.forEach(page => {
    entries.push({
      loc: `${baseUrl}${page.path}`,
      lastmod: currentDate,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Get all services and cities
  const services = getAllServices();
  const cities = getAllCities();

  // Service category pages
  const categories = ['essential', 'emergency', 'specialized', 'premium'];
  categories.forEach(category => {
    entries.push({
      loc: `${baseUrl}/services/category/${category}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Individual service pages
  services.forEach(service => {
    // Main service page
    entries.push({
      loc: `${baseUrl}/services/${service.id}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    });

    // Service + city combination pages
    cities.forEach(city => {
      entries.push({
        loc: `${baseUrl}/services/${service.id}/${city.id}`,
        lastmod: currentDate,
        changefreq: 'weekly',
        priority: 0.7
      });
    });

    // Sub-service pages
    if (service.subServices && service.subServices.length > 0) {
      service.subServices.forEach(subService => {
        // Sub-service main page
        entries.push({
          loc: `${baseUrl}/services/${service.id}/${subService.id}`,
          lastmod: currentDate,
          changefreq: 'weekly',
          priority: 0.7
        });

        // Sub-service + city combination pages
        cities.forEach(city => {
          entries.push({
            loc: `${baseUrl}/services/${service.id}/${subService.id}/${city.id}`,
            lastmod: currentDate,
            changefreq: 'weekly',
            priority: 0.6
          });
        });
      });
    }
  });

  // City pages
  cities.forEach(city => {
    entries.push({
      loc: `${baseUrl}/locations/${city.id}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Compare pages for main service categories
  const compareTypes = ['cleaning', 'maintenance', 'emergency', 'specialized'];
  compareTypes.forEach(type => {
    entries.push({
      loc: `${baseUrl}/compare/${type}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  return entries;
}

export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
}

export function generateSitemap(): string {
  const entries = generateSitemapEntries();
  return generateSitemapXML(entries);
}

// Function to get sitemap stats
export function getSitemapStats() {
  const entries = generateSitemapEntries();
  const stats = {
    totalUrls: entries.length,
    byPriority: {} as Record<number, number>,
    byChangefreq: {} as Record<string, number>,
    servicePages: 0,
    cityPages: 0,
    staticPages: 0
  };

  entries.forEach(entry => {
    // Count by priority
    stats.byPriority[entry.priority] = (stats.byPriority[entry.priority] || 0) + 1;
    
    // Count by changefreq
    stats.byChangefreq[entry.changefreq] = (stats.byChangefreq[entry.changefreq] || 0) + 1;
    
    // Count by type
    if (entry.loc.includes('/services/')) stats.servicePages++;
    else if (entry.loc.includes('/locations/')) stats.cityPages++;
    else stats.staticPages++;
  });

  return stats;
}