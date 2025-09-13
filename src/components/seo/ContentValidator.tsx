import React, { useState, useEffect } from 'react';
import { ContentQualityValidator, QualityRule } from '@/lib/content-quality-rules';

interface ContentValidatorProps {
  content: string;
  onValidationComplete?: (results: any) => void;
  showDetails?: boolean;
  className?: string;
}

export const ContentValidator: React.FC<ContentValidatorProps> = ({
  content,
  onValidationComplete,
  showDetails = true,
  className = ''
}) => {
  const [validator] = useState(new ContentQualityValidator());
  const [validationResults, setValidationResults] = useState<any>(null);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (content && content.length > 0) {
      validateContent();
    }
  }, [content]);

  const validateContent = async () => {
    setIsValidating(true);
    try {
      const results = validator.validateContent(content);
      setValidationResults(results);
      onValidationComplete?.(results);
    } catch (error) {
      console.error('Content validation error:', error);
    } finally {
      setIsValidating(false);
    }
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

  if (!validationResults) {
    return (
      <div className={`content-validator ${className}`}>
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">جاري التحقق من الجودة...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`content-validator ${className}`}>
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          نتائج التحقق من جودة المحتوى
        </h3>
        <div className="flex items-center gap-4">
          <div className={`px-4 py-2 rounded-lg ${getScoreBgColor(validationResults.percentage)}`}>
            <span className={`text-2xl font-bold ${getScoreColor(validationResults.percentage)}`}>
              {validationResults.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="text-sm text-gray-600">
            {validationResults.score} من {validationResults.maxScore} نقطة
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              validationResults.percentage >= 90 ? 'bg-green-500' :
              validationResults.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${validationResults.percentage}%` }}
          ></div>
        </div>
      </div>

      {showDetails && (
        <>
          {/* Rules Results */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-700 mb-3">
              تفاصيل القواعد
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {validationResults.results.map((result: any, index: number) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.passed 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {getCategoryIcon(result.category)}
                      </span>
                      <span className="font-medium text-gray-700">
                        {result.rule}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        result.passed ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.passed ? '✅' : '❌'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {result.weight} نقطة
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          {validationResults.recommendations.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                التوصيات للتحسين
              </h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="space-y-2">
                  {validationResults.recommendations.map((recommendation: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 mt-1">💡</span>
                      <span className="text-sm text-gray-700">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Quality Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">
              ملخص الجودة
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {validationResults.results.filter((r: any) => r.passed).length}
                </div>
                <div className="text-gray-600">قواعد مطبقة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {validationResults.results.filter((r: any) => !r.passed).length}
                </div>
                <div className="text-gray-600">قواعد تحتاج تحسين</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(validationResults.percentage)}%
                </div>
                <div className="text-gray-600">نسبة الجودة</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={validateContent}
          disabled={isValidating}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? 'جاري التحقق...' : 'إعادة التحقق'}
        </button>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        >
          طباعة التقرير
        </button>
      </div>
    </div>
  );
};

export default ContentValidator;