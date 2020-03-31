<template>
  <div class="alert-container">
    <button @click="handleOpen1">打开提示 1</button>
    <button @click="handleOpen2">打开提示 2</button>
  </div>
</template>

<script>
import Vue from 'vue'
import Alert from './alert.js'

Vue.prototype.$Alert = Alert

export default {
  methods: {
    handleOpen1() {
      this.$Alert.info({
        content: "我是提示信息 1"
      });
    },
    handleOpen2() {
      this.$Alert.info({
        content: "我是提示信息 2",
        duration: 3
      });
    }
  }
};
</script>

<style scoped>
.alert-container {
  padding-top: 24px;
}
</style>