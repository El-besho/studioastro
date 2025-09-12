
import { ServiceHierarchy } from '@/types/services';

export const homeMaintenanceRepair: ServiceHierarchy = {
    id: 'home-maintenance-repair',
    ar_name: 'صيانة وإصلاح المنازل',
    category: 'essential',
    priority: 2,
    seasonal_demand: 'year_round',
    pricing_tier: 'standard',
    service_duration: 3,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: ['يفضل الفنيون الذكور ما لم يحدد خلاف ذلك.', 'يجب ألا يتعارض العمل مع خصوصية الأسرة.'],
    seo: { 
        summary: "خدمات صيانة منزلية عامة ورجل صيانة. من تجميع الأثاث إلى إصلاح الجدران الجافة والعزل المائي، يمكن لفريقنا الماهر التعامل مع كل ذلك.",
        primary_keywords: ["رجل صيانة الرياض", "إصلاح منزلي جدة"], 
        secondary_keywords: ["تجميع أثاث", "إصلاح جدران", "عزل مائي"], 
        long_tail_keywords: ["فني لكل شيء في الرياض", "أسعار خدمات العامل الماهر", "تركيب ستائر ولوحات"],
        faq: [
            { question: "ما نوع الخدمات التي يقدمها العامل الماهر (Handyman)؟", answer: "يقدم العامل الماهر مجموعة واسعة من الخدمات الصغيرة والمتوسطة مثل تجميع الأثاث، تركيب الستائر والرفوف، إصلاحات بسيطة في النجارة والسباكة، وإصلاح الجدران." },
            { question: "هل يمكنني حجز عامل ماهر لمجموعة من المهام في زيارة واحدة؟", answer: "نعم بالطبع. يمكنك إعداد قائمة بالمهام الصغيرة التي تحتاجها، وسيقوم العامل الماهر بإنجازها جميعًا في زيارة واحدة، مما يوفر عليك الوقت والمال." },
            { question: "ما الفرق بين العامل الماهر والمتخصص (مثل السباك)؟", answer: "العامل الماهر مناسب للمهام العامة والإصلاحات البسيطة. أما المهام المعقدة التي تتطلب ترخيصًا متخصصًا (مثل تمديدات السباكة الرئيسية أو الأعمال الكهربائية الكبيرة) فتحتاج إلى فني متخصص." },
            { question: "كيف يتم حساب تكلفة خدمات الصيانة المنزلية؟", answer: "عادة ما يتم حساب التكلفة بالساعة أو بسعر ثابت للمهمة. بالنسبة للمهام الصغيرة المتعددة، قد يكون السعر بالساعة هو الأفضل. سيتم تزويدك بتقدير واضح للتكلفة قبل بدء العمل." },
            { question: "هل أحتاج إلى شراء المواد اللازمة للإصلاح؟", answer: "يمكنك شراء المواد بنفسك، أو يمكننا توفيرها لك وإضافتها إلى الفاتورة النهائية. نوصي بمناقشة هذا الأمر مع الفني عند الحجز." },
            { question: "هل خدمات العزل المائي مضمونة؟", answer: "نعم، نقدم ضمانًا على جميع خدمات العزل المائي التي نقوم بها لضمان حماية منزلك من التسريبات والرطوبة على المدى الطويل." },
            { question: "كم يستغرق تجميع خزانة ملابس كبيرة؟", answer: "يعتمد ذلك على مدى تعقيد التصميم، ولكن بشكل عام، يستغرق تجميع خزانة ملابس كبيرة من 2 إلى 4 ساعات." },
            { question: "هل تقدمون خدمات صيانة دورية للمنازل؟", answer: "نعم، نقدم باقات صيانة دورية تشمل فحصًا منتظمًا للمنزل وإجراء الإصلاحات الوقائية للحفاظ على قيمة الممتلكات الخاصة بك وتجنب المشاكل الكبيرة في المستقبل." }
        ]
    },
    sub_services: [
      { id: 'carpentry', ar_name: 'أعمال النجارة (أبواب، خزائن)', urgency: 'scheduled', avg_price_range: [300, 800], skill_requirements: ['master_carpenter'], tools_required: ['saw', 'drill', 'sander'], seasonal_multiplier: 1.0, seo: { summary: "خدمات نجارة مخصصة للأبواب والخزائن والتركيبات الخشبية الأخرى.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'door-window-repair', ar_name: 'تركيب وإصلاح الأبواب والشبابيك', urgency: 'urgent', avg_price_range: [250, 600], skill_requirements: ['carpenter', 'glazier'], tools_required: ['chisel', 'level'], seasonal_multiplier: 1.1, seo: { summary: "تركيب وإصلاح الأبواب والنوافذ لتحسين الأمن والعزل.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'furniture-assembly', ar_name: 'تجميع وتركيب الأثاث (ايكيا وغيرها)', urgency: 'scheduled', avg_price_range: [200, 500], skill_requirements: ['handyman'], tools_required: ['ikea_tool_kit', 'drill'], seasonal_multiplier: 1.2, seo: { summary: "تجميع احترافي للأثاث من ايكيا وغيرها من العلامات التجارية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'drywall-repair', ar_name: 'إصلاح الجدران والجبس بورد', urgency: 'scheduled', avg_price_range: [200, 500], skill_requirements: ['drywall_finisher'], tools_required: ['putty_knife', 'sanding_block'], seasonal_multiplier: 1.0, seo: { summary: "إصلاح الثقوب والشقوق في الجدران الجافة وألواح الجبس للحصول على لمسة نهائية ناعمة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'waterproofing', ar_name: 'أعمال العزل المائي للأسطح والحمامات', urgency: 'urgent', avg_price_range: [1500, 5000], skill_requirements: ['waterproofing_specialist'], tools_required: ['membrane_torch', 'sealant_gun'], seasonal_multiplier: 1.4, seo: { summary: "خدمات عزل مائي احترافية للأسطح والحمامات لمنع التسرب وتلف المياه.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'hanging-pictures-shelves', ar_name: 'تركيب ستائر ولوحات ورفوف', urgency: 'scheduled', avg_price_range: [100, 250], skill_requirements: ['handyman'], tools_required: ['drill', 'level', 'stud_finder'], seasonal_multiplier: 1.0, seo: { summary: "تعليق آمن للستائر والصور والرفوف لإكمال ديكور منزلك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
