
import { CityProfile } from '@/types/services';

export const najran: CityProfile = { 
    id: 'najran',
    ar_name: 'نجران', 
    slug: 'najran',
    province: 'Najran Province',
    population: 420000,
    economic_level: 'developing',
    expat_percentage: 15,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الأخدود'},
        { ar: 'الفيصلية'},
        { ar: 'أبا السعود'},
        { ar: 'البلد'},
        { ar: 'الضباط'},
    ],
    service_demand_multipliers: { 'construction-renovation': 1.5, 'security-services': 1.4, 'water_tank_cleaning': 1.3 },
    peak_seasons: { 'summer': 1.4, 'winter': 1.1 }
};
