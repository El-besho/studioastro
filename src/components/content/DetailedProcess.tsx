'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Search, 
  Phone, 
  Calendar, 
  User, 
  Wrench, 
  CheckCircle, 
  Clock, 
  Shield,
  Star,
  MessageCircle
} from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: any;
  details: string[];
  tips: string[];
  requirements: string[];
  whatToExpect: string[];
}

interface DetailedProcessProps {
  serviceType: string;
  serviceName: string;
}

export function DetailedProcess({ serviceType, serviceName }: DetailedProcessProps) {
  const [activeStep, setActiveStep] = useState(0);

  const getProcessSteps = (serviceType: string): ProcessStep[] => {
    const baseSteps: Record<string, ProcessStep[]> = {
      'air-conditioning-hvac': [
        {
          id: 'consultation',
          title: 'الاستشارة الأولية',
          description: 'تقييم شامل لاحتياجات التكييف الخاصة بك',
          duration: '15-30 دقيقة',
          icon: Search,
          details: [
            'فحص المساحة المراد تكييفها',
            'تقييم العزل الحالي للمبنى',
            'فحص التوصيلات الكهربائية الموجودة',
            'تحديد نوع النظام المناسب'
          ],
          tips: [
            'احضر مخططات المبنى إن وجدت',
            'حدد نقاط التوصيل الكهربائي',
            'أخبر الفني عن أي مشاكل سابقة'
          ],
          requirements: [
            'وصول كامل للمنطقة المراد تكييفها',
            'مخططات كهربائية إن وجدت',
            'معرفة نوع النظام المطلوب'
          ],
          whatToExpect: [
            'فحص شامل للمنطقة',
            'توصيات مفصلة حول النظام المناسب',
            'تقدير أولي للتكلفة',
            'خطة عمل واضحة'
          ]
        },
        {
          id: 'booking',
          title: 'حجز الموعد',
          description: 'ترتيب موعد مناسب مع أفضل الفنيين',
          duration: '5-10 دقائق',
          icon: Calendar,
          details: [
            'اختيار الوقت المناسب لك',
            'تأكيد تفاصيل الخدمة',
            'تحديد عنوان الموقع بدقة',
            'تأكيد بيانات الاتصال'
          ],
          tips: [
            'احجز مسبقاً لتجنب الانتظار',
            'اختر وقتاً مناسباً لجميع أفراد الأسرة',
            'تأكد من توفرك في الموعد المحدد'
          ],
          requirements: [
            'رقم هاتف صحيح',
            'عنوان دقيق ومفصل',
            'تفاصيل الخدمة المطلوبة'
          ],
          whatToExpect: [
            'تأكيد فوري للحجز',
            'رسالة تذكير قبل الموعد',
            'معلومات الفني المختص',
            'رقم تتبع الخدمة'
          ]
        },
        {
          id: 'preparation',
          title: 'التحضير للخدمة',
          description: 'إعداد الموقع والأدوات المطلوبة',
          duration: '30-60 دقيقة',
          icon: Wrench,
          details: [
            'إخلاء المنطقة من الأثاث',
            'تأمين مصدر كهربائي مناسب',
            'إعداد مساحة للعمل',
            'فحص الأدوات والمعدات'
          ],
          tips: [
            'أخل المنطقة من الأثاث القابل للحركة',
            'تأكد من توفر مصدر كهربائي قريب',
            'احم الأثاث الثابت بغطاء بلاستيكي'
          ],
          requirements: [
            'مساحة عمل كافية',
            'مصدر كهربائي آمن',
            'إضاءة جيدة'
          ],
          whatToExpect: [
            'إعداد مساحة العمل',
            'فحص الأدوات والمعدات',
            'تأمين المنطقة للعمل',
            'بدء العمل بانتظام'
          ]
        },
        {
          id: 'execution',
          title: 'تنفيذ الخدمة',
          description: 'تنفيذ العمل باحترافية عالية',
          duration: '2-8 ساعات',
          icon: CheckCircle,
          details: [
            'تركيب النظام حسب المواصفات',
            'اختبار جميع الوظائف',
            'ضبط الإعدادات المثلى',
            'تنظيف المكان بعد العمل'
          ],
          tips: [
            'راقب العمل دون التدخل',
            'اسأل عن أي شيء غير واضح',
            'اطلب شرحاً للاستخدام'
          ],
          requirements: [
            'عدم التدخل في العمل',
            'توفير مساحة عمل كافية',
            'الاستجابة للأسئلة'
          ],
          whatToExpect: [
            'عمل احترافي ومنظم',
            'اختبارات شاملة للنظام',
            'شرح مفصل للاستخدام',
            'تنظيف كامل للمكان'
          ]
        },
        {
          id: 'testing',
          title: 'الاختبار والفحص',
          description: 'فحص شامل لضمان جودة العمل',
          duration: '30-60 دقيقة',
          icon: Shield,
          details: [
            'اختبار جميع الوظائف',
            'فحص التوصيلات الكهربائية',
            'قياس الأداء والكفاءة',
            'تسجيل النتائج'
          ],
          tips: [
            'راقب الاختبارات بعناية',
            'اسأل عن النتائج',
            'اطلب نسخة من التقرير'
          ],
          requirements: [
            'توفرك أثناء الاختبار',
            'الاستجابة للتعليمات',
            'التوقيع على التقرير'
          ],
          whatToExpect: [
            'اختبارات شاملة ومفصلة',
            'تقرير مفصل عن النتائج',
            'توصيات للصيانة المستقبلية',
            'ضمان على العمل'
          ]
        },
        {
          id: 'handover',
          title: 'التسليم والتوثيق',
          description: 'تسليم العمل مع جميع الوثائق',
          duration: '15-30 دقيقة',
          icon: Star,
          details: [
            'شرح مفصل للاستخدام',
            'تسليم الضمانات',
            'تسليم فواتير الدفع',
            'ترتيب مواعيد الصيانة'
          ],
          tips: [
            'احتفظ بجميع الوثائق',
            'سجل أرقام الطوارئ',
            'اطلب جدول الصيانة'
          ],
          requirements: [
            'دفع التكلفة المتفق عليها',
            'التوقيع على استلام العمل',
            'تأكيد البيانات الشخصية'
          ],
          whatToExpect: [
            'شرح مفصل للاستخدام',
            'وثائق الضمان',
            'فواتير الدفع',
            'معلومات الصيانة'
          ]
        }
      ],
      'plumbing-services': [
        {
          id: 'diagnosis',
          title: 'تشخيص المشكلة',
          description: 'فحص دقيق لتحديد سبب المشكلة',
          duration: '20-45 دقيقة',
          icon: Search,
          details: [
            'فحص شامل لأنظمة السباكة',
            'استخدام معدات الكشف المتطورة',
            'تحديد مصدر المشكلة بدقة',
            'تقييم حجم الضرر'
          ],
          tips: [
            'اشرح المشكلة بالتفصيل',
            'أخبر الفني عن أي محاولات سابقة للإصلاح',
            'احتفظ بصور للمشكلة إن وجدت'
          ],
          requirements: [
            'وصول كامل لأنظمة السباكة',
            'معلومات دقيقة عن المشكلة',
            'معرفة موقع المحابس الرئيسية'
          ],
          whatToExpect: [
            'فحص شامل ومفصل',
            'تشخيص دقيق للمشكلة',
            'تقرير مفصل عن الحالة',
            'خطة إصلاح واضحة'
          ]
        },
        {
          id: 'planning',
          title: 'التخطيط والحلول',
          description: 'وضع خطة عمل شاملة لحل المشكلة',
          duration: '15-30 دقيقة',
          icon: Calendar,
          details: [
            'تحليل المشكلة وتحديد الحلول',
            'اختيار أفضل المواد والأدوات',
            'تحديد الوقت المطلوب للإصلاح',
            'تقدير التكلفة النهائية'
          ],
          tips: [
            'اطلب شرحاً مفصلاً للحلول المقترحة',
            'اسأل عن البدائل المتاحة',
            'تأكد من فهم التكلفة'
          ],
          requirements: [
            'موافقة على خطة العمل',
            'تأكيد الميزانية المتاحة',
            'تحديد الأولويات'
          ],
          whatToExpect: [
            'خطة عمل واضحة ومفصلة',
            'تفسير للحلول المقترحة',
            'تقدير دقيق للتكلفة',
            'جدول زمني للعمل'
          ]
        },
        {
          id: 'execution',
          title: 'تنفيذ الإصلاح',
          description: 'تنفيذ الإصلاح باحترافية عالية',
          duration: '1-6 ساعات',
          icon: Wrench,
          details: [
            'إصلاح المشكلة حسب الخطة',
            'استخدام أفضل المواد المتاحة',
            'اختبار النظام بعد الإصلاح',
            'تنظيف المكان بعد العمل'
          ],
          tips: [
            'راقب العمل دون التدخل',
            'اسأل عن أي شيء غير واضح',
            'تأكد من جودة المواد المستخدمة'
          ],
          requirements: [
            'عدم التدخل في العمل',
            'توفير مساحة عمل كافية',
            'الاستجابة للأسئلة'
          ],
          whatToExpect: [
            'عمل احترافي ومنظم',
            'استخدام مواد عالية الجودة',
            'اختبارات شاملة بعد الإصلاح',
            'تنظيف كامل للمكان'
          ]
        },
        {
          id: 'testing',
          title: 'الاختبار والفحص',
          description: 'فحص شامل لضمان نجاح الإصلاح',
          duration: '20-40 دقيقة',
          icon: CheckCircle,
          details: [
            'اختبار جميع الوظائف',
            'فحص التوصيلات والوصلات',
            'قياس الضغط والأداء',
            'تسجيل النتائج'
          ],
          tips: [
            'راقب الاختبارات بعناية',
            'اسأل عن النتائج',
            'اطلب شرحاً للصيانة المستقبلية'
          ],
          requirements: [
            'توفرك أثناء الاختبار',
            'الاستجابة للتعليمات',
            'التوقيع على التقرير'
          ],
          whatToExpect: [
            'اختبارات شاملة ومفصلة',
            'تقرير مفصل عن النتائج',
            'توصيات للصيانة المستقبلية',
            'ضمان على العمل'
          ]
        }
      ]
    };

    return baseSteps[serviceType] || baseSteps['air-conditioning-hvac'];
  };

  const steps = getProcessSteps(serviceType);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-headline text-3xl font-bold mb-4">
          عملية مفصلة لخدمات {serviceName}
        </h2>
        <p className="text-foreground/70 max-w-3xl mx-auto">
          اكتشف كل خطوة في رحلة خدمتك من البداية إلى النهاية
        </p>
      </div>

      {/* Process Steps Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {steps.map((step, index) => (
          <Button
            key={step.id}
            variant={activeStep === index ? "default" : "outline"}
            onClick={() => setActiveStep(index)}
            className="flex items-center gap-2"
          >
            <step.icon className="h-4 w-4" />
            {step.title}
          </Button>
        ))}
      </div>

      {/* Active Step Content */}
      {steps[activeStep] && (() => {
        const currentStep = steps[activeStep];
        const Icon = currentStep.icon;
        return (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Icon className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">{currentStep.title}</CardTitle>
                <Badge variant="secondary">{currentStep.duration}</Badge>
              </div>
              <p className="text-foreground/70 text-lg">
                {currentStep.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Details */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  التفاصيل التقنية
                </h4>
                <ul className="space-y-2">
                  {currentStep.details.map((detail, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                      <span className="text-foreground/80">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  نصائح مهمة
                </h4>
                <ul className="space-y-2">
                  {currentStep.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                      <span className="text-foreground/80">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  المتطلبات
                </h4>
                <ul className="space-y-2">
                  {currentStep.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-600 mt-2 flex-shrink-0" />
                      <span className="text-foreground/80">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to Expect */}
              <div>
                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  ما يمكن توقعه
                </h4>
                <ul className="space-y-2">
                  {currentStep.whatToExpect.map((expectation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-600 mt-2 flex-shrink-0" />
                      <span className="text-foreground/80">{expectation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        );
      })()}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
        >
          السابق
        </Button>
        <Button
          onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
          disabled={activeStep === steps.length - 1}
        >
          التالي
        </Button>
      </div>
    </div>
  );
}