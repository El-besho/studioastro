
import { CityProfile } from '@/types/services';

export const sakaka: CityProfile = {
    id: 'sakaka',
    ar_name: 'سكاكا',
    slug: 'sakaka',
    province: 'Al-Jouf Province',
    population: 250000,
    economic_level: 'developing',
    expat_percentage: 15,
    primary_languages: ['ar'],
    climate: 'hot_desert',
    key_districts: [
        { ar: 'الزعتر'},
        { ar: 'الشلهوب'},
        { ar: 'الفيصلية'},
        { ar: 'الرحمانية'},
        { ar: 'المخطط'},
    ],
    service_demand_multipliers: { 'agriculture_services': 1.8, 'solar_panel_maintenance': 1.6, 'home-maintenance-repair': 1.2 },
    peak_seasons: { 'olive_harvest': 1.7, 'summer': 1.3 }
};
