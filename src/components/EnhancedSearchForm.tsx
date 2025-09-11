'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from './ui/loading-spinner';
import { useSearchValidation } from '../hooks/useFormValidation';
import { cn } from '../lib/utils';

interface EnhancedSearchFormProps {
  onSubmit?: (data: { query: string; location?: string; service?: string }) => void;
  className?: string;
  placeholder?: string;
  showLocation?: boolean;
  showService?: boolean;
}

export default function EnhancedSearchForm({
  onSubmit,
  className = '',
  placeholder = 'ما الخدمة التي تحتاجها؟ (مثال: تصليح مكيف في الرياض)',
  showLocation = false,
  showService = false,
}: EnhancedSearchFormProps) {
  const [formData, setFormData] = useState({
    query: '',
    location: '',
    service: '',
  });

  const {
    data: validatedData,
    errors,
    isValid,
    isSubmitting,
    isSubmitted,
    validate,
    submit,
    reset,
    clearErrors,
  } = useSearchValidation();

  // Validate form data when it changes
  useEffect(() => {
    if (formData.query.trim()) {
      validate(formData);
    } else {
      clearErrors();
    }
  }, [formData, validate, clearErrors]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.query.trim()) return;

    const result = await submit(formData);
    
    if (result.success && result.data) {
      if (onSubmit) {
        onSubmit(result.data);
      } else {
        // Default behavior - redirect to search page
        const searchParams = new URLSearchParams();
        searchParams.set('q', result.data.query);
        if (result.data.location) searchParams.set('location', result.data.location);
        if (result.data.service) searchParams.set('service', result.data.service);
        
        window.location.href = `/search?${searchParams.toString()}`;
      }
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const canSubmit = formData.query.trim() && isValid && !isSubmitting;

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        'group relative flex flex-col gap-4 rounded-xl bg-card/80 backdrop-blur-sm p-4 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/20',
        className
      )}
      role="search"
      aria-label="البحث عن الخدمات"
    >
      {/* Main Search Input */}
      <div className="relative">
        <Search 
          className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors duration-200" 
          aria-hidden="true"
        />
        <label htmlFor="search-input" className="sr-only">
          البحث عن الخدمات
        </label>
        <Input
          id="search-input"
          type="search"
          value={formData.query}
          onChange={(e) => handleInputChange('query', e.target.value)}
          placeholder={placeholder}
          variant="enhanced"
          className={cn(
            'w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base text-right pr-10 bg-transparent placeholder:text-muted-foreground/70 focus:placeholder:text-muted-foreground/50',
            hasErrors && 'border-destructive focus-visible:ring-destructive'
          )}
          disabled={isSubmitting}
          required
          aria-describedby="search-help search-errors"
          aria-invalid={hasErrors}
        />
        <div id="search-help" className="sr-only">
          اكتب اسم الخدمة أو المدينة للبحث عن مزودي الخدمات
        </div>
      </div>

      {/* Additional Fields */}
      {(showLocation || showService) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {showLocation && (
            <div>
              <label htmlFor="location-input" className="block text-sm font-medium text-foreground mb-1">
                المدينة (اختياري)
              </label>
              <Input
                id="location-input"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="مثال: الرياض، جدة"
                className="text-right"
                disabled={isSubmitting}
              />
            </div>
          )}
          
          {showService && (
            <div>
              <label htmlFor="service-input" className="block text-sm font-medium text-foreground mb-1">
                نوع الخدمة (اختياري)
              </label>
              <Input
                id="service-input"
                type="text"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                placeholder="مثال: تكييف، سباكة"
                className="text-right"
                disabled={isSubmitting}
              />
            </div>
          )}
        </div>
      )}

      {/* Error Messages */}
      {hasErrors && (
        <div id="search-errors" className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
          <div className="text-sm text-destructive">
            {Object.values(errors).map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
        </div>
      )}

      {/* Success Message */}
      {isSubmitted && isValid && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="h-4 w-4 text-green-600">✓</div>
          <div className="text-sm text-green-700">
            تم التحقق من البيانات بنجاح
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button 
        type="submit" 
        className="w-full sm:w-auto font-headline min-w-[120px] btn-hover-lift relative overflow-hidden self-end"
        disabled={!canSubmit}
        aria-describedby={isSubmitting ? "search-status" : undefined}
      >
        {isSubmitting ? (
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

      {/* Rate Limit Info */}
      {!canSubmit && formData.query.trim() && (
        <div className="text-xs text-muted-foreground text-center">
          يرجى إدخال استعلام بحث صحيح
        </div>
      )}
    </form>
  );
}