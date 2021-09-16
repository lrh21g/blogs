# CSS命名规范 - BEM

## BEM

`BEM`表示`block`（块）、`element`（元素）、`modifier`（修饰符）。

``` css
.block { /* styles */ }
.block__element { /* styles */ }
.block--modifier { /* styles */ }
```

### block（块）

一个块是某一个区域或者某一部分，可以是语义上的，也可以是视觉上的。在大多数情况下，独立于页面的元素都可以被视为一个块。在HTML中，会有唯一的 CSS 类名，也就是这个块的名字。

通常，用 `-` （中划线）连接某个块或者某个子元素的多个单词之间的链接记号。

一个块的正式（实际上是半正式的）定义有下面三个基本原则：

+ CSS 中只能使用类名（不能是ID）
+ 每一个块名应该有一个命名空间（前缀）
+ 每一条 CSS 规则必须属于一个块

例如，一个列表。

``` html
<div class="block"></div>
<div class="block-list"></div>
```

### element（元素）

元素就是块中的子节点。**一个块中元素的类名必须用父级块的名称作为前缀**。

通常，用 `__` （双下划线）连接块和块的子元素。例如：

``` html
<div class="block">
  <div class="block__item"></div>
</div>
<div class="block-list">
  <div class="block-list__item"></div>
</div>
```

**永远不应该链式命名 BEM 元素**。有两种方法可以绕过长的 BEM 链式命名：

+ 只把子子元素连接到有意义的块
+ 创建新的块来保存元素

#### 只把子元素连接到有意义的块

``` html
<article class="article">
  <header class="article__header">
    <h1 class="article__title"></h1>
  </header>
</article>
<div class="block">
  <div class="block__header">
    <div class="block__title"></div>
  </div>
</div>
```

#### 创建新的块来保存元素

``` html
<div class="block">
  <h3 class="block__title"></h3>
  <ul class="block__list">
    <li class="block__item">
      <!-- 此处，如果将 .block__item 中的元素链接到 .block 是没有意义的 -->
      <!-- 同时，将 .block__list 和 .block__item 创建一个新的块也是没有意义的 -->
      <!-- 所以，可以创建一个 .item 的伪块（实际 .item 没有实际声明，是伪的），将 .block__item 中连接到 .item 元素中 -->
      <h3 class="item__title"></h3>
    </li>
    <!-- ... -->
  </ul>
</div>
```

### modifier（修饰符）

修饰符可以用来标识一个块所持有的特定的属性。

通常，用 `--` （双中划线）连接一个块或者块的子元素的一种状态。例如：

``` html
<div class="block">
  <h3 class="block__title"></h3>
  <ul class="block__list">
    <li class="block__item block__item--active">
      <h3 class="item__title"></h3>
    </li>
    <!-- ... -->
  </ul>
</div>
```

对于使用修饰符的样式，重复样式可以进行 CSS 样式的简化

+ 使用 mixin （scss）

``` scss
@mixin button {
  padding: 0.5em 0.75em;
}
.button {
  @include button;
  background-color: red;
}
.button--secondary {
  @include button;
  background-color: green;
}
```

+ 使用 CSS 属性选择器

``` css
[class*='button']:not([class*='button__']) {
  padding: 0.5em 0.75em;
}
```

## 命名空间

+ `.l-`：布局(layouts)
+ `.o-`: 对象(objects)
+ `.c-`: 组件(components)
+ `.js`: js的钩子(JavaScript hooks)
+ `.is-` | `.has-`: 状态类(state classes)
+ `.t1` | `.s1`: 排版大小(typography sizes)
+ `.u-`: 实用类(utility classes)

### `.l-`  布局(layouts)

布局分为两个不同的类别 —— **全局布局** 和 **块级布局**

+ 全局布局：应用于所有页面的布局。
  
  ``` html
  <div class="site-header">
    <div class="l-wrap">
      <!-- stuff -->
    </div>
  </div>
  <div class="site-footer">
    <div class="l-wrap">
      <!-- stuff -->
    </div>
  </div>
  ```

+ 块级布局：每一个块（对象或组件）可以能有自己的布局。

  ``` html
  <form class="form l-form" action="#">
    <div class="form__row">
      <div class="form__item l-form__item"></div>
      <div class="form__item l-form__item"></div>
    </div>
    <div class="form__row">
      <div class="form__item l-form__item--large"></div>
      <div class="form__item l-form__item--small"></div>
    </div>
    <!-- ... -->
  </form>
  ```

### `.o-` 对象(objects)

对象（`.o-`）是一个网站的最小的构建块。

对象物们都有着以下的属性：

+ 对象使用 `.o-` 前缀
+ 它们的里面不能包含其他对象或组件
+ 它们之于上下文是独立的，也意味着对象不应该更改外部任何结构。因此，对象块不能包含任何这些属性/值：
  + `absolute` 和 `fixed` 定位
  + `margin`
  + `padding` (除非使用了background-color。在这种情况下，它不会中断对象外部的对齐)
  + `float`
+ 某些对象可以在有意义的情况下忽略 `.o-` 前缀

``` html
<div class="o-countdown l-countdown jsCountdown">
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="days">3</span>
    <span>days</span>
  </div>
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="hours">20</span>
    <span>hours</span>
  </div>
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="minutes">57</span>
    <span>minutes</span>
  </div>
  <div class="o-countdown__inner l-countdown__inner">
    <span data-token="seconds">33</span>
    <span>seconds</span>
  </div>
</div>
```

### `.c-` 组件(components)

组件（`.c-`）是您可以在整个站点中使用的更大的构建块。

组件有着以下属性：

+ 组件使用 `.c-` 前缀
+ 组件可以包含其他对象和组件
+ 组件是上下文感知的

``` html
<form class="c-form--sidebar l-form--sidebar" action="#">
  <div class="c-form__row">
    <div class="c-form__item l-form__item">
      <label for="fname">
        <span>First Name</span>
        <input type="text" id="fname" name="fname">
      </label>
    </div>
  </div>
  <!-- ... the email input row -->
  <div class="c-form__row">
    <button class="o-button c-form__button">Buy Mastering Responsive Typography!</button>
  </div>
</form>
```

### `.js` js的钩子(JavaScript hooks)

Javascript 钩子（`.js`）表示对象/组件是否需要JavaScript。

``` html
<div class="o-countdown jsCountdown">
  <!-- ... -->
</div>
```

### `.is-` | `.has-` 状态类(state classes)

状态类表示对象/组件的当前状态。

``` html
<div class="o-countdown is-animating">
  <!-- ... -->
</div>
```

### `.t1` | `.s1` 排版大小(typography sizes)

排版类是对象的子集。应该像排列对象那样将相同的一套规则应用于排版类。不应该在排版类中添加margin或padding。而这些margin或padding应该直接添加到组件。

``` html
<nav>
  <a class="s1" href="#" >Link</a>
</nav>

<style lang="scss">
@mixin s1 {
  font-size: 14px;
  line-height: 1.25;
}
h1, nav a {
  @include s1;
}
</style>
```

### `.u-` 实用类(utility classes)

通常只包含一个属性，并且包含!important声明。

``` css
.u-text-left {
  text-align: left !important;
}
.u-text-center {
  text-align: center !important;
}
.u-text-right {
  text-align: right !important;
}
```

## CSS文件组织

``` md
- project/
    |- dist/ # 用于生产环境
    |- src/ # 所有的开发源代码
        |- js/
        |- scss/
            |- lib/
                |- _lib.scss # 声明了在项目中使用的库文件。例如：Normalize.css、Typi(排版相关的一个库)、Themify(项目中使用了一个主题的话)
            |- helpers/ # 项目中封装的 mixins 和 functions
            |- variables/ # 存储项目中使用的变量。例如：themes、colors、breakpoints
            |- base/ # 存除了Normalize.css之外的所有resets。例如：重置 margins、paddings和输入框、按钮等元素的样式
            |- layouts/ # 存放在整个项目中全局使用的布局样式
            |- objects/ # 存放编写的对象样式
            |- components/ # 存放编写的组件样式
            |- styles.scss # 列出变量、对象和组件的样式文件
            |- _utilities.scss # 存放编写的公用命名空间类。例如：.u-text-center
```

## 参考

+ [[规范] CSS BEM 书写规范](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-[%E8%A7%84%E8%8C%83]--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83)
+ [编写模块化CSS：BEM](https://www.w3cplus.com/css/css-architecture-1.html)
+ [编写模块化的CSS:命名空间](https://www.w3cplus.com/css/css-architecture-2.html)
+ [编写模块化的CSS:CSS文件组织结构](https://www.w3cplus.com/css/css-architecture-3.html)
