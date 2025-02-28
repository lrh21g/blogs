# slot 插槽

## 普通插槽

编译发生在调用 `vm.$mount` 的时候，编译的顺序是先编译父组件再编译子组件。

在 `parse` 解析 `template` 模板字符串转换成 AST 树阶段，处理一元标签（例如：`<img>`、`<br/>`）和闭合标签时，会调用 `closeElement(element)` 方法，执行`processElement(element, options)` 方法，调用 `processSlotContent(element)` 和 `processSlotOutlet(element)` 方法处理 `slot`。

::: details 【processSlotContent】方法

```typescript
// src\compiler\parser\index.ts

// handle content being passed to a component as slot,
// e.g. <template slot="xxx">, <div slot-scope="xxx">
function processSlotContent(el) {
  let slotScope
  if (el.tag === 'template') {
    slotScope = getAndRemoveAttr(el, 'scope')
    /* istanbul ignore if */
    if (__DEV__ && slotScope) {
      warn(
        `the "scope" attribute for scoped slots have been deprecated and ` +
          `replaced by "slot-scope" since 2.5. The new "slot-scope" attribute ` +
          `can also be used on plain elements in addition to <template> to ` +
          `denote scoped slots.`,
        el.rawAttrsMap['scope'],
        true
      )
    }
    el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope')
  } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
    /* istanbul ignore if */
    if (__DEV__ && el.attrsMap['v-for']) {
      warn(
        `Ambiguous combined usage of slot-scope and v-for on <${el.tag}> ` +
          `(v-for takes higher priority). Use a wrapper <template> for the ` +
          `scoped slot to make it clearer.`,
        el.rawAttrsMap['slot-scope'],
        true
      )
    }
    el.slotScope = slotScope
  }

  // slot="xxx"
  const slotTarget = getBindingAttr(el, 'slot')
  if (slotTarget) {
    el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget
    el.slotTargetDynamic = !!(
      el.attrsMap[':slot'] || el.attrsMap['v-bind:slot']
    )
    // preserve slot as an attribute for native shadow DOM compat
    // only for non-scoped slots.
    if (el.tag !== 'template' && !el.slotScope) {
      addAttr(el, 'slot', slotTarget, getRawBindingAttr(el, 'slot'))
    }
  }

  // 2.6 v-slot syntax
  if (process.env.NEW_SLOT_SYNTAX) {
    if (el.tag === 'template') {
      // v-slot on <template>
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
      if (slotBinding) {
        if (__DEV__) {
          if (el.slotTarget || el.slotScope) {
            warn(`Unexpected mixed usage of different slot syntaxes.`, el)
          }
          if (el.parent && !maybeComponent(el.parent)) {
            warn(
              `<template v-slot> can only appear at the root level inside ` +
                `the receiving component`,
              el
            )
          }
        }
        const { name, dynamic } = getSlotName(slotBinding)
        el.slotTarget = name
        el.slotTargetDynamic = dynamic
        el.slotScope = slotBinding.value || emptySlotScopeToken // force it into a scoped slot for perf
      }
    } else {
      // v-slot on component, denotes default slot
      const slotBinding = getAndRemoveAttrByRegex(el, slotRE)
      if (slotBinding) {
        if (__DEV__) {
          if (!maybeComponent(el)) {
            warn(
              `v-slot can only be used on components or <template>.`,
              slotBinding
            )
          }
          if (el.slotScope || el.slotTarget) {
            warn(`Unexpected mixed usage of different slot syntaxes.`, el)
          }
          if (el.scopedSlots) {
            warn(
              `To avoid scope ambiguity, the default slot should also use ` +
                `<template> syntax when there are other named slots.`,
              slotBinding
            )
          }
        }
        // add the component's children to its default slot
        const slots = el.scopedSlots || (el.scopedSlots = {})
        const { name, dynamic } = getSlotName(slotBinding)
        const slotContainer = (slots[name] = createASTElement(
          'template',
          [],
          el
        ))
        slotContainer.slotTarget = name
        slotContainer.slotTargetDynamic = dynamic
        slotContainer.children = el.children.filter((c: any) => {
          if (!c.slotScope) {
            c.parent = slotContainer
            return true
          }
        })
        slotContainer.slotScope = slotBinding.value || emptySlotScopeToken
        // remove children as they are returned from scopedSlots now
        el.children = []
        // mark el non-plain so data gets generated
        el.plain = false
      }
    }
  }
}
```

:::

::: details 【processSlotOutlet】方法

```typescript
// src\compiler\parser\index.ts

// handle <slot/> outlets
function processSlotOutlet(el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name')
    if (__DEV__ && el.key) {
      warn(
        `\`key\` does not work on <slot> because slots are abstract outlets ` +
          `and can possibly expand into multiple elements. ` +
          `Use the key on a wrapping element instead.`,
        getRawBindingAttr(el, 'key')
      )
    }
  }
}
```

:::

::: details 【示例】使用默认插槽

```typescript
let AppLayout = {
  template:
    '<div class="container">' +
    '<header><slot name="header"></slot></header>' +
    '<main><slot>默认内容</slot></main>' +
    '<footer><slot name="footer"></slot></footer>' +
    '</div>',
}

let vm = new Vue({
  el: '#app',
  template:
    '<div>' +
    '<app-layout>' +
    '<h1 slot="header">{{title}}</h1>' +
    '<p>{{msg}}</p>' +
    '<p slot="footer">{{desc}}</p>' +
    '</app-layout>' +
    '</div>',
  data() {
    return {
      title: '我是标题',
      msg: '我是内容',
      desc: '其它信息',
    }
  },
  components: {
    AppLayout,
  },
})
```

:::

- 在父组件中，当解析到标签上有 `slot` 属性时，会给对于的 AST 元素节点添加 `slotTarget` 属性。在 `generate` 生成可执行代码阶段，在 `genData(el, state)` 方法中会处理 `slotTarget`，会给 `data` 添加一个 `slot` 属性，并指向 `slotTarget`。

  对于示例，父组件最终生成的代码如下：

  ```typescript
  with (this) {
    return _c(
      'div',
      [
        _c('app-layout', [
          _c('h1', { attrs: { slot: 'header' }, slot: 'header' }, [
            _v(_s(title)),
          ]),
          _c('p', [_v(_s(msg))]),
          _c('p', { attrs: { slot: 'footer' }, slot: 'footer' }, [
            _v(_s(desc)),
          ]),
        ]),
      ],
      1
    )
  }
  ```

- 在编译子组件的时候，同样在 `parse` 解析 `template` 模板字符串转换成 AST 树阶段，会执行 `processSlotContent(element)` 和 `processSlotOutlet(element)`。

  - 当解析子组件遇到 `slot` 标签时，会给对应的 AST 元素节点添加 `slotName` 属性
  - 在 `generate` 生成可执行代码阶段，会判断如果当前 AST 元素节点是 `slot` 标签，则执行 `genSlot(el, state)` 函数。可以通过插槽的名称（`el.slotName`）拿到对应的 `scopedSlotFn`，然后把相关的数据扩展到 `props` 上，作为函数的参数传入，然后返回生成的 vnodes，为后续渲染节点用。

    ::: details 【genSlot】方法

    ```typescript
    // src\compiler\codegen\index.ts

    function genSlot(el: ASTElement, state: CodegenState): string {
      const slotName = el.slotName || '"default"'
      const children = genChildren(el, state)
      let res = `_t(${slotName}${
        children ? `,function(){return ${children}}` : ''
      }`
      const attrs =
        el.attrs || el.dynamicAttrs
          ? genProps(
              (el.attrs || []).concat(el.dynamicAttrs || []).map(attr => ({
                // slot props are camelized
                name: camelize(attr.name),
                value: attr.value,
                dynamic: attr.dynamic,
              }))
            )
          : null
      const bind = el.attrsMap['v-bind']
      if ((attrs || bind) && !children) {
        res += `,null`
      }
      if (attrs) {
        res += `,${attrs}`
      }
      if (bind) {
        res += `${attrs ? '' : ',null'},${bind}`
      }
      return res + ')'
    }
    ```

    :::

  对于示例，子组件最终生成的代码如下：

  ```typescript
  with (this) {
    return _c(
      'div',
      {
        staticClass: 'container',
      },
      [
        _c('header', [_t('header')], 2),
        _c('main', [_t('default', [_v('默认内容')])], 2),
        _c('footer', [_t('footer')], 2),
      ]
    )
  }
  ```

  `_t` 函数对应的是 `renderSlot(name, fallbackRender, props, bindObject)` 方法，其中，`name` 表示插槽名称 `slotName`，`fallbackRender` 表示插槽的默认内容生成的 `vnode` 数组。

  ::: details 【renderSlot】方法

  ```typescript
  /**
   * Runtime helper for rendering <slot>
   */
  export function renderSlot(
    name: string,
    fallbackRender: ((() => Array<VNode>) | Array<VNode>) | null,
    props: Record<string, any> | null,
    bindObject: object | null
  ): Array<VNode> | null {
    const scopedSlotFn = this.$scopedSlots[name]
    let nodes
    if (scopedSlotFn) {
      // scoped slot
      props = props || {}
      if (bindObject) {
        if (__DEV__ && !isObject(bindObject)) {
          warn('slot v-bind without argument expects an Object', this)
        }
        props = extend(extend({}, bindObject), props)
      }
      nodes =
        scopedSlotFn(props) ||
        (isFunction(fallbackRender) ? fallbackRender() : fallbackRender)
    } else {
      nodes =
        this.$slots[name] ||
        (isFunction(fallbackRender) ? fallbackRender() : fallbackRender)
    }

    const target = props && props.slot
    if (target) {
      return this.$createElement('template', { slot: target }, nodes)
    } else {
      return nodes
    }
  }
  ```

  :::

  在 `renderSlot` 方法中，对于默认插槽，如果 `this.$slot[name]` 有值，就返回它对应的 `vnode` 数组（该数组里的 `vnode` 都是在父组件中创建的，这样既可以实现在父组件替换子组件插槽的内容），否则返回 `fallbackRender`。其中 `this.$slot` 来源于子组件初始化过程中，执行 `initRender` 函数，获取到 `vm.$slot`。

  对于 `vm.$slot`，是在 `initRender` 函数中，执行 `vm.$slots = resolveSlots(options._renderChildren, renderContext)` 获得的。在 `resolveSlots(children, context)` 函数中：

  - 首先，遍历 `children`，获取到每一个 `child` 的 `data`
  - 然后，通过 `data.slot` 获取到插槽名称。（`slot` 是在编译父组件在 `generate` 生成可执行代码阶段设置的 `data.slot`）

    - `data.slot` 存在，则以插槽名称为 `key` 把对应的 `child` 添加到 `slots` 中。
    - `data.slot` 不存在，则是默认插槽的内容，则把对应的 `child` 添加到 `slots.defaults` 中。

    获取到整个 `slots`，它是一个对象，`key` 是插槽名称，`value` 是一个 `vnode` 类型的数组，因为它可以有多个同名插槽。

  ::: details 【resolveSlots】方法

  ```typescript
  export function resolveSlots(
    children: Array<VNode> | null | undefined,
    context: Component | null
  ): { [key: string]: Array<VNode> } {
    if (!children || !children.length) {
      return {}
    }
    const slots: Record<string, any> = {}
    for (let i = 0, l = children.length; i < l; i++) {
      const child = children[i]
      const data = child.data
      // remove slot attribute if the node is resolved as a Vue slot node
      if (data && data.attrs && data.attrs.slot) {
        delete data.attrs.slot
      }
      // named slots should only be respected if the vnode was rendered in the
      // same context.
      if (
        (child.context === context || child.fnContext === context) &&
        data &&
        data.slot != null
      ) {
        const name = data.slot
        const slot = slots[name] || (slots[name] = [])
        if (child.tag === 'template') {
          slot.push.apply(slot, child.children || [])
        } else {
          slot.push(child)
        }
      } else {
        ;(slots.default || (slots.default = [])).push(child)
      }
    }
    // ignore slots that contains only whitespace
    for (const name in slots) {
      if (slots[name].every(isWhitespace)) {
        delete slots[name]
      }
    }
    return slots
  }

  function isWhitespace(node: VNode): boolean {
    return (node.isComment && !node.asyncFactory) || node.text === ' '
  }
  ```

  :::

## 作用域插槽（slot-scope）

::: details 【示例】作用域插槽

```typescript
let Child = {
  template:
    '<div class="child">' + '<slot text="Hello " :msg="msg"></slot>' + '</div>',
  data() {
    return {
      msg: 'Vue',
    }
  },
}

let vm = new Vue({
  el: '#app',
  template:
    '<div>' +
    '<child>' +
    '<template slot-scope="props">' +
    '<p>Hello from parent</p>' +
    '<p>{{ props.text + props.msg}}</p>' +
    '</template>' +
    '</child>' +
    '</div>',
  components: {
    Child,
  },
})
```

:::

- 父组件，在 `parse` 解析 `template` 模板字符串转换成 AST 树阶段，处理一元标签（例如：`<img>`、`<br/>`）和闭合标签时，会调用 `closeElement(element)` 方法。对于作用域插槽（`slot-scope`）：

  - 会执行`processElement(element, options)` 方法，调用 `processSlotContent(element)` 和 `processSlotOutlet(element)` 方法处理 `slot-scope`。会读取 `slot-scope` 属性并赋值给当前 AST 元素节点的 `slotScope` 属性。
  - 在构造 AST 数的时候，对 `scopedSlot` 属性的 AST 元素节点而言，是不会作为 `children` 添加到当前 AST 树中，而是存到父 AST 元素节点的 `scopedSlots` 属性上，它是一个对象，以插槽名称 `name` 为 `key`。

- 父组件，在 `generate` 生成可执行代码阶段，在调用 `genData(el, state)` 方法根据 AST 元素节点的属性构造出一个 `data` 对象字符串时，会执行 ``if (el.scopedSlots) { data += `${genScopedSlots(el.scopedSlots, state)},` }`` 对 `scopedSlots` 做处理。

  在 `genScopedSlots` 方法中,会对 `scopedSlots` 对象遍历，执行 `genScopedSlot` 方法，并把结果用逗号拼接。

  在 `genScopedSlot` 方法中，先生成一段函数代码，并且函数的参数就是的 `slotScope`，也就是写在标签属性上的 `slot-scope` 对应的值，然后再返回一个对象，`key` 为插槽名称，`fn` 为生成的函数代码。

  ::: details 【genScopedSlots】方法：处理 scopedSlots

  ```typescript
  // src\compiler\codegen\index.ts

  function genScopedSlots(
    el: ASTElement,
    slots: { [key: string]: ASTElement },
    state: CodegenState
  ): string {
    // by default scoped slots are considered "stable", this allows child
    // components with only scoped slots to skip forced updates from parent.
    // but in some cases we have to bail-out of this optimization
    // for example if the slot contains dynamic names, has v-if or v-for on them...
    let needsForceUpdate =
      el.for ||
      Object.keys(slots).some(key => {
        const slot = slots[key]
        return (
          slot.slotTargetDynamic ||
          slot.if ||
          slot.for ||
          containsSlotChild(slot) // is passing down slot from parent which may be dynamic
        )
      })

    // #9534: if a component with scoped slots is inside a conditional branch,
    // it's possible for the same component to be reused but with different
    // compiled slot content. To avoid that, we generate a unique key based on
    // the generated code of all the slot contents.
    let needsKey = !!el.if

    // OR when it is inside another scoped slot or v-for (the reactivity may be
    // disconnected due to the intermediate scope variable)
    // #9438, #9506
    // TODO: this can be further optimized by properly analyzing in-scope bindings
    // and skip force updating ones that do not actually use scope variables.
    if (!needsForceUpdate) {
      let parent = el.parent
      while (parent) {
        if (
          (parent.slotScope && parent.slotScope !== emptySlotScopeToken) ||
          parent.for
        ) {
          needsForceUpdate = true
          break
        }
        if (parent.if) {
          needsKey = true
        }
        parent = parent.parent
      }
    }

    const generatedSlots = Object.keys(slots)
      .map(key => genScopedSlot(slots[key], state))
      .join(',')

    return `scopedSlots:_u([${generatedSlots}]${
      needsForceUpdate ? `,null,true` : ``
    }${
      !needsForceUpdate && needsKey ? `,null,false,${hash(generatedSlots)}` : ``
    })`
  }

  function genScopedSlot(el: ASTElement, state: CodegenState): string {
    const isLegacySyntax = el.attrsMap['slot-scope']
    if (el.if && !el.ifProcessed && !isLegacySyntax) {
      return genIf(el, state, genScopedSlot, `null`)
    }
    if (el.for && !el.forProcessed) {
      return genFor(el, state, genScopedSlot)
    }
    const slotScope =
      el.slotScope === emptySlotScopeToken ? `` : String(el.slotScope)
    const fn =
      `function(${slotScope}){` +
      `return ${
        el.tag === 'template'
          ? el.if && isLegacySyntax
            ? `(${el.if})?${genChildren(el, state) || 'undefined'}:undefined`
            : genChildren(el, state) || 'undefined'
          : genElement(el, state)
      }}`
    // reverse proxy v-slot without scope on this.$slots
    const reverseProxy = slotScope ? `` : `,proxy:true`
    return `{key:${el.slotTarget || `"default"`},fn:${fn}${reverseProxy}}`
  }
  ```

  :::

  对于示例，父组件最终生成的代码如下：

  ```typescript
  with (this) {
    return _c(
      'div',
      [
        _c('child', {
          scopedSlots: _u([
            {
              key: 'default',
              fn: function (props) {
                return [
                  _c('p', [_v('Hello from parent')]),
                  _c('p', [_v(_s(props.text + props.msg))]),
                ]
              },
            },
          ]),
        }),
      ],
      1
    )
  }
  ```

  在父组件通过编译后生成的代码中，`_u` 函数对应的是 `resolveScopedSlots(fns, res)` 方法，其中，`fns` 是一个数组，每一个数组元素都有一个 `key` 和一个 `fn`，`key` 对应的是插槽的名称，`fn` 对应一个函数。

  `resolveScopedSlots(fns, res)` 方法，通过遍历 `fns` 数组，生成一个对象，对象的 `key` 就是插槽名称，`value` 就是函数。

  ::: details 【resolveScopedSlots】方法

  ```typescript
  export function resolveScopedSlots(
    fns: ScopedSlotsData,
    res?: Record<string, any>,
    // the following are added in 2.6
    hasDynamicKeys?: boolean,
    contentHashKey?: number
  ): { $stable: boolean } & { [key: string]: Function } {
    res = res || { $stable: !hasDynamicKeys }
    for (let i = 0; i < fns.length; i++) {
      const slot = fns[i]
      if (isArray(slot)) {
        resolveScopedSlots(slot, res, hasDynamicKeys)
      } else if (slot) {
        // marker for reverse proxying v-slot without scope on this.$slots
        // @ts-expect-error
        if (slot.proxy) {
          // @ts-expect-error
          slot.fn.proxy = true
        }
        res[slot.key] = slot.fn
      }
    }
    if (contentHashKey) {
      ;(res as any).$key = contentHashKey
    }
    return res as any
  }
  ```

  :::

- 子组件，在编译的时候，同样在 `parse` 解析 `template` 模板字符串转换成 AST 树阶段，会执行 `processSlotContent(element)` 和 `processSlotOutlet(element)`。

  - 当解析子组件遇到 `slot` 标签时，会给对应的 AST 元素节点添加 `slotName` 属性
  - 在 `generate` 生成可执行代码阶段，会判断如果当前 AST 元素节点是 `slot` 标签，则执行 `genSlot(el, state)` 函数。可以通过插槽的名称（`el.slotName`）拿到对应的 `scopedSlotFn`，然后把相关的数据扩展到 `props` 上，作为函数的参数传入，然后返回生成的 vnodes，为后续渲染节点用。

  对于示例，子组件最终生成的代码如下：

  ```typescript
  with (this) {
    return _c(
      'div',
      { staticClass: 'child' },
      [_t('default', null, { text: 'Hello ', msg: msg })],
      2
    )
  }
  ```

  `_t` 函数对应的是 `renderSlot(name, fallbackRender, props, bindObject)` 方法，其中，`name` 表示插槽名称 `slotName`，`fallbackRender` 表示插槽的默认内容生成的 `vnode` 数组。

  在 `renderSlot` 方法中，对于 `this.$scopedSlots[name]`，是在子组件的渲染函数执行前，在 `vm._render` 方法内定义的。
