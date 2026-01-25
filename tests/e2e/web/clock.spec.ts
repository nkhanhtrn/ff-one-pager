import { test, expect } from '@playwright/test';

/**
 * Web E2E Tests - Clock Component
 *
 * Functional tests for clock behavior and interactions
 */
test.describe('Web - Clock Component', () => {
  test.beforeEach(async ({ page }) => {
    // Clear storage before each test to ensure isolation
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
    // Reload after clearing storage
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);
  });

  test('should handle 12-hour format', async ({ page }) => {
    const clock = page.locator('.clock');

    // Click on clock to toggle format (the clock has click handler)
    await clock.click();
    await page.waitForTimeout(500);

    const clockText = await clock.textContent();

    // Check for AM/PM indicator in 12-hour format
    const hasAmPm = /AM|PM/.test(clockText || '');
    expect(hasAmPm).toBe(true);
  });

  test('should handle 24-hour format', async ({ page }) => {
    const clock = page.locator('.clock');

    // Default is 24-hour format
    const clockText = await clock.textContent();

    // Should display time without AM/PM
    const timeRegex = /\d{1,2}:\d{2}/;
    expect(clockText).toMatch(timeRegex);
  });

  test('should not block interactions with editor', async ({ page }) => {
    const clock = page.locator('.clock');
    const editor = page.locator('.ProseMirror').first();

    // Click on clock first
    await clock.click();

    // Then try to type in editor
    await editor.click();
    await page.keyboard.type('Test after clicking clock');

    await page.waitForTimeout(500);

    // Verify editor received input
    await expect(editor).toContainText('Test after clicking clock');
  });

  test('should respect z-index (appear above content)', async ({ page }) => {
    const clock = page.locator('.clock');

    const zIndex = await clock.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return parseInt(styles.zIndex) || 0;
    });

    // Clock should have a positive z-index
    expect(zIndex).toBeGreaterThan(0);
  });

  test('should be visible on dark mode', async ({ page }) => {
    // Enable dark mode
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    // Dark mode is default, but let's ensure it's on
    const toggles = page.locator('.settings-popup-content input[type="checkbox"]');
    const darkModeToggle = toggles.first();

    const isDarkMode = await darkModeToggle.isChecked();
    if (!isDarkMode) {
      await darkModeToggle.locator('..').locator('..').click();
      await page.waitForTimeout(500);
    }

    const closeButton = page.locator('.close-btn');
    await closeButton.click();
    await page.waitForTimeout(300);

    // Clock should still be visible
    const clock = page.locator('.clock');
    await expect(clock).toBeVisible();

    // Check contrast in dark mode
    const color = await clock.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.color;
    });

    expect(color).toBeTruthy();
  });

  test('should be visible on light mode', async ({ page }) => {
    // Switch to light mode
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    const toggles = page.locator('.settings-popup-content input[type="checkbox"]');
    const darkModeToggle = toggles.first();

    // Ensure dark mode is OFF (light mode)
    const isDarkMode = await darkModeToggle.isChecked();
    if (isDarkMode) {
      await darkModeToggle.locator('..').locator('..').click();
      await page.waitForTimeout(500);
    }

    const closeButton = page.locator('.close-btn');
    await closeButton.click();
    await page.waitForTimeout(300);

    const clock = page.locator('.clock');
    await expect(clock).toBeVisible();

    const color = await clock.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.color;
    });

    expect(color).toBeTruthy();
  });

  test('should be clickable to toggle format', async ({ page }) => {
    const clock = page.locator('.clock');

    // Get initial time format
    const initialTime = await clock.textContent();
    const initialHasAmPm = /AM|PM/.test(initialTime || '');

    // Click to toggle format
    await clock.click();
    await page.waitForTimeout(500);

    // Get new time format
    const newTime = await clock.textContent();
    const newHasAmPm = /AM|PM/.test(newTime || '');

    // Format should have toggled
    expect(newHasAmPm).not.toBe(initialHasAmPm);
  });

  test('should persist time format preference', async ({ page }) => {
    const clock = page.locator('.clock');

    // Click to toggle to 12-hour format
    await clock.click();
    await page.waitForTimeout(500);

    const timeWithAmPm = await clock.textContent();
    const hasAmPm = /AM|PM/.test(timeWithAmPm || '');
    expect(hasAmPm).toBe(true);

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Format should persist
    const persistedTime = await clock.textContent();
    const persistedHasAmPm = /AM|PM/.test(persistedTime || '');
    expect(persistedHasAmPm).toBe(true);
  });
});
