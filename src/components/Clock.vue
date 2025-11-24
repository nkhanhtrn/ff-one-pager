<template>
  <div class="clock" @click="toggleHourMode" :title="hour12 ? 'Switch to 24-hour' : 'Switch to 12-hour'">
    <span>{{ timeStr }}</span><span v-if="hour12 && ampm" class="ampm">{{ ampm }}</span>
  </div>
</template>

<script>
import { Storage } from '../utils/storage.js';

export default {
  name: 'Clock',
  data() {
    return {
      timeStr: '',
      ampm: '',
      hour12: this.getInitialHour12()
    };
  },
  mounted() {
    this.updateTime();
    this.interval = setInterval(this.updateTime, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    updateTime() {
      const now = new Date();
      if (this.hour12) {
        const parts = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).split(' ');
        this.timeStr = parts[0];
        this.ampm = parts[1] || '';
      } else {
        this.timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        this.ampm = '';
      }
    },
    toggleHourMode() {
      this.hour12 = !this.hour12;
      Storage.setClockHour12(this.hour12);
      this.updateTime();
    },
    getInitialHour12() {
      return Storage.getClockHour12(false);
    }
}
}
</script>

<style scoped>
 .ampm {
   font-size: inherit;
   opacity: 0.7;
   margin-left: 0.38em;
   letter-spacing: 0.01em;
   font-family: inherit;
 }
.clock {
  position: fixed;
  right: 33px;
  bottom: 15px;
  color: #5f5f5f;
  font-size: 1.1em;
  font-family: monospace;
  background: transparent;
  padding: 0;
  border-radius: 50%;
  z-index: 1200;
  letter-spacing: 0.04em;
  user-select: none;
  pointer-events: auto;
  cursor: pointer;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>
