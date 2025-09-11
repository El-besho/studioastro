import { test, expect } from '@playwright/test';

test.describe('Basic Functionality', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/إنقاذ/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check if navigation is present
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Check for service links
    const serviceLinks = page.locator('a[href*="/services/"]');
    await expect(serviceLinks.first()).toBeVisible();
  });

  test('should have working search functionality', async ({ page }) => {
    await page.goto('/');
    
    // Find search form
    const searchForm = page.locator('form[role="search"]');
    await expect(searchForm).toBeVisible();
    
    // Test search input
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    
    // Type in search
    await searchInput.fill('تصليح مكيف');
    
    // Check if search button is enabled
    const searchButton = page.locator('button[type="submit"]');
    await expect(searchButton).toBeEnabled();
  });

  test('should load service pages', async ({ page }) => {
    await page.goto('/services/air-conditioning-hvac');
    
    // Check if service page loads
    await expect(page.locator('h1')).toContainText('تكييف');
  });

  test('should have working WhatsApp button', async ({ page }) => {
    await page.goto('/');
    
    // Check for WhatsApp button
    const whatsappButton = page.locator('button').filter({ hasText: /WhatsApp|واتساب/ });
    await expect(whatsappButton.first()).toBeVisible();
  });
});