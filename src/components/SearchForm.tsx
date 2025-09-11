import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Loader2 } from 'lucide-react';
import { LoadingSpinner } from './ui/loading-spinner';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    searchParams.set('q', query.trim());
    
    // Add a small delay for better UX
    setTimeout(() => {
      window.location.href = `/search?${searchParams.toString()}`;
    }, 300);
  };

  return (
    <form onSubmit={handleSearch} className="group relative flex flex-row-reverse items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm p-2 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20">
      <div className="relative w-full flex-1">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ما الخدمة التي تحتاجها؟ (مثال: تصليح مكيف في الرياض)"
          variant="enhanced"
          className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-right pr-10 bg-transparent placeholder:text-muted-foreground/70 focus:placeholder:text-muted-foreground/50"
          disabled={isLoading}
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full sm:w-auto font-headline min-w-[120px] btn-hover-lift relative overflow-hidden"
        disabled={isLoading || !query.trim()}
      >
        {isLoading ? (
          <>
            <LoadingSpinner size="sm" className="ml-2" />
            جاري البحث...
          </>
        ) : (
          <>
            <Search className="ml-2 h-4 w-4" />
            ابحث الآن
          </>
        )}
      </Button>
    </form>
  );
}