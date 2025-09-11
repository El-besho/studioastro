import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useFormValidation, useSearchValidation, useContactValidation } from '../../src/hooks/useFormValidation';
import { validateSearchInput, validateContactInput } from '../../src/lib/validation';

// Mock the validation functions
vi.mock('../../src/lib/validation', () => ({
  validateSearchInput: vi.fn(),
  validateContactInput: vi.fn(),
  validateServiceRequestInput: vi.fn(),
  sanitizeString: vi.fn((input) => input),
  sanitizeHtml: vi.fn((input) => input),
  RateLimiter: vi.fn().mockImplementation(() => ({
    isAllowed: vi.fn(() => true),
  })),
}));

describe('useFormValidation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    const mockValidation = vi.fn(() => ({ success: false, error: { errors: [] } }));
    
    const { result } = renderHook(() => useFormValidation(mockValidation));
    
    expect(result.current.data).toBeNull();
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSubmitted).toBe(false);
  });

  it('should validate input correctly', async () => {
    const mockValidation = vi.fn(() => ({ 
      success: true, 
      data: { query: 'test search' } 
    }));
    
    const { result } = renderHook(() => useFormValidation(mockValidation));
    
    await act(async () => {
      result.current.validate({ query: 'test search' });
    });
    
    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 400));
    
    expect(result.current.isValid).toBe(true);
    expect(result.current.data).toEqual({ query: 'test search' });
    expect(result.current.errors).toEqual({});
  });

  it('should handle validation errors', async () => {
    const mockValidation = vi.fn(() => ({ 
      success: false, 
      error: { 
        errors: [
          { field: 'query', message: 'البحث مطلوب' }
        ]
      }
    }));
    
    const { result } = renderHook(() => useFormValidation(mockValidation));
    
    await act(async () => {
      result.current.validate({ query: '' });
    });
    
    // Wait for debounce
    await new Promise(resolve => setTimeout(resolve, 400));
    
    expect(result.current.isValid).toBe(false);
    expect(result.current.errors).toEqual({ query: 'البحث مطلوب' });
  });

  it('should submit form successfully', async () => {
    const mockValidation = vi.fn(() => ({ 
      success: true, 
      data: { query: 'test search' } 
    }));
    
    const { result } = renderHook(() => useFormValidation(mockValidation));
    
    await act(async () => {
      const submitResult = await result.current.submit({ query: 'test search' });
      expect(submitResult.success).toBe(true);
      expect(submitResult.data).toEqual({ query: 'test search' });
    });
    
    expect(result.current.isSubmitted).toBe(true);
    expect(result.current.isValid).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
  });

  it('should handle submit errors', async () => {
    const mockValidation = vi.fn(() => ({ 
      success: false, 
      error: { 
        errors: [
          { field: 'query', message: 'البحث مطلوب' }
        ]
      }
    }));
    
    const { result } = renderHook(() => useFormValidation(mockValidation));
    
    await act(async () => {
      const submitResult = await result.current.submit({ query: '' });
      expect(submitResult.success).toBe(false);
      expect(submitResult.error).toBe('البحث مطلوب');
    });
    
    expect(result.current.isSubmitted).toBe(false);
    expect(result.current.isValid).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.errors).toEqual({ query: 'البحث مطلوب' });
  });

  it('should reset form state', async () => {
    const mockValidation = vi.fn(() => ({ 
      success: true, 
      data: { query: 'test search' } 
    }));
    
    const { result } = renderHook(() => useFormValidation(mockValidation));
    
    // First, set some state
    await act(async () => {
      await result.current.submit({ query: 'test search' });
    });
    
    expect(result.current.isSubmitted).toBe(true);
    
    // Then reset
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.data).toBeNull();
    expect(result.current.errors).toEqual({});
    expect(result.current.isValid).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isSubmitted).toBe(false);
  });

  it('should clear errors', async () => {
    const mockValidation = vi.fn(() => ({ 
      success: false, 
      error: { 
        errors: [
          { field: 'query', message: 'البحث مطلوب' }
        ]
      }
    }));
    
    const { result } = renderHook(() => useFormValidation(mockValidation));
    
    // First, create some errors
    await act(async () => {
      result.current.validate({ query: '' });
    });
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    expect(result.current.errors).toEqual({ query: 'البحث مطلوب' });
    
    // Then clear errors
    act(() => {
      result.current.clearErrors();
    });
    
    expect(result.current.errors).toEqual({});
  });
});

describe('useSearchValidation', () => {
  it('should use search validation function', () => {
    const { result } = renderHook(() => useSearchValidation());
    
    expect(result.current).toBeDefined();
    expect(typeof result.current.validate).toBe('function');
    expect(typeof result.current.submit).toBe('function');
  });
});

describe('useContactValidation', () => {
  it('should use contact validation function', () => {
    const { result } = renderHook(() => useContactValidation());
    
    expect(result.current).toBeDefined();
    expect(typeof result.current.validate).toBe('function');
    expect(typeof result.current.submit).toBe('function');
  });
});