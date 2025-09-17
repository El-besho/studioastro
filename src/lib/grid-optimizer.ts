// Responsive Grid Layout Optimizer
// Provides consistent, optimized grid patterns across the application

export interface GridBreakpoints {
  xs: number;    // 0px
  sm: number;    // 640px
  md: number;    // 768px
  lg: number;    // 1024px
  xl: number;    // 1280px
  '2xl': number; // 1536px
}

export interface GridConfig {
  columns: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  gap: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  minItemWidth?: string;
  maxItemWidth?: string;
}

export const breakpoints: GridBreakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const gridConfigs = {
  // Service Grid - Optimized for service cards
  service: {
    columns: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5, '2xl': 6 },
    gap: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
    minItemWidth: '280px',
    maxItemWidth: '320px'
  },
  
  // Sub Service Grid - For detailed service cards
  subService: {
    columns: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3, '2xl': 4 },
    gap: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
    minItemWidth: '300px',
    maxItemWidth: '400px'
  },
  
  // Content Grid - For content blocks and articles
  content: {
    columns: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3, '2xl': 4 },
    gap: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
    minItemWidth: '250px',
    maxItemWidth: '350px'
  },
  
  // Stats Grid - For statistics and metrics
  stats: {
    columns: { xs: 2, sm: 2, md: 4, lg: 4, xl: 4, '2xl': 6 },
    gap: { xs: '0.75rem', sm: '1rem', md: '1rem', lg: '1.25rem', xl: '1.25rem', '2xl': '1.25rem' },
    minItemWidth: '120px',
    maxItemWidth: '200px'
  },
  
  // Features Grid - For feature highlights
  features: {
    columns: { xs: 1, sm: 2, md: 2, lg: 3, xl: 4, '2xl': 4 },
    gap: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
    minItemWidth: '250px',
    maxItemWidth: '300px'
  },
  
  // Testimonials Grid - For customer testimonials
  testimonials: {
    columns: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3, '2xl': 4 },
    gap: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
    minItemWidth: '280px',
    maxItemWidth: '350px'
  },
  
  // Blog Grid - For blog posts and articles
  blog: {
    columns: { xs: 1, sm: 1, md: 2, lg: 3, xl: 3, '2xl': 4 },
    gap: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
    minItemWidth: '300px',
    maxItemWidth: '400px'
  },
  
  // Dashboard Grid - For dashboard layouts
  dashboard: {
    columns: { xs: 1, sm: 1, md: 2, lg: 3, xl: 4, '2xl': 4 },
    gap: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem', xl: '1.5rem', '2xl': '1.5rem' },
    minItemWidth: '250px',
    maxItemWidth: '350px'
  }
};

export class GridOptimizer {
  private static instance: GridOptimizer;
  private configs: Map<string, GridConfig> = new Map();

  constructor() {
    this.initializeConfigs();
  }

  static getInstance(): GridOptimizer {
    if (!GridOptimizer.instance) {
      GridOptimizer.instance = new GridOptimizer();
    }
    return GridOptimizer.instance;
  }

  private initializeConfigs() {
    Object.entries(gridConfigs).forEach(([key, config]) => {
      this.configs.set(key, config);
    });
  }

  // Generate optimized grid classes
  generateGridClasses(type: keyof typeof gridConfigs, className?: string): string {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Grid config for type "${type}" not found`);
    }

    const classes = [
      'grid',
      `grid-cols-${config.columns.xs}`,
      `sm:grid-cols-${config.columns.sm}`,
      `md:grid-cols-${config.columns.md}`,
      `lg:grid-cols-${config.columns.lg}`,
      `xl:grid-cols-${config.columns.xl}`,
      `2xl:grid-cols-${config.columns['2xl']}`,
      `gap-${this.getGapClass(config.gap.xs)}`,
      `sm:gap-${this.getGapClass(config.gap.sm)}`,
      `md:gap-${this.getGapClass(config.gap.md)}`,
      `lg:gap-${this.getGapClass(config.gap.lg)}`,
      `xl:gap-${this.getGapClass(config.gap.xl)}`,
      `2xl:gap-${this.getGapClass(config.gap['2xl'])}`
    ];

    if (config.minItemWidth) {
      classes.push(`grid-cols-[repeat(auto-fit,minmax(${config.minItemWidth},1fr))]`);
    }

    if (className) {
      classes.push(className);
    }

    return classes.join(' ');
  }

  // Generate CSS Grid properties for inline styles
  generateGridStyles(type: keyof typeof gridConfigs, breakpoint?: keyof GridBreakpoints) {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Grid config for type "${type}" not found`);
    }

    const bp = breakpoint || 'lg';
    const columns = config.columns[bp];
    const gap = config.gap[bp];

    return {
      display: 'grid',
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
      gap: gap,
      ...(config.minItemWidth && {
        gridTemplateColumns: `repeat(auto-fit, minmax(${config.minItemWidth}, 1fr))`
      })
    };
  }

  // Generate responsive grid with CSS Grid
  generateResponsiveGrid(type: keyof typeof gridConfigs, className?: string): string {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Grid config for type "${type}" not found`);
    }

    const classes = [
      'grid',
      `grid-cols-[repeat(auto-fit,minmax(${config.minItemWidth || '250px'},1fr))]`,
      `gap-${this.getGapClass(config.gap.lg)}`,
      className
    ];

    return classes.join(' ');
  }

  // Get gap class from gap value
  private getGapClass(gap: string): string {
    const gapMap: { [key: string]: string } = {
      '0.5rem': '2',
      '0.75rem': '3',
      '1rem': '4',
      '1.25rem': '5',
      '1.5rem': '6',
      '1.75rem': '7',
      '2rem': '8',
      '2.25rem': '9',
      '2.5rem': '10',
      '3rem': '12'
    };
    return gapMap[gap] || '4';
  }

  // Generate container queries for modern browsers
  generateContainerQueries(type: keyof typeof gridConfigs): string {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Grid config for type "${type}" not found`);
    }

    return `
      @container (min-width: ${breakpoints.sm}px) {
        grid-template-columns: repeat(${config.columns.sm}, 1fr);
        gap: ${config.gap.sm};
      }
      @container (min-width: ${breakpoints.md}px) {
        grid-template-columns: repeat(${config.columns.md}, 1fr);
        gap: ${config.gap.md};
      }
      @container (min-width: ${breakpoints.lg}px) {
        grid-template-columns: repeat(${config.columns.lg}, 1fr);
        gap: ${config.gap.lg};
      }
      @container (min-width: ${breakpoints.xl}px) {
        grid-template-columns: repeat(${config.columns.xl}, 1fr);
        gap: ${config.gap.xl};
      }
      @container (min-width: ${breakpoints['2xl']}px) {
        grid-template-columns: repeat(${config.columns['2xl']}, 1fr);
        gap: ${config.gap['2xl']};
      }
    `;
  }

  // Optimize grid for performance
  optimizeForPerformance(type: keyof typeof gridConfigs): GridConfig {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Grid config for type "${type}" not found`);
    }

    // Reduce columns on smaller screens for better performance
    const optimizedConfig = { ...config };
    
    if (optimizedConfig.columns.xs > 2) {
      optimizedConfig.columns.xs = 1;
    }
    if (optimizedConfig.columns.sm > 3) {
      optimizedConfig.columns.sm = 2;
    }

    return optimizedConfig;
  }

  // Generate grid with aspect ratio preservation
  generateAspectRatioGrid(
    type: keyof typeof gridConfigs, 
    aspectRatio: string = '16/9',
    className?: string
  ): string {
    const baseClasses = this.generateGridClasses(type, className);
    return `${baseClasses} [&>*]:aspect-[${aspectRatio}] [&>*]:object-cover`;
  }

  // Generate masonry grid
  generateMasonryGrid(type: keyof typeof gridConfigs, className?: string): string {
    const baseClasses = this.generateGridClasses(type, className);
    return `${baseClasses} grid-rows-[masonry]`;
  }

  // Generate grid with auto-fit columns
  generateAutoFitGrid(
    type: keyof typeof gridConfigs,
    minWidth: string = '250px',
    className?: string
  ): string {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Grid config for type "${type}" not found`);
    }

    const classes = [
      'grid',
      `grid-cols-[repeat(auto-fit,minmax(${minWidth},1fr))]`,
      `gap-${this.getGapClass(config.gap.lg)}`,
      className
    ];

    return classes.join(' ');
  }

  // Generate grid with auto-fill columns
  generateAutoFillGrid(
    type: keyof typeof gridConfigs,
    columnWidth: string = '250px',
    className?: string
  ): string {
    const config = this.configs.get(type);
    if (!config) {
      throw new Error(`Grid config for type "${type}" not found`);
    }

    const classes = [
      'grid',
      `grid-cols-[repeat(auto-fill,minmax(${columnWidth},1fr))]`,
      `gap-${this.getGapClass(config.gap.lg)}`,
      className
    ];

    return classes.join(' ');
  }

  // Get all available grid types
  getAvailableTypes(): string[] {
    return Array.from(this.configs.keys());
  }

  // Get grid config by type
  getConfig(type: keyof typeof gridConfigs): GridConfig | undefined {
    return this.configs.get(type);
  }

  // Update grid config
  updateConfig(type: keyof typeof gridConfigs, config: Partial<GridConfig>): void {
    const existingConfig = this.configs.get(type);
    if (existingConfig) {
      this.configs.set(type, { ...existingConfig, ...config });
    }
  }
}

// Export singleton instance
export const gridOptimizer = GridOptimizer.getInstance();

// Utility functions
export const getGridClasses = (type: keyof typeof gridConfigs, className?: string) => 
  gridOptimizer.generateGridClasses(type, className);

export const getResponsiveGrid = (type: keyof typeof gridConfigs, className?: string) => 
  gridOptimizer.generateResponsiveGrid(type, className);

export const getAutoFitGrid = (type: keyof typeof gridConfigs, minWidth?: string, className?: string) => 
  gridOptimizer.generateAutoFitGrid(type, minWidth, className);

export const getAutoFillGrid = (type: keyof typeof gridConfigs, columnWidth?: string, className?: string) => 
  gridOptimizer.generateAutoFillGrid(type, columnWidth, className);