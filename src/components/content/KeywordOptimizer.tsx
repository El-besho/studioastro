'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Search, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Plus, 
  Edit, 
  Trash2,
  Copy,
  Check,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Link,
  Hash,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import { LongTailKeyword } from '../../lib/content-strategy';

interface KeywordOptimizerProps {
  initialKeywords?: LongTailKeyword[];
}

export function KeywordOptimizer({ initialKeywords = [] }: KeywordOptimizerProps) {
  const [keywords, setKeywords] = useState<LongTailKeyword[]>(initialKeywords);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedKeyword, setSelectedKeyword] = useState<LongTailKeyword | null>(null);
  const [content, setContent] = useState('');
  const [optimizedContent, setOptimizedContent] = useState('');
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());

  // Generate sample keywords if none provided
  useEffect(() => {
    if (keywords.length === 0) {
      const sampleKeywords = generateSampleKeywords();
      setKeywords(sampleKeywords);
    }
  }, [keywords.length]);

  const generateSampleKeywords = (): LongTailKeyword[] => [
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

  const filteredKeywords = keywords.filter(keyword =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()) ||
    keyword.relatedKeywords.some(related => 
      related.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 30) return 'text-green-600';
    if (difficulty <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'commercial': return 'bg-blue-100 text-blue-800';
      case 'informational': return 'bg-green-100 text-green-800';
      case 'navigational': return 'bg-purple-100 text-purple-800';
      case 'transactional': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case 'commercial': return <DollarSign className="h-4 w-4" />;
      case 'informational': return <Search className="h-4 w-4" />;
      case 'navigational': return <Link className="h-4 w-4" />;
      case 'transactional': return <Target className="h-4 w-4" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, itemId]));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const optimizeContent = () => {
    if (!selectedKeyword || !content) return;

    let optimized = content;
    
    // Add primary keyword to title and first paragraph
    optimized = optimized.replace(
      /(.*?)(\n|$)/,
      `$1 - ${selectedKeyword.keyword}$2`
    );

    // Add related keywords throughout content
    selectedKeyword.relatedKeywords.forEach((relatedKeyword, index) => {
      if (index < 3) { // Only add first 3 related keywords
        const regex = new RegExp(`(${relatedKeyword.split(' ')[0]})`, 'gi');
        optimized = optimized.replace(regex, `$1 (${relatedKeyword})`);
      }
    });

    // Add social media variations as call-to-actions
    optimized += '\n\n---\n\n';
    optimized += 'منشورات وسائل التواصل:\n';
    selectedKeyword.socialMediaVariations.forEach(variation => {
      optimized += `• ${variation}\n`;
    });

    setOptimizedContent(optimized);
  };

  const generateContentIdeas = (keyword: LongTailKeyword) => {
    return keyword.contentIdeas.map((idea, index) => (
      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
        <span className="text-sm">{idea}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(idea, `idea-${index}`)}
        >
          {copiedItems.has(`idea-${index}`) ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    ));
  };

  const generateSocialVariations = (keyword: LongTailKeyword) => {
    return keyword.socialMediaVariations.map((variation, index) => (
      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
        <span className="text-sm">{variation}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => copyToClipboard(variation, `social-${index}`)}
        >
          {copiedItems.has(`social-${index}`) ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">محسن الكلمات المفتاحية</h2>
          <p className="text-muted-foreground">تحسين المحتوى للكلمات المفتاحية طويلة الذيل</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            إضافة كلمة مفتاحية
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            تحليل الأداء
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keywords List */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                الكلمات المفتاحية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="البحث في الكلمات المفتاحية..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                <div className="space-y-2">
                  {filteredKeywords.map((keyword, index) => (
                    <Card 
                      key={index} 
                      className={`cursor-pointer transition-colors ${
                        selectedKeyword?.keyword === keyword.keyword 
                          ? 'ring-2 ring-primary' 
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedKeyword(keyword)}
                    >
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-sm">{keyword.keyword}</h4>
                            <div className="flex gap-1">
                              <Badge className={getIntentColor(keyword.intent)}>
                                {getIntentIcon(keyword.intent)}
                                <span className="ml-1">{keyword.intent}</span>
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              <span>{keyword.searchVolume} بحث/شهر</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              <span className={getDifficultyColor(keyword.difficulty)}>
                                صعوبة: {keyword.difficulty}%
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {keyword.relatedKeywords.slice(0, 3).map((related, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {related}
                              </Badge>
                            ))}
                            {keyword.relatedKeywords.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{keyword.relatedKeywords.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Optimizer */}
        <div className="space-y-4">
          {selectedKeyword ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    تحسين المحتوى
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        المحتوى الحالي:
                      </label>
                      <Textarea
                        placeholder="أدخل المحتوى الذي تريد تحسينه..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                      />
                    </div>
                    
                    <Button onClick={optimizeContent} className="w-full">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      تحسين المحتوى
                    </Button>
                    
                    {optimizedContent && (
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          المحتوى المحسن:
                        </label>
                        <Textarea
                          value={optimizedContent}
                          onChange={(e) => setOptimizedContent(e.target.value)}
                          rows={8}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    أفكار المحتوى
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {generateContentIdeas(selectedKeyword)}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    منشورات وسائل التواصل
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {generateSocialVariations(selectedKeyword)}
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">اختر كلمة مفتاحية</h3>
                <p className="text-muted-foreground">
                  اختر كلمة مفتاحية من القائمة لبدء تحسين المحتوى
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}