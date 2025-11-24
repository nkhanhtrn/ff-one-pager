
// Mock Storage interface (declare mocks before everything else due to vi.mock hoisting)

// Use globalThis for Storage mocks to avoid hoisting ReferenceError

// Create a mock Storage object
const getDarkModeMock = vi.fn();
const setDarkModeMock = vi.fn();
const getShowClockMock = vi.fn();
const setShowClockMock = vi.fn();
const mockStorage = {
	getDarkMode: getDarkModeMock,
	setDarkMode: setDarkModeMock,
	getShowClock: getShowClockMock,
	setShowClock: setShowClockMock,
};

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import App from './App.vue';

// Mock child components
vi.mock('./components/ToastEditor.vue', () => ({ default: { name: 'ToastEditor', template: '<div />' } }));
vi.mock('./components/SettingsModal.vue', () => ({ default: { name: 'SettingsModal', template: '<div />', props: ['visible', 'dark', 'showClock'] } }));
vi.mock('./components/Clock.vue', () => ({ default: { name: 'Clock', template: '<div />' } }));



describe('App.vue', () => {
	beforeEach(() => {
		getDarkModeMock.mockReset();
		setDarkModeMock.mockReset();
		getShowClockMock.mockReset();
		setShowClockMock.mockReset();
	});

	it('renders ToastEditor and SettingsModal', () => {
		getDarkModeMock.mockReturnValue(true);
		getShowClockMock.mockReturnValue(true);
		const wrapper = shallowMount(App, { props: { storage: mockStorage } });
		expect(wrapper.findComponent({ name: 'ToastEditor' }).exists()).toBe(true);
		expect(wrapper.findComponent({ name: 'SettingsModal' }).exists()).toBe(true);
	});

	it('toggles settings modal when button is clicked', async () => {
		getDarkModeMock.mockReturnValue(true);
		getShowClockMock.mockReturnValue(true);
		const wrapper = shallowMount(App, { props: { storage: mockStorage } });
		const btn = wrapper.find('.settings-btn');
		expect(wrapper.vm.showSettings).toBe(false);
		await btn.trigger('click');
		expect(wrapper.vm.showSettings).toBe(true);
		await btn.trigger('click');
		expect(wrapper.vm.showSettings).toBe(false);
	});

	it('calls toggleDarkMode and updates storage', async () => {
		getDarkModeMock.mockReturnValue(true);
		getShowClockMock.mockReturnValue(true);
		const wrapper = shallowMount(App, { props: { storage: mockStorage } });
		wrapper.vm.toggleDarkMode(false);
		expect(wrapper.vm.isDarkMode).toBe(false);
		expect(setDarkModeMock).toHaveBeenCalledWith(false);
	});

	it('calls toggleShowClock and updates storage', async () => {
		getDarkModeMock.mockReturnValue(true);
		getShowClockMock.mockReturnValue(true);
		const wrapper = shallowMount(App, { props: { storage: mockStorage } });
		wrapper.vm.toggleShowClock(false);
		expect(wrapper.vm.showClock).toBe(false);
		expect(setShowClockMock).toHaveBeenCalledWith(false);
	});

	it('shows Clock only when showClock is true', async () => {
			getDarkModeMock.mockReturnValue(true);
			getShowClockMock.mockReturnValue(true);
			const wrapper = shallowMount(App, { props: { storage: mockStorage } });
			expect(wrapper.findComponent({ name: 'Clock' }).exists()).toBe(true);
			wrapper.vm.showClock = false;
			await wrapper.vm.$nextTick();
			expect(wrapper.findComponent({ name: 'Clock' }).exists()).toBe(false);
		});

	it('loads initial state from storage', () => {
		getDarkModeMock.mockReturnValue(false);
		getShowClockMock.mockReturnValue(true);
		const wrapper = shallowMount(App, { props: { storage: mockStorage } });
		expect(wrapper.vm.isDarkMode).toBe(false);
		expect(wrapper.vm.showClock).toBe(true);
	});

	it('settings button has correct aria-label', () => {
		getDarkModeMock.mockReturnValue(true);
		getShowClockMock.mockReturnValue(true);
		const wrapper = shallowMount(App, { props: { storage: mockStorage } });
		const btn = wrapper.find('.settings-btn');
		expect(btn.attributes('aria-label')).toBe('Settings');
	});
});

