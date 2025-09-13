import React, { useState, useEffect } from 'react';
import { ContentQualityValidator, QUALITY_RULES } from '@/lib/content-quality-rules';
import EnhancedContentGenerator from '@/lib/enhanced-content-generator';

interface ContentOptimizerProps {
  initialContent?: string;
  topic: string;
  keywords: string[];
  onOptimized?: (content: string) => void;
  className?: string;
}

export const ContentOptimizer: React.FC<ContentOptimizerProps> = ({
  initialContent = '',
  topic,
  keywords,
  onOptimized,
  className = ''
}) => {
  const [content, setContent] = useState(initialContent);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState<any>(null);
  const [validator] = useState(new ContentQualityValidator());
  const [generator] = useState(new EnhancedContentGenerator());

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
      validateContent(initialContent);
    }
  }, [initialContent]);

  const validateContent = async (text: string) => {
    try {
      const results = validator.validateContent(text);
      setOptimizationResults(results);
    } catch (error) {
      console.error('Content validation error:', error);
    }
  };

  const optimizeContent = async () => {
    setIsOptimizing(true);
    try {
      const options = {
        topic,
        keywords,
        targetWordCount: 2000,
        includeExamples: true,
        includeStatistics: true,
        language: 'ar' as const,
        qualityThreshold: 90
      };

      const generatedContent = generator.generateContent(options);
      
      if (generatedContent.content) {
        setContent(generatedContent.content);
        onOptimized?.(generatedContent.content);
        await validateContent(generatedContent.content);
      }
    } catch (error) {
      console.error('Content optimization error:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyRule = (ruleId: string) => {
    const rule = QUALITY_RULES.find(r => r.id === ruleId);
    if (!rule) return;

    let optimizedContent = content;

    switch (ruleId) {
      case 'be-certain':
        optimizedContent = makeContentCertain(optimizedContent);
        break;
      case 'use-numeric-values':
        optimizedContent = addNumericValues(optimizedContent);
        break;
      case 'examples-after-plural-nouns':
        optimizedContent = addExamplesAfterPlurals(optimizedContent);
        break;
      case 'immediate-answers':
        optimizedContent = ensureImmediateAnswers(optimizedContent);
        break;
      case 'proper-word-sequence':
        optimizedContent = fixWordSequence(optimizedContent);
        break;
      case 'cut-the-fluff':
        optimizedContent = removeFluff(optimizedContent);
        break;
      case 'direct-first-sentences':
        optimizedContent = makeFirstSentencesDirect(optimizedContent);
        break;
      case 'bold-answers':
        optimizedContent = boldImportantAnswers(optimizedContent);
        break;
      case 'active-voice':
        optimizedContent = convertToActiveVoice(optimizedContent);
        break;
      case 'concrete-nouns':
        optimizedContent = useConcreteNouns(optimizedContent);
        break;
      case 'short-sentences':
        optimizedContent = shortenSentences(optimizedContent);
        break;
      case 'one-idea-per-paragraph':
        optimizedContent = ensureOneIdeaPerParagraph(optimizedContent);
        break;
      case 'logical-flow':
        optimizedContent = ensureLogicalFlow(optimizedContent);
        break;
      case 'entity-optimization':
        optimizedContent = optimizeEntities(optimizedContent);
        break;
    }

    setContent(optimizedContent);
    onOptimized?.(optimizedContent);
    validateContent(optimizedContent);
  };

  // Rule implementation functions
  const makeContentCertain = (text: string): string => {
    const vagueReplacements = {
      'قد': 'يجب',
      'ربما': 'بالتأكيد',
      'أحياناً': 'دائماً',
      'بعض': 'جميع',
      'قليل': 'كثير',
      'ممكن': 'مؤكد',
      'يحتمل': 'يضمن'
    };
    
    let result = text;
    Object.entries(vagueReplacements).forEach(([vague, certain]) => {
      result = result.replace(new RegExp(vague, 'g'), certain);
    });
    
    return result;
  };

  const addNumericValues = (text: string): string => {
    const numericEnhancements = {
      'تنظيف المكيفات': 'تنظيف المكيفات كل 3 أشهر',
      'يطيل العمر': 'يطيل العمر بنسبة 40%',
      'يحسن الكفاءة': 'يحسن الكفاءة بنسبة 25%',
      'يقلل الاستهلاك': 'يقلل الاستهلاك بنسبة 30%',
      'أدوات التنظيف': '15 أداة تنظيف أساسية',
      'طرق التنظيف': '8 طرق تنظيف فعالة',
      'أنواع البقع': '12 نوع بقع شائع',
      'مواد التنظيف': '20 مادة تنظيف آمنة'
    };
    
    let result = text;
    Object.entries(numericEnhancements).forEach(([original, enhanced]) => {
      result = result.replace(original, enhanced);
    });
    
    return result;
  };

  const addExamplesAfterPlurals = (text: string): string => {
    const pluralExamples = {
      'أدوات التنظيف': 'أدوات التنظيف (الإسفنج، المنظفات، الفرشاة، المكنسة، القفازات)',
      'طرق التنظيف': 'طرق التنظيف (البخار، الكيميائية، الطبيعية، الميكانيكية، الكهربائية)',
      'أنواع البقع': 'أنواع البقع (الدهون، الحبر، الطعام، الماء، الأوساخ)',
      'مواد التنظيف': 'مواد التنظيف (الصابون، الكلور، الخل، البيكربونات، الكحول)',
      'أجهزة التنظيف': 'أجهزة التنظيف (المكنسة، البخار، الغسالة، المجفف، المكواة)'
    };
    
    let result = text;
    Object.entries(pluralExamples).forEach(([plural, withExamples]) => {
      result = result.replace(plural, withExamples);
    });
    
    return result;
  };

  const ensureImmediateAnswers = (text: string): string => {
    const questionPattern = /(.*\؟)/g;
    return text.replace(questionPattern, (match) => {
      if (!match.includes('**الجواب**:') && !match.includes('**الإجابة**:')) {
        return match + '\n\n**الجواب**: ' + generateAnswer(match);
      }
      return match;
    });
  };

  const fixWordSequence = (text: string): string => {
    const sentences = text.split(/[.!?]/);
    const fixedSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 0 && words[0].length > 0) {
        return sentence.trim();
      }
      return sentence;
    });
    
    return fixedSentences.join('. ');
  };

  const removeFluff = (text: string): string => {
    const fluffWords = ['في الواقع', 'يعتبر', 'من الأمور', 'جداً', 'بشكل كبير', 'بالتأكيد'];
    let result = text;
    
    fluffWords.forEach(fluff => {
      result = result.replace(new RegExp(fluff, 'g'), '');
    });
    
    return result;
  };

  const makeFirstSentencesDirect = (text: string): string => {
    const paragraphs = text.split(/\n\s*\n/);
    const directParagraphs = paragraphs.map(paragraph => {
      const firstSentence = paragraph.split(/[.!?]/)[0];
      if (firstSentence.length > 50) {
        const words = firstSentence.split(/\s+/);
        if (words.length > 15) {
          const midPoint = Math.floor(words.length / 2);
          const firstPart = words.slice(0, midPoint).join(' ');
          const secondPart = words.slice(midPoint).join(' ');
          return firstPart + '. ' + secondPart + paragraph.substring(firstSentence.length);
        }
      }
      return paragraph;
    });
    
    return directParagraphs.join('\n\n');
  };

  const boldImportantAnswers = (text: string): string => {
    const importantPatterns = [
      /(الجواب:.*)/g,
      /(الإجابة:.*)/g,
      /(النتيجة:.*)/g,
      /(الخلاصة:.*)/g
    ];
    
    let result = text;
    importantPatterns.forEach(pattern => {
      result = result.replace(pattern, '**$1**');
    });
    
    return result;
  };

  const convertToActiveVoice = (text: string): string => {
    const passiveReplacements = {
      'يتم تنظيف': 'نحن ننظف',
      'تم تنظيف': 'نظفنا',
      'كان يتم تنظيف': 'كنا ننظف',
      'سوف يتم تنظيف': 'سوف ننظف'
    };
    
    let result = text;
    Object.entries(passiveReplacements).forEach(([passive, active]) => {
      result = result.replace(new RegExp(passive, 'g'), active);
    });
    
    return result;
  };

  const useConcreteNouns = (text: string): string => {
    const abstractToConcrete = {
      'الجودة': 'الغبار والجراثيم',
      'الكفاءة': 'الطاقة والوقت',
      'الأداء': 'السرعة والدقة',
      'النتائج': 'الأرقام والإحصائيات'
    };
    
    let result = text;
    Object.entries(abstractToConcrete).forEach(([abstract, concrete]) => {
      result = result.replace(abstract, concrete);
    });
    
    return result;
  };

  const shortenSentences = (text: string): string => {
    const sentences = text.split(/[.!?]/);
    const shortSentences = sentences.map(sentence => {
      const words = sentence.trim().split(/\s+/);
      if (words.length > 20) {
        const midPoint = Math.floor(words.length / 2);
        const firstPart = words.slice(0, midPoint).join(' ');
        const secondPart = words.slice(midPoint).join(' ');
        return firstPart + '. ' + secondPart;
      }
      return sentence;
    });
    
    return shortSentences.join('. ');
  };

  const ensureOneIdeaPerParagraph = (text: string): string => {
    const paragraphs = text.split(/\n\s*\n/);
    const singleIdeaParagraphs = paragraphs.map(paragraph => {
      const sentences = paragraph.split(/[.!?]/);
      if (sentences.length > 3) {
        const midPoint = Math.floor(sentences.length / 2);
        const firstPart = sentences.slice(0, midPoint).join('. ');
        const secondPart = sentences.slice(midPoint).join('. ');
        return firstPart + '.\n\n' + secondPart;
      }
      return paragraph;
    });
    
    return singleIdeaParagraphs.join('\n\n');
  };

  const ensureLogicalFlow = (text: string): string => {
    const sections = text.split(/\n\s*##/);
    let result = sections[0];
    
    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      if (!section.includes('أولاً') && !section.includes('1.')) {
        result += '\n\n## ' + (i) + '. ' + section;
      } else {
        result += '\n\n##' + section;
      }
    }
    
    return result;
  };

  const optimizeEntities = (text: string): string => {
    const locations = ['الرياض', 'جدة', 'الدمام', 'مكة', 'المدينة'];
    const services = ['شركة', 'خدمة', 'صيانة', 'تنظيف'];
    
    let result = text;
    
    locations.forEach(location => {
      if (keywords.some(keyword => keyword.includes(location))) {
        result = result.replace(/تنظيف/g, `تنظيف ${location}`);
      }
    });
    
    services.forEach(service => {
      if (keywords.some(keyword => keyword.includes(service))) {
        result = result.replace(/تنظيف/g, `${service} تنظيف`);
      }
    });
    
    return result;
  };

  const generateAnswer = (question: string): string => {
    if (question.includes('كم مرة')) {
      return 'يُنصح بالتنظيف كل 3 أشهر للحصول على أفضل النتائج.';
    }
    if (question.includes('أفضل مواد')) {
      return 'المنظفات المتخصصة والصابون اللطيف والماء الدافئ.';
    }
    if (question.includes('البقع الصعبة')) {
      return 'حسب نوع البقعة - الطعام بالصابون، الحبر بالكحول، الدهون بمنظف متخصص.';
    }
    return 'يُنصح بالاستعانة بمتخصصين للحصول على أفضل النتائج.';
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'critical':
        return '🔴';
      case 'structural':
        return '🟡';
      case 'additional':
        return '🟢';
      default:
        return '⚪';
    }
  };

  return (
    <div className={`content-optimizer ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          محسن المحتوى - قواعد الجودة الـ14
        </h3>
        <div className="flex items-center gap-4">
          <button
            onClick={optimizeContent}
            disabled={isOptimizing}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isOptimizing ? 'جاري التحسين...' : 'تحسين تلقائي'}
          </button>
          <button
            onClick={() => validateContent(content)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            فحص الجودة
          </button>
        </div>
      </div>

      {/* Content Editor */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          المحتوى
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="أدخل المحتوى هنا..."
        />
      </div>

      {/* Quality Rules */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-700 mb-3">
          قواعد الجودة الـ14
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUALITY_RULES.map((rule, index) => (
            <div
              key={rule.id}
              className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getCategoryIcon(rule.category)}
                  </span>
                  <span className="font-medium text-gray-700">
                    {rule.name}
                  </span>
                </div>
                <button
                  onClick={() => applyRule(rule.id)}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                >
                  تطبيق
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {rule.description}
              </p>
              <div className="text-xs text-gray-500">
                <div className="mb-1">
                  <strong>مثال صحيح:</strong> {rule.examples.good}
                </div>
                <div>
                  <strong>مثال خاطئ:</strong> {rule.examples.bad}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation Results */}
      {optimizationResults && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">
            نتائج التحقق من الجودة
          </h4>
          <div className="flex items-center gap-4 mb-4">
            <div className={`px-4 py-2 rounded-lg ${getScoreBgColor(optimizationResults.percentage)}`}>
              <span className={`text-2xl font-bold ${getScoreColor(optimizationResults.percentage)}`}>
                {optimizationResults.percentage.toFixed(1)}%
              </span>
            </div>
            <div className="text-sm text-gray-600">
              {optimizationResults.score} من {optimizationResults.maxScore} نقطة
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optimizationResults.results.map((result: any, index: number) => (
              <div
                key={index}
                className={`p-2 rounded border ${
                  result.passed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {result.rule}
                  </span>
                  <span className={`text-sm ${
                    result.passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.passed ? '✅' : '❌'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {optimizationResults.recommendations.length > 0 && (
            <div className="mt-4">
              <h5 className="font-medium text-gray-700 mb-2">التوصيات:</h5>
              <ul className="space-y-1">
                {optimizationResults.recommendations.map((recommendation: string, index: number) => (
                  <li key={index} className="text-sm text-gray-600">
                    • {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentOptimizer;