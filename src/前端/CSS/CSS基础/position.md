---
category: CSS基础
tag:
  - CSS
---

# position

`position` 属性用于指定一个元素在文档中的定位方式。

- `static` ：该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- `relative` ：该关键字下，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。
- `absolute` ：元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。绝对定位的元素可以设置外边距（margins），且不会与其他边距合并。
- `fixed` ：元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。fixed 属性会创建新的层叠上下文。当元素祖先的 transform、perspective、filter 或 backdrop-filter 属性非 none 时，容器由视口改为该祖先。
- `sticky` ：元素根据正常文档流进行定位，然后相对它的最近滚动祖先（nearest scrolling ancestor）和包含块（最近块级祖先 nearest block-level ancestor），包括 table-related 元素，基于 top、right、bottom 和 left 的值进行偏移。偏移值不会影响任何其他元素的位置。该值总是创建一个新的层叠上下文（stacking context）。

## position: absolute

### absolute 和 float 的共性

- 块状化：元素一旦 `position` 属性值为 `absolute` 或 `fixed`，其 `display` 计算值就是 `block` 或者 `table`。
- 破坏性：破坏正常的流特性。
- 块级格式化上下文。
- 包裹性：尺寸收缩包裹，同时具有自适应性。和 `float` 或其他 “包裹性” 声明带来的 “自适应性” 相比，`absolute` 的自适应性最大宽度往往不是由父元素决定的。

当 `absolute` 和 `float` 同时存在的时候，`float` 属性是无任何效果的。

### absolute 的包含块

包含块（containing block）是元素用来计算和定位的一个框。

普通元素的百分比宽度是相对于父元素的 content box 宽度计算的，而绝对定位元素的宽度是相对于第一个 `position` 不为 `static` 的祖先元素计算的。

计算规则：

- 根元素（很多场景下可以看成是 `<html>` ）被称为“初始包含块”，其尺寸等同于浏览器可视窗口的大小。
- 对于其他元素，如果该元素的 `position` 是 `relative` 或者 `static`，则“包含块”由其最近的块容器祖先盒的 content box 边界形成。
- 如果元素 `position:fixed`，则 “包含块” 是 “初始包含块”。
- 如果元素 `position:absolute`，则 “包含块” 由最近的 `position` 不为 `static` 的祖先元素建立，具体方式如下：
  - 如果该祖先元素是纯 inline 元素：
    - 假设给内联元素的前后各生成一个宽度为 0 的内联盒子（inline box），则这两个内联盒子的 padding box 外面的包围盒就是内联元素的 “包含块”；
    - 如果该内联元素被跨行分割了，那么 “包含块” 是未定义的，也就是 CSS2.1 规范并没有明确定义，浏览器自行发挥。
  - 否则，“包含块” 由该祖先的 padding box 边界形成。
- 如果没有符合条件的祖先元素，则 “包含块” 是 “初始包含块” 。

和常规元素相比，absolute 绝对定位元素的 “包含块” 有以下3个明显差异

- 内联元素也可以作为 “包含块” 所在的元素。
- “包含块” 所在的元素不是父块级元素，而是最近的 `position` 不为 `static` 的祖先元素或根元素。

  对于普通元素，`height:100%` 和 `height:inherit` 没什么区别。

  对于绝对定位元素，`height:100%` 是第一个具有定位属性值的祖先元素的高度，而 `height:inherit` 则是单纯的父元素的高度继承，在某些场景下非常好用。

- 边界是 padding box 而不是content box。

### 无依赖绝对定位

一个绝对定位元素，没有任何 left/top/right/bottom 属性设置（称为 “无依赖绝对定位”），并且其祖先元素全部都是非定位元素，其位置还是当前位置。

“无依赖绝对定位” 本质上就是 “相对定位”，仅仅是不占据 CSS 流的尺寸空间而已。

### absolute 和 text-align

`text-align` 可以改变 `absolute` 元素的位置。

::: normal-demo 图片位置确实受 text-align 属性影响

```html
<div class="height-128px">
  <p class="text-align-center">
    <img class="width-128px height-128px position-absolute" src="https://vuepress.vuejs.org/images/hero.png">
  </p>
</div>
```

```css
.width-128px {
  width: 128px;
}

.height-128px {
  height: 128px;
}

.text-align-center {
  text-align: center;
}

.position-absolute {
  position: absolute;
}
```

:::

示例中，图片位置确实受 `text-align` 属性影响，但是并不是 `text-align` 和 `absolute` 元素直接发生关系，`absolute` 元素的 `display` 计算值是块状的，`text-align` 是不会有作用的。这里之所以产生了位置变化，本质上是 “幽灵空白节点” 和 “无依赖绝对定位” 共同作用的结果。

- 由于 `<img>` 是内联水平，`<p>` 标签中存在一个宽度为 0、看不见摸不着的 “幽灵空白节点”，也是内联水平，于是受 `text-align:center` 影响而水平居中显示。
- `<img>` 设置了 `position: absolute`，表现为“无依赖绝对定位”，因此在 “幽灵空白节点” 后面定位显示；同时，由于图片不占据空间，这里的 “幽灵空白节点” 当仁不让，正好在 `<p>` 元素水平中心位置显示，于是就看到了图片从 `<p>` 元素水平中间位置显示的效果。

### absolute 与 overflow

`overflow` 对 `absolute` 元素的剪裁规则：绝对定位元素不总是被父级 `overflow` 属性剪裁，尤其当 `overflow` 在绝对定位元素及其包含块之间的时候。即：如果 `overflow` 不是定位元素，同时绝对定位元素和 `overflow` 容器之间也没有定位元素，则 `overflow` 无法对 `absolute` 元素进行剪裁。

## position: relative

`relative`/`absolute`/`fixed` 都能对 `absolute` 的“包裹性”以及“定位”产生限制，但只有``relative` 可以让元素依然保持在正常的文档流中。

`relative` 定位特性

- 相对自身。
- 无侵入（当 `relative` 进行定位偏移的时候，一般情况下不会影响周围元素的布局）。
- 相对定位元素的 left/top/right/bottom 的百分比值是相对于包含块计算的，而不是自身。注意，虽然定位位移是相对自身，但是百分比值的计算值不是。
  - top 和 bottom 这两个垂直方向的百分比值计算跟 height 的百分比值是一样的，都是相对高度计算的。
  - 如果包含块的高度是 auto，那么计算值是 0，偏移无效，也就是说，如果父元素没有设定高度或者不是“格式化高度”，那么 relative 类似 top:20% 的代码等同于 top:0。
- 当相对定位元素同时应用对立方向定位值的时候，也就是 top/bottom 和 left/right 同时使用的时候，其表现和绝对定位差异很大。
  - 绝对定位是尺寸拉伸，保持流体特性。
  - 相对定位只有一个方向的定位属性会起作用，与文档流的顺序有关的。默认的文档流是自上而下、从左往右，因此 top/bottom 同时使用的时候，bottom 被干掉；left/right 同时使用的时候，right 被干掉。
