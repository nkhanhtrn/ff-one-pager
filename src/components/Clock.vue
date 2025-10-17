<template>
  <div class="clock">{{ time }}</div>
</template>

<script>
export default {
  name: 'Clock',
  data() {
    return {
      time: this.getTimeString()
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.time = this.getTimeString();
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    getTimeString() {
      const now = new Date();
      return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  }
}
</script>

<style scoped>
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
  pointer-events: none;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
</style>
