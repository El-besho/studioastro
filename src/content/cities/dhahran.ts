
import { CityProfile } from '@/types/services';

export const dhahran: CityProfile = { 
    id: 'dhahran',
    ar_name: 'الظهران', 
    slug: 'dhahran',
    province: 'Eastern Province',
    population: 240000,
    economic_level: 'very_high',
    expat_percentage: 60,
    primary_languages: ['en', 'ar'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'أرامكو'},
        { ar: 'الدوحة'},
        { ar: 'الجامعة'},
        { ar: 'القشلة'},
        { ar: 'السلمانية'},
    ],
    service_demand_multipliers: { 'it-tech-services': 1.8, 'premium_maintenance': 1.7, 'security-services': 1.5 },
    peak_seasons: { 'summer': 1.2, 'winter': 1.1 }
};
