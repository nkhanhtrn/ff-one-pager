// src/utils/storage.js

export const StorageKeys = {
  DARK: 'dark-mode-enabled',
  SHOW_CLOCK: 'show-clock-enabled',
  CLOCK_HOUR12: 'clock-hour12-enabled',
};

export const Storage = {
  getBool(key, fallback = false) {
    const stored = localStorage.getItem(key);
    if (stored !== null) return stored === '1';
    return fallback;
  },
  setBool(key, value) {
    localStorage.setItem(key, value ? '1' : '0');
  }
};
