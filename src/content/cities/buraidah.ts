
import { CityProfile } from '@/types/services';

export const buraidah: CityProfile = { 
    id: 'buraidah',
    ar_name: 'بريدة', 
    en_name: 'Buraidah', 
    slug: 'buraidah',
    province: 'Qassim Province',
    population: 700000,
    economic_level: 'medium',
    expat_percentage: 25,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الصفراء', en: 'Al-Safra' },
        { ar: 'الفاخرية', en: 'Al-Fakhiriyah' },
        { ar: 'الرابية', en: 'Al-Rabiyah' },
        { ar: 'الريان', en: 'Al-Rayyan' },
        { ar: 'النهضة', en: 'Al-Nahdah' },
        { ar: 'الأفق', en: 'Al-Ofoq' },
    ],
    service_demand_multipliers: { 'agriculture_services': 1.6, 'construction-renovation': 1.3, 'cold_storage_maintenance': 1.5 },
    peak_seasons: { 'date_festival': 1.7, 'summer': 1.2 }
};
