# 其他类型

## Text 类型

`Text` 文本节点表示文本内容，代表 `Element` 元素节点和 `Attribute` 属性节点的文本内容。如果一个节点只包含一段文本，该节点就有一个文本子节点，表示该文本内容。

空格也会形成文本节点，比如 `<p></p>` 包含一个空格，其子节点就是一个文本节点。

Text 继承链路： `EventTarget <-- Node <-- CharacterData <-- Text` 。

可以使用 `new Text()` 构造函数创建 `Text` 对象，该对象带有可选参数 `DOMString` 作为文本节点的文本内容。

### Text 类型属性

- `text.data` ： 获取或设置文本节点的文本内容。等同于 `nodeValue` 属性。

- `text.wholeText` ： 只读属性。返回文本节点及其所有兄弟节点的文本内容。

  ```javascript
  // <p id="para">A <em>B</em> C</p>
  let paraDOM = document.getElementById('para')
  paraDOM.firstChild.wholeText // 'A '
  paraDOM.firstChild.data // 'A '

  // <p id="para">A C</p>
  let paraDOM = document.getElementById('para')
  // <p> 节点下包含两个毗邻的文本节点，所以 wholeText 属性返回两个文本节点的文本内容
  paraDOM.firstChild.wholeText // 'A C'
  paraDOM.firstChild.data // 'A '
  ```

- `text.length` ： 获取文本节点的文本内容长度。

- `text.nextSibling` ： 获取文本节点的下一个兄弟节点。如果未获取到，返回 `null` 。

- `text.previousSibling` ： 获取文本节点的上一个兄弟节点。如果未获取到，返回 `null` 。

### Text 类型方法

- `text.appendData()`

  **语法** ： `text.appendData(text)`

  **描述** ： 在文本节点的末尾添加文本内容。

- `text.deleteData()`

  **语法** ： `text.deleteData(offset, count)`

  **描述** ： 删除文本节点中文本内容。从 `offset` 位置开始，删除 `count` 个字符。

- `text.insertData()`

  **语法** ： `text.insertData(offset, text)`

  **描述** ： 在文本节点中插入文本内容。从 `offset` 位置开始，插入文本内容 `text` 。

- `text.replaceData()`

  **语法** ： `text.replaceData(offset, count, text)`

  **描述** ： 替换文本节点中的文本内容。从 `offset` 位置开始，删除 `count` 个字符，然后插入文本内容 `text` 。

- `text.subStringData()`

  **语法** ： `text.subStringData(offset, count)`

  **描述** ： 获取文本节点中的文本内容。返回文本节点中从 `offset` 位置开始，长度为 `count` 的子字符串。

- `text.remove()`

  **语法** ： `text.remove()`

  **描述** ： 从文档树中移除文本节点。

- `text.splitText()`

  **语法** ： `text.splitText(offset)`

  **描述** ： 将文本节点从 `offset` 位置（从零开始）分割成两个文本节点。返回分割后的第二个文本节点。如果分割位置不存在，则会报错。

## DocumentFragment 类型

`DocumentFragment` 文档片段接口，表示一个没有父对象的最小文档对象。可以插入任意数量的子节点。其不属于当前文档，操作 `DocumentFragment` 对象不会引起文档的重绘，比直接操作 DOM 树快。

`DocumentFragment` 继承链路： `EventTarget <-- Node <-- DocumentFragment` 。

可以使用 `new DocumentFragment()` 构造函数创建一个空的 `DocumentFragment` 对象节点，然后在使用其他 DOM 方法，向其添加子节点。

- `DocumentFragment` 节点本身不能被插入当前文档，当作为 DOM 方法的参数，插入当前文档时，是所有子节点被插入当前文档，而不是自身。

- `DocumentFragment` 节点的子节点被插入当前文档后，自身会变成空节点（`textContent` 属性为空字符串），可以被再次使用。如需保存 `DocumentFragment` 节点内容，可以使用 `cloneNode` 方法。

`DocumentFragment` 节点对象没有属性和方法，全部继承自 `Node` 节点。 `DocumentFragment` 节点比 `Node` 节点多出以下四个属性：

- `DocumentFragment.children` ： 只读属性。返回动态的 `HTMLCollection` 集合对象，包含 `DocumentFragment` 对象的所有子元素节点。

- `DocumentFragment.firstElementChild` ： 只读属性。返回 `DocumentFragment` 对象的第一个子元素节点。如果没有，则返回 `null` 。

- `DocumentFragment.lastElementChild` ： 只读属性。返回 `DocumentFragment` 对象的最后一个子元素节点。如果没有，则返回 `null` 。

- `DocumentFragment.childElementCount` ： 只读属性。返回 `DocumentFragment` 对象的子元素节点数量。

## Attr 类型

`Attr` 类型使用对象表示 DOM 元素的属性。

在 DOM 方法中，可以直接通过字符串的方式获取属性值（例如，`element.getAttribute()`），使用函数（例如，`element.getAttributeNode()`）或迭代器访问是，则返回 `Attr` 类型。

`Attr` 继承链路： `EventTarget <-- Node <-- Attr` 。

## Comment 类型

`Comment` 类型表示注释节点。

在 HTML 和 XML 里，注释（Comments）为 `<!--` 和 `-->` 之间的内容。在 XML 里，注释中不能出现字符序列 `--`。

`Comment` 类型没有特定的属性，但是从其父类 `CharacterData` 继承属性，以及间接从 `Node` 继承部分属性。

可以使用 `new Comment()` 构造函数创建 `Comment` 对象，该对象以可选的 `DOMString` 参数作为它的文本内容。

## CDATASection 类型

`CDATASection` 接口用于表示 `CDATA` 片段（CDATA section）。

在 XML 中，`CDATA` 可以直接包含未经转义的文本。比如 `<` 和 `&`，只要位于 `CDATA` 片段中，就不需要被转义。

## DocumentType 类型

`DocumentType` 类型表示了一个包含文档类型的节点 `Node` 。

`DocumentType` 继承链路： `EventTarget <-- Node <-- DocumentType` 。
