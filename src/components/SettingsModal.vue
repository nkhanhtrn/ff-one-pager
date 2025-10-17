<template>
  <FadeScaleTransition>
    <div v-if="visible" class="settings-popup">
      <div class="settings-popup-content">
        <div style="font-weight:bold; margin-bottom:0.5em;">Settings</div>
        <!-- Add your settings controls here -->
        <div style="margin-bottom:1em; color: #aaa;">(Settings UI placeholder)</div>
        <button class="close-btn" @click="$emit('close')">Close</button>
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
  background: none;
  color: var(--editor-text, #fff);
  border: none;
  font-size: 1em;
  margin-left: auto;
  margin-top: 0.5em;
  cursor: pointer;
  padding: 0.2em 0.7em;
  border-radius: 4px;
  transition: background 0.2s;
}
.close-btn:hover {
  background: #333;
}
</style>
