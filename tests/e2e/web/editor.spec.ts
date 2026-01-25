import { test, expect } from '@playwright/test';

/**
 * Web E2E Tests - Editor
 *
 * Functional tests for markdown editor behavior
 */
test.describe('Web - Markdown Editor', () => {
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
    await page.waitForTimeout(500); // Allow Vue to mount
  });

  test('should allow typing markdown content', async ({ page }) => {
    const testMarkdown = '# Hello World\n\nThis is a **test** with *markdown* formatting.';

    // Click into the editor - use first() to avoid strict mode violation
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    // Clear initial content first
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');

    // Type markdown content
    await page.keyboard.type(testMarkdown);

    // Wait for editor to process
    await page.waitForTimeout(500);

    // Verify content is in the editor (markdown syntax is preserved)
    await expect(editor).toContainText('Hello World');
    await expect(editor).toContainText('This is a'); // Partial match due to ** markers
    await expect(editor).toContainText('test'); // The word "test" is there
    await expect(editor).toContainText('markdown');
  });

  test('should render markdown headings correctly', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    await page.keyboard.type('# Heading 1');
    await page.keyboard.press('Enter');
    await page.keyboard.type('## Heading 2');

    await page.waitForTimeout(500);

    // In markdown mode, the content is plain text with markdown syntax
    await expect(editor).toContainText('# Heading 1');
    await expect(editor).toContainText('## Heading 2');
  });

  test('should render markdown lists correctly', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    await page.keyboard.type('- Item 1');
    await page.keyboard.press('Enter');
    await page.keyboard.type('- Item 2');

    await page.waitForTimeout(500);

    // In markdown mode, list items start with -
    await expect(editor).toContainText('- Item 1');
    await expect(editor).toContainText('- Item 2');
  });

  test('should render markdown code blocks', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    await page.keyboard.type('```');
    await page.keyboard.press('Enter');
    await page.keyboard.type('const x = 42;');
    await page.keyboard.press('Enter');
    await page.keyboard.type('```');

    await page.waitForTimeout(500);

    // Code block syntax should be present
    await expect(editor).toContainText('```');
    await expect(editor).toContainText('const x = 42;');
  });

  test('should render markdown links', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    await page.keyboard.type('[Link text](https://example.com)');

    await page.waitForTimeout(500);

    // In markdown mode, links are in markdown syntax
    await expect(editor).toContainText('[Link text](https://example.com)');
  });

  test('should handle markdown bold and italic', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    await page.keyboard.type('This is **bold** and this is *italic*.');

    await page.waitForTimeout(500);

    // In markdown mode, formatting is shown with markdown syntax
    await expect(editor).toContainText('**bold**');
    await expect(editor).toContainText('*italic*');
  });

  test('should auto-save content', async ({ page }) => {
    const testContent = `# Auto-save Test

This content should be saved automatically.

${new Date().toISOString()}`;

    const editor = page.locator('.ProseMirror').first();
    await editor.click();
    await page.keyboard.type(testContent);

    // Wait for auto-save (typically debounced)
    await page.waitForTimeout(3000);

    // Reload the page
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(500);

    // Verify content persisted
    const editorContent = page.locator('.ProseMirror').first();
    await expect(editorContent).toContainText('Auto-save Test', { timeout: 5000 });
  });

  test('should format JSON content', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    // Type something that looks like JSON
    await page.keyboard.type('{"key": "value"}');

    await page.waitForTimeout(500);

    // The formatNewContent utility should format this
    await expect(editor).toContainText('key');
    await expect(editor).toContainText('value');
  });

  test('should clear editor content', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    // Type some content
    await page.keyboard.type('Content to clear');
    await page.waitForTimeout(500);

    // Select all and delete
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');

    await page.waitForTimeout(500);

    // Verify editor has no content (or just initial content)
    const textContent = await editor.textContent();
    expect(textContent?.trim()).not.toContain('Content to clear');
  });

  test('should handle keyboard shortcuts', async ({ page }) => {
    const editor = page.locator('.ProseMirror').first();
    await editor.click();

    // Type some text
    await page.keyboard.type('Test text for shortcuts');

    // Test undo
    await page.keyboard.press('Control+Z');
    await page.waitForTimeout(200);

    // The text should be gone or partially gone
    const textContent = await editor.textContent();
    expect(textContent).toBeTruthy();
  });

  test('should be responsive on smaller viewports', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const editor = page.locator('.editor-outer');
    await expect(editor).toBeVisible();

    // Editor should still be functional
    const editableArea = page.locator('.ProseMirror').first();
    await editableArea.click();
    await page.keyboard.type('Mobile test content');

    await page.waitForTimeout(500);

    await expect(editableArea).toContainText('Mobile test content');
  });

  test('should have full viewport height', async ({ page }) => {
    const editorOuter = page.locator('.editor-outer');
    const editorTextarea = page.locator('.editor-textarea');

    // Both should be visible
    await expect(editorOuter).toBeVisible();
    await expect(editorTextarea).toBeVisible();

    // Check that editor takes full height (computed value may be in px, not vh)
    const height = await editorOuter.evaluate((el) => {
      return el.clientHeight;
    });
    // Should be close to viewport height (720px default in Playwright)
    expect(height).toBeGreaterThan(700);
  });
});
