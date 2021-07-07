---
category: Canvas
tag: Canvas
---

# Canvas 优化

## 在离屏 canvas 上预渲染相似的图形或重复的对象

如果发现在每个动画帧上重复了一些相同的绘制操作，请考虑将其分流到屏幕外的画布上。 然后，可以根据需要频繁地将屏幕外图像渲染到主画布上，而不必首先重复生成该图像的步骤。

``` javascript
myEntity.offscreenCanvas = document.createElement("canvas");
myEntity.offscreenCanvas.width = myEntity.width;
myEntity.offscreenCanvas.height = myEntity.height;
myEntity.offscreenContext = myEntity.offscreenCanvas.getContext("2d");

myEntity.render(myEntity.offscreenContext);
```

## 避免浮点数的坐标点，用整数取而代之

浏览器为了达到抗锯齿的效果会做额外的运算。为了避免这种情况，请保证在调用 `drawImage()` 函数时，用 `Math.floor()` 函数对所有的坐标点取整。

## 不要在用 drawImage 时缩放图像

在离屏 canvas 中缓存图片的不同尺寸，而不要用 `drawImage()` 去缩放它们。

## 使用多层画布去画一个复杂的场景

在应用程序中，可能会发现某些对象需要经常移动或更改，而其他对象则保持相对静态。在这种情况下，可能的优化是使用多个 `<canvas>` 元素对项目进行分层。

例如，假设有一个游戏，其UI位于顶部，中间是游戏性动作，底部是静态背景。在这种情况下，可以将游戏分成三个 `<canvas>` 层。UI 将仅在用户输入时发生变化，游戏层随每个新框架发生变化，并且背景通常保持不变。

``` html
<div id="stage">
  <canvas id="ui-layer" width="480" height="320"></canvas>
  <canvas id="game-layer" width="480" height="320"></canvas>
  <canvas id="background-layer" width="480" height="320"></canvas>
</div>

<style>
  #stage {
    width: 480px;
    height: 320px;
    position: relative;
    border: 2px solid black
  }
  canvas { position: absolute; }
  #ui-layer { z-index: 3 }
  #game-layer { z-index: 2 }
  #background-layer { z-index: 1 }
</style>
```

## 用CSS设置大的背景图

如果像大多数游戏那样，有一张静态的背景图，用一个静态的 `<div>` 元素，结合 background 特性，以及将它置于画布元素之后。可以避免在每一帧在画布上绘制大图。

## 用CSS transforms特性缩放画布

CSS transforms 使用 GPU，因此速度更快。最好的情况是不直接缩放画布，或者具有较小的画布并按比例放大，而不是较大的画布并按比例缩小。

``` javascript
var scaleX = window.innerWidth / canvas.width;
var scaleY = window.innerHeight / canvas.height;

var scaleToFit = Math.min(scaleX, scaleY);
var scaleToCover = Math.max(scaleX, scaleY);

stage.style.transformOrigin = '0 0'; // scale from top left
stage.style.transform = 'scale(' + scaleToFit + ')';
```

## 关闭透明度

如果游戏使用画布而且不需要透明，当使用 `HTMLCanvasElement.getContext()` 创建一个绘图上下文时把 `alpha` 选项设置为 `false` 。这个选项可以帮助浏览器进行内部优化。

``` javascript
var ctx = canvas.getContext('2d', { alpha: false });
```

## 其他

+ 将画布的函数调用集合到一起（例如，画一条折线，而不要画多条分开的直线）
+ 避免不必要的画布状态改变
+ 渲染画布中的不同点，而非整个新状态
+ 尽可能避免 `shadowBlur` 特性 : 描述模糊效果程度的属性，它既不对应像素值也不受当前转换矩阵的影响。默认值是 0。
+ 尽可能避免 `text rendering` （绘制文本）
  + `fillText(text, x, y [, maxWidth])` : 在指定的 `(x, y)` 位置填充指定的文本，绘制的最大宽度是可选的.
  + `strokeText(text, x, y [, maxWidth])` : 在指定的 `(x, y)` 位置绘制文本边框，绘制的最大宽度是可选的.
+ 尝试不同的方法来清除画布(`clearRect()` vs. `fillRect()` vs. 调整 canvas 大小)
+ 有动画，使用 `window.requestAnimationFrame()` 而非 `window.setInterval()`
+ 谨慎使用大型物理库
