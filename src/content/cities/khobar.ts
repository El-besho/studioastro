
import { CityProfile } from '@/types/services';

export const khobar: CityProfile = { 
    id: 'khobar',
    ar_name: 'الخبر', 
    en_name: 'Khobar', 
    slug: 'khobar',
    province: 'Eastern Province',
    population: 940000,
    economic_level: 'very_high',
    expat_percentage: 55,
    primary_languages: ['ar', 'en'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'العليا', en: 'Al-Olaya' },
        { ar: 'الراكة', en: 'Al-Rakah' },
        { ar: 'العقربية', en: 'Al-Aqrabiyah' },
        { ar: 'الحزام الذهبي', en: 'Golden Belt' },
        { ar: 'اليرموك', en: 'Al-Yarmouk' },
        { ar: 'الجسر', en: 'Al-Jisr' },
        { ar: 'البندرية', en: 'Al-Bandariyah' },
    ],
    service_demand_multipliers: { 'luxury': 1.6, 'landscaping-gardening': 1.5, 'entertainment_systems': 1.4 },
    peak_seasons: { 'summer': 1.3, 'eid': 1.2 }
};
