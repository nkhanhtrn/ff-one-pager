import { Storage, StorageKeys } from './storage.js';

describe('Storage interface', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should get and set boolean values', () => {
    expect(Storage.getBool(StorageKeys.DARK, false)).toBe(false);
    Storage.setBool(StorageKeys.DARK, true);
    expect(Storage.getBool(StorageKeys.DARK, false)).toBe(true);
    Storage.setBool(StorageKeys.DARK, false);
    expect(Storage.getBool(StorageKeys.DARK, true)).toBe(false);
  });

  it('should use fallback if key is not set', () => {
    expect(Storage.getBool('nonexistent-key', true)).toBe(true);
    expect(Storage.getBool('nonexistent-key', false)).toBe(false);
  });

  it('should store and retrieve multiple keys independently', () => {
    Storage.setBool(StorageKeys.DARK, true);
    Storage.setBool(StorageKeys.SHOW_CLOCK, false);
    expect(Storage.getBool(StorageKeys.DARK, false)).toBe(true);
    expect(Storage.getBool(StorageKeys.SHOW_CLOCK, true)).toBe(false);
  });

  it('should get and set string values', () => {
    expect(Storage.getString(StorageKeys.CONTENT, 'default')).toBe('default');
    Storage.setString(StorageKeys.CONTENT, 'hello world');
    expect(Storage.getString(StorageKeys.CONTENT, 'default')).toBe('hello world');
    Storage.setString(StorageKeys.CONTENT, '');
    expect(Storage.getString(StorageKeys.CONTENT, 'fallback')).toBe('');
  });

  it('should use fallback for getString if key is not set', () => {
    expect(Storage.getString('nonexistent-key', 'fallback')).toBe('fallback');
  });
});
