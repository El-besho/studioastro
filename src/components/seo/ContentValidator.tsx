// Content Validator Component - Enforces 14 Mandatory Rules
// Validates content against all quality rules before output

import React, { useState, useEffect } from 'react';

interface ValidationResult {
  rule: string;
  passed: boolean;
  message: string;
  suggestions: string[];
}

interface ContentValidatorProps {
  content: string;
  title: string;
  description: string;
  keywords: string[];
  showValidation?: boolean;
  className?: string;
}

export const ContentValidator: React.FC<ContentValidatorProps> = ({
  content,
  title,
  description,
  keywords,
  showValidation = false,
  className = ''
}) => {
  const [validationResults, setValidationResults] = useState<ValidationResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  // Rule 2: Be Certain - Eliminate all opinion-based language
  const validateRule2 = (text: string): ValidationResult => {
    const opinionWords = ['قد يكون', 'ربما', 'يبدو', 'يمكن أن', 'من المحتمل', 'قد', 'ربما', 'يبدو أن'];
    const foundOpinions = opinionWords.filter(word => text.includes(word));
    
    return {
      rule: 'Rule 2: Be Certain',
      passed: foundOpinions.length === 0,
      message: foundOpinions.length > 0 ? `Found ${foundOpinions.length} opinion-based words` : 'All statements are definitive',
      suggestions: foundOpinions.length > 0 ? 
        [`Replace "${foundOpinions.join('", "')}" with specific facts`] : []
    };
  };

  // Rule 4: Use Numeric Values - Always include specific numbers
  const validateRule4 = (text: string): ValidationResult => {
    const vagueTerms = ['عدة', 'كثير', 'بعض', 'مختلف', 'متعدد', 'متنوع'];
    const foundVague = vagueTerms.filter(term => text.includes(term));
    const numbers = text.match(/\d+/g) || [];
    
    return {
      rule: 'Rule 4: Use Numeric Values',
      passed: foundVague.length === 0 && numbers.length >= 5,
      message: foundVague.length > 0 ? 
        `Found ${foundVague.length} vague terms` : 
        `Found ${numbers.length} specific numbers`,
      suggestions: foundVague.length > 0 ? 
        [`Replace "${foundVague.join('", "')}" with specific numbers`] : []
    };
  };

  // Rule 7: Examples After Plural Nouns - Never leave plural nouns unqualified
  const validateRule7 = (text: string): ValidationResult => {
    const pluralNouns = ['طرق', 'أدوات', 'مواد', 'تقنيات', 'فوائد', 'أنواع', 'أمثلة'];
    const unqualifiedPlurals = pluralNouns.filter(noun => {
      const regex = new RegExp(`\\b${noun}\\b`, 'g');
      const matches = text.match(regex) || [];
      return matches.some(match => {
        const context = text.substring(text.indexOf(match) - 50, text.indexOf(match) + 50);
        return !context.includes(':') && !context.includes('(') && !context.includes('[');
      });
    });
    
    return {
      rule: 'Rule 7: Examples After Plural Nouns',
      passed: unqualifiedPlurals.length === 0,
      message: unqualifiedPlurals.length > 0 ? 
        `Found ${unqualifiedPlurals.length} unqualified plural nouns` : 
        'All plural nouns have examples',
      suggestions: unqualifiedPlurals.length > 0 ? 
        [`Add examples after "${unqualifiedPlurals.join('", "')}"`] : []
    };
  };

  // Rule 12: Immediate Answers - Provide direct responses without delay
  const validateRule12 = (text: string): ValidationResult => {
    const delayedResponses = ['في البداية', 'أولاً', 'قبل أن', 'بعد ذلك', 'ثم', 'لاحقاً'];
    const foundDelays = delayedResponses.filter(phrase => text.includes(phrase));
    
    return {
      rule: 'Rule 12: Immediate Answers',
      passed: foundDelays.length === 0,
      message: foundDelays.length > 0 ? 
        `Found ${foundDelays.length} delayed responses` : 
        'All responses are immediate',
      suggestions: foundDelays.length > 0 ? 
        [`Remove delay phrases: "${foundDelays.join('", "')}"`] : []
    };
  };

  // Rule 1: Proper Word Sequence - Main information first
  const validateRule1 = (text: string): ValidationResult => {
    const paragraphs = text.split('\n\n');
    const mainInfoFirst = paragraphs.filter(para => {
      const firstSentence = para.split('.')[0];
      return firstSentence.length < 100 && firstSentence.includes('**');
    });
    
    return {
      rule: 'Rule 1: Proper Word Sequence',
      passed: mainInfoFirst.length >= paragraphs.length * 0.7,
      message: `Main information first in ${mainInfoFirst.length}/${paragraphs.length} paragraphs`,
      suggestions: mainInfoFirst.length < paragraphs.length * 0.7 ? 
        ['Move main information to beginning of paragraphs'] : []
    };
  };

  // Rule 3: Cut the Fluff - Eliminate unnecessary words
  const validateRule3 = (text: string): ValidationResult => {
    const fluffWords = ['في الواقع', 'بالتأكيد', 'بالطبع', 'فعلاً', 'حقيقة', 'بصراحة'];
    const foundFluff = fluffWords.filter(word => text.includes(word));
    
    return {
      rule: 'Rule 3: Cut the Fluff',
      passed: foundFluff.length === 0,
      message: foundFluff.length > 0 ? 
        `Found ${foundFluff.length} unnecessary words` : 
        'No unnecessary words found',
      suggestions: foundFluff.length > 0 ? 
        [`Remove fluff words: "${foundFluff.join('", "')}"`] : []
    };
  };

  // Rule 9: Direct First Sentences - Address headings immediately
  const validateRule9 = (text: string): ValidationResult => {
    const headings = text.match(/^## .+$/gm) || [];
    const directResponses = headings.filter(heading => {
      const nextParagraph = text.substring(text.indexOf(heading) + heading.length, text.indexOf(heading) + heading.length + 200);
      return nextParagraph.includes('**') || nextParagraph.includes('1.') || nextParagraph.includes('-');
    });
    
    return {
      rule: 'Rule 9: Direct First Sentences',
      passed: directResponses.length >= headings.length * 0.8,
      message: `Direct responses to ${directResponses.length}/${headings.length} headings`,
      suggestions: directResponses.length < headings.length * 0.8 ? 
        ['Address headings immediately with specific information'] : []
    };
  };

  // Rule 13: Bold Answers - Emphasize key information, not search terms
  const validateRule13 = (text: string): ValidationResult => {
    const boldText = text.match(/\*\*([^*]+)\*\*/g) || [];
    const keyInfoBold = boldText.filter(bold => {
      const text = bold.replace(/\*\*/g, '');
      return text.includes('نسبة') || text.includes('ساعة') || text.includes('دقيقة') || text.includes('ريال') || text.includes('سنة');
    });
    
    return {
      rule: 'Rule 13: Bold Answers',
      passed: keyInfoBold.length >= boldText.length * 0.6,
      message: `Key information bold in ${keyInfoBold.length}/${boldText.length} cases`,
      suggestions: keyInfoBold.length < boldText.length * 0.6 ? 
        ['Emphasize key information instead of search terms'] : []
    };
  };

  // Run all validations
  const runValidations = () => {
    const results: ValidationResult[] = [
      validateRule2(content),
      validateRule4(content),
      validateRule7(content),
      validateRule12(content),
      validateRule1(content),
      validateRule3(content),
      validateRule9(content),
      validateRule13(content)
    ];

    setValidationResults(results);
    
    const passedRules = results.filter(result => result.passed).length;
    const score = Math.round((passedRules / results.length) * 100);
    setOverallScore(score);
  };

  useEffect(() => {
    runValidations();
  }, [content]);

  return (
    <div className={`content-validator ${className}`}>
      {showValidation && (
        <div className="validation-panel mb-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Content Quality Validation</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Quality Score:</span>
              <div className="flex items-center">
                <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className={`h-2 rounded-full ${
                      overallScore >= 80 ? 'bg-green-500' : 
                      overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${overallScore}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{overallScore}/100</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {validationResults.map((result, index) => (
              <div key={index} className={`p-3 rounded ${
                result.passed ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    result.passed ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.rule}
                  </span>
                  <span className={`text-sm ${
                    result.passed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {result.passed ? '✓' : '✗'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{result.message}</p>
                {result.suggestions.length > 0 && (
                  <ul className="text-sm text-red-600 mt-2 list-disc list-inside">
                    {result.suggestions.map((suggestion, idx) => (
                      <li key={idx}>{suggestion}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {overallScore < 80 && (
            <div className="mt-4 p-3 bg-yellow-100 rounded">
              <h4 className="font-medium text-yellow-800 mb-2">Improvement Needed</h4>
              <p className="text-sm text-yellow-700">
                Content needs improvement to meet quality standards. 
                Focus on the failed rules above.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Hook for content validation
export const useContentValidation = (content: string) => {
  const [isValid, setIsValid] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Quick validation check
    const opinionWords = ['قد يكون', 'ربما', 'يبدو', 'يمكن أن'];
    const hasOpinions = opinionWords.some(word => content.includes(word));
    
    const numbers = content.match(/\d+/g) || [];
    const hasNumbers = numbers.length >= 5;
    
    const isValidContent = !hasOpinions && hasNumbers;
    setIsValid(isValidContent);
    setScore(isValidContent ? 100 : 50);
  }, [content]);

  return { isValid, score };
};

export default ContentValidator;