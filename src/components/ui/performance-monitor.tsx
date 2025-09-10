import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      const newMetrics: Partial<PerformanceMetrics> = {};
      
      entries.forEach((entry) => {
        if (entry.entryType === 'paint') {
          if (entry.name === 'first-contentful-paint') {
            newMetrics.firstContentfulPaint = entry.startTime;
          }
        }
        
        if (entry.entryType === 'largest-contentful-paint') {
          newMetrics.largestContentfulPaint = entry.startTime;
        }
        
        if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
          newMetrics.cumulativeLayoutShift = (newMetrics.cumulativeLayoutShift || 0) + (entry as any).value;
        }
      });
      
      if (Object.keys(newMetrics).length > 0) {
        setMetrics(prev => ({ ...prev, ...newMetrics } as PerformanceMetrics));
      }
    });

    // Observe different performance entry types
    try {
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] });
    } catch (e) {
      // Fallback for browsers that don't support all entry types
      observer.observe({ entryTypes: ['paint'] });
    }

    // Get load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      setMetrics(prev => ({ ...prev, loadTime } as PerformanceMetrics));
    });

    // Show metrics in development
    if (process.env.NODE_ENV === 'development') {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, []);

  if (!isVisible || !metrics) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
      <div>Load: {metrics.loadTime}ms</div>
      {metrics.firstContentfulPaint && (
        <div>FCP: {Math.round(metrics.firstContentfulPaint)}ms</div>
      )}
      {metrics.largestContentfulPaint && (
        <div>LCP: {Math.round(metrics.largestContentfulPaint)}ms</div>
      )}
      {metrics.cumulativeLayoutShift && (
        <div>CLS: {metrics.cumulativeLayoutShift.toFixed(3)}</div>
      )}
    </div>
  );
}