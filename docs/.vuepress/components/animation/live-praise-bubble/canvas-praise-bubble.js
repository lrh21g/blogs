function getRandom(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export default class ThumbsUpAni {
  constructor() {
    this.loadImages(); // 预加载图片

    // 读取 canvas
    const canvas = document.getElementById('thumsCanvas');
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;

    this.imgsList = []; // 点赞图像列表
    this.renderList = []; // 渲染对象雷彪
    // scaleTime - 百分比。图片从开始放大到最终大小，所用时长。
    // 设置为 0.1 ，表示总共运行时间前面的 10% 的时间，点赞图片逐步放大
    this.scaleTime = 0.1;
    this.scanning = false; // 扫描器扫描标识，防止开启多个扫描器
  }

  // 预加载图片，获取图片宽高，如果某一图片加载失败，则不显示该图片
  loadImages() {
    const images = [
      'jfs/t1/93992/8/9049/4680/5e0aea04Ec9dd2be8/608efd890fd61486.png',
      'jfs/t1/108305/14/2849/4908/5e0aea04Efb54912c/bfa59f27e654e29c.png',
      'jfs/t1/98805/29/8975/5106/5e0aea05Ed970e2b4/98803f8ad07147b9.png',
      'jfs/t1/94291/26/9105/4344/5e0aea05Ed64b9187/5165fdf5621d5bbf.png',
      'jfs/t1/102753/34/8504/5522/5e0aea05E0b9ef0b4/74a73178e31bd021.png',
      'jfs/t1/102954/26/9241/5069/5e0aea05E7dde8bda/720fcec8bc5be9d4.png',
    ];
    const promiseAll = [];
    images.forEach((src) => {
      const p = new Promise(function(resolve) {
        const img = new Image();
        img.onerror = img.onload = resolve.bind(null, img);
        img.src = 'https://img12.360buyimg.com/img/' + src;
      });
      promiseAll.push(p);
    });
    Promise.all(promiseAll).then((imgsList) => {
      this.imgsList = imgsList.filter((d) => {
        if (d && d.width > 0) return true;
        return false;
      });
      if (this.imgsList.length == 0) {
        dLog('error', 'imgsList load all error');
        return;
      }
    });
  }

  createRender() {
    if (this.imgsList.length == 0) return null;

    // 当运行时间 diffTime 小于设置的 scaleTime 的时候，按比例随着时间增大，scale 变大。超过设置的时间阈值，则返回最终大小。
    const basicScale = [0.6, 0.9, 1.2][getRandom(0, 2)];
    const getScale = (diffTime) => {
      // diffTime - 百分比。表示从动画开始运行到当前时间过了多长时间。实际值是从 0 --> 1 逐步增大。
      // scaleTime - 百分比。图片从开始放大到最终大小，所用时长。
      if (diffTime < this.scaleTime) {
        return +(diffTime / this.scaleTime).toFixed(2) * basicScale;
      } else {
        return basicScale;
      }
    };

    const context = this.context;
    // 随机读取一个图片，进行渲染
    const image = this.imgsList[getRandom(0, this.imgsList.length - 1)];
    const offset = 20; // x轴偏移量
    const basicX = this.width / 2 + getRandom(-offset, offset);
    const angle = getRandom(2, 10); // 角度系数
    let ratio = getRandom(10, 30) * (getRandom(0, 1) ? 1 : -1);

    // 随机平滑 X 轴偏移 - 通过正弦( Math.sin )函数来实现均匀曲线
    const getTranslateX = (diffTime) => {
      if (diffTime < this.scaleTime) {
        // 放大期间，不进行摇摆位移
        return basicX;
      } else {
        return basicX + ratio * Math.sin(angle * (diffTime - this.scaleTime));
      }
    };

    // Y 轴偏移 - 运行偏移从 this.height --> image.height / 2 ，即从最底部，运行到顶部留下。
    const getTranslateY = (diffTime) => {
      return (
        image.height / 2 + (this.height - image.height / 2) * (1 - diffTime)
      );
    };

    // 淡出
    const fadeOutStage = getRandom(14, 18) / 100;
    const getAlpha = (diffTime) => {
      let left = 1 - +diffTime;
      if (left > fadeOutStage) {
        return 1;
      } else {
        return 1 - +((fadeOutStage - left) / fadeOutStage).toFixed(2);
      }
    };

    return (diffTime) => {
      // diffTime : 百分比。表示从动画开始运行到当前时间过了多长时间。实际值是从 0 --> 1 逐步增大。
      // diffTime 为 0.4 的时候，说明是已经运行了 40% 的时间
      // 时间差值满了，即：动画结束了（0 --> 1）
      if (diffTime >= 1) return true;

      context.save();

      const scale = getScale(diffTime);
      // const rotate = getRotate();
      const translateX = getTranslateX(diffTime);
      const translateY = getTranslateY(diffTime);
      context.translate(translateX, translateY); // 偏移
      context.scale(scale, scale); // 缩放
      // context.rotate(rotate * Math.PI / 180);
      context.globalAlpha = getAlpha(diffTime); // 淡出

      // 绘制
      context.drawImage(
        image,
        -image.width / 2,
        -image.height / 2,
        image.width,
        image.height
      );
      context.restore(); // 恢复画布(canvas)状态。
    };
  }

  // 实时绘制扫描器
  // 开启实时绘制扫描器，将创建的渲染对象放入 renderList 数组，数组不为空，说明 canvas 上还有动画，就需要不停的去执行 scan，直到 canvas 上没有动画结束为止。
  scan() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillStyle = '#f4f4f4';
    this.context.fillRect(0, 0, 200, 400);

    let index = 0;
    let length = this.renderList.length;

    if (length > 0) {
      requestFrame(this.scan.bind(this));
      this.scanning = true;
    } else {
      this.scanning = false;
    }

    // diffTime = (Date.now() - render.timestamp) / render.duration
    // 如果开始的时间戳是 10000，当前是100100，则说明已经运行了 100 毫秒了，如果动画本来需要执行 1000 毫秒，那么 diffTime = 0.1，代表动画已经运行了 10%。
    while (index < length) {
      const child = this.renderList[index];
      if (
        !child ||
        !child.render ||
        child.render.call(null, (Date.now() - child.timestamp) / child.duration)
      ) {
        // 动画结束，则删除该动画
        this.renderList.splice(index, 1);
        length--;
      } else {
        // 继续执行动画
        index++;
      }
    }
  }

  // 开始/增加动画
  // 调用一次 start 方法来生成渲染实例，放进渲染实例数组。
  // 如果当前扫描器未开启，则需要启动扫描器，使用了 scanning 变量，防止开启多个扫描器。
  start() {
    const render = this.createRender();
    const duration = getRandom(1500, 3000);
    this.renderList.push({
      render,
      duration,
      timestamp: Date.now(),
    });
    if (!this.scanning) {
      this.scanning = true;
      requestFrame(this.scan.bind(this));
    }
    return this;
  }
}

function requestFrame(cb) {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  )(cb);
}
