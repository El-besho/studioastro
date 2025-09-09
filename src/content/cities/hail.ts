
import { CityProfile } from '@/types/services';

export const hail: CityProfile = {
    id: 'hail',
    ar_name: 'حائل',
    en_name: 'Hail',
    slug: 'hail',
    province: 'Hail Province',
    population: 500000,
    economic_level: 'medium',
    expat_percentage: 20,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'صلاح الدين', en: 'Salah Al-Din' },
        { ar: 'الجامعيين', en: 'Al-Jamieen' },
        { ar: 'النقرة', en: 'Al-Naqra' },
        { ar: 'المطار', en: 'Al-Matar' },
        { ar: 'الزبارة', en: 'Al-Zubarah' },
    ],
    service_demand_multipliers: { 'agriculture_services': 1.5, 'automotive-services': 1.3, 'construction-renovation': 1.2 },
    peak_seasons: { 'winter': 1.4, 'hail_rally': 1.6 }
};
