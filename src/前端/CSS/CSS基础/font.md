# font

## font-size

### `font-size` 属性值

`font-size` 支持长度值（如 `1em`），也支持百分比值（如 `100%`）。同时，还支持关键字属性值。

`font-size` 的关键字属性值分以下两类。

- 相对尺寸关键字。指相对于当前元素 `font-size` 计算，包括：

  - `larger` ：大一点，是 `<big>` 元素的默认 `font-size` 属性值。
  - `smaller` ：小一点，是 `<small>` 元素的默认 `font-size` 属性值。

- 绝对尺寸关键字。与当前元素 `font-size` 无关，仅受浏览器设置的字号影响。

  - `xx-large` ：好大好大，和 `<h1>` 元素计算值一样。
  - `x-large` ：好大，和 `<h2>` 元素计算值一样。
  - `large` ：大，和 `<h3>` 元素计算值近似（“近似”指计算值偏差在1 像素以内，下同）。
  - `medium` ：不上不下，是 `font-size` 的初始值，和 `<h4>` 元素计算值一样。
  - `small` ：小，和 `<h5>` 元素计算值近似。
  - `x-small` ：好小，和 `<h6>` 元素计算值近似。
  - `xx-small` ：好小好小，无对应的 HTML 元素。

相对尺寸关键字 `larger` 和 `smaller` 由于计算的系数在不同浏览器下差异很大，因此实用价值有限，只有类似文档页、帮助页这类对文字尺寸要求不高的场合才有用；绝对尺寸关键字的实用性要大一些，而且在某些场合是推荐使用的关键字属性值。

> Q： 如果 `font-size` 默认值是 `medium` ，而 `medium` 计算值仅与浏览器设置有关，那为何平时元素 `font-size` 总是受环境影响变来变去呢？
>
> A： 因为 `font-size` 属性的继承性，实际开发的时候，我们常常会对 `<html>` 或 `<body>` 重置 `font-size` 大小，例如：`body { font-size: 14px; }` 。于是，受继承性影响，大多数后代元素的 `font-size` 计算值也变成了 `14px` ，`medium` 这个初始值受继承性影响而被覆盖了。

### font-size:0 与文本的隐藏

Chrome 浏览器有个 `12px` 的字号限制，就是文字的 `font-size` 计算值不能小于 `12px`，正是这种限制导致我们在使用 `em` 或 `rem` 进行布局的时候，不能这么处理： `html { font-size: 62.5%; }` 。理论上，此时根字号计算值是 `16px * 0.625=10px`，于是，`width:14px` 可以写成 `width:1.4em`，省了很多计算的麻烦。

但是，在 Chrome 下，由于 `12px` 的限制，根字号计算值实际不是 `10px`，而是 `12px`，所以，可以试试处理成这样： `html { font-size: 625%; }` 。 此时根字号计算值是 `100px`，既计算无忧，又没有 `12px` 的最小字号限制。

- 缺陷

  建议还是不要这样处理，尤其使用 `em` 的时候，因为 `font-size` 属性和 `line-height` 属性一样，由于继承性的存在，会影响贯穿整个网页，`100px` 的环境 `font-size` 一定会将平时不显山露水的底边对齐问题、间隙问题等放大，导致出现一些明显的样式问题，同时这样做也限制了 `px` 等其他单位的使用，有时候是比较要命的。

- 建议

  仍基于浏览器默认的字号进行相对计算，也就是 `medium` 对应的 `16px`，16 这个数字是一定可以整除的，因此计算成本还行，或者使用 Sass 或 Less 之类的工具辅助计算。

Chrome 浏览器下有个 `12px` 的字号限制，并不是所有小于 `12px` 的 `font-size` 都会被当作 `12px` 处理，有一个值例外，那就是 `0` 。 也就是说，如果 `font-size:0` 的字号表现就是 `0`，那么文字会直接被隐藏掉，并且只能是 `font-size:0`，哪怕设置成 `font-size:0.0000001px`，都还是会被当作 `12px` 处理的。

因此，如果希望隐藏 logo 对应元素内的文字，除了 `text-indent` 缩进隐藏外，还可以试试下面这种方法：`.logo { font-size: 0; }`

### font-size 和 vertical-align

`line-height` 的部分类别属性值是相对于 `font-size` 计算的，`vertical-align` 百分比值属性值又是相对于 `line-height` 计算的，所以 `vertical-align` 和 `font-size` 属性背后其实也有有着关联的。

```css
p {
  font-size: 16px;
  line-height: 1.5;
}

/* 基础示例 */
p > img {
  /* -25% 是一个相对计算属性值，如果此时元素的 font-size 发生变化，则图片会自动进行垂直位置调整。 */
  /* vertical-align 计算值为： 16px * 1.5 * (-25%) = -6px */
  /* 等同于 vertical-align: -6px; */
  vertical-align: -0.25%;
}

/* 无论 font-size 如何变化，图标都垂直居中对齐的示例 */
/* 内联元素默认基线对齐，图片的基线可以看成是图片的下边缘，文字内容的基线是字符 x 下边缘 */
/* 因此，图片下边缘默认和文本底边缘往上一点的位置对齐，通过 vertical-align:25% 声明让图片的下边缘和文本的中心线对齐 */
/* 图标是固定的像素尺寸，因此，通过偏移自身 1/2 高度来实现真正的居中，可以使用 CSS3 transform 位移，为了兼容性，可以使用 relative 相对定位  */
p > img {
  width: 16px;
  height: 16px;
  vertical-align: 25%;
  position: relative;
  top: 8px;
}

/* 更好的实现文本和图标都垂直居中对齐 */
/* 使用 vertical-align: .6ex 实现的垂直居中效果不会受 line-height 变化影响 */
/* 而使用 vertical-align:25% ，line-height 一旦变化，就必须改变原来的 vertical-align 大小、重新调整垂直位置，这容错性明显就降了一个层次。 */
/* 因此，推荐使用与 font-size 有着密切关系的 ex 单位。  */
p > img {
  width: 16px;
  height: 16px;
  vertical-align: .6ex;
  position: relative;
  top: 8px;
}
```

### font-size 与ex、em 和rem 的关系

- `ex` 是字符 `x` 高度，`font-size` 值越大，自然 `ex` 对应的大小也就大。

- `em` 在传统排版中指一个字模的高度，注意是字模的高度，不是字符的高度。其一般由 `M` 的宽度决定（因为宽相同），所以叫 `em`。也就是说，之所以叫作 `em` 完全取决于 `M` 的字形。

  - `em` 实际上更适用于图文内容展示的场景，对此进行弹性布局。 `<h1> - <h6>`以及 `<p>` 等与文本内容展示的元素的 `margin` 都是用 `em` 作为单位。这样，当用户把浏览器默认字号从 “中” 设置成 “大” 或改成 “小” 的时候，上下间距也能根据字号大小自动调整，使阅读更舒服。
  - 使用 SVG 矢量图标，建议设置 SVG 宽高为 `svg { width: 1em; height: 1em; }` 。无论图标是个大号文字混在一起还是和小号文字混在一起，都能和当前文字大小保持一致，既省时又省力。

  > Q：在Chrome 浏览器下，`<h1>` 元素有如下的默认CSS： `h1 { font-size: 2em; -webkit-margin-before: 0.67em; -webkit-margin-after: 0.67em; }` 。假设页面没有任何 CSS 重置，根元素 `font-size` 就是默认的 `16px`，请问：此时 `<h1>` 元素 `margin-before` 的像素计算值是多少？
  >
  > A：假设 `<h1>` 里面有汉字，这个高度就是此时 `1em` 大小。 `<h1>` 元素此时 `font-size` 是 `2em`，此时里面汉字的高度应该是 `32px`，此时 `<h1>` 元素的 `1em` 应该是 `32px`，于是 `margin-before` 的像素计算值为 `32px×0.67 = 21.44px` 。

- `rem` 即 rootem ，根元素 `em` 大小。`em` 相对于当前元素，`rem` 相对于根元素，本质差别在于当前元素是多变的，根元素是固定的，也就是说，如果使用 `rem`，计算值不会受当前元素 `font-size` 大小的影响。`rem` 是 CSS3 单位，IE9 以上浏览器才支持，需要注意兼容性。

## font-family

font-family 支持两类属性值。

- 字体名 ：使用的对应字体的名称。可以不用区分大小写。如果有多个字体设定，从左往右依次寻找本地是否有对应的字体即可。

- 字体族 ：分为很多类，MDN 上文档分类如下：`font-family: serif;` （衬线字体）; `font-family: sans-serif;`（无衬线字体）; `font-family: monospace;`（等宽字体）; `font-family: cursive;`（手写字体）; `font-family: fantasy;`（奇幻字体）; `font-family: system-ui;`（系统UI 字体）; 对于中文网站，cursive 和 fantasy 应用场景有限。

### 衬线字体和无衬线字体

- 衬线字体，通俗讲就是笔画开始、结束的地方有额外装饰而且笔画的粗细会有所不同的字体。网页中常用中文衬线字体是“宋体”，常用英文衬线字体有 Times New Roman、Georgia 等

- 无衬线字体，没有这些额外的装饰，而且笔画的粗细差不多，如中文的“雅黑”字体，英文包括 Arial、Verdana、Tahoma、Helivetica、Calibri 等。

注意：

- 需要注意的是，serif 和 sans-serif 一定要写在最后，因为在大多数浏览器下，写在serif 和sans-serif 后面的所有字体都会被忽略。例如：`body { font-family: sans-serif, "Microsoft Yahei"; }`

- 在Chrome 浏览器下，后面的 Microsoft Yahei 字体是不会被渲染的。有可能浏览器认为当前“字体族”已经满足了文本渲染的需要，没必要再往后解析了。

### 等宽字体的实践价值

等宽字体，一般是针对英文字体而言的。就是每个字符在同等 `font-size` 下占据的宽度是一样的。

- 等宽字体利于代码呈现

- 等宽字体与图形呈现案例一则

  假设某工具有这么一个功能：通过下拉选择，可以改变元素的边框样式，也就是 `borderStyle` 在 `solid/dashed/dotted` 间切换。

  原生的 `<select>` 的 `<option>` 元素的 `innerHTML` 只能是纯 text 字符，不能有 html，也不支持伪元素，因此，要模拟 solid、dashed 和dotted，只能使用字符，而字符有长有短，可以使用等宽字体模拟成像样的规整的图形

- `ch` 单位与等宽字体布局

  `ch` 和 `em`、`rem`、`ex` 一样，是 CSS 中和字符相关的相对单位。

  和 `ch` 相关的字符阿拉伯数字 `0` 。`1ch` 表示一个 `0` 字符的宽度，所以 6 个 0 所占据的宽度就是 6ch。

  例如，有些输入框是输入手机号的，在中国，手机号是 11 位，因此我们可以设置该输入框宽度为 11ch，同时让字体等宽，则用户一眼就能看出自己是否少输入或者多输入了 1 位数字。

  又如，想实现一个屏幕上代码一个一个出现的动效，如果代码是等宽字体，此时使用 ch 单位来控制宽度，配合 overflow 属性和 CSS animation 就能在完全不使用 JavaScript 的情况下将此效果模拟出来。

### font-weight

`font-weight` 表示“字重”，文字的粗细程度。支持的属性值如下：

```css
/* 平常用的最多的 */
font-weight: normal;
font-weight: bold;

/* 相对于父级元素 */
font-weight: lighter;
font-weight: bolder;

/* 字重的精细控制 —— 使用数值作为 font-weight 属性值，必须是100～900 的整百数 */
/* 数值关键字和字母关键字之间是有对应关系的 */
/* 例如，font-weight:400 实际上等同于 font-weight:normal，font-weight:700 等同于 font-weight:bold。 */
font-weight: 100;
font-weight: 200;
font-weight: 300;
font-weight: 400;
font-weight: 500;
font-weight: 600;
font-weight: 700;
font-weight: 800;
font-weight: 900;
```

> Q：`font-weight` 无论是设置 300、400、500 还是 600，文字的粗细都没有任何变化，只有到 700 的时候才会加粗一下，感觉浏览器好像不支持这些数值，那么搞这么多档位不就是多余的吗？
>
> A：所有这些数值关键字浏览器都是支持的，之所以没有看到任何粗细的变化，是因为我们的系统里面缺乏对应粗细的字体。尤其做桌面端项目时，大部分用户都是使用 Windows 系统，而 Windows 系统中的中文字体粗细就一个型号，如“宋体”，或者说“微软雅黑”，因此，最终的效果就是 CSS 层面的 “加粗” 和 “正常尺寸” 两种表现。

## font-style

`font-style` 表示文字造型是斜还是正。

```css
/* italic 和 oblique 这两个关键字都表示“斜体”的意思。 */
/* italic 是使用当前字体的斜体字体，而 oblique 只是单纯地让文字倾斜。 */
/* 如果当前字体没有对应的斜体字体，则退而求其次，解析为 oblique，也就是单纯形状倾斜。 */
font-style: normal; 
font-style: italic; 
font-style: oblique; 
```

## font 属性

- 作为缩写的 `font` 属性

  - 利用 `font` 属性进行文本相关样式的缩写。可以缩写在 `font` 属性中的属性非常多，包括 `font-style`、`font-variant`、`font-weight`、`font-size`、`line-height`、`font-family` 等。

    完整语法为：`[ [ font-style || font-variant || font-weight ]? font-size [ / line-height ]? font-family ]` （`||` 表示或，`?` 表示 0 个或 1 个。）

    注： `font-size` 和 `font-family` 是必需的，不可缺少的。
  
  - `font` 属性的注意事项

    - `font` 缩写会破坏部分属性的继承性。

      假设页面行高是 20px，当使用了 font 属性后 `.font { font: 400 30px 'Microsoft Yahei'; }` ， `.font` 元素的行高 `line-height` 属性值就被重置为了 `normal`，而不同浏览器上 `line-height:normal` 是不一样的，因此，在使用 `font` 缩写的时候，如果不设定行高值，一定会出现不兼容的问题。换句话说，如果你的 `CSS` 代码原本就没有 `line-height` 属性，使用 `font` 缩写反而是不推荐的。

    - `font` 缩写必须要带上 `font-family`，然而，原本真实继承的 `font-family` 属性值可能会很长，每次 `font` 缩写后面都挂一个长长的字体列表， 使用小技巧可以避免带上`font-family`：

      - 可以随便找一个系统根本不存在的字体名占位，如字母 a，或者特殊一点，用笑脸表情 ☺，然后再设置 `font-family:inherit` 来重置这个占位字体。

        例如，把字号和行高合并缩写，就可以这样： `.font { font: 30px/30px '☺'; font-family: inherit; }` ，主要是因为 `font` 缩写不能使用 `inherit` 等全局关键字。

      - 利用 `@font face` 规则将我们的字体列表重定义为一个字体，这是兼容性很好、效益很高的一种解决方法。

- 使用关键字值的 `font` 属性

  `font:caption | icon | menu | message-box | small-caption | status-bar`

  如果将 `font` 属性设置为上面的一个值，就等同于设置 `font` 为操作系统该部件对应的 `font`，也就是说直接使用系统字体。

  - `caption`：活动窗口标题栏使用的字体。
  - `icon`：包含图标内容所使用的字体，如所有文件夹名称、文件名称、磁盘名称，甚至浏览器窗口标题所使用的字体。
  - `menu`：菜单使用的字体，如文件夹菜单。
  - `message-box`：消息盒里面使用的字体。
  - `small-caption`：调色板标题所使用的字体。
  - `status-bar`：窗体状态栏使用的字体。

  注意：使用关键字作为属性值的时候必须是独立的，不能添加 `font-family` 或者 `font-size` 之类的。如果混用，例如：`.menu { font: menu; }` 则此时的 menu 是作为自定义的字体名称存在的，而不是表示系统的 menu 菜单字体。

## @font face 规则

`@font face` 的本质是变量，是一个定义字体或字体集的变量，这个变量不仅仅是自定义字体，还包括字体重命名、默认字体样式设置等。

`@font face` 规则支持的CSS 属性有 `font-family`、`src`、`font-style`、`font-weigh`、`unicode-range`、`font-variant`、`font-stretch` 和 `font-feature-settings`。

```css
@font-face {
  font-family: 'example';
  src: url(example.ttf);
  font-style: normal;
  font-weight: normal;
  unicode-range: U+0025-00FF;
  font-variant: small-caps;
  font-stretch: expanded;
  font-feature-settings："liga1" on;
}
```
