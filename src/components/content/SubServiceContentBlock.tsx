import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, Settings, Shield, AlertTriangle, Wrench, Clock } from 'lucide-react';

interface SubServiceContentBlockProps {
  subServiceName: string;
  serviceName: string;
  className?: string;
}

export function SubServiceContentBlock({ subServiceName, serviceName, className = '' }: SubServiceContentBlockProps) {
  return (
    <Card className={`mb-12 ${className}`}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">كل ما تحتاج معرفته عن {subServiceName}</CardTitle>
        <p className="text-muted-foreground">
          دليل شامل ومفصل لخدمات {subServiceName} في المملكة العربية السعودية
        </p>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          {/* Service Definition */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">تعريف الخدمة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              {subServiceName} هي خدمة متخصصة ضمن مجال {serviceName} تهدف إلى توفير حلول احترافية 
              ومتطورة لاحتياجات العملاء. تشمل هذه الخدمة مجموعة واسعة من العمليات التقنية المتخصصة 
              التي تتطلب خبرة فنية عالية ومعدات متطورة لضمان أفضل النتائج.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              تتميز خدمات {subServiceName} بدقتها العالية واتباعها لأحدث التقنيات والمعايير الدولية، 
              مما يجعلها الخيار الأمثل للعملاء الذين يبحثون عن جودة عالية ونتائج مضمونة في مجال {serviceName}.
            </p>
          </div>

          {/* Technical Process */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">العملية التقنية</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تتبع خدمات {subServiceName} عملية تقنية محكمة تبدأ بالتشخيص الدقيق للمشكلة أو الحاجة، 
              يليها التخطيط التفصيلي للعملية، ثم التنفيذ باستخدام أحدث المعدات والأدوات المتخصصة، 
              وأخيراً الاختبار والتحقق من جودة النتائج.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">المرحلة الأولى: التشخيص</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    فحص شامل للموقع
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    تحليل المتطلبات
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-500" />
                    تحديد الحلول المناسبة
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">المرحلة الثانية: التنفيذ</h4>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-green-500" />
                    استخدام معدات متطورة
                  </li>
                  <li className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-green-500" />
                    تطبيق المعايير الدولية
                  </li>
                  <li className="flex items-center gap-2">
                    <Wrench className="h-4 w-4 text-green-500" />
                    مراقبة الجودة المستمرة
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quality Standards */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">معايير الجودة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              نلتزم بأعلى معايير الجودة في تقديم خدمات {subServiceName}، حيث نتبع المعايير الدولية 
              والمواصفات السعودية المعتمدة. جميع عملياتنا تخضع لمراقبة جودة مستمرة لضمان تحقيق 
              أفضل النتائج ورضا العملاء.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 border rounded-lg">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">معايير دولية</h4>
                <p className="text-xs text-muted-foreground">ISO 9001</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">شهادات معتمدة</h4>
                <p className="text-xs text-muted-foreground">فنيون مؤهلون</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Settings className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">معدات متطورة</h4>
                <p className="text-xs text-muted-foreground">أحدث التقنيات</p>
              </div>
            </div>
          </div>

          {/* Common Issues */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">المشاكل الشائعة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              من خلال خبرتنا الطويلة في مجال {subServiceName}، نجد أن العملاء يواجهون عدة مشاكل شائعة 
              يمكن تجنبها من خلال الاختيار الصحيح لمقدم الخدمة واتباع الإرشادات المناسبة.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">عدم وجود ضمان</h4>
                  <p className="text-xs text-muted-foreground">اختر الشركات التي تقدم ضمان شامل على الخدمة</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">استخدام معدات قديمة</h4>
                  <p className="text-xs text-muted-foreground">تأكد من استخدام أحدث المعدات والتقنيات</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance Tips */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">نصائح الصيانة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              للحفاظ على جودة خدمات {subServiceName} وضمان استمراريتها، ننصح باتباع برنامج صيانة دوري 
              منتظم والاعتماد على فنيين متخصصين للصيانة الوقائية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">الصيانة الدورية:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    فحص شهري شامل
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    تنظيف دوري
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    استبدال القطع التالفة
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">العلامات التحذيرية:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    أصوات غير طبيعية
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    انخفاض في الأداء
                  </li>
                  <li className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    استهلاك طاقة عالي
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}