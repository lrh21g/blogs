# CSS 常用封装

## 文本超出 n行 显示省略号

``` less
// 超过固定宽度显示 ...
.ellipsis () {
  overflow: hidden;
  white-space: nowrap; // 禁止文字折行
  text-overflow: ellipsis; // 当文本溢出时显示省略标记
}

// 超过 @row 显示 ...
.ellipsis_line (@row: 2) {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: pre-line;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
  -webkit-line-clamp: @row;
}
```

## 1px边框

``` less
.hairline-common () {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
}

.hairline-line (@border-color: #f2f2f2) {
  .hairline-common();
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid @border-color;
  transform: scale(0.5);
}

// 1px边框 - 全边框
.hairline-surround (@border-color:#f2f2f2, @border-radius:0px) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-width: 1px;
    border-radius: @border-radius;
  }
}

// 1px边框 - 上边框
.hairline-top (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-top-width: 1px;
  }
}

// 1px边框 - 下边框
.hairline-bottom (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-bottom-width: 1px;
  }
}

// 1px边框 - 上下边框
.hairline-top-bottom (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-width: 1px 0;
  }
}

// 1px边框 - 左边框
.hairline-left (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-left-width: 1px;
  }
}

// 1px边框 - 右边框
.hairline-right (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-right-width: 1px;
  }
}

// 1px边框 - 左右边框
.hairline-left-right (@border-color:#f2f2f2) {
  position: relative;
  &::before {
    .hairline-line(@border-color);
    border-width: 0 1px;
  }
}

// 1px边框 - 取消
.hairline-none () {
  &::before {
    display: none;
  }
}
```

## 去除input默认填充的背景颜色

``` css
input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
```

## 清除input[type=number]的默认样式

``` css
input[type=number] {
  -moz-appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```

## 清除移动端 a 标签等点击区域变色

``` css
*{
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
```

## 避免ios滑动滚动条卡顿

``` css
*{
  -webkit-overflow-scrolling : touch
}
```

## 清楚移动端 `input` 样式

``` css
input{
  border: none;
  -moz-appearance:none;
  -webkit-appearance : none ; /*解决ios上按钮的圆角问题*/
  border-radius: 0; /*解决ios上输入框圆角问题*/
  outline:medium; /*去掉鼠标点击的默认黄色边框*/
  background-color: transparent;
}
```

## 重置样式(reset.css)

``` css
@charset "utf-8";
html{background-color:#fff;color:#000;font-size:12px}
body,ul,ol,dl,dd,h1,h2,h3,h4,h5,h6,figure,form,fieldset,legend,input,textarea,button,p,blockquote,th,td,pre,xmp{margin:0;padding:0}
body,input,textarea,button,select,pre,xmp,tt,code,kbd,samp{font-family:tahoma,arial,"Hiragino Sans GB",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,small,big,input,textarea,button,select{font-size:100%}
h1,h2,h3,h4,h5,h6{font-family:tahoma,arial,"Hiragino Sans GB","微软雅黑",simsun,sans-serif}
h1,h2,h3,h4,h5,h6,b,strong{font-weight:normal}
address,cite,dfn,em,i,optgroup,var{font-style:normal}
table{border-collapse:collapse;border-spacing:0;text-align:left}
caption,th{text-align:inherit}
ul,ol,menu{list-style:none}
fieldset,img{border:0}
img,object,input,textarea,button,select{vertical-align:middle}
article,aside,footer,header,section,nav,figure,figcaption,hgroup,details,menu{display:block}
audio,canvas,video{display:inline-block;*display:inline;*zoom:1}
blockquote:before,blockquote:after,q:before,q:after{content:"\0020"}
textarea{overflow:auto;resize:vertical}
input,textarea,button,select,a{outline:0 none;border: none;}
button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0}
mark{background-color:transparent}
a,ins,s,u,del{text-decoration:none}
sup,sub{vertical-align:baseline}
html {overflow-x: hidden;height: 100%;font-size: 50px;-webkit-tap-highlight-color: transparent;}
body {font-family: Arial, "Microsoft Yahei", "Helvetica Neue", Helvetica, sans-serif;color: #333;font-size: .28em;-webkit-text-size-adjust: none;}
hr {height: .02rem;margin: .1rem 0;border: medium none;border-top: .02rem solid #cacaca;}
a {color: #25a4bb;text-decoration: none;}
```

参考:

+ [CSS-Tricks - 清楚默认样式](http://css-tricks.neatbang.com/reset/#reset)
