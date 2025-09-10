import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Star, 
  Clock, 
  Shield, 
  Check, 
  Users, 
  Award, 
  Phone, 
  MapPin,
  Zap,
  Heart
} from 'lucide-react';

interface ServiceFeaturesProps {
  service: {
    emergency_available?: boolean;
    islamic_compliance?: boolean;
    cultural_adaptations?: string[];
    service_duration?: number;
    pricing_tier?: string;
    seasonal_demand?: string;
  };
  city?: {
    ar_name: string;
  };
}

export function ServiceFeatures({ service, city }: ServiceFeaturesProps) {
  const features = [
    {
      icon: Star,
      title: "جودة عالية",
      description: "أعلى معايير الجودة والاحترافية",
      color: "text-yellow-600"
    },
    {
      icon: Clock,
      title: "سرعة في التنفيذ",
      description: `تنفيذ في ${service.service_duration || 2} ساعات`,
      color: "text-blue-600"
    },
    {
      icon: Shield,
      title: "ضمان شامل",
      description: "ضمان على جميع الخدمات المقدمة",
      color: "text-green-600"
    },
    {
      icon: Users,
      title: "فريق محترف",
      description: "فنيون معتمدون ومتخصصون",
      color: "text-purple-600"
    },
    {
      icon: Award,
      title: "معايير عالية",
      description: "نلتزم بأعلى معايير الصناعة",
      color: "text-orange-600"
    },
    {
      icon: Phone,
      title: "دعم 24/7",
      description: "خدمة عملاء متاحة على مدار الساعة",
      color: "text-red-600"
    }
  ];

  if (service.emergency_available) {
    features.push({
      icon: Zap,
      title: "خدمة طوارئ",
      description: "متاحة 24/7 للطوارئ",
      color: "text-red-600"
    });
  }

  if (service.islamic_compliance) {
    features.push({
      icon: Heart,
      title: "متوافق مع الشريعة",
      description: "نلتزم بالقيم الإسلامية",
      color: "text-green-600"
    });
  }

  if (city) {
    features.push({
      icon: MapPin,
      title: `محليون في ${city.ar_name}`,
      description: `فريق محلي متخصص في ${city.ar_name}`,
      color: "text-indigo-600"
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">لماذا تختار خدماتنا؟</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className={`flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-headline text-lg font-semibold mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground/80">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {service.cultural_adaptations && service.cultural_adaptations.length > 0 && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="font-headline text-lg font-semibold mb-3">التكيفات الثقافية</h4>
            <ul className="space-y-2">
              {service.cultural_adaptations.map((adaptation, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{adaptation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}