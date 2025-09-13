// Performance Optimization System
// Implements JavaScript management, resource loading, and critical rendering path optimization

export interface PerformanceConfig {
  // JavaScript Management
  useDefer: boolean;
  useAsync: boolean;
  enableTreeShaking: boolean;
  minifyCode: boolean;
  removeDeadCode: boolean;
  
  // Resource Loading
  preloadCritical: boolean;
  preconnectDomains: string[];
  prefetchRoutes: string[];
  lazyLoadImages: boolean;
  lazyLoadComponents: boolean;
  
  // Critical Rendering Path
  inlineCriticalCSS: boolean;
  deferNonCriticalCSS: boolean;
  optimizeDOMSize: boolean;
  prioritizeAboveFold: boolean;
  
  // TCP Optimization
  optimizeFirstByte: boolean;
  criticalResourceSize: number; // bytes
  enableCompression: boolean;
}

export interface ResourceHint {
  type: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  href: string;
  as?: string;
  crossorigin?: boolean;
  media?: string;
  priority?: 'high' | 'low';
}

export interface CriticalResource {
  path: string;
  type: 'css' | 'js' | 'image' | 'font';
  priority: number;
  size: number;
  isAboveFold: boolean;
  isCritical: boolean;
}

export interface PerformanceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
}

export class PerformanceOptimizer {
  private config: PerformanceConfig;
  private criticalResources: CriticalResource[] = [];
  private resourceHints: ResourceHint[] = [];
  private performanceMetrics: PerformanceMetrics | null = null;

  constructor(config: PerformanceConfig) {
    this.config = config;
    this.initializeCriticalResources();
  }

  // JavaScript Management
  optimizeJavaScript(code: string): string {
    let optimizedCode = code;

    if (this.config.removeDeadCode) {
      optimizedCode = this.removeDeadCode(optimizedCode);
    }

    if (this.config.minifyCode) {
      optimizedCode = this.minifyCode(optimizedCode);
    }

    if (this.config.enableTreeShaking) {
      optimizedCode = this.treeShakeCode(optimizedCode);
    }

    return optimizedCode;
  }

  private removeDeadCode(code: string): string {
    // Simple dead code removal - can be enhanced with AST parsing
    const lines = code.split('\n');
    const activeLines: string[] = [];
    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      // Keep imports, exports, and function declarations
      if (trimmed.startsWith('import') || 
          trimmed.startsWith('export') || 
          trimmed.startsWith('function') ||
          trimmed.startsWith('const') ||
          trimmed.startsWith('let') ||
          trimmed.startsWith('var') ||
          trimmed.includes('=>') ||
          trimmed.startsWith('//') ||
          trimmed.startsWith('/*')) {
        activeLines.push(line);
      }
    });

    return activeLines.join('\n');
  }

  private minifyCode(code: string): string {
    // Simple minification - can be enhanced with proper minifier
    return code
      .replace(/\s+/g, ' ')
      .replace(/;\s*}/g, '}')
      .replace(/{\s*/g, '{')
      .replace(/\s*}/g, '}')
      .trim();
  }

  private treeShakeCode(code: string): string {
    // Simple tree shaking - remove unused exports
    const exportRegex = /export\s+(?:const|let|var|function|class)\s+(\w+)/g;
    const imports = new Set<string>();
    const exports = new Set<string>();
    
    // Find all imports
    const importRegex = /import\s+.*?from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = importRegex.exec(code)) !== null) {
      imports.add(match[1]);
    }

    // Find all exports
    while ((match = exportRegex.exec(code)) !== null) {
      exports.add(match[1]);
    }

    // Remove unused exports (simplified logic)
    let treeShakenCode = code;
    exports.forEach(exportName => {
      if (!this.isUsedInCode(code, exportName)) {
        const exportPattern = new RegExp(`export\\s+(?:const|let|var|function|class)\\s+${exportName}[^;]*;?`, 'g');
        treeShakenCode = treeShakenCode.replace(exportPattern, '');
      }
    });

    return treeShakenCode;
  }

  private isUsedInCode(code: string, identifier: string): boolean {
    // Simple usage detection - can be enhanced with proper AST analysis
    const usagePattern = new RegExp(`\\b${identifier}\\b`, 'g');
    const matches = code.match(usagePattern);
    return matches && matches.length > 1; // More than just the declaration
  }

  generateScriptTag(src: string, options: {
    defer?: boolean;
    async?: boolean;
    type?: string;
    crossorigin?: boolean;
  } = {}): string {
    const { defer = this.config.useDefer, async = this.config.useAsync, type = 'module', crossorigin = false } = options;
    
    let attributes = `src="${src}"`;
    if (defer) attributes += ' defer';
    if (async) attributes += ' async';
    if (type) attributes += ` type="${type}"`;
    if (crossorigin) attributes += ' crossorigin';
    
    return `<script ${attributes}></script>`;
  }

  // Resource Loading Strategy
  generateResourceHints(): ResourceHint[] {
    const hints: ResourceHint[] = [];

    // Preload critical resources
    if (this.config.preloadCritical) {
      this.criticalResources
        .filter(resource => resource.isCritical)
        .forEach(resource => {
          hints.push({
            type: 'preload',
            href: resource.path,
            as: this.getResourceType(resource.type),
            priority: 'high'
          });
        });
    }

    // Preconnect to external domains
    this.config.preconnectDomains.forEach(domain => {
      hints.push({
        type: 'preconnect',
        href: domain,
        crossorigin: true
      });
    });

    // Prefetch predicted routes
    this.config.prefetchRoutes.forEach(route => {
      hints.push({
        type: 'prefetch',
        href: route,
        priority: 'low'
      });
    });

    return hints;
  }

  private getResourceType(type: string): string {
    const typeMap: Record<string, string> = {
      'css': 'style',
      'js': 'script',
      'image': 'image',
      'font': 'font'
    };
    return typeMap[type] || 'fetch';
  }

  generateResourceHintTags(): string {
    const hints = this.generateResourceHints();
    return hints.map(hint => this.generateResourceHintTag(hint)).join('\n');
  }

  private generateResourceHintTag(hint: ResourceHint): string {
    let attributes = `rel="${hint.type}" href="${hint.href}"`;
    
    if (hint.as) attributes += ` as="${hint.as}"`;
    if (hint.crossorigin) attributes += ' crossorigin';
    if (hint.media) attributes += ` media="${hint.media}"`;
    
    return `<link ${attributes}>`;
  }

  // Critical Rendering Path Optimization
  optimizeCriticalRenderingPath(html: string): string {
    let optimizedHTML = html;

    if (this.config.inlineCriticalCSS) {
      optimizedHTML = this.inlineCriticalCSS(optimizedHTML);
    }

    if (this.config.deferNonCriticalCSS) {
      optimizedHTML = this.deferNonCriticalCSS(optimizedHTML);
    }

    if (this.config.optimizeDOMSize) {
      optimizedHTML = this.optimizeDOMSize(optimizedHTML);
    }

    if (this.config.prioritizeAboveFold) {
      optimizedHTML = this.prioritizeAboveFoldContent(optimizedHTML);
    }

    return optimizedHTML;
  }

  private inlineCriticalCSS(html: string): string {
    // Extract critical CSS and inline it
    const criticalCSS = this.extractCriticalCSS();
    const styleTag = `<style id="critical-css">${criticalCSS}</style>`;
    
    // Insert before closing head tag
    return html.replace('</head>', `${styleTag}\n</head>`);
  }

  private extractCriticalCSS(): string {
    // Critical CSS for above-fold content
    return `
      /* Critical CSS for above-fold content */
      body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
      .header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
      .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .btn { display: inline-block; padding: 0.75rem 1.5rem; background: #007bff; color: white; text-decoration: none; border-radius: 0.25rem; }
      .btn:hover { background: #0056b3; }
    `;
  }

  private deferNonCriticalCSS(html: string): string {
    // Convert non-critical CSS links to deferred loading
    const cssLinkRegex = /<link[^>]*rel=["']stylesheet["'][^>]*>/g;
    
    return html.replace(cssLinkRegex, (match) => {
      // Check if it's critical CSS
      if (match.includes('critical') || match.includes('above-fold')) {
        return match;
      }
      
      // Defer non-critical CSS
      return match.replace('rel="stylesheet"', 'rel="preload" as="style" onload="this.onload=null;this.rel=\'stylesheet\'"');
    });
  }

  private optimizeDOMSize(html: string): string {
    // Remove unnecessary whitespace and comments
    return html
      .replace(/\s+/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/>\s+</g, '><')
      .trim();
  }

  private prioritizeAboveFoldContent(html: string): string {
    // Move above-fold content to the top
    const aboveFoldContent = this.extractAboveFoldContent(html);
    const belowFoldContent = this.extractBelowFoldContent(html);
    
    return `${aboveFoldContent}\n${belowFoldContent}`;
  }

  private extractAboveFoldContent(html: string): string {
    // Extract header, hero, and first content section
    const headerMatch = html.match(/<header[^>]*>[\s\S]*?<\/header>/);
    const heroMatch = html.match(/<section[^>]*class="[^"]*hero[^"]*"[^>]*>[\s\S]*?<\/section>/);
    const firstContentMatch = html.match(/<main[^>]*>[\s\S]*?<\/main>/);
    
    const aboveFold = [
      headerMatch?.[0] || '',
      heroMatch?.[0] || '',
      firstContentMatch?.[0] || ''
    ].filter(Boolean).join('\n');
    
    return aboveFold;
  }

  private extractBelowFoldContent(html: string): string {
    // Extract footer and other below-fold content
    const footerMatch = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/);
    const scriptsMatch = html.match(/<script[^>]*>[\s\S]*?<\/script>/g);
    
    const belowFold = [
      footerMatch?.[0] || '',
      scriptsMatch?.join('\n') || ''
    ].filter(Boolean).join('\n');
    
    return belowFold;
  }

  // TCP Slow Start Optimization
  optimizeFirstByte(html: string): string {
    if (!this.config.optimizeFirstByte) return html;

    // Ensure first 1460 bytes contain critical content
    const criticalContent = this.extractCriticalFirstBytes(html);
    const remainingContent = html.substring(criticalContent.length);
    
    return `${criticalContent}\n${remainingContent}`;
  }

  private extractCriticalFirstBytes(html: string): string {
    const maxBytes = this.config.criticalResourceSize;
    let criticalContent = '';
    let currentSize = 0;

    // Priority order for first bytes
    const priorityElements = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      '<title>',
      '</title>',
      '<style id="critical-css">',
      this.extractCriticalCSS(),
      '</style>',
      '</head>',
      '<body>',
      '<header>',
      '</header>',
      '<main>',
      '<h1>',
      '</h1>',
      '<p>',
      '</p>',
      '</main>'
    ];

    for (const element of priorityElements) {
      if (currentSize + element.length <= maxBytes) {
        criticalContent += element;
        currentSize += element.length;
      } else {
        break;
      }
    }

    return criticalContent;
  }

  // Performance Monitoring
  async measurePerformance(): Promise<PerformanceMetrics> {
    if (typeof window === 'undefined') {
      return this.getDefaultMetrics();
    }

    return new Promise((resolve) => {
      window.addEventListener('load', () => {
        const metrics = this.calculatePerformanceMetrics();
        this.performanceMetrics = metrics;
        resolve(metrics);
      });
    });
  }

  private calculatePerformanceMetrics(): PerformanceMetrics {
    if (typeof window === 'undefined') {
      return this.getDefaultMetrics();
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const paint = performance.getEntriesByType('paint');
    
    const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
    const largestContentfulPaint = this.getLargestContentfulPaint();
    const firstInputDelay = this.getFirstInputDelay();
    const cumulativeLayoutShift = this.getCumulativeLayoutShift();
    const timeToInteractive = this.getTimeToInteractive(navigation);
    const totalBlockingTime = this.getTotalBlockingTime();
    const speedIndex = this.getSpeedIndex();

    return {
      firstContentfulPaint,
      largestContentfulPaint,
      firstInputDelay,
      cumulativeLayoutShift,
      timeToInteractive,
      totalBlockingTime,
      speedIndex
    };
  }

  private getLargestContentfulPaint(): number {
    if (typeof window === 'undefined') return 0;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      return lastEntry.startTime;
    });
    
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
    return 0; // Will be updated by observer
  }

  private getFirstInputDelay(): number {
    if (typeof window === 'undefined') return 0;
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstInput = entries[0];
      return firstInput.processingStart - firstInput.startTime;
    });
    
    observer.observe({ entryTypes: ['first-input'] });
    return 0; // Will be updated by observer
  }

  private getCumulativeLayoutShift(): number {
    if (typeof window === 'undefined') return 0;
    
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
    });
    
    observer.observe({ entryTypes: ['layout-shift'] });
    return clsValue;
  }

  private getTimeToInteractive(navigation: PerformanceNavigationTiming): number {
    return navigation.domContentLoadedEventEnd - navigation.navigationStart;
  }

  private getTotalBlockingTime(): number {
    if (typeof window === 'undefined') return 0;
    
    const longTasks = performance.getEntriesByType('long-task');
    return longTasks.reduce((total, task) => total + task.duration - 50, 0);
  }

  private getSpeedIndex(): number {
    // Simplified speed index calculation
    return this.performanceMetrics?.firstContentfulPaint || 0;
  }

  private getDefaultMetrics(): PerformanceMetrics {
    return {
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      firstInputDelay: 0,
      cumulativeLayoutShift: 0,
      timeToInteractive: 0,
      totalBlockingTime: 0,
      speedIndex: 0
    };
  }

  // Lazy Loading
  generateLazyLoadScript(): string {
    return `
      <script>
        // Lazy loading implementation
        const lazyImages = document.querySelectorAll('img[data-src]');
        const lazyComponents = document.querySelectorAll('[data-lazy]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          });
        });
        
        const componentObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const component = entry.target;
              // Load component dynamically
              if (component.dataset.lazy) {
                import(component.dataset.lazy).then(module => {
                  component.innerHTML = module.default;
                });
              }
              observer.unobserve(component);
            }
          });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
        lazyComponents.forEach(component => componentObserver.observe(component));
      </script>
    `;
  }

  // Initialize critical resources
  private initializeCriticalResources(): void {
    this.criticalResources = [
      {
        path: '/css/critical.css',
        type: 'css',
        priority: 1,
        size: 2048,
        isAboveFold: true,
        isCritical: true
      },
      {
        path: '/js/main.js',
        type: 'js',
        priority: 2,
        size: 4096,
        isAboveFold: false,
        isCritical: true
      },
      {
        path: '/fonts/main.woff2',
        type: 'font',
        priority: 3,
        size: 1536,
        isAboveFold: true,
        isCritical: true
      },
      {
        path: '/images/hero.jpg',
        type: 'image',
        priority: 4,
        size: 8192,
        isAboveFold: true,
        isCritical: true
      }
    ];
  }

  // Get performance report
  getPerformanceReport(): string {
    const metrics = this.performanceMetrics || this.getDefaultMetrics();
    
    return `
      Performance Report:
      - First Contentful Paint: ${metrics.firstContentfulPaint.toFixed(2)}ms
      - Largest Contentful Paint: ${metrics.largestContentfulPaint.toFixed(2)}ms
      - First Input Delay: ${metrics.firstInputDelay.toFixed(2)}ms
      - Cumulative Layout Shift: ${metrics.cumulativeLayoutShift.toFixed(4)}
      - Time to Interactive: ${metrics.timeToInteractive.toFixed(2)}ms
      - Total Blocking Time: ${metrics.totalBlockingTime.toFixed(2)}ms
      - Speed Index: ${metrics.speedIndex.toFixed(2)}ms
    `;
  }
}

// Default configuration
export const defaultPerformanceConfig: PerformanceConfig = {
  // JavaScript Management
  useDefer: true,
  useAsync: true,
  enableTreeShaking: true,
  minifyCode: true,
  removeDeadCode: true,
  
  // Resource Loading
  preloadCritical: true,
  preconnectDomains: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  prefetchRoutes: ['/services', '/about', '/contact'],
  lazyLoadImages: true,
  lazyLoadComponents: true,
  
  // Critical Rendering Path
  inlineCriticalCSS: true,
  deferNonCriticalCSS: true,
  optimizeDOMSize: true,
  prioritizeAboveFold: true,
  
  // TCP Optimization
  optimizeFirstByte: true,
  criticalResourceSize: 1460,
  enableCompression: true
};

// Export the main optimizer instance
export const performanceOptimizer = new PerformanceOptimizer(defaultPerformanceConfig);