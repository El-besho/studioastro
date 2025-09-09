
import { CityProfile } from '@/types/services';

export const arar: CityProfile = {
    id: 'arar',
    ar_name: 'عرعر',
    en_name: 'Arar',
    slug: 'arar',
    province: 'Northern Borders Province',
    population: 200000,
    economic_level: 'developing',
    expat_percentage: 20,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'المساعدية', en: 'Al-Musaidiyah' },
        { ar: 'الفيصلية', en: 'Al-Faisaliyah' },
        { ar: 'الروضة', en: 'Al-Rawdah' },
        { ar: 'الخالدية', en: 'Al-Khalidiyah' },
        { ar: 'الربوة', en: 'Al-Rabwah' },
    ],
    service_demand_multipliers: { 'heating_services': 1.7, 'automotive-services': 1.4, 'border_logistics': 1.5 },
    peak_seasons: { 'winter': 1.8, 'summer': 1.2 }
};
