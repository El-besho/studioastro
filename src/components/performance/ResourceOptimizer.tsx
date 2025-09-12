// Resource Optimizer Component
// Manages resource loading strategy with preload, preconnect, and prefetch

import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Link, 
  Image, 
  FileText, 
  Code, 
  Globe,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Settings
} from 'lucide-react';

interface ResourceHint {
  type: 'preload' | 'prefetch' | 'preconnect' | 'dns-prefetch';
  href: string;
  as?: string;
  crossorigin?: boolean;
  media?: string;
  priority?: 'high' | 'low';
  status: 'pending' | 'loading' | 'loaded' | 'error';
  size?: number;
  loadTime?: number;
}

interface CriticalResource {
  path: string;
  type: 'css' | 'js' | 'image' | 'font' | 'html';
  priority: number;
  size: number;
  isAboveFold: boolean;
  isCritical: boolean;
  loadTime?: number;
  status: 'pending' | 'loading' | 'loaded' | 'error';
}

interface ResourceMetrics {
  totalResources: number;
  loadedResources: number;
  failedResources: number;
  totalSize: number;
  loadTime: number;
  averageLoadTime: number;
}

export const ResourceOptimizer: React.FC = () => {
  const [resourceHints, setResourceHints] = useState<ResourceHint[]>([]);
  const [criticalResources, setCriticalResources] = useState<CriticalResource[]>([]);
  const [metrics, setMetrics] = useState<ResourceMetrics | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Configuration
  const [config, setConfig] = useState({
    preloadCritical: true,
    preconnectDomains: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
    prefetchRoutes: ['/services', '/about', '/contact'],
    lazyLoadImages: true,
    lazyLoadComponents: true,
    enableCompression: true,
    maxResourceSize: 1024 * 1024, // 1MB
    criticalResourceThreshold: 1460 // bytes
  });

  useEffect(() => {
    initializeResources();
    measureResourcePerformance();
  }, []);

  const initializeResources = () => {
    // Initialize critical resources
    const critical: CriticalResource[] = [
      {
        path: '/css/critical.css',
        type: 'css',
        priority: 1,
        size: 2048,
        isAboveFold: true,
        isCritical: true,
        status: 'pending'
      },
      {
        path: '/js/main.js',
        type: 'js',
        priority: 2,
        size: 4096,
        isAboveFold: false,
        isCritical: true,
        status: 'pending'
      },
      {
        path: '/fonts/main.woff2',
        type: 'font',
        priority: 3,
        size: 1536,
        isAboveFold: true,
        isCritical: true,
        status: 'pending'
      },
      {
        path: '/images/hero.jpg',
        type: 'image',
        priority: 4,
        size: 8192,
        isAboveFold: true,
        isCritical: true,
        status: 'pending'
      }
    ];

    setCriticalResources(critical);

    // Initialize resource hints
    const hints: ResourceHint[] = [
      {
        type: 'preload',
        href: '/css/critical.css',
        as: 'style',
        priority: 'high',
        status: 'pending'
      },
      {
        type: 'preload',
        href: '/fonts/main.woff2',
        as: 'font',
        crossorigin: true,
        priority: 'high',
        status: 'pending'
      },
      {
        type: 'preconnect',
        href: 'https://fonts.googleapis.com',
        crossorigin: true,
        status: 'pending'
      },
      {
        type: 'prefetch',
        href: '/services',
        priority: 'low',
        status: 'pending'
      }
    ];

    setResourceHints(hints);
  };

  const measureResourcePerformance = async () => {
    if (typeof window === 'undefined') return;

    const startTime = performance.now();
    const resources: PerformanceResourceTiming[] = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    let totalSize = 0;
    let loadedCount = 0;
    let failedCount = 0;
    let totalLoadTime = 0;

    resources.forEach(resource => {
      totalSize += resource.transferSize || 0;
      totalLoadTime += resource.duration;
      
      if (resource.transferSize > 0) {
        loadedCount++;
      } else {
        failedCount++;
      }
    });

    const loadTime = performance.now() - startTime;
    const averageLoadTime = loadedCount > 0 ? totalLoadTime / loadedCount : 0;

    setMetrics({
      totalResources: resources.length,
      loadedResources: loadedCount,
      failedResources: failedCount,
      totalSize,
      loadTime,
      averageLoadTime
    });

    // Update resource statuses
    updateResourceStatuses(resources);
  };

  const updateResourceStatuses = (resources: PerformanceResourceTiming[]) => {
    setCriticalResources(prev => 
      prev.map(resource => {
        const perfResource = resources.find(r => r.name.includes(resource.path));
        if (perfResource) {
          return {
            ...resource,
            status: perfResource.transferSize > 0 ? 'loaded' : 'error',
            loadTime: perfResource.duration
          };
        }
        return resource;
      })
    );

    setResourceHints(prev =>
      prev.map(hint => {
        const perfResource = resources.find(r => r.name.includes(hint.href));
        if (perfResource) {
          return {
            ...hint,
            status: perfResource.transferSize > 0 ? 'loaded' : 'error',
            loadTime: perfResource.duration,
            size: perfResource.transferSize
          };
        }
        return hint;
      })
    );
  };

  const optimizeResources = async () => {
    setIsOptimizing(true);

    try {
      // Generate optimized resource hints
      const optimizedHints = generateOptimizedHints();
      setResourceHints(optimizedHints);

      // Apply resource optimizations
      await applyResourceOptimizations();

      // Re-measure performance
      await measureResourcePerformance();

    } catch (error) {
      console.error('Resource optimization failed:', error);
    } finally {
      setIsOptimizing(false);
    }
  };

  const generateOptimizedHints = (): ResourceHint[] => {
    const hints: ResourceHint[] = [];

    // Preload critical resources
    if (config.preloadCritical) {
      criticalResources
        .filter(resource => resource.isCritical)
        .forEach(resource => {
          hints.push({
            type: 'preload',
            href: resource.path,
            as: getResourceType(resource.type),
            priority: 'high',
            status: 'pending'
          });
        });
    }

    // Preconnect to external domains
    config.preconnectDomains.forEach(domain => {
      hints.push({
        type: 'preconnect',
        href: domain,
        crossorigin: true,
        status: 'pending'
      });
    });

    // Prefetch predicted routes
    config.prefetchRoutes.forEach(route => {
      hints.push({
        type: 'prefetch',
        href: route,
        priority: 'low',
        status: 'pending'
      });
    });

    return hints;
  };

  const getResourceType = (type: string): string => {
    const typeMap: Record<string, string> = {
      'css': 'style',
      'js': 'script',
      'image': 'image',
      'font': 'font',
      'html': 'document'
    };
    return typeMap[type] || 'fetch';
  };

  const applyResourceOptimizations = async () => {
    // Apply resource hints to the document
    const head = document.head;
    
    // Remove existing resource hints
    const existingHints = head.querySelectorAll('link[rel="preload"], link[rel="prefetch"], link[rel="preconnect"]');
    existingHints.forEach(hint => hint.remove());

    // Add new resource hints
    resourceHints.forEach(hint => {
      const link = document.createElement('link');
      link.rel = hint.type;
      link.href = hint.href;
      
      if (hint.as) link.setAttribute('as', hint.as);
      if (hint.crossorigin) link.crossOrigin = 'anonymous';
      if (hint.media) link.media = hint.media;
      
      head.appendChild(link);
    });

    // Apply lazy loading
    if (config.lazyLoadImages) {
      applyLazyLoading();
    }
  };

  const applyLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  };

  const generateResourceHintTags = (): string => {
    return resourceHints.map(hint => {
      let attributes = `rel="${hint.type}" href="${hint.href}"`;
      
      if (hint.as) attributes += ` as="${hint.as}"`;
      if (hint.crossorigin) attributes += ' crossorigin';
      if (hint.media) attributes += ` media="${hint.media}"`;
      
      return `<link ${attributes}>`;
    }).join('\n');
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'css':
        return <FileText className="w-4 h-4 text-blue-500" />;
      case 'js':
        return <Code className="w-4 h-4 text-yellow-500" />;
      case 'image':
        return <Image className="w-4 h-4 text-green-500" />;
      case 'font':
        return <FileText className="w-4 h-4 text-purple-500" />;
      case 'html':
        return <Globe className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
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
          Resource Optimizer
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            onClick={optimizeResources}
            disabled={isOptimizing}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isOptimizing ? 'Optimizing...' : 'Optimize'}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-3">Optimization Settings</h4>
          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.preloadCritical}
                onChange={(e) => setConfig(prev => ({ ...prev, preloadCritical: e.target.checked }))}
                className="mr-2"
              />
              Preload Critical Resources
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.lazyLoadImages}
                onChange={(e) => setConfig(prev => ({ ...prev, lazyLoadImages: e.target.checked }))}
                className="mr-2"
              />
              Lazy Load Images
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.lazyLoadComponents}
                onChange={(e) => setConfig(prev => ({ ...prev, lazyLoadComponents: e.target.checked }))}
                className="mr-2"
              />
              Lazy Load Components
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.enableCompression}
                onChange={(e) => setConfig(prev => ({ ...prev, enableCompression: e.target.checked }))}
                className="mr-2"
              />
              Enable Compression
            </label>
          </div>
        </div>
      )}

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{metrics.totalResources}</div>
            <div className="text-sm text-blue-600">Total Resources</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{metrics.loadedResources}</div>
            <div className="text-sm text-green-600">Loaded</div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{metrics.failedResources}</div>
            <div className="text-sm text-red-600">Failed</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{formatSize(metrics.totalSize)}</div>
            <div className="text-sm text-purple-600">Total Size</div>
          </div>
        </div>
      )}

      {/* Critical Resources */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Download className="w-4 h-4 mr-2" />
          Critical Resources
        </h4>
        <div className="space-y-2">
          {criticalResources.map((resource, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                {getResourceIcon(resource.type)}
                <div>
                  <div className="font-medium text-sm">{resource.path}</div>
                  <div className="text-xs text-gray-500">
                    {formatSize(resource.size)} • Priority {resource.priority}
                    {resource.isAboveFold && ' • Above Fold'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {resource.loadTime && (
                  <span className="text-xs text-gray-500">
                    {formatTime(resource.loadTime)}
                  </span>
                )}
                {getStatusIcon(resource.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Hints */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
          <Link className="w-4 h-4 mr-2" />
          Resource Hints
        </h4>
        <div className="space-y-2">
          {resourceHints.map((hint, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded text-xs ${
                  hint.type === 'preload' ? 'bg-blue-100 text-blue-800' :
                  hint.type === 'prefetch' ? 'bg-green-100 text-green-800' :
                  hint.type === 'preconnect' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {hint.type}
                </div>
                <div>
                  <div className="font-medium text-sm">{hint.href}</div>
                  <div className="text-xs text-gray-500">
                    {hint.as && `as="${hint.as}"`}
                    {hint.crossorigin && ' • crossorigin'}
                    {hint.priority && ` • ${hint.priority} priority`}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {hint.loadTime && (
                  <span className="text-xs text-gray-500">
                    {formatTime(hint.loadTime)}
                  </span>
                )}
                {hint.size && (
                  <span className="text-xs text-gray-500">
                    {formatSize(hint.size)}
                  </span>
                )}
                {getStatusIcon(hint.status)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Code */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Generated Resource Hints</h4>
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
          <pre className="text-sm">{generateResourceHintTags()}</pre>
        </div>
      </div>
    </div>
  );
};

export default ResourceOptimizer;