
'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Heading } from '@/types/blog';

interface TableOfContentsProps {
  headings: Heading[];
}

function useTocObserver() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const headingElementsRef = useRef<{[id: string]: IntersectionObserverEntry}>({});

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        headingElementsRef.current[entry.target.id] = entry;
      });

      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) {
            visibleHeadings.push(headingElement);
        }
      });
      
      const getIndexFromId = (id: string) =>
        Object.keys(headingElementsRef.current).findIndex((heading) => heading === id);

      if (visibleHeadings.length > 0) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-20% 0px -70% 0px',
    });

    const elements = document.querySelectorAll('h2, h3');
    elements.forEach((elem) => observer.current?.observe(elem));

    return () => observer.current?.disconnect();
  }, []);

  return activeId;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const activeId = useTocObserver();

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="font-headline text-lg font-semibold">في هذه المقالة</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.slug} className={cn(
            'border-r-2 pr-4',
            heading.level === 3 ? 'mr-4' : '',
            heading.slug === activeId ? 'border-primary' : 'border-transparent'
          )}>
            <a
              href={`#${heading.slug}`}
              className={cn(
                'text-sm text-muted-foreground hover:text-foreground transition-colors',
                heading.slug === activeId ? 'font-medium text-primary' : ''
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
