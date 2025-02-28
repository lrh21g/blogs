# Web Components

Web Components 由自定义元素（Custom element）、影子 DOM （Shadow DOM）、HTML 模板（HTML template）三个技术组成，它们可以一起使用来创建独立的可重用组件。

- 自定义元素（Custom element）：一组 JavaScript API，允许自定义元素以及其行为，可在用户界面中按需使用。
- 影子 DOM （Shadow DOM）：一组 JavaScript API，用于将封装的 “影子” DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。可以保持元素功能私有，可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
- HTML 模板（HTML template）：`<template>` 和 `<slot>` 元素可以编写不在呈现页面中显示的标记模板，可以作为自定义元素结构的基础被多次重用。

实现 Web Components 的基本方法：

- 创建一个类或函数指定 web 组件的功能。
- 使用 `CustomElementRegistry.define()` 方法注册新的自定义元素，并向其传递要定义的元素名称、指定元素功能的类、以及可选的其所继承自的元素。
- 如果需要的话，使用 `Element.attachShadow()` 方法将一个 shadow DOM 附加到自定义元素上。使用通常的 DOM 方法向 shadow DOM 中添加子元素、事件监听器等等。
- 如果需要的话，使用 `<template>` 和 `<slot>` 定义一个 HTML 模板。再次使用常规 DOM 方法克隆模板并将其附加到 shadow DOM 中。
- 在页面中，使用常规 HTML 元素那样使用自定义元素。

## 自定义元素（Custom element）

`CustomElementRegistry` 接口提供注册自定义元素和查询已注册元素的方法。`CustomElementRegistry.define()` 方法用于注册一个自定义元素。

- **语法** ： `customElements.define(name, constructor, options)`

- **描述** ： 用于创建自定义元素。

- **参数** ：
  - `name`：自定义元素的名称，必须包含一个连字符（`-`），比如 `my-tag`。
  - `constructor`：自定义元素构造器。在构造函数中必须始终先调用 `super()` 。
  - `options`：可选参数，包含以下属性：
    - `options.extends`：指定继承的内置元素，比如 `{ extends: "button" }`。

`customElements.define()` 方法可以创建以下两种类型：

- 自主定制元素（Autonomous custom elements）：独立元素，不继承任何其他内置 HTML 元素。可以直接写成 HTML 标签的形式。例如：`<popup-info>` / `document.createElement("popup-info")` 。

  ```javascript
  class PopUpInfo extends HTMLElement {
    constructor() {
      // 必须首先调用 super 方法
      super()

      // ...
    }
  }

  customElements.define('popup-info', PopUpInfo)
  ```

- 自定义内置元素（Customized built-in elements）： 继承自基本的 HTML 元素。在创建时，必须指定所需扩展的元素；使用时，需要先写出基本的元素标签，并通过 is 属性指定 custom element 的名称。例如：`<ul is="expanding-list">` / `document.createElement("ul", { is: "expanding-list" })` 。

  ```javascript
  class ExpandingList extends HTMLUListElement {
    constructor() {
      // 必须首先调用 super 方法
      super()

      // ......
    }
  }

  customElements.define('expanding-list', ExpandingList, { extends: 'ul' })
  ```

使用自定义元素生命周期方法：

- `constructor()` ：在创建元素实例或将已有 DOM 元素升级为自定义元素时调用。
- `connectedCallback()` ：在每次将这个自定义元素实例添加到 DOM 中时调用。
- `disconnectedCallback()` ：在每次将这个自定义元素实例从 DOM 中移除时调用。
- `attributeChangedCallback()` ：在每次可观察属性的值发生变化时调用。在元素实例初始化时，初始值的定义也算一次变化。
- `adoptedCallback()` ：在通过 `document.adoptNode()` 将这个自定义元素实例移动到新文档对象时调用。

```javascript
class FooElement extends HTMLElement {
  constructor() {
    super()
    console.log('constructor')
  }
  connectedCallback() {
    console.log('connected')
  }
  disconnectedCallback() {
    console.log('disconnected')
  }
}
```

`CustomElementRegistry` 接口其他实例方法：

- `customElements.get(name)` ：返回指定名字 `name` 的自定义元素的构造函数，如果没有使用该名称的自定义元素定义，则为 `undefined`。
- `customElements.getName(constructor)` ：返回指定构造函数 `constructor` 的自定义元素的名称，如果没有使用该构造函数定义自定义元素，则为 `undefined`。
- `customElements.upgrade(root)` ：更新节点子树中所有包含阴影的自定义元素。
- `customElements.whenDefined(name)` ：当自定义元素以给定名称 `name` 被定义时，自定义元素的构造函数会返回 `Promise`。如果已用该名称 `name` 定义了自定义元素，则 `Promise` 会被立即兑现。

```javascript
customElements.whenDefined('x-foo').then(() => console.log('defined!'))
console.log(customElements.get('x-foo')) // undefined

customElements.define('x-foo', class {}) // defined!

console.log(customElements.get('x-foo')) // class FooElement {}

// 在自定义元素有定义之前会创建 HTMLUnknownElement 对象
const barElement = document.createElement('x-bar')

// 创建自定义元素
class BarElement extends HTMLElement {}
customElements.define('x-bar', BarElement)

console.log(barElement instanceof BarElement) // false

// 强制升级
customElements.upgrade(barElement)
console.log(barElement instanceof BarElement) // true
```

## 影子 DOM （Shadow DOM）

Shadow DOM 允许将隐藏的、独立的 DOM 附加到一个元素上。以 shadow root 节点为起始根节点，在该根节点的下方，可以是任意元素，和普通的 DOM 元素一样。其内部的元素始终不会影响到它外部的元素。

- Shadow host ： 一个常规 DOM 节点，Shadow DOM 会被附加到这个节点上。
- Shadow tree ： Shadow DOM 内部的 DOM 树。
- Shadow boundary ： Shadow DOM 结束的地方，也是常规 DOM 开始的地方。
- Shadow root ： Shadow tree 的根节点。

Shadow DOM 可以使用 `element.attachShadow()` 方法指定的元素挂载一个 Shadow DOM，并且返回对 ShadowRoot 的引用。

- **语法** ： `element.attachShadow(options)`

- **描述** ： 为元素附加一个 Shadow DOM。

- **参数** ：

  - `shadowRootInit`：一个 ShadowRootInit 字典，包括以下字段：
    - `mode`：指定 Shadow DOM 树的封装模式，可选值为 `open` 和 `closed`。默认值为 `open`。
      - `open` ： 可以通过页面内的 JavaScript 方法来获取 Shadow DOM。例如，使用 `element.shadowRoot` 属性。
      - `closed` ：不可以通过页面内的 JavaScript 方法来获取 Shadow DOM。例如，使用 `element.shadowRoot` 返回为 `null` 。
    - `delegatesFocus`： 一个布尔值，当设置为 `true` 时，指定减轻自定义元素的聚焦性能问题行为。 当 shadow DOM 中不可聚焦的部分被点击时，让第一个可聚焦的部分成为焦点，并且 shadow host（影子主机）将提供所有可用的 `:focus` 样式。

```javascript
for (let color of ['red', 'green', 'blue']) {
  const div = document.createElement('div')
  const shadowDOM = div.attachShadow({ mode: 'open' })
  document.body.appendChild(div)
  shadowDOM.innerHTML = `
    <p>Make me ${color}</p>
    <style>
    p {
      color: ${color};
    }
    </style>
  `
}
```

## HTML 模板（HTML template）

使用 `<template>` 和 `<slot>` 元素创建一个可以用来灵活填充 Web 组件的 shadow DOM 的模板。

```html
<html>
  <body>
    <custom-cell>
      <span slot="title">custom-cell title</span>
      <span slot="label">custom-cell label</span>
      <span slot="value">custom-cell value</span>
    </custom-cell>
  </body>

  <template id="custom-cell-template">
    <style>
      .cell {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        padding: 10px;
        overflow: hidden;
        font-size: 14px;
      }
      .title {
        flex: 1;
      }
      .value {
        text-align: right;
        vertical-align: middle;
      }
    </style>
    <div class="cell">
      <div class="title">
        <span><slot name="title">default title</slot></span>
        <div class="label"><slot name="label">default label</slot></div>
      </div>
      <div class="value"><slot name="value">default value</slot></div>
    </div>
  </template>

  <script>
    customElements.define(
      'custom-cell',
      class extends HTMLElement {
        constructor() {
          super()

          // 通过 <template> 元素的 content 属性获取 DocumentFragment 的引用
          var template = document.getElementById('custom-cell-template').content
          // 将一个 Shadow DOM 附加到自定义元素上
          const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true))
        }
      },
    )
  </script>
</html>
```
