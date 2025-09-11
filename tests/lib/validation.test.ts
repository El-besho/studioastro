import { describe, it, expect } from 'vitest';
import {
  searchSchema,
  contactSchema,
  serviceRequestSchema,
  sanitizeString,
  sanitizeHtml,
  sanitizeUrl,
  validateSearchInput,
  validateContactInput,
  validateServiceRequestInput,
  RateLimiter,
  generateCSRFToken,
  validateCSRFToken,
  ValidationError,
} from '../../src/lib/validation';

describe('Validation Schemas', () => {
  describe('searchSchema', () => {
    it('should validate correct search input', () => {
      const validInput = {
        query: 'تصليح مكيف',
        location: 'الرياض',
        service: 'air-conditioning',
      };

      const result = searchSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject empty query', () => {
      const invalidInput = {
        query: '',
        location: 'الرياض',
      };

      const result = searchSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('البحث مطلوب');
      }
    });

    it('should reject query that is too long', () => {
      const invalidInput = {
        query: 'a'.repeat(101),
      };

      const result = searchSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('البحث طويل جداً');
      }
    });
  });

  describe('contactSchema', () => {
    it('should validate correct contact input', () => {
      const validInput = {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '0501234567',
        message: 'أريد الاستفسار عن خدماتكم',
      };

      const result = contactSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const invalidInput = {
        name: 'أحمد محمد',
        email: 'invalid-email',
        message: 'أريد الاستفسار عن خدماتكم',
      };

      const result = contactSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('البريد الإلكتروني غير صحيح');
      }
    });

    it('should reject invalid phone number', () => {
      const invalidInput = {
        name: 'أحمد محمد',
        email: 'ahmed@example.com',
        phone: '123456789',
        message: 'أريد الاستفسار عن خدماتكم',
      };

      const result = contactSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors[0].message).toBe('رقم الهاتف غير صحيح');
      }
    });
  });

  describe('serviceRequestSchema', () => {
    it('should validate correct service request input', () => {
      const validInput = {
        serviceId: 'air-conditioning-hvac',
        subServiceId: 'ac-repair',
        cityId: 'riyadh',
        name: 'أحمد محمد',
        phone: '0501234567',
        email: 'ahmed@example.com',
        message: 'أحتاج تصليح مكيف',
        urgency: 'high' as const,
      };

      const result = serviceRequestSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const invalidInput = {
        name: 'أحمد محمد',
        phone: '0501234567',
      };

      const result = serviceRequestSchema.safeParse(invalidInput);
      expect(result.success).toBe(false);
      if (!result.success) {
        const errorMessages = result.error.errors.map(err => err.message);
        expect(errorMessages).toContain('Required');
      }
    });
  });
});

describe('Sanitization Functions', () => {
  describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
      const input = '<script>alert("xss")</script>Hello World';
      const result = sanitizeString(input);
      expect(result).toBe('alert("xss")Hello World');
    });

    it('should remove javascript: protocol', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeString(input);
      expect(result).toBe('alert("xss")');
    });

    it('should remove event handlers', () => {
      const input = 'onclick="alert(\'xss\')"Hello';
      const result = sanitizeString(input);
      expect(result).toBe('xss\')"Hello');
    });

    it('should limit string length', () => {
      const input = 'a'.repeat(2000);
      const result = sanitizeString(input);
      expect(result.length).toBe(1000);
    });
  });

  describe('sanitizeHtml', () => {
    it('should remove script tags', () => {
      const input = '<p>Hello</p><script>alert("xss")</script><p>World</p>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Hello</p><p>World</p>');
    });

    it('should remove iframe tags', () => {
      const input = '<p>Hello</p><iframe src="malicious.com"></iframe><p>World</p>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p>Hello</p><p>World</p>');
    });

    it('should remove event handlers', () => {
      const input = '<p onclick="alert(\'xss\')">Hello</p>';
      const result = sanitizeHtml(input);
      expect(result).toBe('<p xss\')">Hello</p>');
    });
  });

  describe('sanitizeUrl', () => {
    it('should allow valid HTTPS URLs', () => {
      const input = 'https://example.com';
      const result = sanitizeUrl(input);
      expect(result).toBe('https://example.com/');
    });

    it('should allow valid HTTP URLs', () => {
      const input = 'http://example.com';
      const result = sanitizeUrl(input);
      expect(result).toBe('http://example.com/');
    });

    it('should reject javascript: URLs', () => {
      const input = 'javascript:alert("xss")';
      const result = sanitizeUrl(input);
      expect(result).toBe('');
    });

    it('should reject localhost URLs', () => {
      const input = 'http://localhost:3000';
      const result = sanitizeUrl(input);
      expect(result).toBe('');
    });

    it('should reject invalid URLs', () => {
      const input = 'not-a-url';
      const result = sanitizeUrl(input);
      expect(result).toBe('');
    });
  });
});

describe('Validation Helper Functions', () => {
  it('should validate search input correctly', () => {
    const validInput = { query: 'تصليح مكيف' };
    const result = validateSearchInput(validInput);
    expect(result.success).toBe(true);
  });

  it('should validate contact input correctly', () => {
    const validInput = {
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      message: 'أريد الاستفسار عن خدماتكم',
    };
    const result = validateContactInput(validInput);
    expect(result.success).toBe(true);
  });

  it('should validate service request input correctly', () => {
    const validInput = {
      serviceId: 'air-conditioning-hvac',
      cityId: 'riyadh',
      name: 'أحمد محمد',
      phone: '0501234567',
    };
    const result = validateServiceRequestInput(validInput);
    expect(result.success).toBe(true);
  });
});

describe('RateLimiter', () => {
  it('should allow requests within limit', () => {
    const limiter = new RateLimiter(1000, 5); // 5 requests per second
    const identifier = 'test-user';

    for (let i = 0; i < 5; i++) {
      expect(limiter.isAllowed(identifier)).toBe(true);
    }
  });

  it('should block requests exceeding limit', () => {
    const limiter = new RateLimiter(1000, 5); // 5 requests per second
    const identifier = 'test-user';

    // Make 5 requests (should all be allowed)
    for (let i = 0; i < 5; i++) {
      expect(limiter.isAllowed(identifier)).toBe(true);
    }

    // 6th request should be blocked
    expect(limiter.isAllowed(identifier)).toBe(false);
  });

  it('should reset after time window', async () => {
    const limiter = new RateLimiter(100, 2); // 2 requests per 100ms
    const identifier = 'test-user';

    // Make 2 requests
    expect(limiter.isAllowed(identifier)).toBe(true);
    expect(limiter.isAllowed(identifier)).toBe(true);

    // 3rd request should be blocked
    expect(limiter.isAllowed(identifier)).toBe(false);

    // Wait for time window to reset
    await new Promise(resolve => setTimeout(resolve, 150));

    // Should be allowed again
    expect(limiter.isAllowed(identifier)).toBe(true);
  });

  it('should track remaining requests correctly', () => {
    const limiter = new RateLimiter(1000, 5);
    const identifier = 'test-user';

    expect(limiter.getRemainingRequests(identifier)).toBe(5);

    limiter.isAllowed(identifier);
    expect(limiter.getRemainingRequests(identifier)).toBe(4);

    limiter.isAllowed(identifier);
    expect(limiter.getRemainingRequests(identifier)).toBe(3);
  });
});

describe('CSRF Protection', () => {
  it('should generate valid CSRF tokens', () => {
    const token1 = generateCSRFToken();
    const token2 = generateCSRFToken();

    expect(token1).toMatch(/^[a-f0-9]{64}$/);
    expect(token2).toMatch(/^[a-f0-9]{64}$/);
    expect(token1).not.toBe(token2);
  });

  it('should validate matching CSRF tokens', () => {
    const token = generateCSRFToken();
    expect(validateCSRFToken(token, token)).toBe(true);
  });

  it('should reject non-matching CSRF tokens', () => {
    const token1 = generateCSRFToken();
    const token2 = generateCSRFToken();
    expect(validateCSRFToken(token1, token2)).toBe(false);
  });

  it('should reject empty tokens', () => {
    expect(validateCSRFToken('', '')).toBe(false);
    expect(validateCSRFToken('token', '')).toBe(false);
    expect(validateCSRFToken('', 'token')).toBe(false);
  });
});

describe('ValidationError', () => {
  it('should create validation error with correct properties', () => {
    const errors = [
      { field: 'email', message: 'Invalid email', code: 'invalid_string' },
      { field: 'name', message: 'Name is required', code: 'too_small' },
    ];

    const error = new ValidationError('Validation failed', errors);

    expect(error.name).toBe('ValidationError');
    expect(error.message).toBe('Validation failed');
    expect(error.errors).toEqual(errors);
  });
});