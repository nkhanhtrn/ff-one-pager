<template>
  <div>
  <button class="settings-btn" @click="showSettings = !showSettings" aria-label="Settings">
      <span class="settings-icon">&#8230;</span>
    </button>
    <ToastEditor />
    <SettingsModal :visible="showSettings" @close="showSettings = false" />
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
      showSettings: false
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