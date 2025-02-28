<!-- eslint-disable no-alert -->
<script>
import iForm from './form.vue'
import iFormItem from './formItem.vue'
import iInput from './input.vue'

export default {
  components: { IForm: iForm, IFormItem: iFormItem, IInput: iInput },
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
      },
      ruleValidate: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('提交成功！')
        }
        else {
          window.alert('表单校验失败！')
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
    },
  },
}
</script>

<template>
  <div>
    <!-- <h3>具有数据校验功能的表单组件 - From</h3> -->
    <IForm ref="form" class="i-form-container" :model="formValidate" :rules="ruleValidate">
      <IFormItem label="用户名" prop="name">
        <IInput v-model="formValidate.name" />
      </IFormItem>
      <IFormItem label="邮箱" prop="mail">
        <IInput v-model="formValidate.mail" />
      </IFormItem>
    </IForm>
    <button @click="handleSubmit">
      提交
    </button>
    <button @click="handleReset">
      重置
    </button>
  </div>
</template>

<style scoped>
.i-form-container {
  padding-top: 24px;
}
</style>
