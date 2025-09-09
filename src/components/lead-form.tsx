
"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, ArrowRight, ArrowLeft, Send, Loader2, Bot } from "lucide-react";
import { getLeadQualificationQuestion } from "@/ai/flows/lead-qualification";
import { Skeleton } from "@/components/ui/skeleton";

const leadSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب" }),
  phone: z.string().regex(/^05\d{8}$/, { message: "الرجاء إدخال رقم جوال سعودي صالح" }),
  aiQuestionResponse: z.string().min(10, { message: "الرجاء تقديم تفاصيل كافية." }),
  urgency: z.enum(["emergency", "urgent", "scheduled"]),
  city: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormProps {
  serviceName: string;
  cityName?: string;
}

export function LeadForm({ serviceName, cityName }: LeadFormProps) {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiQuestion, setAiQuestion] = useState("");
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);

  useEffect(() => {
    async function fetchQuestion() {
      setIsLoadingQuestion(true);
      try {
        const question = await getLeadQualificationQuestion(serviceName);
        setAiQuestion(question);
      } catch (error) {
        console.error("Failed to fetch AI question:", error);
        setAiQuestion("يرجى وصف المشكلة التي تواجهها بالتفصيل."); // Fallback question
      }
      setIsLoadingQuestion(false);
    }
    fetchQuestion();
  }, [serviceName]);

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      aiQuestionResponse: "",
      urgency: "scheduled",
      city: cityName,
    },
    mode: "onChange",
  });
  
  useEffect(() => {
    if (cityName) {
        form.setValue('city', cityName);
    }
  }, [cityName, form]);


  const nextStep = async () => {
    let fieldsToValidate: (keyof LeadFormValues)[] = [];
    if (step === 0) {
      fieldsToValidate = ["name", "phone"];
    } else if (step === 1) {
      fieldsToValidate = ["aiQuestionResponse"];
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: LeadFormValues) => {
    setIsSubmitting(true);
    console.log("Lead data:", { ...data, serviceName, cityName: data.city });

    // Placeholder for server action
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    setIsSubmitted(true);
    toast({
      title: "تم استلام طلبك بنجاح!",
      description: "سيتواصل معك أحد المحترفين قريباً.",
    });
  };
  
  if (isSubmitted) {
    return (
       <Card className="w-full text-right">
        <CardHeader className="items-center text-center">
           <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success/10 text-success mb-4">
              <CheckCircle className="w-10 h-10" />
            </div>
          <CardTitle>تم إرسال طلبك بنجاح!</CardTitle>
          <CardDescription>
            شكراً لثقتك في إنقاذ. سيقوم أحد مزودي الخدمة المعتمدين بالتواصل معك على الرقم المدخل خلال الساعات القادمة.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full text-right sticky top-24 self-start">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">
          اطلب خدمة {serviceName} {cityName ? `في ${cityName}`: ''}
        </CardTitle>
        <CardDescription>
          أكمل النموذج التالي للحصول على عرض سعر مجاني وبدون التزام.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 min-h-[250px]">
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
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl>
                          <Input placeholder="مثال: خالد المطيري" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الجوال</FormLabel>
                        <FormControl>
                          <Input placeholder="05xxxxxxxx" {...field} dir="ltr" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                    name="aiQuestionResponse"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                            <div className="flex items-center gap-2 mb-2">
                                <Bot className="w-5 h-5 text-primary"/>
                                <span> سؤال للتوضيح</span>
                            </div>
                           {isLoadingQuestion ? <Skeleton className="w-3/4 h-6"/> : aiQuestion}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="صف طلبك هنا..."
                            className="min-h-[100px]"
                            {...field}
                            disabled={isLoadingQuestion}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="urgency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>مدى سرعة الخدمة</FormLabel>
                         <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          dir="rtl"
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر سرعة الخدمة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="scheduled">غير مستعجل (خلال أيام)</SelectItem>
                            <SelectItem value="urgent">مستعجل (خلال 24 ساعة)</SelectItem>
                            <SelectItem value="emergency">طوارئ (الآن)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <div className="p-4 bg-muted/50 border rounded-md text-sm text-muted-foreground">
                        <p>شكراً لك. الخطوة الأخيرة هي تحديد مدى سرعة طلبك. سيتم إرسال طلبك للمحترفين فوراً للمراجعة.</p>
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between mt-4">
         {step > 0 && (
          <Button variant="outline" onClick={prevStep} type="button">
            <ArrowRight className="ml-2 h-4 w-4" />
            السابق
          </Button>
        )}
        {step === 0 && (
          <Button onClick={nextStep} type="button" disabled={!form.watch('name') || !form.watch('phone') || !!form.formState.errors.name || !!form.formState.errors.phone}>
            التالي
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        )}
         {step === 1 && (
          <Button onClick={nextStep} type="button" disabled={isLoadingQuestion || !form.watch('aiQuestionResponse') || !!form.formState.errors.aiQuestionResponse}>
            التالي
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        )}
        {step === 2 && (
          <Button onClick={form.handleSubmit(onSubmit)} type="submit" disabled={isSubmitting}>
             {isSubmitting ? (
                <>
                  <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  تأكيد الطلب
                  <Send className="mr-2 h-4 w-4" />
                </>
              )}
          </Button>
        )}
        {/* Empty div for spacing when on first step */}
        {step === 0 && <div/>}
      </CardFooter>
    </Card>
  );
}
