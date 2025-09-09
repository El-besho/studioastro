
import { CityProfile } from '@/types/services';

export const khamisMushait: CityProfile = { 
    id: 'khamis-mushait',
    ar_name: 'خميس مشيط', 
    en_name: 'Khamis Mushait', 
    slug: 'khamis-mushait',
    province: 'Asir Province',
    population: 770000,
    economic_level: 'medium',
    expat_percentage: 25,
    primary_languages: ['ar'],
    climate: 'mountainous',
    key_districts: [
        { ar: 'الضيافة', en: 'Al-Dhiyafa' },
        { ar: 'الرصراص', en: 'Al-Rasras' },
        { ar: 'النسيم', en: 'Al-Naseem' },
        { ar: 'حسام', en: 'Hussam' },
        { ar: 'الواحة', en: 'Al-Waha' },
        { ar: 'الخالدية', en: 'Al-Khalidiyah' },
    ],
    service_demand_multipliers: { 'military_base_services': 1.5, 'home-maintenance-repair': 1.3, 'construction-renovation': 1.2 },
    peak_seasons: { 'summer': 1.5, 'winter': 1.2 }
};
