---
category: Canvas
tag: Canvas
---

# Canvas 添加样式

## 色彩 Colors

+ `fillStyle = color` 设置图形填充的颜色
+ `strokeStyle = color` 设置图形轮廓的颜色

``` javascript
ctx.fillStyle = "orange";
ctx.fillStyle = "#FFA500";
ctx.fillStyle = "rgb(255,165,0)";
ctx.fillStyle = "rgba(255,165,0,1)";

ctx.strokeStyle = "orange";
ctx.strokeStyle = "#FFA500";
ctx.strokeStyle = "rgb(255,165,0)";
ctx.strokeStyle = "rgba(255,165,0,1)";
```

::: tip
如果设置了 `fillStyle` 或 `strokeStyle` 的值，则该值会成为新绘制图形的默认值。需要给每个图形添加不同的颜色，则需要重新设置 `fillStyle` 或 `strokeStyle` 的值。
:::

::: demo

```html
<canvas id="drawSetColorsCanvas">
```

```js
function draw() {
  var canvas = document.getElementById('drawSetColorsCanvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        // 设置图形填充的颜色
        ctx.fillStyle =
          'rgb(' +
          Math.floor(255 - 42.5 * i) +
          ',' +
          Math.floor(255 - 42.5 * j) +
          ',0)';
        ctx.fillRect(j * 25, i * 25, 25, 25);
      }
    }
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 6; j++) {
        // 设置图形轮廓的颜色
        ctx.strokeStyle =
          'rgb(0,' +
          Math.floor(255 - 42.5 * i) +
          ',' +
          Math.floor(255 - 42.5 * j) +
          ')';
        ctx.beginPath();
        ctx.arc(162.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
        ctx.stroke();
      }
    }
  }
}
draw()
```

:::

## 透明度 Transparency

`globalAlpha = transparencyValue` : 会影响到 canvas 中所有图形的透明度，有效范围 `0.0（完全透明） - 1（完全不透明）` 。

``` javascript
// 设置全局透明度
ctx.globalAlpha = 0.2;

// 指定透明颜色，用于描边和填充样式
ctx.strokeStyle = "rgba(255, 0, 0, 0.5)";
ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
```

## 线型 Line styles

### lineWidth 设置线条宽度

`lineWidth = value` 设置线条宽度。属性值必须为正数。默认值是 1.0。

**线宽是指给定路径的中心到两边的粗细，即在路径的两边各绘制线宽的一半。** 假设使用网格代替 canvas 坐标格，每一格对应屏幕上一个像素点。

+ 填充 (2, 1) 至 (5, 5) 的矩形。整个区域的边界正好处于像素边界上，这样得到的矩形有着清晰的边缘
+ 绘制一条从 (3, 1) 至 (3, 5) ，宽度为 1px 的线条。实际填充区域（深蓝色部分）是在路径两边进行描边，在路径两旁绘制各一半的像素。由于 1 倍显示屏幕最小宽度就是 1 像素，于是进行了边缘柔化处理，看上去就是 2px ，实际上是按照 1px 进行渲染的，线条的颜色模糊也是因为边缘柔化所导致的。
+ 绘制一条从 (3.5, 1) 至 (3.5, 5) ，宽度为 1px 的线条。线条边缘正好处于像素边界上，则填充出来就是准确的宽为 1px 的线条

![canvas_line_width](./files/images/canvas_line_width.drawio.png)

### lineCap 设置线条末端样式

`lineCap = type` : 设置线条末端样式

+ `butt` : 线段末端以方形结束。
+ `round` : 线段末端以圆形结束。
+ `square` : 线段末端以方形结束，但是增加了一个宽度和线段相同，高度是线段厚度一半的矩形区域。

### lineJoin 设定线条与线条间接合处的样式

`lineJoin = type` : 设定线条与线条间接合处的样式。

+ `round` : 通过填充一个额外的，圆心在相连部分末端的扇形，绘制拐角的形状。 圆角的半径是线段的宽度。
+ `bevel` : 在相连部分的末端填充一个额外的以三角形为底的区域， 每个部分都有各自独立的矩形拐角。
+ `miter` : 通过延伸相连部分的外边缘，使其相交于一点，形成一个额外的菱形区域。这个设置可以通过 miterLimit 属性看到效果。

### miterLimit 限制当两条线相交时交接处最大长度

`miterLimit = value` : 限制当两条线相交时交接处最大长度。所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

### setLineDash() 设置当前虚线样式

`setLineDash(segments)` : 设置当前虚线样式。

### getLineDash() 返回一个包含当前虚线样式

`getLineDash()` : 返回一个包含当前虚线样式，长度为非负偶数的数组。

### lineDashOffset 设置虚线样式的起始偏移量

`lineDashOffset = value` : 设置虚线样式的起始偏移量。

## 渐变 Gradients

## 图案样式 Patterns

## 阴影 Shadows
