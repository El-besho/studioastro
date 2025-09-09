
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  CheckCircle,
  FileText,
  Hammer,
  MapPin,
  Search,
  Star,
  ShieldCheck,
  Users,
  MessageSquare,
} from 'lucide-react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ServiceGrid } from '@/components/service-grid';
import { getAllServices } from '@/lib/services';

const allServices = getAllServices();
const essentialServices = allServices.filter(s => (s.category === 'essential' || s.category === 'emergency') && s.priority === 1).slice(0, 5);

const testimonials = [
  {
    quote:
      'كان فني التكييف سريعًا ومحترفًا. أعاد مكيفي للعمل في وقت قياسي خلال موجة الحر. خدمة ممتازة من إنقاذ!',
    name: 'أحمد الغامدي',
    location: 'الرياض، المملكة العربية السعودية',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    quote:
      'لقد استخدمت خدماتهم لإصلاح تسريب مياه طارئ. وصل السباك بسرعة وقام بعمل رائع. موثوقون للغاية.',
    name: 'فاطمة الزهراني',
    location: 'جدة، المملكة العربية السعودية',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    quote:
      'أفضل خدمة تنظيف عميق حصلت عليها على الإطلاق. عاد منزلي جديدًا مرة أخرى. الفريق كان دقيقًا وفعالًا.',
    name: 'خالد المطيري',
    location: 'الدمام، المملكة العربية السعودية',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    quote:
      'من عرض الأسعار إلى الانتهاء، تم التعامل مع كل شيء باحتراف. قام الدهانون بعمل رائع. سأستخدم إنقاذ بالتأكيد مرة أخرى.',
    name: 'نورة العتيبي',
    location: 'أبها، المملكة العربية السعودية',
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
];

const howItWorksSteps = [
    {
        icon: MessageSquare,
        title: "اطلب الخدمة",
        description: "حدد الخدمة التي تحتاجها وموقعك. كلما زادت التفاصيل التي تقدمها، كانت العروض التي تحصل عليها أفضل."
    },
    {
        icon: FileText,
        title: "استلم العروض",
        description: "في غضون دقائق، ستبدأ في تلقي عروض أسعار تنافسية من محترفين معتمدين ومتاحين في منطقتك."
    },
    {
        icon: CheckCircle,
        title: "اختر الأفضل",
        description: "قارن بين عروض الأسعار، واقرأ تقييمات العملاء السابقين، واختر المحترف الذي يناسب احتياجاتك وميزانيتك."
    }
]

const stats = [
    {
        icon: Users,
        value: "10,000+",
        label: "عميل راضٍ"
    },
    {
        icon: ShieldCheck,
        value: "1,200+",
        label: "محترف معتمد"
    },
    {
        icon: Hammer,
        value: "25,000+",
        label: "خدمة مكتملة"
    },
    {
        icon: MapPin,
        value: "20+",
        label: "مدينة مغطاة"
    }
]

export default function HomePage() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                أفضل الخدمات لمنزلك وعملك في السعودية
              </h1>
              <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
                من التكييف والسباكة إلى الصيانة العامة، احصل على عروض أسعار
                مجانية من أفضل المحترفين المعتمدين.
              </p>
            </div>
            <div className="w-full max-w-2xl">
              <form onSubmit={handleSearch} className="flex flex-row-reverse items-center gap-2 rounded-xl bg-card p-2 border shadow-lg">
                <div className="relative w-full flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ما الخدمة التي تحتاجها؟ (مثال: تصليح مكيف في الرياض)"
                    className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-right pr-10"
                  />
                </div>
                <Button type="submit" className="w-full sm:w-auto font-headline">
                  ابحث الآن
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <Badge className="font-headline bg-primary/10 text-primary hover:bg-primary/20">
                خدماتنا المتاحة
              </Badge>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                خدماتنا الأساسية
              </h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                اكتشف مجموعة واسعة من الخدمات المنزلية التي يقدمها أفضل
                المحترفين في المملكة.
              </p>
            </div>
          </div>
          <div className="py-12">
            <ServiceGrid services={essentialServices} />
          </div>
           <div className="text-center">
            <Button variant="outline" asChild>
              <Link href="/services">عرض جميع الخدمات ({allServices.length}+)</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <Badge className="font-headline bg-primary/10 text-primary hover:bg-primary/20">
                كيف نعمل
              </Badge>
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                احصل على الخدمة في 3 خطوات بسيطة
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                طلب الخدمة أصبح أسهل وأسرع من أي وقت مضى.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-2xl py-12 prose prose-lg dark:prose-invert">
                <ol className="timeline">
                    {howItWorksSteps.map((step, index) => (
                         <li key={index} data-step={index + 1}>
                            <div className='flex items-center gap-4 mb-2'>
                                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-muted text-primary">
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg font-headline m-0">{step.title}</h3>
                            </div>
                            <p className="text-muted-foreground">{step.description}</p>
                        </li>
                    ))}
                </ol>
           </div>
        </div>
      </section>

      <section id="stats" className="w-full py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <Badge className="font-headline bg-primary/10 text-primary hover:bg-primary/20">
                لماذا تختارنا؟
              </Badge>
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                أرقامنا تتحدث عنا
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                نحن نفخر ببناء شبكة واسعة من الثقة والاحترافية في جميع أنحاء المملكة.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12 py-12">
            {stats.map((stat, index) => (
                <div key={index} className="grid gap-2 text-center">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20 mb-4">
                    <stat.icon className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="font-headline text-3xl font-bold">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <Badge className="font-headline bg-primary/10 text-primary hover:bg-primary/20">
                آراء عملائنا
              </Badge>
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                يثقون في إنقاذ
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                استمع لآراء العملاء الذين وثقوا في منصة إنقاذ.
              </p>
            </div>
          </div>
          <div className="py-12">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
                direction: 'rtl'
              }}
              className="w-full max-w-4xl mx-auto"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/2"
                  >
                    <div className="p-1 h-full">
                      <Card className="h-full flex flex-col justify-between text-right shadow-md hover:shadow-lg transition-shadow">
                         <CardContent className="pt-6 flex-grow flex flex-col">
                          <div className="flex mb-2 justify-end">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-5 w-5 text-yellow-400 fill-yellow-400"
                              />
                            ))}
                          </div>
                          <p className="text-foreground/90 italic flex-grow">
                            "{testimonial.quote}"
                          </p>
                        </CardContent>
                        <CardHeader>
                          <div className="flex items-center justify-end gap-4">
                             <div>
                              <CardTitle className="text-base font-headline">
                                {testimonial.name}
                              </CardTitle>
                              <CardDescription>
                                {testimonial.location}
                              </CardDescription>
                            </div>
                            <Avatar>
                              <AvatarImage
                                src={testimonial.avatar}
                                alt={testimonial.name}
                              />
                              <AvatarFallback>
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </CardHeader>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md-py-24 lg:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
              هل أنت جاهز لطلب خدمتك الأولى؟
            </h2>
            <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              احصل على عروض أسعار مجانية من أفضل المحترفين في مدينتك. العملية
              سريعة، مجانية، وبدون أي التزام.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-y-2">
            <Button
              type="submit"
              size="lg"
              className="w-full font-headline"
              asChild
            >
              <Link href="/services">اطلب عرض سعر مجاني</Link>
            </Button>
            <p className="text-xs text-muted-foreground">
              بياناتك في أمان تام معنا.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

    

    