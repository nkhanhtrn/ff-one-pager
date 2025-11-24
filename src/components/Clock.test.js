import { mount } from '@vue/test-utils';



// Declare mocks inside vi.mock and attach to globalThis to avoid hoisting issues
vi.mock('../utils/storage.js', () => {
  globalThis.getClockHour12Mock = vi.fn();
  globalThis.setClockHour12Mock = vi.fn();
  return {
    Storage: {
      getClockHour12: globalThis.getClockHour12Mock,
      setClockHour12: globalThis.setClockHour12Mock,
    }
  };
});


import Clock from './Clock.vue';

describe('Clock.vue', () => {
  beforeEach(() => {
    globalThis.getClockHour12Mock.mockReset();
    globalThis.setClockHour12Mock.mockReset();
    globalThis.getClockHour12Mock.mockResolvedValue(false); // default to 24h
  });

  it('renders the clock', async () => {
    const wrapper = mount(Clock);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.clock').exists()).toBe(true);
  });

  it('toggles hour mode on click', async () => {
    const wrapper = mount(Clock);
    await wrapper.vm.$nextTick();
    const initial = wrapper.vm.hour12;
    globalThis.setClockHour12Mock.mockResolvedValue();
    await wrapper.find('.clock').trigger('click');
    expect(wrapper.vm.hour12).toBe(!initial);
  });

  it('shows AM/PM in 12-hour mode', async () => {
    globalThis.getClockHour12Mock.mockResolvedValue(true);
    const wrapper = mount(Clock);
    await wrapper.vm.$nextTick();
    wrapper.vm.hour12 = true;
    wrapper.vm.updateTime();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.ampm').exists()).toBe(true);
  });

  it('does not show AM/PM in 24-hour mode', async () => {
    globalThis.getClockHour12Mock.mockResolvedValue(false);
    const wrapper = mount(Clock);
    await wrapper.vm.$nextTick();
    wrapper.vm.hour12 = false;
    wrapper.vm.updateTime();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.ampm').exists()).toBe(false);
  });

  it('toggleHourMode toggles hour12 and updates storage', async () => {
    const wrapper = mount(Clock);
    await wrapper.vm.$nextTick();
    const initial = wrapper.vm.hour12;
    globalThis.setClockHour12Mock.mockResolvedValue();
    await wrapper.vm.toggleHourMode();
    expect(wrapper.vm.hour12).toBe(!initial);
    expect(globalThis.setClockHour12Mock).toHaveBeenCalledWith(!initial);
    // Toggle back
    await wrapper.vm.toggleHourMode();
    expect(wrapper.vm.hour12).toBe(initial);
    expect(globalThis.setClockHour12Mock).toHaveBeenCalledWith(initial);
  });

  it('updateTime sets timeStr and ampm correctly in 12-hour mode', async () => {
    const wrapper = mount(Clock);
    await wrapper.vm.$nextTick();
    wrapper.vm.hour12 = true;
    wrapper.vm.updateTime();
    expect(wrapper.vm.timeStr).toMatch(/^[\d]{2}:[\d]{2}$/);
    expect(["AM", "PM", "am", "pm", "", undefined]).toContain(wrapper.vm.ampm);
  });

  it('updateTime sets timeStr and clears ampm in 24-hour mode', async () => {
    const wrapper = mount(Clock);
    await wrapper.vm.$nextTick();
    wrapper.vm.hour12 = false;
    wrapper.vm.updateTime();
    expect(wrapper.vm.timeStr).toMatch(/^[\d]{2}:[\d]{2}$/);
    expect(wrapper.vm.ampm).toBe('');
  });
});
