// src/utils/storage.js

// The following methods are already present in the Storage object and do not need to be removed.
// src/utils/storage.js

export const StorageKeys = {
  DARK: 'dark-mode-enabled',
  SHOW_CLOCK: 'show-clock-enabled',
  CLOCK_HOUR12: 'clock-hour12-enabled',
  CONTENT: 'page-content',
};

export const Storage = {
  getBool(key, fallback = false) {
    const stored = localStorage.getItem(key);
    if (stored !== null) return stored === '1';
    return fallback;
  },
  setBool(key, value) {
    localStorage.setItem(key, value ? '1' : '0');
  },
  // The following methods are already present in the Storage object and do not need to be added again.
  getString(key, fallback = '') {
    const stored = localStorage.getItem(key);
    if (stored !== null) return stored;
      return fallback;
    },
  setString(key, value) {
    localStorage.setItem(key, value);
  },
};
