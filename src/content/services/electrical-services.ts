
import { ServiceHierarchy } from '@/types/services';

export const electricalServices: ServiceHierarchy = {
    id: 'electrical-services',
    ar_name: 'الخدمات الكهربائية',
    category: 'emergency',
    priority: 1,
    seasonal_demand: 'year_round',
    pricing_tier: 'standard',
    service_duration: 2,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: ['التأكد من الدخول مع رب الأسرة.', 'جدولة العمل خارج أوقات الصلاة.'],
    seo: { 
        summary: "خدمات كهربائية معتمدة للمنازل والشركات. نوفر كهربائي طوارئ على مدار 24 ساعة للتعامل مع كل شيء من إصلاح الأعطال والماس الكهربائي إلى تركيب الإضاءة والأفياش وفحص التمديدات.",
        primary_keywords: ["كهربائي", "خدمات كهربائية", "إصلاح كهرباء", "فني كهربائي"], 
        secondary_keywords: ["تركيب إضاءة", "إصلاح ماس كهربائي", "كهربائي منازل", "كهربائي طوارئ"], 
        long_tail_keywords: ["كهربائي طوارئ 24 ساعة قريب مني", "سعر فحص التمديدات الكهربائية", "أفضل كهربائي منازل في الرياض", "تركيب ثريات"],
        faq: [
            { question: "ماذا أفعل عند انقطاع الكهرباء عن جزء من المنزل؟", answer: "أولاً، تحقق من لوحة التوزيع (الطبلون) للتأكد من عدم وجود قاطع تيار مفصول. إذا كان القاطع في وضع التشغيل والمشكلة مستمرة، فقد يكون هناك عطل يتطلب كهربائيًا محترفًا." },
            { question: "هل تركيب ثريا جديدة أمر معقد؟", answer: "يعتمد ذلك على وزن الثريا والأسلاك الموجودة. تتطلب الثريات الثقيلة دعامة خاصة في السقف. من الأفضل دائمًا الاستعانة بكهربائي لضمان تركيب آمن." },
            { question: "ما هي علامات وجود أسلاك كهربائية قديمة أو خطيرة؟", answer: "العلامات تشمل الأضواء الوامضة، رائحة احتراق خفيفة من المنافذ، سخونة المفاتيح أو المقابس عند اللمس، وتكرار فصل قواطع التيار." },
            { question: "هل يمكنني زيادة عدد الأفياش في غرفة واحدة؟", answer: "نعم، يمكن للكهربائي إضافة أفياش جديدة عن طريق تمديد الأسلاك من أقرب نقطة. سيضمن ذلك أن الدائرة الكهربائية يمكنها تحمل الحمل الإضافي بأمان." },
            { question: "ما هو الفرق بين القاطع العادي وقاطع التسريب الأرضي (GFCI)؟", answer: "القاطع العادي يحمي من الحمل الزائد. أما قاطع التسريب الأرضي فيوفر حماية إضافية من الصدمات الكهربائية عن طريق قطع التيار فورًا عند اكتشاف أي تسريب للكهرباء، وهو ضروري في المطابخ والحمامات." },
            { question: "لماذا أسمع صوت أزيز من لوحة الكهرباء؟", answer: "صوت الأزيز يمكن أن يكون علامة على وجود اتصال غير محكم أو قاطع تيار تالف. هذه مشكلة خطيرة ويجب فحصها من قبل كهربائي مؤهل على الفور." },
            { question: "هل تقدمون شهادة فحص سلامة كهربائية؟", answer: "نعم، يمكننا إجراء فحص شامل لجميع التمديدات الكهربائية في منزلك وتقديم تقرير مفصل وشهادة سلامة معتمدة." },
            { question: "كم يستغرق إصلاح ماس كهربائي؟", answer: "يعتمد الوقت على مدى تعقيد المشكلة. يمكن أن يستغرق تحديد مصدر الماس الكهربائي وإصلاحه من ساعة إلى عدة ساعات." }
        ] 
    },
    sub_services: [
      { id: 'light_install', ar_name: 'تركيب إضاءة وثريات', urgency: 'scheduled', avg_price_range: [200, 600], skill_requirements: ['licensed_electrician'], tools_required: ['ladder', 'wire_stripper'], seasonal_multiplier: 1.1, seo: { summary: "تركيب احترافي لجميع أنواع وحدات الإضاءة، بما في ذلك الثريات والأضواء المعلقة والمصابيح الموجهة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'fault_repair', ar_name: 'إصلاح الأعطال والماس الكهربائي', urgency: 'emergency', avg_price_range: [250, 700], skill_requirements: ['master_electrician'], tools_required: ['multimeter', 'circuit_tester'], seasonal_multiplier: 1.2, seo: { summary: "خدمة طوارئ على مدار 24 ساعة للأعطال الكهربائية والماس الكهربائي لضمان سلامة منزلك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'outlet_install', ar_name: 'تركيب وتغيير أفياش ومقابس', urgency: 'scheduled', avg_price_range: [150, 300], skill_requirements: ['licensed_electrician'], tools_required: ['drill', 'wire_cutter'], seasonal_multiplier: 1.0, seo: { summary: "تركيب واستبدال المقابس والمآخذ والمفاتيح الكهربائية للسلامة والراحة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'panel_upgrade', ar_name: 'تغيير وتحديث لوحة التوزيع (الطبلون)', urgency: 'scheduled', avg_price_range: [800, 2500], skill_requirements: ['master_electrician'], tools_required: ['breaker_puller', 'torque_wrench'], seasonal_multiplier: 1.1, seo: { summary: "قم بترقية لوحة الكهرباء الخاصة بك لدعم المزيد من الأجهزة وتحسين السلامة في منزلك أو مكتبك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'wiring_inspection', ar_name: 'فحص وتدقيق التمديدات الكهربائية', urgency: 'maintenance', avg_price_range: [400, 800], skill_requirements: ['master_electrician'], tools_required: ['insulation_tester', 'thermal_camera'], seasonal_multiplier: 1.0, seo: { summary: "فحص شامل للأسلاك الكهربائية لتحديد المخاطر المحتملة وضمان الامتثال لمعايير السلامة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'generator_install', ar_name: 'تركيب مولدات كهربائية احتياطية', urgency: 'scheduled', avg_price_range: [2000, 7000], skill_requirements: ['certified_electrician'], tools_required: ['transfer_switch', 'heavy_gauge_cable'], seasonal_multiplier: 1.0, seo: { summary: "تركيب مولدات احتياطية لتوفير طاقة غير منقطعة أثناء انقطاع التيار الكهربائي.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'ceiling_fan_install', ar_name: 'تركيب مراوح سقف', urgency: 'scheduled', avg_price_range: [200, 400], skill_requirements: ['electrician'], tools_required: ['ladder', 'drill'], seasonal_multiplier: 1.1, seo: { summary: "تركيب مراوح السقف لتحسين دوران الهواء وتقليل تكاليف التبريد.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
