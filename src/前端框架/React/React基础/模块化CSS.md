# 模块化 CSS

在样式开发过程中，存在以下问题：

- 全局污染

  CSS 使用全局选择器机制来设置样式，优点是方便重写样式。缺点是所有的样式都是全局生效，样式可能被错误覆盖，为了提高样式权重会应用 `!important` 、 `行内样式` 或者 复杂的选择器权重进行处理。Web Components 标准中的 `Shadow DOM` 能彻底解决这个问题，但它的做法有点极端，样式彻底局部化，造成外部无法重写样式，损失了灵活性。

- 命名混乱

  多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一。样式变多后，命名将更加混乱。

- 依赖管理不彻底

  组件应该相互独立，引入一个组件时，应该只引入它所需要的 CSS 样式。Saas/Less 很难实现对每个组件都编译出单独的 CSS，引入所有模块的 CSS 又造成浪费。使用 JS 的模块化来管理 CSS 依赖是很好的解决办法，Webpack 的 `css-loader` 提供了这种能力。

- 无法共享变量

  复杂组件要使用 JS 和 CSS 来共同处理样式，就会造成有些变量在 JS 和 CSS 中冗余，Sass/PostCSS/CSS 等都不提供跨 JS 和 CSS 共享变量这种能力。

- 代码压缩不彻底

为了解决如上问题， CSS 模块化应运而生。对于 React 使用 CSS 模块化主要有两种方式：

- `CSS Modules` ：依赖于 webpack 构建和 `css-loader` 等 loader 处理，将 css 交给 js 来动态加载。对每个类名（非 `:global` 声明的）按照一定规则进行转换，保证它的唯一性。
- `CSS IN JS` ：用 JavaScript 对象方式编写 CSS 。

## CSS Modules

CSS Modules ，使得项目中可以像加载 js 模块一样加载 css ，本质上通过一定自定义的命名规则生成唯一性的 css 类名，从根本上解决 css 全局污染，样式覆盖的问题。

```js
// webpack.config.js
// webpack 使用 css-loader 启用 CSS 模块
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i, // 匹配 .css 资源
        use: ['css-loader?modules'],
      },
    ],
  },
}
```

```css
/* index.module.css */
.text_color {
  color: blue;
}
```

```js
// index.jsx
import styles from './index.module.css'

function CSSModules() {
  return <div className={styles.text_color}> CSS Modules</div>
}
```

```html
<div class="src-components-CSSModules-index-module__text_color--bdxf5">CSS Modules</div>
```

### 自定义命名规则

```js
// webpack 使用 css-loader 处理 CSS Modules 的基础配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i, // 匹配 .css 资源
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 自定义类名命名规则
                // > 开发环境使用  [path][name]__[local]
                // > 生产环境使用  [hash:base64]
                localIdentName: '[path][name]__[local]--[hash:base64:5]',

                // 其他配置项如下：
                // mode: 'local', // 控制应用于输入样式的编译级别
                // auto: true, // 当 modules 配置项为对象时允许基于文件名自动启用 CSS 模块或者 ICSS
                // exportGlobals: true, // 允许 css-loader 从全局类或 ID 导出名称
                // localIdentName: '[path][name]__[local]--[hash:base64:5]', // 允许配置生成的本地标识符(ident)
                // localIdentContext: path.resolve(__dirname, 'src'), // 允许为本地标识符名称重新定义基本的 loader 上下文
                // localIdentHashSalt: 'my-custom-hash', // 允许添加自定义哈希值以生成更多唯一类
                // namedExport: true, // 本地环境启用 / 禁用 export 的 ES 模块
                // exportLocalsConvention: 'camelCase', // 导出的类名称的样式
                // exportOnlyLocals: false, // 仅导出局部环境
              },
            },
          },
        ],
      },
    ],
  },
}
```

### 局部作用域

CSS 的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。

CSS Modules 的做法是产生局部作用域的唯一方法，就是使用一个独一无二的 class 的名字，不会与其他选择器重名。

```css
/* index.module.css */
.text_color {
  color: blue;
}
/* ===== 等价于 ===== */
:local(.color) {
  color: blue;
}
```

```js
// index.jsx
import styles from './index.module.css'

function CSSModules() {
  return <div className={styles.text_color}> CSS Modules</div>
}
```

```html
<div class="src-components-CSSModules-index-module__text_color--bdxf5">CSS Modules</div>
```

### 全局作用域

CSS Modules 允许使用 `:global(.className)` 的语法，声明一个全局规则。凡是这样声明的 class，都不会被编译成哈希字符串。

```css
/* index.module.css */
:global(.text_color) {
  color: #008000;
}

.text_color {
  color: blue;
}

.text_bg {
  background-color: red;
}
```

```js
// index.jsx
import styles from './index.module.css'

function CSSModules() {
  return (
    <div>
      {/* 全局作用域样式，直接使用样式名 */}
      <div className="text_color"> CSS Modules - :global(.className) </div>
      <div className={'text_color ' + styles.text_color}> CSS Modules</div>
    </div>
  )
}
```

```html
<div>
  <div class="text_color src-components-CSSModules-index-module__text_color--bdxf5">CSS Modules</div>
  <div class="text_color">CSS Modules - :global(.className)</div>
</div>
```

### 组合样式

在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，称为 `组合（composition）`。

```css
/* index.module.css */
.text_bg {
  background-color: red;
}

.plain_text {
  /* 继承其他模块中对应样式的规则 */
  composes: other_text_color from './other.modules.css';
  /* 继承本模块中 .text_bg 样式的规则 */
  composes: text_bg;
}

/* other.module.css */
.other_text_color {
  color: yellow;
}
```

```js
// index.jsx
import styles from './index.module.css'

function CSSModules() {
  return <div className={styles.plain_text}> CSS Modules - composes </div>
}
```

### 使用变量

```css
/* color.module.css */
@value blue: #0c77f8;
@value red: #ff0000;
@value green: #aaf200;

/* index.module.css */
@value colors: "./colors.css";
@value blue, red, green from colors;

.plain_text {
  color: red;
  background-color: blue;
}
```

```js
// index.jsx
import styles from './index.module.css'

function CSSModules() {
  return <div className={styles.plain_text}> CSS Modules - 使用变量 </div>
}
```

### 配置 less 和 sass

```js
// webpack 使用 css-loader 处理 CSS Modules 的基础配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i, // 匹配 .css 资源
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                // 自定义类名命名规则
                // > 开发环境使用  [path][name]__[local]
                // > 生产环境使用  [hash:base64]
                localIdentName: '[path][name]__[local]--[hash:base64:5]',

                // 其他配置项如下：
                // mode: 'local', // 控制应用于输入样式的编译级别
                // auto: true, // 当 modules 配置项为对象时允许基于文件名自动启用 CSS 模块或者 ICSS
                // exportGlobals: true, // 允许 css-loader 从全局类或 ID 导出名称
                // localIdentName: '[path][name]__[local]--[hash:base64:5]', // 允许配置生成的本地标识符(ident)
                // localIdentContext: path.resolve(__dirname, 'src'), // 允许为本地标识符名称重新定义基本的 loader 上下文
                // localIdentHashSalt: 'my-custom-hash', // 允许添加自定义哈希值以生成更多唯一类
                // namedExport: true, // 本地环境启用 / 禁用 export 的 ES 模块
                // exportLocalsConvention: 'camelCase', // 导出的类名称的样式
                // exportOnlyLocals: false, // 仅导出局部环境
              },
            },
          },
          {
            // ... 使用其他 loader
          },
          'less-loader',
        ],
      },
    ],
  },
}
```

### 组合方案

React 项目可能在使用 CSS 处理样式之外，还可以使用 scss 或者 less 进行预处理。

- 可以约定对于全局样式或者是公共组件样式，可以使用 `.css` 文件 ，不需要做 CSS Modules 处理，这样就不需要写 `:global` 等繁琐语法。
- 对于项目中开发的页面和业务组件，统一用 scss 或者 less 等做 CSS Module，即 CSS 全局样式 + less / scss CSS Modules 方案。

### 动态添加 class

CSS Modules 可以配合 `classNames 库` 实现更灵活的动态添加类名。

```css
/* index.module.css */
.plain_text {
  font-size: 16px;
}

.dark {
  color: #fff;
  background: #000;
}

.light {
  color: #000;
  background: #fff;
}
```

```js
import classnames from 'classnames'
import styles from './index.module.css'

function CSSModules() {
  const [theme, setTheme] = React.useState('light')

  const changeTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div>
      <div
        className={classnames(
          styles.plain_text,
          theme === 'light' ? styles.light : styles.dark
        )}
      >
        CSS Modules - classnames 动态添加 class
      </div>
      <button onClick={changeTheme}>切换主题</button>
    </div>
  )
}
```

### 使用技巧

CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：

- 不使用选择器，只使用 `class` 名来定义样式
- 不层叠多个 `class`，只使用一个 `class` 把所有样式定义好
- 所有样式通过 `composes` 组合来实现复用
- 不嵌套

## CSS-in-JS

CSS-in-JS 的实现原理，以 styled-components 为例：

- 通过 styled-components，可以使用 ES6 的标签模板字符串语法（Tagged Templates）为需要 styled 的 Component 定义一系列 CSS 属性。
- 当该组件的 JS 代码被解析执行的时候，styled-components 会动态生成一个 CSS 选择器，并把对应的 CSS 样式通过 style 标签的形式插入到 head 标签里面。
- 动态生成的 CSS 选择器会有一小段哈希值来保证全局唯一性来避免样式发生冲突。
- 这种模式下，本质上是动态生成 style 标签。

CSS-in-JS 特点:

- CSS-in-JS 本质上放弃了 css ，变成了 css in line 形式，所以根本上解决了全局污染，样式混乱等问题。
- 运用起来灵活，可以运用 js 特性，更灵活地实现样式继承，动态添加样式等场景。
- 由于编译器对 js 模块化支持度更高，使得可以在项目中更快地找到 style.js 样式文件，以及快捷引入文件中的样式常量。
- 无须 webpack 额外配置 css，less 等文件类型。

### styled-components

#### 基础用法

```js
import styled from 'styled-components'

const Button = styled.button`
  background: #6a8bad;
  color: #fff;
  min-width: 96px;
  height: 36px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 20px !important;
`
export default function CSSINJS() {
  return (
    <div>
      <Button>CSS-in-JS</Button>
    </div>
  )
}
```

#### 基于 props 动态添加样式

```js
import styled from 'styled-components'

const Button = styled.button`
  background: ${props => (props.theme ? props.theme : '#6a8bad')};
  color: #fff;
  min-width: 96px;
  height: 36px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 20px !important;
`
export default function CSSINJS() {
  return (
    <div>
      <Button theme={'#fc4838'}>props主题按钮</Button>
    </div>
  )
}
```

#### 继承样式

```js
const Button = styled.button`
  background: #6a8bad;
  color: #fff;
  min-width: 96px;
  height: 36px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 20px !important;
`

const NewButton = styled(Button)`
  background: #fc4838;
  color: white;
`

export default function CSSINJS() {
  return (
    <div>
      <NewButton> 继承按钮</NewButton>
    </div>
  )
}
```
