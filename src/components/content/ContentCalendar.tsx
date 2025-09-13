'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Share2, 
  TrendingUp,
  Clock,
  Users,
  Target,
  BarChart3,
  FileText,
  Image,
  Video,
  Link
} from 'lucide-react';
import { ContentCalendar as CalendarType, ContentTopic, SocialMediaPost } from '../../lib/content-strategy';

interface ContentCalendarProps {
  initialCalendar?: CalendarType[];
}

export function ContentCalendar({ initialCalendar = [] }: ContentCalendarProps) {
  const [calendar, setCalendar] = useState<CalendarType[]>(initialCalendar);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  // Generate sample calendar data if none provided
  useEffect(() => {
    if (calendar.length === 0) {
      const sampleCalendar = generateSampleCalendar();
      setCalendar(sampleCalendar);
    }
  }, [calendar.length]);

  const generateSampleCalendar = (): CalendarType[] => {
    const topics: ContentTopic[] = [
      {
        id: 'ac-maintenance-guide',
        title: 'الدليل الشامل لصيانة مكيفات الهواء',
        category: 'guide',
        primaryKeyword: 'صيانة مكيفات الهواء',
        longTailKeywords: ['صيانة مكيفات الرياض', 'صيانة مكيفات جدة'],
        socialKeywords: ['#صيانة_مكيفات', '#تكييف_هواء'],
        targetAudience: 'أصحاب المنازل',
        contentLength: 'comprehensive',
        estimatedReadTime: 15,
        difficulty: 'beginner',
        localRelevance: ['الرياض', 'جدة'],
        seasonalRelevance: ['صيف'],
        competitorGaps: ['معلومات مفصلة'],
        userIntent: 'informational',
        contentPillars: ['التعليم'],
        socialMediaHooks: ['هل تعلم أن تنظيف المكيف يوفر 30% من الطاقة؟'],
        callToAction: 'احجز صيانة مكيفاتك الآن',
        relatedTopics: ['تركيب مكيفات'],
        contentIdeas: ['دليل خطوة بخطوة']
      }
    ];

    const dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      if (i % 3 === 0) { // Every 3 days
        dates.push({
          date: date.toISOString().split('T')[0],
          topic: topics[0],
          status: 'planned',
          priority: i % 2 === 0 ? 'high' : 'medium',
          assignedWriter: 'فريق المحتوى',
          deadline: new Date(date.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          socialMediaPosts: []
        });
      }
    }
    
    return dates;
  };

  const filteredCalendar = calendar.filter(item => {
    const statusMatch = filterStatus === 'all' || item.status === filterStatus;
    const priorityMatch = filterPriority === 'all' || item.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'planned': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getContentTypeIcon = (category: string) => {
    switch (category) {
      case 'guide': return <FileText className="h-4 w-4" />;
      case 'tutorial': return <Video className="h-4 w-4" />;
      case 'infographic': return <Image className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">تقويم المحتوى</h2>
          <p className="text-muted-foreground">إدارة وتخطيط المحتوى الشهري</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            إضافة محتوى
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            التقارير
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">الحالة:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">جميع الحالات</option>
            <option value="planned">مخطط</option>
            <option value="in-progress">قيد التنفيذ</option>
            <option value="review">قيد المراجعة</option>
            <option value="published">منشور</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">الأولوية:</label>
          <select 
            value={filterPriority} 
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">جميع الأولويات</option>
            <option value="high">عالية</option>
            <option value="medium">متوسطة</option>
            <option value="low">منخفضة</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">العرض:</label>
          <div className="flex gap-1">
            <Button 
              variant={viewMode === 'month' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('month')}
            >
              شهر
            </Button>
            <Button 
              variant={viewMode === 'week' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('week')}
            >
              أسبوع
            </Button>
            <Button 
              variant={viewMode === 'day' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('day')}
            >
              يوم
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="grid gap-4">
        {filteredCalendar.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {getContentTypeIcon(item.topic.category)}
                  <div>
                    <CardTitle className="text-lg">{item.topic.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(item.date).toLocaleDateString('ar-SA')} • {item.assignedWriter}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                  <Badge className={getPriorityColor(item.priority)}>
                    {item.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Content Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{item.topic.estimatedReadTime} دقيقة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span>{item.topic.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{item.topic.targetAudience}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span>{item.topic.longTailKeywords.length} كلمات مفتاحية</span>
                  </div>
                </div>

                {/* Keywords */}
                <div>
                  <h4 className="text-sm font-medium mb-2">الكلمات المفتاحية:</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.topic.longTailKeywords.slice(0, 5).map((keyword, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                    {item.topic.longTailKeywords.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.topic.longTailKeywords.length - 5} أخرى
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Social Media Posts */}
                {item.socialMediaPosts.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">منشورات وسائل التواصل:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {item.socialMediaPosts.map((post, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                          <div className="flex items-center gap-1">
                            {post.platform === 'facebook' && <div className="w-3 h-3 bg-blue-500 rounded-full" />}
                            {post.platform === 'twitter' && <div className="w-3 h-3 bg-sky-500 rounded-full" />}
                            {post.platform === 'instagram' && <div className="w-3 h-3 bg-pink-500 rounded-full" />}
                            <span className="text-xs font-medium">{post.platform}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {post.scheduledTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    معاينة
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    مشاركة
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    حذف
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCalendar.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا يوجد محتوى</h3>
            <p className="text-muted-foreground mb-4">
              لا يوجد محتوى يطابق الفلاتر المحددة
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة محتوى جديد
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}