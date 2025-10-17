import { mount } from '@vue/test-utils'
import ToggleSwitch from '../shared/ToggleSwitch.vue'

describe('ToggleSwitch', () => {
  it('renders label correctly', () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Test Label', modelValue: false }
    })
    expect(wrapper.text()).toContain('Test Label')
  })

  it('reflects modelValue checked state', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Test', modelValue: true }
    })
    const input = wrapper.find('input[type="checkbox"]')
    expect(input.element.checked).toBe(true)
  })

  it('emits update:modelValue and change on toggle', async () => {
    const wrapper = mount(ToggleSwitch, {
      props: { label: 'Test', modelValue: false }
    })
    const input = wrapper.find('input[type="checkbox"]')
    await input.setChecked(true)
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0][0]).toBe(true)
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0][0]).toBe(true)
  })
})
