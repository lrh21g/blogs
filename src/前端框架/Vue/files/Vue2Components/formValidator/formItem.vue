<!-- eslint-disable vue/no-deprecated-events-api -->

<script>
import AsyncValidator from 'async-validator'
import Emitter from '../mixins/emitter.js'

export default {
  name: 'IFormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isRequired: false, // 是否为必填
      validateState: '', // 校验状态
      validateMessage: '', // 校验不通过时的提示信息
    }
  },
  computed: {
    // 从 Form 的 model 中动态得到当前表单组件的数据
    fieldValue() {
      return this.form.model[this.prop]
    },
  },
  // 组件渲染时，将实例缓存在 Form 中
  mounted() {
    // 如果没有传入 prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this)
      // 设置初始值，以便在重置时恢复默认值
      this.initialValue = this.fieldValue
      this.setRules()
    }
  },
  // 组件销毁前，将实例从 Form 的缓存中移除
  beforeUnmount() {
    this.dispatch('iForm', 'on-form-item-remove', this)
  },
  methods: {
    setRules() {
      const rules = this.getRules()
      if (rules.length) {
        rules.every((rule) => {
          // 如果当前校验规则中有必填项，则标记出来
          this.isRequired = rule.required
          return rule
        })
      }
      this.$on('on-form-blur', this.onFieldBlur)
      this.$on('on-form-change', this.onFieldChange)
    },
    // 从 Form 的 rules 属性中，获取当前 FormItem 的校验规则
    getRules() {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || [])
    },
    // 只支持 blur 和 change，所以过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.includes(trigger))
    },
    /**
     * 校验数据
     * @param trigger 校验类型
     * @param callback 回调函数
     */
    validate(trigger, callback = function () {}) {
      const rules = this.getFilteredRule(trigger)
      if (!rules || rules.length === 0) {
        return true
      }
      // 设置状态为校验中
      this.validateState = 'validating'
      // 以下为 async-validator 库的调用方法
      const descriptor = {}
      descriptor[this.prop] = rules
      const validator = new AsyncValidator(descriptor)
      const model = {}
      model[this.prop] = this.fieldValue
      // firstFields: Boolean|String[], 对于指定字段，遇见第一条未通过的校验规则时便调用 callback 回调，而不再校验该字段的其他规则 ，传入 true 代表所有字段。
      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    },
    // 重置数据
    resetField() {
      this.validateState = ''
      this.validateMessage = ''
      this.form.model[this.prop] = this.initialValue
    },
    onFieldBlur() {
      this.validate('blur')
    },
    onFieldChange() {
      this.validate('change')
    },
  },
}
</script>

<template>
  <div class="i-form-item-container">
    <label v-if="label" class="i-form-item-label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}：</label>
    <div class="i-form-item-wrapper">
      <slot />
      <div v-if="validateState === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<style>
.i-form-item-container {
  margin-bottom: 24px;
  vertical-align: top;
  font-size: 15px;
}
.i-form-item-label {
  float: left;
  width: 80px;
}
.i-form-item-label-required {
  font-weight: bold;
}
.i-form-item-label-required:before {
  content: '*';
  color: #ed4014;
}
.i-form-item-wrapper {
  position: relative;
  margin-left: 80px;
}
.i-form-item-message {
  position: absolute;
  top: 100%;
  left: 0;
  color: #ed4014;
}
</style>
