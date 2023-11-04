# CSS 操作

## 操作元素节点的 style 属性

操作 HTML 元素的 `style` 属性：

- 使用元素节点的相关方法操作 `style` 属性

  - `element.getAttribute()`

    **语法** ： `element.getAttribute(attributeName)`

    **描述** ： 返回当前元素的 `attributeName` 属性值。

  - `element.setAttribute()`

    **语法** ： `element.setAttribute(attributeName, attributeValue)`

    **描述** ： 设置当前元素的 `attributeName` 属性值为 `attributeValue`。如果已存在，则更新属性值。

  - `element.removeAttribute()`

    **语法** ： `element.removeAttribute(attributeName)`

    **描述** ： 移除当前元素的 `attributeName` 属性。

  ```javascript
  // <div id="divId" style="color: red; font-size: 20px">div content</div>

  let divDOM = document.getElementById('divId')
  divDOM.getAttribute('style') // color: red; font-size: 20px
  divDOM.setAttribute('style', 'color: blue; font-size: 30px')
  ```

- `style` 属性不仅可以使用字符串读写，其本身也是一个对象（`CSSStyleDeclaration` 接口），可以直接读写个别属性

  ```javascript
  // <div id="divId" style="color: red; font-size: 20px">div content</div>

  let divDOM = document.getElementById('divId')
  divDOM.style.color // red
  divDOM.style.fontSize // 20px
  divDOM.style.color = 'blue'
  divDOM.style.fontSize = '30px'
  ```

## CSSStyleDeclaration 接口

`CSSStyleDeclaration` 接口表示一个 CSS 声明块，它是一个 CSS 属性及其值的有序映射表，提供样式信息和各种与样式相关的属性方法和属性。以下 API 返回该接口实例：

- `HTMLElement.style` ，用于操作单个元素节点 `style` 属性。该实例**只返回行内样式**，并不包含外部样式表和嵌入样式表。
- `CSSStyleSheet` 实例，用于操作单个 CSS 规则的 `style` 属性。例如 `document.styleSheets[0].cssRules[0].style` 返回文档中第一个样式表的第一条 CSS 规则。
- `window.getComputedStyle()` 返回值。

`style` 属性的值是一个 `CSSStyleDeclaration` 实例，对象中的属性与 CSS 规则一一对应。

- CSS 属性中的连字符 `-` 需转换为驼峰命名法，例如 `background-color` 转换为 `backgroundColor`。
- 如果 CSS 属性名是 JavaScript 中的保留字，则需在 CSS 属性名前添加 `'css'` 。例如 `float` 转换为 `style['float']`。
- 对象属性值为字符串，设置时需添加单位，例如 `style.width = '100px'`。

### CSSStyleDeclaration 实例属性

- `CSSStyleDeclaration.cssFloat` ：返回 `float` 属性值。如果属性名为 JavaScript 中的保留字，则需使用 `cssFloat` 代替 `float` 。
- `CSSStyleDeclaration.cssText` ：获取或设置 CSS 声明块的文本内容。可以使用 `element.style.cssText = ''` 删除元素的所有行内样式。
- `CSSStyleDeclaration.length` ：返回当前 CSS 声明块中声明的 CSS 属性数量。
- `CSSStyleDeclaration.parentRule` ：返回包含当前 CSS 声明块的 CSS 规则（`CSSRule` 实例）。

### CSSStyleDeclaration 实例方法

- `element.style.getPropertyPriority()`

  **语法** ： `element.style.getPropertyPriority(property)`

  **描述** ： 返回 `property` 属性的优先级。如果存在则返回 `"important"` 否则返回空字符串。

- `element.style.getPropertyValue()`

  **语法** ： `element.style.getPropertyValue(property)`

  **描述** ： 返回 `property` 属性的值。

- `element.style.item()`

  **语法** ： `element.style.item(index)`

  **描述** ： 返回 `index` 位置的 CSS 属性名。
  
  - 如果未提供 `index` ，则会报错。
  - 如果 `index` 超出范围，则返回 `null` 。

- `element.style.removeProperty()`

  **语法** ： `element.style.removeProperty(property)`

  **描述** ： 移除 `property` 属性，并返回移除的属性值。

- `element.style.setProperty()`

  **语法** ： `element.style.setProperty(property, value, priority)`

  **描述** ： 设置 `property` 属性的值为 `value` ，优先级为 `priority` 。`value` 和 `priority` 可选。

## CSS 属性检测

检测浏览器是否支持某个 CSS 属性。

```javascript
function isPropertySupported(property) {
  if (property in document.body.style) return true
  var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml']
  var prefProperty = property.charAt(0).toUpperCase() + property.substr(1)

  for (var i = 0; i < prefixes.length; i++) {
    if (prefixes[i] + prefProperty in document.body.style) return true
  }

  return false
}

isPropertySupported('background-clip')
// true
```

## CSS 接口

CSS 接口是一个工具接口，无法创建该类型的对象，但可以使用它的属性和方法。

- CSS 接口属性

- CSS 接口方法

  - `CSS.escape()`

    **语法** ： `CSS.escape(string)`

    **描述** ： 转义 CSS 选择器中的特殊字符。

    ```javascript
    // <div id="foo#bar">

    // 元素 id 属性中包含了 # 字符，需要转义后，才能通过 document.querySelector 获取元素
    document.querySelector('#' + CSS.escape('foo#bar'))
    // 即： document.querySelector('#foo\\#bar')
    ```
  
  - `CSS.supports()`

    **语法** ： `CSS.supports(property, value)`

    **描述** ： 检测浏览器是否支持某个 CSS 属性。

    ```javascript
    // 第一种写法
    CSS.supports('transform-origin', '5px') // true

    // 第二种写法：不能带有分号，否则结果不准确
    CSS.supports('display: table-cell') // true
    ```

## window.getComputedStyle()

**语法** ： `window.getComputedStyle(element, pseudoElement)`

**描述** ： 返回 `element` 元素的所有 CSS 属性（动态更新的 `CSSStyleDeclaration` 实例）。如果 `pseudoElement` 为 `null` ，则返回元素的所有 CSS 属性，否则返回伪元素的所有 CSS 属性。

- `CSSStyleDeclaration` 实例返回的 CSS 值都是绝对单位。比如，长度是像素单位（返回值包括 `px` 后缀），颜色是 `rgb(#, #, #)`或 `rgba(#, #, #, #)` 格式。
- CSS 规则的简写形式无效。比如，读取 `margin` 属性的值，不能直接读，只能读 `marginLeft` 、 `marginTop` 等属性； `font` 属性也是不能直接读的，只能读 `font-size` 等单个属性。
- 如果读取 CSS 原始的属性名，要用方括号运算符，比如：`styleObj['z-index']`；如果读取骆驼拼写法的 CSS 属性名，可以直接读取 `styleObj.zIndex`。
- 方法返回的 `CSSStyleDeclaration` 实例的 `cssText` 属性无效，返回 `undefined` 。

**参数** ：

- `element` ：必选，要获取样式的元素节点。
- `pseudoElement` ：可选，伪元素（比如 `:before` 、 `:after` 、 `:first-line` 、 `:first-letter` 等）。

```javascript
let div = document.querySelector('div')
let styleObj = window.getComputedStyle(div)
styleObj.backgroundColor
```

## StyleSheet 、 CSSStyleSheet 接口

`StyleSheet` 接口表示一个样式表，包括 `<style>` 元素内嵌样式表、`<link>` 元素外部样式表。

- `document.styleSheets` 返回当前文档中所有 `StyleSheet` 实例（即所有样式表）。
- 如果是 `<style>` 元素内嵌样式表，可以通过获取该元素的 `sheet` 属性获取 `StyleSheet` 实例。

`CSSStyleSheet` 接口表示一个 CSS 样式表，允许检查和编辑样式表中的 CSS 规则。从父类型 `StyleSheet` 继承属性和方法。

### StyleSheet 、 CSSStyleSheet 实例属性

- `StyleSheet.disabled` ：获取或设置样式表是否禁用。手动设置 `disabled` 属性为 `true`，等同于在 `<link>` 元素中设置 `alternate stylesheet`，表示该样式表不会生效。

- `StyleSheet.href` ：只读属性。返回样式表的 URL 地址。对于 `<style>` 元素内嵌样式表返回为 `null` 。

- `StyleSheet.media` ：返回 `MediaList` 实例对象，表示样式表的媒体类型。

- `StyleSheet.title` ：返回样式表的 `title` 标题属性。

- `StyleSheet.type` ：返回样式表的 `type` 类型属性，通常为 `text/css`。

- `StyleSheet.ownerNode` ：返回拥有当前样式表的节点，通常是 `<style>` 或 `<link>`。对于由其他样式表导入的样式表，返回 `null` 。

- `StyleSheet.parentStyleSheet` ：CSS 的 `@import` 命令允许在样式表中加载其他样式表，该属性返回包含当前样式表的样式表（`StyleSheet` 实例）。如果当前样式表是顶层样式表，则返回 `null` 。

- `CSSStyleSheet.cssRules` ：返回样式表的所有 CSS 规则（`CSSRuleList` 实例）。每条规则可以使用其 `cssText` 属性获取对应 CSS 规则的字符串，使用其 `style` 属性可以读写 CSS 规则的样式。

- `CSSStyleSheet.ownerRule` ：返回通过 `@import` 命令引入当前样式表的 CSS 规则（`CSSRule` 实例）。如果当前样式表不是由 `@import` 命令引入的，则返回 `null` 。

### StyleSheet 、 CSSStyleSheet 实例方法

- `CSSStyleSheet.deleteRule()`

  **语法** ： `CSSStyleSheet.deleteRule(index)`

  **描述** ： 删除样式表中指定位置的 CSS 规则。

- `CSSStyleSheet.insertRule()`

  **语法** ： `CSSStyleSheet.insertRule(rule, index)`

  **描述** ： 在样式表中指定位置 `index` （可选，默认值为 `0`）插入 CSS 规则 `rule` ，并返回新插入规则的位置索引。
  
  - 如果插入位置大于现有规则的数目，会报错。
  - 浏览器对脚本在样式表里面插入规则有很多限制，最好放在 `try...catch` 里使用。

- `CSSStyleSheet.replace()`

  **语法** ： `CSSStyleSheet.replace(text)`

  **描述** ： 以异步方式将样式表的内容替换为传入的内容  `text` 。返回一个与 `CSSStyleSheet` 对象解析的 `Promise` 。

- `CSSStyleSheet.replaceSync()`

  **语法** ： `CSSStyleSheet.replaceSync(text)`

  **描述** ： 以同步方式将样式表的内容替换为传入的内容  `text` 。

## CSSRuleList 接口

CSS 规则列表 `CSSRuleList` 是一个只读的类数组对象，包含了 CSS 规则（`CSSRule` 实例）。

- 获取 `CSSRuleList` 实例，一般通过 `StyleSheet.cssRules` 属性获取。
- `CSSRuleList` 实例中，每一条 CSS 规则（`CSSRule` 实例）可以通过 `rules.item(index)` 或 `rules[index]` 获取。
- CSS 规则的条数可以通过 `rules.length` 获取。
- 添加或删除规则不能在 `CSSRuleList` 实例操作，只能在父元素 `StyleSheet` 实例上操作，可以通过 `CSSStyleSheet.insertRule()` 和 `CSSStyleSheet.deleteRule()` 方法。

```javascript
// <style id="myStyle">
//   h1 { color: red; }
//   p { color: blue; }
// </style>

let styleSheet = document.getElementById('myStyle').sheet
var cssRuleList = styleSheet.cssRules
```

## CSSRule 接口

`CSSRule` 接口表示一条 CSS 规则。JavaScript 通过 `CSSRule` 接口操作 CSS 规则，一般通过 `CSSRuleList` 实例（`StyleSheet.cssRules`）获取 `CSSRule` 实例。

```javascript
// <style id="myStyle">
//   .myClass {
//     color: red;
//     background-color: yellow;
//   }
// </style>

let styleSheet = document.getElementById('myStyle').sheet
let cssRuleList = styleSheet.cssRules
let ruleItem = cssRuleList[0]
```

`CSSRule` 实例属性：

- `CSSRule.cssText` ：获取或设置 CSS 规则的文本内容。如果 CSS 规则是通过 `@import` 命令引入的，则返回 `@import 'url'` 。

- `CSSRule.parentStyleSheet` ：返回包含当前 CSS 规则的样式表（`StyleSheet` 实例）。

- `CSSRule.parentRule` ：返回包含当前 CSS 规则父规则。如果不存在父规则（即当前规则为顶层规则），则返回 `null` 。

## CSSStyleRule 接口

`CSSStyleRule` 接口表示一条 CSS 样式规则，继承自 `CSSRule` 接口。

`CSSStyleRule` 实例属性：

- `CSSStyleRule.selectorText` ：获取或设置当前规则的 CSS 选择器。

- `CSSStyleRule.style` ：返回 `CSSStyleDeclaration` 实例，表示 CSS 规则的样式声明（即选择器后大括号中的部分）。`CSSStyleDeclaration` 实例的 `cssText` 属性，返回样式声明的文本内容。

## CSSMediaRule 接口

`CSSMediaRule` 接口表示单个 CSS `@media` 规则。

`CSSMediaRule` 实例属性：

- `CSSMediaRule.media` ：返回 `MediaList` 实例，表示 `@media` 规则的对象。
- `CSSMediaRule.conditionText` ：返回 `@media` 规则的生效条件。

## window.matchMedia()

**语法** ： `window.matchMedia(mediaQueryString)`

**描述** ： 返回 `MediaQueryList` 实例，表示指定的媒体查询字符串 `mediaQueryString` 是否匹配当前文档。

- `MediaQueryList` 实例属性
  - `MediaQueryList.matches` ：返回布尔值，表示指定的媒体查询字符串是否匹配当前文档。
  - `MediaQueryList.media` ：返回媒体查询字符串。
  
- `MediaQueryList` 实例方法
  - `MediaQueryList.onchange` ：监听函数，当媒体查询字符串匹配当前文档时，执行监听函数。
  - `MediaQueryList.addListener()` ：添加监听函数。当媒体查询字符串匹配当前文档时，执行监听函数。
  - `MediaQueryList.removeListener()` ：移除监听函数。
  