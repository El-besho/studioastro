
import { ServiceHierarchy } from '@/types/services';

export const pestControl: ServiceHierarchy = {
    id: 'pest-control',
    ar_name: 'مكافحة الحشرات',
    category: 'seasonal',
    priority: 2,
    seasonal_demand: 'summer_peak',
    pricing_tier: 'standard',
    service_duration: 2,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: ['يفضل استخدام مواد غير سامة وآمنة للأسرة.', 'إبلاغ السكان قبل الرش.'],
    seo: { 
        summary: "نوفر أفضل شركة مكافحة حشرات في السعودية. رش مبيدات آمنة وفعالة للقضاء على الصراصير، النمل الأبيض، بق الفراش، والقوارض. خدمات إبادة حشرات للمنازل والشركات مع الضمان.",
        primary_keywords: ["شركة مكافحة حشرات", "رش مبيدات", "ابادة حشرات", "شركة رش"], 
        secondary_keywords: ["مكافحة الصراصير", "مكافحة النمل الأبيض", "مكافحة بق الفراش", "مكافحة القوارض"], 
        long_tail_keywords: ["أفضل شركة رش مبيدات بالرياض", "سعر مكافحة بق الفراش بجدة", "مكافحة النمل الأبيض قبل البناء", "شركة رش صراصير معتمدة"],
        faq: [
            { question: "هل المبيدات التي تستخدمونها آمنة على صحة الإنسان والحيوانات الأليفة؟", answer: "نعم، نحن نستخدم مبيدات معتمدة من الهيئة العامة للغذاء والدواء وآمنة للاستخدام في المنازل. نتبع جميع إرشادات السلامة وننصح بإبعاد الأطفال والحيوانات الأليفة أثناء عملية الرش لفترة قصيرة." },
            { question: "كم مرة أحتاج إلى خدمة مكافحة الحشرات بشكل دوري؟", answer: "للوقاية، نوصي بعقد سنوي يتضمن من 2 إلى 4 زيارات في السنة. في حالات الإصابة الشديدة، قد تكون هناك حاجة إلى زيارات متابعة إضافية." },
            { question: "ماذا علي أن أفعل قبل وصول فريق مكافحة الحشرات؟", answer: "يفضل تغطية الأطعمة والأواني، وإبعاد ألعاب الأطفال ومستلزمات الحيوانات الأليفة. سيقوم فريقنا بتزويدك بتعليمات محددة بناءً على نوع الآفة." },
            { question: "هل تقضون على الحشرات بشكل فوري؟", answer: "بعض الحشرات مثل الصراصير تموت فورًا، بينما حشرات أخرى مثل النمل الأبيض قد تستغرق بضعة أيام للقضاء على المستعمرة بأكملها حيث ينقل النمل العامل المبيد إلى العش." },
            { question: "هل تقدمون ضمانًا على خدماتكم؟", answer: "نعم، نقدم ضمانًا على معظم خدماتنا. إذا عادت الآفات خلال فترة الضمان، فسنعود لمعالجة المشكلة مرة أخرى مجانًا." },
            { question: "ما هي علامات وجود النمل الأبيض؟", answer: "ابحث عن أنابيب طينية على الجدران، أجنحة حشرات متساقطة بالقرب من النوافذ، أو خشب يبدو مجوفًا عند النقر عليه. إذا شككت في وجوده، فاطلب فحصًا متخصصًا على الفور." },
            { question: "هل يمكنكم التعامل مع مشكلة الحمام على أسطح المباني؟", answer: "نعم، نحن نقدم حلولًا إنسانية لمكافحة الطيور مثل تركيب أشواك أو شبكات لمنعها من الاستقرار على المباني دون إيذائها." },
            { question: "هل الخدمة تتطلب مغادرة المنزل؟", answer: "في معظم الحالات، مثل مكافحة الصراصير أو النمل، لا يتطلب الأمر مغادرة المنزل. في حالات الرش الضبابي أو مكافحة بق الفراش، قد نوصي بمغادرة المنزل لبضع ساعات." }
        ]
    },
    sub_services: [
      { id: 'termite-control', ar_name: 'مكافحة النمل الأبيض (الأرضة)', urgency: 'urgent', avg_price_range: [800, 2500], skill_requirements: ['pest_control_certified'], tools_required: ['termiticide_injector', 'moisture_meter'], seasonal_multiplier: 1.4, seo: { summary: "مكافحة شاملة للنمل الأبيض لحماية الممتلكات الخاصة بك من الأضرار الهيكلية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'pre-construction-termite-treatment', ar_name: 'رش الدفان قبل البناء', urgency: 'scheduled', avg_price_range: [10, 25], skill_requirements: ['pest_control_certified', 'construction_site_safety'], tools_required: ['high_pressure_sprayer', 'soil_injector'], seasonal_multiplier: 1.0, seo: { summary: "خدمة رش الدفان والمبيدات قبل صبة النظافة لحماية أساسات المباني الجديدة من هجمات النمل الأبيض المستقبلية.", primary_keywords: ["رش الدفان", "مكافحة النمل الأبيض قبل البناء"], secondary_keywords: ["رش مبيد قبل الصبة", "علاج الأرضة قبل البناء"], long_tail_keywords: ["أفضل مبيد للدفان", "سعر رش الدفان للمتر"], faq: [] } },
      { id: 'cockroach-control', ar_name: 'مكافحة الصراصير', urgency: 'urgent', avg_price_range: [250, 500], skill_requirements: ['pest_control_certified'], tools_required: ['bait_gun', 'gel_bait'], seasonal_multiplier: 1.2, seo: { summary: "إبادة فعالة للصراصير من أجل بيئة صحية خالية من الآفات.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'bed-bug-control', ar_name: 'مكافحة بق الفراش', urgency: 'emergency', avg_price_range: [500, 1500], skill_requirements: ['bed_bug_specialist'], tools_required: ['steamer', 'diatomaceous_earth'], seasonal_multiplier: 1.3, seo: { summary: "معالجة شاملة لبق الفراش لضمان نوم هانئ ليلاً.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'rodent-control', ar_name: 'مكافحة القوارض (الفئران والجرذان)', urgency: 'emergency', avg_price_range: [300, 600], skill_requirements: ['pest_control_certified'], tools_required: ['traps', 'bait_stations'], seasonal_multiplier: 1.1, seo: { summary: "مكافحة إنسانية وفعالة للقوارض للحفاظ على منزلك أو عملك آمنًا.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'ant-control', ar_name: 'مكافحة النمل', urgency: 'urgent', avg_price_range: [200, 400], skill_requirements: ['pest_control_technician'], tools_required: ['gel_bait', 'sprayer'], seasonal_multiplier: 1.0, seo: { summary: "حلول مستهدفة لمكافحة النمل للقضاء على المستعمرات ومنع الإصابات المستقبلية.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'bird-control', ar_name: 'مكافحة الطيور والحمام', urgency: 'scheduled', avg_price_range: [500, 2000], skill_requirements: ['bird_control_specialist'], tools_required: ['spikes_installation_kit', 'netting_tools'], seasonal_multiplier: 1.0, seo: { summary: "مكافحة إنسانية للطيور والحمام لحماية الممتلكات الخاصة بك من التلف والفوضى.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
