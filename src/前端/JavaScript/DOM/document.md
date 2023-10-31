# Document 类型

`Document` 接口表示整个文档，并作为网页的入口，即 DOM 树。继承了 `Node` 接口和 `EventTarget` 接口。

`Document` 对象可以通过如下方法获取：

- 正常网页，可直接使用 `document` 或 `window.document` 。
- `iframe` 框架中的网页，可以使用 `iframe` 节点的 `contentDocument` 属性。
- Ajax 操作返回的文档，可以使用 `XMLHttpRequest` 对象的 `responseXML` 属性。
- 网页内部 `Node` 节点的 `ownerDocument` 属性。

## Document 类型属性

### 快捷方式属性

- `document.defaultView` ： 返回 `document` 对象所属的 `window` 对象。如果当前文档不属于 `window` 对象，则返回 `null` 。
- `document.doctype` ： 返回当前文档的文档类型定义。指向 `<DOCTYPE>` 节点，即文档类型（Document Type Declaration，简写 DTD）节点。
- `document.documentElement` ： 只读属性。返回当前文档对象的根元素节点（root）。对于 HTML 文档，一般是 `<html>` 元素节点。
- `document.head` ： 可读写，返回当前文档中所有的 `<head>` 元素节点。
- `document.body` ： 可读写，返回当前文档中的 `<body>` 或 `<frameset>` 元素（返回最外层）节点。
- `document.firstElementChild` ： 返回当前文档中的第一个子元素，如果没有子元素，则返回 `null`。对于 HTML 文档，通常是根 `<html>` 元素节点。
- `document.lastElementChild` ： 返回当前文档中的最后一个子元素，如果没有子元素，则返回 `null`。对于 HTML 文档，通常是根 `<html>` 元素节点。
- `document.activeElement` ： 返回当前获得焦点的 DOM 元素。如果当前没有焦点元素，则返回 `body` 元素或者 `null`。
- `document.scrollingElement` ： 只读属性。返回当前文档的滚动元素（即当文档整体滚动时，滚动的具体元素）。
- `document.pointerLockElement` ： 只读属性。返回指针锁定时鼠标事件的目标元素。
- `document.fullscreenEnabled` ： 只读属性。表示全屏模式是否可用。如果指针处于锁定等待中、指针没有被锁定或目标元素在另外一个文档中，返回 `null`。
- `document.fullscreenElement` ： 只读属性。返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回 `null` 。可以通过该属性判断 `<vidoe>` 元素节点是否处于全屏，判断用户行为。
- `document.pictureInPictureEnabled` ： 只读属性。表示画中画模式是否可用。
- `document.pictureInPictureElement` ： 只读属性。返回当前文档中以画中画模式呈现的 DOM 元素。如果没有使用画中画模式，则返回 `null` 。

### 节点集合属性

- `document.children` ： 返回实时的 `HTMLCollection` ，其中包含当前文档的所有子元素。
- `document.childElementCount` ：只读，返回当前文档的子元素数量。
- `document.styleSheets` ： 只读属性。返回当前文档内嵌或引入的 CSS 样式表集合。
- `document.links` ： 返回当前文档中所有设置了 `href` 属性的 `<a>` 或者 `<area>` 元素节点。
- `document.forms` ： 返回当前文档所有的 `<form>` 元素节点。使用位置序号、`id` 属性和 `name` 属性也可以用来引用表单。
- `document.images` ： 返回当前文档所有的 `<image>` 元素节点。
- `document.scripts` ： 返回一个 `HTMLCollection` 对象，包含当前文档中所有 `<script>` 元素节点。
- `document.embeds` ： 返回当前文档中所有的 `<embed>` 元素节点。
- `document.plugins` ： 只读属性。返回一个 `HTMLCollection` 对象，该对象包含一个或多个 `HTMLEmbedElement` 表示当前文档中的 `<embed>` 元素。
- `document.fonts` ： 返回当前文档的 `FontFaceSet` 接口（可管理着字体的加载和查询字体下载状态）。

- 文档静态信息属性

- `document.documentURI` ： 以字符串的形式返回当前文档的网址。`documentURI` 继承自 `Document` 接口，可用于所有文档。
- `document.URL` ： 返回当前文档的 URL 地址。`URL` 继承自 `HTMLDocument` 接口，只能用于 HTML 文档。
- `document.title` ： 用于获取或设置当前文档的标题。如果存在，默认为 `<title>` 元素节点的值。
- `document.location` ： 获取浏览器原生对象 `location` ，用于提供获取 URL 的相关信息和操作方法。
- `document.lastModified` ： 以字符串形式返回当前文档最后修改的时间（不同浏览器返回日期格式不同，可用 `Date.parse` 方法转为 `Date` 实例进行比较）。如果页面上有 JavaScript 生成内容，该属性返回为当前时间。
- `document.contentType` ： 返回当前文档的 Content-Type(MIME) 类型。
- `document.characterSet` ： 返回当前文档的字符编码（例如 UTF-8）。
- `document.referrer` ： 返回 URI ，表示当前页面是从该 URI 所代表的页面跳转或者打开的。如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，返回一个空字符串。
- `document.dir` ： 返回当前文档的文字方向。`ltr` 表示从左到右，`rtl` 表示从右到左。
- `document.timeline` ： 只读属性。返回当前文档的默认时间轴（`DocumentTimeline` 的特殊实例，在网页加载时自动创建）。
- `document.compatMode` ： 返回当前文档的渲染模式。
  - `"BackCompat"` ： 当前文档为怪异模式。
  - `"CSS1Compat"` ： 当前文档为标准模式或者准标准模式。

### 文档状态属性

- `document.hidden` ： 返回布尔值，表示当前页面是否可见。如果窗口最小化、浏览器切换 Tab，都会导致 `document.hidden` 返回 `true`。
- `document.visibilityState` ： 返回当前文档的可见状态。
  - `visible` ： 页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
  - `hidden` ： 页面不可见。即文档处于背景标签页或者窗口处于最小化状态，或者操作系统正处于“锁屏状态”。
  - `prerender` ： 页面正在渲染中。对于用户来说，该页面不可见。
  - `unloaded` ： 页面从内存里面卸载了。
- `doucment.readyState` ： 返回当前文档的加载状态。
  - `loading` ： 加载中。加载 HTML 代码阶段，尚未解析完成。
  - `interactive` ： 可交互。文档已被解析，正在加载状态结束，但是图像、样式表和框架之类的子资源仍在加载。
  - `complete` ： 加载完成。文档和所有子资源已完成加载。`load` 状态的事件即将被触发。

### 文档其他属性

- `document.designMode` ： 控制整个文档是否可编辑。属性值默认为 `off`，表示不可编辑；`on` 表示为可编辑。
- `document.cookie` ： 获取并设置当前文档关联的 Cookie 。
- `document.currentScript` ： 返回当前文档正在运行脚本所在的 `<script>` 元素节点。
- `doucment.implementation` ： 返回一个和当前文档相关联的 `DOMImplementation` 对象。
  - `DOMImplementation.createDocument` ： 创建一个 XML 文档。
  - `DOMImplementation.createHTMLDocument` ： 创建一个 HTML 文档。
  - `DOMImplementation.createDocumentType` ： 创建一个 DocumentType 对象。

## Document 类型方法

### 文档操作方法

- `document.open()`

  **语法** ： `document.open()`

  **描述** ： 清除当前文档所有内容，使得文档处于可写状态，供 `document.write` 方法写入内容。

- `document.close()`

  **语法** ： `document.close()`

  **描述** ： 关闭 `document.open()` 打开的文档。

- `document.write()`

  **语法** ： `document.write(string)`

  **描述** ： 将文本字符 `string` （可以是 HTML 代码）写入一个由 `document.open()` 打开的文档流（document stream）。

  - 如果页面已经解析完成（`DOMContentLoaded` 事件发生之后），调用 `document.write()` 方法，会先自动调用 `document.open()` 方法，擦除当前文档所有内容，再写入。
  - 如果页面在渲染过程中，调用 `document.write()` 方法，并不会自动调用 `document.open()` 方法。（可以理解为 `document.open()` 方法已调用，但 `document.close()` 方法还未调用）
  - 如果 `document.write()` 调用发生在 HTML 里的 `<script>` 标签中，将不会自动调用 `document.open()` 方法。

- `document.writeln()`

  **语法** ： `document.writeln(string)`

  **描述** ： 与  `document.write(string)` 方法一致，但会在每次调用后添加一个换行符。

  - `document.writeln()` 方法添加的是 ASCII 码的换行符，渲染成 HTML 网页时不起作用，即在网页上显示不出换行。网页上的换行，必须显式写入` <br>` 。

- `document.exitFullscreen()`

  **语法** ： `document.exitFullscreen()`

  **描述** ： 用于将当前文档退出全屏模式。

  - 调用该方法会让文档回退上一个调用 `element.requestFullscreen()` 方法进入全屏模式之前的状态。
  - 如果一个元素 A 在请求进去全屏模式之前，已经存在其他元素处于全屏状态，当元素 A 退出全屏模式之后，之前的元素仍然处于全屏状态。浏览器内部维护了一个全屏元素栈。

- `document.exitPictureInPicture()`

  **语法** ： `document.exitPictureInPicture()`

  **描述** ： 请求退出以画中画模式浮动在此文档中播放的视频，来恢复屏幕之前的状态。返回一个 `Promise` ，在用户代理退出画中画模式时兑现。如果在尝试退出全屏模式时发生错误，将会调用 `Promise` 的 `catch()` 处理程序。

### 添加替换元素节点方法

- `document.adoptNode()`

  **语法** : `document.adoptNode(externalNode)`

  **描述** ： 将某个节点 `externalNode` 以及其子节点，从原来文档移除并移动到当前文档，并返回移动后的节点 `externalNode`。

  - `externalNode` 节点对象的 `ownerDocument` 属性会被设置为当前文档，而其 `parentNode` 属性为 `null`。
  - 该方法只是改变了节点的归属，可以使用 `Node.prototype.appendChild()` 等方法，将新节点插入当前文档。

- `document.importNode()`

  **语法** ： `document.importNode(externalNode, deep)`

  **描述** ： 将某个节点 `externalNode` 以及其子节点，从原来文档复制到当前文档，并返回复制后的节点 `externalNode`。

  - `externalNode` 节点对象的 `ownerDocument` 属性会被设置为当前文档，而其 `parentNode` 属性为 `null`。
  - 该方法只是复制外部节点，可以使用 `Node.prototype.appendChild()` 等方法，将新节点插入当前文档。

  **参数** ：

  - `externalNode` 参数：表示要复制的节点。
  - `deep` 参数：可选值。一个布尔值，默认为 `false` ，表示是否深度复制。
    - 如果为 `true`，则会复制节点的所有后代节点。
    - 如果为 `false`，则只复制当前节点。

- `document.prepend()`

  **语法** ： `document.prepend(node1, node2, ..., nodeN)`

  **描述** ： 将一组节点添加到当前文档的最前面。

- `document.append()`

  **语法** ： `document.append(node1, node2, ..., nodeN)`

  **描述** ： 将一组节点添加到当前文档的最后面。

- `document.replaceChildren()`

  **语法** ： `document.replaceChildren(node1, node2, ..., nodeN)`

  **描述** ： 将一组节点替换当前文档的所有子节点。

### 创建元素节点方法

- `document.createElement()`

  **语法** ： `document.createElement(tagName[, options])`

  **描述** ： 创建一个具有指定标签名 `tagName` 的元素节点，并返回。

  **参数** ：

  - `tagName` 参数：表示要创建的元素的标签名。不区分大小写（`div` 或 `DIV` 返回的是同一种节点。）。
  - `options` 参数：可选值。
    - `options.is` ：表示要创建的元素的自定义标签名（使用 `customElements.define()` 方法定义过的一个自定义元素的标签名）。如果不是自定义标签，则该参数无效。

- `document.createAttribute()`

  **语法** ： `document.createAttribute(name)`

  **描述** ： 创建一个属性节点，返回 `Attr` 对象。

  ```javascript
  var node = document.getElementById('div1')

  var a = document.createAttribute('my_attrib')
  a.value = 'newVal'
  node.setAttributeNode(a)

  // 或者

  node.setAttribute('my_attrib', 'newVal')
  ```

- `document.createTextNode()`

  **语法** ： `document.createTextNode(data)`

  **描述** ： 创建一个包含指定文本数据 `data` 的文本节点，并返回。
  
  - 可以用来转义 HTML 字符。
  - 不对单引号和双引号转义，所以不能用来对 HTML 属性赋值。

- `document.createComment()`

  **语法** ： `document.createComment(data)`

  **描述** ： 创建一个包含指定注释数据 `data` 的 `Comment` 节点，并返回。

- `document.createDocumentFragment()`

  **语法** ： `document.createDocumentFragment()`

  **描述** ： 创建一个空白的文档片段 `DocumentFragment` ，并返回。

- `document.createCDATASection()`

  **语法** ： `document.createCDATASection(data)`

  **描述** ： 创建一个包含指定数据 `data` 的 `CDATASection` 节点，并返回。

- `document.caretPositionFromPoint()`

  **语法** ： `document.caretPositionFromPoint(x, y)`

  **描述** ： 返回一个 `CaretPosition` 对象，表示指定坐标 `(x, y)` 处的光标位置。

  - `CaretPosition.offsetNode` ：返回一个 `Node` 对象，表示光标所在的节点。
  - `CaretPosition.offset` ：返回一个整数，表示光标在 `offsetNode` 节点内的偏移量。

### 查找元素节点方法

- `document.getElementById()`

  **语法** ： `document.getElementById(id)`

  **描述** ： 返回一个匹配指定 `id` 属性（大小写敏感）的元素节点。如果没有匹配的节点，则返回 `null` 。

- `document.getElementsByClassName()`

  **语法** ： `document.getElementsByClassName(names)`

  **描述** ： 返回一个类数组对象，包含匹配 `class` 类名（大小写敏感）的所有元素节点。
  
  - 不仅可用在 `document` 对象上，也可用在任何元素节点上。调用该方法的元素将作为本次查找的根元素。

  **参数** ：

  - `names` 参数：字符串，表示匹配的 `class` 类名列表。可以是多个类名，通过空格隔开，如：`foo bar` 。

- `document.getElementsByName()`

  **语法** ： `document.getElementsByName(name)`

  **描述** ： 返回一个类数组对象（`NodeList` 实例），包含匹配 `name` 属性（大小写敏感）的所有元素节点。

  - 返回的 `NodeList` 实例是实时更新的。
  - 返回包括拥有 `name` 属性的元素节点（比如 `<form>` 、 `<radio>` 、 `img` 、 `frame` 等），以及添加了 `name` 自定义属性的元素（比如 `<a name="customNameAttr">`）。

- `document.getElementsByTagName()`

  **语法** ： `document.getElementsByTagName(tagName)`

  **描述** ： 返回一个类数组对象（`HTMLCollection` 实例），包含匹配指定元素节点名 `tagName` 的所有元素节点。

  - 不仅可用在 `document` 对象上，也可用在任何元素节点上。调用该方法的元素将作为本次查找的根元素。

  **参数** ：

  - `tagName` 参数：字符串，表示匹配的元素节点名。
    - 不区分大小写（`div` 或 `DIV` 返回的是同一种节点）。
    - 特殊字符 `*` 表示匹配文档中的所有元素节点。

- `document.getSelection()`

  **语法** ： `document.getSelection()`

  **描述** ： 指向 `window.getSelection()`，返回一个 `Selection` 对象，表示选择的文本范围或当前的游标位置。

- `document.getAnimations()`

  **语法** ： `document.getAnimations()`

  **描述** ： 返回一个数组，其中包含当前有效的所有动画对象（其目标元素是文档的后代）。该数组包括 CSS 动画、CSS 过渡和 Web 动画。

- `document.querySelector()`

  **语法** ： `document.querySelector(selectors)`

  **描述** ： 返回匹配指定 CSS 选择器 `selectors` 的第一个元素节点。如果没有匹配的节点，则返回 `null` 。如果未匹配到节点，则返回 `null` 。

  - 匹配是使用深度优先先序遍历，从文档标记中的第一个元素开始，并按子节点的顺序依次遍历。
  - 不仅可用在 `document` 对象上，也可用在任何元素节点上。调用该方法的元素将作为本次查找的根元素。

  **参数** ：

  - `selectors` 参数：字符串，表示 CSS 选择器。
    - 支持复杂 CSS 选择器，但不支持 CSS 伪元素和伪类选择器（即无法选中伪元素和伪类）。
    - 可以使用逗号分隔多个选择器，返回匹配其中一个选择器的第一个元素节点。
    - 特殊字符 `*` 表示匹配文档中的所有元素节点。

- `document.querySelectorAll()`

  **语法** ： `document.querySelectorAll(selectors)`

  **描述** ： 返回一个类数组对象（`NodeList` 实例，非动态），包含匹配指定 CSS 选择器 `selectors` 的所有元素节点。如果未匹配到节点，则返回 `null` 。

  - 不仅可用在 `document` 对象上，也可用在任何元素节点上。调用该方法的元素将作为本次查找的根元素。

  **参数** ：

  - `selectors` 参数：字符串，表示 CSS 选择器。
    - 支持复杂 CSS 选择器，但不支持 CSS 伪元素和伪类选择器（即无法选中伪元素和伪类）。
    - 可以使用逗号分隔多个选择器，返回匹配其中一个选择器的第一个元素节点。

- `document.hasFocus()`

  **语法** ： `document.hasFocus()`

  **描述** ： 返回一个布尔值，表示当前文档中是否有元素被激活或获得焦点。

  - 有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点。比如，用户点击按钮，从当前窗口跳出一个新窗口，该新窗口就是激活的，但是不拥有焦点。

### 文档其他方法

- `document.createNodeIterator()`

  **语法** ： `document.createNodeIterator(root, whatToShow, filter)`

  **描述** ： 创建一个 `NodeIterator` 对象，用于遍历指定节点 `root` 的子节点。

  **参数** ：

  - `root` 参数：表示要遍历的根节点。
  - `whatToShow` 参数：可选值。表示要遍历的节点类型。主要节点类型如下：

    | 常量名                    | 数字值 | 描述         |
    | :------------------------ | :----- | :----------- |
    | `NodeFilter.SHOW_ALL`     | `-1`   | 显示所有节点 |
    | `NodeFilter.SHOW_ELEMENT` | `1`    | 显示元素节点 |
    | `NodeFilter.SHOW_TEXT`    | `4`    | 显示文本节点 |
    | `NodeFilter.SHOW_COMMENT` | `128`  | 显示注释节点 |

  - `filter` 参数：可选值。表示一个 `NodeFilter` 对象，用于过滤要遍历的节点。`NodeFilter` 对象的 `acceptNode()` 方法需要返回下列常量之一： `NodeFilter.FILTER_ACCEPT` ，`NodeFilter.FILTER_REJECT` 或 `NodeFilter.FILTER_SKIP` 。

- `document.createTreeWalker()`

  **语法** ： `document.createTreeWalker(root, whatToShow, filter)`

  **描述** ： 创建一个 `TreeWalker` 对象，用于遍历指定节点 `root` 的子节点和位置。

  **参数** ： 与 `document.createNodeIterator()` 方法一致。

- `document.elementFromPoint()`

  **语法** ： `document.elementFromPoint(x, y)`

  **描述** ： 返回指定位置 `(x, y)` （相对于当前视口）最上层的元素节点。

  - 如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）。
  - 如果坐标值无意义（比如负值或超过视口大小），则返回 `null`。

- `document.elementsFromPoint()`

  **语法** ： `document.elementsFromPoint(x, y)`

  **描述** ： 返回一个数组，包含指定位置 `(x, y)` （相对于当前视口）的所有元素。
