

function isExtensionStorageAvailable() {
  return typeof browser !== 'undefined' && browser.storage && browser.storage.local;
}

export const Storage = {
  async getDarkMode(defaultValue = true) {
    if (isExtensionStorageAvailable()) {
      const result = await browser.storage.local.get('dark-mode-enabled');
      if ('dark-mode-enabled' in result) return result['dark-mode-enabled'] === '1';
      return defaultValue;
    } else {
      const stored = localStorage.getItem('dark-mode-enabled');
      if (stored !== null) return stored === '1';
      return defaultValue;
    }
  },
  async setDarkMode(value) {
    if (isExtensionStorageAvailable()) {
      await browser.storage.local.set({'dark-mode-enabled': value ? '1' : '0'});
    } else {
      localStorage.setItem('dark-mode-enabled', value ? '1' : '0');
    }
  },
  async getShowClock(defaultValue = true) {
    if (isExtensionStorageAvailable()) {
      const result = await browser.storage.local.get('show-clock-enabled');
      if ('show-clock-enabled' in result) return result['show-clock-enabled'] === '1';
      return defaultValue;
    } else {
      const stored = localStorage.getItem('show-clock-enabled');
      if (stored !== null) return stored === '1';
      return defaultValue;
    }
  },
  async setShowClock(value) {
    if (isExtensionStorageAvailable()) {
      await browser.storage.local.set({'show-clock-enabled': value ? '1' : '0'});
    } else {
      localStorage.setItem('show-clock-enabled', value ? '1' : '0');
    }
  },
  async getClockHour12(defaultValue = false) {
    if (isExtensionStorageAvailable()) {
      const result = await browser.storage.local.get('clock-hour12-enabled');
      if ('clock-hour12-enabled' in result) return result['clock-hour12-enabled'] === '1';
      return defaultValue;
    } else {
      const stored = localStorage.getItem('clock-hour12-enabled');
      if (stored !== null) return stored === '1';
      return defaultValue;
    }
  },
  async setClockHour12(value) {
    if (isExtensionStorageAvailable()) {
      await browser.storage.local.set({'clock-hour12-enabled': value ? '1' : '0'});
    } else {
      localStorage.setItem('clock-hour12-enabled', value ? '1' : '0');
    }
  },
  async getContent(defaultValue = '') {
    if (isExtensionStorageAvailable()) {
      const result = await browser.storage.local.get('page-content');
      if ('page-content' in result) return result['page-content'];
      return defaultValue;
    } else {
      const stored = localStorage.getItem('page-content');
      if (stored !== null) return stored;
      return defaultValue;
    }
  },
  async setContent(value) {
    if (isExtensionStorageAvailable()) {
      await browser.storage.local.set({'page-content': value});
    } else {
      localStorage.setItem('page-content', value);
    }
  },
};

