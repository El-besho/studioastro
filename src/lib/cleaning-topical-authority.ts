// Cleaning Services Topical Authority Strategy
// Comprehensive keyword clusters and content strategy for cleaning services

export interface KeywordCluster {
  primary: string;
  secondary: string[];
  longTail: string[];
  searchVolume: number;
  difficulty: 'low' | 'medium' | 'high';
  intent: 'informational' | 'commercial' | 'transactional';
  priority: number;
}

export interface ContentTopic {
  title: string;
  type: 'guide' | 'how-to' | 'comparison' | 'review' | 'news' | 'faq';
  keywords: KeywordCluster;
  targetAudience: string;
  wordCount: number;
  priority: number;
  relatedTopics: string[];
  internalLinks: string[];
  externalLinks: string[];
}

export const cleaningKeywordClusters: KeywordCluster[] = [
  // Primary Cleaning Services
  {
    primary: 'شركة تنظيف',
    secondary: ['تنظيف منازل', 'شركة نظافة', 'تنظيف شقق', 'تنظيف فلل'],
    longTail: ['أفضل شركة تنظيف في السعودية', 'أسعار شركات تنظيف المنازل بالرياض', 'شركة تنظيف معتمدة'],
    searchVolume: 18100,
    difficulty: 'medium',
    intent: 'commercial',
    priority: 1
  },
  
  // Deep Cleaning
  {
    primary: 'تنظيف عميق',
    secondary: ['تنظيف عميق للمنزل', 'نظافة شاملة للشقق', 'تنظيف شامل'],
    longTail: ['شركة تنظيف عميق بالرياض', 'أسعار التنظيف العميق', 'تنظيف عميق للمطابخ'],
    searchVolume: 5400,
    difficulty: 'medium',
    intent: 'commercial',
    priority: 2
  },
  
  // Sofa and Upholstery Cleaning
  {
    primary: 'تنظيف كنب',
    secondary: ['غسيل كنب', 'تنظيف مجالس', 'شركة تنظيف كنب'],
    longTail: ['أسعار تنظيف الكنب بالبخار', 'أفضل شركة تنظيف مجالس بالرياض', 'تنظيف الكنب في المنزل'],
    searchVolume: 4400,
    difficulty: 'medium',
    intent: 'commercial',
    priority: 3
  },
  
  // Carpet Cleaning
  {
    primary: 'غسيل سجاد',
    secondary: ['تنظيف موكيت', 'شركة غسيل سجاد', 'تنظيف السجاد في المنزل'],
    longTail: ['غسيل موكيت بالبخار', 'أفضل مغسلة سجاد متنقلة', 'أسعار غسيل السجاد'],
    searchVolume: 1600,
    difficulty: 'high',
    intent: 'commercial',
    priority: 4
  },
  
  // Water Tank Cleaning
  {
    primary: 'تنظيف خزانات',
    secondary: ['شركة تنظيف خزانات', 'غسيل خزانات المياه', 'تعقيم خزان الماء'],
    longTail: ['أسعار تنظيف خزانات المياه', 'تنظيف الخزان الأرضي', 'شركات تنظيف خزانات المياه'],
    searchVolume: 4400,
    difficulty: 'medium',
    intent: 'commercial',
    priority: 5
  },
  
  // Window Cleaning
  {
    primary: 'تنظيف واجهات زجاج',
    secondary: ['شركة تنظيف واجهات', 'تنظيف زجاج المباني', 'تنظيف النوافذ'],
    longTail: ['سعر تنظيف الواجهات الزجاجية', 'تنظيف واجهات المحلات', 'شركة تنظيف زجاج المباني'],
    searchVolume: 320,
    difficulty: 'high',
    intent: 'commercial',
    priority: 6
  },
  
  // Post-Construction Cleaning
  {
    primary: 'تنظيف بعد التشطيب',
    secondary: ['تنظيف الفلل الجديدة', 'شركة تنظيف بعد البناء', 'تنظيف المباني الجديدة'],
    longTail: ['أسعار التنظيف بعد البناء', 'تنظيف شقة بعد الترميم', 'تنظيف المنازل الجديدة'],
    searchVolume: 600,
    difficulty: 'medium',
    intent: 'commercial',
    priority: 7
  },
  
  // Kitchen Cleaning
  {
    primary: 'شركة تنظيف مطابخ',
    secondary: ['تنظيف مداخن المطاعم', 'إزالة الدهون من المطبخ', 'تنظيف المطابخ'],
    longTail: ['أفضل شركة تنظيف مطابخ', 'تنظيف هود المطاعم', 'شركة تنظيف مداخن المطاعم'],
    searchVolume: 70,
    difficulty: 'high',
    intent: 'commercial',
    priority: 8
  },
  
  // Marble and Tile Cleaning
  {
    primary: 'جلي بلاط',
    secondary: ['جلي رخام', 'تلميع بلاط', 'تنظيف رخام'],
    longTail: ['جلي بلاط باكستاني', 'أسعار جلي السيراميك', 'تلميع الرخام الطبيعي'],
    searchVolume: 5400,
    difficulty: 'high',
    intent: 'commercial',
    priority: 9
  },
  
  // Office Cleaning
  {
    primary: 'تنظيف مكاتب',
    secondary: ['شركة تنظيف مكاتب', 'نظافة المكاتب', 'تنظيف الشركات'],
    longTail: ['أسعار تنظيف المكاتب', 'شركة تنظيف شركات', 'خدمات نظافة للشركات'],
    searchVolume: 140,
    difficulty: 'medium',
    intent: 'commercial',
    priority: 10
  }
];

export const cleaningContentTopics: ContentTopic[] = [
  // Ultimate Cleaning Guide
  {
    title: 'الدليل الشامل لتنظيف المنازل: نصائح الخبراء لبيت نظيف ومريح',
    type: 'guide',
    keywords: cleaningKeywordClusters[0],
    targetAudience: 'أصحاب المنازل والمقيمين',
    wordCount: 3000,
    priority: 1,
    relatedTopics: ['تنظيف عميق', 'تنظيف كنب', 'غسيل سجاد'],
    internalLinks: ['/services/cleaning-services', '/services/cleaning-services/home-deep-cleaning'],
    externalLinks: ['https://www.epa.gov/indoor-air-quality-iaq', 'https://www.cdc.gov/healthyhomes/']
  },
  
  // Deep Cleaning Guide
  {
    title: 'تنظيف عميق للمنازل: دليل شامل لتنظيف شامل وآمن',
    type: 'guide',
    keywords: cleaningKeywordClusters[1],
    targetAudience: 'أصحاب المنازل الجديدة والمستأجرين',
    wordCount: 2500,
    priority: 2,
    relatedTopics: ['تنظيف بعد التشطيب', 'تنظيف المطابخ', 'تنظيف خزانات'],
    internalLinks: ['/services/cleaning-services/home-deep-cleaning', '/services/cleaning-services/post-construction-cleaning'],
    externalLinks: ['https://www.epa.gov/indoor-air-quality-iaq/cleaning-indoor-air']
  },
  
  // Sofa Cleaning Guide
  {
    title: 'كيفية تنظيف الكنب والمجالس: نصائح احترافية للحفاظ على الأثاث',
    type: 'how-to',
    keywords: cleaningKeywordClusters[2],
    targetAudience: 'أصحاب المنازل والأثاث',
    wordCount: 2000,
    priority: 3,
    relatedTopics: ['غسيل سجاد', 'تنظيف الأثاث', 'مواد التنظيف'],
    internalLinks: ['/services/cleaning-services/sofa-cleaning', '/services/cleaning-services/carpet-cleaning'],
    externalLinks: ['https://www.consumerreports.org/upholstery-cleaning/']
  },
  
  // Carpet Cleaning Guide
  {
    title: 'تنظيف السجاد والموكيت: دليل شامل للحفاظ على السجاد نظيفاً',
    type: 'guide',
    keywords: cleaningKeywordClusters[3],
    targetAudience: 'أصحاب المنازل مع السجاد',
    wordCount: 2200,
    priority: 4,
    relatedTopics: ['تنظيف كنب', 'مواد التنظيف', 'إزالة البقع'],
    internalLinks: ['/services/cleaning-services/carpet-cleaning', '/services/cleaning-services/sofa-cleaning'],
    externalLinks: ['https://www.carpet-rug.org/']
  },
  
  // Water Tank Cleaning Guide
  {
    title: 'تنظيف خزانات المياه: أهمية التنظيف الدوري للحفاظ على صحة العائلة',
    type: 'guide',
    keywords: cleaningKeywordClusters[4],
    targetAudience: 'أصحاب المنازل والمباني',
    wordCount: 1800,
    priority: 5,
    relatedTopics: ['تعقيم المياه', 'صحة العائلة', 'صيانة المنزل'],
    internalLinks: ['/services/cleaning-services/water-tank-cleaning'],
    externalLinks: ['https://www.who.int/water_sanitation_health/dwq/guidelines/en/']
  },
  
  // Window Cleaning Guide
  {
    title: 'تنظيف النوافذ والواجهات الزجاجية: نصائح للحصول على إطلالة مثالية',
    type: 'how-to',
    keywords: cleaningKeywordClusters[5],
    targetAudience: 'أصحاب المنازل والمباني التجارية',
    wordCount: 1500,
    priority: 6,
    relatedTopics: ['تنظيف الواجهات', 'صيانة المباني', 'تنظيف الزجاج'],
    internalLinks: ['/services/cleaning-services/window-cleaning'],
    externalLinks: ['https://www.glass.org/']
  },
  
  // Post-Construction Cleaning Guide
  {
    title: 'تنظيف ما بعد البناء: دليل شامل لإزالة آثار البناء والترميم',
    type: 'guide',
    keywords: cleaningKeywordClusters[6],
    targetAudience: 'أصحاب المنازل الجديدة والمطورين',
    wordCount: 2000,
    priority: 7,
    relatedTopics: ['تنظيف عميق', 'تنظيف الفلل الجديدة', 'إزالة الغبار'],
    internalLinks: ['/services/cleaning-services/post-construction-cleaning', '/services/cleaning-services/home-deep-cleaning'],
    externalLinks: ['https://www.osha.gov/construction']
  },
  
  // Kitchen Cleaning Guide
  {
    title: 'تنظيف المطابخ وإزالة الدهون: نصائح احترافية لمطبخ نظيف',
    type: 'how-to',
    keywords: cleaningKeywordClusters[7],
    targetAudience: 'أصحاب المنازل والطهاة',
    wordCount: 1800,
    priority: 8,
    relatedTopics: ['تنظيف مداخن المطاعم', 'إزالة الدهون', 'تنظيف الأفران'],
    internalLinks: ['/services/cleaning-services/kitchen-cleaning'],
    externalLinks: ['https://www.foodsafety.gov/']
  },
  
  // Marble and Tile Cleaning Guide
  {
    title: 'جلي وتلميع البلاط والرخام: دليل شامل للحفاظ على الأرضيات',
    type: 'guide',
    keywords: cleaningKeywordClusters[8],
    targetAudience: 'أصحاب المنازل الفاخرة والمباني التجارية',
    wordCount: 2200,
    priority: 9,
    relatedTopics: ['تلميع الرخام', 'تنظيف السيراميك', 'صيانة الأرضيات'],
    internalLinks: ['/services/marble-tiling-services'],
    externalLinks: ['https://www.marble-institute.com/']
  },
  
  // Office Cleaning Guide
  {
    title: 'تنظيف المكاتب والشركات: دليل شامل لبيئة عمل نظيفة ومنتجة',
    type: 'guide',
    keywords: cleaningKeywordClusters[9],
    targetAudience: 'أصحاب الشركات ومديري المكاتب',
    wordCount: 2000,
    priority: 10,
    relatedTopics: ['نظافة المكاتب', 'خدمات نظافة للشركات', 'تنظيف الشركات'],
    internalLinks: ['/services/cleaning-services'],
    externalLinks: ['https://www.osha.gov/indoor-air-quality']
  },
  
  // Cleaning Products Comparison
  {
    title: 'أفضل مواد التنظيف 2024: مقارنة شاملة للمنتجات الفعالة',
    type: 'comparison',
    keywords: {
      primary: 'مواد التنظيف',
      secondary: ['أفضل منظف', 'منتجات تنظيف', 'مواد نظافة'],
      longTail: ['أفضل منظف للكنب', 'أفضل منظف للسجاد', 'مواد تنظيف آمنة'],
      searchVolume: 1000,
      difficulty: 'medium',
      intent: 'commercial',
      priority: 11
    },
    targetAudience: 'أصحاب المنازل والمستهلكين',
    wordCount: 2500,
    priority: 11,
    relatedTopics: ['تنظيف كنب', 'غسيل سجاد', 'تنظيف المطابخ'],
    internalLinks: ['/services/cleaning-services/sofa-cleaning', '/services/cleaning-services/carpet-cleaning'],
    externalLinks: ['https://www.epa.gov/saferchoice']
  },
  
  // Cleaning Frequency Guide
  {
    title: 'جدول تنظيف المنزل: متى وكيف تنظف كل جزء في منزلك',
    type: 'guide',
    keywords: {
      primary: 'جدول تنظيف المنزل',
      secondary: ['تنظيف دوري', 'نظافة المنزل', 'تنظيف أسبوعي'],
      longTail: ['جدول تنظيف شامل', 'تنظيف يومي للمنزل', 'نظام تنظيف المنزل'],
      searchVolume: 500,
      difficulty: 'low',
      intent: 'informational',
      priority: 12
    },
    targetAudience: 'أصحاب المنازل والمقيمين',
    wordCount: 2000,
    priority: 12,
    relatedTopics: ['تنظيف عميق', 'نظافة المنزل', 'تنظيف دوري'],
    internalLinks: ['/services/cleaning-services/home-deep-cleaning'],
    externalLinks: ['https://www.cdc.gov/healthyhomes/']
  },
  
  // Eco-Friendly Cleaning Guide
  {
    title: 'التنظيف الصديق للبيئة: نصائح لتنظيف آمن ومستدام',
    type: 'guide',
    keywords: {
      primary: 'تنظيف صديق للبيئة',
      secondary: ['مواد تنظيف طبيعية', 'تنظيف آمن', 'تنظيف مستدام'],
      longTail: ['أفضل مواد تنظيف طبيعية', 'تنظيف بدون مواد كيميائية', 'تنظيف صديق للبيئة'],
      searchVolume: 300,
      difficulty: 'low',
      intent: 'informational',
      priority: 13
    },
    targetAudience: 'أصحاب المنازل المهتمين بالبيئة',
    wordCount: 1800,
    priority: 13,
    relatedTopics: ['مواد التنظيف', 'تنظيف آمن', 'صحة العائلة'],
    internalLinks: ['/services/cleaning-services'],
    externalLinks: ['https://www.epa.gov/saferchoice']
  },
  
  // Cleaning Mistakes Guide
  {
    title: 'أخطاء شائعة في التنظيف: تجنب هذه الأخطاء لحماية منزلك',
    type: 'guide',
    keywords: {
      primary: 'أخطاء التنظيف',
      secondary: ['أخطاء شائعة في التنظيف', 'تنظيف خاطئ', 'حماية المنزل'],
      longTail: ['أخطاء تنظيف الكنب', 'أخطاء تنظيف السجاد', 'تنظيف خاطئ للأثاث'],
      searchVolume: 200,
      difficulty: 'low',
      intent: 'informational',
      priority: 14
    },
    targetAudience: 'أصحاب المنازل والمبتدئين',
    wordCount: 1500,
    priority: 14,
    relatedTopics: ['تنظيف كنب', 'غسيل سجاد', 'تنظيف الأثاث'],
    internalLinks: ['/services/cleaning-services/sofa-cleaning', '/services/cleaning-services/carpet-cleaning'],
    externalLinks: ['https://www.consumerreports.org/']
  },
  
  // Seasonal Cleaning Guide
  {
    title: 'تنظيف موسمي للمنازل: دليل شامل للتنظيف حسب الفصول',
    type: 'guide',
    keywords: {
      primary: 'تنظيف موسمي',
      secondary: ['تنظيف الربيع', 'تنظيف الشتاء', 'تنظيف الصيف'],
      longTail: ['تنظيف الربيع للمنزل', 'تنظيف الشتاء الشامل', 'تنظيف الصيف للمنزل'],
      searchVolume: 400,
      difficulty: 'low',
      intent: 'informational',
      priority: 15
    },
    targetAudience: 'أصحاب المنازل والمقيمين',
    wordCount: 2200,
    priority: 15,
    relatedTopics: ['تنظيف عميق', 'نظافة المنزل', 'تنظيف دوري'],
    internalLinks: ['/services/cleaning-services/home-deep-cleaning'],
    externalLinks: ['https://www.cdc.gov/healthyhomes/']
  }
];

export const cleaningContentStrategy = {
  // Content Pillars
  pillars: [
    {
      name: 'التعليم والتوعية',
      description: 'محتوى تعليمي شامل حول تقنيات التنظيف وأفضل الممارسات',
      topics: ['دلائل شاملة', 'نصائح احترافية', 'أخطاء شائعة'],
      priority: 1
    },
    {
      name: 'الخدمات المتخصصة',
      description: 'محتوى يركز على الخدمات المتخصصة في التنظيف',
      topics: ['تنظيف عميق', 'تنظيف كنب', 'غسيل سجاد', 'تنظيف خزانات'],
      priority: 2
    },
    {
      name: 'المنتجات والأدوات',
      description: 'محتوى حول أفضل مواد التنظيف والأدوات',
      topics: ['مقارنات المنتجات', 'مراجعات الأدوات', 'نصائح الشراء'],
      priority: 3
    },
    {
      name: 'الصحة والسلامة',
      description: 'محتوى يركز على الجوانب الصحية والسلامة في التنظيف',
      topics: ['تنظيف آمن', 'مواد صديقة للبيئة', 'صحة العائلة'],
      priority: 4
    }
  ],
  
  // Content Calendar
  calendar: {
    weekly: [
      'نصائح تنظيف سريعة',
      'مراجعة منتج تنظيف',
      'نصيحة أسبوعية للتنظيف',
      'قصة نجاح عميل'
    ],
    monthly: [
      'دليل شامل للتنظيف',
      'مقارنة خدمات تنظيف',
      'نصائح موسمية',
      'مراجعة أدوات تنظيف'
    ],
    quarterly: [
      'تحديث دليل التنظيف',
      'مراجعة شاملة للخدمات',
      'نصائح متقدمة للتنظيف',
      'تحديث قائمة المنتجات'
    ]
  },
  
  // SEO Strategy
  seoStrategy: {
    primaryKeywords: ['شركة تنظيف', 'تنظيف منازل', 'شركة نظافة'],
    secondaryKeywords: ['تنظيف عميق', 'تنظيف كنب', 'غسيل سجاد'],
    longTailKeywords: ['أفضل شركة تنظيف في السعودية', 'أسعار شركات تنظيف المنازل'],
    contentClusters: [
      {
        pillar: 'تنظيف المنازل',
        topics: ['تنظيف عميق', 'تنظيف دوري', 'تنظيف موسمي', 'تنظيف بعد البناء']
      },
      {
        pillar: 'تنظيف الأثاث',
        topics: ['تنظيف كنب', 'غسيل سجاد', 'تنظيف الأثاث', 'تنظيف الستائر']
      },
      {
        pillar: 'تنظيف متخصص',
        topics: ['تنظيف خزانات', 'تنظيف واجهات', 'تنظيف مطابخ', 'تنظيف مكاتب']
      }
    ]
  },
  
  // Content Performance Metrics
  metrics: {
    targetKPIs: {
      organicTraffic: 50000, // monthly
      keywordRankings: 100, // top 10 positions
      contentEngagement: 3.5, // average time on page
      conversionRate: 2.5, // percentage
      backlinks: 200 // quality backlinks
    },
    trackingMetrics: [
      'Organic traffic growth',
      'Keyword ranking improvements',
      'Content engagement rates',
      'Conversion rates',
      'Backlink acquisition',
      'Social shares',
      'User-generated content'
    ]
  }
};

export const cleaningEntityMap = {
  // Main Entities
  mainEntities: [
    'شركة تنظيف',
    'تنظيف منازل',
    'شركة نظافة',
    'تنظيف شقق',
    'تنظيف فلل',
    'تنظيف عميق',
    'تنظيف كنب',
    'غسيل سجاد',
    'تنظيف خزانات',
    'تنظيف واجهات'
  ],
  
  // Related Entities
  relatedEntities: [
    'مواد تنظيف',
    'أدوات تنظيف',
    'تنظيف آمن',
    'صحة المنزل',
    'نظافة البيئة',
    'تنظيف احترافي',
    'خدمات تنظيف',
    'عاملات نظافة',
    'شركات تنظيف',
    'مكاتب تنظيف'
  ],
  
  // Location Entities
  locationEntities: [
    'تنظيف بالرياض',
    'تنظيف بجدة',
    'تنظيف بمكة',
    'تنظيف بالمدينة',
    'تنظيف بالدمام',
    'تنظيف بالخبر',
    'تنظيف بالظهران',
    'تنظيف بالأحساء',
    'تنظيف بالطائف',
    'تنظيف ببريدة'
  ],
  
  // Service Entities
  serviceEntities: [
    'تنظيف عميق للمنازل',
    'تنظيف الكنب والمجالس',
    'غسيل السجاد والموكيت',
    'تنظيف وتعقيم خزانات المياه',
    'تنظيف النوافذ والواجهات الزجاجية',
    'تنظيف ما بعد البناء والترميم',
    'تنظيف المطابخ وإزالة الدهون',
    'جلي وتلميع البلاط والرخام',
    'تنظيف المكاتب والشركات',
    'تنظيف المسابح والحمامات'
  ]
};

export const cleaningContentInterlinking = {
  // Hub Pages
  hubPages: [
    {
      url: '/services/cleaning-services',
      title: 'خدمات التنظيف الشاملة',
      internalLinks: [
        '/services/cleaning-services/home-deep-cleaning',
        '/services/cleaning-services/sofa-cleaning',
        '/services/cleaning-services/carpet-cleaning',
        '/services/cleaning-services/water-tank-cleaning',
        '/services/cleaning-services/window-cleaning',
        '/services/cleaning-services/post-construction-cleaning',
        '/services/cleaning-services/kitchen-cleaning'
      ]
    }
  ],
  
  // Content Clusters
  contentClusters: [
    {
      pillar: 'تنظيف المنازل',
      cluster: [
        '/blog/ultimate-home-cleaning-guide',
        '/blog/deep-cleaning-guide',
        '/blog/seasonal-cleaning-guide',
        '/blog/cleaning-schedule-guide',
        '/services/cleaning-services/home-deep-cleaning'
      ]
    },
    {
      pillar: 'تنظيف الأثاث',
      cluster: [
        '/blog/sofa-cleaning-guide',
        '/blog/carpet-cleaning-guide',
        '/blog/cleaning-products-comparison',
        '/blog/cleaning-mistakes-guide',
        '/services/cleaning-services/sofa-cleaning',
        '/services/cleaning-services/carpet-cleaning'
      ]
    },
    {
      pillar: 'تنظيف متخصص',
      cluster: [
        '/blog/water-tank-cleaning-guide',
        '/blog/window-cleaning-guide',
        '/blog/post-construction-cleaning-guide',
        '/blog/kitchen-cleaning-guide',
        '/blog/office-cleaning-guide',
        '/services/cleaning-services/water-tank-cleaning',
        '/services/cleaning-services/window-cleaning',
        '/services/cleaning-services/post-construction-cleaning',
        '/services/cleaning-services/kitchen-cleaning'
      ]
    }
  ],
  
  // Cross-linking Strategy
  crossLinking: {
    // From service pages to blog posts
    serviceToBlog: {
      '/services/cleaning-services/home-deep-cleaning': [
        '/blog/ultimate-home-cleaning-guide',
        '/blog/deep-cleaning-guide',
        '/blog/cleaning-schedule-guide'
      ],
      '/services/cleaning-services/sofa-cleaning': [
        '/blog/sofa-cleaning-guide',
        '/blog/cleaning-products-comparison',
        '/blog/cleaning-mistakes-guide'
      ],
      '/services/cleaning-services/carpet-cleaning': [
        '/blog/carpet-cleaning-guide',
        '/blog/cleaning-products-comparison',
        '/blog/cleaning-mistakes-guide'
      ]
    },
    
    // From blog posts to service pages
    blogToService: {
      '/blog/ultimate-home-cleaning-guide': [
        '/services/cleaning-services',
        '/services/cleaning-services/home-deep-cleaning',
        '/services/cleaning-services/sofa-cleaning',
        '/services/cleaning-services/carpet-cleaning'
      ],
      '/blog/deep-cleaning-guide': [
        '/services/cleaning-services/home-deep-cleaning',
        '/services/cleaning-services/post-construction-cleaning'
      ]
    }
  }
};