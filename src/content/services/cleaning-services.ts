
import { ServiceHierarchy } from '@/types/services';

export const cleaningServices: ServiceHierarchy = {
    id: 'cleaning-services',
    ar_name: 'خدمات التنظيف',
    category: 'essential',
    priority: 2,
    seasonal_demand: 'seasonal',
    pricing_tier: 'budget',
    service_duration: 4,
    emergency_available: false,
    islamic_compliance: true,
    cultural_adaptations: ['يفضل فرق تنظيف نسائية للمنازل العائلية.', 'جداول عمل معدلة خلال شهر رمضان لاحترام ساعات الصيام.'],
    seo: { 
        summary: "نوفر أفضل شركة تنظيف منازل وشقق وفلل في السعودية. احصل على خدمات نظافة شاملة، بما في ذلك تنظيف عميق، غسيل كنب وسجاد، وتنظيف ما بعد البناء. فرق محترفة لبيئة نظيفة وصحية.",
        primary_keywords: ["شركة تنظيف", "تنظيف منازل", "شركة نظافة", "تنظيف شقق"], 
        secondary_keywords: ["تنظيف فلل", "تنظيف كنب", "غسيل سجاد", "تنظيف عميق", "تنظيف بيوت"], 
        long_tail_keywords: ["أفضل شركة تنظيف في السعودية", "أسعار شركات تنظيف المنازل بالرياض", "تنظيف ما بعد البناء", "شركة تنظيف مجالس", "شركة تنظيف خزانات"],
        faq: [
            { question: "ماذا تشمل خدمة التنظيف العميق؟", answer: "التنظيف العميق يشمل كل شيء في التنظيف العادي بالإضافة إلى تنظيف داخل الخزانات، خلف الأجهزة، تنظيف النوافذ من الداخل والخارج، وتنظيف شامل للمطابخ والحمامات." },
            { question: "هل يجب أن أكون في المنزل أثناء خدمة التنظيف؟", answer: "هذا يعود لتفضيلك. يمكنك البقاء في المنزل أو تزويدنا بطريقة للوصول. جميع موظفينا موثوقون ومدققون أمنيًا لضمان راحة بالك." },
            { question: "هل تستخدمون منتجات تنظيف آمنة للأطفال والحيوانات الأليفة؟", answer: "نعم، نحن نستخدم منتجات تنظيف صديقة للبيئة وآمنة لجميع أفراد الأسرة، بما في ذلك الأطفال والحيوانات الأليفة، عند الطلب." },
            { question: "كم مرة يجب أن أنظف السجاد الخاص بي بشكل احترافي؟", answer: "نوصي بتنظيف السجاد بشكل احترافي كل 6 إلى 12 شهرًا، اعتمادًا على حركة السير ووجود أطفال أو حيوانات أليفة." },
            { question: "ما هي مدة خدمة تنظيف شقة من ثلاث غرف؟", answer: "عادةً ما يستغرق تنظيف عميق لشقة من ثلاث غرف ما بين 4 إلى 6 ساعات، اعتمادًا على حالتها وحجمها." },
            { question: "هل أحتاج إلى توفير أي معدات أو مواد تنظيف؟", answer: "لا، فريقنا يأتي مجهزًا بجميع المعدات والمواد اللازمة لتقديم خدمة تنظيف شاملة وعالية الجودة." },
            { question: "كيف يتم حجز خدمة تنظيف في مدينتي؟", answer: "الأمر بسيط. ما عليك سوى ملء النموذج الموجود في هذه الصفحة، وتحديد موقعك، وسنقوم بتوصيلك بأفضل مزودي الخدمة المتاحين في منطقتك لتقديم عروض أسعار." },
            { question: "هل تقدمون خدمات التنظيف للشركات والمكاتب؟", answer: "نعم، نقدم خدمات تنظيف شاملة للقطاع التجاري، بما في ذلك المكاتب، المحلات، والمباني التجارية. يمكننا ترتيب عقود تنظيف دورية منتظمة." }
        ]
    },
    sub_services: [
      { id: 'home_deep_cleaning', ar_name: 'تنظيف عميق للمنازل والشقق', urgency: 'scheduled', avg_price_range: [350, 800], skill_requirements: ['professional_cleaner'], tools_required: ['vacuum', 'steam_cleaner'], seasonal_multiplier: 1.5, seo: { summary: "خدمات تنظيف عميق وشاملة للمنازل والشقق، تشمل إزالة الغبار العنيد، تعقيم الأسطح، وتنظيف الأماكن التي يصعب الوصول إليها، مما يترك مساحتك منتعشة وصحية.", primary_keywords: ["تنظيف عميق للمنزل"], secondary_keywords: ["نظافة شاملة للشقق"], long_tail_keywords: ["شركة تنظيف عميق بالرياض"], faq: [] } },
      { id: 'sofa_cleaning', ar_name: 'تنظيف الكنب والمجالس', urgency: 'scheduled', avg_price_range: [200, 400], skill_requirements: ['upholstery_cleaner'], tools_required: ['upholstery_cleaner_machine', 'fabric_shampoo'], seasonal_multiplier: 1.4, seo: { summary: "نعتني بتنظيف الكنب والمجالس العربية لإزالة البقع واستعادة رونقها ومظهرها الأصلي باستخدام تقنيات البخار والمواد الآمنة على الأقمشة.", primary_keywords: ["تنظيف كنب", "غسيل كنب", "تنظيف مجالس"], secondary_keywords: ["شركة تنظيف كنب", "غسيل كنب بالبخار"], long_tail_keywords: ["أسعار تنظيف الكنب بالبخار", "أفضل شركة تنظيف مجالس بالرياض"], faq: [] } },
      { id: 'carpet_cleaning', ar_name: 'تنظيف السجاد والموكيت', urgency: 'scheduled', avg_price_range: [200, 500], skill_requirements: ['carpet_technician'], tools_required: ['carpet_extractor', 'stain_remover'], seasonal_multiplier: 1.3, seo: { summary: "تنظيف احترافي للسجاد والموكيت في موقعك لإزالة البقع العنيدة، الأوساخ، والمواد المسببة للحساسية باستخدام أحدث معدات التنظيف العميق.", primary_keywords: ["غسيل سجاد", "تنظيف موكيت"], secondary_keywords: ["شركة غسيل سجاد", "تنظيف السجاد في المنزل"], long_tail_keywords: ["غسيل موكيت بالبخار", "أفضل مغسلة سجاد متنقلة"], faq: [] } },
      { id: 'water_tank_cleaning', ar_name: 'تنظيف وتعقيم خزانات المياه', urgency: 'maintenance', avg_price_range: [300, 700], skill_requirements: ['tank_cleaning_certified'], tools_required: ['high_pressure_washer', 'submersible_pump'], seasonal_multiplier: 1.3, seo: { summary: "تنظيف وتعقيم صحي لخزانات المياه العلوية والأرضية لإزالة الرواسب والشوائب وضمان مياه آمنة ونظيفة لعائلتك.", primary_keywords: ["تنظيف خزانات", "شركة تنظيف خزانات"], secondary_keywords: ["غسيل خزانات المياه", "تعقيم خزان الماء"], long_tail_keywords: ["أسعار تنظيف خزانات المياه", "تنظيف الخزان الأرضي"], faq: [] } },
      { id: 'window_cleaning', ar_name: 'تنظيف النوافذ والواجهات الزجاجية', urgency: 'scheduled', avg_price_range: [250, 600], skill_requirements: ['window_cleaner'], tools_required: ['squeegee', 'extension_pole'], seasonal_multiplier: 1.2, seo: { summary: "تنظيف نوافذ وواجهات زجاجية بدون ترك أي خطوط للحصول على إطلالة واضحة تمامًا للمنازل والمباني التجارية.", primary_keywords: ["تنظيف واجهات زجاج"], secondary_keywords: ["شركة تنظيف واجهات", "تنظيف زجاج المباني"], long_tail_keywords: ["سعر تنظيف الواجهات الزجاجية"], faq: [] } },
      { id: 'post_construction_cleaning', ar_name: 'تنظيف ما بعد البناء والترميم', urgency: 'scheduled', avg_price_range: [600, 2000], skill_requirements: ['heavy_duty_cleaner'], tools_required: ['industrial_vacuum', 'floor_scraper'], seasonal_multiplier: 1.1, seo: { summary: "خدمة تنظيف شاملة بعد انتهاء أعمال البناء أو الترميم لإزالة الغبار، الطلاء، والحطام، وتجهيز المكان للسكن أو الاستخدام.", primary_keywords: ["تنظيف بعد التشطيب", "تنظيف الفلل الجديدة"], secondary_keywords: ["شركة تنظيف بعد البناء", "تنظيف المباني الجديدة"], long_tail_keywords: ["أسعار التنظيف بعد البناء", "تنظيف شقة بعد الترميم"], faq: [] } },
      { id: 'kitchen_cleaning', ar_name: 'تنظيف المطابخ وإزالة الدهون', urgency: 'scheduled', avg_price_range: [300, 500], skill_requirements: ['kitchen_cleaning_specialist'], tools_required: ['degreaser', 'steam_cleaner'], seasonal_multiplier: 1.2, seo: { summary: "تنظيف عميق للمطابخ، يشمل إزالة الدهون المتراكمة عن الأفران، الشفاطات، والجدران لبيئة طهي صحية ونظيفة.", primary_keywords: ["شركة تنظيف مطابخ"], secondary_keywords: ["تنظيف مداخن المطاعم", "إزالة الدهون من المطبخ"], long_tail_keywords: ["أفضل شركة تنظيف مطابخ"], faq: [] } },
    ],
  };
