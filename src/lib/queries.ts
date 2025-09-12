
'use server';

import fs from 'fs/promises';
import path from 'path';
import { TaggedQuery, QueryIntent, CategorizedQueries } from '@/types/queries';
import { getAllServices, getAllCities } from './services';
import { ServiceHierarchy } from '../types/services';

const seoDirectory = path.join(process.cwd(), 'src/SEO');

const intentKeywords: { [key in QueryIntent]: string[] } = {
  pricing: ["سعر", "تكلفة", "اسعار", "كم يكلف"],
  best: ["أفضل", "مقارنة", "افضل"],
  offers: ["عرض", "خصم", "عروض"],
  reviews: ["آراء", "تقييمات", "تجربتي"],
  emergency: ["طارئة", "24/7", "طوارئ", "فوري"],
  guarantees: ["ضمان"],
  location: ["موقع", "قريب مني", "في"],
  process: ["طريقة", "كيف", "خطوات"],
  attribute: ["باكستاني"], // Example
  brand: ["شركة", "شركات"],
  general: [],
};


function detectIntent(query: string): QueryIntent {
    const lowerQuery = query.toLowerCase();
    for (const intent in intentKeywords) {
        if (intentKeywords[intent as QueryIntent].some(keyword => lowerQuery.includes(keyword))) {
            return intent as QueryIntent;
        }
    }
    return 'general';
}

function parseQuery(rawQuery: string): TaggedQuery | null {
  const query = rawQuery.trim();
  if (!query) return null;

  const allServices = getAllServices();
  let detectedService: (ServiceHierarchy & { slug: string; }) | null = null;
  let detectedSubService: (ServiceHierarchy['sub_services'][0]) | null = null;

  const sortedServices = [...allServices].sort((a, b) => b.ar_name.length - a.ar_name.length);
  
  for (const service of sortedServices) {
    const allNames = [service.ar_name, ...service.seo.primary_keywords, ...service.seo.secondary_keywords];
    if (allNames.some(name => query.includes(name))) {
      detectedService = service;
      const sortedSubServices = [...service.sub_services].sort((a,b) => b.ar_name.length - a.ar_name.length);
      for (const sub of sortedSubServices) {
        if (query.includes(sub.ar_name)) {
          detectedSubService = sub;
          break; 
        }
      }
      break; 
    }
  }

  if (!detectedService) {
      // Fallback for generic terms
      const serviceMap: { [key: string]: string } = {
        'تنظيف': 'cleaning-services',
        'نظافة': 'cleaning-services',
        'سباك': 'plumbing-services',
        'سباكة': 'plumbing-services',
        'كهرباء': 'electrical-services',
        'كهربائي': 'electrical-services',
        'مكيف': 'air-conditioning-hvac',
        'تكييف': 'air-conditioning-hvac',
        'حشرات': 'pest-control',
        'مبيدات': 'pest-control',
        'حدائق': 'landscaping-gardening',
        'حديقة': 'landscaping-gardening',
        'نقل': 'moving-relocation',
        'عفش': 'moving-relocation',
        'دهان': 'painting-decor',
        'طلاء': 'painting-decor',
        'بناء': 'construction-renovation',
        'ترميم': 'construction-renovation',
        'كاميرا': 'security-services',
        'أمن': 'security-services',
        'غسالة': 'washing-machine-maintenance',
        'ثلاجة': 'refrigerator-maintenance',
        'براد': 'refrigerator-maintenance',
        'جلي': 'marble-tiling-services',
        'رخام': 'marble-tiling-services',
        'بلاط': 'marble-tiling-services',
      };

      for(const term in serviceMap) {
          if (query.includes(term)) {
              detectedService = allServices.find(s => s.id === serviceMap[term]) || null;
              break;
          }
      }
      
      if (!detectedService) return null;
  }

  const cities = getAllCities();
  const detectedCity = cities.find(city => query.includes(city.ar_name));
  
  let url = `/services/${detectedService.slug}`;
  if(detectedSubService && detectedSubService.slug) {
      url += `/${detectedSubService.slug}`;
  }
  if(detectedCity && detectedService && !detectedSubService) {
      url += `/${detectedCity.slug}`;
  }


  return {
    query,
    url,
    service: detectedService.id,
    subService: detectedSubService?.id,
    location: detectedCity?.slug,
    intent: detectIntent(query),
  };
}


let allQueries: TaggedQuery[] | null = null;

async function getAllParsedQueries(): Promise<TaggedQuery[]> {
  if (allQueries) {
    return allQueries;
  }

  try {
    const files = await fs.readdir(seoDirectory);
    const keywordFiles = files.filter(file => file.endsWith('-keywords.md'));
    
    const allLines: string[] = [];

    for (const file of keywordFiles) {
        const filePath = path.join(seoDirectory, file);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const lines = fileContents.split('\n').filter(line => line.trim() !== '' && !line.startsWith('Keyword') && !line.startsWith('---'));
        const queries = lines.map(line => line.split('\t')[0]);
        allLines.push(...queries);
    }
    
    // Remove duplicates
    const uniqueLines = [...new Set(allLines)];

    allQueries = uniqueLines.map(line => parseQuery(line)).filter((q): q is TaggedQuery => q !== null);
    return allQueries;
  } catch (error) {
    console.error("Failed to read or parse queries files:", error);
    return [];
  }
}

interface GetTrendingQueriesProps {
  service?: string;
  subService?: string;
  location?: string;
  limit?: number;
}

export async function getTrendingQueries({
  service,
  subService,
  location,
  limit = 20,
}: GetTrendingQueriesProps): Promise<CategorizedQueries> {
  const queries = await getAllParsedQueries();
  
  const filteredQueries = queries.filter(q => {
    const serviceMatch = !service || q.service === service;
    const subServiceMatch = !subService || q.subService === subService;
    const locationMatch = !location || q.location === location;
    
    // Specificity rules
    if (subService && q.subService !== subService) return false;
    if (location && q.location !== location) return false;
    
    // If we are on a main service page, don't show queries that are for a sub-service of *another* service
    if (service && !subService && q.service !== service) return false;

    // If we are on a main service page without a location, don't show location-specific queries
    if (service && !location && q.location) return false;

    return serviceMatch && subServiceMatch && locationMatch;
  });

  const categorized: CategorizedQueries = {};

  filteredQueries.forEach(q => {
    if (q.intent) {
      if (!categorized[q.intent]) {
        categorized[q.intent] = [];
      }
      // Avoid duplicate queries within the same category
      if (!categorized[q.intent]!.some(existing => existing.query === q.query)) {
        categorized[q.intent]!.push(q);
      }
    }
  });

  // Limit each category
  for (const intent in categorized) {
      categorized[intent as QueryIntent] = categorized[intent as QueryIntent]?.slice(0, limit);
  }

  return categorized;
}
