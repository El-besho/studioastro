
"use client"

import * as React from "react"
import {
  File,
  Home,
  User,
  PanelTop,
  CreditCard,
  Settings,
  Search,
  Building,
  LucideIcon,
} from "lucide-react"

import { cn } from "../lib/utils"
import {
  CommandDialog as ShadcnCommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command"
import { getAllServices } from "../lib/services"
// import { useRouter } from "next/navigation" // Removed for Astro compatibility

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
    WashingMachine,
    Refrigerator,
    Gem
  } from 'lucide-react';
  
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

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CommandDialog({ open, onOpenChange }: Props) {
  const allServices = React.useMemo(() => getAllServices(), [])
  const [searchQuery, setSearchQuery] = React.useState('')

  const runCommand = React.useCallback((command: () => unknown) => {
    onOpenChange(false)
    command()
  }, [onOpenChange])

  // Filter services based on search query
  const filteredServices = React.useMemo(() => {
    if (!searchQuery.trim()) return allServices
    return allServices.filter(service => 
      service.ar_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.sub_services.some(sub => 
        sub.ar_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }, [allServices, searchQuery])

  return (
    <ShadcnCommandDialog 
      open={open} 
      onOpenChange={(newOpen) => {
        onOpenChange(newOpen)
        if (!newOpen) {
          setSearchQuery('')
        }
      }}
    >
      <CommandInput 
        placeholder="ابحث عن خدمة أو مدينة..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
        className="text-right"
        dir="rtl"
      />
      <CommandList>
        <CommandEmpty>
          <div className="text-center py-6">
            <Search className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              لا توجد نتائج لـ "{searchQuery}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              جرب البحث بكلمات مختلفة
            </p>
          </div>
        </CommandEmpty>
        
        {filteredServices.length > 0 && (
          <CommandGroup heading={`الخدمات (${filteredServices.length})`}>
            {filteredServices.map((service) => {
              const Icon = serviceIconMap[service.slug] || Building
              return (
                <CommandItem
                  key={service.slug}
                  value={`${service.ar_name} ${service.sub_services.map(s => s.ar_name).join(' ')}`}
                  onSelect={() => {
                    runCommand(() => window.location.href = `/services/${service.slug}`)
                  }}
                  className="touch-target"
                  aria-label={`عرض خدمات ${service.ar_name}`}
                >
                  <Icon className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span className="font-medium">{service.ar_name}</span>
                    {service.sub_services.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {service.sub_services.length} خدمة فرعية
                      </span>
                    )}
                  </div>
                </CommandItem>
              )
            })}
          </CommandGroup>
        )}

        <CommandSeparator />
        
        <CommandGroup heading="إجراءات سريعة">
          <CommandItem
            onSelect={() => {
              runCommand(() => window.location.href = '/services')
            }}
            className="touch-target"
            aria-label="عرض جميع الخدمات"
          >
            <Building className="mr-2 h-4 w-4 text-primary" />
            <span>عرض جميع الخدمات</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              runCommand(() => window.location.href = '/locations')
            }}
            className="touch-target"
            aria-label="عرض جميع المواقع"
          >
            <Building className="mr-2 h-4 w-4 text-primary" />
            <span>عرض جميع المواقع</span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              runCommand(() => window.location.href = '/emergency')
            }}
            className="touch-target"
            aria-label="خدمات الطوارئ"
          >
            <Bolt className="mr-2 h-4 w-4 text-destructive" />
            <span>خدمات الطوارئ</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </ShadcnCommandDialog>
  )
}
