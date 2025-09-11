
import { CityProfile } from '@/types/services';

export const jizan: CityProfile = { 
    id: 'jizan',
    ar_name: 'جيزان', 
    slug: 'jizan',
    province: 'Jizan Province',
    population: 400000,
    economic_level: 'developing',
    expat_percentage: 20,
    primary_languages: ['ar'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'الكورنيش'},
        { ar: 'المنطقة الصناعية'},
        { ar: 'الشاطئ'},
        { ar: 'المطار'},
        { ar: 'الصفا'},
        { ar: 'الروضة'},
    ],
    service_demand_multipliers: { 'air-conditioning': 1.9, 'pest-control': 1.6, 'port_services': 1.4 },
    peak_seasons: { 'mango_season': 1.5, 'summer': 1.7 }
};
