# Props

## Props 的使用

React 中的 `props` 在标签内部的属性和方法会绑定在 `props` 对象属性上，对于组件的插槽会被绑定在 `props` 的 `children` 属性中。

```js
import React from 'react'
import { useState } from 'react'

const Child = () => {
  return <div>Child Component</div>
}

const Parent = props => {
  console.log('Parent props : ', props)
  const { messageProps, onClickProps, ComponentProps, renderFnProps } = props
  const [
    renderPropsChildrenFn,
    renderPropsChildrenComponent,
    renderPropsChildrenDOM,
  ] = props.children

  function renderPropsChildren() {
    const childrenProps = {}

    // 遍历渲染 props.children
    return props.children.map(childrenItem => {
      console.log('childrenItem', typeof childrenItem)
      if (React.isValidElement(childrenItem)) {
        return React.cloneElement(
          childrenItem,
          { ...childrenProps },
          childrenItem.props.children
        )
      } else if (childrenItem instanceof Function) {
        return childrenItem(childrenProps)
      } else if (childrenItem instanceof HTMLElement) {
        return childrenItem
      } else {
        return null
      }
    })
  }

  return (
    <div>
      <div>【props - 属性】：{messageProps}</div>
      <div>【props - 渲染函数】：{renderFnProps()}</div>
      <div>
        【props - 组件】： <ComponentProps />
      </div>
      <div>【props - 插槽 - 渲染函数】：{renderPropsChildrenFn()}</div>
      <div>【props - 插槽 - 渲染组件】：{renderPropsChildrenComponent}</div>
      <div>【props - 插槽 - 渲染 DOM 节点】：{renderPropsChildrenDOM}</div>
      <div>
        <div>【props - 插槽 - 遍历 props.children】：</div>
        <div>{renderPropsChildren()}</div>
      </div>
      <button onClick={() => onClickProps('onClick change content')}>
        Parent Component - button change messageProps
      </button>
    </div>
  )
}

const PropsContainer = () => {
  const [message, setMessage] = useState('Hello World!')

  const handleClick = value => {
    setMessage(value)
  }

  return (
    <div>
      <Parent
        messageProps={message}
        onClickProps={handleClick}
        ComponentProps={Child}
        renderFnProps={() => <div>Render Function</div>}
      >
        {() => <div>Parent Slot Render Function</div>}
        <Child />
        <div>Parent Slot div Dom</div>
      </Parent>
    </div>
  )
}

export default PropsContainer
```

## 监听 Props 的改变

### 类组件

#### getDerivedStateFromProps(props, state)

`getDerivedStateFromProps(props, state)` 生命周期函数

- 该函数应该返回一个对象来更新 `state`，如果返回 `null` 则不更新任何内容
- 该函数存在只有一个目的：**让组件在 `props` 变化时更新 `state`**
- 该函数在调用 `render` 方法之前调用，并且在初始挂载及后续更新时都会被调用
- 该函数无权访问到组件实例。可以通过提取组件 `props` 的纯函数及 `class` 之外的状态，在 `getDerivedStateFromProps()` 和其他 `class` 方法之间重用代码。

遵循有保守使用派生 `state` 规则。`getDerivedStateFromProps()` 适用于罕见的用例，即 `state` 的值在任何时候都取决于 props。

::: details 【Demo】基于 props 更新 state

```js
class ExampleComponent extends React.Component {
  // 在构造函数中初始化 state，或者使用属性初始化器。
  state = {
    isScrollingDown: false,
    lastRow: null,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentRow !== state.lastRow) {
      return {
        isScrollingDown: props.currentRow > state.lastRow,
        lastRow: props.currentRow,
      }
    }

    // 返回 null 表示无需更新 state
    return null
  }
}
```

:::

::: details 【Demo】props 更新时获取外部数据

```js
class ExampleComponent extends React.Component {
  state = {
    externalData: null,
  }

  static getDerivedStateFromProps(props, state) {
    // 保存 prevId 在 state 中，以便我们在 props 变化时进行对比。
    // 清除之前加载的数据（这样我们就不会渲染旧的内容）。
    if (props.id !== state.prevId) {
      return {
        externalData: null,
        prevId: props.id,
      }
    }

    return null // 无需更新 state
  }

  componentDidMount() {
    this._loadAsyncData(this.props.id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.externalData === null) {
      this._loadAsyncData(this.props.id)
    }
  }

  componentWillUnmount() {
    if (this._asyncRequest) {
      this._asyncRequest.cancel()
    }
  }

  render() {
    if (this.state.externalData === null) {
      // 渲染加载状态 ...
    } else {
      // 渲染真实 UI ...
    }
  }

  _loadAsyncData(id) {
    this._asyncRequest = loadMyAsyncData(id).then(externalData => {
      this._asyncRequest = null
      this.setState({ externalData })
    })
  }
}
```

:::

大部分使用派生 `state` （derived state，即：一个组件的 `state` 中的某个数据来自外部）导致的问题，不外乎两个原因：

- 直接复制 `props` 到 `state` 上
- 如果 `props` 和 `state` 不一致就更新 `state`

派生 `state` 会导致代码冗余，并使组件难以维护。相关场景可使用一下替代方案：

- 需要执行副作用（例如，数据提取或动画）以响应 `props` 中的更改，可改用 `componentDidUpdate` 生命周期。
- 使用 `componentWillReceiveProps` 仅在 `prop` 更改时重新计算某些数据，可使用 [memoization helper](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization) 代替。
- 使用 `componentWillReceiveProps` 是为了在 `prop` 更改时，“重置”某些 `state`，可使用组件 [完全受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) 或 [使用 key 使组件完全不受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) 代替。

**受控** 和 **非受控** 通常用来指代表单的 `inputs`，但是也可以用来描述数据频繁更新的组件。

- 用 `props` 传入数据的话，组件可以被认为是**受控**（因为组件被父级传入的 `props` 控制）
- 数据只保存在组件内部的 `state` 的话，是**非受控组件**（因为外部没办法直接控制 `state`）

#### UNSAFE_componentWillReceiveProps(nextProps)

::: warning

注：此生命周期之前名为 `componentWillReceiveProps`，React 已经不推荐使用，未来版本会被废弃。新方法名（`UNSAFE_componentWillReceiveProps`）在 React 16.9 和 React 17.x 中，仍可以继续使用。

可以使用 `rename-unsafe-lifecycles codemod` 将旧的生命周期方法名替换。例如 `componentWillMount` 会被替换为 `UNSAFE_componentWillMount`。

```shell
cd your_project
npx react-codemod rename-unsafe-lifecycles
```

:::

`UNSAFE_componentWillReceiveProps(nextProps)` 会在已挂载的组件接收新的 `props` 之前被调用。

- 如果需要更新状态以及响应 `prop` 更改，可以比较 `this.props` 和 `nextProps`，并在该方法中使用 `this.setState()` 执行 `state` 转换。
- 如果父组件导致组件重新渲染，即使 `props` 没有更改，也会调用此方法。如果只想处理更改，请确保进行当前值与变更值的比较。
- 在挂载过程中，React 不会针对初始 `props` 调用 `UNSAFE_componentWillReceiveProps()`。
- 组件只会在组件的 `props` 更新时调用此方法。调用 `this.setState()` 通常不会触发 `UNSAFE_componentWillReceiveProps()`。

::: warning

使用此生命周期方法通常会出现 bug 和不一致性：

- 需要执行副作用（例如，数据提取或动画）以响应 `props` 中的更改，可改用 `componentDidUpdate` 生命周期。
- 使用 `componentWillReceiveProps` 仅在 `prop` 更改时重新计算某些数据，可使用 [memoization helper](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization) 代替。
- 使用 `componentWillReceiveProps` 是为了在 `prop` 更改时，“重置”某些 `state`，可使用组件 [完全受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) 或 [使用 key 使组件完全不受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) 代替。

:::

### 函数组件

函数组件可以使用 `useEffect()` Hooks 作为 `props` 改变后的监听函数。不过，`useEffect()` 在初始化的时候，会默认执行一次。

```js
useEffect(() => {
  // props 中 number 改变，就会执行这个副作用
  // useEffect() 在初始化的时候，会默认执行一次
  console.log('监听 Props 的改变 : ', props.number)
}, [props.number])
```

## Props 相关操作技巧

### 抽象 props

抽象 `props` 一般用于跨层级传递 `props` 。一般不需要具体指出 `props` 中某个属性，而是将 `props` 直接传入或者是抽离到子组件中。

```js {18}
function Child(props) {
  console.log('Child props', props)
  return (
    <div>
      <div>===== 【Child Component】 =====</div>
    </div>
  )
}

function Parent(props) {
  const parentPropsVal = {
    title: 'Parent title',
    desc: 'Parent desc',
  }
  return (
    <div>
      <div>===== 【Parent Component】 =====</div>
      <Child {...parentPropsVal}></Child>
    </div>
  )
}
```

### 混入 props

```js {20}
function Grandchild(props) {
  console.log('Grandchild props', props)
  return (
    <div>
      <div>===== 【Grandchild】 =====</div>
    </div>
  )
}

function Child(props) {
  console.log('Child props', props)
  const childPropsVal = {
    childTitle: 'Child title',
    childDesc: 'Child desc',
  }
  return (
    <div>
      <div>===== 【Child Component】 =====</div>
      {/* 混入子组件的 props */}
      <Grandchild {...props} {...childPropsVal} />
    </div>
  )
}

function Parent(props) {
  const parentPropsVal = {
    parentTitle: 'Parent title',
    parentDesc: 'Parent desc',
  }
  return (
    <div>
      <div>===== 【Parent Component】 =====</div>
      <Child {...parentPropsVal}></Child>
    </div>
  )
}
```

### 注入 props

#### 显示注入 props

```js
function Grandchild(props) {
  console.log('Grandchild props', props)
  return (
    <div>
      <div>===== 【Grandchild】 =====</div>
    </div>
  )
}

function Child(props) {
  console.log('Child props', props)
  return props.children
}

function Parent(props) {
  console.log('Parent props', props)
  return (
    <div>
      <div>===== 【Parent Component】 =====</div>
      <Child>
        {/* 能够直观的看见标签中绑定的 props */}
        <Grandchild title="Parent title" desc="Parent desc" />
      </Child>
    </div>
  )
}
```

#### 隐式注入 props

```js
function Grandchild(props) {
  console.log('Grandchild props', props)
  return (
    <div>
      <div>===== 【Grandchild】 =====</div>
    </div>
  )
}

function Child(props) {
  console.log('Child props', props)
  // 通过 React.cloneElement 对 props.children 克隆，再混入新的 props
  return React.cloneElement(props.children, { label: 'Child label' })
}

function Parent(props) {
  console.log('Parent props', props)
  return (
    <div>
      <div>===== 【Parent Component】 =====</div>
      <Child>
        <Grandchild title="Parent title" desc="Parent desc" />
      </Child>
    </div>
  )
}
```
