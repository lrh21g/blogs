# background

```css
/* 规定要使用的背景颜色 */
background-color: transparent;
/* 规定背景图像的位置  */
background-position: 0% 0%;
/* 规定背景图片的尺寸  */
background-size: auto auto;
/* 规定如何重复背景图像  */
background-repeat: repeat;
/* 规定背景图片的定位区域  */
background-origin: padding-box;
/* 规定背景的绘制区域  */
background-clip: border-box;
/* 规定背景图像是否固定或者随着页面的其余部分滚动  */
background-attachment: scroll;
/* 规定要使用的背景图像  */
background-image: none;
```

> Q：隐藏元素的background-image 到底加不加载？
>
> A：
>
> - 一个元素，如果 display 计算值为 none 。Firefox 浏览器不会发送图片请求，Chrome 和 Safari 浏览器去加载。
> - 如果是一个元素的父元素的 display 计算值为 none，则背景图不会请求，此时浏览器或许放心地认为这个背景图暂时是不会使用的。
