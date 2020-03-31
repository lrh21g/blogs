# Vue 组件

## 具有数据校验功能的表单组件

组件目录

``` txt
docs/.vuepress/components/validator-form
  |--- formIndex.vue
  |--- form-item.vue
  |--- form.vue
  |--- input.vue
```

`Form组件` 的核心功能是数据校验，一个 `Form` 中包含了多个 `FormItem`，当点击提交按钮时，**逐一对每个 `FormItem` 内的表单组件校验，而校验是由使用者发起，并通过 `Form` 来调用每一个 `FormItem` 的验证方法，再将校验结果汇总后，通过 `Form` 返回出去**。

要在 `Form` 中逐一调用 `FormItem` 的验证方法，而 `Form` 和 `FormItem` 是独立的，**需要预先将 `FormItem` 的每个实例缓存在 `Form` 中**。当每个 `FormItem` 渲染时，将其自身（this）作为参数通过 dispatch 组件通信方法派发到 `Form` 组件中，然后通过一个数组缓存起来；同理当 `FormItem` 销毁时，将其从 `Form` 缓存的数组中移除。

<validator-form-formIndex />

## 全局提示组件

组件目录

``` txt
docs/.vuepress/components/alert
  |--- alertIndex.vue
  |--- alert.js
  |--- alert.vue
  |--- notification.js
```

显示一个信息提示组件的流程：`入口 alert.js` --> `info()` --- `add()` ---> `创建实例 notification.js` --- `add()` ---> `增加数据` --> `渲染alert.vue`

<alert-alertIndex />

注意：

+ `alert.vue` 的最外层是有一个 .alert 节点的，它会在第一次调用 `$Alert` 时，在 body 下创建，因为不在 `<router-view>` 内，它不受路由的影响，也就是说一经创建，除非刷新页面，这个节点是不会消失的，所以在 `alert.vue` 的设计中，**并没有主动销毁这个组件，而是维护了一个子节点数组 notices**。
+ .alert 节点是 `position: fixed` 固定的，因此要**合理设计它的 `z-index`**，否则可能被其它节点遮挡。
+ `notification.js` 和 `alert.vue` 是可以复用的，如果还要开发其它同类的组件，比如二次确认组件 `$Confirm`, 只需要再写一个入口 `confirm.js`，并将 `alert.vue` 进一步封装，将 notices 数组的循环体写为一个新的组件，**通过配置来决定是渲染 Alert 还是 Confirm**，这在可维护性上是友好的。
+ 在 `notification.js` 的 new Vue 时，使用了 Render 函数来渲染 `alert.vue`，这是因为使用 template 在 runtime 的 Vue.js 版本下是会报错的。
+ 本例的 `content` 只能是字符串，如果要显示自定义的内容，除了用 `v-html 指令`，也能用 `Functional Render`。
