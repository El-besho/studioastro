import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import userEvent from '@testing-library/user-event';
import SearchForm from '../../src/components/SearchForm';

// Mock window.location
const mockLocation = {
  href: '',
};
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('SearchForm', () => {
  it('should render search form with proper accessibility attributes', () => {
    render(<SearchForm />);
    
    const form = screen.getByRole('search');
    expect(form).toHaveAttribute('aria-label', 'البحث عن الخدمات');
    
    const input = screen.getByRole('searchbox');
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('aria-describedby', 'search-help');
    expect(input).toHaveAttribute('required');
    
    const helpText = screen.getByText(/اكتب اسم الخدمة أو المدينة للبحث عن مزودي الخدمات/);
    expect(helpText).toHaveClass('sr-only');
    
    const button = screen.getByRole('button', { name: /ابحث الآن/i });
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should handle form submission correctly', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /ابحث الآن/i });
    
    await user.type(input, 'تصليح مكيف');
    expect(button).not.toBeDisabled();
    
    await user.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('جاري البحث...')).toBeInTheDocument();
    });
  });

  it('should disable submit button when input is empty', () => {
    render(<SearchForm />);
    
    const button = screen.getByRole('button', { name: /ابحث الآن/i });
    expect(button).toBeDisabled();
  });

  it('should show loading state with proper accessibility', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /ابحث الآن/i });
    
    await user.type(input, 'تصليح مكيف');
    await user.click(button);
    
    await waitFor(() => {
      const loadingButton = screen.getByRole('button');
      expect(loadingButton).toHaveAttribute('aria-describedby', 'search-status');
      expect(screen.getByText('جاري البحث عن الخدمات')).toHaveClass('sr-only');
    });
  });

  it('should validate input and show aria-invalid when needed', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    
    const input = screen.getByRole('searchbox');
    
    // Type only spaces - button should be disabled
    await user.type(input, '   ');
    const button = screen.getByRole('button', { name: /ابحث الآن/i });
    expect(button).toBeDisabled();
    
    // Clear and type valid input
    await user.clear(input);
    await user.type(input, 'تصليح مكيف');
    expect(button).not.toBeDisabled();
    expect(input).toHaveAttribute('aria-invalid', 'false');
    
    // Test with empty input
    await user.clear(input);
    expect(button).toBeDisabled();
  });

  it('should have proper keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<SearchForm />);
    
    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: /ابحث الآن/i });
    
    // Focus should start on input
    input.focus();
    expect(input).toHaveFocus();
    
    // Type some text to enable the button
    await user.type(input, 'تصليح مكيف');
    
    // Tab should move to button (now enabled)
    await user.tab();
    expect(button).toHaveFocus();
  });
});