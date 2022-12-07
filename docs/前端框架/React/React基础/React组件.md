# React 组件

React 组件可以定义为 `class` 组件 或 函数组件 两种形式。

React 组件本质上就是类和函数，与常规的类和函数不同的是，组件承载了渲染视图的 UI 和更新视图的 `setState` 、 `useState` 等方法。

React 在底层逻辑上会像正常实例化类和正常执行函数那样处理的组件。因此，函数与类上的特性在 React 组件上同样具有，比如原型链，继承，静态属性等。

::: details 类组件与函数组件示例

```js
// 类组件
class Welcome extends React.Component {
  state = { message: `Hello World!` }
  sayHelloJs = () => this.setState({ message: 'Hello JavaScript!' })
  render() {
    return (
      <div style={{ marginTop: '20px' }} onClick={this.sayHelloJs}>
        {this.state.message}
      </div>
    )
  }
}

// 函数组件
function FunComponent() {
  const [message, setMessage] = useState('Hello World!')
  return <div onClick={() => setMessage('Hello JavaScript!')}>{message}</div>
}
```

:::

## 类组件

### 类组件的组成部分

```js
class Welcome extends React.Component {
  constructor(...arg) {
    /* 执行 react 底层 Component 函数 */
    /* 如果在 super 中，没有传入相关参数（例如：props），则在 constructor 执行上下文中就获取不到 props */
    /* 因为绑定 props 是在父类 Component 构造函数中，执行 super 等于执行 Component 函数，此时 props 没有作为第一个参数传给 super() ，在 Component 中就会找不到 props 参数 */
    super(...arg)
  }
  state = {} /* state */
  static number = 1 /* 内置静态属性 */

  /* 生命周期 */
  componentDidMount() {} // 在组件挂载后（插入 DOM 树中）立即调用
  componentDidUpdate(prevProps, prevState, snapshot) {} // 在更新后会被立即调用
  componentWillUnmount() {} // 在组件卸载及销毁之前直接调用
  // ... 省略其他的生命周期函数的执行

  handleClick = () => {
    console.log('handleClick') /* 方法：箭头函数方法直接绑定在 this 实例上 */
  }

  /* 渲染函数 */
  render() {
    return (
      {/* 触发 onClick 之后，此时输出结果为 handleClick，因为实例对象上方法属性 > 原型链对象上方法属性 */}
      <div style={{ marginTop: '50px' }} onClick={this.handerClick}>
        hello,React!
      </div>
    )
  }
}
/* 外置静态属性 */
Welcome.number1 = 2
/* 方法: 绑定在 Welcome 原型链上的方法*/
Welcome.prototype.handleClick = () => { console.log('Welcome.prototype.handleClick') }
```

### 类组件的继承

在类组件的继承中，`state` 和生命周期会被继承后的组件修改。

> 在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。
>
> Props 和组合提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。
>
> 想要在组件间复用非 UI 的功能，建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。

```js
import React from 'react'

class Person extends React.Component {
  constructor(props) {
    super(props)
  }

  // componentDidMount : 在组件挂载后（插入 DOM 树中）立即调用
  // 被继承后，componentDidMount 生命周期将不会被执行
  componentDidMount() {
    console.log('Person componentDidMount')
  }

  render() {
    return <div className="person">Person Class Component</div>
  }
}

class Programmer extends Person {
  constructor(props) {
    super(props)
  }

  // componentDidMount : 在组件挂载后（插入 DOM 树中）立即调用
  componentDidMount() {
    console.log('Programmer componentDidMount')
  }

  render() {
    return (
      <div className="programmer">
        {super.render()}
        <div>Programmer Class Component</div>
      </div>
    )
  }
}
```

### 类组件的实现

- 在 `beginWork(current, workInProgress, renderLanes)` （创建当前节点的子 `Fiber` 节点）中，通过 `case ClassComponent` 调用 `updateClassComponent` 对未初始化的类组件进行初始化，对已初始化的组件更新重用。

  ::: details 【beginWork】函数: 创建当前节点的子 Fiber 节点

  ```js
  // packages\react-reconciler\src\ReactFiberBeginWork.old.js

  function beginWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderLanes: Lanes
  ): Fiber | null {
    // ...
    switch (workInProgress.tag) {
      case IndeterminateComponent: {
        // ...
      }
      case LazyComponent: {
        // ...
      }
      case FunctionComponent: {
        // ...
      }
      case ClassComponent: {
        const Component = workInProgress.type
        const unresolvedProps = workInProgress.pendingProps
        const resolvedProps =
          workInProgress.elementType === Component
            ? unresolvedProps
            : resolveDefaultProps(Component, unresolvedProps)
        return updateClassComponent(
          current,
          workInProgress,
          Component,
          resolvedProps,
          renderLanes
        )
      }
      case HostRoot: {
        // ...
      }
      case HostComponent: {
        // ...
      }
      // ..
    }
    // ...
  }
  ```

  :::

  ::: details 【updateClassComponent】函数：对未初始化的类组件进行初始化，对已初始化的组件更新重用

  ```js
  // packages\react-reconciler\src\ReactFiberBeginWork.old.js

  function updateClassComponent(
    current: Fiber | null,
    workInProgress: Fiber,
    Component: any,
    nextProps: any,
    renderLanes: Lanes
  ) {
    // Push context providers early to prevent context stack mismatches.
    // During mounting we don't know the child context yet as the instance doesn't exist.
    // We will invalidate the child context in finishClassComponent() right after rendering.
    let hasContext
    if (isLegacyContextProvider(Component)) {
      hasContext = true
      pushLegacyContextProvider(workInProgress)
    } else {
      hasContext = false
    }
    prepareToReadContext(workInProgress, renderLanes)

    const instance = workInProgress.stateNode
    let shouldUpdate
    if (instance === null) {
      resetSuspendedCurrentOnMountInLegacyMode(current, workInProgress)

      // In the initial pass we might need to construct the instance.
      constructClassInstance(workInProgress, Component, nextProps)
      mountClassInstance(workInProgress, Component, nextProps, renderLanes)
      shouldUpdate = true
    } else if (current === null) {
      // In a resume, we'll already have an instance we can reuse.
      shouldUpdate = resumeMountClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderLanes
      )
    } else {
      shouldUpdate = updateClassInstance(
        current,
        workInProgress,
        Component,
        nextProps,
        renderLanes
      )
    }
    const nextUnitOfWork = finishClassComponent(
      current,
      workInProgress,
      Component,
      shouldUpdate,
      hasContext,
      renderLanes
    )
    return nextUnitOfWork
  }
  ```

  :::

- 在 `updateClassComponent` 函数中：

  - 未创建类组件实例，则表示第一渲染（即：`instance === null`）

    - 调用 `constructClassInstance(workInProgress, Component, nextProps)` 函数，通过 `let instance = new ctor(props, context)` 执行构造函数，并返回类组件实例 `instance`

      ::: details 【constructClassInstance】函数：创建一个类组件实例 instance

      ```js {74,102}
      // packages\react-reconciler\src\ReactFiberClassComponent.old.js

      const classComponentUpdater = {
        isMounted,
        enqueueSetState(inst, payload, callback) {
          // ...
        },
        enqueueReplaceState(inst, payload, callback) {
          // ...
        },
        enqueueForceUpdate(inst, callback) {
          // ...
        },
      }

      function adoptClassInstance(workInProgress: Fiber, instance: any): void {
        // 类组件实例设置 updater
        // 组件中调用 setState 和 forceUpdate 本质上是调用了 updater 对象上的 enqueueSetState 和 enqueueForceUpdate 方法
        instance.updater = classComponentUpdater
        workInProgress.stateNode = instance
        // The instance needs access to the fiber so that it can schedule updates
        setInstance(instance, workInProgress)
      }

      function constructClassInstance(
        workInProgress: Fiber,
        ctor: any,
        props: any
      ): any {
        // ...

        let instance = new ctor(props, context)

        const state = (workInProgress.memoizedState =
          instance.state !== null && instance.state !== undefined
            ? instance.state
            : null)
        adoptClassInstance(workInProgress, instance)

        // Cache unmasked context so we can avoid recreating masked context unless necessary.
        // ReactFiberContext usually updates this cache but can't for newly-created instances.
        if (isLegacyContextConsumer) {
          cacheContext(workInProgress, unmaskedContext, context)
        }

        return instance
      }
      ```

      :::

      ::: details 【Component】构造函数

      ```js
      // packages\react\src\ReactBaseClasses.js

      /**
       * Base class helpers for the updating state of a component.
       */
      function Component(props, context, updater) {
        this.props = props
        this.context = context
        // If a component has string refs, we will assign a different object later.
        this.refs = emptyObject
        // We initialize the default updater but the real one gets injected by the
        // renderer.
        this.updater = updater || ReactNoopUpdateQueue
      }

      Component.prototype.isReactComponent = {}

      /**
       * Sets a subset of the state. Always use this to mutate
       * state. You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * There is no guarantee that calls to `setState` will run synchronously,
       * as they may eventually be batched together.  You can provide an optional
       * callback that will be executed when the call to setState is actually
       * completed.
       *
       * When a function is provided to setState, it will be called at some point in
       * the future (not synchronously). It will be called with the up to date
       * component arguments (state, props, context). These values can be different
       * from this.* because your function may be called after receiveProps but before
       * shouldComponentUpdate, and this new state, props, and context will not yet be
       * assigned to this.
       *
       * @param {object|function} partialState Next partial state or function to
       *        produce next partial state to be merged with current state.
       * @param {?function} callback Called after state is updated.
       * @final
       * @protected
       */
      Component.prototype.setState = function (partialState, callback) {
        if (
          typeof partialState !== 'object' &&
          typeof partialState !== 'function' &&
          partialState != null
        ) {
          throw new Error(
            'setState(...): takes an object of state variables to update or a ' +
              'function which returns an object of state variables.'
          )
        }

        this.updater.enqueueSetState(this, partialState, callback, 'setState')
      }

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {?function} callback Called after update is complete.
       * @final
       * @protected
       */
      Component.prototype.forceUpdate = function (callback) {
        this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
      }
      ```

      :::

    - 调用 `mountClassInstance(workInProgress, Component, nextProps, renderLanes)` ，挂载类组件实例，主要是更新 `instance.state`，并且执行一些生命周期

      ::: details 【mountClassInstance】函数

      ```js
      // packages\react-reconciler\src\ReactFiberClassComponent.old.js

      function mountClassInstance(
        workInProgress: Fiber,
        ctor: any,
        newProps: any,
        renderLanes: Lanes
      ): void {
        const instance = workInProgress.stateNode
        instance.props = newProps
        instance.state = workInProgress.memoizedState
        instance.refs = emptyRefsObject

        initializeUpdateQueue(workInProgress)

        const contextType = ctor.contextType
        if (typeof contextType === 'object' && contextType !== null) {
          instance.context = readContext(contextType)
        } else if (disableLegacyContext) {
          instance.context = emptyContextObject
        } else {
          const unmaskedContext = getUnmaskedContext(workInProgress, ctor, true)
          instance.context = getMaskedContext(workInProgress, unmaskedContext)
        }

        instance.state = workInProgress.memoizedState

        // 判断是否有 getDerivedStateFromProps 生命周期并且执行，这个生命周期可能改变State
        // getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。
        const getDerivedStateFromProps = ctor.getDerivedStateFromProps
        if (typeof getDerivedStateFromProps === 'function') {
          applyDerivedStateFromProps(
            workInProgress,
            ctor,
            getDerivedStateFromProps,
            newProps
          )
          // 更新成最新的state
          instance.state = workInProgress.memoizedState
        }

        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        // // 判断是否有 componentWillMount 生命周期并且执行，该生命周期也可能改变 state
        if (
          typeof ctor.getDerivedStateFromProps !== 'function' &&
          typeof instance.getSnapshotBeforeUpdate !== 'function' &&
          (typeof instance.UNSAFE_componentWillMount === 'function' ||
            typeof instance.componentWillMount === 'function')
        ) {
          callComponentWillMount(workInProgress, instance)
          // If we had additional state updates during this life-cycle, let's
          // process them now.
          // 如果改变了 state，就有新的 update 加入 updateQueue
          processUpdateQueue(workInProgress, newProps, instance, renderLanes)
          instance.state = workInProgress.memoizedState
        }

        if (typeof instance.componentDidMount === 'function') {
          let fiberFlags: Flags = Update
          if (enableSuspenseLayoutEffectSemantics) {
            fiberFlags |= LayoutStatic
          }
          workInProgress.flags |= fiberFlags
        }
      }
      ```

      :::

    - 组件渲染被中断（即：`instance !== null` 且 `current === null`），调用 `resumeMountClassInstance(workInProgress, Component, nextProps, renderLanes)` 函数，复用实例并调用首次渲染的生命周期。该函数返回为 `false`，则表示组件无需更新。

      ::: details 【resumeMountClassInstance】函数

      ```js
      // packages\react-reconciler\src\ReactFiberClassComponent.old.js

      function resumeMountClassInstance(
        workInProgress: Fiber,
        ctor: any,
        newProps: any,
        renderLanes: Lanes
      ): boolean {
        const instance = workInProgress.stateNode

        const oldProps = workInProgress.memoizedProps
        instance.props = oldProps

        const oldContext = instance.context
        const contextType = ctor.contextType
        let nextContext = emptyContextObject
        if (typeof contextType === 'object' && contextType !== null) {
          nextContext = readContext(contextType)
        } else if (!disableLegacyContext) {
          const nextLegacyUnmaskedContext = getUnmaskedContext(
            workInProgress,
            ctor,
            true
          )
          nextContext = getMaskedContext(
            workInProgress,
            nextLegacyUnmaskedContext
          )
        }

        const getDerivedStateFromProps = ctor.getDerivedStateFromProps
        const hasNewLifecycles =
          typeof getDerivedStateFromProps === 'function' ||
          typeof instance.getSnapshotBeforeUpdate === 'function'

        // Note: During these life-cycles, instance.props/instance.state are what
        // ever the previously attempted to render - not the "current". However,
        // during componentDidUpdate we pass the "current" props.

        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        if (
          !hasNewLifecycles &&
          (typeof instance.UNSAFE_componentWillReceiveProps === 'function' ||
            typeof instance.componentWillReceiveProps === 'function')
        ) {
          if (oldProps !== newProps || oldContext !== nextContext) {
            callComponentWillReceiveProps(
              workInProgress,
              instance,
              newProps,
              nextContext
            )
          }
        }

        resetHasForceUpdateBeforeProcessing()

        const oldState = workInProgress.memoizedState
        let newState = (instance.state = oldState)
        processUpdateQueue(workInProgress, newProps, instance, renderLanes)
        newState = workInProgress.memoizedState
        if (
          oldProps === newProps &&
          oldState === newState &&
          !hasContextChanged() &&
          !checkHasForceUpdateAfterProcessing()
        ) {
          // If an update was already in progress, we should schedule an Update
          // effect even though we're bailing out, so that cWU/cDU are called.
          if (typeof instance.componentDidMount === 'function') {
            let fiberFlags: Flags = Update
            if (enableSuspenseLayoutEffectSemantics) {
              fiberFlags |= LayoutStatic
            }
            if (
              __DEV__ &&
              enableStrictEffects &&
              (workInProgress.mode & StrictEffectsMode) !== NoMode
            ) {
              fiberFlags |= MountLayoutDev
            }
            workInProgress.flags |= fiberFlags
          }
          return false
        }

        if (typeof getDerivedStateFromProps === 'function') {
          applyDerivedStateFromProps(
            workInProgress,
            ctor,
            getDerivedStateFromProps,
            newProps
          )
          newState = workInProgress.memoizedState
        }

        const shouldUpdate =
          checkHasForceUpdateAfterProcessing() ||
          checkShouldComponentUpdate(
            workInProgress,
            ctor,
            oldProps,
            newProps,
            oldState,
            newState,
            nextContext
          )

        if (shouldUpdate) {
          // In order to support react-lifecycles-compat polyfilled components,
          // Unsafe lifecycles should not be invoked for components using the new APIs.
          if (
            !hasNewLifecycles &&
            (typeof instance.UNSAFE_componentWillMount === 'function' ||
              typeof instance.componentWillMount === 'function')
          ) {
            if (typeof instance.componentWillMount === 'function') {
              instance.componentWillMount()
            }
            if (typeof instance.UNSAFE_componentWillMount === 'function') {
              instance.UNSAFE_componentWillMount()
            }
          }
          if (typeof instance.componentDidMount === 'function') {
            let fiberFlags: Flags = Update
            if (enableSuspenseLayoutEffectSemantics) {
              fiberFlags |= LayoutStatic
            }
            workInProgress.flags |= fiberFlags
          }
        } else {
          // If an update was already in progress, we should schedule an Update
          // effect even though we're bailing out, so that cWU/cDU are called.
          if (typeof instance.componentDidMount === 'function') {
            let fiberFlags: Flags = Update
            if (enableSuspenseLayoutEffectSemantics) {
              fiberFlags |= LayoutStatic
            }
            workInProgress.flags |= fiberFlags
          }

          // If shouldComponentUpdate returned false, we should still update the
          // memoized state to indicate that this work can be reused.
          workInProgress.memoizedProps = newProps
          workInProgress.memoizedState = newState
        }

        // Update the existing instance's state, props, and context pointers even
        // if shouldComponentUpdate returns false.
        instance.props = newProps
        instance.state = newState
        instance.context = nextContext

        return shouldUpdate
      }
      ```

      :::

    - 更新组件（即：`instance !== null` 且 `current !== null`），调用 `updateClassInstance` 函数，并调用 `didUpdate` 和 `componentWillReceiveProp` 生命周期。该函数返回为 `false`，则表示组件无需更新。

      ::: details 【updateClassInstance】函数

      ```js
      // packages\react-reconciler\src\ReactFiberClassComponent.old.js

      // Invokes the update life-cycles and returns false if it shouldn't rerender.
      function updateClassInstance(
        current: Fiber,
        workInProgress: Fiber,
        ctor: any,
        newProps: any,
        renderLanes: Lanes
      ): boolean {
        const instance = workInProgress.stateNode

        cloneUpdateQueue(current, workInProgress)

        const unresolvedOldProps = workInProgress.memoizedProps
        const oldProps =
          workInProgress.type === workInProgress.elementType
            ? unresolvedOldProps
            : resolveDefaultProps(workInProgress.type, unresolvedOldProps)
        instance.props = oldProps
        const unresolvedNewProps = workInProgress.pendingProps

        const oldContext = instance.context
        const contextType = ctor.contextType
        let nextContext = emptyContextObject
        if (typeof contextType === 'object' && contextType !== null) {
          nextContext = readContext(contextType)
        } else if (!disableLegacyContext) {
          const nextUnmaskedContext = getUnmaskedContext(
            workInProgress,
            ctor,
            true
          )
          nextContext = getMaskedContext(workInProgress, nextUnmaskedContext)
        }

        const getDerivedStateFromProps = ctor.getDerivedStateFromProps
        const hasNewLifecycles =
          typeof getDerivedStateFromProps === 'function' ||
          typeof instance.getSnapshotBeforeUpdate === 'function'

        // Note: During these life-cycles, instance.props/instance.state are what
        // ever the previously attempted to render - not the "current". However,
        // during componentDidUpdate we pass the "current" props.

        // In order to support react-lifecycles-compat polyfilled components,
        // Unsafe lifecycles should not be invoked for components using the new APIs.
        if (
          !hasNewLifecycles &&
          (typeof instance.UNSAFE_componentWillReceiveProps === 'function' ||
            typeof instance.componentWillReceiveProps === 'function')
        ) {
          if (
            unresolvedOldProps !== unresolvedNewProps ||
            oldContext !== nextContext
          ) {
            callComponentWillReceiveProps(
              workInProgress,
              instance,
              newProps,
              nextContext
            )
          }
        }

        resetHasForceUpdateBeforeProcessing()

        const oldState = workInProgress.memoizedState
        let newState = (instance.state = oldState)
        processUpdateQueue(workInProgress, newProps, instance, renderLanes)
        newState = workInProgress.memoizedState

        if (
          unresolvedOldProps === unresolvedNewProps &&
          oldState === newState &&
          !hasContextChanged() &&
          !checkHasForceUpdateAfterProcessing() &&
          !(
            enableLazyContextPropagation &&
            current !== null &&
            current.dependencies !== null &&
            checkIfContextChanged(current.dependencies)
          )
        ) {
          // If an update was already in progress, we should schedule an Update
          // effect even though we're bailing out, so that cWU/cDU are called.
          if (typeof instance.componentDidUpdate === 'function') {
            if (
              unresolvedOldProps !== current.memoizedProps ||
              oldState !== current.memoizedState
            ) {
              workInProgress.flags |= Update
            }
          }
          if (typeof instance.getSnapshotBeforeUpdate === 'function') {
            if (
              unresolvedOldProps !== current.memoizedProps ||
              oldState !== current.memoizedState
            ) {
              workInProgress.flags |= Snapshot
            }
          }
          return false
        }

        if (typeof getDerivedStateFromProps === 'function') {
          applyDerivedStateFromProps(
            workInProgress,
            ctor,
            getDerivedStateFromProps,
            newProps
          )
          newState = workInProgress.memoizedState
        }

        const shouldUpdate =
          checkHasForceUpdateAfterProcessing() ||
          checkShouldComponentUpdate(
            workInProgress,
            ctor,
            oldProps,
            newProps,
            oldState,
            newState,
            nextContext
          ) ||
          // TODO: In some cases, we'll end up checking if context has changed twice,
          // both before and after `shouldComponentUpdate` has been called. Not ideal,
          // but I'm loath to refactor this function. This only happens for memoized
          // components so it's not that common.
          (enableLazyContextPropagation &&
            current !== null &&
            current.dependencies !== null &&
            checkIfContextChanged(current.dependencies))

        if (shouldUpdate) {
          // In order to support react-lifecycles-compat polyfilled components,
          // Unsafe lifecycles should not be invoked for components using the new APIs.
          if (
            !hasNewLifecycles &&
            (typeof instance.UNSAFE_componentWillUpdate === 'function' ||
              typeof instance.componentWillUpdate === 'function')
          ) {
            if (typeof instance.componentWillUpdate === 'function') {
              instance.componentWillUpdate(newProps, newState, nextContext)
            }
            if (typeof instance.UNSAFE_componentWillUpdate === 'function') {
              instance.UNSAFE_componentWillUpdate(
                newProps,
                newState,
                nextContext
              )
            }
          }
          if (typeof instance.componentDidUpdate === 'function') {
            workInProgress.flags |= Update
          }
          if (typeof instance.getSnapshotBeforeUpdate === 'function') {
            workInProgress.flags |= Snapshot
          }
        } else {
          // If an update was already in progress, we should schedule an Update
          // effect even though we're bailing out, so that cWU/cDU are called.
          if (typeof instance.componentDidUpdate === 'function') {
            if (
              unresolvedOldProps !== current.memoizedProps ||
              oldState !== current.memoizedState
            ) {
              workInProgress.flags |= Update
            }
          }
          if (typeof instance.getSnapshotBeforeUpdate === 'function') {
            if (
              unresolvedOldProps !== current.memoizedProps ||
              oldState !== current.memoizedState
            ) {
              workInProgress.flags |= Snapshot
            }
          }

          // If shouldComponentUpdate returned false, we should still update the
          // memoized props/state to indicate that this work can be reused.
          workInProgress.memoizedProps = newProps
          workInProgress.memoizedState = newState
        }

        // Update the existing instance's state, props, and context pointers even
        // if shouldComponentUpdate returns false.
        instance.props = newProps
        instance.state = newState
        instance.context = nextContext

        return shouldUpdate
      }
      ```

      :::

    - 最终执行 `finishClassComponent`，进行错误判断处理和判断是否可以跳过更新的过程，重新调和子节点 `reconcileChildren`

      ::: details 【finishClassComponent】函数

      ```js
      // packages\react-reconciler\src\ReactFiberBeginWork.old.js

      function finishClassComponent(
        current: Fiber | null,
        workInProgress: Fiber,
        Component: any,
        shouldUpdate: boolean,
        hasContext: boolean,
        renderLanes: Lanes
      ) {
        // Refs should update even if shouldComponentUpdate returns false
        markRef(current, workInProgress)

        const didCaptureError = (workInProgress.flags & DidCapture) !== NoFlags

        if (!shouldUpdate && !didCaptureError) {
          // Context providers should defer to sCU for rendering
          if (hasContext) {
            invalidateContextProvider(workInProgress, Component, false)
          }

          return bailoutOnAlreadyFinishedWork(
            current,
            workInProgress,
            renderLanes
          )
        }

        const instance = workInProgress.stateNode

        // Rerender
        ReactCurrentOwner.current = workInProgress
        let nextChildren
        if (
          didCaptureError &&
          typeof Component.getDerivedStateFromError !== 'function'
        ) {
          // If we captured an error, but getDerivedStateFromError is not defined,
          // unmount all the children. componentDidCatch will schedule an update to
          // re-render a fallback. This is temporary until we migrate everyone to
          // the new API.
          // TODO: Warn in a future release.
          nextChildren = null

          if (enableProfilerTimer) {
            stopProfilerTimerIfRunning(workInProgress)
          }
        } else {
          if (enableSchedulingProfiler) {
            markComponentRenderStarted(workInProgress)
          }
          if (__DEV__) {
            setIsRendering(true)
            nextChildren = instance.render()
            if (
              debugRenderPhaseSideEffectsForStrictMode &&
              workInProgress.mode & StrictLegacyMode
            ) {
              setIsStrictModeForDevtools(true)
              try {
                instance.render()
              } finally {
                setIsStrictModeForDevtools(false)
              }
            }
            setIsRendering(false)
          } else {
            nextChildren = instance.render()
          }
          if (enableSchedulingProfiler) {
            markComponentRenderStopped()
          }
        }

        // React DevTools reads this flag.
        workInProgress.flags |= PerformedWork
        if (current !== null && didCaptureError) {
          // If we're recovering from an error, reconcile without reusing any of
          // the existing children. Conceptually, the normal children and the children
          // that are shown on error are two different sets, so we shouldn't reuse
          // normal children even if their identities match.
          forceUnmountCurrentAndReconcile(
            current,
            workInProgress,
            nextChildren,
            renderLanes
          )
        } else {
          reconcileChildren(current, workInProgress, nextChildren, renderLanes)
        }

        // Memoize state using the values we just used to render.
        // TODO: Restructure so we never read values from the instance.
        workInProgress.memoizedState = instance.state

        // The context might have changed so we need to recalculate it.
        if (hasContext) {
          invalidateContextProvider(workInProgress, Component, true)
        }

        return workInProgress.child
      }
      ```

      :::

## 函数组件

### 函数组件的组成部分

```js
function Welcome() {
  console.log(Welcome.number) // 输出结果为 1

  /* Hook API */
  /* useState hook：返回一个 state，以及更新 state 的函数 */
  const [message, setMessage] = useState('hello,world')
  /* useEffect hook：接收一个包含命令式、且可能有副作用代码的函数 */
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  // ... 省略相关 Hook API 的使用

  /* return 返回值作为渲染 UI */
  return (
    <div onClick={() => setMessage('let us learn React!')}> {message} </div>
  )
}
Welcome.number = 1 /* 绑定静态属性 */
```

注意：不要尝试给函数组件 `prototype` 绑定属性或方法，即使绑定了也没有任何作用，因为通过上面源码中 React 对函数组件的调用，是采用直接执行函数的方式，而不是通过 `new` 的方式。

类组件与函数组件的区别：

- 在类组件中，底层只需要实例化一次，实例中保存了组件的 `state` 等状态。对于每一次更新只需要调用 `render` 方法以及对应的生命周期就可以了
- 在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明

### 函数组件的实现

- 在 `beginWork(current, workInProgress, renderLanes)` （创建当前节点的子 `Fiber` 节点）中，通过 `case ClassComponent` 调用 `updateFunctionComponent` 函数

  ::: details 【beginWork】函数: 创建当前节点的子 Fiber 节点

  ```js
  // packages\react-reconciler\src\ReactFiberBeginWork.old.js

  function beginWork(
    current: Fiber | null,
    workInProgress: Fiber,
    renderLanes: Lanes
  ): Fiber | null {
    // ...
    switch (workInProgress.tag) {
      case IndeterminateComponent: {
        // ...
      }
      case LazyComponent: {
        // ...
      }
      case FunctionComponent: {
        const Component = workInProgress.type
        const unresolvedProps = workInProgress.pendingProps
        const resolvedProps =
          workInProgress.elementType === Component
            ? unresolvedProps
            : resolveDefaultProps(Component, unresolvedProps)
        return updateFunctionComponent(
          current,
          workInProgress,
          Component,
          resolvedProps,
          renderLanes
        )
      }
      case ClassComponent: {
        // ...
      }
      case HostRoot: {
        // ...
      }
      case HostComponent: {
        // ...
      }
      // ..
    }
    // ...
  }
  ```

  :::

  ::: details 【updateFunctionComponent】函数

  ```js
  // packages\react-reconciler\src\ReactFiberBeginWork.old.js

  function updateFunctionComponent(
    current,
    workInProgress,
    Component,
    nextProps: any,
    renderLanes
  ) {
    let context
    if (!disableLegacyContext) {
      const unmaskedContext = getUnmaskedContext(
        workInProgress,
        Component,
        true
      )
      context = getMaskedContext(workInProgress, unmaskedContext)
    }

    let nextChildren
    let hasId
    prepareToReadContext(workInProgress, renderLanes)
    if (enableSchedulingProfiler) {
      markComponentRenderStarted(workInProgress)
    }
    if (__DEV__) {
      // ...
    } else {
      nextChildren = renderWithHooks(
        current,
        workInProgress,
        Component,
        nextProps,
        context,
        renderLanes
      )
      hasId = checkDidRenderIdHook()
    }
    if (enableSchedulingProfiler) {
      markComponentRenderStopped()
    }

    if (current !== null && !didReceiveUpdate) {
      bailoutHooks(current, workInProgress, renderLanes)
      return bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)
    }

    if (getIsHydrating() && hasId) {
      pushMaterializedTreeId(workInProgress)
    }

    // React DevTools reads this flag.
    workInProgress.flags |= PerformedWork
    reconcileChildren(current, workInProgress, nextChildren, renderLanes)
    return workInProgress.child
  }
  ```

  :::

- 在 `updateFunctionComponent` 函数中：

  - 通过调用 `renderWithHooks` 函数，执行 `let children = Component(props, secondArg)` 调用函数组件（即：用户编写的函数组件），获得一个 `ReactElement` （即： `nextChildren`）

    ::: details 【renderWithHooks】函数

    ```js {41}
    // packages\react-reconciler\src\ReactFiberHooks.old.js

    export function renderWithHooks<Props, SecondArg>(
      current: Fiber | null,
      workInProgress: Fiber,
      Component: (p: Props, arg: SecondArg) => any,
      props: Props,
      secondArg: SecondArg,
      nextRenderLanes: Lanes
    ): any {
      renderLanes = nextRenderLanes
      currentlyRenderingFiber = workInProgress

      workInProgress.memoizedState = null
      workInProgress.updateQueue = null
      workInProgress.lanes = NoLanes

      // The following should have already been reset
      // currentHook = null;
      // workInProgressHook = null;

      // didScheduleRenderPhaseUpdate = false;
      // localIdCounter = 0;

      // TODO Warn if no hooks are used at all during mount, then some are used during update.
      // Currently we will identify the update render as a mount because memoizedState === null.
      // This is tricky because it's valid for certain types of components (e.g. React.lazy)

      // Using memoizedState to differentiate between mount/update only works if at least one stateful hook is used.
      // Non-stateful hooks (e.g. context) don't get added to memoizedState,
      // so memoizedState would be null during updates and mounts.
      if (__DEV__) {
        // ...
      } else {
        ReactCurrentDispatcher.current =
          current === null || current.memoizedState === null
            ? HooksDispatcherOnMount
            : HooksDispatcherOnUpdate
      }

      let children = Component(props, secondArg)

      // Check if there was a render phase update
      if (didScheduleRenderPhaseUpdateDuringThisPass) {
        // Keep rendering in a loop for as long as render phase updates continue to
        // be scheduled. Use a counter to prevent infinite loops.
        let numberOfReRenders: number = 0
        do {
          didScheduleRenderPhaseUpdateDuringThisPass = false
          localIdCounter = 0

          if (numberOfReRenders >= RE_RENDER_LIMIT) {
            throw new Error(
              'Too many re-renders. React limits the number of renders to prevent ' +
                'an infinite loop.'
            )
          }

          numberOfReRenders += 1

          // Start over from the beginning of the list
          currentHook = null
          workInProgressHook = null

          workInProgress.updateQueue = null

          ReactCurrentDispatcher.current = __DEV__
            ? HooksDispatcherOnRerenderInDEV
            : HooksDispatcherOnRerender

          children = Component(props, secondArg)
        } while (didScheduleRenderPhaseUpdateDuringThisPass)
      }

      // We can assume the previous dispatcher is always this one, since we set it
      // at the beginning of the render phase and there's no re-entrance.
      ReactCurrentDispatcher.current = ContextOnlyDispatcher

      // This check uses currentHook so that it works the same in DEV and prod bundles.
      // hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
      const didRenderTooFewHooks =
        currentHook !== null && currentHook.next !== null

      renderLanes = NoLanes
      currentlyRenderingFiber = (null: any)

      currentHook = null
      workInProgressHook = null

      didScheduleRenderPhaseUpdate = false
      // This is reset by checkDidRenderIdHook
      // localIdCounter = 0;

      if (didRenderTooFewHooks) {
        throw new Error(
          'Rendered fewer hooks than expected. This may be caused by an accidental ' +
            'early return statement.'
        )
      }

      if (enableLazyContextPropagation) {
        if (current !== null) {
          if (!checkIfWorkInProgressReceivedUpdate()) {
            // If there were no changes to props or state, we need to check if there
            // was a context change. We didn't already do this because there's no
            // 1:1 correspondence between dependencies and hooks. Although, because
            // there almost always is in the common case (`readContext` is an
            // internal API), we could compare in there. OTOH, we only hit this case
            // if everything else bails out, so on the whole it might be better to
            // keep the comparison out of the common path.
            const currentDependencies = current.dependencies
            if (
              currentDependencies !== null &&
              checkIfContextChanged(currentDependencies)
            ) {
              markWorkInProgressReceivedUpdate()
            }
          }
        }
      }
      return children
    }
    ```

    :::

  - 调用 `reconcileChildren` 函数，改变 `workInProgress.child`

    - 当前节点为 `null` （即：`current === null`），则表示第一次渲染，调用 `mountChildFibers` 函数，并将函数返回值赋值给 `workInProgress.child`

      ```js
      // packages\react-reconciler\src\ReactChildFiber.old.js
      export const mountChildFibers = ChildReconciler(false)
      ```

    - 当前节点不为 `null` （即：`current !== null`），则表示更新节点，调用 `reconcileChildFibers` 函数，并将函数返回值赋值给 `workInProgress.child`

      ```js
      // packages\react-reconciler\src\ReactChildFiber.old.js
      export const reconcileChildFibers = ChildReconciler(true)
      ```

    ::: details 【reconcileChildren】函数

    ```js
    export function reconcileChildren(
      current: Fiber | null,
      workInProgress: Fiber,
      nextChildren: any,
      renderLanes: Lanes
    ) {
      if (current === null) {
        // 第一次渲染
        // If this is a fresh new component that hasn't been rendered yet, we
        // won't update its child set by applying minimal side-effects. Instead,
        // we will add them all to the child before it gets rendered. That means
        // we can optimize this reconciliation pass by not tracking side-effects.
        workInProgress.child = mountChildFibers(
          workInProgress,
          null,
          nextChildren,
          renderLanes
        )
      } else {
        // 更新组件
        // If the current child is the same as the work in progress, it means that
        // we haven't yet started any work on these children. Therefore, we use
        // the clone algorithm to create a copy of all the current children.

        // If we had any progressed work already, that is invalid at this point so
        // let's throw it out.
        workInProgress.child = reconcileChildFibers(
          workInProgress,
          current.child,
          nextChildren,
          renderLanes
        )
      }
    }
    ```

    :::

    ::: details 【ChildReconciler】函数

    ```js
    // packages\react-reconciler\src\ReactChildFiber.old.js

    // This wrapper function exists because I expect to clone the code in each path
    // to be able to optimize each path individually by branching early. This needs
    // a compiler or we can do it manually. Helpers that don't need this branching
    // live outside of this function.
    function ChildReconciler(shouldTrackSideEffects) {
      // ...

      // This API will tag the children with the side-effect of the reconciliation
      // itself. They will be added to the side-effect list as we pass through the
      // children and the parent.
      function reconcileChildFibers(
        returnFiber: Fiber,
        currentFirstChild: Fiber | null,
        newChild: any,
        lanes: Lanes
      ): Fiber | null {
        // This function is not recursive.
        // If the top level item is an array, we treat it as a set of children,
        // not as a fragment. Nested arrays on the other hand will be treated as
        // fragment nodes. Recursion happens at the normal flow.

        // Handle top level unkeyed fragments as if they were arrays.
        // This leads to an ambiguity between <>{[...]}</> and <>...</>.
        // We treat the ambiguous cases above the same.
        const isUnkeyedTopLevelFragment =
          typeof newChild === 'object' &&
          newChild !== null &&
          newChild.type === REACT_FRAGMENT_TYPE &&
          newChild.key === null
        if (isUnkeyedTopLevelFragment) {
          newChild = newChild.props.children
        }

        // Handle object types
        if (typeof newChild === 'object' && newChild !== null) {
          switch (newChild.$$typeof) {
            case REACT_ELEMENT_TYPE:
              return placeSingleChild(
                reconcileSingleElement(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                )
              )
            case REACT_PORTAL_TYPE:
              return placeSingleChild(
                reconcileSinglePortal(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                )
              )
            case REACT_LAZY_TYPE:
              const payload = newChild._payload
              const init = newChild._init
              // TODO: This function is supposed to be non-recursive.
              return reconcileChildFibers(
                returnFiber,
                currentFirstChild,
                init(payload),
                lanes
              )
          }

          if (isArray(newChild)) {
            return reconcileChildrenArray(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            )
          }

          if (getIteratorFn(newChild)) {
            return reconcileChildrenIterator(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            )
          }

          throwOnInvalidObjectType(returnFiber, newChild)
        }

        if (
          (typeof newChild === 'string' && newChild !== '') ||
          typeof newChild === 'number'
        ) {
          return placeSingleChild(
            reconcileSingleTextNode(
              returnFiber,
              currentFirstChild,
              '' + newChild,
              lanes
            )
          )
        }

        if (__DEV__) {
          if (typeof newChild === 'function') {
            warnOnFunctionType(returnFiber)
          }
        }

        // Remaining cases are all treated as empty.
        return deleteRemainingChildren(returnFiber, currentFirstChild)
      }

      return reconcileChildFibers
    }
    ```

    :::

    在 `ChildReconciler` 函数中，最后会返回 `reconcileChildFibers` 函数。

    在 `reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes)` 函数中：

    - 判断 `newChild` 节点（调用函数组件返回的新 `child`）的类型，并执行不同的操作。

      - `newChild` 为 `object` 且不为 `null` 的情况下
        - `newChild.$$typeof` 为 `REACT_ELEMENT_TYPE`，则调用 `placeSingleChild(reconcileSingleElement())`
        - `newChild.$$typeof` 为 `REACT_PORTAL_TYPE`，则调用 `placeSingleChild(reconcileSinglePortal())`
        - `newChild.$$typeof` 为 `REACT_LAZY_TYPE`，则调用 `reconcileChildFibers()`
        - `newChild` 为 `Array`，则调用 `reconcileChildrenArray()`
        - `newChild` 为 `Iterator`，则调用 `reconcileChildrenIterator()`
        - 否则，调用 `throwOnInvalidObjectType` 抛出错误
      - `newChild` 为 `string` （不为空字符串）或者 `number`，则调用 `placeSingleChild(reconcileSingleTextNode())`

      更新渲染时 `placeSingleChild` 会把新创建的 `fiber` 节点标记为 `Placement`, 待到 `commit` 阶段处理，其中 `ReactElement`, `Portal`, `TextNode` 三种类型的节点需要进行处理

    - 然后，调用 `deleteRemainingChildren` 删除掉所有子节点。因为，最后只有可能`newChild === null`，说明新的更新清空掉了所有子节点。

      在 `deleteRemainingChildren` 函数中，通过调用 `deleteChild` 逐个删除子节点，但删除子节点并不是真的删除这个对象，而是通过 `firstEffect`、`lastEffect`、`nextEffect` 属性来维护一个 `EffectList`（链表结构），通过 `effectTag` 标记当前删除操作，在后续 `commit` 阶段会使用到。

  - 最终，返回 `workInProgress.child`

## React 组件通信方式

### props / callback 方式

- 父组件：通过 `props` 将信息传递给子组件

  【父组件】 -> 通过自身 `state` 改变，重新渲染，传递 `props` -> 通知【子组件】

- 子组件：通过执行 `props` 中的回调函数 `callback` 来触发父组件的方法

  【子组件】 -> 通过调用【父组件】 `props` 方法 -> 通知【父组件】

```js
import { useState } from 'react'

function Child(props) {
  const { parentVal, onChangeParentVal } = props
  return (
    <div className="child">
      <div>【子组件】</div>
      <div>父组件 parentVal ：{parentVal}</div>
      <input
        placeholder="修改 childVal 的值"
        onChange={e => onChangeParentVal(e.target.value)}
      />
    </div>
  )
}

function Parent() {
  const [parentVal, setParentVal] = useState('')
  const [childVal, setChildVal] = useState('')
  return (
    <div className="parent">
      <div>【父组件】</div>
      <div>子组件 childVal : {childVal}</div>
      <input
        placeholder="修改 parentVal 的值"
        onChange={e => setParentVal(e.target.value)}
      />
      <Child parentVal={parentVal} onChangeParentVal={setChildVal}></Child>
    </div>
  )
}
```

### ref 方式

React 支持一个特殊的、可以附加到任何组件上的 `ref` 属性。此属性可以是一个由 `React.createRef()` 函数创建的对象、或者一个回调函数、或者一个字符串（遗留 API）。

当 `ref` 属性是一个回调函数时，此函数会（根据元素的类型）接收底层 DOM 元素或 `class` 实例作为其参数，能够直接访问 DOM 元素或组件实例。

```js
// React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。
const Child = forwardRef((props, ref) => {
  const inputRef = useRef()

  // useImperativeHandle: 配合 forwardRef 自定义暴露给父组件的实例值
  // useImperativeHandle(ref, createHandle, deps) 接受三个参数：
  // > ref : 接受 forWardRef 传递过来的 ref
  // > createHandle : 处理函数，返回值作为暴露给父组件的ref对象
  // > deps : 依赖项 deps，依赖项更改形成新的ref对象
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return (
    <div className="child">
      <div>【子组件】</div>
      <input type="text" ref={inputRef} />
    </div>
  )
})

const Parent = () => {
  const childRef = useRef(null)

  return (
    <div className="parent">
      <div>【父组件】</div>
      <button onClick={() => childRef.current.focus()}>
        调用子组件方法获取焦点
      </button>
      <Child ref={childRef} />
    </div>
  )
}
```

### Context 方式

`Context` 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。主要应用场景在于很多不同层级的组件需要访问同样一些的数据。

```js
import React, { useState, useContext } from 'react'

const themes = {
  light: { foreground: '#000000', background: '#eeeeee' },
  dark: { foreground: '#ffffff', background: '#222222' },
}

const ThemeContext = React.createContext(themes.light)

const Child = () => {
  // useContext hook : 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。
  // 当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
  // 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。
  const { foreground, background, setThemeContext } = useContext(ThemeContext)
  return (
    <button
      style={{ color: foreground, background: background }}
      onClick={() => setThemeContext(themes.light)}
    >
      I am styled by theme context!
    </button>
  )
}

const Parent = () => {
  const [themeContextValue, setThemeContext] = useState(themes.dark)
  return (
    // Context.Provider : 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
    // Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
    // 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。
    <ThemeContext.Provider value={{ ...themeContextValue, setThemeContext }}>
      <Child />
    </ThemeContext.Provider>
  )
}
```

### Event Bus 事件总线方式

在绝大多数情况下，不鼓励使用全局的事件总线在组件之间进行通信。在短期内往往是最简单的解决方案，从长期来看，它维护起来比较困难。

事件总线模式可以使用 npm 库进行处理，例如 `mitt` 或 `tiny-emitter`。

```js
import { useState, useEffect } from 'react'
import mitt from 'mitt'

const emitter = mitt()

function Child() {
  const [parentVal, setParentVal] = useState('')

  useEffect(() => {
    emitter.on('parentChange', value => {
      setParentVal(value)
    })
  })

  return (
    <div className="child">
      <div>【子组件】</div>
      <div>父组件 parentVal ：{parentVal}</div>
      <input
        placeholder="子组件通过 Event Bus 触发父组件的事件"
        onChange={e => emitter.emit('childChange', e.target.value)}
      />
    </div>
  )
}

function Parent() {
  const [childVal, setChildVal] = useState('')

  useEffect(() => {
    emitter.on('childChange', value => {
      setChildVal(value)
    })
  })

  return (
    <div className="parent">
      <div>【父组件】</div>
      <div>子组件 childVal : {childVal}</div>
      <input
        placeholder="修改 parentVal 的值"
        onChange={e => emitter.emit('parentChange', e.target.value)}
      />
      <Child />
    </div>
  )
}
```

### React-redux / React-mobx 状态管理方式

```js
import { configureStore, createSlice } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch, shallowEqual } from 'react-redux'

const initialState = {
  parentVal: '',
  childVal: '',
}

const welcomeSlice = createSlice({
  name: 'welcome',
  initialState,
  reducers: {
    changeParentVal(state, { payload }) {
      state.parentVal = payload
    },
    changeChildVal(state, { payload }) {
      state.childVal = payload
    },
  },
  extraReducers: {},
})

const store = configureStore({
  reducer: {
    welcome: welcomeSlice.reducer,
  },
})

function Child() {
  const { parentVal } = useSelector(state => state.welcome, shallowEqual)
  const { changeChildVal } = welcomeSlice.actions
  const dispatch = useDispatch()

  return (
    <div className="child">
      <div>【子组件】</div>
      <div>父组件 parentVal ：{parentVal}</div>
      <input
        placeholder="修改 childVal 的值"
        onChange={e => dispatch(changeChildVal(e.target.value))}
      />
    </div>
  )
}

function Parent() {
  const { childVal } = useSelector(state => state.welcome, shallowEqual)
  const { changeParentVal } = welcomeSlice.actions
  const dispatch = useDispatch()

  return (
    <div className="parent">
      <div>【父组件】</div>
      <div>子组件 childVal : {childVal}</div>
      <input
        placeholder="修改 parentVal 的值"
        onChange={e => dispatch(changeParentVal(e.target.value))}
      />
      <Child />
    </div>
  )
}

export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Parent />
      </Provider>
    </div>
  )
}
```
