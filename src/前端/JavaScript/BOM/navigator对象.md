# navigator 对象，screen 对象

## navigator 对象

Navigator 接口表示用户代理的状态和标识，包含浏览器和系统信息。它允许脚本查询它和注册自己进行一些活动。

### navigator 属性

- `navigator.permissions` ： 只读属性。返回一个权限对象，可用于查询和更新权限 API 所涵盖 API 的权限状态。
- `navigator.userAgent` ： 返回浏览器的 User Agent 字符串，表示用户设备信息，包含了浏览器的厂商、版本、操作系统等信息。
- `navigator.cookieEnabled` ： 只读属性。返回一个布尔值，来表示当前页面是否启用了 `cookie` 。
- `navigator.onLine` ： 返回浏览器的联机状态的布尔值，`true` 表示在线，`false` 表示离线。只要浏览器连接网络的能力发生变化，该属性就会发送更新。
- `navigator.language` ： 只读属性。返回一个表示用户偏好语言（通常是浏览器界面语言）的字符串。
- `navigator.languages` ： 只读属性。返回代表用户首选语言的字符串数组。
- `navigator.geolocation` ： 只读属性。返回一个 `Geolocation` 对象，通过这个对象可以访问到设备的位置信息。
  - `navigator.geolocation.getCurrentPosition(success, error, options)` ： 确定设备的位置并返回一个携带位置信息的 Position 对象。
  - `navigator.geolocation.watchPosition(success, error, options)` ： 注册监听器，在设备的地理位置发生改变的时候自动被调用。每当设备位置改变时，返回一个 long 类型的该监听器的 ID 值。
  - `navigator.geolocation.clearWatch(id)` ： 注销使用 `geolocation.watchPosition()` 注册的位置监听器或错误监听器。
- `navigator.clipboard` ： 返回一个可以读写剪切板内容的 `Clipboard` 对象。
  - `navigator.clipboard.read()` ： 从剪贴板读取数据（比如图片），返回一个 `Promise` 对象。在检索到数据后，`Promise` 将兑现一个 `ClipboardItem` 对象的数组来提供剪切板数据。
  - `navigator.clipboard.readText()` ： 从操作系统读取文本，返回一个 `Promise` 对象。在从剪切板中检索到文本后，`Promise` 将兑现一个包含剪切板文本数据的 DOMString。
  - `navigator.clipboard.write()` ： 写入任意数据至操作系统剪贴板。异步操作，在操作完成后，返回的 `Promise` 的将被兑现。
  - `navigator.clipboard.writeText()` ： 写入文本至操作系统剪贴板，返回一个 `Promise` 对象。在文本被完全写入剪切板后，返回的 `Promise` 将被兑现。
- .....

### navigator 方法

- `navigator.clearAppBadge()` ：将当前应用程序图标上的徽章设置为 `nothing` 来清除该徽章。
- `navigator.getBattery()` ： 提供有关系统电池的信息。
- `navigator.getGamepads()` ： 返回一个游戏手柄对象数组，设备上连接的每个游戏手柄都有一个。
- ......

## screen 对象

`screen` 对象表示一个屏幕窗口，往往指的是当前正在被渲染的 `window` 对象，可以使用 `window.screen` 获取它。

- `screen.width` ： 浏览器窗口所在的屏幕的宽度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
- `screen.height` ： 浏览器窗口所在的屏幕的高度（单位像素）。
- `screen.availWidth` ： 浏览器窗口可用的屏幕宽度（单位像素）。
- `screen.availHeight` ： 浏览器窗口可用的屏幕高度（单位像素）。部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，该属性等于 height 减去那些被系统组件的高度。
- `screen.availTop` ： 返回浏览器可用空间上边距离屏幕（系统桌面）上边界的距离（单位像素）。
- `screen.availLeft` ： 返回浏览器可用空间左边距离屏幕（系统桌面）左边界的距离（单位像素）。
- `screen.orientation` ： 只读属性，返回屏幕当前的方向。
- `screen.pixelDepth` ： 返回屏幕的位深度/色彩深度（bit depth）。
- `screen.colorDepth` ： 返回屏幕的颜色深度（color depth）。
