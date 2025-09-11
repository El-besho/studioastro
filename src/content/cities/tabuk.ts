
import { CityProfile } from '@/types/services';

export const tabuk: CityProfile = { 
    id: 'tabuk',
    ar_name: 'تبوك', 
    slug: 'tabuk',
    province: 'Tabuk Province',
    population: 660000,
    economic_level: 'medium',
    expat_percentage: 30,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'المروج'},
        { ar: 'العليا'},
        { ar: 'الورود'},
        { ar: 'الأندلس'},
        { ar: 'الفيصلية'},
        { ar: 'الرابية'},
    ],
    service_demand_multipliers: { 'construction-renovation': 1.4, 'heating_services': 1.5, 'logistics': 1.3 },
    peak_seasons: { 'winter': 1.4, 'neom_projects': 1.6 }
};
