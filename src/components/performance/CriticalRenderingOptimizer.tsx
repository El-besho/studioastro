// Critical Rendering Path Optimizer
// Optimizes above-fold content loading and critical rendering path

import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  EyeOff, 
  Zap, 
  Clock, 
  Layers, 
  Code,
  CheckCircle,
  AlertTriangle,
  Settings,
  Play,
  Pause
} from 'lucide-react';

interface CriticalElement {
  id: string;
  type: 'css' | 'js' | 'image' | 'font' | 'html';
  path: string;
  size: number;
  isAboveFold: boolean;
  isCritical: boolean;
  loadTime: number;
  renderTime: number;
  priority: number;
  status: 'pending' | 'loading' | 'loaded' | 'error';
}

interface RenderingMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
  speedIndex: number;
  domSize: number;
  renderBlockingResources: number;
}

interface OptimizationRule {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  impact: 'high' | 'medium' | 'low';
  category: 'css' | 'js' | 'html' | 'images' | 'fonts';
}

export const CriticalRenderingOptimizer: React.FC = () => {
  const [criticalElements, setCriticalElements] = useState<CriticalElement[]>([]);
  const [metrics, setMetrics] = useState<RenderingMetrics | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showAboveFold, setShowAboveFold] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  const [optimizationRules, setOptimizationRules] = useState<OptimizationRule[]>([
    {
      id: 'inline-critical-css',
      name: 'Inline Critical CSS',
      description: 'Inline critical CSS directly in the HTML head',
      enabled: true,
      impact: 'high',
      category: 'css'
    },
    {
      id: 'defer-non-critical-css',
      name: 'Defer Non-Critical CSS',
      description: 'Load non-critical CSS asynchronously',
      enabled: true,
      impact: 'high',
      category: 'css'
    },
    {
      id: 'minify-html',
      name: 'Minify HTML',
      description: 'Remove unnecessary whitespace and comments',
      enabled: true,
      impact: 'medium',
      category: 'html'
    },
    {
      id: 'optimize-images',
      name: 'Optimize Images',
      description: 'Compress and optimize above-fold images',
      enabled: true,
      impact: 'high',
      category: 'images'
    },
    {
      id: 'preload-fonts',
      name: 'Preload Critical Fonts',
      description: 'Preload fonts used in above-fold content',
      enabled: true,
      impact: 'medium',
      category: 'fonts'
    },
    {
      id: 'defer-js',
      name: 'Defer JavaScript',
      description: 'Defer non-critical JavaScript execution',
      enabled: true,
      impact: 'high',
      category: 'js'
    }
  ]);

  useEffect(() => {
    initializeCriticalElements();
    measureRenderingMetrics();
  }, []);

  const initializeCriticalElements = () => {
    const elements: CriticalElement[] = [
      {
        id: 'critical-css',
        type: 'css',
        path: '/css/critical.css',
        size: 2048,
        isAboveFold: true,
        isCritical: true,
        loadTime: 0,
        renderTime: 0,
        priority: 1,
        status: 'pending'
      },
      {
        id: 'main-font',
        type: 'font',
        path: '/fonts/main.woff2',
        size: 1536,
        isAboveFold: true,
        isCritical: true,
        loadTime: 0,
        renderTime: 0,
        priority: 2,
        status: 'pending'
      },
      {
        id: 'hero-image',
        type: 'image',
        path: '/images/hero.jpg',
        size: 8192,
        isAboveFold: true,
        isCritical: true,
        loadTime: 0,
        renderTime: 0,
        priority: 3,
        status: 'pending'
      },
      {
        id: 'main-js',
        type: 'js',
        path: '/js/main.js',
        size: 4096,
        isAboveFold: false,
        isCritical: false,
        loadTime: 0,
        renderTime: 0,
        priority: 4,
        status: 'pending'
      },
      {
        id: 'non-critical-css',
        type: 'css',
        path: '/css/non-critical.css',
        size: 3072,
        isAboveFold: false,
        isCritical: false,
        loadTime: 0,
        renderTime: 0,
        priority: 5,
        status: 'pending'
      }
    ];

    setCriticalElements(elements);
  };

  const measureRenderingMetrics = async () => {
    if (typeof window === 'undefined') return;

    try {
      // Wait for page to be fully loaded
      await new Promise(resolve => {
        if (document.readyState === 'complete') {
          resolve(void 0);
        } else {
          window.addEventListener('load', () => resolve(void 0));
        }
      });

      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      const firstContentfulPaint = paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0;
      const largestContentfulPaint = await measureLCP();
      const timeToInteractive = navigation.domContentLoadedEventEnd - navigation.navigationStart;
      const totalBlockingTime = calculateTBT();
      const cumulativeLayoutShift = await measureCLS();
      const speedIndex = firstContentfulPaint; // Simplified
      const domSize = document.documentElement.outerHTML.length;
      const renderBlockingResources = calculateRenderBlockingResources();

      setMetrics({
        firstContentfulPaint,
        largestContentfulPaint,
        timeToInteractive,
        totalBlockingTime,
        cumulativeLayoutShift,
        speedIndex,
        domSize,
        renderBlockingResources
      });

      // Update element statuses
      updateElementStatuses();
    } catch (error) {
      console.error('Rendering metrics measurement failed:', error);
    }
  };

  const measureLCP = async (): Promise<number> => {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry.startTime);
        observer.disconnect();
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
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
      setTimeout(() => resolve(0), 5000);
    });
  };

  const calculateTBT = (): number => {
    const longTasks = performance.getEntriesByType('long-task');
    return longTasks.reduce((total, task) => total + task.duration - 50, 0);
  };

  const calculateRenderBlockingResources = (): number => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    return resources.filter(resource => 
      resource.name.includes('.css') || 
      (resource.name.includes('.js') && !resource.name.includes('async'))
    ).length;
  };

  const updateElementStatuses = () => {
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    setCriticalElements(prev => 
      prev.map(element => {
        const resource = resources.find(r => r.name.includes(element.path));
        if (resource) {
          return {
            ...element,
            status: resource.transferSize > 0 ? 'loaded' : 'error',
            loadTime: resource.duration,
            renderTime: resource.responseEnd - resource.responseStart
          };
        }
        return element;
      })
    );
  };

  const optimizeCriticalRenderingPath = async () => {
    setIsOptimizing(true);

    try {
      // Apply enabled optimization rules
      for (const rule of optimizationRules.filter(rule => rule.enabled)) {
        await applyOptimizationRule(rule);
      }

      // Re-measure metrics
      await measureRenderingMetrics();

    } catch (error) {
      console.error('Critical rendering path optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyOptimizationRule = async (rule: OptimizationRule) => {
    switch (rule.id) {
      case 'inline-critical-css':
        await inlineCriticalCSS();
        break;
      case 'defer-non-critical-css':
        await deferNonCriticalCSS();
        break;
      case 'minify-html':
        await minifyHTML();
        break;
      case 'optimize-images':
        await optimizeImages();
        break;
      case 'preload-fonts':
        await preloadFonts();
        break;
      case 'defer-js':
        await deferJavaScript();
        break;
    }
  };

  const inlineCriticalCSS = async () => {
    const criticalCSS = `
      /* Critical CSS for above-fold content */
      body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; }
      .header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; }
      .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
      .btn { display: inline-block; padding: 0.75rem 1.5rem; background: #007bff; color: white; text-decoration: none; border-radius: 0.25rem; }
    `;

    // Remove existing critical CSS
    const existingCritical = document.getElementById('critical-css');
    if (existingCritical) {
      existingCritical.remove();
    }

    // Add inline critical CSS
    const style = document.createElement('style');
    style.id = 'critical-css';
    style.textContent = criticalCSS;
    document.head.appendChild(style);
  };

  const deferNonCriticalCSS = async () => {
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([data-critical])');
    cssLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && !href.includes('critical')) {
        link.setAttribute('rel', 'preload');
        link.setAttribute('as', 'style');
        link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
      }
    });
  };

  const minifyHTML = async () => {
    // Remove unnecessary whitespace and comments
    const body = document.body;
    if (body) {
      const walker = document.createTreeWalker(
        body,
        NodeFilter.SHOW_TEXT,
        null
      );

      const textNodes: Text[] = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node as Text);
      }

      textNodes.forEach(textNode => {
        textNode.textContent = textNode.textContent?.replace(/\s+/g, ' ').trim() || '';
      });
    }
  };

  const optimizeImages = async () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.offsetTop < window.innerHeight) {
        // Above-fold image - add loading="eager"
        img.setAttribute('loading', 'eager');
        img.setAttribute('fetchpriority', 'high');
      } else {
        // Below-fold image - add lazy loading
        img.setAttribute('loading', 'lazy');
      }
    });
  };

  const preloadFonts = async () => {
    const fonts = criticalElements.filter(el => el.type === 'font' && el.isCritical);
    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font.path;
      link.as = 'font';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  };

  const deferJavaScript = async () => {
    const scripts = document.querySelectorAll('script:not([async]):not([defer])');
    scripts.forEach(script => {
      if (!script.src.includes('critical')) {
        script.setAttribute('defer', '');
      }
    });
  };

  const simulateOptimization = () => {
    setIsSimulating(true);
    
    // Simulate optimization effects
    setTimeout(() => {
      setMetrics(prev => prev ? {
        ...prev,
        firstContentfulPaint: prev.firstContentfulPaint * 0.7,
        largestContentfulPaint: prev.largestContentfulPaint * 0.8,
        timeToInteractive: prev.timeToInteractive * 0.6,
        totalBlockingTime: prev.totalBlockingTime * 0.5,
        renderBlockingResources: Math.max(0, prev.renderBlockingResources - 2)
      } : null);
      setIsSimulating(false);
    }, 2000);
  };

  const getElementIcon = (type: string) => {
    switch (type) {
      case 'css':
        return <Code className="w-4 h-4 text-blue-500" />;
      case 'js':
        return <Code className="w-4 h-4 text-yellow-500" />;
      case 'image':
        return <Eye className="w-4 h-4 text-green-500" />;
      case 'font':
        return <Layers className="w-4 h-4 text-purple-500" />;
      case 'html':
        return <Code className="w-4 h-4 text-red-500" />;
      default:
        return <Code className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'loaded':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'loading':
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
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

  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    return `${ms.toFixed(2)}ms`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          Critical Rendering Path Optimizer
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAboveFold(!showAboveFold)}
            className={`p-2 rounded transition-colors ${
              showAboveFold ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
            }`}
            title="Toggle Above-Fold View"
          >
            {showAboveFold ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
          <button
            onClick={simulateOptimization}
            disabled={isSimulating}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={optimizeCriticalRenderingPath}
            disabled={isOptimizing}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isOptimizing ? 'Optimizing...' : 'Optimize'}
          </button>
        </div>
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{formatTime(metrics.firstContentfulPaint)}</div>
            <div className="text-sm text-blue-600">First Contentful Paint</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{formatTime(metrics.largestContentfulPaint)}</div>
            <div className="text-sm text-green-600">Largest Contentful Paint</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{formatTime(metrics.timeToInteractive)}</div>
            <div className="text-sm text-purple-600">Time to Interactive</div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{metrics.renderBlockingResources}</div>
            <div className="text-sm text-orange-600">Render Blocking Resources</div>
          </div>
        </div>
      )}

      {/* Critical Elements */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">
          Critical Elements {showAboveFold && '(Above-Fold Only)'}
        </h4>
        <div className="space-y-2">
          {criticalElements
            .filter(element => !showAboveFold || element.isAboveFold)
            .map((element, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getElementIcon(element.type)}
                <div>
                  <div className="font-medium text-sm">{element.path}</div>
                  <div className="text-xs text-gray-500">
                    {formatSize(element.size)} • Priority {element.priority}
                    {element.isCritical && ' • Critical'}
                    {element.isAboveFold && ' • Above Fold'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {element.loadTime > 0 && (
                  <span className="text-xs text-gray-500">
                    {formatTime(element.loadTime)}
                  </span>
                )}
                {getStatusIcon(element.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Rules */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Optimization Rules</h4>
        <div className="space-y-3">
          {optimizationRules.map((rule) => (
            <div key={rule.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={rule.enabled}
                  onChange={(e) => setOptimizationRules(prev => 
                    prev.map(r => r.id === rule.id ? { ...r, enabled: e.target.checked } : r)
                  )}
                  className="rounded"
                />
                <div>
                  <div className="font-medium text-sm">{rule.name}</div>
                  <div className="text-xs text-gray-500">{rule.description}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded text-xs ${getImpactColor(rule.impact)}`}>
                  {rule.impact} impact
                </span>
                <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">
                  {rule.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOM Size */}
      {metrics && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">DOM Analysis</h4>
          <div className="text-sm text-gray-600">
            <div>DOM Size: {formatSize(metrics.domSize)}</div>
            <div>Total Blocking Time: {formatTime(metrics.totalBlockingTime)}</div>
            <div>Cumulative Layout Shift: {metrics.cumulativeLayoutShift.toFixed(3)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CriticalRenderingOptimizer;