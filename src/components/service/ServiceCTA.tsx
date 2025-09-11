import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Calendar,
  Star,
  Shield,
  Clock,
  Award
} from 'lucide-react';
import { WhatsAppButton } from '../WhatsAppButton';
import { getServiceMessage, getLocationMessage } from '../../config/whatsapp';

interface ServiceCTAProps {
  serviceName: string;
  cityName?: string;
  isEmergency?: boolean;
  priceRange?: [number, number];
  responseTime?: string;
  variant?: 'default' | 'compact' | 'hero';
}

export function ServiceCTA({ 
  serviceName, 
  cityName, 
  isEmergency = false,
  priceRange = [100, 500],
  responseTime = '30 دقيقة',
  variant = 'default'
}: ServiceCTAProps) {
  if (variant === 'compact') {
    return (
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="font-headline text-lg font-semibold mb-2">
              احصل على عرض سعر مجاني
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              تواصل معنا للحصول على أفضل عروض الأسعار
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" size="sm">
                <Phone className="h-4 w-4 ml-2" />
                اطلب عرض سعر
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                <MessageCircle className="h-4 w-4 ml-2" />
                تواصل معنا
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'hero') {
    return (
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-3xl font-bold mb-4">
            احصل على أفضل {serviceName} في {cityName || 'السعودية'}
          </h2>
          <p className="text-foreground/80 mb-6 text-lg">
            تواصل معنا اليوم للحصول على عروض أسعار مجانية من أفضل المحترفين المعتمدين
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center justify-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-sm font-medium">4.9/5 تقييم</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">ضمان الجودة</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">استجابة سريعة</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="min-w-[200px]">
              <Phone className="h-5 w-5 ml-2" />
              اطلب عرض سعر مجاني
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              <Calendar className="h-5 w-5 ml-2" />
              احجز موعد
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h3 className="font-headline text-2xl font-semibold mb-2">
            احصل على أفضل {serviceName}
            {cityName && ` في ${cityName}`}
          </h3>
          <p className="text-foreground/80 mb-4">
            تواصل معنا اليوم للحصول على عروض أسعار مجانية من أفضل المحترفين المعتمدين
          </p>
          
          {isEmergency && (
            <Badge className="bg-red-100 text-red-800 border-red-200 mb-4">
              <Clock className="h-3 w-3 ml-1" />
              خدمة طوارئ متاحة 24/7
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 border rounded-lg">
            <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h4 className="font-semibold mb-1">فنيون معتمدون</h4>
            <p className="text-sm text-muted-foreground">خبرة واسعة ومهارات متخصصة</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h4 className="font-semibold mb-1">ضمان الجودة</h4>
            <p className="text-sm text-muted-foreground">ضمان شامل على جميع الخدمات</p>
          </div>
          <div className="text-center p-4 border rounded-lg">
            <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h4 className="font-semibold mb-1">استجابة سريعة</h4>
            <p className="text-sm text-muted-foreground">وصول في {responseTime}</p>
          </div>
        </div>

        <div className="bg-white/50 rounded-lg p-4 mb-6">
          <div className="text-center">
            <h4 className="font-semibold mb-2">نطاق الأسعار</h4>
            <p className="text-2xl font-bold text-primary">
              {priceRange[0]} - {priceRange[1]} ريال
            </p>
            <p className="text-sm text-muted-foreground">
              يختلف حسب نوع الخدمة والتعقيد
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Button className="w-full">
            <Phone className="h-4 w-4 ml-2" />
            اطلب عرض سعر
          </Button>
          <WhatsAppButton
            phoneNumber="+966501234567"
            message={cityName ? getLocationMessage(cityName.toLowerCase()) : getServiceMessage(serviceName.toLowerCase().replace(/\s+/g, '-'))}
            variant="outline"
            className="w-full"
            label="تواصل عبر WhatsApp"
          />
          <Button variant="outline" className="w-full">
            <Calendar className="h-4 w-4 ml-2" />
            احجز موعد
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            * العروض مجانية ولا توجد التزامات
          </p>
        </div>
      </CardContent>
    </Card>
  );
}