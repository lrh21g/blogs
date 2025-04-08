---
category: CSS基础
tag:
  - CSS
---

# 块级格式化上下文（BFC）

BFC 全称为 block formatting context，中文为 “块级格式化上下文”。相对应的还有 IFC，也就是 inline formatting context，中文为“内联格式化上下”。

- BFC 的特性：可以用 “CSS 世界的结界” 这种称谓概括。

- 表现原则

  - 如果一个元素具有 BFC，内部子元素不管如何布局等，都不会影响外部的元素。所以，BFC 元素不会产生 `margin` 重叠；
  - BFC 元素也可以用来清除 `float` 浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违 BFC 元素的子元素不会影响外部元素的设定。

- 触发BFC的常见情况如下

  - `<html>` 根元素
  - `float` 的值 【**不为**】 `none`
  - `overflow` 的值 【**为**】 `auto`、 `scroll` 或 `hidden`
  - `display` 的值 【**为**】 `table-cell`、 `table-caption` 和 `inline-block` 中的任何一个
  - `position` 的值 【**不为**】 `relative` 和 `static`

  【注】 对于 `float` 元素造成高度塌陷的影响，只要元素符合以上任一条件，则无需使用 `clear: both;` 清除浮动。

BFC 最重要的用途不是去 `margin` 重叠或者是清除 `float` 影响，而是实现更健壮、更智能的自适应布局。

理论上，任何 BFC 元素和 `float` 元素相遇的时候，都可以实现自动填充的自适应布局。但是由于触发 BFC 的属性自身的一些特性，能实现自适应布局的并不多。

- 触发 BFC 能实现自适应布局的主要有如下属性：

  - `overflow: auto / hidden` ：其存在的问题就是容器盒子外的元素可能被隐藏掉。
  - `display: inline-block`
  - `display: table-cell` ：存在单元格宽度值无法超过表格容器的宽度问题，因此可以将设置 `display: table-cell` 的 BFC 元素的宽度设置得很大 `display: table-cell; width: 9999px;` 。

- 触发 BFC 无法实现自适应布局的部分属性原因如下：

  - `position: absolute` ：脱离文档流。
  - `display: table-row` ：对 `width` 无感，无法自适应剩余容器空间。
  - `display: table-caption`

## BFC 与流体布局

普通流体元素在设置 `overflow: hidden` 后，会自动填充容器中除 `float` 元素以外的剩余空间，形成自适应布局的效果。

示例中，图片元素尺寸不管变大还是变小，右侧自适应内容无需修改，都可以自动填充剩余空间。图片与文字保持合适间距可进行如下设置：

- 左侧 `float` 元素为 `float: left` ，则可设置 `float` 元素的 `margin-right`、 `padding-right`、 透明的 `border-right`。
- 右侧 BFC 元素，则可设置 `padding-left` 、透明的 `border-left`。如果需要设置 `margin-left`，其值必须是 `float` 元素的宽度和间隙大小的总和，变得不可空，无法大规模复用。

::: normal-demo 示例

```html
<!-- 外层包裹元素，防止影响其他元素 -->
<div class="wrapper">
  <div class="float-element-father">
    <img class="float-element-img" src="https://vuepress.vuejs.org/images/hero.png" />
    <p class="float-element-img-desc">
      【设置 overflow:hidden; 】示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01
    </p>
  </div>
</div>
<!-- 清楚外层包裹元素浮动 -->
<div style="clear: both;"></div>
```

```css
.wrapper {
  width: 250px;
}

.float-element-father {
  border: 1px solid #db5860;
}

.float-element-img {
  width: 100px;
  height: 100px;
  float: left;
  margin-right: 10px;
  background-color: #3eaf7c;
  opacity: 0.5;
}

.float-element-img-desc {
  margin: 0;
  padding: 0;
  overflow: hidden;
  word-break: break-all;
  background-color: #9aa9b2;
}
```

:::
