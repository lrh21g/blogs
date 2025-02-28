---
category: SVG
tag:
  - SVG
  - SMIL
---

# SMIL 动画

SMIL 动画指在 SVG 集成了 Synchronized Multimedia Integration Language (SMIL) 这种动画标准，该语言被 SVG 原生支持，主要是使用标签来描述动画。SMIL 允许你：

- 变动一个元素的数字属性（x、y……）
- 变动元素的变形属性（ `translation` 或 `rotation` ）
- 变动元素的颜色属性
- 物件方向与运动路径方向同步

## `<animate>` 元素

`<animate>` 元素放在形状元素（`<rect>` 、 `<circle>` 等）的内部，用来定义一个元素的某个属性如何踩着时点改变。在指定持续时间里，属性从开始值变成结束值。

- `attributeName` : 变动的属性的属性名。
- `from` : 变动的初始值。
- `to` : 变动的终值。
- `dur` : 动画的持续时间（举个例子，写“5s”代表 5 秒表）
- `repeatCount` : 动画将发生的次数。
- `values` : 一个列表定义动画过程中的值序列的值。如果指定了此属性，则将忽略在元素上设置的任何 `from`, `to` 和 `by` 属性值.

```html
<svg width="500px" height="500px" viewBox="0 0 500 500">
  <rect x="0" y="0" width="100" height="100" fill="#feac5e">
    <animate attributeName="x" from="0" to="500" dur="2s" repeatCount="indefinite" />
  </rect>
</svg>
```

## 实例

::: normal-demo

```html
<svg width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
  <g>
    <!-- 实现旋转动画 -->
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="0 33 33;270 33 33"
      begin="0s"
      dur="1.4s"
      fill="freeze"
      repeatCount="indefinite"
    />
    <circle
      fill="none"
      stroke-width="6"
      stroke-linecap="round"
      cx="33"
      cy="33"
      r="30"
      stroke-dasharray="187"
      stroke-dashoffset="610"
    >
      <!-- 元素的 stroke 在设定的 5种 颜色之前不停的变化 -->
      <animate
        attributeName="stroke"
        values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4"
        begin="0s"
        dur="5.6s"
        fill="freeze"
        repeatCount="indefinite"
      />
      <animateTransform
        attributeName="transform"
        type="rotate"
        values="0 33 33;135 33 33;450 33 33"
        begin="0s"
        dur="1.4s"
        fill="freeze"
        repeatCount="indefinite"
      />
      <!-- 实现边框长短变化 -->
      <animate
        attributeName="stroke-dashoffset"
        values="187;46.75;187"
        begin="0s"
        dur="1.4s"
        fill="freeze"
        repeatCount="indefinite"
      />
    </circle>
  </g>
</svg>
```

:::
