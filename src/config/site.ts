
export const siteConfig = {
    name: "إنقاذ - خدمات منزلية معتمدة",
    url: "https://enqaz.org",
    ogImage: "https://enqaz.org/og.jpg",
    description:
      "منصة إنقاذ الرائدة في المملكة العربية السعودية - نوصلك بأفضل مزودي الخدمات المنزلية المعتمدين من وزارة التجارة والاستثمار. خدمات مضمونة الجودة وفقاً لمعايير SASO الدولية.",
    keywords: ["خدمات منزلية معتمدة", "صيانة معتمدة", "إنقاذ", "السعودية", "سباكة معتمدة", "كهرباء معتمدة", "تكييف معتمد", "تنظيف معتمد", "مكافحة حشرات معتمدة", "مقاول معتمد", "معايير SASO", "وزارة التجارة"],
    links: {
      twitter: "https://twitter.com/enqaz",
      github: "https://github.com/enqaz",
    },
    author: {
      name: "فريق إنقاذ",
      url: "https://enqaz.org/about",
    },
    creator: "إنقاذ - خدمات منزلية معتمدة",
    publisher: "إنقاذ",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
  
  export type SiteConfig = typeof siteConfig
  
