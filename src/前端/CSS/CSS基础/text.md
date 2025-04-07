---
category: CSS基础
tag:
  - CSS
---

# text

## text-indent 与内联元素缩进

`text-indent` 对文本进行缩进控制。

```css
/* <length> 值，允许使用负值 */
text-indent: 3mm;
text-indent: 40px;

/* <percentage> 值，相对于包含区块的宽度 */
text-indent: 15%;

/* 关键字值 */
/* each-line 缩进会影响区块容器的第一行以及强制换行后的每一行，但不影响软换行后的行。 */
/* hanging 反转缩进行。除第一行外，所有行都将缩进。 */
text-indent: 5em each-line;
text-indent: 5em hanging;
text-indent: 5em hanging each-line;

/* 全局值 */
text-indent: inherit;
text-indent: initial;
text-indent: revert;
text-indent: revert-layer;
text-indent: unset;
```

- `text-indent` 负值隐藏文本内容。不建议设置一个很大的 `text-indent` 负值，存在如下隐患：

  - 在某些设备下有潜在的性能风险，体现在滚屏的时候会发生卡顿。
  - 对于一些智能设备的屏幕阅读软件，如 VoiceOver，如果内容缩进在屏幕之外，它是不会读取的，这样就降低了页面的无障碍访问能力。
  - `text-indent` 负值缩进在部分浏览器下会影响元素的 `outline` 区域，通常需要再设置 `overflow:hidden`。

  ```css
  /* 使用 text-indent 负值隐藏文本内容 */
  .logo {
    width: 120px;
    background: url(logo.png);
    text-indent: -120px;
  }
  ```

- `text-indent` 的百分比值是相对于当前元素的 “包含块” 计算的，而不是当前元素。`text-indent` 最终作用的是当前元素里的内联盒子。

## letter-spacing 与字符间距

`letter-spacing` 可以用来控制字符之间的间距，“字符”包括英文字母、汉字以及空格等。

- `letter-spacing` 具有的特性

  - 继承性
  - 默认值是 `normal` 而不是 `0`。虽然说正常情况下，`normal` 的计算值就是 `0`，但两者还是有差别的，在有些场景下，`letter-spacing` 会调整 `normal` 的计算值以实现更好的版面布局。
  - 支持负值，且值足够大的时候，会让字符形成重叠，甚至反向排列（非IE 浏览器），至于IE 浏览器，最多只能完全重叠，无法反向排列。
  - 和 `text-indent` 属性一样，无论值多大或多小，第一行一定会保留至少一个字符。在默认的左对齐情况下，无论值如何设置，第一个字符的位置一定是纹丝不动的。
  - 支持小数值，即使 `0.1px` 也是支持的，但并不总能看到效果，这与屏幕的密度有关。

    对普通的桌面显示器，设备像素比是 1，最小渲染单位是 1px，因此，需要至少连续10 个字符，才能看到 0.1px 产生的 1px 间距变化，如果是9 个字符，则不会有效果，这很可能会让人误以为letter-spacing 不支持非常小的数值，实际上是支持的。

  - 暂不支持百分比值。

- `letter-spacing` 可以修复一些布局上的问题。

  清除 `inline-block` 列表由于换行符或者空格产生的空白间隙，使我们的布局控制更精准。

  ```css
  .box { letter-spacing: -1em; }

  /* letter-spacing 的值再小也不会让 inline-block 列表发生重叠。  */
  /* 由于 letter-spacing 具有继承性，为了不影响列表里面字符内容的排版，可以使用 letter-spacing:0 进行重置 */
  .list { letter-spacing: 0; }
  ```

- 利用 `letter-spacing` 负值的字体重叠特性，实现一些文本动效。

  ```css
  .title {
    animation: textIn 1s both;
  }

  @keyframes textIn {
    0% {
      letter-spacing: -200px;
    }
    100% {
      letter-spacing: 0;
    }
  }
  ```

## word-spacing 与单词间距

- `word-spacing` 与 `letter-spacing` 具有类似的特性：

  - 具有继承性。
  - 默认值都是 `normal` 而不是 `0`。通常情况下，两者表现并无差异。
  - 都支持负值，都可以让字符重叠，但是对于 `inline-block` 和 `inline-table` 元素却存在兼容性差异，Chrome 浏览器下可以重叠，IE 和Firefox 浏览器下则再大的负值也不会重叠，因此不适合使用 `word-spacing` 来清除空白间隙。
  - 都支持小数值，如 `word-spacing: 0.5px`。
  - 间隔算法都会受到 `text-align:justify;` 两端对齐的影响。

- `word-spacing` 与 `letter-spacing` 的差异

  `letter-spacing` 作用于所有字符，但 `word-spacing` 仅作用于空格字符。注意，是作用在“空格”上，而不是字面意义上的“单词”。

  `word-spacing` 的作用就是增加空格的间隙宽度。有空格就有效。可以是 Space 键敲出来的空格（U+0020），也可以是换行符产生的空格（浏览器解析为U+0020），还可以是 Tab 键敲出来的空格（U+0009），抑或是 `&npsp;` 非换行空格（U+00A0）。

- `word-spacing` 作用于空格的特性，可以让使用一些简单的方式进行一些布局控制。例如，使多按钮的时候中间自动有合适的间距

## word-break 和 word-wrap 换行的区别

- `word-break`

```css
/* 使用默认的换行规则 */
word-break: normal;
/* 允许任意非 CJK（Chinese/Japanese/Korean）文本间的单词断行 */
word-break: break-all;
/* 不允许 CJK 文本中的单词换行，只能在半角空格或连字符处换行。非CJK文本的行为实际上和 normal 一致 */
word-break: keep-all;
```

- `word-wrap`

```css
/* 正常的换行规则 */
word-wrap: normal;
/* 一行单词中实在没有其他靠谱的换行点的时候换行 */
word-wrap: break-word;
```

- `word-break:break-all;` 和 `word-wrap:break-word;` 的区别

  - `word-break:break-all;` ：所有的都换行，一点儿空隙都不放过。
  - `word-wrap:break-word;` ：如果这一行文字有可以换行的点，如空格或CJK（中文/日文/韩文）之类的，就不打英文单词或字符在这些换行点换行，至于对不对齐、好不好看则不关心，因此，很容易出现一片一片空白区域的情况。

## white-space 与换行和空格的控制

### white-space 的处理模型

`white-space` 属性声明了如何处理元素内的空白字符，这类空白字符包括 Space（空格）键、Enter（回车）键、Tab（制表符）键产生的空白。

因此，`white-space` 可以决定图文内容是否在一行显示（回车空格是否生效），是否显示大段连续空白（空格是否生效）等。

`white-space` 属性值包括：

- `normal` ：合并空白字符和换行符。
- `pre` ：空白字符不合并，并且内容只在有换行符的地方换行。
- `nowrap` ：该值和 `normal` 一样会合并空白字符，但不允许文本环绕。
- `pre-wrap` ：空白字符不合并，并且内容只在有换行符的地方换行，同时允许文本环绕。
- `pre-line` ：合并空白字符，但只在有换行符的地方换行，允许文本环绕。

`white-space` 的功能分 3 个维度，分别是：是否合并空白字符，是否合并换行符，以及文本是否自动换行。

| 属性       | 换行 | 空格和制表 | 文本环绕 |
| ---------- | ---- | ---------- | -------- |
| `normal`   | 合并 | 合并       | 环绕     |
| `nowrap`   | 合并 | 合并       | 不环绕   |
| `pre`      | 保留 | 保留       | 不环绕   |
| `pre-wrap` | 保留 | 保留       | 环绕     |
| `pre-line` | 保留 | 合并       | 环绕     |

### white-space 与最大可用宽度

当 `white-space` 设置为 `nowrap` 的时候，元素的宽度此时表现为“最大可用宽度”，换行符和一些空格全部合并，文本一行显示。

- “包含块”尺寸过小处理。

  绝对定位以及 `inline-block` 元素都具有包裹性，当文本内容宽度超过包含块宽度的时候，就会发生文本环绕现象。可以对其使用 `white-space:nowrap;` 声明让其如预期的那样一行显示。

- 单行文字溢出点点点效果。

  `text-overflow:ellipsis;` 文字内容超出打点效果离不开`white-space:nowrap;` 声明。

- 水平列表切换效果。水平列表切换是网页中常见的交互效果，如果列表的数目是不固定的，使用 `white-space:nowrap` 使列表一行显示会是个非常不错的处理。

## text-align 与元素对齐

```css
/* 把文本排列到左边。默认值：由浏览器决定。 */
text-align: left;
/* 把文本排列到右边。 */
text-align: right;
/* 把文本排列到中间。 */
text-align: center;
/* 实现两端对齐文本效果。 */
text-align: justify;
```

从渲染表现来看，Chrome 等浏览器应该对文本内容进行了算法区分，对 CJK 文本使用了 `letter-spacing` 间隔算法，而对非 CJK 文本使用的是 `word-spacing` 间隔算法，但IE 浏览器则就一个 `word-spacing` 间隔算法。

`text-align:justify;` 实现两端对齐布局效果

- 一行排列

  在默认设置下，`text-align:justify;` 需要达到两端对齐的效果，需要满足两点：一是，有分隔点，如空格；二是，要超过一行，此时非最后一行内容会两端对齐。

  ```html
  <ul class="justify">
    <li>
      <img src="1.jpg">
      <p>图标描述1</p>
    </li>
    <li>
      <img src="1.jpg">
      <p>图标描述2</p>
    </li>
  </ul>
  ```

  ```css
  .justify {
    text-align: justify;
    font-size: 0;
  }

  /* 相当于强制创建一个“看不见”的元素，满足换行要求，实现第一行的两端对齐效果。 */
  /* 从效果上看，确实两端对齐了，然而，列表下方似乎莫名多了一些高度。修正手段莫名高度方法，分为两点： */
  /* 一是，容器设置 font-size:0; ，列表 font-size 再还原； */
  /* 二是，辅助两端对齐的内联元素设置 vertical-align:top; 或 vertical-align:bottom; 。 */
  .justify:after {
    content: "";
    display: inline-table; /* 也可以是inline-block */
    vertical-align: bottom;
    width: 100%;
  }

  .justify li {
    display: inline-block;
    text-align: center;
    font-size: 14px;
  }
  ```

- 多行排列

  ```html
  <ul class="justify">
    <li><img src="1.jpg"><p>描述1</p></li>
    <li><img src="2.jpg"><p>描述2</p></li>
    <li><img src="3.jpg"><p>描述3</p></li>
    <li><img src="4.jpg"><p>描述4</p></li>
    <li><img src="5.jpg"><p>描述5</p></li>

    <!-- 布局辅助元素 -->
    <!-- 作用和使用伪元素创建一个宽度 100% 的内联块级元素是一样的，也同样会存在有额外高度问题，处理方法与单行排列一样  -->
    <!-- 关于占位标签的个数。占位标签的个数和列表的列数保持一样就可以了 -->
    <li class="placeholder"></li>
    <li class="placeholder"></li>
    <li class="placeholder"></li>
  </ul>
  ```

  ```css
  .placeholder {
    display: inline-block;
    width: 128px;
    vertical-align: bottom;
  }
  ```

## text-decoration

`text-decoration` CSS 简写属性，设置文本上的装饰性线条的外观。它是 `text-decoration-line`、`text-decoration-color`、`text-decoration-style` 和较新的 `text-decoration-thickness` 属性的缩写。

- `text-decoration-line` ：设置使用的装饰类型，值有 `none` （无效果）、 `underline` （下划线）、 `overline` （上划线）、 `line-through` （删除线）。
- `text-decoration-color` ：设置装饰的颜色。
- `text-decoration-style` ：设置装饰的线条的样式，例如 solid、wavy 或 dashed。
- `text-decoration-thickness` ：设置装饰的线条粗细。

## text-transform

`text-transform` CSS 属性，指定如何将元素的文本大写。常用属性如下：

```css
/* 阻止所有字符的大小写被转换。 */
text-transform: none;
/* 强制每个单词的首字母转换为大写。 */
text-transform: capitalize;
/* 强制所有字符被转换为大写。可用于身份证输入、验证码输入 */
text-transform: uppercase;
/* 强制所有字符被转换为小写。 */
text-transform: lowercase;
```

## ::first-letter/::first-line 伪元素

### ::first-letter

`::first-letter` CSS 伪元素，将样式应用于区块容器第一行的第一个字母，但仅当其前面没有其他内容（例如图像或行内表格）时才有效。

- `::first-letter` 伪元素生效的前提

  - 元素的 `display` 计算值必须是 `block`、`inline-block`、`list-item`、`table-cell` 或者 `table-caption`，其他所有 `display` 计算值都没有用（包括 `display:table` 和 `display:flex` 等）。
  - 不是所有的字符都能单独作为 `::first-letter` 伪元素存在的。
  - 正常情况下，可以直接作为伪元素的字符就是数字、英文字母、中文、$、一些运算符，以及空格等。
  - 不能作为伪元素的字符包括 `·@#%&*()（）[]【】{}:："“”;；'‘’》《,，.。？?!！…*、/\` 。
  - 如果字符前面只包含不能作为微元素的字符，则 `::first-letter` 伪元素不起作用；如果不能作为微元素的字符后面存在可以作为伪元素的字符，则前面的和第一伪元素字符的样式一样。
  - 字符前面不能有图片或者 `inline-block / inline-table` 之类的元素存在。

- `::before` 伪元素也参与 `::first-letter` 伪元素。

- `::first-letter` 伪元素可以生效的 CSS 属性。如果字符被选作了 `::first-letter` 伪元素，CSS 只是一部分有效。

  - 所有字体相关属性：font、font-style、font-variant、font-weight、font-size、line-height 和font-family。
  - 所有背景相关属性：background-color、background-image、background-position、background-repeat、background-size 和 background-attachment。
  - 所有 margin 相关属性：margin、margin-top、margin-right、margin-bottom和margin-left。
  - 所有 padding 相关属性：padding、padding-top、padding-right、padding-bottom和padding-left。
  - 所有 border 相关属性：缩写的border、border-style、border-color、border-width 和普通书写的属性。
  - color 属性。
  - text-decoration、text-transform、letter-spacing、word-spacing（合适情境下）、line-height、float 和vertical-align（只有当float 为none的时候）等属性。

- `::first-letter` 伪元素的一些特点

  - 支持部分 `display` 属性值标签嵌套

    `::first-letter` 伪元素获取可以跨标签，也就是不仅能选择匿名内联盒子，还能透过层层标签进行选择，但是也有一些限制，并不是所有标签嵌套都是有用的。

    `display` 值如果是 `inline`、`block`、`table`、`table-row`、`table-caption`、`table-cell`、`list-item` 都是可以的，但是不能是 `inline-block` 和 `inline-table` ，否则 `::first-letter` 伪元素会直接无效；而 `display:flex` 则改变了规则，直接选择了下一行的字符内容。

  - 颜色等权重总是多了一层

### ::first-line

`::first-line` CSS 伪元素，在某 block-level element （块级元素）的第一行应用样式。第一行的长度取决于很多因素，包括元素宽度，文档宽度和文本的文字大小。

- `::first-line` 和 `::first-letter` 伪元素一样，只能作用在块级元素上，也就是 display 为 block、inline-block、list-item、table-cell 或者 table-caption 的元素设置 `::first-line` 才有效，table、flex 之类都是无效的。
- `::first-line` 和 `::first-letter` 伪元素一样，仅支持部分CSS 属性，例如：

  - 所有字体相关属性；
  - color 属性；
  - 所有背景相关属性；
  - text-decoration、text-transform、letter-spacing、word-spacing、line-height 和vertical-align 等属性。

- `::first-line` 和 `::first-letter` 伪元素一样，color 等继承属性的权重总是多了一层，毕竟称为“伪元素”，就好像里面还有个子元素。如果`::first-line` 和 `::first-letter` 同时设置颜色，`::first-letter` 级别 `::first-line` 高，即使 `::first-line` 写在后面，甚至加 `!important`（如果浏览器支持）也是如此。

- `::first-line` 和 `::first-letter` 伪元素一样，也支持标签嵌套，但是具体细则和 `::first-letter` 出入较大，例如，它不支持table 相关属性等。

## 文本截断

- 常规 CSS 方法

  ```html
  <p>这是一段测试文字，主要是用来测试文字溢出后是否会用省略号显示。</p>

  <style type="text/css">
  p {
    /* 确保元素具有维度，以知道何时获取省略号 */
    width:16em;
    /* 防止文本高度超过一行 */
    white-space:nowrap;
    /* 使其在文本超出其维度时以省略号结尾 */
    text-overflow:ellipsis;
    -o-text-overflow:ellipsis;
    /* 防止文本溢出其尺寸(对于块，100 %宽度和自动高度) */
    overflow:hidden;
  }
  </style>
  ```

- margin 负值定位法

  当文字内容足够长时就把隐藏在上面的省略号层给挤下来了。关键就是点点点所在 div 层的高度的绝对值要比其 margin 的绝对值大那么一点点。

  ```html
  <div class="text_div">
    <div class="text_content">这是一段测试文字，主要是用来测试文字溢出后是否会用省略号显示。</div>
    <div class="text_dotted">…</div>
  </div>

  <style type="text/css">
  .text_div {
    width:16em;
    height:1.3em;
    overflow:hidden;
    zoom:1;
  }

  .text_div .text_content {
    float:left;
    height:1.3em;
    margin-right:3em;
    overflow:hidden;
  }

  .text_div .text_dotted {
    width:3em;
    height:1.31em;
    float:right;
    margin-top:-1.3em;
  }
  </style>
  ```

- -webkit-line-clamp 下多行文字溢出省略号显示

  -webkit-line-clamp 限制在一个块元素显示的文本的行数。为了实现该效果，它需要组合其他外来的WebKit属性。常见结合属性：

  - display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
  - -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
  - text-overflow ，可以用来多行文本的情况下，用省略号 “...” 隐藏超出范围的文本 。

  ```html
  <div class="text">这是一段比较长的文字，用来测试是否文字溢出时会用省略号显示。</div>

  <style type="text/css">
  .text {
    width: 200px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  </style>
  ```
