<template>
  <transition name="fade-scale">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'FadeScaleTransition'
}
</script>

<style scoped>
.fade-scale-enter-active, .fade-scale-leave-active {
  transition: opacity 0.18s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1);
}
.fade-scale-enter-from, .fade-scale-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.fade-scale-enter-to, .fade-scale-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
