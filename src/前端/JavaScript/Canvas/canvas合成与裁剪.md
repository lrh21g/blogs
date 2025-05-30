---
category: Canvas
tag:
  - Canvas
---

# Canvas 合成与裁剪

## globalCompositeOperation 设置图像混合模式

`globalCompositeOperation = type` : 设置 Canvas 图形的混合模式。

::: normal-demo

```html
<div id="globalCompositeOperationContainer"></div>
```

```js
var canvas1 = document.createElement('canvas');
var canvas2 = document.createElement('canvas');
var gco = [
  'source-over',
  'source-in',
  'source-out',
  'source-atop',
  'destination-over',
  'destination-in',
  'destination-out',
  'destination-atop',
  'lighter',
  'copy',
  'xor',
  'multiply',
  'screen',
  'overlay',
  'darken',
  'lighten',
  'color-dodge',
  'color-burn',
  'hard-light',
  'soft-light',
  'difference',
  'exclusion',
  'hue',
  'saturation',
  'color',
  'luminosity',
].reverse();
var gcoText = [
  '这是默认设置，并在现有画布上下文之上绘制新图形。',
  '新图形只在新图形和目标画布重叠的地方绘制。其他的都是透明的。',
  '在不与现有画布内容重叠的地方绘制新图形。',
  '新图形只在与现有画布内容重叠的地方绘制。',
  '在现有的画布内容后面绘制新的图形。',
  '现有的画布内容保持在新图形和现有画布内容重叠的位置。其他的都是透明的。',
  '现有内容保持在新图形不重叠的地方。',
  '现有的画布只保留与新图形重叠的部分，新的图形是在画布内容后面绘制的。',
  '两个重叠图形的颜色是通过颜色值相加来确定的。',
  '只显示新图形。',
  '图像中，那些重叠和正常绘制之外的其他地方是透明的。',
  '将顶层像素与底层相应像素相乘，结果是一幅更黑暗的图片。',
  '像素被倒转，相乘，再倒转，结果是一幅更明亮的图片。',
  'multiply和screen的结合，原本暗的地方更暗，原本亮的地方更亮。',
  '保留两个图层中最暗的像素。',
  '保留两个图层中最亮的像素。',
  '将底层除以顶层的反置。',
  '将反置的底层除以顶层，然后将结果反过来。',
  '屏幕相乘（A combination of multiply and screen）类似于叠加，但上下图层互换了。',
  '用顶层减去底层或者相反来得到一个正值。',
  '一个柔和版本的强光（hard-light）。纯黑或纯白不会导致纯黑或纯白。',
  '和difference相似，但对比度较低。',
  '保留了底层的亮度（luma）和色度（chroma），同时采用了顶层的色调（hue）。',
  '保留底层的亮度（luma）和色调（hue），同时采用顶层的色度（chroma）。',
  '保留了底层的亮度（luma），同时采用了顶层的色调(hue)和色度(chroma)。',
  '保持底层的色调（hue）和色度（chroma），同时采用顶层的亮度（luma）。',
].reverse();
var width = 320;
var height = 340;

window.onload = function() {
  // lum in sRGB
  var lum = {
    r: 0.33,
    g: 0.33,
    b: 0.33,
  };
  // 调整画布大小
  canvas1.width = width;
  canvas1.height = height;
  canvas2.width = width;
  canvas2.height = height;
  lightMix();
  colorSphere();
  runComposite();
  return;
};

// 创建 canvas DOM
function createCanvas() {
  var canvas = document.createElement('canvas');
  canvas.style.background = 'url(' + op_8x8.data + ')';
  canvas.style.border = '1px solid #000';
  canvas.style.margin = '5px';
  canvas.width = width / 2;
  canvas.height = height / 2;
  return canvas;
}

function runComposite() {
  var dl = document.createElement('dl');
  // document.body.appendChild(dl);
  var containerDOM = document.getElementById('globalCompositeOperationContainer')
  containerDOM.appendChild(dl);
  while (gco.length) {
    var pop = gco.pop();
    var dt = document.createElement('dt');
    dt.textContent = pop;
    dl.appendChild(dt);
    var dd = document.createElement('dd');
    var p = document.createElement('p');
    p.textContent = gcoText.pop();
    dd.appendChild(p);

    var canvasToDrawOn = createCanvas();
    var canvasToDrawFrom = createCanvas();
    var canvasToDrawResult = createCanvas();

    var ctx = canvasToDrawResult.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.drawImage(canvas1, 0, 0, width / 2, height / 2);
    ctx.globalCompositeOperation = pop;
    ctx.drawImage(canvas2, 0, 0, width / 2, height / 2);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, height / 2 - 20, width / 2, 20);
    ctx.fillStyle = '#FFF';
    ctx.font = '14px arial';
    ctx.fillText(pop, 5, height / 2 - 5);
    ctx.restore();

    var ctx = canvasToDrawOn.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.drawImage(canvas1, 0, 0, width / 2, height / 2);
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, height / 2 - 20, width / 2, 20);
    ctx.fillStyle = '#FFF';
    ctx.font = '14px arial';
    ctx.fillText('existing content', 5, height / 2 - 5);
    ctx.restore();

    var ctx = canvasToDrawFrom.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    ctx.drawImage(canvas2, 0, 0, width / 2, height / 2);
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, height / 2 - 20, width / 2, 20);
    ctx.fillStyle = '#FFF';
    ctx.font = '14px arial';
    ctx.fillText('new content', 5, height / 2 - 5);
    ctx.restore();

    dd.appendChild(canvasToDrawOn);
    dd.appendChild(canvasToDrawFrom);
    dd.appendChild(canvasToDrawResult);

    dl.appendChild(dd);
  }
}

var lightMix = function() {
  var ctx = canvas2.getContext('2d');
  // save() : 保存 canvas 全部状态
  ctx.save();
  // 设置图像混合模式为 lighter : 是两个重叠图形的颜色是通过颜色值相加来确定的。
  ctx.globalCompositeOperation = 'lighter';
  // beginPath() : 新建路径。通过清空子路径列表开始一个新路径
  ctx.beginPath();
  ctx.fillStyle = 'rgba(255,0,0,1)';
  // arc() : 绘制圆弧
  ctx.arc(100, 200, 100, Math.PI * 2, 0, false);
  // fill() : 路径条南充
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,0,255,1)';
  ctx.arc(220, 200, 100, Math.PI * 2, 0, false);
  ctx.fill();
  ctx.beginPath();
  ctx.fillStyle = 'rgba(0,255,0,1)';
  ctx.arc(160, 100, 100, Math.PI * 2, 0, false);
  ctx.fill();
  ctx.restore();
  ctx.beginPath();
  ctx.fillStyle = '#f00';
  // fillRect() : 绘制填充矩形
  ctx.fillRect(0, 0, 30, 30);
  ctx.fill();
};

var colorSphere = function(element) {
  var ctx = canvas1.getContext('2d');
  var width = 360;
  var halfWidth = width / 2;
  var rotate = (1 / 360) * Math.PI * 2;
  var offset = 0;
  var oleft = -20;
  var otop = -20;
  for (var n = 0; n <= 359; n++) {
    // createLinearGradient() : 创建一个沿参数坐标指定的直线的渐变
    var gradient = ctx.createLinearGradient(
      oleft + halfWidth,
      otop,
      oleft + halfWidth,
      otop + halfWidth
    );
    var color = Color.HSV_RGB({ H: (n + 300) % 360, S: 100, V: 100 });
    // addColorStop() : 给渐变添加新的渐变点
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(
      0.7,
      'rgba(' + color.R + ',' + color.G + ',' + color.B + ',1)'
    );
    gradient.addColorStop(1, 'rgba(255,255,255,1)');
    ctx.beginPath();
    ctx.moveTo(oleft + halfWidth, otop);
    ctx.lineTo(oleft + halfWidth, otop + halfWidth);
    ctx.lineTo(oleft + halfWidth + 6, otop);
    ctx.fillStyle = gradient;
    ctx.fill();
    // translate() : 通过移动 canvas 和它的原点到一个不同的位置。常用于改变其他变换方法的变换中心点。
    ctx.translate(oleft + halfWidth, otop + halfWidth);
    // rotate() : 以原点为中心旋转 canvas。
    ctx.rotate(rotate);
    ctx.translate(-(oleft + halfWidth), -(otop + halfWidth));
  }
  ctx.beginPath();
  ctx.fillStyle = '#00f';
  ctx.fillRect(15, 15, 30, 30);
  ctx.fill();
  return ctx.canvas;
};

// HSV (1978) = H: Hue / S: Saturation / V: Value
var Color = {};
Color.HSV_RGB = function(o) {
  var H = o.H / 360,
    S = o.S / 100,
    V = o.V / 100,
    R,
    G,
    B;
  var A, B, C, D;
  if (S == 0) {
    R = G = B = Math.round(V * 255);
  } else {
    if (H >= 1) H = 0;
    H = 6 * H;
    D = H - Math.floor(H);
    A = Math.round(255 * V * (1 - S));
    B = Math.round(255 * V * (1 - S * D));
    C = Math.round(255 * V * (1 - S * (1 - D)));
    V = Math.round(255 * V);
    switch (Math.floor(H)) {
      case 0:
        R = V;
        G = C;
        B = A;
        break;
      case 1:
        R = B;
        G = V;
        B = A;
        break;
      case 2:
        R = A;
        G = V;
        B = C;
        break;
      case 3:
        R = A;
        G = B;
        B = V;
        break;
      case 4:
        R = C;
        G = A;
        B = V;
        break;
      case 5:
        R = V;
        G = A;
        B = B;
        break;
    }
  }
  return {
    R: R,
    G: G,
    B: B,
  };
};

var createInterlace = function(size, color1, color2) {
  var proto = document.createElement('canvas').getContext('2d');
  proto.canvas.width = size * 2;
  proto.canvas.height = size * 2;
  proto.fillStyle = color1; // top-left
  proto.fillRect(0, 0, size, size);
  proto.fillStyle = color2; // top-right
  proto.fillRect(size, 0, size, size);
  proto.fillStyle = color2; // bottom-left
  proto.fillRect(0, size, size, size);
  proto.fillStyle = color1; // bottom-right
  proto.fillRect(size, size, size, size);
  // createPattern() : 指定图像创建模式。repeat - 水平和垂直平铺
  var pattern = proto.createPattern(proto.canvas, 'repeat');
  pattern.data = proto.canvas.toDataURL();
  return pattern;
};

var op_8x8 = createInterlace(8, '#FFF', '#eee');
```

:::

## clip() 裁切路径

`clip(fillRule)` : 路径剪裁。使用的时候，先绘制剪裁路径，执行 `clip()` 方法，再绘制的内容就在这个剪裁路径中呈现。

- `fillRule` : 填充规则。
  - `nonzero`: 非零环绕原则，默认的原则。
  - `evenodd`: 奇偶环绕原则。

::: normal-demo

```html
<canvas id="drawClipCanvas"> </canvas>
```

```js
function draw() {
  var ctx = document.getElementById('drawClipCanvas').getContext('2d');
  ctx.fillRect(0, 0, 150, 150);
  ctx.translate(75, 75);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0, 0, 60, 0, Math.PI * 2, true);
  ctx.clip();

  // draw background
  var lingrad = ctx.createLinearGradient(0, -75, 0, 75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');

  ctx.fillStyle = lingrad;
  ctx.fillRect(-75, -75, 150, 150);

  // draw stars
  for (var j = 1; j < 50; j++) {
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(
      75 - Math.floor(Math.random() * 150),
      75 - Math.floor(Math.random() * 150)
    );
    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
    ctx.restore();
  }
}

function drawStar(ctx, r) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(r, 0);
  for (var i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 == 0) {
      ctx.lineTo((r / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(r, 0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
draw()
```

:::
