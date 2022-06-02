# CSS实现长宽比

## 垂直方向的 padding

原理：利用 `padding-top` 或者 `padding-bottom` 的百分比值。在 CSS 中，`padding-top` 或者 `padding-bottom` 的百分比是根据容器的 `width` 来计算的。

【注意】 需要把容器的 `height: 0` ，容器内容中所有的元素需要采用 `position: absolute` ，不然子元素内容会被 `padding` 挤出容器，造成内容溢出。

::: vue-demo

```vue
<template>
  <div class="aspectration-wrapper-padding">
    <div class="aspectration-container-padding" data-ratio="16:9">
      <div class="aspectration-content-padding">16 : 9</div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .aspectration-wrapper-padding {
    width: 100%;
  }
  
  .aspectration-container-padding {
    position: relative; /* 容器所有子元素需要绝对定位 */
    height: 0; /* 容器高度是由 padding 来控制 */
    width: 100%; 
    background-color: #3eaf7c;
  }

  .aspectration-container-padding[data-ratio="16:9"] {
    padding-top: 56.25%;
  }

  .aspectration-container-padding[data-ratio="4:3"]{
    padding-top: 75%;
  }

  .aspectration-container-padding > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .aspectration-content-padding {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }
</style>
```

:::

## padding + calc()

原理：利用 `padding-top` 或者 `padding-bottom` 的百分比值。在 CSS 中，`padding-top` 或者 `padding-bottom` 的百分比是根据容器的 `width` 来计算的，可以使用 `calc()` 计算 `padding` 的百分比值。

::: vue-demo

```vue
<template>
  <div class="aspectration-wrapper-padding-calc">
    <div class="aspectration-container-padding-calc" data-ratio="16:9">
      <div class="aspectration-content-padding-calc">16 : 9</div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .aspectration-wrapper-padding-calc {
    width: 100%;
  }
  
  .aspectration-container-padding-calc {
    position: relative; /* 容器所有子元素需要绝对定位 */
    height: 0; /* 容器高度是由 padding 来控制 */
    width: 100%; 
    background-color: #3eaf7c;
  }

  .aspectration-container-padding-calc[data-ratio="16:9"] {
    padding-top: calc(100% * 9 / 16);
  }

  .aspectration-container-padding-calc[data-ratio="4:3"]{
    padding-top: calc(100% * 4 / 3);
  }

  .aspectration-container-padding-calc > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .aspectration-content-padding-calc {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }
</style>
```

:::

## padding + CSS变量

原理：利用 `padding-top` 或者 `padding-bottom` 的百分比值。在 CSS 中，`padding-top` 或者 `padding-bottom` 的百分比是根据容器的 `width` 来计算的。可通过 CSS变量 和 `calc()`函数 计算 `padding` 的值。

::: vue-demo

```vue
<template>
  <div class="aspectration-wrapper-padding-cssvar">
    <!-- 此处CSS编译，calc(100% / (var(--aspect-ratio))) 存在问题 -->
    <div class="aspectration-container-padding-cssvar" style="--aspect-ratio:16/9">
      <div class="aspectration-content-padding-cssvar">16 : 9</div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .aspectration-wrapper-padding-cssvar {
    width: 100%;
  }
  
  .aspectration-container-padding-cssvar {
    position: relative; /* 容器所有子元素需要绝对定位 */
    height: 0; /* 容器高度是由 padding 来控制 */
    width: 100%; 
    background-color: #3eaf7c;
  }

  .aspectration-container-padding-cssvar[style*="--aspect-ratio"] {
    padding-top: calc(100% / (var(--aspect-ratio)));
  }

  .aspectration-container-padding-cssvar > * {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .aspectration-content-padding-cssvar {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }
</style>
```

:::

## padding + 伪元素

原理：利用 `padding-top` 或者 `padding-bottom` 的百分比值。在 CSS 中，`padding-top` 或者 `padding-bottom` 的百分比是根据容器的 `width` 来计算的。

::: vue-demo

```vue
<template>
  <div class="aspectration-wrapper-padding-after">
    <div class="aspectration-container-padding-after" data-ratio="16:9">
      <div class="aspectration-content-padding-after">16 : 9</div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .aspectration-wrapper-padding-after {
    width: 100%;
  }
  
  .aspectration-container-padding-after {
    position: relative; /* 容器所有子元素需要绝对定位 */
    background-color: #3eaf7c;
  }

  .aspectration-container-padding-after:after {
    content: "";
    display: block;
    width: 1px;
    margin-left: -1px;
    background-color: orange;
  }

  .aspectration-container-padding-after[data-ratio="16:9"]:after {
    padding-top: 56.25%;
  }

  .aspectration-content-padding-after {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
  }
</style>
```

:::

## 视窗单位（vw、vh）

``` css
.aspectration[data-ratio="16:9"] {
  width: 100vw;
  height: 56.25vw;
}
```

## 视窗单位 + CSS Grid

原理：将容器 `.aspectration` 通过 `display: grid` 声明为一个网格容器，并且利用 `repeat()` 将容器划分为横向比例，比如 `16:9`，那么每一格的宽度对应的就是 `100vw * 9 / 16 = 6.25vw` 。同样使用 `grid-auto-rows` 将其设置的值和横向的值一样。在子元素上通过 `grid-column` 和 `grid-row` 按比例合并单元格。

``` css
.aspectration {
  display: grid;
  grid-template-columns: repeat(16, 6.25vw);
  grid-auto-rows: 6.25vw;
}

.aspectration[data-ratio="16:9"] .content {
  grid-column: span 16;
  grid-row: span 9;
}
```

## aspect-ratio

`aspect-ratio` 定义输出设备中的页面可见区域宽度与高度的比率。

设置容器CSS样式为 `width: auto; height: auto; aspect-ratio: 2/1; max-height: 200px;` 。

+ 设置容器属性 `width: 500px` 时，元素首先会设置 `width: 500px;` ，根据 `aspect-ratio: 2/1;` 比例 `height: 250px` ，此时违反了 `max-height` 约束，容器大小将被设置为 `height: 200px; width: 400px`
+ 设置容器属性 `max-width: 450px;`，长宽比将会完全忽略，因为无法满足

::: vue-demo

```vue
<template>
  <div class="aspectration-wrapper-aspect-ratio aspectration-container-aspect-ratio">
    <p>width: auto;</p>
    <p>aspect-ratio: 16/9</p>
  </div>
  <div class="aspectration-wrapper-aspect-ratio aspectration-container-aspect-ratio-2-1-max-height-500px">
    <p>width: 500px; height: auto;</p>
    <p>aspect-ratio: 2/1</p>
    <p>max-height: 200px;</p>
    <p>【最终容器会被设置为如下大小】</p>
    <p>width: 400px; height: 200px;</p>
  </div>
  <div class="aspectration-wrapper-aspect-ratio aspectration-container-aspect-ratio-2-1-max-height-200px">
    <p>width: auto; height: auto;</p>
    <p>aspect-ratio: 2/1</p>
    <p>max-height: 450px;</p>
    <p>【最终长宽比会被忽略】</p>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  .aspectration-wrapper-aspect-ratio {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5px;
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    background-color: #3eaf7c;
  }
  .aspectration-wrapper-aspect-ratio > * {
    margin: 0;
    padding: 0;
  }
  .aspectration-container-aspect-ratio {
    width: 100%;
    aspect-ratio: 16/9;
  }
  .aspectration-container-aspect-ratio-2-1-max-height-500px {
    width: 500px;
    height: auto;
    aspect-ratio: 2/1;
    max-height: 200px;
  }
  .aspectration-container-aspect-ratio-2-1-max-height-200px {
    width: auto;
    height: auto;
    aspect-ratio: 2/1;
    max-height: 450px;
  }
</style>
```

:::

## 参考

+ [CSS实现长宽比的几种方案](https://www.w3cplus.com/css/aspect-ratio.html)
