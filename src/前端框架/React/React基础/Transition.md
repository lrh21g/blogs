# Transition （过渡）

## startTransition

### startTransition 的使用

`startTransition(scope)` ：允许在不阻塞 UI 的情况下更新状态

- `scope` ：通过调用一个或者多个 set 函数来更新某些状态的回调函数。回调函数中的更新任务会被标记为过渡更新任务，在渲染并发的场景下，更新优先级会被降级，中断更新。

```js
import { startTransition } from 'react'

function TabContainer() {
  const [tab, setTab] = useState('about')

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab)
    })
  }
}
```

### startTransition 实现原理

::: details startTransition(scope, options) 函数

```js
// react\packages\react\src\ReactStartTransition.js

import type { StartTransitionOptions } from 'shared/ReactTypes'

import ReactCurrentBatchConfig from './ReactCurrentBatchConfig'
import { enableTransitionTracing } from 'shared/ReactFeatureFlags'

export function startTransition(
  scope: () => void,
  options?: StartTransitionOptions
) {
  const prevTransition = ReactCurrentBatchConfig.transition
  ReactCurrentBatchConfig.transition = {}
  const currentTransition = ReactCurrentBatchConfig.transition

  if (enableTransitionTracing) {
    if (options !== undefined && options.name !== undefined) {
      ReactCurrentBatchConfig.transition.name = options.name
      ReactCurrentBatchConfig.transition.startTime = -1
    }
  }

  try {
    scope()
  } finally {
    ReactCurrentBatchConfig.transition = prevTransition
  }
}
```

:::

## useTransition

### useTransition 的使用

`const [isPending, startTransition] = useTransition()` ：返回一个状态值表示过渡任务的等待状态，以及一个启动该过渡任务的函数。

- `startTransition` : 允许通过标记更新将提供的回调函数作为一个过渡任务
- `isPending` : 指示过渡任务何时活跃以显示一个等待状态

```js
function App() {
  const [isPending, startTransition] = useTransition()
  const [count, setCount] = useState(0)

  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1)
    })
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  )
}
```

### useTransition 实现原理

`useTranstion` 本质上就是 `useTranstion = useState + startTransition`。

::: details

```js
// react\packages\react-reconciler\src\ReactFiberHooks.new.js

function mountTransition(): [
  boolean,
  (callback: () => void, options?: StartTransitionOptions) => void
] {
  const [isPending, setPending] = mountState(false)
  // The `start` method never changes.
  const start = startTransition.bind(null, setPending)
  const hook = mountWorkInProgressHook()
  hook.memoizedState = start
  return [isPending, start]
}

function updateTransition(): [
  boolean,
  (callback: () => void, options?: StartTransitionOptions) => void
] {
  const [isPending] = updateState(false)
  const hook = updateWorkInProgressHook()
  const start = hook.memoizedState
  return [isPending, start]
}

function startTransition(setPending, callback, options) {
  const previousPriority = getCurrentUpdatePriority()
  setCurrentUpdatePriority(
    higherEventPriority(previousPriority, ContinuousEventPriority)
  )

  setPending(true)

  const prevTransition = ReactCurrentBatchConfig.transition
  ReactCurrentBatchConfig.transition = {}
  const currentTransition = ReactCurrentBatchConfig.transition

  if (enableTransitionTracing) {
    if (options !== undefined && options.name !== undefined) {
      ReactCurrentBatchConfig.transition.name = options.name
      ReactCurrentBatchConfig.transition.startTime = now()
    }
  }

  try {
    setPending(false)
    callback()
  } finally {
    setCurrentUpdatePriority(previousPriority)

    ReactCurrentBatchConfig.transition = prevTransition
  }
}
```

:::

## useDeferredValue

### useDeferredValue 的使用

`const deferredValue = useDeferredValue(value)` ：接受一个值，并返回该值的新副本，该副本将推迟到更紧急地更新之后。如果当前渲染是一个紧急更新的结果，比如用户输入，React 将返回之前的值，然后在紧急渲染完成后渲染新的值。

`useDeferredValue` Hook 与使用防抖和节流去延迟更新的 Hooks 类似。使用 `useDeferredValue` 的好处是，React 将在其他工作完成（而不是等待任意时间）后立即进行更新，并且像 `startTransition` 一样，延迟值可以暂停，而不会触发现有内容的意外降级。

`useDeferredValue` 仅延迟传递给它的值。如果想要在紧急更新期间防止子组件重新渲染，则还必须使用 `React.memo` 或 `React.useMemo` 记忆该子组件

```js
function Typeahead() {
  const query = useSearchQuery('')
  const deferredQuery = useDeferredValue(query)

  // Memoizing 告诉 React 仅当 deferredQuery 改变，而不是 query 改变的时候才重新渲染
  const suggestions = useMemo(
    () => <SearchSuggestions query={deferredQuery} />,
    [deferredQuery]
  )

  return (
    <>
      <SearchInput query={query} />
      <Suspense fallback="Loading results...">{suggestions}</Suspense>
    </>
  )
}
```

`useDeferredValue` 和 `useTransition` 的异同

- 相同点
  - `useDeferredValue` 内部实现与 `useTransition` 一样都是标记成了过渡更新任务
- 不同点
  - `useTransition` 是把 `startTransition` 内部的更新任务变成了过渡任务 `transtion`，而 `useDeferredValue` 是把原值通过过渡任务得到新的值，这个值作为延时状态。一个是处理一段逻辑，另一个是生产一个新的状态。
  - `useDeferredValue` 过渡任务本质上在 `useEffect` 内部执行，而 `useEffect` 内部逻辑是异步执行的 ，所以它一定程度上更滞后于 `useTransition`。 `useDeferredValue = useEffect + transtion`

### useDeferredValue 实现原理

`useDeferredValue` 本质上是 `useDeferredValue = useState + useEffect + transition`

```js
// react\packages\react-reconciler\src\ReactFiberHooks.new.js

function mountDeferredValue<T>(value: T): T {
  const hook = mountWorkInProgressHook()
  hook.memoizedState = value
  return value
}

function updateDeferredValue<T>(value: T): T {
  const hook = updateWorkInProgressHook()
  const resolvedCurrentHook: Hook = (currentHook: any)
  const prevValue: T = resolvedCurrentHook.memoizedState
  return updateDeferredValueImpl(hook, prevValue, value)
}

function updateDeferredValueImpl<T>(hook: Hook, prevValue: T, value: T): T {
  const shouldDeferValue = !includesOnlyNonUrgentLanes(renderLanes)
  if (shouldDeferValue) {
    // This is an urgent update. If the value has changed, keep using the
    // previous value and spawn a deferred render to update it later.

    if (!is(value, prevValue)) {
      // Schedule a deferred render
      const deferredLane = claimNextTransitionLane()
      currentlyRenderingFiber.lanes = mergeLanes(
        currentlyRenderingFiber.lanes,
        deferredLane
      )
      markSkippedUpdateLanes(deferredLane)

      // Set this to true to indicate that the rendered value is inconsistent
      // from the latest value. The name "baseState" doesn't really match how we
      // use it because we're reusing a state hook field instead of creating a
      // new one.
      hook.baseState = true
    }

    // Reuse the previous value
    return prevValue
  } else {
    // This is not an urgent update, so we can use the latest value regardless
    // of what it is. No need to defer it.

    // However, if we're currently inside a spawned render, then we need to mark
    // this as an update to prevent the fiber from bailing out.
    //
    // `baseState` is true when the current value is different from the rendered
    // value. The name doesn't really match how we use it because we're reusing
    // a state hook field instead of creating a new one.
    if (hook.baseState) {
      // Flip this back to false.
      hook.baseState = false
      markWorkInProgressReceivedUpdate()
    }

    hook.memoizedState = value
    return value
  }
}
```
