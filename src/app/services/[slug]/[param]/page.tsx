
import { notFound } from 'next/navigation';
import {
  getCityBySlug,
  getServiceAndSubServiceBySlugs,
  getAllCities,
  getServiceBySlug,
} from '@/lib/services';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { ParamPageContent } from '@/components/param-page-content';
import { getTrendingQueries } from '@/lib/queries';

interface ParamPageProps {
  params: {
    slug: string;
    param: string;
  };
}

export async function generateMetadata({ params }: ParamPageProps): Promise<Metadata> {
  const { slug, param } = params;

  const city = getCityBySlug(param);
  const service = getServiceBySlug(slug);

  if (city && service) {
    let title = `${service.ar_name} في ${city.ar_name} | ${siteConfig.name}`;
    let description = `نقدم خدمات ${service.ar_name} المحترفة في ${city.ar_name}. احصل على أفضل العروض من مزودين معتمدين.`;
    const url = `${siteConfig.url}/services/${service.slug}/${city.slug}`;
    let keywords = [...service.seo.primary_keywords, ...service.seo.secondary_keywords].map(k => `${k} في ${city.ar_name}`);
    keywords.push(service.ar_name, city.ar_name);


    if (service.id === 'cleaning-services') {
        title = `شركة تنظيف في ${city.ar_name} | خدمات تنظيف منازل وفلل | ${siteConfig.name}`;
        description = `أفضل شركة تنظيف في ${city.ar_name}. نقدم خدمات تنظيف منازل، شقق، وفلل، بالإضافة إلى غسيل كنب وسجاد. احصل على عرض سعر مجاني من أفضل شركات النظافة في ${city.ar_name}.`;
        keywords = ["شركة تنظيف", "تنظيف منازل", "تنظيف شقق", "تنظيف فلل", "غسيل كنب", "غسيل سجاد", `شركة نظافة في ${city.ar_name}`];
    }

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: url,
      },
    };
  }

  const subServiceData = getServiceAndSubServiceBySlugs(slug, param);
  if (subServiceData) {
     const { service, subService } = subServiceData;
    const title = `${subService.ar_name} | ${service.ar_name} - ${siteConfig.name}`;
    const description = subService.seo?.summary || `اطلب خدمة ${subService.ar_name} الاحترافية. ${service.ar_name} بأفضل الأسعار.`;
    const url = `${siteConfig.url}/services/${service.slug}/${subService.slug}`;
    const keywords = [...subService.seo.primary_keywords, ...subService.seo.secondary_keywords, service.ar_name];
     return {
      title,
      description,
      keywords,
      alternates: {
        canonical: url,
      },
    };
  }

  return {};
}


export default async function ParamPage({ params }: ParamPageProps) {
  const { slug, param } = params;

  const city = getCityBySlug(param);
  const service = getServiceBySlug(slug);

  if (city && service) {
    const trendingQueries = await getTrendingQueries({ service: service.slug, location: city.slug, limit: 50 });
    return <ParamPageContent pageType="city" service={service} city={city} subService={null} trendingQueries={trendingQueries} />;
  }

  const subServiceData = getServiceAndSubServiceBySlugs(slug, param);
  if (subServiceData) {
    const trendingQueries = await getTrendingQueries({ service: subServiceData.service.slug, subService: subServiceData.subService.slug, limit: 50 });
    return <ParamPageContent pageType="subService" service={subServiceData.service} subService={subServiceData.subService} city={null} trendingQueries={trendingQueries} />;
  }

  notFound();
}
