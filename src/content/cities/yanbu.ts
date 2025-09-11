
import { CityProfile } from '@/types/services';

export const yanbu: CityProfile = {
    id: 'yanbu',
    ar_name: 'ينبع',
    slug: 'yanbu',
    province: 'Medina Province',
    population: 330000,
    economic_level: 'high',
    expat_percentage: 40,
    primary_languages: ['ar', 'en'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'الهيئة الملكية'},
        { ar: 'ينبع البحر'},
        { ar: 'ينبع الصناعية'},
        { ar: 'البحر'},
        { ar: 'العين'},
    ],
    service_demand_multipliers: { 'industrial_services': 1.8, 'swimming-pool-services': 1.5, 'desalination_plant_maintenance': 1.7 },
    peak_seasons: { 'summer': 1.4, 'diving_season': 1.6 }
};
