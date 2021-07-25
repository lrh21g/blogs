---
category: Canvas
tag: 
  - Canvas
---

# Canvas 绘制文本

## 绘制文本

## fillText() 填充指定的文本

`fillText(text, x, y, [maxWidth])` : 在 `(x, y)` 位置填充文本 `text` 。如果提供了最大宽度 `maxWidth` ，文本会进行缩放以适应最大宽度。

+ `text` : 使用当前的 `font` （绘制文字时，当前字体样式的属性）, `textAlign` （绘制文本时，文本的对齐方式的属性）, `textBaseline` （绘制文本时，当前文本基线的属性） 和 `direction` （绘制文本时，描述当前文本方向的属性） 值对文本进行渲染。
+ `x` : 文本起点的 x 轴坐标。
+ `y` : 文本起点的 y 轴坐标。
+ `maxWidth` : 绘制的最大宽度。如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。

::: demo

```html
<canvas id="drawFillTextCanvas" height="80"></canvas>
```

```js
function draw() {
  var ctx = document.getElementById('drawFillTextCanvas').getContext('2d');

  ctx.font = "48px serif";
  ctx.fillText("Hello world", 10, 50);
}

draw();
```

:::

## strokeText() 绘制文本边框

`strokeText(text, x, y [, maxWidth])` :  在 `(x, y)` 位置填充文本 `text` 边框 。如果提供了最大宽度 `maxWidth` ，文本会进行缩放以适应最大宽度。

+ `text` : 使用当前的 `font` （绘制文字时，当前字体样式的属性）, `textAlign` （绘制文本时，文本的对齐方式的属性）, `textBaseline` （绘制文本时，当前文本基线的属性） 和 `direction` （绘制文本时，描述当前文本方向的属性） 值对文本进行渲染。
+ `x` : 文本起点的 x 轴坐标。
+ `y` : 文本起点的 y 轴坐标。
+ `maxWidth` : 绘制的最大宽度。如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。

::: demo

```html
<canvas id="drawStrokeTextCanvas" height="80"></canvas>
```

```js
function draw() {
  var ctx = document.getElementById('drawStrokeTextCanvas').getContext('2d');

  ctx.font = "48px serif";
  ctx.strokeText("Hello world", 10, 50);
}

draw();
```

:::

## 添加文本样式

### font 字体样式

`font = value` : 绘制文字时，当前字体样式的属性。 使用和 CSS font 规范相同的字符串值。

### textAlign 文本对齐方式

`textAlign = value` : 绘制文本时，文本的对齐方式的属性。

+ `left` : 文本左对齐。
+ `right` : 文本右对齐。
+ `center` : 文本居中对齐。
+ `start` : 默认值。文本对齐界线开始的地方（左对齐指本地从左向右，右对齐指本地从右向左）。
+ `end` : 文本对齐界线结束的地方（左对齐指本地从左向右，右对齐指本地从右向左）。
  
注意： `direction` 属性会对此属性产生影响。

+ 如果 `direction` 属性设置为 `ltr` ，则 `left` 和 `start` 的效果相同， `right` 和 `end` 的效果相同
+ 如果 `direction` 属性设置为 `rtl` ，则 `left` 和 `end` 的效果相同， `right` 和 `start` 的效果相同。

### textBaseline 基线文本方式

`textBaseline = value`

+ `top` : 文本基线在文本块的顶部。
+ `hanging` : 文本基线是悬挂基线。
+ `middle` : 文本基线在文本块的中间。
+ `alphabetic` : 默认值。文本基线是标准的字母基线。
+ `ideographic` : 文字基线是表意字基线；如果字符本身超出了 `alphabetic` 基线，那么 ideog`rahpic 基线位置在字符本身的底部。
+ `bottom` : 文本基线在文本块的底部。 与 `ideographic` 基线的区别在于 `ideographic` 基线不需要考虑下行字母。

::: demo

```html
<canvas id="drawTextBaselineCanvas" width="600" height="390"></canvas>
```

```js
function draw() {
  var ctx = document.getElementById('drawTextBaselineCanvas').getContext('2d');

  const baselines = [
    'top',
    'hanging',
    'middle',
    'alphabetic',
    'ideographic',
    'bottom',
  ];
  ctx.font = '36px serif';
  ctx.strokeStyle = 'red';

  baselines.forEach(function (baseline, index) {
    ctx.textBaseline = baseline;
    let y = 10 + index * 75;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(550, y + 0.5);
    ctx.stroke();
    ctx.fillText('Abcdefghijklmnop (' + baseline + ')', 0, y);
  });
}

draw();
```

:::

### direction 文本方向

`direction = value` : 绘制文本时，描述当前文本方向的属性。

+ `ltr` : 文本方向从左向右。
+ `rtl` : 文本方向从右向左。
+ `inherit` : 默认值。根据情况继承 `<canvas>` 元素或者 `Document` 。

## 预测量文本宽度

`measureText(text)` : 返回一个关于被测量文本 `TextMetrics` 对象包含的信息（例如它的宽度）。

+ `TextMetrics.width` : `double` 类型，使用 CSS 像素计算的内联字符串的宽度。基于当前上下文字体考虑。
