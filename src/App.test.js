import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App.vue';
import { mount } from '@vue/test-utils';
import { Storage, StorageKeys } from './utils/storage.js';

// Mock ToastEditor, SettingsModal, and Clock to avoid real DOM/editor instantiation
vi.mock('./components/ToastEditor.vue', () => ({
  default: {
    name: 'ToastEditor',
    template: '<div class="mock-toast-editor" />',
    props: ['dark']
  }
}));
vi.mock('./components/SettingsModal.vue', () => ({
  default: {
    name: 'SettingsModal',
    template: '<div v-if="visible" class="mock-settings-modal"><button class="close-btn" @click="$emit(\'close\')">x</button></div>',
    props: ['visible', 'dark', 'showClock']
  }
}));
vi.mock('./components/Clock.vue', () => ({
  default: {
    name: 'Clock',
    template: '<div class="mock-clock" />'
  }
}));

describe('App.vue methods', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('renders ToastEditor, SettingsModal, and Clock (when showClock is true)', () => {
    const wrapper = mount(App);
    expect(wrapper.find('.mock-toast-editor').exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'SettingsModal' }).exists()).toBe(true);
    expect(wrapper.find('.mock-clock').exists()).toBe(true);
  });

  it('does not render Clock when showClock is false', () => {
    const wrapper = mount(App, {
      data() {
        return { showSettings: false, isDarkMode: true, showClock: false };
      }
    });
    expect(wrapper.find('.mock-clock').exists()).toBe(false);
  });

  it('toggles settings modal when settings button is clicked', async () => {
    const wrapper = mount(App);
    const btn = wrapper.find('.settings-btn');
    expect(wrapper.vm.showSettings).toBe(false);
    await btn.trigger('click');
    expect(wrapper.vm.showSettings).toBe(true);
    await btn.trigger('click');
    expect(wrapper.vm.showSettings).toBe(false);
  });

  it('passes correct props to SettingsModal', () => {
    const wrapper = mount(App);
    const modal = wrapper.findComponent({ name: 'SettingsModal' });
    expect(modal.props('visible')).toBe(wrapper.vm.showSettings);
    expect(modal.props('dark')).toBe(wrapper.vm.isDarkMode);
    expect(modal.props('showClock')).toBe(wrapper.vm.showClock);
  });

  it('closes settings modal when SettingsModal emits close', async () => {
    const wrapper = mount(App);
    wrapper.vm.showSettings = true;
    await wrapper.vm.$nextTick();
    const modal = wrapper.findComponent({ name: 'SettingsModal' });
    await modal.vm.$emit('close');
    expect(wrapper.vm.showSettings).toBe(false);
  });

  it('toggles dark mode when SettingsModal emits toggle-dark', async () => {
    const wrapper = mount(App);
    expect(wrapper.vm.isDarkMode).toBe(true);
    const modal = wrapper.findComponent({ name: 'SettingsModal' });
    await modal.vm.$emit('toggle-dark', false);
    expect(wrapper.vm.isDarkMode).toBe(false);
    await modal.vm.$emit('toggle-dark', true);
    expect(wrapper.vm.isDarkMode).toBe(true);
  });

  it('toggles showClock when SettingsModal emits toggle-show-clock', async () => {
    const wrapper = mount(App);
    expect(wrapper.vm.showClock).toBe(true);
    const modal = wrapper.findComponent({ name: 'SettingsModal' });
    await modal.vm.$emit('toggle-show-clock', false);
    expect(wrapper.vm.showClock).toBe(false);
    await modal.vm.$emit('toggle-show-clock', true);
    expect(wrapper.vm.showClock).toBe(true);
  });

  it('getInitialDarkMode returns true if nothing stored', () => {
    const wrapper = mount(App);
    expect(wrapper.vm.getInitialDarkMode()).toBe(true);
  });

  it('getInitialDarkMode returns false if stored as 0', () => {
    Storage.setBool(StorageKeys.DARK, false);
    const wrapper = mount(App);
    expect(wrapper.vm.getInitialDarkMode()).toBe(false);
  });

  it('getInitialDarkMode returns true if stored as 1', () => {
    Storage.setBool(StorageKeys.DARK, true);
    const wrapper = mount(App);
    expect(wrapper.vm.getInitialDarkMode()).toBe(true);
  });

  it('getInitialShowClock returns true if nothing stored', () => {
    const wrapper = mount(App);
    expect(wrapper.vm.getInitialShowClock()).toBe(true);
  });

  it('getInitialShowClock returns false if stored as 0', () => {
    Storage.setBool(StorageKeys.SHOW_CLOCK, false);
    const wrapper = mount(App);
    expect(wrapper.vm.getInitialShowClock()).toBe(false);
  });

  it('getInitialShowClock returns true if stored as 1', () => {
    Storage.setBool(StorageKeys.SHOW_CLOCK, true);
    const wrapper = mount(App);
    expect(wrapper.vm.getInitialShowClock()).toBe(true);
  });

  it('toggleDarkMode sets isDarkMode and storage', () => {
    const wrapper = mount(App);
    wrapper.vm.toggleDarkMode(false);
    expect(wrapper.vm.isDarkMode).toBe(false);
    expect(Storage.getBool(StorageKeys.DARK)).toBe(false);
    wrapper.vm.toggleDarkMode(true);
    expect(wrapper.vm.isDarkMode).toBe(true);
    expect(Storage.getBool(StorageKeys.DARK)).toBe(true);
  });

  it('toggleShowClock sets showClock and storage', () => {
    const wrapper = mount(App);
    wrapper.vm.toggleShowClock(false);
    expect(wrapper.vm.showClock).toBe(false);
    expect(Storage.getBool(StorageKeys.SHOW_CLOCK)).toBe(false);
    wrapper.vm.toggleShowClock(true);
    expect(wrapper.vm.showClock).toBe(true);
    expect(Storage.getBool(StorageKeys.SHOW_CLOCK)).toBe(true);
  });
});
