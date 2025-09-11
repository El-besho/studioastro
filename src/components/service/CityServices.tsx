'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Users, Star, Clock, ArrowRight } from 'lucide-react';

interface City {
  slug: string;
  ar_name: string;
  region: string;
  population: number;
  description: string;
}

interface CityServicesProps {
  serviceName: string;
  serviceSlug: string;
  subServiceSlug?: string;
  cities: City[];
  showAll?: boolean;
  maxCities?: number;
}

export function CityServices({
  serviceName,
  serviceSlug,
  subServiceSlug,
  cities,
  showAll = false,
  maxCities = 12
}: CityServicesProps) {
  const displayCities = showAll ? cities : cities.slice(0, maxCities);
  const hasMoreCities = cities.length > maxCities;

  const getCityUrl = (citySlug: string) => {
    if (subServiceSlug) {
      return `/services/${serviceSlug}/${subServiceSlug}/${citySlug}`;
    }
    return `/services/${serviceSlug}/${citySlug}`;
  };

  const getPopulationDisplay = (population: number) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(0)}K`;
    }
    return population.toString();
  };

  return (
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="font-headline text-3xl font-bold tracking-tighter mb-4">
          خدمات {serviceName} في جميع مدن المملكة
        </h2>
        <p class="text-foreground/80 max-w-2xl mx-auto">
          نقدم خدمات {serviceName} في جميع أنحاء المملكة العربية السعودية مع فريق محترف في كل مدينة
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayCities.map((city) => (
          <Card key={city.slug} class="hover:shadow-lg transition-all duration-200 group">
            <CardHeader class="pb-3">
              <div class="flex items-center justify-between">
                <CardTitle class="font-headline text-lg group-hover:text-primary transition-colors">
                  {city.ar_name}
                </CardTitle>
                <Badge variant="outline" class="text-xs">
                  {city.region}
                </Badge>
              </div>
            </CardHeader>
            <CardContent class="space-y-3">
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Users class="h-4 w-4" />
                <span>{getPopulationDisplay(city.population)} نسمة</span>
              </div>
              
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Star class="h-4 w-4 text-yellow-500" />
                <span>تقييم 4.8/5</span>
              </div>
              
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock class="h-4 w-4 text-green-500" />
                <span>استجابة 30 دقيقة</span>
              </div>

              <p class="text-sm text-muted-foreground line-clamp-2">
                {city.description}
              </p>

              <Button 
                asChild
                class="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                variant="outline"
              >
                <a href={getCityUrl(city.slug)} class="flex items-center justify-center gap-2">
                  <span>عرض الخدمات</span>
                  <ArrowRight class="h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {hasMoreCities && !showAll && (
        <div class="text-center">
          <Button variant="outline" size="lg">
            <MapPin class="h-4 w-4 ml-2" />
            عرض جميع المدن ({cities.length} مدينة)
          </Button>
        </div>
      )}

      <div class="bg-primary/5 rounded-lg p-6 border border-primary/20">
        <div class="flex items-center gap-3 mb-4">
          <div class="flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
            <MapPin class="h-5 w-5" />
          </div>
          <div>
            <h3 class="font-semibold">تغطية شاملة في جميع أنحاء المملكة</h3>
            <p class="text-sm text-muted-foreground">خدمات محلية في كل مدينة</p>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-green-500"></div>
            <span>فريق محلي متخصص في كل مدينة</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
            <span>استجابة سريعة خلال 30 دقيقة</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-purple-500"></div>
            <span>أسعار تنافسية ومضمونة</span>
          </div>
        </div>
      </div>
    </div>
  );
}