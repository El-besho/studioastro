
import { ServiceHierarchy } from '../types/services';
import { ServiceCard } from './service-card';
import { cn } from '../lib/utils';
import { ServiceGrid as OptimizedServiceGrid } from './grid/OptimizedGrid';

interface ServiceGridProps {
    services: (ServiceHierarchy & { slug: string })[];
    showDescription?: boolean;
    className?: string;
    variant?: 'default' | 'auto-fit' | 'auto-fill' | 'masonry' | 'aspect-ratio';
    performance?: boolean;
}

export function ServiceGrid({ 
    services, 
    showDescription = false, 
    className,
    variant = 'default',
    performance = false
}: ServiceGridProps) {
    return (
        <OptimizedServiceGrid
            variant={variant}
            performance={performance}
            className={cn("grid-service", className)}
        >
            {services.map((service) => (
                <ServiceCard 
                    key={service.slug}
                    service={service} 
                    showDescription={showDescription}
                    className="h-full grid-item-stretch"
                />
            ))}
        </OptimizedServiceGrid>
    )
}
