---
category: Canvas
tag: 
  - Canvas
---

# Canvas 像素操作

## ImageData 对象

`ImageData` 接口描述 `<canvas>` 元素的一个隐含像素数据的区域。

### 属性

+ `ImageData.data` : 只读。`Uint8ClampedArray` 描述了一个一维数组，包含以 `RGBA` 顺序的数据，数据使用 `0` 至 `255`（包含）的整数表示。
+ `ImageData.height` : 只读。无符号长整型（unsigned long），使用像素描述 `ImageData` 的实际高度。
+ `ImageData.width` : 只读。无符号长整型（unsigned long），使用像素描述 `ImageData` 的实际宽度。

### 创建方法

+ `ImageData(array, width, height)` 构造函数返回一个新的实例化的 `ImageData` 对象，此对象由给定的类型化数组和指定的宽度与高度组成。
  + `array` : 包含图像隐藏像素的 `Uint8ClampedArray` 数组。如果数组没有给定，指定大小的黑色矩形图像将会被创建。
  + `width` : 无符号长整型（unsigned long）数值，描述图像的宽度。
  + `height` : 无符号长整型（unsigned long）数值，描述图像的高度。

+ `CanvasRenderingContext2D.createImageData(width, height)` : 创建一个新的、空白的、指定大小的 ImageData 对象。 所有的像素在新对象中都是透明的。

+ `CanvasRenderingContext2D.getImageData(sx, sy, sw, sh)` : 返回一个 `ImageData` 对象。用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为 `(sx, sy)`、宽为 `sw`、高为 `sh`。

+ `CanvasRenderingContext2D.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)` : 将数据从已有的 `ImageData` 对象绘制到位图的方法。如果提供了一个绘制过的矩形，则只绘制该矩形的像素。
  + `imagedata` : `ImageData` 对象，包含像素值的数组对象。
  + `dx` : 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
  + `dy` : 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
  + `dirtyX` : 可选。在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
  + `dirtyY` : 可选。在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
  + `dirtyWidth` : 可选。在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
  + `dirtyHeight` : 可选。在源图像数据中，矩形区域的高度。默认是图像数据的高度。

### Uint8ClampedArray

`Uint8ClampedArray`（8位无符号整型固定数组）类型化数组表示一个由值固定在 `0-255` 区间的8位无符号整型组成的数组。

`Uint8ClampedArray` 可以被作为查看**初始像素数据**。每个像素用 4 个 1 bytes 值（按照红，绿，蓝和透明值的顺序 —— "RGBA"格式）来代表。每个颜色值部份用 `0` 至 `255`（包含）来代表。

+ `Uint8ClampedArray` 包含 `高度 × 宽度 × 4` bytes数据，索引值从 `0` 到 `( 高度 × 宽度 × 4 ) - 1`

+ 读取图片中位于第50行，第200列的像素某像素点的 `R/G/B/A` 值的公式： `imageData.data[((50 * (imageData.width * 4)) + (200 * 4)) + 0/1/2/3]`

+ 使用 `Uint8ClampedArray.length` 属性来读取像素数组的大小（以bytes为单位）： `var numBytes = imageData.data.length;`

## 得到场景像素数据

为获得一个包含画布场景像素数据的 `ImageData` 对像，可以用 `getImageData()` 方法。

`CanvasRenderingContext2D.getImageData(sx, sy, sw, sh)` : 返回一个 `ImageData` 对象。用来描述 canvas 区域隐含的像素数据，这个区域通过矩形表示，起始点为 `(sx, sy)`、宽为 `sw`、高为 `sh`。

应用示例：颜色选择器

+ 获取当前鼠标的位置，记为 `layerX` 和 `layerY`
+ 通过 `getImageData()` 获取在对应位置的像数数组里面的像素数据
+ 使用数组数据设置背景颜色和 `<div>` 的文字去展示颜色值。

::: details 应用示例：颜色选择器实现代码

``` javascript
var img = new Image();
img.crossOrigin = 'anonymous';
img.src = './assets/rhino.jpg';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
img.onload = function () {
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
};
var hoveredColor = document.getElementById('hovered-color');
var selectedColor = document.getElementById('selected-color');

function pick(event, destination) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = ctx.getImageData(x, y, 1, 1);
  var data = pixel.data;

  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  destination.style.background = rgba;
  destination.textContent = rgba;

  return rgba;
}

canvas.addEventListener('mousemove', function (event) {
  pick(event, hoveredColor);
});
canvas.addEventListener('click', function (event) {
  pick(event, selectedColor);
});
```

:::

## 在场景中写入像素数据

通过 `putImageData()` 方法去对场景进行像素数据的写入。

`CanvasRenderingContext2D.putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)` : 将数据从已有的 `ImageData` 对象绘制到位图的方法。如果提供了一个绘制过的矩形，则只绘制该矩形的像素。

+ `imagedata` : `ImageData` 对象，包含像素值的数组对象。
+ `dx` : 源图像数据在目标画布中的位置偏移量（x 轴方向的偏移量）。
+ `dy` : 源图像数据在目标画布中的位置偏移量（y 轴方向的偏移量）。
+ `dirtyX` : 可选。在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（x 坐标）。
+ `dirtyY` : 可选。在源图像数据中，矩形区域左上角的位置。默认是整个图像数据的左上角（y 坐标）。
+ `dirtyWidth` : 可选。在源图像数据中，矩形区域的宽度。默认是图像数据的宽度。
+ `dirtyHeight` : 可选。在源图像数据中，矩形区域的高度。默认是图像数据的高度。

应用示例：图片灰度和反相颜色

+ 遍历所有像素以改变他们的数值
+ 将被修改的像素数组通过 `putImageData()` 放回到画布中

::: details 应用示例：图片灰度和反相颜色

``` javascript
var img = new Image();
img.crossOrigin = 'anonymous';
img.src = './assets/rhino.jpg';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

img.onload = function () {
  ctx.drawImage(img, 0, 0);
};

var original = function () {
  ctx.drawImage(img, 0, 0);
};

var invert = function () {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    data[i] = 255 - data[i]; // red
    data[i + 1] = 255 - data[i + 1]; // green
    data[i + 2] = 255 - data[i + 2]; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};

var grayscale = function () {
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }
  ctx.putImageData(imageData, 0, 0);
};

const inputs = document.querySelectorAll('[name=color]');
for (const input of inputs) {
  input.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'inverted':
        return invert();
      case 'grayscale':
        return grayscale();
      default:
        return original();
    }
  });
}
```

:::

## 反锯齿

`CanvasRenderingContext2D.imageSmoothingEnabled = value` 用来设置图片是否平滑的属性。

+ `true` : 表示图片平滑（默认值）。
+ `false` : 表示图片不平滑。

::: normal-demo

```html
<canvas id="canvas" width="300" height="227"></canvas>
<canvas id="zoom" width="300" height="227"></canvas>
<div>
  <label for="smoothbtn">
    <input type="checkbox" name="smoothbtn" checked="checked" id="smoothbtn" />
    启用图像平滑
  </label>
</div>
```

```js
var img = new Image();
img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
img.onload = function () {
  draw(this);
};

function draw(img) {
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  img.style.display = 'none';
  var zoomctx = document.getElementById('zoom').getContext('2d');

  var smoothbtn = document.getElementById('smoothbtn');
  var toggleSmoothing = function (event) {
    zoomctx.imageSmoothingEnabled = this.checked;
    zoomctx.mozImageSmoothingEnabled = this.checked;
    zoomctx.webkitImageSmoothingEnabled = this.checked;
    zoomctx.msImageSmoothingEnabled = this.checked;
  };
  smoothbtn.addEventListener('change', toggleSmoothing);

  var zoom = function (event) {
    var x = event.layerX;
    var y = event.layerY;
    zoomctx.drawImage(
      canvas,
      Math.abs(x - 5),
      Math.abs(y - 5),
      10,
      10,
      0,
      0,
      200,
      200
    );
  };

  canvas.addEventListener('mousemove', zoom);
}
```

:::

## 保存图片

`HTMLCanvasElement` 提供 `toDataURL()` 方法，返回一个包含被类型参数规定的图像表现格式的数据链接。返回的图片分辨率是 96dpi。

+ `canvas.toDataURL('image/png')` : 默认设定。创建一个 PNG 图片。
+ `canvas.toDataURL('image/jpeg', quality)` : 创建一个 JPG 图片。提供从 `0` 到 `1` 的品质，`1` - 表示最好品质，`0` - 基本不被辨析但有比较小的文件大小。
+ `canvas.toBlob(callback, type, encoderOptions)` : 创建了一个在画布中的代表图片的 Blob 对像。
