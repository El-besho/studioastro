// Content Interlinking Component for Cleaning Services
// Provides strategic internal linking between cleaning content

import React from 'react';

interface ContentLink {
  title: string;
  url: string;
  description: string;
  type: 'blog' | 'service' | 'guide' | 'faq';
  priority: number;
  keywords: string[];
}

interface ContentInterlinkerProps {
  currentContent: string;
  contentType: 'blog' | 'service' | 'guide' | 'faq';
  showSuggestions?: boolean;
  className?: string;
}

export const ContentInterlinker: React.FC<ContentInterlinkerProps> = ({
  currentContent,
  contentType,
  showSuggestions = false,
  className = ''
}) => {
  // Content mapping for cleaning services
  const contentMap: ContentLink[] = [
    // Blog Posts
    {
      title: 'الدليل الشامل لتنظيف المنازل',
      url: '/blog/ultimate-home-cleaning-guide',
      description: 'دليل شامل لتنظيف المنازل مع نصائح الخبراء',
      type: 'blog',
      priority: 10,
      keywords: ['تنظيف منازل', 'شركة تنظيف', 'نظافة شاملة', 'نصائح تنظيف']
    },
    {
      title: 'تنظيف عميق للمنازل',
      url: '/blog/deep-cleaning-guide',
      description: 'دليل شامل لتنظيف عميق وآمن للمنازل',
      type: 'blog',
      priority: 9,
      keywords: ['تنظيف عميق', 'تنظيف شامل', 'نظافة المنزل', 'تنظيف احترافي']
    },
    {
      title: 'كيفية تنظيف الكنب والمجالس',
      url: '/blog/sofa-cleaning-guide',
      description: 'نصائح احترافية للحفاظ على الأثاث نظيفاً',
      type: 'blog',
      priority: 8,
      keywords: ['تنظيف كنب', 'غسيل كنب', 'تنظيف مجالس', 'شركة تنظيف كنب']
    },
    {
      title: 'تنظيف السجاد والموكيت',
      url: '/blog/carpet-cleaning-guide',
      description: 'دليل شامل للحفاظ على السجاد نظيفاً',
      type: 'blog',
      priority: 8,
      keywords: ['غسيل سجاد', 'تنظيف موكيت', 'شركة غسيل سجاد', 'تنظيف السجاد']
    },
    {
      title: 'تنظيف خزانات المياه',
      url: '/blog/water-tank-cleaning-guide',
      description: 'أهمية التنظيف الدوري للحفاظ على صحة العائلة',
      type: 'blog',
      priority: 7,
      keywords: ['تنظيف خزانات', 'شركة تنظيف خزانات', 'غسيل خزانات المياه', 'تعقيم خزان الماء']
    },
    {
      title: 'تنظيف النوافذ والواجهات الزجاجية',
      url: '/blog/window-cleaning-guide',
      description: 'نصائح للحصول على إطلالة مثالية',
      type: 'blog',
      priority: 6,
      keywords: ['تنظيف واجهات زجاج', 'شركة تنظيف واجهات', 'تنظيف زجاج المباني', 'تنظيف النوافذ']
    },
    {
      title: 'تنظيف ما بعد البناء',
      url: '/blog/post-construction-cleaning-guide',
      description: 'دليل شامل لإزالة آثار البناء والترميم',
      type: 'blog',
      priority: 6,
      keywords: ['تنظيف بعد التشطيب', 'تنظيف الفلل الجديدة', 'شركة تنظيف بعد البناء', 'تنظيف المباني الجديدة']
    },
    {
      title: 'تنظيف المطابخ وإزالة الدهون',
      url: '/blog/kitchen-cleaning-guide',
      description: 'نصائح احترافية لمطبخ نظيف',
      type: 'blog',
      priority: 5,
      keywords: ['شركة تنظيف مطابخ', 'تنظيف مداخن المطاعم', 'إزالة الدهون من المطبخ', 'تنظيف المطابخ']
    },
    {
      title: 'جلي وتلميع البلاط والرخام',
      url: '/blog/marble-tile-cleaning-guide',
      description: 'دليل شامل للحفاظ على الأرضيات',
      type: 'blog',
      priority: 5,
      keywords: ['جلي بلاط', 'جلي رخام', 'تلميع بلاط', 'تنظيف رخام']
    },
    {
      title: 'تنظيف المكاتب والشركات',
      url: '/blog/office-cleaning-guide',
      description: 'دليل شامل لبيئة عمل نظيفة ومنتجة',
      type: 'blog',
      priority: 5,
      keywords: ['تنظيف مكاتب', 'شركة تنظيف مكاتب', 'نظافة المكاتب', 'تنظيف الشركات']
    },

    // Services
    {
      title: 'خدمات التنظيف الشاملة',
      url: '/services/cleaning-services',
      description: 'خدمات تنظيف شاملة للمنازل والمكاتب',
      type: 'service',
      priority: 10,
      keywords: ['شركة تنظيف', 'تنظيف منازل', 'شركة نظافة', 'تنظيف شقق']
    },
    {
      title: 'تنظيف عميق للمنازل',
      url: '/services/cleaning-services/home-deep-cleaning',
      description: 'خدمة تنظيف عميق شاملة للمنازل',
      type: 'service',
      priority: 9,
      keywords: ['تنظيف عميق', 'تنظيف شامل', 'نظافة المنزل', 'تنظيف احترافي']
    },
    {
      title: 'تنظيف الكنب والمجالس',
      url: '/services/cleaning-services/sofa-cleaning',
      description: 'خدمة تنظيف احترافية للكنب والمجالس',
      type: 'service',
      priority: 8,
      keywords: ['تنظيف كنب', 'غسيل كنب', 'تنظيف مجالس', 'شركة تنظيف كنب']
    },
    {
      title: 'غسيل السجاد والموكيت',
      url: '/services/cleaning-services/carpet-cleaning',
      description: 'خدمة غسيل احترافية للسجاد والموكيت',
      type: 'service',
      priority: 8,
      keywords: ['غسيل سجاد', 'تنظيف موكيت', 'شركة غسيل سجاد', 'تنظيف السجاد']
    },
    {
      title: 'تنظيف خزانات المياه',
      url: '/services/cleaning-services/water-tank-cleaning',
      description: 'خدمة تنظيف وتعقيم خزانات المياه',
      type: 'service',
      priority: 7,
      keywords: ['تنظيف خزانات', 'شركة تنظيف خزانات', 'غسيل خزانات المياه', 'تعقيم خزان الماء']
    },
    {
      title: 'تنظيف النوافذ والواجهات',
      url: '/services/cleaning-services/window-cleaning',
      description: 'خدمة تنظيف احترافية للنوافذ والواجهات',
      type: 'service',
      priority: 6,
      keywords: ['تنظيف واجهات زجاج', 'شركة تنظيف واجهات', 'تنظيف زجاج المباني', 'تنظيف النوافذ']
    },
    {
      title: 'تنظيف ما بعد البناء',
      url: '/services/cleaning-services/post-construction-cleaning',
      description: 'خدمة تنظيف شاملة لما بعد البناء',
      type: 'service',
      priority: 6,
      keywords: ['تنظيف بعد التشطيب', 'تنظيف الفلل الجديدة', 'شركة تنظيف بعد البناء', 'تنظيف المباني الجديدة']
    },
    {
      title: 'تنظيف المطابخ',
      url: '/services/cleaning-services/kitchen-cleaning',
      description: 'خدمة تنظيف متخصصة للمطابخ',
      type: 'service',
      priority: 5,
      keywords: ['شركة تنظيف مطابخ', 'تنظيف مداخن المطاعم', 'إزالة الدهون من المطبخ', 'تنظيف المطابخ']
    },
    {
      title: 'تنظيف المكاتب',
      url: '/services/cleaning-services/office-cleaning',
      description: 'خدمة تنظيف للمكاتب والشركات',
      type: 'service',
      priority: 5,
      keywords: ['تنظيف مكاتب', 'شركة تنظيف مكاتب', 'نظافة المكاتب', 'تنظيف الشركات']
    }
  ];

  // Function to find related content
  const findRelatedContent = (content: string, currentType: string) => {
    const contentKeywords = content.toLowerCase().split(' ');
    
    return contentMap
      .filter(item => item.type !== currentType)
      .map(item => {
        const relevanceScore = item.keywords.reduce((score, keyword) => {
          const keywordWords = keyword.toLowerCase().split(' ');
          const matches = keywordWords.filter(word => 
            contentKeywords.some(contentWord => contentWord.includes(word))
          );
          return score + matches.length;
        }, 0);

        return { ...item, relevanceScore };
      })
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6);
  };

  // Function to generate contextual links
  const generateContextualLinks = (content: string) => {
    const relatedContent = findRelatedContent(content, contentType);
    
    return relatedContent.map(item => ({
      ...item,
      contextualText: `اقرأ المزيد عن ${item.title.toLowerCase()}`
    }));
  };

  const contextualLinks = generateContextualLinks(currentContent);

  return (
    <div className={`content-interlinker ${className}`}>
      {showSuggestions && (
        <div className="interlinking-suggestions mb-6 p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">روابط داخلية مقترحة</h3>
          <div className="space-y-2">
            {contextualLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <div>
                  <a 
                    href={link.url} 
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {link.title}
                  </a>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {link.relevanceScore} نقاط صلة
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="contextual-links">
        {contextualLinks.map((link, index) => (
          <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">
              <a href={link.url} className="text-blue-600 hover:text-blue-800">
                {link.title}
              </a>
            </h4>
            <p className="text-sm text-gray-600 mb-2">{link.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {link.type === 'blog' ? 'مقال' : 'خدمة'}
              </span>
              <span className="text-xs text-gray-500">
                {link.relevanceScore} نقاط صلة
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hook for content interlinking
export const useContentInterlinking = (content: string, contentType: string) => {
  const contentMap: ContentLink[] = [
    // Blog Posts
    {
      title: 'الدليل الشامل لتنظيف المنازل',
      url: '/blog/ultimate-home-cleaning-guide',
      description: 'دليل شامل لتنظيف المنازل مع نصائح الخبراء',
      type: 'blog',
      priority: 10,
      keywords: ['تنظيف منازل', 'شركة تنظيف', 'نظافة شاملة', 'نصائح تنظيف']
    },
    {
      title: 'تنظيف عميق للمنازل',
      url: '/blog/deep-cleaning-guide',
      description: 'دليل شامل لتنظيف عميق وآمن للمنازل',
      type: 'blog',
      priority: 9,
      keywords: ['تنظيف عميق', 'تنظيف شامل', 'نظافة المنزل', 'تنظيف احترافي']
    },
    {
      title: 'كيفية تنظيف الكنب والمجالس',
      url: '/blog/sofa-cleaning-guide',
      description: 'نصائح احترافية للحفاظ على الأثاث نظيفاً',
      type: 'blog',
      priority: 8,
      keywords: ['تنظيف كنب', 'غسيل كنب', 'تنظيف مجالس', 'شركة تنظيف كنب']
    },
    {
      title: 'تنظيف السجاد والموكيت',
      url: '/blog/carpet-cleaning-guide',
      description: 'دليل شامل للحفاظ على السجاد نظيفاً',
      type: 'blog',
      priority: 8,
      keywords: ['غسيل سجاد', 'تنظيف موكيت', 'شركة غسيل سجاد', 'تنظيف السجاد']
    },
    {
      title: 'تنظيف خزانات المياه',
      url: '/blog/water-tank-cleaning-guide',
      description: 'أهمية التنظيف الدوري للحفاظ على صحة العائلة',
      type: 'blog',
      priority: 7,
      keywords: ['تنظيف خزانات', 'شركة تنظيف خزانات', 'غسيل خزانات المياه', 'تعقيم خزان الماء']
    },
    {
      title: 'تنظيف النوافذ والواجهات الزجاجية',
      url: '/blog/window-cleaning-guide',
      description: 'نصائح للحصول على إطلالة مثالية',
      type: 'blog',
      priority: 6,
      keywords: ['تنظيف واجهات زجاج', 'شركة تنظيف واجهات', 'تنظيف زجاج المباني', 'تنظيف النوافذ']
    },
    {
      title: 'تنظيف ما بعد البناء',
      url: '/blog/post-construction-cleaning-guide',
      description: 'دليل شامل لإزالة آثار البناء والترميم',
      type: 'blog',
      priority: 6,
      keywords: ['تنظيف بعد التشطيب', 'تنظيف الفلل الجديدة', 'شركة تنظيف بعد البناء', 'تنظيف المباني الجديدة']
    },
    {
      title: 'تنظيف المطابخ وإزالة الدهون',
      url: '/blog/kitchen-cleaning-guide',
      description: 'نصائح احترافية لمطبخ نظيف',
      type: 'blog',
      priority: 5,
      keywords: ['شركة تنظيف مطابخ', 'تنظيف مداخن المطاعم', 'إزالة الدهون من المطبخ', 'تنظيف المطابخ']
    },
    {
      title: 'جلي وتلميع البلاط والرخام',
      url: '/blog/marble-tile-cleaning-guide',
      description: 'دليل شامل للحفاظ على الأرضيات',
      type: 'blog',
      priority: 5,
      keywords: ['جلي بلاط', 'جلي رخام', 'تلميع بلاط', 'تنظيف رخام']
    },
    {
      title: 'تنظيف المكاتب والشركات',
      url: '/blog/office-cleaning-guide',
      description: 'دليل شامل لبيئة عمل نظيفة ومنتجة',
      type: 'blog',
      priority: 5,
      keywords: ['تنظيف مكاتب', 'شركة تنظيف مكاتب', 'نظافة المكاتب', 'تنظيف الشركات']
    },

    // Services
    {
      title: 'خدمات التنظيف الشاملة',
      url: '/services/cleaning-services',
      description: 'خدمات تنظيف شاملة للمنازل والمكاتب',
      type: 'service',
      priority: 10,
      keywords: ['شركة تنظيف', 'تنظيف منازل', 'شركة نظافة', 'تنظيف شقق']
    },
    {
      title: 'تنظيف عميق للمنازل',
      url: '/services/cleaning-services/home-deep-cleaning',
      description: 'خدمة تنظيف عميق شاملة للمنازل',
      type: 'service',
      priority: 9,
      keywords: ['تنظيف عميق', 'تنظيف شامل', 'نظافة المنزل', 'تنظيف احترافي']
    },
    {
      title: 'تنظيف الكنب والمجالس',
      url: '/services/cleaning-services/sofa-cleaning',
      description: 'خدمة تنظيف احترافية للكنب والمجالس',
      type: 'service',
      priority: 8,
      keywords: ['تنظيف كنب', 'غسيل كنب', 'تنظيف مجالس', 'شركة تنظيف كنب']
    },
    {
      title: 'غسيل السجاد والموكيت',
      url: '/services/cleaning-services/carpet-cleaning',
      description: 'خدمة غسيل احترافية للسجاد والموكيت',
      type: 'service',
      priority: 8,
      keywords: ['غسيل سجاد', 'تنظيف موكيت', 'شركة غسيل سجاد', 'تنظيف السجاد']
    },
    {
      title: 'تنظيف خزانات المياه',
      url: '/services/cleaning-services/water-tank-cleaning',
      description: 'خدمة تنظيف وتعقيم خزانات المياه',
      type: 'service',
      priority: 7,
      keywords: ['تنظيف خزانات', 'شركة تنظيف خزانات', 'غسيل خزانات المياه', 'تعقيم خزان الماء']
    },
    {
      title: 'تنظيف النوافذ والواجهات',
      url: '/services/cleaning-services/window-cleaning',
      description: 'خدمة تنظيف احترافية للنوافذ والواجهات',
      type: 'service',
      priority: 6,
      keywords: ['تنظيف واجهات زجاج', 'شركة تنظيف واجهات', 'تنظيف زجاج المباني', 'تنظيف النوافذ']
    },
    {
      title: 'تنظيف ما بعد البناء',
      url: '/services/cleaning-services/post-construction-cleaning',
      description: 'خدمة تنظيف شاملة لما بعد البناء',
      type: 'service',
      priority: 6,
      keywords: ['تنظيف بعد التشطيب', 'تنظيف الفلل الجديدة', 'شركة تنظيف بعد البناء', 'تنظيف المباني الجديدة']
    },
    {
      title: 'تنظيف المطابخ',
      url: '/services/cleaning-services/kitchen-cleaning',
      description: 'خدمة تنظيف متخصصة للمطابخ',
      type: 'service',
      priority: 5,
      keywords: ['شركة تنظيف مطابخ', 'تنظيف مداخن المطاعم', 'إزالة الدهون من المطبخ', 'تنظيف المطابخ']
    },
    {
      title: 'تنظيف المكاتب',
      url: '/services/cleaning-services/office-cleaning',
      description: 'خدمة تنظيف للمكاتب والشركات',
      type: 'service',
      priority: 5,
      keywords: ['تنظيف مكاتب', 'شركة تنظيف مكاتب', 'نظافة المكاتب', 'تنظيف الشركات']
    }
  ];

  const findRelatedContent = (content: string, currentType: string) => {
    const contentKeywords = content.toLowerCase().split(' ');
    
    return contentMap
      .filter(item => item.type !== currentType)
      .map(item => {
        const relevanceScore = item.keywords.reduce((score, keyword) => {
          const keywordWords = keyword.toLowerCase().split(' ');
          const matches = keywordWords.filter(word => 
            contentKeywords.some(contentWord => contentWord.includes(word))
          );
          return score + matches.length;
        }, 0);

        return { ...item, relevanceScore };
      })
      .filter(item => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 6);
  };

  const relatedContent = findRelatedContent(content, contentType);

  return {
    relatedContent,
    contentMap
  };
};

export default ContentInterlinker;