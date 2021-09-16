---
category: CSS基础
tags:
  - CSS
---

# float / clear

## float 的本质与特征

`float` 的本质是为了**实现文字环绕效果**。主要指文字环绕图片的效果。

`float` 的特征:

+ 包裹性：由 “包裹” 和 “自适应性” 两部分组成
  + 包裹

    假设 `float` 元素的父元素宽度为 200px，`float` 元素的子元素为 `width: 100px` 的图片，则此时 `float` 元素宽度表现为 “包裹”，宽度为 100px 。

    ::: demo [vue]

    ```vue
    <template>
      <!-- 外层包裹元素，防止影响其他元素 -->
      <div class="float-wrapper-parcel">
        <div class="float-element-father">
          <div class="float-element">
            <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
          </div>
        </div>
      </div>
      <!-- 清楚外层包裹元素浮动 -->
      <div style="clear: both;"></div>
    </template>

    <script>
      export default {};
    </script>

    <style>
    .float-wrapper-parcel {
      width: 200px;
    }

    .float-wrapper-parcel .float-element-father .float-element {
      float: left;
      background-color: #ff8228;
    }

    .float-wrapper-parcel .float-element-father .float-element .vuepress-img {
      width: 100px;
      background-color: #3eaf7c;
    }
    </style>
    ```

    :::

  + 自适应性

    假设 `float` 元素的父元素宽度为 200px，`float` 元素的子元素包括图片和文字，则此时 `float` 元素宽度自适应父元素的宽度 200px 。

    如果需要最大宽度自适应 `float` 元素的父元素宽度，则 `float` 元素宽度的 “首选最小宽度” 比父元素宽度小的前提下。

    【注】首选最小宽度是指元素最合适的最小宽度。CSS 中，图片和文字的权重远大于布局，当 `width: 0` ，此时所表现的宽度就是 “首选最小宽度” 。具体表现规则如下：

    + 东亚文字（如中文）最小宽度为每个汉字的宽度
    + 西方文字最小宽度由特定的连续的英文字符单元决定
    + 类似图片等的替换元素的最小宽度就是该元素内容本身的宽度

    ::: demo [vue]

    ```vue
    <template>
      <!-- 外层包裹元素，防止影响其他元素 -->
      <div class="float-wrapper-adaptive">
        <div class="float-element-father">
          <div class="float-element">
            <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />示例文本01示例文本01示例文本01示例文本01示例文本01
          </div>
        </div>
      </div>
      <!-- 清楚外层包裹元素浮动 -->
      <div style="clear: both;"></div>
    </template>

    <script>
      export default {};
    </script>

    <style>
    .float-wrapper-adaptive {
      width: 200px;
    }

    .float-wrapper-adaptive .float-element-father .float-element {
      float: left;
      background-color: #ff8228;
    }

    .float-wrapper-adaptive .float-element-father .float-element .vuepress-img {
      width: 100px;
      background-color: #3eaf7c;
    }
    </style>
    ```

    :::

+ 块状化并格式化上下文

  元素设置 `float` 属性值不为 `none`，则其 `display` 计算值为 `block / table` 。则：

  + `text-align` 属性无法控制 `float` 元素的左右对齐，`text-align` 对块级元素无效
  + `display: block; float: left;` 组合中，`display: block` 是多余的
  + `float: left; vertical-align: middle;` 组合中，`vertical-align: middle;` 是多余的。
  
  【注】 `vertical-align` 属性定义**行内元素**的基线相对于该元素所在行的基线的垂直对齐。

+ 破坏文档流
+ 没有任何 `margin` 合并

## float 的作用机制

`float` 属性的特征表现 **会让父元素的高度塌陷** （`float` 元素高度塌陷不是 Bug，是标准）。其主要原因是为了实现文字环绕效果。

**【实现环绕效果的条件】**

+ **“高度塌陷”** ：跟随在 `float` 元素的内容和 `float` 元素在一个水平线上。
+ **“行框盒子和浮动元素的不可重叠行”** ：行框盒子如果和 `float` 元素的垂直高度有重叠，则行框盒子在正常定位状态下只会跟随浮动元素，而不会发生重叠。（注：此处行框盒子为每行内联元素所在的盒子，而非外部块状的盒子）

【注】 块状盒子中的 “行框盒子” 会被 `float` 元素限制，没有任何重叠。“行框盒子” 区域被限制，只要不改变当前布局方式，则无法通过其他 CSS 属性改变该区域大小。同时，也是 `float` 元素后面的元素  `margin` 负无穷无效的原因。

::: demo [vue]

```vue
<template>
  <!-- 外层包裹元素，防止影响其他元素 -->
  <div class="float-wrapper-mechanism">
    <div class="float-element-father">
      <div class="float-element">
        <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
      </div>
      <p class="float-after-inline-box">示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01</p>
    </div>
    <div class="float-element-father-brother">
      <div class="float-element">
        <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
      </div>
      <p class="float-after-inline-box">示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01示例文本01</p>
    </div>
  </div>
  <!-- 清楚外层包裹元素浮动 -->
  <div style="clear: both;"></div>
</template>

<script>
  export default {};
</script>

<style>
.float-wrapper-mechanism {
  width: 200px;
  margin-left: 100px;
}

.float-wrapper-mechanism .float-element-father .float-element {
  float: left;
  background-color: #ff8228;
  opacity: 0.5;
}

.float-wrapper-mechanism .float-element-father .float-element .vuepress-img {
  width: 100px;
  background-color: #3eaf7c;
  opacity: 0.5;
}

.float-wrapper-mechanism .float-element-father .float-after-inline-box {
  margin: 0;
  padding: 0;
  background-color: #9aa9b2;
}

.float-wrapper-mechanism .float-element-father-brother {
  margin-top: 10px;
}

.float-wrapper-mechanism .float-element-father-brother .float-element {
  float: left;
  background-color: #ff8228;
  opacity: 0.5;
}

.float-wrapper-mechanism .float-element-father-brother .float-element .vuepress-img {
  width: 100px;
  background-color: #3eaf7c;
  opacity: 0.5;
}

.float-wrapper-mechanism .float-element-father-brother .float-after-inline-box {
  margin: 0;
  margin-left: -100px;
  padding: 0;
  background-color: #9aa9b2;
}
</style>
```

:::

**【相关问题】** 设置跟随在 `float` 元素之后元素的具体高度，可以解决高度坍塌的问题，但是对于 “行框盒子” 区域被限制，则没有效果。结果会导致，`float` 元素垂直区域一旦超过高度范围，或者下面的元素 `margin-top` 设置负值向上偏移，后面的元素也会发生 “环绕效果” 。

假设 `float` 元素的父元素宽度为 200px，`float` 元素的子元素包括图片和文字。`float` 元素下方的文字会发生 “环绕效果” 。

**【解析】** 内联状态下图片元素底部是有间隙的，`float` 元素实际高度并不为 100px，实际会大于 100px，`float` 元素下方的文字会发生 “环绕效果” 为原有导致。

::: demo [vue]

```vue
<template>
  <!-- 外层包裹元素，防止影响其他元素 -->
  <div class="float-wrapper-question">
    <div class="float-element-father">
      <div class="float-element">
        <img class="vuepress-img" src="https://vuepress.vuejs.org/hero.png" />
      </div>
      示例文本01示例文本01示例文本01示例文本01
    </div>
    <div>示例文本02示例文本02示例文本02</div>
  </div>
  <!-- 清楚外层包裹元素浮动 -->
  <div style="clear: both;"></div>
</template>

<script>
  export default {};
</script>

<style>
.float-wrapper-question {
  width: 200px;
}

.float-wrapper-question .float-element-father {
  height: 100px;
  border: 1px solid #db5860;
}

.float-wrapper-question .float-element-father .float-element {
  float: left;
  background-color: #ff8228;
  opacity: 0.5;
}

.float-wrapper-question .float-element-father .float-element .vuepress-img {
  width: 100px;
  height: 100px;
  background-color: #3eaf7c;
  opacity: 0.5;
}
</style>
```

:::

【float 相关术语】

+ **浮动锚点（float anchor）**：是指 `float` 元素所在的 “流” 中的一个点，这个点本身并不浮动，就表现而言更像一个没有 `margin`、`border` 和 `padding` 的空的内联元素。
+ **浮动参考（float reference）**：是指 `float` 元素对齐参考的实体。在 CSS 中，`float` 元素的 “浮动参考” 是 “行框盒子”，也就是 `float` 元素在当前 “行框盒子” 内定位，对于块状元素同样适用。

【场景】 假设需要在标题之后添加一个 “更多”  的文本链接，如果标题超过了一行内容，会如示例显示。

【原因】 每一行内联元素都有一个 “行框盒子” ，示例中标题文字较多，分两行显示，因此有上下两个 “行框盒子”，而 “更多” 所在的 `<a>` 元素是在标题文字后面，位于第二行，因此，设置 `float:right` 的 `<a>` 元素是相对于第二行的 “行框盒子” 对齐的。

::: demo [vue]

```vue
<template>
  <!-- 外层包裹元素，防止影响其他元素 -->
  <div class="float-wrapper-anchor-referenc">
    <div class="float-element-father">
      <div class="float-element">
        标题文本01标题文本01标题文本01标题文本01
        <a heft="#" class="float-element-anchor">更多</a>
      </div>
    </div>
  </div>
  <!-- 清楚外层包裹元素浮动 -->
  <div style="clear: both;"></div>
</template>

<script>
  export default {};
</script>

<style>
.float-wrapper-anchor-referenc {
  width: 200px;
}

.float-wrapper-anchor-referenc .float-element-father {
  border: 1px solid #db5860;
}

.float-wrapper-anchor-referenc .float-element-father .float-element .float-element-anchor {
  float: right;
  /* background-color: #ff8228; */
}

.float-wrapper-anchor-referenc .float-element-father .float-element .float-element-anchor {
  font-weight: bold;
  color: #3eaf7c;
}
</style>
```

:::

## float 布局示例

::: demo [vue]

```vue
<template>
  <!-- 外层包裹元素，防止影响其他元素 -->
  <div class="float-wrapper-layout-one">
    <div class="float-element-father">
      <img class="float-element-img" src="https://vuepress.vuejs.org/hero.png" />
      <p class="float-element-img-desc">示例文本02示例文本02示例文本02示例文本02示例文本02</p>
    </div>
  </div>
  <!-- 清楚外层包裹元素浮动 -->
  <div style="clear: both;"></div>
</template>

<script>
  export default {};
</script>

<style>
.float-wrapper-layout-one {
  width: 200px;
}

.float-wrapper-layout-one .float-element-father {
  border: 1px solid #db5860;
  overfloat: hidden;
}

.float-wrapper-layout-one .float-element-father .float-element-img {
  width: 100px;
  height: 100px;
  float: left;
}

.float-wrapper-layout-one .float-element-father .float-element-img-desc {
  margin: 0;
  padding: 0;
  margin-left: 110px;
  font-weight: bold;
  color: #3eaf7c;
}
</style>
```

:::

::: demo [vue]

```vue
<template>
  <!-- 外层包裹元素，防止影响其他元素 -->
  <div class="float-wrapper-layout-two">
    <div class="float-element-father">
      <a href class="float-element-prev">&laquo; 上一章</a>
      <a href class="float-element-next">下一章 &raquo;</a>
      <span class="float-element-title">标题文本</span>
    </div>
  </div>
  <!-- 清楚外层包裹元素浮动 -->
  <div style="clear: both;"></div>
</template>

<script>
  export default {};
</script>

<style>
.float-wrapper-layout-two {
  width: 300px;
}

.float-wrapper-layout-two .float-element-father {
  border: 1px solid #db5860;
  overfloat: hidden;
}

.float-wrapper-layout-two .float-element-father .float-element-prev {
  float: left;
}

.float-wrapper-layout-two .float-element-father .float-element-next {
  float: right;
}

.float-wrapper-layout-two .float-element-father .float-element-title {
  margin: 0 50px;
  text-align: center;
  font-weight: bold;
}
</style>
```

:::

## clear

`clear` 属性规定元素的哪一侧不允许其他浮动元素。可用来处理 `float` 属性带来的高度塌陷等问题的属性。

+ `none` ： 默认值。允许浮动元素出现在两侧。
+ `left` ： 在左侧不允许浮动元素。
+ `right` ： 在右侧不允许浮动元素。
+ `both` ： 在左右两侧均不允许浮动元素。

`clear` 属性只有**块级元素**才有效的，而 `::after` 等伪元素默认都是内联水平，这就是借助伪元素清除浮动影响时，需要设置`display` 属性值的原因。

`clear: both` 的作用本质是让设置 `clear` 属性的元素不和 `float` 元素在一行显示，并不是真正意义上的清除浮动，因此float 元素一些不好的特性依然存在，会有类似下面的现象：

+ 如果 `clear: both` 元素前面的元素为 `float` 元素，设置 `margin-top` 为负值是无效的。
+ `clear: both` 后面的元素依旧可能会发生文字环绕的现象。只能在一定程度上消除浮动的影响。
