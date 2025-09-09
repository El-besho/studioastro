
import { ServiceHierarchy } from '@/types/services';
import { ServiceCard } from './service-card';
import { cn } from '@/lib/utils';

interface ServiceGridProps {
    services: (ServiceHierarchy & { slug: string })[];
    showDescription?: boolean;
    className?: string;
}

export function ServiceGrid({ services, showDescription = false, className }: ServiceGridProps) {
    return (
        <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6", className)}>
            {services.map((service) => (
                <ServiceCard 
                    key={service.slug}
                    service={service} 
                    showDescription={showDescription}
                    className="h-full"
                />
            ))}
        </div>
    )
}
