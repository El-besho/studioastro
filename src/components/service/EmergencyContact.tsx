'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Phone, AlertTriangle, Clock, Shield } from 'lucide-react';

interface EmergencyContactProps {
  serviceName: string;
  cityName: string;
}

export function EmergencyContact({
  serviceName,
  cityName
}: EmergencyContactProps) {
  const handleEmergencyCall = () => {
    window.open('tel:+966500000000', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`🚨 طوارئ: أحتاج خدمة ${serviceName} في ${cityName} - عاجل جداً!`);
    window.open(`https://wa.me/966500000000?text=${message}`, '_blank');
  };

  return (
    <Card class="border-red-200 bg-red-50/50">
      <CardHeader>
        <CardTitle class="font-headline text-lg flex items-center gap-2 text-red-700">
          <AlertTriangle class="h-5 w-5" />
          طوارئ 24/7
        </CardTitle>
        <Badge variant="destructive" class="w-fit">
          خدمة طوارئ
        </Badge>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="text-sm text-red-700">
          <p class="mb-2">
            <strong>خدمة طوارئ متاحة على مدار الساعة</strong>
          </p>
          <p class="text-muted-foreground">
            فريق الطوارئ جاهز للاستجابة السريعة في {cityName}
          </p>
        </div>

        <div class="space-y-3">
          <Button 
            onClick={handleEmergencyCall}
            class="w-full bg-red-600 hover:bg-red-700 text-white"
            size="lg"
          >
            <Phone class="h-4 w-4 ml-2" />
            اتصل الآن - طوارئ
          </Button>

          <Button 
            onClick={handleWhatsApp}
            variant="outline"
            class="w-full border-red-300 text-red-700 hover:bg-red-50"
          >
            <svg class="h-4 w-4 ml-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            واتساب طوارئ
          </Button>
        </div>

        <div class="flex items-center gap-2 text-xs text-red-600">
          <Clock class="h-3 w-3" />
          <span>استجابة فورية خلال 15 دقيقة</span>
        </div>

        <div class="flex items-center gap-2 text-xs text-red-600">
          <Shield class="h-3 w-3" />
          <span>فريق متخصص في {serviceName}</span>
        </div>
      </CardContent>
    </Card>
  );
}