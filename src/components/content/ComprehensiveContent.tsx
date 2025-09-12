'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Lightbulb, 
  Wrench, 
  MapPin, 
  Settings, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  DollarSign, 
  Clock, 
  Shield,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { getContentEnhancement } from '../../lib/content-enhancement';

interface ComprehensiveContentProps {
  serviceType: string;
  serviceName: string;
  city?: string;
}

export function ComprehensiveContent({ serviceType, serviceName, city }: ComprehensiveContentProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['insights', 'solutions']));
  
  const enhancement = getContentEnhancement(serviceType, city);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const sections = [
    {
      id: 'insights',
      title: 'رؤى فريدة ومتخصصة',
      icon: Lightbulb,
      content: enhancement.uniqueInsights,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'solutions',
      title: 'حلول المشاكل الشائعة',
      icon: Wrench,
      content: enhancement.problemSolutions,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'local',
      title: 'السياق المحلي',
      icon: MapPin,
      content: enhancement.localContext,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'technical',
      title: 'التفاصيل التقنية المتقدمة',
      icon: Settings,
      content: enhancement.technicalDetails,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'cases',
      title: 'دراسات حالة حقيقية',
      icon: BookOpen,
      content: enhancement.caseStudies,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      id: 'practices',
      title: 'أفضل الممارسات',
      icon: CheckCircle,
      content: enhancement.bestPractices,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      id: 'mistakes',
      title: 'الأخطاء الشائعة',
      icon: XCircle,
      content: enhancement.commonMistakes,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'costs',
      title: 'عوامل التأثير على التكلفة',
      icon: DollarSign,
      content: enhancement.costFactors,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'time',
      title: 'التقديرات الزمنية',
      icon: Clock,
      content: enhancement.timeEstimates,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    },
    {
      id: 'safety',
      title: 'اعتبارات السلامة',
      icon: Shield,
      content: enhancement.safetyConsiderations,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-headline text-3xl font-bold mb-4">
          محتوى شامل ومتخصص لخدمات {serviceName}
        </h2>
        <p className="text-foreground/70 max-w-3xl mx-auto">
          اكتشف رؤى فريدة وحلول متخصصة وخبرات محلية لضمان أفضل النتائج لخدماتك
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSections.has(section.id);
          
          return (
            <Card key={section.id} className="hover:shadow-lg transition-shadow">
              <CardHeader 
                className={`${section.bgColor} cursor-pointer`}
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${section.color}`} />
                    <CardTitle className={`text-lg ${section.color}`}>
                      {section.title}
                    </CardTitle>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <ul className="space-y-3">
                    {section.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 ${section.bgColor.replace('bg-', 'bg-').replace('-50', '-200')}`} />
                        <span className="text-sm text-foreground/80 leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <Card className="mt-8 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-headline text-xl font-bold mb-2">
            هل تحتاج إلى استشارة متخصصة؟
          </h3>
          <p className="text-foreground/70 mb-4">
            فريقنا من الخبراء جاهز لتقديم استشارة مجانية مخصصة لاحتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="font-headline">
              احصل على استشارة مجانية
            </Button>
            <Button variant="outline" className="font-headline">
              اطلب عرض سعر
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}