'use client';

import { Post } from '../../types/blog';
import { siteConfig } from '../../config/site';

interface WebPageSchemaProps {
  post: Post;
}

export function WebPageSchema({ post }: WebPageSchemaProps) {
  const webpageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: post.frontmatter.title,
    description: post.frontmatter.summary,
    url: `${siteConfig.url}/blog/${post.slug}`,
    inLanguage: 'ar-SA',
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url
    },
    about: {
      '@type': 'Thing',
      name: 'خدمات منزلية'
    },
    mainEntity: {
      '@type': 'Article',
      headline: post.frontmatter.title,
      description: post.frontmatter.summary,
      url: `${siteConfig.url}/blog/${post.slug}`
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'الرئيسية',
          item: siteConfig.url
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'المدونة',
          item: `${siteConfig.url}/blog`
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.frontmatter.title,
          item: `${siteConfig.url}/blog/${post.slug}`
        }
      ]
    },
    potentialAction: {
      '@type': 'ReadAction',
      target: `${siteConfig.url}/blog/${post.slug}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }}
    />
  );
}