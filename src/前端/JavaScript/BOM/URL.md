# location 对象与 URL

## location 对象

`location` 对象提供 URL 相关的信息和操作方法。可以通过 `window.location` 和 `document.location` 属性获取。

### location 对象属性

```javascript
document.location.href = 'https://username:password@developer.mozilla.org/en-US/search?q=URL#search-results-close-container'

// 整个 URL
document.location.href // 'https://username:password@developer.mozilla.org/en-US/search?q=URL#search-results-close-container'

// URL 的协议、主机名和端口，只读
document.location.origin // 'https://developer.mozilla.org'

// URL 对应协议，包含冒号（:）
document.location.protocol // 'https:'

// 主机，如果端口不是协议默认的 80 和 433，则还包括冒号（:）和端口
document.location.host // 'developer.mozilla.org'

// 主机名，不包括端口
document.location.hostname // 'developer.mozilla.org'

// 端口号
document.location.port // ''

// URL 的路径部分，从根路径 / 开始
document.location.pathname // '/en-US/search'

// URL 参数，从问号 ? 开始。
document.location.search // '?q=javascript'

// 块标识符，从 # 开始
document.location.hash // '#search-results-close-container'

// URL 中域名前的用户名
document.location.username // 'username'

// URL 域名前的密码
document.location.password // 'password'
```

- `location` 对象属性中只有 `origin` 属性是只读的，其他属性都可写。

- `location.href` 是浏览器唯一允许跨域写入的属性，即非同源的窗口可以改写另一个窗口（比如子窗口与父窗口）的 `location.href` 属性，导致后者的网址跳转。 `location` 的其他属性都不允许跨域写入。

  ```javascript
  // 跳转到新网址
  // 直接改写 location，相当于写入 href 属性
  document.location = 'http://www.example.com'
  // 等同于
  document.location.href = 'http://www.example.com'

  // 网页自动滚动到新的锚点
  document.location.href = '#top'
  // 等同于
  document.location.hash = '#top'
  ```

### location 对象方法

- `Location.assign(url)` ：触发窗口加载并显示指定的 URL 的内容。如果传入了一个无效的 URL，则会抛出一个 `SYNTAX_ERROR` 类型的 `DOMException` 。

- `Location.reload()` ：刷新当前页面，重新加载 URL 的资源。Firefox 对于该方法支持一个非标准的 `forceGet` Boolean 参数，当值为 `true` 时，将强制 `Firefox` 从服务器加载页面资源，如果是 `false` 或没有制定这个参数，浏览器可能从缓存当中加载页面。

- `Location.replace(url)` ：用给定的 URL 替换掉当前的资源。与 `assign()` 方法不同的是用 `replace()` 替换的新页面不会被保存在会话的历史 `History` 中，意味着用户将不能用后退按钮转到该页面。

- `Location.toString()` ：返回整个 URL 字符串，是 `Location.href` 的只读版本。

## URL

### URL 简介

统一资源定位符（URL）：定在 Internet 上可以找到资源的位置的文本字符串。

![URL](./files/images/URL.drawio.png)

- Scheme （协议）：表明了浏览器必须使用何种协议。通常都是 HTTP 协议或者 HTTPS 协议。其他协议博阿凯 `mailto:`（打开邮件客户端）或者 `ftp:`（处理文件传输）等。
- Authority
  - Domain Name （域名）：表明正在请求哪个 Web 服务器，也可以直接使用 IP address 。
  - Port （端口）：表示用于访问 Web 服务器上的资源的技术“门”。如果 Web 服务器使用 HTTP 协议的标准端口（HTTP 为 80，HTTPS 为 443）来授予其资源的访问权限，则通常会被忽略。否则是强制性的。
- Path to resource （资源路径）：网络服务器上资源的路径。
- Parameters （参数）：提供给网络服务器的额外参数。
- Anchor （锚点）：资源本身的另一部分的锚点。锚点表示资源中的一种“书签”，给浏览器显示位于该“加书签”位置的内容的方向。

### URL 的编码和解码

URL 的合法字符：

- URL 元字符：分号（`;`），逗号（`,`），斜杠（`/`），问号（`?`），冒号（`:`），at（`@`），`&`，等号（`=`），加号（`+`），美元符号（`$`），井号（`#`）

- 语义字符：`a-z`，`A-Z`，`0-9`，连词号（`-`），下划线（`_`），点（`.`），感叹号（`!`），波浪线（`~`），星号（`*`），单引号（`'`），圆括号（`()`）

- 其他字符出现在 URL 之中都必须转义。根据操作系统的默认编码，将每个字节转为百分号（`%`）加上两个大写的十六进制字母。

URL 的编码和解码方法：

- `encodeURI(URI)` ：转码 URL。会将元字符和语义字符之外的字符，都进行转义。

- `encodeURIComponent(URI)` ：转码 URL。会转码除了语义字符之外的所有字符，即元字符也会被转码。

- `decodeURI(URI)` ：解码 URL。`encodeURI()` 方法的逆运算。

- `decodeURIComponent(URI)` ：解码 URL。`encodeURIComponent()` 方法的逆运算。

## URL 接口

### URL 构造函数

`new URL(url, base)` 构造函数返回一个新创建的 URL 对象，该对象表示由参数定义的 URL。

- `url` ： 一个表示绝对或相对 URL 的 DOMString 或任何具有字符串化方法的对象。
  - 如果 url 是相对 URL，则会将 `base` 用作基准 URL。
  - 如果 url 是绝对 URL，则无论参数 `base` 是否存在，都将被忽略。
- `base` ：一个表示基准 URL 的字符串，当 url 为相对 URL 时，它才会生效。如果未指定，它默认为 `undefined`。

```javascript
let baseUrl = 'https://developer.mozilla.org'

new URL(baseUrl) // 'https://developer.mozilla.org/'

new URL('/', baseUrl) // 'https://developer.mozilla.org/'

new URL('http://www.example.com', baseUrl) // 'http://www.example.com'

new URL("//foo.com", baseUrl) // 'https://foo.com/'

new URL('/a', 'https://example.com/?query=1') // 'https://example.com/a'

new URL('en-US/docs', baseUrl) // 'https://developer.mozilla.org/en-US/docs'
new URL('en-US/docs', baseUrl + '/en-US/docs') // ''https://developer.mozilla.org/en-US/en-US/docs'
new URL('en-US/docs', baseUrl + '/en-US/docs/') // 'https://developer.mozilla.org/en-US/docs/en-US/docs'
new URL('/en-US/docs', baseUrl + '/en-US/docs') // 'https://developer.mozilla.org/en-US/docs'
new URL('/en-US/docs', baseUrl + '/en-US/docs/') // 'https://developer.mozilla.org/en-US/docs'

new URL('/en-US/docs') // Uncaught TypeError: Failed to construct 'URL': Invalid URL
new URL('/en-US/docs', '') // Uncaught TypeError: Failed to construct 'URL': Invalid base URL
```

### URL 实例属性

URL 实例的属性与 `location` 对象的属性基本一致，返回当前 URL 的信息。

```javascript
let url = new URL('https://username:password@developer.mozilla.org/en-US/search?q=URL#search-results-close-container')

// 整个 URL
url.href // 'https://username:password@developer.mozilla.org/en-US/search?q=URL#search-results-close-container'

// URL 的协议、主机名和端口，只读
url.origin // 'https://developer.mozilla.org'

// URL 对应协议，包含冒号（:）
url.protocol // 'https:'

// 主机，如果端口不是协议默认的 80 和 433，则还包括冒号（:）和端口
url.host // 'developer.mozilla.org'

// 主机名，不包括端口
url.hostname // 'developer.mozilla.org'

// 端口号
url.port // ''

// URL 的路径部分，从根路径 / 开始
url.pathname // '/en-US/search'

// URL 参数，从问号 ? 开始。
url.search // '?q=javascript'

// 块标识符，从 # 开始
url.hash // '#search-results-close-container'

// URL 中域名前的用户名
url.username // 'username'

// URL 域名前的密码
url.password // 'password'
```

### URL 静态方法

- `URL.canParse(url, base)` ：返回一个布尔值，表示绝对 URL 或与基准 URL 结合的相对 URL 是否可解析和有效。

  - `url` ： 一个表示绝对或相对 URL 的 DOMString 或任何具有字符串化方法的对象。
    - 如果 url 是相对 URL，则会将 `base` 用作基准 URL。
    - 如果 url 是绝对 URL，则无论参数 `base` 是否存在，都将被忽略。
  - `base` ：一个表示基准 URL 的字符串，当 url 为相对 URL 时，它才会生效。如果未指定，它默认为 `undefined`。

- `URL.createObjectURL(object)` ： 用来为上传/下载的文件、流媒体文件生成一个 URL 字符串，该字符串代表了 `File` 对象或 `Blob` 对象的 URL。

  - `object` 参数：表示用于创建 URL 的 File 对象、Blob 对象或者 MediaSource 对象。
  - URL 的生命周期和创建它的窗口中的 `document` 绑定。在 `document` 卸载的时候，会自动释放它们。
  - 在每次调用 `createObjectURL()` 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 `URL.revokeObjectURL()` 方法来释放。

- `URL.revokeObjectURL(objectURL)` ： 用来释放 `URL.createObjectURL()` 方法生成的 URL 实例。参数为 `URL.createObjectURL()` 方法返回的 URL 字符串。

  - `objectURL` 参数：表示通过调用 `URL.createObjectURL()` 方法产生的 URL 对象。

## URLSearchParams 对象

`URLSearchParams` 定义了一些实用的方法来处理 URL 的查询字符串。

### URLSearchParams 构造函数

`new URLSearchParams(options)` ：创建并返回一个新的 `URLSearchParams` 对象。

- `options` ： 可选值。可以是以下参数之一：
  - 字符串。从 `application/x-www-form-urlencoded` 的格式解析而来，开头的 `?` 字符会被忽略。
  - 一系列基于字面量的字符串键值对，或者任何对象（例如 `FormData` 对象），能提供一系列字符串对的迭代器对象。需要注意，`File` 将被序列化为 `[object File]`，而不是它们的文件名（就像 `application/x-www-form-urlencoded` 格式中的那样）。
  - 一个由字符串键和字符串值组成的键值对对象。请注意，不支持嵌套。

```javascript
let paramsByString = new URLSearchParams('?foo=1&bar=2')
// 等同于
let paramsBySearch = new URLSearchParams(document.location.search)

let paramsByArray = new URLSearchParams([
  ['foo', 1],
  ['bar', 2],
])

let paramsByObject = new URLSearchParams({ foo: 1, bar: 2 })

// URLSearchParams会对查询字符串自动编码
let paramsEncode = new URLSearchParams({ foo: '你好' })
paramsEncode.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```

### URLSearchParams 实例属性

- `URLSearchParams.size` ： 只读。表示搜索参数条目的总数

  ```javascript
  let searchParams = new URLSearchParams('?foo=1&bar=2')
  searchParams.size // 2
  ```

### URLSearchParams 实例方法

- `URLSearchParams.toString()` ： 返回适用在 URL 中的查询字符串。

- `URLSearchParams.has()` ： 返回一个布尔值，表示一个指定的键名 `name` 对应的值是否存在。

- `URLSearchParams.get(name)` ： 返回第一个与搜索参数的键名 `name` 对应的值。

- `URLSearchParams.getAll(name)` ： 以数组的形式返回与指定搜索参数的键名 `name` 对应的所有值。

- `URLSearchParams.append(name, value)` ： 插入一个新搜索参数。`name` 为插入搜索参数的键名，`value` 为插入搜索参数的值。

- `URLSearchParams.set(name, value)` ： 用于设置和搜索参数相关联的值。如果设置前已经存在匹配的值，该方法会删除多余的，如果将要设置的值不存在，则创建它。

- `URLSearchParams.delete(name)` ： 删除指定的键名（`name`）的所有搜索参数。

- `URLSearchParams.keys()` ： 返回一个迭代器，允许遍历对象中包含的所有键。这些键都是字符串对象。

- `URLSearchParams.values()` ： 返回一个迭代器，允许遍历对象中包含的所有值。

- `URLSearchParams.entries()` ： 返回一个迭代器，允许遍历该对象中包含的所有键/值对。其顺序与在查询字符串中出现的顺序相同。每一组键和值都是字符串对象。

- `URLSearchParams.forEach(callback(value, key, searchParams))` ： 允许通过回调函数 `callback` 来遍历 `URLSearchParams` 实例对象上的键值对

- `URLSearchParams.sort()` ： 对包含在此对象中的所有键/值对进行排序，并返回 `undefined`。排序顺序是根据键的 Unicode 代码点。该方法使用稳定的排序算法 (即，将保留具有相等键的键/值对之间的相对顺序)。

```javascript
let url = new URL('https://example.com?foo=1&bar=2&foo=3')
let params = new URLSearchParams(url.search)

params.toString() // 'foo=1&bar=2&foo=3'

params.has('foo') // true

params.get('foo') // '1'
params.getAll('foo') // ['1', '3']

params.append('baz', '4')
params.toString() // 'foo=1&bar=2&foo=3&baz=4'

// set 方法如果设置前已经存在匹配的值，该方法会删除多余的，如果将要设置的值不存在，则创建它。
params.set('bar', '5')
params.toString() // 'foo=1&bar=5&foo=3&baz=4'
params.set('foo', '6')
params.toString() // 'foo=6&bar=5&baz=4'

params.delete('baz')
params.toString() // 'foo=6&bar=5'

for (let key of params.keys()) {
  console.log(key)
}
// for
// bar

for (let value of params.values()) {
  console.log(value)
}
// 6
// 5

for (let [key, value] of params.entries()) {
  console.log(key, value)
}
// foo 6
// bar 5

params.forEach((value, key, searchParams) => {
  console.log(value, key, searchParams)
})
// 6 foo URLSearchParams{size:2}
// 5 bar URLSearchParams{size:2}

params.sort() // undefined
params.toString() // bar=5&foo=6
```
