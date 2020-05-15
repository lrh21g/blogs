# Vue 实用技巧

## 全局组件注册

``` javascript
// 目录
// src
//  | --- components
//  |      | --- componentsA.vue
//  |      | --- componentsB.vue

// globalComponent.js
import Vue from 'vue' // 引入vue

// 处理首字母大写： abc => Abc
function changeStr(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// require.context(arg1, arg2, arg3)
// >>> arg1 - 读取文件的路径
// >>> arg2 - 是否遍历文件的子目录
// >>> arg3 - 匹配文件的正则
const requireComponent = require.context('.', false, /\.vue$/)
requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName)
  const componentName = changeStr(
    // ./componentsA.vue => componentsA
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '') 
  )
  // 动态注册该目录下的所有.vue文件
  Vue.component(componentName, config.default || config) 
})
```

## 权限指令

``` javascript
// permission.js
import store from '@/store'
export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const roles = store.getters && store.getters.roles
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}

// index.js
import permission from './permission'
const install = function(Vue) {
  Vue.directive('permission', permission)
}
if (window.Vue) {
  window['permission'] = permission
  Vue.use(install); // eslint-disable-line
}
permission.install = install
export default permission
```
