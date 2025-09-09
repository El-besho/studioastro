
import { airConditioningHvac } from '@/content/services/air-conditioning-hvac';
import { plumbingServices } from '@/content/services/plumbing-services';
import { electricalServices } from '@/content/services/electrical-services';
import { cleaningServices } from '@/content/services/cleaning-services';
import { homeMaintenanceRepair } from '@/content/services/home-maintenance-repair';
import { pestControl } from '@/content/services/pest-control';
import { landscapingGardening } from '@/content/services/landscaping-gardening';
import { securityServices } from '@/content/services/security-services';
import { paintingDecor } from '@/content/services/painting-decor';
import { constructionRenovation } from '@/content/services/construction-renovation';
import { movingRelocation } from '@/content/services/moving-relocation';
import { automotiveServices } from '@/content/services/automotive-services';
import { itTechServices } from '@/content/services/it-tech-services';
import { eventPlanning } from '@/content/services/event-planning';
import { swimmingPoolServices } from '@/content/services/swimming-pool-services';
import { washingMachineMaintenance } from '@/content/services/washing-machine-maintenance';
import { refrigeratorMaintenance } from '@/content/services/refrigerator-maintenance';
import { marbleTilingServices } from '@/content/services/marble-tiling-services';


import { riyadh } from '@/content/cities/riyadh';
import { jeddah } from '@/content/cities/jeddah';
import { makkah } from '@/content/cities/makkah';
import { medina } from '@/content/cities/medina';
import { dammam } from '@/content/cities/dammam';
import { khobar } from '@/content/cities/khobar';
import { dhahran } from '@/content/cities/dhahran';
import { alAhsa } from '@/content/cities/al-ahsa';
import { taif } from '@/content/cities/taif';
import { buraidah } from '@/content/cities/buraidah';
import { tabuk } from '@/content/cities/tabuk';
import { abha } from '@/content/cities/abha';
import { khamisMushait } from '@/content/cities/khamis-mushait';
import { jizan } from '@/content/cities/jizan';
import { najran } from '@/content/cities/najran';
import { yanbu } from '@/content/cities/yanbu';
import { jubail } from '@/content/cities/jubail';
import { hail } from '@/content/cities/hail';
import { sakaka } from '@/content/cities/sakaka';
import { arar } from '@/content/cities/arar';


import { ServiceHierarchy, CityProfile, SubService, ServiceCategory } from '@/types/services';

const services = [
    airConditioningHvac,
    plumbingServices,
    electricalServices,
    cleaningServices,
    homeMaintenanceRepair,
    pestControl,
    landscapingGardening,
    securityServices,
    paintingDecor,
    constructionRenovation,
    movingRelocation,
    automotiveServices,
    itTechServices,
    eventPlanning,
    swimmingPoolServices,
    washingMachineMaintenance,
    refrigeratorMaintenance,
    marbleTilingServices,
];

const cities = [
    riyadh,
    jeddah,
    makkah,
    medina,
    dammam,
    khobar,
    dhahran,
    alAhsa,
    taif,
    buraidah,
    tabuk,
    abha,
    khamisMushait,
    jizan,
    najran,
    yanbu,
    jubail,
    hail,
    sakaka,
    arar,
];


const generateSlug = (name: string) => name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[(),/]/g, '');

const serviceCategories: ServiceCategory[] = [
    { id: 'essential', ar_name: 'خدمات أساسية', slug: 'essential' },
    { id: 'emergency', ar_name: 'خدمات طوارئ', slug: 'emergency' },
    { id: 'seasonal', ar_name: 'خدمات موسمية', slug: 'seasonal' },
    { id: 'luxury', ar_name: 'خدمات فاخرة', slug: 'luxury' },
]

export function getServiceCategories(): ServiceCategory[] {
    return serviceCategories;
}

export function getCategoryBySlug(slug: string): ServiceCategory | null {
    return serviceCategories.find(c => c.slug === slug) || null;
}

export function getAllServices(): (ServiceHierarchy & { slug: string })[] {
  return services.map((service) => ({
    ...service,
    slug: generateSlug(service.en_name),
    sub_services: service.sub_services.map(sub => ({
        ...sub,
        slug: generateSlug(sub.en_name)
    }))
  }));
}

export function getServicesByCategory(categorySlug: string): (ServiceHierarchy & { slug: string })[] {
    const allServices = getAllServices();
    const category = getCategoryBySlug(categorySlug);
    if (!category) return [];
    return allServices.filter(service => service.category === category.id);
}


export function getServiceBySlug(slug: string): (ServiceHierarchy & { slug: string }) | null {
    const allServices = getAllServices();
    const service = allServices.find((s) => s.slug === slug);
    if (!service) return null;
    return service;
}

export function getServiceAndSubServiceBySlugs(serviceSlug: string, subServiceSlug: string): {service: ServiceHierarchy & {slug: string}, subService: SubService & {slug: string} } | null {
    const service = getServiceBySlug(serviceSlug);
    if (!service) return null;

    const subService = service.sub_services.find(s => s.slug === subServiceSlug);
    if (!subService) return null;

    return { service, subService };
}


export function getAllCities(): CityProfile[] {
    return cities;
}

export function getCityBySlug(slug: string): CityProfile | null {
    return cities.find(c => c.slug === slug) || null;
}
