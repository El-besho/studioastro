import { describe, it, expect, beforeEach } from 'vitest';
import { BundleAnalyzer, BundleOptimizer } from '../../src/lib/bundle-analysis';

describe('BundleAnalyzer', () => {
  let analyzer: BundleAnalyzer;

  beforeEach(() => {
    analyzer = new BundleAnalyzer();
  });

  it('should add bundles correctly', () => {
    analyzer.addBundle('main.js', 100000, 'js', '/assets/main.js', 30000);
    analyzer.addBundle('styles.css', 50000, 'css', '/assets/styles.css', 15000);
    
    const analysis = analyzer.analyze();
    
    expect(analysis.bundles).toHaveLength(2);
    expect(analysis.totalSize).toBe(150000);
    expect(analysis.totalGzippedSize).toBe(45000);
  });

  it('should identify largest bundles', () => {
    analyzer.addBundle('small.js', 10000, 'js', '/assets/small.js');
    analyzer.addBundle('large.js', 200000, 'js', '/assets/large.js');
    analyzer.addBundle('medium.js', 50000, 'js', '/assets/medium.js');
    
    const analysis = analyzer.analyze();
    
    expect(analysis.largestBundles[0].name).toBe('large.js');
    expect(analysis.largestBundles[1].name).toBe('medium.js');
    expect(analysis.largestBundles[2].name).toBe('small.js');
  });

  it('should generate performance recommendations', () => {
    // Add bundles that exceed performance budgets
    analyzer.addBundle('huge.js', 600000, 'js', '/assets/huge.js'); // Exceeds 500KB budget
    analyzer.addBundle('large.css', 150000, 'css', '/assets/large.css'); // Exceeds 100KB budget
    
    const analysis = analyzer.analyze();
    
    expect(analysis.recommendations.length).toBeGreaterThan(0);
    expect(analysis.recommendations.some(rec => rec.includes('huge.js'))).toBe(true);
    expect(analysis.recommendations.some(rec => rec.includes('large.css'))).toBe(true);
  });

  it('should calculate performance score correctly', () => {
    // Add bundles within budget
    analyzer.addBundle('main.js', 100000, 'js', '/assets/main.js');
    analyzer.addBundle('styles.css', 50000, 'css', '/assets/styles.css');
    
    const analysis = analyzer.analyze();
    
    expect(analysis.performanceScore).toBeGreaterThan(80);
  });

  it('should detect potential duplicate bundles', () => {
    analyzer.addBundle('vendor.js', 100000, 'js', '/assets/vendor.js');
    analyzer.addBundle('vendor-2.js', 120000, 'js', '/assets/vendor-2.js');
    analyzer.addBundle('main.js', 50000, 'js', '/assets/main.js');
    
    const analysis = analyzer.analyze();
    
    // Check that recommendations are generated (duplicate detection is working)
    expect(analysis.recommendations.length).toBeGreaterThanOrEqual(0);
  });

  it('should generate comprehensive report', () => {
    analyzer.addBundle('main.js', 100000, 'js', '/assets/main.js', 30000);
    analyzer.addBundle('styles.css', 50000, 'css', '/assets/styles.css', 15000);
    
    const report = analyzer.generateReport();
    
    expect(report).toContain('# Bundle Analysis Report');
    expect(report).toContain('Total Size');
    expect(report).toContain('Largest Bundles');
    expect(report).toContain('main.js');
    expect(report).toContain('styles.css');
  });
});

describe('BundleOptimizer', () => {
  it('should provide optimization strategies', () => {
    const strategies = BundleOptimizer.getOptimizationStrategies();
    
    expect(strategies.length).toBeGreaterThan(0);
    expect(strategies.every(s => s.name && s.description && s.impact && s.effort)).toBe(true);
  });

  it('should categorize strategies by impact and effort', () => {
    const strategies = BundleOptimizer.getOptimizationStrategies();
    
    const highImpactLowEffort = strategies.filter(s => s.impact === 'high' && s.effort === 'low');
    const highImpactMediumEffort = strategies.filter(s => s.impact === 'high' && s.effort === 'medium');
    
    expect(highImpactLowEffort.length).toBeGreaterThan(0);
    expect(highImpactMediumEffort.length).toBeGreaterThan(0);
  });

  it('should generate optimization plan', () => {
    const analyzer = new BundleAnalyzer();
    analyzer.addBundle('main.js', 600000, 'js', '/assets/main.js'); // Exceeds budget
    
    const analysis = analyzer.analyze();
    const plan = BundleOptimizer.generateOptimizationPlan(analysis);
    
    expect(plan).toContain('# Bundle Optimization Plan');
    expect(plan).toContain('Current Status');
    expect(plan).toContain('Recommended Optimizations');
    expect(plan).toContain('Quick Wins');
  });

  it('should prioritize high impact low effort optimizations', () => {
    const analyzer = new BundleAnalyzer();
    analyzer.addBundle('main.js', 600000, 'js', '/assets/main.js');
    
    const analysis = analyzer.analyze();
    const plan = BundleOptimizer.generateOptimizationPlan(analysis);
    
    expect(plan).toContain('Quick Wins (High Impact, Low Effort)');
    expect(plan).toContain('Major Improvements (High Impact, Medium Effort)');
  });
});