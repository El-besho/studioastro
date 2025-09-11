'use client';

import { useState, useEffect } from 'react';
import { performanceMonitor } from '../lib/performance';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface PerformanceMetricsProps {
  show?: boolean;
}

export function PerformanceMonitor({ show = process.env.NODE_ENV === 'development' }: PerformanceMetricsProps) {
  const [metrics, setMetrics] = useState(performanceMonitor.getMetrics());
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(performanceMonitor.getMetrics());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const budget = performanceMonitor.checkPerformanceBudget();
  const score = performanceMonitor.getPerformanceScore();

  const getMetricColor = (metricName: string, value: number) => {
    const budgets = {
      LCP: 2500,
      FID: 100,
      CLS: 0.1,
      FCP: 1800,
      TTFB: 800,
    };

    const threshold = budgets[metricName as keyof typeof budgets];
    if (!threshold) return 'default';

    if (value <= threshold * 0.5) return 'success';
    if (value <= threshold) return 'warning';
    return 'destructive';
  };

  const getMetricIcon = (metricName: string, value: number) => {
    const budgets = {
      LCP: 2500,
      FID: 100,
      CLS: 0.1,
      FCP: 1800,
      TTFB: 800,
    };

    const threshold = budgets[metricName as keyof typeof budgets];
    if (!threshold) return <Minus className="h-3 w-3" />;

    if (value <= threshold * 0.5) return <TrendingUp className="h-3 w-3" />;
    if (value <= threshold) return <Minus className="h-3 w-3" />;
    return <TrendingDown className="h-3 w-3" />;
  };

  const formatMetricValue = (metricName: string, value: number) => {
    switch (metricName) {
      case 'LCP':
      case 'FCP':
      case 'TTFB':
        return `${Math.round(value)}ms`;
      case 'FID':
        return `${Math.round(value)}ms`;
      case 'CLS':
        return value.toFixed(3);
      default:
        return value.toString();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'success';
    if (score >= 70) return 'warning';
    return 'destructive';
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Performance Monitor</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={getScoreColor(score)} className="text-xs">
                {score}/100
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  performanceMonitor.clearMetrics();
                  setMetrics([]);
                }}
                className="h-6 w-6 p-0"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {metrics.length === 0 ? (
              <p className="text-xs text-muted-foreground">No metrics collected yet</p>
            ) : (
              metrics.map((metric) => (
                <div key={metric.id} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    {getMetricIcon(metric.name, metric.value)}
                    <span className="font-mono">{metric.name}</span>
                  </div>
                  <Badge variant={getMetricColor(metric.name, metric.value)} className="text-xs">
                    {formatMetricValue(metric.name, metric.value)}
                  </Badge>
                </div>
              ))
            )}
            
            {budget.violations.length > 0 && (
              <div className="mt-2 pt-2 border-t">
                <p className="text-xs font-medium text-destructive mb-1">Budget Violations:</p>
                {budget.violations.map((violation, index) => (
                  <div key={index} className="text-xs text-destructive">
                    {violation.metric}: {formatMetricValue(violation.metric, violation.value)} 
                    (threshold: {formatMetricValue(violation.metric, violation.threshold)})
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}