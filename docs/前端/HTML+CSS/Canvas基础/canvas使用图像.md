---
category: Canvas
tag: 
  - Canvas
---

# Canvas 使用图像

引入图像到 canvas 中的基本操作：

+ 获得一个指向 `HTMLImageElement` 的对象或者另一个 `canvas` 元素的引用作为源，也可以通过提供一个 URL 的方式来使用图片
+ 使用 `drawImage()` 函数将图片绘制到画布上

## 获取绘制的图片

canvas 可以使用作为图片的源的类型：

+ `HTMLImageElement` : 由 `Image()` 函数构造出来，或者任何的 `<img>` 元素。
+ `HTMLVideoElement` : 用一个 HTML 的 `<video>` 元素作为图片源，可以从视频中抓取当前帧作为一个图像。
+ `HTMLCanvasElement` : 使用另一个 `<canvas>` 元素作为图片源。
+ `ImageBitmap` : 一个高性能的位图，可以低延迟地绘制，它可以从上述的所有源以及其它几种源中生成。

### 使用相同页面内的图片

获得与canvas相同页面内的图片的引用：

+ `document.images` 集合 : 返回当前文档中所有 `image` 元素的集合
+ `document.getElementsByTagName()`
+ `document.getElementById()`

### 使用其他域名下的图片

在 `HTMLImageElement` 上使用 `crossOrigin` 属性，可以请求加载其它域名上的图片。如果图片的服务器允许跨域访问图片，可以使用这个图片而不污染 canvas，否则，使用这个图片将会污染 canvas。

`HTMLImageElement.crossOrigin` 属性用于读写 `<img>` 元素的 `crossorigin` 属性，表示跨域设置。

+ `anonymous` : 默认值。跨域请求不要求用户身份（credentials）。
+ `use-credentials` : 跨域请求要求用户身份。

``` html
<img crossorigin="anonymous" id="myImg" src="pic.jpg">
```

由于在 `<canvas>` 位图中的像素可能来自多种来源，包括从其他主机检索的图像或视频，因此不可避免的会出现安全问题。尽管不通过 CORS 就可以在 `<canvas>` 中使用其他来源的图片，但是这会污染画布，并且不再认为是安全的画布，这将可能在 `<canvas>` 检索数据过程中引发异常。

如果从外部引入的 HTML `<img>` 或 SVG `<svg>` ，并且图像源不符合规则，将会被阻止从 `<canvas>` 中读取数据。在"被污染"的画布中调用以下方法将会抛出安全错误：

+ 在 `<canvas>` 的上下文上调用 `getImageData()`
+ 在 `<canvas>` 上调用 `toBlob()`
+ 在 `<canvas>` 上调用  `toDataURL()`

### 使用其他 canvas 元素

用 `document.getElementsByTagName` 或 `document.getElementById` 方法来获取其它 `canvas` 元素。常用的应用就是将第二个 `canvas` 作为另一个大的 `canvas` 的缩略图。

### 由零开始创建图像

使用 `Image()` 构造函数，创建一个新的 `HTMLImageElement` 对象。

``` javascript
var img = new Image(); // 创建img元素
img.onload = function(){
  // 执行drawImage语句
}
img.src = 'myImage.png'; // 设置图片源地址
```

### 通过 data:url 方式嵌入图像

Data urls 允许用一串 Base64 编码的字符串的方式来定义一个图片。

+ 优点：图片内容即时可用；可以将 CSS，JavaScript，HTML 和 图片全部封装在一起，迁移起来十分方便。
+ 缺点：是图像没法缓存，图片大的话内嵌的 url 数据会相当的长。

``` javascript
img.src = 'data:image/gif;base64,R0lGODlhCwALAIAAAAAA3pn/ZiH5BAEAAAEALAAAAAALAAsAAAIUhA+hkcuO4lmNVindo7qyrIXiGBYAOw==';
```

### 使用视频帧

``` javascript
// 返回视频的 HTMLVideoElement对象
function getMyVideo() {
  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    return document.getElementById('myvideo');
  }
}
```

## 绘制图片

### 绘制图像

`drawImage(image, dx, dy)`

+ `image` : 绘制到上下文的元素。注意：SVG 图像必须在 `<svg>` 根指定元素的宽度和高度。
+ `dx` : image 的左上角在目标 canvas 上 X 轴坐标。
+ `dy` : image 的左上角在目标 canvas 上 Y 轴坐标。

::: demo

```html
<canvas id="drawImageCanvas" width="150" height="150"></canvas>
```

```js
function draw() {
  var ctx = document.getElementById('drawImageCanvas').getContext('2d');
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
}
draw()
```

:::

### 缩放 Scaling

`drawImage(image, dx, dy, dWidth, dHeight)`

+ `image` : 绘制到上下文的元素。注意：SVG 图像必须在 `<svg>` 根指定元素的宽度和高度。
+ `dx` : image 的左上角在目标 canvas 上 X 轴坐标。
+ `dy` : image 的左上角在目标 canvas 上 Y 轴坐标。
+ `dWidth` : 可选。image 在目标 canvas 上绘制的宽度。允许对绘制的 image 进行缩放。如果不说明，在绘制时 image 宽度不会缩放。
+ `dHeight` : 可选。image 在目标 canvas 上绘制的高度。允许对绘制的 image 进行缩放。如果不说明， 在绘制时 image 高度不会缩放。

注意：图像可能会因为大幅度的缩放而变得起杂点或者模糊。图像里面有文字，最好不要进行缩放，因为处理之后很可能图像里的文字就会变得无法辨认。

::: demo

```html
<canvas id="drawImageScalingCanvas" width="150" height="150"></canvas>
```

```js
function draw() {
  var ctx = document.getElementById('drawImageScalingCanvas').getContext('2d');
  var img = new Image();
  img.onload = function () {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.drawImage(img, j * 50, i * 38, 50, 38);
      }
    }
  };
  img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
}
draw()
```

:::

### 切片 Slicing

`drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)` : 可用于图片合成。

+ `image` : 绘制到上下文的元素。
+ `sx` : 可选。需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的左上角 X 轴坐标。
+ `sy` : 可选。需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的左上角 Y 轴坐标。
+ `sWidth` : 可选。需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的宽度。如果不说明，整个矩形（裁剪）从坐标的 sx 和 sy 开始，到 image 的右下角结束。
+ `sHeight` : 可选。需要绘制到目标上下文中的，image 的矩形（裁剪）选择框的高度。
+ `dx` : image 的左上角在目标 canvas 上 X 轴坐标。
+ `dy` : image 的左上角在目标 canvas 上 Y 轴坐标。
+ `dWidth` : 可选。image 在目标 canvas 上绘制的宽度。允许对绘制的 image 进行缩放。如果不说明，在绘制时 image 宽度不会缩放。
+ `dHeight` : 可选。image 在目标 canvas 上绘制的高度。允许对绘制的 image 进行缩放。如果不说明， 在绘制时 image 高度不会缩放。

::: demo

```html
<body onload="draw();">
  <canvas id="drawImageSlicingCanvas" width="150" height="150"></canvas>
  <div style="display:none;">
    <img id="sourceImage" src="https://mdn.mozillademos.org/files/5397/rhino.jpg" width="300" height="227">
    <img id="frameImage" src="https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png" width="132" height="150">
  </div>
</body>
```

```js
function draw() {
  var canvas = document.getElementById('drawImageSlicingCanvas');
  var ctx = canvas.getContext('2d');

  ctx.drawImage(
    document.getElementById('sourceImage'),
    33,
    71,
    104,
    124,
    21,
    20,
    87,
    104
  );

  ctx.drawImage(document.getElementById('frameImage'), 0, 0);
}
draw()
```

:::

### 抛出异常

+ `INDEX_SIZE_ERR` : 如果 canvas 或者图像矩形区域的宽度或高度为 0 。
+ `INVALID_STATE_ERR` : 图像没有数据。
+ `TYPE_MISMATCH_ERR` : 提供的原始元素不支持。
+ `NS_ERROR_NOT_AVAILABLE` : 图像尚未加载。使用 `.complete === true` 和 `.onload` 确定何时准备就绪。

### 源元素的大小

+ 如果加载图像并在其构造函数中指定可选的大小参数，则必须使用所创建实例的 `naturalWidth` 和 `naturalHeight` 属性来正确计算裁剪和缩放区域等内容，而不是 `element.width` 和`element.height`。
+ 如果元素是 `<video>` 元素，则 `videoWidth` 和 `videoHeight` 也是如此，依此类推。

::: demo

```html
<canvas id="drawImageSourceSizeCanvas"></canvas>
```

```js
function draw() {
  const canvas = document.getElementById('drawImageSourceSizeCanvas');
  const ctx = canvas.getContext('2d');

  const image = new Image(60, 45); // 创建指定大小的 Image 对象
  image.onload = drawImageActualSize; // 当图片加载完成之后，进行绘制

  // 加载一个在 CSS 像素固定大小的图像
  image.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';

  function drawImageActualSize() {
    // canvas 元素使用 CSS 像素中图像的固定大小
    canvas.width = this.naturalWidth;
    canvas.height = this.naturalHeight;

    // 绘制的图像大小为 300x277 ，将会忽略在构造函数中设置的自定义大小 60x45
    ctx.drawImage(this, 0, 0);

    // 使用自定义大小，需要指定图像在 canvas 上绘制的宽高
    ctx.drawImage(this, 0, 0, this.width, this.height);
  }
}
draw()
```

:::

## 控制图像的缩放行为 Controlling image scaling behavior

过度缩放图像可能会导致图像模糊或像素化。通过使用绘图环境的 `imageSmoothingEnabled` 属性来控制是否在缩放图像时使用平滑算法。默认值为 `true`，即启用平滑缩放。可以使用 `imageSmoothingQuality` 属性来调整平滑质量。

+ `imageSmoothingEnabled` : 设置图片是否平滑的属性。
  + `true` 表示图片平滑（默认值）
  + `false` 表示图片不平滑。
+ `imageSmoothingQuality` : 实验中的功能。设置图像平滑度的属性。属性值为 : `low` / `medium` / `high` 。

``` javascript
// 禁用缩放图像时使用平滑算法
ctx.mozImageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
```
