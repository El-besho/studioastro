
import { CityProfile, ServiceHierarchy, SubService } from '../types/services';

import { Button } from './ui/button';
import { MapPin } from 'lucide-react';

interface CityListProps {
  cities: CityProfile[];
  service: ServiceHierarchy & { slug: string };
  subService?: SubService | null;
}

export function CityList({
  cities,
  service,
  subService = null,
}: CityListProps) {
  return (
    <div>
      <h3 className="font-headline font-semibold mb-4">متوفر في جميع أنحاء المملكة</h3>
      <ul className="grid grid-cols-1 gap-y-3">
        {cities.map((city) => {
          const link = subService 
            ? `/services/${service.slug}/${subService.slug}/${city.slug}`
            : `/services/${service.slug}/${city.slug}`;
          const text = subService 
            ? `${subService.ar_name} في ${city.ar_name}`
            : `${service.ar_name} في ${city.ar_name}`;
          
          return (
            <li key={city.slug}>
              <Button
                variant="link"
                asChild
                className="p-0 h-auto font-body"
              >
                <Link
                  href={link}
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {text}
                </a>
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}
