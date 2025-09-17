'use client';

import { Post } from '../../types/blog';
import { siteConfig } from '../../config/site';

interface ArticleSchemaProps {
  post: Post;
}

export function ArticleSchema({ post }: ArticleSchemaProps) {
  // Extract word count from content (approximate)
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Assuming 200 words per minute

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.frontmatter.title,
    description: post.frontmatter.summary,
    image: post.frontmatter.image ? {
      '@type': 'ImageObject',
      url: post.frontmatter.image.startsWith('http') 
        ? post.frontmatter.image 
        : `${siteConfig.url}${post.frontmatter.image}`,
      width: 1200,
      height: 630
    } : undefined,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.date, // Assuming no modification date for now
    author: {
      '@type': 'Person',
      name: post.frontmatter.author,
      url: siteConfig.url
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/logo.png`,
        width: 200,
        height: 200
      },
      description: siteConfig.description,
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'SA',
        addressRegion: 'Riyadh'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['Arabic', 'English']
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`
    },
    url: `${siteConfig.url}/blog/${post.slug}`,
    articleSection: 'خدمات منزلية',
    keywords: post.frontmatter.tags.join(', '),
    inLanguage: 'ar-SA',
    isAccessibleForFree: true,
    genre: 'نصائح وخدمات منزلية',
    wordCount: wordCount,
    timeRequired: `PT${readingTime}M`,
    about: post.frontmatter.tags.map(tag => ({
      '@type': 'Thing',
      name: tag
    })),
    mentions: post.frontmatter.tags.map(tag => ({
      '@type': 'Thing',
      name: tag
    })),
    // Add breadcrumb structure
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
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
    />
  );
}