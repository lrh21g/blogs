# useSyncExternalStore 订阅外部数据源

## useSyncExternalStore 的使用

`useSyncExternalStore` 能够让 React 组件在 `concurrent` 模式下安全地有效地读取外接数据源，在组件渲染过程中能够检测到变化，并且在数据源发生变化的时候，能够调度更新。当读取到外部状态发生了变化，会触发一个强制更新，来保证结果的一致性。

`const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)`

- `subscribe` ：订阅函数，当数据改变的时候，会触发 `subscribe`，在 `useSyncExternalStore` 会通过带有记忆性的 `getSnapshot` 来判别数据是否发生变化，如果发生变化，那么会强制更新数据。

- `getSnapshot` ：一个带有记忆功能的选择器。当 `store` 变化的时候，会通过 `getSnapshot` 生成新的状态值，这个状态值可提供给组件作为数据源使用，`getSnapshot` 可以检查订阅的值是否改变，改变的话则会触发更新。

- `getServerSnapshot` ：用于 `hydration` 模式下的 `getSnapshot`。

正常的 React 开发者在开发过程中不需要使用这个 api ，这个 Hooks 主要是对于 React 的一些状态管理库（比如： redux） ，通过它可以合理管理外部的 `store`，保证数据读取的一致。

```js
import { combineReducers, createStore } from 'redux'

// number Reducer
function numberReducer(state = 1, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'DEL':
      return state - 1
    default:
      return state
  }
}

// 注册reducer
const rootReducer = combineReducers({ number: numberReducer })

// 创建 store
const store = createStore(rootReducer, { number: 1 })

// 点击按钮，会触发 reducer ，
// 然后会触发 store.subscribe 订阅函数，执行 getSnapshot 得到新的 number ，
// 判断 number 是否发生变化，如果变化，触发更新。
function Index() {
  // 订阅外部数据源
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.getState().number
  )
  console.log(state)

  return (
    <div>
      {state}
      <button onClick={() => store.dispatch({ type: 'ADD' })}>点击</button>
    </div>
  )
}
```

## useSyncExternalStore 实现原理

在 `mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)` 函数中：

- 创建一个 Hook 。Hook 更新分两个阶段，在初始化 Hook 阶段会创建一个 Hook ，在更新阶段会更新这个 Hook。
- 调用 `getSnapshot` 产生一个状态值，并保存起来。
- 用一个 `effect` 来订阅状态 `subscribeToStore` 发起订阅 。
- 用一个 `useEffect` 来监听组件 `render` ，只要组件渲染就会调用 `updateStoreInstance` 。在 `concurrent` 模式下渲染会中断，如果中断恢复 `render` ，`effect` 就解决了这个问题。当 `render` 就会触发 `updateStoreInstance` 。

::: details mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) 函数

```js
function subscribeToStore(fiber, inst, subscribe) {
  const handleStoreChange = () => {
    // The store changed. Check if the snapshot changed since the last time we
    // read from the store.
    if (checkIfSnapshotChanged(inst)) {
      // Force a re-render.
      forceStoreRerender(fiber)
    }
  }
  // Subscribe to the store and return a clean-up function.
  return subscribe(handleStoreChange)
}

function updateStoreInstance<T>(
  fiber: Fiber,
  inst: StoreInstance<T>,
  nextSnapshot: T,
  getSnapshot: () => T
) {
  // These are updated in the passive phase
  inst.value = nextSnapshot
  inst.getSnapshot = getSnapshot

  // Something may have been mutated in between render and commit. This could
  // have been in an event that fired before the passive effects, or it could
  // have been in a layout effect. In that case, we would have used the old
  // snapsho and getSnapshot values to bail out. We need to check one more time.
  if (checkIfSnapshotChanged(inst)) {
    // Force a re-render.
    forceStoreRerender(fiber)
  }
}

function mountSyncExternalStore<T>(
  subscribe: (() => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T
): T {
  const fiber = currentlyRenderingFiber
  // 创建一个 hook
  const hook = mountWorkInProgressHook()

  let nextSnapshot
  const isHydrating = getIsHydrating()
  if (isHydrating) {
    if (getServerSnapshot === undefined) {
      throw new Error(
        'Missing getServerSnapshot, which is required for ' +
          'server-rendered content. Will revert to client rendering.'
      )
    }
    nextSnapshot = getServerSnapshot()
  } else {
    nextSnapshot = getSnapshot() // 产生快照
    // Unless we're rendering a blocking lane, schedule a consistency check.
    // Right before committing, we will walk the tree and check if any of the
    // stores were mutated.
    //
    // We won't do this if we're hydrating server-rendered content, because if
    // the content is stale, it's already visible anyway. Instead we'll patch
    // it up in a passive effect.
    const root: FiberRoot | null = getWorkInProgressRoot()

    if (root === null) {
      throw new Error(
        'Expected a work-in-progress root. This is a bug in React. Please file an issue.'
      )
    }

    if (!includesBlockingLane(root, renderLanes)) {
      pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot)
    }
  }

  // Read the current snapshot from the store on every render. This breaks the
  // normal rules of React, and only works because store updates are
  // always synchronous.
  // 把快照记录下来
  hook.memoizedState = nextSnapshot
  // 快照记录在 inst 属性上
  const inst: StoreInstance<T> = {
    value: nextSnapshot,
    getSnapshot,
  }
  hook.queue = inst

  // Schedule an effect to subscribe to the store.
  // 用一个 effect 来订阅状态 ，subscribeToStore 发起订阅
  mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe])

  // Schedule an effect to update the mutable instance fields. We will update
  // this whenever subscribe, getSnapshot, or value changes. Because there's no
  // clean-up function, and we track the deps correctly, we can call pushEffect
  // directly, without storing any additional state. For the same reason, we
  // don't need to set a static flag, either.
  // TODO: We can move this to the passive phase once we add a pre-commit
  // consistency check. See the next comment.
  fiber.flags |= PassiveEffect
  // 用一个 useEffect 来监听组件 render ，只要组件渲染就会调用 updateStoreInstance
  pushEffect(
    HookHasEffect | HookPassive,
    updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot),
    undefined,
    null
  )

  return nextSnapshot
}
```

:::

::: details updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) 函数

```js
function updateSyncExternalStore<T>(
  subscribe: (() => void) => () => void,
  getSnapshot: () => T,
  getServerSnapshot?: () => T
): T {
  const fiber = currentlyRenderingFiber
  const hook = updateWorkInProgressHook()
  // Read the current snapshot from the store on every render. This breaks the
  // normal rules of React, and only works because store updates are
  // always synchronous.
  const nextSnapshot = getSnapshot()
  const prevSnapshot = hook.memoizedState
  const snapshotChanged = !is(prevSnapshot, nextSnapshot)
  if (snapshotChanged) {
    hook.memoizedState = nextSnapshot
    markWorkInProgressReceivedUpdate()
  }
  const inst = hook.queue

  updateEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [subscribe])

  // Whenever getSnapshot or subscribe changes, we need to check in the
  // commit phase if there was an interleaved mutation. In concurrent mode
  // this can happen all the time, but even in synchronous mode, an earlier
  // effect may have mutated the store.
  if (
    inst.getSnapshot !== getSnapshot ||
    snapshotChanged ||
    // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    (workInProgressHook !== null &&
      workInProgressHook.memoizedState.tag & HookHasEffect)
  ) {
    fiber.flags |= PassiveEffect
    pushEffect(
      HookHasEffect | HookPassive,
      updateStoreInstance.bind(null, fiber, inst, nextSnapshot, getSnapshot),
      undefined,
      null
    )

    // Unless we're rendering a blocking lane, schedule a consistency check.
    // Right before committing, we will walk the tree and check if any of the
    // stores were mutated.
    const root: FiberRoot | null = getWorkInProgressRoot()

    if (root === null) {
      throw new Error(
        'Expected a work-in-progress root. This is a bug in React. Please file an issue.'
      )
    }

    if (!includesBlockingLane(root, renderLanes)) {
      pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot)
    }
  }

  return nextSnapshot
}
```

:::
