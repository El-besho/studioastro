
import { CityProfile } from '@/types/services';

export const medina: CityProfile = { 
    id: 'medina',
    ar_name: 'المدينة المنورة', 
    slug: 'medina',
    province: 'Medina Province',
    population: 1500000,
    economic_level: 'high',
    expat_percentage: 30,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'المنطقة المركزية'},
        { ar: 'قربان'},
        { ar: 'سلطانة'},
        { ar: 'قباء'},
        { ar: 'الحرة الشرقية'},
        { ar: 'الدعيثة'},
        { ar: 'العريض'},
    ],
    service_demand_multipliers: { 'cleaning-services': 1.6, 'hospitality_services': 1.8, 'moving-relocation': 1.2 },
    peak_seasons: { 'ramadan': 1.8, 'hajj': 1.5 }
};
