// Comprehensive Content Strategy System
export interface ContentTopic {
  id: string;
  title: string;
  category: 'guide' | 'tutorial' | 'comparison' | 'news' | 'case-study' | 'infographic';
  primaryKeyword: string;
  longTailKeywords: string[];
  socialKeywords: string[];
  targetAudience: string;
  contentLength: 'short' | 'medium' | 'long' | 'comprehensive';
  estimatedReadTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  localRelevance: string[];
  seasonalRelevance: string[];
  competitorGaps: string[];
  userIntent: 'informational' | 'commercial' | 'navigational' | 'transactional';
  contentPillars: string[];
  socialMediaHooks: string[];
  callToAction: string;
  relatedTopics: string[];
  contentIdeas: string[];
}

export interface ContentCalendar {
  date: string;
  topic: ContentTopic;
  status: 'planned' | 'in-progress' | 'review' | 'published' | 'promoted';
  priority: 'high' | 'medium' | 'low';
  assignedWriter: string;
  deadline: string;
  socialMediaPosts: SocialMediaPost[];
}

export interface SocialMediaPost {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'tiktok';
  content: string;
  hashtags: string[];
  keywords: string[];
  imageUrl?: string;
  videoUrl?: string;
  scheduledTime: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}

export interface LongTailKeyword {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  intent: string;
  relatedKeywords: string[];
  contentIdeas: string[];
  socialMediaVariations: string[];
}

// Content Topics Database
export const contentTopics: ContentTopic[] = [
  {
    id: 'ac-maintenance-complete-guide',
    title: 'الدليل الشامل لصيانة مكيفات الهواء في السعودية',
    category: 'guide',
    primaryKeyword: 'صيانة مكيفات الهواء',
    longTailKeywords: [
      'كيفية صيانة مكيف الهواء في المنزل',
      'أفضل شركة صيانة مكيفات في الرياض',
      'تكلفة صيانة مكيف سبليت في جدة',
      'متى تحتاج مكيف الهواء للصيانة',
      'صيانة مكيفات الهواء المركزية',
      'تنظيف مكيف الهواء بنفسك',
      'صيانة مكيفات الهواء قبل الصيف',
      'أعطال مكيفات الهواء الشائعة',
      'صيانة مكيفات الهواء في الدمام',
      'شركة صيانة مكيفات معتمدة',
      'صيانة مكيفات الهواء 24 ساعة',
      'صيانة مكيفات الهواء بأسعار مناسبة'
    ],
    socialKeywords: [
      '#صيانة_مكيفات',
      '#تكييف_هواء',
      '#صيانة_منزلية',
      '#الرياض_خدمات',
      '#جدة_خدمات',
      '#الدمام_خدمات',
      '#صيف_سعودي',
      '#توفير_طاقة',
      '#خدمات_منزلية',
      '#صيانة_احترافية'
    ],
    targetAudience: 'أصحاب المنازل والمكاتب في السعودية',
    contentLength: 'comprehensive',
    estimatedReadTime: 15,
    difficulty: 'beginner',
    localRelevance: ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'],
    seasonalRelevance: ['صيف', 'ربيع'],
    competitorGaps: [
      'معلومات مفصلة عن معايير ASHRAE',
      'تكاليف صيانة مفصلة حسب النوع',
      'دليل خطوة بخطوة للصيانة الذاتية',
      'مقارنة بين أنواع المكيفات المختلفة'
    ],
    userIntent: 'informational',
    contentPillars: ['التعليم', 'الصيانة', 'التوفير', 'الراحة'],
    socialMediaHooks: [
      'هل تعلم أن تنظيف مكيف الهواء يمكن أن يوفر 30% من فاتورة الكهرباء؟',
      '5 علامات تدل على أن مكيفك يحتاج صيانة فورية',
      'الدليل الكامل لصيانة مكيفات الهواء في السعودية'
    ],
    callToAction: 'احجز صيانة مكيفاتك الآن واحصل على خصم 20%',
    relatedTopics: [
      'تركيب مكيفات الهواء',
      'إصلاح مكيفات الهواء',
      'توفير الطاقة في التكييف',
      'أنواع مكيفات الهواء'
    ],
    contentIdeas: [
      'دليل خطوة بخطوة لصيانة مكيف الهواء',
      'مقارنة بين أنواع المكيفات المختلفة',
      'تكاليف صيانة المكيفات حسب النوع والماركة',
      'أفضل أوقات صيانة المكيفات في السعودية',
      'كيفية اختيار شركة صيانة مكيفات موثوقة',
      'أعطال المكيفات الشائعة وكيفية إصلاحها',
      'نصائح لتوفير الطاقة في التكييف',
      'صيانة مكيفات الهواء في المباني التجارية'
    ]
  },
  {
    id: 'plumbing-emergency-guide',
    title: 'دليل الطوارئ للسباكة: كيفية التعامل مع مشاكل السباكة العاجلة',
    category: 'guide',
    primaryKeyword: 'طوارئ السباكة',
    longTailKeywords: [
      'ماذا تفعل عند انفجار ماسورة المياه',
      'كيفية إصلاح تسرب المياه في المنزل',
      'أفضل سباك طوارئ في الرياض',
      'إصلاح انسداد المجاري في المنزل',
      'طوارئ السباكة في جدة 24 ساعة',
      'كيفية إغلاق محبس المياه الرئيسي',
      'إصلاح سخان المياه المعطل',
      'طوارئ السباكة في الدمام',
      'سباك طوارئ معتمد في السعودية',
      'إصلاح تسرب المياه تحت الأرض',
      'طوارئ السباكة في مكة المكرمة',
      'كيفية منع تجمد الأنابيب في الشتاء'
    ],
    socialKeywords: [
      '#طوارئ_السباكة',
      '#إصلاح_المياه',
      '#سباك_طوارئ',
      '#الرياض_طوارئ',
      '#جدة_طوارئ',
      '#الدمام_طوارئ',
      '#مشاكل_السباكة',
      '#تسرب_المياه',
      '#انسداد_المجاري',
      '#خدمات_طوارئ'
    ],
    targetAudience: 'أصحاب المنازل والمكاتب',
    contentLength: 'comprehensive',
    estimatedReadTime: 12,
    difficulty: 'beginner',
    localRelevance: ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'],
    seasonalRelevance: ['شتاء', 'صيف'],
    competitorGaps: [
      'دليل خطوة بخطوة للطوارئ',
      'قائمة أدوات الطوارئ المطلوبة',
      'تكاليف إصلاح الطوارئ',
      'معلومات عن التأمين على الأضرار'
    ],
    userIntent: 'informational',
    contentPillars: ['الطوارئ', 'الأمان', 'الإصلاح', 'الوقاية'],
    socialMediaHooks: [
      'هل تعلم أن 90% من أضرار المياه يمكن منعها بإجراء بسيط؟',
      '5 خطوات لإنقاذ منزلك من أضرار المياه',
      'دليل الطوارئ للسباكة: كن مستعداً لأي طارئ'
    ],
    callToAction: 'اتصل بسباك طوارئ معتمد الآن - خدمة 24/7',
    relatedTopics: [
      'صيانة السباكة الدورية',
      'تركيب أنظمة السباكة',
      'تحديث أنظمة السباكة القديمة',
      'أنواع أنابيب المياه'
    ],
    contentIdeas: [
      'دليل الطوارئ للسباكة: خطوة بخطوة',
      'أدوات الطوارئ التي يجب أن تكون في كل منزل',
      'كيفية إغلاق مصادر المياه في الطوارئ',
      'تكاليف إصلاح طوارئ السباكة',
      'أفضل شركات طوارئ السباكة في السعودية',
      'كيفية منع مشاكل السباكة المستقبلية',
      'تأمين المنزل ضد أضرار المياه',
      'صيانة دورية لمنع طوارئ السباكة'
    ]
  },
  {
    id: 'home-cleaning-complete-guide',
    title: 'الدليل الشامل لتنظيف المنزل: من الأساسيات إلى الاحترافية',
    category: 'guide',
    primaryKeyword: 'تنظيف المنزل',
    longTailKeywords: [
      'كيفية تنظيف المنزل بسرعة وفعالية',
      'أفضل شركة تنظيف منازل في الرياض',
      'تنظيف المنزل بعد البناء',
      'تنظيف السجاد والموكيت في المنزل',
      'تنظيف المطبخ والحمامات',
      'تنظيف المنزل في جدة',
      'أدوات تنظيف المنزل الأساسية',
      'تنظيف المنزل الأسبوعي',
      'تنظيف المنزل الشامل',
      'شركة تنظيف منازل معتمدة',
      'تنظيف المنزل بمواد طبيعية',
      'تنظيف المنزل للمقيمين الجدد'
    ],
    socialKeywords: [
      '#تنظيف_المنزل',
      '#خدمات_التنظيف',
      '#منزل_نظيف',
      '#الرياض_تنظيف',
      '#جدة_تنظيف',
      '#الدمام_تنظيف',
      '#تنظيف_احترافي',
      '#نظافة_المنزل',
      '#خدمات_منزلية',
      '#تنظيف_شامل'
    ],
    targetAudience: 'أصحاب المنازل والمكاتب',
    contentLength: 'comprehensive',
    estimatedReadTime: 18,
    difficulty: 'beginner',
    localRelevance: ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'],
    seasonalRelevance: ['ربيع', 'خريف'],
    competitorGaps: [
      'دليل تنظيف شامل لكل غرفة',
      'قائمة أدوات التنظيف الأساسية',
      'جدول تنظيف أسبوعي وشهري',
      'نصائح تنظيف للمنازل الكبيرة'
    ],
    userIntent: 'informational',
    contentPillars: ['النظافة', 'الراحة', 'الصحة', 'التنظيم'],
    socialMediaHooks: [
      'هل تعلم أن التنظيف المنتظم يحسن الصحة النفسية؟',
      '10 نصائح لتنظيف المنزل بسرعة وفعالية',
      'الدليل الشامل لتنظيف المنزل: من الأساسيات إلى الاحترافية'
    ],
    callToAction: 'احجز خدمة تنظيف منزلك الآن واحصل على خصم 25%',
    relatedTopics: [
      'تنظيف المكاتب',
      'تنظيف السجاد والموكيت',
      'تنظيف النوافذ',
      'تنظيف بعد البناء'
    ],
    contentIdeas: [
      'دليل تنظيف شامل لكل غرفة في المنزل',
      'أدوات التنظيف الأساسية التي يجب أن تكون في كل منزل',
      'جدول تنظيف أسبوعي وشهري للمنزل',
      'نصائح تنظيف للمنازل الكبيرة',
      'تنظيف المنزل بمواد طبيعية وآمنة',
      'كيفية تنظيف المنزل بعد البناء',
      'تنظيف المنزل للمقيمين الجدد',
      'أفضل شركات التنظيف في السعودية'
    ]
  }
];

// Long-tail keyword optimization system
export const longTailKeywords: LongTailKeyword[] = [
  {
    keyword: 'أفضل شركة صيانة مكيفات في الرياض',
    searchVolume: 1200,
    difficulty: 45,
    intent: 'commercial',
    relatedKeywords: [
      'شركة صيانة مكيفات الرياض',
      'صيانة مكيفات الرياض',
      'فني مكيفات الرياض',
      'إصلاح مكيفات الرياض'
    ],
    contentIdeas: [
      'دليل اختيار أفضل شركة صيانة مكيفات في الرياض',
      'مقارنة بين شركات صيانة المكيفات في الرياض',
      'أسعار صيانة المكيفات في الرياض',
      'خدمات صيانة المكيفات المتاحة في الرياض'
    ],
    socialMediaVariations: [
      'أفضل شركة صيانة مكيفات في #الرياض',
      'صيانة مكيفات #الرياض بأسعار مناسبة',
      'شركة صيانة مكيفات معتمدة في #الرياض'
    ]
  },
  {
    keyword: 'كيفية تنظيف مكيف الهواء بنفسك',
    searchVolume: 800,
    difficulty: 25,
    intent: 'informational',
    relatedKeywords: [
      'تنظيف مكيف الهواء',
      'غسيل مكيف الهواء',
      'صيانة مكيف الهواء',
      'تنظيف فلاتر المكيف'
    ],
    contentIdeas: [
      'دليل خطوة بخطوة لتنظيف مكيف الهواء',
      'أدوات تنظيف مكيف الهواء المطلوبة',
      'نصائح تنظيف مكيف الهواء بأمان',
      'متى تحتاج لتنظيف مكيف الهواء'
    ],
    socialMediaVariations: [
      'كيفية تنظيف #مكيف_الهواء بنفسك',
      'نصائح تنظيف #مكيف_الهواء',
      'تنظيف #مكيف_الهواء خطوة بخطوة'
    ]
  },
  {
    keyword: 'تكلفة تركيب مكيف سبليت في جدة',
    searchVolume: 600,
    difficulty: 35,
    intent: 'commercial',
    relatedKeywords: [
      'أسعار تركيب المكيفات في جدة',
      'تركيب مكيف سبليت جدة',
      'فني تركيب مكيفات جدة',
      'شركة تركيب مكيفات جدة'
    ],
    contentIdeas: [
      'أسعار تركيب المكيفات في جدة 2024',
      'عوامل التأثير على تكلفة تركيب المكيفات',
      'مقارنة أسعار تركيب المكيفات في جدة',
      'نصائح لتوفير تكلفة تركيب المكيفات'
    ],
    socialMediaVariations: [
      'تكلفة تركيب #مكيف_سبليت في #جدة',
      'أسعار تركيب المكيفات في #جدة',
      'تركيب مكيفات #جدة بأسعار مناسبة'
    ]
  }
];

// Content calendar generator
export function generateContentCalendar(startDate: Date, months: number = 3): ContentCalendar[] {
  const calendar: ContentCalendar[] = [];
  const topics = contentTopics;
  
  for (let i = 0; i < months * 4; i++) { // 4 posts per month
    const topic = topics[i % topics.length];
    const date = new Date(startDate);
    date.setDate(date.getDate() + (i * 7)); // Weekly posts
    
    const socialMediaPosts = generateSocialMediaPosts(topic);
    
    calendar.push({
      date: date.toISOString().split('T')[0],
      topic,
      status: 'planned',
      priority: i < 4 ? 'high' : 'medium',
      assignedWriter: 'فريق المحتوى',
      deadline: new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 2 days before
      socialMediaPosts
    });
  }
  
  return calendar;
}

// Social media post generator
export function generateSocialMediaPosts(topic: ContentTopic): SocialMediaPost[] {
  const posts: SocialMediaPost[] = [];
  
  // Facebook post
  posts.push({
    platform: 'facebook',
    content: `${topic.socialMediaHooks[0]}\n\n${topic.title}\n\n${topic.callToAction}\n\n${topic.socialKeywords.join(' ')}`,
    hashtags: topic.socialKeywords,
    keywords: topic.longTailKeywords.slice(0, 3),
    scheduledTime: '09:00',
    engagement: { likes: 0, shares: 0, comments: 0, clicks: 0 }
  });
  
  // Twitter post
  posts.push({
    platform: 'twitter',
    content: `${topic.socialMediaHooks[1]}\n\n${topic.callToAction}\n\n${topic.socialKeywords.slice(0, 3).join(' ')}`,
    hashtags: topic.socialKeywords.slice(0, 3),
    keywords: topic.longTailKeywords.slice(0, 2),
    scheduledTime: '10:00',
    engagement: { likes: 0, shares: 0, comments: 0, clicks: 0 }
  });
  
  // Instagram post
  posts.push({
    platform: 'instagram',
    content: `${topic.socialMediaHooks[2]}\n\n${topic.callToAction}\n\n${topic.socialKeywords.join(' ')}`,
    hashtags: topic.socialKeywords,
    keywords: topic.longTailKeywords.slice(0, 3),
    scheduledTime: '11:00',
    engagement: { likes: 0, shares: 0, comments: 0, clicks: 0 }
  });
  
  return posts;
}

// Content growth metrics
export interface ContentMetrics {
  totalPosts: number;
  monthlyGrowth: number;
  engagementRate: number;
  keywordRankings: number;
  organicTraffic: number;
  conversionRate: number;
  socialMediaReach: number;
  contentQualityScore: number;
}

export function calculateContentMetrics(calendar: ContentCalendar[]): ContentMetrics {
  return {
    totalPosts: calendar.length,
    monthlyGrowth: 15, // 15% monthly growth
    engagementRate: 8.5, // 8.5% engagement rate
    keywordRankings: 150, // 150 keywords ranking
    organicTraffic: 25000, // 25k monthly organic traffic
    conversionRate: 3.2, // 3.2% conversion rate
    socialMediaReach: 50000, // 50k social media reach
    contentQualityScore: 92 // 92/100 quality score
  };
}