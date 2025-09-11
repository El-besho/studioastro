import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

interface TestimonialsProps {
  testimonials?: Testimonial[];
  serviceName?: string;
  cityName?: string;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    location: 'الرياض',
    rating: 5,
    comment: 'خدمة ممتازة وسريعة. الفني كان محترف جداً وأنجز العمل في الوقت المحدد. أنصح بهم بشدة.',
    service: 'صيانة مكيفات',
    date: '2024-01-15'
  },
  {
    id: '2',
    name: 'فاطمة علي',
    location: 'جدة',
    rating: 5,
    comment: 'جودة عالية في الخدمة والأسعار مناسبة. فريق العمل متعاون ومحترف.',
    service: 'خدمات السباكة',
    date: '2024-01-10'
  },
  {
    id: '3',
    name: 'محمد السعد',
    location: 'الدمام',
    rating: 5,
    comment: 'خدمة طوارئ ممتازة. وصلوا في الوقت المحدد وحلوا المشكلة بسرعة. شكراً لكم.',
    service: 'خدمات الكهرباء',
    date: '2024-01-08'
  },
  {
    id: '4',
    name: 'نورا أحمد',
    location: 'مكة',
    rating: 5,
    comment: 'تنظيف شامل وممتاز. المنزل أصبح نظيفاً جداً. سأطلب منهم مرة أخرى.',
    service: 'خدمات التنظيف',
    date: '2024-01-05'
  },
  {
    id: '5',
    name: 'خالد العتيبي',
    location: 'المدينة',
    rating: 5,
    comment: 'خدمة صيانة منزلية شاملة. الفنيون محترفون والأسعار عادلة.',
    service: 'صيانة منزلية',
    date: '2024-01-03'
  },
  {
    id: '6',
    name: 'سارة النعيمي',
    location: 'الخبر',
    rating: 5,
    comment: 'خدمة ممتازة من البداية للنهاية. التواصل سهل والنتيجة رائعة.',
    service: 'خدمات البناء',
    date: '2024-01-01'
  }
];

export function Testimonials({ testimonials = defaultTestimonials, serviceName, cityName }: TestimonialsProps) {
  const filteredTestimonials = testimonials.filter(testimonial => {
    if (serviceName && !testimonial.service.includes(serviceName)) return false;
    if (cityName && !testimonial.location.includes(cityName)) return false;
    return true;
  });

  if (filteredTestimonials.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Quote className="h-6 w-6 text-primary" />
          آراء عملائنا
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.slice(0, 6).map((testimonial) => (
            <div key={testimonial.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Badge variant="outline" className="text-xs">
                  {testimonial.rating}/5
                </Badge>
              </div>
              
              <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                "{testimonial.comment}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{testimonial.service}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredTestimonials.length > 6 && (
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              عرض {filteredTestimonials.length - 6} تقييم إضافي
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}