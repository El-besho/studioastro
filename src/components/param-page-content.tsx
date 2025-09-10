
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import {
  Check,
  ArrowLeft,
  Clock,
  Wrench,
  ShieldCheck,
  MapPin,
  Users,
  Star,
  Wallet,
  Building,
  Home,
  Briefcase,
  FileText,
  MessageSquare,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { CityList } from './city-list';
import { LeadForm } from './lead-form';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ServiceHierarchy, CityProfile, SubService } from '../types/services';
import { getAllCities, getAllServices } from '../lib/services';
import { SubServiceSchema } from './semantic/sub-service-schema';
import { ServiceLocationSchema } from './semantic/service-location-schema';
import { TrendingQueries } from './trending-queries';
import { CategorizedQueries } from '../types/queries';
import { ServiceCard } from './service-card';


// --- SubServicePage Component Definition ---

interface SubServicePageProps {
  service: ServiceHierarchy & { slug: string };
  subService: SubService;
  trendingQueries: CategorizedQueries;
}

function SubServicePage({ service, subService, trendingQueries }: SubServicePageProps) {
  const cities = getAllCities();

  const urgencyMap: { [key: string]: string } = {
    emergency: 'طوارئ',
    urgent: 'عاجل',
    scheduled: 'غير عاجل',
    maintenance: 'صيانة دورية',
    consultation: 'استشارة',
  };
  
  const skillsMap: { [key: string]: string } = {
      hvac_certified: 'فني تكييف معتمد',
      licensed_plumber: 'سباك معتمد',
      master_electrician: 'كهربائي رئيسي',
      professional_cleaner: 'عامل نظافة محترف',
      // Add other skills as needed
  }

  const toolsMap: { [key: string]: string } = {
      drill: 'مثقاب',
      freon_gauge: 'مقياس الفريون',
      // Add other tools as needed
  }

  const features = [
    {
      icon: Wallet,
      label: 'متوسط السعر',
      value: `${subService.avg_price_range[0]} - ${subService.avg_price_range[1]}`,
      isPrice: true,
    },
    {
      icon: Clock,
      label: 'مستوى الاستعجال',
      value: urgencyMap[subService.urgency] || subService.urgency,
      isPrice: false,
    },
    {
      icon: ShieldCheck,
      label: 'المهارات المطلوبة',
      value: subService.skill_requirements.map(skill => skillsMap[skill] || skill).join(', '),
      isPrice: false,
    },
    {
      icon: Wrench,
      label: 'الأدوات المستخدمة',
      value: subService.tools_required.map(tool => toolsMap[tool] || tool).join(', '),
      isPrice: false,
    },
  ];

  const processSteps = [
      { title: "اطلب الخدمة", description: "املأ النموذج أعلاه لتحديد احتياجاتك بدقة." },
      { title: "استلم عرض السعر", description: "سنقوم بتوصيلك بمحترف معتمد وسنقدم لك عرض سعر واضح ومفصل." },
      { title: "تأكيد الموعد", description: "اختر الوقت الذي يناسبك بكل سهولة لإنجاز الخدمة." },
      { title: "إنجاز العمل", description: "سيصل الفني في الموعد المحدد لإكمال العمل بجودة عالية واحترافية." }
  ]

  return (
    <>
    <SubServiceSchema service={service} subService={subService} />
    <main className="container py-12 md:py-24 text-right">
       <div className="mb-4">
        <Button variant="ghost" asChild>
          <Link href={`/services/${service.slug}`}>
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة إلى {service.ar_name}
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <Badge variant="outline" className="mb-2 font-semibold">
            {service.ar_name}
          </Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            {subService.ar_name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {subService.seo?.summary ||
              `نقدم خدمة ${subService.ar_name} المتخصصة لضمان أفضل النتائج.`}
          </p>

          <Card className="mt-8 bg-muted/30">
            <CardHeader>
              <CardTitle>تفاصيل الخدمة</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-background border text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.label}</h3>
                    <p className="text-sm text-muted-foreground">
                       {feature.isPrice ? (
                        <span className="flex items-center gap-1" dir="ltr">
                          <span>{feature.value}</span>
                          <span className="icon-saudi_riyal ml-1">&#xea;</span>
                        </span>
                      ) : (
                        feature.value
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
           <section id="process" className="mt-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-8">ماذا تتوقع من الخدمة</h2>
                <div className="prose prose-lg dark:prose-invert max-w-full">
                    <ol className="timeline">
                        {processSteps.map((step, index) => (
                            <li key={index} data-step={index+1}>
                                <h3 className="font-bold text-lg font-headline m-0">{step.title}</h3>
                                <p className="text-muted-foreground">{step.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
           </section>

            {subService.seo.faq && subService.seo.faq.length > 0 && (
              <section id="faq" className="mt-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">الأسئلة الشائعة</h2>
                <Accordion type="single" collapsible className="w-full">
                  {subService.seo.faq.map((faqItem, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-right text-lg">{faqItem.question}</AccordionTrigger>
                      <AccordionContent className="text-right text-base text-muted-foreground">
                        {faqItem.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}
            
            <div className="mt-12">
              <TrendingQueries queries={trendingQueries} title={`الاستعلامات المتعلقة بـ ${subService.ar_name}`} />
            </div>

            <section id="service-in-cities" className="mt-12">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">اطلب خدمة {subService.ar_name} في مدينتك</h2>
                 <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-xl">متوفر في جميع أنحاء المملكة</CardTitle>
                        <CardDescription>
                            اختر مدينتك لعرض التفاصيل وطلب الخدمة مباشرة.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                       <CityList
                          cities={cities}
                          service={service}
                          subService={subService}
                        />
                    </CardContent>
                 </Card>
            </section>

        </div>

        <aside className="md:col-span-1 sticky top-24 self-start">
          <LeadForm serviceName={subService.ar_name} />
        </aside>
      </div>
    </main>
    </>
  );
}


// --- ServiceLocationPage Component Definition ---

interface ServiceLocationPageProps {
  service: ServiceHierarchy & { slug: string };
  city: CityProfile;
  trendingQueries: CategorizedQueries;
}

const processSteps = [
    { icon: MessageSquare, title: "اطلب الخدمة", description: "املأ النموذج وحدد احتياجاتك." },
    { icon: FileText, title: "استلم العروض", description: "قارن بين أفضل عروض الأسعار." },
    { icon: Calendar, title: "اختر الموعد", description: "اختر الوقت الذي يناسبك." },
    { icon: CheckCircle, title: "إنجاز العمل", description: "استمتع بخدمة عالية الجودة." }
];

const propertyTypes = [
  { name: 'المنازل والفلل', icon: Home },
  { name: 'المكاتب والشركات', icon: Building },
  { name: 'المباني التجارية', icon: Briefcase },
];

const whyChooseUsFeatures = [
    {
        icon: Star,
        title: "جودة عالية",
        description: "نضمن لك أفضل جودة للخدمة من خلال شبكة من الفنيين المعتمدين والمهرة."
    },
    {
        icon: ShieldCheck,
        title: "موثوقية وأمان",
        description: "جميع مزودي الخدمة لدينا مدققون ومؤمنون لضمان أعلى جودة وأمان."
    },
    {
        icon: Users,
        title: "خدمة عملاء ممتازة",
        description: "فريقنا متاح لمساعدتك في كل خطوة، من الحجز إلى إتمام الخدمة."
    },
    {
        icon: Clock,
        title: "التزام بالمواعيد",
        description: "نحن نقدر وقتك. يلتزم المحترفون لدينا بالوصول في الموعد المحدد."
    }
];

function ServiceLocationPage({ service, city, trendingQueries }: ServiceLocationPageProps) {
  const allServices = getAllServices();
  const relatedServices = allServices.filter(s => s.category === service.category && s.id !== service.id).slice(0, 4);

  const getPageTitle = () => {
    if (service.id === 'cleaning-services') {
      return `شركة تنظيف في ${city.ar_name}`;
    }
    return `${service.ar_name} في ${city.ar_name}`;
  }

  const getPageDescription = () => {
    if (service.id === 'cleaning-services') {
        return `أفضل شركة تنظيف في ${city.ar_name}. نقدم خدمات تنظيف منازل، شقق، وفلل، بالإضافة إلى غسيل كنب وسجاد. احصل على عرض سعر مجاني من أفضل شركات النظافة في ${city.ar_name}.`;
    }
    return `نقدم مجموعة شاملة من خدمات ${service.ar_name} في مدينة ${city.ar_name} لتلبية جميع احتياجاتك. سواء كنت تبحث عن تركيب، صيانة، أو إصلاحات طارئة، فإننا نوصلك بأفضل مزودي الخدمة المعتمدين.`;
  }

  return (
    <>
    <ServiceLocationSchema service={service} city={city} />
    <main className="container py-12 md:py-24 text-right">
      <div className="mb-4">
        <Button variant="ghost" asChild>
          <Link href={`/services/${service.slug}`}>
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة إلى {service.ar_name}
          </Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            {getPageTitle()}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {getPageDescription()}
          </p>

          <Card className="mt-8 bg-muted/30">
            <CardHeader>
              <CardTitle>الخدمات الفرعية المتاحة في {city.ar_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {service.sub_services.map((sub) => (
                  <li key={sub.id} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <Link
                      href={`/services/${service.slug}/${sub.slug}`}
                      className="hover:underline"
                    >
                      {sub.ar_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
            <section id="process" className="mt-12">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter mb-8">{`خطوات طلب الخدمة في ${city.ar_name}`}</h2>
                 <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {processSteps.map(step => (
                        <Card key={step.title} className="bg-muted/30 border-0 text-center">
                            <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                                <div className="flex justify-center mb-4">
                                  <div className="flex items-center justify-center rounded-full bg-background border h-16 w-16 text-primary">
                                    <step.icon className="w-8 h-8" />
                                  </div>
                                </div>
                                <h3 className="font-headline font-bold text-base">{step.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </section>
            
            <section id="pricing" className="mt-12">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">{`أسعار ${service.ar_name} في ${city.ar_name}`}</h2>
                  <Card className="bg-muted/30">
                    <CardHeader>
                        <CardTitle className="text-xl">أسعار شفافة وتنافسية</CardTitle>
                        <CardDescription>
                            نحن نؤمن بالشفافية الكاملة. تعتمد أسعارنا على حجم العمل ونوع الخدمة المطلوبة. املأ النموذج للحصول على عرض سعر مجاني ومفصل بدون أي التزامات.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>لا توجد رسوم خفية.</span></li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>عروض أسعار مجانية ومفصلة.</span></li>
                            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>خيارات متعددة تناسب ميزانيتك.</span></li>
                        </ul>
                    </CardContent>
                  </Card>
            </section>

             <section id="property-types" className="mt-12">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">نخدم جميع أنواع العقارات</h2>
                 <div className="grid sm:grid-cols-3 gap-6">
                    {propertyTypes.map(type => (
                        <Card key={type.name} className="bg-muted/30 border-0">
                            <CardContent className="pt-6 flex flex-col items-center text-center gap-2">
                                <type.icon className="w-8 h-8 text-primary" />
                                <h3 className="font-headline font-semibold">{type.name}</h3>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </section>


            <section id="why-choose-us" className="mt-12">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">{`لماذا تختار خدماتنا في ${city.ar_name}؟`}</h2>
                 <div className="grid sm:grid-cols-2 gap-6">
                    {whyChooseUsFeatures.map(feature => (
                        <Card key={feature.title} className="bg-muted/30 border-0">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <feature.icon className="w-8 h-8 text-primary" />
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            </section>

            <section id="districts" className="mt-12">
                 <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">{`نغطي جميع أحياء ${city.ar_name}`}</h2>
                 <Card className="bg-muted/30">
                    <CardContent className="pt-6">
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2">
                        {city.key_districts.map((district) => (
                          <li key={district.en} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{district.ar}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                 </Card>
            </section>


             {service.seo.faq && service.seo.faq.length > 0 && (
              <section id="faq" className="mt-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">{`أسئلة شائعة حول ${service.ar_name}`}</h2>
                <Accordion type="single" collapsible className="w-full">
                  {service.seo.faq.map((faqItem, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-right text-lg">{faqItem.question}</AccordionTrigger>
                      <AccordionContent className="text-right text-base text-muted-foreground">
                        {faqItem.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}

            <div className="mt-12">
              <TrendingQueries queries={trendingQueries} title={`الاستعلامات الأكثر بحثاً عن ${service.ar_name} في ${city.ar_name}`} />
            </div>
            
            {relatedServices.length > 0 && (
              <section id="related-services" className="mt-12">
                <h2 className="font-headline text-3xl font-bold tracking-tighter mb-6">{`خدمات أخرى في ${city.ar_name}`}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {relatedServices.map(related => (
                    <ServiceCard key={related.id} service={related} city={city} showSubServices={false} />
                  ))}
                </div>
              </section>
            )}

        </div>
        <aside className="md:col-span-1 sticky top-24 self-start">
          <LeadForm serviceName={service.ar_name} cityName={city.ar_name} />
        </aside>
      </div>
    </main>
    </>
  );
}

interface ParamPageContentProps {
    pageType: 'city' | 'subService';
    service: ServiceHierarchy & { slug: string };
    city: CityProfile | null;
    subService: SubService | null;
    trendingQueries: CategorizedQueries;
}

export function ParamPageContent({ pageType, service, city, subService, trendingQueries }: ParamPageContentProps) {
    if (pageType === 'city' && city) {
        return <ServiceLocationPage service={service} city={city} trendingQueries={trendingQueries} />;
    }

    if (pageType === 'subService' && subService) {
        return <SubServicePage service={service} subService={subService} trendingQueries={trendingQueries} />;
    }
    
    return <div>حدث خطأ ما.</div>;
}
