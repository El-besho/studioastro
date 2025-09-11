
import { CityProfile } from '@/types/services';

export const khobar: CityProfile = { 
    id: 'khobar',
    ar_name: 'الخبر', 
    slug: 'khobar',
    province: 'Eastern Province',
    population: 940000,
    economic_level: 'very_high',
    expat_percentage: 55,
    primary_languages: ['ar', 'en'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'العليا'},
        { ar: 'الراكة'},
        { ar: 'العقربية'},
        { ar: 'الحزام الذهبي'},
        { ar: 'اليرموك'},
        { ar: 'الجسر'},
        { ar: 'البندرية'},
    ],
    service_demand_multipliers: { 'luxury': 1.6, 'landscaping-gardening': 1.5, 'entertainment_systems': 1.4 },
    peak_seasons: { 'summer': 1.3, 'eid': 1.2 }
};
