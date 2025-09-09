
import { CityProfile } from '@/types/services';

export const alAhsa: CityProfile = { 
    id: 'al-ahsa',
    ar_name: 'الأحساء', 
    en_name: 'Al-Ahsa', 
    slug: 'al-ahsa',
    province: 'Eastern Province',
    population: 1300000,
    economic_level: 'medium',
    expat_percentage: 25,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الهفوف', en: 'Hofuf' },
        { ar: 'المبرز', en: 'Mubarraz' },
        { ar: 'الخالدية', en: 'Al-Khalidiyah' },
        { ar: 'الرقيقة', en: 'Al-Raqiqah' },
        { ar: 'الصالحية', en: 'Al-Salihiyah' },
        { ar: 'المحدود', en: 'Al-Mahdoud' },
        { ar: 'الشهابية', en: 'Al-Shahabiyah' },
        { ar: 'الفيصلية', en: 'Al-Faisaliyah' },
        { ar: 'المنار', en: 'Al-Manar' },
        { ar: 'النايفية', en: 'Al-Naifiyah' },
        { ar: 'المزروعية', en: 'Al-Mazrouiyah' },
        { ar: 'العزيزية', en: 'Al-Aziziyah' },
    ],
    service_demand_multipliers: { 'landscaping-gardening': 1.7, 'agriculture_services': 1.9, 'water_well_drilling': 1.5 },
    peak_seasons: { 'date_harvest': 1.6, 'summer': 1.3 }
};
