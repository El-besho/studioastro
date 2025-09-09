
import { ServiceHierarchy } from '@/types/services';

export const washingMachineMaintenance: ServiceHierarchy = {
    id: 'washing-machine-maintenance',
    ar_name: 'صيانة غسالات',
    en_name: 'Washing Machine Maintenance',
    category: 'emergency',
    priority: 2,
    seasonal_demand: 'year_round',
    pricing_tier: 'standard',
    service_duration: 2,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: [],
    seo: {
        summary: "خدمات إصلاح وصيانة لجميع أنواع الغسالات، سواء كانت أوتوماتيك، فوق أوتوماتيك، أو عادية. فنيون متخصصون في إصلاح مشاكل الصرف، الأعطال الكهربائية، ومشاكل الدوران.",
        primary_keywords: ["صيانة غسالات", "تصليح غسالات", "فني غسالات", "صيانة غسالات اتوماتيك"],
        secondary_keywords: ["إصلاح غسالة سامسونج", "قطع غيار غسالات ال جي", "صيانة غسالات ال جي", "تصليح غسالات فوق اتوماتيك"],
        long_tail_keywords: ["تصليح غسالة لا تعصر", "سعر تغيير مساعدات الغسالة", "أفضل فني صيانة غسالات"],
        faq: [
            { question: "لماذا لا تقوم الغسالة بتصريف المياه؟", answer: "السبب الأكثر شيوعًا هو انسداد في خرطوم الصرف أو فلتر المضخة. قد تكون هناك أيضًا مشكلة في مضخة التصريف نفسها. يمكن لفنيينا تحديد المشكلة وحلها بسرعة." },
            { question: "الغسالة لا تدور أو لا تعصر، ما الحل؟", answer: "قد يكون ذلك بسبب الحمولة الزائدة، مشكلة في حساس الباب، تآكل الحزام، أو عطل في المحرك أو لوحة التحكم. يتطلب الأمر فحصًا دقيقًا لتحديد السبب." },
            { question: "هل لديكم قطع غيار أصلية للغسالات؟", answer: "نحن نسعى لتوفير قطع غيار أصلية أو بدائل عالية الجودة لجميع الماركات الشهيرة لضمان أفضل أداء وطول عمر للإصلاح." },
            { question: "الغسالة تصدر صوتًا عاليًا أثناء العصر، هل هذا طبيعي؟", answer: "الأصوات العالية جدًا أو الخبط قد تشير إلى مشكلة في محامل الحوض (الرمان بلي) أو عدم توازن الحمولة. من الأفضل فحصها لتجنب تلف أكبر." }
        ]
    },
    sub_services: [
        { id: 'automatic-washer-repair', ar_name: 'إصلاح الغسالات الأوتوماتيك (تحميل أمامي)', en_name: 'Automatic Washer Repair (Front-Load)', urgency: 'urgent', avg_price_range: [250, 600], skill_requirements: ['appliance_technician'], tools_required: ['multimeter', 'socket_set'], seasonal_multiplier: 1.2, seo: { summary: "إصلاح متخصص للغسالات الأوتوماتيك ذات التحميل الأمامي، بما في ذلك مشاكل الباب، الصرف، والبرامج.", primary_keywords: ["صيانة غسالات اتوماتيك", "تصليح غسالة اتوماتيك"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'top-load-washer-repair', ar_name: 'إصلاح الغسالات فوق الأوتوماتيك (تحميل علوي)', en_name: 'Top-Load Washer Repair', urgency: 'urgent', avg_price_range: [200, 500], skill_requirements: ['appliance_technician'], tools_required: ['multimeter', 'agitator_puller'], seasonal_multiplier: 1.1, seo: { summary: "إصلاح سريع للغسالات فوق الأوتوماتيك، بما في ذلك مشاكل الدوران، تعبئة المياه، والأعطال الميكانيكية.", primary_keywords: ["صيانة غسالات فوق اتوماتيك"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'washer-dryer-combo-repair', ar_name: 'إصلاح الغسالات مع مجفف', en_name: 'Washer-Dryer Combo Repair', urgency: 'urgent', avg_price_range: [350, 800], skill_requirements: ['certified_appliance_technician'], tools_required: ['heating_element_tester', 'belt_tool'], seasonal_multiplier: 1.2, seo: { summary: "صيانة وإصلاح متخصص للغسالات المدمجة مع مجفف، بما في ذلك مشاكل التجفيف والبرامج المعقدة.", primary_keywords: ["صيانة غسالة مع مجفف"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'dishwasher-repair', ar_name: 'إصلاح غسالات الصحون', en_name: 'Dishwasher Repair', urgency: 'urgent', avg_price_range: [300, 650], skill_requirements: ['appliance_technician'], tools_required: ['water_inlet_valve', 'pump_assembly'], seasonal_multiplier: 1.0, seo: { summary: "إصلاح جميع أنواع غسالات الصحون، بما في ذلك مشاكل عدم التنظيف، تسرب المياه، ومشاكل الصرف.", primary_keywords: ["صيانة غسالة صحون", "تصليح جلايات"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'dryer-repair', ar_name: 'إصلاح مجففات الملابس (النشافات)', en_name: 'Dryer Repair', urgency: 'urgent', avg_price_range: [250, 500], skill_requirements: ['appliance_technician'], tools_required: ['heating_element_tester', 'belt_tool'], seasonal_multiplier: 1.1, seo: { summary: "خدمات إصلاح لجميع أنواع مجففات الملابس، بما في ذلك مشاكل عدم التسخين، الأصوات الغريبة، أو مشاكل الدوران.", primary_keywords: ["تصليح نشافات", "صيانة مجفف حراري"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'washing-machine-general-maintenance', ar_name: 'صيانة عامة للغسالات', en_name: 'Washing Machine General Maintenance', urgency: 'maintenance', avg_price_range: [200, 300], skill_requirements: ['appliance_technician'], tools_required: ['drain_cleaner', 'level'], seasonal_multiplier: 1.0, seo: { summary: "فحص وصيانة دورية للغسالة تشمل تنظيف الفلتر، فحص الخراطيم، والتأكد من توازن الحوض للحفاظ على أداء الغسالة ومنع الأعطال.", primary_keywords: ["صيانة غسالات دورية"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
};
