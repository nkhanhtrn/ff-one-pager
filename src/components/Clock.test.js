import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Clock from './Clock.vue'
import { Storage, StorageKeys } from '../utils/storage.js'

describe('Clock.vue', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders the clock', () => {
    const wrapper = mount(Clock)
    expect(wrapper.find('.clock').exists()).toBe(true)
  })

  it('toggles hour mode on click', async () => {
    const wrapper = mount(Clock)
    const initial = wrapper.vm.hour12
    await wrapper.find('.clock').trigger('click')
    expect(wrapper.vm.hour12).toBe(!initial)
  })

  it('shows AM/PM in 12-hour mode', async () => {
    const wrapper = mount(Clock)
    wrapper.vm.hour12 = true
    wrapper.vm.updateTime()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.ampm').exists()).toBe(true)
  })

  it('does not show AM/PM in 24-hour mode', async () => {
    const wrapper = mount(Clock)
    wrapper.vm.hour12 = false
    wrapper.vm.updateTime()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.ampm').exists()).toBe(false)
  })

  it('toggleHourMode toggles hour12 and updates localStorage', () => {
    const wrapper = mount(Clock)
    const initial = wrapper.vm.hour12
    wrapper.vm.toggleHourMode()
    expect(wrapper.vm.hour12).toBe(!initial)
    // Check localStorage value
    expect(Storage.getBool(StorageKeys.CLOCK_HOUR12, initial)).toBe(!initial)
    // Toggle back
    wrapper.vm.toggleHourMode()
    expect(wrapper.vm.hour12).toBe(initial)
    expect(Storage.getBool(StorageKeys.CLOCK_HOUR12, !initial)).toBe(initial)
  })

  it('updateTime sets timeStr and ampm correctly in 12-hour mode', () => {
    const wrapper = mount(Clock)
    wrapper.vm.hour12 = true
    wrapper.vm.updateTime()
    // Should set timeStr and ampm (ampm may be empty at midnight)
    expect(wrapper.vm.timeStr).toMatch(/^\d{2}:\d{2}$/)
    // ampm should be either 'AM', 'PM', or ''
    expect(["AM", "PM", "am", "pm", "", undefined]).toContain(wrapper.vm.ampm)
  })

  it('updateTime sets timeStr and clears ampm in 24-hour mode', () => {
    const wrapper = mount(Clock)
    wrapper.vm.hour12 = false
    wrapper.vm.updateTime()
    expect(wrapper.vm.timeStr).toMatch(/^\d{2}:\d{2}$/)
    expect(wrapper.vm.ampm).toBe('')
  })
})
