
'use client'

import React, { useEffect, useState } from 'react';
import { Home, ChevronLeft } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { siteConfig } from '../../config/site';
import { getAllServices, getCityBySlug, getServiceCategories, getAllCities } from '../../lib/services';
import { getPostBySlug } from '../../lib/blog';

type BreadcrumbSegment = {
  label: string;
  path: string;
};


const allServices = getAllServices();
const allCities = getAllCities();
const allCategories = getServiceCategories();

// In a real-world app, you'd likely fetch real names from a database/CMS.
const getLabelForSegment = (segment: string, fullPath: string) => {
    try {
      const decodedSegment = decodeURIComponent(segment);
      
      const city = getCityBySlug(decodedSegment);
      if (city) {
        return city.ar_name;
      }
      
      const service = allServices.find(s => s.slug === decodedSegment);
      if (service) {
        return service.ar_name;
      }

      const pathSegments = fullPath.split('/').filter(Boolean);
      
      // Handle blog posts: /blog/[slug]
      if (pathSegments.length === 2 && pathSegments[0] === 'blog') {
        try {
          const post = getPostBySlug(decodedSegment);
          if (post) {
            return post.frontmatter.title;
          }
        } catch (error) {
          // If post not found, fall through to default handling
        }
      }
      
      if (pathSegments.length > 1 && pathSegments[0] === 'services') {
         // Handle category pages: /services/category/[slug]
        if (pathSegments[1] === 'category') {
          const category = allCategories.find(c => c.slug === decodedSegment);
          if (category) return category.ar_name;
        }

         // Handle service pages: /services/[service]
         if (pathSegments.length === 2) {
           const service = allServices.find(s => s.slug === decodedSegment);
           if (service) return service.ar_name;
         }

         // Handle sub-service pages: /services/[service]/[subservice]
         if (pathSegments.length === 3) {
           const serviceSlug = pathSegments[1];
           const mainService = allServices.find(s => s.slug === serviceSlug);
           if (mainService) {
              const subService = mainService.sub_services.find(sub => sub.slug === decodedSegment);
               if (subService) {
                  return subService.ar_name;
               }
           }
         }

         // Handle city pages: /services/[service]/[city] or /services/[service]/[subservice]/[city]
         if (pathSegments.length >= 3) {
           const city = allCities.find(c => c.slug === decodedSegment);
           if (city) return city.ar_name;
         }
      }

      // Fallback for simple pages like 'about', 'contact', etc.
      const staticLabels: { [key: string]: string } = {
          'about': 'من نحن',
          'contact': 'تواصل معنا',
          'join-provider': 'انضم كمزود خدمة',
          'services': 'الخدمات',
          'blog': 'المدونة',
          'search': 'نتائج البحث',
          'privacy': 'سياسة الخصوصية',
          'terms': 'شروط الاستخدام',
          'category': 'الفئات'
      };

      return staticLabels[decodedSegment] || decodedSegment.replace(/-/g, ' ');

    } catch (e) {
      // Fallback for malformed URI
      return segment.replace(/-/g, ' ');
    }
};


export function Breadcrumb() {
  const [pathname, setPathname] = useState('');
  
  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);
  
  const segments = pathname.split('/').filter(Boolean);

  // Don't show breadcrumbs on the homepage
  if (segments.length === 0) {
    return null;
  }

  const breadcrumbSegments: BreadcrumbSegment[] = segments.map((segment, index) => {
    const path = '/' + segments.slice(0, index + 1).join('/');
    const label = getLabelForSegment(segment, path);
    return { label, path };
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: siteConfig.url,
      },
      ...breadcrumbSegments.map((segment, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: segment.label,
        item: `${siteConfig.url}${segment.path}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="bg-muted/50">
        <div className="container flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
          <Button variant="ghost" size="icon-sm" className="h-7 w-7" asChild>
            <a href="/" aria-label="Home">
              <Home className="h-4 w-4" />
            </a>
          </Button>
          <ChevronLeft className="h-4 w-4" />
          
          {breadcrumbSegments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            
            return (
              <div key={segment.path} className="flex items-center gap-2">
                <a
                  href={segment.path}
                  className={cn(
                    'hover:text-foreground',
                    isLast ? 'font-medium text-foreground' : ''
                  )}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {segment.label}
                </a>
                {!isLast && <ChevronLeft className="h-4 w-4" />}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
