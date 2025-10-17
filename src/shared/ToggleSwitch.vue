<template>
  <label class="toggle-row">
    <span class="toggle-label">{{ label }}</span>
    <span class="toggle-switch">
      <input type="checkbox" :checked="modelValue" @change="onChange" class="toggle-input">
      <span class="toggle-slider"></span>
    </span>
  </label>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    label: {
      type: String,
      required: true
    },
    modelValue: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    onChange(event) {
      this.$emit('update:modelValue', event.target.checked);
      this.$emit('change', event.target.checked);
    }
  }
}
</script>

<style scoped>
.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8em;
  font-size: 1em;
  cursor: pointer;
  gap: 0.7em;
}
.toggle-label {
  color: var(--editor-text, #fff);
  font-size: 1em;
  font-weight: 400;
  letter-spacing: 0.01em;
  min-width: 90px;
  text-align: left;
  flex: 1 1 auto;
}
.toggle-switch {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
}
.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}
.toggle-slider {
  display: inline-block;
  width: 36px;
  height: 20px;
  background: #444;
  border-radius: 12px;
  position: relative;
  transition: background 0.2s;
  vertical-align: middle;
}
.toggle-row .toggle-input:checked + .toggle-slider {
  background: #399e42;
}
.toggle-slider:before {
  content: '';
  position: absolute;
  left: 3px;
  top: 3px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}
.toggle-row .toggle-input:checked + .toggle-slider:before {
  transform: translateX(16px);
}
</style>
