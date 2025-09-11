
import { ServiceHierarchy } from '@/types/services';

export const eventPlanning: ServiceHierarchy = {
    id: 'event-planning',
    ar_name: 'تنظيم الفعاليات والمناسبات',
    category: 'luxury',
    priority: 3,
    seasonal_demand: 'seasonal',
    pricing_tier: 'premium',
    service_duration: 10,
    emergency_available: false,
    islamic_compliance: true,
    cultural_adaptations: ['خبرة في تخطيط حفلات الزفاف والاحتفالات السعودية التقليدية.', 'ترتيبات منفصلة للضيوف من الذكور والإناث.'],
    seo: { 
        summary: "تخطيط فعاليات احترافي لحفلات الزفاف والفعاليات المؤسسية والحفلات الخاصة. نحن نتعامل مع كل شيء من التنسيق والتموين إلى الإضاءة والصوت. دعنا نجعل مناسبتك القادمة نجاحًا باهرًا.",
        primary_keywords: ["منظم حفلات", "تنسيق حفلات", "تنظيم فعاليات", "تخطيط مناسبات"], 
        secondary_keywords: ["تنسيق حفلات زفاف", "تنظيم مؤتمرات", "تجهيز حفلات", "خدمات تموين للمناسبات"], 
        long_tail_keywords: ["أفضل شركات تنظيم المؤتمرات في السعودية", "تكلفة تنظيم حفل زفاف", "تأجير معدات صوت وإضاءة", "منسق حفلات تخرج"],
        faq: [
            { question: "ما نوع الفعاليات التي تقومون بتنظيمها؟", answer: "نقوم بتنظيم مجموعة واسعة من الفعاليات، بما في ذلك حفلات الزفاف، المؤتمرات، المعارض، حفلات إطلاق المنتجات، حفلات الاستقبال الخاصة، وأعياد الميلاد." },
            { question: "هل يمكنني اختيار بعض الخدمات فقط بدلاً من باقة كاملة؟", answer: "بالتأكيد. نقدم خدمات مخصصة. يمكنك اختيار الخدمات التي تحتاجها فقط، سواء كانت إدارة كاملة للفعالية، أو مجرد التنسيق يوم الفعالية، أو خدمات التموين فقط." },
            { question: "متى يجب أن أبدأ في التخطيط لفعاليتي؟", answer: "للفعاليات الكبيرة مثل حفلات الزفاف والمؤتمرات، نوصي بالبدء قبل 6 إلى 12 شهرًا. للفعاليات الأصغر، يكفي البدء قبل شهر إلى ثلاثة أشهر." },
            { question: "هل لديكم قائمة بالموردين الموثوقين (مثل المصورين ومقدمي الطعام)؟", answer: "نعم، لدينا شبكة واسعة من الموردين المحترفين والموثوقين في جميع المجالات، ونعمل معكم لاختيار الأفضل لما يناسب ميزانيتكم وذوقكم." },
            { question: "كيف يتم تحديد ميزانية الفعالية؟", answer: "نعمل معكم لتحديد ميزانية واقعية. سنقوم بتفصيل جميع التكاليف المتوقعة، من مكان الإقامة والتموين إلى الديكور والترفيه، ونقدم خيارات تناسب ميزانيتكم." },
            { question: "هل تتعاملون مع ترتيبات أماكن الفعاليات؟", answer: "نعم، يمكننا مساعدتك في العثور على المكان المثالي وحجزه، سواء كان قاعة فندق، استراحة، مركز مؤتمرات، أو أي مكان آخر." },
            { question: "هل تقدمون خدمات خاصة بحفلات الزفاف السعودية التقليدية؟", answer: "نعم، لدينا خبرة عميقة في تقاليد حفلات الزفاف السعودية، بما في ذلك ترتيبات أقسام الرجال والنساء، وتقديم القهوة العربية، وتنسيق الفرق الشعبية." },
            { question: "ماذا يحدث في حالة سوء الأحوال الجوية لفعالية في الهواء الطلق؟", answer: "دائمًا ما نضع خطة بديلة (خطة ب). نعمل على تأمين خيارات داخلية أو ترتيب خيام مجهزة في حالة توقع سوء الأحوال الجوية لضمان استمرار فعاليتك بسلاسة." }
        ]
    },
    sub_services: [
      { id: 'wedding_planning', ar_name: 'تنسيق حفلات الزفاف', urgency: 'consultation', avg_price_range: [15000, 100000], skill_requirements: ['wedding_planner_certified'], tools_required: ['planning_software', 'vendor_network'], seasonal_multiplier: 1.5, seo: { summary: "تنسيق حفلات زفاف متخصص لجعل يومك الخاص لا يُنسى.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'corporate_event_planning', ar_name: 'تنظيم فعاليات الشركات', urgency: 'consultation', avg_price_range: [10000, 80000], skill_requirements: ['corporate_event_planner'], tools_required: ['project_management_tool', 'av_equipment'], seasonal_multiplier: 1.2, seo: { summary: "إدارة فعاليات مؤسسية احترافية لوظائف سلسة وناجحة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'private_party_planning', ar_name: 'تجهيز الحفلات الخاصة وأعياد الميلاد', urgency: 'scheduled', avg_price_range: [2000, 15000], skill_requirements: ['event_coordinator'], tools_required: ['decoration_kits', 'catering_contacts'], seasonal_multiplier: 1.3, seo: { summary: "إعداد إبداعي للحفلات الخاصة وأعياد الميلاد للاحتفال بأناقة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'catering_services', ar_name: 'خدمات الضيافة والتموين (Catering)', urgency: 'scheduled', avg_price_range: [100, 500], skill_requirements: ['caterer', 'food_safety_certified'], tools_required: ['chafing_dishes', 'serving_utensils'], seasonal_multiplier: 1.2, seo: { summary: "خدمات تموين لذيذة واحترافية للفعاليات من جميع الأحجام.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'event_lighting_sound', ar_name: 'تأجير أنظمة الصوت والإضاءة للمناسبات', urgency: 'scheduled', avg_price_range: [2000, 10000], skill_requirements: ['av_technician'], tools_required: ['speakers', 'mixers', 'led_lights'], seasonal_multiplier: 1.1, seo: { summary: "تأجير أنظمة إضاءة وصوت عالية الجودة لخلق الأجواء المثالية لحدثك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
