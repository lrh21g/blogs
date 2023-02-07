# React 位运算

## 位运算符

### 基本概念

位运算符中的左右操作数转换为有符号 32 位整型二进制串（0 和 1 组成）， 且返回结果也是有符号 32 位整型。

- 所以当操作数是浮点型时，首先会被转换成整型, 再进行位运算。对非 Number 类型使用位运算操作符时，会发生隐式转换。
- 当操作数过大, 超过了 `Int32` 范围, 超过的部分会被截取，取低位 `32bit` 。

位运算符：

- 按位与（`a & b`）：在 a、b 的位表示中，每一个对应的位都为 1 则返回 1，否则返回 0
- 按位或（`a | b`）：在 a、b 的位表示中，每一个对应的位，只要有一个为 1 则返回 1，否则返回 0
- 按位异或（`a ^ b`）：在 a、b 的位表示中，每一个对应的位，两个不相同则返回 1，相同则返回 0
- 按位非（`~a`）：反转被操作数的位
- 左移（`a << b`）：将 a 的二进制串向左移动 b 位，右边移入 0
- 算术右移（`a >> b`）：把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位。（注：算术右移左边空出的位是根据最高位是 0 和 1 来进行填充的）
- 无符号右移 (左边空出位用 0 填充)（`a >>> b`）：把 a 的二进制表示向右移动 b 位，丢弃被移出的所有位，并把左边空出的位都填充为 0

### 基本使用

#### 枚举属性

通过位移的方式, 定义一些枚举常量。

```js
const A = 1 << 0 // 0b0000000000000000000000000000001 = 1
const B = 1 << 1 // 0b0000000000000000000000000000010 = 2
const C = 1 << 2 // 0b0000000000000000000000000000100 = 4
```

#### 位掩码

通过位移定义的一组枚举常量, 可以利用位掩码的特性, 快速操作这些枚举产量(增加、删除、比较)。

- 属性增加 `|` ，如：`ABC = A | B | C`
- 属性删除 `& ~` ，如：`AB = ABC & ~C`
- 属性比较
  - AB 当中包含 B : `AB & B === B`
  - AB 当中不包含 C : `AB & C === 0`
  - A 和 B 相等 : `A === B`

```js
const A = 1 << 0 // 0b0000000000000000000000000000001
const B = 1 << 1 // 0b0000000000000000000000000000010
const C = 1 << 2 // 0b0000000000000000000000000000100

// 增加属性
const ABC = A | B | C // 0b0000000000000000000000000000111
// 删除属性
const AB = ABC & ~C // 0b0000000000000000000000000000011

// 属性比较
// 1. AB当中包含 B
console.log((AB & B) === B) // true
// 2. AB当中不包含 C
console.log((AB & C) === 0) // true
// 3. A 和 B 相等
console.log(A === B) // false
```

## React 的使用场景

### 优先级管理 Lanes

在 React 中，多个更新优先级的任务存在的时候，高优先级的任务会优先执行，等到执行完高优先级的任务，在回过头来执行低优先级的任务。

`Lane` 模型使用 31 位二进制来表示优先级车道共 31 条, 位数越小（1 的位置越靠右）表示优先级越高。

::: details Lane 模型优先级

```js
export type Lanes = number
export type Lane = number
export type LaneMap<T> = Array<T>

// Lane 使用 31 位二进制来表示优先级车道共 31 条, 位数越小（1的位置越靠右）表示优先级越高
export const TotalLanes = 31

// 没有优先级
export const NoLanes: Lanes = /*                        */ 0b0000000000000000000000000000000
export const NoLane: Lane = /*                          */ 0b0000000000000000000000000000000

// 同步优先级，表示同步的任务一次只能执行一个，例如：用户的交互事件产生的更新任务
export const SyncLane: Lane = /*                        */ 0b0000000000000000000000000000001

// 连续触发优先级，例如：滚动事件，拖动事件等
export const InputContinuousHydrationLane: Lane = /*    */ 0b0000000000000000000000000000010
export const InputContinuousLane: Lane = /*             */ 0b0000000000000000000000000000100

// 默认优先级，例如使用 setTimeout，请求数据返回等造成的更新
export const DefaultHydrationLane: Lane = /*            */ 0b0000000000000000000000000001000
export const DefaultLane: Lane = /*                     */ 0b0000000000000000000000000010000

// 过度优先级，例如: Suspense、useTransition、useDeferredValue等拥有的优先级
const TransitionHydrationLane: Lane = /*                */ 0b0000000000000000000000000100000
const TransitionLanes: Lanes = /*                       */ 0b0000000001111111111111111000000
const TransitionLane1: Lane = /*                        */ 0b0000000000000000000000001000000
const TransitionLane2: Lane = /*                        */ 0b0000000000000000000000010000000
const TransitionLane3: Lane = /*                        */ 0b0000000000000000000000100000000
const TransitionLane4: Lane = /*                        */ 0b0000000000000000000001000000000
const TransitionLane5: Lane = /*                        */ 0b0000000000000000000010000000000
const TransitionLane6: Lane = /*                        */ 0b0000000000000000000100000000000
const TransitionLane7: Lane = /*                        */ 0b0000000000000000001000000000000
const TransitionLane8: Lane = /*                        */ 0b0000000000000000010000000000000
const TransitionLane9: Lane = /*                        */ 0b0000000000000000100000000000000
const TransitionLane10: Lane = /*                       */ 0b0000000000000001000000000000000
const TransitionLane11: Lane = /*                       */ 0b0000000000000010000000000000000
const TransitionLane12: Lane = /*                       */ 0b0000000000000100000000000000000
const TransitionLane13: Lane = /*                       */ 0b0000000000001000000000000000000
const TransitionLane14: Lane = /*                       */ 0b0000000000010000000000000000000
const TransitionLane15: Lane = /*                       */ 0b0000000000100000000000000000000
const TransitionLane16: Lane = /*                       */ 0b0000000001000000000000000000000

const RetryLanes: Lanes = /*                            */ 0b0000111110000000000000000000000
const RetryLane1: Lane = /*                             */ 0b0000000010000000000000000000000
const RetryLane2: Lane = /*                             */ 0b0000000100000000000000000000000
const RetryLane3: Lane = /*                             */ 0b0000001000000000000000000000000
const RetryLane4: Lane = /*                             */ 0b0000010000000000000000000000000
const RetryLane5: Lane = /*                             */ 0b0000100000000000000000000000000

export const SomeRetryLane: Lane = RetryLane1

export const SelectiveHydrationLane: Lane = /*          */ 0b0001000000000000000000000000000

const NonIdleLanes: Lanes = /*                          */ 0b0001111111111111111111111111111

export const IdleHydrationLane: Lane = /*               */ 0b0010000000000000000000000000000
export const IdleLane: Lane = /*                        */ 0b0100000000000000000000000000000

export const OffscreenLane: Lane = /*                   */ 0b1000000000000000000000000000000
```

:::

在 React 中，`render` 阶段可能被中断，在这个期间会产生一个更高优先级的任务，会再次更新 `Lane` 属性，多个更新就会合并，则需要 `Lane` 表现出多个更新优先级。通过位运算，可以让多个优先级的任务合并，也可以通过位运算分离出高优先级和低优先级的任务。

React 调用 `getHighestPriorityLanes(lanes)` 函数，通过 `getHighestPriorityLane(lanes)` 执行 `lanes & -lanes` 分离出高优先级任务。

::: note 示例
例如：`SyncLane` 和 `InputContinuousLane` 优先级合并后，通过 `lane & -lane` 分离的结果是 `SyncLane`

```js
SyncLane = /*                */0b0000000000000000000000000000001
InputContinuousLane = /*     */0b0000000000000000000000000000100
lane = SyncLane ｜ InputContinuousLane // SyncLane 和 InputContinuousLane 优先级合并
lane = /*                    */0b0000000000000000000000000000101
-lane = /*                   */0b1111111111111111111111111111011
lanes & -lanes /*            */0b0000000000000000000000000000001
```

:::

::: details getHighestPriorityLanes 函数

```js
export function getHighestPriorityLane(lanes: Lanes): Lane {
  return lanes & -lanes
}

function getHighestPriorityLanes(lanes: Lanes | Lane): Lanes {
  switch (getHighestPriorityLane(lanes)) {
    case SyncLane:
      return SyncLane
    case InputContinuousHydrationLane:
      return InputContinuousHydrationLane
    case InputContinuousLane:
      return InputContinuousLane
    case DefaultHydrationLane:
      return DefaultHydrationLane
    case DefaultLane:
      return DefaultLane
    case TransitionHydrationLane:
      return TransitionHydrationLane
    case TransitionLane1:
    case TransitionLane2:
    case TransitionLane3:
    case TransitionLane4:
    case TransitionLane5:
    case TransitionLane6:
    case TransitionLane7:
    case TransitionLane8:
    case TransitionLane9:
    case TransitionLane10:
    case TransitionLane11:
    case TransitionLane12:
    case TransitionLane13:
    case TransitionLane14:
    case TransitionLane15:
    case TransitionLane16:
      return lanes & TransitionLanes
    case RetryLane1:
    case RetryLane2:
    case RetryLane3:
    case RetryLane4:
    case RetryLane5:
      return lanes & RetryLanes
    case SelectiveHydrationLane:
      return SelectiveHydrationLane
    case IdleHydrationLane:
      return IdleHydrationLane
    case IdleLane:
      return IdleLane
    case OffscreenLane:
      return OffscreenLane
    default:
      if (__DEV__) {
        console.error(
          'Should have found matching lanes. This is a bug in React.'
        )
      }
      // This shouldn't be reachable, but as a fallback, return the entire bitmask.
      return lanes
  }
}
```

:::

### 执行上下文 ExecutionContext

在 React 中，在一次点击事件更新中，多次更新 `state`，那么在 React 中会被合成一次更新。React 会通过给更新上下文状态 `ExecutionContext` 赋值不同的状态，来证明当前上下文的状态。点击事件里面的上下文会被赋值独立的上下文状态。

```js
export function batchedUpdates<A, R>(fn: A => R, a: A): R {
  const prevExecutionContext = executionContext
  executionContext |= BatchedContext
  try {
    return fn(a)
  } finally {
    executionContext = prevExecutionContext
    // If there were legacy sync updates, flush them at the end of the outer
    // most batchedUpdates-like method.
    if (
      executionContext === NoContext &&
      // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !(__DEV__ && ReactCurrentActQueue.isBatchingLegacy)
    ) {
      resetRenderTimer()
      flushSyncCallbacksOnlyInLegacyMode()
    }
  }
}
```

在 React 事件系统中，给更新上下文状 `ExecutionContext` 赋值 `EventContext`，在执行完事件后，再重置到之前的状态。这样在事件系统中的更新能感知到目前的更新上下文是 `EventContext`，那么在这里的更新就是可控的，就可以实现批量更新的逻辑了。

```js
export const NoContext = /*             */ 0b000
const BatchedContext = /*               */ 0b001
const RenderContext = /*                */ 0b010
const CommitContext = /*                */ 0b100
```

在 React 整体设计中，更新上下文状态 `ExecutionContext` 作为一个全局状态，指引 React 更新的方向，在 React 运行时上下文中，无论是初始化还是更新，都会走一个入口函数，即 `scheduleUpdateOnFiber` ，这个函数会使用更新上下文来判别更新的下一步走向。

::: detials scheduleUpdateOnFiber 函数

```js
export function scheduleUpdateOnFiber(
  root: FiberRoot,
  fiber: Fiber,
  lane: Lane,
  eventTime: number
) {
  if (
    (executionContext & RenderContext) !== NoLanes &&
    root === workInProgressRoot
  ) {
  } else {
    // ... 省略部分代码

    if (root === workInProgressRoot) {
      // Received an update to a tree that's in the middle of rendering. Mark
      // that there was an interleaved update work on this root. Unless the
      // `deferRenderPhaseUpdateToNextBatch` flag is off and this is a render
      // phase update. In that case, we don't treat render phase updates as if
      // they were interleaved, for backwards compat reasons.
      if (
        deferRenderPhaseUpdateToNextBatch ||
        (executionContext & RenderContext) === NoContext
      ) {
        workInProgressRootInterleavedUpdatedLanes = mergeLanes(
          workInProgressRootInterleavedUpdatedLanes,
          lane
        )
      }
      if (workInProgressRootExitStatus === RootSuspendedWithDelay) {
        // The root already suspended with a delay, which means this render
        // definitely won't finish. Since we have a new update, let's mark it as
        // suspended now, right before marking the incoming update. This has the
        // effect of interrupting the current render and switching to the update.
        // TODO: Make sure this doesn't override pings that happen while we've
        // already started rendering.
        markRootSuspended(root, workInProgressRootRenderLanes)
      }
    }

    ensureRootIsScheduled(root, eventTime)
    if (
      lane === SyncLane &&
      executionContext === NoContext &&
      (fiber.mode & ConcurrentMode) === NoMode &&
      // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !(__DEV__ && ReactCurrentActQueue.isBatchingLegacy)
    ) {
      // Flush the synchronous work now, unless we're already working or inside
      // a batch. This is intentionally inside scheduleUpdateOnFiber instead of
      // scheduleCallbackForFiber to preserve the ability to schedule a callback
      // without immediately flushing it. We only do this for user-initiated
      // updates, to preserve historical behavior of legacy mode.
      resetRenderTimer()
      flushSyncCallbacksOnlyInLegacyMode()
    }
  }
}
```

:::

### 更新标识 flag

在 React 中，通过判断 `Fiber` 的标识 `flag` 表示当前 `Fiber` 的更新类型。

```js
// Don't change these two values. They're used by React Dev Tools.
export const NoFlags = /*                      */ 0b00000000000000000000000000
export const PerformedWork = /*                */ 0b00000000000000000000000001

// You can change the rest (and add more).
export const Placement = /*                    */ 0b00000000000000000000000010
export const Update = /*                       */ 0b00000000000000000000000100
export const Deletion = /*                     */ 0b00000000000000000000001000
export const ChildDeletion = /*                */ 0b00000000000000000000010000
export const ContentReset = /*                 */ 0b00000000000000000000100000
export const Callback = /*                     */ 0b00000000000000000001000000
export const DidCapture = /*                   */ 0b00000000000000000010000000
export const ForceClientRender = /*            */ 0b00000000000000000100000000
export const Ref = /*                          */ 0b00000000000000001000000000
export const Snapshot = /*                     */ 0b00000000000000010000000000
export const Passive = /*                      */ 0b00000000000000100000000000
export const Hydrating = /*                    */ 0b00000000000001000000000000
export const Visibility = /*                   */ 0b00000000000010000000000000
export const StoreConsistency = /*             */ 0b00000000000100000000000000
```
