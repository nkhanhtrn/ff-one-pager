// Utility for formatting only new content in a markdown editor
import { formatJson } from '../utils/json.js';

/**
 * Returns the current content with only the new part formatted as JSON (if possible).
 * @param {string} prev - The previous buffer/content.
 * @param {string} current - The current content after edit.
 * @returns {string} - The new content with only the new part formatted if valid JSON, else unchanged.
 */
export function formatNewContent(prev, current) {
  // Find the first and last index where prev and current differ
  let start = 0;
  while (start < prev.length && start < current.length && prev[start] === current[start]) {
    start++;
  }
  let endPrev = prev.length - 1;
  let endCurr = current.length - 1;
  while (
    endPrev >= start && endCurr >= start && prev[endPrev] === current[endCurr]
  ) {
    endPrev--;
    endCurr--;
  }
  // The new or replaced content in current
  const newContent = current.slice(start, endCurr + 1);
  const formattedNew = formatJson(newContent);
  if (formattedNew !== newContent && newContent.length > 0) {
    let after = current.slice(endCurr + 1);
    // Only add a newline after formatted JSON if:
    // - the original new content ended with a newline, or
    // - the following content starts with a newline
    const newContentEndsWithNewline = newContent.endsWith('\n');
    const afterStartsWithNewline = after.startsWith('\n');
    if (!formattedNew.endsWith('\n') && (newContentEndsWithNewline || afterStartsWithNewline)) {
      return current.slice(0, start) + formattedNew + '\n' + after;
    }
    return current.slice(0, start) + formattedNew + after;
  }
  return current;
}
