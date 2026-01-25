import { test, expect } from '@playwright/test';

/**
 * Web E2E Tests - Settings Modal
 *
 * Functional tests for settings modal interactions and behavior
 */
test.describe('Web - Settings Modal', () => {
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

  test('should open settings modal', async ({ page }) => {
    const settingsButton = page.locator('.settings-btn');
    await expect(settingsButton).toBeVisible();
    await settingsButton.click();

    const modal = page.locator('.settings-popup');
    await expect(modal).toBeVisible();
  });

  test('should close settings modal with close button', async ({ page }) => {
    // Open settings
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    // Click close button
    const closeButton = page.locator('.close-btn');
    await closeButton.click();

    // Modal should be hidden (or removed from DOM due to v-if)
    const modal = page.locator('.settings-popup');
    await expect(modal).not.toBeVisible();
  });

  test('should close settings modal by clicking outside', async ({ page }) => {
    // Open settings
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    // The app handles click outside via handleClickOutside
    // Click outside the modal (on the editor area)
    const editorArea = page.locator('.editor-outer');
    await editorArea.click({ position: { x: 10, y: 10 } });

    // Modal should close
    const modal = page.locator('.settings-popup');
    await expect(modal).not.toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    // Open settings
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    // Find dark mode toggle (it's a ToggleSwitch component with a checkbox input)
    // Use nth() to target specific toggles
    const toggles = page.locator('.settings-popup-content input[type="checkbox"]');
    const darkModeToggle = toggles.first();

    const initialState = await darkModeToggle.isChecked();
    // Click the label/parent instead of the hidden checkbox
    await darkModeToggle.locator('..').locator('..').click();
    await page.waitForTimeout(500);

    // Check that toggle changed state
    const newState = await darkModeToggle.isChecked();
    expect(newState).not.toBe(initialState);
  });

  test('should toggle clock visibility', async ({ page }) => {
    // Verify clock is initially visible
    const clock = page.locator('.clock');
    await expect(clock).toBeVisible();

    // Open settings
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    // Find clock visibility toggle (second toggle)
    const toggles = page.locator('.settings-popup-content input[type="checkbox"]');
    const clockToggle = toggles.nth(1);

    const initialState = await clockToggle.isChecked();
    // Click the label/parent instead of the hidden checkbox
    await clockToggle.locator('..').locator('..').click();
    await page.waitForTimeout(500);

    // Verify toggle changed
    const newState = await clockToggle.isChecked();
    expect(newState).not.toBe(initialState);

    // Close settings
    const closeButton = page.locator('.close-btn');
    await closeButton.click();
    await page.waitForTimeout(300);

    // Clock should be hidden now
    await expect(clock).not.toBeVisible();
  });

  test('should show clock when toggle is on', async ({ page }) => {
    // First, ensure clock is visible (default)
    let clock = page.locator('.clock');
    await expect(clock).toBeVisible();

    // Open settings and toggle clock off
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    const toggles = page.locator('.settings-popup-content input[type="checkbox"]');
    const clockToggle = toggles.nth(1);

    await clockToggle.locator('..').locator('..').click();
    await page.waitForTimeout(500);

    // Close settings
    const closeButton = page.locator('.close-btn');
    await closeButton.click();
    await page.waitForTimeout(300);

    // Clock should be hidden
    await expect(clock).not.toBeVisible();

    // Open settings again
    await settingsButton.click();
    await clockToggle.locator('..').locator('..').click(); // Toggle back on
    await closeButton.click();
    await page.waitForTimeout(300);

    // Clock should be visible again
    clock = page.locator('.clock');
    await expect(clock).toBeVisible();
  });

  test('should persist settings across page reloads', async ({ page }) => {
    // Toggle dark mode
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    const toggles = page.locator('.settings-popup-content input[type="checkbox"]');
    const darkModeToggle = toggles.first();

    const initialState = await darkModeToggle.isChecked();
    await darkModeToggle.locator('..').locator('..').click();
    await page.waitForTimeout(500);

    const closeButton = page.locator('.close-btn');
    await closeButton.click();
    await page.waitForTimeout(300);

    // Reload page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Open settings again
    await settingsButton.click();

    // Verify toggle state persisted
    const newState = await darkModeToggle.isChecked();
    expect(newState).not.toBe(initialState);
  });

  test('should have GitHub link in settings', async ({ page }) => {
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    const githubLink = page.locator('a.github-link');
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('href', 'https://github.com/nkhanhtrn/one-pager');
  });

  test('should have settings title', async ({ page }) => {
    const settingsButton = page.locator('.settings-btn');
    await settingsButton.click();

    const title = page.locator('.settings-title');
    await expect(title).toBeVisible();
    await expect(title).toContainText('Settings');
  });

  test('settings button should be in correct position', async ({ page }) => {
    const settingsButton = page.locator('.settings-btn');

    // Check positioning
    const position = await settingsButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        position: styles.position,
        left: styles.left,
        bottom: styles.bottom,
      };
    });

    expect(position.position).toBe('fixed');
  });

  test('settings button should be clickable', async ({ page }) => {
    const settingsButton = page.locator('.settings-btn');

    // Check it's visible and enabled
    await expect(settingsButton).toBeVisible();
    await expect(settingsButton).toBeEnabled();

    // Click and verify modal opens
    await settingsButton.click();
    const modal = page.locator('.settings-popup');
    await expect(modal).toBeVisible();
  });
});
