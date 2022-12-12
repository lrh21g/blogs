# Context

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。例如：首选语言，UI 主题等。

## React.createContext

```js
const MyContext = React.createContext(defaultValue)
```

创建一个 `Context` 对象。接受一个 `defaultValue` 参数，作为默认值。

- 当 React 渲染一个订阅了这个 Context 对象的组件，该组件会从组件树中匹配最近的 `Provider` ，并从中读取到当前的 `context` 值。
- 只有当组件所处的组件树中，没有匹配到 `Provider` 时，其 `defaultValue` 参数才会生效。

  注意：将 `undefined` 传递给 `Provider` 的 `value` 时，消费组件的 `defaultValue` 不会生效。

```js
const ThemeContext = React.createContext(defaultValue) // 创建一个主题 Context
const ThemeProvider = ThemeContext.Provider // 主题 - 提供者
const ThemeConsumer = ThemeContext.Consumer // 订阅主题 - 消费者
```

## 提供者 Context.Provider

```js
<MyContext.Provider value={/* 某个值 */}>
```

每个 `Context` 对象都会返回一个 `Provider` React 组件，它允许消费组件订阅 `context` 的变化。

- `Provider` 接收一个 `value` 属性，传递给消费组件。
- 一个 `Provider` 可以和多个消费组件有对应关系。
- 多个 `Provider` 也可以嵌套使用，里层的会覆盖外层的数据。

当 `Provider` 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。

从 `Provider` 到其内部 `consumer` 组件（包括 `.contextType` 和 `useContext`）的传播不受制于 `shouldComponentUpdate` 函数，因此当 `consumer` 组件在其祖先组件跳过更新的情况下也能更新。

当传递对象给 `Provider` 的 `value` 时，通过新旧值检测（浅比较）来确定变化，使用了与 `Object.is` 相同的算法。为了防止当 `Provider` 的父组件进行重渲染时，可能会在 `consumers` 组件中触发意外的渲染，可以将 `value` 状态提升到父节点的 `state` 里。

```js
const ThemeContext = React.createContext(null) // 创建一个主题 Context

export default function Parent() {
  const [contextValue, setContextValue] = useState({
    color: '#000',
    background: '#fff',
  })

  return (
    <div>
      <ThemeContext.Provider value={contextValue}>
        <Child />
      </ThemeContext.Provider>
    </div>
  )
}
```

## 消费者

### 类组件 Class.contextType 方式

挂载在 `class` 上的 `contextType` 属性，可以赋值为由 `React.createContext()` 创建的 `Context` 对象，这样就可以通过 `this.context` 获取从组件树中匹配最近的 `<MyContext.Provider>` 提供的 Context `value` 值。

- `Class.contextType` 只能订阅单一的 `context`。
- `Class.contextType` 只适用于类组件。

```js
class ExampleComponent extends React.Component {
  componentDidMount() {
    let value = this.context
    /* 在组件挂载完成后，使用 ExampleContext 组件的值来执行一些有副作用的操作 */
    /* do something ... */
  }
  componentDidUpdate() {
    let contextValue = this.context
  }
  componentWillUnmount() {
    let contextValue = this.context
  }
  render() {
    let contextValue = this.context
    /* 基于 ExampleContext 组件的值进行渲染 */
    /* do something ... */
  }
}
ExampleComponent.contextType = ExampleContext
```

```js
// 实验性的 public class fields 语法

class ExampleComponent extends React.Component {
  static contextType = ExampleContext

  render() {
    let contextValue = this.context
    /* 基于 ExampleContext 组件的值进行渲染 */
    /* do something ... */
  }
}
```

### 函数组件 useContext 方式

```js
const value = useContext(MyContext)
```

接收一个 `context` 对象（`React.createContext` 的返回值）并返回该 `context` 的当前值。当前的 `context` 值由上层组件中距离当前组件最近的 `<MyContext.Provider>` 的 `value` prop 决定。

当组件上层最近的 `<MyContext.Provider>` 更新时，该 Hook 会触发重渲染，并使用最新传递给 `MyContext` provider 的 context `value` 值。即使祖先使用 `React.memo` 或 `shouldComponentUpdate`，也会在组件本身使用 `useContext` 时重新渲染。

```js
function Button() {
  let theme = useContext(ThemeContext)

  return <ExpensiveTree className={theme} />
}

/**
 * 调用了 useContext 的组件，会在 context 值变化时重新渲染，通过使用 memoization 来优化。
 * 因为某些原因你不能拆分上下文，可以通过将一个组件一分为二来优化渲染。
 */

function Button() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme

  return <ThemedButton theme={theme} />
}

const ThemedButton = memo(({ theme }) => {
  return <ExpensiveTree className={theme} />
})

/**
 * 调用了 useContext 的组件，会在 context 值变化时重新渲染，通过使用 memoization 来优化。
 * 通过将返回值包裹在 useMemo 中并指定其依赖关系，将其保留在一个组件中。
 */

function Button() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme

  return useMemo(() => {
    return <ExpensiveTree className={theme} />
  }, [theme])
}
```

### 订阅者 Context.Consumer 方式

```js
const MyContext = React.createContext(null)

export default function () {
  return (
    <MyContext.Consumer>
      {/* 将 contextValue 内容转化成 props  */}
      {contextValue => <ConsumerComponent {...contextValue} />}
    </MyContext.Consumer>
  )
}
```

`Context.Consumer` 方式采取 render props 函数方式。

- 接收组件树中匹配最近的 `<MyContext.Provider>` 提供的 Context `value` 值，作为 render props 函数的参数。
- 将接受的参数取出，作为函数返回的 React 节点的 `props` 传入。

## 其他

### Context.displayName

`context` 对象接受一个名为 `displayName` 的 property，类型为字符串。React DevTools 使用该字符串来确定 `context` 要显示的内容。

```js
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

## Context 高级用法

### 动态 Context

```js
export const themes = {
  light: { color: '#000', background: '#eee' },
  dark: { color: '#fff', background: '#222' },
}

export const ThemeContext = React.createContext(themes.dark)

function Child() {
  const { color, background } = React.useContext(ThemeContext)

  return useMemo(() => {
    return (
      <div style={{ margin: '10px 0', padding: '10px', border: '1px solid' }}>
        <div>【Child】</div>
        <div style={{ color, background }}>消费者</div>
      </div>
    )
  })
}

function Parent() {
  const [themeContextValue, setThemeContextValue] = useState(themes.light)

  const changeTheme = () => {
    const theme = themeContextValue === themes.dark ? themes.light : themes.dark
    setThemeContextValue(theme)
  }

  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <div>【Parent】</div>
      <button onClick={changeTheme}>切换主题</button>

      <ThemeContext.Provider value={themeContextValue}>
        <Child />
      </ThemeContext.Provider>
    </div>
  )
}
```

### 嵌套 Provider

多个 `Provider` 之间可以相互嵌套，来保存/切换一些全局数据。

```js
export const themes = {
  light: { color: '#000', background: '#eee' },
  dark: { color: '#fff', background: '#222' },
}

export const languages = {
  chinese: 'CH',
  english: 'EN',
}

export const ThemeContext = React.createContext(themes.light) // 主题 Context
export const LanguageContext = React.createContext(languages.chinese) // 语言 Context

function Child() {
  return (
    <div style={{ margin: '10px 0', padding: '10px', border: '1px solid' }}>
      <div>【Child】</div>
      <ThemeContext.Consumer>
        {themeContextValue => (
          <LanguageContext.Consumer>
            {languageContextValue => {
              const { color, background } = themeContextValue
              return (
                <div style={{ color, background }}>
                  {languageContextValue === languages.chinese
                    ? '你好，世界！'
                    : 'Hello, World!'}
                </div>
              )
            }}
          </LanguageContext.Consumer>
        )}
      </ThemeContext.Consumer>
    </div>
  )
}

function Parent() {
  const [themeContextValue, setThemeContextValue] = React.useState(themes.light)
  const [languageContextValue, setLanguageContextValue] = React.useState(
    languages.chinese
  )

  const changeTheme = () => {
    const theme = themeContextValue === themes.dark ? themes.light : themes.dark
    setThemeContextValue(theme)
  }

  const changeLanguage = () => {
    const language =
      languageContextValue === languages.chinese
        ? languages.english
        : languages.chinese
    setLanguageContextValue(language)
  }

  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <div>【Parent】</div>

      <button onClick={changeTheme}>切换主题</button>
      <button onClick={changeLanguage}>切换语言</button>

      <ThemeContext.Provider value={themeContextValue}>
        <LanguageContext.Provider value={languageContextValue}>
          <Child />
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </div>
  )
}
```

### 逐层传递 Provider

- `Provider` 可以逐层传递 `context` ，即一个 `context` 可以用多个 `Provder` 传递。
- 组件获取 `context` 时，会获取离当前组件最近的上一层 `Provider` 。
- 下一层级的 `Provder` 会覆盖上一层级的 `Provder` 。

```js
export const themes = {
  light: { color: '#000', background: '#eee' },
  dark: { color: '#fff', background: '#222' },
}

export const ThemeContext = React.createContext(themes.light) // 主题 Context

function GrandChild() {
  return (
    <div style={{ margin: '10px 0', padding: '10px', border: '1px solid' }}>
      <div>【GrandChild】</div>
      <ThemeContext.Consumer>
        {childThemeContextValue => {
          const { color, background } = childThemeContextValue
          return (
            <div className="sonbox" style={{ color, background }}>
              第二层 Provider 消费者
            </div>
          )
        }}
      </ThemeContext.Consumer>
    </div>
  )
}

function Child() {
  const { color, background } = useContext(ThemeContext)

  const [childThemeContextValue, setChildThemeContextValue] = useState(
    themes.dark
  )

  const changeTheme = () => {
    const theme =
      childThemeContextValue === themes.dark ? themes.light : themes.dark
    setChildThemeContextValue(theme)
  }

  return (
    <div style={{ margin: '10px 0', padding: '10px', border: '1px solid' }}>
      <div>【Child】</div>
      <div style={{ color, background }}>
        <div>第一层 Provider 消费者</div>
        <button onClick={changeTheme}>切换主题</button>

        <ThemeContext.Provider value={childThemeContextValue}>
          <GrandChild />
        </ThemeContext.Provider>
      </div>
    </div>
  )
}

function Parent() {
  const [themeContextValue, setThemeContextValue] = useState(themes.light)

  const changeTheme = () => {
    const theme = themeContextValue === themes.dark ? themes.light : themes.dark
    setThemeContextValue(theme)
  }

  return (
    <div style={{ padding: '10px', border: '1px solid' }}>
      <div>【Parent】</div>

      <button onClick={changeTheme}>切换主题</button>

      <ThemeContext.Provider value={themeContextValue}>
        <Child />
      </ThemeContext.Provider>
    </div>
  )
}
```
