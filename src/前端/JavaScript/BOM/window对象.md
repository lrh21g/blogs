# window 对象

## window 对象属性

### window.name

`window.name` ： 获取/设置窗口的名称（只能保存字符串，如写入不是字符串，会自动转成字符串）。主要用于为超链接和表单设置目标（targets），窗口不需要有名称。

只要浏览器窗口不关闭，这个属性是不会消失的。访问 a.com 时，该页面的脚本设置了 `window.name` ，在同一个窗口里面载入 b.com，新页面的脚本可以读到上一个网页设置的 `window.name`。页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了。

### window.closed 、 window.opener

- `window.closed` ： 返回一个布尔值，表示窗口是否关闭。一般用来检查，使用脚本打开的新窗口是否关闭。

- `window.opener` ： 表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回 `null`。例如：在 window A 中打开了 window B，B.opener 返回 A 。

```javascript
// 更改一个弹出窗口的 URL
// 使用 window.opener 属性来检查有窗口被打开，并且该窗口没有关闭
// 注意：弹出窗口只能访问打开他们的窗口
if (window.opener && !window.opener.closed) {
  window.opener.location.href = 'http://www.mozilla.org'
}

// 函数 refreshPopupWindow() 调用重载方法的弹出的位置要刷新其数据的对象
var popupWindow = null
function refreshPopupWindow() {
  if (popupWindow && !popupWindow.closed) {
    // popupWindow is open, refresh it
    popupWindow.location.reload(true)
  } else {
    // Open a new popup window
    popupWindow = window.open('popup.html', 'dataWindow')
  }
}
```

### window.frames 、 window.length 、 window.frameElement

- `window.frames` ： 返回当前窗口，一个类数组对象，列出了当前窗口的所有直接子窗口。包括 `frame` 元素和 `iframe` 元素。
  - `window.frames[0]` 表示页面中第一个框架窗口。`frames` 属性实际上是 `window` 对象的别名。
  - 如果 `iframe` 元素设置了 `id` 或 `name` 属性，可以用属性值，引用该 `iframe` 窗口。例如： `<iframe name="myIFrame">` 可以用 `frames['myIFrame']` 或者 `frames.myIFrame` 来引用。

- `window.length` ： 返回当前窗口中包含的框架数量 (框架包括 `frame` 和 `iframe` 两种元素)。
  - 如果当前网页不包含 `frame` 和 `iframe` 元素，`window.length` 返回为 `0` 。
  - `window.frames.length` 与 `window.length` 应该是相等的： `window.frames.length === window.length` 。

- `window.frameElement` ： 返回嵌入当前 `window` 对象的元素 (比如 `<iframe>` 、 `<object>` 或 `<embed>` 元素)，如果当前 `window` 对象已经是顶层窗口，则返回 `null` 。

### 窗口关系

- `window.self / window.window` ：返回一个指向当前 `window` 对象的引用。

- `window.parent` ： 返回当前窗口的父窗口。如果当前窗口没有父窗口，`window.parent` 指向自身。

- `window.top` ： 返回窗口层级最顶层窗口的引用。

### 窗口位置大小属性与像素比

- `window.screenX / window.screenLeft` ：只读。返回浏览器左边界到系统桌面左边界的水平距离（单位：像素）。

- `window.screenY / window.screenTop` ：只读。返回浏览器顶部边界距离系统桌面顶部边界的垂直距离（单位：像素）。

- `window.innerWidth` ：只读。返回浏览器窗口的视口宽度（单位：像素），包含垂直滚动条的宽度。

- `window.innerHeight` ：只读。返回浏览器窗口的视口高度（单位：像素），包含水平滚动条的高度。

- `window.outerWidth` ：只读。返回浏览器窗口外部的宽度（单位：像素），包括浏览器菜单和边框。

- `window.outerHeight` ：只读。返回浏览器窗口外部的高度（单位：像素），包括浏览器菜单和边框。

- `window.scrollX / window.pageXOffset` ：只读。返回页面的水平滚动距离（单位：像素）。

- `window.scrollY / window.pageYOffset` ：只读。返回页面的垂直滚动距离（单位：像素）。

- `window.devicePixelRatio` ： 返回当前显示设备的物理像素分辨率与 CSS 像素分辨率之比。简单来说，告诉浏览器应使用多少屏幕实际像素来绘制单个 CSS 像素。

### 窗口组件属性

- `window.locationbar` ： 地址栏对象。

- `window.menubar` ： 菜单栏对象。

- `window.scrollbars` ： 窗口的滚动条对象。

- `window.toolbar` ： 工具栏对象。

- `window.statusbar` ： 状态栏对象。

- `window.personalbar` ： 用户安装的个人工具栏对象。

### window.isSecureContext

`window.isSecureContext` ： 只读。返回一个布尔值，表示当前窗口是否处在加密环境。如果是 HTTPS 协议，则返回为 `true`，否则为 `false`。

## window 对象方法

### 系统对话框

- `window.alert(message)` ：显示一个带有可选的信息的对话框，并等待用户离开该对话框，只有一个“确定”按钮。往往用来通知用户某些信息。

  - `message` 参数：可选值。显示在警告对话框中的字符串（可以使用 `\n` 指定换行）。

  - `window.alert()` 返回值：无（`undefined`）

- `window.prompt(message, defaultValue)` ：显示一个带有可选的信息的对话框，提示用户输入一些文本，并等待用户提交文本或取消对话框。往往用来获取用户输入的数据。

  - `window.prompt()` 参数：
  
    - `message` ：可选值。向用户显示的一串文本（可以使用 `\n` 指定换行）。如果在提示窗口中没有什么可显示的，可以省略。
    - `defaultValue` ：可选值。一个字符串，包含文本输入字段中显示的默认值。

  - `window.prompt()` 返回值：

    - 用户输入信息，并点击“确定”，则用户输入的信息就是返回值。
    - 用户没有输入信息，直接点击“确定”，则输入框的默认值就是返回值。
    - 用户点击了“取消”（或者按了 ESC 按钮），则返回值是 `null`。

- `window.confirm(message)` ：显示一个带有可选的信息的对话框，并等待用户确认或取消该对话框。往往用来征询用户是否同意。

  - `message` 参数：在确认对话框中要显示的字符串。

  - `window.confirm()` 返回值：一个布尔值，表示是否选择了确定（`true`）或取消（`false`）。

### 新建与关闭窗口

- `window.open(url, target, windowFeatures)` ：新建另一个浏览器窗口。返回新窗口的引用，可用于访问新窗口的属性和方法。如果无法新建窗口，则返回 `null`。

  - `window.open()` 参数：

    - `url` ：可选值。字符串，表示要加载的资源的 URL 或路径。如果指定为空字符串（`''`）或者省略，默认网址为 `about:blank` （即：打开一个空白页）。

    - `target` ：可选值。字符串，表示新窗口的名字。

      - 如果该名字的窗口已经存在，则占用该窗口，不再新建窗口。如果省略，就默认使用 `_blank` ，表示新建一个没有名字的窗口。
      - 可以使用特殊的 `target` 关键字：
        - `_blank` ：表示新建一个没有名字的窗口
        - `_self` ：表示当前窗口
        - `_top` ：表示顶层窗口
        - `_parent` ：表示上一层窗口

    - `windowFeatures` ：可选值。字符串，表示新窗口的特性，包括窗口的默认大小和位置、是否打开最小弹出窗口等选项。

      - 以逗号分隔的窗口特性列表，形式为 `name=value`，布尔特性则仅为 `name`。

        - 对于可以打开和关闭的属性，设为 `yes` 或 `1` 或不设任何值就表示打开，比如 `status=yes`、`status=1`、`status` 都会得到同样的结果。
        - 如果设为关闭，不用写 `no` ，而是直接省略这个属性即可。

      - 特性列表如下：
        - `left/ screenX` ：新窗口距离屏幕最左边的距离（单位像素）。注意，新窗口必须是可见的，不能设置在屏幕以外的位置。
        - `top / screenY` ：新窗口距离屏幕最顶部的距离（单位像素）。
        - `width / innerWidth` ：新窗口内容区域（包括滚动条）的宽度（单位像素），不得小于 100 。
        - `height / innerHeight` ：新窗口内容区域（包括滚动条）的高度（单位像素），不得小于 100 。
        - `outerWidth` ：整个浏览器窗口的宽度（单位像素），不得小于 100 。
        - `outerHeight` ：整个浏览器窗口的高度（单位像素），不得小于 100 。
        - `popup` ：要求使用最小弹出窗口。弹出窗口中包含的用户界面功能将由浏览器自动决定，一般只包括地址栏。
        - `noopener` ：新窗口将与父窗口切断联系，即新窗口的 `window.opener` 属性返回 `null` ，父窗口的 `window.open()` 方法也返回 `null` 。
        - `dependent` ：是否依赖父窗口。如果依赖，那么父窗口最小化，该窗口也最小化；父窗口关闭，该窗口也关闭。
        - `resizable` ：新窗口是否可以调节大小。
        - `alwaysRaised` ：是否显示在所有窗口的顶部。
        - `alwaysLowered` ：是否显示在父窗口的底下。
        - `scrollbars` ：是否允许新窗口出现滚动条。
        - `dialog` ：新窗口标题栏是否出现最大化、最小化、恢复原始大小的控件。
        - `minimizable` ：是否有最小化按钮，前提是 `dialog=yes` 。
        - `titlebar` ：新窗口是否显示标题栏。
        - `menubar` ：是否显示菜单栏。
        - `toolbar` ：是否显示工具栏。
        - `location` ：是否显示地址栏。
        - `personalbar` ：是否显示用户自己安装的工具栏。
        - `status` ：是否显示状态栏。
        - `close` ：新窗口是否显示关闭按钮。
  
  - `window.open()` 返回值：一个 `WindowProxy` 对象。只要符合同源策略安全要求，返回的引用就可用于访问新窗口的属性和方法。

- `window.close()` ：关闭当前窗口或某个指定的窗口。一般只用来关闭 `window.open` 方法新建的窗口。

- `window.stop()` ：完全等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。

### 窗口移动、缩放

- `window.moveTo(x, y)` ：将当前窗口移动到指定坐标位置。

- `window.moveBy(deltaX, deltaY)` ：基于当前位置移动当前窗口到一个相对位置。

- `window.resizeTo(outerWidth, outerHeight)` ：调整窗口的绝对大小。

- `window.resizeBy(deltaX, deltaY)` ：相对于当前窗口大小，调整窗口的大小。

注：以上方法仅支持窗口是用 `window.open()` 方法新建的，并且窗口里只有它一个 Tab 页，才可使用。

### 窗口滚动

- `window.scrollTo() / window.scroll()` ：将文档滚动到绝对位置（单位像素）。

  - `window.scrollTo(x-coord, y-coord)`
    - `x-coord` ：文档中的横轴坐标。
    - `y-coord` ：文档中的纵轴坐标。

  - `window.scrollTo(options)` ，`options` 是一个包含三个属性的对象：
    - top ：等同于 `y-coord` 。
    - left ：等同于 `x-coord` 。
    - behavior ：表示滚动行为，支持参数 `smooth` （平滑滚动），`instant` （瞬间滚动），默认值 `auto` 。

- `window.scrollBy()` ：将网页滚动到相关距离（单位像素）。

  - `window.scrollBy(x-coord, y-coord)`
    - `x-coord` ：水平向右滚动的像素。
    - `y-coord` ：垂直向下滚动的像素。

  - `window.scrollBy(options)` ，`options` 是一个包含三个属性的对象：
    - top ：等同于 `y-coord` 。
    - left ：等同于 `x-coord` 。
    - behavior ：表示滚动行为，支持参数 `smooth` （平滑滚动），`instant` （瞬间滚动），默认值 `auto` 。

注：如果需要滚动某个元素，可以使用以下三个属性和方法：

- Element.scrollTop
- Element.scrollLeft
- Element.scrollIntoView()

### 激活窗口

- `window.focus()` ：激活窗口，使其获得焦点，出现在其他窗口的前面。

  ```javascript
  var popup = window.open('popup.html', 'Popup Window')

  // 检查 popup 窗口是否依然存在，确认后激活该窗口
  if (popup !== null && !popup.closed) {
    popup.focus()
  }
  ```

- `window.blur()` ：将焦点从窗口移除。

注：当前窗口获得焦点时，会触发 `focus` 事件；当前窗口失去焦点时，会触发 `blur` 事件。

### 打印

`window.print()` ：打开打印对话框，以打印当前文档。

```javascript
document.getElementById('printLink').onclick = function () {
  // 非桌面设备（比如手机）可能没有打印功能
  if (typeof window.print === 'function') {
    // 支持打印功能
    window.print()
  }
}
```

### window.getSelection()

`window.getSelection()` ：返回一个 `Selection` 对象，表示用户选择的文本范围或光标的当前位置。

- 使用 `Selection` 对象的 `toString` 方法可以得到选中的文本。

### window.getComputedStyle() 、 window.matchMedia()

- `window.getComputedStyle(element, [pseudoElt])` ：接受一个元素节点作为参数，返回一个 `CSSStyleDeclaration` 实例，包含了指定节点的最终样式信息（各种 CSS 规则叠加后的结果）。

  - `window.getComputedStyle()` 参数：

    - `element` ：用于获取计算样式的 Element。
    - `pseudoElt` ：可选值。指定一个要匹配的伪元素的字符串（比如`:before`、`:after`、`:first-line`、`:first-letter` 等）。

  - `window.getComputedStyle()` 返回值：`CSSStyleDeclaration` 实例。

    - `CSSStyleDeclaration` 实例返回的 CSS 值都是绝对单位。比如，长度是像素单位（返回值包括 `px` 后缀），颜色是 `rgb(#, #, #)`或 `rgba(#, #, #, #)` 格式。
    - CSS 规则的简写形式无效。比如，读取 `margin` 属性的值，不能直接读，只能读 `marginLeft` 、 `marginTop` 等属性； `font` 属性也是不能直接读的，只能读 `font-size` 等单个属性。
    - 如果读取 CSS 原始的属性名，要用方括号运算符，比如：`styleObj['z-index']`；如果读取骆驼拼写法的 CSS 属性名，可以直接读取 `styleObj.zIndex`。
    - 方法返回的 `CSSStyleDeclaration` 实例的 `cssText` 属性无效，返回 `undefined` 。

  ```javascript
  var div = document.querySelector('div')
  var styleObj = window.getComputedStyle(div)

  console.log(styleObj.backgroundColor)
  ```

- `window.matchMedia(mediaQueryString)` ：返回一个新的 `MediaQueryList` 对象，表示指定的媒体查询字符串解析后的结果。

  - `window.matchMedia()` 参数：

    - `mediaQueryString` ：一个被用于媒体查询解析的字符串。比如：`'(min-width: 400px)'`

  - `window.matchMedia()` 返回值：一个用来媒体查询的新的 `MediaQueryList` 对象，包含如下属性：

    - `MediaQueryList.media` ：返回一个字符串，表示对应的 `MediaQuery` 条件语句。
    - `MediaQueryList.matches` ：返回一个布尔值，表示当前页面是否符合指定的 `MediaQuery` 条件语句。
    - `MediaQueryList.onchange` ：当媒体查询的支持状况改变时，`MediaQueryList` 接口的 `change` 事件触发。该函数的参数是 `change` 事件对象（`MediaQueryListEvent` 实例），该对象与 `MediaQueryList` 实例类似，也有 `media` 和 `matches` 属性。

  ```javascript
  var mdl = window.matchMedia('(max-width: 600px)')

  console.log(mql.media) // "(max-width: 600px)"
  console.log(mql.matches) // true

  mdl.onchange = function (e) {
    if (e.matches) {
      /* 视口不超过 600 像素 */
    } else {
      /* 视口超过 600 像素 */
    }
  }
  ```

### window.requestAnimationFrame()

`window.requestAnimationFrame(callback)` ：希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法接收一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

- `window.requestAnimationFrame()` 是一次性的。如果需要在浏览器下次重绘之前继续更新下一帧动画，那么回调函数自身必须再次调用 `requestAnimationFrame()` 。

- 重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，`window.requestAnimationFrame()` 会暂停执行。

`window.requestAnimationFrame()` 返回一个 long 整数，请求 ID，是回调列表中唯一的标识。是个非零值，没有别的意义。可以传这个值给 `window.cancelAnimationFrame()` 以取消回调函数请求。

```javascript
var element = document.getElementById('animate')
element.style.position = 'absolute'

var start = null

function step(timestamp) {
  if (!start) start = timestamp
  var progress = timestamp - start
  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px'
  // 如果距离第一次执行不超过 2000 毫秒，
  // 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step)
  }
}

window.requestAnimationFrame(step)
```

### window.requestIdleCallback()

`window.requestIdleCallback(callback, options)` 方法插入一个函数，该函数将在浏览器空闲时期被调用。如果多次执行 `window.requestIdleCallback()`，指定多个回调函数，那么这些回调函数将排成一个队列，按照先进先出的顺序执行。

- `callback` ：一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 `IdleDeadline` 的参数，包含如下属性和方法：
  - `didTimeout` 属性：布尔值，表示是否为超时调用。
  - `timeRemaining()` 方法：返回该空闲时段剩余的毫秒数。

  如果由于超时导致回调函数执行，则 `deadline.timeRemaining()` 返回 `0` ，`deadline.didTimeout` 返回 `true`。

- `options` ：可选值。包括可选的配置参数：
  - `timeout` ：如果指定了 `timeout`，并且有一个正值，而回调在 `timeout` 毫秒过后还没有被调用，那么回调任务将放入事件循环中排队，即使这样做有可能对性能产生负面影响。

```javascript
// requestIdleCallback() 用来执行非关键任务 myNonEssentialWork
// 任务先确认本次空闲时段有剩余时间，然后才真正开始执行任务。
requestIdleCallback(myNonEssentialWork)

function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 0) {
    doWorkIfNeeded()
  }
}

// 指定 processPendingAnalyticsEvents 必须在未来 2 秒之内执行
requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 })
```

## window 事件

### load 事件与 onload 属性

`load` 事件在整个页面及所有依赖资源如样式表和图片都已完成加载时触发。`window.onload` 属性可以指定 `load` 事件的回调函数。

与 `DOMContentLoaded` 不同，`DOMContentLoaded` 只要页面 DOM 加载完成就触发，无需等待依赖资源的加载。

```javascript
window.addEventListener('load', (event) => {
  console.log('page is fully loaded')
})

// 使用 onload 事件处理器属性实现
window.onload = (event) => {
  console.log('page is fully loaded')
}
```

### error 事件和 onerror 属性

`error` 事件在当资源加载失败或无法使用时触发。`window.onerror` 属性可以指定 `error` 事件的回调函数。

```javascript
window.onerror = function (message, filename, lineno, colno, error) {
  // message ：出错信息
  // filename ：出错脚本的网址
  // lineno ：行号
  // colno ：列号
  // error ：错误对象

  console.log(error.stack)
}
```

### window 对象的事件监听属性

- `window.onbeforeunload` ： `beforeunload` 事件的监听函数，当浏览器窗口关闭或者刷新时触发。

- `window.onunload` ： `unload` 事件的监听函数，当文档或一个子资源正在被卸载时触发。

- `window.onresize` ： `resize` 事件监听函数，文档视图（窗口）调整大小时会触发。

- `window.oncopy` ： `copy` 事件监听函数，当用户通过浏览器的用户界面发起一个复制动作时触发。

- `window.oncut` ： `cut` 事件监听函数，当用户通过浏览器的用户界面发起一个“剪切”动作时触发。

- `window.onpaste` ： `paste` 事件监听函数，当用户通过浏览器的用户界面发起一个“粘贴”动作时触发。

- `window.onmessage` ： `message` 事件的监听函数，当窗口接收到消息(例如：从另一个浏览上下文调用 `window.postMessage()`)时触发。

- `window.onmessageerror` ： `MessageError`  事件的监听函数，当 `window` 对象收到无法反序列化的消息时触发。

- `window.onpagehide` ： `pagehide` 事件的监听函数，当浏览器在显示与会话历史记录不同的页面的过程中隐藏当前页面时触发（页面隐藏）。

- `window.onpageshow` ： `pageshow` 事件的监听函数，当一条会话历史记录被执行的时候将会触发页面显示时触发。

- `window.onhashchange` ： `hashchange` 事件的监听函数，当 URL 的片段标识符更改时触发 (跟在 `#` 符号后面的 URL 部分，包括 `#` 符号)。

- `window.onpopstate` ： `popstate` 事件的监听函数，每当激活同一文档中不同的历史记录条目时触发。

- `window.onstorage` ： `storage` 事件的监听函数，当存储区域（`localStorage` 或 `sessionStorage`）被修改时触发。

- `window.onrejectionhandled` ： 当 `Promise` 被 `rejected` 且有 `rejection` 处理器时的监听函数。

- `window.onunhandledrejection` ： 当 `Promise` 被 `rejected` 且没有 `rejection` 处理器处理时的监听函数。

- `window.onoffline` ： `offline` 事件的监听函数，在浏览器失去网络连接时触发。

- `window.ononline` ： `online` 事件的监听函数，当浏览器能够访问网络，且 `Navigator.onLine` 的值被设为 `true` 时触发。

- `window.onafterprint` ： `afterprint` 事件的监听函数，在关联的文档开始打印或关闭打印预览后触发。

- `window.onbeforeprint` ： `beforeprint` 事件的监听函数，当相关联的文档即将打印或关闭打印预览时触发。

- `window.onlanguagechange`: `languagechange` 的监听函数，当用户的首选语言发生更改时触发。
