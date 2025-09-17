
import { CityProfile } from '@/types/services';

export const riyadh: CityProfile = { 
    id: 'riyadh',
    ar_name: 'الرياض', 
    slug: 'riyadh',
    province: 'Riyadh Province',
    population: 7600000,
    economic_level: 'very_high',
    expat_percentage: 40,
    primary_languages: ['ar', 'en'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الملز'},
        { ar: 'العليا'},
        { ar: 'الدرعية'},
        { ar: 'النسيم'},
        { ar: 'الروضة'},
        { ar: 'الشفاء'},
        { ar: 'السليمانية'},
        { ar: 'الحمراء'},
        { ar: 'قرطبة'},
        { ar: 'النخيل'},
        { ar: 'الياسمين'},
        { ar: 'المرسلات'},
        { ar: 'اليرموك'},
    ],
    service_demand_multipliers: { 'air-conditioning': 1.8, 'luxury': 1.5, 'it-tech-services': 1.6, 'restaurant-chimney-cleaning': 1.4 },
    peak_seasons: { 'summer': 1.5, 'ramadan': 1.2 }
};
