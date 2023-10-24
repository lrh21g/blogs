# Storage

## sessionStorage 和 localStorage

Storage 提供了访问特定域名下的会话存储或本地存储的功能，数据存储大小为 5M 。例如，可以添加、修改或删除存储的数据项。

- `window.sessionStorage` ： 操作一个域名的会话存储。当会话结束（通常是窗口关闭），数据会被清空。

- `window.localStorage` ： 操作一个域名的本地存储，数据长期存储。

### Storage 属性

- `Storage.length` ： 只读。返回一个整数，表示存储在 Storage 对象中的数据项数量。

### Storage 方法

- `Storage.key(index)` ： 该方法接受一个数值 `index` 作为参数，并返回存储中的第 `index` 个键名。

- `Storage.getItem(keyName)` ： 该方法接受一个键名 `keyName` 作为参数，返回键名对应的值。如果不存在，则返回 `null` 。

- `Storage.setItem(keyName, keyValue)` ： 该方法接受一个键名 `keyName` 和值 `keyValue` 作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。

- `Storage.removeItem(keyName)` ： 该方法接受一个键名 `keyName` 作为参数，并把该键名从存储中删除。

- `Storage.clear()` ： 调用该方法会清空存储中的所有键名。

### StorageEvent 事件

Storage 储存的数据发生变化时，会触发 `storage` 事件，可以指定这个事件的监听函数。

```javascript
window.addEventListener('storage', onStorageChange)
```

`storage` 事件监听函数接受一个 `event` 实例对象作为参数，该对象继承了 StorageEvent 接口。特有属性（只读）如下：

- `StorageEvent.key` ：字符串，被修改的键名。如果 `storage` 事件是由 `clear()` 方法引起，该属性返回 `null` 。

- `StorageEvent.newValue` ：字符串，修改后的新值。如果 `storage` 事件是由 `clear()` 方法或删除该键值对引发的，该属性返回 `null` 。

- `StorageEvent.oldValue` ：字符串，在修改前的旧值。如果该键值对是新增的，该属性返回 `null` 。

- `StorageEvent.storageArea` ：对象，被操作的 Storage 对象。可以从该属性上面获取当前域名储存的所有键值对。

- `StorageEvent.url` ：字符串，key 发生改变的对象所在文档的 URL 地址。

## HTTP Cookie

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据。

- 浏览器会存储 cookie 并在下次向同一服务器再发起请求时携带并发送到服务器上。
- Cookie 主要用于以下三个方面：
  - 会话（session）状态管理：如用户登录状态、购物车、游戏分数或其他需要记录的信息
  - 个性化设置：如用户自定义设置、主题和其他设置
  - 浏览器行为跟踪：如跟踪分析用户行为等
- Cookie 容量仅 4 KB，缺乏数据操作接口，而且会影响性能。客户端存储可以使用 Web storage API 和 IndexedDB 。

### Cookie 的属性

- `Expires`，`Max-Age`

  - `Expires` ： 过期时间，即在此时候之后，响应过期。UTC 格式，可以使用 `Date.prototype.toUTCString()` 进行格式转换。

    - 如设置无效的日期（比如 `0`），代表着过去的日期，即该资源已经过期。
    - 如果不设置该属性，或者设为 `null`，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，Cookie 会被删除。
  
  - `Max-Age` ： 有效期，指定的一段时间后被删除 Cookie 。

  如果同时指定了 `Expires` 和 `Max-Age` ，`Max-Age` 的值将优先生效。

  如果 `Set-Cookie` 字段没有指定 `Expires` 或 `Max-Age` 属性，即它在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie 。

- `Domain`，`Path`

  `Domain` 和 `Path` 属性标识定义了 Cookie 的作用域：即允许 Cookie 应该发送给哪些 URL。

  - `Domain` 属性：指定 Cookie 属于哪个域名，浏览器向服务器发送 HTTP 请求时，通过该属性判断是否需要附带某个 Cookie 。

    - 如果未指定 `Domain` 属性，浏览器默认将其设为浏览器的当前域名。如果当前域名是一个 IP 地址，则不得设置 `Domain` 属性。
    - 如果指定了 `Domain` 属性，则需遵循如下规则：只能是当前域名或者当前域名的上级域名，但设为上级域名时，不能设为顶级域名（如： `.com` 、 `.net` 等）或公共域名（开放给外部用户设置子域名的域名，如： `github.io`），否则浏览器会拒绝设置。

      - 如果当前域名为 `x.y.z.com` ，则 `Domain` 属性可设置为 `x.y.z.com` 或 `y.z.com` 或 `z.com` ，但不能设置为 `foo.x.y.z.com` 或 `another.domain.com` 。
      - 如果当前域名为 `foo.github.io` ，则 `Domain` 属性只能设置为 `foo.github.io` ，不能设置为 `github.io` （该域名为公共域名）。

  - `Path` 属性：指定浏览器发出 HTTP 请求时，哪些路径需要附带 Cookie 。当浏览器发现 `Path` 属性是 HTTP 请求路径的开头一部分，则会在头信息中携带 Cookie 。

    - 如果 `Path=/docs` ，则 `/docs` 、 `/docs/` 、 `/docs/Web/` 都会匹配，携带 Cookie 。但，不会匹配 `/` 、 `/docsets` 。
    - 如果 `Path=/` ， 则 `/docs` 都会匹配，携带 Cookie 。

- `Secure`，`HttpOnly`

  `Secure` 和 `HttpOnly` 属性确保 Cookie 被安全发送，并且不会被意外的参与者或脚本访问。

  - `Secure` 属性：指定 Cookie 只应通过被 HTTPS 协议加密过的请求发送给服务端。如果是 HTTP 协议，则无法使用 `Secure` 属性设置 Cookie ，但不会阻止对 Cookie 中敏感信息的访问。
  
  - `HttpOnly` 属性：指定 Cookie 无法通过 JavaScript API （比如： `document.cookie` 属性 、 `XMLHttpRequest` 对象 、 Request API 等）获取，仅用于服务器。

- `SameSite`

  `SameSite` 属性允许服务器指定是否/何时通过跨站点请求发送，可用于防止 CSRF 攻击（Cookie 往往用于存储用户的身份信息，恶意网站可以设法伪造带有正确 Cookie 的 HTTP 请求）和用户追踪。

  `SameSite` 属性的属性值如下。如果没有设置 `SameSite` 属性，则将 Cookie 视为 `Lax`。

  - `Strict` ：最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。只有当前网页的 URL 与请求目标一致，才会带上 Cookie。
  - `Lax` ：大多数情况也是不发送第三方 Cookie，但是导航到目标网址的 Get 请求除外。导航到目标网址的 GET 请求，只包括三种情况：链接，预加载请求，GET 表单。
  - `None` ：浏览器会在同站请求和跨站请求下继续发送 Cookie，但仅在安全的上下文中（即，如果 `SameSite=None`，且还必须设置 `Secure` 属性）。

### Cookie 与 HTTP

- 服务器：收到 HTTP 请求后，服务器可以在响应标头里面添加一个或多个 `Set-Cookie` 选项。
  - 一个 `Set-Cookie` 字段里面，可以同时包括多个属性，没有次序的要求。
  - 服务器如果要改变一个已设置的 Cookie，必须同时满足四个条件： Cookie 的 `key`、`domain`、`path` 和 `secure` 都是匹配的。只要有一个属性不同，就会生成一个全新的 Cookie ，而不是替换。

  ```javascript
  Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly
  ```

- 浏览器：收到 HTTP 响应后，通常会保存下 Cookie，并将其放在 HTTP Cookie 标头内，向同一服务器发出请求时一起发送。

### document.cookie

`document.cookie` 获取并设置与当前文档相关联的 Cookie。

- 读取时，会返回当前网页的所有 Cookie （前提条件：对应 Cookie 不能有 `HttpOnly` 属性）。返回符串包含所有的 Cookie，每条 cookie 以 `分号和空格 (; )` 分隔（即： `key=value` 键值对）。
- 设置时，Cookie 的值必须为 `key=value` 键值对形式（等号两边不能有空格）。
  - 一次只能写入一个 Cookie 。
  - 必须对分号、逗号和空格进行转义（它们都不允许作为 Cookie 的值），可以使用 `encodeURIComponent` 方法处理。
  - Cookie 属性的写入注意点：
    - `path` 属性值必须为绝对路径，默认为当前路径。
    - `domain` 属性值必须是当前发送 Cookie 的域名的一部分。如果显式设置该属性，则该域名的任意子域名也可以读取 Cookie。
    - `max-age` 属性值为秒数。
    - `expires` 属性值为 UTC 格式，可以使用 `Date.prototype.toUTCString()` 进行日期格式转换。
- 删除一个现存 Cookie 的唯一方法，是设置它的 `expires` 属性为一个过去的日期。

```javascript
document.cookie =
  'fontSize=14; ' +
  'expires=' + someDate.toGMTString() + '; ' +
  'path=/subdirectory; ' +
  'domain=example.com'
```
