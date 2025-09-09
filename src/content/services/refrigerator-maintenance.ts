
import { ServiceHierarchy } from '@/types/services';

export const refrigeratorMaintenance: ServiceHierarchy = {
    id: 'refrigerator-maintenance',
    ar_name: 'صيانة الثلاجات والبرادات',
    en_name: 'Refrigerator and Chiller Maintenance',
    category: 'emergency',
    priority: 2,
    seasonal_demand: 'year_round',
    pricing_tier: 'standard',
    service_duration: 2.5,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: [],
    seo: {
        summary: "خدمات إصلاح وصيانة الثلاجات والبرادات والفريزرات. فنيون متخصصون في إصلاح جميع الأعطال مثل مشاكل التبريد، تسرب المياه، والأصوات الغريبة. خدمة سريعة لجميع الماركات.",
        primary_keywords: ["صيانة ثلاجات", "تصليح ثلاجات", "فني ثلاجات", "صيانة برادات"],
        secondary_keywords: ["إصلاح فريزر", "قطع غيار ثلاجات", "صيانة ثلاجات سامسونج", "تصليح ثلاجات ال جي"],
        long_tail_keywords: ["أفضل شركة صيانة ثلاجات بالرياض", "تصليح ثلاجات سامسونج جدة", "فني ثلاجات قريب مني", "البراد لا يبرد"],
        faq: [
            { question: "لماذا لا تبرد الثلاجة بشكل جيد؟", answer: "قد يكون السبب نقص في غاز الفريون، مشكلة في الضاغط (الكمبروسر)، انسداد في نظام التبريد، أو عطل في مروحة المبخر. فني متخصص يمكنه تحديد المشكلة بدقة." },
            { question: "هل تقومون بإصلاح جميع ماركات الثلاجات؟", answer: "نعم، لدينا خبرة في إصلاح وصيانة معظم الماركات العالمية والمحلية الشهيرة مثل سامسونج، إل جي، توشيبا، هيتاشي، وغيرها." },
            { question: "ثلاجتي تصدر صوتًا عاليًا، ما المشكلة؟", answer: "الأصوات العالية قد تكون ناتجة عن مشكلة في مروحة المكثف، مروحة المبخر، أو الضاغط. من المهم فحصها لتجنب تلف أكبر." },
            { question: "هل إصلاح الثلاجة يستحق التكلفة أم من الأفضل شراء واحدة جديدة؟", answer: "يعتمد ذلك على عمر الثلاجة وتكلفة الإصلاح. في معظم الحالات، يكون إصلاح المشاكل الشائعة مثل أعطال الترموستات أو المراوح أقل تكلفة بكثير من شراء ثلاجة جديدة." }
        ]
    },
    sub_services: [
        { id: 'refrigerator-cooling-repair', ar_name: 'إصلاح مشاكل التبريد', en_name: 'Refrigerator Cooling Repair', urgency: 'emergency', avg_price_range: [250, 600], skill_requirements: ['refrigeration_technician'], tools_required: ['multimeter', 'freon_gauge'], seasonal_multiplier: 1.3, seo: { summary: "إصلاح سريع لمشاكل التبريد في الثلاجات والفريزرات، وفحص شامل لمستويات الفريون والضاغط.", primary_keywords: ["الثلاجة لا تبرد", "إصلاح تبريد الثلاجة"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'refrigerator-water-leak-repair', ar_name: 'إصلاح تسرب المياه من الثلاجة', en_name: 'Refrigerator Water Leak Repair', urgency: 'urgent', avg_price_range: [200, 400], skill_requirements: ['refrigeration_technician'], tools_required: ['drain_snake', 'pan_replacement'], seasonal_multiplier: 1.1, seo: { summary: "إصلاح تسربات المياه الناتجة عن انسداد خطوط التصريف أو مشاكل في وعاء التبخير.", primary_keywords: ["الثلاجة تسرب ماء"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'freezer-repair', ar_name: 'إصلاح الفريزرات', en_name: 'Freezer Repair', urgency: 'emergency', avg_price_range: [300, 700], skill_requirements: ['refrigeration_technician'], tools_required: ['multimeter', 'thermostat'], seasonal_multiplier: 1.2, seo: { summary: "خدمات إصلاح متخصصة لجميع أنواع الفريزرات المنزلية والتجارية، بما في ذلك مشاكل التجميد وتراكم الثلج.", primary_keywords: ["تصليح فريزر", "صيانة فريزرات"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'commercial-refrigerator-repair', ar_name: 'صيانة ثلاجات العرض التجارية', en_name: 'Commercial Display Refrigerator Maintenance', urgency: 'urgent', avg_price_range: [400, 1000], skill_requirements: ['commercial_refrigeration_expert'], tools_required: ['commercial_compressor_tools', 'refrigerant_scale'], seasonal_multiplier: 1.1, seo: { summary: "صيانة وإصلاح ثلاجات العرض للمحلات التجارية والسوبر ماركت لضمان استمرارية عملك.", primary_keywords: ["صيانة ثلاجات عرض"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'water-cooler-repair', ar_name: 'إصلاح البرادات', en_name: 'Water Cooler and Chiller Repair', urgency: 'urgent', avg_price_range: [200, 450], skill_requirements: ['refrigeration_technician'], tools_required: ['dispenser_valve', 'thermostat'], seasonal_multiplier: 1.2, seo: { summary: "إصلاح وصيانة جميع أنواع برادات المياه المنزلية والمكتبية، وحل مشاكل التبريد والتسريب.", primary_keywords: ["صيانة برادات", "تصليح برادة"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
        { id: 'refrigerator-general-maintenance', ar_name: 'صيانة عامة للثلاجات', en_name: 'Refrigerator General Maintenance', urgency: 'maintenance', avg_price_range: [200, 350], skill_requirements: ['appliance_technician'], tools_required: ['coil_brush', 'multimeter'], seasonal_multiplier: 1.0, seo: { summary: "خدمة صيانة دورية للثلاجات تشمل تنظيف المكثف، فحص الأختام، والتأكد من عمل جميع المكونات بكفاءة لإطالة عمر الجهاز.", primary_keywords: ["صيانة ثلاجات دورية"], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
};
