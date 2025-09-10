import { seoConfig } from '../config/seo';
import { siteConfig } from '../config/site';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

export function getSEOProps(page: keyof typeof seoConfig.pages, overrides: Partial<SEOProps> = {}): SEOProps {
  const pageConfig = seoConfig.pages[page];
  const defaultConfig = seoConfig.default;
  
  return {
    title: overrides.title || pageConfig.title,
    description: overrides.description || pageConfig.description,
    keywords: overrides.keywords || pageConfig.keywords,
    author: overrides.author || defaultConfig.author,
    ogImage: overrides.ogImage || defaultConfig.ogImage,
    canonical: overrides.canonical,
    noindex: overrides.noindex || false,
    nofollow: overrides.nofollow || false,
    publishedTime: overrides.publishedTime,
    modifiedTime: overrides.modifiedTime
  };
}

export function generateCanonicalUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

export function generatePageTitle(title: string, includeSiteName: boolean = true): string {
  if (includeSiteName) {
    return `${title} | ${siteConfig.name}`;
  }
  return title;
}