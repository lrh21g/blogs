# Vue 2.x 相关组件实现

## 具有数据校验功能的表单组件

`Form组件` 的核心功能是数据校验，一个 `Form` 中包含了多个 `FormItem`，当点击提交按钮时，**逐一对每个 `FormItem` 内的表单组件校验，而校验是由使用者发起，并通过 `Form` 来调用每一个 `FormItem` 的验证方法，再将校验结果汇总后，通过 `Form` 返回出去**。

要在 `Form` 中逐一调用 `FormItem` 的验证方法，而 `Form` 和 `FormItem` 是独立的，**需要预先将 `FormItem` 的每个实例缓存在 `Form` 中**。当每个 `FormItem` 渲染时，将其自身（this）作为参数通过 dispatch 组件通信方法派发到 `Form` 组件中，然后通过一个数组缓存起来；同理当 `FormItem` 销毁时，将其从 `Form` 缓存的数组中移除。

``` md
/docs/.vuepress/components/vue2/formValidator
  |--- form.vue
  |--- formIndex.vue
  |--- formItem.vue
  |--- input.vue
```

<!-- <vue2-formValidator-formIndex /> -->

::: details formValidator/form.vue

@[code vue](../files/Vue2Components/formValidator/form.vue)

:::

::: details formValidator/formIndex.vue

@[code vue](../files/Vue2Components/formValidator/formIndex.vue)

:::

::: details formValidator/formItem.vue

@[code vue](../files/Vue2Components/formValidator/formItem.vue)

:::

::: details formValidator/input.vue

@[code vue](../files/Vue2Components/formValidator/input.vue)

:::

## 全局提示组件

显示一个信息提示组件的流程：`入口 alert.js` --> `info()` --- `add()` ---> `创建实例 notification.js` --- `add()` ---> `增加数据` --> `渲染alert.vue`

``` md
/docs/.vuepress/components/vue2/alert
  |--- alert.js
  |--- alert.vue
  |--- alertIndex.vue
  |--- notification.js
```

<!-- <vue2-alert-alertIndex /> -->

::: details alert/alert.js

@[code js](../files/Vue2Components/alert/alert.js)

:::

::: details alert/alert.vue

@[code vue](../files/Vue2Components/alert/alert.vue)

:::

::: details alert/alertIndex.vue

@[code vue](../files/Vue2Components/alert/alertIndex.vue)

:::

::: details alert/notification.js

@[code js](../files/Vue2Components/alert/notification.js)

:::

注意：

+ `alert.vue` 的最外层是有一个 .alert 节点的，它会在第一次调用 `$Alert` 时，在 body 下创建，因为不在 `<router-view>` 内，它不受路由的影响，也就是说一经创建，除非刷新页面，这个节点是不会消失的，所以在 `alert.vue` 的设计中，**并没有主动销毁这个组件，而是维护了一个子节点数组 notices**。
+ .alert 节点是 `position: fixed` 固定的，因此要**合理设计它的 `z-index`**，否则可能被其它节点遮挡。
+ `notification.js` 和 `alert.vue` 是可以复用的，如果还要开发其它同类的组件，比如二次确认组件 `$Confirm`, 只需要再写一个入口 `confirm.js`，并将 `alert.vue` 进一步封装，将 notices 数组的循环体写为一个新的组件，**通过配置来决定是渲染 Alert 还是 Confirm**，这在可维护性上是友好的。
+ 在 `notification.js` 的 new Vue 时，使用了 Render 函数来渲染 `alert.vue`，这是因为使用 template 在 runtime 的 Vue.js 版本下是会报错的。
+ 本例的 `content` 只能是字符串，如果要显示自定义的内容，除了用 `v-html 指令`，也能用 `Functional Render`。

## 可用 Render 自定义列的表格组件

``` md
/docs/.vuepress/components/vue2/renderTable
  |--- render.js
  |--- renderTableIndex.vue
  |--- tableRender.vue
```

<!-- <vue2-renderTable-renderTableIndex /> -->

::: details renderTable/render.js

@[code js](../files/Vue2Components/renderTable/render.js)

:::

::: details renderTable/renderTableIndex.vue

@[code vue](../files/Vue2Components/renderTable/renderTableIndex.vue)

:::

::: details renderTable/tableRender.vue

@[code vue](../files/Vue2Components/renderTable/tableRender.vue)

:::

## 可用 slot-scope 自定义列的表格组件

`slot(插槽)`: 用于分发内容。（常规的 `slot` 无法实现对组件循环体的每一项进行不同的内容分发）

`slot-scope`: 本质上跟 `slot` 一样，只不过可以传递参数

+ 方案一: `slot-scope` 实现，同时兼容 `Render` 函数的旧用法。适用于组件层级简单的表格。

  ``` md
  docs/.vuepress/components/vue2/slotScopeTable
    |--- render.js
    |--- slotScopeTableIndex1.vue
    |--- tableRender1.vue -- Table组件
  ```

  <!-- <vue2-slotScopeTable-slotScopeTableIndex1 /> -->

  ::: details slotScopeTable/render.js

  @[code js](../files/Vue2Components/slotScopeTable/render.js)

  :::

  ::: details slotScopeTable/slotScopeTableIndex1.vue

  @[code vue](../files/Vue2Components/slotScopeTable/slotScopeTableIndex1.vue)

  :::

  ::: details slotScopeTable/tableRender1.vue

  @[code vue](../files/Vue2Components/slotScopeTable/tableRender1.vue)

  :::

+ 方案二: 如果组件已经成型（某 API 基于 Render 函数），但一时间不方便支持 `slot-scope`，而使用者又想用，则可以使用此方案。一种 hack 方式，不推荐使用。

  ``` md
  docs/.vuepress/components/slotScopeTable
    |--- render.js
    |--- slotScopeTableIndex2.vue
    |--- tableRender2.vue -- Table组件
  ```

  <!-- <vue2-slotScopeTable-slotScopeTableIndex2 /> -->

  ::: details slotScopeTable/render.js

  @[code js](../files/Vue2Components/slotScopeTable/render.js)

  :::

  ::: details slotScopeTable/slotScopeTableIndex2.vue

  @[code vue](../files/Vue2Components/slotScopeTable/slotScopeTableIndex2.vue)

  :::

  ::: details slotScopeTable/tableRender2.vue

  @[code vue](../files/Vue2Components/slotScopeTable/tableRender2.vue)

  :::

+ 方案三: 将 `slot-scope` 集成在 `Table组件` 中，并使用 `provide` / `inject` 进行数据传递，用于组件层级复杂的表格。不会破坏原有的任何内容，但会额外支持 `slot-scope` 用法，关键是改动简单。

  ``` md
  docs/.vuepress/components/vue2/slotScopeTable
    |--- render.js
    |--- slot.js
    |--- slotScopeTableIndex3.vue
    |--- tableRender3.vue -- Table组件
  ```

  <!-- <vue2-slotScopeTable-slotScopeTableIndex3 /> -->

  ::: details slotScopeTable/render.js

  @[code js](../files/Vue2Components/slotScopeTable/render.js)

  :::

  ::: details slotScopeTable/slot.js

  @[code js](../files/Vue2Components/slotScopeTable/slot.js)

  :::

  ::: details slotScopeTable/slotScopeTableIndex2.vue

  @[code vue](../files/Vue2Components/slotScopeTable/slotScopeTableIndex3.vue)

  :::

  ::: details slotScopeTable/tableRender3.vue

  @[code vue](../files/Vue2Components/slotScopeTable/tableRender3.vue)

  :::

## 树形控件（递归组件） — Tree

递归组件的两个必要条件：

+ 要给组件设置 name；
+ 要有一个明确的结束条件

这类组件一般都是**数据驱动型**的，父级有一个字段 children，然后递归。

``` md
/docs/.vuepress/components/vue2/tree
  |--- node.vue
  |--- tree.vue
  |--- treeIndex.vue

/docs/.vuepress/components/vue2/utils
  |--- assist.js
```

<!-- <vue2-tree-treeIndex /> -->

::: details tree/node.vue

@[code vue](../files/Vue2Components/tree/node.vue)

:::

::: details tree/tree.vue

@[code vue](../files/Vue2Components/tree/tree.vue)

:::

::: details tree/treeIndex.vue

@[code vue](../files/Vue2Components/tree/treeIndex.vue)

:::

::: details utils/assist.js

@[code js](../files/Vue2Components/utils/assist.js)

:::
