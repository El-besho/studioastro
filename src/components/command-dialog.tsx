
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
  // const router = useRouter() // Removed for Astro compatibility
  const allServices = React.useMemo(() => getAllServices(), [])

  const runCommand = React.useCallback((command: () => unknown) => {
    onOpenChange(false)
    command()
  }, [onOpenChange])

  return (
    <ShadcnCommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="ابحث عن خدمة..." />
      <CommandList>
        <CommandEmpty>لا توجد نتائج.</CommandEmpty>
        <CommandGroup heading="الخدمات">
          {allServices.map((service) => {
            const Icon = serviceIconMap[service.slug] || Building
            return (
              <CommandItem
                key={service.slug}
                value={service.ar_name}
                onSelect={() => {
                  runCommand(() => window.location.href = `/services/${service.slug}`)
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{service.ar_name}</span>
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </ShadcnCommandDialog>
  )
}
