# Vue3基础

## Vue3提升

### diff方法优化：PathFlag(静态标记)

+ Vue2 中的虚拟DOM是进行全量对比
+ Vue3 中新增静态标记(PathFlag)，只对比带有 PathFlag 的节点，并且可以通过 PathFlag 的信息得知当前节点要对比的具体内容

![vue2vsvue3diff](./../files/images/vue2vsvue3diff.drawio.png)

``` javascript
<div>
  <span>{{language}}</span>
  <span>Hello World!</span>
</div>

import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, _toDisplayString(_ctx.language), 1 /* TEXT */),
    _createVNode("span", null, "Hello World!")
  ]))
}
```

``` javascript
export const enum PatchFlags {
  TEXT = 1,                   // 动态文本节点
  CLASS = 1 << 1,             // 2    // 动态 class
  STYLE = 1 << 2,             // 4    // 动态 style
  PROPS = 1 << 3,             // 8    // 动态属性，但不包含类名和样式
  FULL_PROPS = 1 << 4,        // 16   // 具有动态 key 属性，当 key 改变时，需要进行完整的 diff 比较。
  HYDRATE_EVENTS = 1 << 5,    // 32   // 带有监听事件的节点
  STABLE_FRAGMENT = 1 << 6,   // 64   // 一个不会改变子节点顺序的 fragment
  KEYED_FRAGMENT = 1 << 7,    // 128  // 带有 key 属性的 fragment 或部分子字节有 key
  UNKEYED_FRAGMENT = 1 << 8,  // 256  // 子节点没有 key 的 fragment
  NEED_PATCH = 1 << 9,        // 512  // 一个节点只会进行非 props 比较
  DYNAMIC_SLOTS = 1 << 10,    // 1024 // 动态 slot
  HOISTED = -1,               // 特殊标志，负整数表示永远不会用作 diff
  BAIL = -2                   // 特殊标志，指代差异算法
}
```

### hoistStatic(静态提升)

+ Vue2 中无论元素是否参与更新，每次都会重新创建，然后再渲染
+ Vue3 中对不参与更新的元素，会做静态提升，只会被创建一次，在渲染时复用

``` javascript
<div>
  <span>{{language}}</span>
  <span>Hello World!</span>
</div>

// 静态提升之前
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, _toDisplayString(_ctx.language), 1 /* TEXT */),
    _createVNode("span", null, "Hello World!")
  ]))
}

// 静态提升之后
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"
// _hoisted_1 被 PathFlag（静态标记） 为 -1 ：特殊标志，负整数表示永远不会用作 diff
const _hoisted_1 = /*#__PURE__*/_createVNode("span", null, "Hello World!", -1 /* HOISTED */)
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, _toDisplayString(_ctx.language), 1 /* TEXT */),
    _hoisted_1
  ]))
}
```

### cacheHandlers(事件侦听器缓存)

默认情况下 `@click` 事件被认为是动态变量，每次更新视图的时候都会追踪它的变化。但正常情况下，`@click` 事件在视图渲染前和渲染后，都是同一个事件，基本上不需要去追踪它的变化，所以直接缓存起来复用即可。

``` javascript
<div>
  <span>{{language}}</span>
  <span @click="handleClick">Hello World!</span>
</div>

// 事件侦听器缓存之前
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, _toDisplayString(_ctx.language), 1 /* TEXT */),
    // PathFlag（静态标记） 为 8 ：动态属性，但不包含类名和样式
    _createVNode("span", { onClick: _ctx.handleClick }, "Hello World!", 8 /* PROPS */, ["onClick"])
  ]))
}

// 事件侦听器缓存之后
import { toDisplayString as _toDisplayString, createVNode as _createVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, _toDisplayString(_ctx.language), 1 /* TEXT */),
    // 开启 cacheHandlers(事件侦听器缓存) 之后，编译后没有 PathFlag（静态标记），表明 span标签 不再被追踪比较变化
    _createVNode("span", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
    }, "Hello World!")
  ]))
}
```

### SSR 服务端渲染

当有大量静态的内容时候，这些内容会被当做纯字符串推进一个 `buffer` 里面，即使存在动态的绑定，会通过模板插值嵌入进去。这样会比通过虚拟DOM来渲染更快。

``` javascript
<div>
  <span>{{language}}</span>
  <span @click="handleClick">Hello World!</span>
  <span>HTML</span>
  <span>CSS</span>
  <span>JavaScript</span>
  <span>Vue</span>
  <span>React</span>
  <span>HTML</span>
  <span>CSS</span>
  <span>JavaScript</span>
  <span>Vue</span>
  <span>React</span>
</div>

import { mergeProps as _mergeProps } from "vue"
import { ssrRenderAttrs as _ssrRenderAttrs, ssrInterpolate as _ssrInterpolate } from "@vue/server-renderer"
// SSR渲染
export function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _cssVars = { style: { color: _ctx.color }}
  _push(`<div${
    _ssrRenderAttrs(_mergeProps(_attrs, _cssVars))
  }><span>${
    _ssrInterpolate(_ctx.language)
  }</span><span>Hello World!</span><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Vue</span><span>React</span><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Vue</span><span>React</span></div>`)
}
```

### StaticNode(静态节点)

当静态内容大到一定量级时候，会用 `_createStaticVNode` 方法在客户端去生成一个 `static node`，这些静态node，会被直接 innerHtml，就不需要创建对象，然后根据对象渲染。

``` javascript
<div>
  <span>{{language}}</span>
  <span @click="handleClick">Hello World!</span>
  <span>HTML</span>
  <span>CSS</span>
  <span>JavaScript</span>
  <span>Vue</span>
  <span>React</span>
  <span>HTML</span>
  <span>CSS</span>
  <span>JavaScript</span>
  <span>Vue</span>
  <span>React</span>
</div>

import { toDisplayString as _toDisplayString, createVNode as _createVNode, createStaticVNode as _createStaticVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"
// StaticNode(静态节点)
const _hoisted_1 = /*#__PURE__*/_createStaticVNode("<span>HTML</span><span>CSS</span><span>JavaScript</span><span>Vue</span><span>React</span><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Vue</span><span>React</span>", 10)
export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock("div", null, [
    _createVNode("span", null, _toDisplayString(_ctx.language), 1 /* TEXT */),
    _createVNode("span", {
      onClick: _cache[1] || (_cache[1] = (...args) => (_ctx.handleClick && _ctx.handleClick(...args)))
    }, "Hello World!"),
    _hoisted_1
  ]))
}
```

## Vite

Vite 是利用 ES6 的 import 会发送请求和加载文件的特性，然后拦截请求，做一些预编译，省去 webpack 冗长的打包时间。

``` shell
# 安装 Vite
npm install -g create-vite-app

# 创建 Vue3 项目
create-vite-app projectName
```

## 相关API

ref 函数只能监听简单类型的变化，不能监听复杂类型的变化（对象/数组）

### setup

`setup` 执行时，尚未创建组件实例，因此在 `setup` 选项中没有 `this`，无法访问组件中声明的任何属性（本地状态`data`、计算属性`methods`或方法`computed`）。`setup` 函数只能是同步不能是异步。

使用 `setup` 函数时，它将接受两个参数

+ `props`
  `props` 是响应式的，不能使用 ES6 解构，会消除 `prop` 的响应性，通过使用 `setup` 函数中的 `toRefs` 来安全地完成此操作
+ `context`
  `context` 是一个普通的 JavaScript 对象，可以对 `context` 使用 ES6 解构。

  `attrs` 和 `slots` 是有状态的对象，它们总是会随组件本身的更新而更新。这意味着你应该避免对它们进行解构，并始终以 attrs.x 或 slots.x 的方式引用 property。
  
  请注意，与 props 不同，attrs 和 slots 是非响应式的。如果你打算根据 attrs 或 slots 更改应用副作用，那么应该在 onUpdated 生命周期钩子中执行此操作。

``` javascript
export default {
  setup(props, { attrs, slots, emit }) {
    // attrs 和 slots 是有状态的对象，会随组件本身的更新而更新。
    // 应该避免对它们进行解构，并始终以 attrs.x 或 slots.x 的方式引用 property。
    // attrs 和 slots 是非响应式的
    // 如果需要根据 attrs 或 slots 更改应用副作用，应在 onUpdated 生命周期钩子中执行操作。
  }
}
```

在生命周期钩子前面加上 `on` 来访问组件的生命周期钩子。在 `setup()` 内部调用生命周期钩子如下：

|    选项式 API     | Hook inside `setup` |
| :---------------: | :-----------------: |
|  `beforeCreate`   |     Not needed*     |
|     `created`     |     Not needed*     |
|   `beforeMount`   |   `onBeforeMount`   |
|     `mounted`     |     `onMounted`     |
|  `beforeUpdate`   |  `onBeforeUpdate`   |
|     `updated`     |     `onUpdated`     |
|  `beforeUnmount`  |  `onBeforeUnmount`  |
|    `unmounted`    |    `onUnmounted`    |
|  `errorCaptured`  |  `onErrorCaptured`  |
|  `renderTracked`  |  `onRenderTracked`  |
| `renderTriggered` | `onRenderTriggered` |

``` javascript
export default {
  setup() {
    // mounted
    onMounted(() => {
      console.log('Component is mounted!')
    })
  }
}
```

### ref

接受一个内部值并返回一个响应式且可变的 `ref` 对象。`ref` 对象具有指向内部值的单个 property `.value`。

如果将对象分配为 `ref` 值，则可以通过 `reactive` 方法使该对象具有高度的响应式。

`ref` 的本质其实还是 `reactive` 。Vue3 会根据给 `ref` 传入的值转换成：`ref(xxx) --> reactive({value: xxx})`

注意：

+ 在 `<template>` 标签中，使用 `ref` 的值不需要通过 `.value` 获取
+ 在 JavaScript 中，使用 `ref` 的值必须通过 `.value` 获取

``` html
<template>
  <div>
    <p>{{ name }}</p>
    <button @click="changeName">change button</button>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  name: 'App',
  setup() {
    let name = ref('lrh');
    function changeName() {
      name.value = '小海';
    }
    return {name, changeName};
  }
}
</script>
```

### reactive

`reactive` 返回对象的响应式副本。响应式转换是“深层”的 —— 它影响所有嵌套 property。在基于 ES6 `Proxy` 的实现中，返回的代理是**不等于**原始对象。建议只使用响应式代理，避免依赖原始对象。

+ Vue2 中，响应式数据通过 defineProperty 实现
+ Vue3 中，响应式数据通过 ES6 `Proxy` 实现。

`reactive` 参数必须是对象(`obj` / `arr`)。如果为其他对象，默认情况下修改对象，界面不会自动更新，如果需要更新，可以通过重新赋值的方式更新。

``` html
<template>
  <div>
    <p>{{ state.time }}</p>
    <button @click="changeTime">change button</button>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
  name: 'App',
  setup() {
    let state = reactive({
      time: new Date()
    });
    function changeTime() {
      // 重新赋值，触发界面更新
      const newTime = new Date(state.time.getTime());
      newTime.setDate(state.time.getDate() + 1);
      state.time = newTime;
    }
    return {state, changeTime};
  }
}
</script>
```

### ref 与 reactive 的区别

+ `<template>` 标签中, `ref` 会自动添加 `.value`
+ `<template>` 标签中, `reactive` 不会自动添加 `.value`
+ 通过 `isRef` / `isReactive` 判断数据的类型。
  
  Vue3 在解析数据之前，会通过当前数据的 `__v_ref` 来判断数据是否是 `ref` 类型的。如果有这个私有属性，并取值为 true ，则为 `ref` 类型。在 `<template>` 标签中自动添加 `.value`。

默认情况下，无论是否通过 `ref` / `reactive` 都是**递归监听**的。当数据量较大的时候，非常消耗性能。

### shallowReactive / shallowRef / triggerRef

+ `shallowReactive`

  创建一个响应式代理，该代理跟踪其自身 `property` 的响应性，但不执行嵌套对象的深度响应式转换 (暴露原始值)。

  ``` html
  <template>
    <div>
      <p>{{ state.a }}</p>
      <p>{{ state.b.c }}</p>
      <p>{{ state.b.d.e }}</p>
      <p>{{ state.b.d.f.g }}</p>
      <button @click="changeState">change button</button>
    </div>
  </template>

  <script>
  import { shallowReactive } from 'vue';
  export default {
    name: 'App',
    setup() {
      let state = shallowReactive({
        a: 'a',
        b: { c: 'c', d: { e: 'e', f: { g: 'g', } } }
      });
      function changeState() {
        // shallowReactive 只监听第一层
        // 因为 state.a = 'a1' 第一层数据被修改，界面会刷新
        // 所以也会触发 c e g 值的更新
        state.a = 'a1';
        state.b.c = 'c1';
        state.b.d.e = 'e1';
        state.b.d.f.g = 'g1';

        // 如果不修改第一层，则界面上的值不会被修改
        // state.b.c = 'c1';
        // state.b.d.e = 'e1';
        // state.b.d.f.g = 'g1';
      }
      return {state, changeState};
    }
  }
  </script>
  ```

+ `shallowRef`
  
  创建一个 `ref`，它跟踪自己的 `.value` 更改，但不会使其值成为响应式的。

  ``` html
  <template>
    <div>
      <p>{{ state.a }}</p>
      <p>{{ state.b.c }}</p>
      <p>{{ state.b.d.e }}</p>
      <p>{{ state.b.d.f.g }}</p>
      <button @click="changeState">change button</button>
    </div>
  </template>

  <script>
  import { shallowRef } from 'vue';
  export default {
    name: 'App',
    setup() {
      // ref -> reactive
      // ref(10) -> reactive({ value: 10 })
      // shallowRef -> shallowReactive
      // shallowRef(10) -> shallowReactive({ value: 10 })
      let state = shallowRef({
        b: { c: 'c', d: { e: 'e', f: { g: 'g', } } }
      });
      function changeState() {
        // 通过 shallowRef 创建数据，Vue 监听的是 .value 的变化，并不是数据第一层的变化
        // 所以将 state.value 的值进行修改，则会触发界面的更新
        state.value = {
          a: 'a1',
          b: { c: 'c1', d: { e: 'e1', f: { g: 'g1', } } }
        };
      }
      return {state, changeState};
    }
  }
  </script>
  ```

+ `triggerRef`
  
  手动执行与 `shallowRef` 关联的任何效果。Vue3 没有提供 `triggerReactive` 方法，如果是 `reactive` 类型的数据, 则无法主动触发界面更新。

  ``` html
  <template>
    <div>
      <p>{{ state.a }}</p>
      <p>{{ state.b.c }}</p>
      <p>{{ state.b.d.e }}</p>
      <p>{{ state.b.d.f.g }}</p>
      <button @click="changeState">change button</button>
    </div>
  </template>

  <script>
  import { shallowRef } from 'vue';
  export default {
    name: 'App',
    setup() {
      let state = shallowRef({
        b: { c: 'c', d: { e: 'e', f: { g: 'g', } } }
      });
      function changeState() {
        // 使用如下方式修改，不会触发界面更新
        // 需要使用 triggerRef 根据 state 修改之后的数据，触发页面的更新
        state.value.a = 'a1';
        state.value.b.c = 'c1';
        state.value.b.d.e = 'e1';
        state.value.b.d.f.g = 'g1';
        triggerRef(state);
      }
      return {state, changeState};
    }
  }
  </script>
  ```

### toRaw

返回 `reactive` 或 `readonly` 代理的原始对象。用于临时读取而不会引起代理访问/跟踪开销，也可用于写入而不会触发更改。不建议保留对原始对象的持久引用。

`ref` / `reactive` 每次被修改都会触发更新界面，这样会非常消耗性能。对于一些不需要追踪和更新界面的操作，可以使用 `toRaw` 获取到原始对象进行修改，可以优化性能。

``` html
<template>
  <div>
    <p>{{ state }}</p>
    <button @click="changeState">change button</button>
  </div>
</template>

<script>
import { reactive, toRaw } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = { name: 'lrh', age: 24 };
    // state 与 obj 是引用关系
    // state 的本质是一个 Proxy 对象, 在这个 Proxy 对象中引用了 obj
    let state = reactive(obj);
    let obj2 = toRaw(state);

    // 如果通过 toRaw 获取 ref 类型的原始数据，必需明确要获取的是 .value 的值
    // 经过 Vue 处理之后, .value 中保存的才是创建时传入的原始数据
    // let obj = { name: 'lrh', age: 24 };
    // let state = ref(obj);
    // let obj2 = toRaw(state.value)

    console.log(obj === obj2); // true
    console.log(obj === state); // false

    function changeState() {
      // 直接修改 obj 的数据，无法触发界面更新
      // 只能通过包装之后的对象进行修改，才能触发界面更新
      obj2.name = '21g'; // 无法触发界面更新
    }
    return {state, changeState};
  }
}
</script>
```

### markRaw

标记一个对象，使其永远不会转换为代理。返回对象本身。一般在编写第三方库时使用。

``` html
<template>
  <div>
    <p>{{ state }}</p>
    <button @click="changeState">change button</button>
  </div>
</template>

<script>
import { reactive, markRaw } from 'vue';
export default {
  name: 'App',
  setup() {
    let obj = { name: 'lrh', age: 24 };
    obj = markRaw(obj);
    // 使用 markRaw 标记之后，在使用 reactive(obj) ，数据也无法更新
    let state = reactive(obj);
    function changeState() {
      state.name = '21g';
    }
    return {state, changeState};
  }
}
</script>
```

### toRef / toRefs

+ `toRef`: 可以用来为源响应式对象上的 `property` 新创建一个 `ref`。然后可以将 `ref` 传递出去，从而保持对其源 `property` 的响应式连接。
+ `toRefs`: 将响应式对象转换为普通对象，其中结果对象的每个 `property` 都是指向原始对象相应 `property` 的 `ref`。

`toRef` 使用场景：将响应式数据与源数据进行关联，更新响应式数据不会更新界面。

`ref` 与 `toRef` 的区别

+ 使用 `ref` 相当于对源数据进行复制，修改响应式数据**不会**影响源数据，**会**触发界面更新
+ 使用 `toRef` 相当于对源数据进行引用，修改响应式数据**会**影响源数据，**不会**触发界面更新

``` html
<template>
  <div>
    <p>ref --> name: {{ nameStateRef }}</p>
    <p>toRef --> age: {{ ageStateToRef }}</p>
    <p>toRefs --> info: {{ infoStateToRefs }}</p>
    <button @click="changeNameStateRef">change name button</button>
    <button @click="changeAgeStateToRef">change age button</button>
    <button @click="changeInfoStateToRefs">change info button</button>
  </div>
</template>

<script>
import { ref, toRef, toRefs } from 'vue';
export default {
  name: 'App',
  setup() {
    let nameObj = { name: 'lrh' }
    let ageObj = { age: 18 };
    let infoObj = { name: 'lrh', age: 18 }
    let nameStateRef = ref(nameObj);
    let ageStateToRef = toRef(ageObj, 'age');
    let infoStateToRefs = toRefs(infoObj);

    function changeNameStateRef() {
      // ref
      // 使用 ref 将对象中的某一个属性变成响应式数据
      // 修改数据不会影响源数据，会触发界面更新
      nameStateRef.value = 'lrh21g';
      console.log('nameObj', nameObj);
      // {name: "lrh"}
      console.log('nameStateRef', nameStateRef);
      // RefImpl {_rawValue: "lrh21g", _shallow: false, __v_isRef: true, _value: "lrh21g"}
    }

    function changeAgeStateToRef() {
      // toRef
      // 使用 toRef 将对象中的某一个属性变成响应式数据
      // 修改数据会影响源数据，不会触发界面更新
      ageStateToRef.value = '24';
      console.log('ageObj', ageObj);
      // {age: "24"}
      console.log('ageStateToRef', ageStateToRef);
      // ObjectRefImpl {_object: {…}, _key: "age", __v_isRef: true}
    }

    function changeInfoStateToRefs() {
      infoStateToRefs.name.value = 'lrh21g';
      infoStateToRefs.age.value = 24;
      console.log('infoObj', infoObj);
      // {name: "lrh21g", age: 24}
      console.log('infoStateToRefs', infoStateToRefs);
      // {
      //   age: ObjectRefImpl {_object: {…}, _key: "age", __v_isRef: true}
      //   name: ObjectRefImpl {_object: {…}, _key: "name", __v_isRef: true}
      // }
    }

    return {nameStateRef, ageStateToRef, infoStateToRefs, changeNameStateRef, changeAgeStateToRef, changeInfoStateToRefs};
  }
}
</script>
```

### customRef

创建一个自定义的 `ref`，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 `track` 和 `trigger` 函数作为参数，并应返回一个带有 `get` 和 `set` 的对象。

``` html
<template>
  <ul>
    <li v-for="item in state" :key="item.id">{{ item.name }}</li>
  </ul>
</template>

<script>
import { ref, customRef } from 'vue';

function createRefFun(value) {
  return customRef((track, trigger) => {
    fetch(value).then((res) => {
      return res.json()
    }).then((data) => {
      console.log(data);
      value = data;
      trigger(); // 触发界面更新函数
    }).catch((err) => {
      console.log('err', err)
    });

    return {
      get() {
        // 注意：
        // 不能在 get 方法中发送网络请求，会触发死循环：
        // 渲染界面 --> 调用 get -->  发送网络请求 --> 保存数据 --> 更新界面  --> 调用 get
        console.log('customRef get', value);
        track(); // 触发追踪数据变化函数
        return value;
      },
      set(newValue) {
        console.log('customRef set', newValue);
        value = newValue;
        trigger(); // 触发界面更新函数
      }
    };
  })
}

export default {
  name: 'App',
  // setup函数: 只能是同步函数, 不能是异步函数，无法使用 async/await
  setup() {
    let state = createRefFun('../public/data.json');
    return { state };
  }
}
</script>
```

### ref 获取DOM

``` html
<template>
  <div ref="domRef"></div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'App',
  setup() {
    let domRef = ref(null); // reactive({ value: null })
    onMounted(() => {
      console.log('onMounted', domRef.value)
    })
    console.log('domRef', domRef.value); // null
    return { domRef };
  }
}
</script>
```

### readonly

+ `readonly`: 获取一个对象 (响应式或纯对象) 或 `ref` 并返回原始代理的只读代理。只读代理是深层的：访问的任何嵌套 `property` 也是只读的。
+ `shallowReadonly`: 创建一个代理，使其自身的 `property` 为只读，但**不执行**嵌套对象的深度只读转换 (暴露原始值)。
+ `isReadonly`: 检查对象是否是由 `readonly` 创建的只读代理。
