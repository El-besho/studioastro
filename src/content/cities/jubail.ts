
import { CityProfile } from '@/types/services';

export const jubail: CityProfile = {
    id: 'jubail',
    ar_name: 'الجبيل',
    slug: 'jubail',
    province: 'Eastern Province',
    population: 700000,
    economic_level: 'very_high',
    expat_percentage: 50,
    primary_languages: ['ar', 'en'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'الجبيل الصناعية'},
        { ar: 'البلد'},
        { ar: 'الفناتير'},
        { ar: 'الدانة'},
        { ar: 'جلمودة'},
    ],
    service_demand_multipliers: { 'industrial_cleaning': 2.0, 'heavy_equipment_maintenance': 1.8, 'security-services': 1.6 },
    peak_seasons: { 'summer': 1.3, 'major_turnarounds': 1.9 }
};
