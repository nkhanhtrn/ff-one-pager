import { defineConfig, devices } from '@playwright/test';

const isCI = process.env.CI === 'true';

/**
 * Playwright E2E Test Configuration
 *
 * Two test projects:
 * 1. extension: Build verification tests (manifest, dist files)
 * 2. web: Intensive tests of the Vue app (editor, settings, clock components)
 *
 * Note: Full browser extension E2E testing requires headed mode with system Chrome/Chromium
 * and virtual display (xvfb) in CI. The extension tests here verify build artifacts only.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    headless: true,
  },

  projects: [
    {
      name: 'web',
      testMatch: '**/web/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'extension',
      testMatch: '**/extension/**/*.spec.ts',
      // Extension tests are file-system based, no browser needed
      use: {},
    },
  ],

  // Start dev server for web tests only
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
