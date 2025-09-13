// Performance Monitor Component
// Real-time performance monitoring and optimization recommendations

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Activity, 
  Zap, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  RefreshCw,
  BarChart3,
  Settings,
  Download
} from 'lucide-react';

interface PerformanceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
}

interface PerformanceThresholds {
  firstContentfulPaint: { good: number; needsImprovement: number };
  largestContentfulPaint: { good: number; needsImprovement: number };
  firstInputDelay: { good: number; needsImprovement: number };
  cumulativeLayoutShift: { good: number; needsImprovement: number };
  timeToInteractive: { good: number; needsImprovement: number };
  totalBlockingTime: { good: number; needsImprovement: number };
  speedIndex: { good: number; needsImprovement: number };
}

interface OptimizationRecommendation {
  metric: string;
  currentValue: number;
  threshold: { good: number; needsImprovement: number };
  status: 'good' | 'needsImprovement' | 'poor';
  recommendations: string[];
  priority: 'high' | 'medium' | 'low';
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const thresholds: PerformanceThresholds = {
    firstContentfulPaint: { good: 1800, needsImprovement: 3000 },
    largestContentfulPaint: { good: 2500, needsImprovement: 4000 },
    firstInputDelay: { good: 100, needsImprovement: 300 },
    cumulativeLayoutShift: { good: 0.1, needsImprovement: 0.25 },
    timeToInteractive: { good: 3800, needsImprovement: 7300 },
    totalBlockingTime: { good: 200, needsImprovement: 600 },
    speedIndex: { good: 3400, needsImprovement: 5800 }
  };

  const measurePerformance = useCallback(async () => {
    if (typeof window === 'undefined') return;

    setIsMonitoring(true);

    try {
      // Wait for page to be fully loaded
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(void 0);
        } else {
          window.addEventListener('load', () => resolve(void 0));
        }
      });

      // Measure Core Web Vitals
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const largestContentfulPaint = await measureLCP();
      const firstInputDelay = await measureFID();
      const cumulativeLayoutShift = await measureCLS();
      const timeToInteractive = navigation.domContentLoadedEventEnd - navigation.navigationStart;
      const totalBlockingTime = calculateTBT();
      const speedIndex = firstContentfulPaint; // Simplified

      const newMetrics: PerformanceMetrics = {
        firstContentfulPaint,
        largestContentfulPaint,
        firstInputDelay,
        cumulativeLayoutShift,
        timeToInteractive,
        totalBlockingTime,
        speedIndex
      };

      setMetrics(newMetrics);
      generateRecommendations(newMetrics);
    } catch (error) {
      console.error('Performance measurement failed:', error);
    } finally {
      setIsMonitoring(false);
    }
  }, []);

  const measureLCP = async (): Promise<number> => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
        observer.disconnect();
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Fallback timeout
      setTimeout(() => resolve(0), 5000);
    });
  };

  const measureFID = async (): Promise<number> => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const firstInput = entries[0];
        const delay = firstInput.processingStart - firstInput.startTime;
        resolve(delay);
        observer.disconnect();
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      
      // Fallback timeout
      setTimeout(() => resolve(0), 5000);
    });
  };

  const measureCLS = async (): Promise<number> => {
    return new Promise((resolve) => {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        resolve(clsValue);
        observer.disconnect();
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      
      // Fallback timeout
      setTimeout(() => resolve(0), 5000);
    });
  };

  const calculateTBT = (): number => {
    const longTasks = performance.getEntriesByType('long-task');
    return longTasks.reduce((total, task) => total + task.duration - 50, 0);
  };

  const generateRecommendations = (metrics: PerformanceMetrics) => {
    const recs: OptimizationRecommendation[] = [];

    // FCP recommendations
    if (metrics.firstContentfulPaint > thresholds.firstContentfulPaint.needsImprovement) {
      recs.push({
        metric: 'First Contentful Paint',
        currentValue: metrics.firstContentfulPaint,
        threshold: thresholds.firstContentfulPaint,
        status: 'poor',
        recommendations: [
          'Inline critical CSS',
          'Preload key resources',
          'Optimize images',
          'Minify CSS and JavaScript',
          'Use a CDN'
        ],
        priority: 'high'
      });
    } else if (metrics.firstContentfulPaint > thresholds.firstContentfulPaint.good) {
      recs.push({
        metric: 'First Contentful Paint',
        currentValue: metrics.firstContentfulPaint,
        threshold: thresholds.firstContentfulPaint,
        status: 'needsImprovement',
        recommendations: [
          'Optimize critical rendering path',
          'Reduce server response time',
          'Eliminate render-blocking resources'
        ],
        priority: 'medium'
      });
    }

    // LCP recommendations
    if (metrics.largestContentfulPaint > thresholds.largestContentfulPaint.needsImprovement) {
      recs.push({
        metric: 'Largest Contentful Paint',
        currentValue: metrics.largestContentfulPaint,
        threshold: thresholds.largestContentfulPaint,
        status: 'poor',
        recommendations: [
          'Optimize largest content element',
          'Preload important images',
          'Use responsive images',
          'Implement lazy loading',
          'Optimize server response time'
        ],
        priority: 'high'
      });
    }

    // FID recommendations
    if (metrics.firstInputDelay > thresholds.firstInputDelay.needsImprovement) {
      recs.push({
        metric: 'First Input Delay',
        currentValue: metrics.firstInputDelay,
        threshold: thresholds.firstInputDelay,
        status: 'poor',
        recommendations: [
          'Reduce JavaScript execution time',
          'Code split and lazy load non-critical JS',
          'Use web workers for heavy computations',
          'Optimize third-party scripts'
        ],
        priority: 'high'
      });
    }

    // CLS recommendations
    if (metrics.cumulativeLayoutShift > thresholds.cumulativeLayoutShift.needsImprovement) {
      recs.push({
        metric: 'Cumulative Layout Shift',
        currentValue: metrics.cumulativeLayoutShift,
        threshold: thresholds.cumulativeLayoutShift,
        status: 'poor',
        recommendations: [
          'Add size attributes to images and videos',
          'Reserve space for dynamic content',
          'Avoid inserting content above existing content',
          'Use transform animations instead of changing layout properties'
        ],
        priority: 'high'
      });
    }

    // TBT recommendations
    if (metrics.totalBlockingTime > thresholds.totalBlockingTime.needsImprovement) {
      recs.push({
        metric: 'Total Blocking Time',
        currentValue: metrics.totalBlockingTime,
        threshold: thresholds.totalBlockingTime,
        status: 'poor',
        recommendations: [
          'Break up long tasks',
          'Use code splitting',
          'Optimize JavaScript execution',
          'Remove unused code'
        ],
        priority: 'medium'
      });
    }

    setRecommendations(recs);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'needsImprovement':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'poor':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100';
      case 'needsImprovement':
        return 'text-yellow-600 bg-yellow-100';
      case 'poor':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatMetricValue = (metric: string, value: number): string => {
    switch (metric) {
      case 'First Contentful Paint':
      case 'Largest Contentful Paint':
      case 'Time to Interactive':
      case 'Speed Index':
        return `${value.toFixed(0)}ms`;
      case 'First Input Delay':
        return `${value.toFixed(0)}ms`;
      case 'Cumulative Layout Shift':
        return value.toFixed(3);
      case 'Total Blocking Time':
        return `${value.toFixed(0)}ms`;
      default:
        return value.toString();
    }
  };

  const exportReport = () => {
    if (!metrics) return;

    const report = {
      timestamp: new Date().toISOString(),
      metrics,
      recommendations,
      thresholds
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    // Auto-measure on component mount
    measurePerformance();
  }, [measurePerformance]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Open Performance Monitor"
      >
        <BarChart3 className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border max-w-md w-full max-h-96 overflow-hidden z-50">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Performance Monitor
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={measurePerformance}
            disabled={isMonitoring}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Refresh Metrics"
          >
            <RefreshCw className={`w-4 h-4 ${isMonitoring ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={exportReport}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Export Report"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto">
        {isMonitoring ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
            <span className="ml-2 text-gray-600">Measuring performance...</span>
          </div>
        ) : metrics ? (
          <div className="space-y-4">
            {/* Core Web Vitals */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Zap className="w-4 h-4 mr-2" />
                Core Web Vitals
              </h4>
              <div className="space-y-2">
                {[
                  { key: 'firstContentfulPaint', label: 'First Contentful Paint' },
                  { key: 'largestContentfulPaint', label: 'Largest Contentful Paint' },
                  { key: 'firstInputDelay', label: 'First Input Delay' },
                  { key: 'cumulativeLayoutShift', label: 'Cumulative Layout Shift' }
                ].map(({ key, label }) => {
                  const value = metrics[key as keyof PerformanceMetrics];
                  const threshold = thresholds[key as keyof PerformanceThresholds];
                  const status = value <= threshold.good ? 'good' : 
                                value <= threshold.needsImprovement ? 'needsImprovement' : 'poor';
                  
                  return (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">{formatMetricValue(label, value)}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Metrics */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Additional Metrics
              </h4>
              <div className="space-y-2">
                {[
                  { key: 'timeToInteractive', label: 'Time to Interactive' },
                  { key: 'totalBlockingTime', label: 'Total Blocking Time' },
                  { key: 'speedIndex', label: 'Speed Index' }
                ].map(({ key, label }) => {
                  const value = metrics[key as keyof PerformanceMetrics];
                  const threshold = thresholds[key as keyof PerformanceThresholds];
                  const status = value <= threshold.good ? 'good' : 
                                value <= threshold.needsImprovement ? 'needsImprovement' : 'poor';
                  
                  return (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{label}</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono">{formatMetricValue(label, value)}</span>
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Optimization Recommendations
                </h4>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{rec.metric}</span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(rec.status)}
                          <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(rec.priority)}`}>
                            {rec.priority} priority
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        Current: {formatMetricValue(rec.metric, rec.currentValue)} | 
                        Target: {formatMetricValue(rec.metric, rec.threshold.good)}
                      </div>
                      <ul className="text-xs text-gray-700 space-y-1">
                        {rec.recommendations.slice(0, 3).map((rec, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-gray-400 mr-1">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No performance data available</p>
            <button
              onClick={measurePerformance}
              className="mt-2 text-blue-600 hover:text-blue-700 text-sm"
            >
              Measure Performance
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceMonitor;