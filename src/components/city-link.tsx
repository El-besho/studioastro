import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { CityProfile } from '../types/services';
import { ServiceHierarchy } from '../types/services';

interface CityLinkProps {
  city: CityProfile;
  service: ServiceHierarchy & { slug: string };
  children?: React.ReactNode;
  className?: string;
}

export function CityLink({ city, service, children, className }: CityLinkProps) {
  return (
    <Button
      variant="link"
      asChild
      className={`p-0 h-auto font-body ${className}`}
    >
      <Link
        href={`/services/${service.slug}/${city.slug}`}
        className="flex items-center gap-2"
      >
        <MapPin className="h-4 w-4 text-muted-foreground" />
        {children || `خدمات ${service.ar_name} في ${city.ar_name}`}
      </Link>
    </Button>
  );
}
