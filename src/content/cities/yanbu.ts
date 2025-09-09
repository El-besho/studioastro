
import { CityProfile } from '@/types/services';

export const yanbu: CityProfile = {
    id: 'yanbu',
    ar_name: 'ينبع',
    en_name: 'Yanbu',
    slug: 'yanbu',
    province: 'Medina Province',
    population: 330000,
    economic_level: 'high',
    expat_percentage: 40,
    primary_languages: ['ar', 'en'],
    climate: 'hot_humid',
    key_districts: [
        { ar: 'الهيئة الملكية', en: 'Royal Commission' },
        { ar: 'ينبع البحر', en: 'Yanbu Al-Bahar' },
        { ar: 'ينبع الصناعية', en: 'Yanbu Industrial City' },
        { ar: 'البحر', en: 'Al-Bahar' },
        { ar: 'العين', en: 'Al-Ain' },
    ],
    service_demand_multipliers: { 'industrial_services': 1.8, 'swimming-pool-services': 1.5, 'desalination_plant_maintenance': 1.7 },
    peak_seasons: { 'summer': 1.4, 'diving_season': 1.6 }
};
