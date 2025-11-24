import { Storage, StorageKeys } from './storage.js';

describe('Storage interface', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get and set dark mode', () => {
    expect(Storage.getDarkMode(false)).toBe(false);
    Storage.setDarkMode(true);
    expect(Storage.getDarkMode(false)).toBe(true);
    Storage.setDarkMode(false);
    expect(Storage.getDarkMode(true)).toBe(false);
  });

  it('should get and set show clock', () => {
    expect(Storage.getShowClock(false)).toBe(false);
    Storage.setShowClock(true);
    expect(Storage.getShowClock(false)).toBe(true);
    Storage.setShowClock(false);
    expect(Storage.getShowClock(true)).toBe(false);
  });

  it('should get and set clock hour12', () => {
    expect(Storage.getClockHour12(false)).toBe(false);
    Storage.setClockHour12(true);
    expect(Storage.getClockHour12(false)).toBe(true);
    Storage.setClockHour12(false);
    expect(Storage.getClockHour12(true)).toBe(false);
  });

  it('should use fallback if key is not set', () => {
    expect(Storage.getDarkMode(true)).toBe(true);
    expect(Storage.getShowClock(false)).toBe(false);
    expect(Storage.getClockHour12(true)).toBe(true);
  });

  it('should store and retrieve multiple keys independently', () => {
    Storage.setDarkMode(true);
    Storage.setShowClock(false);
    Storage.setClockHour12(true);
    expect(Storage.getDarkMode(false)).toBe(true);
    expect(Storage.getShowClock(true)).toBe(false);
    expect(Storage.getClockHour12(false)).toBe(true);
  });

  it('should get and set content string values', () => {
    expect(Storage.getContent('default')).toBe('default');
    Storage.setContent('hello world');
    expect(Storage.getContent('default')).toBe('hello world');
    Storage.setContent('');
    expect(Storage.getContent('fallback')).toBe('');
  });

  it('should use fallback for getContent if key is not set', () => {
    expect(Storage.getContent('fallback')).toBe('fallback');
  });
});
