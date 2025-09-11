'use client';

import { useState, useMemo } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import {
  ChevronDown,
  ChevronRight,
  MapPin,
  Wrench,
  Menu,
  Search,
  X,
} from 'lucide-react';
import { getAllServices, getAllCities } from '../lib/services';
import { cn } from '../lib/utils';

export default function ServicesLocationsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openServices, setOpenServices] = useState<string[]>([]);
  const [openLocations, setOpenLocations] = useState(false);
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const services = getAllServices();
  const cities = getAllCities();

  // Filter services based on search query
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    return services.filter(service => 
      service.ar_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.en_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.sub_services.some(sub => 
        sub.ar_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [services, searchQuery]);

  // Group services by category
  const servicesByCategory = useMemo(() => {
    return filteredServices.reduce((acc, service) => {
      const category = service.category || 'other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    }, {} as Record<string, typeof filteredServices>);
  }, [filteredServices]);

  const categoryLabels: Record<string, string> = {
    'essential': 'الخدمات الأساسية',
    'emergency': 'خدمات الطوارئ',
    'maintenance': 'خدمات الصيانة',
    'cleaning': 'خدمات التنظيف',
    'construction': 'خدمات البناء والتشييد',
    'automotive': 'خدمات السيارات',
    'technology': 'خدمات التكنولوجيا',
    'other': 'خدمات أخرى'
  };

  const toggleService = (serviceSlug: string) => {
    setOpenServices(prev => 
      prev.includes(serviceSlug) 
        ? prev.filter(slug => slug !== serviceSlug)
        : [...prev, serviceSlug]
    );
  };

  const toggleCategory = (category: string) => {
    setOpenCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const toggleLocations = () => {
    setOpenLocations(prev => !prev);
  };

  const handleServiceClick = (serviceSlug: string) => {
    window.location.href = `/services/${serviceSlug}`;
    setIsOpen(false);
  };

  const handleLocationClick = (citySlug: string) => {
    window.location.href = `/search?location=${citySlug}`;
    setIsOpen(false);
  };

  const handleServiceLocationClick = (serviceSlug: string, citySlug: string) => {
    window.location.href = `/services/${serviceSlug}/${citySlug}`;
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2 hover:bg-primary/10 hover:border-primary/20 transition-colors"
          aria-label="فتح قائمة الخدمات والمواقع"
        >
          <Menu className="h-4 w-4" />
          <span className="hidden sm:inline">الخدمات والمواقع</span>
          <span className="sm:hidden">القائمة</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 flex flex-col w-full sm:w-80 glass-effect">
        <SheetHeader className="border-b p-4 bg-gradient-to-r from-primary/5 to-primary/10">
          <SheetTitle className="flex items-center gap-2 text-right">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center pulse-glow">
              <span className="text-primary-foreground font-bold text-sm">إن</span>
            </div>
            <span className="font-headline text-lg font-bold">الخدمات والمواقع</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Search Section */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث في الخدمات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 text-right"
                variant="enhanced"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-2">
            <h3 className="font-headline text-lg font-semibold text-primary flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              الخدمات المتاحة
              {searchQuery && (
                <span className="text-sm text-muted-foreground">
                  ({filteredServices.length} نتيجة)
                </span>
              )}
            </h3>
            <div className="space-y-2">
              {Object.keys(servicesByCategory).length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">لم يتم العثور على خدمات تطابق البحث</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                    onClick={() => setSearchQuery('')}
                  >
                    مسح البحث
                  </Button>
                </div>
              ) : (
                Object.entries(servicesByCategory).map(([category, categoryServices]) => (
                  <Collapsible key={category}>
                    <CollapsibleTrigger
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 transition-colors text-right"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          {categoryLabels[category] || category}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          {categoryServices.length}
                        </span>
                      </div>
                      {openCategories.includes(category) ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mr-4">
                      {categoryServices.map((service) => (
                        <Button
                          key={service.slug}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => handleServiceClick(service.slug)}
                        >
                          {service.ar_name}
                        </Button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))
              )}
            </div>
          </div>

          {/* Locations Section */}
          <div className="space-y-2">
            <Collapsible open={openLocations} onOpenChange={setOpenLocations}>
              <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-headline text-lg font-semibold text-primary">
                    المدن المتاحة
                  </h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {cities.length}
                  </span>
                </div>
                {openLocations ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 mr-4">
                <div className="grid grid-cols-1 gap-1">
                  {cities.map((city) => (
                    <Button
                      key={city.slug}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-sm text-muted-foreground hover:text-foreground"
                      onClick={() => handleLocationClick(city.slug)}
                    >
                      {city.ar_name}
                    </Button>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 pt-4 border-t">
            <h3 className="font-headline text-lg font-semibold text-primary flex items-center gap-2">
              <Search className="h-5 w-5" />
              إجراءات سريعة
            </h3>
            <div className="space-y-2">
              <Button
                variant="default"
                className="w-full font-headline"
                onClick={() => {
                  window.location.href = '/services';
                  setIsOpen(false);
                }}
              >
                عرض جميع الخدمات
              </Button>
              <Button
                variant="outline"
                className="w-full font-headline"
                onClick={() => {
                  window.location.href = '/locations';
                  setIsOpen(false);
                }}
              >
                عرض جميع المواقع
              </Button>
              <Button
                variant="outline"
                className="w-full font-headline"
                onClick={() => {
                  window.location.href = '/search';
                  setIsOpen(false);
                }}
              >
                البحث المتقدم
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}