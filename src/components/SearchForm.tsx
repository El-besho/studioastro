import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search } from 'lucide-react';

export default function SearchForm() {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    window.location.href = `/search?${searchParams.toString()}`;
  };

  return (
    <form onSubmit={handleSearch} className="flex flex-row-reverse items-center gap-2 rounded-xl bg-card p-2 border shadow-lg">
      <div className="relative w-full flex-1">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ما الخدمة التي تحتاجها؟ (مثال: تصليح مكيف في الرياض)"
          className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-right pr-10"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto font-headline">
        ابحث الآن
      </Button>
    </form>
  );
}