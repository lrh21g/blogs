<!-- eslint-disable vue/custom-event-name-casing -->
<!-- eslint-disable vue/require-explicit-emits -->

<script>
import Emitter from '../mixins/emitter.js'
import { findComponentsDownward } from '../utils/assist.js'

export default {
  name: 'ICheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrens: [],
    }
  },
  watch: {
    value() {
      this.updateModel(true)
    },
  },
  mounted() {
    this.updateModel(true)
  },
  methods: {
    updateModel(update) {
      this.childrens = findComponentsDownward(this, 'iCheckbox')
      if (this.childrens) {
        const { value } = this
        this.childrens.forEach((child) => {
          child.model = value
          if (update) {
            child.currentValue = value.includes(child.label)
            child.group = true
          }
        })
      }
    },
    change(data) {
      this.currentValue = data
      this.$emit('input', data)
      this.$emit('on-change', data)
      this.dispatch('iFormItem', 'on-form-change', data)
    },
  },
}
</script>

<template>
  <div>
    <slot />
  </div>
</template>
