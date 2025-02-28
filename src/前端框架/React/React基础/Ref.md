# Ref

Refs 提供了一种方式，允许访问 DOM 节点或在 render 方法中创建的 React 元素。

## 创建 Ref

### 类组件 React.createRef

`React.createRef` 创建一个能够通过 `ref` 属性附加到 React 元素的 `ref`。

`React.createRef` 一般用于类组件创建 Ref 对象，可以将 Ref 对象绑定在类组件实例上。

注意：不要在函数组件中使用 `React.createRef`，否则，会造成 Ref 对象内容丢失等情况。

```js
class ExampleComponent extends React.Component {
  constructor(props) {
    super(props)
    this.inputRef = React.createRef() // 类组件创建 Ref
  }

  componentDidMount() {
    this.inputRef.current.focus()
  }

  render() {
    return <input type="text" ref={this.inputRef} />
  }
}
```

`React.createRef` 底层就是创建了一个对象，对象上的 `current` 属性，用于保存通过 ref 获取的 DOM 元素、组件实例等。

```js
// packages\react\src\ReactCreateRef.js

// an immutable object with a single mutable value
export function createRef(): RefObject {
  const refObject = {
    current: null,
  }
  return refObject
}
```

### 函数组件 useRef

`useRef` 返回一个可变的 ref 对象，其中的 `.current` 属性被初始化为传入的参数（initialValue）。返回的 `ref` 对象在组件的整个生命周期内持续存在。

```js
function ExampleComponent() {
  const inputEle = useRef(null)
  const onButtonClick = () => {
    // current 指向已挂载到 DOM 上的文本输入元素
    inputEle.current.focus()
  }
  return (
    <>
      <input ref={inputEle} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  )
}
```

当 `ref` 对象内容发生变化时，`useRef` 并不会通知。变更 `.current` 属性不会引发组件重新渲染。如果想要在 React 绑定或解绑 DOM 节点的 `ref` 时运行某些代码，则需要使用回调 `ref` 来实现。

```js
function MeasureExample() {
  const [height, setHeight] = useState(0)

  /* 注意：useCallback 的依赖项数组为空数组 [] ,确保了 ref callback 不会在再次渲染时改变，当且仅当组件挂载和卸载时，callback ref 才会被调用 */
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  )
}
```

`useRef` 底层逻辑与 `React.createRef` 类似，但是 `ref` 保存位置不同。

- 类组件有一个实例 `instance` 能够维护 ref 等相关信息
- 函数组件每次更新都是重新执行，所有变量都会重新声明，无法像 `React.createRef` 将 `ref` 对象直接暴露出去，`ref` 随着函数组件执行被重置。Hooks 和函数组件对应 `fiber` 对象建立联系，将 `useRef` 产生的 `ref` 对象挂载到函数组件对应的 `fiber` 上，函数组件每次执行，只要组件不被销毁，函数组件对应的 `fiber` 对象就一直存在，对应的 `ref` 等相关信息也被保存下来了。

## 获取 Ref

### Ref 属性为字符串

使用字符串 Ref 标记 DOM 元素或类组件（函数组件没有实例，不能被 Ref 标记）：

- DOM 元素：会将真实 DOM 绑定在 `this.refs` （组件实例下的 refs）属性上
- 类组件：会将子组件的实例绑定在 `this.refs` 上

```jsx
class Child extends React.Component {
  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        <div>【Child】</div>
        <div>Hello World ！</div>
      </div>
    )
  }
}

class Parent extends React.Component {
  componentDidMount() {
    console.log('currentDOMRef', this.refs.currentDOMRef)
    // 输出为 currentDOMRef :  <div>Parent】</div>
    console.log('currentChildCompRef', this.refs.currentChildCompRef)
    // 输出为 currentChildCompRef :  Child {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternals: FiberNode, …}
  }

  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        {/* Ref 属性为 字符串 */}
        <div ref="currentDOMRef">【Parent】</div>
        <Child ref="currentChildCompRef" />
      </div>
    )
  }
}
```

### Ref 属性为函数

使用函数 Ref 标记 DOM 元素或类组件时（函数组件没有实例，不能被 Ref 标记），将作为 callback 形式，等到真实 DOM 创建，执行 callback，获取到 DOM 元素或者组件实例。

```jsx
class Child extends React.Component {
  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        <div>【Child】</div>
        <div>Hello World ！</div>
      </div>
    )
  }
}

class Parent extends React.Component {
  currentDOMRef = null
  currentChildCompRef = null

  componentDidMount() {
    console.log('currentDOMRef : ', this.currentDOMRef)
    // 输出为 currentDOMRef :  <div>【Parent】</div>
    console.log('currentChildCompRef : ', this.currentChildCompRef)
    // 输出为 currentChildCompRef :  Child {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternals: FiberNode, …}
  }

  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        {/* Ref 属性为 函数 */}
        <div ref={node => (this.currentDOMRef = node)}>【Parent】</div>
        <Child ref={node => (this.currentChildCompRef = node)} />
      </div>
    )
  }
}
```

### Ref 属性为 ref 对象

`React.createRef` 创建一个能够通过 ref 属性附加到 React 元素的 ref。

```js
class Child extends React.Component {
  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        <div>【Child】</div>
        <div>Hello World ！</div>
      </div>
    )
  }
}

class Parent extends React.Component {
  currentDOMRef = React.createRef(null)
  currentChildCompRef = React.createRef(null)

  componentDidMount() {
    console.log('currentDOMRef : ', this.currentDOMRef)
    // 输出为 currentDOMRef :  <div>>【Parent】</div>
    console.log('currentChildCompRef : ', this.currentChildCompRef)
    // 输出为 currentChildCompRef :  Child {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternals: FiberNode, …}
  }

  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        {/* Ref 属性为 ref 对象 */}
        <div ref={this.currentDOMRef}>【Parent】</div>
        <Child ref={this.currentChildCompRef} />
      </div>
    )
  }
}
```

## React.forwardRef 转发 Ref

`React.forwardRef` 会创建一个 React 组件，这个组件能够将其接受的 `ref` 属性转发到其组件树下的另一个组件中。

`React.forwardRef` 接受渲染函数作为参数。React 将使用 `props` 和 `ref` 作为参数来调用此函数，并返回 React 节点。

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
))

function ExampleComponent() {
  // 当 React 附加了 ref 属性之后，ref.current 将直接指向 <button> DOM 元素实例
  const ref = useRef()

  useEffect(() => {
    console.log('ref : ', ref)
    // 输出为 ref : {current: button.FancyButton}
  }, [])

  return (
    <>
      <FancyButton ref={ref}>Click me!</FancyButton>
    </>
  )
}
```

### 跨层级获取 DOM 或组件实例

```js
function GrandChild(props) {
  const { childForwardRef } = props
  return (
    <div>
      <span ref={childForwardRef}>需要获取 GrandChild 的 DOM 元素</span>
    </div>
  )
}

function Child(props) {
  const { childForwardRef } = props
  return (
    <div>
      <GrandChild childForwardRef={childForwardRef} />
    </div>
  )
}

const ForwardChild = React.forwardRef((props, ref) => (
  <Child childForwardRef={ref} {...props} />
))

function Parent() {
  const ref = useRef(null)

  useEffect(() => {
    console.log('获取 GrandChild 组件 DOM 元素 ref : ', ref)
  }, [])

  return <ForwardChild ref={ref} />
}
```

### 合并转发 Ref

```js
class GrandChild extends React.Component {
  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        【GrandChild Component】
      </div>
    )
  }
}

class Child extends React.Component {
  constructor(props) {
    super(props)
  }

  grandChildInstance = null
  buttonDOM = null

  componentDidMount() {
    const { childForwardRef } = this.props
    childForwardRef.current = {
      childInstance: this, // 将 Child 组件实例，绑定到 ref childInstance 属性上
      buttonDOM: this.buttonDOM, // 将 Button DOM 元素，绑定到 ref buttonDOM 属性上
      grandChildInstance: this.grandChildInstance, // 将 GrandChild 组件实例，绑定到 ref grandChildInstance 属性上
    }
  }

  render() {
    return (
      <div style={{ padding: '10px', border: '1px solid #000' }}>
        <div>【Child Component】</div>
        <button ref={node => (this.buttonDOM = node)}>Button</button>
        <GrandChild ref={instance => (this.grandChildInstance = instance)} />
      </div>
    )
  }
}

const ForwardChild = React.forwardRef((props, ref) => (
  <Child childForwardRef={ref} {...props} />
))

function Parent() {
  const ref = useRef()

  useEffect(() => {
    console.log('合并转发 ref : ', ref)
    // 输出如下：
    // {current: {…}}
    //   current:
    //     buttonDOM: button
    //     childInstance: Child {props: {…}, context: {…}, refs: {…}, updater: {…}, grandChildInstance: GrandChild, …}
    //     grandChildInstance: GrandChild {props: {…}, context: {…}, refs: {…}, updater: {…}, _reactInternals: FiberNode, …}
    //     [[Prototype]]: Object
    //   [[Prototype]]: Object
  }, [])

  return (
    <div>
      <div>【Parent Component】</div>
      <ForwardChild ref={ref} />
    </div>
  )
}
```

### 高阶组件转发

如果通过高阶组件包裹一个原始类组件，高阶组件 HOC 没有处理 `ref`，那么由于高阶组件本身会返回一个新组件。所以，当使用 HOC 包装后组件的时候，标记的 `ref` 会指向 HOC 返回的组件，并不是 HOC 包裹的原始类组件，为了解决这个问题，`forwardRef` 可以对 HOC 做一层处理，就可以正常访问到原始类组件实例了。

```js
function HOC(Component) {
  class Wrap extends React.Component {
    render() {
      const { forwardedRef, ...otherProps } = this.props
      return <Component ref={forwardedRef} {...otherProps} />
    }
  }
  return React.forwardRef((props, ref) => (
    <Wrap forwardedRef={ref} {...props} />
  ))
}

class Index extends React.Component {
  render() {
    return <div>hello,world</div>
  }
}
const HocIndex = HOC(Index)

function ExampleComponent() {
  const node = useRef(null)
  useEffect(() => {
    console.log(node.current) /* Index 组件实例  */
  }, [])

  return (
    <div>
      <HocIndex ref={node} />
    </div>
  )
}
```

## Ref 实现组件通信

### 类组件 Ref

父子组件交互流程：

- 子组件暴露方法供父组件使用，父组件通过调用方法可以设置子组件展示内容。
- 父组件提供给子组件方法，供子组件调用，改变父组件展示内容，实现父子双向通信。

```js
class Child extends React.PureComponent {
  state = {
    parentMessage: '',
    childMessage: '',
  }

  /* 提供给父组件调用的 API */
  changeMessage = parentMessage => this.setState({ parentMessage })

  render() {
    const { parentMessage, childMessage } = this.state
    return (
      <div style={{ margin: '10px 0', padding: '10px', border: '1px solid' }}>
        <div>【Child Component】</div>
        <p>父组件传值为 : {parentMessage}</p>
        <div>
          <label>对父组件传值 : </label>
          <input
            onChange={e => this.setState({ childMessage: e.target.value })}
          />
          <button onClick={() => this.props.toFather(childMessage)}>
            to father
          </button>
        </div>
      </div>
    )
  }
}

function Parent() {
  const [childMessage, setChildMessage] = React.useState('')
  const [parentMessage, setParentMessage] = React.useState('')
  const childInstance = React.useRef(null) /* 获取子组件实例 */

  /* 调用子组件实例方法，改变子组件 state */
  const toChild = () => childInstance.current.changeMessage(parentMessage)

  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <div>【Parent Component】</div>
      <p>子组件传值为 : {childMessage}</p>
      <div>
        <label>对子组件传值 : </label>
        <input onChange={e => setParentMessage(e.target.value)} />
        <button onClick={toChild}>to child</button>
      </div>

      <Child ref={childInstance} toFather={setChildMessage} />
    </div>
  )
}
```

### 函数组件 forwardRef + useImperativeHandle

`useImperativeHandle(ref, createHandle, [deps])` 可以在使用 `ref` 时，自定义暴露给父组件的实例值。

- `ref` 参数：接受 `forwardRef` 传递的 `ref`
- `createHandle` 参数：处理函数，返回值作为暴露给父组件的 `ref` 对象
- `[deps]` 参数：依赖项数组 deps，依赖项更改形成新的 `ref` 对象

在大多数情况下，应当避免使用 `ref` 这样的命令式代码，`useImperativeHandle` 应当与 `forwardRef` 一起使用。

父子组件交互流程：

- 父组件使用 ref 标记子组件，由于子组件是函数组件没有实例，所以使用 `forwardRef` 转发 `ref`。
- 子组件使用 `useImperativeHandle` 接受父组件 `ref`，并将 `createHandle` 处理函数传递给 `ref`。
- 父组件可以调用 `ref` 下的处理函数控制子组件。

```jsx
function Child(props, ref) {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState('')

  useImperativeHandle(
    ref,
    () => {
      const handleRefs = {
        /* 声明方法用于聚焦 input 框 */
        onFocus() {
          inputRef.current.focus()
        },
        /* 声明方法用于改变 input 输入框的值 */
        onChangeValue(value) {
          setInputValue(value)
        },
      }
      return handleRefs
    },
    []
  )

  return (
    <div style={{ margin: '10px 0', padding: '10px', border: '1px solid' }}>
      <div>【Child Component】</div>
      <input placeholder="请输入内容" ref={inputRef} value={inputValue} />
    </div>
  )
}

const ForwardChild = React.forwardRef(Child)

function Parent() {
  const childInstance = useRef(null) /* 获取子组件实例 */

  const handleClick = () => {
    const { onFocus, onChangeValue } = childInstance.current
    onFocus() // 通过子组件提供 onFocus 方法，使子组件的输入框获取焦点
    onChangeValue('input value!') // 通过子组件提供 onChangeValue 方法，修改子组件输入框的值
  }

  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <div>【Parent Component】</div>
      <button onClick={handleClick}> 控制子组件 </button>

      <ForwardChild ref={childInstance} />
    </div>
  )
}
```

## 函数组件使用 Ref 缓存数据

函数组件每一次 render，函数上下文会重新执行。如果视图层更新不依赖改变的数据，那么改变 state 带来的更新会造成不必要的性能浪费，则可以是使用 `useRef`。

`useRef` 可以创建出一个 `ref` 原始对象，只要组件没有销毁，`ref` 对象就一直存在，可以把一些不依赖于视图更新的数据储存到 `ref` 对象中。

- 能够直接修改数据，不会造成函数组件冗余的更新作用。
- `useRef` 保存数据，如果有 `useEffect` 、 `useMemo` 引用 `ref` 对象中的数据，无须将 `ref` 对象添加成 `deps` 依赖项，因为 `useRef` 始终指向一个内存空间，可以随时访问到变化后的值。

```js
// 1、使用 useRef 保存 language 的信息，language 改变不需要视图变化
// 2、改变 useRef 内容，useEffect 里面可以直接访问到改变后的 languageInfo 的内容，不需要添加依赖项

const languageList = [
  { type: 1, title: 'JavaScript' },
  { type: 2, title: 'Java' },
]

function ExampleComponent({ id }) {
  const languageInfo = React.useRef(languageList[0])

  /* languageInfo 的改变，不需要视图变化 */
  const changeLanguageInfo = info => {
    languageInfo.current = info
  }

  useEffect(() => {
    if (languageInfo.current.type === 1) {
      /* do something ... */
    }
  }, [id]) /* 无须将 languageInfo 添加依赖项  */

  return (
    <div>
      {languageList.map(item => (
        <div key={item.type} onClick={changeLanguageInfo.bind(null, item)}>
          {item.title}
        </div>
      ))}
    </div>
  )
}
```
