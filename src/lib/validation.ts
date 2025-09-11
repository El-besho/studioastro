import { z } from 'zod';

// Common validation schemas
export const searchSchema = z.object({
  query: z.string()
    .min(1, 'البحث مطلوب')
    .max(100, 'البحث طويل جداً')
    .trim()
    .refine((val) => val.length > 0, 'البحث لا يمكن أن يكون فارغاً'),
  location: z.string().optional(),
  service: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم طويل جداً')
    .trim()
    .regex(/^[\u0600-\u06FF\s]+$/, 'الاسم يجب أن يحتوي على أحرف عربية فقط'),
  email: z.string()
    .email('البريد الإلكتروني غير صحيح')
    .max(100, 'البريد الإلكتروني طويل جداً'),
  phone: z.string()
    .regex(/^(\+966|966|0)?[5-9][0-9]{8}$/, 'رقم الهاتف غير صحيح')
    .optional(),
  message: z.string()
    .min(10, 'الرسالة يجب أن تكون على الأقل 10 أحرف')
    .max(1000, 'الرسالة طويلة جداً')
    .trim(),
  service: z.string().optional(),
  city: z.string().optional(),
});

export const serviceRequestSchema = z.object({
  serviceId: z.string().min(1, 'معرف الخدمة مطلوب'),
  subServiceId: z.string().optional(),
  cityId: z.string().min(1, 'المدينة مطلوبة'),
  name: z.string()
    .min(2, 'الاسم يجب أن يكون على الأقل حرفين')
    .max(50, 'الاسم طويل جداً')
    .trim(),
  phone: z.string()
    .regex(/^(\+966|966|0)?[5-9][0-9]{8}$/, 'رقم الهاتف غير صحيح'),
  email: z.string()
    .email('البريد الإلكتروني غير صحيح')
    .optional(),
  message: z.string()
    .max(500, 'الرسالة طويلة جداً')
    .trim()
    .optional(),
  urgency: z.enum(['low', 'medium', 'high']).default('medium'),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
});

// Sanitization functions
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/on\w+\s*=\s*[^"'\s>]+/gi, '') // Remove event handlers without quotes
    .substring(0, 1000); // Limit length
}

export function sanitizeHtml(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers
    .replace(/on\w+\s*=\s*[^"'\s>]+/gi, '') // Remove event handlers without quotes
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/data:/gi, '') // Remove data: protocol
    .trim();
}

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new Error('Invalid protocol');
    }
    
    // Block potentially dangerous domains
    const blockedDomains = ['localhost', '127.0.0.1', '0.0.0.0'];
    if (blockedDomains.includes(parsedUrl.hostname)) {
      throw new Error('Blocked domain');
    }
    
    return parsedUrl.toString();
  } catch {
    return '';
  }
}

// Validation helper functions
export function validateSearchInput(input: unknown) {
  return searchSchema.safeParse(input);
}

export function validateContactInput(input: unknown) {
  return contactSchema.safeParse(input);
}

export function validateServiceRequestInput(input: unknown) {
  return serviceRequestSchema.safeParse(input);
}

// Rate limiting helper
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    // Add current request
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }

  getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxRequests - validRequests.length);
  }

  getResetTime(identifier: string): number {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length === 0) {
      return now;
    }
    
    return Math.min(...validRequests) + this.windowMs;
  }
}

// Create rate limiter instances
export const searchRateLimiter = new RateLimiter(60000, 20); // 20 requests per minute
export const contactRateLimiter = new RateLimiter(300000, 5); // 5 requests per 5 minutes
export const serviceRequestRateLimiter = new RateLimiter(300000, 3); // 3 requests per 5 minutes

// CSRF protection helper
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function validateCSRFToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) {
    return false;
  }
  
  // Use constant-time comparison to prevent timing attacks
  if (token.length !== sessionToken.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ sessionToken.charCodeAt(i);
  }
  
  return result === 0;
}

// Input validation middleware
export function createValidationMiddleware<T>(schema: z.ZodSchema<T>) {
  return (input: unknown) => {
    const result = schema.safeParse(input);
    
    if (!result.success) {
      const errors = result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code,
      }));
      
      throw new ValidationError('Validation failed', errors);
    }
    
    return result.data;
  };
}

// Custom error class
export class ValidationError extends Error {
  public errors: Array<{
    field: string;
    message: string;
    code: string;
  }>;

  constructor(message: string, errors: Array<{ field: string; message: string; code: string }>) {
    super(message);
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

// Export types
export type SearchInput = z.infer<typeof searchSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;