# SVG 基础

可缩放矢量图形（Scalable Vector Graphics，SVG），是一种用于描述二维的矢量图形，基于 XML 的标记语言。作为一个基于文本的开放网络标准，SVG能够优雅而简洁地渲染不同大小的图形，并和CSS，DOM，JavaScript和SMIL等其他网络标准无缝衔接。本质上，SVG 相对于图像，就好比 HTML 相对于文本。

## 基本形状

| 形状       | 代码                                                                 | 描述                                                                          |
| :--------- | :------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| **直线**   | `<line x1="start-x" y1="start-y" x2="end-x" y2="end-y" />`           | 以 `(start-x, start-y)` 为起点，`(end-x, end-y)` 为终点                       |
| **矩形**   | `<rect x="left-x" y="top-y" width="width" height="height" />`        | 指定左上角 `(left-x, top-y)` 坐标，宽 `width` ，高 `height`                   |
| **圆**     | `<circle cx="center-x" cy="center-y" r="radius" />`                  | 以 `(center-x, center-y)` 为圆心，半径为 `radius`                             |
| **椭圆**   | `<ellipse cx="center-x" cy="center-y" rx="x-radius" ry="y-radius"/>` | 以 `(center-x, center-y)` 为圆心，x轴半径为 `x-radius` ，y轴半径为 `y-radius` |
| **多边形** | `<polygon points="points-list" />`                                   | 由一系列坐标组成 `points-list: x1,y1 x2,y2 x3,y3 ...`                         |
| **折线**   | `<polyline points="points-list" />`                                  | 由一系列坐标组成 `points-list: x1,y1 x2,y2 x3,y3 ...`                         |

::: demo

```html
<svg x="0px" y="0px" width="500px" height="100px" viewBox="0 0 500 100">
  <svg x="0px" y="0px" width="500px" height="100px" viewBox="0 0 500 100">
    <line x1="10" y1="10" x2="20" y2="90" fill="none" stroke="black" />
    <rect x="30" y="10" width="80" height="80" fill="none" stroke="black" />
    <circle cx="160" cy="50" r="40 " fill="none" stroke="black" />
    <ellipse cx="270" cy="50" rx="60" ry="40" fill="none" stroke="black" />
    <polygon
      points="340,50 360,10 380,10 400,50 380,90 360,90 340,50"
      fill="none"
      stroke="black"
    />
    <!-- <polygon
      points="340 50, 360 10, 380 10, 400 50, 380 90, 360 90, 340 50"
      fill="none"
      stroke="black"
    /> -->
    <polyline
      points="420,50 440,10 460,10 480,50 460,90 440,90 420,50"
      fill="none"
      stroke="black"
    />
    <!-- <polyline
      points="420 50, 440 10, 460 10, 480 50, 460 90, 440 90, 420 50"
      fill="none"
      stroke="black"
    /> -->
  </svg>
</svg>
```

:::

## 路径

| 路径                                             | 描述                                                                                                                                                                                                                                                                               |
| :----------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `M(m) x y`                                       | 移动画笔到 `(x, y)`                                                                                                                                                                                                                                                                |
| `L(l) x y`                                       | 绘制一条直线到 `(x, y)`                                                                                                                                                                                                                                                            |
| `H(h) x`                                         | 水平绘制一条直线到 `x`                                                                                                                                                                                                                                                             |
| `V(v) y`                                         | 垂直绘制一条直线到 `y`                                                                                                                                                                                                                                                             |
| `A(a) rx ry x-axis-rotation large-arc sweep x y` | 绘制一段到 `(x, y)` 的椭圆弧。椭圆弧 x轴 的半径为 `rx` ，椭圆弧 y轴 的半径为 `ry` ，椭圆相对于 x轴 旋转 `x-axis-rotation` 度。 <br/> `large-arc` 设置为 `0` 表示弧线小于 180 度， `1` 表示弧线大于 180 度。 <br/> `sweep` 设置为 `0` 表示弧线逆时针旋转， `1` 表示弧线顺时针旋转。 |
| `Q(q) cx cy x y`                                 | 从当前点绘制一条到 `(x, y)` 的二次贝塞尔曲线, 曲线的控制点为 `(cx, cy)`                                                                                                                                                                                                            |
| `T(t) x y`                                       | 该命令只能在 `Q(q) cx cy x y` 之后使用。假设 `Q` 命令生成曲线 s , `T` 命令的作用是从 s 的终点再绘制一条到 `(x y)` 的二次贝塞尔曲线, 曲线的控制点为 s 控制点关于 s 终点的对称点. `T` 命令生成的曲线会非常平滑。                                                                     |
| `C(c) cx1 cy1 cx2 cy2 x y`                       | 从当前点绘制一条到 `(x, y)` 的三次贝塞尔曲线, 曲线的开始控制点和终点控制点分别为 `(cx1, cy1)`, `(cx2, cy2)` 。                                                                                                                                                                     |
| `S(s) cx2 cy2 x y`                               | 该命令只能在 `C(c) cx1 cy1 cx2 cy2 x y` 命令后使用, 假设 `C` 命令生成曲线 s , `S` 命令的作用是再绘制一条到 `(x, y)` 的三次贝塞尔曲线, 曲线的终点控制点是 `(cx2, cy2)`, 曲线的开始控制点是 s 的终点控制点关于 s 终点的对称点.                                                       |

> 注意：路径小写表示相对于上个坐标。

## 坐标系统变换

| 变换         | 代码                              | 描述                                                                  |
| :----------- | :-------------------------------- | :-------------------------------------------------------------------- |
| **平移**     | `translate(x, y)`                 | 将用户坐标系统的坐标原点移动到 `(x, y)`                               |
| **缩放**     | `scale(xFactor, yFactor)`         | 将用户坐标系统的 x轴、y轴 单位长度分别乘 `(xFactor, yFactor)` 倍      |
| **缩放**     | `scale(factor)`                   | 同 `scale(factor, factor)`                                            |
| **旋转**     | `rotate(angle, centerX, centerY)` | 将用户坐标系统以 `(centerX, centerY)` 为旋转中心顺时针旋转 `angle` 度 |
| **旋转**     | `rotate(angle)`                   | 同 `rotate(angle, 0, 0)`                                              |
| **倾斜**     | `skewX(angle)`                    | 根据 `angle` 倾斜所有 x 轴坐标, 视觉上会看到 y 轴倾斜                 |
| **倾斜**     | `skewY(angle)`                    | 根据 `angle` 倾斜所有 y 轴坐标, 视觉上会看到 x 轴倾斜                 |
| **矩阵变换** | `matrix(a b c d e f)`             | 将坐标系统进行矩阵变换                                                |
