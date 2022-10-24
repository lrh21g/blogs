# transition 与 transition-group

## transition

Vue.js 内置 `<transition>` 组件，可以利用它配合一些 CSS3 样式很方便地实现过渡动画，也可以利用它配合 JavaScript 的钩子函数实现过渡动画，在下列情形中，可以给任何元素和组件添加 `entering` / `leaving` 过渡：

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

### transition 内置组件

`<transition>` 组件和 `<keep-alive>` 组件有几点实现类似，同样是抽象组件，同样直接实现 `render` 函数，同样利用了默认插槽。

::: details transition 内置组件

```typescript
export default {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render(h: Function) {
    let children: any = this.$slots.default
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(isNotTextNode)
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (__DEV__ && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
          '<transition-group> for lists.',
        this.$parent
      )
    }

    const mode: string = this.mode

    // warn invalid mode
    if (__DEV__ && mode && mode !== 'in-out' && mode !== 'out-in') {
      warn('invalid <transition> mode: ' + mode, this.$parent)
    }

    const rawChild: VNode = children[0]

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    const child = getRealChild(rawChild)
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    const id: string = `__transition-${this._uid}-`
    child.key =
      child.key == null
        ? child.isComment
          ? id + 'comment'
          : id + child.tag
        : isPrimitive(child.key)
        ? String(child.key).indexOf(id) === 0
          ? child.key
          : id + child.key
        : child.key

    const data: Object = ((child.data || (child.data = {})).transition =
      extractTransitionData(this))
    const oldRawChild: VNode = this._vnode
    const oldChild = getRealChild(oldRawChild)

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(
        oldChild.componentInstance &&
        oldChild.componentInstance._vnode!.isComment
      )
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      const oldData: Object = (oldChild.data.transition = extend({}, data))
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true
        mergeVNodeHook(oldData, 'afterLeave', () => {
          this._leaving = false
          this.$forceUpdate()
        })
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        let delayedLeave
        const performLeave = () => {
          delayedLeave()
        }
        mergeVNodeHook(data, 'afterEnter', performLeave)
        mergeVNodeHook(data, 'enterCancelled', performLeave)
        mergeVNodeHook(oldData, 'delayLeave', leave => {
          delayedLeave = leave
        })
      }
    }

    return rawChild
  },
}
```

:::

在 `<transition>` 组件实现的 `render` 函数中的相关逻辑：

- 处理 `children`。

  从默认插槽中获取 `<transition>` 包裹的子节点，并且判断了子节点的长度。如果子节点长度为 `0`，则直接返回；如果子节点长度大于 `1`，则会在开发环境报警告，因为 `<transition>` 组件是只能包裹一个子节点的。

- 处理 `mode`。过渡组件的对 `mode` 的支持只有 2 种，`in-out` 或者是 `out-in`。

- 获取 `rawChild` & `child`。

  - `rawChild`：通过 `const rawChild: VNode = children[0]`获取

    `rawChild` 为第一个子节点 vnode，并通过 `hasParentTransition(this.$vnode)` 方法判断 `<transition>` 是否为组件根节点，并且包裹该组件的容器如果是 `<transition>` 时要跳过。

    在 `hasParentTransition(vnode)` 方法中，传入的是 `this.$vnode`，也就是 `<transition>` 组件的占位 `vnode`，只有当它同时作为根 `vnode`（即：`vm._vnode`）时，它的 `parent` 才不会为空，并且判断 `parent` 也是 `<transition>` 组件，才返回 `true`。

    ::: details 【hasParentTransition】方法

    ```typescript
    // src\platforms\web\runtime\components\transition.ts

    function hasParentTransition(vnode: VNode): boolean | undefined {
      while ((vnode = vnode.parent!)) {
        if (vnode.data!.transition) {
          return true
        }
      }
    }
    ```

    :::

  - `child`：通过 `const child = getRealChild(rawChild)` 获取

    `getRealChild(vnode)` 方法的目的是获取组件的非抽象子节点，因为 `<transition>` 很可能会包裹一个 `keep-alive`。并且会递归找到第一个非抽象组件的 `vnode` 并返回

    ::: details 【getRealChild】方法

    ```typescript
    // src\platforms\web\runtime\components\transition.ts

    // in case the child is also an abstract component, e.g. <keep-alive>
    // we want to recursively retrieve the real component to be rendered
    function getRealChild(vnode?: VNode): VNode | undefined {
      const compOptions = vnode && vnode.componentOptions
      if (compOptions && compOptions.Ctor.options.abstract) {
        return getRealChild(getFirstComponentChild(compOptions.children))
      } else {
        return vnode
      }
    }

    // ==============================
    // ==============================

    // src\core\vdom\helpers\get-first-component-child.ts

    export function getFirstComponentChild(
      children?: Array<VNode>
    ): VNode | undefined {
      if (isArray(children)) {
        for (let i = 0; i < children.length; i++) {
          const c = children[i]
          if (
            isDef(c) &&
            (isDef(c.componentOptions) || isAsyncPlaceholder(c))
          ) {
            return c
          }
        }
      }
    }
    ```

    :::

- 处理 `id` & `data`

  首先根据 `key` 等一系列条件获取 `id`，然后通过 `extractTransitionData(this)` 方法从当前组件实例上提取过渡所需要的数据。这样 `child.data.transition` 中就包含了过渡所需的一些数据。

  在 `extractTransitionData(comp)` 方法中：

  - 首先，遍历 `props` 赋值到 `data` 中。
  - 接着，遍历所有父组件的事件也把事件回调赋值到 `data` 中。

  ::: details 【extractTransitionData】方法

  ```typescript
  export function extractTransitionData(comp: Component): Record<string, any> {
    const data = {}
    const options = comp.$options
    // props
    for (const key in options.propsData) {
      data[key] = comp[key]
    }
    // events.
    // extract listeners and pass them directly to the transition methods
    const listeners = options._parentListeners
    for (const key in listeners) {
      data[camelize(key)] = listeners[key]
    }
    return data
  }
  ```

  :::

### transition modules

`<transition>` 组件动画模块的相关逻辑定义在 `src\platforms\web\runtime\modules\transition.ts` 模块中。

::: details transition 组件动画模块

```typescript
// src\platforms\web\runtime\modules\transition.ts

function _enter(_: any, vnode: VNodeWithData) {
  if (vnode.data.show !== true) {
    enter(vnode)
  }
}

export default inBrowser
  ? {
      create: _enter,
      activate: _enter,
      remove(vnode: VNode, rm: Function) {
        /* istanbul ignore else */
        if (vnode.data!.show !== true) {
          // @ts-expect-error
          leave(vnode, rm)
        } else {
          rm()
        }
      },
    }
  : {}
```

:::

过渡动画提供了 2 个时机：

- 执行 `create` 和 `activate` 钩子函数时，提供 `entering` 进入动画
- 执行 `remove` 钩子函数时，提供 `leaving` 离开动画

`<transition>` 必须要满足 `v-if` 、动态组件、组件根节点条件之一，对于 `v-show` 指令的钩子函数中也会执行相关逻辑。

### transition entering 动画

整个 `entering` 动画过程的实现是 `enter` 方法，`entering` 主要发生在组件插入后。

::: details 【transition - enter】方法

```typescript
export function enter(vnode: VNodeWithData, toggleDisplay?: () => void) {
  const el: any = vnode.elm

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true
    el._leaveCb()
  }

  const data = resolveTransition(vnode.data.transition)
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  const {
    css,
    type,
    enterClass,
    enterToClass,
    enterActiveClass,
    appearClass,
    appearToClass,
    appearActiveClass,
    beforeEnter,
    enter,
    afterEnter,
    enterCancelled,
    beforeAppear,
    appear,
    afterAppear,
    appearCancelled,
    duration,
  } = data

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  let context = activeInstance
  let transitionNode = activeInstance.$vnode
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context
    transitionNode = transitionNode.parent
  }

  const isAppear = !context._isMounted || !vnode.isRootInsert

  if (isAppear && !appear && appear !== '') {
    return
  }

  const startClass = isAppear && appearClass ? appearClass : enterClass
  const activeClass =
    isAppear && appearActiveClass ? appearActiveClass : enterActiveClass
  const toClass = isAppear && appearToClass ? appearToClass : enterToClass

  const beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter
  const enterHook = isAppear ? (isFunction(appear) ? appear : enter) : enter
  const afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter
  const enterCancelledHook = isAppear
    ? appearCancelled || enterCancelled
    : enterCancelled

  const explicitEnterDuration: any = toNumber(
    isObject(duration) ? duration.enter : duration
  )

  if (__DEV__ && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode)
  }

  const expectsCSS = css !== false && !isIE9
  const userWantsControl = getHookArgumentsLength(enterHook)

  const cb = (el._enterCb = once(() => {
    if (expectsCSS) {
      removeTransitionClass(el, toClass)
      removeTransitionClass(el, activeClass)
    }
    // @ts-expect-error
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass)
      }
      enterCancelledHook && enterCancelledHook(el)
    } else {
      afterEnterHook && afterEnterHook(el)
    }
    el._enterCb = null
  }))

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', () => {
      const parent = el.parentNode
      const pendingNode =
        parent && parent._pending && parent._pending[vnode.key!]
      if (
        pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb()
      }
      enterHook && enterHook(el, cb)
    })
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el)
  if (expectsCSS) {
    addTransitionClass(el, startClass)
    addTransitionClass(el, activeClass)
    nextFrame(() => {
      removeTransitionClass(el, startClass)
      // @ts-expect-error
      if (!cb.cancelled) {
        addTransitionClass(el, toClass)
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration)
          } else {
            whenTransitionEnds(el, type, cb)
          }
        }
      }
    })
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay()
    enterHook && enterHook(el, cb)
  }

  if (!expectsCSS && !userWantsControl) {
    cb()
  }
}
```

:::

`enter` 方法相关核心逻辑：

- 解析过渡数据。

  执行 `const data = resolveTransition(vnode.data.transition)` ，通过 `resolveTransition(def)` 方法，从 `vnode.data.transition` 中解析出过渡相关的一些数据。

  `resolveTransition(def)` 会通过 `autoCssTransition` 处理 `name` 属性，生成一个用来描述各个阶段的 `Class` 名称的对象，扩展到 `def` 中并返回给 `data`，这样就可以从 `data` 中获取到过渡相关的所有数据。

  ::: details 【resolveTransition】方法

  ```typescript
  export function resolveTransition(
    def?: string | Record<string, any>
  ): Record<string, any> | undefined {
    if (!def) {
      return
    }
    /* istanbul ignore else */
    if (typeof def === 'object') {
      const res = {}
      if (def.css !== false) {
        extend(res, autoCssTransition(def.name || 'v'))
      }
      extend(res, def)
      return res
    } else if (typeof def === 'string') {
      return autoCssTransition(def)
    }
  }

  const autoCssTransition: (name: string) => Object = cached(name => {
    return {
      enterClass: `${name}-enter`,
      enterToClass: `${name}-enter-to`,
      enterActiveClass: `${name}-enter-active`,
      leaveClass: `${name}-leave`,
      leaveToClass: `${name}-leave-to`,
      leaveActiveClass: `${name}-leave-active`,
    }
  })
  ```

  :::

- 处理边界情况

  为了处理当 `<transition>` 作为子组件的根节点，需要检查它的父组件作为 `appear` 的检查。`isAppear` 表示当前上下文实例还没有 `mounted`，第一次出现的时机。如果是第一次并且 `<transition>` 组件没有配置 `appear` 的话，直接返回。

- 定义过渡类名、钩子函数和其他配置

  - 过渡类名

    - `startClass` 定义进入过渡的开始状态，在元素被插入时生效，在下一个帧移除。
    - `activeClass` 定义过渡的状态，在元素整个过渡过程中作用，在元素被插入时生效，在 `transition` / `animation` 完成之后移除。
    - `toClass` 定义进入过渡的结束状态，在元素被插入一帧后生效 (与此同时 startClass 被删除)，在 `<transition>` / `animation` 完成之后移除。

  - 过渡钩子函数

    - `beforeEnterHook` 是过渡开始前执行的钩子函数。
    - `enterHook` 是在元素插入后或者是 `v-show` 显示切换后执行的钩子函数。
    - `afterEnterHook` 是在过渡动画执行完后的钩子函数。

  - `explicitEnterDuration` 表示 enter 动画执行的时间。
  - `expectsCSS` 表示过渡动画是受 CSS 的影响。
  - `cb` 定义的是过渡完成执行的回调函数。

- 合并 `insert` 钩子函数

  通过 `mergeVNodeHook` 函数，将 `hook` 函数合并到 `def.data.hook[hookey]` 中，生成新的 `invoker` 。

  组件的 `vnode` 原本定义了 `init`、`prepatch`、`insert`、`destroy` 四个钩子函数，而 `mergeVNodeHook` 函数就是把一些新的钩子函数合并进来，例如在 `<transition>` 过程中合并的 `insert` 钩子函数，就会合并到组件 `vnode` 的 `insert` 钩子函数中，当组件插入后，就会执行定义的 `enterHook` 了。

  ::: details 【mergeVNodeHook】函数

  ```typescript
  export function mergeVNodeHook(
    def: Record<string, any>,
    hookKey: string,
    hook: Function
  ) {
    if (def instanceof VNode) {
      def = def.data!.hook || (def.data!.hook = {})
    }
    let invoker
    const oldHook = def[hookKey]

    function wrappedHook() {
      hook.apply(this, arguments)
      // important: remove merged hook to ensure it's called only once
      // and prevent memory leak
      remove(invoker.fns, wrappedHook)
    }

    if (isUndef(oldHook)) {
      // no existing hook
      invoker = createFnInvoker([wrappedHook])
    } else {
      /* istanbul ignore if */
      if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
        // already a merged invoker
        invoker = oldHook
        invoker.fns.push(wrappedHook)
      } else {
        // existing plain hook
        invoker = createFnInvoker([oldHook, wrappedHook])
      }
    }

    invoker.merged = true
    def[hookKey] = invoker
  }
  ```

  :::

- 开始执行过渡动画

  - 首先，执行 `beforeEnterHook` 钩子函数，把当前元素的 DOM 节点 `el` 传入
  - 然后，判断 `expectsCSS`，如果为 `true` ，则表明希望用 CSS 来控制动画，执行 `addTransitionClass(el, startClass)` 和 `addTransitionClass(el, activeClass)`

    在 `addTransitionClass` 方法中，会给当前 DOM 元素 `el` 添加样式 `cls`，所以这里添加了 `startClass` 和 `activeClass`

    ::: details 【addTransitionClass】方法

    ```typescript
    // src\platforms\web\runtime\transition-util.ts

    export function addTransitionClass(el: any, cls: string) {
      const transitionClasses =
        el._transitionClasses || (el._transitionClasses = [])
      if (transitionClasses.indexOf(cls) < 0) {
        transitionClasses.push(cls)
        addClass(el, cls)
      }
    }

    // ==============================
    // ==============================

    // src\platforms\web\runtime\class-util.ts

    /**
     * Add class with compatibility for SVG since classList is not supported on
     * SVG elements in IE
     */
    export function addClass(el: HTMLElement, cls?: string) {
      /* istanbul ignore if */
      if (!cls || !(cls = cls.trim())) {
        return
      }

      /* istanbul ignore else */
      if (el.classList) {
        if (cls.indexOf(' ') > -1) {
          cls.split(whitespaceRE).forEach(c => el.classList.add(c))
        } else {
          el.classList.add(cls)
        }
      } else {
        const cur = ` ${el.getAttribute('class') || ''} `
        if (cur.indexOf(' ' + cls + ' ') < 0) {
          el.setAttribute('class', (cur + cls).trim())
        }
      }
    }
    ```

    :::

  - 接着，执行 `nextFrame`

    - `nextFrame` 方法是一个简单的 `requestAnimationFrame` 的实现，它的参数 `fn` 会在下一帧执行。

      ::: details 【nextFrame】方法

      ```typescript
      // src\platforms\web\runtime\transition-util.ts

      // binding to window is necessary to make hot reload work in IE in strict mode
      const raf = inBrowser
        ? window.requestAnimationFrame
          ? window.requestAnimationFrame.bind(window)
          : setTimeout
        : /* istanbul ignore next */ fn => fn()

      export function nextFrame(fn: Function) {
        raf(() => {
          // @ts-expect-error
          raf(fn)
        })
      }
      ```

      :::

    - 在下一帧执行了 `removeTransitionClass(el, startClass)` 把 `startClass` 移除

      ::: details 【removeTransitionClass】方法

      ```typescript
      // src\platforms\web\runtime\transition-util.ts

      export function removeTransitionClass(el: any, cls: string) {
        if (el._transitionClasses) {
          remove(el._transitionClasses, cls)
        }
        removeClass(el, cls)
      }
      ```

      :::

    - 然后，判断过渡是否没有被取消，则执行 `addTransitionClass(el, toClass)` 添加 `toClass`
    - 接着，判断 `!userWantsControl`，即用户不通过 `enterHook` 钩子函数控制动画，如果用户指定了 `explicitEnterDuration`，则延时这个时间执行 `cb`；否则，通过 `whenTransitionEnds(el, type, cb)` 决定执行 `cb` 的时机。

      ::: details 【whenTransitionEnds】方法

      ```typescript
      // src\platforms\web\runtime\transition-util.ts

      export function whenTransitionEnds(
        el: Element,
        expectedType: string | undefined,
        cb: Function
      ) {
        const { type, timeout, propCount } = getTransitionInfo(el, expectedType)
        if (!type) return cb()
        const event: string =
          type === TRANSITION ? transitionEndEvent : animationEndEvent
        let ended = 0
        const end = () => {
          el.removeEventListener(event, onEnd)
          cb()
        }
        const onEnd = e => {
          if (e.target === el) {
            if (++ended >= propCount) {
              end()
            }
          }
        }
        setTimeout(() => {
          if (ended < propCount) {
            end()
          }
        }, timeout + 1)
        el.addEventListener(event, onEnd)
      }
      ```

      :::

      在 `enter` 动画方法中定义的 `cb` 回调函数中：

      - 执行了 `removeTransitionClass(el, toClass)` 和 `removeTransitionClass(el, activeClass)` 把 `toClass` 和 `activeClass` 移除
      - 判断有没有取消回调。如果取消，则移除 `startClass` 并执行 `enterCancelledHook`；否则，执行 `afterEnterHook(el)`

      ::: details enter 方法中定义的 cb 回调函数

      ```typescript
      const cb = (el._enterCb = once(() => {
        if (expectsCSS) {
          removeTransitionClass(el, toClass)
          removeTransitionClass(el, activeClass)
        }
        // @ts-expect-error
        if (cb.cancelled) {
          if (expectsCSS) {
            removeTransitionClass(el, startClass)
          }
          enterCancelledHook && enterCancelledHook(el)
        } else {
          afterEnterHook && afterEnterHook(el)
        }
        el._enterCb = null
      }))
      ```

      :::

### transition leaving 动画

整个 `leaving` 动画过程的实现是 `leave` 方法，`leaving` 主要发生在组件销毁前。

`leave` 的实现，和 `enter` 的实现几乎是一个镜像过程，不同的是：

- 从 `data` 中解析出来的是 `leave` 相关的样式类名和钩子函数。
- 可以配置 `delayLeave`，它是一个函数，可以延时执行 `leave` 的相关过渡动画，在 `leave` 动画执行完后，它会执行 `rm` 函数把节点从 DOM 中真正做移除。

::: details 【transition - leave】方法

```typescript
// src\platforms\web\runtime\modules\transition.ts

export function leave(vnode: VNodeWithData, rm: Function) {
  const el: any = vnode.elm

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true
    el._enterCb()
  }

  const data = resolveTransition(vnode.data.transition)
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  const {
    css,
    type,
    leaveClass,
    leaveToClass,
    leaveActiveClass,
    beforeLeave,
    leave,
    afterLeave,
    leaveCancelled,
    delayLeave,
    duration,
  } = data

  const expectsCSS = css !== false && !isIE9
  const userWantsControl = getHookArgumentsLength(leave)

  const explicitLeaveDuration: any = toNumber(
    isObject(duration) ? duration.leave : duration
  )

  if (__DEV__ && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode)
  }

  const cb = (el._leaveCb = once(() => {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key!] = null
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass)
      removeTransitionClass(el, leaveActiveClass)
    }
    // @ts-expect-error
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass)
      }
      leaveCancelled && leaveCancelled(el)
    } else {
      rm()
      afterLeave && afterLeave(el)
    }
    el._leaveCb = null
  }))

  if (delayLeave) {
    delayLeave(performLeave)
  } else {
    performLeave()
  }

  function performLeave() {
    // the delayed leave may have already been cancelled
    // @ts-expect-error
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show && el.parentNode) {
      ;(el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key!] =
        vnode
    }
    beforeLeave && beforeLeave(el)
    if (expectsCSS) {
      addTransitionClass(el, leaveClass)
      addTransitionClass(el, leaveActiveClass)
      nextFrame(() => {
        removeTransitionClass(el, leaveClass)
        // @ts-expect-error
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass)
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration)
            } else {
              whenTransitionEnds(el, type, cb)
            }
          }
        }
      })
    }
    leave && leave(el, cb)
    if (!expectsCSS && !userWantsControl) {
      cb()
    }
  }
}
```

:::

## transition-group

Vue.js 提供了 `<transition-group>` 组件，可以实现了列表的过渡效果。

::: details transition-group 内纸组件

```typescript
// src\platforms\web\runtime\components\transition-group.ts

const props = extend(
  {
    tag: String,
    moveClass: String,
  },
  transitionProps
)

delete props.mode

export default {
  props,

  beforeMount() {
    const update = this._update
    this._update = (vnode, hydrating) => {
      const restoreActiveInstance = setActiveInstance(this)
      // force removing pass
      this.__patch__(
        this._vnode,
        this.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      )
      this._vnode = this.kept
      restoreActiveInstance()
      update.call(this, vnode, hydrating)
    }
  },

  render(h: Function) {
    const tag: string = this.tag || this.$vnode.data.tag || 'span'
    const map: Record<string, any> = Object.create(null)
    const prevChildren: Array<VNode> = (this.prevChildren = this.children)
    const rawChildren: Array<VNode> = this.$slots.default || []
    const children: Array<VNode> = (this.children = [])
    const transitionData = extractTransitionData(this)

    for (let i = 0; i < rawChildren.length; i++) {
      const c: VNode = rawChildren[i]
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c)
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData
        } else if (__DEV__) {
          const opts = c.componentOptions
          const name: string = opts
            ? getComponentName(opts.Ctor.options as any) || opts.tag || ''
            : c.tag
          warn(`<transition-group> children must be keyed: <${name}>`)
        }
      }
    }

    if (prevChildren) {
      const kept: Array<VNode> = []
      const removed: Array<VNode> = []
      for (let i = 0; i < prevChildren.length; i++) {
        const c: VNode = prevChildren[i]
        c.data!.transition = transitionData
        // @ts-expect-error .getBoundingClientRect is not typed in Node
        c.data!.pos = c.elm.getBoundingClientRect()
        if (map[c.key!]) {
          kept.push(c)
        } else {
          removed.push(c)
        }
      }
      this.kept = h(tag, null, kept)
      this.removed = removed
    }

    return h(tag, null, children)
  },

  updated() {
    const children: Array<VNodeWithData> = this.prevChildren
    const moveClass: string = this.moveClass || (this.name || 'v') + '-move'
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs)
    children.forEach(recordPosition)
    children.forEach(applyTranslation)

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight

    children.forEach((c: VNode) => {
      if (c.data!.moved) {
        const el: any = c.elm
        const s: any = el.style
        addTransitionClass(el, moveClass)
        s.transform = s.WebkitTransform = s.transitionDuration = ''
        el.addEventListener(
          transitionEndEvent,
          (el._moveCb = function cb(e) {
            if (e && e.target !== el) {
              return
            }
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb)
              el._moveCb = null
              removeTransitionClass(el, moveClass)
            }
          })
        )
      }
    })
  },

  methods: {
    hasMove(el: any, moveClass: string): boolean {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      const clone: HTMLElement = el.cloneNode()
      if (el._transitionClasses) {
        el._transitionClasses.forEach((cls: string) => {
          removeClass(clone, cls)
        })
      }
      addClass(clone, moveClass)
      clone.style.display = 'none'
      this.$el.appendChild(clone)
      const info: any = getTransitionInfo(clone)
      this.$el.removeChild(clone)
      return (this._hasMove = info.hasTransform)
    },
  },
}
```

:::

在 `<transition-group>` 组件实现的 `render` 函数中的相关逻辑：

- 定义变量

  不同于 `<transition>` 组件，`<transition-group>` 组件非抽象组件，它会渲染成一个真实元素，默认 `tag` 是 `span`。

  - `prevChildren` 用来存储上一次的子节点
  - `children` 用来存储当前的子节点
  - `rawChildren` 表示 `<transtition-group>` 包裹的原始子节点
  - `transtionData` 是从 `<transtition-group>` 组件上提取出来的一些渲染数据，与 `<transition>` 组件的实现是一样的。

- 遍历 `rawChidren`，初始化 `children`

  - 首先，遍历 `rawChildren` 获取到每个 `vnode`
  - 然后，判断每个 vnode 是否设置了 key，这个是 `<transition-group>` 对列表元素的要求。
  - 接着，把 vnode 添加到 `children` 中
  - 然后，把提取到的过渡数据 `transitionData` 添加的 `vnode.data.transition` 中，只有这样才能实现列表中单个元素的过渡动画。

- 处理 `prevChildren`

  - 当存在 `prevChildren` 的时候，遍历 `prevChildren`，获取到每个 vnode
  - 然后，把提取到的过渡数据 `transitionData` 赋值到 `vnode.data.transition`。这是为了当它在 `enter` 和 `leave` 的钩子函数中有过渡动画
  - 接着，又调用了原生 DOM 的 `getBoundingClientRect` 方法，获取到原生 DOM 的位置信息，记录到 `vnode.data.pos` 中
  - 接着，判断 `vnode.key` 是否在 `map` 中
    - 如果存在，则放入 `kept` 中
    - 如果不存在，则表示该节点已被删除，放入 `removed` 中
  - 然后，通过执行 `h(tag, null, kept)` 渲染后，放入 `this.kept` 中，把 `removed` 用 `this.removed` 保存
  - 最后，整个 `render` 函数通过 `h(tag, null, children)` 生成渲染 vnode

### move 过渡实现

在实现元素的插入和删除，无非是操作数据，控制它们的添加和删除。比如新增数据的时候，会添加一条数据，除了重新执行 `render` 函数渲染新的节点外，还会触发 `updated` 钩子函数。

对于 `updated` 钩子函数：

- 首先，判断子元素是否定义 `move` 相关样式

  判断子元素是否定义 `move` 相关样式，核心是通过 `hasMove` 方法判断。在 `hasMove` 方法中：

  - 首先，克隆一个 DOM 节点
  - 然后，为了避免影响，移除它的所有其他的过渡 `Class`
  - 接着，添加了 `moveClass` 样式，设置 `display` 为 `none`，添加到组件根节点上
  - 接着，通过 `getTransitionInfo(el, expectedType)` 方法获取它的一些缓动相关的信息

    ::: details 【getTransitionInfo】

    ```typescript
    const transformRE = /\b(transform|all)(,|$)/

    export function getTransitionInfo(
      el: Element,
      expectedType?: string
    ): {
      type?: string | null
      propCount: number
      timeout: number
      hasTransform: boolean
    } {
      const styles: any = window.getComputedStyle(el)
      // JSDOM may return undefined for transition properties
      const transitionDelays: Array<string> = (
        styles[transitionProp + 'Delay'] || ''
      ).split(', ')
      const transitionDurations: Array<string> = (
        styles[transitionProp + 'Duration'] || ''
      ).split(', ')
      const transitionTimeout: number = getTimeout(
        transitionDelays,
        transitionDurations
      )
      const animationDelays: Array<string> = (
        styles[animationProp + 'Delay'] || ''
      ).split(', ')
      const animationDurations: Array<string> = (
        styles[animationProp + 'Duration'] || ''
      ).split(', ')
      const animationTimeout: number = getTimeout(
        animationDelays,
        animationDurations
      )

      let type: string | undefined | null
      let timeout = 0
      let propCount = 0
      /* istanbul ignore if */
      if (expectedType === TRANSITION) {
        if (transitionTimeout > 0) {
          type = TRANSITION
          timeout = transitionTimeout
          propCount = transitionDurations.length
        }
      } else if (expectedType === ANIMATION) {
        if (animationTimeout > 0) {
          type = ANIMATION
          timeout = animationTimeout
          propCount = animationDurations.length
        }
      } else {
        timeout = Math.max(transitionTimeout, animationTimeout)
        type =
          timeout > 0
            ? transitionTimeout > animationTimeout
              ? TRANSITION
              : ANIMATION
            : null
        propCount = type
          ? type === TRANSITION
            ? transitionDurations.length
            : animationDurations.length
          : 0
      }
      const hasTransform: boolean =
        type === TRANSITION &&
        transformRE.test(styles[transitionProp + 'Property'])
      return {
        type,
        timeout,
        propCount,
        hasTransform,
      }
    }
    ```

    :::

  - 最后，从组件根节点上删除这个克隆节点，并通过判断 `info.hasTransform` 来判断 `hasMove`

- 子节点预处理

  对 `children` 进行了 3 轮循环：

  ```typescript
  children.forEach(callPendingCbs)
  children.forEach(recordPosition)
  children.forEach(applyTranslation)
  ```

  - `callPendingCbs` 的作用是在前一个过渡动画没执行完，又再次执行到该方法的时候，会提前执行 `_moveCb` 和 `_enterCb`

    ::: details 【callPendingCbs】方法

    ```typescript
    function callPendingCbs(
      c: VNodeWithData & { elm?: { _moveCb?: Function; _enterCb?: Function } }
    ) {
      /* istanbul ignore if */
      if (c.elm!._moveCb) {
        c.elm!._moveCb()
      }
      /* istanbul ignore if */
      if (c.elm!._enterCb) {
        c.elm!._enterCb()
      }
    }
    ```

    :::

  - `recordPosition` 的作用是记录节点的新位置

    ::: details 【recordPosition】方法

    ```typescript
    function recordPosition(c: VNodeWithData) {
      c.data!.newPos = c.elm.getBoundingClientRect()
    }
    ```

    :::

  - `applyTranslation` 的作用是先计算节点新位置和旧位置的差值，如果差值不为 `0`，则说明这些节点是需要移动的，所以记录 `vnode.data.moved` 为 `true`，并且通过设置 `transform` 把需要移动的节点的位置又偏移到之前的旧位置，目的是为了做 `move` 缓动做准备。

    ::: details 【applyTranslation】方法

    ```typescript
    function applyTranslation(c: VNodeWithData) {
      const oldPos = c.data.pos
      const newPos = c.data.newPos
      const dx = oldPos.left - newPos.left
      const dy = oldPos.top - newPos.top
      if (dx || dy) {
        c.data.moved = true
        const s = c.elm.style
        s.transform = s.WebkitTransform = `translate(${dx}px,${dy}px)`
        s.transitionDuration = '0s'
      }
    }
    ```

    :::

- 遍历子元素实现 move 过渡

  - 首先，通过 `this._reflow = document.body.offsetHeight` 强制触发浏览器重绘
  - 接着，对 `children` 进行遍历，
    - 首先，给子节点添加 `moveClass`
    - 接着，把子节点的 `style.transform` 设置为空，将元素从之前的位置平滑过渡新的位置，这样就实现了 `move` 的过渡动画。
    - 然后，监听 `transitionEndEvent` 过渡结束的事件，进行一些清理的操作

由于虚拟 DOM 的子元素更新算法是不稳定的，它不能保证被移除元素的相对位置，所以强制 `<transition-group>` 组件更新子节点通过 2 个步骤：

- 第一步，移除需要移除的 `vnode`，同时，触发它们的 `leaving` 过渡
- 第二步，需要把插入和移动的节点达到它们的最终态，同时还要保证移除的节点保留在应该的位置，而这个是通过 `<transition-group>` 的 `beforeMount` 钩子函数来实现的。通过把 `__patch__` 方法的第四个参数 `removeOnly` 设置为 `true`，这样在 `updateChildren` 阶段，是不会移动 `vnode` 节点的。
