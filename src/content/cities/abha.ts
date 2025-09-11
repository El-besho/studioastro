
import { CityProfile } from '@/types/services';

export const abha: CityProfile = { 
    id: 'abha',
    ar_name: 'أبها', 
    slug: 'abha',
    province: 'Asir Province',
    population: 500000,
    economic_level: 'medium',
    expat_percentage: 20,
    primary_languages: ['ar'],
    climate: 'mountainous',
    key_districts: [
        { ar: 'السودة'},
        { ar: 'وسط البلد'},
        { ar: 'الموظفين'},
        { ar: 'المنسك'},
        { ar: 'الخالدية'},
        { ar: 'شمسان'},
        { ar: 'المروج'},
        { ar: 'الوردتين'},
        { ar: 'النميص'},
        { ar: 'العرين'},
    ],
    service_demand_multipliers: { 'tourism_services': 1.9, 'heating_services': 1.6, 'road_maintenance': 1.3 },
    peak_seasons: { 'summer_tourism': 2.2, 'winter': 1.3 }
};
