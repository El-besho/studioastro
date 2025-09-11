import { getCLS, getFID, getFCP, getLCP, getTTFB, type Metric } from 'web-vitals';

interface PerformanceMetric extends Metric {
  timestamp: number;
  url: string;
  userAgent: string;
}

interface PerformanceConfig {
  endpoint?: string;
  sampleRate?: number;
  debug?: boolean;
}

class PerformanceMonitor {
  private config: Required<PerformanceConfig>;
  private metrics: PerformanceMetric[] = [];

  constructor(config: PerformanceConfig = {}) {
    this.config = {
      endpoint: config.endpoint || '/api/analytics/performance',
      sampleRate: config.sampleRate || 1.0,
      debug: config.debug || false,
    };
  }

  private shouldSample(): boolean {
    return Math.random() < this.config.sampleRate;
  }

  private logMetric(metric: Metric): void {
    if (this.config.debug) {
      console.log(`[Performance] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }
  }

  private async sendMetric(metric: PerformanceMetric): Promise<void> {
    try {
      // In a real application, you would send this to your analytics service
      if (this.config.debug) {
        console.log('[Performance] Sending metric:', metric);
      }

      // Example: Send to analytics service
      // await fetch(this.config.endpoint, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(metric),
      // });
    } catch (error) {
      console.error('[Performance] Failed to send metric:', error);
    }
  }

  private handleMetric(metric: Metric): void {
    if (!this.shouldSample()) return;

    this.logMetric(metric);

    const performanceMetric: PerformanceMetric = {
      ...metric,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    this.metrics.push(performanceMetric);
    this.sendMetric(performanceMetric);
  }

  public startMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Core Web Vitals
    getCLS(this.handleMetric.bind(this));
    getFID(this.handleMetric.bind(this));
    getFCP(this.handleMetric.bind(this));
    getLCP(this.handleMetric.bind(this));
    getTTFB(this.handleMetric.bind(this));

    if (this.config.debug) {
      console.log('[Performance] Monitoring started');
    }
  }

  public getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  public getMetricByName(name: string): PerformanceMetric | undefined {
    return this.metrics.find(metric => metric.name === name);
  }

  public getLatestMetric(): PerformanceMetric | undefined {
    return this.metrics[this.metrics.length - 1];
  }

  public clearMetrics(): void {
    this.metrics = [];
  }

  // Performance budget checking
  public checkPerformanceBudget(): {
    passed: boolean;
    violations: Array<{ metric: string; value: number; threshold: number }>;
  } {
    const budgets = {
      LCP: 2500, // 2.5 seconds
      FID: 100,  // 100 milliseconds
      CLS: 0.1,  // 0.1
      FCP: 1800, // 1.8 seconds
      TTFB: 800, // 800 milliseconds
    };

    const violations: Array<{ metric: string; value: number; threshold: number }> = [];

    for (const [metricName, threshold] of Object.entries(budgets)) {
      const metric = this.getMetricByName(metricName);
      if (metric && metric.value > threshold) {
        violations.push({
          metric: metricName,
          value: metric.value,
          threshold,
        });
      }
    }

    return {
      passed: violations.length === 0,
      violations,
    };
  }

  // Performance score calculation
  public getPerformanceScore(): number {
    const budgets = {
      LCP: 2500,
      FID: 100,
      CLS: 0.1,
      FCP: 1800,
      TTFB: 800,
    };

    let totalScore = 0;
    let metricCount = 0;

    for (const [metricName, threshold] of Object.entries(budgets)) {
      const metric = this.getMetricByName(metricName);
      if (metric) {
        const score = Math.max(0, 100 - (metric.value / threshold) * 100);
        totalScore += score;
        metricCount++;
      }
    }

    return metricCount > 0 ? Math.round(totalScore / metricCount) : 0;
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor({
  debug: process.env.NODE_ENV === 'development',
  sampleRate: 1.0, // Sample all users in development, adjust for production
});

// Auto-start monitoring in browser
if (typeof window !== 'undefined') {
  performanceMonitor.startMonitoring();
}

export default performanceMonitor;