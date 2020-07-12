# 移动端适配

## 基础概念

+ 屏幕尺寸：以屏幕对角线的长度来计量，计量单位为英寸。
+ 屏幕密度：指一个设备表面上存在的像素数量，它通常以每英寸有多少像素来计算(PPI)。
+ 分辨率：指纵横向上的像素点数，单位是 px。
+ 物理像素(physical pixel, 又称设备像素)：显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。
+ 设备独立像素(density-independent pixel, 又称密度无关像素)：可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素)，然后由相关系统转换为物理像素。
+ CSS像素(device-independent pixel, 与设备无关的像素, DIPs)：一个抽像的单位，主要使用在浏览器上，用来精确度量Web页面上的内容。
+ 设备像素比(device pixel ratio, dpr)：定义了物理像素和设备独立像素的关系。**设备像素比 = 物理像素 / 设备独立像素**。
+ 视窗(viewport)：简单的理解，viewport是严格等于浏览器的窗口。
  + 在桌面浏览器中，viewport就是浏览器窗口的宽度高度。
  + 在移动端设备上，提供了两个viewport: 虚拟的 viewportvisualviewport 和布局的 viewportlayoutviewport。可参考：[viewports剖析](https://www.w3cplus.com/css/viewports.html)

## 适配

### 设置 `meta` 标签

`<meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no;">`

| 属性          | 含义                                                | 取值                          |
| :------------ | :-------------------------------------------------- | :---------------------------- |
| width         | 定义视口的宽度，单位为像素                          | 正整数或设备宽度device-width  |
| height        | 定义视口的高度，单位为像素                          | 正整数或设备高度device-height |
| initial-scale | 定义初始缩放值                                      | 整数或小数                    |
| minimum-scale | 定义缩小最小比例，它必须小于或等于maximum-scale设置 | 整数或小数                    |
| maximum-scale | 定义放大最大比例，它必须大于或等于minimum-scale设置 | 整数或小数                    |
| user-scalable | 定义是否允许用户手动缩放页面，默认值yes             | yes / no                      |

移动端视口要想视觉效果和体验好，视口宽度必须无限接近理想视口。

理想视口：**一般来讲，这个视口其实不是真是存在的，它对设备来说是一个最理想布局视口尺寸，在用户不进行手动缩放的情况下，可以将页面理想地展示。那么所谓的理想宽度就是浏览器（屏幕）的宽度了。其中 `user-scalable` 设置为 `no` 可以解决移动端点击事件延迟问题**

### rem适配

`px`、`em`、`rem`的区别

+ `px`：相对长度单位。像素px是相对于显示器屏幕分辨率而言的。
+ `em`：相对长度单位。相对于当前对象内文本的字体尺寸。
  + `em` 会继承父级元素的字体大小。
  + 如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。任意浏览器的默认字体高都是`16px`。所有未经调整的浏览器都符合: `1em=16px`。
+ `rem`：相对长度单位。是相对于 `html` 节点的 `font-size` 来做计算的

``` javascript
/**
 * @description 适配rem
 * @param _client 效果图的宽度
 */
getFontSize(_client) {
  let doc = document,
    win = window;
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    countSize = function () {
      let clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
      if (clientWidth > _client) {
        clientWidth = _client
      }
      //设置根元素font-size大小
      docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
    };
  //屏幕大小改变，或者横竖屏切换时，触发函数
  win.addEventListener(resizeEvt, countSize, false);
  //文档加载完成时，触发函数
  doc.addEventListener('DOMContentLoaded', countSize, false);
}
```

### vw, vh布局

`vw`、`vh` 方案即将视觉视口宽度 `window.innerWidth` 和视觉视口高度 `window.innerHeight` 等分为 100 份。

`vh` 和 `vw` 方案需要做单位转化，而且 `px` 转换成 `vw` 不一定能完全整除，因此有一定的像素差。可以在 webpack 解析 css 的时候用 `postcss-loader`，有个 `postcss-px-to-viewport` 能自动实现 `px` 到 `vw` 的转化。

``` javascript
{
  loader: 'postcss-loader',
  options: {
    plugins: () => [
      require('autoprefixer')({
        browsers: ['last 5 versions']
      }),
      require('postcss-px-to-viewport')({
        viewportWidth: 375, // 视口宽度（数字)
        viewportHeight: 1334, // 视口高度（数字）
        unitPrecision: 3, // 设置的保留小数位数（数字）
        viewportUnit: 'vw', // 设置要转换的单位（字符串）
        selectorBlackList: ['.ignore', '.hairlines'], // 不需要进行转换的类名（数组）
        minPixelValue: 1, // 设置要替换的最小像素值（数字）
        mediaQuery: false // 允许在媒体查询中转换px（true/false）
      })
    ]
}
```

### 从用户需求出发适配

手机屏幕大，不是为了看到更大的字，而是为了看到更多的内容，所以可以以 `px` 为主，`vx` 和 `vxxx(vw/vh/vmax/vmin)` 为辅，搭配一些 `flex`

## 1px边框问题及解决方案

CSS 中 `1px` 为 CSS像素，导致 CSS像素 根据 设备像素比(dpr) 映射到设备上就为 `2px`, 或者 `3px`。由于每个设备的屏幕尺寸不一致，导致每个物理像素渲染出来的大小也不用。所以在尺寸比较大的设备，`1px` 渲染出来会比较粗。

+ 在 web 中，浏览器提供了 `window.devicePixelRatio` 来获取 `dpr`。
+ 在 css 中，可以使用媒体查询 `min-device-pixel-ratio`，区分 `dpr`。

### 伪类 + transform

原理：把元素的 `border` 去掉，然后利用 `:before` 或者 `:after` 重做 `border`，并 `transform` 的 `scale` 缩小一半，元素相对定位，新做的 `border` 绝对定位。

+ 优点：所有场景都能满足，支持圆角(**伪类和本体类都需要加 `border-radius`**)。
+ 缺点：代码量大，对于已经使用伪类的元素(例如：`clearfix`)，可能需要多层嵌套。

注意：需要注意 `<input type="button">` 是没有 `:before`, `:after`伪元素的。

扩展：CSS 最新的规范中正在计划通过标准的属性实现一像素边框，通过给 `border-width` 属性添加 `hairline` 关键字属性来实现

``` less
.hairline-common () {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
}

.hairline-line (@border-color: #f2f2f2) {
  .hairline-common();
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid @border-color;
  transform: scale(0.5);
}

// 1px边框 - 全边框
.hairline-surround (@border-color:#f2f2f2, @border-radius:0px) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-width: 1px;
    border-radius: @border-radius;
  }
}

// 1px边框 - 上边框
.hairline-top (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-top-width: 1px;
  }
}

// 1px边框 - 下边框
.hairline-bottom (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-bottom-width: 1px;
  }
}

// 1px边框 - 上下边框
.hairline-top-bottom (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-width: 1px 0;
  }
}

// 1px边框 - 左边框
.hairline-left (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-left-width: 1px;
  }
}

// 1px边框 - 右边框
.hairline-right (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-right-width: 1px;
  }
}

// 1px边框 - 左右边框
.hairline-left-right (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-width: 0 1px;
  }
}

// 1px边框 - 取消
.hairline-none () {
  &::before {
    display: none;
  }
}
```

### viewport + rem

同时通过设置对应 `viewport` 的 `rem` 基准值。

+ 在 `devicePixelRatio=2` 时，设置 `meta`：
  
  `<meta name="viewport" content="width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">`
+ 在 `devicePixelRatio=3` 时，设置 `meta`：

  `<meta name="viewport" content="width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">`

+ 优点：所有场景都能满足，一套代码，可以兼容基本所有布局。
+ 缺点：老项目修改代价过大，只适用于新项目。

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>移动端1px问题</title>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
  <meta name="viewport" id="WebViewport" content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
  <style>
    * { padding: 0; margin: 0; }
    html { font-size: 11px; }
    body { padding: 1rem; }
    .item {
      padding: 1rem;
      border-bottom: 1px solid gray;
      font-size: 1.2rem;
    }
  </style>
  <script>
    var viewport = document.querySelector("meta[name=viewport]");
    var dpr = window.devicePixelRatio || 1;
    var scale = 1 / dpr;
    //下面是根据设备dpr设置viewport
    viewport.setAttribute(`content`, `width=device-width,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`);
    var docEl = document.documentElement;
    var fontsize = 10 * (docEl.clientWidth / 320) + "px";
    docEl.style.fontSize = fontsize;
  </script>
</head>
<body>
  <div class="item">border-bottom: 1px solid gray;</div>
  <div class="item">border-bottom: 1px solid gray;</div>
</body>
</html>
```

### postcss-write-svg

借助于 `PostCSS` 的插件 `postcss-write-svg` 实现

``` scss
@svg 1px-border {
    height: 2px;
    @rect {
      fill: var(--color, black);
      width: 100%;
      height: 50%;
    }
}

.example {
    border: 1px solid transparent;
    border-image: svg(1px-border param(--color #00b1ff)) 2 2 stretch;
 }
```

`PostCSS` 会自动把 `CSS` 编译出来为：

``` css
.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch;
  }
```

### 1px图片边框

+ 优点：可以设置单条,多条边框，没有性能瓶颈的问题
+ 缺点：修改颜色麻烦, 需要替换图片；圆角需要特殊处理，并且边缘会模糊

### 0.5px方案

在 `IOS8+`，苹果系列都已经支持 `0.5px` 了，可以借助媒体查询来处理。

``` css
.border { border: 1px solid #999 }
@media screen and (-webkit-min-device-pixel-ratio: 2) {
    .border { border: 0.5px solid #999 }
}
/*ios dpr=2和dpr=3情况下border相差无几，下面代码可以省略*/
@media screen and (-webkit-min-device-pixel-ratio: 3) {
    .border { border: 0.333333px solid #999 }
}
```

`IOS7` 及以下和 `Android` 等其他系统里，**0.5px将会被显示为0px**。解决方案是通过 JavaScript 检测浏览器能否处理 `0.5px` 的边框，如果可以，给 `html` 标签元素添加个`class`。

``` javascript
if (window.devicePixelRatio && devicePixelRatio >= 2) {
  var testElem = document.createElement('div');
  testElem.style.border = '.5px solid transparent';
  document.body.appendChild(testElem);
}
if (testElem.offsetHeight == 1) {
  document.querySelector('html').classList.add('hairlines');
}
  document.body.removeChild(testElem);
}
// 脚本应该放在body内，如果在里面运行，需要包装 $(document).ready(function() {})
```

``` css
div { border: 1px solid #bbb; }
.hairlines div { border-width: 0.5px; }
```

+ 优点：简单，不需要过多代码。
+ 缺点：无法兼容安卓设备、 `IOS7`及以下设备。

参考

+ [一篇搞定移动端适配](https://mp.weixin.qq.com/s/JJTa1DxYrn4gjA8Y0BuFAQ)
+ [6种移动端1px解决方案（完整版）](https://mp.weixin.qq.com/s/0eHZPNmt8UyaxSzMNjhS9w)
