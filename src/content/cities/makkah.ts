
import { CityProfile } from '@/types/services';

export const makkah: CityProfile = { 
    id: 'makkah',
    ar_name: 'مكة المكرمة', 
    en_name: 'Makkah', 
    slug: 'makkah',
    province: 'Makkah Province',
    population: 2000000,
    economic_level: 'high',
    expat_percentage: 35,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'العزيزية', en: 'Al-Aziziyah' },
        { ar: 'المسفلة', en: 'Al-Misfalah' },
        { ar: 'الشوقية', en: 'Al-Shawqiyyah' },
        { ar: 'العوالي', en: 'Al-Awali' },
        { ar: 'الزاهر', en: 'Al-Zaher' },
        { ar: 'العدل', en: 'Al-Adl' },
        { ar: 'الهجرة', en: 'Al-Hijrah' },
        { ar: 'الكعكية', en: 'Al-Kaakiyyah' },
    ],
    service_demand_multipliers: { 'cleaning-services': 1.7, 'hospitality_services': 2.0, 'construction-renovation': 1.3 },
    peak_seasons: { 'ramadan': 2.0, 'hajj': 3.0 }
};
