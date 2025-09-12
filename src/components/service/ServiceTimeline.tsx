'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Clock, CheckCircle, Phone, MapPin, Wrench, Star } from 'lucide-react';

interface ServiceTimelineProps {
  serviceName: string;
  cityName: string;
  estimatedDuration: string;
}

export function ServiceTimeline({
  serviceName,
  cityName,
  estimatedDuration
}: ServiceTimelineProps) {
  const timelineSteps = [
    {
      step: 1,
      title: 'التواصل الأولي',
      description: 'اتصل بنا أو املأ النموذج',
      icon: Phone,
      duration: '5 دقائق',
      status: 'completed'
    },
    {
      step: 2,
      title: 'تقييم الموقع',
      description: `زيارة موقعك في ${cityName} وتقييم المتطلبات`,
      icon: MapPin,
      duration: '30 دقيقة',
      status: 'current'
    },
    {
      step: 3,
      title: 'عرض السعر',
      description: 'تقديم عرض سعر مفصل وشفاف',
      icon: CheckCircle,
      duration: '15 دقيقة',
      status: 'pending'
    },
    {
      step: 4,
      title: 'تنفيذ الخدمة',
      description: `تنفيذ ${serviceName} بأعلى معايير الجودة`,
      icon: Wrench,
      duration: estimatedDuration,
      status: 'pending'
    },
    {
      step: 5,
      title: 'التسليم والضمان',
      description: 'تسليم العمل مع ضمان الجودة',
      icon: Star,
      duration: '30 دقيقة',
      status: 'pending'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'current':
        return 'bg-primary text-white';
      case 'pending':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" class="bg-green-500">مكتمل</Badge>;
      case 'current':
        return <Badge variant="default" class="bg-primary">جاري</Badge>;
      case 'pending':
        return <Badge variant="outline">قادم</Badge>;
      default:
        return <Badge variant="outline">قادم</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle class="font-headline text-xl flex items-center gap-2">
          <Clock class="h-5 w-5" />
          مراحل تنفيذ الخدمة
        </CardTitle>
        <p class="text-muted-foreground">
          المدة الإجمالية المتوقعة: {estimatedDuration}
        </p>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          {timelineSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.step} class="flex items-start gap-4">
                <div class={`flex items-center justify-center h-10 w-10 rounded-full ${getStatusColor(step.status)} flex-shrink-0`}>
                  <Icon class="h-5 w-5" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="font-semibold">{step.title}</h4>
                    {getStatusBadge(step.status)}
                  </div>
                  <p class="text-sm text-muted-foreground mb-2">{step.description}</p>
                  <div class="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock class="h-3 w-3" />
                    <span>المدة المتوقعة: {step.duration}</span>
                  </div>
                </div>
                {index < timelineSteps.length - 1 && (
                  <div class="absolute left-5 top-10 w-0.5 h-6 bg-border"></div>
                )}
              </div>
            );
          })}
        </div>

        <div class="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 class="font-semibold text-primary mb-2">ملاحظات مهمة:</h4>
          <ul class="text-sm text-muted-foreground space-y-1">
            <li>• جميع المراحل تتم تحت إشراف فريق متخصص</li>
            <li>• يمكن تتبع التقدم في أي وقت</li>
            <li>• المدة قد تختلف حسب تعقيد العمل</li>
            <li>• متاح التواصل المباشر مع الفريق</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}