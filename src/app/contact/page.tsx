
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactUsPage() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setIsSubmitting(true);
        console.log(data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        toast({
            title: "تم إرسال رسالتك!",
            description: "شكرًا لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.",
        });
        reset();
    };

  return (
    <div className="text-right">
      <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-24 bg-muted/50">
        <div className="container px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            تواصل معنا
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-foreground/80 md:text-xl">
            نحن هنا للمساعدة. سواء كان لديك سؤال حول خدماتنا، أو تحتاج إلى دعم، أو ترغب فقط في إلقاء التحية، فإننا نود أن نسمع منك.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h2 className="font-headline text-3xl font-bold tracking-tighter">معلومات الاتصال</h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                                <Mail className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="font-semibold">البريد الإلكتروني</h3>
                                <p className="text-muted-foreground">support@enqaz.org</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                                <Phone className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="font-semibold">الهاتف</h3>
                                <p className="text-muted-foreground" dir="ltr">0510102271</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                                <MapPin className="w-6 h-6"/>
                            </div>
                            <div>
                                <h3 className="font-semibold">العنوان</h3>
                                <p className="text-muted-foreground">1234 طريق الملك فهد، الرياض، المملكة العربية السعودية</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>أرسل لنا رسالة</CardTitle>
                            <CardDescription>املأ النموذج أدناه وسيقوم أحد أعضاء فريقنا بالرد عليك قريبًا.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <Input 
                                        placeholder="الاسم الكامل" 
                                        {...register("name", { required: "الاسم مطلوب" })}
                                    />
                                    {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                                </div>
                                <div>
                                    <Input 
                                        type="email" 
                                        placeholder="البريد الإلكتروني" 
                                        {...register("email", { 
                                            required: "البريد الإلكتروني مطلوب",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "الرجاء إدخال بريد إلكتروني صالح"
                                            }
                                        })}
                                    />
                                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <Input 
                                        placeholder="الموضوع" 
                                        {...register("subject", { required: "الموضوع مطلوب" })}
                                    />
                                    {errors.subject && <p className="text-destructive text-xs mt-1">{errors.subject.message}</p>}
                                </div>
                                <div>
                                    <Textarea 
                                        placeholder="رسالتك..." 
                                        {...register("message", { required: "الرسالة مطلوبة" })}
                                        rows={5}
                                    />
                                    {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
                                </div>
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                     {isSubmitting ? (
                                        <>
                                        <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                        جاري الإرسال...
                                        </>
                                    ) : (
                                        <>
                                        إرسال الرسالة
                                        <Send className="mr-2 h-4 w-4" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
