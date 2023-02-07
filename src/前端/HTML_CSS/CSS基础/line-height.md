---
category: CSS基础
tag:
  - CSS
---

# line-height

## line-height 属性值

- `normal` : 默认值。和 `font-family` 密切关联的变量值。不同系统不同浏览器的默认 `line-height` 都有差异，需要进行重置。

  |   字体   | Chrome | Firefox |  IE   |
  | :------: | :----: | :-----: | :---: |
  | 微软雅黑 |  1.32  |  1.321  | 1.32  |
  |   宋体   | 1.141  |  1.142  | 1.141 |

- `数值` : 其最终计算值是和当前 `font-size` 相乘后的值。比如： `line-height: 1.5`
- `百分值` : 其最终计算值是和当前 `font-size` 相乘后的值。比如： `line-height: 150%`
- `长度值（带单位的数值）` : 如 `line-height: 21px` 或者 `line-height: 1.5em` 等

【使用 `line-height` 属性值的异同】

- 相同点：数值、百分值、长度值（带单位的数值）计算方式无差别
- 不同点
  - 使用数值，则所有子元素继承此值
  - 使用百分值或者长度值，则所有子元素继承最终的计算值

【`line-height` 属性值的使用与重置】

- 重置
  - 使用长度值（带单位的数值），建议使用 `line-height: 20px` ，计算方便。
  - 使用数值，建议使用方便计算的行高值
    - `line-height` 属性值本身方便计算：可以使用 1.5 。
    - `line-height` 默认值计算方便：先得到方便计算的 `line-height` 计算值，再反推 `line-height` 设置的数值。在 CSS 中，计算行高的时候，行高值一定不要向下舍入，而要**向上舍入**。
- 如何使用
  - 重图文内容展示的网页或者网站，如博客、论坛、公众号之类的，一定要使用数值作为单位，考虑到文章阅读的舒适度， `line-height` 值可以设置在 1.6 - 1.8 。
  - 偏重布局结构精致的网站，则可使用长度值或者数值。第一，目的是为了兼容；第二，无论使用哪种类型值，都存在需要局部重置的场景。

## line-height 最大值特性

**无论内联元素 `line-height` 如何设置，最终父级元素的高度都是由数值大的 `line-height` 决定**。

示例：子元素 span 元素是内联元素，因此自身存在一个 “内联盒子” ，则一定会有 “行框盒子”。每一个 “行框盒子” 前面都有一个宽度为 0 的 “幽灵空白节点”。则：

- 当父元素设置为 `line-height: 96px`，则“幽灵空白节点” 高度为 96px
- 当子元素设置为 `line-height: 96px`，则子元素的高度为 96px

行框盒子的高度是由高度最高的 “内联盒子” 决定的，故父元素高度为最大的 `line-height`

::: vue-demo

```vue
<template>
  <div class="line-height-wrapper-max-value">
    <div class="max-value-box one">
      <span class="max-value-box-one-text"
        >父元素 line-height: 96px； 子元素 line-height: 20px;</span
      >
    </div>
    <div class="max-value-box two">
      <span class="max-value-box-two-text"
        >父元素 line-height: 20px； 子元素 line-height: 96px;</span
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.line-height-wrapper-max-value .max-value-box {
  outline: 1px solid #9aa9b2;
  background-color: #3eaf7c;
}

.line-height-wrapper-max-value .max-value-box.one {
  line-height: 96px;
}

.line-height-wrapper-max-value .max-value-box.one .max-value-box-one-text {
  line-height: 20px;
}

.line-height-wrapper-max-value .max-value-box.two {
  margin-top: 10px;
  line-height: 20px;
}

.line-height-wrapper-max-value .max-value-box.two .max-value-box-two-text {
  line-height: 96px;
}
</style>
```

:::

注意：要避免 “幽灵空白节点” 的干扰，可设置 `display: inline-block` 创建一个独立的 “行框盒子”。

## 内联元素的高度由 line-height 决定

::: vue-demo

```vue
<template>
  <div class="line-height-wrapper-height">
    <div class="lineheight-0-title">
      【font-size: 16px; line-height: 0;】 - 元素高度为 0
    </div>
    <div class="lineheight-0">元素高度为 0</div>
    <div class="lineheight-16-title">
      【font-size: 0; line-height: 16px;】 - 元素高度为 16px
    </div>
    <div class="lineheight-16">元素高度为 16px</div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.line-height-wrapper-height .lineheight-0 {
  font-size: 16px;
  line-height: 0;
  border: 1px solid #9aa9b2;
  background-color: #3eaf7c;
}

.line-height-wrapper-height .lineheight-16 {
  font-size: 0;
  line-height: 16px;
  border: 1px solid #9aa9b2;
  background-color: #3eaf7c;
}

.line-height-wrapper-height .lineheight-0-title,
.line-height-wrapper-height .lineheight-16-title {
  padding: 15px 0;
}
</style>
```

:::

### 非替换元素的纯内联元素

对于非替换元素的纯内联元素，其可视高度完全由 `line-height` 决定。

`行距 = 行高 - em-box` 即：`行距 = line-height - font-size`。其中 `em-box` 的高度为 `1em` 。

将 “行距” 一分二，就得到了 “半行距” ，分别加在 `em-box` 上下则构成了文字的完整高度。

大多数情况下，内容区域和 `em-box` 不一样，内容区域高度受 `font-family` 和 `font-size` 的影响， `em-box` 仅受 `font-size` 的影响，通常内容区域高度要更高一些。但是**当字体是宋体的时候，内容区域和 `em-box` 是等同的**。

注：`em` 相对于 `font-size` 大小的 CSS 单位。

::: vue-demo

```vue
<template>
  <div class="line-height-wrapper-inline">
    <div class="line-height-sphinx">
      <span>sphinx</span>
    </div>
    <div class="line-height-container">
      <div class="line-height-box line-height-2">
        <span>第一行文本</span>
        <span>第二行文本</span>
      </div>
      <div class="line-height-box line-height-1">
        <span>第一行文本</span>
        <span>第二行文本</span>
      </div>
      <div class="line-height-box line-height-half">
        <span>第一行文本</span>
        <span>第二行文本</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.line-height-wrapper-inline .line-height-sphinx {
  display: inline-block;
  font-family: simsun;
  font-size: 80px;
  line-height: 120px;
  border: 1px solid #9aa9b2;
  background-color: #3eaf7c;
}

.line-height-wrapper-inline .line-height-sphinx span {
  /* outline （轮廓）是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。 */
  /* 注释：轮廓线不会占据空间，也不一定是矩形。 */
  outline: 1px solid red;
}

.line-height-wrapper-inline .line-height-container {
  margin-top: 20px;
}

.line-height-wrapper-inline .line-height-container .line-height-box {
  display: inline-block;
  margin: 0 10px;
  font-family: simsun;
  font-size: 24px;
  background-color: #3eaf7c;
}

.line-height-wrapper-inline .line-height-container .line-height-box > span {
  outline: 1px solid red;
}

/* 实现换行 */
.line-height-wrapper-inline
  .line-height-container
  .line-height-box
  > span:first-child:after {
  content: '\A';
  white-space: pre;
}

.line-height-wrapper-inline
  .line-height-container
  .line-height-box.line-height-2 {
  line-height: 2;
}

.line-height-wrapper-inline
  .line-height-container
  .line-height-box.line-height-1 {
  line-height: 1;
}

.line-height-wrapper-inline
  .line-height-container
  .line-height-box.line-height-half {
  line-height: 0.5;
}
</style>
```

:::

### 替换元素的内联元素

- 对于替换元素的内联元素，`line-height` 不影响替换元素的高度。
- 对于同时存在非替换元素与替换元素的场景（即：图文混排），`line-height` 只能决定最小高度。主要因为替换元素不受 `line-heigt` 的影响，以及受 `vertical-align` 的影响。

示例：图片的高度为 `height: 100px` ，包裹图片元素的 div 设置 `line-height: 120px` 的高度为 120px，主要原因是因为每一个 “行框盒子” 前面都有一个宽度为 0 的 “幽灵空白节点”，其内联特性表现和普通字符一样，所以，容器高度等于 `line-height` 设置的属性值 256px 。

::: vue-demo

```vue
<template>
  <div class="line-height-wrapper-image-inline">
    <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
  </div>
</template>

<script>
export default {}
</script>

<style>
.line-height-wrapper-image-inline {
  display: inline-block;
  line-height: 120px;
  border: 1px solid #9aa9b2;
  background-color: #3eaf7c;
}

.line-height-wrapper-image-inline .vuepress-img {
  height: 100px;
}
</style>
```

:::

### 块级元素

对于块级元素，`line-height` 对其本身是没有任何作用的。改变 `line-height`块级元素的高度跟着变化，实际上是通过改变块级元素里面内联级别元素占据的高度实现的。

## line-height 使内联元素近似垂直居中

- 使用 `line-height` 可以实现 “垂直居中” 原因：行距上下等分机制。
- 近似垂直居中原因：文字的垂直中线位置普遍要比真正的 “行框盒子” 的垂直中线位置要低。

多行文本或替换元素近似垂直居中实现原理：

- 多行文本使用 `div` 标签包裹，并设置为 `display: inline-block` 。可重置外部 `line-height` 为正常大小，并保持内联元素的特性，从而可设置 `vertical-align` 属性，产生 “行框盒子” 。在 “行框盒子” 前面都有一个宽度为 0 的 “幽灵空白节点” ，此时外部设置的 `line-height: 120px` 产生作用。
- 内联元素默认为基线对齐，则可通过 `vertical-align: center` 调整多行文本垂直位置，实现**近似**垂直居中。

::: vue-demo

```vue
<template>
  <div class="line-height-wrapper-vertical-center">
    <div class="single-text">单行微软雅黑字体文本</div>
    <div class="multi-text-box">
      <div class="multi-text">
        多行微软雅黑字体文本居中，需要使用 vertical-align: middle;
        配合。多行微软雅黑字体文本多行微软雅黑字体文本多行微软雅黑字体文本多行微软雅黑字体文本
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.line-height-wrapper-vertical-center .single-text {
  margin: 0;
  font-size: 60px;
  line-height: 100px;
  font-family: 'microsoft yahei';
  background-color: #3eaf7c;
}

.line-height-wrapper-vertical-center .multi-text-box {
  margin-top: 20px;
  line-height: 120px;
  background-color: #3eaf7c;
}

.line-height-wrapper-vertical-center .multi-text-box .multi-text {
  display: inline-block;
  line-height: 20px;
  margin: 0 20px;
  /* vertical-align 属性定义行内元素的基线相对于该元素所在行的基线的垂直对齐。 */
  /* middle ： 把此元素放置在父元素的中部 */
  vertical-align: middle;
}
</style>
```

:::
