
"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Award, Briefcase, DollarSign, Send, Loader2, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { getAllServices } from '@/lib/services';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const joinProviderSchema = z.object({
  companyName: z.string().min(2, { message: 'اسم الشركة مطلوب' }),
  contactPerson: z.string().min(2, { message: 'اسم مسؤول التواصل مطلوب' }),
  phone: z.string().regex(/^05\d{8}$/, { message: 'الرجاء إدخال رقم جوال سعودي صالح' }),
  email: z.string().email({ message: 'الرجاء إدخال بريد إلكتروني صالح' }),
  city: z.string().min(2, { message: 'المدينة مطلوبة' }),
  services: z.array(z.string()).refine(value => value.some(item => item), {
    message: "يجب أن تختار خدمة واحدة على الأقل.",
  }),
});


type Inputs = z.infer<typeof joinProviderSchema>;

const allServices = getAllServices();

const benefits = [
    {
        icon: Users,
        title: "الوصول إلى المزيد من العملاء",
        description: "انضم إلى منصتنا للوصول إلى آلاف العملاء المحتملين الذين يبحثون بنشاط عن خدماتك."
    },
    {
        icon: DollarSign,
        title: "زيادة أرباحك",
        description: "احصل على المزيد من الوظائف وقم بتنمية عملك. نحن نأخذ عمولة صغيرة فقط على الوظائف المكتملة."
    },
    {
        icon: Briefcase,
        title: "أدوات عمل بسيطة",
        description: "استخدم تطبيقنا سهل الاستخدام لإدارة حجوزاتك والتواصل مع العملاء وتتبع أرباحك."
    },
    {
        icon: Award,
        title: "بناء سمعتك",
        description: "اجمع تقييمات إيجابية من العملاء لبناء سمعة قوية وجذب المزيد من الأعمال."
    }
]

export default function JoinProviderPage() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Inputs>({
    resolver: zodResolver(joinProviderSchema),
    defaultValues: {
      services: [],
    },
    mode: 'onChange'
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof Inputs)[] = [];
    if (step === 0) {
      fieldsToValidate = ["companyName", "contactPerson", "phone", "email", "city"];
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true);
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    toast({
      title: 'تم استلام طلبك!',
      description: 'شكرًا لاهتمامك بالانضمام إلينا. سيقوم فريقنا بمراجعة طلبك والتواصل معك قريبًا.',
    });
    form.reset();
    setStep(0);
  };

  return (
    <div className="text-right">
      <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-24 bg-muted/50">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            انضم إلى شبكة مزودي الخدمة لدينا
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-foreground/80 md:text-xl">
            هل أنت فني محترف أو شركة خدمات تتطلع إلى توسيع نطاق عملك؟ انضم إلى "إنقاذ" وتواصل مع آلاف العملاء في جميع أنحاء المملكة.
          </p>
        </div>
      </section>
      
      <section id="benefits" className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
           <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                لماذا تنضم إلينا؟
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                نحن نقدم لك الأدوات والدعم الذي تحتاجه للنجاح.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-12 py-12">
            {benefits.map((benefit, index) => (
                <div key={index} className="grid gap-2 text-center">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center rounded-full bg-primary/10 text-primary h-20 w-20 mb-4">
                    <benefit.icon className="h-10 w-10" />
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl font-headline">نموذج التسجيل</CardTitle>
                <CardDescription className="text-center">املأ النموذج أدناه لبدء عملية الانضمام.</CardDescription>
              </CardHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="space-y-6 min-h-[400px]">
                      <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                            >
                                <FormField control={form.control} name="companyName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>اسم الشركة أو الفرد</FormLabel>
                                        <FormControl><Input placeholder="اسم الشركة" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="contactPerson" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>اسم مسؤول التواصل</FormLabel>
                                        <FormControl><Input placeholder="الاسم الكامل" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                 <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>رقم الجوال</FormLabel>
                                        <FormControl><Input placeholder="05xxxxxxxx" {...field} dir="ltr" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>البريد الإلكتروني</FormLabel>
                                        <FormControl><Input type="email" placeholder="example@domain.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="city" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>المدينة الرئيسية للعمل</FormLabel>
                                        <FormControl><Input placeholder="مثال: الرياض" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </motion.div>
                        )}
                         {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-4"
                            >
                                <FormField
                                    control={form.control}
                                    name="services"
                                    render={() => (
                                    <FormItem>
                                        <div className="mb-4">
                                        <FormLabel className="text-base">الخدمات التي تقدمها</FormLabel>
                                        <FormDescription>اختر خدمة واحدة على الأقل.</FormDescription>
                                        </div>
                                        <Card className="max-h-80 overflow-y-auto p-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {allServices.map((service) => (
                                                    <FormField
                                                    key={service.id}
                                                    control={form.control}
                                                    name="services"
                                                    render={({ field }) => {
                                                        return (
                                                        <FormItem
                                                            key={service.id}
                                                            className="flex flex-row items-start space-x-0 space-x-reverse space-y-0"
                                                        >
                                                            <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(service.id)}
                                                                onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...(field.value || []), service.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                        (value) => value !== service.id
                                                                        )
                                                                    )
                                                                }}
                                                            />
                                                            </FormControl>
                                                            <FormLabel className="font-normal mr-2">
                                                                {service.ar_name}
                                                            </FormLabel>
                                                        </FormItem>
                                                        )
                                                    }}
                                                    />
                                                ))}
                                            </div>
                                        </Card>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                            </motion.div>
                         )}
                      </AnimatePresence>
                    </CardContent>
                    <CardFooter className="flex justify-between mt-4">
                        {step > 0 && (
                            <Button variant="outline" onClick={prevStep} type="button">
                                <ArrowRight className="ml-2 h-4 w-4" />
                                السابق
                            </Button>
                        )}
                        {step === 0 && (
                             <Button onClick={nextStep} type="button">
                                التالي
                                <ArrowLeft className="mr-2 h-4 w-4" />
                            </Button>
                        )}
                        {step === 1 && (
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                        جاري الإرسال...
                                    </>
                                ) : (
                                    <>
                                        إرسال الطلب
                                        <Send className="mr-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        )}
                        {step === 0 && <div/>}
                    </CardFooter>
                </form>
              </Form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
