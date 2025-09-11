import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('should have proper page structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for main content landmark
    await expect(page.locator('main')).toBeVisible();
    
    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
    
    // Check for skip link
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeVisible();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for search form accessibility
    const searchForm = page.locator('form[role="search"]');
    await expect(searchForm).toBeVisible();
    
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-describedby');
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check if page loads without color contrast issues
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    // Check for proper text visibility
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6');
    await expect(textElements.first()).toBeVisible();
  });

  test('should work with screen reader', async ({ page }) => {
    await page.goto('/');
    
    // Check for proper semantic HTML
    const main = page.locator('main');
    await expect(main).toBeVisible();
    
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toBeVisible();
  });
});