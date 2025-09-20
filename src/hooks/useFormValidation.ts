import { useState, useCallback, useRef } from 'react';
import { 
  validateSearchInput, 
  validateContactInput, 
  validateServiceRequestInput,
  sanitizeString,
  sanitizeHtml,
  RateLimiter,
  type SearchInput,
  type ContactInput,
  type ServiceRequestInput
} from '../lib/validation';

interface ValidationState<T> {
  data: T | null;
  errors: Record<string, string>;
  isValid: boolean;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isDirty: boolean;
  touched: Record<string, boolean>;
  fieldStates: Record<string, 'idle' | 'validating' | 'valid' | 'invalid'>;
}

interface UseFormValidationOptions {
  rateLimiter?: RateLimiter;
  sanitizeInput?: boolean;
  debounceMs?: number;
}

export function useFormValidation<T extends SearchInput | ContactInput | ServiceRequestInput>(
  validationFn: (input: unknown) => { success: boolean; data?: T; error?: any },
  options: UseFormValidationOptions = {}
) {
  const {
    rateLimiter,
    sanitizeInput = true,
    debounceMs = 300
  } = options;

  const [state, setState] = useState<ValidationState<T>>({
    data: null,
    errors: {},
    isValid: false,
    isSubmitting: false,
    isSubmitted: false,
    isDirty: false,
    touched: {},
    fieldStates: {},
  });

  const debounceTimeoutRef = useRef<NodeJS.Timeout>();
  const lastValidationRef = useRef<unknown>();

  const sanitizeData = useCallback((data: any): any => {
    if (!sanitizeInput) return data;

    const sanitized = { ...data };
    
    // Sanitize string fields
    Object.keys(sanitized).forEach(key => {
      if (typeof sanitized[key] === 'string') {
        if (key === 'message' || key === 'description') {
          sanitized[key] = sanitizeHtml(sanitized[key]);
        } else {
          sanitized[key] = sanitizeString(sanitized[key]);
        }
      }
    });

    return sanitized;
  }, [sanitizeInput]);

  const validate = useCallback((input: unknown) => {
    // Clear previous debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce validation
    debounceTimeoutRef.current = setTimeout(() => {
      try {
        const sanitizedInput = sanitizeData(input);
        const result = validationFn(sanitizedInput);

        if (result.success && result.data) {
          setState(prev => ({
            ...prev,
            data: result.data!,
            errors: {},
            isValid: true,
          }));
        } else if (result.error) {
          const errors: Record<string, string> = {};
          
          if (result.error.errors) {
            result.error.errors.forEach((err: any) => {
              errors[err.field] = err.message;
            });
          }

          setState(prev => ({
            ...prev,
            data: null,
            errors,
            isValid: false,
          }));
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          data: null,
          errors: { general: 'حدث خطأ في التحقق من البيانات' },
          isValid: false,
        }));
      }
    }, debounceMs);

    lastValidationRef.current = input;
  }, [validationFn, sanitizeData, debounceMs]);

  const submit = useCallback(async (input: unknown): Promise<{ success: boolean; data?: T; error?: string }> => {
    if (rateLimiter) {
      const identifier = 'form-submission'; // In real app, use user ID or IP
      if (!rateLimiter.isAllowed(identifier)) {
        return {
          success: false,
          error: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.',
        };
      }
    }

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      const sanitizedInput = sanitizeData(input);
      const result = validationFn(sanitizedInput);

      if (result.success && result.data) {
        setState(prev => ({
          ...prev,
          data: result.data!,
          errors: {},
          isValid: true,
          isSubmitting: false,
          isSubmitted: true,
        }));

        return { success: true, data: result.data };
      } else {
        const errors: Record<string, string> = {};
        
        if (result.error?.errors) {
          result.error.errors.forEach((err: any) => {
            errors[err.field] = err.message;
          });
        }

        setState(prev => ({
          ...prev,
          data: null,
          errors,
          isValid: false,
          isSubmitting: false,
        }));

        return { 
          success: false, 
          error: Object.values(errors)[0] || 'البيانات المدخلة غير صحيحة' 
        };
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        data: null,
        errors: { general: 'حدث خطأ في التحقق من البيانات' },
        isValid: false,
        isSubmitting: false,
      }));

      return { 
        success: false, 
        error: 'حدث خطأ في التحقق من البيانات' 
      };
    }
  }, [validationFn, sanitizeData, rateLimiter]);

  const reset = useCallback(() => {
    setState({
      data: null,
      errors: {},
      isValid: false,
      isSubmitting: false,
      isSubmitted: false,
    });

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  const clearErrors = useCallback(() => {
    setState(prev => ({ ...prev, errors: {} }));
  }, []);

  const setFieldTouched = useCallback((fieldName: string, touched: boolean = true) => {
    setState(prev => ({
      ...prev,
      touched: { ...prev.touched, [fieldName]: touched }
    }));
  }, []);

  const setFieldState = useCallback((fieldName: string, fieldState: 'idle' | 'validating' | 'valid' | 'invalid') => {
    setState(prev => ({
      ...prev,
      fieldStates: { ...prev.fieldStates, [fieldName]: fieldState }
    }));
  }, []);

  const validateField = useCallback((fieldName: string, value: any) => {
    setFieldState(fieldName, 'validating');
    
    // Debounced field validation
    setTimeout(() => {
      try {
        const sanitizedValue = sanitizeInput ? sanitizeString(value) : value;
        const result = validationFn({ [fieldName]: sanitizedValue });
        
        if (result.success) {
          setFieldState(fieldName, 'valid');
          setState(prev => ({
            ...prev,
            errors: { ...prev.errors, [fieldName]: '' }
          }));
        } else {
          setFieldState(fieldName, 'invalid');
          const error = result.error?.errors?.find((err: any) => err.field === fieldName);
          if (error) {
            setState(prev => ({
              ...prev,
              errors: { ...prev.errors, [fieldName]: error.message }
            }));
          }
        }
      } catch (error) {
        setFieldState(fieldName, 'invalid');
        setState(prev => ({
          ...prev,
          errors: { ...prev.errors, [fieldName]: 'خطأ في التحقق من الحقل' }
        }));
      }
    }, debounceMs);
  }, [validationFn, sanitizeInput, debounceMs, setFieldState]);

  const getFieldError = useCallback((fieldName: string) => {
    return state.errors[fieldName] || '';
  }, [state.errors]);

  const isFieldValid = useCallback((fieldName: string) => {
    return state.fieldStates[fieldName] === 'valid';
  }, [state.fieldStates]);

  const isFieldInvalid = useCallback((fieldName: string) => {
    return state.fieldStates[fieldName] === 'invalid';
  }, [state.fieldStates]);

  const isFieldTouched = useCallback((fieldName: string) => {
    return state.touched[fieldName] || false;
  }, [state.touched]);

  return {
    ...state,
    validate,
    submit,
    reset,
    clearErrors,
    setFieldTouched,
    setFieldState,
    validateField,
    getFieldError,
    isFieldValid,
    isFieldInvalid,
    isFieldTouched,
  };
}

// Specialized hooks for different form types
export function useSearchValidation() {
  return useFormValidation(validateSearchInput, {
    rateLimiter: new RateLimiter(60000, 20), // 20 requests per minute
    debounceMs: 500,
  });
}

export function useContactValidation() {
  return useFormValidation(validateContactInput, {
    rateLimiter: new RateLimiter(300000, 5), // 5 requests per 5 minutes
    debounceMs: 300,
  });
}

export function useServiceRequestValidation() {
  return useFormValidation(validateServiceRequestInput, {
    rateLimiter: new RateLimiter(300000, 3), // 3 requests per 5 minutes
    debounceMs: 300,
  });
}