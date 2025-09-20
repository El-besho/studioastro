import { riyadh } from '../content/cities/riyadh';
import { jeddah } from '../content/cities/jeddah';
import { makkah } from '../content/cities/makkah';
import { medina } from '../content/cities/medina';
import { dammam } from '../content/cities/dammam';
import { khobar } from '../content/cities/khobar';
import { dhahran } from '../content/cities/dhahran';
import { alAhsa } from '../content/cities/al-ahsa';
import { taif } from '../content/cities/taif';
import { buraidah } from '../content/cities/buraidah';
import { tabuk } from '../content/cities/tabuk';
import { abha } from '../content/cities/abha';
import { khamisMushait } from '../content/cities/khamis-mushait';
import { jizan } from '../content/cities/jizan';
import { najran } from '../content/cities/najran';
import { yanbu } from '../content/cities/yanbu';
import { jubail } from '../content/cities/jubail';
import { hail } from '../content/cities/hail';
import { sakaka } from '../content/cities/sakaka';
import { arar } from '../content/cities/arar';

import { CityProfile } from '../types/services';

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

export function getAllCities(): CityProfile[] {
  return cities;
}

export function getCityBySlug(slug: string): CityProfile | undefined {
  return cities.find(city => city.slug === slug);
}

export function getCitiesByRegion(region: string): CityProfile[] {
  return cities.filter(city => city.region === region);
}

export function getMajorCities(): CityProfile[] {
  return cities.filter(city => city.isMajor);
}

export function searchCities(query: string): CityProfile[] {
  const lowercaseQuery = query.toLowerCase();
  return cities.filter(city => 
    city.name.toLowerCase().includes(lowercaseQuery) ||
    city.nameAr.toLowerCase().includes(lowercaseQuery) ||
    city.region.toLowerCase().includes(lowercaseQuery)
  );
}

export function getCitiesWithService(serviceSlug: string): CityProfile[] {
  return cities.filter(city => 
    city.availableServices?.includes(serviceSlug)
  );
}

export function getCityStats() {
  const totalCities = cities.length;
  const majorCities = cities.filter(city => city.isMajor).length;
  const regions = [...new Set(cities.map(city => city.region))];
  
  return {
    totalCities,
    majorCities,
    regions: regions.length,
    regionList: regions
  };
}