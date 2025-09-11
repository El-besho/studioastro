import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Check, Clock, DollarSign, Star, Zap } from 'lucide-react';

interface SubService {
  id: string;
  ar_name: string;
  urgency: string;
  avg_price_range: [number, number];
  skill_requirements: string[];
  tools_required: string[];
  seasonal_multiplier: number;
  seo: {
    summary: string;
    primary_keywords: string[];
    secondary_keywords: string[];
    long_tail_keywords: string[];
    faq: Array<{ question: string; answer: string }>;
  };
}

interface SubServiceGridProps {
  subServices: SubService[];
  serviceSlug: string;
  serviceName: string;
}

export function SubServiceGrid({ subServices, serviceSlug, serviceName }: SubServiceGridProps) {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'urgent':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'maintenance':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch (urgency) {
      case 'emergency':
        return 'طوارئ';
      case 'urgent':
        return 'عاجل';
      case 'scheduled':
        return 'مجدول';
      case 'maintenance':
        return 'صيانة';
      default:
        return urgency;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter mb-4">
          خدمات {serviceName} المتاحة
        </h2>
        <p className="text-foreground/80 max-w-2xl mx-auto">
          اختر من بين مجموعة شاملة من خدمات {serviceName} المتخصصة
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subServices.map((subService) => (
          <Card key={subService.id} className="group hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={getUrgencyColor(subService.urgency)}>
                  {getUrgencyLabel(subService.urgency)}
                </Badge>
                {subService.seasonal_multiplier > 1 && (
                  <Badge variant="outline" className="text-xs">
                    موسمي
                  </Badge>
                )}
              </div>
              <CardTitle className="font-headline text-lg group-hover:text-primary transition-colors">
                {subService.ar_name}
              </CardTitle>
              <CardDescription className="line-clamp-3">
                {subService.seo.summary}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Pricing */}
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">
                  {subService.avg_price_range[0]} - {subService.avg_price_range[1]} ريال
                </span>
                {subService.seasonal_multiplier > 1 && (
                  <span className="text-xs text-muted-foreground">
                    (موسمي: {Math.round(subService.avg_price_range[0] * subService.seasonal_multiplier)} - {Math.round(subService.avg_price_range[1] * subService.seasonal_multiplier)} ريال)
                  </span>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">المهارات المطلوبة:</h4>
                <div className="flex flex-wrap gap-1">
                  {subService.skill_requirements.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {subService.skill_requirements.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{subService.skill_requirements.length - 3} أخرى
                    </Badge>
                  )}
                </div>
              </div>

              {/* Tools */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">الأدوات المطلوبة:</h4>
                <div className="flex flex-wrap gap-1">
                  {subService.tools_required.slice(0, 2).map((tool, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tool}
                    </Badge>
                  ))}
                  {subService.tools_required.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{subService.tools_required.length - 2} أخرى
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button 
                  asChild
                  className="w-full"
                >
                  <a href={`/services/${serviceSlug}/${subService.slug}`}>
                    عرض التفاصيل
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <a href="/contact">
                    اطلب عرض سعر
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}