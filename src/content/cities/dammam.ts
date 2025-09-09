
import { CityProfile } from '@/types/services';

export const dammam: CityProfile = { 
    id: 'dammam',
    ar_name: 'الدمام', 
    en_name: 'Dammam', 
    slug: 'dammam',
    province: 'Eastern Province',
    population: 1250000,
    economic_level: 'very_high',
    expat_percentage: 50,
    primary_languages: ['ar', 'en'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الكورنيش', en: 'Corniche' },
        { ar: 'الريان', en: 'Al-Rayyan' },
        { ar: 'الشاطئ', en: 'Al-Shati' },
        { ar: 'الفيصلية', en: 'Al-Faisaliyah' },
        { ar: 'الزهور', en: 'Al-Zuhur' },
        { ar: 'أحد', en: 'Uhud' },
        { ar: 'النور', en: 'Al-Nour' },
        { ar: 'النهضة', en: 'Al-Nahdah' },
    ],
    service_demand_multipliers: { 'automotive-services': 1.4, 'industrial_cleaning': 1.7, 'it-tech-services': 1.5 },
    peak_seasons: { 'summer': 1.4, 'winter': 1.1 }
};
