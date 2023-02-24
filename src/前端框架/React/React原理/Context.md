# Context 原理

- `Provider` 传递流程：`Provider` 的更新，会深度遍历子代 `Fiber`，消费 `context` 的 `Fiber` 和父级链都会提升更新优先级。对于类组件的 `Fiber` ，会 `forceUpdate` 处理。接下来所有消费的 `Fiber`，都会 `beginWork` 。

- `context` 订阅流程： `contextType`、`useContext`、`Consumer` 会内部调用 `readContext`。`readContext` 会把 `Fiber` 上的 `dependencies` 属性和 `context` 对象建立起关联。

## Context 对象

`React.createContext(defaultValue)` 创建一个 `Context` 对象。接受一个 `defaultValue` 参数，作为默认值。

`Context` 对象通过调用 `createContext` 函数进行创建。

::: details createContext(defaultValue) 函数

```js
// react\packages\react\src\ReactContext.js

import { REACT_PROVIDER_TYPE, REACT_CONTEXT_TYPE } from 'shared/ReactSymbols'
// export const REACT_PROVIDER_TYPE = Symbol.for('react.provider');
// export const REACT_CONTEXT_TYPE = Symbol.for('react.context');

import type { ReactContext } from 'shared/ReactTypes'

export function createContext<T>(defaultValue: T): ReactContext<T> {
  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue, // 用来保存传递给 Provider 的 value
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: (null: any),
    Consumer: (null: any),

    // Add these to use same hidden class in VM as ServerContext
    _defaultValue: (null: any),
    _globalName: (null: any),
  }

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context,
  }

  let hasWarnedAboutUsingNestedContextConsumers = false
  let hasWarnedAboutUsingConsumerProvider = false
  let hasWarnedAboutDisplayNameOnConsumer = false

  context.Consumer = context

  return context
}
```

:::

## Provider 提供者

每个 `Context` 对象都会返回一个 `Provider` React 组件，它允许消费组件订阅 `context` 的变化。

```js
<MyContext.Provider value={/* 某个值 */}>
```

`Context.Provider` 本质上是一个类型为 `REACT_PROVIDER_TYPE` 特殊的 React Element 对象，转化为 `Fiber` 的类型为 `ContextProvider`。

对于 `ContextProvider` 类型的 `Fiber`，在 Reconciler render 阶段（调和阶段）的 `beginWork` 流程中会调用 `updateContextProvider(current, workInProgress, renderLanes)` 函数进行处理。

在 `updateContextProvider(current, workInProgress, renderLanes)` 函数中：

- 调用 `pushProvider(workInProgress, context, newValue)` 将 `Provider` 的 `value` 属性，赋值给 `context` 对象（即：`workInProgress.type` 属性上的 `_context`）的 `_currentValue` 属性上
- 如果 `Context` 的 `value` 值没有改变，则会调用 `bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)` 函数复用节点
- 如果 `Context` 的 `value` 值发生改变，则会调用 `propagateContextChange(workInProgress, context, renderLanes)` 函数更新节点

::: details updateContextProvider(current, workInProgress, renderLanes) 函数

```js
function updateContextProvider(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  const providerType: ReactProviderType<any> = workInProgress.type
  const context: ReactContext<any> = providerType._context

  const newProps = workInProgress.pendingProps
  const oldProps = workInProgress.memoizedProps

  const newValue = newProps.value

  // 获取 Provider 上的 value 值
  pushProvider(workInProgress, context, newValue)

  if (enableLazyContextPropagation) {
    // In the lazy propagation implementation, we don't scan for matching
    // consumers until something bails out, because until something bails out
    // we're going to visit those nodes, anyway. The trade-off is that it shifts
    // responsibility to the consumer to track whether something has changed.
  } else {
    // 更新 Context
    if (oldProps !== null) {
      const oldValue = oldProps.value
      if (is(oldValue, newValue)) {
        // No change. Bailout early if children are the same.
        // context value 没有改变，如果 children 是一样的，则不需要更新
        if (
          oldProps.children === newProps.children &&
          !hasLegacyContextChanged()
        ) {
          return bailoutOnAlreadyFinishedWork(
            current,
            workInProgress,
            renderLanes
          )
        }
      } else {
        // The context value changed. Search for matching consumers and schedule
        // them to update.
        // context value 改变，搜索匹配 consumers 并进行调度更新
        propagateContextChange(workInProgress, context, renderLanes)
      }
    }
  }

  const newChildren = newProps.children
  reconcileChildren(current, workInProgress, newChildren, renderLanes)
  return workInProgress.child
}
```

:::

在 `propagateContextChange(workInProgress, context, renderLanes)` 函数中

- 对于 `CacheComponent`，调用 `propagateContextChanges` 来寻找匹配的 `consumers`
- 对于其它类型的组件，则调用 `propagateContextChange_eager` 来寻找匹配的 `consumers`

`propagateContextChanges` 和 `propagateContextChange_eager` 的功能差不多

- 深度遍历所有的子代 `Fiber`，获取 `Fiber` 节点的 `dependencies` 的属性

  `dependencies` 属性可以把当前的 `Fiber` 节点和 `context` 建立起关联，即使用了当前 `context` 的 `Fiber` 节点 会把 `context` 放在 `dependencies` 中。

  `dependencies` 属性本身是一个链表结构，一个 `Fiber` 节点可以有多个 `context` 与之对应

- 对比 `dependencies` 中的 `context` 和当前 `Provider` 的 `context` 是否是同一个。如果是同一个，并且当前 `Fiber` 是类组件 `ClassComponent`，则绑定一个 `forceUpdate` 标识。提高 `Fiber` 的更新优先级，让 `Fiber` 在接下来的调和过程中，处于一个高优先级待更新的状态。
- 将当前 `Fiber` 节点的 `update` 优先级标记为高优先级，并修改当前 `Fiber` 节点父路径上所有节点的 `childLanes` 属性。

::: details propagateContextChange(workInProgress, context, renderLanes) 函数

```js
export function propagateContextChange<T>(
  workInProgress: Fiber,
  context: ReactContext<T>,
  renderLanes: Lanes
): void {
  if (enableLazyContextPropagation) {
    // TODO: This path is only used by Cache components. Update
    // lazilyPropagateParentContextChanges to look for Cache components so they
    // can take advantage of lazy propagation.
    const forcePropagateEntireTree = true
    propagateContextChanges(
      workInProgress,
      [context],
      renderLanes,
      forcePropagateEntireTree
    )
  } else {
    propagateContextChange_eager(workInProgress, context, renderLanes)
  }
}
```

:::

::: details propagateContextChanges(workInProgress, [context], renderLanes, forcePropagateEntireTree) 函数

```js
function propagateContextChange_eager<T>(
  workInProgress: Fiber,
  context: ReactContext<T>,
  renderLanes: Lanes
): void {
  // Only used by eager implementation
  if (enableLazyContextPropagation) {
    return
  }
  let fiber = workInProgress.child
  if (fiber !== null) {
    // Set the return pointer of the child to the work-in-progress fiber.
    // 将 fiber 的 return 属性指向当前工作的 workInProgress
    // fiber 节点的 return 属性指向父节点
    fiber.return = workInProgress
  }
  while (fiber !== null) {
    let nextFiber

    // Visit this fiber.
    // 在 readContext() 中创建了 context 的依赖列表，并将依赖列表添加到了 fiber 节点上
    // 这里从 fiber 节点上取出 context 的依赖列表，对依赖列表进行检查
    const list = fiber.dependencies
    if (list !== null) {
      nextFiber = fiber.child

      let dependency = list.firstContext
      while (dependency !== null) {
        // Check if the context matches.
        // 查找匹配的 consumers
        if (dependency.context === context) {
          // Match! Schedule an update on this fiber.
          // 查找到匹配的 context，则安排调度
          if (fiber.tag === ClassComponent) {
            // Schedule a force update on the work-in-progress.
            // 设置 update 为 高优先级
            const lane = pickArbitraryLane(renderLanes)
            // 将当前 fiber 设置为 ForceUpdate，保证 class 组件一定执行 render
            const update = createUpdate(NoTimestamp, lane)
            update.tag = ForceUpdate
            // TODO: Because we don't have a work-in-progress, this will add the
            // update to the current fiber, too, which means it will persist even if
            // this render is thrown away. Since it's a race condition, not sure it's
            // worth fixing.

            // Inlined `enqueueUpdate` to remove interleaved update check
            const updateQueue = fiber.updateQueue
            if (updateQueue === null) {
              // Only occurs if the fiber has been unmounted.
            } else {
              const sharedQueue: SharedQueue<any> = (updateQueue: any).shared
              const pending = sharedQueue.pending
              if (pending === null) {
                // This is the first update. Create a circular list.
                update.next = update
              } else {
                update.next = pending.next
                pending.next = update
              }
              sharedQueue.pending = update
            }
          }

          // 标记优先级
          fiber.lanes = mergeLanes(fiber.lanes, renderLanes)
          const alternate = fiber.alternate
          if (alternate !== null) {
            alternate.lanes = mergeLanes(alternate.lanes, renderLanes)
          }
          // 修改当前fiber节点父路径上所有节点的 childLanes 属性
          scheduleContextWorkOnParentPath(
            fiber.return,
            renderLanes,
            workInProgress
          )

          // Mark the updated lanes on the list, too.
          // 标记优先级
          list.lanes = mergeLanes(list.lanes, renderLanes)

          // Since we already found a match, we can stop traversing the
          // dependency list.
          // 已经找到了匹配的 context，退出遍历依赖列表
          break
        }
        dependency = dependency.next
      }
    } else if (fiber.tag === ContextProvider) {
      // Don't scan deeper if this is a matching provider
      nextFiber = fiber.type === workInProgress.type ? null : fiber.child
    } else if (fiber.tag === DehydratedFragment) {
      // If a dehydrated suspense boundary is in this subtree, we don't know
      // if it will have any context consumers in it. The best we can do is
      // mark it as having updates.
      const parentSuspense = fiber.return

      if (parentSuspense === null) {
        throw new Error(
          'We just came from a parent so we must have had a parent. This is a bug in React.'
        )
      }

      parentSuspense.lanes = mergeLanes(parentSuspense.lanes, renderLanes)
      const alternate = parentSuspense.alternate
      if (alternate !== null) {
        alternate.lanes = mergeLanes(alternate.lanes, renderLanes)
      }
      // This is intentionally passing this fiber as the parent
      // because we want to schedule this fiber as having work
      // on its children. We'll use the childLanes on
      // this fiber to indicate that a context has changed.
      scheduleContextWorkOnParentPath(
        parentSuspense,
        renderLanes,
        workInProgress
      )
      nextFiber = fiber.sibling
    } else {
      // Traverse down.
      nextFiber = fiber.child
    }

    if (nextFiber !== null) {
      // Set the return pointer of the child to the work-in-progress fiber.
      nextFiber.return = fiber
    } else {
      // No child. Traverse to next sibling.
      nextFiber = fiber
      while (nextFiber !== null) {
        if (nextFiber === workInProgress) {
          // We're back to the root of this subtree. Exit.
          nextFiber = null
          break
        }
        const sibling = nextFiber.sibling
        if (sibling !== null) {
          // Set the return pointer of the sibling to the work-in-progress fiber.
          sibling.return = nextFiber.return
          nextFiber = sibling
          break
        }
        // No more siblings. Traverse up.
        nextFiber = nextFiber.return
      }
    }
    fiber = nextFiber
  }
}
```

:::

## 消费者

### 订阅者 Context.Consumer 方式

```js
const MyContext = React.createContext(null)

export default function () {
  return (
    <MyContext.Consumer>
      {/* 将 contextValue 内容转化成 props  */}
      {contextValue => <ConsumerComponent {...contextValue} />}
    </MyContext.Consumer>
  )
}
```

`Context.Consumer` 方式采取 render props 函数方式。

- 接收组件树中匹配最近的 `<MyContext.Provider>` 提供的 Context `value` 值，作为 render props 函数的参数。
- 将接受的参数取出，作为函数返回的 React 节点的 `props` 传入。

`Context.Consumer` 本质上是一个类型为 `REACT_CONTEXT_TYPE` 的 React Element 对象。转化为 `Fiber` 的类型为 `ContextConsumer`。

对于 `ContextConsumer` 类型的 `Fiber`，在 Reconciler render 阶段（调和阶段）的 `beginWork` 流程中会调用 `updateContextConsumer(current, workInProgress, renderLanes)` 函数进行处理。

在 `updateContextConsumer(current, workInProgress, renderLanes)` 函数中：

- 调用 `readContext(context)` 函数获取最新的 `value`

  在 `readContext(context)` 函数中：

  - 创建一个 `contextItem`

  - `Fiber` 节点上会存在多个 `dependencies` 以链表的形式联系到一起

    - 如果不存在最后一个 `context dependency` ，则 `context dependencies` 为空，创建第一个 `dependency`

    - 如果存在最后一个 `dependency` ，则`contextItem` 会以链表形式保存，并变成最后一个 `lastContextDependency`

  ::: details readContext(context) 函数

  ```js
  export function readContext<T>(context: ReactContext<T>): T {
    const value = isPrimaryRenderer
      ? context._currentValue
      : context._currentValue2

    if (lastFullyObservedContext === context) {
      // Nothing to do. We already observe everything in this context.
    } else {
      const contextItem = {
        context: ((context: any): ReactContext<mixed>),
        memoizedValue: value,
        next: null,
      }

      if (lastContextDependency === null) {
        if (currentlyRenderingFiber === null) {
          throw new Error(
            'Context can only be read while React is rendering. ' +
              'In classes, you can read it in the render method or getDerivedStateFromProps. ' +
              'In function components, you can read it directly in the function body, but not ' +
              'inside Hooks like useReducer() or useMemo().'
          )
        }

        // This is the first dependency for this component. Create a new list.
        lastContextDependency = contextItem
        currentlyRenderingFiber.dependencies = {
          lanes: NoLanes,
          firstContext: contextItem,
        }
        if (enableLazyContextPropagation) {
          currentlyRenderingFiber.flags |= NeedsPropagation
        }
      } else {
        // Append a new context item.
        lastContextDependency = lastContextDependency.next = contextItem
      }
    }
    return value
  }
  ```

  :::

- 通过 `render(newValue)` 函数，传入最新的 `value`，得到最新的 `newChildren`

- 调和 `newChildren`

::: details updateContextConsumer(current, workInProgress, renderLanes) 函数

```js
function updateContextConsumer(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
) {
  let context: ReactContext<any> = workInProgress.type

  const newProps = workInProgress.pendingProps
  const render = newProps.children

  // 读取 context
  prepareToReadContext(workInProgress, renderLanes)
  // 得到最新的新的 context value
  const newValue = readContext(context)
  if (enableSchedulingProfiler) {
    markComponentRenderStarted(workInProgress)
  }

  let newChildren
  // 得到最新的 children element
  newChildren = render(newValue)
  if (enableSchedulingProfiler) {
    markComponentRenderStopped()
  }

  // React DevTools reads this flag.
  workInProgress.flags |= PerformedWork
  // 调和 children
  reconcileChildren(current, workInProgress, newChildren, renderLanes)
  return workInProgress.child
}
```

:::

### 函数组件 useContext 方式

函数组件 `useContext` 方式本质上调用 `readContext` 方法。

函数组件通过 `readContext` ，将函数组件的 `dependencies` 和当前 `context` 建立起关联，`context` 改变，将当前函数组件设置高优先级，促使其渲染。

### 类组件 Class.contextType 方式

类组件 `Class.contextType` 方式 和 `useContext` 一样，本质上就是调用 `readContext` 方法。

静态属性 `contextType`，在类组件实例化的时候被使用，本质上也是调用 `readContext` 将 `context` 和 `Fiber` 上的 `dependencies` 建立起关联。
