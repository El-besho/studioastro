
import { ServiceHierarchy } from '@/types/services';

export const automotiveServices: ServiceHierarchy = {
    id: 'automotive-services',
    ar_name: 'خدمات السيارات المتنقلة',
    en_name: 'Mobile Automotive Services',
    category: 'essential',
    priority: 2,
    seasonal_demand: 'year_round',
    pricing_tier: 'standard',
    service_duration: 2,
    emergency_available: true,
    islamic_compliance: true,
    seo: { 
        summary: "خدمات سيارات متنقلة مريحة تأتي إليك. من غسيل السيارات المتنقل وتغيير الزيت إلى المساعدة الطارئة على الطريق واستبدال البطارية. نوفر لك الوقت والجهد ونصلك أينما كنت.",
        primary_keywords: ["ورشة متنقلة", "خدمات سيارات متنقلة", "صيانة سيارات متنقلة"], 
        secondary_keywords: ["غسيل سيارات متنقل", "تغيير زيت عند البيت", "تغيير بطارية متنقل", "مساعدة على الطريق", "كهربائي سيارات متنقل"], 
        long_tail_keywords: ["ورشة متنقلة 24 ساعة", "سعر تغيير البطارية عند البيت", "غسيل سيارات بالبخار متنقل", "أفضل خدمة سيارات متنقلة بالرياض"],
        faq: [
            { question: "هل تأتون إلى موقعي في العمل أو المنزل؟", answer: "نعم، خدمتنا متنقلة بالكامل. نأتي إليك أينما كنت، سواء في المنزل، العمل، أو حتى في مواقف المراكز التجارية." },
            { question: "ما هي مزايا غسيل السيارات بالبخار؟", answer: "غسيل البخار يستهلك كمية قليلة جدًا من الماء، وهو صديق للبيئة. كما أنه فعال في تعقيم المقصورة الداخلية وإزالة البقع والروائح الكريهة." },
            { question: "كيف أعرف أن بطارية سيارتي بحاجة إلى تغيير؟", answer: "العلامات الشائعة تشمل صعوبة في تشغيل السيارة، ضعف إضاءة المصابيح، أو ظهور ضوء تحذير البطارية على لوحة العدادات." },
            { question: "هل لديكم جميع أنواع الزيوت والفلاتر؟", answer: "نحن نحمل مجموعة واسعة من أشهر أنواع الزيوت والفلاتر التي تناسب معظم السيارات. عند الحجز، يرجى تزويدنا بنوع سيارتك وموديلها لضمان توفير القطع المناسبة." },
            { question: "كم تستغرق خدمة تغيير الزيت المتنقلة؟", answer: "تستغرق خدمة تغيير الزيت والفحص الأساسي عادةً حوالي 30 إلى 45 دقيقة." },
            { question: "ماذا تشمل خدمة المساعدة على الطريق؟", answer: "تشمل خدماتنا الأساسية شحن أو تغيير البطارية، إصلاح أو تغيير الإطارات المثقوبة، وتوصيل الوقود. لا تشمل خدمات السحب (السطحة) حاليًا." },
            { question: "هل الفحص بالكمبيوتر يحدد جميع مشاكل السيارة؟", answer: "الفحص بالكمبيوتر (OBD2) يقرأ الأكواد التي يسجلها نظام السيارة الإلكتروني، وهو فعال جدًا في تحديد المشاكل المتعلقة بالمحرك، ناقل الحركة، والأنظمة الإلكترونية. ومع ذلك، قد لا يكتشف المشاكل الميكانيكية البحتة." },
            { question: "هل أسعاركم أغلى من الورش التقليدية؟", answer: "قد تكون أسعارنا تنافسية للغاية، وعندما تأخذ في الاعتبار الراحة وتوفير الوقت والجهد بعدم الحاجة للذهاب إلى الورشة، فإن خدمتنا تقدم قيمة ممتازة." }
        ]
    },
    sub_services: [
      { id: 'mobile_car_wash', ar_name: 'غسيل سيارات متنقل بالبخار', en_name: 'Mobile Steam Car Wash', urgency: 'scheduled', avg_price_range: [70, 200], skill_requirements: ['car_detailer'], tools_required: ['steam_cleaner', 'microfiber_towels'], seasonal_multiplier: 1.1, seo: { summary: "غسيل سيارات متنقل بالبخار صديق للبيئة يأتي إلى موقعك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'mobile_oil_change', ar_name: 'تغيير زيت وفلاتر متنقل', en_name: 'Mobile Oil and Filter Change', urgency: 'maintenance', avg_price_range: [200, 450], skill_requirements: ['mechanic'], tools_required: ['oil_extractor_pump', 'drain_pan'], seasonal_multiplier: 1.0, seo: { summary: "خدمة تغيير زيت وفلاتر متنقلة مريحة في منزلك أو مكتبك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'roadside_assistance', ar_name: 'خدمة المساعدة على الطريق (بطارية، بنشر)', en_name: 'Roadside Assistance (Battery, Flat Tire)', urgency: 'emergency', avg_price_range: [200, 500], skill_requirements: ['roadside_technician'], tools_required: ['tow_truck', 'jumper_cables', 'tire_iron'], seasonal_multiplier: 1.2, seo: { summary: "مساعدة على الطريق على مدار 24 ساعة لبدء تشغيل البطارية وتغيير الإطارات المثقوبة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'battery_replacement', ar_name: 'تغيير البطارية في الموقع', en_name: 'Mobile Battery Replacement', urgency: 'emergency', avg_price_range: [300, 600], skill_requirements: ['mechanic'], tools_required: ['battery_tester', 'socket_wrench_set'], seasonal_multiplier: 1.1, seo: { summary: "استبدال بطارية السيارة في الموقع لإعادتك إلى الطريق بسرعة.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'brake_pad_replacement', ar_name: 'تغيير فحمات الفرامل متنقل', en_name: 'Mobile Brake Pad Replacement', urgency: 'urgent', avg_price_range: [400, 800], skill_requirements: ['certified_mechanic'], tools_required: ['brake_caliper_tool', 'torque_wrench'], seasonal_multiplier: 1.0, seo: { summary: "استبدال فحمات الفرامل المتنقلة لراحتك وسلامتك.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
      { id: 'car_checkup', ar_name: 'فحص كمبيوتر للسيارات متنقل', en_name: 'Mobile Car Computer Diagnostic Check', urgency: 'urgent', avg_price_range: [150, 300], skill_requirements: ['mechanic'], tools_required: ['obd2_scanner'], seasonal_multiplier: 1.0, seo: { summary: "فحص تشخيصي كمبيوتر متنقل للسيارة لتحديد المشكلات واستكشافها وإصلاحها.", primary_keywords: [], secondary_keywords: [], long_tail_keywords: [], faq: [] } },
    ],
  };
