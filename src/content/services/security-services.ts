
import { ServiceHierarchy } from '@/types/services';

export const securityServices: ServiceHierarchy = {
    id: 'security-services',
    ar_name: 'خدمات الأمن والسلامة',
    en_name: 'Security Services',
    category: 'essential',
    priority: 2,
    seasonal_demand: 'year_round',
    pricing_tier: 'premium',
    service_duration: 4,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: ['تأكد من أن مواضع الكاميرا تحترم خصوصية الإناث داخل المنزل.'],
    seo: { 
        summary: "حلول أمنية حديثة لمنزلك وعملك. نقوم بتركيب كاميرات المراقبة، وأجهزة إنذار ضد السرقة، والأقفال الذكية، وأنظمة التحكم في الوصول الكاملة. احمِ ما يهمك مع خبرائنا.",
        primary_keywords: ["تركيب كاميرات مراقبة", "أنظمة أمنية", "شركة أمنية"], 
        secondary_keywords: ["إنذار ضد السرقة", "قفل ذكي", "كاميرات CCTV", "تحكم في الوصول"], 
        long_tail_keywords: ["أفضل شركة أنظمة أمنية في الرياض", "سعر تركيب كاميرات CCTV للمنازل", "تركيب قفل باب ذكي إلكتروني", "شركات كاميرات مراقبة بجدة"],
        faq: [
            { question: "هل يمكنني مشاهدة كاميرات المراقبة الخاصة بي من جوالي؟", answer: "نعم، جميع أنظمة كاميرات المراقبة الحديثة التي نقوم بتركيبها تأتي مع تطبيق جوال يسمح لك بمشاهدة البث المباشر والتسجيلات من أي مكان في العالم." },
            { question: "ما هي المدة التي تحتفظ بها الكاميرات بالتسجيلات؟", answer: "تعتمد مدة التسجيل على سعة جهاز التخزين (DVR/NVR) وعدد الكاميرات. عادةً ما تتراوح بين أسبوع إلى شهر. يمكن زيادة المدة عن طريق ترقية سعة التخزين." },
            { question: "هل يتصل نظام الإنذار بالشرطة تلقائيًا؟", answer: "يمكن برمجة أنظمة الإنذار للاتصال بشركة أمن خاصة أو إرسال تنبيهات مباشرة إلى هاتفك. الربط المباشر مع الشرطة يعتمد على القوانين والخدمات المتاحة في منطقتك." },
            { question: "ما فائدة قفل الباب الذكي؟", answer: "يوفر القفل الذكي راحة وأمانًا أكبر. يمكنك فتح الباب باستخدام هاتفك، أو بصمة الإصبع، أو رمز سري، ومنح وصول مؤقت للضيوف عن بعد." },
            { question: "هل تحتاج كاميرات المراقبة إلى صيانة؟", answer: "نعم، نوصي بصيانة دورية سنوية تشمل تنظيف العدسات، فحص التوصيلات، والتأكد من أن جهاز التسجيل يعمل بشكل صحيح لضمان عدم توقف النظام عند الحاجة إليه." },
            { question: "هل تعمل الكاميرات في الظلام؟", answer: "نعم، معظم الكاميرات التي نركبها مزودة بتقنية الأشعة تحت الحمراء (IR) للرؤية الليلية، مما يسمح لها بالتسجيل بوضوح تام حتى في الظلام الدامس." },
            { question: "ما هو نظام التحكم في الدخول؟", answer: "هو نظام يستخدم بطاقات أو بصمات أصابع أو رموز سرية للسماح بدخول الأشخاص المصرح لهم فقط إلى المبنى أو مناطق محددة داخله، وهو مثالي للشركات والمباني السكنية." },
            { question: "هل يمكن دمج جميع الأنظمة الأمنية معًا؟", answer: "نعم، يمكننا دمج الكاميرات ونظام الإنذار والأقفال الذكية في نظام واحد متكامل يمكن التحكم فيه من خلال تطبيق واحد لسهولة الإدارة والمراقبة." }
        ]
    },
    sub_services: [
      { id: 'cctv_install', ar_name: 'تركيب كاميرات مراقبة CCTV', en_name: 'CCTV Installation', urgency: 'scheduled', avg_price_range: [1000, 5000], skill_requirements: ['security_technician'], tools_required: ['drill', 'cable_crimper'], seasonal_multiplier: 1.1, seo: { summary: "تركيب احترافي لكاميرات المراقبة لمراقبة كاملة لممتلكاتك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'alarm_system', ar_name: 'تركيب أنظمة إنذار ضد السرقة', en_name: 'Burglar Alarm Systems Installation', urgency: 'urgent', avg_price_range: [1500, 7000], skill_requirements: ['alarm_technician'], tools_required: ['sensor_calibrator', 'control_panel_programmer'], seasonal_multiplier: 1.2, seo: { summary: "تركيب أنظمة إنذار متطورة ضد السرقة لحماية منزلك أو عملك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'smart_lock_install', ar_name: 'تركيب أقفال الأبواب الذكية', en_name: 'Smart Lock Installation', urgency: 'scheduled', avg_price_range: [500, 1200], skill_requirements: ['locksmith', 'it_basics'], tools_required: ['drill', 'chisel'], seasonal_multiplier: 1.0, seo: { summary: "قم بترقية أمنك من خلال تركيب قفل ذكي للدخول بدون مفتاح والوصول عن بعد.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'intercom_install', ar_name: 'تركيب أنظمة الاتصال الداخلي (انتركم)', en_name: 'Intercom System Installation', urgency: 'scheduled', avg_price_range: [800, 2500], skill_requirements: ['security_technician'], tools_required: ['cable_tester', 'wire_puller'], seasonal_multiplier: 1.0, seo: { summary: "تركيب أنظمة الاتصال الداخلي للاتصال المريح والآمن.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'fire_alarm_install', ar_name: 'تركيب أنظمة إنذار الحريق', en_name: 'Fire Alarm System Installation', urgency: 'urgent', avg_price_range: [2000, 8000], skill_requirements: ['fire_safety_engineer'], tools_required: ['smoke_detector_tester', 'control_panel'], seasonal_multiplier: 1.1, seo: { summary: "تركيب أنظمة إنذار الحريق لضمان الكشف المبكر والسلامة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'access_control_system', ar_name: 'تركيب أنظمة التحكم بالدخول', en_name: 'Access Control System Installation', urgency: 'scheduled', avg_price_range: [2500, 10000], skill_requirements: ['security_systems_integrator'], tools_required: ['card_reader', 'maglock', 'controller_software'], seasonal_multiplier: 1.1, seo: { summary: "أنظمة تحكم في الوصول متقدمة لإدارة ومراقبة الدخول إلى الممتلكات الخاصة بك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
