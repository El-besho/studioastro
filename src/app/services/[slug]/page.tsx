
import { notFound } from 'next/navigation';
import { getAllServices, getAllCities, getServiceBySlug } from '@/lib/services';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Lightbulb, Star } from 'lucide-react';
import Link from 'next/link';
import { CityList } from '@/components/city-list';
import { ServiceHierarchy } from '@/types/services';
import { ServiceSchema } from '@/components/semantic/service-schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ServiceCard } from '@/components/service-card';
import { Button } from '@/components/ui/button';
import { getTrendingQueries } from '@/lib/queries';
import { TrendingQueries } from '@/components/trending-queries';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

async function getServiceFromParams(params: ServicePageProps['params']) {
  const service = getServiceBySlug(params.slug);
  if (!service) {
    return null;
  }
  return service;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = await getServiceFromParams(params);

  if (!service) {
    return {};
  }

  const url = siteConfig.url;
  const description = service.seo.summary || `تعرف على خدمات ${service.ar_name} التي نقدمها في جميع أنحاء المملكة العربية السعودية.`;
  const title = `${service.ar_name} | ${siteConfig.name}`;
  const keywords = [...service.seo.primary_keywords, ...service.seo.secondary_keywords];

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set('heading', service.ar_name);
  ogUrl.searchParams.set('type', siteConfig.name);
  ogUrl.searchParams.set('mode', 'light');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `${url}/services/${service.slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${url}/services/${service.slug}`,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  ServicePageProps['params'][]
> {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const service = await getServiceFromParams(params);
  const cities = getAllCities();
  const allServices = getAllServices();
  
  if (!service) {
    notFound();
  }
  
  const trendingQueries = await getTrendingQueries({ service: service.slug, limit: 50 });
  const relatedServices = allServices.filter(s => s.category === service.category && s.id !== service.id).slice(0, 4);

  return (
    <>
      <ServiceSchema service={service} />
      <div className="container py-12 md:py-24 text-right">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
              {service.ar_name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {service.seo.summary || `نقدم مجموعة شاملة من خدمات ${service.ar_name} لتلبية جميع احتياجاتك. سواء كنت تبحث عن تركيب، صيانة، أو إصلاحات طارئة، فإننا نوصلك بأفضل مزودي الخدمة المعتمدين في جميع أنحاء المملكة.`}
            </p>

            <div className="mt-8">
              <Button asChild size="lg">
                <Link href={`/services/${service.slug}/${service.sub_services[0].slug}`}>
                  اطلب الخدمة الآن
                  <Lightbulb className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <Card className="mt-8 bg-muted/30">
              <CardHeader>
                <CardTitle>الخدمات الفرعية</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {service.sub_services.map((sub) => (
                    <li key={sub.id} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <Link href={`/services/${service.slug}/${sub.slug}`} className="hover:underline">
                        {sub.ar_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {service.seo.faq && service.seo.faq.length > 0 && (
              <section id="faq" className="mt-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">الأسئلة الشائعة</h2>
                <Accordion type="single" collapsible className="w-full">
                  {service.seo.faq.map((faqItem, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-right text-lg">{faqItem.question}</AccordionTrigger>
                      <AccordionContent className="text-right text-base text-muted-foreground">
                        {faqItem.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            <div className="mt-12">
              <TrendingQueries queries={trendingQueries} title={`الاستعلامات الأكثر بحثاً عن ${service.ar_name}`} />
            </div>

            {relatedServices.length > 0 && (
              <section id="related-services" className="mt-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">خدمات ذات صلة</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedServices.map(related => (
                    <ServiceCard key={related.id} service={related} showSubServices={false} />
                  ))}
                </div>
              </section>
            )}

          </div>

          <aside className="md:col-span-1 sticky top-24 self-start space-y-8">
             <Card>
              <CardHeader>
                <CardTitle>اطلب خدمتك في أي مدينة</CardTitle>
              </CardHeader>
              <CardContent>
                <CityList
                  cities={cities}
                  service={service}
                />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
