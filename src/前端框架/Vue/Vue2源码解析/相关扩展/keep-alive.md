# keep-alive

## 内置组件

::: details keep-alive 内置组件

```typescript
// src\core\components\keep-alive.ts

export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },

  methods: {
    cacheVNode() {
      const { cache, keys, vnodeToCache, keyToCache } = this
      if (vnodeToCache) {
        const { tag, componentInstance, componentOptions } = vnodeToCache
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag,
          componentInstance,
        }
        keys.push(keyToCache)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
        this.vnodeToCache = null
      }
    },
  },

  created() {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted() {
    this.cacheVNode()
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  updated() {
    this.cacheVNode()
  },

  render() {
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    const componentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      const name = _getComponentName(componentOptions)
      const { include, exclude } = this
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        // delay setting the cache until update
        this.vnodeToCache = vnode
        this.keyToCache = key
      }

      // @ts-expect-error can vnode.data can be undefined
      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  },
}
```

:::

`<keep-alive>` 组件的实现是一个对象。在其中，存在 `abstract` 属性为 `true`，是一个抽象组件，实际上它在组件实例建立父子关系的时候会被忽略，发生在初始化执行 `initLifecycle(vm)` 方法的过程中。

::: details 【initLifecycle】方法

```typescript {6-11}
export function initLifecycle(vm: Component) {
  const options = vm.$options

  // locate first non-abstract parent
  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._provided = parent ? parent._provided : Object.create(null)
  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```

:::

`<keep-alive>` 在 `created` 钩子函数中，定义了 `this.cache` 和 `this.keys`，本质上是缓存已经创建过的 `vnode`。

`<keep-alive>` 在 `props` 定义了 `include`、`exclude`、`max`：

- `include` 表示只有匹配的组件会被缓存，可以是字符串或表达式。
- `exclude` 表示任何匹配的组件都不会被缓存，可以是字符串或表达式。
- `max` 表示缓存的大小。因为是缓存的 `vnode` 对象，它也会持有 DOM，当缓存很多的时候，会比较占用内存，所以该配置允许指定缓存大小。

`<keep-alive>` 直接实现了 `render` 函数，执行 `<keep-alive>` 组件渲染的时候，会执行到这个 `render` 函数。

- 首先，获取第一个子元素的 `vnode`。由于是在 `<keep-alive>` 标签内部写 DOM，所以可以先获取到默认的插槽，然后再获取它的第一个节点。`<keep-alive>` 只处理第一个子元素，所以一般和它搭配使用的有 `component` 动态组件或者是 `router-view` 。
- 然后，通过 `matches` 方法，判断当前组建的名称和 `include`、`exclude` 的关系。组件名，如果满足配置了 `include` 且不匹配 或者 是配置了 `exclude` 且匹配，那么就直接返回这个组件的 `vnode`，否则进行缓存。

  `matches` 方法，通过做匹配，分别处理了数组、字符串、正则表达式的情况，也就是说传入的 `include` 和 `exclude` 可以是这三种类型的任意一种。

  ::: details 【matches】方法

  ```typescript
  // src\core\components\keep-alive.ts
  function matches(
    pattern: string | RegExp | Array<string>,
    name: string
  ): boolean {
    if (isArray(pattern)) {
      return pattern.indexOf(name) > -1
    } else if (typeof pattern === 'string') {
      return pattern.split(',').indexOf(name) > -1
    } else if (isRegExp(pattern)) {
      return pattern.test(name)
    }
    /* istanbul ignore next */
    return false
  }
  ```

  :::

- 接着，进行组件缓存。

  - 如果命中缓存，则直接从缓存中获取 `vnode` 组件实例，并且重新调整 `key` 的顺序，将其放在了最后一个。
  - 否则，把 `vnode` 设置进缓存，如果配置了 `max` 并且缓存的长度超过了 `this.max`，需要从缓存中删除第一个。

    通过 `pruneCacheEntry` 删除组件缓存时，如果要删除的缓存组件 `tag` 不是当前渲染组件 `tag`，需要执行删除缓存组件实例的 `$destroy` 方法。

    ::: details 【pruneCacheEntry】方法

    ```typescript
    // src\core\components\keep-alive.ts

    function pruneCacheEntry(
      cache: VNodeCache,
      key: string,
      keys: Array<string>,
      current?: VNode
    ) {
      const cached = cache[key]
      if (cached && (!current || cached.tag !== current.tag)) {
        cached.componentInstance.$destroy()
      }
      cache[key] = null
      remove(keys, key)
    }
    ```

    :::

- 最后，设置 `vnode.data.keepAlive = true`

`<keep-alive>` 组件观测 `include` 和 `exclude` 的变化，执行了 `pruneCache` 函数。其实是对 `cache` 进行遍历，发现缓存的节点名称和新的规则没有匹配上的时候，则把这个缓存节点从缓存中摘除。

::: details 【pruneCache】方法

```typescript
// src\core\components\keep-alive.ts

function pruneCache(
  keepAliveInstance: { cache: CacheEntryMap; keys: string[]; _vnode: VNode },
  filter: Function
) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const entry = cache[key]
    if (entry) {
      const name = entry.name
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode)
      }
    }
  }
}
```

:::

## 组件渲染

### 首次渲染

Vue 的渲染最后都会通过 `patch` 将组件 VNode 渲染真实 DOM 阶段，在 `patch` 过程中，会执行 `patch` 的辅助函数 `createComponent` 方法。

在 `patch` 的辅助函数 `createComponent(vnode, insertedVnodeQueue, parentElm, refElm)` 方法中：

- 方法中定义了 `isReactivated` 的变量，它是根据 `vnode.componentInstance` 以及 `vnode.data.keepAlive` 的判断。
- 第一次渲染的时候，`vnode.componentInstance` 为 `undefined`，`vnode.data.keepAlive` 为 `true`，因为它的父组件 `<keep-alive>` 的 `render` 函数会先执行，那么该 `vnode` 缓存到内存中，并且设置 `vnode.data.keepAlive` 为 `true`，因此 `isReactivated` 为 `false`，那么走正常的 `init` 的钩子函数执行组件的 `mount`。
- 当 vnode 已经执行完 `patch` 后，执行 `initComponent(vnode, insertedVnodeQueue)` 函数，其中，`vnode.elm` 缓存了 `vnode` 创建生成的 DOM 节点。

::: details 【patch】 过程： 调用的 patch 辅助函数 createComponent

```typescript
function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef((i = i.hook)) && isDef((i = i.init))) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}

function initComponent(vnode, insertedVnodeQueue) {
  if (isDef(vnode.data.pendingInsert)) {
    insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
    vnode.data.pendingInsert = null
  }
  vnode.elm = vnode.componentInstance.$el
  if (isPatchable(vnode)) {
    invokeCreateHooks(vnode, insertedVnodeQueue)
    setScope(vnode)
  } else {
    // empty component root.
    // skip all element-related modules except for ref (#3455)
    registerRef(vnode)
    // make sure to invoke the insert hook
    insertedVnodeQueue.push(vnode)
  }
}
```

:::

### 缓存渲染

在 `_update` 将 VNode 渲染真实 DOM （`Vue.prototype._update`）阶段，执行 `patch` 的过程中，会执行 `patchVnode` 函数。

- `patchVnode` 函数，通常是一个递归过程，当它遇到组件 `vnode` 的时候，会执行组件更新过程的 `prepatch(oldVnode, vnode)` 钩子函数（其定义在 `src\core\vdom\create-component.ts` 中）。
- `prepatch` 钩子函数，会获取到新的 `vnode` 的组件配置以及组件实例，执行 `updateChildComponent` 方法更新组件实例的属性（其定义在 `src\core\instance\lifecycle.ts` 模块中）。

在 `updateChildComponent` 方法中，由于 `<keep-alive>` 组件本质上支持了 `slot`，所以执行 `prepatch` 的时候，需要对自己的 `children`，也就是这些 `slots` 做重新解析，并触发 `<keep-alive>` 组件实例 `$forceUpdate` 逻辑（即：重新执行 `<keep-alive>` 的 `render` 方法）。

::: details 【updateChildComponent】方法：更新组件实例的属性

```typescript {32-36,100-103}
// src\core\instance\lifecycle.ts

export function updateChildComponent(
  vm: Component,
  propsData: Record<string, any> | null | undefined,
  listeners: Record<string, Function | Array<Function>> | undefined,
  parentVnode: MountedComponentVNode,
  renderChildren?: Array<VNode> | null
) {
  if (__DEV__) {
    isUpdatingChildComponent = true
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  const newScopedSlots = parentVnode.data.scopedSlots
  const oldScopedSlots = vm.$scopedSlots
  const hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key) ||
    (!newScopedSlots && vm.$scopedSlots.$key)
  )

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  let needsForceUpdate = !!(
    renderChildren || // has new static slots
    vm.$options._renderChildren || // has old static slots
    hasDynamicScopedSlot
  )

  const prevVNode = vm.$vnode
  vm.$options._parentVnode = parentVnode
  vm.$vnode = parentVnode // update vm's placeholder node without re-render

  if (vm._vnode) {
    // update child tree's parent
    vm._vnode.parent = parentVnode
  }
  vm.$options._renderChildren = renderChildren

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  const attrs = parentVnode.data.attrs || emptyObject
  if (vm._attrsProxy) {
    // force update if attrs are accessed and has changed since it may be
    // passed to a child component.
    if (
      syncSetupProxy(
        vm._attrsProxy,
        attrs,
        (prevVNode.data && prevVNode.data.attrs) || emptyObject,
        vm,
        '$attrs'
      )
    ) {
      needsForceUpdate = true
    }
  }
  vm.$attrs = attrs

  // update listeners
  listeners = listeners || emptyObject
  const prevListeners = vm.$options._parentListeners
  if (vm._listenersProxy) {
    syncSetupProxy(
      vm._listenersProxy,
      listeners,
      prevListeners || emptyObject,
      vm,
      '$listeners'
    )
  }
  vm.$listeners = vm.$options._parentListeners = listeners
  updateComponentListeners(vm, listeners, prevListeners)

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false)
    const props = vm._props
    const propKeys = vm.$options._propKeys || []
    for (let i = 0; i < propKeys.length; i++) {
      const key = propKeys[i]
      const propOptions: any = vm.$options.props // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm)
    }
    toggleObserving(true)
    // keep a copy of raw propsData
    vm.$options.propsData = propsData
  }

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context)
    vm.$forceUpdate()
  }

  if (__DEV__) {
    isUpdatingChildComponent = false
  }
}
```

:::

如果 `<keep-alive>` 包裹的第一个组件 `vnode` 命中缓存，则直接返回缓存中的 `vnode.componentInstance`，接着，又会执行 `patch` 过程，执行到辅助函数 `createComponent` 方法。在 `createComponent` 方法中：

- 此时，`isReactivated` 为 `true`，
- 在执行组件 `init` 钩子函数时，不会再执行组件的 `mount` 过程了。这也就是被 `<keep-alive>` 包裹的组件在有缓存的时候就不会在执行组件的 `created`、`mounted` 等钩子函数的原因了。
- 在 `isReactivated` 为 `true` 的情况下，会执行 `reactivateComponent` 方法，最后通过执行 `insert(parentElm, vnode.elm, refElm)` 把缓存的 DOM 对象直接插入到目标元素中，这样就完成了在数据更新的情况下的渲染过程。

::: details 【patch】 过程： 调用的 patch 辅助函数 createComponent

```typescript
// src\core\vdom\patch.ts

function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  let i = vnode.data
  if (isDef(i)) {
    const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
    if (isDef((i = i.hook)) && isDef((i = i.init))) {
      i(vnode, false /* hydrating */)
    }
    // after calling the init hook, if the vnode is a child component
    // it should've created a child instance and mounted it. the child
    // component also has set the placeholder vnode's elm.
    // in that case we can just return the element and be done.
    if (isDef(vnode.componentInstance)) {
      initComponent(vnode, insertedVnodeQueue)
      insert(parentElm, vnode.elm, refElm)
      if (isTrue(isReactivated)) {
        reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm)
      }
      return true
    }
  }
}

function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
  let i
  // hack for #4339: a reactivated component with inner transition
  // does not trigger because the inner node's created hooks are not called
  // again. It's not ideal to involve module-specific logic in here but
  // there doesn't seem to be a better way to do it.
  let innerNode = vnode
  while (innerNode.componentInstance) {
    innerNode = innerNode.componentInstance._vnode
    if (isDef((i = innerNode.data)) && isDef((i = i.transition))) {
      for (i = 0; i < cbs.activate.length; ++i) {
        cbs.activate[i](emptyNode, innerNode)
      }
      insertedVnodeQueue.push(innerNode)
      break
    }
  }
  // unlike a newly created component,
  // a reactivated keep-alive component doesn't insert itself
  insert(parentElm, vnode.elm, refElm)
}

function insert(parent, elm, ref) {
  if (isDef(parent)) {
    if (isDef(ref)) {
      if (nodeOps.parentNode(ref) === parent) {
        nodeOps.insertBefore(parent, elm, ref)
      }
    } else {
      nodeOps.appendChild(parent, elm)
    }
  }
}

// ==============================
// ==============================

// src\core\vdom\create-component.ts

const componentVNodeHooks = {
  init(vnode: VNodeWithData, hydrating: boolean): boolean | void {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      const mountedNode: any = vnode // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode)
    } else {
      const child = (vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      ))
      child.$mount(hydrating ? vnode.elm : undefined, hydrating)
    }
  },
}
```

:::

## 生命周期

### activated 生命周期函数

在 `_update` 将 VNode 渲染真实 DOM （`Vue.prototype._update`）阶段最后一步，会执行 `invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)` 函数，执行 `vnode` 的 `insert` 函数。

在 `insert` 函数中，如果 `<keep-alive>` 包裹的组件已经 `mounted`，那么执行 `queueActivatedComponent(componentInstance)`，否则，执行 `activateChildComponent(componentInstance, true)`。

- 包裹组件未 `mounted` 时，执行 `activateChildComponent(vm, direct)` 方法，触发组件的 `acitvated` 钩子函数，并递归执行所有子组件的 `acitvated` 钩子函数。

  ::: details 【activateChildComponent】方法

  ```typescript
  // src\core\vdom\create-component.ts

  export function activateChildComponent(vm: Component, direct?: boolean) {
    if (direct) {
      vm._directInactive = false
      if (isInInactiveTree(vm)) {
        return
      }
    } else if (vm._directInactive) {
      return
    }
    if (vm._inactive || vm._inactive === null) {
      vm._inactive = false
      for (let i = 0; i < vm.$children.length; i++) {
        activateChildComponent(vm.$children[i])
      }
      callHook(vm, 'activated')
    }
  }
  ```

  :::

- 包裹组件已 `mounted` 时，执行 `queueActivatedComponent(vm)` 方法，把当前 `vm` 实例添加到 `activatedChildren` 数组中，等所有的渲染完毕，在 `nextTick` 后会执行 `flushSchedulerQueue` 方法。

  ::: details 【queueActivatedComponent】方法

  ```typescript
  // src\core\vdom\create-component.ts

  const activatedChildren: Array<Component> = []

  /**
   * Queue a kept-alive component that was activated during patch.
   * The queue will be processed after the entire tree has been patched.
   */
  export function queueActivatedComponent(vm: Component) {
    // setting _inactive to false here so that a render function can
    // rely on checking whether it's in an inactive tree (e.g. router-view)
    vm._inactive = false
    activatedChildren.push(vm)
  }
  ```

  :::

  在 `flushSchedulerQueue` 方法中，会遍历所有的 `activatedChildren`，执行 `activateChildComponent` 方法，通过队列调用的方式把整个 `activated` 时机延后了。

  ::: details 【flushSchedulerQueue】方法

  ```typescript
  /**
   * Flush both queues and run the watchers.
   */
  function flushSchedulerQueue() {
    currentFlushTimestamp = getNow()
    flushing = true
    let watcher, id

    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child)
    // 2. A component's user watchers are run before its render watcher (because
    //    user watchers are created before the render watcher)
    // 3. If a component is destroyed during a parent component's watcher run,
    //    its watchers can be skipped.
    queue.sort(sortCompareFn)

    // do not cache length because more watchers might be pushed
    // as we run existing watchers
    for (index = 0; index < queue.length; index++) {
      watcher = queue[index]
      if (watcher.before) {
        watcher.before()
      }
      id = watcher.id
      has[id] = null
      watcher.run()
      // in dev build, check and stop circular updates.
      if (__DEV__ && has[id] != null) {
        circular[id] = (circular[id] || 0) + 1
        if (circular[id] > MAX_UPDATE_COUNT) {
          warn(
            'You may have an infinite update loop ' +
              (watcher.user
                ? `in watcher with expression "${watcher.expression}"`
                : `in a component render function.`),
            watcher.vm
          )
          break
        }
      }
    }

    // keep copies of post queues before resetting state
    const activatedQueue = activatedChildren.slice()
    const updatedQueue = queue.slice()

    resetSchedulerState()

    // call component updated and activated hooks
    callActivatedHooks(activatedQueue)
    callUpdatedHooks(updatedQueue)

    // devtool hook
    /* istanbul ignore if */
    if (devtools && config.devtools) {
      devtools.emit('flush')
    }
  }

  function callActivatedHooks(queue) {
    for (let i = 0; i < queue.length; i++) {
      queue[i]._inactive = true
      activateChildComponent(queue[i], true /* true */)
    }
  }
  ```

  :::

::: details 【invokeInsertHook】函数

```typescript
// src\core\vdom\patch.ts

function invokeInsertHook(vnode, queue, initial) {
  // delay insert hooks for component root nodes, invoke them after the
  // element is really inserted
  if (isTrue(initial) && isDef(vnode.parent)) {
    vnode.parent.data.pendingInsert = queue
  } else {
    for (let i = 0; i < queue.length; ++i) {
      queue[i].data.hook.insert(queue[i])
    }
  }
}

// ==============================
// ==============================

// src\core\vdom\create-component.ts

const componentVNodeHooks = {
  insert(vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true
      callHook(componentInstance, 'mounted')
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance)
      } else {
        activateChildComponent(componentInstance, true /* direct */)
      }
    }
  },
}
```

:::

### deactivated 生命周期函数

对于 `deactivated` 生命周期函数，发生在 `vnode` 的 `destory` 的钩子函数中。

::: details 【componentVNodeHooks- destroy】：组件 VNode 钩子函数

```typescript
// src\core\vdom\create-component.ts

// inline hooks to be invoked on component VNodes during patch
const componentVNodeHooks = {
  destroy(vnode: MountedComponentVNode) {
    const { componentInstance } = vnode
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy()
      } else {
        deactivateChildComponent(componentInstance, true /* direct */)
      }
    }
  },
}
```

:::

对于 `<keep-alive>` 包裹的组件而言，会执行 `deactivateChildComponent(componentInstance, true)` 方法，触发组件的 `deacitvated` 钩子函数，并且递归去执行它的所有子组件的 `deactivated` 钩子函数。

::: details 【deactivateChildComponent】方法

```typescript
export function deactivateChildComponent(vm: Component, direct?: boolean) {
  if (direct) {
    vm._directInactive = true
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true
    for (let i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i])
    }
    callHook(vm, 'deactivated')
  }
}
```

:::
