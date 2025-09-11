
'use client';

import { WithContext, Service, Offer, Question } from 'schema-dts';
import { siteConfig } from '../config/site';
import { ServiceHierarchy, SubService } from '../types/services';
import { getAllCities } from '../lib/services';

interface SubServiceSchemaProps {
  service: ServiceHierarchy & { slug: string };
  subService: SubService;
}

export function SubServiceSchema({ service, subService }: SubServiceSchemaProps) {
  const serviceUrl = `${siteConfig.url}/services/${service.slug}/${subService.slug}`;

  const offer: Offer = {
    '@type': 'Offer',
    priceCurrency: 'SAR',
    lowPrice: subService.avg_price_range[0],
    highPrice: subService.avg_price_range[1],
    url: serviceUrl,
    priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'SAR',
        minPrice: subService.avg_price_range[0],
        maxPrice: subService.avg_price_range[1],
        price: ` ${subService.avg_price_range[0]} - ${subService.avg_price_range[1]} ﷼`
    }
  };
  
  const faqs: Question[] | undefined = subService.seo.faq?.map(faqItem => ({
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
    name: subService.ar_name,
    description: subService.seo?.summary || `خدمة ${subService.ar_name} المتخصصة.`,
    url: serviceUrl,
    serviceType: subService.ar_name,
    category: service.ar_name,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    offers: offer,
     areaServed: getAllCities().map(city => ({
        '@type': 'City',
        name: city.ar_name,
    })),
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
