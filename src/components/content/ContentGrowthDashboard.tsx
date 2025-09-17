'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Users, 
  Eye, 
  Share2, 
  Heart,
  MessageCircle,
  Calendar,
  Target,
  Award,
  Zap,
  Clock,
  DollarSign,
  FileText,
  Image,
  Video,
  Link,
  Hash,
  Globe,
  Smartphone,
  Laptop,
  BookOpen
} from 'lucide-react';
import { ContentMetrics } from '../../lib/content-strategy';

interface ContentGrowthDashboardProps {
  initialMetrics?: ContentMetrics;
}

export function ContentGrowthDashboard({ initialMetrics }: ContentGrowthDashboardProps) {
  const [metrics, setMetrics] = useState<ContentMetrics>(
    initialMetrics || {
      totalPosts: 0,
      monthlyGrowth: 0,
      engagementRate: 0,
      keywordRankings: 0,
      organicTraffic: 0,
      conversionRate: 0,
      socialMediaReach: 0,
      contentQualityScore: 0
    }
  );

  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  // Generate sample data if none provided
  useEffect(() => {
    if (!initialMetrics) {
      const sampleMetrics = generateSampleMetrics();
      setMetrics(sampleMetrics);
    }
  }, [initialMetrics]);

  const generateSampleMetrics = (): ContentMetrics => ({
    totalPosts: 45,
    monthlyGrowth: 15.2,
    engagementRate: 8.7,
    keywordRankings: 156,
    organicTraffic: 28450,
    conversionRate: 3.4,
    socialMediaReach: 52000,
    contentQualityScore: 94
  });

  const getGrowthIcon = (value: number) => {
    return value > 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getGrowthColor = (value: number) => {
    return value > 0 ? 'text-green-600' : 'text-red-600';
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatPercentage = (num: number) => {
    return num.toFixed(1) + '%';
  };

  const contentTypes = [
    { type: 'مقالات', count: 25, icon: FileText, color: 'text-blue-600' },
    { type: 'دلائل', count: 12, icon: BookOpen, color: 'text-green-600' },
    { type: 'إنفوجرافيك', count: 5, icon: Image, color: 'text-purple-600' },
    { type: 'فيديوهات', count: 3, icon: Video, color: 'text-red-600' }
  ];

  const topPerformingContent = [
    {
      title: 'الدليل الشامل لصيانة مكيفات الهواء',
      views: 15420,
      engagement: 12.5,
      keywords: 8,
      status: 'منشور'
    },
    {
      title: 'كيفية تنظيف مكيف الهواء بنفسك',
      views: 12850,
      engagement: 10.8,
      keywords: 6,
      status: 'منشور'
    },
    {
      title: 'أفضل شركة صيانة مكيفات في الرياض',
      views: 11200,
      engagement: 9.2,
      keywords: 5,
      status: 'منشور'
    }
  ];

  const keywordPerformance = [
    { keyword: 'صيانة مكيفات الهواء', position: 3, traffic: 1200, difficulty: 45 },
    { keyword: 'شركة صيانة مكيفات الرياض', position: 5, traffic: 800, difficulty: 35 },
    { keyword: 'تنظيف مكيف الهواء', position: 2, traffic: 600, difficulty: 25 },
    { keyword: 'إصلاح مكيفات الهواء', position: 4, traffic: 450, difficulty: 40 }
  ];

  const socialMediaStats = [
    { platform: 'Facebook', followers: 15000, engagement: 8.5, reach: 25000 },
    { platform: 'Instagram', followers: 12000, engagement: 12.3, reach: 18000 },
    { platform: 'Twitter', followers: 8000, engagement: 6.7, reach: 12000 },
    { platform: 'LinkedIn', followers: 5000, engagement: 15.2, reach: 8000 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">لوحة تحكم نمو المحتوى</h2>
          <p className="text-muted-foreground">تتبع أداء المحتوى ونموه الشهري</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="7d">آخر 7 أيام</option>
            <option value="30d">آخر 30 يوم</option>
            <option value="90d">آخر 90 يوم</option>
            <option value="1y">آخر سنة</option>
          </select>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            تقرير مفصل
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي المنشورات</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalPosts}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(metrics.monthlyGrowth)}
              <span className={`ml-1 ${getGrowthColor(metrics.monthlyGrowth)}`}>
                +{formatPercentage(metrics.monthlyGrowth)} من الشهر الماضي
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معدل التفاعل</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPercentage(metrics.engagementRate)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(2.1)}
              <span className="ml-1 text-green-600">+2.1% من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الزوار العضويين</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(metrics.organicTraffic)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(18.5)}
              <span className="ml-1 text-green-600">+18.5% من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">الكلمات المفتاحية</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.keywordRankings}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {getGrowthIcon(12)}
              <span className="ml-1 text-green-600">+12 من الشهر الماضي</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Types */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              أنواع المحتوى
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contentTypes.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${item.color}`} />
                      <span className="font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{item.count}</span>
                      <Badge variant="outline">منشور</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              أفضل المحتوى أداءً
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingContent.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(item.views)} مشاهدة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      <span>{formatPercentage(item.engagement)} تفاعل</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>{item.keywords} كلمات مفتاحية</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keyword Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              أداء الكلمات المفتاحية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {keywordPerformance.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.keyword}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        المركز {item.position}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        صعوبة {item.difficulty}%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{formatNumber(item.traffic)} زائر/شهر</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Social Media Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              إحصائيات وسائل التواصل
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {socialMediaStats.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{item.platform}</span>
                    <Badge variant="outline" className="text-xs">
                      {formatPercentage(item.engagement)} تفاعل
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{formatNumber(item.followers)} متابع</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatNumber(item.reach)} وصول</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Quality Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            جودة المحتوى
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">الدرجة الإجمالية</span>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-green-600">{metrics.contentQualityScore}</span>
                <span className="text-muted-foreground">/100</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">95</div>
                <div className="text-sm text-muted-foreground">جودة الكتابة</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">92</div>
                <div className="text-sm text-muted-foreground">تحسين SEO</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-purple-600">88</div>
                <div className="text-sm text-muted-foreground">التفاعل</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}