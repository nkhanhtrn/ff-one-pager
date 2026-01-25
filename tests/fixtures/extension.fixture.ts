import { test as base, Page, BrowserContext } from '@playwright/test';

type ExtensionFixtures = {
  extensionId: string;
  page: Page;
};

/**
 * Custom fixture for extension testing.
 * Provides the extension ID and a page configured for extension testing.
 */
export const test = base.extend<ExtensionFixtures>({
  extensionId: async ({ context }, use) => {
    // For Chrome, the extension ID is available via chrome://extensions
    // We'll extract it from the extension page
    let id = '';

    // Get all pages and find extension pages
    const pages = context.pages();
    for (const page of pages) {
      const url = page.url();
      if (url.includes('chrome-extension://')) {
        const match = url.match(/chrome-extension:\/\/([^\/]+)/);
        if (match) {
          id = match[1];
          break;
        }
      }
    }

    // Alternative: use the service worker/background page
    if (!id) {
      const backgroundPages = context.backgroundPages();
      if (backgroundPages.length > 0) {
        const url = backgroundPages[0].url();
        const match = url.match(/chrome-extension:\/\/([^\/]+)/);
        if (match) {
          id = match[1];
        }
      }
    }

    await use(id);
  },

  page: async ({ context, page }, use) => {
    // For extension tests, navigate to a new tab (which should be overridden)
    await use(page);
  },
});

export { expect } from '@playwright/test';
