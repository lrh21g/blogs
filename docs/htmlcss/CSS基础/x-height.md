# x-height

[x 字高](https://zh.wikipedia.org/wiki/X%E5%AD%97%E9%AB%98)： 指字母 x 的高度。即：基线（baseline）和主线（median line）之间的距离。

![x-height](./files/images/x-height.drawio.png)

注：`verticalalign: middle` 与字母中线（median）不是一个意思，`verticalalign: middle` 指的是基线（baseline）往上 1/2 `x-height` 高度。

`ex` : CSS 中的一个相对单位，相对于字体和字号的单位，指小写字母 x 的高度，即 `x-height` 。

`em`、`px` 这类单位的主要作用是限定元素的尺寸，但是，由于字母 x 受字体等 CSS 属性影响大，不稳定，因此 `ex` 不太适合用来限定元素的尺寸。

`ex` 的作用：可用于**不受字体和字号影响的内联元素的垂直居中对齐效果**

`ex` 使用示例：文本 + icon图标展示，icon图标需要与文字垂直居中。使用 `ex` 单位，利用默认的基线（baseline）对齐即可。

``` css
.icon-arrow {
  display: inline-block;
  width: 20px;
  height: 1ex;
  background: url(arrow-right.png) no-repeat center;
}
```
