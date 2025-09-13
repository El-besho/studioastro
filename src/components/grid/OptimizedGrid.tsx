// Optimized Grid Component
// Provides consistent, responsive grid layouts with performance optimizations

import React, { forwardRef, useMemo } from 'react';
import { cn } from '../../lib/utils';
import { gridOptimizer, GridConfig } from '../../lib/grid-optimizer';

export interface OptimizedGridProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'service' | 'subService' | 'content' | 'stats' | 'features' | 'testimonials' | 'blog' | 'dashboard';
  variant?: 'default' | 'auto-fit' | 'auto-fill' | 'masonry' | 'aspect-ratio';
  minWidth?: string;
  columnWidth?: string;
  aspectRatio?: string;
  performance?: boolean;
  container?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const OptimizedGrid = forwardRef<HTMLDivElement, OptimizedGridProps>(
  ({
    type,
    variant = 'default',
    minWidth = '250px',
    columnWidth = '250px',
    aspectRatio = '16/9',
    performance = false,
    container = false,
    className,
    children,
    ...props
  }, ref) => {
    const gridClasses = useMemo(() => {
      let classes: string;

      switch (variant) {
        case 'auto-fit':
          classes = gridOptimizer.generateAutoFitGrid(type, minWidth, className);
          break;
        case 'auto-fill':
          classes = gridOptimizer.generateAutoFillGrid(type, columnWidth, className);
          break;
        case 'masonry':
          classes = gridOptimizer.generateMasonryGrid(type, className);
          break;
        case 'aspect-ratio':
          classes = gridOptimizer.generateAspectRatioGrid(type, aspectRatio, className);
          break;
        default:
          classes = gridOptimizer.generateGridClasses(type, className);
      }

      if (performance) {
        const optimizedConfig = gridOptimizer.optimizeForPerformance(type);
        // Apply performance optimizations
        classes = classes.replace(/grid-cols-\d+/g, `grid-cols-${optimizedConfig.columns.xs}`);
      }

      if (container) {
        classes += ' @container';
      }

      return classes;
    }, [type, variant, minWidth, columnWidth, aspectRatio, performance, container, className]);

    return (
      <div
        ref={ref}
        className={cn(gridClasses)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

OptimizedGrid.displayName = 'OptimizedGrid';

// Specialized Grid Components
export const ServiceGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="service" {...props} />
);

export const SubServiceGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="subService" {...props} />
);

export const ContentGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="content" {...props} />
);

export const StatsGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="stats" {...props} />
);

export const FeaturesGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="features" {...props} />
);

export const TestimonialsGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="testimonials" {...props} />
);

export const BlogGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="blog" {...props} />
);

export const DashboardGrid = forwardRef<HTMLDivElement, Omit<OptimizedGridProps, 'type'>>(
  (props, ref) => <OptimizedGrid ref={ref} type="dashboard" {...props} />
);

// Grid Item Component for consistent spacing and alignment
export interface GridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number;
  start?: number;
  end?: number;
  className?: string;
  children: React.ReactNode;
}

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
  ({ span, start, end, className, children, ...props }, ref) => {
    const itemClasses = cn(
      'grid-item',
      span && `col-span-${span}`,
      start && `col-start-${start}`,
      end && `col-end-${end}`,
      className
    );

    return (
      <div
        ref={ref}
        className={itemClasses}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GridItem.displayName = 'GridItem';

// Responsive Grid Hook
export const useResponsiveGrid = (type: string) => {
  const config = gridOptimizer.getConfig(type as any);
  
  const getClasses = (variant: OptimizedGridProps['variant'] = 'default') => {
    switch (variant) {
      case 'auto-fit':
        return gridOptimizer.generateAutoFitGrid(type as any);
      case 'auto-fill':
        return gridOptimizer.generateAutoFillGrid(type as any);
      case 'masonry':
        return gridOptimizer.generateMasonryGrid(type as any);
      default:
        return gridOptimizer.generateGridClasses(type as any);
    }
  };

  const getStyles = (breakpoint?: string) => {
    return gridOptimizer.generateGridStyles(type as any, breakpoint as any);
  };

  return {
    config,
    getClasses,
    getStyles,
    generateClasses: gridOptimizer.generateGridClasses,
    generateStyles: gridOptimizer.generateGridStyles
  };
};