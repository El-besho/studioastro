
import { ServiceHierarchy } from '@/types/services';

export const constructionRenovation: ServiceHierarchy = {
    id: 'construction-renovation',
    ar_name: 'البناء والترميم',
    category: 'luxury',
    priority: 4,
    seasonal_demand: 'winter_peak',
    pricing_tier: 'enterprise',
    service_duration: 120,
    emergency_available: false,
    islamic_compliance: true,
    cultural_adaptations: ['خبرة في الأساليب المعمارية التقليدية النجدية أو الحجازية.', 'دمج عناصر مثل الأفنية وغرف المجلس.'],
    seo: { 
        summary: "حلول بناء وترميم كاملة من مقاول معتمد. من بناء الملاحق وتجديد المطابخ والحمامات إلى ترميم المباني الكاملة، يقدم مقاولونا نتائج عالية الجودة في جميع أنحاء السعودية.",
        primary_keywords: ["شركة مقاولات", "بناء وترميم", "مقاول عام", "تشطيبات"], 
        secondary_keywords: ["تجديد مطبخ", "تجديد حمام", "ترميم مباني", "بناء ملاحق", "مقاول بناء"], 
        long_tail_keywords: ["تكلفة بناء ملحق في الرياض", "أفضل مقاول ترميم في جدة", "تصميم وتجديد المطابخ العصرية", "شركة مقاولات معتمدة", "ترميم وتشطيب فلل"],
        faq: [
            { question: "ما هي الخطوة الأولى لبدء مشروع ترميم؟", answer: "الخطوة الأولى هي الحصول على استشارة وتقييم من مقاول محترف. سيقوم المقاول بتقييم الحالة الحالية، ومناقشة أهدافك، وتقديم خطة عمل وتقدير للتكلفة." },
            { question: "هل أحتاج إلى تصاريح بناء لترميم منزلي؟", answer: "تعتمد الحاجة إلى تصاريح على حجم ونوع العمل. التغييرات الهيكلية الكبيرة أو الإضافات تتطلب عادةً تصاريح من البلدية. يمكننا المساعدة في عملية الحصول على التصاريح اللازمة." },
            { question: "كم من الوقت يستغرق تجديد مطبخ بالكامل؟", answer: "يستغرق تجديد المطبخ الكامل عادةً ما بين 3 إلى 6 أسابيع، اعتمادًا على مدى تعقيد التصميم، وتوافر المواد، وأي تغييرات هيكلية." },
            { question: "هل يمكنني العيش في المنزل أثناء أعمال الترميم؟", answer: "بالنسبة للترميمات الصغيرة، يكون ذلك ممكنًا. أما بالنسبة للمشاريع الكبيرة التي تنطوي على غبار وضوضاء شديدة (مثل تجديد المطبخ أو الحمام)، فقد يكون من الأفضل ترتيب سكن مؤقت." },
            { question: "كيف يتم تحديد تكلفة مشروع البناء أو الترميم؟", answer: "تعتمد التكلفة على عدة عوامل، بما في ذلك حجم المشروع، جودة المواد المستخدمة، مدى تعقيد التصميم، وتكاليف العمالة والتصاريح. نحن نقدم عرض سعر مفصل وشفاف قبل البدء." },
            { question: "هل تقدمون خدمات التصميم الداخلي؟", answer: "نعم، نحن نعمل مع مصممين داخليين محترفين لمساعدتك في تصميم مساحتك الجديدة، من اختيار المواد والألوان إلى توزيع الأثاث والإضاءة." },
            { question: "ما هو ضمانكم على أعمال البناء والترميم؟", answer: "نحن نقدم ضمانًا شاملاً على جميع أعمالنا الإنشائية والهيكلية، بالإضافة إلى ضمانات الموردين على المواد والتجهيزات المستخدمة." },
            { question: "هل تتعاملون مع مشاريع تجارية؟", answer: "نعم، لدينا خبرة واسعة في تنفيذ مشاريع البناء والترميم للمكاتب والمحلات التجارية والمباني التجارية الأخرى." }
        ]
    },
    sub_services: [
      { id: 'room_addition', ar_name: 'بناء ملاحق وغرف إضافية', urgency: 'consultation', avg_price_range: [20000, 100000], skill_requirements: ['general_contractor'], tools_required: ['concrete_mixer', 'full_construction_set'], seasonal_multiplier: 1.0, seo: { summary: "بناء ملاحق وغرف إضافية لتوسيع مساحة المعيشة الخاصة بك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'building_renovation', ar_name: 'ترميم المباني القديمة', urgency: 'consultation', avg_price_range: [50000, 500000], skill_requirements: ['renovation_specialist'], tools_required: ['demolition_tools', 'surveying_equipment'], seasonal_multiplier: 1.1, seo: { summary: "خدمات ترميم شاملة للمباني القديمة لتحديثها وترميمها.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'tile_install', ar_name: 'تركيب بلاط وسيراميك ورخام', urgency: 'scheduled', avg_price_range: [30, 120], skill_requirements: ['tile_setter'], tools_required: ['wet_saw', 'grout_float'], seasonal_multiplier: 1.2, seo: { summary: "تركيب احترافي للبلاط والسيراميك والرخام للأرضيات والجدران.", primary_keywords: ["تركيب بلاط", "معلم بلاط"], secondary_keywords: ["تركيب سيراميك", "تركيب رخام"], long_tail_keywords: ["سعر تركيب متر البلاط", "مقاول بلاط"], faq: [] } },
      { id: 'kitchen_renovation', ar_name: 'تجديد وتصميم المطابخ', urgency: 'consultation', avg_price_range: [15000, 60000], skill_requirements: ['kitchen_designer', 'contractor'], tools_required: ['cabinet_jig', 'laser_level'], seasonal_multiplier: 1.1, seo: { summary: "تجديد وتصميم مطبخ كامل لإنشاء مساحة طهي أحلامك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'bathroom_renovation', ar_name: 'تجديد وتصميم الحمامات', urgency: 'consultation', avg_price_range: [10000, 40000], skill_requirements: ['bathroom_designer', 'plumber', 'tile_setter'], tools_required: ['wet_saw', 'waterproofing_membrane'], seasonal_multiplier: 1.2, seo: { summary: "تجديد وتصميم حمام حديث لإنشاء ملاذ يشبه السبا.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'roofing_services', ar_name: 'أعمال الأسقف والقرميد', urgency: 'urgent', avg_price_range: [5000, 25000], skill_requirements: ['roofer'], tools_required: ['roofing_nailer', 'safety_harness'], seasonal_multiplier: 1.3, seo: { summary: "خدمات الأسقف والقرميد لأسطح متينة ومقاومة للعوامل الجوية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
