
import { ServiceHierarchy } from '@/types/services';

export const swimmingPoolServices: ServiceHierarchy = {
    id: 'swimming-pool-services',
    ar_name: 'خدمات المسابح',
    category: 'luxury',
    priority: 3,
    seasonal_demand: 'summer_peak',
    pricing_tier: 'standard',
    service_duration: 3,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: ['يجب على الفنيين احترام خصوصية الأسرة، خاصة عندما تقع حمامات السباحة في مناطق سكنية خاصة.'],
    seo: { 
        summary: "خدمات حمامات سباحة كاملة، بما في ذلك التنظيف والصيانة والكشف عن التسرب وبناء حمامات سباحة جديدة. حافظ على حمام السباحة الخاص بك في حالة ممتازة على مدار العام.",
        primary_keywords: ["تنظيف حمامات سباحة الرياض", "صيانة حمامات سباحة جدة"],
        secondary_keywords: ["إصلاح تسرب حمامات السباحة", "بناء حمامات سباحة", "معالجة مياه حمامات السباحة"], 
        long_tail_keywords: ["أفضل شركة صيانة مسابح", "سعر بناء مسبح خرساني", "كشف تسربات المسابح بدون تكسير"],
        faq: [
            { question: "كم مرة يجب تنظيف المسبح؟", answer: "للاستخدام المنزلي العادي، نوصي بتنظيف وصيانة المسبح مرة واحدة في الأسبوع للحفاظ على نظافة المياه وتوازنها الكيميائي." },
            { question: "ما هي علامات وجود تسرب في المسبح؟", answer: "العلامات الشائعة تشمل انخفاض مستوى المياه بشكل أسرع من المعتاد، وجود بقع رطبة حول المسبح، أو ارتفاع غير مبرر في فاتورة المياه." },
            { question: "هل يمكنكم تحويل مسبح الكلور إلى مسبح ملح؟", answer: "نعم، يمكننا تركيب نظام تحويل المياه المالحة (Saltwater Chlorinator)، والذي يستخدم الملح لإنتاج الكلور بشكل طبيعي، مما يجعل المياه أكثر لطفًا على الجلد والعينين." },
            { question: "ماذا تشمل خدمة الصيانة الأسبوعية؟", answer: "تشمل خدمتنا فحص وتوازن كيماويات المياه، تنظيف قاع المسبח وجدرانه، إفراغ سلال الفلتر والمضخة، وفحص جميع المعدات للتأكد من أنها تعمل بشكل صحيح." },
            { question: "مياه المسبح الخاص بي خضراء، ماذا يعني ذلك؟", answer: "المياه الخضراء عادة ما تكون علامة على نمو الطحالب، والذي يحدث بسبب عدم توازن المواد الكيميائية أو ضعف في نظام الترشيح. يمكننا معالجة المياه واستعادتها إلى حالتها الصافية." },
            { question: "هل بناء مسبح جديد يتطلب تصريحًا؟", answer: "نعم، في معظم البلديات، يتطلب بناء مسبح جديد الحصول على تصريح بناء. يمكننا إرشادك خلال هذه العملية والمساعدة في تقديم المخططات اللازمة." },
            { question: "كم من الوقت يستغرق إصلاح مضخة المسبح؟", answer: "تعتمد مدة الإصلاح على نوع المشكلة وتوافر قطع الغيار. يمكن إصلاح العديد من المشاكل الشائعة في غضون ساعات قليلة." },
            { question: "هل توفرون أغطية المسابح؟", answer: "نعم، نوفر ونركب مجموعة متنوعة من أغطية المسابح، بما في ذلك الأغطية الشمسية للحفاظ على الحرارة وأغطية السلامة لحماية الأطفال والحيوانات الأليفة." }
        ]
    },
    sub_services: [
      { id: 'pool-cleaning', ar_name: 'تنظيف وصيانة المسابح', urgency: 'maintenance', avg_price_range: [300, 600], skill_requirements: ['pool_technician'], tools_required: ['pool_vacuum', 'water_testing_kit'], seasonal_multiplier: 1.5, seo: { summary: "تنظيف وصيانة دورية لحمامات السباحة للحفاظ على مياهها صافية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'pool-leak-detection', ar_name: 'كشف وإصلاح تسريبات المسابح', urgency: 'urgent', avg_price_range: [800, 2500], skill_requirements: ['leak_detection_specialist'], tools_required: ['pressure_test_kit', 'underwater_camera'], seasonal_multiplier: 1.3, seo: { summary: "كشف وإصلاح تسرب متقدم لمنع فقدان المياه والأضرار.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'pool-pump-repair', ar_name: 'إصلاح وصيانة فلاتر ومضخات المسابح', urgency: 'urgent', avg_price_range: [400, 1200], skill_requirements: ['pool_mechanic'], tools_required: ['multimeter', 'pump_seal_kit'], seasonal_multiplier: 1.4, seo: { summary: "إصلاح وصيانة مضخات وفلاتر حمامات السباحة للحصول على دوران مثالي.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'pool-construction', ar_name: 'بناء وتصميم المسابح', urgency: 'consultation', avg_price_range: [80000, 300000], skill_requirements: ['pool_contractor'], tools_required: ['excavator', 'rebar_tools'], seasonal_multiplier: 1.1, seo: { summary: "تصميم وبناء حمامات سباحة مخصصة لإنشاء واحة في الفناء الخلفي الخاص بك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'pool-water-treatment', ar_name: 'معالجة مياه المسبح (كيميائياً)', urgency: 'maintenance', avg_price_range: [200, 400], skill_requirements: ['certified_pool_operator'], tools_required: ['chemical_feeder', 'testing_kit'], seasonal_multiplier: 1.2, seo: { summary: "معالجة كيميائية احترافية للمياه لضمان مياه حمامات سباحة آمنة ومتوازنة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
