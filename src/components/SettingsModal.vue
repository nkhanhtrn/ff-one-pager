<template>
  <FadeScaleTransition>
    <div v-if="visible" class="settings-popup">
      <div class="settings-popup-content">
        <div style="font-weight:bold; margin-bottom:0.5em;">Settings</div>
        <label class="toggle-row">
          <span class="toggle-label">Dark mode</span>
          <input type="checkbox" v-model="darkMode" @change="toggleDarkMode" class="toggle-input">
          <span class="toggle-slider"></span>
        </label>
  <button class="close-btn" @click="$emit('close')" aria-label="Close">&times;</button>
      </div>
    </div>
  </FadeScaleTransition>
</template>

<script>
import FadeScaleTransition from '../shared/FadeScaleTransition.vue';
export default {
  name: 'SettingsModal',
  components: { FadeScaleTransition },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dark: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      darkMode: this.dark
    };
  },
  watch: {
    dark(val) {
      this.darkMode = val;
    }
  },
  methods: {
    toggleDarkMode() {
      this.$emit('toggle-dark', this.darkMode);
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
.toggle-row {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  font-size: 1em;
  cursor: pointer;
  gap: 0.7em;
}
.toggle-label {
  color: var(--editor-text, #fff);
  font-size: 1em;
  font-weight: 400;
  letter-spacing: 0.01em;
}
.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}
.toggle-slider {
  display: inline-block;
  width: 36px;
  height: 20px;
  background: #444;
  border-radius: 12px;
  position: relative;
  transition: background 0.2s;
  vertical-align: middle;
}
.toggle-row .toggle-input:checked + .toggle-slider {
  background: #399e42;
}
.toggle-slider:before {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}
.toggle-row .toggle-input:checked + .toggle-slider:before {
  transform: translateX(16px);
}
.close-btn {
  position: absolute;
  top: 8px;
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
</style>
