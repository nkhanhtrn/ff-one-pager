
import { Storage } from './storage.js';

// Helper to mock browser.storage.local for extension context
function mockBrowserStorage() {
  let store = {};
  global.browser = {
    storage: {
      local: {
        async get(key) {
          if (typeof key === 'string') {
            if (Object.prototype.hasOwnProperty.call(store, key)) {
              return { [key]: store[key] };
            } else {
              return {};
            }
          }
          // If key is array or object
          let result = {};
          (Array.isArray(key) ? key : Object.keys(key)).forEach(k => {
            if (Object.prototype.hasOwnProperty.call(store, k)) {
              result[k] = store[k];
            }
          });
          return result;
        },
        async set(obj) {
          Object.assign(store, obj);
        },
        async clear() {
          store = {};
        }
      }
    }
  };
  return () => { delete global.browser; };
}

describe('Storage interface (async)', () => {
  beforeEach(async () => {
    localStorage.clear();
    if (global.browser && browser.storage && browser.storage.local && browser.storage.local.clear) {
      await browser.storage.local.clear();
    }
  });

  it('should get and set dark mode', async () => {
    expect(await Storage.getDarkMode(false)).toBe(false);
    await Storage.setDarkMode(true);
    expect(await Storage.getDarkMode(false)).toBe(true);
    await Storage.setDarkMode(false);
    expect(await Storage.getDarkMode(true)).toBe(false);
  });

  it('should get and set show clock', async () => {
    expect(await Storage.getShowClock(false)).toBe(false);
    await Storage.setShowClock(true);
    expect(await Storage.getShowClock(false)).toBe(true);
    await Storage.setShowClock(false);
    expect(await Storage.getShowClock(true)).toBe(false);
  });

  it('should get and set clock hour12', async () => {
    expect(await Storage.getClockHour12(false)).toBe(false);
    await Storage.setClockHour12(true);
    expect(await Storage.getClockHour12(false)).toBe(true);
    await Storage.setClockHour12(false);
    expect(await Storage.getClockHour12(true)).toBe(false);
  });

  it('should use fallback if key is not set', async () => {
    expect(await Storage.getDarkMode(true)).toBe(true);
    expect(await Storage.getShowClock(false)).toBe(false);
    expect(await Storage.getClockHour12(true)).toBe(true);
  });

  it('should store and retrieve multiple keys independently', async () => {
    await Storage.setDarkMode(true);
    await Storage.setShowClock(false);
    await Storage.setClockHour12(true);
    expect(await Storage.getDarkMode(false)).toBe(true);
    expect(await Storage.getShowClock(true)).toBe(false);
    expect(await Storage.getClockHour12(false)).toBe(true);
  });

  it('should get and set content string values', async () => {
    expect(await Storage.getContent('default')).toBe('default');
    await Storage.setContent('hello world');
    expect(await Storage.getContent('default')).toBe('hello world');
    await Storage.setContent('');
    expect(await Storage.getContent('fallback')).toBe('');
  });

  it('should use fallback for getContent if key is not set', async () => {
    expect(await Storage.getContent('fallback')).toBe('fallback');
  });
});

describe('Storage interface (browser.storage.local)', () => {
  let restore;
  beforeAll(() => {
    restore = mockBrowserStorage();
  });
  afterAll(() => {
    restore();
  });
  beforeEach(async () => {
    await browser.storage.local.clear();
  });

  it('should get and set dark mode', async () => {
    expect(await Storage.getDarkMode(false)).toBe(false);
    await Storage.setDarkMode(true);
    expect(await Storage.getDarkMode(false)).toBe(true);
    await Storage.setDarkMode(false);
    expect(await Storage.getDarkMode(true)).toBe(false);
  });

  it('should get and set show clock', async () => {
    expect(await Storage.getShowClock(false)).toBe(false);
    await Storage.setShowClock(true);
    expect(await Storage.getShowClock(false)).toBe(true);
    await Storage.setShowClock(false);
    expect(await Storage.getShowClock(true)).toBe(false);
  });

  it('should get and set clock hour12', async () => {
    expect(await Storage.getClockHour12(false)).toBe(false);
    await Storage.setClockHour12(true);
    expect(await Storage.getClockHour12(false)).toBe(true);
    await Storage.setClockHour12(false);
    expect(await Storage.getClockHour12(true)).toBe(false);
  });

  it('should use fallback if key is not set', async () => {
    expect(await Storage.getDarkMode(true)).toBe(true);
    expect(await Storage.getShowClock(false)).toBe(false);
    expect(await Storage.getClockHour12(true)).toBe(true);
  });

  it('should store and retrieve multiple keys independently', async () => {
    await Storage.setDarkMode(true);
    await Storage.setShowClock(false);
    await Storage.setClockHour12(true);
    expect(await Storage.getDarkMode(false)).toBe(true);
    expect(await Storage.getShowClock(true)).toBe(false);
    expect(await Storage.getClockHour12(false)).toBe(true);
  });

  it('should get and set content string values', async () => {
    expect(await Storage.getContent('default')).toBe('default');
    await Storage.setContent('hello world');
    expect(await Storage.getContent('default')).toBe('hello world');
    await Storage.setContent('');
    expect(await Storage.getContent('fallback')).toBe('');
  });

  it('should use fallback for getContent if key is not set', async () => {
    expect(await Storage.getContent('fallback')).toBe('fallback');
  });
});
