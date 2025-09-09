
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ServiceHierarchy, CityProfile } from '@/types/services';
import { ServiceCard } from './service-card';

interface SearchResultsProps {
  results: { service: ServiceHierarchy & { slug: string }, city: CityProfile | null }[];
}

export function SearchResults({ results }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-headline font-bold mb-4">لا توجد نتائج</h2>
        <p className="text-muted-foreground mb-6">
          لم نتمكن من العثور على أي خدمات تطابق بحثك. حاول تعديل مصطلحات البحث أو تصفح خدماتنا.
        </p>
        <Button asChild>
          <Link href="/services">
            تصفح جميع الخدمات
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {results.map(({ service, city }) => (
        <ServiceCard 
            key={`${service.slug}-${city?.slug || ''}`}
            service={service}
            city={city}
            showDescription={true}
            showSubServices={true}
        />
      ))}
    </div>
  );
}
