
import { CityProfile } from '@/types/services';

export const makkah: CityProfile = { 
    id: 'makkah',
    ar_name: 'مكة المكرمة', 
    slug: 'makkah',
    province: 'Makkah Province',
    population: 2000000,
    economic_level: 'high',
    expat_percentage: 35,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'العزيزية'},
        { ar: 'المسفلة'},
        { ar: 'الشوقية'},
        { ar: 'العوالي'},
        { ar: 'الزاهر'},
        { ar: 'العدل'},
        { ar: 'الهجرة'},
        { ar: 'الكعكية'},
    ],
    service_demand_multipliers: { 'cleaning-services': 1.7, 'hospitality_services': 2.0, 'construction-renovation': 1.3, 'restaurant-chimney-cleaning': 1.5 },
    peak_seasons: { 'ramadan': 2.0, 'hajj': 3.0 }
};
