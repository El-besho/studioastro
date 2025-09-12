
import { ServiceHierarchy } from '@/types/services';

export const movingRelocation: ServiceHierarchy = {
    id: 'moving-relocation',
    ar_name: 'النقل وتخزين الأثاث',
    category: 'essential',
    priority: 2,
    seasonal_demand: 'summer_peak',
    pricing_tier: 'budget',
    service_duration: 8,
    emergency_available: false,
    islamic_compliance: true,
    cultural_adaptations: ['التعامل الحذر مع القطع الأثرية الدينية والثقافية.'],
    seo: { 
        summary: "خدمات نقل وتخزين خالية من الإجهاد. نقدم نقل أثاث محلي وبين المدن، وتغليف احترافي، وحلول تخزين آمنة. فرقنا مدربة على التعامل مع جميع أنواع الأثاث لضمان وصول ممتلكاتك بأمان.",
        primary_keywords: ["شركة نقل عفش", "نقل اثاث", "شركة نقل", "تخزين اثاث"], 
        secondary_keywords: ["نقل عفش داخل الرياض", "افضل شركة نقل اثاث", "تغليف اثاث", "فك وتركيب اثاث"], 
        long_tail_keywords: ["أفضل شركة نقل أثاث في السعودية", "سعر نقل العفش داخل الرياض", "تخزين أثاث آمن", "دينا نقل عفش"],
        faq: [
            { question: "كيف يتم تقدير تكلفة خدمة النقل؟", answer: "تعتمد التكلفة على عدة عوامل، بما في ذلك حجم الأثاث، المسافة بين الموقعين، عدد العمال المطلوب، والخدمات الإضافية مثل التغليف والتركيب." },
            { question: "هل تقدمون خدمة التغليف؟", answer: "نعم، نقدم خدمة تغليف كاملة باستخدام مواد عالية الجودة مثل الكراتين، الفقاعات البلاستيكية، والبطانيات لضمان حماية جميع ممتلكاتك أثناء النقل." },
            { question: "هل الأثاث مؤمن عليه أثناء النقل؟", answer: "نعم، معظم شركات النقل المحترفة التي نعمل معها تقدم تأمينًا أساسيًا على المنقولات. يمكنك أيضًا طلب تأمين إضافي لتغطية شاملة." },
            { question: "كم من الوقت أحتاج للحجز المسبق لخدمة النقل؟", answer: "نوصي بالحجز قبل أسبوع على الأقل، خاصة خلال مواسم الذروة (مثل الصيف ونهاية الشهر). ومع ذلك، سنبذل قصارى جهدنا لتلبية الطلبات العاجلة." },
            { question: "هل تقومون بفك وتركيب الأثاث؟", answer: "نعم، فريقنا مدرب على فك وتركيب جميع أنواع الأثاث، بما في ذلك غرف النوم، الخزائن، والمكاتب، كجزء من خدمة النقل الشاملة." },
            { question: "هل يمكنكم نقل الأغراض الثقيلة مثل البيانو أو الخزائن؟", answer: "نعم، لدينا معدات خاصة وفرق مدربة لنقل الأغراض الثقيلة والحساسة بأمان تام." },
            { question: "ما هي مميزات خدمة التخزين لديكم؟", answer: "نوفر وحدات تخزين آمنة، نظيفة، ومكيفة لحماية أثاثك من الحرارة والرطوبة. تتوفر لدينا حلول تخزين قصيرة وطويلة الأجل." },
            { question: "هل يمكنني الوصول إلى أغراضي أثناء فترة التخزين؟", answer: "نعم، يمكنك الوصول إلى وحدتك التخزينية خلال ساعات العمل الرسمية. يرجى التنسيق معنا مسبقًا لترتيب زيارتك." }
        ]
    },
    sub_services: [
      { id: 'local-moving', ar_name: 'نقل أثاث داخل المدينة', urgency: 'scheduled', avg_price_range: [800, 2500], skill_requirements: ['professional_mover'], tools_required: ['moving_truck', 'dolly', 'blankets'], seasonal_multiplier: 1.4, seo: { summary: "خدمات نقل أثاث محلية موثوقة لنقل خالٍ من المتاعب داخل مدينتك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'intercity-moving', ar_name: 'نقل أثاث بين المدن', urgency: 'scheduled', avg_price_range: [2000, 6000], skill_requirements: ['long_distance_mover'], tools_required: ['large_truck', 'straps'], seasonal_multiplier: 1.3, seo: { summary: "نقل أثاث سلس بين المدن إلى أي مكان في المملكة العربية السعودية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'furniture-packing', ar_name: 'تغليف وتعبئة الأثاث', urgency: 'scheduled', avg_price_range: [500, 1500], skill_requirements: ['packer'], tools_required: ['boxes', 'bubble_wrap', 'tape'], seasonal_multiplier: 1.2, seo: { summary: "تغليف وتعبئة أثاث احترافي لحماية ممتلكاتك أثناء النقل.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'furniture-storage', ar_name: 'تخزين الأثاث', urgency: 'scheduled', avg_price_range: [400, 1000], skill_requirements: ['storage_facility_operator'], tools_required: ['climate_controlled_unit', 'security_system'], seasonal_multiplier: 1.1, seo: { summary: "تخزين أثاث آمن ومكيف للاحتياجات قصيرة أو طويلة الأجل.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'office-relocation', ar_name: 'نقل المكاتب والشركات', urgency: 'scheduled', avg_price_range: [3000, 15000], skill_requirements: ['commercial_mover'], tools_required: ['it_equipment_crates', 'labeling_system'], seasonal_multiplier: 1.0, seo: { summary: "خدمات نقل مكاتب وشركات فعالة لتقليل وقت التوقف عن العمل.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'heavy-item-moving', ar_name: 'نقل الأغراض الثقيلة (خزائن، بيانو)', urgency: 'scheduled', avg_price_range: [500, 2000], skill_requirements: ['specialized_mover'], tools_required: ['heavy_duty_dolly', 'crane'], seasonal_multiplier: 1.0, seo: { summary: "خدمات نقل متخصصة للأشياء الثقيلة والحساسة مثل الخزائن والبيانو.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
