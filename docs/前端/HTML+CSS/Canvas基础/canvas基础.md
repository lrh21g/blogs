---
category: Canvas
tag: 
  - Canvas
---

# Canvas 基础

Canvas API 提供了一个通过 JavaScript 和 HTML 的 `<canvas>` 元素来绘制图形的方式。它可以用于动画、游戏画面、数据可视化、图片编辑以及实时视频处理等方面。

## Canvas 与 svg 的区别

+ Canvas 是基于像素的即时模式图形系统，绘制完对象后不保存对象到内存中，当再次需要这个对象时，需要重新绘制
+ svg 是基于形状的保留模式图形系统，绘制完对象后会将其保存在内存中，当需要修改这个对象信息时，直接修改就可以了。

| Canvas                   | svg                                              |
| :----------------------- | :----------------------------------------------- |
| 依赖分辨率（位图）       | 不依赖分辨率（矢量图）                           |
| 单个 HTML 元素           | 每一个图形都是一个 DOM 元素                      |
| 只能通过脚本语言绘制图形 | 可以通过 CSS 也可以通过脚本语言绘制              |
| 不支持事件处理程序       | 支持事件处理程序                                 |
| 弱的文本渲染能力         | 最适合带有大型渲染区域的应用程序（比如谷歌地图） |

## canvas 设置宽高

+ HTML 设置 `width` 、 `height` 。 当 canvas 未设置宽高的时候， canvas 会初始化宽高 `width = 300px` 、 `height = 150px` 。

  ::: demo

  ```html
  <canvas id="setCanvasWHByHTML">
  ```

  ```css
  #setCanvasWHByHTML {
    background: #000;
  }
  ```

  :::

+ CSS 设置 `width` 、 `height` 。 使用 CSS 设置 canvas 宽高， canvas 画布在绘制图像时，会伸缩以适应它的框架尺寸：如果 CSS 的尺寸与初始画布的比例不一致，会出现扭曲。
  
  ::: demo

  ```html
  <canvas id="setCanvasWHByCSS">
  ```

  ```css
  #setCanvasWHByCSS {
    background: #000;
    width: 100px;
    height: 100px;
  }
  ```

  :::

+ JavaScript 设置 `width` 、 `height`

  ::: demo

  ```html
  <canvas id="setCanvasWHByJS">
  ```

  ```css
  #setCanvasWHByJS {
    background: #000;
  }
  ```

  ```js
  var canvas = document.getElementById("setCanvasWHByJS");
  var context = canvas.getContext("2d");
  canvas.width = 100;
  canvas.height = 100;
  ```

  :::

## Canvas 方法

### getContext() 获取 Canvas 对象

`HTMLCanvasElement.getContext(contextType, contextAttributes)` 方法返回 canvas 的上下文，如果上下文没有定义则返回 `null` 。

+ 上下文类型 (contextType)：指示使用何种上下文的 DOMString 。

  |               属性值                | 说明                                                                                                                           |
  | :---------------------------------: | :----------------------------------------------------------------------------------------------------------------------------- |
  |                `2d`                 | 创建一个 `CanvasRenderingContext2D` 二维渲染上下文，主要用于进行 2d 绘制。                                                     |
  |  `webgl` (或 `experimental-webgl`)  | 创建一个 `WebGLRenderingContext` （WebGL渲染上下文） 三维渲染上下文对象。只在实现 WebGL 版本1 (OpenGL ES 2.0) 的浏览器上可用。 |
  | `webgl2` (或 `experimental-webgl2`) | 创建一个 `WebGL2RenderingContext` 三维渲染上下文对象，可绘制三维3D效果。只在实现 WebGL 版本2 (OpenGL ES 3.0) 的浏览器上可用。  |
  |          `bitmaprenderer`           | 创建一个只提供将canvas内容替换为指定 `ImageBitmap` 功能的 `ImageBitmapRenderingContext` （位图渲染上下文）                     |

+ 上下文属性 (contextAttributes): 创建渲染上下文的时候设置多个属性。使用场景较少。

``` javascript
var canvas = document.getElementById("canvas");
// 检查支持性：测试 getContext() 方法的存在，可以检查是否支持
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  // drawing code here
} else {
  // canvas-unsupported code here
}
```

### toBlob() 创建 Blob对象

`HTMLCanvasElement.toBlob(callback, type, encoderOptions)` 方法创造 Blob 对象，用以展示 canvas 上的图片，该图片文件可以被缓存或保存到本地。

+ `callback` ：`toBlob()` 执行成功后的回调方法，可获得一个单独的 Blob 对象参数。
+ `type` ：可选参数，表示需要转换的图像的 type 类型，默认格式为 `image/png` 。可选项为 `image/jpeg` 、 `image/webp` 等。
+ `encoderOptions` ：可选参数，指定图片展示质量，范围是 0 - 1 。
  + `toBlob()` 方法转 PNG 是无损的，此参数默认是没有效的。
  + 当请求图片格式为 `image/jpeg` 或者 `image/webp` 时，默认压缩值是 0.92 。

### toDataURL() 返回图片展示的 data URI

`HTMLCanvasElement.toDataURL(type, encoderOptions)` 方法返回一个包含图片展示的 `data URI` ，`base64 data` 图片数据。

+ `type` ：表示图片格式，默认为 `image/png` ，图片的分辨率为 96dpi 。
+ `encoderOptions` ：表示转换的图片质量。范围是 0 - 1 。
  + 图片格式为 `image/jpeg` 或者 `image/webp`，其他 type 值无效。默认压缩质量是 0.92 。
  + 如果超出取值范围，将会使用默认值 0.92 ，其他参数会被忽略。

注意：

+ 如果画布的高度或宽度是 0，`toDataURL()` 返回字符串为 `data:,` 。
+ 传入的类型非 `image/png` ，但是返回的值以 `data:image/png` 开头，那么该传入的类型是不支持的。

## Canvas API

+ [MDN - Canvas](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
+ [Canvas API中文文档首页地图](https://www.canvasapi.cn/)
