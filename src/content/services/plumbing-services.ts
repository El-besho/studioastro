
import { ServiceHierarchy } from '@/types/services';

export const plumbingServices: ServiceHierarchy = {
    id: 'plumbing-services',
    ar_name: 'خدمات السباكة',
    en_name: 'Plumbing Services',
    category: 'emergency',
    priority: 1,
    seasonal_demand: 'year_round',
    pricing_tier: 'standard',
    service_duration: 3,
    emergency_available: true,
    islamic_compliance: true,
    cultural_adaptations: ['إمكانية طلب فنيات للمنازل التي بها نساء فقط إن أمكن.', 'تجنب الأعمال المزعجة في أوقات الصلاة.'],
    seo: {
      summary: "سباك الطوارئ الأول في السعودية. نقدم خدمات سباكة موثوقة على مدار 24 ساعة، بما في ذلك إصلاح تسربات المياه، تسليك المجاري، تركيب سخانات المياه، وحل جميع مشاكل السباكة للمنازل والشركات. فنيون معتمدون لضمان خدمة سريعة وآمنة.",
      primary_keywords: ["سباك", "سباكة", "سباك طوارئ", "فني سباكة"],
      secondary_keywords: ["إصلاح تسرب المياه", "تسليك المجاري", "تركيب سخان مياه", "سباك معتمد", "سباك الرياض"],
      long_tail_keywords: ["تكلفة إصلاح تسرب الأنابيب في السعودية", "سباك 24 ساعة قريب مني", "أفضل شركة سباكة في جدة", "كشف تسربات المياه بدون تكسير"],
      faq: [
        { question: "ما الذي يعتبر حالة طوارئ في السباكة؟", answer: "حالة طوارئ السباكة هي أي مشكلة تشكل خطرًا فوريًا بحدوث أضرار بالمياه، مثل انفجار أنبوب أو تسرب كبير أو انسداد في الصرف الصحي. في هذه الحالات، يجب عليك طلب المساعدة على الفور." },
        { question: "كيف يمكنني منع انسداد المصارف؟", answer: "لمنع الانسداد، تجنب سكب الشحوم في الحوض، واستخدم أغطية الصرف لالتقاط الشعر وجزيئات الطعام، وقم بتنظيف المصارف بشكل دوري بواسطة متخصص." },
        { question: "لماذا ضغط الماء في منزلي ضعيف؟", answer: "يمكن أن يحدث ضعف ضغط المياه بسبب عدة عوامل، بما في ذلك تسرب في الأنابيب، أو تراكم الترسبات في المواسير، أو وجود مشكلة في مضخة المياه. يمكن للسباك المحترف تشخيص السبب بدقة." },
        { question: "هل تتعاملون مع تسريبات الغاز؟", answer: "لا، تسريبات الغاز تتطلب فنيًا متخصصًا ومعتمدًا في خدمات الغاز. إذا كنت تشك في وجود تسريب للغاز، فقم بإخلاء المكان فورًا واتصل بشركة الغاز المحلية." },
        { question: "ما الفرق بين السخان الفوري والسخان العادي؟", answer: "السخان العادي (الخزان) يقوم بتسخين وتخزين كمية محدودة من الماء، بينما يقوم السخان الفوري بتسخين الماء عند الطلب مباشرة دون الحاجة لخزان، مما يوفر في استهلاك الطاقة." },
        { question: "هل تركيب خلاط دش جديد يتطلب تكسير البلاط؟", answer: "في معظم الحالات، يمكن استبدال خلاط الدش دون الحاجة لتكسير البلاط. ومع ذلك، في بعض الحالات القديمة أو المعقدة، قد يكون بعض التكسير البسيط ضروريًا." },
        { question: "هل تقدمون خدمات كشف التسربات الإلكتروني؟", answer: "نعم، نحن نستخدم أحدث أجهزة كشف التسربات الإلكترونية لتحديد مكان التسريب بدقة دون الحاجة إلى تكسير غير ضروري في الجدران أو الأرضيات." },
        { question: "كيف أعرف إذا كان خزان المياه الخاص بي بحاجة إلى تنظيف؟", answer: "العلامات الشائعة تشمل تغير في طعم أو لون الماء، وجود رواسب، أو مرور أكثر من عام على آخر عملية تنظيف. يوصى بتنظيف الخزانات سنويًا." }
      ]
    },
    sub_services: [
      { 
        id: 'leak_repair', 
        ar_name: 'إصلاح تسريبات المياه', 
        en_name: 'Water Leak Repair', 
        urgency: 'emergency', 
        avg_price_range: [200, 450], 
        skill_requirements: ['licensed_plumber'], 
        tools_required: ['pipe_wrench', 'sealant'], 
        seasonal_multiplier: 1.1, 
        seo: { 
            summary: "خدمة طوارئ على مدار 24 ساعة لإصلاح تسربات المياه. نحدد مصدر التسريب في الأنابيب أو الحنفيات ونقوم بإصلاحه فورًا لمنع الأضرار.",
            primary_keywords: ["إصلاح تسرب المياه", "كشف تسربات المياه"],
            secondary_keywords: ["إصلاح تسريب الحمام", "إصلاح تسريب المطبخ"],
            long_tail_keywords: ["شركة كشف تسربات المياه بالرياض", "سعر إصلاح تسريب أنبوب"],
            faq: [
                {question: "ما هي علامات وجود تسرب مياه خفي؟", answer: "ابحث عن بقع رطبة على الجدران أو الأسقف، رائحة عفن، صوت ماء جاري عند عدم استخدام المياه، أو زيادة غير مبررة في فاتورة المياه."},
                {question: "هل يمكنكم إصلاح التسريب تحت البلاط؟", answer: "نعم، باستخدام أجهزة الكشف الإلكترونية، يمكننا تحديد مكان التسرب بدقة تحت البلاط وإصلاحه بأقل قدر من التكسير."}
            ]
        } 
      },
      { 
        id: 'drain_unclog', 
        ar_name: 'تسليك المجاري والبالوعات', 
        en_name: 'Drain and Sewer Unclogging', 
        urgency: 'emergency', 
        avg_price_range: [250, 500], 
        skill_requirements: ['drainage_expert'], 
        tools_required: ['drain_snake', 'hydro_jet'], 
        seasonal_multiplier: 1.0, 
        seo: { 
            summary: "تسليك فعال وسريع لانسداد المجاري والبالوعات في المطابخ والحمامات وخطوط الصرف الصحي الرئيسية باستخدام أحدث المعدات.",
            primary_keywords: ["تسليك مجاري", "فتح انسداد البالوعة"],
            secondary_keywords: ["شركة تسليك مجاري", "سباك لفتح المجاري"],
            long_tail_keywords: ["تسليك مجاري المطبخ بالضغط", "أفضل طريقة لتسليك البالوعة"],
            faq: [
                {question: "ما الفرق بين جهاز التسليك (Snake) والضغط العالي (Hydro-Jetting)؟", answer: "جهاز التسليك مناسب للانسدادات البسيطة والقريبة. أما الضغط العالي فيستخدم قوة الماء لإزالة أصعب الانسدادات وتراكمات الدهون من جدران الأنابيب بشكل كامل."},
                {question: "هل يمكن أن يتسبب استخدام المواد الكيميائية في تلف الأنابيب؟", answer: "نعم، الاستخدام المتكرر للمواد الكيميائية الكاوية يمكن أن يتلف الأنابيب القديمة. نوصي بالحلول الميكانيكية الآمنة التي نقدمها."}
            ]
        } 
      },
      { 
        id: 'heater_install', 
        ar_name: 'تركيب سخانات المياه', 
        en_name: 'Water Heater Installation', 
        urgency: 'scheduled', 
        avg_price_range: [400, 800], 
        skill_requirements: ['licensed_plumber', 'electrical_basics'], 
        tools_required: ['pipe_cutter', 'multimeter'], 
        seasonal_multiplier: 1.4, 
        seo: { 
            summary: "تركيب آمن ومعتمد لجميع أنواع سخانات المياه، سواء كانت كهربائية أو فورية، لضمان حصولك على مياه ساخنة بشكل موثوق وفعال.",
            primary_keywords: ["تركيب سخان مياه", "تغيير سخان"],
            secondary_keywords: ["تركيب سخان فوري", "تركيب سخان مركزي"],
            long_tail_keywords: ["سعر تركيب سخان مياه جديد", "أفضل كهربائي لتركيب سخان"],
            faq: [
                {question: "كم عمر السخان الافتراضي؟", answer: "يتراوح العمر الافتراضي لسخان المياه ذو الخزان بين 8 و 12 عامًا. إذا كان سخانك أقدم من ذلك أو بدأ في التسريب، فقد حان وقت استبداله."},
                {question: "هل السخانات الفورية توفر الكهرباء؟", answer: "نعم، السخانات الفورية توفر الطاقة لأنها تسخن المياه عند الحاجة فقط، على عكس السخانات التقليدية التي تحافظ على سخونة خزان كامل من الماء طوال الوقت."}
            ]
        } 
      },
      { 
        id: 'toilet_repair_install', 
        ar_name: 'تركيب وإصلاح المراحيض', 
        en_name: 'Toilet Repair and Installation', 
        urgency: 'urgent', 
        avg_price_range: [200, 500], 
        skill_requirements: ['licensed_plumber'], 
        tools_required: ['closet_auger', 'wax_ring'], 
        seasonal_multiplier: 1.0, 
        seo: { 
            summary: "إصلاح وتركيب جميع أنواع المراحيض. نعالج مشاكل التسرب المستمر، ضعف تدفق المياه، والانسدادات، أو نقوم بتركيب مراحيض جديدة موفرة للمياه.",
            primary_keywords: ["إصلاح كرسي الحمام", "تركيب مرحاض"],
            secondary_keywords: ["إصلاح سيفون", "تغيير عوامة المرحاض"],
            long_tail_keywords: ["كرسي الحمام يسرب ماء باستمرار", "تركيب مرحاض إفرنجي"],
            faq: []
        } 
      },
      { 
        id: 'faucet_mixer_install', 
        ar_name: 'تركيب وإصلاح الحنفيات والخلاطات', 
        en_name: 'Faucet and Mixer Installation/Repair', 
        urgency: 'scheduled', 
        avg_price_range: [150, 350], 
        skill_requirements: ['plumber'], 
        tools_required: ['basin_wrench', 'plumbers_tape'], 
        seasonal_multiplier: 1.0, 
        seo: {
            summary: "خدمات تركيب وإصلاح لجميع أنواع حنفيات وخلاطات المطابخ والحمامات. نصلح التنقيط والتسريب أو نركب لك خلاطًا جديدًا لتحسين المظهر وتوفير المياه.",
            primary_keywords: ["تركيب خلاط", "إصلاح حنفية"],
            secondary_keywords: ["تغيير حنفية المطبخ", "إصلاح خلاط الدش"],
            long_tail_keywords: ["تركيب خلاط مغسلة", "الحنفية تنقط ماء"],
            faq: []
        }
      },
      { 
        id: 'water_pump_install_repair', 
        ar_name: 'تركيب وإصلاح مضخات المياه', 
        en_name: 'Water Pump Installation and Repair', 
        urgency: 'urgent', 
        avg_price_range: [400, 1200], 
        skill_requirements: ['pump_technician'], 
        tools_required: ['pressure_gauge', 'multimeter'], 
        seasonal_multiplier: 1.2, 
        seo: {
            summary: "تركيب وإصلاح مضخات المياه لضمان ضغط مياه قوي ومستقر في جميع أنحاء منزلك. نتعامل مع جميع الماركات والأنواع.",
            primary_keywords: ["إصلاح مضخة الماء", "تركيب دينمو ماء"],
            secondary_keywords: ["صيانة مضخات المياه", "مشاكل ضعف ضغط الماء"],
            long_tail_keywords: ["أفضل مضخة مياه للمنزل", "فني تركيب مضخات"],
            faq: []
        }
      },
      { 
        id: 'tank_cleaning', 
        ar_name: 'تنظيف خزانات المياه', 
        en_name: 'Water Tank Cleaning', 
        urgency: 'maintenance', 
        avg_price_range: [300, 700], 
        skill_requirements: ['tank_cleaning_certified'], 
        tools_required: ['high_pressure_washer', 'submersible_pump'], 
        seasonal_multiplier: 1.3, 
        seo: {
            summary: "خدمة تنظيف وتعقيم احترافية لخزانات المياه العلوية والأرضية، مما يضمن حصولك على مياه نقية وصحية للاستخدام اليومي.",
            primary_keywords: ["تنظيف خزانات", "غسيل خزانات"],
            secondary_keywords: ["شركة تنظيف خزانات", "تعقيم خزان الماء"],
            long_tail_keywords: ["أسعار تنظيف خزانات المياه", "تنظيف الخزان الأرضي"],
            faq: []
        }
      },
      { 
        id: 'pipe_replacement', 
        ar_name: 'تمديد وتغيير مواسير المياه', 
        en_name: 'Pipe Replacement and Rerouting', 
        urgency: 'scheduled', 
        avg_price_range: [1000, 5000], 
        skill_requirements: ['master_plumber'], 
        tools_required: ['pipe_cutter', 'welding_kit'], 
        seasonal_multiplier: 1.1, 
        seo: {
            summary: "استبدال كامل لشبكات المياه والصرف الصحي القديمة أو التالفة. نستخدم أفضل أنواع المواسير لضمان نظام سباكة يدوم طويلاً.",
            primary_keywords: ["تمديد مواسير", "تغيير شبكة المياه"],
            secondary_keywords: ["تمديدات سباكة", "إصلاح المواسير المكسورة"],
            long_tail_keywords: ["تكلفة تغيير مواسير المنزل", "تمديد سباكة خارجية"],
            faq: []
        }
      },
      { 
        id: 'sewage_camera_inspection', 
        ar_name: 'فحص مواسير الصرف بالكاميرا', 
        en_name: 'Sewer Camera Inspection', 
        urgency: 'consultation', 
        avg_price_range: [500, 900], 
        skill_requirements: ['drainage_expert'], 
        tools_required: ['sewer_camera', 'locator'], 
        seasonal_multiplier: 1.0, 
        seo: {
            summary: "تشخيص دقيق لمشاكل الصرف الصحي باستخدام كاميرا متخصصة، مما يسمح بتحديد مكان الانسدادات أو الكسور بدقة دون الحاجة للحفر.",
            primary_keywords: ["فحص مواسير الصرف بالكاميرا", "تصوير مجاري"],
            secondary_keywords: ["كشف انسداد المجاري", "فحص شبكة الصرف الصحي"],
            long_tail_keywords: ["سعر فحص المواسير بالكاميرا", "تحديد مكان انسداد المجاري"],
            faq: []
        }
      },
    ],
  };
