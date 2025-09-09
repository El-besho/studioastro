
'use client';

import { WithContext, Service, Question, ListItem } from 'schema-dts';
import { siteConfig } from '@/config/site';
import { ServiceHierarchy, CityProfile } from '@/types/services';

interface ServiceLocationSchemaProps {
  service: ServiceHierarchy & { slug: string };
  city: CityProfile;
}

export function ServiceLocationSchema({ service, city }: ServiceLocationSchemaProps) {
  const serviceUrl = `${siteConfig.url}/services/${service.slug}/${city.slug}`;

  const faqs: Question[] | undefined = service.seo.faq?.map(faqItem => ({
    '@type': 'Question',
    name: faqItem.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faqItem.answer,
    },
  }));

  const serviceJsonLd: WithContext<Service> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.ar_name} في ${city.ar_name}`,
    description: `نقدم خدمات ${service.ar_name} المحترفة في ${city.ar_name}. احصل على أفضل العروض من مزودين معتمدين.`,
    url: serviceUrl,
    serviceType: service.en_name,
    category: service.category,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      '@type': 'City',
      name: city.ar_name,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `الخدمات الفرعية لـ ${service.ar_name} في ${city.ar_name}`,
      itemListElement: service.sub_services.map((sub, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Service',
            name: sub.ar_name,
            url: `${siteConfig.url}/services/${service.slug}/${sub.slug}`,
            description: sub.seo?.summary || `خدمة ${sub.ar_name}`,
            offers: {
                '@type': 'Offer',
                priceCurrency: 'SAR',
                lowPrice: sub.avg_price_range[0],
                highPrice: sub.avg_price_range[1],
            }
        },
      })),
    },
    mainEntity: faqs && faqs.length > 0 ? {
      '@type': 'FAQPage',
      mainEntity: faqs,
    } : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
    />
  );
}
