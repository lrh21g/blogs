# MutationObserver

`MutationObserver` 接口异步监视 DOM 的变动，例如节点的增减、属性变动、文本内容变动等。

- 当所有 DOM 的变动都完成后，才会运行（即异步触发）。
- DOM 的变化记录会被封装成一个数组（包含多条 DOM 的变动），在 `MutationObserver` 的回调函数中返回。
- 可以监听 DOM 的所有变动，也可以指定观察某一类 DOM 的变动。

## MutationObserver 构造函数

**语法** ： `new MutationObserver(callback)`

**描述** ：创建一个新的、包含监听 DOM 变化回调函数的 `MutationObserver` 对象。再调用 `mutationObserver.observe()` 方法，可以指定监听 DOM 的变化。

**参数** ：

- `callback` 参数：回调函数。当被监听的 DOM 发生变化时，会调用该回调函数。该回调函数接收两个参数：
  - `mutations` ：一个 `MutationRecord` 对象的数组，每个对象代表一条 DOM 变动记录。
  - `observer` ：`MutationObserver` 对象实例。

## MutationObserver 实例方法

- `mutationObserver.observe()`

  **语法** ：`mutationObserver.observe(targetNode, options)`

  **描述** ：指定监听 DOM 的变化。当被监听的 DOM 发生变化时，会调用 `MutationObserver` 构造函数中的回调函数。

  **参数** ：

  - `targetNode` ：被监听的 DOM 节点。
  - `options` ：一个对象，用来指定监听 DOM 变化的类型。当调用 `observe()` 时，`childList`、`attributes` 和 `characterData` 中，必须有一个参数为 `true`，否则会抛出 `TypeError` 异常。
    - `options.subtree` ：布尔值，默认值为 `false` 。是否监听 DOM 的后代节点以及属性。
    - `options.childList` ：布尔值，默认值为 `false` 。是否监听 DOM 的子节点（包括新增、删除或更改）。
    - `options.characterData` ：布尔值，默认值为 `false` 。是否监听 DOM 的文本内容变化。
    - `options.characterDataOldValue` ：布尔值，，默认值为 `false` 。是否记录 DOM 的文本内容变化前的值。
    - `options.attributes` ：布尔值，默认值为 `false` （声明了 `attributeFilter` 或 `attributeOldValue`，默认值则为 `false` ）。是否监听 DOM 的属性变化。
    - `options.attributeFilter` ：数组，指定监听的属性。比如 `['class', 'src']` 。如果不指定，则监听所有属性的变化。
    - `options.attributeOldValue` ：布尔值，默认值为 `false` 。是否记录 DOM 的属性变化前的值。

- `mutationObserver.disconnect()`

  **语法** ：`mutationObserver.disconnect()`

  **描述** ：停止监听 DOM 的变化。

- `mutationObserver.takeRecords()`

  **语法** ：`mutationObserver.takeRecords()`

  **描述** ：返回一个 `MutationRecord` 对象列表，包含所有 DOM 变化记录的数组。该方法会清空变化记录队列，不再处理未处理的变动。

  - 常用于在断开观察者之前立即获取所有未处理的更改记录，以便在停止观察者时可以处理任何未处理的更改。
  - `MutationRecord` 对象表示 DOM 的变化记录，包含以下属性：
    - `type` ：字符串，表示 DOM 的变化类型。可能的值有：`'attributes'`（DOM 的属性变化）、`'characterData'`（DOM 的文本内容变化）、`'childList'`（DOM 的子节点变化）。
    - `target` ：DOM 节点，表示 DOM 的变化发生在哪个节点。
    - `addedNodes` ：DOM 节点的数组，表示新增的 DOM 节点。
    - `removedNodes` ：DOM 节点的数组，表示删除的 DOM 节点。
    - `previousSibling` ：DOM 节点，表示发生变化的 DOM 节点的前一个同级节点。
    - `nextSibling` ：DOM 节点，表示发生变化的 DOM 节点的后一个同级节点。
    - `attributeName` ：字符串，表示发生变化的 DOM 节点的属性名。
    - `attributeNamespace` ：字符串，表示发生变化的 DOM 节点的属性的命名空间。
    - `oldValue` ：字符串，表示发生变化的 DOM 节点的属性的旧值。

## 使用示例

### 监听子元素的变动

```javascript
let callback = function (mutationRecords) {
  mutationRecords.map(function (recordItem) {
    console.log('recordItem type : ', recordItem.type)
    console.log('recordItem target : ', recordItem.target)
  })
}

let mo = new MutationObserver(callback)

// 监听 <body> 所有子节点的变动
mo.observe(document.body, {
  childList: true, // 监听 DOM 的子节点（包括新增、删除或更改）
  subtree: true, // 监听 DOM 的后代节点以及属性
})
```

### 监听属性的变动

```javascript
let callback = function (mutationRecords) {
  mutationRecords.map(function (recordItem) {
    console.log('recordItem oldValue : ', recordItem.oldValue)
  })
}

let mo = new MutationObserver(callback)
let element = document.getElementById('#element')

// 监听 <div id="element"> 的属性变动，并记录变动前的值
mo.observe(document.body, {
  attributes: true, // 监听 DOM 的属性变化
  attributeOldValue: true, // 记录 DOM 的属性变化前的值
})
```

### 取代 DOMContentLoaded 事件

```javascript
;(function (win) {
  'use strict'

  var listeners = []
  var doc = win.document
  var MutationObserver = win.MutationObserver || win.WebKitMutationObserver
  var observer

  function ready(selector, fn) {
    // 储存选择器和回调函数
    listeners.push({
      selector: selector,
      fn: fn,
    })
    if (!observer) {
      // 监听document变化
      observer = new MutationObserver(check)
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true,
      })
    }
    // 检查该节点是否已经在DOM中
    check()
  }

  function check() {
    // 检查是否匹配已储存的节点
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i]
      // 检查指定节点是否有匹配
      var elements = doc.querySelectorAll(listener.selector)
      for (var j = 0; j < elements.length; j++) {
        var element = elements[j]
        // 确保回调函数只会对该元素调用一次
        if (!element.ready) {
          element.ready = true
          // 对该节点调用回调函数
          listener.fn.call(element, element)
        }
      }
    }
  }

  // 对外暴露ready
  win.ready = ready
})(this)

// 使用方法
ready('.foo', function (element) {
  // ...
})
```
