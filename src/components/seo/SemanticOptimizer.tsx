// Semantic Optimization Component for Cleaning Services
// Provides entity linking, semantic optimization, and structured data

import React from 'react';

interface EntityLink {
  text: string;
  url: string;
  type: 'service' | 'location' | 'keyword' | 'internal';
  priority: number;
}

interface SemanticOptimizerProps {
  content: string;
  entities: EntityLink[];
  showOptimization?: boolean;
  className?: string;
}

export const SemanticOptimizer: React.FC<SemanticOptimizerProps> = ({
  content,
  entities,
  showOptimization = false,
  className = ''
}) => {
  // Sort entities by priority (higher priority first)
  const sortedEntities = entities.sort((a, b) => b.priority - a.priority);

  // Function to apply entity linking
  const applyEntityLinking = (text: string) => {
    let optimizedText = text;
    
    sortedEntities.forEach(entity => {
      const regex = new RegExp(`\\b${entity.text}\\b`, 'gi');
      optimizedText = optimizedText.replace(regex, (match) => {
        return `<a href="${entity.url}" class="entity-link entity-${entity.type}" data-entity-type="${entity.type}">${match}</a>`;
      });
    });

    return optimizedText;
  };

  // Function to extract semantic keywords
  const extractSemanticKeywords = (text: string) => {
    const cleaningKeywords = [
      'تنظيف', 'شركة تنظيف', 'تنظيف منازل', 'شركة نظافة',
      'تنظيف عميق', 'تنظيف كنب', 'غسيل سجاد', 'تنظيف خزانات',
      'تنظيف واجهات', 'تنظيف مطابخ', 'جلي بلاط', 'تنظيف مكاتب'
    ];

    const foundKeywords = cleaningKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword.toLowerCase())
    );

    return foundKeywords;
  };

  // Function to generate structured data
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "خدمات التنظيف الشاملة",
      "description": "دليل شامل لخدمات التنظيف في السعودية",
      "author": {
        "@type": "Person",
        "name": "فهد السبيعي"
      },
      "publisher": {
        "@type": "Organization",
        "name": "شركة تنظيف متخصصة",
        "url": "https://example.com"
      },
      "datePublished": new Date().toISOString(),
      "dateModified": new Date().toISOString(),
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://example.com/cleaning-services"
      },
      "keywords": extractSemanticKeywords(content),
      "about": [
        {
          "@type": "Thing",
          "name": "تنظيف المنازل",
          "description": "خدمات تنظيف شاملة للمنازل"
        },
        {
          "@type": "Thing",
          "name": "تنظيف المطابخ",
          "description": "خدمات تنظيف متخصصة للمطابخ"
        },
        {
          "@type": "Thing",
          "name": "تنظيف المكاتب",
          "description": "خدمات تنظيف للمكاتب والشركات"
        }
      ],
      "mentions": entities.map(entity => ({
        "@type": "Thing",
        "name": entity.text,
        "url": entity.url
      }))
    };

    return structuredData;
  };

  const optimizedContent = applyEntityLinking(content);
  const semanticKeywords = extractSemanticKeywords(content);
  const structuredData = generateStructuredData();

  return (
    <div className={`semantic-optimizer ${className}`}>
      {showOptimization && (
        <div className="optimization-panel mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">تحسين دلالي</h3>
          <div className="space-y-2">
            <div>
              <strong>الكلمات المفتاحية الدلالية:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {semanticKeywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <strong>الروابط الداخلية:</strong>
              <div className="text-sm text-gray-600">
                {entities.length} رابط داخلي تم تطبيقه
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="optimized-content"
        dangerouslySetInnerHTML={{ __html: optimizedContent }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
};

// Entity mapping for cleaning services
export const cleaningEntities: EntityLink[] = [
  // Main Services
  {
    text: 'شركة تنظيف',
    url: '/services/cleaning-services',
    type: 'service',
    priority: 10
  },
  {
    text: 'تنظيف منازل',
    url: '/services/cleaning-services/home-deep-cleaning',
    type: 'service',
    priority: 9
  },
  {
    text: 'شركة نظافة',
    url: '/services/cleaning-services',
    type: 'service',
    priority: 8
  },
  {
    text: 'تنظيف شقق',
    url: '/services/cleaning-services/home-deep-cleaning',
    type: 'service',
    priority: 7
  },
  {
    text: 'تنظيف فلل',
    url: '/services/cleaning-services/home-deep-cleaning',
    type: 'service',
    priority: 7
  },
  {
    text: 'تنظيف عميق',
    url: '/services/cleaning-services/home-deep-cleaning',
    type: 'service',
    priority: 8
  },
  {
    text: 'تنظيف كنب',
    url: '/services/cleaning-services/sofa-cleaning',
    type: 'service',
    priority: 6
  },
  {
    text: 'غسيل سجاد',
    url: '/services/cleaning-services/carpet-cleaning',
    type: 'service',
    priority: 6
  },
  {
    text: 'تنظيف خزانات',
    url: '/services/cleaning-services/water-tank-cleaning',
    type: 'service',
    priority: 6
  },
  {
    text: 'تنظيف واجهات',
    url: '/services/cleaning-services/window-cleaning',
    type: 'service',
    priority: 5
  },
  {
    text: 'تنظيف مطابخ',
    url: '/services/cleaning-services/kitchen-cleaning',
    type: 'service',
    priority: 5
  },
  {
    text: 'جلي بلاط',
    url: '/services/marble-tiling-services',
    type: 'service',
    priority: 5
  },
  {
    text: 'تنظيف مكاتب',
    url: '/services/cleaning-services/office-cleaning',
    type: 'service',
    priority: 5
  },

  // Locations
  {
    text: 'الرياض',
    url: '/services/cleaning-services?location=riyadh',
    type: 'location',
    priority: 4
  },
  {
    text: 'جدة',
    url: '/services/cleaning-services?location=jeddah',
    type: 'location',
    priority: 4
  },
  {
    text: 'مكة',
    url: '/services/cleaning-services?location=makkah',
    type: 'location',
    priority: 4
  },
  {
    text: 'المدينة',
    url: '/services/cleaning-services?location=medina',
    type: 'location',
    priority: 4
  },
  {
    text: 'الدمام',
    url: '/services/cleaning-services?location=dammam',
    type: 'location',
    priority: 3
  },

  // Keywords
  {
    text: 'أفضل شركة تنظيف',
    url: '/services/cleaning-services',
    type: 'keyword',
    priority: 3
  },
  {
    text: 'أسعار تنظيف',
    url: '/services/cleaning-services#pricing',
    type: 'keyword',
    priority: 2
  },
  {
    text: 'تنظيف احترافي',
    url: '/services/cleaning-services',
    type: 'keyword',
    priority: 2
  },

  // Internal Links
  {
    text: 'دليل التنظيف',
    url: '/blog/ultimate-home-cleaning-guide',
    type: 'internal',
    priority: 1
  },
  {
    text: 'نصائح التنظيف',
    url: '/blog/ultimate-home-cleaning-guide',
    type: 'internal',
    priority: 1
  }
];

// Hook for using semantic optimization
export const useSemanticOptimization = (content: string) => {
  const entities = cleaningEntities;
  const semanticKeywords = cleaningEntities
    .filter(entity => entity.type === 'keyword')
    .map(entity => entity.text);

  const serviceEntities = cleaningEntities
    .filter(entity => entity.type === 'service')
    .map(entity => entity.text);

  const locationEntities = cleaningEntities
    .filter(entity => entity.type === 'location')
    .map(entity => entity.text);

  return {
    entities,
    semanticKeywords,
    serviceEntities,
    locationEntities
  };
};

export default SemanticOptimizer;