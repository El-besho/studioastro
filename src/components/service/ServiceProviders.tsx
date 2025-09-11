import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  CheckCircle,
  Award,
  Users,
  Shield
} from 'lucide-react';

interface Provider {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  specialties: string[];
  experience: string;
  availability: string;
  responseTime: string;
  verified: boolean;
  priceRange: string;
  services: string[];
}

interface ServiceProvidersProps {
  serviceName: string;
  cityName?: string;
  providers?: Provider[];
}

const defaultProviders: Provider[] = [
  {
    id: '1',
    name: 'شركة التكييف المتقدمة',
    rating: 4.9,
    reviewCount: 127,
    location: 'الرياض',
    specialties: ['صيانة مكيفات', 'تركيب مكيفات', 'تنظيف مكيفات'],
    experience: '10+ سنوات',
    availability: '24/7',
    responseTime: '30 دقيقة',
    verified: true,
    priceRange: '150-500 ريال',
    services: ['صيانة دورية', 'إصلاح طارئ', 'تركيب جديد']
  },
  {
    id: '2',
    name: 'مؤسسة السباكة الذكية',
    rating: 4.8,
    reviewCount: 89,
    location: 'جدة',
    specialties: ['إصلاح تسريبات', 'تنظيف مجاري', 'تركيب سخانات'],
    experience: '8+ سنوات',
    availability: '24/7',
    responseTime: '45 دقيقة',
    verified: true,
    priceRange: '100-400 ريال',
    services: ['إصلاح طارئ', 'صيانة دورية', 'تركيب جديد']
  },
  {
    id: '3',
    name: 'شركة الكهرباء الحديثة',
    rating: 4.7,
    reviewCount: 156,
    location: 'الدمام',
    specialties: ['تركيب إضاءة', 'إصلاح أعطال', 'تركيب مقابس'],
    experience: '12+ سنوات',
    availability: '24/7',
    responseTime: '60 دقيقة',
    verified: true,
    priceRange: '120-600 ريال',
    services: ['إصلاح طارئ', 'تركيب جديد', 'صيانة دورية']
  },
  {
    id: '4',
    name: 'مؤسسة التنظيف الشامل',
    rating: 4.9,
    reviewCount: 203,
    location: 'مكة',
    specialties: ['تنظيف عميق', 'تنظيف سجاد', 'تنظيف نوافذ'],
    experience: '15+ سنوات',
    availability: '24/7',
    responseTime: '90 دقيقة',
    verified: true,
    priceRange: '200-800 ريال',
    services: ['تنظيف دوري', 'تنظيف طارئ', 'تنظيف شامل']
  }
];

export function ServiceProviders({ serviceName, cityName, providers = defaultProviders }: ServiceProvidersProps) {
  const filteredProviders = providers.filter(provider => {
    if (cityName && !provider.location.includes(cityName)) return false;
    return provider.specialties.some(specialty => 
      specialty.includes(serviceName) || serviceName.includes(specialty)
    );
  });

  if (filteredProviders.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">مزودو الخدمة المعتمدون</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Provider Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-headline text-xl font-semibold mb-1">
                        {provider.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{provider.rating}</span>
                          <span className="text-sm text-muted-foreground">
                            ({provider.reviewCount} تقييم)
                          </span>
                        </div>
                        {provider.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            <CheckCircle className="h-3 w-3 ml-1" />
                            معتمد
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{provider.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{provider.experience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">استجابة: {provider.responseTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">متاح: {provider.availability}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">التخصصات:</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">الخدمات المتاحة:</h4>
                    <ul className="space-y-1">
                      {provider.services.map((service, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-600" />
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="lg:w-64">
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">نطاق الأسعار</h4>
                      <p className="text-lg font-bold text-primary">{provider.priceRange}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        يختلف حسب نوع الخدمة
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Phone className="h-4 w-4 ml-2" />
                      اطلب عرض سعر
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      عرض التفاصيل
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-semibold">ضمان الجودة</span>
          </div>
          <p className="text-sm text-foreground/80">
            جميع مزودي الخدمة المعتمدين لدينا يخضعون لفحص دقيق ويحملون شهادات معتمدة. 
            نضمن جودة الخدمة وأفضل الأسعار.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}