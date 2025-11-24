
export const Storage = {
  getDarkMode(defaultValue = true) {
    const stored = localStorage.getItem('dark-mode-enabled');
    if (stored !== null) return stored === '1';
    return defaultValue;
  },
  setDarkMode(value) {
    localStorage.setItem('dark-mode-enabled', value ? '1' : '0');
  },
  getShowClock(defaultValue = true) {
    const stored = localStorage.getItem('show-clock-enabled');
    if (stored !== null) return stored === '1';
    return defaultValue;
  },
  setShowClock(value) {
    localStorage.setItem('show-clock-enabled', value ? '1' : '0');
  },
  getClockHour12(defaultValue = false) {
    const stored = localStorage.getItem('clock-hour12-enabled');
    if (stored !== null) return stored === '1';
    return defaultValue;
  },
  setClockHour12(value) {
    localStorage.setItem('clock-hour12-enabled', value ? '1' : '0');
  },
  getContent(defaultValue = '') {
    const stored = localStorage.getItem('page-content');
    if (stored !== null) return stored;
    return defaultValue;
  },
  setContent(value) {
    localStorage.setItem('page-content', value);
  },
};

