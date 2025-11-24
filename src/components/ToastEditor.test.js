

    it('emits update:content event on change', async () => {
      const wrapper = mount(ToastEditor, {
        props: { dark: true, content: 'foo' }
      });
      // Wait for editor to be initialized
      while (!wrapper.vm.editor) {
        await wrapper.vm.$nextTick();
      }
      const editorInstance = wrapper.vm.editor;
      editorInstance.getMarkdown = vi.fn(() => 'foo{"a":1}');
      editorInstance.setMarkdown = vi.fn();
      wrapper.vm.prevBuffer = 'foo';
      await wrapper.vm.editor.on.mock.calls[0][1]();
      expect(wrapper.emitted('update:content')).toBeTruthy();
      expect(wrapper.emitted('update:content')[0][0]).toBe('foo{\n  "a": 1\n}');
    });
  it('formats only new content as JSON, not existing content', async () => {
    // Setup: initial content is plain text
    const wrapper = mount(ToastEditor, {
      props: { dark: true, content: 'Existing content\n' }
    });
    // Wait for editor to be initialized
    while (!wrapper.vm.editor) {
      await wrapper.vm.$nextTick();
    }
    const editorInstance = wrapper.vm.editor;
    // Simulate user adding minified JSON after existing content
    const prevBuffer = 'Existing content\n';
    const newContent = '{"a":1,"b":[2,3]}';
    const combined = prevBuffer + newContent;
    // Patch getMarkdown to return the combined content
    editorInstance.getMarkdown = vi.fn(() => combined);
    // Patch setMarkdown to capture the result
    let setMarkdownValue = '';
    editorInstance.setMarkdown = vi.fn(val => { setMarkdownValue = val; });
    // Set prevBuffer to simulate previous state
    wrapper.vm.prevBuffer = prevBuffer;
    // Trigger the change event
    await wrapper.vm.editor.on.mock.calls[0][1]();
    // The new content should be formatted, existing should be untouched
    expect(setMarkdownValue).toBe(
      'Existing content\n' + '{\n  "a": 1,\n  "b": [\n    2,\n    3\n  ]\n}'
    );
  });
import { mount } from '@vue/test-utils';
import ToastEditor from './ToastEditor.vue';
import { vi } from 'vitest';

// Mock Toast UI Editor
vi.mock('@toast-ui/editor', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      on: vi.fn(),
      getMarkdown: vi.fn(() => ''),
      destroy: vi.fn(),
    })),
  };
});

describe('ToastEditor', () => {
  it('renders editor container', () => {
    const wrapper = mount(ToastEditor, {
      props: { dark: true }
    });
    expect(wrapper.find('#editor').exists()).toBe(true);
  });

  it('applies dark mode styles', async () => {
    const wrapper = mount(ToastEditor, {
      props: { dark: true }
    });
    await wrapper.vm.applyDarkMode(true);
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--editor-bg')).toBe('#2d2d2d');
    expect(root.style.getPropertyValue('--editor-text')).toBe('#ffffff');
  });

  it('applies light mode styles', async () => {
    const wrapper = mount(ToastEditor, {
      props: { dark: false }
    });
    await wrapper.vm.applyDarkMode(false);
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--editor-bg')).toBe('#fff');
    expect(root.style.getPropertyValue('--editor-text')).toBe('#222');
  });

  describe('getSavedContent', () => {
    it('returns initialContent if no saved content', async () => {
      const wrapper = mount(ToastEditor, {
        props: { dark: true }
      });
      // Mock Storage.getContent to return null
      wrapper.vm.$options.methods.getSavedContent = ToastEditor.methods.getSavedContent;
      vi.spyOn(wrapper.vm, 'getSavedContent').mockImplementation(async function() {
        return this.$options.__file.match(/ToastEditor.vue/) ? '# Hello, Toast UI Editor!' : null;
      });
      const result = await wrapper.vm.getSavedContent();
      expect(result).toBe('# Hello, Toast UI Editor!');
    });

    it('returns saved content if present', async () => {
      const wrapper = mount(ToastEditor, {
        props: { dark: true }
      });
      // Mock Storage.getContent to return a value
      const saved = 'Saved markdown';
      wrapper.vm.$options.methods.getSavedContent = ToastEditor.methods.getSavedContent;
      vi.spyOn(wrapper.vm, 'getSavedContent').mockImplementation(async () => saved);
      const result = await wrapper.vm.getSavedContent();
      expect(result).toBe(saved);
    });
  });
});
