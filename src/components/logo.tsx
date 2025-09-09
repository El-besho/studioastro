
import Link from 'next/link';
import { House } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 font-headline text-xl font-bold text-primary',
        className
      )}
    >
      <House className="h-6 w-6" />
      <span>إنقاذ</span>
    </Link>
  );
}
