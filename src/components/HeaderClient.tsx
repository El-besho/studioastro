'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Menu,
  MapPin,
  ChevronDown,
  Search
} from 'lucide-react';
import { navLinks } from '../config/nav';
import { getAllCities, getCityBySlug, getServiceBySlug } from '../lib/services';
import { CommandDialog } from './command-dialog';
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetFooter } from './ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export default function HeaderClient() {
  const cities = getAllCities();
  const [currentCityName, setCurrentCityName] = useState('اختر مدينة');
  const [isServicePage, setIsServicePage] = useState(false);
  const [serviceSlug, setServiceSlug] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [openCommand, setOpenCommand] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpenCommand((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const pathname = window.location.pathname;
    const pathSegments = pathname.split('/').filter(Boolean);
    
    const city = cities.find(c => pathSegments.includes(c.slug));
    
    if (city) {
      setCurrentCityName(city.ar_name);
    } else {
      setCurrentCityName('اختر مدينة');
    }

    const servicesIndex = pathSegments.indexOf('services');
    let onServicePage = false;
    let currentServiceSlug = '';

    if (servicesIndex !== -1 && pathSegments.length > servicesIndex + 1) {
        const potentialServiceSlug = pathSegments[servicesIndex + 1];
        const serviceData = getServiceBySlug(potentialServiceSlug);
        if(serviceData) {
            onServicePage = true;
            currentServiceSlug = serviceData.slug;
        }
    }
    
    setIsServicePage(onServicePage);
    setServiceSlug(currentServiceSlug);

  }, [cities]);

  const getCityLink = (citySlug: string) => {
    if (isServicePage && serviceSlug) {
      return `/services/${serviceSlug}/${citySlug}`;
    }
    return `/search?location=${citySlug}`;
  };

  return (
    <>
      <CommandDialog open={openCommand} onOpenChange={setOpenCommand}/>
      
      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">فتح قائمة التنقل</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-0 flex flex-col">
          <SheetHeader className="border-b p-4">
            <div>Logo</div>
          </SheetHeader>
          <div className="p-4 flex-grow">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className="flex items-center gap-3 text-lg font-medium text-foreground/80 hover:text-foreground" 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon className="h-5 w-5 ml-2" />
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <SheetFooter className="p-4 border-t">
            <Button className="w-full font-headline" size="lg" asChild>
              <a href="/services" onClick={() => setIsMobileMenuOpen(false)}>اطلب عرض سعر مجاني</a>
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Desktop City Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="hidden md:flex">
            <MapPin className="h-4 w-4 ml-2" />
            {currentCityName}
            <ChevronDown className="h-4 w-4 mr-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {cities.map((city) => (
            <DropdownMenuItem key={city.slug} asChild>
              <a href={getCityLink(city.slug)}>{city.ar_name}</a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search Button */}
      {isMounted && (
        <>
          <Button 
            variant="outline" 
            className="h-10 w-10 p-0 md:w-auto md:px-4" 
            onClick={() => setOpenCommand(true)}
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline-block md:ml-2">ابحث...</span>
            <kbd className="hidden md:inline-block ml-4 pointer-events-none select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
              <span className="text-xs">CTRL</span>K
            </kbd>
          </Button>
        </>
      )}
    </>
  );
}