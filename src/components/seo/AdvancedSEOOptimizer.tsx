// Advanced SEO Optimization Component for Cleaning Services
// Combines semantic optimization, entity linking, and content interlinking

import React, { useState, useEffect } from 'react';
import { SemanticOptimizer, cleaningEntities, useSemanticOptimization } from './SemanticOptimizer';
import { ContentInterlinker, useContentInterlinking } from './ContentInterlinker';

interface SEOOptimizerProps {
  content: string;
  title: string;
  description: string;
  keywords: string[];
  contentType: 'blog' | 'service' | 'guide' | 'faq';
  showOptimization?: boolean;
  className?: string;
}

export const AdvancedSEOOptimizer: React.FC<SEOOptimizerProps> = ({
  content,
  title,
  description,
  keywords,
  contentType,
  showOptimization = false,
  className = ''
}) => {
  const [optimizedContent, setOptimizedContent] = useState(content);
  const [seoScore, setSeoScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const { entities, semanticKeywords, serviceEntities, locationEntities } = useSemanticOptimization(content);
  const { relatedContent } = useContentInterlinking(content, contentType);

  // Calculate SEO score
  const calculateSEOScore = () => {
    let score = 0;
    const maxScore = 100;

    // Title optimization (20 points)
    if (title.length >= 30 && title.length <= 60) score += 20;
    else if (title.length > 0) score += 10;

    // Description optimization (20 points)
    if (description.length >= 120 && description.length <= 160) score += 20;
    else if (description.length > 0) score += 10;

    // Keywords optimization (20 points)
    const keywordDensity = keywords.length / (content.split(' ').length / 100);
    if (keywordDensity >= 1 && keywordDensity <= 3) score += 20;
    else if (keywordDensity > 0) score += 10;

    // Content length (20 points)
    if (content.length >= 2000) score += 20;
    else if (content.length >= 1000) score += 15;
    else if (content.length >= 500) score += 10;

    // Internal linking (10 points)
    const internalLinks = (content.match(/<a[^>]*href[^>]*>/g) || []).length;
    if (internalLinks >= 3) score += 10;
    else if (internalLinks >= 1) score += 5;

    // Semantic keywords (10 points)
    if (semanticKeywords.length >= 5) score += 10;
    else if (semanticKeywords.length >= 3) score += 5;

    return Math.min(score, maxScore);
  };

  // Generate SEO suggestions
  const generateSuggestions = () => {
    const newSuggestions: string[] = [];

    // Title suggestions
    if (title.length < 30) {
      newSuggestions.push('العنوان قصير جداً. يفضل أن يكون بين 30-60 حرف');
    } else if (title.length > 60) {
      newSuggestions.push('العنوان طويل جداً. يفضل أن يكون بين 30-60 حرف');
    }

    // Description suggestions
    if (description.length < 120) {
      newSuggestions.push('الوصف قصير جداً. يفضل أن يكون بين 120-160 حرف');
    } else if (description.length > 160) {
      newSuggestions.push('الوصف طويل جداً. يفضل أن يكون بين 120-160 حرف');
    }

    // Content length suggestions
    if (content.length < 1000) {
      newSuggestions.push('المحتوى قصير جداً. يفضل أن يكون أكثر من 1000 كلمة');
    }

    // Keywords suggestions
    const keywordDensity = keywords.length / (content.split(' ').length / 100);
    if (keywordDensity < 1) {
      newSuggestions.push('كثافة الكلمات المفتاحية منخفضة. يفضل أن تكون بين 1-3%');
    } else if (keywordDensity > 3) {
      newSuggestions.push('كثافة الكلمات المفتاحية عالية جداً. يفضل أن تكون بين 1-3%');
    }

    // Internal linking suggestions
    const internalLinks = (content.match(/<a[^>]*href[^>]*>/g) || []).length;
    if (internalLinks < 3) {
      newSuggestions.push('عدد الروابط الداخلية قليل. يفضل أن يكون 3 روابط على الأقل');
    }

    // Semantic keywords suggestions
    if (semanticKeywords.length < 5) {
      newSuggestions.push('عدد الكلمات المفتاحية الدلالية قليل. يفضل أن يكون 5 كلمات على الأقل');
    }

    return newSuggestions;
  };

  useEffect(() => {
    const score = calculateSEOScore();
    setSeoScore(score);
    
    const newSuggestions = generateSuggestions();
    setSuggestions(newSuggestions);
  }, [content, title, description, keywords]);

  // Generate structured data
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": contentType === 'blog' ? "Article" : "Service",
      "headline": title,
      "description": description,
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
        "@id": `https://example.com${window.location.pathname}`
      },
      "keywords": keywords,
      "about": serviceEntities.map(service => ({
        "@type": "Thing",
        "name": service,
        "description": `خدمات ${service} في السعودية`
      })),
      "mentions": entities.map(entity => ({
        "@type": "Thing",
        "name": entity.text,
        "url": entity.url
      }))
    };

    return structuredData;
  };

  const structuredData = generateStructuredData();

  return (
    <div className={`advanced-seo-optimizer ${className}`}>
      {showOptimization && (
        <div className="seo-panel mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">تحسين SEO</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">نقاط SEO:</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className={`h-2 rounded-full ${
                      seoScore >= 80 ? 'bg-green-500' : 
                      seoScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${seoScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{seoScore}/100</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">الكلمات المفتاحية الدلالية</h4>
              <div className="flex flex-wrap gap-2">
                {semanticKeywords.slice(0, 5).map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">الروابط الداخلية</h4>
              <div className="text-sm text-gray-600">
                {entities.length} رابط داخلي تم تطبيقه
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">المحتوى ذو الصلة</h4>
              <div className="text-sm text-gray-600">
                {relatedContent.length} محتوى ذو صلة
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">الكلمات المفتاحية</h4>
              <div className="text-sm text-gray-600">
                {keywords.length} كلمة مفتاحية
              </div>
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-red-600">اقتراحات للتحسين</h4>
              <ul className="list-disc list-inside space-y-1">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-red-600">{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <SemanticOptimizer
        content={content}
        entities={entities}
        showOptimization={false}
        className="mb-6"
      />

      <ContentInterlinker
        currentContent={content}
        contentType={contentType}
        showSuggestions={false}
        className="mb-6"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
};

// Hook for advanced SEO optimization
export const useAdvancedSEOOptimization = (content: string, title: string, description: string, keywords: string[], contentType: string) => {
  const { entities, semanticKeywords, serviceEntities, locationEntities } = useSemanticOptimization(content);
  const { relatedContent } = useContentInterlinking(content, contentType);

  const calculateSEOScore = () => {
    let score = 0;
    const maxScore = 100;

    // Title optimization (20 points)
    if (title.length >= 30 && title.length <= 60) score += 20;
    else if (title.length > 0) score += 10;

    // Description optimization (20 points)
    if (description.length >= 120 && description.length <= 160) score += 20;
    else if (description.length > 0) score += 10;

    // Keywords optimization (20 points)
    const keywordDensity = keywords.length / (content.split(' ').length / 100);
    if (keywordDensity >= 1 && keywordDensity <= 3) score += 20;
    else if (keywordDensity > 0) score += 10;

    // Content length (20 points)
    if (content.length >= 2000) score += 20;
    else if (content.length >= 1000) score += 15;
    else if (content.length >= 500) score += 10;

    // Internal linking (10 points)
    const internalLinks = (content.match(/<a[^>]*href[^>]*>/g) || []).length;
    if (internalLinks >= 3) score += 10;
    else if (internalLinks >= 1) score += 5;

    // Semantic keywords (10 points)
    if (semanticKeywords.length >= 5) score += 10;
    else if (semanticKeywords.length >= 3) score += 5;

    return Math.min(score, maxScore);
  };

  const seoScore = calculateSEOScore();

  return {
    entities,
    semanticKeywords,
    serviceEntities,
    locationEntities,
    relatedContent,
    seoScore
  };
};

export default AdvancedSEOOptimizer;