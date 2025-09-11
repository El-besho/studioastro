'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Check, X, Star, Clock, DollarSign, Shield } from 'lucide-react';

interface ServiceComparisonProps {
  currentService: any;
  cityName: string;
}

export function ServiceComparison({
  currentService,
  cityName
}: ServiceComparisonProps) {
  const comparisonData = [
    {
      feature: 'الاستجابة السريعة',
      us: true,
      competitors: false,
      description: 'نصل إليك خلال 30 دقيقة'
    },
    {
      feature: 'فريق محلي متخصص',
      us: true,
      competitors: false,
      description: `فريق محترف في ${cityName}`
    },
    {
      feature: 'ضمان الجودة',
      us: true,
      competitors: true,
      description: 'ضمان شامل على الخدمة'
    },
    {
      feature: 'أسعار شفافة',
      us: true,
      competitors: false,
      description: 'لا توجد رسوم مخفية'
    },
    {
      feature: 'خدمة 24/7',
      us: true,
      competitors: false,
      description: 'متاح على مدار الساعة'
    },
    {
      feature: 'متابعة ما بعد الخدمة',
      us: true,
      competitors: false,
      description: 'متابعة مجانية لمدة شهر'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle class="font-headline text-2xl text-center">
          لماذا تختارنا في {cityName}؟
        </CardTitle>
        <p class="text-center text-muted-foreground">
          مقارنة بين خدماتنا وخدمات المنافسين
        </p>
      </CardHeader>
      <CardContent>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-right p-4 font-semibold">المميزات</th>
                <th class="text-center p-4 font-semibold text-primary">إنقاذ</th>
                <th class="text-center p-4 font-semibold text-muted-foreground">المنافسون</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr key={index} class="border-b hover:bg-muted/50">
                  <td class="p-4">
                    <div>
                      <div class="font-medium">{item.feature}</div>
                      <div class="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </td>
                  <td class="text-center p-4">
                    {item.us ? (
                      <div class="flex items-center justify-center">
                        <Check class="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div class="flex items-center justify-center">
                        <X class="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </td>
                  <td class="text-center p-4">
                    {item.competitors ? (
                      <div class="flex items-center justify-center">
                        <Check class="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div class="flex items-center justify-center">
                        <X class="h-5 w-5 text-red-600" />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card class="text-center">
            <CardContent class="pt-6">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                <Star class="h-6 w-6" />
              </div>
              <h3 class="font-semibold mb-2">تقييم 4.8/5</h3>
              <p class="text-sm text-muted-foreground">من عملائنا في {cityName}</p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardContent class="pt-6">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                <Clock class="h-6 w-6" />
              </div>
              <h3 class="font-semibold mb-2">98% في الوقت المحدد</h3>
              <p class="text-sm text-muted-foreground">نلتزم بالمواعيد دائماً</p>
            </CardContent>
          </Card>

          <Card class="text-center">
            <CardContent class="pt-6">
              <div class="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mx-auto mb-4">
                <Shield class="h-6 w-6" />
              </div>
              <h3 class="font-semibold mb-2">ضمان 100%</h3>
              <p class="text-sm text-muted-foreground">رضاك مضمون أو استرداد كامل</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}