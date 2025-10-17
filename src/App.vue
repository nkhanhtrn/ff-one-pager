<template>
  <div class="editor-outer">
    <div id="editor" class="editor-textarea"></div>
  </div>
</template>
<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';

export default {
  name: 'App',
  mounted() {
    this.editor = new Editor({
      el: document.querySelector('#editor'),
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'tab', // Still required, but tabs will be hidden by CSS
      initialValue: '# Hello, Toast UI Editor!\n\nStart editing...',
      toolbarItems: [], // Remove all toolbar items
      hideModeSwitch: true // Hide the tabs (mode switch)
    });
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }
}
</script>
<style scoped>
.editor-outer {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.editor-textarea {
  width: 80vw;
  height: 70vh;
  background: #fff;
  box-sizing: border-box;
}
</style>

<style>
/* Hide Toast UI Editor toolbar and tabs completely */
/* Hide Toast UI Editor toolbar and tabs completely */
.toastui-editor-toolbar {
  display: none !important;
}
.toastui-editor-tabs {
  display: none !important;
}
/* Remove border from Toast UI Editor */
.toastui-editor-defaultUI {
  border: none !important;
  box-shadow: none !important;
}
</style>
