---
category: Canvas
tag: 
  - Canvas
  - 动画
---

# Canvas 基本动画

## 动画的基本步骤

+ **清空 canvas** ： 如果存在绘制的内容会完全清空 canvas （例如：背景图），否则需要清空所有。最简单的做法是使用 `cleanRect()` 方法。
+ **保存 canvas 状态** : 如果一些设置（样式、变形之类的）会改变 canvas 状态，而在画每一帧的时候是原始状态，则需要使用 `save()` 方法先保存一下。
+ **绘制动画图形（animated shapes）** : 重绘动画帧。
+ **恢复 canvas 状态** : 如果已经保存了 canvas 的状态，可以先恢复它，然后重绘下一帧。

## 操控动画

+ 如果不涉及与用户互动，可使用 `setInterval()` 方法，定期执行指定代码。
+ 如果涉及与用户互动，可以使用键盘或者鼠标事件配合 `setTimeout()` 方法来实现。通过设置事件监听，可以捕捉用户的交互，并执行相应的动作。

相关API：

+ `setInterval(function, delay)` : 当设定好间隔时间后，`function` 会定期执行。
+ `setTimeout(function, delay)` : 在设定好的时间之后，执行函数。
+ `requestAnimationFrame(callback)` : 告诉浏览器希望执行一个动画，并在重绘之前，请求浏览器执行一个特定的函数来更新动画。提供了更加平缓并更加有效率的方式来执行动画，当系统准备好了重绘条件的时候，才调用绘制动画帧。一般每秒钟回调函数执行60次，也有可能会被降低。

## 动画案例

### 太阳系动画

::: normal-demo

```html
<canvas id="drawSunAnimation" width="300" height="300"></canvas>
```

```js
var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}

function draw() {
  var ctx = document.getElementById('drawSunAnimation').getContext('2d');

  // 设置图像混合模式为 destination-over - 在现有的画布内容后面绘制新的图形。
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // 清空 canvas

  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.strokeStyle = 'rgba(0,153,255,0.4)';
  ctx.save(); // 保存 canvas 状态 : canvas_state_01
  ctx.translate(150, 150);

  // 绘制地球
  var time = new Date();
  // getSeconds() : 根据本地时间，返回一个指定的日期对象的秒数
  // getMilliseconds() : 根据本地时间，返回一个指定的日期对象的毫秒数
  ctx.rotate(
    ((2 * Math.PI) / 60) * time.getSeconds() +
      ((2 * Math.PI) / 60000) * time.getMilliseconds()
  );
  ctx.translate(105, 0);
  ctx.fillRect(0, -12, 50, 24); // 阴影部分
  ctx.drawImage(earth, -12, -12); // 地球图像：宽 24px 高 24px

  // 绘制月球
  ctx.save(); // 保存 canvas 状态 : canvas_state_02
  ctx.rotate(
    ((2 * Math.PI) / 6) * time.getSeconds() +
      ((2 * Math.PI) / 6000) * time.getMilliseconds()
  );
  ctx.translate(0, 28.5);
  ctx.drawImage(moon, -3.5, -3.5); // 月球图像：宽 7px 高 7px
  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_02

  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_01

  ctx.beginPath();
  // 以 (150, 150) 为圆形， 105 为半径，圆弧开始角度为 0 ，圆弧结束角度为 Math.PI * 2 ，顺时针绘制圆弧
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // 地球轨道
  ctx.stroke(); // 对路径进行描边

  ctx.drawImage(sun, 0, 0, 300, 300); // 绘制背景图

  window.requestAnimationFrame(draw);
}

init();

```

:::

### 时钟动画

::: normal-demo

```html
<canvas id="drawClockAnimation" width="300"></canvas>
```

```js
function clock() {
  var now = new Date();
  var ctx = document.getElementById('drawClockAnimation').getContext('2d');
  ctx.save(); // 保存 canvas 状态 : canvas_state_01
  ctx.clearRect(0, 0, 150, 150); // 清空 canvas 区域
  ctx.translate(75, 75); // 对 canvas 坐标系进行整体移动，将中心点从 (0, 0) 变换到 (75, 75)
  ctx.scale(0.4, 0.4); // 缩放Canvas画布的坐标系，只是影响坐标系
  ctx.rotate(-Math.PI / 2);
  ctx.strokeStyle = 'black'; // 设置边框颜色为 black (黑色)
  ctx.fillStyle = 'white'; // 设置填充颜色为 white (白色)
  ctx.lineWidth = 8; // 设置线段厚度为 8
  ctx.lineCap = 'round'; // 设置线条端点样式为 round - 线段末端以圆形结束。

  // 小时标记
  ctx.save(); // 保存 canvas 状态 : canvas_state_02
  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.rotate(Math.PI / 6);
    ctx.moveTo(100, 0); // 将一个新的子路径的起始点移动到 (100, 0) 坐标
    ctx.lineTo(120, 0); // 使用直线连接子路径的终点到 (120, 0) 坐标
    ctx.stroke(); // 对路径进行描边
  }
  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_02

  // 分钟标记
  ctx.save(); // 保存 canvas 状态 : canvas_state_03
  ctx.lineWidth = 5;
  for (i = 0; i < 60; i++) {
    if (i % 5 != 0) {
      ctx.beginPath();
      ctx.moveTo(117, 0);
      ctx.lineTo(120, 0);
      ctx.stroke();
    }
    ctx.rotate(Math.PI / 30);
  }
  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_03

  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hr = now.getHours();
  hr = hr >= 12 ? hr - 12 : hr;

  ctx.fillStyle = 'black';

  // write Hours
  ctx.save(); // 保存 canvas 状态 : canvas_state_04
  ctx.rotate(
    hr * (Math.PI / 6) + (Math.PI / 360) * min + (Math.PI / 21600) * sec
  );
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(80, 0);
  ctx.stroke();
  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_04

  // write Minutes
  ctx.save(); // 保存 canvas 状态 : canvas_state_05
  ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(-28, 0);
  ctx.lineTo(112, 0);
  ctx.stroke();
  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_05

  // Write seconds
  ctx.save(); // 保存 canvas 状态 : canvas_state_06
  ctx.rotate((sec * Math.PI) / 30);
  ctx.strokeStyle = '#D40000';
  ctx.fillStyle = '#D40000';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(-30, 0);
  ctx.lineTo(83, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(95, 0, 10, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.arc(0, 0, 3, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_06

  ctx.beginPath();
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#325FA2';
  ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
  ctx.stroke();

  ctx.restore(); // 恢复为 canvas 状态 : canvas_state_01

  window.requestAnimationFrame(clock);
}

window.requestAnimationFrame(clock);

```

:::

### 循环全景照片

::: normal-demo

```html
<canvas id="drawPanoramicPhotoAnimation" width="400" height="200"></canvas>
```

```js
var img = new Image();

// 用户设置变量 - 自对应全景图片、方向、速度
img.src =
  'https://mdn.mozillademos.org/files/4553/Capitan_Meadows,_Yosemite_National_Park.jpg';
var CanvasXSize = 400;
var CanvasYSize = 200;
var speed = 30; // 速度：数值越小越快
var scale = 1.05; // 缩放比例
var y = -4.5; // 垂直偏移

// 主程序

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX; // 清空 canvas 矩形区域宽度
var clearY; // 清空 canvas 矩形区域高度
var ctx; // canvas 对象

img.onload = function () {
  imgW = img.width * scale;
  imgH = img.height * scale;

  if (imgW > CanvasXSize) {
    // 图像宽度大于画布
    x = CanvasXSize - imgW;
  }
  if (imgW > CanvasXSize) {
    // 图像宽度大于画布
    clearX = imgW;
  } else {
    clearX = CanvasXSize;
  }
  if (imgH > CanvasYSize) {
    // 图像高度大于画布
    clearY = imgH;
  } else {
    clearY = CanvasYSize;
  }

  // 获取 canvas 上下文
  ctx = document.getElementById('drawPanoramicPhotoAnimation').getContext('2d');

  // 设置刷新频率
  return setInterval(draw, speed);
};

function draw() {
  ctx.clearRect(0, 0, clearX, clearY); // 清空 canvas 区域

  // 如果图像宽度【小于等于】画布宽度
  if (imgW <= CanvasXSize) {
    if (x > CanvasXSize) {
      x = -imgW + x;
    }
    if (x > 0) {
      ctx.drawImage(img, -imgW + x, y, imgW, imgH);
    }
    if (x - imgW > 0) {
      ctx.drawImage(img, -imgW * 2 + x, y, imgW, imgH);
    }
  }

  // 如果图像宽度【大于】画布宽度
  else {
    if (x > CanvasXSize) {
      x = CanvasXSize - imgW;
    }
    if (x > CanvasXSize - imgW) {
      ctx.drawImage(img, x - imgW + 1, y, imgW, imgH);
    }
  }
  ctx.drawImage(img, x, y, imgW, imgH);
  x += dx; // 移动量
}

```

:::

### 鼠标追踪动画

::: normal-demo

```html
<div>暂时去除鼠标移动事件，移除鼠标跟随动画，如果需要可在代码中放开</div>
<canvas id="drawMouseAnimationCanvas" width="400" height="300"></canvas>
```

```css
/* #drawMouseAnimationCanvas {
  position: fixed;
  z-index: -1;
} */
```

```js
var ctxDOM; // canvas DOM
var ctx; // canvas 对象上下文
var ctxDomInnerWidth; // canvas DOM 宽度
var ctxDomInnerHeight; // canvas DOM 高度
const circleCenter = {}; // 圆心对象
var lineArr = [];
window.onload = function myfunction() {
  ctxDOM = document.getElementById('drawMouseAnimationCanvas');
  ctx = ctxDOM.getContext('2d');
  ctxDomInnerWidth = ctxDOM.offsetWidth;
  ctxDomInnerHeight = ctxDOM.offsetHeight;
  circleCenter.x = ctxDomInnerWidth / 2;
  circleCenter.y = ctxDomInnerHeight / 2;
  for (var i = 0; i < 10; i++) {
    var radius = 30;
    var x = Math.random() * (ctxDomInnerWidth - 2 * radius) + radius;
    var y = Math.random() * (ctxDomInnerHeight - 2 * radius) + radius;
    var lineItem = new lineObserver(
      ctxDomInnerWidth / 2,
      ctxDomInnerHeight / 2,
      5,
      'red',
      2
    );
    lineArr.push(lineItem);
  }
  ctx.lineWidth = '2';
  ctx.globalAlpha = 0.5;
  resize();
  runAnimation();
  // 暂时去除鼠标移动事件，移除鼠标跟随动画，如果需要可放开
  // ctxDOM.onmousemove = function (e) {
  //   circleCenter.x = e.clientX;
  //   circleCenter.y = e.clientY;
  // };
};
window.onresize = function () {
  resize();
};

// 获取随机颜色
function getRandomColor() {
  var colorStr = '0123456789ABCDEF';
  var colorPrefix = '#';
  for (var i = 0; i < 6; i++) {
    colorPrefix += colorStr[Math.ceil(Math.random() * 15)];
  }
  return colorPrefix;
}
function resize() {
  ctxDOM.width = ctxDomInnerWidth;
  ctxDOM.height = ctxDomInnerHeight;
  for (var i = 0; i < 101; i++) {
    var r = 30;
    var x = Math.random() * (ctxDomInnerWidth - 2 * r) + r;
    var y = Math.random() * (ctxDomInnerHeight - 2 * r) + r;
    lineArr[i] = new lineObserver(
      ctxDomInnerWidth / 2,
      ctxDomInnerHeight / 2,
      4,
      getRandomColor(),
      0.02
    );
  }
}
function lineObserver(x, y, lineWidth, lineColor, moveAngle) {
  this.x = x;
  this.y = y;
  this.lineWidth = lineWidth;
  this.lineColor = lineColor;
  this.theta = Math.random() * Math.PI * 2; // 角度 : 180度 = π 弧度
  this.moveAngle = moveAngle;
  this.t = Math.random() * 150;

  this.draw = function () {
    const lineStartPoint = {
      x: this.x,
      y: this.y,
    };
    this.theta += this.moveAngle;
    // 1 弧度 = 180 / Math.PI 度
    // 1 度 = Math.PI / 180 度
    // 180度 = π 弧度
    // 计算圆上的坐标点 x : x = x0 + radius * cos(angle * Math.PI / 180)
    // 计算圆上的坐标点 y : y = y0 + radius * sin(angle * Math.PI / 180)
    this.x = circleCenter.x + Math.cos(this.theta) * this.t;
    this.y = circleCenter.y + Math.sin(this.theta) * this.t;
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.lineColor;
    // moveTo() : 将一个新的子路径的起始点移动到(x，y)坐标
    ctx.moveTo(lineStartPoint.x, lineStartPoint.y);
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
    ctx.closePath();
  };
}
function runAnimation() {
  requestAnimationFrame(runAnimation);
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, ctxDOM.width, ctxDOM.height);
  lineArr.forEach(function (item, index) {
    item.draw();
  });
}
```

:::
