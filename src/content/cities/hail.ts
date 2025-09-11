
import { CityProfile } from '@/types/services';

export const hail: CityProfile = {
    id: 'hail',
    ar_name: 'حائل',
    slug: 'hail',
    province: 'Hail Province',
    population: 500000,
    economic_level: 'medium',
    expat_percentage: 20,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'صلاح الدين'},
        { ar: 'الجامعيين'},
        { ar: 'النقرة'},
        { ar: 'المطار'},
        { ar: 'الزبارة'},
    ],
    service_demand_multipliers: { 'agriculture_services': 1.5, 'automotive-services': 1.3, 'construction-renovation': 1.2 },
    peak_seasons: { 'winter': 1.4, 'hail_rally': 1.6 }
};
