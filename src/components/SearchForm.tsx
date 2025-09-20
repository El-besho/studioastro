import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from './ui/loading-spinner';

export default function SearchForm() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount for better UX
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!query.trim()) {
      setError('يرجى إدخال كلمة البحث');
      inputRef.current?.focus();
      return;
    }
    
    if (query.trim().length < 2) {
      setError('يرجى إدخال كلمة بحث أطول من حرفين');
      inputRef.current?.focus();
      return;
    }
    
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    searchParams.set('q', query.trim());
    
    // Add a small delay for better UX
    setTimeout(() => {
      window.location.href = `/search?${searchParams.toString()}`;
    }, 300);
  };

  return (
    <div className="w-full space-y-2">
      <form 
        onSubmit={handleSearch} 
        className={`group relative flex flex-row-reverse items-center gap-2 rounded-xl bg-card/80 backdrop-blur-sm p-2 border transition-all duration-300 ${
          error 
            ? 'border-destructive shadow-lg shadow-destructive/10' 
            : isFocused 
              ? 'border-primary/50 shadow-lg shadow-primary/10' 
              : 'border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20'
        }`}
        role="search"
        aria-label="البحث عن الخدمات"
        noValidate
      >
        <div className="relative w-full flex-1">
          <Search 
            className={`absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors duration-200 ${
              error 
                ? 'text-destructive' 
                : isFocused 
                  ? 'text-primary' 
                  : 'text-muted-foreground group-focus-within:text-primary'
            }`}
            aria-hidden="true"
          />
          <label htmlFor="search-input" className="sr-only">
            البحث عن الخدمات
          </label>
          <Input
            ref={inputRef}
            id="search-input"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (error) setError('');
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="ما الخدمة التي تحتاجها؟ (مثال: تصليح مكيف في الرياض)"
            variant="enhanced"
            className={`w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-right pr-10 bg-transparent transition-all duration-200 ${
              error 
                ? 'placeholder:text-destructive/70' 
                : 'placeholder:text-muted-foreground/70 focus:placeholder:text-muted-foreground/50'
            }`}
            disabled={isLoading}
            required
            aria-describedby={error ? "search-error" : "search-help"}
            aria-invalid={!!error}
            autoComplete="off"
            spellCheck="false"
          />
          <div id="search-help" className="sr-only">
            اكتب اسم الخدمة أو المدينة للبحث عن مزودي الخدمات. يجب أن تكون كلمة البحث أطول من حرفين.
          </div>
          {error && (
            <div id="search-error" className="sr-only" role="alert">
              {error}
            </div>
          )}
        </div>
        <Button 
          type="submit" 
          className="w-full sm:w-auto font-headline min-w-[120px] btn-hover-lift relative overflow-hidden touch-target"
          disabled={isLoading || !query.trim()}
          aria-describedby={isLoading ? "search-status" : undefined}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="ml-2" />
              <span id="search-status" className="sr-only">جاري البحث عن الخدمات</span>
              جاري البحث...
            </>
          ) : (
            <>
              <Search className="ml-2 h-4 w-4" aria-hidden="true" />
              ابحث الآن
            </>
          )}
        </Button>
      </form>
      
      {/* Error Message */}
      {error && (
        <div 
          className="flex items-center gap-2 text-sm text-destructive animate-fade-in"
          role="alert"
          aria-live="polite"
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {/* Search Tips */}
      {!error && query.length > 0 && query.length < 2 && (
        <div className="text-xs text-muted-foreground animate-fade-in">
          💡 نصيحة: اكتب كلمة بحث أطول للحصول على نتائج أفضل
        </div>
      )}
    </div>
  );
}