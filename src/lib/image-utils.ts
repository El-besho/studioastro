// Image optimization utilities

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
}

export function getOptimizedImageUrl(src: string, width?: number): string {
  // If already optimized or external URL, return as is
  if (src.includes('http') || src.includes('.webp')) {
    return src;
  }
  
  // Generate WebP URL
  const webpUrl = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  
  // Add size suffix if width specified
  if (width) {
    const sizeMap: Record<number, string> = {
      150: 'thumbnail',
      400: 'small',
      800: 'medium',
      1200: 'large',
      1920: 'xlarge'
    };
    
    // Find closest size
    const closestSize = Object.keys(sizeMap)
      .map(Number)
      .sort((a, b) => Math.abs(a - width) - Math.abs(b - width))[0];
    
    const suffix = sizeMap[closestSize];
    return webpUrl.replace('.webp', `-${suffix}.webp`);
  }
  
  return webpUrl;
}

export function generateImageSrcSet(src: string): string {
  const sizes = [400, 800, 1200, 1920];
  
  return sizes
    .map(size => `${getOptimizedImageUrl(src, size)} ${size}w`)
    .join(', ');
}

export function generateSizes(config: {
  mobile?: string;
  tablet?: string;
  desktop?: string;
}): string {
  const { 
    mobile = '100vw',
    tablet = '50vw',
    desktop = '33vw'
  } = config;
  
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
}

// Service-specific image configurations
export const serviceImageConfigs: Record<string, Partial<ImageConfig>> = {
  'air-conditioning-hvac': {
    alt: 'خدمات التكييف والتبريد',
    sizes: generateSizes({ mobile: '100vw', tablet: '50vw', desktop: '400px' })
  },
  'plumbing-services': {
    alt: 'خدمات السباكة',
    sizes: generateSizes({ mobile: '100vw', tablet: '50vw', desktop: '400px' })
  },
  'electrical-services': {
    alt: 'خدمات الكهرباء',
    sizes: generateSizes({ mobile: '100vw', tablet: '50vw', desktop: '400px' })
  },
  'cleaning-services': {
    alt: 'خدمات التنظيف',
    sizes: generateSizes({ mobile: '100vw', tablet: '50vw', desktop: '400px' })
  }
};

// Placeholder data URL for lazy loading
export function generatePlaceholder(width: number = 10, height: number = 10): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3Crect width='${width}' height='${height}' fill='%23f3f4f6'/%3E%3C/svg%3E`;
}