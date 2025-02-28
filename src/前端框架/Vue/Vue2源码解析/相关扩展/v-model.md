# v-model 双向绑定

`v-model` 即可以作用在普通表单元素上，又可以作用在组件上，它其实是一个语法糖。

## 表单元素

在 `parse` 解析 `template` 模板字符串转换成 AST 树阶段，处理一元标签（例如：`<img>`、`<br/>`）和闭合标签时，会调用 `closeElement(element)` 方法，执行`processElement(element, options)` 方法，调用 `processAttrs(element)` 方法处理标签属性。`v-model` 会被当做普通的指令解析到 `el.directives` 中。

在 `generate` 生成可执行代码阶段，在调用 `genData(el, state)` 方法根据 AST 元素节点的属性构造出一个 `data` 对象字符串时，会执行 `const dirs = genDirectives(el, state)` 。

在 `genDirectives` 方法中：

- 通过遍历 `el.directives`，获取每一个指令对应的方法 `const gen: DirectiveFunction = state.directives[dir.name]`。

  指令对应的方法实际上是在实例化 `CodegenState` 的时候，通过 `options` 传入的。`options` 是编译相关的配置，在不同的平台下配置不同。

  对于 Web 环境下，`directives` 配置在 `src\platforms\web\compiler\directives\index.ts` 模块下。

- 通过 `needRuntime = !!gen(el, dir, state.warn)` 执行对应指令的编译方法。
- 最后，根据指令生成一些 `data` 代码

::: details 【genDirectives】方法

```typescript
// src\compiler\codegen\index.ts

function genDirectives(el: ASTElement, state: CodegenState): string | void {
  const dirs = el.directives
  if (!dirs) return
  let res = 'directives:['
  let hasRuntime = false
  let i, l, dir, needRuntime
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i]
    needRuntime = true
    const gen: DirectiveFunction = state.directives[dir.name]
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn)
    }
    if (needRuntime) {
      hasRuntime = true
      res += `{name:"${dir.name}",rawName:"${dir.rawName}"${
        dir.value
          ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}`
          : ''
      }${dir.arg ? `,arg:${dir.isDynamicArg ? dir.arg : `"${dir.arg}"`}` : ''}${
        dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
      }},`
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}
```

:::

::: details 【options】编译配置

```typescript
// src\platforms\web\compiler\options.ts

import {
  isPreTag,
  mustUseProp,
  isReservedTag,
  getTagNamespace,
} from '../util/index'

import modules from './modules/index'
import directives from './directives/index'
import { genStaticKeys } from 'shared/util'
import { isUnaryTag, canBeLeftOpenTag } from './util'
import { CompilerOptions } from 'types/compiler'

export const baseOptions: CompilerOptions = {
  expectHTML: true,
  modules,
  directives,
  isPreTag,
  isUnaryTag,
  mustUseProp,
  canBeLeftOpenTag,
  isReservedTag,
  getTagNamespace,
  staticKeys: genStaticKeys(modules),
}
```

:::

::: details 【options - directives】配置

```typescript
// src\platforms\web\compiler\directives\index.ts
import model from './model'
import text from './text'
import html from './html'

export default {
  model,
  text,
  html,
}
```

:::

对于 `v-model` 指令，对应的 `directives` 函数定义在 `src\platforms\web\compiler\directives\model.ts` 模块。`model` 指令方法，会根据 AST 元素节点的不同情况去执行不同的逻辑。

::: details 【model】指令方法：根据 AST 元素节点的不同情况去执行不同的逻辑

```typescript
// src\platforms\web\compiler\directives\model.ts

export default function model(
  el: ASTElement,
  dir: ASTDirective,
  _warn: Function
): boolean | undefined {
  warn = _warn
  const value = dir.value
  const modifiers = dir.modifiers
  const tag = el.tag
  const type = el.attrsMap.type

  if (__DEV__) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn(
        `<${el.tag} v-model="${value}" type="file">:\n` +
          `File inputs are read only. Use a v-on:change listener instead.`,
        el.rawAttrsMap['v-model']
      )
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers)
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers)
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers)
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers)
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers)
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers)
    // component v-model doesn't need extra runtime
    return false
  } else if (__DEV__) {
    warn(
      `<${el.tag} v-model="${value}">: ` +
        `v-model is not supported on this element type. ` +
        "If you are working with contenteditable, it's recommended to " +
        'wrap a library dedicated for that purpose inside a custom component.',
      el.rawAttrsMap['v-model']
    )
  }

  // ensure runtime directive metadata
  return true
}
```

:::

对于默认类型的 `input` 元素节点，使用 `v-model` 指令，会执行 `model` 指令方法中的 `genDefaultModel(el, value, modifiers)` 的逻辑。

以 `<input v-model="messgae" />` 为例，在 `genDefaultModel` 逻辑中：

- 首先，处理 `modifiers` （修饰符），其主要影响的是 `event` 和 `valueExpression` 的值
- 然后，执行 `genAssignmentCode(value, valueExpression)` 去生成代码。在 `genAssignmentCode` 方法中：

  - 执行 `parseModel`，对 `v-model` 对应的 `value` 进行解析与处理相关情况，返回 `exp` 和 `key` 和。例如：

    示例 `<input v-model="messgae" />` 中， `value` 为 `messgae`，返回 `key` 为 `null`

  - 通过 `parseModel` 解析之后，对其返回的 `key` 进行判断，如果 `res.key === null`，则获取到 `${value}=${assignment}`

    示例 `<input v-model="messgae" />` 中，获取到的 `${value}=${assignment}` 为 `message=$event.target.value`

- 如果命中 `needCompositionGuard` 为 `true` 的逻辑，则会执行 `` code = `if($event.target.composing)return;${code}` ``

  示例 `<input v-model="messgae" />` 生成的 `code` 为 `if($event.target.composing)return;message=$event.target.value`

- 执行 ``addProp(el, 'value', `(${value})`)`` ，修改 AST 元素，给 `el` 添加一个 `prop`,相当于在 `input` 上动态绑定了 `value`
- 执行 `addHandler(el, event, code, null, true)` ，给 `el` 添加事件处理，相当于在 `input` 上绑定了 `input` 事件

  示例 `<input v-model="messgae" />` 通过 `addProp` 和 `addHandler` 处理之后，转换成模板如下

  `<input v-bind:value="message" v-on:input="message=$event.target.value">`

  其实就是动态绑定了 `input` 的 `value` 指向了 `messgae` 变量，并且在触发 `input` 事件的时候，动态把 `message` 设置为目标值，这样就完成了数据双向绑定了，所以说 `v-model` 实际上就是语法糖。

::: details 【genDefaultModel】方法：默认类型的 `input` 元素节点，使用 v-model 指令执行逻辑

```typescript
// src\platforms\web\compiler\directives\model.ts

function genDefaultModel(
  el: ASTElement,
  value: string,
  modifiers?: ASTModifiers | null
): boolean | void {
  const type = el.attrsMap.type

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (__DEV__) {
    const value = el.attrsMap['v-bind:value'] || el.attrsMap[':value']
    const typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type']
    if (value && !typeBinding) {
      const binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value'
      warn(
        `${binding}="${value}" conflicts with v-model on the same element ` +
          'because the latter already expands to a value binding internally',
        el.rawAttrsMap[binding]
      )
    }
  }

  const { lazy, number, trim } = modifiers || {}
  const needCompositionGuard = !lazy && type !== 'range'
  const event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input'

  let valueExpression = '$event.target.value'
  if (trim) {
    valueExpression = `$event.target.value.trim()`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }

  let code = genAssignmentCode(value, valueExpression)
  if (needCompositionGuard) {
    code = `if($event.target.composing)return;${code}`
  }

  addProp(el, 'value', `(${value})`)
  addHandler(el, event, code, null, true)
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()')
  }
}

// ========================================
// ========================================

// src\compiler\directives\model.ts
/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
export function genAssignmentCode(value: string, assignment: string): string {
  const res = parseModel(value)
  if (res.key === null) {
    return `${value}=${assignment}`
  } else {
    return `$set(${res.exp}, ${res.key}, ${assignment})`
  }
}

export function parseModel(val: string): ModelParseResult {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim()
  len = val.length

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index = val.lastIndexOf('.')
    if (index > -1) {
      return {
        exp: val.slice(0, index),
        key: '"' + val.slice(index + 1) + '"',
      }
    } else {
      return {
        exp: val,
        key: null,
      }
    }
  }

  str = val
  index = expressionPos = expressionEndPos = 0

  while (!eof()) {
    chr = next()
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr)
    } else if (chr === 0x5b) {
      parseBracket(chr)
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos),
  }
}
```

:::

::: details 【示例】表单元素生成 `render` 代码

```typescript
let vm = new Vue({
  el: '#app',
  template:
    '<div>' +
    '<input v-model="message" placeholder="edit me">' +
    '<p>Message is: {{ message }}</p>' +
    '</div>',
  data() {
    return {
      message: '',
    }
  },
})

with (this) {
  return _c('div', [
    _c('input', {
      directives: [
        {
          name: 'model',
          rawName: 'v-model',
          value: message,
          expression: 'message',
        },
      ],
      attrs: { placeholder: 'edit me' },
      domProps: { value: message },
      on: {
        input: function ($event) {
          if ($event.target.composing) return
          message = $event.target.value
        },
      },
    }),
    _c('p', [_v('Message is: ' + _s(message))]),
  ])
}
```

:::

## 组件

对于父组件而言：

- 在 `parse` 解析 `template` 模板字符串转换成 AST 树阶段，会解析 `v-model` 指令，
- 在 `generate` 生成可执行代码阶段，会执行 `genData` 函数生成 `data` 代码。对于 `v-model` 指令会执行 `genDirectives` 函数，进而执行 `src\platforms\web\compiler\directives\model.ts` 模块中的 `model` 函数。

对于组件使用 `v-model` 指令，会执行 `model` 函数中的 `genComponentModel(el, value, modifiers)` 的逻辑。

::: details 【genComponentModel】方法

```typescript
// src\compiler\directives\model.ts

/**
 * Cross-platform code generation for component v-model
 */
export function genComponentModel(
  el: ASTElement,
  value: string,
  modifiers: ASTModifiers | null
): void {
  const { number, trim } = modifiers || {}

  const baseValueExpression = '$$v'
  let valueExpression = baseValueExpression
  if (trim) {
    valueExpression =
      `(typeof ${baseValueExpression} === 'string'` +
      `? ${baseValueExpression}.trim()` +
      `: ${baseValueExpression})`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }
  const assignment = genAssignmentCode(value, valueExpression)

  el.model = {
    value: `(${value})`,
    expression: JSON.stringify(value),
    callback: `function (${baseValueExpression}) {${assignment}}`,
  }
}
```

:::

::: details 【示例】组件使用 v-model

```typescript
let Child = {
  template:
    '<div>' +
    '<input :value="value" @input="updateValue" placeholder="edit me">' +
    '</div>',
  props: ['value'],
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },
  },
}

let vm = new Vue({
  el: '#app',
  template:
    '<div>' +
    '<child v-model="message"></child>' +
    '<p>Message is: {{ message }}</p>' +
    '</div>',
  data() {
    return {
      message: '',
    }
  },
  components: {
    Child,
  },
})
```

:::

在示例中：

- 对于组件使用 `v-model` 指令，在 `generate` 生成可执行代码阶段。会执行 `genData` 函数中的 `genDirectives` 函数，进而执行 `model` 指令方法中的 `genComponentModel(el, value, modifiers)` 的逻辑。

  对于示例，通过 `genComponentModel` 生成 `el.model` 的值如下：

  ```typescript
  el.model = {
    callback: 'function ($$v) {message=$$v}',
    expression: '"message"',
    value: '(message)',
  }
  ```

- 在执行完 `genDirectives` 之后，会执行 `genData` 函数中 ``if (el.model) { data += `model:{value:${el.model.value},callback:${el.model.callback},expression:${el.model.expression}},` }`` 逻辑。

  对于示例，父组件最终生成的 `render` 代码如下：

  ```typescript
  with (this) {
    return _c(
      'div',
      [
        _c('child', {
          model: {
            value: message,
            callback: function ($$v) {
              message = $$v
            },
            expression: 'message',
          },
        }),
        _c('p', [_v('Message is: ' + _s(message))]),
      ],
      1
    )
  }
  ```

- 在创建子组件 `vnode` 阶段，会执行 `createComponent` 函数。其中会对 `data.model` 的情况做处理，执行 `transformModel(Ctor.options, data)` 方法，给 `data.props` 添加 `data.model.value`，并且给 `data.on` 添加 `data.model.callback` 。同时，`transformModel` 中也对使用 `v-model` 在子组件中可配置 `value` prop 以及派发的 `input` 事件名进行了处理。

  对于示例，使用 `transformModel` 扩展的结果如下：

  ```typescript
  data.props = {
    value: message,
  }
  data.on = {
    input: function ($$v) {
      message = $$v
    },
  }
  ```

  ::: details 扩展示例中的父组件 与 原父组件的写法比对

  ```typescript
  let vm = new Vue({
    el: '#app',
    template:
      '<div>' +
      '<child v-model="message"></child>' +
      '<p>Message is: {{ message }}</p>' +
      '</div>',
    data() {
      return {
        message: '',
      }
    },
    components: {
      Child,
    },
  })

  // ========== 扩展号，相当于如下编写父组件 ==========

  let vm = new Vue({
    el: '#app',
    template:
      '<div>' +
      '<child :value="message" @input="message=arguments[0]"></child>' +
      '<p>Message is: {{ message }}</p>' +
      '</div>',
    data() {
      return {
        message: '',
      }
    },
    components: {
      Child,
    },
  })
  ```

  :::

  子组件传递的 `value` 绑定到当前父组件的 `message`，同时，监听自定义 `input` 事件，当子组件派发 `input` 事件的时候，父组件会在事件回调函数中修改 `message` 的值，同时 `value` 也会发生变化，子组件的 `input` 值被更新。

  父组件通过 `prop` 把数据传递到子组件，子组件修改了数据后把改变通过 `$emit` 事件的方式通知父组件，典型的 Vue 的父子组件通讯模式，所以说组件上的 `v-model` 也是一种语法糖。

  ::: details 【createComponent】函数

  ```typescript
  // src\core\vdom\create-component.ts

  export function createComponent(
    Ctor: typeof Component | Function | ComponentOptions | void,
    data: VNodeData | undefined,
    context: Component,
    children?: Array<VNode>,
    tag?: string
  ): VNode | Array<VNode> | void {
    // ...

    // transform component v-model data into props & events
    if (isDef(data.model)) {
      // @ts-expect-error
      transformModel(Ctor.options, data)
    }

    // extract props
    // @ts-expect-error
    const propsData = extractPropsFromVNodeData(data, Ctor, tag)

    // functional component
    // @ts-expect-error
    if (isTrue(Ctor.options.functional)) {
      return createFunctionalComponent(
        Ctor as typeof Component,
        propsData,
        data,
        context,
        children
      )
    }

    // extract listeners, since these needs to be treated as
    // child component listeners instead of DOM listeners
    const listeners = data.on
    // replace with listeners with .native modifier
    // so it gets processed during parent component patch.
    data.on = data.nativeOn

    // ...

    // return a placeholder vnode
    // @ts-expect-error
    const name = getComponentName(Ctor.options) || tag
    const vnode = new VNode(
      // @ts-expect-error
      `vue-component-${Ctor.cid}${name ? `-${name}` : ''}`,
      data,
      undefined,
      undefined,
      undefined,
      context,
      // @ts-expect-error
      { Ctor, propsData, listeners, tag, children },
      asyncFactory
    )

    return vnode
  }

  // transform component v-model info (value and callback) into
  // prop and event handler respectively.
  function transformModel(options, data: any) {
    const prop = (options.model && options.model.prop) || 'value'
    const event = (options.model && options.model.event) || 'input'
    ;(data.attrs || (data.attrs = {}))[prop] = data.model.value
    const on = data.on || (data.on = {})
    const existing = on[event]
    const callback = data.model.callback
    if (isDef(existing)) {
      if (
        isArray(existing)
          ? existing.indexOf(callback) === -1
          : existing !== callback
      ) {
        on[event] = [callback].concat(existing)
      }
    } else {
      on[event] = callback
    }
  }
  ```

  :::
