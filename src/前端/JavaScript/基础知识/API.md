# JavaScript API

## postMessage 多窗口通信

### window.postMessage

**语法** ： `otherWindow.postMessage(message, targetOrigin, [transfer])`

**描述** ： 用于安全地实现跨源通信。例如：在 a.com 页面中，向其 `iframe` 子窗口 b.com 页面发送消息。

**参数** ：

- `otherWindow` 参数 ：其他窗口的一个引用，比如 `iframe` 的 `contentWindow` 属性、执行 `window.open` 返回的窗口对象、或者是命名过或数值索引的 `window.frames`。
- `message` 参数 ：将要发送到其他 window 的数据。
- `targetOrigin` 参数 ： 通过窗口的 `origin` 属性来指定哪些窗口能接收到消息事件，
  - 其值可以是字符串 `"*"`（表示无限制）或者一个 URI。
  - 在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配 `targetOrigin` 提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。
- `transfer` 参数 ： 可选。是一串和 `message` 同时传递的 `Transferable` 对象。该对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

### message 事件

**语法** ： `window.addEventListener("message", function(event) { ... });`

**描述** ： 当其他 `window` 对象调用 `postMessage()` 方法向当前 `window` 对象发送信息时会触发 `message` 事件。

**参数** ：

- `event` 参数 ： 一个 `MessageEvent` 对象，该对象包含了 `postMessage` 方法传递的数据。提供以下三个属性：
  - `data` ： 从其他 `window` 中传递过来的数据。
  - `origin` ： 调用 `postMessage` 方法窗口的 `origin`。可以用于过滤不是发送给本窗口的消息。
  - `source` ： 发送消息的窗口对象的引用。可以在该对象身上调用 `postMessage` 方法来向其发送消息。

### 多窗口通信示例

- 子窗口向父窗口发送消息

  ```javascript
  // 允许通信的 URL Origin 列表
  const allowPostMessageOrigin = []
  const allowPostMessageType = ['iframePostMessage']

  // 网页webview之间的调用
  function callIframe(data, callback) {
    // 获取父 iframe 的 URL origin
    function getParentUrlOrigin() {
      let parentUrl = ''
      if (window.parent !== window) {
        try {
          parentUrl = window.parent.location.href
        } catch (e) {
          parentUrl = document.referrer
        }
      }
      return parentUrl ? new URL(parentUrl).origin : ''
    }

    // message 事件回调函数
    function handleMessageEvent(event) {
      const parentUrlOrigin = getParentUrlOrigin()
      const { type, data } = event.data || {}

      if (event.origin !== parentUrlOrigin) return
      // 判断数据类型是否为指定类型
      if (!allowPostMessageType.includes(type)) return

      callback && callback(data)
      window.removeEventListener('message', handleMessageEvent)
      return event.data
    }

    if (window.parent === window.self) return

    const parentUrlOrigin = getParentUrlOrigin()
    // 判断是否为允许接受消息的 URL Origin
    if (!parentUrlOrigin || !allowPostMessageOrigin.includes(parentUrlOrigin))
      return

    // 监听 message 事件
    window.addEventListener('message', handleMessageEvent)

    // 通过 postMessage 向父 iframe 发送数据
    // > 发送数据 ： { type: 'iframePostMessage', data } ，其中:
    // > >>> type 为数据类型，默认值为 iframePostMessage
    // > >>> data 为数据
    // > parentUrlOrigin : 指定哪些窗口能接收到消息事件，默认为父 iframe 的 URL Origin
    window.parent.postMessage(
      { type: 'iframePostMessage', data },
      parentUrlOrigin
    )
  }
  ```

- 父窗口监听子窗口发送消息

  ```javascript
  // 允许通信的 URL Origin 列表
  const allowPostMessageOrigin = []
  // 允许通信的数据类型列表
  const allowPostMessageType = ['iframePostMessage']

  function listenerMessage(event) {
    const { type } = event.data

    if (!allowPostMessageType.includes(type)) return
    if (!allowPostMessageOrigin.includes(event.origin)) return

    // 向发送消息的窗口发送消息
    event.source.postMessage(
      {
        type: 'iframePostMessage',
        data: 'send message data',
      },
      event.origin
    )
  }

  window.removeEventListener('message', listenerMessage)
  ```

## Web Cryptography 密码学工具

Web Crypto API 的 `SubtleCrypto` 接口提供了底层加密函数，支持一系列的加密算法，包括对称、非对称、哈希等。可以通过 `crypto` 属性提供的 `Crypto` 对象中的 `subtle` 属性来访问 `SubtleCrypto` 的相关特性。

- `window.crypto.subtle.encrypt()` ：返回一个 `Promise` ，会兑现与参数中给定的明文、算法和密钥对应的密文。

- `window.crypto.subtle.decrypt()` ：返回一个 `Promise` ，会兑现与参数中给定的密文、算法和密钥对应的明文。

- `window.crypto.subtle.sign()` ：返回一个 `Promise` ，会兑现与参数中给定的文本、算法和密钥对应的签名。

- `window.crypto.subtle.verify()` ：返回一个 `Promise` ，会兑现一个布尔值，表示参数中给定的签名是否与文本、密钥和算法对应的签名相匹配。

- `window.crypto.subtle.digest()` ：返回一个 `Promise` ，会兑现通过参数中给定的算法和文本生成的摘要。

- `window.crypto.subtle.generateKey()` ：返回一个 `Promise` ，会兑现一个新生成的密钥（用于对称加密算法）或密钥对 (en-US)（用于非对称加密算法）。它们与通过参数给定的算法、用法和可导出性相对应。

- `window.crypto.subtle.deriveKey()` ：返回一个 `Promise` ，会兑现一个新生成的、从主密钥（以过参数给定的算法）派生出来的密钥。

- `window.crypto.subtle.deriveBits()` ：返回一个 `Promise` ，会兑现一个新生成的、从主密钥（以通过参数给定的算法）派生出来的伪随机比特序列。

- `window.crypto.subtle.importKey()` ：返回一个 `Promise` ，会兑现一个新生成的密钥，该密钥与通过参数给定的密钥格式、算法、原始密钥数据、用法和可导出性相对应。

- `window.crypto.subtle.exportKey()` ：返回一个 `Promise` ，会兑现一个包含所请求格式的密钥的原始密钥数据。

- `window.crypto.subtle.wrapKey()` ：返回一个 `Promise` ，会兑现一个包装的对称密钥，该密钥可在不安全的环境中使用（传输、存储）。该密钥与通过参数给定的格式相匹配，并使用制定的算法来包装给定的密钥。

- `window.crypto.subtle.unwrapKey()` ：返回一个 `Promise` ，会兑现一个与通过参数给定的包装密钥（wrapped key）对应的密钥。

## 文本编码与解码

### 文本编码

#### TextEncoder

`new TextEncoder()` 返回一个新创建的 `TextEncoder` 对象，该对象将生成具有 UTF-8 编码的字节流。

- `TextEncoder` 实例属性

  - `textEncoder.encoding` ：只读。返回一个字符串，表示 `TextEncoder` 实例的编码方式。默认值为 `"utf-8"` 。

- `TextEncoder` 实例方法

  - `textEncoder.encode(string)` 方法：接收一个字符串 `string` ，返回一个 `Uint8Array` ，包含给定字符串的 UTF-8 编码。

    ```javascript
    const encoder = new TextEncoder()
    const view = encoder.encode('你好')
    console.log(view) // Uint8Array(6) [228, 189, 160, 229, 165, 189]
    ```

  - `textEncoder.encodeInto(string, uint8Array)` 方法：接收一个字符串 `string` 和一个目标 `Uint8Array` ，将生成的 UTF-8 编码的文本放入目标数组中，并返回一个指示编码进度的字典对象。

    ```javascript
    const encoder = new TextEncoder()

    function encodeIntoAtPosition(string, u8array, position) {
      return encoder.encodeInto(
        string,
        position ? u8array.subarray(position | 0) : u8array
      )
    }

    const u8array = new Uint8Array(8)
    encodeIntoAtPosition('hello', u8array, 2)
    console.log(u8array.join()) // 0,0,104,101,108,108,111,0
    ```

#### TextEncoderStream

`new TextEncoderStream()` 返回一个新创建的 `TextEncoderStream` 对象，该对象使用 UTF-8 编码将字符串流转换为字节。

- `TextEncoderStream` 实例属性

  - `textEncoderStream.encoding` ：只读。返回一个字符串，表示 `TextEncoderStream` 实例的编码方式。默认值为 `"utf-8"` 。
  
  - `textEncoderStream.readable` ：只读。返回一个 `ReadableStream` 对象，表示可读的字节数据流。

  - `textEncoderStream.writable` ：只读。返回一个 `WritableStream` 对象，表示将流数据写入目的地（称为接收器）提供了一个标准的抽象。

### 文本解码

#### TextDecoder

`new TextDecoder()` 返回一个新创建的 `TextDecoder` 对象。

- `TextDecoder` 实例属性

  - `textDecoder.encoding` ：只读。返回一个字符串，表示 `TextDecoder` 实例的编码方式。默认值为 `"utf-8"` 。

  - `textDecoder.fatal` ：只读。返回一个布尔值，表示 `TextDecoder` 实例是否使用严格模式。

  - `textDecoder.ignoreBOM` ：只读。返回一个布尔值，表示 `TextDecoder` 实例是否忽略 BOM。

- `TextDecoder` 实例方法

  - `textDecoder.decode(buffer, options)` 方法：返回一个字符串，其包含作为参数传递的缓冲区解码后的文本。
    - `buffer` 参数：可选。一个 `ArrayBuffer`、`TypedArray` 或包含要解码的编码文本的 `DataView` 对象。
    - `options` 参数：可选。具有以下属性：
      - `options.stream` ：布尔值，表示在后续调用 `decode()` 将跟随附加数据。默认是 `false`。
        - 如果以分块的形式处理数据，则设置为 `true` 。
        - 如果是最终的分块或者数据没有分块，则设置为 `false` 。

#### TextDecoderStream

`new TextDecoderStream()` 返回一个新创建的 `TextDecoderStream` 对象，该对象用于将二进制编码的文本流转换为字符串。

- `TextDecoderStream` 实例属性

  - `textDecoderStream.encoding` ：只读。返回一个字符串，表示 `TextDecoderStream` 实例的编码方式。默认值为 `"utf-8"` 。
  
  - `textDecoderStream.fatal` ：只读。返回一个布尔值，表示 `TextDecoderStream` 对象的错误模式是否设置为 `fatal`。
  
  - `textDecoderStream.ignoreBOM` ：只读。返回一个布尔值，表示 `TextDecoderStream` 对象是否忽略 BOM。
  
  - `textDecoderStream.readable` ：只读。返回一个 `ReadableStream` 对象，表示可读的字节数据流。
  
  - `textDecoderStream.writable` ：只读。返回一个 `WritableStream` 对象，表示将流数据写入目的地（称为接收器）提供了一个标准的抽象。

## Notifications API

Notification 构造函数用于创建和显示通知。

**语法** ： `new Notification(title, options)`

**描述** ： 创建一个 `Notification` 对象实例，用于显示通知。

**参数** ：

- `title` 参数 ：通知的标题。
- `options` 参数 ：可选。一个包含通知的配置信息的对象，包含以下属性：
  - `dir` ：指定通知的文字方向。可选值为 `"auto"` 、 `"ltr"` （从左到右）和 `"rtl"` （从右到左）。默认值为 `"auto"` 。
  - `lang` ：指定通知的语言。默认值为 `""` 。
  - `badge` ：指定通知的图标。用于在没有足够空间显示通知本身时表示通知。
  - `body` ：指定通知的正文内容，显示在标题下方。
  - `tag` ：指定通知的标签，默认为 `""` 。如果指定了相同标签的通知，则后面的通知会覆盖前面的通知。
  - `icon` ：指定通知中显示的图标的 URL。
  - `image` ：指定通知中显示的图像的 URL。
  - `data` ：指定与通知关联的数据，可以是任意数据类型。
  - `vibrate` ：指定通知的振动模式。当该值被指定时，`silent` 参数不得设置为 `true`。
  - `silent` ：指定通知是否静音。默认值为 `false` 。
  - `renotify` ：指定新通知替换旧通知后是否应通知用户。默认值为 `false` 。
  - `requireInteraction` ：指定通知应保持活动状态，直到用户单击或关闭它，而不是自动关闭。默认值为 `false`。
  - `actions` ：指定通知中显示的一系列操作的数组。数组中的每个元素都是一个具有以下成员的对象：
    - `action`：一个标识要在通知上显示的用户操作的字符串。
    - `title`：一个包含要向用户显示的操作文本的字符串。
    - `icon`：一个包含与操作一起显示的图标 URL 的字符串。

**实例方法** ：

- `notification.close()` 方法：关闭通知。

**实例事件** ：

- `notification.onshow` 事件：当通知显示时触发。
- `notification.onclick` 事件：当用户点击通知时触发。
- `notification.onclose` 事件：当通知关闭时触发。
- `notification.onerror` 事件：当通知发生错误时触发。

## Streams API

Stream API 允许 JavaScript 以编程方式访问从网络接收的数据流，并且允许开发人员根据需要进行处理。

Stream API 定义了三种流类型：

- **可读流**：可以通过某个公共接口读取数据块的流。数据在内部从底层源进入流，然后由消费者（consumer）进行处理。

  - `ReadableStream` ： 表示数据的可读流。用于处理 Fetch API 返回的响应，或者开发者自定义的流（例如，通过 `ReadableStream()` 构造的流）。
  - `ReadableStreamDefaultReader` ： 表示默认 `reader`，用于读取来自网络的数据流（例如， Fetch 请求）。
  - `ReadableStreamDefaultController` ： 表示一个 controller，用于控制 `ReadableStream` 的状态及内部队列。默认的 controller 用于处理非字节流。

- **可写流**：可以通过某个公共接口写入数据块的流。生产者（producer）将数据写入流，数据在内部传入底层数据槽（sink）。

  - `WritableStream` ： 为将流写入目的地（称为接收器）的过程，提供了一个标准抽象。内置了背压和队列机制。
  - `WritableStreamDefaultWriter` ： 表示默认 `writer`，用于将分块的数据写入可写流中。
  - `WritableStreamDefaultController` ： 表示一个 controller，用于控制 `WritableStream` 的状态。当创建一个 `WritableStream` 时，对应的 `WritableStreamDefaultController` 实例会被提供给底层的接收器供其操作。

- **转换流**：由两种流组成，可写流用于接收数据（可写端），可读流用于输出数据（可读端）。这两个流之间是转换程序（transformer），可以根据需要检查和修改流内容。

  - `TransformStream` ： 表示一组可转化的数据。
  - `TransformStreamDefaultController` ： 提供操作和转换流关联的 `ReadableStream` 和 `WritableStream` 的方法。

流的基本单位是块（chunk）。

- 块可是任意数据类型，但通常是定型数组。每个块都是离散的流片段，可以作为一个整体来处理。
- 块不是固定大小的，也不一定按固定间隔到达。在理想的流当中，块的大小通常近似相同，到达间隔也近似相等。

针对流不平衡是问题，所有流都会为已进入流但尚未离开流的块提供一个内部队列。

- 对于均衡流，内部队列中会有零个或少量排队的块，因为流出口块出列的速度与流入口块入列的速度近似相等。这种流的内部队列所占用的内存相对比较小。
- 如果块入列速度快于出列速度，则内部队列会不断增大。流不能允许其内部队列无限增大，因此它会使用反压（backpressure）通知流入口停止发送数据，直到队列大小降到某个既定的阈值之下。这个阈值由排列策略决定，这个策略定义了内部队列可以占用的最大内存，即高水位线（high water mark）。

## Performance 计时

Performance API 是一组用于衡量 web 应用性能的标准，由多个 API 构成。

- High Resolution Time API ：用于衡量时间的 API。定义了 `performance.now()` 方法返回一个微秒精度的浮点值。

  `performance.now()` 计时器采用相对度量。该计时器在执行上下文创建时从 0 开始计时。例如， 打开页面或创建工作线程时，`performance.now()` 会从 0 开始计时。
  
  由于该计时器在不同上下文中初始化时可能存在时间差，因此不同上下文之间如果没有共享参照点则不可能直接比较 `performance.now()`。 `performance.timeOrigin` 属性返回计时器初始化时全局系统时钟的值。

  ```javascript
  const relativeTimestamp = performance.now()
  const absoluteTimestamp = performance.timeOrigin + relativeTimestamp
  console.log(relativeTimestamp) // 244.43500000052154
  console.log(absoluteTimestamp) // 1561926208892.4001
  ```

- User Timing API ：用于记录和分析自定义性能条目。定义了 `performance.mark()` 方法记录自定义性能条目。

  计算开始前和结束后各创建一个自定义性能条目可以计算时间差。最新的标记（mark）会被推到 `getEntriesByType()` 返回数组的开始。

  ```javascript
  performance.mark('foo')
  for (let i = 0; i < 1e6; ++i) {}
  performance.mark('bar')

  const [endMark, startMark] = performance.getEntriesByType('mark')
  console.log(startMark.startTime - endMark.startTime) // 1.3299999991431832
  ```

- Navigation Timing API ：提供了高精度时间戳，用于度量当前页面加载速度。浏览器会在导航事件发生时自动记录 `PerformanceNavigationTiming` 条目。该对象会捕获大量时间戳，用于描述页面是何时以及如何加载的。

  ```javascript
  const [performanceNavigationTimingEntry] = performance.getEntriesByType('navigation')

  console.log(performanceNavigationTimingEntry)

  console.log(performanceNavigationTimingEntry.loadEventEnd - performanceNavigationTimingEntry.loadEventStart) 
  // 0.805000017862767
  ```

- Resource Timing API ：提供了高精度时间戳，用于度量当前页面加载时请求资源的速度。浏览器会在加载资源时自动记录 `PerformanceResourceTiming`。该对象会捕获大量时间戳，用于描述资源加载的速度。

  ```javascript
  const performanceResourceTimingEntry = performance.getEntriesByType('resource')[0]

  console.log(performanceResourceTimingEntry)

  console.log(performanceResourceTimingEntry.responseEnd - performanceResourceTimingEntry.requestStart)
  // 493.9600000507198
  ```
