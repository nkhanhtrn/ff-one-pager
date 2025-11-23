<template>
  <FadeScaleTransition>
    <div v-if="visible" class="settings-popup">
      <div class="settings-popup-content">
  <div class="settings-title">Settings</div>
  <div style="height: 0.7em;"></div>
        <ToggleSwitch
          label="Dark mode"
          :modelValue="darkMode"
          @update:modelValue="darkMode = $event"
          @change="toggleDarkMode"
        />
        <ToggleSwitch
          label="Show clock"
          :modelValue="showClockLocal"
          @update:modelValue="showClockLocal = $event"
          @change="toggleShowClock"
        />
        <button class="close-btn" @click="$emit('close')" aria-label="Close">&times;</button>
        <div class="settings-footnote">
          <a href="https://github.com/nkhanhtrn/one-pager" target="_blank" rel="noopener" class="github-link">
          made with &nbsp;
            <svg class="github-icon" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" style="vertical-align:middle;">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </FadeScaleTransition>
</template>

<script>
import FadeScaleTransition from '../shared/FadeScaleTransition.vue';
import ToggleSwitch from '../shared/ToggleSwitch.vue';
export default {
  name: 'SettingsModal',
  components: { FadeScaleTransition, ToggleSwitch },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    },
    showClock: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      darkMode: this.dark,
      showClockLocal: this.showClock
    };
  },
  watch: {
    dark(val) {
      this.darkMode = val;
    },
    showClock(val) {
      this.showClockLocal = val;
    }
  },
  methods: {
    toggleDarkMode() {
      this.$emit('toggle-dark', this.darkMode);
    },
    toggleShowClock() {
      this.$emit('toggle-show-clock', this.showClockLocal);
    }
  }
}
</script>

<style scoped>
.settings-popup {
  position: fixed;
  left: 24px;
  bottom: 44px;
  z-index: 1200;
}
.settings-title {
  font-weight: bold;
  font-size: 1.15em;
  margin-bottom: 0.5em;
  padding-bottom: 0.4em;
  border-bottom: 1.5px solid #444;
  width: 100%;
  color: #bbb;
  opacity: 0.55;
}
.settings-popup-content {
  position: relative;
  background: var(--editor-bg, #222);
  color: var(--editor-text, #fff);
  border-radius: 8px;
  min-width: 180px;
  box-shadow: 0 2px 16px #0008;
  padding: 1em 1.2em 0.7em 1.2em;
  font-size: 1em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.close-btn {
  position: absolute;
  top: 8px;
  user-select: none;
  right: 10px;
  background: none;
  color: #888;
  border: none;
  font-size: 1.3em;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.18s, color 0.18s;
  z-index: 2;
}
.close-btn:hover {
  background: #3331;
  color: #bbb;
}
.settings-footnote {
  width: 100%;
  text-align: center;
  font-size: 0.85em;
  color: #bbb;
  opacity: 0.45;
  user-select: none;
  margin-top: 0.7em;
}
.settings-footnote a.github-link {
  color: #bbb;
  text-decoration: none;
  opacity: 0.7;
  margin-left: 2px;
  pointer-events: auto;
}
.github-icon {
  vertical-align: middle;
}
</style>
