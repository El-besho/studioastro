interface BundleInfo {
  name: string;
  size: number;
  gzippedSize?: number;
  type: 'js' | 'css' | 'image' | 'font' | 'other';
  path: string;
}

interface BundleAnalysis {
  totalSize: number;
  totalGzippedSize: number;
  bundles: BundleInfo[];
  largestBundles: BundleInfo[];
  recommendations: string[];
  performanceScore: number;
}

class BundleAnalyzer {
  private bundles: BundleInfo[] = [];
  private performanceBudgets = {
    js: 500 * 1024, // 500KB
    css: 100 * 1024, // 100KB
    total: 1000 * 1024, // 1MB
  };

  addBundle(name: string, size: number, type: BundleInfo['type'], path: string, gzippedSize?: number): void {
    this.bundles.push({
      name,
      size,
      gzippedSize,
      type,
      path,
    });
  }

  analyze(): BundleAnalysis {
    const totalSize = this.bundles.reduce((sum, bundle) => sum + bundle.size, 0);
    const totalGzippedSize = this.bundles.reduce((sum, bundle) => sum + (bundle.gzippedSize || bundle.size), 0);
    
    const largestBundles = [...this.bundles]
      .sort((a, b) => b.size - a.size)
      .slice(0, 10);

    const recommendations = this.generateRecommendations();
    const performanceScore = this.calculatePerformanceScore();

    return {
      totalSize,
      totalGzippedSize,
      bundles: [...this.bundles],
      largestBundles,
      recommendations,
      performanceScore,
    };
  }

  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    const totalSize = this.bundles.reduce((sum, bundle) => sum + bundle.size, 0);

    // Check total bundle size
    if (totalSize > this.performanceBudgets.total) {
      recommendations.push(`Total bundle size (${this.formatBytes(totalSize)}) exceeds budget (${this.formatBytes(this.performanceBudgets.total)})`);
    }

    // Check individual bundle sizes
    const largeJsBundles = this.bundles.filter(b => b.type === 'js' && b.size > this.performanceBudgets.js);
    if (largeJsBundles.length > 0) {
      recommendations.push(`Large JS bundles detected: ${largeJsBundles.map(b => b.name).join(', ')}`);
    }

    const largeCssBundles = this.bundles.filter(b => b.type === 'css' && b.size > this.performanceBudgets.css);
    if (largeCssBundles.length > 0) {
      recommendations.push(`Large CSS bundles detected: ${largeCssBundles.map(b => b.name).join(', ')}`);
    }

    // Check for duplicate dependencies
    const duplicateRecommendations = this.checkForDuplicates();
    recommendations.push(...duplicateRecommendations);

    // Check for unused code
    const unusedRecommendations = this.checkForUnusedCode();
    recommendations.push(...unusedRecommendations);

    return recommendations;
  }

  private checkForDuplicates(): string[] {
    const recommendations: string[] = [];
    
    // Group bundles by similar names to detect potential duplicates
    const bundleGroups = new Map<string, BundleInfo[]>();
    
    this.bundles.forEach(bundle => {
      const baseName = bundle.name.replace(/\.(js|css)$/, '');
      if (!bundleGroups.has(baseName)) {
        bundleGroups.set(baseName, []);
      }
      bundleGroups.get(baseName)!.push(bundle);
    });

    bundleGroups.forEach((bundles, baseName) => {
      if (bundles.length > 1) {
        recommendations.push(`Potential duplicate bundles detected for ${baseName}: ${bundles.map(b => b.name).join(', ')}`);
      }
    });

    return recommendations;
  }

  private checkForUnusedCode(): string[] {
    const recommendations: string[] = [];
    
    // Check for very large individual files that might contain unused code
    const largeFiles = this.bundles.filter(bundle => bundle.size > 200 * 1024); // 200KB
    
    if (largeFiles.length > 0) {
      recommendations.push(`Large files detected that may contain unused code: ${largeFiles.map(b => b.name).join(', ')}`);
    }

    return recommendations;
  }

  private calculatePerformanceScore(): number {
    const totalSize = this.bundles.reduce((sum, bundle) => sum + bundle.size, 0);
    let score = 100;

    // Deduct points for exceeding budgets
    if (totalSize > this.performanceBudgets.total) {
      score -= 20;
    }

    // Deduct points for large individual bundles
    const largeBundles = this.bundles.filter(b => b.size > this.performanceBudgets.js);
    score -= largeBundles.length * 5;

    // Deduct points for too many bundles
    if (this.bundles.length > 20) {
      score -= 10;
    }

    return Math.max(0, score);
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  generateReport(): string {
    const analysis = this.analyze();
    
    let report = '# Bundle Analysis Report\n\n';
    
    report += `## Summary\n`;
    report += `- **Total Size**: ${this.formatBytes(analysis.totalSize)}\n`;
    report += `- **Gzipped Size**: ${this.formatBytes(analysis.totalGzippedSize)}\n`;
    report += `- **Bundle Count**: ${analysis.bundles.length}\n`;
    report += `- **Performance Score**: ${analysis.performanceScore}/100\n\n`;
    
    report += `## Largest Bundles\n`;
    analysis.largestBundles.forEach((bundle, index) => {
      report += `${index + 1}. **${bundle.name}** - ${this.formatBytes(bundle.size)}`;
      if (bundle.gzippedSize) {
        report += ` (${this.formatBytes(bundle.gzippedSize)} gzipped)`;
      }
      report += `\n`;
    });
    
    if (analysis.recommendations.length > 0) {
      report += `\n## Recommendations\n`;
      analysis.recommendations.forEach((rec, index) => {
        report += `${index + 1}. ${rec}\n`;
      });
    }
    
    return report;
  }
}

// Bundle optimization utilities
export class BundleOptimizer {
  static getOptimizationStrategies(): Array<{
    name: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    effort: 'low' | 'medium' | 'high';
  }> {
    return [
      {
        name: 'Code Splitting',
        description: 'Split large bundles into smaller, lazy-loaded chunks',
        impact: 'high',
        effort: 'medium',
      },
      {
        name: 'Tree Shaking',
        description: 'Remove unused code from bundles',
        impact: 'high',
        effort: 'low',
      },
      {
        name: 'Dynamic Imports',
        description: 'Load components and libraries on demand',
        impact: 'high',
        effort: 'medium',
      },
      {
        name: 'Bundle Compression',
        description: 'Enable gzip/brotli compression',
        impact: 'medium',
        effort: 'low',
      },
      {
        name: 'Image Optimization',
        description: 'Optimize and compress images',
        impact: 'medium',
        effort: 'low',
      },
      {
        name: 'CSS Optimization',
        description: 'Remove unused CSS and minify stylesheets',
        impact: 'medium',
        effort: 'low',
      },
      {
        name: 'Dependency Analysis',
        description: 'Audit and remove unnecessary dependencies',
        impact: 'high',
        effort: 'medium',
      },
      {
        name: 'CDN Usage',
        description: 'Use CDN for common libraries',
        impact: 'medium',
        effort: 'low',
      },
    ];
  }

  static generateOptimizationPlan(analysis: BundleAnalysis): string {
    const strategies = this.getOptimizationStrategies();
    let plan = '# Bundle Optimization Plan\n\n';
    
    plan += `## Current Status\n`;
    plan += `- Performance Score: ${analysis.performanceScore}/100\n`;
    plan += `- Total Bundle Size: ${this.formatBytes(analysis.totalSize)}\n\n`;
    
    plan += `## Recommended Optimizations\n\n`;
    
    // High impact, low effort optimizations first
    const highImpactLowEffort = strategies.filter(s => s.impact === 'high' && s.effort === 'low');
    if (highImpactLowEffort.length > 0) {
      plan += `### Quick Wins (High Impact, Low Effort)\n`;
      highImpactLowEffort.forEach(strategy => {
        plan += `- **${strategy.name}**: ${strategy.description}\n`;
      });
      plan += `\n`;
    }
    
    // High impact, medium effort
    const highImpactMediumEffort = strategies.filter(s => s.impact === 'high' && s.effort === 'medium');
    if (highImpactMediumEffort.length > 0) {
      plan += `### Major Improvements (High Impact, Medium Effort)\n`;
      highImpactMediumEffort.forEach(strategy => {
        plan += `- **${strategy.name}**: ${strategy.description}\n`;
      });
      plan += `\n`;
    }
    
    // Medium impact optimizations
    const mediumImpact = strategies.filter(s => s.impact === 'medium');
    if (mediumImpact.length > 0) {
      plan += `### Additional Optimizations (Medium Impact)\n`;
      mediumImpact.forEach(strategy => {
        plan += `- **${strategy.name}**: ${strategy.description}\n`;
      });
    }
    
    return plan;
  }

  private static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

export { BundleAnalyzer, type BundleInfo, type BundleAnalysis };