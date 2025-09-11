
import { ServiceHierarchy } from '@/types/services';

export const marbleTilingServices: ServiceHierarchy = {
    id: 'marble-tiling-services',
    ar_name: 'جلي وتلميع الرخام والبلاط',
    category: 'luxury',
    priority: 3,
    seasonal_demand: 'year_round',
    pricing_tier: 'standard',
    service_duration: 8,
    emergency_available: false,
    islamic_compliance: true,
    cultural_adaptations: ['استخدام أغطية واقية للأثاث أثناء العمل.'],
    seo: { 
        summary: "خدمات متخصصة في جلي وتلميع جميع أنواع الرخام والبلاط والسيراميك. نستخدم أحدث معدات الجلي والتلميع بالكريستال والألماس لإعادة اللمعان الأصلي لأرضياتك وإزالة الخدوش والبقع الصعبة.",
        primary_keywords: ["جلي بلاط", "جلي رخام", "تلميع رخام", "تلميع سيراميك"], 
        secondary_keywords: ["جلي بلاط باكستاني", "شركة جلي رخام", "تنظيف وتلميع البلاط", "جلي ارضيات"], 
        long_tail_keywords: ["سعر متر جلي الرخام بالكريستال", "أفضل شركة جلي بلاط بالرياض", "تلميع الرخام الباهت", "جلي وتلميع الرخام والجرانيت"],
        faq: [
            { question: "ما هو الفرق بين الجلي والتلميع؟", answer: "الجلي هو عملية كشط طبقة رقيقة من السطح باستخدام أقراص الألماس لإزالة الخدوش العميقة وتسوية الأرضية. أما التلميع فهو عملية استخدام مواد كيميائية أو كريستالية لإعادة اللمعان والبريق للسطح بعد الجلي." },
            { question: "كم من الوقت تستغرق عملية جلي وتلميع شقة متوسطة؟", answer: "تعتمد المدة على مساحة الشقة وحالة الأرضيات، ولكن بشكل عام، قد تستغرق شقة بمساحة 150 متر مربع من يوم إلى يومين عمل." },
            { question: "هل عملية الجلي تسبب الكثير من الغبار؟", answer: "نحن نستخدم أحدث ماكينات الجلي التي تعمل بالماء، مما يقلل من انتشار الغبار بنسبة تصل إلى 90% للحفاظ على نظافة المكان." },
            { question: "هل يمكن جلي جميع أنواع البلاط؟", answer: "يمكن جلي معظم أنواع الرخام والجرانيت والبلاط الأسمنتي (الموزايكو). أما السيراميك والبورسلان فلا يتم جليهم بالطريقة التقليدية بل يتم تنظيفهم وتلميعهم بمواد خاصة." },
            { question: "هل يعود الرخام جديدًا تمامًا بعد الجلي؟", answer: "نعم، عملية الجلي والتلميع بالكريستال تعيد الرخام إلى حالته الأصلية، وتزيل البقع والخدوش وتمنحه لمعانًا وبريقًا كالجديد." },
            { question: "ما هي تكلفة جلي الرخام؟", answer: "تعتمد التكلفة على المتر المربع وتختلف حسب نوع الرخام وحالته. يمكنك الحصول على عرض سعر دقيق ومجاني عند طلب الخدمة عبر منصتنا." },
            { question: "هل تقدمون خدمة إصلاح الشقوق في الرخام؟", answer: "نعم، نقدم خدمة معالجة الشقوق والكسور في الرخام باستخدام مادة الجولي المتخصصة بنفس لون الرخام قبل البدء بعملية الجلي والتلميع." },
            { question: "متى أحتاج إلى جلي أرضياتي؟", answer: "تحتاج إلى الجلي عند وجود خدوش واضحة، بقع مستعصية، فقدان اللمعان بشكل كبير، أو عدم استواء السطح. الجلي يعيد الحياة لأرضيتك القديمة." }
        ]
    },
    sub_services: [
      { id: 'marble-crystallization', ar_name: 'جلي وتلميع الرخام بالكريستال', urgency: 'scheduled', avg_price_range: [15, 35], skill_requirements: ['floor_care_specialist'], tools_required: ['floor_buffer', 'crystal_powder'], seasonal_multiplier: 1.1, seo: { summary: "استعادة اللمعان الطبيعي للرخام الخاص بك من خلال عملية التلميع بالكريستال الاحترافية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'tile-grout-cleaning', ar_name: 'تنظيف وتلميع السيراميك والبورسلان', urgency: 'scheduled', avg_price_range: [10, 25], skill_requirements: ['floor_care_technician'], tools_required: ['steam_cleaner', 'grout_brush'], seasonal_multiplier: 1.2, seo: { summary: "تنظيف عميق للسيراميك والبورسلان لإزالة الأوساخ من الترويبة واستعادة مظهرها الأصلي.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'concrete-polishing', ar_name: 'جلي وتلميع الأرضيات الخرسانية', urgency: 'scheduled', avg_price_range: [20, 50], skill_requirements: ['concrete_specialist'], tools_required: ['concrete_grinder', 'diamond_pads'], seasonal_multiplier: 1.0, seo: { summary: "تحويل الأرضيات الخرسانية العادية إلى أسطح مصقولة شديدة اللمعان وسهلة التنظيف.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'stain_removal', ar_name: 'إزالة البقع الصعبة', urgency: 'urgent', avg_price_range: [300, 700], skill_requirements: ['floor_care_specialist'], tools_required: ['poultice_materials', 'specialty_chemicals'], seasonal_multiplier: 1.1, seo: { summary: "معالجة متخصصة لإزالة البقع الصعبة مثل الصدأ والزيوت والحبر من الرخام والبلاط.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };

