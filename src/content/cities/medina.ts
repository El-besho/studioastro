
import { CityProfile } from '@/types/services';

export const medina: CityProfile = { 
    id: 'medina',
    ar_name: 'المدينة المنورة', 
    en_name: 'Medina', 
    slug: 'medina',
    province: 'Medina Province',
    population: 1500000,
    economic_level: 'high',
    expat_percentage: 30,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'المنطقة المركزية', en: 'Markaziya' },
        { ar: 'قربان', en: 'Qurban' },
        { ar: 'سلطانة', en: 'Sultanah' },
        { ar: 'قباء', en: 'Quba' },
        { ar: 'الحرة الشرقية', en: 'Al-Harra Al-Sharqiah' },
        { ar: 'الدعيثة', en: 'Al-Daithah' },
        { ar: 'العريض', en: 'Al-Aridh' },
    ],
    service_demand_multipliers: { 'cleaning-services': 1.6, 'hospitality_services': 1.8, 'moving-relocation': 1.2 },
    peak_seasons: { 'ramadan': 1.8, 'hajj': 1.5 }
};
