
import { CityProfile } from '@/types/services';

export const riyadh: CityProfile = { 
    id: 'riyadh',
    ar_name: 'الرياض', 
    en_name: 'Riyadh', 
    slug: 'riyadh',
    province: 'Riyadh Province',
    population: 7600000,
    economic_level: 'very_high',
    expat_percentage: 40,
    primary_languages: ['ar', 'en'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الملز', en: 'Al-Malaz' },
        { ar: 'العليا', en: 'Al-Olaya' },
        { ar: 'الدرعية', en: 'Diriyah' },
        { ar: 'النسيم', en: 'Al-Naseem' },
        { ar: 'الروضة', en: 'Al-Rawdah' },
        { ar: 'الشفاء', en: 'Al-Shifa' },
        { ar: 'السليمانية', en: 'Al-Sulaymaniyah' },
        { ar: 'الحمراء', en: 'Al-Hamra' },
        { ar: 'قرطبة', en: 'Qurtubah' },
        { ar: 'النخيل', en: 'Al-Nakheel' },
        { ar: 'الياسمين', en: 'Al-Yasmin' },
        { ar: 'المرسلات', en: 'Al-Mursalat' },
        { ar: 'اليرموك', en: 'Al-Yarmouk' },
    ],
    service_demand_multipliers: { 'air-conditioning': 1.8, 'luxury': 1.5, 'it-tech-services': 1.6 },
    peak_seasons: { 'summer': 1.5, 'ramadan': 1.2 }
};
