
import {
  Card,
  CardContent,
} from './ui/card';
import {
  Wind,
  Wrench,
  Bolt,
  Sparkles,
  Hammer,
  Bug,
  Trees,
  ShieldCheck,
  Paintbrush,
  Construction,
  Truck,
  Car,
  Laptop,
  CalendarDays,
  Droplets,
  LucideIcon,
  Check,
  WashingMachine,
  Refrigerator,
  Gem
} from 'lucide-react';
import { ServiceHierarchy, CityProfile } from '../types/services';
import { cn } from '../lib/utils';

const serviceIconMap: Record<string, LucideIcon> = {
  'air-conditioning-hvac': Wind,
  'plumbing-services': Wrench,
  'electrical-services': Bolt,
  'cleaning-services': Sparkles,
  'home-maintenance-repair': Hammer,
  'pest-control': Bug,
  'landscaping-gardening': Trees,
  'security-services': ShieldCheck,
  'painting-decor': Paintbrush,
  'construction-renovation': Construction,
  'moving-relocation': Truck,
  'automotive-services': Car,
  'it-tech-services': Laptop,
  'event-planning': CalendarDays,
  'swimming-pool-services': Droplets,
  'washing-machine-maintenance': WashingMachine,
  'refrigerator-maintenance': Refrigerator,
  'marble-tiling-services': Gem,
};

interface ServiceCardProps {
  service: ServiceHierarchy & { slug: string };
  city?: CityProfile | null;
  showDescription?: boolean;
  showSubServices?: boolean;
  className?: string;
}

export function ServiceCard({
  service,
  city = null,
  showDescription = false,
  showSubServices = false,
  className = '',
}: ServiceCardProps) {
  const Icon = serviceIconMap[service.slug] || Hammer;
  const link = city
    ? `/services/${service.slug}/${city.slug}`
    : `/services/${service.slug}`;
  
  const title = city ? `${service.ar_name} في ${city.ar_name}` : service.ar_name;
  const description = city
    ? `نقدم خدمات ${service.ar_name} المحترفة في ${city.ar_name}.`
    : service.seo.summary;

  return (
    <a 
      href={link} 
      className="block h-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      aria-label={`عرض خدمات ${title}`}
    >
      <Card className={cn(
        'text-center group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col',
        'border-2 hover:border-primary/20 focus-within:border-primary/40',
        'bg-gradient-to-b from-background to-muted/20',
        'card-hover relative overflow-hidden',
        className
      )}>
        <CardContent className="flex flex-col items-center justify-start p-6 gap-4 text-center flex-grow">
          <div className="flex items-center justify-center h-16 w-16 p-4 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 relative">
            <Icon className="w-8 h-8 relative z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="w-full flex-grow">
            <h2 className="font-headline text-lg font-semibold group-hover:text-primary transition-colors duration-200">
              {title}
            </h2>
            {showDescription && (
                 <p className="text-sm text-muted-foreground line-clamp-2 mt-1 group-hover:text-foreground/80 transition-colors duration-200">
                    {description}
                 </p>
            )}
          </div>
          {showSubServices && service.sub_services.length > 0 && (
            <ul className="text-xs text-muted-foreground w-full space-y-1 mt-auto pt-2 border-t text-right">
              {service.sub_services.slice(0, 2).map(sub => (
                <li key={sub.id} className="flex items-center justify-end gap-2">
                  <span>{sub.ar_name}</span>
                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                </li>
              ))}
              {service.sub_services.length > 2 && (
                <li className="flex items-center justify-end gap-2">
                  <span>والمزيد...</span>
                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                </li>
              )}
            </ul>
          )}
        </CardContent>
      </Card>
    </a>
  );
}
