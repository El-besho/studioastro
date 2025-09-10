import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Clock, User, Phone, Wrench, Star } from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  duration?: string;
}

interface ProcessStepsProps {
  title?: string;
  steps?: ProcessStep[];
}

const defaultSteps: ProcessStep[] = [
  {
    id: 'contact',
    title: 'تواصل معنا',
    description: 'اتصل بنا أو املأ النموذج للحصول على عرض سعر مجاني',
    icon: Phone,
    duration: '5 دقائق'
  },
  {
    id: 'quote',
    title: 'عرض السعر',
    description: 'نرسل لك عرض سعر مفصل ومجاني خلال 30 دقيقة',
    icon: Clock,
    duration: '30 دقيقة'
  },
  {
    id: 'schedule',
    title: 'حجز الموعد',
    description: 'نحدد معك الموعد المناسب لتنفيذ الخدمة',
    icon: User,
    duration: '10 دقائق'
  },
  {
    id: 'service',
    title: 'تنفيذ الخدمة',
    description: 'فريقنا المحترف ينفذ الخدمة بأعلى معايير الجودة',
    icon: Wrench,
    duration: 'حسب الخدمة'
  },
  {
    id: 'completion',
    title: 'التسليم والضمان',
    description: 'نسلم لك الخدمة مع ضمان شامل ومتابعة ما بعد البيع',
    icon: Star,
    duration: '5 دقائق'
  }
];

export function ProcessSteps({ title = "كيفية الحصول على الخدمة", steps = defaultSteps }: ProcessStepsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-headline text-lg font-semibold">
                    {step.title}
                  </h3>
                  {step.duration && (
                    <Badge variant="outline" className="text-xs">
                      {step.duration}
                    </Badge>
                  )}
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-6 top-16 w-0.5 h-8 bg-border" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}