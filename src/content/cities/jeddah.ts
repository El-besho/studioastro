
import { CityProfile } from '@/types/services';

export const jeddah: CityProfile = { 
    id: 'jeddah',
    ar_name: 'جدة', 
    en_name: 'Jeddah', 
    slug: 'jeddah',
    province: 'Makkah Province',
    population: 4600000,
    economic_level: 'very_high',
    expat_percentage: 45,
    primary_languages: ['ar', 'en'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'البلد', en: 'Al-Balad' },
        { ar: 'أبحر', en: 'Obhur' },
        { ar: 'الحمراء', en: 'Al-Hamra' },
        { ar: 'الصفا', en: 'Al-Safa' },
        { ar: 'الروضة', en: 'Al-Rawdah' },
        { ar: 'النعيم', en: 'Al-Naeem' },
        { ar: 'الشاطئ', en: 'Al-Shate\'e' },
        { ar: 'السلامة', en: 'Al-Salamah' },
        { ar: 'المروة', en: 'Al-Marwah' },
        { ar: 'الفيصلية', en: 'Al-Faisaliyah' },
        { ar: 'البغدادية', en: 'Al-Baghdadiyah' },
        { ar: 'الخالدية', en: 'Al-Khalidiyah' },
    ],
    service_demand_multipliers: { 'swimming-pool-services': 1.6, 'moving-relocation': 1.4, 'event-planning': 1.5 },
    peak_seasons: { 'summer': 1.6, 'hajj': 1.4 }
};
