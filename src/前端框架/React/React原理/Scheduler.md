# Scheduler

对于 React v15 版本，在 Reconciler 中，`mount` 的组件会调用 `mountComponent`，`update` 的组件会调用 `updateComponent`，这两个方法都会递归更新子组件。由于递归执行，所以更新一旦开始，中途就无法中断，当层级很深时，递归更新时间超过了 16ms，用户交互就会卡顿。

以浏览器每一帧渲染的时间中是否有剩余时间作为任务中断的标准，可以通过 `window.requestIdleCallback()` API ，该 API 通过插入一个函数，这个函数将在浏览器空闲时期被调用。部分浏览器已实现该 API （即：`requestIdleCallback`），但是该 API 以下问题：

- 浏览器兼容性
- 触发频率不稳定，受很多因素影响。如，当浏览器切换标签后，之前标签页注册的 `requestIdleCallback` 触发的频率会变得很低

React 实现了功能更完备的 `requestIdleCallback` polyfill （即 Scheduler），除了在空闲时触发回调的功能外，Scheduler 还提供了多种调度优先级供任务设置。

Scheduler 主要包含两个功能：时间切片、优先级调度。

## 时间切片

时间切片的本质是模拟实现 `requestIdleCallback` ，在 “浏览器重排/重绘” 后，如果当前帧还有空余时间时被调用的。

Scheduler 的时间切片功能是通过 `task`（宏任务）实现的，将需要被执行的回调函数作为 `MessageChannel` 的回调执行。

- 如果当前宿主环境不支持 `MessageChannel`，则使用 `setTimeout`。
- 当在 Node.js 和老 IE 环境下，使用 `setImmediate` ，与 `MessageChannel` 不同，它不会阻止 Node.js 进程的退出。

`MessageChannel` 接口允许创建一个新的消息通道，并通过它的两个 MessagePort 属性发送数据。

- `MessageChannel.port1` : 返回 channel 的 port1。
- `MessageChannel.port2` : 返回 channel 的 port2。

> Q：为什么用 `MessageChannel` ，而不首选 `setTimeout`
>
> - `MessageChannel` 是以 DOM Event 的形式发送消息，所以它是一个宏任务，会在下一个事件循环的开头执行。浏览器的宏任务队列是一个有序集合，意味着队列里到期的事件不一定会按入队的顺序执行，DOM Event 的优先级比计时器高，`MessageChannel` 比 `setTimeout` 执行时机更靠前。
> - 通 `setTimeout(fn,0)` 所创建的宏任务，会有至少 4ms 左右的执行时差。

使用 `ReactDOM.createRoot(rootNode).render(<App />)` 开启 Concurrent Mode 时，每次遍历前，都会通过 Scheduler 提供的 `shouldYield` 方法判断是否需要中断遍历，使浏览器有时间渲染。

```js
function workLoopConcurrent() {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}
```

在 Scheduler 中，时间切片周期默认为 5ms （`export const frameYieldMs = 5;`），如果一个 task 运行超过该周期, 下一个 task 执行之前, 会把控制权归还浏览器。

## 优先级调度

Scheduler 是独立于 React 的，其优先级也是独立于 React 的优先级的。

```js
export const NoPriority = 0 // 无优先级任务
export const ImmediatePriority = 1 // 立即执行任务
export const UserBlockingPriority = 2 // 用户阻塞任务
export const NormalPriority = 3 // 正常任务
export const LowPriority = 4 // 低优先级任务
export const IdlePriority = 5 // 空闲执行任务
```

## Scheduler 任务调度

Scheduler 中有两个任务队列：`taskQueue` 和 `timerQueue`。

- `taskQueue` ：用于保存调度任务队列。依据任务的过期时间（expirationTime）排序，需要在调度的 `workLoop` 中循环执行完这些任务。
- `timerQueue` ：用于保存待调度任务队列（延时任务）。依据任务的开始时间（startTime）排序，在调度 `workLoop` 中，会用 `advanceTimers` 检查任务是否过期，如果过期了，放入 `taskQueue` 队列。

为了能在 `O(1)` 复杂度找到两个队列中时间最早的那个任务， Scheduler 使用 `小顶堆` 实现了优先级队列。

> 堆是一种非线性结构，可以把堆看作一个数组，也可以被看作一个完全二叉树，通俗来讲堆其实就是利用完全二叉树的结构来维护的一维数组。按照堆的特点可以把堆分为大顶堆和小顶堆:
>
> - 大顶堆：每个结点的值都大于或等于其左右孩子结点的值
> - 小顶堆：每个结点的值都小于或等于其左右孩子结点的值

![scheduler](../files/images/scheduler.drawio.png)

### 创建任务

Scheduler 对外暴露 `unstable_scheduleCallback` 方法，负责调度任务的创建和分配，以及调度的启动。

在 `unstable_scheduleCallback(priorityLevel, callback, options)` 方法中：

- 获取当前时间 `var currentTime = getCurrentTime()`
- 根据传入的优先级 `priorityLevel`, 设置超时时间 `timeout`。则，任务过期时间为 `expirationTime = startTime + timeout`
- 创建新任务 `newTask`

  ```js
  var taskIdCounter = 1

  // 创建新任务
  var newTask = {
    id: taskIdCounter++, // id 编号自增
    callback, // 传入的回调函数
    priorityLevel, // 优先级等级
    startTime, // 创建 task 时的当前时间
    expirationTime, // task 的过期时间（startTime + timeout）。优先级越高，时间越小
    sortIndex: -1, // 任务排序索引
  }
  ```

- 比较任务开始时间 `startTime` 和当前时间 `currentTime`。
  - `startTime > currentTime` ，任务延时。
    - 依据任务的开始时间 `startTime` 进行任务排序索引： `newTask.sortIndex = startTime`
    - 通过 `push(timerQueue, newTask)` 添加至待调度任务队列（延时任务） `timerQueue`
    - 判断调度任务队列 `taskQueue` 中是否已执行完所有的任务，并判断新任务 `newTask` 是否为待调度任务队列（延时任务） `timerQueue` 中的最早延时的任务。
      - 判断当前是否有延时任务正在调度。如有，则停止，避免多个 `requestHostTimeout` 一起运行，造成资源的不必要浪费。
      - 调用 `requestHostTimeout(handleTimeout, startTime - currentTime)` 使延时任务延迟 `startTime - currentTime` 毫秒，使其到达恰好过期的状态。延时指定时间后，调用 `handleTimeout` 函数，将任务通过 `requestHostCallback(flushWork)` 创建一个调度者开始调度任务。
  - `startTime <= currentTime` ，任务到期。
    - 依据任务的过期时间 `expirationTime` 进行任务排序索引： `newTask.sortIndex = expirationTime`。
    - 通过 `push(taskQueue, newTask)` 添加至调度任务队列 `taskQueue`
    - 判断是否已有 Scheduled 正在调度任务，并且是否正在执行工作 `!isHostCallbackScheduled && !isPerformingWork`。
      - 若无，则设置正在调度任务 `isHostCallbackScheduled = true`, 并调用 `requestHostCallback(flushWork)` 创建一个调度者开始调度任务。
      - 若有，则直接使用上一个调度者调度任务。

::: details unstable_scheduleCallback(priorityLevel, callback, options)

```js
// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
var maxSigned31BitInt = 1073741823

// Times out immediately
var IMMEDIATE_PRIORITY_TIMEOUT = -1 // 立即执行任务
// Eventually times out
var USER_BLOCKING_PRIORITY_TIMEOUT = 250 // 用户阻塞任务，超时时间
var NORMAL_PRIORITY_TIMEOUT = 5000 // 正常任务，超时时间
var LOW_PRIORITY_TIMEOUT = 10000 // 低优先级任务，超时时间
// Never times out
var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt // 空闲执行任务永不超时

// Tasks are stored on a min heap
// taskQueue 用于保存调度任务队列
// 依据任务的过期时间（expirationTime）排序，需要在调度的 workLoop 中循环执行完这些任务
var taskQueue = []
// timerQueue 用于保存待调度任务队列（延时任务）
// 依据任务的开始时间（startTime）排序，在调度 workLoop 中 会用advanceTimers检查任务是否过期，如果过期了，放入 taskQueue 队列。
var timerQueue = []

// Incrementing id counter. Used to maintain insertion order.
var taskIdCounter = 1

// This is set while performing work, to prevent re-entrance.
var isPerformingWork = false // 是否正在执行工作

var isHostCallbackScheduled = false // 是否有调度任务正在执行
var isHostTimeoutScheduled = false // 是否有延时任务正在调度

let isMessageLoopRunning = false // 是否已开始消息轮询
let scheduledHostCallback = null // 用于存储将要被调度的函数
let taskTimeoutID = -1

function requestHostCallback(callback) {
  scheduledHostCallback = callback
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true
    schedulePerformWorkUntilDeadline()
  }
}

function requestHostTimeout(callback, ms) {
  taskTimeoutID = localSetTimeout(() => {
    callback(getCurrentTime())
  }, ms)
}

function advanceTimers(currentTime) {
  // Check for tasks that are no longer delayed and add them to the queue.
  // 检查调度任务队列（延时任务）中，是否有到期的任务
  // 如有，则将待调度任务队列（延时任务） timerQueue 的任务添加到调度任务队列 taskQueue

  let timer = peek(timerQueue)
  while (timer !== null) {
    if (timer.callback === null) {
      // Timer was cancelled.
      pop(timerQueue)
    } else if (timer.startTime <= currentTime) {
      // Timer fired. Transfer to the task queue.
      pop(timerQueue)
      timer.sortIndex = timer.expirationTime
      push(taskQueue, timer)
      if (enableProfiling) {
        markTaskStart(timer, currentTime)
        timer.isQueued = true
      }
    } else {
      // Remaining timers are pending.
      return
    }
    timer = peek(timerQueue)
  }
}

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false

  // 将待调度任务队列（延时任务） timerQueue 中到期的任务，放入调度任务队列 taskQueue
  advanceTimers(currentTime)

  if (!isHostCallbackScheduled) {
    // 无延时任务调度

    // 从调度任务队列 taskQueue 中，获取任务
    // 判断 taskQueue 是否有任务
    if (peek(taskQueue) !== null) {
      // 调度任务队列 taskQueue 中，【有任务】

      // 将 isHostCallbackScheduled 设置为 true,表示有调度任务正在执行
      isHostCallbackScheduled = true
      // 通过 requestHostCallback 开始执行 flushWork
      requestHostCallback(flushWork)
    } else {
      // 调度任务队列 taskQueue 中，【无任务】

      // 从待调度任务队列（延时任务） timerQueue 中，获取任务
      const firstTimer = peek(timerQueue)
      if (firstTimer !== null) {
        // requestHostTimeout 通过 setTimeout 延时指定时间。
        // 可以使一个延时任务能够到达恰好过期的状态，将其延迟 startTime - currentTime 毫秒
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime)
      }
    }
  }
}

function unstable_scheduleCallback(priorityLevel, callback, options) {
  // 获取当前时间
  var currentTime = getCurrentTime()

  var startTime
  if (typeof options === 'object' && options !== null) {
    // 延时任务
    var delay = options.delay
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay
    } else {
      startTime = currentTime
    }
  } else {
    startTime = currentTime
  }

  // 根据传入的优先级, 设置任务超时时间，
  var timeout
  switch (priorityLevel) {
    case ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT
      break
    case UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT
      break
    case IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT
      break
    case LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT
      break
    case NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT
      break
  }

  // 计算任务过期时间 expirationTime
  var expirationTime = startTime + timeout

  // 创建新任务
  var newTask = {
    id: taskIdCounter++, // id 编号自增
    callback, // 传入的回调函数
    priorityLevel, // 优先级等级
    startTime, // 创建 task 时的当前时间
    expirationTime, // task 的过期时间（startTime + timeout）。优先级越高，时间越小
    sortIndex: -1, // 任务排序索引
  }
  if (enableProfiling) {
    newTask.isQueued = false
  }

  if (startTime > currentTime) {
    // This is a delayed task.
    // 延时任务

    // 延时任务排序索引, 全等于创建任务的当前时间
    newTask.sortIndex = startTime
    push(timerQueue, newTask)
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // All tasks are delayed, and this is the task with the earliest delay.
      // 当调度任务队列中执行完所有的任务
      // 则需要不断遍历延时队列中的任务，一旦有任务过期则需要立即添加到过期任务队列中进行执行

      if (isHostTimeoutScheduled) {
        // 判断当前是否是否有延时任务正在调度
        // 如有，则停止，避免多个 requestHostTimeout 一起运行，造成资源的不必要浪费

        // Cancel an existing timeout.
        cancelHostTimeout()
      } else {
        isHostTimeoutScheduled = true
      }

      // Schedule a timeout.
      // 创建一个 timeout 作为调度者

      // requestHostTimeout 通过 setTimeout 延时指定时间。
      // 可以使一个延时任务能够到达恰好过期的状态，将其延迟 startTime - currentTime 毫秒
      requestHostTimeout(handleTimeout, startTime - currentTime)
    }
  } else {
    // 调度任务

    // 新的调度任务排序索引, 全等于任务过期时间
    newTask.sortIndex = expirationTime
    // 加入任务队列
    push(taskQueue, newTask)
    if (enableProfiling) {
      markTaskStart(newTask, currentTime)
      newTask.isQueued = true
    }
    // Schedule a host callback, if needed. If we're already performing work,
    // wait until the next time we yield.
    // 判断是否已有 Scheduled 正在调度任务
    // 没有的话，则创建一个调度者开始调度任务；有的话，则直接使用上一个调度者调度任务
    if (!isHostCallbackScheduled && !isPerformingWork) {
      // 设置正在调度任务
      isHostCallbackScheduled = true
      // 创建一个调度者开始调度任务
      requestHostCallback(flushWork)
    }
  }

  return newTask
}
```

:::

### 任务管理

创建任务之后，通过 `requestHostCallback(callback)` 函数请求调度。`flushWork` 函数作为参数被传入调度中心等待回调。

在 `requestHostCallback(callback)` 函数中：

- 通过 `scheduledHostCallback = callback` ，将 `flushWork` 赋值给全局变量 `scheduledHostCallback` 存储将要被调度的函数。
- 判断 `isMessageLoopRunning` 是否已开始消息轮询，防止同一时间调用多次 `schedulePerformWorkUntilDeadline` 函数。
- 在 `schedulePerformWorkUntilDeadline` 函数中，通过 `MessageChannel` 消息通道的 `port2` 端口发送消息 `port2.postMessage(null)`，并触发 `port1` 的监听消息函数 `channel.port1.onmessage = performWorkUntilDeadline` 。

  `MessageChannel` 在事件循环中是宏任务，是异步的，所以调度流程也是异步的。

- 通过 `performWorkUntilDeadline` 处理任务中的 `callback`，直到任务超过最大可执行时长。

::: details requestHostCallback(callback) 函数

```js
let scheduledHostCallback = null // 用于存储将要被调度的函数

let schedulePerformWorkUntilDeadline
if (typeof localSetImmediate === 'function') {
  // Node.js and old IE.
  // There's a few reasons for why we prefer setImmediate.
  //
  // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
  // (Even though this is a DOM fork of the Scheduler, you could get here
  // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
  // https://github.com/facebook/react/issues/20756
  //
  // But also, it runs earlier which is the semantic we want.
  // If other browsers ever implement it, it's better to use it.
  // Although both of these would be inferior to native scheduling.
  schedulePerformWorkUntilDeadline = () => {
    localSetImmediate(performWorkUntilDeadline)
  }
} else if (typeof MessageChannel !== 'undefined') {
  // DOM and Worker environments.
  // We prefer MessageChannel because of the 4ms setTimeout clamping.
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = performWorkUntilDeadline
  schedulePerformWorkUntilDeadline = () => {
    port.postMessage(null)
  }
} else {
  // We should only fallback here in non-browser environments.
  schedulePerformWorkUntilDeadline = () => {
    localSetTimeout(performWorkUntilDeadline, 0)
  }
}

function requestHostCallback(callback) {
  // scheduledHostCallback：全局变量，存储将要被调度的函数
  scheduledHostCallback = callback
  if (!isMessageLoopRunning) {
    // 判断是否已开始消息轮询

    // 设置已开始消息轮询状态，防止同一时间调用多次 schedulePerformWorkUntilDeadline
    isMessageLoopRunning = true
    schedulePerformWorkUntilDeadline()
  }
}
```

:::

在 `performWorkUntilDeadline` 函数中：

- 调用 `scheduledHostCallback(hasTimeRemaining, currentTime)` 函数（即：`flushWork(hasTimeRemaining, currentTime)`），返回 `workLoop(hasTimeRemaining, initialTime)` 函数值，赋值给 `hasMoreWork` （表示是否还有任务需要进行）
- `hasMoreWork` 为 `true` ，表示调度任务队列 `taskQueue` 还有任务，则执行 `schedulePerformWorkUntilDeadline`
- `hasMoreWork` 为 `false` ，表示调度任务队列 `taskQueue` 中的任务都执行完成，需要将调度者释放，设置 `isMessageLoopRunning = false` `scheduledHostCallback = null`，为下一次调度做准备。

::: details performWorkUntilDeadline 函数

```js
let isMessageLoopRunning = false // 是否已开始消息轮询，防止同一时间调用多次 schedulePerformWorkUntilDeadline
let scheduledHostCallback = null // 用于存储将要被调度的函数

let startTime = -1 // 记录批任务的开始时间，而不是单个任务的开始时间

const performWorkUntilDeadline = () => {
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime()
    // Keep track of the start time so we can measure how long the main thread
    // has been blocked.
    startTime = currentTime
    const hasTimeRemaining = true

    // If a scheduler task throws, exit the current browser task so the
    // error can be observed.
    //
    // Intentionally not using a try-catch, since that makes some debugging
    // techniques harder. Instead, if `scheduledHostCallback` errors, then
    // `hasMoreWork` will remain true, and we'll continue the work loop.
    let hasMoreWork = true
    try {
      hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime)
    } finally {
      if (hasMoreWork) {
        // If there's more work, schedule the next message event at the end
        // of the preceding one.
        schedulePerformWorkUntilDeadline()
      } else {
        isMessageLoopRunning = false
        scheduledHostCallback = null
      }
    }
  } else {
    isMessageLoopRunning = false
  }
  // Yielding to the browser will give it a chance to paint, so we can
  // reset this.
  needsPaint = false
}
```

:::

在 flushWork(hasTimeRemaining, initialTime) 函数中：

- 通过全局变量 `isHostTimeoutScheduled` 判断是否有延时任务正在调度，如果有，则通过 `cancelHostTimeout` 取消延时任务调度
- 通过全局变量 `isPerformingWork = true` 标识正在执行工作
- 通过 `const previousPriorityLevel = currentPriorityLevel` 保存当前优先级
- 调用 `workLoop(hasTimeRemaining, initialTime)` 进行任务中断与恢复
- 执行完成后，标记当前无任务执行 `currentTask = null`，恢复优先级 `currentPriorityLevel = previousPriorityLevel`，标记执行结束 `isPerformingWork = false`

::: details flushWork(hasTimeRemaining, initialTime) 函数

```js
// hasTimeRemaining: 代表当前帧是否还有时间
// initialTime: 即 currentTime
function flushWork(hasTimeRemaining, initialTime) {
  if (enableProfiling) {
    markSchedulerUnsuspended(initialTime)
  }

  // We'll need a host callback the next time work is scheduled.
  isHostCallbackScheduled = false // 全局变量，是否有调度任务正在执行
  if (isHostTimeoutScheduled) {
    // We scheduled a timeout but it's no longer needed. Cancel it.
    // 判断是否有延时任务正在调度
    // 如果有延时任务执行，则先暂停延时任务

    isHostTimeoutScheduled = false // 全局变量，是否有延时任务正在调度
    cancelHostTimeout()
  }

  isPerformingWork = true // 全局变量，标记正在执行工作
  const previousPriorityLevel = currentPriorityLevel // 保存当前执行任务的优先级
  try {
    if (enableProfiling) {
      try {
        return workLoop(hasTimeRemaining, initialTime)
      } catch (error) {
        if (currentTask !== null) {
          const currentTime = getCurrentTime()
          markTaskErrored(currentTask, currentTime)
          currentTask.isQueued = false
        }
        throw error
      }
    } else {
      // No catch in prod code path.
      // 调用 workLoop ，执行调度任务
      return workLoop(hasTimeRemaining, initialTime)
    }
  } finally {
    currentTask = null // 设置当前任务为空
    currentPriorityLevel = previousPriorityLevel // 恢复优先级
    isPerformingWork = false // 全局变量，标记执行工作结束
    if (enableProfiling) {
      const currentTime = getCurrentTime()
      markSchedulerSuspended(currentTime)
    }
  }
}
```

:::

在 `workLoop(hasTimeRemaining, initialTime)` 函数中：

- 通过 `advanceTimers(currentTime)` 将待调度任务队列（延时任务） `timerQueue` 中到期的任务，放入调度任务队列 `taskQueue`
- 获取调度任务队列 `taskQueue` 中，优先级最高的任务作为第一个处理的任务
- 开始 `while` 循环，进行调度任务队列处理
  - 进入循环，在执行任务前，判断当前任务 `currentTask` 是否到期，并判断是否还有剩余时间或是否应该中断任务
    - 当前任务未过期（延时任务），并且无剩余时间或者需要中断任务，则跳出循环， `currentTask` 不为 `null`，返回为 `true` 标明需要恢复任务。
    - 当前任务到期，并且还有剩余时间或者不需要中断任务，则正常执行任务。
  - 获取当前任务回调函数 `const callback = currentTask.callback`，并判断回调函数是否为函数 `typeof callback === 'function'`。
    - 任务回调函数不是函数，表示任务已经执行完成，从队列中移除当前任务。
    - 任务回调函数为函数，表示为有效任务。
  - 执行当前任务 `const continuationCallback = callback(didUserCallbackTimeout)`，并判断返回值 `continuationCallback` 是否为函数 `typeof continuationCallback === 'function'`
    - 任务执行完成后，返回为非函数，表示当前任务已执行完成。则判断当前任务 `currentTask` 是否与任务队列中最高优先级任务是否一致，一致则删除当前任务。
    - 任务执行完成后，返回为函数，表示当前任务未执行完成，则将这个函数作为当前任务新的回调函数，在下一次 `while` 循环时调用。
  - 每个任务执行后（不一定执行完成），都通过 `advanceTimers` 将待调度任务队列（延时任务） `timerQueue` 中到期的任务，放入调度任务队列 `taskQueue`，因为在执行过程中有可能部分任务也过期了。
  - 获取调度任务队列 `taskQueue` 中，优先级最高的任务作为第一个处理的任务，执行 `while` 循环
- 结束 `while` 循环
- 判断 `currentTask` 是否不为 `null` 。
  - `currentTask` 不为 `null`，当前任务被中断，则返回 `true` 需要恢复任务
  - `currentTask` 为 `null`，当前调度任务队列 `taskQueue` 执行完毕
    - 获取待调度任务队列 `timerQueue` 最高优先级任务 `const firstTimer = peek(timerQueue)`
    - 判断获取最高优先级延时任务是否不为 `null`，则执行 `requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime)` 将延时任务延迟 `(startTime - currentTime)` 毫秒，使其到达恰好过期的状态。延时指定时间后，调用 `handleTimeout` 函数，将任务通过 `requestHostCallback(flushWork)` 创建一个调度者开始调度任务
    - 返回 `false` 不需要恢复任务

::: details workLoop(hasTimeRemaining, initialTime) 函数

```js
export const frameYieldMs = 5
export const continuousYieldMs = 50
export const maxYieldMs = 300

// isInputPending 作用是检测用户的输入事件
// 例如：鼠标点击，键盘输入等，如果有用户输入测返回 true，没有则返回 false。
const isInputPending =
  typeof navigator !== 'undefined' &&
  navigator.scheduling !== undefined &&
  navigator.scheduling.isInputPending !== undefined
    ? navigator.scheduling.isInputPending.bind(navigator.scheduling)
    : null

// Scheduler periodically yields in case there is other work on the main
// thread, like user events. By default, it yields multiple times per frame.
// It does not attempt to align with frame boundaries, since most tasks don't
// need to be frame aligned; for those that do, use requestAnimationFrame.
let frameInterval = frameYieldMs
const continuousInputInterval = continuousYieldMs
const maxInterval = maxYieldMs
let startTime = -1 // 记录批任务的开始时间，而不是单个任务的开始时间

let needsPaint = false

// 判断是否中断任务
// 检查当前任务的使用时间是否小于帧间隔时间。小于，则返回 false 表示无需中断
function shouldYieldToHost() {
  // startTime 是在调用 performWorkUntilDeadline 时赋的值，即任务开始调度的时候的开始时间
  const timeElapsed = getCurrentTime() - startTime
  if (timeElapsed < frameInterval) {
    // The main thread has only been blocked for a really short amount of time;
    // smaller than a single frame. Don't yield yet.
    return false
  }

  // The main thread has been blocked for a non-negligible amount of time. We
  // may want to yield control of the main thread, so the browser can perform
  // high priority tasks. The main ones are painting and user input. If there's
  // a pending paint or a pending input, then we should yield. But if there's
  // neither, then we can yield less often while remaining responsive. We'll
  // eventually yield regardless, since there could be a pending paint that
  // wasn't accompanied by a call to `requestPaint`, or other main thread tasks
  // like network events.
  if (enableIsInputPending) {
    if (needsPaint) {
      // There's a pending paint (signaled by `requestPaint`). Yield now.
      return true
    }
    if (timeElapsed < continuousInputInterval) {
      // We haven't blocked the thread for that long. Only yield if there's a
      // pending discrete input (e.g. click). It's OK if there's pending
      // continuous input (e.g. mouseover).
      if (isInputPending !== null) {
        return isInputPending()
      }
    } else if (timeElapsed < maxInterval) {
      // Yield if there's either a pending discrete or continuous input.
      if (isInputPending !== null) {
        return isInputPending(continuousOptions)
      }
    } else {
      // We've blocked the thread for a long time. Even if there's no pending
      // input, there may be some other scheduled work that we don't know about,
      // like a network event. Yield now.
      return true
    }
  }

  // `isInputPending` isn't available. Yield now.
  return true
}

function workLoop(hasTimeRemaining, initialTime) {
  let currentTime = initialTime

  // 将待调度任务队列（延时任务） timerQueue 中到期的任务，放入调度任务队列 taskQueue
  advanceTimers(currentTime)

  // 从调度任务队列 taskQueue 中获取任务
  currentTask = peek(taskQueue)
  while (
    currentTask !== null &&
    !(enableSchedulerDebugging && isSchedulerPaused)
  ) {
    if (
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      // This currentTask hasn't expired, and we've reached the deadline.

      // 判断当前任务过期时间是否大于当前时间：大于，表示没有过期，则不需要立即执行
      // hasTimeRemaining: 表示是否还有剩余时间，剩余时间不足，则需要中断当前任务，让其他任务先执行
      // shouldYieldToHost: 是否应该中断当前任务

      // 任务还没有过期（任务延时），但是已经到运行截止时间，则跳出循环，任务会在下个周期执行
      break
    }

    const callback = currentTask.callback
    if (typeof callback === 'function') {
      // 只有当前任务 currentTask 的回调函数 callback 为函数时，才会被识别为有效任务

      currentTask.callback = null // 设置回掉函数为 null，表示任务执行完成，会从任务队列中删除
      currentPriorityLevel = currentTask.priorityLevel // 设置执行任务的优先级

      // 判断当前任务是否过期（是否还有剩余时间）
      const didUserCallbackTimeout = currentTask.expirationTime <= currentTime

      if (enableProfiling) {
        markTaskRun(currentTask, currentTime)
      }

      // 执行当前任务 callback 回调
      const continuationCallback = callback(didUserCallbackTimeout)
      currentTime = getCurrentTime()

      if (typeof continuationCallback === 'function') {
        // 任务执行完成后返回的函数，表示当前任务没有完成
        // 则，将这个函数作为当前任务新的回调函数，在下一次 While 循环时调用

        // newCallbackNode = scheduleCallback(
        //   schedulerPriorityLevel,
        //   performConcurrentWorkOnRoot.bind(null, root)
        // )
        // 在 React Concurrent 模式下，
        // callback 是 performConcurrentWorkOnRoot 函数，函数内部 originalCallbackNode 为当前正在执行的任务
        // 会与 root.callbackNode 上挂载的任务比较，如果不相同，则表示任务执行完毕，如果相同，则表示任务没有执行完成
        // 返回自身，作为当前任务新的回调函数。接下来，则会让出执行权给优先级更高的任务先执行

        currentTask.callback = continuationCallback
        if (enableProfiling) {
          markTaskYield(currentTask, currentTime)
        }
      } else {
        if (enableProfiling) {
          markTaskCompleted(currentTask, currentTime)
          currentTask.isQueued = false
        }
        if (currentTask === peek(taskQueue)) {
          pop(taskQueue) // 删除当前任务
        }
      }

      // 将待调度任务队列（延时任务） timerQueue 中到期的任务，放入调度任务队列 taskQueue
      advanceTimers(currentTime)
    } else {
      pop(taskQueue) // 删除当前任务
    }

    // 从taskQueue中继续获取任务，如果上一次任务没有完成，那么不会从taskQueue中删除，获取的还是上一次任务
    // 接下来会继续执行它
    currentTask = peek(taskQueue)
  }

  // Return whether there's additional work
  // 当前任务被中断，currentTask 不为 null，则会返回 true，
  // scheduler 会继续发起调度，执行任务
  if (currentTask !== null) {
    return true
  } else {
    const firstTimer = peek(timerQueue)
    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime)
    }
    return false
  }
}
```

:::

### 时间切片原理

消费任务队列的过程中, 可以消费 `1~n` 个 `task`, 甚至清空整个调度任务队列 `taskQueue` 。在每一次具体执行 `task.callback` 之前，都会进行超时检测。如果超时，会立即退出循环并等待下一次调用。

```js
function workLoop(hasTimeRemaining, initialTime) {
  while (
    currentTask !== null &&
    !(enableSchedulerDebugging && isSchedulerPaused)
  ) {
    if (
      currentTask.expirationTime > currentTime &&
      (!hasTimeRemaining || shouldYieldToHost())
    ) {
      break
    }

    const callback = currentTask.callback

    if (typeof callback === 'function') {
      // 执行当前任务 callback 回调
      const continuationCallback = callback(didUserCallbackTimeout)
    }

    // 省略部分代码
  }
  // 省略部分代码
}
```

### 可中断渲染原理

在时间切片的基础之上，如果单个 `task.callback` 执行时间就很长(假设 200ms)，则需要 `task.callback` 自己能够检测是否超时。

在 `Fiber` 树构造过程中，每构造完成一个单元，都会检测一次超时。如遇超时，就退出 `Fiber` 树构造循环，并返回一个新的回调函数（即：执行当前任务 `callback` 回调的返回值 `continuationCallback`）并等待下一次回调继续未完成的 `Fiber` 树构造。

## React 节流防抖

`ensureRootIsScheduled` 函数会与 `scheduler` 包通信, 最后注册一个 `task` 并等待回调。

- 在 `task` 注册完成之后, 会设置 `fiberRoot` 对象上的属性，代表现在已经处于调度进行中。
- 再次进入 `ensureRootIsScheduled` 时（比如：连续 2 次 `setState`, 第 2 次 `setState` 同样会触发 `reconciler` 运作流程中的调度阶段）。如果发现处于调度中, 则需要一些节流和防抖措施, 进而保证调度性能。
  - 节流（判断条件: `existingCallbackPriority === newCallbackPriority`, 新旧更新的优先级相同, 如连续多次执行 `setState`）, 则无需注册新 `task` （继续沿用上一个优先级相同的 `task`）, 直接退出调用。
  - 防抖（判断条件: `existingCallbackPriority !== newCallbackPriority`, 新旧更新的优先级不同）, 则取消旧 `task`, 重新注册新 `task`。

::: details ensureRootIsScheduled

```js
// ensureRootIsScheduled 用于 rootFiber 的任务调度。一个 root 只有一个任务在执行，每次更新和任务退出前都会调用此函数。
// 1. 计算新任务的过期时间、优先级
// 2. 无新任务，退出调度
// 3. 有历史任务：
//    3.1 新旧任务的优先级相同，继续执行旧任务，（新任务会在旧任务执行完成之后的同步刷新钩子中执行）
//    3.2 新旧任务的优先级不相同，取消旧任务
// 4. 根据不同的 Priority （优先级） 执行不同的调度(scheduleSyncCallback(同步) 或 scheduleCallback（异步）), 最后将返回值设置到 fiberRoot.callbackNode
function ensureRootIsScheduled(root: FiberRoot, currentTime: number) {
  const existingCallbackNode = root.callbackNode

  // Check if any lanes are being starved by other work. If so, mark them as
  // expired so we know to work on those next.
  markStarvedLanesAsExpired(root, currentTime)

  // Determine the next lanes to work on, and their priority.
  const nextLanes = getNextLanes(
    root,
    root === workInProgressRoot ? workInProgressRootRenderLanes : NoLanes
  )

  // 节流防抖
  if (nextLanes === NoLanes) {
    // Special case: There's nothing to work on.
    if (existingCallbackNode !== null) {
      cancelCallback(existingCallbackNode)
    }
    root.callbackNode = null
    root.callbackPriority = NoLane
    return
  }

  // We use the highest priority lane to represent the priority of the callback.
  const newCallbackPriority = getHighestPriorityLane(nextLanes)

  // Check if there's an existing task. We may be able to reuse it.
  const existingCallbackPriority = root.callbackPriority
  if (
    existingCallbackPriority === newCallbackPriority &&
    // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(
      __DEV__ &&
      ReactCurrentActQueue.current !== null &&
      existingCallbackNode !== fakeActCallbackNode
    )
  ) {
    // The priority hasn't changed. We can reuse the existing task. Exit.
    return
  }

  if (existingCallbackNode != null) {
    // Cancel the existing callback. We'll schedule a new one below.
    cancelCallback(existingCallbackNode)
  }

  // Schedule a new callback.
  let newCallbackNode
  if (newCallbackPriority === SyncLane) {
    // Special case: Sync React callbacks are scheduled on a special
    // internal queue
    if (root.tag === LegacyRoot) {
      scheduleLegacySyncCallback(performSyncWorkOnRoot.bind(null, root))
    } else {
      scheduleSyncCallback(performSyncWorkOnRoot.bind(null, root))
    }
    if (supportsMicrotasks) {
      scheduleMicrotask(() => {
        // In Safari, appending an iframe forces microtasks to run.
        // https://github.com/facebook/react/issues/22459
        // We don't support running callbacks in the middle of render
        // or commit so we need to check against that.
        if (
          (executionContext & (RenderContext | CommitContext)) ===
          NoContext
        ) {
          // Note that this would still prematurely flush the callbacks
          // if this happens outside render or commit phase (e.g. in an event).
          flushSyncCallbacks()
        }
      })
    } else {
      // Flush the queue in an Immediate task.
      scheduleCallback(ImmediateSchedulerPriority, flushSyncCallbacks)
    }
    newCallbackNode = null
  } else {
    let schedulerPriorityLevel
    // lanesToEventPriority ： 将 lane 优先级转换为 event 优先级
    // 以区间的形式，根据传入的 lane 返回对应的 event 优先级。比如，传入的优先级不大于 Discrete 优先级，就返回 Discrete 优先级，以此类推
    switch (lanesToEventPriority(nextLanes)) {
      case DiscreteEventPriority:
        // DiscreteEventPriority 离散事件优先级。click、keydown、focusin等，事件的触发不是连续，可以做到快速响应
        schedulerPriorityLevel = ImmediateSchedulerPriority
        break
      case ContinuousEventPriority:
        // ContinuousEventPriority 连续事件优先级。drag、scroll、mouseover等，事件的是连续触发的，快速响应可能会阻塞渲染，优先级较离散事件低
        schedulerPriorityLevel = UserBlockingSchedulerPriority
        break
      case DefaultEventPriority:
        // DefaultEventPriority 默认的事件优先级
        schedulerPriorityLevel = NormalSchedulerPriority
        break
      case IdleEventPriority:
        // IdleEventPriority 空闲的优先级
        schedulerPriorityLevel = IdleSchedulerPriority
        break
      default:
        schedulerPriorityLevel = NormalSchedulerPriority
        break
    }
    newCallbackNode = scheduleCallback(
      schedulerPriorityLevel,
      performConcurrentWorkOnRoot.bind(null, root)
    )
  }
  root.callbackPriority = newCallbackPriority
  root.callbackNode = newCallbackNode
}
```

:::

## React Lane 模型

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
