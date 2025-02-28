# Redux

Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。

Redux 可以作为发布订阅模式的一个具体实现。Redux 都会创建一个 `store` ，里面保存了状态信息，改变 `store` 的方法 `dispatch` ，以及订阅 `store` 变化的方法 `subscribe` 。

- [Redux](https://redux.js.org/)
- [Redux 中文官网](https://cn.redux.js.org/)

## Redux 三大原则

- 单一数据源：应用程序的全局状态作为对象存储在单个 `store` 中。

  一个单一数据源 `state` 简化了应用的调试和和监控，在开发中能将应用数据持久化到本地，从而加速开发周期。

- State 是只读的：更改状态的唯一方法是 `dispatch` 一个 `action`，通过 `action` 执行每个 `reducer` 。

  确保了视图行为和网络请求回调都不能直接修改 `state`，相反它们只能表达出想要修改 `state` 的意图。`action` 是一个用于描述已发生事件的普通对象。

- 使用 `Reducer` 纯函数来执行修改：为了描述 `action` 如何改变 `state tree`，需要编写纯的 `reducers`。

  `Reducer` 是纯函数，它接收旧的 `state` 和 `action`，并返回新的 `state`。记住，一定要返回一个新的对象，而不是修改之前的 `state`。

## Redux 单向数据流

- 初始启动
  - 使用最顶层的 `root reducer` 函数创建 `Redux store`
  - `store` 调用一次 `root reducer`，并将返回值保存为它的初始 `state`
  - 当 UI 首次渲染时，UI 组件访问 `Redux store` 的当前 `state`，并使用该数据来决定要呈现的内容。同时监听 `store` 的更新，以便可以知道 `state` 是否已更改。
- 更新环节
  - 应用程序中发生了某些事情，例如：用户单击按钮
  - `dispatch` 一个 `action` 到 `Redux store`，例如 `dispatch({type: 'counter/increment'})`
  - `store` 用之前的 `state` 和当前的 `action` 再次运行 `reducer` 函数，并将返回值保存为新的 `state`
  - `store` 通知所有订阅过的 UI，通知 `store` 发生更新
  - 每个订阅过 `store` 数据的 UI 组件都会检查它们需要的 `state` 部分是否被更新
  - 发现数据被更新的每个组件都强制使用新数据重新渲染，紧接着更新网页

![redux_data_flow_diagram](../files/images/redux_data_flow_diagram.gif)

## Redux Toolkit

Redux Toolkit 是 Redux 官方强烈推荐，开箱即用的一个高效的 Redux 开发工具集。它旨在成为标准的 Redux 逻辑开发模式。

- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Redux 工具包 中文文档](https://redux-toolkit-cn.netlify.app/)

::: details src/App.js

```js
// src/App.js

import { Provider } from 'react-redux'

import reduxToolKitStore from './store/reduxToolkit.js'
import ViewReduxToolkit from './views/ViewReduxToolkit.js'

export default function App() {
  return (
    <Provider store={reduxToolKitStore}>
      <ViewReduxToolkit />
    </Provider>
  )
}
```

:::

::: details src/store/reduxToolkit.js

```js
// src/store/reduxToolkit.js

/**
 * @function configureStore({reducer, middleware?, devTools?, preloadedState?, enhancers?})
 * @description
 * 创建一个 Redux store 实例，但是接受一个命名选项对象，并自动设置 Redux DevTools 扩展。
 * @param reducer
 * 如果是一个单独的函数，将会被直接作为 store 的根 reducer
 * 如果是一个 slice reducer 对象 （例如：{users : usersReducer, posts : postsReducer}），configureStore 将通过将该对象传递给 Redux combineReducers 自动创建根 reducer
 * @param middleware 可选数组，Redux 的中间件函数
 * 如果提供了中间件，将包含需要添加到 store 上的所有中间件函数，configureStore 会自动将这些传递给 applyMiddleware。
 * 如果没有提供，configureStore 将调 用getDefaultMiddleware 并使用它返回的中间件函数数组。
 * @param devTools 布尔值。用于指示 configureStore 是否应该自动启用对 Redux DevTools 浏览器扩展的支持。默认为 true。
 * @param preloadedState 传递给 Redux createStore 函数的可选初始状态值。
 * @param enhancers 一个可选的 Redux 存储增强组件的数组，或者一个自定义增强组件数组的回调函数。
 * enhancers: [offline] ==> [applyMiddleware, offline, devToolsExtension]
 * enhancers: (defaultEnhancers) => [offline, ...defaultEnhancers] ==> [offline, applyMiddleware, devToolsExtension].
 */

/**
 * @function createSlice({name, initialState, reducers, extraReducers?})
 * @description
 * 接受一个初始状态和一个包含 reducer 名称和函数的查找表，并自动生成 action creator 函数、action type 字符串和一个 reducer 函数。
 * @param name : state 切片的名称，生产的 action 类型常量将使用该名称作为前缀
 * @param initialSate : state 切片的初始状态值
 * @param reducers : 包含 Redux "case reducer" 函数的对象
 * 对象中的 key 将被用于生产 action 类型场景，在应用程序中 dispatch action 对象中相同的 key，相应的 reducer 将会被运行。
 * 可以自定义生成 action creators ，此时 reducers 应该是一个对象，需要包含 reducer 和 prepare 属性
 * @param extraReducers 允许 createSlice 响应其他 action types 操作类型。
 */

/**
 * @function createAsyncThunk(type, payloadCreator, options)
 * @description
 * 接受一个 Redux action type 字符串和一个应当返回 promise 对象的回调函数。
 * 根据传入的 action type 的前缀，它会生成关于 promise 生命周期的 action types，并且返回一个会运行 promise 回调函数
 * 且根据返回的 promise 派发生命周期 actions 的 thunk action creator。
 * @param type 一个用于生成额外 Redux action type 常数，代表着一个异步请求生命周期的字符串。
 * @param payloadCreator 回调函数，应该返回一个包含异步处理结果的 Promise 对象，也可以同步地返回一个值。
 * 如果产生错误，应当返回一个包含 Error 实例的 rejected Promise；或者一个描述性的错误信息；或者一个 resolved Promise，使用 thunkAPI.rejectWithValue 工具函数返回一个新的值。
 * payloadCreator 有两个参数：
 * > arg : 一个单独的值。当派发 thunk action creator 时，该值包含传入到 payloadCreator 的第一个参数
 * > thunkAPI : 一个包含所有通常会被传入到 a Redux thunk 函数的参数的对象。其他的选项如下：
 * >> dispatch : Redux store 的 dispatch 方法
 * >> getState : Redux store 的 getState 方法
 * >> extra : 被传入到设置阶段 thunk 中间件的 “额外参数”，如果有的话
 * >> requestId : 一个被自动生成去识别请求顺序的唯一字符串 ID 值
 * >> signal : 一个 AbortController.signal 对象 ，其有可能被用于检查是否某部分应用逻辑已经把该请求标记为需要取消
 * >> rejectWithValue(value, [meta]) : 可以在 action creator 中返回一个带有定义好 payload 的 rejected 响应的工具函数。它会把任何你给它的值进行传递，并且在 rejected 的 action payload 返回该值。
 * >> fulfillWithValue(value, meta) : 可以在 action creator 中返回一个值，同时也可以添加到 fulfilledAction.meta
 * @param options
 * > condition : 可以用于跳过 payload creator 执行和所有 action 派发的回调
 * > dispatchConditionRejection : 如果 condition() 返回 false，默认的行为是没有任何的 actions 会被派发。如果当 thunk 被取消时，仍然想派发一个 "rejected" action 的话，可以设置成 true。
 * @returns 返回一个标准的 Redux thunk action creator, 包含有处理 pending, fulfilled 以及 rejected 情况的普通 action creators，作为其嵌套字段。
 */

import { configureStore } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ========== 【module app】 ==========

const app_initialState = {
  app_count: 0,
}

export const app_slice = createSlice({
  name: 'app',
  initialState: app_initialState,
  reducers: {
    changeAppCount: (state, { payload }) => {
      console.log('changeAppCount payload', payload)
      state.app_count = payload
    },
  },
  extraReducers: {},
})

export const { changeAppCount } = app_slice.actions
export const appSlice = app_slice.reducer

// ========== 【module A】 ==========

const moduleA_initialState = {
  moduleA_count: 0,
  moduleA_dogImage: '',
}

export const moduleA_asyncGetDogImage = createAsyncThunk(
  'moduleA/asyncGetDogImage',
  async (arg, { dispatch }) => {
    const { changeModuleADogImage } = moduleA_slice.actions

    let response = await fetch('https://dog.ceo/api/breeds/image/random')
    if (response.ok) {
      const body = await response.json()
      console.log('fetch body', body)
      // dispatch(changeModuleADogImage(body.message));
      return body.message
    }
  }
)

export const moduleA_slice = createSlice({
  name: 'moduleA',
  initialState: moduleA_initialState,
  reducers: {
    changeModuleACount: (state, { payload }) => {
      state.moduleA_count = payload
    },
    changeModuleADogImage: (state, { payload }) => {
      console.log('changeModuleADogImage payload', payload)
      state.moduleA_dogImage = payload
    },
  },
  extraReducers: {
    [moduleA_asyncGetDogImage.fulfilled](state, { payload }) {
      console.log('moduleA_asyncGetDogImage.fulfilled payload', payload)
      state.moduleA_dogImage = payload
    },
  },
})

export const { changeModuleACount } = moduleA_slice.actions
export const moduleASlice = moduleA_slice.reducer

// ========== 【rootReducer】 ==========

const store = configureStore({
  reducer: {
    app: appSlice,
    moduleA: moduleASlice,
  },
})

export default store
```

:::

::: details src/views/ViewReduxToolkit.js

```js
// src/views/ViewReduxToolkit.js

import React, { useEffect } from 'react'

/**
 * @function useSelector(selector: Function, equalityFn?: Function)
 * 允许使用一个 selector 函数从 Redux store state 中提取数据。
 * 每当函数组件渲染时，selector 就会被运行， useSelector() 会订阅 Redux store，每当有 action 被 dispatched 时就会运行 selector。
 * 使用 useSelector()，默认情况下每次返回一个新的对象都会强制重新渲染。需要从 store 中获取多个值，使用 React-Redux 的 shallowEqual 函数作为 useSelector() 的 equalityFn 参数
 */

/**
 * @function useDispatch()
 * 返回一个对 Redux store 中的 dispatch 函数的引用，可以按需使用它来 dispatch action
 */

/**
 * @function useStore()
 * 返回一个 Redux store 引用，该 store 与传递给 <Provider> 组件的 store 相同
 * 不应该频繁使用这个 hook，将 useSelector() 作为主要选择
 * 对于少量需要访问 store 的场景而言，例如替换 reducer
 */
import { useDispatch, useSelector, useStore, shallowEqual } from 'react-redux'

import {
  changeAppCount,
  changeModuleACount,
  moduleA_asyncGetDogImage,
} from '../store/reduxToolkit.js'

const ViewReduxToolkit = () => {
  const dispatch = useDispatch()
  const store = useStore()

  console.log('获取 store : ', store.getState())

  let { app_count, moduleA_count, moduleA_dogImage } = useSelector(
    state => ({
      app_count: state.app.app_count,
      moduleA_count: state.moduleA.moduleA_count,
      moduleA_dogImage: state.moduleA.moduleA_dogImage,
    }),
    shallowEqual
  )

  useEffect(() => {
    dispatch(moduleA_asyncGetDogImage())
  }, [dispatch])

  return (
    <div>
      <div>ReduxToolkit</div>
      <div>
        <div>app_count: {app_count} </div>
        <button onClick={() => dispatch(changeAppCount(++app_count))}>
          app_count count++
        </button>
      </div>
      <div>
        <div>moduleA_count: {moduleA_count} </div>
        <div>moduleA_dogImage: {moduleA_dogImage} </div>
        <button onClick={() => dispatch(changeModuleACount(++moduleA_count))}>
          moduleA count++
        </button>
        <button onClick={() => dispatch(moduleA_asyncGetDogImage())}>
          moduleA getDogImage
        </button>
      </div>
    </div>
  )
}

export default ViewReduxToolkit
```

:::

## React Redux

React Redux 是 Redux 的官方 React UI 绑定库。它使得你的 React 组件能够从 Redux `store` 中读取到数据，并且你可以通过 `dispatch actions` 去更新 `store` 中的 `state`。

- [React Redux](https://react-redux.js.org/)
- [React Redux 中文文档](https://cn.react-redux.js.org/)

::: details src/App.js

```js
// src/App.js

import { Provider } from 'react-redux'

import reduxStore from './store/redux.js'
import ViewRedux from './views/ViewRedux.js'

export default function App() {
  return (
    {/* <Provider store> 使组件层级中的 connect() 方法都能够获得 Redux store。 */}
    {/* 正常情况下，根组件应该嵌套在 <Provider> 中才能使用 connect() 方法。 */}
    <Provider store={reduxStore}>
      <Redux />
    </Provider>
  )
}
```

:::

::: details src/store/redux.js

```js
// src/store/redux.js

/**
 * @function createStore(reducer, [preloadedState], enhancer)
 * @description
 * 创建一个 Redux store 来以存放应用中所有的 state。
 * 应用中应有且仅有一个 store，可以使用 combineReducers 来把多个 reducer 创建成一个根 reducer。
 * @param reducer (Function) : 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树。
 * @param [preloadedState] (any) : 初始时的 state。
 * @param enhancer (Function) : Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。
 * @return 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。
 */

/**
 * @function combineReducers(reducers)
 * @description
 * 将 reducer 函数拆分成多个单独的函数，拆分后的每个函数负责独立管理 state 的一部分。
 * combineReducers 会把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数。
 * 由 combineReducers() 返回的 state 对象，会将传入的每个 reducer 返回的 state 按其传递给 combineReducers() 时对应的 key 进行命名。
 * @param reducers (Object) : 一个对象，它的值（value）对应不同的 reducer 函数，这些 reducer 函数后面会被合并成一个。
 * @return 一个调用 reducers 对象里所有 reducer 的 reducer，并且构造一个与 reducers 对象结构相同的 state 对象。
 */

/**
 * @function applyMiddleware(...middlewares)
 * @description
 * 使用包含自定义功能的 middleware 来扩展 Redux 是一种推荐的方式。
 * Middleware 可以让你包装 store 的 dispatch 方法来达到你想要的目的。
 * @param ...middlewares (arguments) : 遵循 Redux middleware API 的函数。
 * 每个 middleware 接受 Store 的 dispatch 和 getState 函数作为命名参数，并返回一个函数。
 * 该函数会被传入被称为 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数。
 * 调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。
 * middleware 的函数签名是 ({ getState, dispatch }) => next => action。
 * @return 一个应用了 middleware 后的 store enhancer。
 * 这个 store enhancer 的签名是 createStore => createStore
 * 最简单的使用方法就是直接作为最后一个 enhancer 参数传递给 createStore() 函数。
 * @example
 * redux-thunk 支持 dispatch function，以此让 action creator 控制反转。被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它。
 * redux-promise支持 dispatch 一个异步的 Promise action，并且在 Promise resolve 后可以 dispatch 一个普通的 action。
 */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// ========== 【module app】 ==========

const app_types = {
  APP_CHANGE_COUNT: 'APP_CHANGE_COUNT',
}
const app_initialState = {
  app_count: 0,
}

export const app_actions = {
  changeAppCount: count => ({
    type: app_types.APP_CHANGE_COUNT,
    count,
  }),
}

export const app_reducer = (state = app_initialState, action) => {
  switch (action.type) {
    case app_types.APP_CHANGE_COUNT:
      return { ...state, app_count: action.count }
    default:
      return state
  }
}

// ========== 【module A】 ==========

const moduleA_types = {
  MODULE_A_CHANGE_COUNT: 'MODULE_A_CHANGE_COUNT',
  MODULE_A_CHANGE_DOG_IMAGE: 'MODULE_A_CHANGE_DOG_IMAGE',
}
const moduleA_initialState = {
  moduleA_count: 1,
  moduleA_dogImage: '',
}

export const moduleA_actions = {
  changeModuleACount: count => ({
    type: moduleA_types.MODULE_A_CHANGE_COUNT,
    count,
  }),
  changeModuleADogImage: dogImage => ({
    type: moduleA_types.MODULE_A_CHANGE_DOG_IMAGE,
    dogImage,
  }),
}

export const moduleA_asyncGetDogImage = () => {
  return async (dispatch, getState) => {
    console.log('获取 state : ', getState())
    let response = await fetch('https://dog.ceo/api/breeds/image/random')
    if (response.ok) {
      const body = await response.json()
      console.log('fetch body', body)
      dispatch(moduleA_actions.changeModuleADogImage(body.message))
    }
  }
}

export const moduleA_reducer = (state = moduleA_initialState, action) => {
  console.log('moduleA_reducer action', action)
  switch (action.type) {
    case moduleA_types.MODULE_A_CHANGE_COUNT:
      return { ...state, moduleA_count: action.count }
    case moduleA_types.MODULE_A_CHANGE_DOG_IMAGE:
      return { ...state, moduleA_dogImage: action.dogImage }
    default:
      return state
  }
}

// ========== 【rootReducer】 ==========

const rootReducer = combineReducers({
  app: app_reducer,
  moduleA: moduleA_reducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
```

:::

::: details src/views/ViewRedux.js

```js
// src/views/ViewRedux.js

/**
 * @function bindActionCreators(actionCreators, dispatch)
 * @description
 * 把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象。
 * 同时，使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。
 * @param actionCreators (Function or Object) : 一个 action creator，或者一个 value 是 action creator 的对象。
 * @param dispatch (Function) : 一个由 Store 实例提供的 dispatch 函数。
 * @returns (Function or Object):
 * 一个与原对象类似的对象，只不过这个对象的 value 都是会直接 dispatch 原 action creator 返回的结果的函数。
 * 如果传入一个单独的函数作为 actionCreators，那么返回的结果也是一个单独的函数。
 */
import { bindActionCreators } from 'redux'

/**
 * @function connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
 * @description 连接 React 组件与 Redux store。
 * 连接操作不会改变原来的组件类。反而返回一个新的已与 Redux store 连接的组件类。
 * @param [mapStateToProps(state, [ownProps]): stateProps] (Function)
 * 如果定义该参数，组件将会监听 Redux store 的变化。
 * 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
 * 如果省略了 mapStateToProps 参数，组件将不会监听 Redux store。
 * 如果指定了该回调函数中的第二个参数 ownProps，则，该参数的值为传递到组件的 props，而且只要组件接收到新的 props，mapStateToProps 也会被调用
 * @param [mapDispatchToProps(dispatch, [ownProps]): dispatchProps] (Object or Function)
 * > 如果传递的是一个对象
 * >> 每个定义在该对象的函数都将被当作 Redux action creator，对象所定义的方法名将作为属性名。
 * >> 每个方法将返回一个新的函数，函数中 dispatch 方法会将 action creator 的返回值作为参数执行。这些属性会被合并到组件的 props 中。
 * > 如果传递的是一个函数
 * >> 该函数将接收一个 dispatch 函数，然后由你来决定如何返回一个对象，这个对象通过 dispatch 函数与 action creator 以某种方式绑定在一起
 * >> 可以使用 Redux 的辅助函数 bindActionCreators()，使用 dispatch 对每个 action creator 进行包装，以便可以直接调用。
 * 如果你省个 mapDispatchToProps 参数，默认情况下，dispatch 会注入到你的组件 props 中。
 * 如果指定了该回调函数中第二个参数 ownProps，该参数的值为传递到组件的 props，而且只要组件接收到新 props，mapDispatchToProps 也会被调用。
 * @param [mergeProps(stateProps, dispatchProps, ownProps): props] (Function)
 * mapStateToProps() 与 mapDispatchToProps() 的执行结果和组件自身的 props 将传入到这个回调函数中。
 * 该回调函数返回的对象将作为 props 传递到被包装的组件中。
 * 可以根据组件的 props 来筛选部分的 state 数据，或者把 props 中的某个特定变量与 action creator 绑定在一起。
 * 如果省略 mergeProps 参数，默认情况下返回 Object.assign({}, ownProps, stateProps, dispatchProps) 的结果。
 * @param [options] (Object) : 可以定制 connector 的行为。
 * > [pure = true] (Boolean): 默认值为 true。
 * >> 如果为 true，connector 将执行 shouldComponentUpdate 并且浅对比 mergeProps 的结果，避免不必要的更新
 * >> 前提是当前组件是一个“纯”组件，它不依赖于任何的输入或 state 而只依赖于 props 和 Redux store 的 state。
 * > [withRef = false] (Boolean) : 默认值为 false。
 * >> 如果为 true，connector 会保存一个对被包装组件实例的引用，该引用通过 getWrappedInstance() 方法获得。
 * @returns 根据配置信息，返回一个注入了 state 和 action creator 的 React 组件。
 */
import { connect } from 'react-redux'

import {
  app_actions,
  moduleA_actions,
  moduleA_asyncGetDogImage,
} from '../store/redux.js'

const Redux = props => {
  let { changeAppCount } = props.app_actions
  let { changeModuleACount } = props.moduleA_actions
  let { app_count, moduleA_count, moduleA_dogImage, moduleA_asyncGetDogImage } =
    props

  useEffect(() => {
    moduleA_asyncGetDogImage()
  }, [])

  return (
    <div>
      <div>Redux</div>
      <div>
        <div>app_count: {app_count} </div>
        <button onClick={() => changeAppCount(++app_count)}>
          app_count count++
        </button>
      </div>
      <div>
        <div>moduleA_count: {moduleA_count} </div>
        <div>moduleA_dogImage: {moduleA_dogImage} </div>
        <button onClick={() => changeModuleACount(++moduleA_count)}>
          moduleA count++
        </button>
        <button onClick={() => moduleA_asyncGetDogImage()}>
          moduleA getDogImage
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, props) => {
  return {
    app_count: state.app.app_count,
    moduleA_count: state.moduleA.moduleA_count,
    moduleA_dogImage: state.moduleA.moduleA_dogImage,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    moduleA_actions: bindActionCreators(moduleA_actions, dispatch),
    app_actions: bindActionCreators(app_actions, dispatch),
    moduleA_asyncGetDogImage: bindActionCreators(
      moduleA_asyncGetDogImage,
      dispatch
    ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Redux)
```

:::
