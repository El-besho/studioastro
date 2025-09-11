import { describe, it, expect, vi, beforeEach } from 'vitest';
import { performanceMonitor } from '../../src/lib/performance';

// Mock web-vitals
vi.mock('web-vitals', () => ({
  getCLS: vi.fn((callback) => {
    callback({
      name: 'CLS',
      value: 0.05,
      id: 'cls-1',
      rating: 'good',
      delta: 0.05,
      navigationType: 'navigate',
    });
  }),
  getFID: vi.fn((callback) => {
    callback({
      name: 'FID',
      value: 50,
      id: 'fid-1',
      rating: 'good',
      delta: 50,
      navigationType: 'navigate',
    });
  }),
  getFCP: vi.fn((callback) => {
    callback({
      name: 'FCP',
      value: 1200,
      id: 'fcp-1',
      rating: 'good',
      delta: 1200,
      navigationType: 'navigate',
    });
  }),
  getLCP: vi.fn((callback) => {
    callback({
      name: 'LCP',
      value: 2000,
      id: 'lcp-1',
      rating: 'good',
      delta: 2000,
      navigationType: 'navigate',
    });
  }),
  getTTFB: vi.fn((callback) => {
    callback({
      name: 'TTFB',
      value: 600,
      id: 'ttfb-1',
      rating: 'good',
      delta: 600,
      navigationType: 'navigate',
    });
  }),
}));

// Mock window and navigator
Object.defineProperty(window, 'location', {
  value: { href: 'https://example.com' },
  writable: true,
});

Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Test Browser)',
  writable: true,
});

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    performanceMonitor.clearMetrics();
  });

  it('should collect performance metrics', () => {
    performanceMonitor.startMonitoring();
    
    // Wait for metrics to be collected
    setTimeout(() => {
      const metrics = performanceMonitor.getMetrics();
      expect(metrics.length).toBeGreaterThan(0);
      
      const metricNames = metrics.map(m => m.name);
      expect(metricNames).toContain('CLS');
      expect(metricNames).toContain('FID');
      expect(metricNames).toContain('FCP');
      expect(metricNames).toContain('LCP');
      expect(metricNames).toContain('TTFB');
    }, 100);
  });

  it('should get metric by name', () => {
    performanceMonitor.startMonitoring();
    
    setTimeout(() => {
      const lcpMetric = performanceMonitor.getMetricByName('LCP');
      expect(lcpMetric).toBeDefined();
      expect(lcpMetric?.name).toBe('LCP');
      expect(lcpMetric?.value).toBe(2000);
    }, 100);
  });

  it('should check performance budget correctly', () => {
    performanceMonitor.startMonitoring();
    
    setTimeout(() => {
      const budget = performanceMonitor.checkPerformanceBudget();
      expect(budget.passed).toBe(true);
      expect(budget.violations).toHaveLength(0);
    }, 100);
  });

  it('should detect budget violations', () => {
    // Mock a poor LCP metric
    const mockGetLCP = vi.fn((callback) => {
      callback({
        name: 'LCP',
        value: 3000, // Above threshold of 2500
        id: 'lcp-poor',
        rating: 'poor',
        delta: 3000,
        navigationType: 'navigate',
      });
    });
    
    vi.doMock('web-vitals', () => ({
      getLCP: mockGetLCP,
      getFID: vi.fn(),
      getFCP: vi.fn(),
      getCLS: vi.fn(),
      getTTFB: vi.fn(),
    }));
    
    performanceMonitor.startMonitoring();
    
    setTimeout(() => {
      const budget = performanceMonitor.checkPerformanceBudget();
      expect(budget.passed).toBe(false);
      expect(budget.violations.length).toBeGreaterThan(0);
      
      const lcpViolation = budget.violations.find(v => v.metric === 'LCP');
      expect(lcpViolation).toBeDefined();
      expect(lcpViolation?.value).toBe(3000);
      expect(lcpViolation?.threshold).toBe(2500);
    }, 100);
  });

  it('should calculate performance score', () => {
    performanceMonitor.startMonitoring();
    
    setTimeout(() => {
      const score = performanceMonitor.getPerformanceScore();
      expect(score).toBeGreaterThan(0);
      expect(score).toBeLessThanOrEqual(100);
    }, 100);
  });

  it('should clear metrics', () => {
    performanceMonitor.startMonitoring();
    
    setTimeout(() => {
      expect(performanceMonitor.getMetrics().length).toBeGreaterThan(0);
      
      performanceMonitor.clearMetrics();
      expect(performanceMonitor.getMetrics()).toHaveLength(0);
    }, 100);
  });

  it('should get latest metric', () => {
    performanceMonitor.startMonitoring();
    
    setTimeout(() => {
      const latestMetric = performanceMonitor.getLatestMetric();
      expect(latestMetric).toBeDefined();
      expect(latestMetric?.timestamp).toBeDefined();
      expect(latestMetric?.url).toBe('https://example.com');
      expect(latestMetric?.userAgent).toBe('Mozilla/5.0 (Test Browser)');
    }, 100);
  });
});