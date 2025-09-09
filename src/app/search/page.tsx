
"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/hooks/use-search';
import { SearchResults } from '@/components/search-results';
import { Skeleton } from '@/components/ui/skeleton';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const location = searchParams.get('location') || '';

  const { results, isLoading, cityDetails } = useSearch({ query, location });
  
  const getPageTitle = () => {
    if (query && location) return `نتائج البحث عن "${query}" في ${location}`;
    if (query) return `نتائج البحث عن "${query}"`;
    if (location) return `جميع الخدمات المتوفرة في ${cityDetails?.ar_name || location}`;
    return 'نتائج البحث';
  }

  const getPageDescription = () => {
    if (isLoading) return 'جاري البحث...';
    const resultCount = results.length;
    if (resultCount > 0) {
      return `تم العثور على ${resultCount} خدمة متاحة.`;
    }
    return `لم نتمكن من العثور على خدمات تطابق بحثك.`;
  }

  return (
    <div className="container py-12 md:py-24 text-right">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
         {getPageTitle()}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {getPageDescription()}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[125px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            ))}
        </div>
      ) : (
        <SearchResults results={results} />
      )}
    </div>
  );
}


export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  )
}
