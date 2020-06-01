# Vue基础

## 面试题

+ v-html：会有 XSS 风险，会覆盖子组件
+ computed 和 watch 的区别
  + computed 有缓存，data 不变则不会重新计算
  + watch 深度监听，开启 deep: true
  + watch 监听引用类型，拿不到 oldVal。因为指针相同，已经指向了新的 val
+ v-for
  + v-for 可用于便利对象
  + v-for 和 v-if 不能一起使用，v-for 优先级大于 v-if
+ Vue 事件中的 event：event 是原生的；事件被挂在到当前元素
+ 事件修饰符、按键修饰符
+ Vue 高级特性
  + 自定义 v-model：配置 model: { prop: '', event: '' }
  + $nextTick
    + Vue 是异步渲染
    + data 改变之后，DOM 不会立刻渲染
    + $nextTick 会在 DOM 渲染之后被触发，以获取最新 DOM 节点
  + slot：基本使用、作用域插槽、具名插槽
  + 动态组件
    + :is = "component-name" 用法
    + 需要根据数据，动态渲染的场景。即组件类型不确定。
  + 异步组件
    + import() 函数
    + 按需加载，异步加载大组件
  + keep-alive：缓存组件；频繁切换，不需要重复渲染
  + mixin
    + 优点：多个组件有相同的逻辑，抽离出来
    + 缺点：变量来源不明确，不利于阅读；多mixin可能会造成命名冲突；mixin和组件可能出现多对多的关系，复杂度较高
+ Vuex
+ Vue-router
  + 路由模式（hash、H5 history）
  + 路由配置（动态路由、懒加载）
+ Vue原理
  + 核心API - Object.defineProperty
    + 缺点
      + 深度监听，需要递归到底，一次性计算量大
      + 无法监听新增属性/删除属性（Vue.set  Vue.delete）
+ v-show 和 v-if 的区别
+ 为何 v-for 中要用 key
+ 描述 Vue 组件生命周期(有父子组件的情况)
  + 加载渲染过程
    parent beforeCreated -> parent created -> parent beforeMount -> child beforeCreate -> child created -> child beforeMount -> child mounted -> parent mounted
  + 更新过程  
    parent beforeUpdate -> child beforeUpdate -> child updated -> parent updated
  + 销毁过程
    parent beforeDestroy -> child beforeDestroy -> child destroyed -> parent destroyed
+ Vue 组件如何通讯
+ 描述组件渲染和更新的过程
+ 双向数据绑定 v-model 的实现原理
