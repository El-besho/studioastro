
'use client';

import { ServiceHierarchy } from '@/types/services';
import { siteConfig } from '@/config/site';
import { getAllCities } from '@/lib/services';
import { Service, WithContext } from 'schema-dts';

interface ServiceSchemaProps {
  service: ServiceHierarchy & { slug: string };
}

export function ServiceSchema({ service }: ServiceSchemaProps) {
  const cities = getAllCities();

  const serviceJsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.ar_name,
    description: service.seo.summary,
    serviceType: service.en_name,
    category: service.category,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: cities.map((city) => ({
      '@type': 'City',
      name: city.ar_name,
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `الخدمات الفرعية لـ ${service.ar_name}`,
      itemListElement: service.sub_services.map((sub, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Service',
          name: sub.ar_name,
          url: `${siteConfig.url}/services/${service.slug}/${sub.slug}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
    />
  );
}
