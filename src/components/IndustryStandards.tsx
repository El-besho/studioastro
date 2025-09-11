'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ExternalLink, Shield, Award, CheckCircle } from 'lucide-react';

interface IndustryStandardsProps {
  className?: string;
}

export function IndustryStandards({ className = '' }: IndustryStandardsProps) {
  const standards = [
    {
      name: "الهيئة السعودية للمواصفات والمقاييس والجودة (SASO)",
      description: "نلتزم بجميع المواصفات السعودية المعتمدة للخدمات المنزلية",
      icon: Shield,
      link: "https://saso.gov.sa",
      color: "text-green-600"
    },
    {
      name: "معايير ASHRAE الدولية",
      description: "نطبق معايير الجمعية الأمريكية لمهندسي التدفئة والتبريد",
      icon: Award,
      link: "https://ashrae.org",
      color: "text-blue-600"
    },
    {
      name: "وزارة التجارة والاستثمار",
      description: "جميع مزودي الخدمة لدينا مرخصون من وزارة التجارة",
      icon: CheckCircle,
      link: "https://mci.gov.sa",
      color: "text-purple-600"
    }
  ];

  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-center mb-6">
        معايير الجودة والاعتماد
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {standards.map((standard, index) => {
          const Icon = standard.icon;
          return (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-center mb-2">
                  <Icon className={`h-8 w-8 ${standard.color}`} />
                </div>
                <CardTitle className="text-sm font-medium">
                  {standard.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground mb-3">
                  {standard.description}
                </p>
                <a
                  href={standard.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  <span>المزيد</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}