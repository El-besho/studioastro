
import { CityProfile } from '@/types/services';

export const taif: CityProfile = { 
    id: 'taif',
    ar_name: 'الطائف', 
    slug: 'taif',
    province: 'Makkah Province',
    population: 1100000,
    economic_level: 'medium',
    expat_percentage: 20,
    primary_languages: ['ar'],
    climate: 'moderate',
    key_districts: [
        { ar: 'الهدا'},
        { ar: 'الشفا'},
        { ar: 'شهار'},
        { ar: 'الفيصلية'},
        { ar: 'الوشحاء'},
        { ar: 'القيم'},
        { ar: 'جبرة'},
    ],
    service_demand_multipliers: { 'landscaping-gardening': 1.8, 'resort_maintenance': 1.6, 'pest-control': 1.2 },
    peak_seasons: { 'summer_tourism': 1.9, 'winter': 0.8 }
};
