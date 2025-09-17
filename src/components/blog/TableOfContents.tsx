import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { List, ChevronRight, Eye } from 'lucide-react';
import { Heading } from '../../types/blog';

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export function TableOfContents({ headings, className = '' }: TableOfContentsProps) {
  const [activeHeading, setActiveHeading] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0.1,
      }
    );

    // Function to observe headings
    const observeHeadings = () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (element) {
          observer.observe(element);
        }
      });
    };

    // Try to observe immediately
    observeHeadings();

    // Also try after a short delay to ensure content is loaded
    const timeoutId = setTimeout(observeHeadings, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [headings]);

  useEffect(() => {
    // Add IDs to headings in the content
    const addIdsToHeadings = () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.slug);
        if (!element) {
          // Find heading by text content and add ID
          const allHeadings = document.querySelectorAll('h2, h3, h4, h5, h6');
          allHeadings.forEach((h) => {
            if (h.textContent?.trim() === heading.text.trim() && !h.id) {
              h.id = heading.slug;
            }
          });
        }
      });
    };

    // Try to add IDs immediately
    addIdsToHeadings();

    // Also try after a short delay to ensure content is loaded
    const timeoutId = setTimeout(addIdsToHeadings, 100);
    
    return () => clearTimeout(timeoutId);
  }, [headings]);

  const scrollToHeading = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      // Add offset for fixed header
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <Card className={`sticky top-24 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="font-headline text-lg flex items-center gap-2">
          <List className="h-5 w-5 text-primary" />
          فهرس المحتويات
          <Badge variant="secondary" className="text-xs">
            {headings.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <nav className="space-y-1">
          {headings.map((heading, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(heading.slug)}
              className={`w-full text-right flex items-center gap-2 p-2 rounded-md text-sm transition-all duration-200 hover:bg-muted/50 group ${
                activeHeading === heading.slug
                  ? 'bg-primary/10 text-primary font-medium border-r-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              style={{
                paddingRight: `${(heading.level - 2) * 12 + 8}px`,
              }}
            >
              <span className="flex-1 text-right">{heading.text}</span>
              <ChevronRight 
                className={`h-3 w-3 transition-transform group-hover:translate-x-0.5 ${
                  activeHeading === heading.slug ? 'text-primary' : 'text-muted-foreground'
                }`} 
              />
            </button>
          ))}
        </nav>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>انقر على أي عنوان للانتقال إليه</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}