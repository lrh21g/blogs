# State （Legacy 模式）

- `legacy` 模式
- `blocking` 模式
- `concurrent` 模式

## 类组件中的 state

### setState

`setState()` 将对组件 `state` 的更改排入队列，并通知 React 需要使用更新后的 `state` 重新渲染此组件及其子组件。`setState()` 并不总是立即更新组件，它会批量推迟更新。

`setState(updater[, callback])`

- `updater`
  - 当 `updater` 是一个函数时，会接受 `state` 和 `props` 作为参数，其返回值会与 `state` 进行浅合并。
  - 当 `updater` 是一个对象时，会将传入的对象浅层合并到新的 `state` 中。
- `callback` : 回调函数。在 `setState` 完成合并并重新渲染组件后执行。可以获取当前 `setState` 更新后的最新 `state` 的值，可以作为依赖 `state` 变化的副作用函数，可以用来做一些基于 DOM 的操作。

```js
// setState 第一个参数为【函数】
this.setState(
  (state, props) => {
    return { updateStateKey: updateStateValue }
  },
  () => {
    console.log('更新 state 之后回调，调用 this.state.xxx 可获取最新值')
  }
)

// setState 第一个参数为【对象】
this.setState(
  {
    updateStateKey: updateStateValue,
  },
  () => {
    console.log('更新 state key 之后回调，调用 this.state.xxx 可获取最新值')
  }
)
```

### flushSync

在罕见的情况下，如果需要强制 DOM 更新同步应用，可以使用 `flushSync()`。

`flushSync(callback)` : 强制 React 同步刷新提供的回调函数中的任何更新。这确保了 DOM 会被立即更新。

`flushSync()` 会对性能产生很大影响，尽量少用。

```js
export default class SetStateUpdate extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    number: 0,
  }

  handleFlushSyncClick = () => {
    setTimeout(() => {
      this.setState({ number: 1 })
    })
    this.setState({ number: 2 })
    ReactDOM.flushSync(() => {
      this.setState({ number: 3 })
    })
    this.setState({ number: 4 })
  }

  render() {
    console.log('render : ', this.state.number)
    return (
      <div>
        <div>{this.state.number}</div>
        <button onClick={this.handleFlushSyncClick}>flushSync number++</button>
      </div>
    )
  }
}

// 触发 handleFlushSyncClick 点击事件打印结果如下：
// render : 3
// render : 4
// render : 1
```

以上 Demo 打印结果解析，在 `handleFlushSyncClick` 中：

- 首先，`ReactDOM.flushSync(() => { this.setState({ number: 3 }) })` 设定了一个高优先级的更新。更新 `number` 为 `2` 和 `3`，会被批量更新到 `3`，则，`render : 3` 会被优先打印

  `flushSync` 在同步条件下，会合并之前的 `setState` 或者 `useState`。可以理解成，如果发现了 `flushSync` ，就会先执行更新，如果之前有未更新的 `setState` 或者 `useState` ，就会一起合并了

- 接着，更新 `number` 为 `4`，则，`render : 4` 会被优先打印
- 最后，更新 `setTimeout` 中的 `number`，则，`render : 1` 会被优先打印

React 同一级别更新优先级关系是：

`flushSync` 中的 `setState` > 正常执行上下文中 `setState` > `setTimeout` ，`Promise` 中的 `setState`。

### 限制 state 更新视图

对于类组件，可通过如下方式限制 state 的更新

#### React.PureComponent

`React.PureComponent` 与 `React.Component` 的区别在于 `React.PureComponent` 中以浅层对比 `prop` 和 `state` 的方式实现了 `shouldComponentUpdate()` 函数。

- `React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层比较。

  如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。在深层数据结构发生变化时，可以调用 `forceUpdate()` 来确保组件被正确地更新。也可以考虑使用 [immutable](https://immutable-js.com/) 对象加速嵌套数据的比较。

- `React.PureComponent` 中的 `shouldComponentUpdate()` 将跳过所有子组件树的 `prop` 更新。

#### shouldComponentUpdate

当 `props` 或 `state` 发生变化时，`shouldComponentUpdate(nextProps, nextState)` 会在渲染执行之前被调用。根据 `shouldComponentUpdate()` 的返回值，判断 React 组件的输出是否受当前 `state` 或 `props` 更改的影响。

- 返回为 `true` : 组件会被重新渲染，默认行为。
- 返回为 `false` : 组件不会被重新渲染，不会调用 `UNSAFE_componentWillUpdate()`，`render()` 和 `componentDidUpdate()`。返回 `false` 并不会阻止子组件在 `state` 更改时重新渲染。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。应该考虑使用内置的 `PureComponent` 组件，而不是手动编写 `shouldComponentUpdate()`。`React.PureComponent` 会对 `props` 和 `state` 进行浅层比较，并减少了跳过必要更新的可能性。

后续版本，React 可能会将 `shouldComponentUpdate()` 视为提示而不是严格的指令，并且，当返回 `false` 时，仍可能导致组件重新渲染。

### setState 更新

::: details 类组件 setState 示例

```js
import React from 'react'

export default class SetStateUpdate extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    number: 0,
  }

  handleAddEventListenerClick = () => {
    this.setState({ number: this.state.number + 1 }, () => {
      console.log(
        '【handleAddEventListenerClick】 setState callback : ',
        this.state.number
      )
    })
    console.log(
      '【handleAddEventListenerClick】 setState : ',
      this.state.number
    )
  }

  componentDidMount() {
    document
      .getElementById('addEventListenerClickBtn')
      .addEventListener('click', this.handleAddEventListenerClick, false)

    this.setState({ number: this.state.number + 1 }, () => {
      console.log(
        '【componentDidMount】 setState callback : ',
        this.state.number
      )
    })
    console.log('【componentDidMount】 setState : ', this.state.number)
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 }, () => {
      console.log('【handleClick】 setState callback1 : ', this.state.number)
    })
    console.log('【handleClick】 setState : ', this.state.number)

    this.setState({ number: this.state.number + 1 }, () => {
      console.log('【handleClick】 setState callback2 : ', this.state.number)
    })
    console.log('【handleClick】 setState : ', this.state.number)
  }

  handleSetTimeoutClick = () => {
    setTimeout(() => {
      this.setState({ number: this.state.number + 1 }, () => {
        console.log(
          '【handleClick setTimeout】 setState callback1 : ',
          this.state.number
        )
      })
      console.log('【handleClick setTimeout】 setState : ', this.state.number)

      this.setState({ number: this.state.number + 1 }, () => {
        console.log(
          '【handleClick setTimeout】 setState callback2 : ',
          this.state.number
        )
      })
      console.log('【handleClick setTimeout】 setState : ', this.state.number)
    })
  }

  render() {
    return (
      <div>
        <div>{this.state.number}</div>
        <button id="addEventListenerClickBtn">addEventListener click</button>
        <button onClick={this.handleClick}> number++ </button>
        <button onClick={this.handleSetTimeoutClick}>
          setTimeout number++
        </button>
      </div>
    )
  }
}

// 【React 16.8.0】输出结果，number 初始值为 0
// ========== 【componentDidMount】 ==========
// 【componentDidMount】 setState : 0
// 【componentDidMount】 setState callback : 1
// ========== 【handleAddEventListenerClick】 ==========
// 【handleAddEventListenerClick】 setState callback : 2
// 【handleAddEventListenerClick】 setState : 2
// ========== 【handleClick】 ==========
// 【handleClick】 setState : 2
// 【handleClick】 setState : 2
// 【handleClick】 setState : 2
// 【handleClick】 setState callback1 : 3
// 【handleClick】 setState callback2 : 3
// 【handleClick】 setState callback3 : 3
// ========== 【handleClick setTimeout】 ==========
// 【handleClick setTimeout】 setState callback1 : 4
// 【handleClick setTimeout】 setState : 4
// 【handleClick setTimeout】 setState callback2 : 5
// 【handleClick setTimeout】 setState : 5
// 【handleClick setTimeout】 setState callback3 : 6
// 【handleClick setTimeout】 setState : 6

// 【React 17.0.0】输出结果，number 初始值为 0
// ========== 【componentDidMount】 ==========
// 【componentDidMount】 setState : 0
// 【componentDidMount】 setState callback : 1
// ========== 【handleAddEventListenerClick】 ==========
// 【handleAddEventListenerClick】 setState callback : 2
// 【handleAddEventListenerClick】 setState : 2
// ========== 【handleClick】 ==========
// 【handleClick】 setState : 2
// 【handleClick】 setState : 2
// 【handleClick】 setState : 2
// 【handleClick】 setState callback1 : 3
// 【handleClick】 setState callback2 : 3
// 【handleClick】 setState callback3 : 3
// ========== 【handleClick setTimeout】 ==========
// 【handleClick setTimeout】 setState callback1 : 4
// 【handleClick setTimeout】 setState : 4
// 【handleClick setTimeout】 setState callback2 : 5
// 【handleClick setTimeout】 setState : 5
// 【handleClick setTimeout】 setState callback3 : 6
// 【handleClick setTimeout】 setState : 6

// 【React 18.2.0】输出结果，number 初始值为 0
// ========== 【componentDidMount】 ==========
// 【componentDidMount】 setState : 0
// 【componentDidMount】 setState callback : 1
// ========== 【handleAddEventListenerClick】 ==========
// 【handleAddEventListenerClick】 setState : 1
// 【handleAddEventListenerClick】 setState callback : 2
// ========== 【handleClick】 ==========
// 【handleClick】 setState : 2
// 【handleClick】 setState : 2
// 【handleClick】 setState : 2
// 【handleClick】 setState callback1 : 3
// 【handleClick】 setState callback2 : 3
// 【handleClick】 setState callback3 : 3
// ========== 【handleClick setTimeout】 ==========
// 【handleClick setTimeout】 setState : 3
// 【handleClick setTimeout】 setState : 3
// 【handleClick setTimeout】 setState : 3
// 【handleClick setTimeout】 setState callback1 : 4
// 【handleClick setTimeout】 setState callback2 : 4
// 【handleClick setTimeout】 setState callback3 : 4
```

:::

#### React 16.x / 17.x

- `setState` 在合成事件和钩子函数中是 **"异步"** 的，在原生事件和 `setTimeout` 中是 **同步** 的。
- `setState` 的 **"异步"** 并不是内部由异步代码实现，其本身执行过程和代码是同步的。合成事件和钩子函数的调用顺序在更新之前，导致合成事件和钩子函数无法立刻获取到更新后的值。可以通过 `setState(updater[, callback])` 中的 `callback` 回调函数获取到更新后的结果。
- `setState` 的 **批量更新** 优化是建议在 **"异步"** （合成事件、钩子函数）之上的，在原生事件和 `setTimeout` 中不会批量更新。在 **"异步"** 中，如果对同一个值进行多次 `setState` ， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。

注：合成事件是 React 在原生的 DOM 事件上的一层封装，称为 `SyntheticEvent`（合成事件）。它是浏览器的原生事件的跨浏览器包装器。除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()` 和 `preventDefault()`。

#### React 18.x

- 使用 `ReactDOM.createRoot`，则 React 会在所有事件中进行**自动批量更新**（`Automatic Batching`） 。而如果
- 使用 `ReactDOM.render`，则会依旧维持之前版本的表现。

### 触发 setState 的更新流程

触发一次 `setState` ，更新流程如下：

- 触发 `setState`
- 计算优先级。`setState` 会产生当前更新的优先级（老版本使用 `expirationTime`，新版本使用 `lane`）
- 更新调度，调和 `fiber` 树。React 会从 fiber Root 根部 `fiber` 向下调和子节点，调和阶段将对比发生更新的地方，更新对比 `expirationTime`，找到发生更新的组件。
- 合并 `state`，执行 `render`。合并 `state`，然后触发 `render` 函数，得到新的 UI 视图层，完成 `render` 阶段。
- `commit` 阶段，替换真实 DOM，完成更新流程。
- `setState` 回调函数执行 `callback`。此时仍然在 `commit` 阶段，会执行 `setState` 中 `callback` 函数。

### setState 实现原理

在类组件中调用 `this.setState` ，本质上是调用了挂载在 `Component` 类组件构造函数原型链上的 `setState` 方法，进而 `updater` 对象上的 `enqueueSetState` 方法。

`enqueueSetState` 方法，创建一个 `update`，然后放入当前 `fiber` 对象的待更新队列中，最后开启调度更新。

::: details 【enqueueSetState】方法

```js
// packages\react-reconciler\src\ReactFiberClassComponent.old.js

const classComponentUpdater = {
  isMounted,
  enqueueSetState(inst, payload, callback) {
    const fiber = getInstance(inst)
    const eventTime = requestEventTime() // 获取更新触发的时间
    const lane = requestUpdateLane(fiber) // 获取任务优先级

    const update = createUpdate(eventTime, lane) // 创建更新任务
    update.payload = payload
    if (callback !== undefined && callback !== null) {
      update.callback = callback
    }

    const root = enqueueUpdate(fiber, update, lane) // 将任务推入更新队列
    if (root !== null) {
      scheduleUpdateOnFiber(root, fiber, lane, eventTime) // schedule 进行调度
      entangleTransitions(root, fiber, lane)
    }

    if (enableSchedulingProfiler) {
      markStateUpdateScheduled(fiber, lane)
    }
  },
  enqueueReplaceState(inst, payload, callback) {
    // ...
  },
  enqueueForceUpdate(inst, callback) {
    // ...
  },
}
```

:::

## 函数组件中的 state

### useState

`const [state, setState] = useState(initialState);`

`useState` 返回一个 `state`，以及更新 `state` 的函数。

- `initialState` : 初始值。只会在组件的初始渲染中起作用，后续渲染时会被忽略。

  - `initialState` 为非函数情况下，将作为 `state` 初始化的值

    ```js
    const [number, setNumber] = useState(0)
    ```

  - `initialState` 为函数的情况下，函数返回值作为 `state` 初始化的值

    ```js
    const [number, setNumber] = useState(() => {
      /*  在 props 中，当 a = 1, state 为 0-1 随机数；当 a = 2, state 为 1-10随机数；否则，state 为 1 - 100 随机数 */
      if (props.a === 1) return Math.random()
      if (props.a === 2) return Math.ceil(Math.random() * 10)
      return Math.ceil(Math.random() * 100)
    })
    ```

- `state` : 返回的状态。在初始渲染期间，返回的状态 (`state`) 与传入的第一个参数 (`initialState`) 值相同。
- `setState()` 函数 : 用于更新 `state`。它接收一个新的 `state` 值并将组件的一次重新渲染加入队列。

  - `setState(value)` 接受参数为非函数的情况下，设置的 `state` 将作为新值，赋值给 `state`，作为下一次渲染使用。

  - `setState((prevValue) => value)` 接受参数为函数的情况下，该函数将接收先前的 `state`，并返回一个更新后的值。

  ```js
  const [number, setNumber] = useState(0)
  handleClick = () => {
    setNumber(1)
    setNumber(number + 1)
    setNumber(prevValue => prevValue + 1)
  }
  ```

在 `useState()` 的 `setState()` 函数处理逻辑中，会浅比较两次 `state` ，如果 `state` 相同，则不会开启更新调度任务。

### 监听 state 变化

类组件 `setState` 中，可通过 `setState(updater[, callback])` 中 `callback` 回调函数或者生命周期 `componentDidUpdate` 检测监听到 `state` 的改变或者组件更新。

对于监听 `useState()` Hooks 的 `state` 变化，可以通过 `useEffect()` Hooks ，将 `state` 作为依赖项传入 `useEffect()` 的第二个参数 `deps`。`useEffect()` 在初始化时，会默认执行一次。

```js
import React, { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

const UseStateUpdate = function () {
  const [number, setNumber] = useState(0)

  /* 监听 number 变化 */
  useEffect(() => {
    console.log('【useEffect】 number : ' + number)
  }, [number])

  const handleClick = () => {
    /** 高优先级更新 **/
    flushSync(() => {
      setNumber(2)
      console.log('【handleClick】 flushSync', number)
    })
    /* 批量更新 */
    setNumber(1)
    console.log('【handleClick】 setNumber', number)
    /* 滞后更新 ，批量更新规则被打破 */
    setTimeout(() => {
      setNumber(3)
      console.log('【handleClick】 setTimeout setNumber', number)
    })
  }

  console.log('【render】 number', number)
  return (
    <div>
      <div> {number}</div>
      <button onClick={handleClick}> number++ </button>
    </div>
  )
}

export default UseStateUpdate

// 【render】 number : 0
// 【useEffect】 number : 0
// ========== 【触发 handleClick】 ==========
// 【handleClick】 flushSync : 0
// 【render】 number : 2
// 【useEffect】 number : 2
// 【handleClick】 setNumber : 0
// 【render】 number : 1
// 【useEffect】 number : 1
// 【handleClick】 setTimeout setNumber : 0
// 【render】 number : 3
// 【useEffect】 number : 3
```

在 Demo 中， 输出 `【handleClick】 flushSync : 0` 、 `【handleClick】 setNumber : 0` 、 `【handleClick】 setTimeout setNumber : 0` 是因为函数组件更新就是函数的执行，在函数一次执行过程中，函数内部所有变量重新声明，所以改变的 `state` ，只有在下一次函数组件执行时才会被更新。所以在同一个函数执行上下文中，`number` 一直为 `0`，都拿不到最新的 `state` 。

### useState 与 setState 的异同

- 相同点：从原理角度出发，`setState` 和 `useState` 更新视图，底层都调用了 `scheduleUpdateOnFiber` 方法，而且事件驱动情况下都有批量更新规则。

- 不同点：
  - 在非 `pureComponent` 组件模式下， `setState` 不会浅比较两次 `state` 的值，只要调用 `setState`，在没有其他优化手段的前提下，就会执行更新。但是 `useState` 中的 `setState` 会默认浅比较两次 `state` 是否相同，然后决定是否更新组件。
  - `setState` 有专门监听 `state` 变化的回调函数 `callback`，可以获取最新 `state`；但是在函数组件中，只能通过 `useEffect` 来执行 `state` 变化引起的副作用。
  - `setState` 在底层处理逻辑上主要是和老 `state` 进行合并处理，而 `useState` 更倾向于重新赋值。
