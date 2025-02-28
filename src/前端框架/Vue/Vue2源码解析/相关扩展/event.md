# event 事件

## 编译阶段

在编译阶段，对事件进行处理示例如下：

::: details 示例

```typescript
let Child = {
  template: '<button @click="clickHandler($event)">' + 'click me' + '</button>',
  methods: {
    clickHandler(e) {
      console.log('Button clicked!', e)
      this.$emit('select')
    },
  },
}

let vm = new Vue({
  el: '#app',
  template:
    '<div>' +
    '<child @select="selectHandler" @click.native.prevent="clickHandler"></child>' +
    '</div>',
  components: { Child },
  methods: {
    clickHandler() {
      console.log('Child clicked!')
    },
    selectHandler() {
      console.log('Child select!')
    },
  },
})

// ========================================

// 父组件事件生成 data 串
{
  on: {"select": selectHandler},
  nativeOn: {"click": function($event) {
      $event.preventDefault();
      return clickHandler($event)
    }
  }
}

// 子组件事件生成 data 串
{
  on: {"click": function($event) {
      clickHandler($event)
    }
  }
}
```

:::

### parse 解析阶段

在 `parse` 解析 `template` 模板字符串转换成 AST 树阶段，处理一元标签（例如：`<img>`、`<br/>`）和闭合标签时，会调用 `closeElement(element)` 方法，执行`processElement(element, options)` 方法，调用 `processAttrs(element)` 方法处理标签属性。

在对标签属性的处理过程中，如果是指令，首先通过 `parseModifiers(name)` 解析出修饰符，再判断如果是事件的指令，则执行 `addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic)` 方法。

::: details 【processAttrs】方法：处理标签属性

```typescript
// src\compiler\parser\index.ts

export const onRE = /^@|^v-on:/
export const dirRE = process.env.VBIND_PROP_SHORTHAND
  ? /^v-|^@|^:|^\.|^#/
  : /^v-|^@|^:|^#/
export const bindRE = /^:|^\.|^v-bind:/

function processAttrs(el) {
  const list = el.attrsList
  let i, l, name, rawName, value, modifiers, syncGen, isDynamic
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name
    value = list[i].value
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true
      // modifiers
      modifiers = parseModifiers(name.replace(dirRE, ''))
      // support .foo shorthand syntax for the .prop modifier
      if (process.env.VBIND_PROP_SHORTHAND && propBindRE.test(name)) {
        ;(modifiers || (modifiers = {})).prop = true
        name = `.` + name.slice(1).replace(modifierRE, '')
      } else if (modifiers) {
        name = name.replace(modifierRE, '')
      }
      if (bindRE.test(name)) {
        // v-bind
        // ...
      } else if (onRE.test(name)) {
        // v-on
        name = name.replace(onRE, '')
        isDynamic = dynamicArgRE.test(name)
        if (isDynamic) {
          name = name.slice(1, -1)
        }
        addHandler(el, name, value, modifiers, false, warn, list[i], isDynamic)
      } else {
        // normal directives - 正常指令
        name = name.replace(dirRE, '')
        // parse arg
        // ...
      }
    } else {
      // literal attribute
      // ...
    }
  }
}

function parseModifiers(name: string): Object | void {
  const match = name.match(modifierRE)
  if (match) {
    const ret = {}
    match.forEach(m => {
      ret[m.slice(1)] = true
    })
    return ret
  }
}
```

:::

在 `addHandler(el, name, value, modifiers, important, warn, range, dynamic)` 函数中：

- 首先，根据 `modifiers` 修饰符对事件名 `name` 做处理
- 接着，根据 `modifiers.native` 判断是一个纯原生事件还是普通事件，分别对应 `el.nativeEvents` 和 `el.events`
- 最后，按照 `name` 对事件做归类，并把回调函数的字符串保留到对应事件中

::: details 【addHandler】方法

```typescript
// src/compiler/helpers.ts

export function addHandler(
  el: ASTElement,
  name: string,
  value: string,
  modifiers?: ASTModifiers | null,
  important?: boolean,
  warn?: Function,
  range?: Range,
  dynamic?: boolean
) {
  modifiers = modifiers || emptyObject
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (__DEV__ && warn && modifiers.prevent && modifiers.passive) {
    warn(
      "passive and prevent can't be used together. " +
        "Passive handler can't prevent default event.",
      range
    )
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (modifiers.right) {
    if (dynamic) {
      name = `(${name})==='click'?'contextmenu':(${name})`
    } else if (name === 'click') {
      name = 'contextmenu'
      delete modifiers.right
    }
  } else if (modifiers.middle) {
    if (dynamic) {
      name = `(${name})==='click'?'mouseup':(${name})`
    } else if (name === 'click') {
      name = 'mouseup'
    }
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture
    name = prependModifierMarker('!', name, dynamic)
  }
  if (modifiers.once) {
    delete modifiers.once
    name = prependModifierMarker('~', name, dynamic)
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive
    name = prependModifierMarker('&', name, dynamic)
  }

  let events
  if (modifiers.native) {
    delete modifiers.native
    events = el.nativeEvents || (el.nativeEvents = {})
  } else {
    events = el.events || (el.events = {})
  }

  const newHandler: any = rangeSetItem({ value: value.trim(), dynamic }, range)
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers
  }

  const handlers = events[name]
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler)
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler]
  } else {
    events[name] = newHandler
  }

  el.plain = false
}
```

:::

### generate 生成可执行代码阶段

在 `generate` 生成可执行代码阶段，会调用 `genData` 函数，根据 AST 元素节点上的 `events` 和 `nativeEvents` 属性生成 `data` 数据。

对于 `events` 和 `nativeEvents` 属性，会调用 `genHandlers` 函数，遍历事件对象 `events`，对于同一事件名称的事件调用 `genHandler(name, events[name])` 方法。

::: details 【genData】方法：生成 data 数据

```typescript
// src\compiler\codegen\index.ts

export function genData(el: ASTElement, state: CodegenState): string {
  let data = '{'

  // ...

  // event handlers
  if (el.events) {
    data += `${genHandlers(el.events, false)},`
  }
  if (el.nativeEvents) {
    data += `${genHandlers(el.nativeEvents, true)},`
  }

  // ...

  return data
}
```

:::

在 `genHandlers(events, isNative)` 函数中：

- 首先，判断如果 `handler` 是一个数组，则遍历该数组，然后递归调用 `genHandler` 方法并拼接结果。
- 然后，判断 `handler.value` 是一个函数的调用路径还是一个函数表达式
- 接着，对 `modifiers` 做判断:
  - 对于无 `modifiers` 的情况，就根据 `handler.value` 不同情况处理，要么直接返回，要么返回一个函数包裹的表达式；
  - 对于有 `modifiers` 的情况，则对各种不同的 `modifier` 情况做不同处理，添加相应的代码串。

::: details 【genHandlers】方法

```typescript
// src\compiler\codegen\events.ts

export function genHandlers(
  events: ASTElementHandlers,
  isNative: boolean
): string {
  const prefix = isNative ? 'nativeOn:' : 'on:'
  let staticHandlers = ``
  let dynamicHandlers = ``
  for (const name in events) {
    const handlerCode = genHandler(events[name])
    //@ts-expect-error
    if (events[name] && events[name].dynamic) {
      dynamicHandlers += `${name},${handlerCode},`
    } else {
      staticHandlers += `"${name}":${handlerCode},`
    }
  }
  staticHandlers = `{${staticHandlers.slice(0, -1)}}`
  if (dynamicHandlers) {
    return prefix + `_d(${staticHandlers},[${dynamicHandlers.slice(0, -1)}])`
  } else {
    return prefix + staticHandlers
  }
}

const fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/
const simplePathRE =
  /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/

function genHandler(
  handler: ASTElementHandler | Array<ASTElementHandler>
): string {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return `[${handler.map(handler => genHandler(handler)).join(',')}]`
  }

  const isMethodPath = simplePathRE.test(handler.value)
  const isFunctionExpression = fnExpRE.test(handler.value)
  const isFunctionInvocation = simplePathRE.test(
    handler.value.replace(fnInvokeRE, '')
  )

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    return `function($event){${
      isFunctionInvocation ? `return ${handler.value}` : handler.value
    }}` // inline statement
  } else {
    let code = ''
    let genModifierCode = ''
    const keys: string[] = []
    for (const key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key]
        // left/right
        if (keyCodes[key]) {
          keys.push(key)
        }
      } else if (key === 'exact') {
        const modifiers = handler.modifiers
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(keyModifier => !modifiers[keyModifier])
            .map(keyModifier => `$event.${keyModifier}Key`)
            .join('||')
        )
      } else {
        keys.push(key)
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys)
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode
    }
    const handlerCode = isMethodPath
      ? `return ${handler.value}.apply(null, arguments)`
      : isFunctionExpression
      ? `return (${handler.value}).apply(null, arguments)`
      : isFunctionInvocation
      ? `return ${handler.value}`
      : handler.value
    return `function($event){${code}${handlerCode}}`
  }
}
```

:::

## DOM 事件

在 `patch` 将组件 VNode 渲染真实 DOM 过程，其中的创建阶段和更新阶段都会执行 `updateDOMListeners` 函数。

在 `updateDOMListeners(oldVnode, vnode)` 函数中：

- 首先，获取 `vnode.data.on`（在编译阶段生成的 `data` 对应的事件对象）
- 接着，通过 `target = vnode.elm` 获取当前 `vnode` 对应的 DOM 对象
- 接着，通过 `normalizeEvents(on)` 对 `v-model` 进行相关处理
- 然后，调用 `updateListeners(on, oldOn, add, remove, vnode.context)` 方法，遍历 `on` 去添加事件监听，遍历 `oldOn` 去移除事件监听，关于监听和移除事件的方法都是外部传入的，因为它既处理原生 DOM 事件的添加删除，也处理自定义事件的添加删除。

::: details 【updateDOMListeners】方法

```typescript
// src\platforms\web\runtime\modules\events.ts
function normalizeEvents(on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    const event = isIE ? 'change' : 'input'
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || [])
    delete on[RANGE_TOKEN]
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || [])
    delete on[CHECKBOX_RADIO_TOKEN]
  }
}

let target: any
function updateDOMListeners(oldVnode: VNodeWithData, vnode: VNodeWithData) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  const on = vnode.data.on || {}
  const oldOn = oldVnode.data.on || {}
  // vnode is empty when removing all listeners,
  // and use old vnode dom element
  target = vnode.elm || oldVnode.elm
  normalizeEvents(on)
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context)
  target = undefined
}
```

:::

在 `updateListeners(on, oldOn, add, remove, vnode.context)` 函数中：

- 首先，会对 `on` 遍历进行遍历。在对 `on` 遍历的过程中：

  - 获取每一个事件的事件名，进行 `normalizeEvent` 的处理。根据事件名的一些特殊标识，区分事件是否具有 `once`、`capture`、`passive`等修饰符
  - 完成事件名的处理后，会对事件回调函数进行处理。

    - 对于第一次，满足 `isUndef(old)` 并且 `isUndef(cur.fns)` 会执行 `cur = on[name] = createFnInvoker(cur)` 方法创建一个回调函数。然后，在执行 `add(event.name, cur, event.capture, event.passive, event.params)` 完成一次事件绑定。

      在 `createFnInvoker(fns)` 函数中，定义了 `invoker` 方法并返回。

      - 由于一个事件可能会对应多个回调函数，所以在 `createFnInvoker` 函数中做了数组的判断，多个回调函数依次调用。
      - 最后通过 `invoker.fns = fns` 完成赋值，每一次执行 `invoker` 函数都是从 `invoker.fns` 里获取执行的回调函数

      ::: details 【createFnInvoker】方法

      ```typescript
      export function createFnInvoker(
        fns: Function | Array<Function>,
        vm?: Component
      ): Function {
        function invoker() {
          const fns = invoker.fns
          if (isArray(fns)) {
            const cloned = fns.slice()
            for (let i = 0; i < cloned.length; i++) {
              invokeWithErrorHandling(
                cloned[i],
                null,
                arguments as any,
                vm,
                `v-on handler`
              )
            }
          } else {
            // return handler return value for single handlers
            return invokeWithErrorHandling(
              fns,
              null,
              arguments as any,
              vm,
              `v-on handler`
            )
          }
        }
        invoker.fns = fns
        return invoker
      }
      ```

      :::

    - 对于第二次，执行对于回调函数时，判断如果满足 `cur !== old`，则只需要更改 `old.fns = cur` 把之前绑定的 `invoker.fns` 赋值为新的回调函数即可，并且通过 `on[name] = old` 保留引用关系，这样就保证了事件回调只添加一次，之后仅仅去修改它的回调函数的引用。

- 最后，遍历 `oldOn` 获取到事件名称，判断如果满足 `isUndef(on[name])`，则执行 `remove(event.name, oldOn[name], event.capture)` 移除回调事件。

::: details 【updateListeners】方法

```typescript
// src\core\vdom\helpers\update-listeners.ts
import { warn, invokeWithErrorHandling } from 'core/util/index'
import { cached, isUndef, isTrue, isArray } from 'shared/util'
import type { Component } from 'types/component'

const normalizeEvent = cached(
  (
    name: string
  ): {
    name: string
    once: boolean
    capture: boolean
    passive: boolean
    handler?: Function
    params?: Array<any>
  } => {
    const passive = name.charAt(0) === '&'
    name = passive ? name.slice(1) : name
    const once = name.charAt(0) === '~' // Prefixed last, checked first
    name = once ? name.slice(1) : name
    const capture = name.charAt(0) === '!'
    name = capture ? name.slice(1) : name
    return {
      name,
      once,
      capture,
      passive,
    }
  }
)

export function updateListeners(
  on: Object,
  oldOn: Object,
  add: Function,
  remove: Function,
  createOnceHandler: Function,
  vm: Component
) {
  let name, cur, old, event
  for (name in on) {
    cur = on[name]
    old = oldOn[name]
    event = normalizeEvent(name)
    if (isUndef(cur)) {
      __DEV__ &&
        warn(
          `Invalid handler for event "${event.name}": got ` + String(cur),
          vm
        )
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm)
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture)
      }
      add(event.name, cur, event.capture, event.passive, event.params)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name)
      remove(event.name, oldOn[name], event.capture)
    }
  }
}
```

:::

在 `updateListeners(on, oldOn, add, remove, vnode.context)` 方法中，进行监听和移除事件的方法都是外部传入的，因为它既处理原生 DOM 事件的添加删除，也处理自定义事件的添加删除。传入的监听事件 `add` 和移除事件 `remove`，实际上是调用了原生的 `addEventListener` 和 `removeEventListener`，并根据参数传递一些配置。

::: details 传入 updateListeners 函数中的【add、remove】方法

```typescript
function add(
  name: string,
  handler: Function,
  capture: boolean,
  passive: boolean
) {
  // async edge case #6566: inner click event triggers patch, event handler
  // attached to outer element during patch, and triggered again. This
  // happens because browsers fire microtask ticks between event propagation.
  // the solution is simple: we save the timestamp when a handler is attached,
  // and the handler would only fire if the event passed to it was fired
  // AFTER it was attached.
  if (useMicrotaskFix) {
    const attachedTimestamp = currentFlushTimestamp
    const original = handler
    //@ts-expect-error
    handler = original._wrapper = function (e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget ||
        // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp ||
        // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 ||
        // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original.apply(this, arguments)
      }
    }
  }
  target.addEventListener(
    name,
    handler,
    supportsPassive ? { capture, passive } : capture
  )
}

function remove(
  name: string,
  handler: Function,
  capture: boolean,
  _target?: HTMLElement
) {
  ;(_target || target).removeEventListener(
    name,
    //@ts-expect-error
    handler._wrapper || handler,
    capture
  )
}
```

:::

## 自定义事件

除原生 DOM 事件，Vue 还支持自定义事件，并且自定义事件只能做作用在组件上，如果组件使用原生事件，需要添加 `.native` 修饰符，普通元素上使用 `.native` 修饰符无效。

在 `render` 渲染 Virtual DOM 阶段，如果是一个组件节点，会通过 `createComponent` 创建一个组件 vnode 。

- 对于原生 DOM 事件，在创建组件 vnode 过程中，会把 `data.on` 复制给 `listeners`，把 `data.nativeOn` 赋值给 `data.on`，这样所有原生 DOM 事件是在当前组件环境中处理。
- 对于自定义事件，在创建组件 vnode 过程中，会把 `listeners` 作为 vnode 的 componentOptions 传入，则自定义事件是在子组件初始化阶段处理的，是在子组件环境中。

  在子组件调用 `this._init`（即：`Vue.prototype._init`）初始化的过程中：

  - 执行 `initInternalComponent` 方法，获取到父组件传入的 `listeners`

    ::: details 【initInternalComponent】方法

    ```typescript {7,13,15}
    // src\core\instance\init.ts

    export function initInternalComponent(
      vm: Component,
      options: InternalComponentOptions
    ) {
      const opts = (vm.$options = Object.create(
        (vm.constructor as any).options
      ))
      // doing this because it's faster than dynamic enumeration.
      const parentVnode = options._parentVnode
      opts.parent = options.parent
      opts._parentVnode = parentVnode

      const vnodeComponentOptions = parentVnode.componentOptions!
      opts.propsData = vnodeComponentOptions.propsData
      opts._parentListeners = vnodeComponentOptions.listeners
      opts._renderChildren = vnodeComponentOptions.children
      opts._componentTag = vnodeComponentOptions.tag

      if (options.render) {
        opts.render = options.render
        opts.staticRenderFns = options.staticRenderFns
      }
    }
    ```

    :::

  - 执行 `initEvents` 方法，处理父组件传入的 `listeners`，执行 `updateComponentListeners(vm, listeners)` 方法

    在 `updateComponentListeners(vm, listeners)` 方法中，会调用 `updateListeners(listeners, oldListeners || {}, add, remove, vm)` 方法，通过传入的监听事件 `add` 和移除事件 `remove` 进行事件的监听与移除。

    ::: details 【initEvents】方法

    ```typescript
    // src\core\instance\events.ts

    function add(event, fn) {
      target.$on(event, fn)
    }

    function remove(event, fn) {
      target.$off(event, fn)
    }

    export function initEvents(vm: Component) {
      vm._events = Object.create(null)
      vm._hasHookEvent = false
      // init parent attached events
      const listeners = vm.$options._parentListeners
      if (listeners) {
        updateComponentListeners(vm, listeners)
      }
    }

    export function updateComponentListeners(
      vm: Component,
      listeners: Object,
      oldListeners?: Object | null
    ) {
      target = vm
      updateListeners(
        listeners,
        oldListeners || {},
        add,
        remove,
        createOnceHandler,
        vm
      )
      target = undefined
    }
    ```

    :::

    对自定义事件的监听与移除，实际上是利用了 Vue 定义的事件中心。

    在 Vue 定义的事件中心中：

    - 当执行 `vm.$on(event, fn)` 的时候，按事件的名称 `event` 把回调函数 `fn` 存储起来 `vm._events[event].push(fn)`
    - 当执行 `vm.$emit(event)` 的时候，根据事件名 `event` 找到所有的回调函数 `let cbs = vm._events[event]`，然后遍历执行所有的回调函数
    - 当执行 `vm.$off(event,fn)` 的时候，会移除指定事件名 · 和指定的 `fn`
    - 当执行 `vm.$once(event,fn)` 的时候，内部就是执行 `vm.$on`，并且当回调函数执行一次后再通过 `vm.$off` 移除事件的回调，这样就确保了回调函数只执行一次

    对于自定义事件的监听和移除利用 Vue 事件中心，需要注意的是 `vm.$emit` 是给当前的 `vm` 上派发的实例，之所以常用它做父子组件通讯，是因为它的回调函数的定义是在父组件中。

    ::: details Vue 定义的事件中心

    ```typescript
    export function eventsMixin(Vue: typeof Component) {
      const hookRE = /^hook:/
      Vue.prototype.$on = function (
        event: string | Array<string>,
        fn: Function
      ): Component {
        const vm: Component = this
        if (isArray(event)) {
          for (let i = 0, l = event.length; i < l; i++) {
            vm.$on(event[i], fn)
          }
        } else {
          ;(vm._events[event] || (vm._events[event] = [])).push(fn)
          // optimize hook:event cost by using a boolean flag marked at registration
          // instead of a hash lookup
          if (hookRE.test(event)) {
            vm._hasHookEvent = true
          }
        }
        return vm
      }

      Vue.prototype.$once = function (event: string, fn: Function): Component {
        const vm: Component = this
        function on() {
          vm.$off(event, on)
          fn.apply(vm, arguments)
        }
        on.fn = fn
        vm.$on(event, on)
        return vm
      }

      Vue.prototype.$off = function (
        event?: string | Array<string>,
        fn?: Function
      ): Component {
        const vm: Component = this
        // all
        if (!arguments.length) {
          vm._events = Object.create(null)
          return vm
        }
        // array of events
        if (isArray(event)) {
          for (let i = 0, l = event.length; i < l; i++) {
            vm.$off(event[i], fn)
          }
          return vm
        }
        // specific event
        const cbs = vm._events[event!]
        if (!cbs) {
          return vm
        }
        if (!fn) {
          vm._events[event!] = null
          return vm
        }
        // specific handler
        let cb
        let i = cbs.length
        while (i--) {
          cb = cbs[i]
          if (cb === fn || cb.fn === fn) {
            cbs.splice(i, 1)
            break
          }
        }
        return vm
      }

      Vue.prototype.$emit = function (event: string): Component {
        const vm: Component = this
        if (__DEV__) {
          const lowerCaseEvent = event.toLowerCase()
          if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
            tip(
              `Event "${lowerCaseEvent}" is emitted in component ` +
                `${formatComponentName(
                  vm
                )} but the handler is registered for "${event}". ` +
                `Note that HTML attributes are case-insensitive and you cannot use ` +
                `v-on to listen to camelCase events when using in-DOM templates. ` +
                `You should probably use "${hyphenate(
                  event
                )}" instead of "${event}".`
            )
          }
        }
        let cbs = vm._events[event]
        if (cbs) {
          cbs = cbs.length > 1 ? toArray(cbs) : cbs
          const args = toArray(arguments, 1)
          const info = `event handler for "${event}"`
          for (let i = 0, l = cbs.length; i < l; i++) {
            invokeWithErrorHandling(cbs[i], vm, args, vm, info)
          }
        }
        return vm
      }
    }
    ```

    :::
