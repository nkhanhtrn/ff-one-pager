<template>
  <div>
    <button class="settings-btn" @click="showSettings = !showSettings" aria-label="Settings">
      <span class="settings-icon">&#8230;</span>
    </button>
    <ToastEditor :dark="isDarkMode" />
    <SettingsModal
      :visible="showSettings"
      :dark="isDarkMode"
      :show-clock="showClock"
      @close="showSettings = false"
      @toggle-dark="toggleDarkMode"
      @toggle-show-clock="toggleShowClock"
    />
    <Clock v-if="showClock" />
  </div>
</template>

<script>

import ToastEditor from './components/ToastEditor.vue';
import SettingsModal from './components/SettingsModal.vue';
import Clock from './components/Clock.vue';
import { Storage } from './utils/storage.js';

export default {
  name: 'App',
  components: {
    ToastEditor,
    SettingsModal,
    Clock
  },
  props: {
    storage: {
      type: Object,
      default: () => Storage
    }
  },
  data() {
    return {
      showSettings: false,
      isDarkMode: this.getInitialDarkMode(),
      showClock: this.getInitialShowClock(),
    };
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
      this.storage.setDarkMode(val);
    },
    toggleShowClock(val) {
      this.showClock = val;
      this.storage.setShowClock(val);
    },
    getInitialDarkMode() {
      return this.storage.getDarkMode(true); // Default to dark mode if no preference is stored
    },
    getInitialShowClock() {
      return this.storage.getShowClock(true);
    },
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

<style scoped>
/* ToastEditor handles its own layout and style */
</style>