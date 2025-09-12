'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { LoadingSpinner } from './ui/loading-spinner';
import { useContactValidation } from '../hooks/useFormValidation';
import { cn } from '../lib/utils';

interface ContactFormProps {
  onSubmit?: (data: any) => void;
  className?: string;
  title?: string;
  showService?: boolean;
  showCity?: boolean;
}

export default function ContactForm({
  onSubmit,
  className = '',
  title = 'تواصل معنا',
  showService = false,
  showCity = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    city: '',
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
  } = useContactValidation();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validate({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await submit(formData);
    
    if (result.success && result.data) {
      if (onSubmit) {
        onSubmit(result.data);
      } else {
        // Default behavior - show success message
        // Form submitted successfully
      }
    }
  };

  const hasErrors = Object.keys(errors).length > 0;
  const canSubmit = formData.name.trim() && formData.email.trim() && formData.message.trim() && isValid && !isSubmitting;

  return (
    <Card className={cn('w-full max-w-2xl mx-auto', className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              الاسم الكامل *
            </label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="أدخل اسمك الكامل"
              className={cn(
                'text-right',
                errors.name && 'border-destructive focus-visible:ring-destructive'
              )}
              disabled={isSubmitting}
              required
              aria-describedby={errors.name ? 'name-error' : undefined}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              البريد الإلكتروني *
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="example@email.com"
              className={cn(
                'text-right',
                errors.email && 'border-destructive focus-visible:ring-destructive'
              )}
              disabled={isSubmitting}
              required
              aria-describedby={errors.email ? 'email-error' : undefined}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
              رقم الهاتف
            </label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="05xxxxxxxx"
              className={cn(
                'text-right',
                errors.phone && 'border-destructive focus-visible:ring-destructive'
              )}
              disabled={isSubmitting}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              aria-invalid={!!errors.phone}
            />
            {errors.phone && (
              <p id="phone-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Service Field (Optional) */}
          {showService && (
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                نوع الخدمة
              </label>
              <Input
                id="service"
                type="text"
                value={formData.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                placeholder="مثال: تكييف، سباكة"
                className="text-right"
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* City Field (Optional) */}
          {showCity && (
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                المدينة
              </label>
              <Input
                id="city"
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="مثال: الرياض، جدة"
                className="text-right"
                disabled={isSubmitting}
              />
            </div>
          )}

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
              الرسالة *
            </label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className={cn(
                'text-right min-h-[120px] resize-none',
                errors.message && 'border-destructive focus-visible:ring-destructive'
              )}
              disabled={isSubmitting}
              required
              aria-describedby={errors.message ? 'message-error' : undefined}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.message}
              </p>
            )}
          </div>

          {/* General Errors */}
          {errors.general && (
            <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
              <div className="text-sm text-destructive">{errors.general}</div>
            </div>
          )}

          {/* Success Message */}
          {isSubmitted && isValid && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="text-sm text-green-700">
                تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full font-headline"
            disabled={!canSubmit}
            aria-describedby={isSubmitting ? "submit-status" : undefined}
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" className="ml-2" />
                <span id="submit-status" className="sr-only">جاري إرسال الرسالة</span>
                جاري الإرسال...
              </>
            ) : (
              <>
                <Send className="ml-2 h-4 w-4" />
                إرسال الرسالة
              </>
            )}
          </Button>

          {/* Form Help Text */}
          <div className="text-xs text-muted-foreground text-center">
            * الحقول المطلوبة
          </div>
        </form>
      </CardContent>
    </Card>
  );
}