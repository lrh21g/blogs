# 混合开发

Hybrid App：混合了Native（原生）技术和web技术进行开发的移动应用。主要有以三种方式：

+ 基于`WebView UI(JSBridge)`: 通过`JSBridge`完成`Web端`和`Native端`的通讯，从而赋予`Web端`原生能力
+ 基于`Native UI(ReactNative、Weex)`: 在赋予`Web端`原生能力的基础之上，通过`JSBridge`将js解析成虚拟节点树(Virtual Dom)传递到`Native端`并使用原生渲染
+ 小程序方案(微信、支付宝小程序等): 通过更加`定制化的JSBridge`，并使用`双 WebView`、`双线程`的模式隔离了`JS逻辑`与`UI渲染`，形成了特殊的开发模式，加强了Web端与Native端混合程度，提高了页面性能及开发体验。

## Hybrid App的本质

在原生(Native) APP中，使用`WebView`作为容器，来承载一个Web页面。

原生(Native)和Web端的双向通讯层(跨语言解决方案) —— `JSBridge`

+ 定义: 用JavaScript搭建起来的桥, 一端是Web端, 一端是Native。
+ 目的: 让Native端可以调用Web的JavaScript代码, 让Web端可以调用Native的原生代码

## Android、IOS与Web通讯的对比

+ 相同点
  + 通过`WebView`来完成网页的加载
  + 通过`向Window注入对象`的方式来提供可被Web端调用的方法
  + 可以直接调用Web端`挂载到Window对象`下的方法
+ 不同点
  
  |                  |            Android             |                                    IOS                                     |
  | ---------------- | :----------------------------: | :------------------------------------------------------------------------: |
  | 注入对象         |       可提供`注入对象名`       |                               固定为`webkit`                               |
  | JS调用Native方式 | 可直接`获取注入对象，调用方法` | 相对固定写法(`window.webkit.messageHandlers.方法名.postMessage(入参对象)`) |
  | 传递数据格式     |     只能接受`基本类型数据`     |                           可以接受`任意类型数据`                           |
  | 返回值           |        可直接接受返回值        |                             无法直接获取返回值                             |
