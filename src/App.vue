<template>
  <div>
  <button class="settings-btn" @click="showSettings = !showSettings" aria-label="Settings">
      <span class="settings-icon">&#8230;</span>
    </button>
    <ToastEditor />
    <SettingsModal
      :visible="showSettings"
      :dark="isDarkMode"
      @close="showSettings = false"
      @toggle-dark="toggleDarkMode"
    />
  </div>
</template>

<script>
import ToastEditor from './components/ToastEditor.vue';
import SettingsModal from './components/SettingsModal.vue';

export default {
  name: 'App',
  components: {
    ToastEditor,
    SettingsModal
  },
  data() {
    return {
      showSettings: false,
      isDarkMode: this.getInitialDarkMode()
    };
  },
  watch: {
    isDarkMode(val) {
      this.applyDarkMode(val);
      localStorage.setItem('ff-one-pager-dark', val ? '1' : '0');
    }
  },
  created() {
    this.applyDarkMode(this.isDarkMode);
  },
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      // Only close if menu is open and click is outside button and menu
      if (!this.showSettings) return;
      const btn = this.$el.querySelector('.settings-btn');
      const menu = this.$el.querySelector('.settings-popup');
      if (
        btn && btn.contains(event.target)
        || (menu && menu.contains(event.target))
      ) {
        return;
      }
      this.showSettings = false;
    },
    toggleDarkMode(val) {
      this.isDarkMode = val;
    },
    getInitialDarkMode() {
      const stored = localStorage.getItem('ff-one-pager-dark');
      if (stored !== null) return stored === '1';
      // Default to dark mode if no preference is stored
      return true;
    },
    applyDarkMode(isDark) {
      const root = document.documentElement;
      if (isDark) {
        root.style.setProperty('--editor-bg', '#2d2d2d');
        root.style.setProperty('--editor-text', '#ffffff');
        root.style.setProperty('--editor-highlight', '#399e42');
        root.style.setProperty('--editor-text-secondary', '#888888');
        root.style.setProperty('--editor-font-size', '1.1em');
      } else {
        root.style.setProperty('--editor-bg', '#fff');
        root.style.setProperty('--editor-text', '#222');
        root.style.setProperty('--editor-highlight', '#399e42');
        root.style.setProperty('--editor-text-secondary', '#666666');
        root.style.setProperty('--editor-font-size', '1.1em');
      }
    }
  }
}
</script>

<style scoped>
.settings-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 1.5em;
}
.settings-btn {
  position: fixed;
  left: 24px;
  bottom: 24px;
  background: transparent;
  border: none;
  color: #5f5f5f;
  font-size: 1.2em;
  padding: 0;
  margin: 0;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, color 0.2s;
}
.settings-btn:active, .settings-btn:focus {
  color: inherit;
  outline: none;
}
</style>