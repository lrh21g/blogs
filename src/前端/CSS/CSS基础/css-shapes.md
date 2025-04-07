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

## shape-outside

`shape-outside` 的 CSS 属性定义了一个可以是非矩形的形状，相邻的内联内容应围绕该形状进行包装。本质其实是生成几何图形，并且裁剪掉其几何图形之外周围的区域，让文字能排列在这些被裁剪区域之内。

`shape-outside: none | <shape-box> || <basic-shape> | <image>`

- `none` ： 该浮动区域不产生影响，行内元素以默认的方式包裹着该元素的 margin box。
- `<shape-box>` ：根据浮动元素的边缘（通过 CSS box model 来定义）形状计算出浮动的区域。
  - `margin-box` ：定义一个由外边距的外边缘封闭形成的形状。这个形状的角的半径由相应的 `border-radius` 和 `margin` 的值决定。如果 `border-radius / margin` 的比率大于等于 1 , 那么这个 margin box 的角的弧度就是 `border-radius + margin` ；如果比率小于 1，那么这个 margin box 的角的弧度就是 `border-radius + (margin * (1 + (ratio-1)^3))` 。
  - `border-box` ：定义一个由边界的外边缘封闭形成的形状。 这个形状遵循正常的边界外部圆角的形成规则。
  - `padding-box` ：定义一个由内边距的外边缘封闭形成的形状。这个形状遵循正常的边界内部圆角的形成规则。
  - `content-box` ：定义一个由内容区域的外边缘封闭形成的形状（译者：表述的不太好，就是被padding包裹的区域，在chrome控制台中的盒子模型图中的蓝色区域。）。每一个角的弧度取 0 或 `border-radius - border-width - padding` 中的较大值。
- `<basic-shape>` ： 基于 `inset()`、`circle()`、`ellipse()` 或 `polygon()` 其中一个创造出来的形状计算出浮动区域。如果同时存在 `<shape-box>`，那么会为 `<basic-shape>` 方法定义一个参考盒，这个参考盒默认为 `margin-box`。
- `<image>` ：提取并且计算指定 `<image>` 的 alpha 通道得出浮动区域（译者：即根据图片的非透明区域进行包裹）。就跟通过 `shape-image-threshold` 来定义一样。
