// Cleaning Services Gap Analysis
// Identifies missing content topics and creates comprehensive blog post strategy

export interface ContentGap {
  topic: string;
  priority: 'high' | 'medium' | 'low';
  searchVolume: number;
  competition: 'low' | 'medium' | 'high';
  existingContent: boolean;
  keywords: string[];
  contentType: 'guide' | 'tips' | 'comparison' | 'how-to' | 'faq';
  estimatedWordCount: number;
}

export const cleaningGapAnalysis: ContentGap[] = [
  // HIGH PRIORITY GAPS - High search volume, low competition
  {
    topic: "تنظيف المراتب والفرشات",
    priority: "high",
    searchVolume: 140,
    competition: "medium",
    existingContent: false,
    keywords: ["تنظيف مراتب", "غسيل فرشات", "تنظيف مراتب السرير", "غسيل مراتب بالبخار"],
    contentType: "guide",
    estimatedWordCount: 2500
  },
  {
    topic: "تنظيف الستائر والمفروشات",
    priority: "high",
    searchVolume: 50,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف ستائر", "غسيل ستائر بالبخار", "تنظيف مفروشات", "تنظيف الستائر"],
    contentType: "guide",
    estimatedWordCount: 2000
  },
  {
    topic: "تنظيف المكيفات والمراوح",
    priority: "high",
    searchVolume: 210,
    competition: "medium",
    existingContent: false,
    keywords: ["تنظيف مكيفات", "صيانة مكيفات", "تنظيف مراوح", "تنظيف فلاتر المكيف"],
    contentType: "guide",
    estimatedWordCount: 2200
  },
  {
    topic: "تنظيف المسابح والجاكوزي",
    priority: "high",
    searchVolume: 170,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف مسابح", "صيانة مسابح", "تنظيف جاكوزي", "تنظيف مسابح بلاستيكية"],
    contentType: "guide",
    estimatedWordCount: 2000
  },
  {
    topic: "تنظيف الثريات والإضاءة",
    priority: "high",
    searchVolume: 40,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف ثريات", "تنظيف إضاءة", "تنظيف ثريات الكريستال", "تنظيف لمبات"],
    contentType: "guide",
    estimatedWordCount: 1800
  },

  // MEDIUM PRIORITY GAPS - Medium search volume
  {
    topic: "تنظيف الأبواب والنوافذ الخشبية",
    priority: "medium",
    searchVolume: 40,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف أبواب خشب", "تنظيف نوافذ خشب", "تنظيف الخشب", "تلميع الأبواب"],
    contentType: "guide",
    estimatedWordCount: 2000
  },
  {
    topic: "تنظيف الجدران وإزالة البقع",
    priority: "medium",
    searchVolume: 210,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف جدران", "إزالة بقع الجدران", "تنظيف الجدار", "مسح الجدران"],
    contentType: "guide",
    estimatedWordCount: 2200
  },
  {
    topic: "تنظيف الدرج والسلالم",
    priority: "medium",
    searchVolume: 40,
    competition: "medium",
    existingContent: false,
    keywords: ["تنظيف درج", "تنظيف سلالم", "تنظيف الدرج", "تنظيف رخام الدرج"],
    contentType: "guide",
    estimatedWordCount: 1800
  },
  {
    topic: "تنظيف الحوش والحديقة",
    priority: "medium",
    searchVolume: 70,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف حوش", "تنظيف حديقة", "تنظيف احواش", "عامل تنظيف حوش"],
    contentType: "guide",
    estimatedWordCount: 2000
  },
  {
    topic: "تنظيف الأجهزة الكهربائية",
    priority: "medium",
    searchVolume: 70,
    competition: "medium",
    existingContent: false,
    keywords: ["تنظيف أجهزة كهربائية", "تنظيف ثلاجة", "تنظيف غسالة", "تنظيف ميكروويف"],
    contentType: "guide",
    estimatedWordCount: 2200
  },

  // LOW PRIORITY GAPS - Lower search volume but important for completeness
  {
    topic: "تنظيف السيراميك والبلاط",
    priority: "low",
    searchVolume: 390,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف بلاط", "جلي بلاط", "تنظيف سيراميك", "تلميع بلاط"],
    contentType: "guide",
    estimatedWordCount: 2000
  },
  {
    topic: "تنظيف الرخام والحجر",
    priority: "low",
    searchVolume: 170,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف رخام", "جلي رخام", "تنظيف حجر", "تلميع رخام"],
    contentType: "guide",
    estimatedWordCount: 2000
  },
  {
    topic: "تنظيف الباركيه والأرضيات الخشبية",
    priority: "low",
    searchVolume: 40,
    competition: "high",
    existingContent: false,
    keywords: ["تنظيف باركيه", "تنظيف أرضيات خشبية", "تلميع باركيه", "منظف باركيه"],
    contentType: "guide",
    estimatedWordCount: 1800
  },
  {
    topic: "تنظيف مداخن المطاعم والمطابخ التجارية",
    priority: "low",
    searchVolume: 90,
    competition: "medium",
    existingContent: false,
    keywords: ["تنظيف مداخن", "تنظيف مداخن مطاعم", "صيانة مداخن", "تنظيف هود المطاعم"],
    contentType: "guide",
    estimatedWordCount: 2000
  },
  {
    topic: "تنظيف وتعقيم المنازل",
    priority: "low",
    searchVolume: 50,
    competition: "medium",
    existingContent: false,
    keywords: ["تعقيم منازل", "تنظيف وتعقيم", "شركة تعقيم", "خدمة تعقيم المنازل"],
    contentType: "guide",
    estimatedWordCount: 2000
  }
];

// Content Strategy by Priority
export const contentStrategy = {
  highPriority: cleaningGapAnalysis.filter(gap => gap.priority === 'high'),
  mediumPriority: cleaningGapAnalysis.filter(gap => gap.priority === 'medium'),
  lowPriority: cleaningGapAnalysis.filter(gap => gap.priority === 'low')
};

// SEO Opportunities
export const seoOpportunities = {
  highVolumeKeywords: [
    { keyword: "تنظيف مراتب", volume: 140, competition: "medium" },
    { keyword: "تنظيف مكيفات", volume: 210, competition: "medium" },
    { keyword: "تنظيف مسابح", volume: 170, competition: "high" },
    { keyword: "تنظيف جدران", volume: 210, competition: "high" },
    { keyword: "تنظيف بلاط", volume: 390, competition: "high" }
  ],
  longTailKeywords: [
    "تنظيف مراتب السرير بالبخار",
    "تنظيف ستائر بالبخار",
    "تنظيف مكيفات منزلي",
    "تنظيف مسابح بلاستيكية",
    "تنظيف ثريات الكريستال",
    "تنظيف أبواب خشبية",
    "إزالة بقع الجدران",
    "تنظيف درج رخام",
    "تنظيف حوش المنزل",
    "تنظيف أجهزة كهربائية منزلية"
  ],
  seasonalKeywords: [
    { keyword: "تنظيف مكيفات صيف", season: "summer", volume: 150 },
    { keyword: "تنظيف مسابح صيف", season: "summer", volume: 200 },
    { keyword: "تنظيف مراتب شتاء", season: "winter", volume: 100 },
    { keyword: "تنظيف ستائر ربيع", season: "spring", volume: 80 }
  ]
};

// Content Calendar
export const contentCalendar = {
  month1: [
    "تنظيف المراتب والفرشات",
    "تنظيف المكيفات والمراوح",
    "تنظيف الستائر والمفروشات"
  ],
  month2: [
    "تنظيف المسابح والجاكوزي",
    "تنظيف الثريات والإضاءة",
    "تنظيف الأبواب والنوافذ الخشبية"
  ],
  month3: [
    "تنظيف الجدران وإزالة البقع",
    "تنظيف الدرج والسلالم",
    "تنظيف الحوش والحديقة"
  ],
  month4: [
    "تنظيف الأجهزة الكهربائية",
    "تنظيف السيراميك والبلاط",
    "تنظيف الرخام والحجر"
  ]
};

export default {
  cleaningGapAnalysis,
  contentStrategy,
  seoOpportunities,
  contentCalendar
};