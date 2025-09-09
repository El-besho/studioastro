
import { CityProfile } from '@/types/services';

export const abha: CityProfile = { 
    id: 'abha',
    ar_name: 'أبها', 
    en_name: 'Abha', 
    slug: 'abha',
    province: 'Asir Province',
    population: 500000,
    economic_level: 'medium',
    expat_percentage: 20,
    primary_languages: ['ar'],
    climate: 'mountainous',
    key_districts: [
        { ar: 'السودة', en: 'Al-Soudah' },
        { ar: 'وسط البلد', en: 'Downtown' },
        { ar: 'الموظفين', en: 'Al-Muwazzafin' },
        { ar: 'المنسك', en: 'Al-Manasek' },
        { ar: 'الخالدية', en: 'Al-Khalidiyah' },
        { ar: 'شمسان', en: 'Shamsan' },
        { ar: 'المروج', en: 'Al-Muruj' },
        { ar: 'الوردتين', en: 'Al-Wardatayn' },
        { ar: 'النميص', en: 'Al-Numais' },
        { ar: 'العرين', en: 'Al-Areen' },
    ],
    service_demand_multipliers: { 'tourism_services': 1.9, 'heating_services': 1.6, 'road_maintenance': 1.3 },
    peak_seasons: { 'summer_tourism': 2.2, 'winter': 1.3 }
};
