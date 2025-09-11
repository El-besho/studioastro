
import { ServiceHierarchy } from '@/types/services';

export const paintingDecor: ServiceHierarchy = {
    id: 'painting-decor',
    ar_name: 'خدمات الدهان والديكور',
    category: 'luxury',
    priority: 3,
    seasonal_demand: 'seasonal',
    pricing_tier: 'standard',
    service_duration: 24,
    emergency_available: false,
    islamic_compliance: true,
    cultural_adaptations: ['تقديم لوحات ألوان شائعة في المنطقة.', 'خيار للخط الإسلامي والفن.'],
    seo: { 
        summary: "قم بتحويل مساحتك من خلال خدمات الدهان والديكور الاحترافية. نحن نقدم دهانًا داخليًا وخارجيًا وتركيب ورق جدران وتشطيبات زخرفية مخصصة.",
        primary_keywords: ["دهانات", "معلم دهانات", "شركة دهانات وديكور"], 
        secondary_keywords: ["دهان داخلي", "دهان خارجي", "تركيب ورق جدران", "دهان زخرفي", "ديكور جبس"], 
        long_tail_keywords: ["أفضل معلم دهانات في السعودية", "تكلفة دهان شقة بالرياض", "تركيب ديكور جبس بورد جدة", "أسعار الدهانات مع المصنعية"],
        faq: [
            { question: "ما هي أفضل أنواع الدهانات للجدران الداخلية؟", answer: "الدهانات البلاستيكية (المائية) هي الأكثر شيوعًا للجدران الداخلية لسهولة تنظيفها وقلة رائحتها. الدهانات الزيتية أكثر متانة وتستخدم عادة للأبواب والإطارات." },
            { question: "كم طبقة من الدهان أحتاج؟", answer: "عادةً ما تحتاج الجدران إلى طبقتين من الدهان للحصول على تغطية مثالية ولون موحد، خاصة عند التغيير إلى لون مختلف تمامًا." },
            { question: "هل تقومون بإصلاح الجدران قبل الدهان؟", answer: "نعم، تشمل خدماتنا إعداد الجدران بشكل كامل، والذي يتضمن إصلاح أي شقوق أو ثقوب ومعالجتها بالمعجون وصنفرتها قبل البدء في الدهان." },
            { question: "كم من الوقت يجب أن أنتظر قبل إعادة الأثاث إلى الغرفة بعد الدهان؟", answer: "نوصي بالانتظار لمدة 24 ساعة على الأقل للسماح للدهان بالجفاف تمامًا وتجنب أي خدوش أو علامات." },
            { question: "هل ورق الجدران مناسب للحمامات والمطابخ؟", answer: "يجب استخدام أنواع معينة من ورق الجدران المقاوم للرطوبة (الفينيل) في الحمامات والمطابخ لضمان عدم تأثره بالبخار والرطوبة." },
            { question: "هل يمكن دهان الأثاث الخشبي القديم؟", answer: "نعم، يمكننا تجديد أثاثك الخشبي القديم عن طريق صنفرته وإعادة دهانه بلون جديد، مما يمنحه مظهرًا جديدًا تمامًا." },
            { question: "ما الفرق بين الجبس العادي والجبس بورد؟", answer: "الجبس العادي هو خليط تقليدي، بينما الجبس بورد هو ألواح جاهزة يتم تركيبها بسرعة ونظافة أكبر، وتوفر خيارات تصميم أكثر مرونة." },
            { question: "هل تقدمون استشارة لاختيار الألوان؟", answer: "نعم، يمكن لخبرائنا مساعدتك في اختيار الألوان والتصاميم التي تناسب ذوقك وأثاثك لتحقيق أفضل نتيجة جمالية." }
        ]
    },
    sub_services: [
      { id: 'interior_painting', ar_name: 'دهانات داخلية', urgency: 'scheduled', avg_price_range: [2000, 8000], skill_requirements: ['professional_painter'], tools_required: ['roller', 'brushes', 'scaffolding'], seasonal_multiplier: 1.3, seo: { summary: "دهان داخلي عالي الجودة لتجديد مظهر منزلك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'exterior_painting', ar_name: 'دهانات خارجية وواجهات', urgency: 'scheduled', avg_price_range: [5000, 20000], skill_requirements: ['exterior_painter'], tools_required: ['spray_gun', 'pressure_washer'], seasonal_multiplier: 1.1, seo: { summary: "دهان خارجي متين لحماية وتجميل واجهة الممتلكات الخاصة بك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'wallpaper_install', ar_name: 'تركيب ورق جدران', urgency: 'scheduled', avg_price_range: [800, 3000], skill_requirements: ['wallpaper_hanger'], tools_required: ['smoothing_tool', 'seam_roller'], seasonal_multiplier: 1.2, seo: { summary: "تركيب ورق جدران متخصص لتصميم داخلي أنيق وفريد.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'decorative_painting', ar_name: 'دهانات ديكورية (تعتيق، ترخيم)', Marbling)', urgency: 'scheduled', avg_price_range: [3000, 10000], skill_requirements: ['decorative_artist'], tools_required: ['sponges', 'glazes', 'specialty_brushes'], seasonal_multiplier: 1.2, seo: { summary: "تقنيات دهان زخرفية مخصصة مثل التعتيق والترخيم للحصول على لمسة نهائية فاخرة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'gypsum_board_decor', ar_name: 'أعمال ديكورات جبس بورد', urgency: 'scheduled', avg_price_range: [1500, 7000], skill_requirements: ['gypsum_carpenter'], tools_required: ['drywall_saw', 'screw_gun'], seasonal_multiplier: 1.1, seo: { summary: "ديكورات جبس بورد إبداعية للأسقف والجدران.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'furniture_painting', ar_name: 'دهان الأبواب والأثاث الخشبي', urgency: 'scheduled', avg_price_range: [500, 2000], skill_requirements: ['furniture_finisher'], tools_required: ['sander', 'spray_gun'], seasonal_multiplier: 1.0, seo: { summary: "إعادة طلاء ودهان الأبواب والأثاث الخشبي لاستعادة جمالها.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
