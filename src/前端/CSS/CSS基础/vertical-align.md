---
category: CSS基础
tag:
  - CSS
---

# vertical-align

`vertical-align` 起作用的前提条件是：只能应用于 **内联元素** 以及设置 **`display: inline / inline-block / inine-table / table-cell` 的元素上**。

## vertical-align 属性值

- 线类
  - baseline : 默认值。元素放置在父元素的基线上。
  - top : 把元素的顶端与行中最高元素的顶端对齐
  - middle : 把此元素放置在父元素的中部。
  - bottom : 把元素的顶端与行中最低的元素的顶端对齐。
- 文本类
  - text-top : 把元素的顶端与父元素字体的顶端对齐
  - text-bottom : 把元素的底端与父元素字体的底端对齐。
- 上标下标类
  - sub : 垂直对齐文本的下标。
  - super : 垂直对齐文本的上标
- 数值百分比类 : 比如 20px、 2em、 20% 等。根据计算值的不同，相对于基线往上或往下偏移（取决于 `vertical-align` 计算值的正负）。

### vertial-align: baseline

- 对于非替换元素的纯内联元素，该元素的基线（baseline）为字符 x 的下边缘
- 对于替换元素的内联元素，该元素的基线（baseline）为替换元素的下边缘
- 对于设置 `display: inline-block` 元素
  - 如果该元素内没有内联元素，或者 `overflow` 不为 `visible` ，则该元素的基线（baseline）为该元素 `margin` 底边缘
  - 否则，该元素的基线（baseline）为该元素内最后一行内联元素的基线（baseline），即：字符 x 的下边缘（“幽灵空白节点”）

**【示例】**

如下所示，

- 左框中，没有内联元素，该元素的基线（baseline）为该元素 `margin` 底边缘
- 右框中，存在字符，该元素的基线（baseline）为该元素内字符的基线（即：字符 x 的下边缘）

左框和右框的基线（baseline）对齐，因此会展示如下效果。当设置右框 `line-height: 0` 时，字符占据高度为 0 ，此时，高度的起始位置为字符内容的垂直中线位置，则字符的一半高度会到边框外面。由于字符上移，右框元素的基线（baseline）也会上移，则左右两框的高度落差会越大。

::: vue-demo

```vue
<template>
  <div class="vertical-align-wrapper-baseline">
    <div class="baseline-box">
      <span class="inline-block-span-baseline"></span>
      <span class="inline-block-span-baseline">x-baseline</span>
    </div>
    <div class="baseline-box-lineheight-0">
      <span class="inline-block-span-baseline"></span>
      <span class="inline-block-span-baseline right-inline"
        >x-baseline line-height: 0</span
      >
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.vertical-align-wrapper-baseline .baseline-box > .inline-block-span-baseline,
.vertical-align-wrapper-baseline
  .baseline-box-lineheight-0
  > .inline-block-span-baseline {
  display: inline-block;
  width: 200px;
  height: 50px;
  border: 1px solid #9aa9b2;
  background-color: #3eaf7c;
}

.vertical-align-wrapper-baseline .baseline-box-lineheight-0 {
  margin-top: 10px;
}

.vertical-align-wrapper-baseline
  .baseline-box-lineheight-0
  > .inline-block-span-baseline.right-inline {
  line-height: 0;
}
</style>
```

:::

**【应用：图标与后面的文字对齐】**

如果图标和后面的文字高度一致，同时图标的基线和文字基线一样，则图标与文字可保持对齐。方案如下：

- 图标高度与当前行高保持一致。
- 图标字符标签里面永远有字符。可借助 `:before` 或者 `:after` 伪元素生成一个空格字符
- 图标 CSS 不使用 `overflow: hidden` 保证基线为里面字符的基线，但需要里面字符不可见。

::: vue-demo

```html
<template>
  <div class="vertical-align-wrapper-img-align-text">
    <h4>1. 图标高度与当前行高保持一致: 空标签后面跟随文本</h4>
    <p><i class="icon icon-delete"></i>删除</p>
    <h4>2. 图标字符标签里面永远有字符: 标签里面有“删除”文本</h4>
    <p><i class="icon icon-delete">删除</i>随便什么文字</p>
    <h4>3. 字体大小变大</h4>
    <p class="large"><i class="icon icon-delete"></i>删除</p>
    <p class="large"><i class="icon icon-delete">删除</i>随便什么文字</p>
  </div>
</template>

<script>
  export default {}
</script>

<style>
  .vertical-align-wrapper-img-align-text,
  .vertical-align-wrapper-img-align-text p {
    line-height: 20px;
  }

  .vertical-align-wrapper-img-align-text .icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    /* white-space 属性指定元素内的空白怎样处理。 */
    /* white-space: nowrap; 文本不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止 */
    white-space: nowrap;
    /* etter-spacing 属性增加或减少字符间的空白（字符间距）。 */
    letter-spacing: -1em;
    /* text-indent 属性规定文本块中首行文本的缩进。 */
    text-indent: -999em;
  }

  .vertical-align-wrapper-img-align-text .icon:before {
    content: '\3000';
  }

  .vertical-align-wrapper-img-align-text .icon-delete {
    background: url('https://vuepress.vuejs.org/hero.png') no-repeat center;
    background-size: 100% 100%;
  }

  .vertical-align-wrapper-img-align-text .large {
    font-size: 20px;
  }
</style>
```

:::

### vertial-align: top / bottom

`vertial-align: top` ：垂直上边缘对齐

- 内联元素：元素底部和当前行框盒子的顶部对齐
- `table-cell` 元素：元素底 `padding` 边缘和表格行的顶部对齐

`vertial-align: bottom` ：垂直下边缘对齐

- 内联元素：元素底部和当前行框盒子的底部对齐
- `table-cell` 元素：元素底 `padding` 边缘和表格行的底部对齐

注意： 内联元素的上下边缘对齐的 “边缘” 是当前 “行框盒子” 的上下边缘，并不是块状容器的上下边缘。

### vertial-align: middle

- 内联元素：元素的垂直中心点和行框盒子基线往上 1/2 x-height 处对齐。可以理解为，内联元素的垂直中心位置和字符 x 的交叉点对齐
- `table-cell` 元素：单元格填充盒子相对于外面的表格行居中对齐

### vertical-align: text-top / text-bottom

- `vertical-align: text-top`：盒子的顶部和父级内容区域的顶部对齐。
- `vertical-align: text-bottom`：盒子的底部和父级内容区域的底部对齐。

注意：“父级内容区域”指的就是在父级元素当前 `font-size` 和 `font-family` 下应有的内容区域大小。

### vertical-align: sub / super

- `vertical-align: super`：提高盒子的基线到父级合适的上标基线位置。
- `vertical-align: sub`：降低盒子的基线到父级合适的下标基线位置。

## vertical-align 与 line-height 的联系

### 容器高度不等于行高

**【现象】**

如下代码所示，最终渲染结果 `div.box` 元素高度并不为 32px 。

```html
<div class="box">
  <span>文本文字</span>
</div>

<style>
  .box {
    line-height: 32px;
  }
  .box > span {
    font-size: 24px;
  }
</style>
```

**【原因】**

`<span>` 标签前实际上存在一个 “幽灵空白节点” ，可使用字符 x 进行占位，同时 “文本文字” 后添加字符 x ，即为 “文本文字 x” ，便于查看基线（baseline）位置。相关代码如下：

```html
<div class="box">x<span>文本文字x</span></div>

<style>
  .box {
    line-height: 32px;
  }
  .box > span {
    font-size: 24px;
  }
</style>
```

此时，字符 x 构成一个 “匿名内联盒子”，同时 “文本文字 x” 所在的 `<span>` 构成一个 “内联盒子”。两个盒子都受 `line-height: 32px` 的影响。对于字符而言，`font-size` 越大，字符基线位置越往下，文字默认以基线（baseline）对齐，所以当字号大小不一样的两个文字在一起的时候，彼此会发生位移，如果位移距离足够大，就会超过行高的限制。

![line-height--boxheight-unequal-lineheight](./files/images/line-height--boxheight-unequal-lineheight.drawio.png)

**【解决方法】**

- 设置一样的字号大小

  ```html
  <div class="box">x<span>文本文字x</span></div>

  <style>
    .box {
      line-height: 32px;
      font-size: 24px;
    }
    .box > span {
    }
  </style>
  ```

- 改变垂直对齐方式，比如顶部对齐 `vertical-align: top`

  ```html
  <div class="box">x<span>文本文字x</span></div>

  <style>
    .box {
      line-height: 32px;
    }
    .box > span {
      font-size: 24px;
      vertical-align: top;
    }
  </style>
  ```

### 图片底部存在间隙

**【现象】**

任意一个块级元素中，若存在图片，则块级元素的高度基本上要比图片的高度高。

**【原因】**

- “幽灵空白节点”：一个存在于每个 “行框盒子” 前面，同时具有该元素的字体和行高属性的 0 宽度的内联盒
- `line-height`
- `vertical-align`

假设 `line-height: 20px` ，此时 `font-size: 24px` ，使用字符 x 代替 “幽灵空白节点” ，字符 x 至少下移了 3px 的半行间距（具体大小与字体有关）。**图片作为替换元素其基线（baseline）为自身下边缘，默认和 “幽灵空白节点” 基线（即，字符 x 的下边缘）对齐**，则 “幽灵空白节点” 下移的行高为产生的间隙，表现形式上为图片产生了间隙。

**【解决方法】**

- 图片块状化。可以去除 “幽灵空白节点”、`line-height` 和 `vertical-align`
- 容器 `line-height` 足够小。只要 “幽灵空白节点” 半行间距小到字符 x 的下边缘或者再上，则无法撑开空间。比如：`line-height: 0`
- 容器 `font-size` 足够小。需要容器的 `line-height` 属性值和当前 `font-size` 相关，比如 `line-height: 1.5`，否则只会让间隙更大，因为基线位置随着字符 x 变下而往上升
- 改变垂直对齐方式（`vertical-align`），比如顶部对齐 `vertical-align: top`

### 内联元素导致 margin 无效

**【现象】**

如下所示，`margin-top: -200px` 的图片应该展示在容器的外面，但是，图片依然有部分在 div 元素中。

::: vue-demo

```vue
<template>
  <div class="vertical-align-wrapper-margin-deactivation">
    x<img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
  </div>
</template>

<script>
export default {}
</script>

<style>
.vertical-align-wrapper-margin-deactivation {
  margin-top: 80px;
  background-color: #9aa9b2;
}

.vertical-align-wrapper-margin-deactivation > .vuepress-img {
  height: 96px;
  margin-top: -200px;
  background-color: #3eaf7c;
}
</style>
```

:::

**【原因】**

图片元素前存在 “幽灵空白节点”（用字符 x 代替展示） ，在 CSS 中，非主动触发位移的内联元素是不可能跑到计算容器之外的，导致图片的位置被 “幽灵空白节点” 的 `vertical-align: baseline` 限制了。字符 x 下边缘和图片下边缘对齐，字符 x 非主动定位，不可能跑到容器外面，所以图片就被限制的问题，`margin-top` 失效。

**【解决办法】**

- 图片块状化。
- 改变垂直对齐方式，比如顶部对齐 `vertical-align: top`

### 图片排列使用 `<i>` 补位，设置 display: inline-block 存在间距问题

**【现象】**

为实现图片如下示例排列，可使用 `text-align: jusitfy` （规定元素中的文本的水平对齐方式，`jusitfy` 属性为实现两端对齐文本效果），为了让任意个数的列表最后一行也是左对齐排列，在列表最后辅助和列表宽度一样的空标签元素来占位，类似 `<i>` 标签 （示例中已使用 `outline: 1px solid #db5860;` 标出）

::: vue-demo

```vue
<template>
  <div class="vertical-align-wrapper-img-text-align">
    <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
    <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
    <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
    <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
    <i class="justify-fix"></i>
    <i class="justify-fix"></i>
    <i class="justify-fix"></i>x-baseline
  </div>
</template>

<script>
export default {}
</script>

<style>
.vertical-align-wrapper-img-text-align {
  width: 300px;
  text-align: justify;
  line-height: 0;
  background-color: #9aa9b2;
}

.vertical-align-wrapper-img-text-align > .vuepress-img {
  width: 96px;
  background-color: #3eaf7c;
}

.vertical-align-wrapper-img-text-align > .justify-fix {
  width: 96px;
  display: inline-block;
  font-family: '微软雅黑';
  outline: 1px solid #db5860;
}
</style>
```

:::

**【原因】**

其主要原因为 `vertical-align` 和 `line-height` 共同作用的结果。

在最后一个占位元素 `<i>` 标签后，添加字符 x-baseline 。

`line-height: 0`，则字符占据高度为 0 。在 CSS 中，行间距上下等分，此时字符 x-baseline 高度的起始位置为当前字符内容区域（可看成文字选中背景区域）的垂直中线位置。字符 x-baseline 微软雅黑字体，字形下沉明显，内容区域的垂直中心位置大约在字符 x 的上面 1/4 处

`vertical-align: baseline` 对于设置 `display: inline-block` 的 `<i>` 标签元素（用于占位），如果该元素内没有内联元素，则该元素的基线（baseline）为该元素 `margin` 底边缘，于是下移了差不多 3/4 个 x 的高度，这个下移的高度就是产生的间隙高度。

**【解决方法】**

- 修改占位元素 `<i>` 标签的基线。在占位元素 `<i>` 里面添加字符，比如： `<i class="justify-fix">&nbsp</i>` 。因为此时 `vertical-align: baseline` 对于设置 `display: inline-block` 的 `<i>` 标签元素（用于占位），该元素的基线（baseline）为该元素内最后一行内联元素的基线（baseline），即：字符 x 的下边缘（“幽灵空白节点”）。正好和外面 “幽灵空白节点” 的基线位置一致。
- 修改 “幽灵空白节点” 的基线位置。设置 `font-size: 0`，当字体足够小时，基线和中线会重合。
- 使用其他 `vertical-align` 对齐方式，比如：`vertical-align: top`

## 基于 vertical-align 属性的水平垂直居中弹框

```html
<div class="container">
  <div class="dialog"></dialog>
</div>

<style>
.container {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}
.container:after {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.dialog {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  font-size: 14px;
  white-space: normal;
}
</style>
```
