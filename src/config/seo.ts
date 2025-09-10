import { siteConfig } from './site';

export const seoConfig = {
  default: {
    title: `${siteConfig.name} | احصل على أفضل الخدمات المنزلية`,
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    author: siteConfig.name,
    ogImage: siteConfig.ogImage,
    twitter: {
      site: '@enqaz',
      creator: '@enqaz',
      card: 'summary_large_image' as const
    },
    openGraph: {
      locale: 'ar_SA',
      siteName: siteConfig.name,
      type: 'website' as const
    }
  },
  
  pages: {
    home: {
      title: `${siteConfig.name} | احصل على أفضل الخدمات المنزلية`,
      description: siteConfig.description,
      keywords: siteConfig.keywords
    },
    
    about: {
      title: `من نحن | ${siteConfig.name}`,
      description: 'تعرف على منصة إنقاذ وكيف نساعدك في العثور على أفضل مزودي الخدمات المعتمدين في المملكة العربية السعودية',
      keywords: ['من نحن', 'عن إنقاذ', 'منصة خدمات', 'السعودية', 'خدمات منزلية', 'مزودي خدمات']
    },
    
    contact: {
      title: `تواصل معنا | ${siteConfig.name}`,
      description: 'تواصل مع فريق إنقاذ للحصول على المساعدة أو الاستفسارات. نحن هنا لمساعدتك في العثور على أفضل مزودي الخدمات',
      keywords: ['تواصل معنا', 'اتصل بنا', 'دعم العملاء', 'إنقاذ', 'خدمات منزلية', 'السعودية']
    },
    
    services: {
      title: `جميع الخدمات | ${siteConfig.name}`,
      description: 'اكتشف جميع الخدمات المنزلية المتاحة في منصة إنقاذ. من التكييف والسباكة إلى الصيانة العامة، احصل على أفضل الخدمات في السعودية',
      keywords: ['جميع الخدمات', 'خدمات منزلية', 'تكييف', 'سباكة', 'كهرباء', 'صيانة', 'تنظيف', 'السعودية', 'إنقاذ']
    }
  }
};

export type SEOConfig = typeof seoConfig;