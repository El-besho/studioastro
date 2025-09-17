// Grid Test Suite Component
// Comprehensive testing and demonstration of responsive grid layouts

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Grid, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Laptop, 
  Maximize2,
  Minimize2,
  RefreshCw,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

interface GridTestItem {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  status: 'active' | 'inactive' | 'pending';
}

const testItems: GridTestItem[] = [
  {
    id: '1',
    title: 'Service Card 1',
    description: 'Air conditioning maintenance and repair services',
    category: 'HVAC',
    priority: 'high',
    status: 'active'
  },
  {
    id: '2',
    title: 'Service Card 2',
    description: 'Professional plumbing services and installations',
    category: 'Plumbing',
    priority: 'high',
    status: 'active'
  },
  {
    id: '3',
    title: 'Service Card 3',
    description: 'Electrical work and safety inspections',
    category: 'Electrical',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '4',
    title: 'Service Card 4',
    description: 'Deep cleaning and maintenance services',
    category: 'Cleaning',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: '5',
    title: 'Service Card 5',
    description: 'Home maintenance and repair solutions',
    category: 'Maintenance',
    priority: 'low',
    status: 'inactive'
  },
  {
    id: '6',
    title: 'Service Card 6',
    description: 'Pest control and prevention services',
    category: 'Pest Control',
    priority: 'medium',
    status: 'active'
  },
  {
    id: '7',
    title: 'Service Card 7',
    description: 'Landscaping and garden design',
    category: 'Landscaping',
    priority: 'low',
    status: 'pending'
  },
  {
    id: '8',
    title: 'Service Card 8',
    description: 'Security system installation and monitoring',
    category: 'Security',
    priority: 'high',
    status: 'active'
  }
];

const breakpoints = [
  { name: 'Mobile', width: '375px', icon: Smartphone },
  { name: 'Tablet', width: '768px', icon: Tablet },
  { name: 'Desktop', width: '1024px', icon: Laptop },
  { name: 'Large', width: '1440px', icon: Monitor }
];

const gridTypes = [
  { name: 'Service Grid', type: 'service', description: 'Optimized for service cards' },
  { name: 'Sub Service Grid', type: 'subService', description: 'For detailed service cards' },
  { name: 'Content Grid', type: 'content', description: 'For content blocks and articles' },
  { name: 'Stats Grid', type: 'stats', description: 'For statistics and metrics' },
  { name: 'Features Grid', type: 'features', description: 'For feature highlights' },
  { name: 'Testimonials Grid', type: 'testimonials', description: 'For customer testimonials' },
  { name: 'Blog Grid', type: 'blog', description: 'For blog posts and articles' },
  { name: 'Dashboard Grid', type: 'dashboard', description: 'For dashboard layouts' }
];

const gridVariants = [
  { name: 'Default', variant: 'default', description: 'Standard responsive grid' },
  { name: 'Auto Fit', variant: 'auto-fit', description: 'Auto-fit columns with min-width' },
  { name: 'Auto Fill', variant: 'auto-fill', description: 'Auto-fill columns with fixed width' },
  { name: 'Masonry', variant: 'masonry', description: 'Masonry layout for varied heights' },
  { name: 'Aspect Ratio', variant: 'aspect-ratio', description: 'Fixed aspect ratio items' }
];

export function GridTestSuite() {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState(breakpoints[2]);
  const [selectedGridType, setSelectedGridType] = useState(gridTypes[0]);
  const [selectedVariant, setSelectedVariant] = useState(gridVariants[0]);
  const [showGridLines, setShowGridLines] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false);
  const [containerMode, setContainerMode] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const TestCard: React.FC<{ item: GridTestItem }> = ({ item }) => (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg ${showGridLines ? 'border-2 border-dashed border-blue-300' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{item.title}</CardTitle>
          <div className="flex gap-1">
            <Badge className={getPriorityColor(item.priority)} size="sm">
              {item.priority}
            </Badge>
            <Badge className={getStatusColor(item.status)} size="sm">
              {item.status}
            </Badge>
          </div>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{item.category}</span>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Responsive Grid Test Suite</h1>
        <p className="text-muted-foreground">
          Comprehensive testing and demonstration of optimized grid layouts
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Grid Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Breakpoint Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Breakpoint Preview</label>
            <div className="flex gap-2 flex-wrap">
              {breakpoints.map((bp) => (
                <Button
                  key={bp.name}
                  variant={selectedBreakpoint.name === bp.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedBreakpoint(bp)}
                  className="flex items-center gap-2"
                >
                  <bp.icon className="h-4 w-4" />
                  {bp.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid Type Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Grid Type</label>
            <select
              value={selectedGridType.type}
              onChange={(e) => setSelectedGridType(gridTypes.find(t => t.type === e.target.value) || gridTypes[0])}
              className="w-full p-2 border rounded-md"
            >
              {gridTypes.map((type) => (
                <option key={type.type} value={type.type}>
                  {type.name} - {type.description}
                </option>
              ))}
            </select>
          </div>

          {/* Grid Variant Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Grid Variant</label>
            <div className="flex gap-2 flex-wrap">
              {gridVariants.map((variant) => (
                <Button
                  key={variant.variant}
                  variant={selectedVariant.variant === variant.variant ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="flex gap-4 flex-wrap">
            <Button
              variant={showGridLines ? 'default' : 'outline'}
              size="sm"
              onClick={() => setShowGridLines(!showGridLines)}
              className="flex items-center gap-2"
            >
              {showGridLines ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              Grid Lines
            </Button>
            <Button
              variant={performanceMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPerformanceMode(!performanceMode)}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Performance Mode
            </Button>
            <Button
              variant={containerMode ? 'default' : 'outline'}
              size="sm"
              onClick={() => setContainerMode(!containerMode)}
              className="flex items-center gap-2"
            >
              <Maximize2 className="h-4 w-4" />
              Container Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Grid Preview - {selectedGridType.name}</span>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <selectedBreakpoint.icon className="h-4 w-4" />
              {selectedBreakpoint.name} ({selectedBreakpoint.width})
            </div>
          </CardTitle>
          <CardDescription>
            {selectedVariant.description} - {testItems.length} items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className={`${containerMode ? 'grid-container' : ''}`}
            style={{ 
              width: selectedBreakpoint.width,
              maxWidth: '100%',
              margin: '0 auto',
              border: showGridLines ? '2px solid #e5e7eb' : 'none',
              borderRadius: '8px',
              padding: '1rem'
            }}
          >
            <div 
              className={`grid-${selectedGridType.type} ${performanceMode ? 'grid-performance' : ''}`}
              style={showGridLines ? { 
                backgroundImage: `
                  linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                  linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              } : {}}
            >
              {testItems.map((item) => (
                <TestCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid Information */}
      <Card>
        <CardHeader>
          <CardTitle>Grid Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Current Configuration</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>Type: {selectedGridType.name}</li>
                <li>Variant: {selectedVariant.name}</li>
                <li>Breakpoint: {selectedBreakpoint.name}</li>
                <li>Performance Mode: {performanceMode ? 'Enabled' : 'Disabled'}</li>
                <li>Container Mode: {containerMode ? 'Enabled' : 'Disabled'}</li>
                <li>Grid Lines: {showGridLines ? 'Visible' : 'Hidden'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Responsive Behavior</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>Mobile: 1 column</li>
                <li>Tablet: 2-3 columns</li>
                <li>Desktop: 3-4 columns</li>
                <li>Large: 4-6 columns</li>
                <li>Gap: Responsive spacing</li>
                <li>Alignment: Stretch items</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}