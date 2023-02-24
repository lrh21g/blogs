# 自定义 Hooks

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

## Hooks 特性

- 驱动条件：自定义 Hooks 驱动本质上就是函数组件的执行

  - `props` 改变带来的函数组件执行

  - `useState` 、 `useReducer` 改变 `state` 引起函数组件的更新

- 顺序原则：不能放在条件语句中，而且要保持执行顺序的一致性

- 条件限定：没有加条件限定，就有可能造成不必要的上下文的执行，或是组件的循环渲染执行

- 考虑可变性：考虑一些状态值发生变化，是否有依赖于当前值变化的执行逻辑或执行副作用

  - 对于依赖于可变性状态的执行逻辑，可以用 `useMemo` 来处理

  - 对于可变性状态的执行副作用，可以用 `useEffect` 来处理

  - 对于依赖可变性状态的函数或者属性，可以用 `useCallback` 来处理

- 闭包效应

  函数组件更新就是函数本身执行，一次更新所有含有状态的 Hooks （`useState` 和 `useReducer`）产生的状态 `state` 是重新声明的

  如果 `useEffect` ， `useMemo` `，useCallback` 等 Hooks 内部如果引用了 `state` 或 `props` 的值，这些状态最后保存在了函数组件对应的 `Fiber` 上，此次函数组件执行完毕后，这些状态就不会被垃圾回收机制回收释放

  造成的影响是 Hooks 如果没有把内部使用的 `state` 或 `props` 作为依赖项，内部就一直无法使用最新的 `props` 或者 `state`

  如何确认依赖关系：

  - 分析 Hooks 内部可能发生变化的状态，这个状态可以是 `state` 或者 `props`

  - 分析 `useMemo` 或者 `useCallback` 内部是否使用上述状态，或者是否关联使用 `useMemo` 或者 `useCallback` 派生出来的状态。如果有使用，则添加到 `deps` 依赖项中

  - 分析 `useEffect`、`useLayoutEffect`、`useImperativeHandle` 内部是否使用上述两个步骤产生的值，以及依赖这些值进行的一些副作用。如果有使用，则添加到 `deps` 依赖项中

## Hooks 设计

### 接受状态

- 通过函数参数接收组件传递的状态
- 通过 `useContext` 隐式获取上下文中的状态

注：如果使用了内部含有 `useContext` 的自定义 Hooks ，当 `context` 上下文改变，会让使用该自定义 Hooks 的组件自动渲染。

### 存储、管理状态

- 储存状态：应用 `useRef` 保存原始对象的特性进行状态储存

  ```js
  function useForm() {
    const formCurrent = React.useRef(null)
    if (!formCurrent.current) {
      formCurrent.current = new FormStore()
    }
    return formCurrent.current
  }
  ```

- 记录状态：使用 `useRef` 和 `useEffect` 可以配合记录函数组件的内部状态

  ```js
  function useRenderCount() {
    const isFirstRender = React.useRef(true) // 记录是否是第一次渲染
    const renderCount = React.useRef(1) // 记录渲染次数

    // 该 useEffect 依赖项为空，只执行一次
    useEffect(() => {
      isFirstRender.current = false // 第一次渲染完成，改变状态
    }, [])

    // 该 useEffect 没有依赖项，每一次函数组件执行，都会执行，统计渲染次数
    useEffect(() => {
      if (!isFirstRender.current) renderCount.current++ // 如果不是第一次渲染，则增加渲染次数
    })

    return [renderCount.current, isFirstRender.current]
  }
  ```

### 更新状态

- 改变状态：自定义 Hooks 内部可以保存状态，可以将更新状态的方法暴露出去，用来改变 Hooks 内部状态。

  ```js
  export function debounce(fn, time) {
    let timer = null
    return function (...arg) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arg)
      }, time)
    }
  }

  function useDebounceState(defauleValue, time) {
    const [value, changeValue] = useState(defauleValue)
    // 对 changeValue 做防抖处理
    const newChange = React.useMemo(() => debounce(changeValue, time), [time])
    return [value, newChange]
  }

  export default function Index() {
    const [value, setValue] = useDebounceState('', 300)
    return (
      <div>
        <input placeholder="" onChange={e => setValue(e.target.value)} />
      </div>
    )
  }
  ```

- 组合 `state`：自定义 Hooks 可以维护多个 `state` ，然后可以组合更新函数。

  ```js
  function useControlData(){
    const [ isLoading , setLoading ] = React.useState(false)
    const [ data,  setData ] = React.useState([])

    //获取到数据，清空 loading 效果
    const getData = (data)=> {
      setLoading(false)
      setData(data)
    }

    // ... 其他逻辑

    // 请求数据之前，添加 loading 效果
    const resetData = () => {
      setLoading(true)
      setData([])
    }
    return [ getData , resetData , ...  ]
  }
  ```

- 合理 `state`

  - 使用 `useRef` 保存状态，只要组件不销毁会一直存在，而且可以随时访问最新状态值。
  - 使用 `useState` 可以让组件更新，但 `state` 需要在下一次函数组件执行的时候才更新，如果需要 `useEffect` 或者 `useMemo` 访问最新的 `state` 值，需要将 `state` 添加到 `deps` 依赖项中。

  ```js
  function useSyncState(defaultValue) {
    const value = React.useRef(defaultValue) // useRef 用于保存状态
    const [, forceUpdate] = React.useState(null) // useState 用于更新组件

    // 模拟一个更新函数
    const dispatch = fn => {
      let newValue
      if (typeof fn === 'function') {
        newValue = fn(value.current) // 当参数为函数的情况
      } else {
        newValue = fn // 当参数为其他的情况
      }
      value.current = newValue
      forceUpdate({}) // 强制更新
    }

    return [value, dispatch] // 返回和 useState 一样的格式
  }
  ```

### 操纵 DOM / 组件实例

自定义 Hooks 可以设计成对原生 DOM 的操纵控制，使用 `useRef` 获取元素， 在 `useEffect` 中做元素的监听。

```js
function useGetDOM() {
  const dom = React.useRef()
  React.useEffect(() => {
    /* 进行 DOM 相关的操作 */
    console.log(dom.current)
  }, [])
  return dom
}
```

### 执行副作用

自定义 Hooks 可以执行一些副作用，比如：监听 `props` 或 `state` 变化而带来的副作用。

```js
function useEffectProps(value, cb) {
  // 使用 useRef 保存是否为第一次的状态
  const isMounted = React.useRef(false)

  React.useEffect(() => {
    /* 防止第一次执行 */
    isMounted.current && cb && cb()
  }, [value])

  React.useEffect(() => {
    /* 第一次挂载 */
    isMounted.current = true
  }, [])
}
```

## Hooks 实践

### useLog - 自动上报 PV/click 的埋点

```js
export const LogContext = React.createContext({})

export default function useLog() {
  // 使用 useContext 获取埋点的公共信息，当公共信息改变，会统一更新
  const message = React.useContext(LogContext)
  // 使用 useRef 获取 DOM 元素
  const listenDOM = React.useRef(null)

  // 使用 useCallback 缓存上报信息的 reportMessage 方法
  // 在该方法中，获取 useContext 内容，并将 context 作为依赖项，当依赖项改变，重新声明 reportMessage 函数。
  const reportMessage = React.useCallback(
    function (data, type) {
      if (type === 'pv') {
        // PV（页面浏览量或点击量） 上报
        console.log('组件 pv 上报', message)
      } else if (type === 'click') {
        // 点击上报
        console.log('组件 click 上报', message, data)
      }
    },
    [message]
  )

  // 使用 useEffect 监听 DOM 事件，并将 reportMessage 作为依赖项
  // 在 useEffect 中进行事件绑定，返回的销毁函数用于解除绑定
  React.useEffect(() => {
    const handleClick = function (e) {
      reportMessage(e.target, 'click')
    }

    if (listenDOM.current) {
      listenDOM.current.addEventListener('click', handleClick)
    }

    return function () {
      listenDOM.current &&
        listenDOM.current.removeEventListener('click', handleClick)
    }
  }, [reportMessage])

  return [listenDOM, reportMessage]
}
```

```js
import React, { useState } from 'react'
import useLog, { LogContext } from '../hooks/useLog.js'

function Home() {
  const [listenDOM, reportMessage] = useLog()

  const handleClick = () => {
    console.log(reportMessage)
  }

  return (
    <div>
      {/* 监听内部点击 */}
      <div ref={listenDOM}>
        <button> 按钮 one (内部点击) </button>
        <button> 按钮 two (内部点击) </button>
        <button> 按钮 three (内部点击) </button>
      </div>
      {/* 外部点击 */}
      <button onClick={handleClick}>外部点击</button>
    </div>
  )
}

// 阻断 useState 的更新效应
const HomeMemo = React.memo(Home)

export default function UseLogExample() {
  const [value, setValue] = useState({})

  const handleClick = () => {
    setValue({ name: 'xxx', age: 'xxx' })
  }

  return (
    <LogContext.Provider value={value}>
      <HomeMemo />
      <button onClick={handleClick}>点击</button>
    </LogContext.Provider>
  )
}
```

### useQueryTable - 带查询的分页加载长列表

```js
/**
 * @function useQueryTable(defaultQuery = {}, api)
 * @description 带查询的分页加载长列表
 * @param defaultQuery 表单查询默认参数
 * @param api 请求数据方法，内部用 Promise 封装处理
 */
function useQueryTable(defaultQuery = {}, api) {
  // 保存查询表格表单信息
  const formData = React.useRef({})
  // 保存查询表格分页信息
  const pagination = React.useRef({
    page: defaultQuery.page || 1,
    pageSize: defaultQuery.pageSize || 10,
  })
  // 强制更新 - 使受控表单组件进行视图更新
  const [, forceUpdate] = React.useState(null)
  // 保存并负责更新表格的状态
  const [tableData, setTableData] = React.useState({
    data: [],
    total: 0,
    current: 1,
  })

  /**
   * @function getList
   * @description 请求列表数据
   * 使用 api 函数发起请求，通过 setTableData 改变表格数据层状态，用 useCallback 做优化缓存处理
   * 以 api 作为依赖项，当 api 改变，重新声明 getList
   */
  const getList = React.useCallback(
    async function (payload = {}) {
      if (!api) return
      const data =
        (await api({
          ...defaultQuery,
          ...payload,
          ...pagination.current,
          ...formData.current,
        })) || {}
      if (data.code == 200) {
        setTableData({
          list: data.list,
          current: data.current,
          total: data.total,
        })
      } else {
      }
    },
    [api]
  )

  // 改变表单单元项
  /**
   * @function setFormItem
   * @description 改变表单单元项
   * 改变 formData 属性，并通过 useState 更新组件，改变表单控件视图，用 useCallback 做优化缓存处理
   */
  const setFormItem = React.useCallback(function (key, value) {
    const form = formData.current
    form[key] = value
    // forceUpdate 每一次都能更新，不会造成 state 相等的情况
    forceUpdate({})
  }, [])

  /**
   * @function reset
   * @description 重置表单
   * reset 会清空 formData 属性和重置分页的信息，然后重新调用 getList 请求数据，用 useCallback 做优化缓存处理
   * 以 getList 作为 reset 的依赖项
   */
  const reset = React.useCallback(
    function () {
      const current = formData.current
      for (let name in current) {
        current[name] = ''
      }
      pagination.current.page = defaultQuery.page || 1
      pagination.current.pageSize = defaultQuery.pageSize || 10
      getList() // 请求数据
    },
    [getList]
  )

  /**
   * @function handerChange
   * @description 处理分页逻辑
   * 函数内部改变分页信息，然后重新请求数据，用 useCallback 做优化缓存处理
   * 以 getList 作为 handerChange 的依赖项
   */
  const handerChange = React.useCallback(
    async function (page, pageSize) {
      pagination.current = {
        page,
        pageSize,
      }
      getList()
    },
    [getList]
  )

  // 初始化请求数据
  React.useEffect(() => {
    getList()
  }, [])

  // 组合暴露参数
  return [
    // 组合表格状态
    {
      tableData,
      handerChange,
      getList,
      pagination: pagination.current,
    },
    // 组合搜索表单状态
    {
      formData: formData.current,
      setFormItem,
      reset,
    },
  ]
}
```

### useRedux

```js
import React from 'react'
import { unstable_batchedUpdates } from 'react-dom'

export const ReduxContext = React.createContext(null)

export function shallowEqual(objA, objB) {
  if (Object.is(objA, objB)) {
    return true
  }
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false
  }
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysA[i]])
    ) {
      return false
    }
  }
  return true
}

class ReduxHooksStore {
  constructor(reducer, initState) {
    this.name = '__ReduxHooksStore__'
    this.id = 0
    // 全局的 reducer ，由 useCreateStore 传入
    this.reducer = reducer
    // 全局保存的状态 state ，每次执行 reducer 会得到新的 state
    this.state = initState
    // 保存每一个 useConnect 组件的更新函数，用于派发 state 改变带来的更新。
    this.mapConnects = {}
  }

  // 用于把 ReduxHooksStore 提供的核心方法传递给每一个 useConnect
  exportStore = () => {
    return {
      dispatch: this.dispatch.bind(this),
      subscribe: this.subscribe.bind(this),
      unSubscribe: this.unSubscribe.bind(this),
      getInitState: this.getInitState.bind(this),
    }
  }

  // 自定义 hooks 的 useConnect 使用，用于获取初始化的 state
  getInitState = mapStoreToState => {
    return mapStoreToState(this.state)
  }

  // 通知更新需要更新的组件
  // 当 state 改变通知每一个使用 useConnect 的组件
  // dispatch 的触发场景可能是异步状态下，所以用 React-DOM 中 unstable_batchedUpdates 开启批量更新原则
  publicRender = () => {
    unstable_batchedUpdates(() => {
      // 批量更新
      Object.keys(this.mapConnects).forEach(name => {
        const { update } = this.mapConnects[name]
        update(this.state)
      })
    })
  }

  // 更新 state
  // 每一个使用 useConnect 的组件可以通过 dispatch 方法改变 state ，内部原理是通过调用 reducer 产生一个新的 state
  dispatch = action => {
    this.state = this.reducer(this.state, action)
    this.publicRender()
  }

  // 绑定每一个自定义 hooks useConnect
  subscribe = connectCurrent => {
    const connectName = this.name + ++this.id
    this.mapConnects[connectName] = connectCurrent
    console.log(this.mapConnects, 'this.mapConnects')
    return connectName
  }

  // 解除绑定每一个 hooks
  unSubscribe = connectName => {
    delete this.mapConnects[connectName]
  }
}

// 用于生成 reduxHooks 的 store
export function useCreateStore(reducer, initState) {
  const store = React.useRef(null)
  // 如果存在，不需要重新实例化 Store
  if (!store.current) {
    store.current = new ReduxHooksStore(reducer, initState).exportStore()
  }
  return store.current
}

export function useConnect(mapStoreToState = () => {}) {
  // 获取 Store 内部的重要函数
  const contextValue = React.useContext(ReduxContext)
  const { getInitState, subscribe, unSubscribe, dispatch } = contextValue
  // 使用 useRef 来保存得到的最新的 state
  const stateValue = React.useRef(getInitState(mapStoreToState))
  // 使用 useState 产生一个更新函数 forceUpdate，用于更新组件
  const [, forceUpdate] = React.useState()

  // 向 ReduxHooksStore 注册的状态
  // 使用 useMemo 来对 connectValue 做缓存，connectValue 为一个对象，其中 cacheState 保留了上一次的 mapStoreToState 产生的 state ，以及负责更新的 update 函数。
  // 更新流程 ：
  // > 当触发 dispatch 在 ReduxHooksStore 中，会让每一个 connectValue 的 update 都执行， update 会触发映射函数 mapStoreToState 来得到当前组件想要的 state 内容。
  // > 然后通过 shallowEqual 浅比较新老 state 是否发生变化，如果发生变化，那么更新组件。
  const connectValue = React.useMemo(() => {
    const state = {
      cacheState: stateValue.current,
      // 更新函数
      update: function (newState) {
        const selectState = mapStoreToState(newState)
        // 浅比较 state 是否发生变化
        const isEqual = shallowEqual(state.cacheState, selectState)
        state.cacheState = selectState
        stateValue.current = selectState
        if (!isEqual) {
          // 更新
          forceUpdate({})
        }
      },
    }
    return state
  }, [contextValue]) // 将 contextValue 作为依赖项。

  React.useEffect(() => {
    // 组件挂载 - 注册 connect
    // 通过 useEffect 来向 ReduxHooksStore 中注册当前 useConnect 产生的 connectValue
    // subscribe 用于注册，会返回当前 connectValue 的唯一标识 name
    const name = subscribe(connectValue)
    return function () {
      // 组件卸载 —— 解绑 connect
      // 在 useEffect 的销毁函数中，可以用调用 unSubscribe 传入 name 来解绑当前的 connectValue
      unSubscribe(name)
    }
  }, [connectValue]) /* 将 connectValue 作为 useEffect 的依赖项 */

  return [stateValue.current, dispatch]
}
```

```js
import React, { useState } from 'react'
import { ReduxContext, useCreateStore, useConnect } from '../hooks/useRedux.js'

function ComponentA() {
  const [value, setValue] = useState('')
  const [state, dispatch] = useConnect(state => ({ messageB: state.messageB }))
  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <p>【组件A】</p>
      <p>组件B对我说 ： {state.messageB} </p>
      <input onChange={e => setValue(e.target.value)} placeholder="对B组件说" />
      <button onClick={() => dispatch({ type: 'setA', payload: value })}>
        确定
      </button>
    </div>
  )
}

function ComponentB() {
  const [value, setValue] = useState('')
  const [state, dispatch] = useConnect(state => ({ messageA: state.messageA }))
  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <p>【组件B】</p>
      <p>组件A对我说 ： {state.messageA} </p>
      <input onChange={e => setValue(e.target.value)} placeholder="对A组件说" />
      <button onClick={() => dispatch({ type: 'setB', payload: value })}>
        确定
      </button>
    </div>
  )
}

function ComponentC() {
  const [state] = useConnect(state => ({
    messageA: state.messageA,
    messageB: state.messageB,
  }))
  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <p>【组件C】</p>
      <p>组件A ： {state.messageA} </p>
      <p>组件B ： {state.messageB} </p>
    </div>
  )
}

function ComponentD() {
  const [, dispatch] = useConnect()
  console.log('D 组件更新')
  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <p>【组件D】</p>
      <button onClick={() => dispatch({ type: 'clear' })}> 清空 </button>
    </div>
  )
}

export default function UseReduxExample() {
  const store = useCreateStore(
    function (state, action) {
      const { type, payload } = action
      if (type === 'setA') {
        return {
          ...state,
          messageA: payload,
        }
      } else if (type === 'setB') {
        return {
          ...state,
          messageB: payload,
        }
      } else if (type === 'clear') {
        return { messageA: '', messageB: '' }
      } else {
        return state
      }
    },
    { messageA: '111', messageB: '111' }
  )

  const [isShow, setShow] = React.useState(true)

  return (
    <div>
      <ReduxContext.Provider value={store}>
        <ComponentA />
        <ComponentB />
        <ComponentC />
        {isShow && <ComponentD />}
        <button onClick={() => setShow(!isShow)}>点击</button>
      </ReduxContext.Provider>
    </div>
  )
}
```
