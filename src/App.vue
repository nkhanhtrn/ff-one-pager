<template>
  <ToastEditor />
</template>
<script>
import ToastEditor from './components/ToastEditor.vue';

export default {
  name: 'App',
  components: {
    ToastEditor
  }
}
</script>
<style>
html, body {
  background: var(--editor-bg) !important;
}
</style>