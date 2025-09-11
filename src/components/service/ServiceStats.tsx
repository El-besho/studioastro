import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Users, 
  Star, 
  Clock, 
  Shield, 
  Award, 
  TrendingUp,
  CheckCircle,
  Phone
} from 'lucide-react';

interface ServiceStatsProps {
  service: {
    ar_name: string;
    sub_services: any[];
    emergency_available?: boolean;
    service_duration?: number;
    pricing_tier?: string;
  };
  city?: {
    ar_name: string;
    population: number;
  };
}

export function ServiceStats({ service, city }: ServiceStatsProps) {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'عميل راضي',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Star,
      value: '4.9',
      label: 'تقييم العملاء',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: Clock,
      value: `${service.service_duration || 2} ساعة`,
      label: 'متوسط وقت الخدمة',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Shield,
      value: '100%',
      label: 'ضمان الجودة',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      value: service.sub_services.length,
      label: 'خدمة فرعية',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: TrendingUp,
      value: '95%',
      label: 'معدل الرضا',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  if (service.emergency_available) {
    stats.push({
      icon: Phone,
      value: '24/7',
      label: 'خدمة الطوارئ',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    });
  }

  if (city) {
    stats.push({
      icon: Users,
      value: city.population.toLocaleString(),
      label: `سكان ${city.ar_name}`,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">إحصائيات الخدمة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg border hover:shadow-md transition-shadow">
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg ${stat.bgColor} ${stat.color} mb-3`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-semibold">لماذا تختار خدماتنا؟</span>
          </div>
          <ul className="space-y-1 text-sm text-foreground/80">
            <li>• فنيون معتمدون ومتخصصون</li>
            <li>• أسعار تنافسية وعادلة</li>
            <li>• ضمان شامل على جميع الخدمات</li>
            <li>• خدمة عملاء متاحة 24/7</li>
            <li>• معدات وأدوات متطورة</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}