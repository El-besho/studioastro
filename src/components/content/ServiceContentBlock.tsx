import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { CheckCircle, TrendingUp, Shield, Wrench, AlertTriangle, Lightbulb } from 'lucide-react';

interface ServiceContentBlockProps {
  serviceName: string;
  serviceCategory: string;
  className?: string;
}

export function ServiceContentBlock({ serviceName, serviceCategory, className = '' }: ServiceContentBlockProps) {
  return (
    <Card className={`mb-12 ${className}`}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">دليل شامل لخدمات {serviceName}</CardTitle>
        <p className="text-muted-foreground">
          اكتشف كل ما تحتاج معرفته عن {serviceName} في المملكة العربية السعودية
        </p>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          {/* Industry Overview */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">نظرة عامة على الصناعة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تعد {serviceName} من أهم القطاعات في المملكة العربية السعودية، حيث يشهد هذا القطاع نمواً مستمراً 
              مع تطور المدن وزيادة الطلب على الخدمات المنزلية المتخصصة. يقدر حجم السوق بأكثر من 15 مليار ريال 
              سنوياً، مع معدل نمو سنوي يبلغ 8%، مما يجعلها واحدة من أسرع القطاعات نمواً في المملكة.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              مع التطور العمراني الكبير في المدن السعودية الرئيسية مثل الرياض وجدة والدمام، أصبحت الحاجة 
              لخدمات {serviceName} المتخصصة أكثر إلحاحاً. هذا التطور دفع الشركات المحلية والدولية للاستثمار 
              في هذا القطاع، مما أدى إلى رفع معايير الجودة وتنويع الخدمات المقدمة.
            </p>
          </div>

          {/* Service Categories */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">فئات الخدمات المتاحة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              نقدم مجموعة شاملة من خدمات {serviceName} التي تغطي جميع احتياجات العملاء، من الخدمات الأساسية 
              إلى الخدمات المتخصصة والفاخرة. تشمل خدماتنا الصيانة الوقائية والطارئة، والتركيب والتشغيل، 
              والاستشارات الفنية، وخدمات ما بعد البيع.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">الخدمات الأساسية:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    الصيانة الدورية والوقائية
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    الإصلاحات الطارئة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    الاستبدال والتحديث
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">الخدمات المتخصصة:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    التركيب الاحترافي
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    التصميم والاستشارات
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    الخدمات الفاخرة
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Standards */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">المعايير التقنية والجودة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              نلتزم بأعلى المعايير الدولية في تقديم خدمات {serviceName}، حيث نتبع معايير الجودة العالمية 
              مثل ISO 9001 ومعايير السلامة المهنية. جميع فنيينا معتمدون من الجهات الرسمية ويحملون شهادات 
              مهنية متخصصة في مجال {serviceName}.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary">ISO 9001</Badge>
              <Badge variant="secondary">معايير السلامة المهنية</Badge>
              <Badge variant="secondary">شهادات فنية معتمدة</Badge>
              <Badge variant="secondary">ضمان الجودة</Badge>
            </div>
          </div>

          {/* Common Challenges */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">التحديات الشائعة</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              يواجه العملاء العديد من التحديات عند البحث عن خدمات {serviceName} موثوقة، منها عدم وجود 
              معايير موحدة للجودة، واختلاف الأسعار بشكل كبير، وصعوبة العثور على فنيين مؤهلين. نحن نعمل 
              على حل هذه التحديات من خلال ضمان الجودة والشفافية في التسعير والاعتماد على فنيين معتمدين فقط.
            </p>
          </div>

          {/* Best Practices */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">أفضل الممارسات</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              للحصول على أفضل النتائج من خدمات {serviceName}، ننصح بالصيانة الدورية المنتظمة، والاعتماد 
              على الشركات المعتمدة، وطلب عروض أسعار متعددة للمقارنة، والتأكد من وجود ضمان على الخدمة. 
              كما ننصح بالتوثيق الجيد لجميع الخدمات المقدمة للحفاظ على سجل شامل.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}