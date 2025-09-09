
export interface SEOInfo {
  summary: string;
  primary_keywords: string[];
  secondary_keywords: string[];
  long_tail_keywords: string[];
  faq: { question: string; answer: string }[];
}

export type ServiceCategoryId = 'essential' | 'seasonal' | 'luxury' | 'emergency';

export interface ServiceCategory {
  id: ServiceCategoryId;
  ar_name: string;
  slug: string;
}

export interface ServiceHierarchy {
  id: string;
  ar_name: string;
  en_name:string;
  category: ServiceCategoryId;
  priority: number;
  seasonal_demand: 'year_round' | 'summer_peak' | 'winter_peak' | 'seasonal';
  sub_services: SubService[];
  pricing_tier: 'budget' | 'standard' | 'premium' | 'enterprise';
  service_duration: number; // in hours
  emergency_available: boolean;
  islamic_compliance: boolean;
  cultural_adaptations?: string[];
  seo: SEOInfo;
}

export interface SubService {
  id: string;
  slug?: string;
  ar_name: string;
  en_name: string;
  urgency: 'emergency' | 'urgent' | 'scheduled' | 'maintenance' | 'consultation';
  avg_price_range: [number, number];
  skill_requirements: string[];
  tools_required: string[];
  seasonal_multiplier: number;
  seo: SEOInfo;
}

export interface CityProfile {
  id: string;
  ar_name: string;
  en_name: string;
  slug: string;
  province: string;
  population: number;
  economic_level: 'very_high' | 'high' | 'medium' | 'developing';
  expat_percentage: number;
  primary_languages: string[];
  climate: 'hot_desert' | 'hot_humid' | 'moderate' | 'mountainous';
  key_districts: { ar: string; en: string }[];
  service_demand_multipliers: Record<string, number>;
  peak_seasons: Record<string, number>;
}
