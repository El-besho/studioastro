import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { MapPin, TrendingUp, Users, Building, Shield, Calendar, Star, CheckCircle } from 'lucide-react';

interface LocationContentBlockProps {
  cityName: string;
  cityData: any;
  className?: string;
}

export function LocationContentBlock({ cityName, cityData, className = '' }: LocationContentBlockProps) {
  const getEconomicLevelText = (level: string) => {
    const levels = {
      'very_high': 'مرتفع جداً',
      'high': 'مرتفع',
      'medium': 'متوسط',
      'low': 'منخفض'
    };
    return levels[level] || 'متوسط';
  };

  const getClimateText = (climate: string) => {
    const climates = {
      'hot_desert': 'صحراوي حار',
      'hot_arid': 'جاف حار',
      'mild_desert': 'صحراوي معتدل',
      'mountain': 'جبلي'
    };
    return climates[climate] || 'صحراوي حار';
  };

  return (
    <Card className={`mb-12 ${className}`}>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">دليل شامل للخدمات المنزلية في {cityName}</CardTitle>
        <p className="text-muted-foreground">
          اكتشف كل ما تحتاج معرفته عن الخدمات المنزلية في {cityName} والسوق المحلي
        </p>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg max-w-none">
          {/* City Overview */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">نظرة عامة على {cityName}</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تعد {cityName} واحدة من أهم المدن في المملكة العربية السعودية، حيث تتميز بموقعها الاستراتيجي 
              واقتصادها المتنوع وبنيتها التحتية المتطورة. مع عدد سكان يبلغ {cityData.population.toLocaleString()} نسمة، 
              تشكل {cityName} مركزاً حيوياً للخدمات المنزلية والمهنية في المنطقة.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تتميز {cityName} بمستوى اقتصادي {getEconomicLevelText(cityData.economic_level)} ومناخ {getClimateText(cityData.climate)}، 
              مما يؤثر بشكل مباشر على طبيعة الخدمات المطلوبة وأسعارها. هذا التنوع الاقتصادي والمناخي 
              يجعل من {cityName} سوقاً غنياً ومتنوعاً للخدمات المنزلية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{cityData.population.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">نسمة</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{getEconomicLevelText(cityData.economic_level)}</div>
                <p className="text-sm text-muted-foreground">المستوى الاقتصادي</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Building className="h-8 w-8 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{cityData.key_districts.length}</div>
                <p className="text-sm text-muted-foreground">منطقة رئيسية</p>
              </div>
            </div>
          </div>

          {/* Service Market Analysis */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">تحليل سوق الخدمات المحلي</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              يشهد سوق الخدمات المنزلية في {cityName} نمواً مستمراً ومطرداً، حيث يقدر حجم السوق المحلي 
              بأكثر من 2 مليار ريال سنوياً. هذا النمو مدفوع بالتطور العمراني السريع وزيادة الطلب على 
              الخدمات المتخصصة من قبل السكان والشركات على حد سواء.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تتميز {cityName} بتنوع كبير في طبيعة الخدمات المطلوبة، حيث تختلف احتياجات المناطق السكنية 
              عن المناطق التجارية والصناعية. هذا التنوع يوفر فرصاً كبيرة لمقدمي الخدمات المتخصصين 
              ويضمن استقرار السوق على مدار العام.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">الخدمات الأكثر طلباً:</h4>
                {Object.entries(cityData.service_demand_multipliers)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 4)
                  .map(([service, multiplier]) => (
                    <div key={service} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                      <span className="text-sm">
                        {service === 'air-conditioning' ? 'صيانة مكيفات' : 
                         service === 'luxury' ? 'خدمات فاخرة' : 
                         service === 'it-tech-services' ? 'خدمات تقنية' : service}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {multiplier}x
                      </Badge>
                    </div>
                  ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">المناطق الرئيسية:</h4>
                {cityData.key_districts.slice(0, 4).map((district: any, index: number) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">{district.ar}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Services */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">الخدمات الأكثر شعبية</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تختلف الخدمات الأكثر طلباً في {cityName} حسب الموسم والمنطقة، حيث تشهد خدمات التكييف 
              والتبريد ذروة الطلب خلال فصل الصيف، بينما تزداد الحاجة لخدمات التدفئة والعزل خلال فصل الشتاء. 
              كما تشهد خدمات التنظيف والصيانة طلباً مستقراً على مدار العام.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">الخدمات الموسمية:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-500" />
                    صيانة مكيفات (الصيف)
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    خدمات التدفئة (الشتاء)
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    تنظيف عميق (رمضان)
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">الخدمات المستمرة:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    الصيانة الدورية
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    الإصلاحات الطارئة
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    خدمات التنظيف
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Local Regulations */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">اللوائح المحلية</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تخضع جميع الخدمات المنزلية في {cityName} للوائح والأنظمة المحلية المعمول بها في المملكة 
              العربية السعودية. تشمل هذه اللوائح متطلبات الترخيص والتصريح، ومعايير السلامة، 
              والمواصفات الفنية المطلوبة لمختلف أنواع الخدمات.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">متطلبات الترخيص:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    ترخيص تجاري ساري
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    شهادات فنية معتمدة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    تأمين مسؤولية مدنية
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">معايير السلامة:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    معدات السلامة المطلوبة
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    تدريب العمالة
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-500" />
                    معايير البيئة
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Quality Standards */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">معايير جودة الخدمات</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              تتميز {cityName} بمعايير جودة عالية للخدمات المنزلية، حيث يتوقع العملاء مستوى عالٍ من 
              الاحترافية والجودة. نلتزم بتقديم خدمات تتوافق مع هذه المعايير المحلية والدولية، 
              مما يضمن رضا العملاء وثقتهم في خدماتنا.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 border rounded-lg">
                <Star className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">جودة عالية</h4>
                <p className="text-xs text-muted-foreground">معايير دولية</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">فنيون معتمدون</h4>
                <p className="text-xs text-muted-foreground">خبرة واسعة</p>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                <h4 className="font-semibold text-sm">ضمان شامل</h4>
                <p className="text-xs text-muted-foreground">حماية العملاء</p>
              </div>
            </div>
          </div>

          {/* Customer Preferences */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="font-headline text-xl font-semibold">توجهات العملاء المحليين</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed mb-4">
              يتميز عملاء {cityName} بوعي عالي بجودة الخدمات وأهمية الحصول على أفضل النتائج. 
              يفضل العملاء المحليون الشركات الموثوقة والمعتمدة، كما يهتمون بالحصول على ضمانات 
              شاملة وخدمة عملاء متميزة.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">الأولويات:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    الجودة والاحترافية
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    الشفافية في التسعير
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    خدمة عملاء متميزة
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">التوقعات:</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    ضمانات شاملة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    استجابة سريعة
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    أسعار تنافسية
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