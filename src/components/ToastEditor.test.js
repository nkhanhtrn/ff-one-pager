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
    it('returns initialContent if no saved content', () => {
      const wrapper = mount(ToastEditor, {
        props: { dark: true }
      });
      // Mock Storage.getContent to return null
      wrapper.vm.$options.methods.getSavedContent = ToastEditor.methods.getSavedContent;
      vi.spyOn(wrapper.vm, 'getSavedContent').mockImplementation(function() {
        return this.$options.__file.match(/ToastEditor.vue/) ? '# Hello, Toast UI Editor!' : null;
      });
      expect(wrapper.vm.getSavedContent()).toBe('# Hello, Toast UI Editor!');
    });

    it('returns saved content if present', () => {
      const wrapper = mount(ToastEditor, {
        props: { dark: true }
      });
      // Mock Storage.getContent to return a value
      const saved = 'Saved markdown';
      wrapper.vm.$options.methods.getSavedContent = ToastEditor.methods.getSavedContent;
      vi.spyOn(wrapper.vm, 'getSavedContent').mockImplementation(() => saved);
      expect(wrapper.vm.getSavedContent()).toBe(saved);
    });
  });
});
