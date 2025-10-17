import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App.vue';
import { mount } from '@vue/test-utils';
import { Storage, StorageKeys } from './utils/storage.js';

// Mock ToastEditor to avoid real DOM/editor instantiation
vi.mock('./components/ToastEditor.vue', () => ({
  default: {
    name: 'ToastEditor',
    template: '<div />',
    props: ['dark']
  }
}));

describe('App.vue methods', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
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
