
import { ServiceHierarchy } from '@/types/services';

export const itTechServices: ServiceHierarchy = {
    id: 'it-tech-services',
    ar_name: 'خدمات تقنية المعلومات',
    category: 'essential',
    priority: 3,
    seasonal_demand: 'year_round',
    pricing_tier: 'premium',
    service_duration: 2,
    emergency_available: true,
    islamic_compliance: true,
    seo: { 
        summary: "دعم فني وتقني متخصص للأفراد والشركات. نقدم إصلاح أجهزة الكمبيوتر، واستعادة البيانات، وإعداد شبكة WiFi، وإزالة الفيروسات، وتهيئة المنزل الذكي. حلول سريعة وموثوقة لجميع مشاكلك التقنية.",
        primary_keywords: ["دعم فني", "إصلاح كمبيوتر", "فني كمبيوتر", "خدمات تقنية"], 
        secondary_keywords: ["استعادة بيانات", "إعداد شبكة واي فاي", "إزالة فيروسات", "صيانة كمبيوتر"], 
        long_tail_keywords: ["أخصائي دعم فني عن بعد", "سعر استعادة البيانات من الهارد ديسك", "تقوية إشارة الواي فاي في المنزل", "محل تصليح لابتوب قريب مني"],
        faq: [
            { question: "جهازي الكمبيوتر بطيء جدًا، هل يمكنكم المساعدة؟", answer: "نعم، بطء الكمبيوتر يمكن أن يكون ناتجًا عن عدة أسباب مثل الفيروسات، نقص في ذاكرة الوصول العشوائي (RAM)، أو امتلاء القرص الصلب. يمكن لفنيينا تشخيص المشكلة وتقديم الحل المناسب لتسريع جهازك." },
            { question: "فقدت ملفات مهمة من جهاز الكمبيوتر الخاص بي، هل يمكن استعادتها؟", answer: "في كثير من الحالات، نعم. نحن نستخدم برامج متخصصة لمحاولة استعادة البيانات المحذوفة من الأقراص الصلبة وبطاقات الذاكرة. تعتمد فرصة النجاح على عدم الكتابة فوق البيانات المفقودة." },
            { question: "إشارة الواي فاي ضعيفة في بعض أجزاء منزلي، ما هو الحل؟", answer: "يمكننا حل هذه المشكلة عن طريق تركيب مقويات إشارة (Repeaters) أو أنظمة الشبكات المتداخلة (Mesh Systems) لتوسيع تغطية الواي فاي وضمان إشارة قوية في كل ركن." },
            { question: "أعتقد أن جهازي مصاب بفيروس، ماذا أفعل؟", answer: "افصل الجهاز عن الإنترنت لمنع انتشار الفيروس، ولا تقم بإدخال أي معلومات حساسة. اتصل بنا فورًا، وسيقوم خبراؤنا بإزالة الفيروسات والبرامج الضارة بشكل آمن." },
            { question: "هل تقدمون خدمات الدعم الفني للشركات الصغيرة؟", answer: "نعم، نقدم عقود دعم فني للشركات الصغيرة تشمل صيانة دورية للأجهزة، إدارة الشبكات، النسخ الاحتياطي للبيانات، والدعم الفني عن بعد وعند الحاجة." },
            { question: "هل يمكنكم مساعدتي في إعداد نظام المنزل الذكي؟", answer: "بالتأكيد. نقوم بتركيب وتكوين جميع أجهزة المنزل الذكي مثل الإضاءة الذكية، منظمات الحرارة، المساعدات الصوتية (مثل Alexa و Google Home)، والكاميرات لتعمل معًا بسلاسة." },
            { question: "طابعتي لا تعمل، هل تصلحونها؟", answer: "نعم، نقدم خدمات صيانة وإصلاح لمعظم أنواع الطابعات، بما في ذلك طابعات الليزر وطابعات الحبر النفاث، وتشخيص مشاكل الاتصال والطباعة." },
            { question: "هل تقدمون خدمات الدعم الفني عن بعد؟", answer: "نعم، للعديد من مشاكل البرامج والشبكات، يمكننا تقديم الدعم الفني عن بعد عن طريق الاتصال بجهازك بشكل آمن وحل المشكلة دون الحاجة لزيارة منزلية." }
        ]
    },
    sub_services: [
      { id: 'pc-maintenance', ar_name: 'صيانة وإصلاح أجهزة الكمبيوتر', urgency: 'urgent', avg_price_range: [250, 600], skill_requirements: ['it_support_specialist'], tools_required: ['diagnostic_software', 'anti_static_wrist_strap'], seasonal_multiplier: 1.0, seo: { summary: "صيانة وإصلاح شامل للكمبيوتر للحفاظ على تشغيل أجهزتك بسلاسة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'data-recovery', ar_name: 'استعادة البيانات المحذوفة', urgency: 'emergency', avg_price_range: [800, 3000], skill_requirements: ['data_recovery_expert'], tools_required: ['clean_room', 'specialized_software'], seasonal_multiplier: 1.1, seo: { summary: "خدمات استعادة بيانات احترافية لاسترداد الملفات المفقودة أو المحذوفة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'wifi-install-optimization', ar_name: 'تركيب وتقوية شبكات الواي فاي', urgency: 'scheduled', avg_price_range: [400, 1200], skill_requirements: ['network_technician'], tools_required: ['cable_tester', 'wifi_analyzer'], seasonal_multiplier: 1.0, seo: { summary: "تركيب وتحسين شبكة WiFi لتغطية إنترنت قوية وموثوقة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'virus-malware-removal', ar_name: 'إزالة الفيروسات والبرامج الضارة', urgency: 'urgent', avg_price_range: [200, 500], skill_requirements: ['security_specialist'], tools_required: ['antivirus_software', 'firewall_setup'], seasonal_multiplier: 1.1, seo: { summary: "إزالة شاملة للفيروسات والبرامج الضارة لحماية أجهزتك وبياناتك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'printer-repair', ar_name: 'صيانة الطابعات', urgency: 'urgent', avg_price_range: [150, 400], skill_requirements: ['printer_technician'], tools_required: ['printer_diagnostic_tools', 'spare_parts'], seasonal_multiplier: 1.0, seo: { summary: "خدمات إصلاح طابعات سريعة وموثوقة لإعادة مكتبك إلى العمل.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'smart-home-setup', ar_name: 'تركيب وتكوين أنظمة المنزل الذكي', urgency: 'scheduled', avg_price_range: [500, 2000], skill_requirements: ['smart_home_integrator'], tools_required: ['smart_hub_configurator', 'device_linker'], seasonal_multiplier: 1.0, seo: { summary: "إعداد وتكوين متخصص لأجهزة المنزل الذكي لتجربة معيشة متصلة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
