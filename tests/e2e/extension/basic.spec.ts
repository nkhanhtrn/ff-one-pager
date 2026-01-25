import { test, expect } from '@playwright/test';

/**
 * Basic Extension Build Verification
 *
 * These tests verify the extension builds correctly and has valid manifest.
 * Full extension E2E testing requires manual testing or complex CI setup with virtual displays.
 */
test.describe('Extension - Build Verification', () => {
  test('should have valid manifest.json', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');

    const manifestPath = path.join(process.cwd(), 'dist', 'manifest.json');
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestContent);

    // Verify required manifest fields
    expect(manifest).toHaveProperty('manifest_version', 3);
    expect(manifest).toHaveProperty('name');
    expect(manifest).toHaveProperty('version');
    expect(manifest).toHaveProperty('chrome_url_overrides');
    expect(manifest.chrome_url_overrides).toHaveProperty('newtab', 'index.html');
  });

  test('should have index.html in dist', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');

    const indexPath = path.join(process.cwd(), 'dist', 'index.html');
    const content = await fs.readFile(indexPath, 'utf-8');

    // Verify HTML has basic structure
    expect(content).toContain('<!DOCTYPE html>');
    expect(content).toContain('<div id="app"></div>');
  });

  test('should have required icons in dist', async () => {
    const fs = await import('fs/promises');
    const path = await import('path');

    const iconSizes = ['16', '32', '48', '64', '96', '128', '256'];
    const distPath = path.join(process.cwd(), 'dist');

    for (const size of iconSizes) {
      const iconPath = path.join(distPath, `icon-${size}.png`);
      const exists = await fs.access(iconPath).then(() => true).catch(() => false);
      expect(exists).toBe(true);
    }
  });
});

/**
 * Note: Full E2E testing of browser extensions requires:
 * 1. Running in headed mode (not headless)
 * 2. System Chrome/Chromium installation
 * 3. Virtual display (xvfb) in CI environments
 * 4. Manual extension ID detection or chrome://extensions access
 *
 * For comprehensive extension testing, consider:
 * - Manual testing checklist
 * - Using web-ext with Selenium for Firefox extensions
 * - Dedicated extension testing services
 */
