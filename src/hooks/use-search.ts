
import { useState, useEffect } from 'react';
import { getAllServices, getAllCities, getCityBySlug } from '@/lib/services';
import { ServiceHierarchy, CityProfile } from '@/types/services';

interface UseSearchParams {
  query: string;
  location: string;
}

interface SearchResult {
    service: ServiceHierarchy & { slug: string };
    city: CityProfile | null;
}

export function useSearch({ query, location }: UseSearchParams) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cityDetails, setCityDetails] = useState<CityProfile | null>(null);

  useEffect(() => {
    setIsLoading(true);
    
    const allServices = getAllServices();
    const allCities = getAllCities();

    let searchCity: CityProfile | null = null;
    let remainingQuery = query;

    // Prioritize location from URL parameter if it exists
    if (location) {
        searchCity = getCityBySlug(location);
    } else {
        // If no location in URL, try to detect from query string
        for (const city of allCities) {
            const cityRegex = new RegExp(`\\b${city.en_name}\\b|\\b${city.ar_name}\\b`, 'i');
            if (query.match(cityRegex)) {
                searchCity = city;
                remainingQuery = query.replace(cityRegex, '').trim();
                break;
            }
        }
    }
    
    setCityDetails(searchCity);
    
    const searchWords = remainingQuery.toLowerCase().split(' ').filter(w => w);

    let filteredResults: SearchResult[] = [];

    const servicesToSearch = allServices.filter(service => {
        if (searchWords.length === 0 && !searchCity) return false;
        if (searchWords.length === 0 && searchCity) return true;
        return searchWords.some(word => 
            service.ar_name.toLowerCase().includes(word) ||
            service.en_name.toLowerCase().includes(word) ||
            service.seo.primary_keywords.some(k => k.toLowerCase().includes(word)) ||
            service.seo.secondary_keywords.some(k => k.toLowerCase().includes(word)) ||
            service.sub_services.some(sub => 
                sub.ar_name.toLowerCase().includes(word) || 
                sub.en_name.toLowerCase().includes(word)
            )
        );
    });

    if (searchCity) {
        // If a city is determined (either from URL or query), scope all results to that city.
        const servicesToShow = searchWords.length > 0 ? servicesToSearch : allServices;
        servicesToShow.forEach(service => {
            filteredResults.push({ service, city: searchCity });
        });
    } else if (query) {
        // If only a query is provided (no location), show services without a specific city
        servicesToSearch.forEach(service => {
            filteredResults.push({ service, city: null });
        });
    }

    // Deduplicate results
    const uniqueResults = Array.from(new Map(filteredResults.map(item =>
        [`${item.service.slug}-${item.city?.slug || ''}`, item]
    )).values());

    setResults(uniqueResults);
    setIsLoading(false);

  }, [query, location]);

  return { results, isLoading, cityDetails };
}
