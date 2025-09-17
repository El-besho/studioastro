// Blog Post Generator for In-Depth Content
export interface BlogPost {
  title: string;
  slug: string;
  metaDescription: string;
  content: string;
  keywords: string[];
  longTailKeywords: string[];
  socialMediaHooks: string[];
  estimatedReadTime: number;
  wordCount: number;
  sections: BlogSection[];
  faq: FAQItem[];
  relatedPosts: string[];
  infographicData: InfographicData[];
  videoIdeas: VideoIdea[];
}

export interface BlogSection {
  title: string;
  content: string;
  subsections: string[];
  keywords: string[];
  tips: string[];
  warnings: string[];
  examples: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

export interface InfographicData {
  title: string;
  data: string[];
  type: 'process' | 'comparison' | 'statistics' | 'timeline';
}

export interface VideoIdea {
  title: string;
  description: string;
  duration: string;
  type: 'tutorial' | 'explainer' | 'demo';
}

// Generate comprehensive blog post
export function generateBlogPost(
  topic: string, 
  primaryKeyword: string, 
  city?: string
): BlogPost {
  const title = generateTitle(topic, primaryKeyword, city);
  const slug = generateSlug(title);
  const metaDescription = generateMetaDescription(topic, primaryKeyword, city);
  const content = generateContent(topic, primaryKeyword, city);
  const keywords = generateKeywords(topic, primaryKeyword, city);
  const longTailKeywords = generateLongTailKeywords(topic, primaryKeyword, city);
  const socialMediaHooks = generateSocialMediaHooks(topic, primaryKeyword, city);
  const sections = generateSections(topic, primaryKeyword, city);
  const faq = generateFAQ(topic, primaryKeyword, city);
  const relatedPosts = generateRelatedPosts(topic);
  const infographicData = generateInfographicData(topic);
  const videoIdeas = generateVideoIdeas(topic);

  return {
    title,
    slug,
    metaDescription,
    content,
    keywords,
    longTailKeywords,
    socialMediaHooks,
    estimatedReadTime: Math.ceil(content.split(' ').length / 200),
    wordCount: content.split(' ').length,
    sections,
    faq,
    relatedPosts,
    infographicData,
    videoIdeas
  };
}

function generateTitle(topic: string, primaryKeyword: string, city?: string): string {
  const citySuffix = city ? ` في ${city}` : '';
  return `الدليل الشامل ل${topic}${citySuffix}: كل ما تحتاج معرفته في 2024`;
}

function generateSlug(title: string): string {
  return title
    .replace(/[^\u0600-\u06FF\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function generateMetaDescription(topic: string, primaryKeyword: string, city?: string): string {
  const citySuffix = city ? ` في ${city}` : '';
  return `اكتشف الدليل الشامل ل${topic}${citySuffix}. نصائح احترافية، خطوات مفصلة، وأفضل الممارسات لتحقيق أفضل النتائج في المملكة العربية السعودية.`;
}

function generateContent(topic: string, primaryKeyword: string, city?: string): string {
  const cityContext = city ? ` في ${city}` : '';
  
  return `
    # مقدمة شاملة

    في عالم اليوم السريع، أصبح ${topic} من الأمور الأساسية التي لا يمكن تجاهلها. 
    سواء كنت صاحب منزل أو مدير مكتب، فإن فهم ${primaryKeyword} بشكل صحيح يمكن أن يوفر عليك 
    الوقت والمال ويضمن لك الحصول على أفضل النتائج${cityContext}.

    ## لماذا ${topic} مهم؟

    ${topic} ليس مجرد عملية عشوائية، بل هو علم وفن يحتاج إلى فهم عميق للمبادئ الأساسية. 
    من خلال فهم هذه الأساسيات، ستتمكن من اتخاذ قرارات مدروسة وتحقيق نتائج أفضل.

    ## الخطوات العملية

    ### 1. التخطيط المسبق
    التخطيط الجيد هو أساس النجاح في ${topic}. تأكد من:
    - تحديد الهدف بوضوح
    - جمع المعلومات المطلوبة
    - إعداد الأدوات اللازمة

    ### 2. التنفيذ الدقيق
    اتبع هذه الخطوات بدقة:
    - ابدأ بالخطوة الأولى
    - تابع كل خطوة بعناية
    - تحقق من النتائج

    ### 3. المراجعة والتحسين
    بعد الانتهاء:
    - راجع النتائج
    - حدد نقاط التحسين
    - سجل الدروس المستفادة

    ## أفضل الممارسات

    ### نصائح الخبراء
    - استخدم أدوات عالية الجودة
    - اتبع المعايير الصناعية
    - احرص على السلامة

    ### تجنب الأخطاء الشائعة
    - لا تتسرع في التنفيذ
    - لا تهمل التفاصيل
    - لا تتجاهل السلامة

    ## الخلاصة

    ${topic} يتطلب صبراً ومثابرة، ولكن النتائج تستحق الجهد. 
    اتبع هذا الدليل وستحقق النجاح المطلوب.
  `;
}

function generateKeywords(topic: string, primaryKeyword: string, city?: string): string[] {
  const baseKeywords = [
    primaryKeyword,
    topic,
    'دليل شامل',
    'نصائح احترافية',
    'أفضل الممارسات'
  ];

  if (city) {
    baseKeywords.push(`${topic} في ${city}`, `${primaryKeyword} ${city}`);
  }

  return baseKeywords;
}

function generateLongTailKeywords(topic: string, primaryKeyword: string, city?: string): string[] {
  const citySuffix = city ? ` في ${city}` : '';
  
  return [
    `كيفية ${topic} خطوة بخطوة`,
    `أفضل شركة ${primaryKeyword}${citySuffix}`,
    `تكلفة ${topic} في السعودية`,
    `${topic} للمبتدئين`,
    `نصائح ${topic} احترافية`,
    `أدوات ${topic} المطلوبة`,
    `${topic} بأسعار مناسبة`,
    `شركة ${primaryKeyword} معتمدة`
  ];
}

function generateSocialMediaHooks(topic: string, primaryKeyword: string, city?: string): string[] {
  const citySuffix = city ? ` في ${city}` : '';
  
  return [
    `هل تعلم أن ${topic} يمكن أن يوفر عليك 30% من التكاليف؟`,
    `5 نصائح ذهبية لـ ${topic}${citySuffix}`,
    `الدليل الكامل لـ ${topic}: من البداية للنهاية`,
    `أخطاء شائعة في ${topic} وكيفية تجنبها`,
    `${topic} للمبتدئين: كل ما تحتاج معرفته`
  ];
}

function generateSections(topic: string, primaryKeyword: string, city?: string): BlogSection[] {
  return [
    {
      title: `فهم أساسيات ${topic}`,
      content: `في هذا القسم، سنستكشف المبادئ الأساسية لـ ${topic}...`,
      subsections: [
        'المفاهيم الأساسية',
        'الأدوات المطلوبة',
        'المتطلبات الأولية'
      ],
      keywords: [topic, 'أساسيات', 'مفاهيم'],
      tips: [
        'خذ وقتك في فهم كل مفهوم',
        'اطلب المساعدة عند الحاجة'
      ],
      warnings: [
        'لا تتسرع في التطبيق',
        'تأكد من الفهم الكامل'
      ],
      examples: [
        'مثال عملي 1',
        'مثال عملي 2'
      ]
    },
    {
      title: `الخطوات العملية لـ ${topic}`,
      content: `الآن بعد أن فهمت الأساسيات، حان الوقت لتطبيقها عملياً...`,
      subsections: [
        'التحضير المسبق',
        'التنفيذ خطوة بخطوة',
        'المراجعة والتحسين'
      ],
      keywords: [topic, 'خطوات', 'عملية'],
      tips: [
        'اتبع الخطوات بدقة',
        'تحقق من كل خطوة'
      ],
      warnings: [
        'لا تتخطى أي خطوة',
        'تأكد من السلامة'
      ],
      examples: [
        'مثال تطبيقي 1',
        'مثال تطبيقي 2'
      ]
    }
  ];
}

function generateFAQ(topic: string, primaryKeyword: string, city?: string): FAQItem[] {
  return [
    {
      question: `ما هو ${topic}؟`,
      answer: `${topic} هو عملية مهمة تساعد في...`,
      keywords: [topic, 'تعريف']
    },
    {
      question: `كم مرة أحتاج ${topic}؟`,
      answer: `يعتمد تكرار ${topic} على عدة عوامل...`,
      keywords: [topic, 'تكرار', 'مدة']
    },
    {
      question: `ما هي تكلفة ${topic}؟`,
      answer: `تختلف تكلفة ${topic} حسب عدة عوامل...`,
      keywords: [topic, 'تكلفة', 'سعر']
    }
  ];
}

function generateRelatedPosts(topic: string): string[] {
  return [
    `أفضل 10 نصائح لـ ${topic}`,
    `أخطاء شائعة في ${topic}`,
    `${topic} للمبتدئين`,
    `تكلفة ${topic} في السعودية`
  ];
}

function generateInfographicData(topic: string): InfographicData[] {
  return [
    {
      title: `خطوات ${topic}`,
      data: ['الخطوة 1', 'الخطوة 2', 'الخطوة 3', 'الخطوة 4'],
      type: 'process'
    },
    {
      title: `مقارنة ${topic}`,
      data: ['الطريقة التقليدية', 'الطريقة الحديثة', 'الطريقة المتقدمة'],
      type: 'comparison'
    }
  ];
}

function generateVideoIdeas(topic: string): VideoIdea[] {
  return [
    {
      title: `دليل ${topic} للمبتدئين`,
      description: `فيديو تعليمي يشرح ${topic} خطوة بخطوة`,
      duration: '10-15 دقيقة',
      type: 'tutorial'
    },
    {
      title: `نصائح ${topic} من الخبراء`,
      description: `فيديو يقدم نصائح احترافية لـ ${topic}`,
      duration: '5-8 دقائق',
      type: 'explainer'
    }
  ];
}

// Generate multiple blog posts for content growth
export function generateContentBatch(topics: string[], primaryKeywords: string[], cities?: string[]): BlogPost[] {
  const posts: BlogPost[] = [];
  
  topics.forEach((topic, index) => {
    const primaryKeyword = primaryKeywords[index] || topic;
    const city = cities ? cities[index % cities.length] : undefined;
    
    posts.push(generateBlogPost(topic, primaryKeyword, city));
  });
  
  return posts;
}

// Generate content calendar with blog posts
export function generateContentCalendarWithPosts(months: number = 3): { date: string; post: BlogPost }[] {
  const topics = [
    'صيانة مكيفات الهواء',
    'تنظيف المنزل',
    'إصلاح السباكة',
    'صيانة الأجهزة الكهربائية',
    'تنظيف السجاد',
    'صيانة الثلاجات',
    'تنظيف النوافذ',
    'إصلاح الأبواب'
  ];
  
  const primaryKeywords = [
    'صيانة مكيفات',
    'تنظيف منزل',
    'إصلاح سباكة',
    'صيانة كهربائية',
    'تنظيف سجاد',
    'صيانة ثلاجات',
    'تنظيف نوافذ',
    'إصلاح أبواب'
  ];
  
  const cities = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
  
  const calendar: { date: string; post: BlogPost }[] = [];
  const today = new Date();
  
  for (let i = 0; i < months * 4; i++) { // 4 posts per month
    const topic = topics[i % topics.length];
    const primaryKeyword = primaryKeywords[i % primaryKeywords.length];
    const city = cities[i % cities.length];
    
    const date = new Date(today);
    date.setDate(date.getDate() + (i * 7)); // Weekly posts
    
    const post = generateBlogPost(topic, primaryKeyword, city);
    
    calendar.push({
      date: date.toISOString().split('T')[0],
      post
    });
  }
  
  return calendar;
}