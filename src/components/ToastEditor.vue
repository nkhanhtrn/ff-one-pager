<template>
  <div class="editor-outer">
    <div id="editor" class="editor-textarea"></div>
  </div>
</template>
<script>
import Editor from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';
import { Storage } from '../utils/storage.js';
const initialContent = `# Hello, Toast UI Editor!

Welcome to One Pager! You can use **Markdown** to format your notes.

## Markdown Quick Guide

- **Bold:**
- *Italic:*
- [Link](https://example.com)
- Lists: Use - or number for bullet points
- Headings: Use #, ##, ### for headings

Your note never leaves your device and is saved automatically. Enjoy writing!
`;

export default {
  name: 'ToastEditor',
  props: {
    dark: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    const savedContent = this.getSavedContent();
    this.editor = this.createEditor(savedContent);
    this.editor.on('change', () => {
      const content = this.editor.getMarkdown();
      Storage.setContent(content);
    });
    // Apply dark mode on mount
    this.applyDarkMode(this.dark);
  },
  beforeUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  },
  watch: {
    dark(val) {
      this.applyDarkMode(val);
    }
  },
  methods: {
    createEditor(initialValue) {
      return new Editor({
        el: document.querySelector('#editor'),
        height: '100%',
        initialEditType: 'markdown',
        previewStyle: 'tab',
        initialValue,
        toolbarItems: [],
        hideModeSwitch: true,
      });
    },
    applyDarkMode(isDark) {
      const root = document.documentElement;
      if (isDark) {
        root.style.setProperty('--editor-bg', '#2d2d2d');
        root.style.setProperty('--editor-text', '#ffffff');
        root.style.setProperty('--editor-highlight', '#399e42');
        root.style.setProperty('--editor-text-secondary', '#888888');
        root.style.setProperty('--editor-font-size', '1.1em');
      } else {
        root.style.setProperty('--editor-bg', '#fff');
        root.style.setProperty('--editor-text', '#222');
        root.style.setProperty('--editor-highlight', '#399e42');
        root.style.setProperty('--editor-text-secondary', '#666666');
        root.style.setProperty('--editor-font-size', '1.1em');
      }
    },
    getSavedContent() {
      const saved = Storage.getContent(null);
      if (saved === null) {
        return initialContent;
      }
      return saved;
    }
  }
}
</script>
<style scoped>

.editor-outer {
  width: 100vw;
  height: 100vh;
  background: var(--editor-bg);
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  padding: 32px;
}
.editor-textarea {
  width: 100%;
  height: 100%;
  background: var(--editor-bg);
  box-sizing: border-box;
  border-radius: 16px;
  padding: 24px;
}

@media (max-width: 420px) {
  .editor-outer {
    padding: 0;
  }
  .editor-textarea {
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    padding: 8px 0;
    border-radius: 0;
  }
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

.toastui-editor-md-delimiter {
    color: var(--editor-text-secondary) !important;
}

/* More spacious translated bullet points */
.toastui-editor-md-list-item {
  margin-right: 0.3em !important;
  margin-left: 0.4em !important;
}

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
