// Performance Injector
// Automatically injects performance optimizations into HTML

import { performanceOptimizer, defaultPerformanceConfig } from './performance-optimizer';

export interface InjectionConfig {
  enableJavaScriptOptimization: boolean;
  enableResourceHints: boolean;
  enableCriticalCSS: boolean;
  enableLazyLoading: boolean;
  enableCompression: boolean;
  enableTCPOptimization: boolean;
}

export class PerformanceInjector {
  private config: InjectionConfig;

  constructor(config: InjectionConfig) {
    this.config = config;
  }

  injectPerformanceOptimizations(html: string): string {
    let optimizedHTML = html;

    if (this.config.enableJavaScriptOptimization) {
      optimizedHTML = this.injectJavaScriptOptimizations(optimizedHTML);
    }

    if (this.config.enableResourceHints) {
      optimizedHTML = this.injectResourceHints(optimizedHTML);
    }

    if (this.config.enableCriticalCSS) {
      optimizedHTML = this.injectCriticalCSS(optimizedHTML);
    }

    if (this.config.enableLazyLoading) {
      optimizedHTML = this.injectLazyLoading(optimizedHTML);
    }

    if (this.config.enableCompression) {
      optimizedHTML = this.injectCompressionHints(optimizedHTML);
    }

    if (this.config.enableTCPOptimization) {
      optimizedHTML = this.injectTCPOptimizations(optimizedHTML);
    }

    return optimizedHTML;
  }

  private injectJavaScriptOptimizations(html: string): string {
    // Add defer/async attributes to script tags
    let optimizedHTML = html;

    // Add defer to non-critical scripts
    optimizedHTML = optimizedHTML.replace(
      /<script(?![^>]*(?:defer|async))([^>]*src="[^"]*")([^>]*)>/g,
      (match, src, rest) => {
        // Don't add defer to critical scripts
        if (src.includes('critical') || src.includes('above-fold')) {
          return match;
        }
        return `<script${src} defer${rest}>`;
      }
    );

    // Add async to independent scripts
    optimizedHTML = optimizedHTML.replace(
      /<script([^>]*data-async[^>]*)>/g,
      (match, rest) => {
        return match.replace('data-async', 'async');
      }
    );

    return optimizedHTML;
  }

  private injectResourceHints(html: string): string {
    const resourceHints = performanceOptimizer.generateResourceHintTags();
    
    // Insert resource hints before closing head tag
    return html.replace('</head>', `${resourceHints}\n</head>`);
  }

  private injectCriticalCSS(html: string): string {
    const criticalCSS = `
      /* Critical CSS for above-fold content */
      body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
      .header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
      .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .btn { display: inline-block; padding: 0.75rem 1.5rem; background: #007bff; color: white; text-decoration: none; border-radius: 0.25rem; }
      .btn:hover { background: #0056b3; }
      .loading { opacity: 0; transition: opacity 0.3s ease; }
      .loaded { opacity: 1; }
    `;

    const styleTag = `<style id="critical-css">${criticalCSS}</style>`;
    
    // Insert before closing head tag
    return html.replace('</head>', `${styleTag}\n</head>`);
  }

  private injectLazyLoading(html: string): string {
    // Add lazy loading to images
    let optimizedHTML = html;

    // Add lazy loading to below-fold images
    optimizedHTML = optimizedHTML.replace(
      /<img([^>]*src="[^"]*")([^>]*)>/g,
      (match, src, rest) => {
        // Don't add lazy loading to above-fold images
        if (rest.includes('data-above-fold') || rest.includes('data-critical')) {
          return match;
        }
        
        // Add lazy loading attributes
        if (!rest.includes('loading=')) {
          return `<img${src} loading="lazy"${rest}>`;
        }
        return match;
      }
    );

    // Add lazy loading script
    const lazyLoadingScript = `
      <script>
        // Lazy loading implementation
        document.addEventListener('DOMContentLoaded', function() {
          const lazyImages = document.querySelectorAll('img[data-src]');
          const lazyComponents = document.querySelectorAll('[data-lazy]');
          
          const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
              }
            });
          });
          
          const componentObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const component = entry.target;
                if (component.dataset.lazy) {
                  import(component.dataset.lazy).then(module => {
                    component.innerHTML = module.default;
                    component.classList.add('loaded');
                  });
                }
                observer.unobserve(component);
              }
            });
          });
          
          lazyImages.forEach(img => imageObserver.observe(img));
          lazyComponents.forEach(component => componentObserver.observe(component));
        });
      </script>
    `;

    // Insert before closing body tag
    return optimizedHTML.replace('</body>', `${lazyLoadingScript}\n</body>`);
  }

  private injectCompressionHints(html: string): string {
    // Add compression hints
    const compressionHints = `
      <meta http-equiv="Content-Encoding" content="gzip">
      <meta http-equiv="Accept-Encoding" content="gzip, deflate, br">
    `;

    // Insert after charset meta tag
    return html.replace(
      /<meta charset="[^"]*">/,
      `$&\n${compressionHints}`
    );
  }

  private injectTCPOptimizations(html: string): string {
    // Optimize first 1460 bytes for TCP Slow Start
    const criticalContent = this.extractCriticalFirstBytes(html);
    const remainingContent = html.substring(criticalContent.length);
    
    return `${criticalContent}\n${remainingContent}`;
  }

  private extractCriticalFirstBytes(html: string): string {
    const maxBytes = 1460;
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
      'body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }',
      '.header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }',
      '.hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }',
      '.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }',
      '.btn { display: inline-block; padding: 0.75rem 1.5rem; background: #007bff; color: white; text-decoration: none; border-radius: 0.25rem; }',
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

  // Generate performance monitoring script
  generatePerformanceMonitoringScript(): string {
    return `
      <script>
        // Performance monitoring
        window.addEventListener('load', function() {
          const loadTime = performance.now();
          const navigation = performance.getEntriesByType('navigation')[0];
          const paint = performance.getEntriesByType('paint');
          
          const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
          const largestContentfulPaint = paint.find(entry => entry.name === 'largest-contentful-paint')?.startTime || 0;
          
          // Log performance metrics
          console.log('Performance Metrics:', {
            loadTime: loadTime.toFixed(2) + 'ms',
            firstContentfulPaint: firstContentfulPaint.toFixed(2) + 'ms',
            largestContentfulPaint: largestContentfulPaint.toFixed(2) + 'ms',
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart + 'ms',
            totalResources: performance.getEntriesByType('resource').length
          });
          
          // Send metrics to analytics (if available)
          if (typeof gtag !== 'undefined') {
            gtag('event', 'performance_metrics', {
              load_time: loadTime,
              first_contentful_paint: firstContentfulPaint,
              largest_contentful_paint: largestContentfulPaint
            });
          }
        });
      </script>
    `;
  }

  // Generate resource optimization script
  generateResourceOptimizationScript(): string {
    return `
      <script>
        // Resource optimization
        document.addEventListener('DOMContentLoaded', function() {
          // Preload critical resources
          const criticalResources = [
            '/css/critical.css',
            '/fonts/main.woff2',
            '/images/hero.jpg'
          ];
          
          criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 
                     resource.endsWith('.js') ? 'script' : 
                     resource.endsWith('.woff2') ? 'font' : 'image';
            if (resource.endsWith('.woff2')) link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
          });
          
          // Preconnect to external domains
          const externalDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com'
          ];
          
          externalDomains.forEach(domain => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = domain;
            link.crossOrigin = 'anonymous';
            document.head.appendChild(link);
          });
        });
      </script>
    `;
  }
}

// Default injection configuration
export const defaultInjectionConfig: InjectionConfig = {
  enableJavaScriptOptimization: true,
  enableResourceHints: true,
  enableCriticalCSS: true,
  enableLazyLoading: true,
  enableCompression: true,
  enableTCPOptimization: true
};

// Export the main injector instance
export const performanceInjector = new PerformanceInjector(defaultInjectionConfig);