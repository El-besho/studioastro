import React from 'react';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function SkipLink({ href, children, className = '' }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={`skip-link ${className}`}
      onFocus={(e) => {
        // Ensure the target element exists and is focusable
        const target = document.querySelector(href);
        if (target) {
          (target as HTMLElement).focus();
        }
      }}
    >
      {children}
    </a>
  );
}