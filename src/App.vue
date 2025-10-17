<template>
  <div class="editor-outer">
    <div id="editor" class="editor-textarea"></div>
  </div>
</template>
<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

const initialContent = `# Hello, Toast UI Editor!`;

export default {
  name: 'App',
  mounted() {
    // Load from localStorage if available
    const savedContent = localStorage.getItem('ff-one-pager-content');
    this.editor = new Editor({
      el: document.querySelector('#editor'),
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'tab',
      initialValue: savedContent || initialContent,
      toolbarItems: [],
      hideModeSwitch: true,
    });
    // Save to localStorage on change
    this.editor.on('change', () => {
      const content = this.editor.getMarkdown();
      localStorage.setItem('ff-one-pager-content', content);
    });
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }
}
</script>
<style>
:root {
  --editor-bg: #2d2d2d;
  --editor-text: #ffffff;
  --editor-highlight: #399e42;
  --editor-font-size: 1.1em;
}
html, body {
  background: var(--editor-bg) !important;
}
</style>
<style scoped>
.editor-outer {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--editor-bg);
}
.editor-textarea {
  width: 80vw;
  height: 70vh;
  background: var(--editor-bg);
  box-sizing: border-box;
}
</style>

<style>
/* Green highlight for selection and mark */
.toastui-editor-defaultUI .ProseMirror {
    background: var(--editor-bg) !important;
    color: var(--editor-text) !important;
    font-size: var(--editor-font-size) !important;
}
.toastui-editor-defaultUI .ProseMirror ::selection {
  background: var(--editor-highlight) !important;
  color: var(--editor-text) !important;
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
