import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SettingsModal from './SettingsModal.vue'

describe('SettingsModal.vue', () => {
  it('renders when visible is true', () => {
    const wrapper = mount(SettingsModal, {
      props: { visible: true }
    })
    expect(wrapper.find('.settings-popup').exists()).toBe(true)
  })

  it('does not render when visible is false', () => {
    const wrapper = mount(SettingsModal, {
      props: { visible: false }
    })
    expect(wrapper.find('.settings-popup').exists()).toBe(false)
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(SettingsModal, {
      props: { visible: true }
    })
    await wrapper.find('.close-btn').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits toggle-dark when dark mode toggle is changed', async () => {
    const wrapper = mount(SettingsModal, {
      props: { visible: true, dark: false }
    })
    const input = wrapper.findAll('.toggle-input')[0]
    await input.setValue(true)
    expect(wrapper.emitted('toggle-dark')).toBeTruthy()
  })

  it('emits toggle-show-clock when show clock toggle is changed', async () => {
    const wrapper = mount(SettingsModal, {
      props: { visible: true, showClock: true }
    })
    const input = wrapper.findAll('.toggle-input')[1]
    await input.setValue(false)
    expect(wrapper.emitted('toggle-show-clock')).toBeTruthy()
  })
})
