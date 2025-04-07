---
category: CSS基础
tag:
  - CSS
---

# border

```css
/* 规定边框的宽度 */
/* thin ： 定义细的边框，等同于 1px */
/* medium ： 默认。定义中等的边框，等同于 3px */
/* thick ： 定义粗的边框，等同于 4px */
/* length ： 允许自定义边框的宽度 */
border-width: medium;
/* 规定边框的样式 */
/* none ： 默认值，不显示边框。优先级最低，意味着如果存在其他的重叠边框，则会显示为那个边框。因为默认值，所以单纯设置 border-width 或 border-color 没有边框显示的原因 */
/* hidden ： 不显示边框。优先级最高，意味着如果存在其他的重叠边框，边框不会显示 */
/* solid ： 实线边框 */
/* dashed ： 虚线边框 */
/* dotted ： 虚点边框 */
/* double ： 双实线边框。表现规则为：双线宽度永远相等，中间间隔 ±1。例如： 1px （0+1+0）、 2px（1+0+1）、3px（1+1+1）、4px（1+2+1）、5px（2+1+2）、6px（2+2+2）、7px（2+3+2） */
/* groove ： 有雕刻效果的边框，样式与 ridge 相反 */
/* ridge ： 有浮雕效果的边框，样式与 groove 相反 */
/* inset ： 有陷入效果的边框，样式与 outset 相反 */
/* outset ： 有突出效果的边框，样式与 inset 相反 */
border-style: none;
/* 规定边框的颜色。当没有指定 border-color 颜色值的时候，会使用当前元素的 color 计算值作为边框色。 */
border-color: inherit;
```

::: normal-demo 实现图片上传按钮

```html
<div class="add-box-container">
  <div class="add-box add-box-use-background"></div>
  <div class="add-box add-box-use-border"></div>
</div>
```

```css
.add-box-container {
  display: flex;
  flex-wrap: wrap;
}
.add-box {
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border: 2px dashed #ccc;
}
.add-box:before {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: '';
}
.add-box:after {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  content: '';
}

.add-box-use-background:before{
  width: 50px;
  height: 5px;
}
.add-box-use-background:after{
  width: 5px;
  height: 50px;
}
.add-box-use-background:before,
.add-box-use-background:after {
  background: #ccc;
}
.add-box-use-background:hover {
  border-color: #06C;
}
.add-box-use-background:hover:before,
.add-box-use-background:hover:after {
  background: #06C;
}

.add-box-use-border {
  color: #ccc;
  border: 2px dashed;
}
.add-box-use-border:before {
  width: 50px;
  border-top: 5px solid;
}
.add-box-use-border:after {
  height: 50px;
  border-left: 5px solid;
}
.add-box-use-border:hover {
  color: #06C;
}
```

:::

## border-image

`border-image` 在给定元素的周围绘制图像，取代元素的常规边框。

`border-image: <border-image-source> <border-image-slice> <border-image-width> <border-image-outset> <border-image-repeat>;`

- `border-image-source` ： 创建元素边框图像的源图像路径
- `border-image-slice` ： 尺寸，用于将源图像分割为多个区域。最多可以指定四个值。

  ![border-image-slice](./files/images/border-image-slice.png)

  - 区域 1-4 为角区域（corner region）。每一个都被用于组成最终边框图像的四个角。
  - 区域 5-8 边区域（edge region）。在最终的边框图像中重复、缩放或修改它们以匹配元素的大小。
  - 区域 9 为中心区域（middle region）。它在默认情况下会被丢弃，但如果设置了关键字 `fill`，则会将其用作元素的背景图像。

  `border-image-repeat` 、 `border-image-width` 和 `border-image-outset` 属性则用于定义如何使用这些图像。

  - 仅指定了 **一个** 位置（1 个值）时，创建的（**上下左右**）四个切片将具有相同的宽度/高度。
  - 当指定了 **两个** 位置（2 个值）时，第一个值表示 **垂直方向** 的两个切片的高度（即 top 与 bottom），第二个值表示 **水平方向** 两侧切片的宽度（即 left 和 right）。
  - 当指定了 **三个** 位置（3 个值）时，第一个值表示 **顶部** 切片的高度（即 top），第二个值表示 **水平方向两侧** 切片的宽度（即 left 和 right），第三个值则表示 **底部** 切片的高度（即 bottom）。
  - 当指定了 **四个** 位置（4 个值）时，这四个值则分别对应 **top、right、bottom、left**（上、右、下、左）四个切片的宽度/高度。
  - 可选值 `fill` 可放在上面声明的值的末尾。

- `border-image-width` ： 边框图像的宽度。最多可以指定四个值。

  - 当指定 **一个** 值时，它将作用到 **四个方向** ；
  - 当指定 **两个** 值时，它将分别作用到 **垂直方向** 和 **水平方向** ；
  - 当指定 **三个** 值时，它将分别作用到 **上方、水平方向、和下方**；
  - 当指定 **四个** 值时，它将分别作用到 **上方、右方、下方和左方**。

- `border-image-outset` ： 边框图像到元素外部边缘的距离。最多可以指定四个值。
- `border-image-repeat` ： 定义源图像边缘区域适配边框图像尺寸的方式。最多可以指定两个值。

## border 与透明边框技巧

### 右下方 background 定位

假设现在有一个宽度不固定的元素，我们需要在距离右边缘 50 像素的位置设置一个背景图片，无法使用 `background`，因为 `background` 是相对左上角定位的，需求是右侧定位。

```css
.box {
  /* 对 50px 的间距使用 transparent 边框表示，使用百分比 background-position 定位到想要的位置 */
  /* 默认 background 背景图片是相对于 padding box 定位的，也就是说，background-position:100% 的位置计算默认是不会把 border-width 计算在内的。 */
  border-right: 50px solid transparent;
  background-position: 100% 50%;
}
```

### 增加点击区域大小

在移动端搜索输入框输入内容后，右侧会有一个清除按钮，无论是使用 CSS 图标合并工具还是手写模拟，基本上都是按照图标的原始尺寸写的。效果虽然没问题，但是体验不一定好，稳妥的方法是外部再嵌套一层标签，专门控制点击区域大小。

可以使用 `padding` 或者透明 `border` 增加元素的点击区域大小。

推荐使用透明 `border` 方法的原因：假设图标是使用工具生成的，`background-position` 就是限定死的值，若再使用 `padding` 撑开间距，就会遇到定位不准的问题。但是，若是使用透明 `border` 增加点击区域，则无此问题，只要合并时留下足够的间距就可以了。

### 三角等图形绘制

```css
.triangle {
  width: 0;
  border: 10px solid;
  border-color: #f30 transparent transparent;
}
```

## 利用 border 绘制多边形

::: normal-demo 利用 border 绘制多边形

```html
<div class="polygon-container">
  <div class="polygon trapezoid"></div>
  <div class="polygon triangle"></div>
</div>
```

```css
.polygon-container {
  display: flex;
  flex-wrap: wrap;
}

.polygon {
  margin-right: 20px;
}

.trapezoid {
  width: 200px;
  height: 0;
  border-top: none;
  border-bottom: 60px solid #249ff1;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}

.triangle {
  width: 0;
  height: 0;
  border-top: 0 solid transparent;
  border-bottom: 100px solid #249ff1;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
}
```

:::
