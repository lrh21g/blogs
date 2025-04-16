import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as n,d as h,e,w as k,r,o as p,a as i,b as s}from"./app-54gzBNNV.js";const d={};function g(A,a){const l=r("CodeDemo");return p(),n("div",null,[a[1]||(a[1]=h(`<h1 id="smil-动画" tabindex="-1"><a class="header-anchor" href="#smil-动画"><span>SMIL 动画</span></a></h1><p>SMIL 动画指在 SVG 集成了 Synchronized Multimedia Integration Language (SMIL) 这种动画标准，该语言被 SVG 原生支持，主要是使用标签来描述动画。SMIL 允许你：</p><ul><li>变动一个元素的数字属性（x、y……）</li><li>变动元素的变形属性（ <code>translation</code> 或 <code>rotation</code> ）</li><li>变动元素的颜色属性</li><li>物件方向与运动路径方向同步</li></ul><h2 id="animate-元素" tabindex="-1"><a class="header-anchor" href="#animate-元素"><span><code>&lt;animate&gt;</code> 元素</span></a></h2><p><code>&lt;animate&gt;</code> 元素放在形状元素（<code>&lt;rect&gt;</code> 、 <code>&lt;circle&gt;</code> 等）的内部，用来定义一个元素的某个属性如何踩着时点改变。在指定持续时间里，属性从开始值变成结束值。</p><ul><li><code>attributeName</code> : 变动的属性的属性名。</li><li><code>from</code> : 变动的初始值。</li><li><code>to</code> : 变动的终值。</li><li><code>dur</code> : 动画的持续时间（举个例子，写“5s”代表 5 秒表）</li><li><code>repeatCount</code> : 动画将发生的次数。</li><li><code>values</code> : 一个列表定义动画过程中的值序列的值。如果指定了此属性，则将忽略在元素上设置的任何 <code>from</code>, <code>to</code> 和 <code>by</code> 属性值.</li></ul><div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">svg</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> width</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;500px&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> height</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;500px&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> viewBox</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0 0 500 500&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">rect</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> x</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> y</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> width</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;100&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> height</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;100&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> fill</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;#feac5e&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    &lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">animate</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> attributeName</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;x&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> from</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;0&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> to</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;500&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> dur</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;2s&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> repeatCount</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;indefinite&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> /&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  &lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">rect</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">svg</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例"><span>实例</span></a></h2>`,8)),e(l,{id:"code-demo-70",type:"normal",code:"eJy9lM9v0zAUx/8Vk57bpE3TbktBYmM7cuLYi5c4iUXiRI7TdCAOiB/SGIULvzRV/LqwA1QIcWBCjH9mWbr/AqdN6nTtBkIIKZLt73t+9vP75N2WHOa50prUCXs2iLHJnMtdqaUF/a4EHIRth4l1D6N43e9zQQEKaLX4x9W+55KQaw5jwZosx3Fci9WaT225oSiKzON2pStdAkDHngx8cqlaBcnodfrk88nLvfGPj8mjg/TZd1CtFg6QYA8ydINCElo+9aYyAJAxircjhq5DD/Ez2cxBKlzYTpBZqM94ACH3oBuh7JoKUFX+6Y12PhM+28jGJHMJhWZGlCv1WrOkWdh1uWhRhG6VjqAoQJBt+BHJ3gwTE1mYYHEJucjOwNRw0ZloxCelWCGj/k1UnRVkweJiggwYTDKNiCnsRlafclbGzhkhS0hVFiKaMHQgpTBzr6+0l9p9ywrRhIj6LECeVVHWB/fSr2/T/fv5NpAMD8ajo2S0n2la+mEATt8Px7tfjg/3kt3B8bdBcnfITcnTV8njFwIBAUGxXqz+9ARx0VKVK83GirbV1CvXNtVNVdMrW+2NRkPVK/X11avaqp7by3uXVb+ov1ZrzannEPB7BgQFF1D+R5yfS/oS1uuqls+a2gL1F2c+T/6/ylw0gPHR4cm7h6fPf6ZvPv09AyU4lz4E51lvtmptTZ8j+7+n3pGn//60H8pZQ+xkHZKP0p1f5mm61g=="},{default:k(()=>a[0]||(a[0]=[i("div",{class:"language-html line-numbers-mode","data-highlighter":"shiki","data-ext":"html",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"<"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"svg"),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," width"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"65px"'),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," height"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"65px"'),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," viewBox"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"0 0 66 66"'),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," xmlns"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"http://www.w3.org/2000/svg"'),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"  <"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"g"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"    <!-- 实现旋转动画 -->")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    <"),i("span",{style:{"--shiki-light":"#000000","--shiki-dark":"#FFFFFF"}},"animateTransform")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      attributeName"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"transform"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      type"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"rotate"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      values"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"0 33 33;270 33 33"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      begin"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"0s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      dur"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"1.4s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      fill"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"freeze"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      repeatCount"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"indefinite"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    />")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    <"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"circle")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      fill"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"none"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      stroke-width"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"6"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      stroke-linecap"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"round"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      cx"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"33"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      cy"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"33"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      r"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"30"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      stroke-dasharray"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"187"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"      stroke-dashoffset"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"610"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    >")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"      <!-- 元素的 stroke 在设定的 5种 颜色之前不停的变化 -->")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"      <"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"animate")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        attributeName"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"stroke"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        values"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        begin"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"0s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        dur"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"5.6s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        fill"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"freeze"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        repeatCount"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"indefinite"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"      />")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"      <"),i("span",{style:{"--shiki-light":"#000000","--shiki-dark":"#FFFFFF"}},"animateTransform")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        attributeName"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"transform"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        type"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"rotate"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        values"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"0 33 33;135 33 33;450 33 33"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        begin"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"0s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        dur"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"1.4s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        fill"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"freeze"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        repeatCount"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"indefinite"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"      />")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"      <!-- 实现边框长短变化 -->")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"      <"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"animate")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        attributeName"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"stroke-dashoffset"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        values"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"187;46.75;187"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        begin"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"0s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        dur"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"1.4s"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        fill"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"freeze"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"        repeatCount"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"="),i("span",{style:{"--shiki-light":"#50A14F","--shiki-dark":"#98C379"}},'"indefinite"')]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"      />")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    </"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"circle"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"  </"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"g"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},">")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"</"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}},"svg"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},">")])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1)])),_:1})])}const y=t(d,[["render",g]]),o=JSON.parse('{"path":"/%E5%89%8D%E7%AB%AF/JavaScript/SVG/svgSMIL%E5%8A%A8%E7%94%BB.html","title":"SMIL 动画","lang":"zh-CN","frontmatter":{"category":"SVG","tag":["SVG","SMIL"],"description":"SMIL 动画 SMIL 动画指在 SVG 集成了 Synchronized Multimedia Integration Language (SMIL) 这种动画标准，该语言被 SVG 原生支持，主要是使用标签来描述动画。SMIL 允许你： 变动一个元素的数字属性（x、y……） 变动元素的变形属性（ translation 或 rotation ） ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SMIL 动画\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-28T08:18:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.LRH\\",\\"url\\":\\"https://lrh21g.github.io/blogs/\\"}]}"],["meta",{"property":"og:url","content":"https://lrh21g.github.io/blogs/%E5%89%8D%E7%AB%AF/JavaScript/SVG/svgSMIL%E5%8A%A8%E7%94%BB.html"}],["meta",{"property":"og:site_name","content":"Mr.LRH 博客"}],["meta",{"property":"og:title","content":"SMIL 动画"}],["meta",{"property":"og:description","content":"SMIL 动画 SMIL 动画指在 SVG 集成了 Synchronized Multimedia Integration Language (SMIL) 这种动画标准，该语言被 SVG 原生支持，主要是使用标签来描述动画。SMIL 允许你： 变动一个元素的数字属性（x、y……） 变动元素的变形属性（ translation 或 rotation ） ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-28T08:18:46.000Z"}],["meta",{"property":"article:tag","content":"SMIL"}],["meta",{"property":"article:tag","content":"SVG"}],["meta",{"property":"article:modified_time","content":"2025-02-28T08:18:46.000Z"}]]},"git":{"createdTime":1627163421000,"updatedTime":1740730726000,"contributors":[{"name":"lrh21g","username":"lrh21g","email":"837233792@qq.com","commits":4,"url":"https://github.com/lrh21g"},{"name":"lingronghai","username":"lingronghai","email":"lingronghai@foxmail.com","commits":3,"url":"https://github.com/lingronghai"},{"name":"lrh","username":"lrh","email":"lingronghai@foxmail.com","commits":1,"url":"https://github.com/lrh"}]},"readingTime":{"minutes":1.49,"words":448},"filePathRelative":"前端/JavaScript/SVG/svgSMIL动画.md","excerpt":"\\n<p>SMIL 动画指在 SVG 集成了 Synchronized Multimedia Integration Language (SMIL) 这种动画标准，该语言被 SVG 原生支持，主要是使用标签来描述动画。SMIL 允许你：</p>\\n<ul>\\n<li>变动一个元素的数字属性（x、y……）</li>\\n<li>变动元素的变形属性（ <code>translation</code> 或 <code>rotation</code> ）</li>\\n<li>变动元素的颜色属性</li>\\n<li>物件方向与运动路径方向同步</li>\\n</ul>\\n<h2><code>&lt;animate&gt;</code> 元素</h2>","autoDesc":true}');export{y as comp,o as data};
