# 基于 Anime.js 的 SVG 动画

动画库: [animejs](https://www.animejs.cn/)

## 描边动画

::: demo

```html
<div class="line-draw">
  <svg x="0px" y="0px" viewBox="0 0 300 200" class="line-draw-svg">
    <path
      class="letter-i"
      d="M82.4,127.1V75.6h6.8v51.5H82.4z"
      stroke="none"
      fill="none"
    />
    <path
      class="letter-s"
      d="M98.9,110.6l6.4-0.6c0.3,2.6,1,4.7,2.1,6.3s2.8,3,5.2,4s5,1.5,7.9,1.5c2.6,0,4.9-0.4,6.9-1.2
    s3.5-1.8,4.4-3.2s1.5-2.8,1.5-4.4c0-1.6-0.5-3-1.4-4.2s-2.5-2.2-4.6-3c-1.4-0.5-4.4-1.4-9.2-2.5s-8.1-2.2-9.9-3.2
    c-2.5-1.3-4.3-2.9-5.5-4.8c-1.2-1.9-1.8-4-1.8-6.4c0-2.6,0.7-5,2.2-7.3c1.5-2.3,3.6-4,6.5-5.2c2.8-1.2,6-1.8,9.5-1.8
    c3.8,0,7.2,0.6,10.1,1.8s5.2,3,6.7,5.4s2.4,5.1,2.5,8.1l-6.5,0.5c-0.4-3.3-1.5-5.7-3.6-7.4c-2-1.7-5-2.5-9-2.5
    c-4.1,0-7.1,0.8-9,2.3s-2.8,3.3-2.8,5.5c0,1.9,0.7,3.4,2,4.6c1.3,1.2,4.7,2.4,10.3,3.7c5.5,1.3,9.3,2.4,11.4,3.3
    c3,1.4,5.2,3.1,6.6,5.3s2.1,4.6,2.1,7.3c0,2.7-0.8,5.3-2.4,7.8s-3.8,4.3-6.8,5.7s-6.3,2-9.9,2c-4.7,0-8.6-0.7-11.7-2
    c-3.2-1.4-5.6-3.4-7.4-6.1C99.9,117.1,99,114,98.9,110.6z"
      stroke="none"
      fill="none"
    />
    <path
      class="letter-u"
      d="M183.1,75.6h6.8v29.8c0,5.2-0.6,9.3-1.8,12.3s-3.3,5.5-6.3,7.4s-7.1,2.9-12,2.9c-4.8,0-8.8-0.8-11.8-2.5
    s-5.3-4.1-6.6-7.2s-2-7.5-2-12.9V75.6h6.8v29.7c0,4.5,0.4,7.8,1.2,9.9s2.3,3.8,4.3,4.9s4.5,1.7,7.4,1.7c5,0,8.6-1.1,10.7-3.4
    s3.2-6.6,3.2-13.1V75.6z"
      stroke="none"
      fill="none"
    />
    <path
      class="letter-x"
      d="M196,127.1l19.9-26.9l-17.6-24.7h8.1l9.4,13.2c1.9,2.7,3.3,4.9,4.1,6.3c1.1-1.9,2.5-3.8,4.1-5.9l10.4-13.7
    h7.4l-18.1,24.3l19.5,27.2h-8.4l-13-18.4c-0.7-1.1-1.5-2.2-2.2-3.4c-1.1,1.9-2,3.2-2.5,3.9l-12.9,18H196z"
      stroke="none"
      fill="none"
    />
  </svg>
  <button class="play-line-draw-btn">PLAY ISUX</button>
</div>
```

```css
.line-draw {
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
  text-align: center;
  background-color: #000;
}

.line-draw-svg {
  width: 300px;
  height: 200px;
}

.play-line-draw-btn {
  margin: 5% auto;
  padding: 5px 10px;
  font-weight: bold;
  color: white;
  border-radius: 4px;
  background: #007fff;
}
```

```js
window.onload = function() {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js');
  var heads = document.getElementsByTagName('head');
  if (heads.length) {
    heads[0].appendChild(script);
  } else {
    document.documentElement.appendChild(script);
  }
  script.onload = function() {
    initLineDrawing()
  }
}

function initLineDrawing() {
  var letterTime = 2000;

  var lineDrawing = anime({
    targets: 'path', // 动画目标对象
    // 画线动画：anime.js 使用 anime.setDashoffset() 方法获取到 SVG 路径的长度并将此长度设置为 SVG 的 'stroke-dasharray' 值，并返回该长度，再使用 strokeDashoffset 将  SVG的 'stroke-dashoffset' 属性值在 from to 格式中产生动画从而创建路径绘制效果。
    // [anime.setDashoffset, 0] - 从起点开始画完
    strokeDashoffset: [anime.setDashoffset, 0],
    // 时间曲线：定义动画的时间曲线。 easeInOutCubic - 由快至慢，效果更强
    easing: 'easeInOutCubic',
    // 持续时间： 定义动画的持续时间（以毫秒为单位）
    duration: letterTime,
    // 延迟： 定义动画的延迟（以毫秒为单位）
    delay: function (el, i) {
      return letterTime * i;
    },
    // begin 事件：当动画开始播放时，begin()回调被触发一次。动画完成后，会触发一次 complete() 回调。
    begin: function (anim) {
      var letters = document.querySelectorAll('path'),
        i;
      for (i = 0; i < letters.length; ++i) {
        letters[i].setAttribute('stroke', 'white');
        letters[i].setAttribute('fill', 'none');
      }
    },
    // update 事件：动画开始播放后，每帧都会触发此回调。
    // update: function(anim) {
    //   if (anim.currentTime >= letterTime) {
    //     document.querySelector(".letter-i").setAttribute("fill", "#fff");
    //   }
    //   if (anim.currentTime >= 2 * letterTime) {
    //     document.querySelector(".letter-s").setAttribute("fill", "#fff");
    //   }
    //   if (anim.currentTime >= 3 * letterTime) {
    //     document.querySelector(".letter-u").setAttribute("fill", "#fff");
    //   }
    //   if (anim.currentTime >= 4 * letterTime) {
    //     document.querySelector(".letter-x").setAttribute("fill", "#fff");
    //   }
    // },
    autoplay: false,
  });
  // anime - restart（重新开始）： 从动画的初始值重新开始动画。
  document.querySelector('.play-line-draw-btn').onclick = lineDrawing.restart;
}
```

:::

## 路径动画

```html
<div id="motionPath">
  <div class="motion-path-wrapper">
    <div class="motion-path-square"></div>
    <svg width="500" height="300" viewBox="0 0 500 300">
      <path
        id="curpath"
        fill="none"
        stroke="currentColor"
        stroke-width="1"
        d="M11.6,246.9c0,0,143.1-274.1,267.8-137.9s124.7,136.2,124.7,136.2L11.6,246.9z"
      />
    </svg>
  </div>
</div>
```

```css
.motion-path-wrapper {
  position: relative;
  width: 500px;
  height: 300px;
}
.motion-path-square {
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #000;
}
```

```js
window.onload = function() {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js');
  var heads = document.getElementsByTagName('head');
  if (heads.length) {
    heads[0].appendChild(script);
  } else {
    document.documentElement.appendChild(script);
  }
  script.onload = function() {
    var path = anime.path('path');

    anime({
      targets: '.motion-path-square',
      translateX: path('x'),
      translateY: path('y'),
      rotate: path('angle'),
      duration: 3000,
      loop: true,
      easing: 'linear',
    });
  }
}
```

## Morphing 动画

::: demo

```html
<svg
  class="social"
  xmlns="http://www.w3.org/2000/svg"
  width="100"
  height="100"
  viewBox="0 0 100 100"
>
  <path
    class="path"
    style="
      fill: #3b5998;
      fill-rule: evenodd;
      stroke: #3b5998;
      stroke-width: 1px;
      stroke-linecap: butt;
      stroke-linejoin: miter;
      stroke-opacity: 1;
    "
    d="m 41.416254,90 c -0.327378,-7.4702 0.20833,-32.7284 0,-39.901 -5.386902,-0.2083 -4.521603,0.3274 -9.848987,0 0.20833,-5.50595 0.36436,-7.66666 0.126269,-13.32142 4.646472,0.0181 3.439989,-0.009 9.848987,-0.1894 0.09586,-3.7736 0.133082,-3.0791 0.126269,-7.38674 0.18259,-3.73943 -0.486609,-10.54308 4.293149,-14.96288 4.779758,-4.4198 13.606811,-3.64808 22.223356,-3.53554 -0.04417,5.73754 -0.03936,9.37986 0,12.87945 -5.049924,0.46388 -7.309188,-0.33689 -10.85914,1.26269 -1.403378,3.17794 -1.569601,4.80531 -1.262691,11.93242 3.147964,-0.13336 8.201788,-0.1378 12.626907,0 -0.995158,6.00899 -0.948285,7.62376 -1.767767,13.06882 -3.676625,0.088 -5.605721,-0.1488 -11.111678,0 -0.148814,6.756 0.357147,33.0107 0,40.1536 -6.428576,0.1786 -8.174438,-0.03 -14.394674,0 z"
  />
</svg>
```

```js
window.onload = function() {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js');
  var heads = document.getElementsByTagName('head');
  if (heads.length) {
    heads[0].appendChild(script);
  } else {
    document.documentElement.appendChild(script);
  }
  script.onload = function() {
    var socialTimeline = anime.timeline({
        autoplay: true,
        direction: 'alternate',
        loop: true,
    });

    socialTimeline
      .add({
        targets: '.social',
        opacity: 1,
        duration: 500,
      })
      .add({
        targets: '.path',
        d: {
          value: [
            'm 41.416254,90 c -0.327378,-7.4702 0.20833,-32.7284 0,-39.901 -5.386902,-0.2083 -4.521603,0.3274 -9.848987,0 0.20833,-5.50595 0.36436,-7.66666 0.126269,-13.32142 4.646472,0.0181 3.439989,-0.009 9.848987,-0.1894 0.09586,-3.7736 0.133082,-3.0791 0.126269,-7.38674 0.18259,-3.73943 -0.486609,-10.54308 4.293149,-14.96288 4.779758,-4.4198 13.606811,-3.64808 22.223356,-3.53554 -0.04417,5.73754 -0.03936,9.37986 0,12.87945 -5.049924,0.46388 -7.309188,-0.33689 -10.85914,1.26269 -1.403378,3.17794 -1.569601,4.80531 -1.262691,11.93242 3.147964,-0.13336 8.201788,-0.1378 12.626907,0 -0.995158,6.00899 -0.948285,7.62376 -1.767767,13.06882 -3.676625,0.088 -5.605721,-0.1488 -11.111678,0 -0.148814,6.756 0.357147,33.0107 0,40.1536 -6.428576,0.1786 -8.174438,-0.03 -14.394674,0 z',
            'm 10.44335,90 c 11.073313,0.3952 19.483106,-1.8358 23.901837,-7.1603 -7.9736,-1.4292 -11.832311,-4.1933 -15.078321,-11.0837 3.459698,0.8219 5.795894,0.6358 7.606781,-0.607 -7.19593,-1.719 -12.734543,-6.7971 -13.741664,-15.836 2.766355,1.55307 5.466848,2.66623 7.828682,2.0203 -4.336544,-2.92911 -9.838998,-10.47636 -5.555839,-22.47589 8.400675,11.87052 23.824269,17.67568 33.840111,17.67767 -0.936406,-9.74688 5.88057,-19.46521 15.302849,-19.97853 8.13118,-0.50719 10.57457,4.01944 12.476346,4.82624 3.644547,0.13419 7.393301,-1.74401 10.354063,-3.53553 -1.380842,4.47157 -5.06769,5.62903 -6.313453,8.58629 5.42317,0.41513 5.891376,-1.53111 8.333758,-2.0203 -2.071414,3.75017 -5.393863,5.00034 -7.323606,8.08122 -1.633654,16.12573 -5.16049,27.57123 -14.647212,36.36553 -13.825764,11.3764 -34.755458,17.369 -56.984332,5.14 z',
          ],
          duration: 700,
          delay: 200,
          easing: 'easeInOutQuart',
        },
        fill: {
          value: ['#3b5998', '#4099ff'],
          duration: 700,
          delay: 200,
          easing: 'easeInOutQuart',
        },
        stroke: {
          value: ['#3b5998', '#4099ff'],
          duration: 700,
          delay: 200,
          easing: 'easeInOutQuart',
        },
      })
      .add({
        targets: '.social',
        opacity: 1,
        duration: 500,
      });
  }
}
```

:::
