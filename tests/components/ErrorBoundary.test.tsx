import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils/test-utils';
import { ErrorBoundary } from '../../src/components/ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('should render error UI when there is an error', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('حدث خطأ غير متوقع')).toBeInTheDocument();
    expect(screen.getByText('نعتذر عن هذا الخطأ. يرجى إعادة تحميل الصفحة أو المحاولة مرة أخرى.')).toBeInTheDocument();
    expect(screen.getByText('المحاولة مرة أخرى')).toBeInTheDocument();
    expect(screen.getByText('إعادة تحميل الصفحة')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('should call resetError when retry button is clicked', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    // Initially should show error
    expect(screen.getByText('حدث خطأ غير متوقع')).toBeInTheDocument();
    
    const retryButton = screen.getByText('المحاولة مرة أخرى');
    retryButton.click();
    
    // Re-render with no error to test reset functionality
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );
    
    // After clicking retry and re-rendering, children should render
    expect(screen.getByText('No error')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });

  it('should use custom fallback component when provided', () => {
    const CustomFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
      <div>
        <p>Custom error: {error.message}</p>
        <button onClick={resetError}>Custom retry</button>
      </div>
    );

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );
    
    expect(screen.getByText('Custom error: Test error')).toBeInTheDocument();
    expect(screen.getByText('Custom retry')).toBeInTheDocument();
    
    consoleSpy.mockRestore();
  });
});