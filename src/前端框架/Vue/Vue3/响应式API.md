# Vue3 响应式 API

## ref()

`ref()` 接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 `.value` 。

```js
const count = ref(0)
console.log(count.value) // 0

count.value = 1
console.log(count.value) // 1
```

- 支持基本数据类型 + 引用数据类型，需要使用 `.value` 访问属性

  如果将一个对象赋值给 ref，那么这个对象将通过 `reactive()` 转为具有深层次响应式的对象。也意味着如果对象中包含了嵌套的 ref，它们将被深层地解包。

  若要避免这种深层次的转换，可使用 `shallowRef()` 来替代

- 在 `<script>` 和 `<template>` 使用方式不同：`<script>` 中需要使用 `.value`
- 重新分配一个新对象**不会失去响应性**
- 传入函数时，**不会失去响应性**
- 解构对象时会**失去响应性**，需使用 `toRefs`

ref 的解包

- 一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。
  - 只有当嵌套在一个**深层响应式对象**内时，才会发生 ref **解包**。
  - 当其作为**浅层响应式对象**的属性被访问时，**不会解包**。

  ```js
  const count = ref(0)
  const state = reactive({ count })

  console.log(state.count) // 0

  state.count = 1
  console.log(count.value) // 1
  ```

- 将一个新的 ref 赋值给一个关联了已有 ref 的属性，那么它会替换掉旧的 ref

  ```js
  const count = ref(0)
  const state = reactive({ count })
  const otherCount = ref(2)

  state.count = 1
  state.count = otherCount

  console.log(state.count) // 2
  // 原始 ref 现在已经和 state.count 失去联系
  console.log(count.value) // 1
  ```

- 当 ref 作为响应式数组或原生集合类型 (如 Map) 中的元素被访问时，它不会被解包

  ```js
  const books = reactive([ref('Vue 3 Guide')])
  // 这里需要 .value
  console.log(books[0].value)

  const map = reactive(new Map([['count', ref(0)]]))
  // 这里需要 .value
  console.log(map.get('count').value)
  ```

- 在模板渲染上下文中，只有顶级的 ref 属性才会被解包。

  ```js
  const count = ref(0)
  const object = { id: ref(1) }

  // {{ count + 1 }} // 该表达式会按预期工作
  // {{ object.id + 1 }} // 该表达式不会按预期工作

  const { id } = object
  // {{ id + 1 }} // 将 id 解构为一个顶级属性，该表达式会按预期工作

  // 如果 ref 是文本插值的最终计算值 (即 {{ }} 标签)，那么它将被解包
  // {{ object.id }} // 等价于 {{ object.id.value }}
  ```

## reactive()

> 非必要不要使用 reactive ，建议使用 `ref()`

`reactive()` 返回一个对象的响应式代理。

- 只支持对象和数组（引用数据类型）
- 在 `<script>` 和 `<template>` 中无差别使用
- 重新分配一个新对象会**失去响应性**

  ref 定义数据（包括对象）时，都会变成 RefImpl(Ref 引用对象) 类的实例，无论是修改还是重新赋值都会调用 setter，都会经过 reactive 方法处理为响应式对象。

  reactive 定义数据（必须是对象），是直接调用 reactive 方法处理成响应式对象。如果重新赋值，就会丢失原来响应式对象的引用地址，变成一个新的引用地址，这个新的引用地址指向的对象是没有经过 reactive 方法处理的，所以是一个普通对象，而不是响应式对象。解构同理。

  ```js
  const state = reactive({ count: 0 })

  // 直接替换整个对象，回丢失响应性
  // state = { count: 1 }

  // 修改对象属性，不会丢失响应性
  state.count = 1

  // 使用 Object.assign ，不会丢失响应性（部分情况下不适用）
  state = Object.assign(state , { count:1 })

  // 使用 ref()
  const state = ref({ count: 0 })

  // 在 reactive 中嵌套一层
  // 使用 reactive 函数将 data 转换为响应式对象，在后续更新 data 对象的 data属性时，则会自动更新相应的 UI
  const state = reactive({ data: { count: 0 } })
  state.data.count = 1
  ```

- 将对象传入函数时，**失去响应性**
- 解构时会**失去响应性**，需使用 `toRefs`

## readonly()

接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。

- 只读代理是深层的：对任何嵌套属性的访问都将是只读的。
- 它的 ref 解包行为与 `reactive()` 相同，但解包得到的值是只读的。

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
```

## customRef()

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

customRef() 预期接收一个工厂函数作为参数，这个工厂函数接受 track 和 trigger 两个函数作为参数，并返回一个带有 get 和 set 方法的对象。

一般来说，track() 应该在 get() 方法中调用，而 trigger() 应该在 set() 中调用。然而事实上，你对何时调用、是否应该调用他们有完全的控制权。

```js
import { customRef } from 'vue'

// 创建一个防抖 ref，即只在最近一次 set 调用后的一段固定间隔后再调用：
export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
```

## toRef / toRefs / unref / toValue / toRaw

### toRef()

- 可以将值、refs 或 getters 规范化为 refs 。
- 可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。
- 当 toRef 与组件 props 结合使用时，关于禁止对 props 做出更改的限制依然有效。可以使用带有 get 和 set 的 `computed` 替代。

```js
const state = reactive({ foo: 1, bar: 2 })

// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo')
// 以下创建的 ref 不会和 state.foo 保持同步，因为 ref() 接收到的是一个纯数值
// const fooRef = ref(state.foo)

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```

### toRefs()

`toRefs()` 将一个响应式对象转换为一个普通对象。

- 该普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 `toRef()` 创建的。
- 使用 toRefs ，消费者组件可以解构/展开返回的对象而不会失去响应性。

```js
const state = reactive({ foo: 1, bar: 2 })

// 此 ref 和源属性已经“链接上了”
const stateAsRefs = toRefs(state)
state.foo++
console.log(stateAsRefs.foo.value) // 2

// 此时，解构而不会失去响应性
const { foo, bar } = state
```

### unref()

如果参数是 ref，则返回内部值，否则返回参数本身。

`unref()` 是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

### toValue()

`toValue()` 将值、refs 或 getters 规范化为值。与 `unref()` 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

```js
toValue(1)        // --> 1
toValue(ref(1))   // --> 1
toValue(() => 1)  // --> 1
```

### toRaw()

根据一个 Vue 创建的代理返回其原始对象。可以返回由 `reactive()`、`readonly()`、`shallowReactive()` 或者 `shallowReadonly()` 创建的代理对应的原始对象。

- 可以用于临时读取而不引起代理访问/跟踪开销。
- 或是写入而不触发更改的特殊方法。

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

## shallowRef / triggerRef / shallowReactive / shallowReadonly

### shallowRef()

`ref()` 的浅层作用形式。只有对 `.value` 的访问是响应式的。

```js
const state = shallowRef({ count: 1 })

// 不会触发更改
state.value.count = 2

// 会触发更改
state.value = { count: 2 }
```

### triggerRef()

强制触发依赖于一个浅层 ref 的副作用，通常在对浅引用的内部值进行深度变更后使用。

```js
const shallow = shallowRef({ greet: 'Hello, world' })

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 打印 "Hello, universe"
triggerRef(shallow)
```

### shallowReactive()

`reactive()` 的浅层作用形式。

- 一个浅层响应式对象里只有根级别的属性是响应式的。
- 值为 ref 的属性不会被自动解包。

```js
const state = shallowReactive({
  foo: 1,
  nested: { bar: 2 }
})

// 更改状态自身的属性是响应式的
state.foo++

// 下层嵌套对象不会被转为响应式
isReactive(state.nested) // false

// 不是响应式的
state.nested.bar++
```

### shallowReadonly()

`readonly()` 的浅层作用形式。

- 只有根层级的属性变为了只读。避免将其嵌套在深层次的响应式对象中，因为它创建的树具有不一致的响应行为。
- 值为 ref 的属性不会被自动解包。

```js
const state = shallowReadonly({
  foo: 1,
  nested: { bar: 2 }
})

// 更改状态自身的属性会失败
state.foo++

// 可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++
```

## isRef / isReactive / isReadonly / isProxy

- `isRef()` ： 检查某个值是否为 ref。
- `isReactive()` ： 检查一个对象是否是由 `reactive()` 或 `shallowReactive()` 创建的代理。
- `isReadonly()` ： 检查一个对象是否是由 `readonly()` 或 `shallowReadonly()` 创建的代理。
- `isProxy()` ： 检查一个对象是否是由 `reactive()`、`readonly()`、`shallowReactive()` 或 `shallowReadonly()` 创建的代理。

## computed / watch / watchEffect

### computed()

- 接受一个 `getter` 函数，返回一个只读的响应式 ref 对象。该 ref 通过 `.value` 暴露 getter 函数的返回值。
- 也可接受一个带有 `get` 和 `set` 函数的对象来创建一个可写的 ref 对象。

```js
// 创建一个只读的计算属性 ref
const count = ref(1)
const plusOne = computed(() => count.value + 1)
console.log(plusOne.value) // 2
plusOne.value++ // 错误

// 创建一个可写的计算属性 ref
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})
plusOne.value = 1
console.log(count.value) // 0
```

### watchEffect()

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

- 第一个参数：要运行的副作用函数。

  副作用函数的参数也是一个函数，用来注册清理回调。清理回调会在该副作用下一次执行前被调用，可以用来清理无效的副作用。

- 第二个参数：可选的选项。可以用来调整副作用的刷新时机或调试副作用的依赖。
  - 默认情况下，侦听器将在组件渲染之前执行。
  - 设置 `flush: 'post'` 将会使侦听器延迟到组件渲染之后再执行。
  - 设置 `flush: 'sync'` 会在响应式依赖发生改变时立即触发侦听器。

```js
const count = ref(0)

const { stop, pause, resume } = watchEffect(
  () => console.log(count.value)
)
// -> 输出 0

const { stop, pause, resume } = watch(id, async (newId, oldId, onCleanup) => {
  const { response, cancel } = doAsyncWork(newId)
  // 当 `id` 变化时，`cancel` 将被调用，
  // 取消之前的未完成的请求
  // onCleanup(cancel) // 副作用清理

  // 3.5+ 中的副作用清理
  onWatcherCleanup(cancel)

  data.value = await response
})

pause() // 暂停侦听器
resume() // 稍后恢复
stop() // 停止
```

### watch()

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数（懒侦听）。

- 第一个参数：侦听器的源。来源可以是以下类型：
  - 一个函数，返回一个值
  - 一个 ref
  - 一个响应式对象
  - ...或是由以上类型的值组成的数组
- 第二个参数：回调函数，在源数据变化时调用。
  - 回调函数接受三个参数：新值、旧值，以及一个用于注册副作用清理的回调函数（在副作用下一次重新执行前调用，可以用来清除无效的副作用）。
  - 当侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值。
- 第三个参数：可选的选项对象。
  - `immediate` ：在侦听器创建时立即触发回调。第一次调用时旧值是 `undefined` 。
  - `deep` ：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。在 3.5+ 中，此参数还可以是指示最大遍历深度的数字。
  - `flush` ：调整回调函数的刷新时机。
  - `onTrack` / `onTrigger` ：调试侦听器的依赖。
  - `once` ：(3.4+) 回调函数只会运行一次。侦听器将在回调函数首次运行后自动停止。

与 `watchEffect()` 相比，`watch()` 可以：

- 懒执行副作用；
- 更加明确是应该由哪个状态触发侦听器重新执行；
- 可以访问所侦听状态的前一个值和当前值。

```js
// 侦听多个来源时，回调函数接受两个数组，分别对应来源数组中的新值和旧值
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
  /* ... */
})

watch(id, async (newId, oldId, onCleanup) => {
  const { response, cancel } = doAsyncWork(newId)
  // 当 `id` 变化时，`cancel` 将被调用，
  // 取消之前的未完成的请求
  // onCleanup(cancel) // 副作用清理

  // 3.5+ 中的副作用清理
  onWatcherCleanup(cancel)
  data.value = await response
})
```

### onWatcherCleanup()

注册一个清理函数，在当前侦听器即将重新运行时执行。

只能在 `watchEffect` 作用函数或 `watch` 回调函数的同步执行期间调用 (即不能在异步函数的 `await` 语句之后调用)。
