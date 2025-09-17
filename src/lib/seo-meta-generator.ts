// Dynamic SEO Meta Tags Generator for Service Pages
import { Service } from '../types/service';
import { City } from '../types/city';

interface MetaTagsOptions {
  service?: Service;
  subService?: any;
  city?: City;
  pageType: 'service' | 'subservice' | 'city-service' | 'category' | 'comparison';
}

export function generateMetaTags(options: MetaTagsOptions) {
  const { service, subService, city, pageType } = options;
  
  let title = '';
  let description = '';
  let keywords: string[] = [];
  
  switch (pageType) {
    case 'service':
      if (service) {
        title = `${service.name} في السعودية | أفضل ${service.technicians} فني معتمد - إنقاذ`;
        description = `احصل على خدمات ${service.name} احترافية. ${service.description.substring(0, 120)}... أسعار تبدأ من ${service.minPrice || 50} ريال. حجز فوري، ضمان الخدمة`;
        keywords = [
          service.name,
          `خدمات ${service.name}`,
          `فني ${service.name}`,
          `صيانة ${service.name}`,
          'السعودية',
          'إنقاذ'
        ];
      }
      break;
      
    case 'subservice':
      if (service && subService) {
        title = `${subService.name} | ${service.name} - خدمة فورية 24/7 - إنقاذ`;
        description = `${subService.description.substring(0, 100)}... احجز فني ${service.name} متخصص في ${subService.name}. وصول سريع، أسعار مناسبة`;
        keywords = [
          subService.name,
          service.name,
          `${subService.name} ${service.name}`,
          'خدمة فورية',
          'فني متخصص'
        ];
      }
      break;
      
    case 'city-service':
      if (service && city) {
        const cityName = city.nameAr || city.name;
        title = `${service.name} في ${cityName} | فنيون محليون 24/7 - إنقاذ`;
        description = `أفضل خدمات ${service.name} في ${cityName}. فنيون محليون معتمدون، وصول خلال 30 دقيقة، أسعار ${cityName}. احجز الآن!`;
        keywords = [
          `${service.name} ${cityName}`,
          `فني ${service.name} ${cityName}`,
          `خدمات ${cityName}`,
          service.name,
          cityName
        ];
        
        // Add neighborhood keywords if available
        if (city.districts && city.districts.length > 0) {
          keywords.push(...city.districts.slice(0, 3).map(d => `${service.name} ${d}`));
        }
      }
      break;
      
    case 'category':
      title = `خدمات ${options.service?.category || 'منزلية'} | جميع الخدمات المتاحة - إنقاذ`;
      description = `تصفح جميع خدمات ${options.service?.category || 'الصيانة المنزلية'}. عشرات الخدمات، آلاف الفنيين المعتمدين، أسعار تنافسية`;
      keywords = [
        `خدمات ${options.service?.category}`,
        'خدمات منزلية',
        'صيانة',
        'فنيين معتمدين'
      ];
      break;
      
    case 'comparison':
      title = `قارن أسعار وخدمات ${options.service?.category || 'الصيانة'} | دليل شامل - إنقاذ`;
      description = `قارن بين مختلف خدمات ${options.service?.category || 'الصيانة المنزلية'}. الأسعار، المميزات، آراء العملاء. اختر الأفضل لك`;
      keywords = [
        'مقارنة خدمات',
        'أسعار خدمات',
        'أفضل خدمة',
        'دليل خدمات'
      ];
      break;
  }
  
  // Add CTAs and trust signals to descriptions
  if (description && !description.includes('احجز')) {
    description += ' احجز الآن!';
  }
  
  // Ensure optimal length
  if (title.length > 60) {
    title = title.substring(0, 57) + '...';
  }
  
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return {
    title,
    description,
    keywords: keywords.join(', ')
  };
}

// Generate city-specific variations
export function generateCityVariations(baseMeta: any, cities: City[]) {
  return cities.map(city => ({
    city: city.id,
    title: baseMeta.title.replace('السعودية', city.nameAr || city.name),
    description: baseMeta.description.replace('السعودية', city.nameAr || city.name),
    keywords: `${baseMeta.keywords}, ${city.nameAr || city.name}`
  }));
}