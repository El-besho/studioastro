'use client';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  MapPin, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  Cloud,
  Building,
  Users,
  Award,
  Clock
} from 'lucide-react';

interface LocalExpertiseProps {
  city: string;
  serviceType: string;
}

export function LocalExpertise({ city, serviceType }: LocalExpertiseProps) {
  const getCityData = (cityName: string) => {
    const cityData: Record<string, any> = {
      'riyadh': {
        name: 'الرياض',
        climate: {
          temperature: '15°م - 45°م',
          humidity: '20% - 60%',
          description: 'مناخ صحراوي قاري مع صيف حار وشتاء معتدل'
        },
        challenges: [
          'درجات حرارة عالية تصل إلى 45°م في الصيف',
          'تقلبات حرارية كبيرة بين النهار والليل',
          'عواصف رملية متكررة تؤثر على أنظمة التكييف',
          'كثافة المباني العالية تتطلب أنظمة متطورة'
        ],
        solutions: [
          'أنظمة تكييف مقاومة للغبار والرمل',
          'عزل حراري متقدم لتقليل استهلاك الطاقة',
          'أنظمة VRF للكفاءة العالية',
          'صيانة دورية مكثفة خلال موسم الصيف'
        ],
        statistics: {
          population: '8.2 مليون نسمة',
          area: '1,973 كم²',
          districts: '15 حي رئيسي',
          growth: 'نمو سكاني 3.2% سنوياً'
        },
        localInsights: [
          'الرياض مركز الأعمال الرئيسي في المملكة',
          'كثافة المباني التجارية والسكنية العالية',
          'طلب متزايد على أنظمة التكييف المركزية',
          'اهتمام كبير بكفاءة الطاقة وتقليل التكاليف'
        ]
      },
      'jeddah': {
        name: 'جدة',
        climate: {
          temperature: '20°م - 40°م',
          humidity: '60% - 85%',
          description: 'مناخ استوائي رطب مع رطوبة عالية على مدار السنة'
        },
        challenges: [
          'رطوبة عالية تصل إلى 85% في الصيف',
          'قرب البحر الأحمر يؤثر على معدات التكييف',
          'ملوحة الهواء تسبب تآكل المعدات',
          'حاجة لأنظمة مقاومة للرطوبة'
        ],
        solutions: [
          'أنظمة تكييف مقاومة للملوحة والرطوبة',
          'مواد عالية الجودة مقاومة للتآكل',
          'أنظمة إزالة الرطوبة المتطورة',
          'صيانة دورية مكثفة للوقاية من التآكل'
        ],
        statistics: {
          population: '4.9 مليون نسمة',
          area: '5,460 كم²',
          districts: '12 حي رئيسي',
          growth: 'نمو سكاني 2.8% سنوياً'
        },
        localInsights: [
          'جدة بوابة المملكة البحرية الرئيسية',
          'مزيج من المباني التاريخية والحديثة',
          'طلب متزايد على أنظمة التكييف للمباني الساحلية',
          'اهتمام خاص بجودة الهواء الداخلي'
        ]
      },
      'makkah': {
        name: 'مكة المكرمة',
        climate: {
          temperature: '18°م - 42°م',
          humidity: '30% - 70%',
          description: 'مناخ صحراوي حار مع تدفق هائل من الحجاج والمعتمرين'
        },
        challenges: [
          'تقلبات حرارية كبيرة بين الفصول',
          'كثافة سكانية عالية خلال مواسم الحج',
          'حاجة لأنظمة تكييف قوية وموثوقة',
          'ضغط عالي على البنية التحتية'
        ],
        solutions: [
          'أنظمة تكييف متطورة للمباني الكبيرة',
          'أنظمة إدارة الطاقة الذكية',
          'صيانة وقائية مكثفة',
          'أنظمة احتياطية للطوارئ'
        ],
        statistics: {
          population: '2.4 مليون نسمة',
          area: '1,200 كم²',
          districts: '8 أحياء رئيسية',
          growth: 'نمو سكاني 4.1% سنوياً'
        },
        localInsights: [
          'مكة المكرمة قبلة المسلمين في العالم',
          'تدفق ملايين الحجاج والمعتمرين سنوياً',
          'حاجة لأنظمة تكييف متطورة للمسجد الحرام',
          'اهتمام خاص بالراحة والاستدامة'
        ]
      },
      'medina': {
        name: 'المدينة المنورة',
        climate: {
          temperature: '12°م - 38°م',
          humidity: '25% - 65%',
          description: 'مناخ صحراوي جاف مع تربة بركانية فريدة'
        },
        challenges: [
          'تربة بركانية تؤثر على أساسات المباني',
          'تقلبات حرارية كبيرة',
          'حاجة لأنظمة تكييف مقاومة للظروف الصحراوية',
          'كثافة سكانية عالية خلال مواسم الحج'
        ],
        solutions: [
          'أنظمة تكييف متخصصة للتربة البركانية',
          'عزل حراري متقدم',
          'أنظمة مقاومة للعواصف الرملية',
          'صيانة دورية مكثفة'
        ],
        statistics: {
          population: '1.5 مليون نسمة',
          area: '589 كم²',
          districts: '6 أحياء رئيسية',
          growth: 'نمو سكاني 3.5% سنوياً'
        },
        localInsights: [
          'المدينة المنورة ثاني أقدس الأماكن في الإسلام',
          'مزيج من التاريخ والحداثة',
          'حاجة لأنظمة تكييف للمسجد النبوي',
          'اهتمام خاص بالاستدامة والبيئة'
        ]
      },
      'dammam': {
        name: 'الدمام',
        climate: {
          temperature: '15°م - 42°م',
          humidity: '40% - 75%',
          description: 'مناخ صحراوي مع رطوبة معتدلة وقرب من الخليج العربي'
        },
        challenges: [
          'قرب الخليج العربي يؤثر على جودة المياه',
          'رطوبة معتدلة تتطلب أنظمة متخصصة',
          'كثافة المباني الصناعية والتجارية',
          'حاجة لأنظمة مقاومة للملوحة'
        ],
        solutions: [
          'أنظمة تكييف مقاومة للملوحة',
          'أنظمة معالجة المياه المتطورة',
          'مواد عالية الجودة مقاومة للتآكل',
          'صيانة دورية مكثفة'
        ],
        statistics: {
          population: '1.5 مليون نسمة',
          area: '800 كم²',
          districts: '10 أحياء رئيسية',
          growth: 'نمو سكاني 2.9% سنوياً'
        },
        localInsights: [
          'الدمام مركز صناعي مهم في المنطقة الشرقية',
          'مزيج من المباني الصناعية والسكنية',
          'طلب متزايد على أنظمة التكييف للمصانع',
          'اهتمام خاص بكفاءة الطاقة'
        ]
      }
    };

    return cityData[cityName] || cityData['riyadh'];
  };

  const cityData = getCityData(city);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-headline text-3xl font-bold mb-4">
          الخبرة المحلية في {cityData.name}
        </h2>
        <p className="text-foreground/70 max-w-3xl mx-auto">
          اكتشف كيف نستخدم معرفتنا المحلية العميقة لتقديم أفضل الخدمات في {cityData.name}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Climate Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Thermometer className="h-5 w-5 text-blue-600" />
              المناخ المحلي
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-orange-500" />
              <span className="text-sm">درجة الحرارة: {cityData.climate.temperature}</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm">الرطوبة: {cityData.climate.humidity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{cityData.climate.description}</span>
            </div>
          </CardContent>
        </Card>

        {/* City Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-green-600" />
              إحصائيات المدينة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm">عدد السكان: {cityData.statistics.population}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-green-500" />
              <span className="text-sm">المساحة: {cityData.statistics.area}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-purple-500" />
              <span className="text-sm">الأحياء: {cityData.statistics.districts}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span className="text-sm">النمو: {cityData.statistics.growth}</span>
            </div>
          </CardContent>
        </Card>

        {/* Local Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-red-600" />
              التحديات المحلية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {cityData.challenges.map((challenge, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{challenge}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Our Solutions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-green-600" />
              حلولنا المتخصصة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {cityData.solutions.map((solution, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{solution}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Local Insights */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              رؤى محلية فريدة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {cityData.localInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground/80">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Local Success Stories */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            قصص نجاح محلية في {cityData.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">مشاريع بارزة</h4>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• مشروع فندق 5 نجوم: توفير 40% في استهلاك الطاقة</li>
                <li>• مبنى سكني كبير: حل مشكلة الرطوبة بنجاح</li>
                <li>• مجمع تجاري: تركيب أنظمة VRF متطورة</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-lg">إنجازات محلية</h4>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• أكثر من 1000 مشروع مكتمل</li>
                <li>• معدل رضا العملاء 98%</li>
                <li>• توفير 30% في التكاليف التشغيلية</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}