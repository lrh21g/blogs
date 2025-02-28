# 1px边框问题及解决方案

CSS 中 `1px` 为 CSS像素，导致 CSS像素 根据 设备像素比(dpr) 映射到设备上就为 `2px`, 或者 `3px`。由于每个设备的屏幕尺寸不一致，导致每个物理像素渲染出来的大小也不用。所以在尺寸比较大的设备，`1px` 渲染出来会比较粗。

- 在 web 中，浏览器提供了 `window.devicePixelRatio` 来获取 `dpr`。
- 在 css 中，可以使用媒体查询 `min-device-pixel-ratio`，区分 `dpr`。

## 伪类 + transform

原理：把元素的 `border` 去掉，然后利用 `:before` 或者 `:after` 重做 `border`，并 `transform` 的 `scale` 缩小一半，元素相对定位，新做的 `border` 绝对定位。

- 优点：所有场景都能满足，支持圆角(**伪类和本体类都需要加 `border-radius`**)。
- 缺点：代码量大，对于已经使用伪类的元素(例如：`clearfix`)，可能需要多层嵌套。

注意：需要注意 `<input type="button">` 是没有 `:before`, `:after`伪元素的。

扩展：CSS 最新的规范中正在计划通过标准的属性实现一像素边框，通过给 `border-width` 属性添加 `hairline` 关键字属性来实现

```less
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

## viewport + rem

同时通过设置对应 `viewport` 的 `rem` 基准值。

- 在 `devicePixelRatio=2` 时，设置 `meta`：

  `<meta name="viewport" content="width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">`

- 在 `devicePixelRatio=3` 时，设置 `meta`：

  `<meta name="viewport" content="width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no">`

- 优点：所有场景都能满足，一套代码，可以兼容基本所有布局。
- 缺点：老项目修改代价过大，只适用于新项目。

```html
<!doctype html>
<html lang="en">
  <head>
    <title>移动端1px问题</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta
      name="viewport"
      id="WebViewport"
      content="width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
    />
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      html {
        font-size: 11px;
      }
      body {
        padding: 1rem;
      }
      .item {
        padding: 1rem;
        border-bottom: 1px solid gray;
        font-size: 1.2rem;
      }
    </style>
    <script>
      var viewport = document.querySelector('meta[name=viewport]')
      var dpr = window.devicePixelRatio || 1
      var scale = 1 / dpr
      //下面是根据设备dpr设置viewport
      viewport.setAttribute(
        `content`,
        `width=device-width,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale},user-scalable=no`,
      )
      var docEl = document.documentElement
      var fontsize = 10 * (docEl.clientWidth / 320) + 'px'
      docEl.style.fontSize = fontsize
    </script>
  </head>
  <body>
    <div class="item">border-bottom: 1px solid gray;</div>
    <div class="item">border-bottom: 1px solid gray;</div>
  </body>
</html>
```

## postcss-write-svg

借助于 `PostCSS` 的插件 `postcss-write-svg` 实现

```scss
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

```css
.example {
    border: 1px solid transparent;
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' height='2px'%3E%3Crect fill='%2300b1ff' width='100%25' height='50%25'/%3E%3C/svg%3E") 2 2 stretch;
  }
```

## 1px图片边框

- 优点：可以设置单条,多条边框，没有性能瓶颈的问题
- 缺点：修改颜色麻烦, 需要替换图片；圆角需要特殊处理，并且边缘会模糊

## 0.5px方案

在 `IOS8+`，苹果系列都已经支持 `0.5px` 了，可以借助媒体查询来处理。

```css
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

```javascript
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

```css
div { border: 1px solid #bbb; }
.hairlines div { border-width: 0.5px; }
```

- 优点：简单，不需要过多代码。
- 缺点：无法兼容安卓设备、 `IOS7`及以下设备。

参考

- [6种移动端1px解决方案（完整版）](https://mp.weixin.qq.com/s/0eHZPNmt8UyaxSzMNjhS9w)
