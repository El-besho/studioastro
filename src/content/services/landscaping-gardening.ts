
import { ServiceHierarchy } from '@/types/services';

export const landscapingGardening: ServiceHierarchy = {
    id: 'landscaping-gardening',
    ar_name: 'خدمات الحدائق والمناظر الطبيعية',
    category: 'luxury',
    priority: 3,
    seasonal_demand: 'seasonal',
    pricing_tier: 'premium',
    service_duration: 8,
    emergency_available: false,
    islamic_compliance: true,
    cultural_adaptations: ['يمكن أن يتضمن التصميم عناصر حديقة إسلامية تقليدية.', 'مراعاة خصوصية الأسرة في تصميم الحديقة.'],
    seo: { 
        summary: "قم بإنشاء مساحتك الخارجية التي تحلم بها من خلال خدمات تنسيق الحدائق والبستنة الاحترافية. نحن نقدم كل شيء من تصميم الحدائق وتركيب العشب الصناعي إلى تركيب أنظمة الري وتقليم الأشجار.",
        primary_keywords: ["تنسيق حدائق", "تصميم حدائق", "منسق حدائق", "شركة تنسيق حدائق"], 
        secondary_keywords: ["تنسيق حدائق منزلية", "تركيب عشب صناعي", "صيانة حدائق", "تصميم لاندسكيب"], 
        long_tail_keywords: ["تصميم حديقة منزلية صغيرة", "تكلفة العشب الصناعي مع التركيب", "صيانة شبكات الري", "أفضل شركة تنسيق حدائق بالرياض"],
        faq: [
            { question: "ما هي أفضل النباتات للزراعة في مناخ المملكة العربية السعودية؟", answer: "نوصي بالنباتات المحلية والنباتات المتحملة للحرارة والجفاف مثل أشجار النخيل، الجهنمية، الأكاسيا، والعديد من أنواع الصباريات والعصاريات." },
            { question: "كم مرة يجب أن أروي حديقتي؟", answer: "يعتمد ذلك على نوع النباتات ونظام الري والطقس. يمكن لنظام الري الآلي المبرمج جيدًا توفير الكمية المناسبة من الماء دون إهدار." },
            { question: "ما الفرق بين العشب الطبيعي والصناعي؟", answer: "العشب الطبيعي يوفر مظهرًا وملمسًا حقيقيًا ولكنه يتطلب صيانة مستمرة (ري، قص، تسميد). العشب الصناعي منخفض الصيانة ويبدو أخضر طوال العام ولكنه لا يوفر نفس الفوائد البيئية." },
            { question: "هل يمكنكم تصميم حديقة لا تتطلب الكثير من الصيانة؟", answer: "بالتأكيد. يمكننا تصميم حديقة جميلة باستخدام نباتات متحملة للجفاف، والعشب الصناعي، وأنظمة الري بالتنقيط لتقليل احتياجات الصيانة بشكل كبير." },
            { question: "هل يشمل تقليم الأشجار إزالة المخلفات؟", answer: "نعم، تشمل خدماتنا تقليم الأشجار والنخيل بشكل احترافي وإزالة جميع المخلفات الناتجة وترك المكان نظيفًا." },
            { question: "هل تقومون بتركيب أنظمة إضاءة للحدائق؟", answer: "نعم، نقوم بتصميم وتركيب أنظمة إضاءة خارجية منخفضة الجهد لإبراز جمال حديقتك ليلاً وزيادة الأمان." },
            { question: "هل تقدمون عقود صيانة شهرية للحدائق؟", answer: "نعم، نقدم عقود صيانة شهرية أو موسمية للحفاظ على حديقتك في أفضل حالة على مدار العام. تشمل العقود الري، التسميد، التقليم، ومكافحة الآفات." },
            { question: "ما هي تكلفة تصميم حديقة جديدة؟", answer: "تختلف تكلفة التصميم بشكل كبير اعتمادًا على حجم المساحة، مدى تعقيد التصميم، والمواد والنباتات المختارة. نقدم استشارة أولية وتقدير تكلفة مجاني." }
        ]
    },
    sub_services: [
      { id: 'garden_design', ar_name: 'تصميم وتنسيق الحدائق', urgency: 'consultation', avg_price_range: [2000, 10000], skill_requirements: ['landscape_architect'], tools_required: ['cad_software', 'surveying_tools'], seasonal_multiplier: 1.2, seo: { summary: "تصميم حدائق إبداعي وتنسيق حدائق لتحويل مساحتك الخارجية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'irrigation_install', ar_name: 'تركيب وصيانة شبكات الري', urgency: 'scheduled', avg_price_range: [1500, 5000], skill_requirements: ['irrigation_specialist'], tools_required: ['trencher', 'pipe_fitter'], seasonal_multiplier: 1.3, seo: { summary: "تركيب وصيانة نظام ري فعال للحفاظ على حديقتك صحية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'tree_palm_trimming', ar_name: 'تقليم الأشجار والنخيل', urgency: 'maintenance', avg_price_range: [400, 1200], skill_requirements: ['arborist'], tools_required: ['chainsaw', 'pruning_saw'], seasonal_multiplier: 1.1, seo: { summary: "تقليم احترافي للأشجار والنخيل للحفاظ على صحتها ومظهرها.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'artificial_grass_install', ar_name: 'تركيب العشب الصناعي (الثيل)', urgency: 'scheduled', avg_price_range: [50, 100], skill_requirements: ['landscaper'], tools_required: ['turf_cutter', 'seaming_tape'], seasonal_multiplier: 1.2, seo: { summary: "تركيب عشب صناعي عالي الجودة لحديقة خضراء منخفضة الصيانة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'yard_cleaning', ar_name: 'تنظيف الأحواش', urgency: 'scheduled', avg_price_range: [250, 600], skill_requirements: ['gardener', 'cleaner'], tools_required: ['rake', 'leaf_blower', 'pressure_washer'], seasonal_multiplier: 1.2, seo: { summary: "خدمة تنظيف شاملة للأحواش والساحات الخارجية، تشمل إزالة الأوراق والحطام وغسيل الأرضيات لمدخل منزل نظيف وجذاب.", primary_keywords: ["تنظيف الحوش", "عامل تنظيف حوش"], secondary_keywords: ["غسيل أحواش", "نظافة الساحات الخارجية"], long_tail_keywords: ["سعر تنظيف الحوش", "أفضل شركة تنظيف أحواش"], faq: [] } },
      { id: 'outdoor_lighting', ar_name: 'تركيب إضاءة خارجية للحدائق', urgency: 'scheduled', avg_price_range: [800, 3000], skill_requirements: ['landscaper', 'electrician'], tools_required: ['low_voltage_transformer', 'wire_strippers'], seasonal_multiplier: 1.1, seo: { summary: "حلول إضاءة خارجية مخصصة لتعزيز جمال حديقتك وأمنها.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'fountain_waterfall_install', ar_name: 'تصميم وتركيب نوافير وشلالات', urgency: 'consultation', avg_price_range: [3000, 15000], skill_requirements: ['landscape_designer', 'plumber'], tools_required: ['pump', 'waterproofing_materials'], seasonal_multiplier: 1.2, seo: { summary: "تصميم وتركيب نوافير وشلالات جميلة لخلق جو هادئ.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
