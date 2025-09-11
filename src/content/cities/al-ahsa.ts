
import { CityProfile } from '@/types/services';

export const alAhsa: CityProfile = { 
    id: 'al-ahsa',
    ar_name: 'الأحساء', 
    slug: 'al-ahsa',
    province: 'Eastern Province',
    population: 1300000,
    economic_level: 'medium',
    expat_percentage: 25,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الهفوف'},
        { ar: 'المبرز'},
        { ar: 'الخالدية'},
        { ar: 'الرقيقة'},
        { ar: 'الصالحية'},
        { ar: 'المحدود'},
        { ar: 'الشهابية'},
        { ar: 'الفيصلية'},
        { ar: 'المنار'},
        { ar: 'النايفية'},
        { ar: 'المزروعية'},
        { ar: 'العزيزية'},
    ],
    service_demand_multipliers: { 'landscaping-gardening': 1.7, 'agriculture_services': 1.9, 'water_well_drilling': 1.5 },
    peak_seasons: { 'date_harvest': 1.6, 'summer': 1.3 }
};
