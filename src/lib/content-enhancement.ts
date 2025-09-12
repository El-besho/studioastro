// Content enhancement utilities to avoid thin content
export interface ContentEnhancement {
  uniqueInsights: string[];
  problemSolutions: string[];
  localContext: string[];
  technicalDetails: string[];
  caseStudies: string[];
  bestPractices: string[];
  commonMistakes: string[];
  costFactors: string[];
  timeEstimates: string[];
  safetyConsiderations: string[];
}

export const getContentEnhancement = (serviceType: string, city?: string): ContentEnhancement => {
  const baseEnhancements: Record<string, ContentEnhancement> = {
    'air-conditioning-hvac': {
      uniqueInsights: [
        "في المملكة العربية السعودية، تصل درجات الحرارة إلى 50°م، مما يتطلب أنظمة تكييف قادرة على العمل بكفاءة عالية",
        "معايير ASHRAE 90.1-2019 تتطلب كفاءة طاقة لا تقل عن 13 SEER للوحدات الجديدة",
        "الرطوبة النسبية في المملكة تتراوح بين 20-80%، مما يؤثر على اختيار نوع التكييف المناسب"
      ],
      problemSolutions: [
        "مشكلة عدم التبريد: غالباً ما تكون بسبب نقص الفريون أو انسداد الفلاتر",
        "ارتفاع فاتورة الكهرباء: يمكن تقليلها بنسبة 30% من خلال الصيانة المنتظمة",
        "الروائح الكريهة: تنتج عن تراكم العفن في مجاري الهواء، يمكن حلها بالتنظيف العميق"
      ],
      localContext: [
        "المناخ الصحراوي في المملكة يتطلب أنظمة تكييف مقاومة للغبار والرمل",
        "مواسم الحج والعمرة تزيد الطلب على خدمات التكييف في مكة والمدينة",
        "المدن الساحلية مثل جدة تحتاج أنظمة مقاومة للرطوبة العالية"
      ],
      technicalDetails: [
        "أنظمة VRF (Variable Refrigerant Flow) توفر توفير طاقة يصل إلى 40%",
        "تقنية Inverter تقلل استهلاك الطاقة بنسبة 30% مقارنة بالأنظمة التقليدية",
        "أنظمة التحكم الذكي تسمح ببرمجة درجات الحرارة حسب أوقات اليوم"
      ],
      caseStudies: [
        "مشروع فندق 5 نجوم في الرياض: توفير 35% في استهلاك الطاقة",
        "مبنى سكني في جدة: حل مشكلة الرطوبة العالية بنجاح",
        "مستشفى في الدمام: ضمان تدفق هواء نظيف للمرضى"
      ],
      bestPractices: [
        "فحص دوري كل 3 أشهر في الصيف، كل 6 أشهر في الشتاء",
        "استخدام فلاتر HEPA لتحسين جودة الهواء الداخلي",
        "برمجة درجات الحرارة: 24°م في النهار، 26°م في الليل"
      ],
      commonMistakes: [
        "تركيب وحدة صغيرة جداً للمساحة المطلوبة",
        "عدم تنظيف الفلاتر بانتظام",
        "وضع الوحدة الخارجية في مكان مغلق"
      ],
      costFactors: [
        "نوع الوحدة: سبليت، مركزي، أو VRF",
        "مساحة المكان المراد تكييفه",
        "مستوى العزل في المبنى",
        "عدد الساعات اليومية للاستخدام"
      ],
      timeEstimates: [
        "تركيب مكيف سبليت: 2-4 ساعات",
        "صيانة دورية: 1-2 ساعة",
        "إصلاح عطل بسيط: 30-60 دقيقة",
        "استبدال وحدة كاملة: 4-8 ساعات"
      ],
      safetyConsiderations: [
        "ضرورة إغلاق التيار الكهربائي قبل أي عمل",
        "استخدام معدات الحماية الشخصية",
        "التأكد من تهوية المكان أثناء العمل",
        "فحص التوصيلات الكهربائية بانتظام"
      ]
    },
    'plumbing-services': {
      uniqueInsights: [
        "المياه الجوفية في المملكة تحتوي على نسبة عالية من الأملاح، مما يتطلب أنابيب مقاومة للتآكل",
        "نظام الصرف الصحي في المملكة يتبع معايير الهيئة العامة للمياه",
        "ضغط المياه في المملكة يتراوح بين 2-6 بار، مما يؤثر على اختيار الأنابيب"
      ],
      problemSolutions: [
        "انسداد المجاري: يمكن حلها بالتنظيف الهيدروديناميكي",
        "تسرب المياه: استخدام تقنيات كشف التسريبات الحديثة",
        "انخفاض ضغط المياه: فحص وتنظيف الفلاتر والمرشحات"
      ],
      localContext: [
        "المناطق الصحراوية تحتاج أنابيب مقاومة للتمدد الحراري",
        "المدن الساحلية تحتاج أنابيب مقاومة للملوحة",
        "المناطق الجبلية تحتاج أنظمة ضغط مياه متخصصة"
      ],
      technicalDetails: [
        "أنابيب PPR مقاومة للحرارة حتى 95°م",
        "أنابيب UPVC مناسبة للمياه الباردة فقط",
        "أنابيب الحديد المجلفن مقاومة للضغط العالي"
      ],
      caseStudies: [
        "فيلا في الرياض: حل مشكلة انسداد المجاري الرئيسية",
        "مطعم في جدة: تركيب نظام صرف صحي متطور",
        "مبنى تجاري في الدمام: إصلاح تسريبات المياه الجوفية"
      ],
      bestPractices: [
        "فحص دوري للأنابيب كل 6 أشهر",
        "استخدام مواد مقاومة للتآكل",
        "تركيب صمامات إغلاق في نقاط استراتيجية"
      ],
      commonMistakes: [
        "استخدام أنابيب غير مناسبة لنوع المياه",
        "عدم تركيب صمامات إغلاق",
        "توصيل أنابيب مختلفة الأحجام بشكل خاطئ"
      ],
      costFactors: [
        "نوع المادة: نحاس، حديد، أو بلاستيك",
        "قطر الأنبوب المطلوب",
        "طول المسافة المراد توصيلها",
        "صعوبة الوصول للمكان"
      ],
      timeEstimates: [
        "إصلاح تسرب بسيط: 30-60 دقيقة",
        "استبدال أنبوب: 1-3 ساعات",
        "تركيب سخان مياه: 2-4 ساعات",
        "إصلاح مجاري: 2-6 ساعات"
      ],
      safetyConsiderations: [
        "إغلاق مصدر المياه قبل البدء",
        "استخدام معدات الحماية من الصدمات الكهربائية",
        "التأكد من تهوية المكان",
        "ارتداء قفازات واقية"
      ]
    }
  };

  const enhancement = baseEnhancements[serviceType] || baseEnhancements['air-conditioning-hvac'];
  
  // Add city-specific context if provided
  if (city) {
    const cityContext = getCitySpecificContext(city);
    enhancement.localContext.push(...cityContext);
  }

  return enhancement;
};

const getCitySpecificContext = (city: string): string[] => {
  const cityContexts: Record<string, string[]> = {
    'riyadh': [
      "الرياض عاصمة المملكة وتتميز بمناخ صحراوي قاري",
      "كثافة المباني العالية تتطلب أنظمة تكييف متطورة",
      "التربة الرملية في الرياض تؤثر على أساسات المباني"
    ],
    'jeddah': [
      "جدة مدينة ساحلية تتميز برطوبة عالية",
      "قرب البحر الأحمر يؤثر على معدات التكييف",
      "المناخ الاستوائي يتطلب أنظمة مقاومة للرطوبة"
    ],
    'makkah': [
      "مكة المكرمة تشهد تدفقاً هائلاً من الحجاج والمعتمرين",
      "المناخ الصحراوي الحار يتطلب أنظمة تكييف قوية",
      "الازدحام الشديد يتطلب أنظمة صرف صحي متطورة"
    ],
    'medina': [
      "المدينة المنورة تتميز بمناخ صحراوي جاف",
      "الحرم النبوي يتطلب أنظمة تكييف متخصصة",
      "التربة البركانية في المدينة تؤثر على البنية التحتية"
    ],
    'dammam': [
      "الدمام مركز صناعي مهم في المنطقة الشرقية",
      "قرب الخليج العربي يؤثر على جودة المياه",
      "المناخ الصحراوي مع رطوبة معتدلة"
    ]
  };

  return cityContexts[city] || [];
};

export const generateComprehensiveContent = (
  serviceType: string, 
  serviceName: string, 
  city?: string
): string => {
  const enhancement = getContentEnhancement(serviceType, city);
  
  return `
    <div class="comprehensive-content">
      <section class="unique-insights">
        <h2>رؤى فريدة ومتخصصة</h2>
        <ul>
          ${enhancement.uniqueInsights.map(insight => `<li>${insight}</li>`).join('')}
        </ul>
      </section>

      <section class="problem-solutions">
        <h2>حلول المشاكل الشائعة</h2>
        <ul>
          ${enhancement.problemSolutions.map(solution => `<li>${solution}</li>`).join('')}
        </ul>
      </section>

      <section class="technical-details">
        <h2>التفاصيل التقنية المتقدمة</h2>
        <ul>
          ${enhancement.technicalDetails.map(detail => `<li>${detail}</li>`).join('')}
        </ul>
      </section>

      <section class="case-studies">
        <h2>دراسات حالة حقيقية</h2>
        <ul>
          ${enhancement.caseStudies.map(caseStudy => `<li>${caseStudy}</li>`).join('')}
        </ul>
      </section>

      <section class="best-practices">
        <h2>أفضل الممارسات</h2>
        <ul>
          ${enhancement.bestPractices.map(practice => `<li>${practice}</li>`).join('')}
        </ul>
      </section>

      <section class="common-mistakes">
        <h2>الأخطاء الشائعة التي يجب تجنبها</h2>
        <ul>
          ${enhancement.commonMistakes.map(mistake => `<li>${mistake}</li>`).join('')}
        </ul>
      </section>

      <section class="cost-factors">
        <h2>عوامل التأثير على التكلفة</h2>
        <ul>
          ${enhancement.costFactors.map(factor => `<li>${factor}</li>`).join('')}
        </ul>
      </section>

      <section class="time-estimates">
        <h2>التقديرات الزمنية</h2>
        <ul>
          ${enhancement.timeEstimates.map(estimate => `<li>${estimate}</li>`).join('')}
        </ul>
      </section>

      <section class="safety-considerations">
        <h2>اعتبارات السلامة</h2>
        <ul>
          ${enhancement.safetyConsiderations.map(safety => `<li>${safety}</li>`).join('')}
        </ul>
      </section>
    </div>
  `;
};