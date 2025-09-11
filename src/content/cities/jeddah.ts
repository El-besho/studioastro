
import { CityProfile } from '@/types/services';

export const jeddah: CityProfile = { 
    id: 'jeddah',
    ar_name: 'جدة', 
    slug: 'jeddah',
    province: 'Makkah Province',
    population: 4600000,
    economic_level: 'very_high',
    expat_percentage: 45,
    primary_languages: ['ar', 'en'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'البلد'},
        { ar: 'أبحر'},
        { ar: 'الحمراء'},
        { ar: 'الصفا'},
        { ar: 'الروضة'},
        { ar: 'النعيم'},
        { ar: 'الشاطئ'},
        { ar: 'السلامة'},
        { ar: 'المروة'},
        { ar: 'الفيصلية'},
        { ar: 'البغدادية'},
        { ar: 'الخالدية'},
    ],
    service_demand_multipliers: { 'swimming-pool-services': 1.6, 'moving-relocation': 1.4, 'event-planning': 1.5 },
    peak_seasons: { 'summer': 1.6, 'hajj': 1.4 }
};
