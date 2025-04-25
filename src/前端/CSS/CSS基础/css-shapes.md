---
category: CSS基础
tag:
  - CSS
---

# CSS Shapes

## 传统 CSS3 的方式绘制几何图形

::: normal-demo 传统 CSS3 的方式绘制几何图形

```html
<div class="shapes-container">
  <div class="shapes-box">
    <div class="triangle"></div>
    <div>三角形</div>
  </div>
  <div class="shapes-box">
    <div class="notching"></div>
    <div>切角</div>
  </div>
  <div class="shapes-box">
    <div class="trapezoid-use-pseudo-elements"></div>
    <div>梯形（使用伪元素）</div>
  </div>
  <div class="shapes-box">
    <div class="trapezoid-use-border"></div>
    <div>梯形（使用 border）</div>
  </div>
  <div class="shapes-box">
    <div class="pentagon"></div>
    <div>五边形</div>
  </div>
  <div class="shapes-box">
    <div class="hexagon"></div>
    <div>六边形</div>
  </div>
  <div class="shapes-box">
    <div class="octagon"></div>
    <div>八边形</div>
  </div>
  <div class="shapes-box">
    <div class="star"></div>
    <div>五角星</div>
  </div>
  <div class="shapes-box">
    <div class="six-star"></div>
    <div>六角星</div>
  </div>
  <div class="shapes-box">
    <div class="eight-star"></div>
    <div>八角星</div>
  </div>
  <div class="shapes-box">
    <div class="twelve-star"></div>
    <div>十二角星</div>
  </div>
  <div class="shapes-box">
    <div class="ellipse"></div>
    <div>椭圆</div>
  </div>
</div>
```

```css
.shapes-container {
  display: flex;
  flex-wrap: wrap;
}

.shapes-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

/* 三角形 */
/* 使用透明的 border 模拟出一个三角形 */
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid yellowgreen;
}

/* 切角 */
/* 采用多重线性渐变实现切角 */
.notching {
  width: 40px;
  height: 40px;
  padding: 40px;
  background:
    linear-gradient(135deg, transparent 15px, yellowgreen 0) top left,
    linear-gradient(-135deg, transparent 15px, yellowgreen 0) top right,
    linear-gradient(-45deg, transparent 15px, yellowgreen 0) bottom right,
    linear-gradient(45deg, transparent 15px, yellowgreen 0) bottom left;
  background-size: 50% 50%;
  background-repeat: no-repeat;
}

/* 梯形 */
/* 利用伪元素加旋转透视实现梯形 */
.trapezoid-use-pseudo-elements {
  position: relative;
  width: 60px;
  padding: 60px;
}

.trapezoid-use-pseudo-elements::before {
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: perspective(20px) scaleY(1.3) rotateX(5deg);
  transform-origin: bottom;
  background: yellowgreen;
}

/* 梯形 */
/* 利用 border 实现，借助上面的构造三角形的方法，在矩形两侧构造两个透明的三角形 */
.trapezoid-use-border {
  position: relative;
  width: 60px;
  border-top: 60px solid yellowgreen;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}

/* 五边形 */
/* 梯形加上三角形，很容易就组合成一个五边形，这里需要借助一个伪元素实现 */
.pentagon {
  position: relative;
  width: 60px;
  margin-bottom: 60px;
  border-bottom: 60px solid yellowgreen;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}

.pentagon::before {
  content: "";
  position: absolute;
  top: 60px;
  left: -40px;
  border-top: 60px solid yellowgreen;
  border-left: 70px solid transparent;
  border-right: 70px solid transparent;
}

/* 六边形 */
/* 通过两个同样的梯形叠加实现 */
.hexagon {
  position: relative;
  width: 60px;
  margin: 30px 30px 60px 0px;
  border-bottom: 60px solid yellowgreen;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}

.hexagon::before {
  content: "";
  position: absolute;
  width: 60px;
  height: 0px;
  top: 60px;
  left: -40px;
  border-top: 60px solid yellowgreen;
  border-left: 40px solid transparent;
  border-right: 40px solid transparent;
}

/* 八边形  */
/* 一个矩形加上两个梯形，可以合成一个八边形 */
.octagon {
  position: relative;
  width: 40px;
  height: 100px;
  background: yellowgreen;
}

.octagon::before {
  content: "";
  height: 60px;
  position: absolute;
  top: 0;
  left: 40px;
  border-left: 30px solid yellowgreen;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}

.octagon::after {
  content: "";
  height: 60px;
  position: absolute;
  top: 0;
  left: -30px;
  border-right: 30px solid yellowgreen;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}

/* 五角星 */
/* 使用 3 个三角形叠加旋转在一起实现 */
.star {
  margin: 30px 0;
  position: relative;
  width: 0;
  border-right: 100px solid transparent;
  border-bottom: 70px solid yellowgreen;
  border-left: 100px solid transparent;
  transform: rotate(35deg) scale(.6);
}

.star:before {
  content: '';
  position: absolute;
  border-bottom: 80px solid yellowgreen;
  border-left: 30px solid transparent;
  border-right: 30px solid transparent;
  top: -45px;
  left: -65px;
  transform: rotate(-35deg);
}

.star:after {
  content: '';
  position: absolute;
  top: 3px;
  left: -105px;
  border-right: 100px solid transparent;
  border-bottom: 70px solid yellowgreen;
  border-left: 100px solid transparent;
  transform: rotate(-70deg);
}

/* 六角星 */
/* 一个向上的三角形 ▲，叠加上一个向下的三角形 ▼，就可以得到一个六边形 */
.six-star {
  position: relative;
  width: 0;
  margin-bottom: 30px;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid yellowgreen;
}

.six-star:after {
  content: "";
  position: absolute;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 100px solid yellowgreen;
  top: 30px;
  left: -50px;
}

/* 八角星 */
/* 使用两个矩形进行旋转拼接 */
.eight-star {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 30px;
  background-color: yellowgreen;
  transform: rotate(30deg);
}

.eight-star::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  transform: rotate(45deg);
  background-color: yellowgreen;
}

/* 十二角星 */
/* 在八角星的基础上，再增加一个矩形，就能得到十二角啦。也就是要过第一个伪元素 */
.twelve-star {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 30px !important;
  background-color: yellowgreen;
  transform: rotate(30deg);
}

.twelve-star::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  transform: rotate(30deg);
  background-color: yellowgreen;
}

.twelve-star::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
  transform: rotate(60deg);
  background-color: yellowgreen;
}

/* 椭圆 */
/* 借助 border 实现 */
.ellipse {
  width: 120px;
  height: 160px;
  background-color: yellowgreen;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
}
```

:::

## CSS 形状函数

### circle 圆形

`circle(r at cx cy)` 定义了一个圆形。

- `r` 指圆的半径，它的值可以是 `<length-percentage>` 。如果取百分比值时，其值是从参考框的宽度和高度解析出来的；

  - `closest-side` ：从形状中心到参考框最近边的长度。对于圆来说，这是任何维度中最近的边；对于椭圆来说，这是半径维度中最近的边；
  - `farthest-side` ：从形状中心到参考框最远边的长度。对于圆来说，这是任何维度中最远的边；对于椭圆来说，这是半径维度中最远的边。

- `cx` 和 `cy` 指的是圆心位置，其中 `cx` 对应的圆心在 `x` 轴上的坐标位置，`cy` 对应的圆心在 `y` 轴上的坐标位置。如果省略，元素的中心(对角线的交点)将被用作默认值，元素的水平垂直中心点位置。

```css
.shape {
  /* 设置圆的半径为 50% */
  shape-outside: circle(50% at 50% 50%);
  /* 等同于 */
  shape-outside: circle();
  /* 也等同于 */
  shape-outside: circle(50%);
}
```

### ellipse 椭圆形

`ellipse(rx ry at cx cy)`  定义了一个椭圆形。

- `rx` 和 `ry` 是椭圆在 `x` 轴和 `y` 轴上的半径。

  - `closest-side` 表示半径等于椭圆中心到参考框最近边之间的距离；
  - `farthest-side` 表示半径等于椭圆中心到参考框最远边之间的距离。

- `cx` 和 `cy` 是椭圆圆心的坐标。其中 `cx` 是椭圆圆心在 `x` 轴上的位置，`cy` 是椭圆圆心在 `y` 轴上的位置。

### inset 矩形

`inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )` 定义了一个矩形。完整写法为 `inset(top right bottom left round border-radius)` 。

- 前四个参数（`top right bottom left`）指定从参考框边缘向内的偏移量。

  - **`top`** ：内嵌矩形的顶部边缘距离参考框顶部边缘的距离；
  - **`right`** : 内嵌矩形的右侧边缘距离参考框右侧边缘的距离；
  - **`bottom`** ：内嵌矩形的底部边缘距离参考框底部边缘的距离；
  - **`left`** ：内嵌矩形的左侧边缘距离参考框左侧边缘的距离。

  这四个参数值可以像 `margin` 或 `padding` 一样，显式设置 `1 - 4` 个值

  - 取一个值时，表示 `top = right = bottom = left`；
  - 取两个值时，第一个值表示 `top` 和 `bottom` ；第二个值表示 `right` 和 `left`；
  - 取三个值时，第一个值表示 `top` ；第二个值表示 `right` 和 `left` ；第三个值表示 `bottom`；
  - 取四个值时，第一个值表示 `top` ；第二个值表示 `right` ；第三个值表示 `bottom` ；第四个值表示 `left`。
  
  这四个参数值可以接受 `<length-percentage>` 值，比如 `px` 、 `rem` 和 `0%` 等。同样的，如果取百分比值时，它是相对于参考框的宽度和高度计算。

  - `top` 和 `bottom` 相对于参考框高度计算；
  - `right` 和 `left` 相对于参考框宽度计算。

  无论使用哪一种尺寸（`<length>` 或 `<percentage>`），如果同一方向的总和超过了实际使用的尺寸，则会按比例降到 `100%` 。

  ```css
  .shape {
    /* 
      上边缘和下边缘之间距离达到参考框高度的 125% ，它们将按比例减少到总和为 100% 
      Step01: 75% + 50% = 125%;
      Step02: 125% - 100% = 25%；
      Step03: 25% ÷ 125% × 75% = 15%
      Step04: 75% - 15% = 60%
      Step05: 25% ÷ 125% × 50% = 10%
      Step06: 50% - 10% = 40%
      等同于 inset(60% 0% 40% 0%)
    */
    shape-outside: inset(75% 0% 50% 0%);
  }
  ```

- `round <border-radius>` 参数：可选，定义内嵌矩形的圆角。指定圆角的方式与 CSS 的 `border-radius` 完全相同，注意需要在参数前加上关键词 `round` 。

::: normal-demo 使用 inset() 定义矩形

```html
<div class="without-inset">
  <div class="shape"></div>
  <p><strong>未使用 inset() </strong>: 文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</p>
</div>

<div class="with-inset">
  <div class="shape"></div>
  <p><strong>使用 inset() </strong>: 文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</p>
</div>
```

```css
.without-inset, .with-inset {
  width: 450px;
  font-size: 16px;
}

.shape {
  display: block;
  width: 200px;
  height: 100px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: center;
  border: 2px solid #e2323a33;
}

.shape {
  float: left;
  border-radius: 200px;
}

.with-inset .shape {
  shape-outside: inset(0% round 100px);
}
```

:::

### polygon 多边形

`polygon( <'fill-rule'>? , [<length-percentage> <length-percentage>]# )` 用于通过提供一个或多个坐标对（每一个坐标代表形状的一个顶点）来绘制多边形。

- 格式为 `polygon(x1 y1, x2 y2，…)`，其中为多边形的每个顶点(点)指定一对 `(x, y)` 坐标。
- 指定多边形的最小对数是 `3`，即三角形。
- `<fill-rule>` ：可选的关键字，指定填充规则。支持 `nonzero`（默认值，当省略时）或 `evenodd` 。

  - `nonzero` 值采用的算法是：从需要判定的点向任意方向发射线，然后计算图形与线段交点处的走向；计算结果从 `0` 开始，每有一个交点处的线段是从左到右的，就加 `1` ；每有一个交点处的线段是从右到左的，就减 `1` ；这样计算完所有交点后，如果这个计算的结果不等于 `0` ，则该点在图形内，需要填充；如果该值等于 `0` ，则在图形外，不需要填充。
  - `evenodd` 值采用的算法是，从需要判定的点向任意方向发射线，然后计算图形与线段交点的个数，个数为奇数则该点在图形内，则需要填充；个数为偶数，则该点在图形外，不需要填充。

### path

`path( <'fill-rule'>? , <string> )` 接受 SVG 路径字符串作为参数，用于 CSS 形状和运动路径模块中绘制形状。

- `<string>` ：用于定义 SVG 路径的数据字符串。该 `<string>` 的内容语法与 SVG 相同。
- `<fill-rule>` ：可选的关键字，指定填充规则。支持 `nonzero`（默认值，当省略时）或 `evenodd` 。

## clip-path

`clip-path` 属性使用裁剪方式创建元素的可显示区域。

`clip-path: <clip-source> | [ <basic-shape> || <geometry-box> ] | none`

- `<clip-source>` ： 用 url 引用 SVG 的 clipPath 元素。
- `<basic-shape>` ： 使用一些基本的形状函数创建的一个形状。
  - `inset()` ：定义一个 inset 矩形。
  - `circle()` ：定义一个圆形（使用一个半径和一个圆心位置）。
  - `ellipse()` ：定义一个椭圆（使用两个半径和一个圆心位置）。
  - `polygon()` ：定义一个多边形（使用一个 SVG 填充规则和一组顶点）。
  - `path()` ：定义一个任意形状（使用一个可选的 SVG 填充规则和一个 SVG 路径定义）。
- `<geometry-box>` ： 如果同 basic-shape 一起声明，它将为基本形状提供相应的参考框盒。
  - `margin-box` ：使用 margin box 作为引用框。
  - `border-box` ：使用 border box 作为引用框。
  - `padding-box` ：使用 padding box 作为引用框。
  - `content-box` ：使用 content box 作为引用框。
  - `fill-box` ：利用对象边界框（object bounding box）作为引用框。
  - `stroke-box` ：使用笔触边界框（stroke bounding box）作为引用框。
  - `view-box` ：使用最近的 SVG 视口（viewport）作为引用框。

::: normal-demo 利用 clip-path 绘制多边形

```html
<div class="shapes-container">
  <div class="shapes-box circle"></div>
  <div class="shapes-box polygon"></div>
</div>
```

```css
.shapes-container {
  display: flex;
  flex-wrap: wrap;
}

.shapes-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
}

.circle {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
  clip-path: circle(50px at 50px 50px);
}

.polygon {
  width: 100px;
  height: 100px;
  background-color: yellowgreen;
  clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
}
```

:::

::: normal-demo clip-path 动画

```html
<div class="polygon-container">
  <div class="polygon-animate"></div>
</div>
```

```css
.polygon-container{
  position: relative;
  width: 200px;
  height: 200px;
}

.polygon-animate {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: crimson;
  transition: .3s;
  clip-path: polygon(
    50% 0%,
    0% 100%,
    100% 100%,
    100% 100%,
    100% 100%,
    100% 100%,
    100% 100%,
    100% 100%,
    100% 100%
  );
  animation: polygon-ani 5s linear infinite;
}

@keyframes polygon-ani {
  10% {
    background-color: darkorange;
    clip-path: polygon(
      50% 0%,
      100% 50%,
      50% 100%,
      0% 50%,
      0% 50%,
      0% 50%,
      0% 50%,
      0% 50%,
      0% 50%
    );
  }

  14% {
    clip-path: polygon(
      50% 0%,
      100% 50%,
      50% 100%,
      0% 50%,
      0% 50%,
      0% 50%,
      0% 50%,
      0% 50%,
      0% 50%
    );
  }

  24% {
    background-color: lemonchiffon;
    clip-path: polygon(
      100% 38%,
      82% 100%,
      82% 100%,
      18% 100%,
      0% 38%,
      0% 38%,
      0% 38%,
      0% 38%,
      50% 0%
    );
  }

  28% {
    clip-path: polygon(
      100% 38%,
      82% 100%,
      82% 100%,
      18% 100%,
      0% 38%,
      0% 38%,
      0% 38%,
      0% 38%,
      50% 0%
    );
  }

  38% {
    background-color: darkturquoise;
    clip-path: polygon(
      50% 0%,
      100% 25%,
      100% 75%,
      100% 75%,
      50% 100%,
      0% 75%,
      0% 75%,
      0% 25%,
      0% 25%
    );
  }

  42% {
    clip-path: polygon(
      50% 0%,
      100% 25%,
      100% 75%,
      100% 75%,
      50% 100%,
      0% 75%,
      0% 75%,
      0% 25%,
      0% 25%
    );
  }

  52% {
    background-color: darkcyan;
    clip-path: polygon(
      50% 0%,
      90% 20%,
      100% 60%,
      75% 100%,
      25% 100%,
      25% 100%,
      0% 60%,
      10% 20%,
      50% 0%
    );
  }

  56% {
    clip-path: polygon(
      50% 0%,
      90% 20%,
      100% 60%,
      75% 100%,
      25% 100%,
      25% 100%,
      0% 60%,
      10% 20%,
      50% 0%
    );
  }

  66% {
    background-color: deepskyblue;
    clip-path: polygon(
      30% 0%,
      70% 0%,
      70% 0%,
      100% 30%,
      100% 70%,
      70% 100%,
      30% 100%,
      0% 70%,
      0% 30%
    );
  }

  70% {
    clip-path: polygon(
      30% 0%,
      70% 0%,
      70% 0%,
      100% 30%,
      100% 70%,
      70% 100%,
      30% 100%,
      0% 70%,
      0% 30%
    );
  }

  80% {
    background-color: indigo;
    clip-path: polygon(
      83% 12%,
      100% 43%,
      94% 78%,
      68% 100%,
      32% 100%,
      6% 78%,
      0% 43%,
      17% 12%,
      50% 0%
    );
  }

  84% {
    clip-path: polygon(
      83% 12%,
      100% 43%,
      94% 78%,
      68% 100%,
      32% 100%,
      6% 78%,
      0% 43%,
      17% 12%,
      50% 0%
    );
  }

  94% {
    background-color: crimson;
    clip-path: polygon(
      50% 0%,
      0% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }
}
```

:::

::: normal-demo clip-path 动画

```html
<div class="triangle2rect-container">
  <div class="triangle2rect">
    <div class="a"></div>
    <div class="b"></div>
    <div class="c"></div>
    <div class="d"></div>
  </div>
</div>
```

```css
.triangle2rect-container {
  position: relative;
  width: 300px;
  height: 100px;
}

.triangle2rect {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: aniContainer 2s infinite alternate;
}

.triangle2rect div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.a {
  background: deeppink;
  clip-path: polygon(0% 0%, 0% 100%, 50% 50%);
  animation: a 2s infinite alternate;
}

.b {
  background: deeppink;
  clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
  animation: b 2s infinite alternate;
}

.c {
  background: deeppink;
  clip-path: polygon(100% 0%, 100% 100%, 50% 50%);
  animation: c 2s infinite alternate;
}

.d {
  background: deeppink;
  clip-path: polygon(100% 100%, 0% 100%, 50% 50%);
  animation: d 2s infinite alternate;
}

@keyframes a {

  0%,
  10% {
    background: deeppink;
    clip-path: polygon(0% 0%, 0% 100%, 50% 50%);
  }

  90%,
  100% {
    background: #000;
    clip-path: polygon(0% 100%, 25% 100%, 12.5% 0%);
  }
}

@keyframes b {

  0%,
  10% {
    background: deeppink;
    clip-path: polygon(0% 0%, 100% 0%, 50% 50%);
  }

  90%,
  100% {
    background: #000;
    clip-path: polygon(25% 0%, 50% 0%, 37.5% 100%);
  }
}

@keyframes c {

  0%,
  10% {
    background: deeppink;
    clip-path: polygon(100% 0%, 100% 100%, 50% 50%);
  }

  90%,
  100% {
    background: #000;
    clip-path: polygon(62.5% 0%, 75% 100%, 50% 100%);
  }
}

@keyframes d {

  0%,
  10% {
    background: deeppink;
    clip-path: polygon(100% 100%, 0% 100%, 50% 50%);
  }

  90%,
  100% {
    background: #000;
    clip-path: polygon(100% 0%, 87.5% 100%, 75% 0%);
  }
}

@keyframes aniContainer {

  0%,
  10% {
    width: 100px;
    height: 100px;
  }

  90%,
  100% {
    width: 250px;
    height: 60px;
  }
}
```

:::

N边形过渡动画

- <https://codepen.io/Chokcoco/pen/XgJRzO>
- <https://codepen.io/Chokcoco/pen/NgqGOo>

## shape-outside / shape-image-threshold / shape-margin

`shape-outside` 定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装。本质其实是生成几何图形，并且裁剪掉其几何图形之外周围的区域，让文字能排列在这些被裁剪区域之内。

`shape-image-threshold` 通过设定一个 alpha 通道的界限值来提取 `shape-outside` 值为图像的形状。形状由所有 alpha 值比界限值大的像素定义。

`shape-margin` 用于设定由 `shape-outside` 创建的 CSS 形状的外边距。

`shape-outside: none | <shape-box> || <basic-shape> | <image>`

- `none` ： 该浮动区域不产生影响，行内元素以默认的方式包裹着该元素的 margin box。

- `<shape-box>` ：根据浮动元素的边缘（通过 CSS box model 来定义）形状计算出浮动的区域。
  
  - `margin-box` ：定义一个由外边距的外边缘封闭形成的形状。这个形状的角的半径由相应的 `border-radius` 和 `margin` 的值决定。如果 `border-radius / margin` 的比率大于等于 1 , 那么这个 margin box 的角的弧度就是 `border-radius + margin` ；如果比率小于 1，那么这个 margin box 的角的弧度就是 `border-radius + (margin * (1 + (ratio-1)^3))` 。
  - `border-box` ：定义一个由边界的外边缘封闭形成的形状。 这个形状遵循正常的边界外部圆角的形成规则。
  - `padding-box` ：定义一个由内边距的外边缘封闭形成的形状。这个形状遵循正常的边界内部圆角的形成规则。
  - `content-box` ：定义一个由内容区域的外边缘封闭形成的形状（译者：表述的不太好，就是被padding包裹的区域，在chrome控制台中的盒子模型图中的蓝色区域。）。每一个角的弧度取 0 或 `border-radius - border-width - padding` 中的较大值。

- `<basic-shape>` ： 基于 `inset()`、`circle()`、`ellipse()` 或 `polygon()` 其中一个创造出来的形状计算出浮动区域。如果同时存在 `<shape-box>`，那么会为 `<basic-shape>` 方法定义一个参考盒，这个参考盒默认为 `margin-box`。

- `<image>` ：提取并且计算指定 `<image>` 的 alpha 通道得出浮动区域（译者：即根据图片的非透明区域进行包裹）。就跟通过 `shape-image-threshold` 来定义一样。

::: normal-demo 由图像创建的形状

```html
<div class="with-shape-outside">
  <div class="shape"></div>
  <p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容文本内容</p>
</div>
```

```css
.with-shape-outside {
  width: 300px;
}

.shape {
  width: 200px;
  aspect-ratio: 1;

  float: left;
  shape-image-threshold: 0;
  shape-margin: 2px;

  shape-outside: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcxNTE1NzA3ODg0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM5NDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc2Ny42IDcwMy40YzUtNSAyMTAuNC0xODQuOCAyMTAuNC0xODQuOGwtMzUtMTVjLTIwLTkuOC0xNC44LTIzLTEwLTM0LjggNC44LTE1LjIgNDAuMi0xMzQuNiA0MC4yLTEzNC42cy05NS40IDIwLTExNS40IDI1Yy0xNSA0LjgtMjAtNS0yNS0xNXMtMzAtNjQuOC0zMC02NC44LTEwNS4yIDExOS44LTExMC4yIDEyNC42Yy0yMCAxNS00MC4yIDAtMzUuMi0yMCAwLTIwIDU1LjItMjU5LjIgNTUuMi0yNTkuMnMtNjAuMiAzNC44LTgwLjIgNDQuOGMtMTUgMTAtMjUuMiAxMC0zNS4yLTEwQzU4NyAxNDQuNiA1MTEuOCAwIDUxMS44IDBzLTc1IDE0NC42LTg1IDE1OS42Yy0xMCAyMC0yMCAyMC0zNS4yIDEwLTIwLTEwLTgwLjItNDQuOC04MC4yLTQ0LjhTMzY2LjYgMzY0IDM2Ni42IDM4NGM1IDIwLTE1IDM1LTM1LjIgMjAtNS01LTExMC4yLTEyNC42LTExMC4yLTEyNC42UzE5Ni4yIDMzNCAxOTEuMiAzNDRzLTEwIDE5LjgtMjUgMTVDMTQ2IDM1NCA1MC44IDMzNCA1MC44IDMzNHMzNS4yIDExOS40IDQwLjIgMTM0LjZjNC44IDEyIDEwIDI1LTEwIDM0LjhMNDYgNTE4LjZzMjA1LjIgMTc5LjggMjEwLjQgMTg0LjhjMTAuMiAxMCAyMCAxNSAxMC4yIDQ1LTEwLjIgMzAtMjAuMiA3MC4yLTIwLjIgNzAuMnMxOTAuNC00MC4yIDIxMC42LTQ1LjJjMTcuNC0xLjggMzYuNiA1IDM2LjYgMjVTNDgyIDEwMjQgNDgyIDEwMjRoNjBzLTExLjYtMjA1LjQtMTEuNi0yMjUuNiAxOS0yNi44IDM2LjgtMjVjMjAgNSAyMTAuNCA0NS4yIDIxMC40IDQ1LjJzLTEwLTQwLjItMjAtNzAuMiAwLTM1IDEwLTQ1eiIgcC1pZD0iMzk0NCI+PC9wYXRoPjwvc3ZnPg==");
  background: #009966;
  /* mask 通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。 */
  mask: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjcxNTE1NzA3ODg0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM5NDMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc2Ny42IDcwMy40YzUtNSAyMTAuNC0xODQuOCAyMTAuNC0xODQuOGwtMzUtMTVjLTIwLTkuOC0xNC44LTIzLTEwLTM0LjggNC44LTE1LjIgNDAuMi0xMzQuNiA0MC4yLTEzNC42cy05NS40IDIwLTExNS40IDI1Yy0xNSA0LjgtMjAtNS0yNS0xNXMtMzAtNjQuOC0zMC02NC44LTEwNS4yIDExOS44LTExMC4yIDEyNC42Yy0yMCAxNS00MC4yIDAtMzUuMi0yMCAwLTIwIDU1LjItMjU5LjIgNTUuMi0yNTkuMnMtNjAuMiAzNC44LTgwLjIgNDQuOGMtMTUgMTAtMjUuMiAxMC0zNS4yLTEwQzU4NyAxNDQuNiA1MTEuOCAwIDUxMS44IDBzLTc1IDE0NC42LTg1IDE1OS42Yy0xMCAyMC0yMCAyMC0zNS4yIDEwLTIwLTEwLTgwLjItNDQuOC04MC4yLTQ0LjhTMzY2LjYgMzY0IDM2Ni42IDM4NGM1IDIwLTE1IDM1LTM1LjIgMjAtNS01LTExMC4yLTEyNC42LTExMC4yLTEyNC42UzE5Ni4yIDMzNCAxOTEuMiAzNDRzLTEwIDE5LjgtMjUgMTVDMTQ2IDM1NCA1MC44IDMzNCA1MC44IDMzNHMzNS4yIDExOS40IDQwLjIgMTM0LjZjNC44IDEyIDEwIDI1LTEwIDM0LjhMNDYgNTE4LjZzMjA1LjIgMTc5LjggMjEwLjQgMTg0LjhjMTAuMiAxMCAyMCAxNSAxMC4yIDQ1LTEwLjIgMzAtMjAuMiA3MC4yLTIwLjIgNzAuMnMxOTAuNC00MC4yIDIxMC42LTQ1LjJjMTcuNC0xLjggMzYuNiA1IDM2LjYgMjVTNDgyIDEwMjQgNDgyIDEwMjRoNjBzLTExLjYtMjA1LjQtMTEuNi0yMjUuNiAxOS0yNi44IDM2LjgtMjVjMjAgNSAyMTAuNCA0NS4yIDIxMC40IDQ1LjJzLTEwLTQwLjItMjAtNzAuMiAwLTM1IDEwLTQ1eiIgcC1pZD0iMzk0NCI+PC9wYXRoPjwvc3ZnPg==")
    no-repeat left top;
}
```

:::

## mask

`mask` 允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。

```css
/* Keyword values */
mask: none;

/* Image values */
mask: url(mask.png); /* 使用位图来做遮罩 */
mask: url(masks.svg#star); /* 使用 SVG 图形中的形状来做遮罩 */

/* Combined values */
mask: url(masks.svg#star) luminance; /* Element within SVG graphic used as luminance mask */
mask: url(masks.svg#star) 40px 20px; /* 使用 SVG 图形中的形状来做遮罩并设定它的位置：离上边缘 40px，离左边缘 20px */
mask: url(masks.svg#star) 0 0/50px 50px; /* 使用 SVG 图形中的形状来做遮罩并设定它的位置和大小：长宽都是 50px */
mask: url(masks.svg#star) repeat-x; /* Element within SVG graphic used as horizontally repeated mask */
mask: url(masks.svg#star) stroke-box; /* Element within SVG graphic used as mask extending to the box enclosed by the stroke */
mask: url(masks.svg#star) exclude; /* Element within SVG graphic used as mask and combined with background using non-overlapping parts */
```
