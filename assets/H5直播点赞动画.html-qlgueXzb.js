import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as a,o as l,c as i,d as p,a as n,b as u,e as s}from"./app-VLgNDF8W.js";const r={},k=s('<h1 id="h5-直播点赞动画" tabindex="-1"><a class="header-anchor" href="#h5-直播点赞动画" aria-hidden="true">#</a> H5 直播点赞动画</h1><h2 id="css3-方式" tabindex="-1"><a class="header-anchor" href="#css3-方式" aria-hidden="true">#</a> CSS3 方式</h2><h3 id="css3-animation" tabindex="-1"><a class="header-anchor" href="#css3-animation" aria-hidden="true">#</a> CSS3 animation</h3><p><code>animation: name duration timing-function delay iteration-count direction fill-mode play-state;</code></p><ul><li><code>name</code> : <strong>animation-name</strong> , 规定需要绑定到选择器的 <code>@keyframe</code> （规定动画） 名称。</li><li><code>duration</code> : <strong>animation-duration</strong> , 规定完成动画所花费的时间，以秒或毫秒计。</li><li><code>timing-function</code> : <strong>animation-timing-function</strong> , 规定动画的速度曲线。 <ul><li><code>linear</code> : 动画从头到尾的速度是相同的。</li><li><code>ease</code> : 默认。动画以低速开始，然后加快，在结束前变慢。</li><li><code>ease-in</code> : 动画以低速开始。</li><li><code>ease-out</code> : 动画以低速结束。</li><li><code>ease-in-out</code> : 动画以低速开始和结束。</li><li><code>cubic-bezier(n,n,n,n)</code> : 在 <code>cubic-bezier</code> 函数中自己的值。可能的值是从 <code>0</code> 到 <code>1</code> 的数值。</li></ul></li><li><code>delay</code> : <strong>animation-delay</strong> , 规定在动画开始之前的延迟。单位可以是秒（s）或毫秒（ms）。</li><li><code>iteration-count</code> : <strong>animation-iteration-count</strong> , 规定动画应该播放的次数。 <ul><li><code>n</code> : 一个数字，定义应该播放多少次动画。</li><li><code>infinite</code> : 指定动画应该播放无限次（永远）。</li></ul></li><li><code>direction</code> : <strong>animation-direction</strong> , 规定是否应该轮流反向播放动画。 <ul><li><code>normal</code> : 默认值。动画按正常播放。</li><li><code>reverse</code> : 动画反向播放。</li><li><code>alternate</code> : 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。</li><li><code>alternate-reverse</code> : 动画在奇数次（1、3、5...）反向播放，在偶数次（2、4、6...）正向播放。</li><li><code>initial</code> : 设置该属性为它的默认值。</li><li><code>inherit</code> : 从父元素继承该属性。</li></ul></li><li><code>fill-mode</code> : <strong>animation-fill-mode</strong> , 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 <ul><li><code>none</code> : 默认值。动画在动画执行之前和之后不会应用任何样式到目标元素。</li><li><code>forwards</code> : 在动画结束后（由 <code>animation-iteration-count</code> 决定），动画将应用该属性值。</li><li><code>backwards</code> : 动画将应用在 <code>animation-delay</code> 定义期间启动动画的第一次迭代的关键帧中定义的属性值。这些都是 from 关键帧中的值（当 <code>animation-direction</code> 为 <code>normal</code> 或 <code>alternate</code> 时）或 to 关键帧中的值（当 <code>animation-direction</code> 为 <code>reverse</code> 或 <code>alternate-reverse</code> 时）。</li><li><code>both</code> : 动画遵循 forwards 和 backwards 的规则。也就是说，动画会在两个方向上扩展动画属性。</li><li><code>initial</code> : 设置该属性为它的默认值。请参阅 initial。</li><li><code>inherit</code> : 从父元素继承该属性。请参阅 inherit。</li></ul></li><li><code>play-state</code> : <strong>animation-play-state</strong> , 指定动画是否正在运行或已暂停。 <ul><li><code>paused</code> : 指定暂停动画</li><li><code>running</code> : 指定正在运行的动画</li></ul></li></ul><h3 id="css3-实现" tabindex="-1"><a class="header-anchor" href="#css3-实现" aria-hidden="true">#</a> CSS3 实现</h3>',6),d=s(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>/docs/.vuepress/components/live-praise-bubble
  | --- css3-render.vue
  | --- css3-render-style.scss
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>live-praise-bubble/css3-render.vue</summary><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>like-container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>praise-bubble<span class="token punctuation">&quot;</span></span> <span class="token attr-name">ref</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>praiseBubbleRef<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
        <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item in praiseBubbleList<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>\`bubble b\${item.bubbleBgIndex} bl\${item.bubbleAnimationIndex}\`<span class="token punctuation">&quot;</span></span>
        <span class="token attr-name">:data-current-time</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>item.currentTime<span class="token punctuation">&quot;</span></span>
      <span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>like-thumb<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>clickLikeThumb<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;LivePraiseBubbleCSS3Render&#39;</span><span class="token punctuation">,</span>
  <span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">praiseBubbleList</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">mounted</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// setInterval(() =&gt; {</span>
    <span class="token comment">//   this.addPraise();</span>
    <span class="token comment">// }, 300);</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clickLikeThumb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">addPraise</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">addPraise</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> bubbleBgIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">6</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> bubbleAnimationIndex <span class="token operator">=</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// bl1 - bl11</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>praiseBubbleList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        bubbleBgIndex<span class="token punctuation">,</span>
        bubbleAnimationIndex<span class="token punctuation">,</span>
        <span class="token literal-property property">currentTime</span><span class="token operator">:</span> <span class="token function">String</span><span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token atrule"><span class="token rule">@import</span> <span class="token string">&#39;./css3-render-style.scss&#39;</span><span class="token punctuation">;</span></span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>live-praise-bubble/css3-render-style.scss</summary><div class="language-scss line-numbers-mode" data-ext="scss"><pre class="language-scss"><code><span class="token property"><span class="token variable">$bubble_time</span></span><span class="token punctuation">:</span> 3s<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$bubble_scale</span></span><span class="token punctuation">:</span> 0.8s<span class="token punctuation">;</span>

<span class="token selector">.like-container </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f4f4f4<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.like-thumb </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #000000<span class="token punctuation">,</span> <span class="token property"><span class="token variable">$alpha</span></span><span class="token punctuation">:</span> 0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span>./images/like.png<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-repeat</span><span class="token punctuation">:</span> no-repeat<span class="token punctuation">;</span>
  <span class="token property">background-position</span><span class="token punctuation">:</span> center center<span class="token punctuation">;</span>
  <span class="token property">background-size</span><span class="token punctuation">:</span> 30px 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.praise-bubble </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.bubble </span><span class="token punctuation">{</span>
  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 40px<span class="token punctuation">;</span>
  <span class="token property">left</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">bottom</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
  <span class="token property">background-repeat</span><span class="token punctuation">:</span> no-repeat<span class="token punctuation">;</span>
  <span class="token property">background-size</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">transform-origin</span><span class="token punctuation">:</span> bottom<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.b1 </span><span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span>./images/bg1.png<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 可以使用雪碧图</span>
  <span class="token comment">// background-position: -42px -107px;</span>
  <span class="token comment">// background-size: 188.5px 147px;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b2 </span><span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span>./images/bg2.png<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// background-position: -84px -107px;</span>
  <span class="token comment">// background-size: 188.5px 147px;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b3 </span><span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span>./images/bg3.png<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// background-position: 0 -107px;</span>
  <span class="token comment">// background-size: 188.5px 147px;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b4 </span><span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span>./images/bg4.png<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// background-position: -45px -62px;</span>
  <span class="token comment">// background-size: 188.5px 147px;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b5 </span><span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span>./images/bg5.png<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// background-position: -107px -42px;</span>
  <span class="token comment">// background-size: 188.5px 147px;</span>
<span class="token punctuation">}</span>
<span class="token selector">.b6 </span><span class="token punctuation">{</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url">url</span><span class="token punctuation">(</span>./images/bg6.png<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// background-position: -107px 0;</span>
  <span class="token comment">// background-size: 188.5px 147px;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl1 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_1 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_1 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl2 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_2 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_2 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl3 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_3 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_1 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl4 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_4 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_2 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl5 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_5 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_1 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl6 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_6 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_3 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl7 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_7 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_1 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl8 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_8 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_3 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl9 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_9 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_2 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl10 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_10 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_1 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.bl11 </span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span> bubble_11 <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_big_2 <span class="token variable">$bubble_scale</span> linear 1 forwards<span class="token punctuation">,</span>
    bubble_y <span class="token variable">$bubble_time</span> linear 1 forwards<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_11</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -18px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_10</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_9</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_8</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_7</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 2px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 3px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_6</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -3px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -1px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -2px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -3px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_5</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_4</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_3</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_2</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 25px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 5px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_1</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
  <span class="token punctuation">}</span>
  <span class="token selector">25% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -8px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">50% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 8px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> -15px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-left</span><span class="token punctuation">:</span> 15px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_big_1</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.3<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1.2<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_big_2</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.3<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.9<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_big_3</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.3<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.6<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_y</span> <span class="token punctuation">{</span>
  <span class="token selector">0% </span><span class="token punctuation">{</span>
    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">10% </span><span class="token punctuation">{</span>
    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">75% </span><span class="token punctuation">{</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token selector">100% </span><span class="token punctuation">{</span>
    <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span>
    <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li><p>使用 animation 添加运动渐隐的效果</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.bl1</span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span>bubble_y 4s linear 1 forwards <span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_y</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span> <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token selector">75%</span><span class="token punctuation">{</span> <span class="token property">opacity</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span> <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span> <span class="token property">opacity</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>增加动画放大效果</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">.bl1</span><span class="token punctuation">{</span>
  <span class="token property">animation</span><span class="token punctuation">:</span>bubble_big 0.5s linear 1 forwards<span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
<span class="token atrule"><span class="token rule">@keyframes</span> bubble_big_1</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>.3<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span> <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>设置偏移</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token atrule"><span class="token rule">@keyframes</span> bubble_1</span> <span class="token punctuation">{</span>
  <span class="token selector">0%</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token selector">25%</span> <span class="token punctuation">{</span> <span class="token property">margin-left</span><span class="token punctuation">:</span> -8px<span class="token punctuation">;</span> <span class="token punctuation">}</span>
  <span class="token selector">50%</span> <span class="token punctuation">{</span> <span class="token property">margin-left</span><span class="token punctuation">:</span> 8px <span class="token punctuation">}</span>
  <span class="token selector">75%</span> <span class="token punctuation">{</span> <span class="token property">margin-left</span><span class="token punctuation">:</span> -15px <span class="token punctuation">}</span>
  <span class="token selector">100%</span> <span class="token punctuation">{</span> <span class="token property">margin-left</span><span class="token punctuation">:</span> 15px <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>补齐动画样式。通过调整缩放、偏移值，预设更多中的曲线，达到随机轨迹的目的。</p></li><li><p>通过 JavaScript 操作，随机组合点赞的样式，然后渲染到节点上。同时注意设置 bubble （气泡） 的随机延迟，保证不扎堆出现。</p></li></ul><p>注意：</p><ul><li><p>当用户同时下发了点赞40个，业务需要这40个点赞一次出现，制造持续点赞的氛围，则需要分批打散点赞数量。比如一次点赞的时间是 4s，那么 4s 内，需要同时出现多少个点赞。如果是 10 个，那么 40 个，需要分批 4 次渲染。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function">requestAnimationFrame</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 继续循环处理批次</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>需要手动清楚节点，以防节点过多带来的性能问题。</p></li></ul><h2 id="canvas-方式" tabindex="-1"><a class="header-anchor" href="#canvas-方式" aria-hidden="true">#</a> Canvas 方式</h2>`,7),v=s(`<div class="language-markdown line-numbers-mode" data-ext="md"><pre class="language-markdown"><code>/docs/.vuepress/components/live-praise-bubble
  | --- canvas-render.vue
  | --- canvas-praise-bubble.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>live-praise-bubble/canvas-render.vue</summary><div class="language-vue line-numbers-mode" data-ext="vue"><pre class="language-vue"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>like-container<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>canvas</span>
      <span class="token attr-name">id</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>thumsCanvas<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>200<span class="token punctuation">&quot;</span></span>
      <span class="token attr-name">height</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>400<span class="token punctuation">&quot;</span></span>
      <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span>100px<span class="token punctuation">;</span><span class="token property">height</span><span class="token punctuation">:</span>200px</span><span class="token punctuation">&quot;</span></span></span>
    <span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>canvas</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>like-thumb<span class="token punctuation">&quot;</span></span> <span class="token attr-name">@click</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>clickLikeThumb<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">
<span class="token keyword">import</span> ThumbsUpAni <span class="token keyword">from</span> <span class="token string">&#39;./canvas-praise-bubble.js&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;LivePraiseBubbleCanvasRender&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">methods</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">clickLikeThumb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> thumbsUpAni <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ThumbsUpAni</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        thumbsUpAni<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>scss<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span><span class="token style"><span class="token language-css">
<span class="token selector">.like-container</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px 0<span class="token punctuation">;</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-direction</span><span class="token punctuation">:</span> column<span class="token punctuation">;</span>
  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> #f4f4f4<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.like-thumb</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
  <span class="token property">border-radius</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>$<span class="token property">color</span><span class="token punctuation">:</span> #000000<span class="token punctuation">,</span> $<span class="token property">alpha</span><span class="token punctuation">:</span> 0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>./images/like.png<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
  <span class="token property">background-repeat</span><span class="token punctuation">:</span> no-repeat<span class="token punctuation">;</span>
  <span class="token property">background-position</span><span class="token punctuation">:</span> center center<span class="token punctuation">;</span>
  <span class="token property">background-size</span><span class="token punctuation">:</span> 30px 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,2),b={class:"hint-container details"},m=s(`<summary>live-praise-bubble/canvas-praise-bubble.js</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token parameter">min<span class="token punctuation">,</span> max</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> min <span class="token operator">+</span> Math<span class="token punctuation">.</span><span class="token function">floor</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span>max <span class="token operator">-</span> min <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ThumbsUpAni</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadImages</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 预加载图片</span>

    <span class="token comment">// 读取 canvas</span>
    <span class="token keyword">const</span> canvas <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;thumsCanvas&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> canvas<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token string">&#39;2d&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">=</span> canvas<span class="token punctuation">.</span>width<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">=</span> canvas<span class="token punctuation">.</span>height<span class="token punctuation">;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>imgsList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 点赞图像列表</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>renderList <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// 渲染对象雷彪</span>
    <span class="token comment">// scaleTime - 百分比。图片从开始放大到最终大小，所用时长。</span>
    <span class="token comment">// 设置为 0.1 ，表示总共运行时间前面的 10% 的时间，点赞图片逐步放大</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>scaleTime <span class="token operator">=</span> <span class="token number">0.1</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>scanning <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span> <span class="token comment">// 扫描器扫描标识，防止开启多个扫描器</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 预加载图片，获取图片宽高，如果某一图片加载失败，则不显示该图片</span>
  <span class="token function">loadImages</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> images <span class="token operator">=</span> <span class="token punctuation">[</span>
      <span class="token string">&#39;jfs/t1/93992/8/9049/4680/5e0aea04Ec9dd2be8/608efd890fd61486.png&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;jfs/t1/108305/14/2849/4908/5e0aea04Efb54912c/bfa59f27e654e29c.png&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;jfs/t1/98805/29/8975/5106/5e0aea05Ed970e2b4/98803f8ad07147b9.png&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;jfs/t1/94291/26/9105/4344/5e0aea05Ed64b9187/5165fdf5621d5bbf.png&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;jfs/t1/102753/34/8504/5522/5e0aea05E0b9ef0b4/74a73178e31bd021.png&#39;</span><span class="token punctuation">,</span>
      <span class="token string">&#39;jfs/t1/102954/26/9241/5069/5e0aea05E7dde8bda/720fcec8bc5be9d4.png&#39;</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> promiseAll <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    images<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">src</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> p <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">resolve</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> img <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Image</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span>onerror <span class="token operator">=</span> img<span class="token punctuation">.</span>onload <span class="token operator">=</span> <span class="token function">resolve</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> img<span class="token punctuation">)</span><span class="token punctuation">;</span>
        img<span class="token punctuation">.</span>src <span class="token operator">=</span> <span class="token string">&#39;https://img12.360buyimg.com/img/&#39;</span> <span class="token operator">+</span> src<span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      promiseAll<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>p<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span>promiseAll<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">imgsList</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>imgsList <span class="token operator">=</span> imgsList<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">d</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>d <span class="token operator">&amp;&amp;</span> d<span class="token punctuation">.</span>width <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgsList<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">dLog</span><span class="token punctuation">(</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;imgsList load all error&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token function">createRender</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>imgsList<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>

    <span class="token comment">// 当运行时间 diffTime 小于设置的 scaleTime 的时候，按比例随着时间增大，scale 变大。超过设置的时间阈值，则返回最终大小。</span>
    <span class="token keyword">const</span> basicScale <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0.6</span><span class="token punctuation">,</span> <span class="token number">0.9</span><span class="token punctuation">,</span> <span class="token number">1.2</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getScale</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">diffTime</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// diffTime - 百分比。表示从动画开始运行到当前时间过了多长时间。实际值是从 0 --&gt; 1 逐步增大。</span>
      <span class="token comment">// scaleTime - 百分比。图片从开始放大到最终大小，所用时长。</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>diffTime <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>scaleTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token operator">+</span><span class="token punctuation">(</span>diffTime <span class="token operator">/</span> <span class="token keyword">this</span><span class="token punctuation">.</span>scaleTime<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">*</span> basicScale<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> basicScale<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">const</span> context <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">;</span>
    <span class="token comment">// 随机读取一个图片，进行渲染</span>
    <span class="token keyword">const</span> image <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>imgsList<span class="token punctuation">[</span><span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>imgsList<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> offset <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span> <span class="token comment">// x轴偏移量</span>
    <span class="token keyword">const</span> basicX <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token operator">-</span>offset<span class="token punctuation">,</span> offset<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> angle <span class="token operator">=</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 角度系数</span>
    <span class="token keyword">let</span> ratio <span class="token operator">=</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">1</span> <span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 随机平滑 X 轴偏移 - 通过正弦( Math.sin )函数来实现均匀曲线</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getTranslateX</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">diffTime</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>diffTime <span class="token operator">&lt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>scaleTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 放大期间，不进行摇摆位移</span>
        <span class="token keyword">return</span> basicX<span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> basicX <span class="token operator">+</span> ratio <span class="token operator">*</span> Math<span class="token punctuation">.</span><span class="token function">sin</span><span class="token punctuation">(</span>angle <span class="token operator">*</span> <span class="token punctuation">(</span>diffTime <span class="token operator">-</span> <span class="token keyword">this</span><span class="token punctuation">.</span>scaleTime<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// Y 轴偏移 - 运行偏移从 this.height --&gt; image.height / 2 ，即从最底部，运行到顶部留下。</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getTranslateY</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">diffTime</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token punctuation">(</span>
        image<span class="token punctuation">.</span>height <span class="token operator">/</span> <span class="token number">2</span> <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>height <span class="token operator">-</span> image<span class="token punctuation">.</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">-</span> diffTime<span class="token punctuation">)</span>
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token comment">// 淡出</span>
    <span class="token keyword">const</span> fadeOutStage <span class="token operator">=</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">18</span><span class="token punctuation">)</span> <span class="token operator">/</span> <span class="token number">100</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> <span class="token function-variable function">getAlpha</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">diffTime</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> left <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">-</span> <span class="token operator">+</span>diffTime<span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">&gt;</span> fadeOutStage<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">1</span> <span class="token operator">-</span> <span class="token operator">+</span><span class="token punctuation">(</span><span class="token punctuation">(</span>fadeOutStage <span class="token operator">-</span> left<span class="token punctuation">)</span> <span class="token operator">/</span> fadeOutStage<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toFixed</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token parameter">diffTime</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// diffTime : 百分比。表示从动画开始运行到当前时间过了多长时间。实际值是从 0 --&gt; 1 逐步增大。</span>
      <span class="token comment">// diffTime 为 0.4 的时候，说明是已经运行了 40% 的时间</span>
      <span class="token comment">// 时间差值满了，即：动画结束了（0 --&gt; 1）</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>diffTime <span class="token operator">&gt;=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

      context<span class="token punctuation">.</span><span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      <span class="token keyword">const</span> scale <span class="token operator">=</span> <span class="token function">getScale</span><span class="token punctuation">(</span>diffTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token comment">// const rotate = getRotate();</span>
      <span class="token keyword">const</span> translateX <span class="token operator">=</span> <span class="token function">getTranslateX</span><span class="token punctuation">(</span>diffTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">const</span> translateY <span class="token operator">=</span> <span class="token function">getTranslateY</span><span class="token punctuation">(</span>diffTime<span class="token punctuation">)</span><span class="token punctuation">;</span>
      context<span class="token punctuation">.</span><span class="token function">translate</span><span class="token punctuation">(</span>translateX<span class="token punctuation">,</span> translateY<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 偏移</span>
      context<span class="token punctuation">.</span><span class="token function">scale</span><span class="token punctuation">(</span>scale<span class="token punctuation">,</span> scale<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 缩放</span>
      <span class="token comment">// context.rotate(rotate * Math.PI / 180);</span>
      context<span class="token punctuation">.</span>globalAlpha <span class="token operator">=</span> <span class="token function">getAlpha</span><span class="token punctuation">(</span>diffTime<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 淡出</span>

      <span class="token comment">// 绘制</span>
      context<span class="token punctuation">.</span><span class="token function">drawImage</span><span class="token punctuation">(</span>
        image<span class="token punctuation">,</span>
        <span class="token operator">-</span>image<span class="token punctuation">.</span>width <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span>
        <span class="token operator">-</span>image<span class="token punctuation">.</span>height <span class="token operator">/</span> <span class="token number">2</span><span class="token punctuation">,</span>
        image<span class="token punctuation">.</span>width<span class="token punctuation">,</span>
        image<span class="token punctuation">.</span>height
      <span class="token punctuation">)</span><span class="token punctuation">;</span>
      context<span class="token punctuation">.</span><span class="token function">restore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 恢复画布(canvas)状态。</span>
    <span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 实时绘制扫描器</span>
  <span class="token comment">// 开启实时绘制扫描器，将创建的渲染对象放入 renderList 数组，数组不为空，说明 canvas 上还有动画，就需要不停的去执行 scan，直到 canvas 上没有动画结束为止。</span>
  <span class="token function">scan</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span><span class="token function">clearRect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>width<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>height<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span>fillStyle <span class="token operator">=</span> <span class="token string">&#39;#f4f4f4&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span><span class="token function">fillRect</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">200</span><span class="token punctuation">,</span> <span class="token number">400</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">let</span> index <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">let</span> length <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>renderList<span class="token punctuation">.</span>length<span class="token punctuation">;</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">requestFrame</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>scanning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>scanning <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// diffTime = (Date.now() - render.timestamp) / render.duration</span>
    <span class="token comment">// 如果开始的时间戳是 10000，当前是100100，则说明已经运行了 100 毫秒了，如果动画本来需要执行 1000 毫秒，那么 diffTime = 0.1，代表动画已经运行了 10%。</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>index <span class="token operator">&lt;</span> length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> child <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>renderList<span class="token punctuation">[</span>index<span class="token punctuation">]</span><span class="token punctuation">;</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token operator">!</span>child <span class="token operator">||</span>
        <span class="token operator">!</span>child<span class="token punctuation">.</span>render <span class="token operator">||</span>
        child<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token punctuation">(</span>Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> child<span class="token punctuation">.</span>timestamp<span class="token punctuation">)</span> <span class="token operator">/</span> child<span class="token punctuation">.</span>duration<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 动画结束，则删除该动画</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>renderList<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>index<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        length<span class="token operator">--</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 继续执行动画</span>
        index<span class="token operator">++</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 开始/增加动画</span>
  <span class="token comment">// 调用一次 start 方法来生成渲染实例，放进渲染实例数组。</span>
  <span class="token comment">// 如果当前扫描器未开启，则需要启动扫描器，使用了 scanning 变量，防止开启多个扫描器。</span>
  <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> render <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">createRender</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> duration <span class="token operator">=</span> <span class="token function">getRandom</span><span class="token punctuation">(</span><span class="token number">1500</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>renderList<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      render<span class="token punctuation">,</span>
      duration<span class="token punctuation">,</span>
      <span class="token literal-property property">timestamp</span><span class="token operator">:</span> Date<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>scanning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>scanning <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token function">requestFrame</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">scan</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">requestFrame</span><span class="token punctuation">(</span><span class="token parameter">cb</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    window<span class="token punctuation">.</span>requestAnimationFrame <span class="token operator">||</span>
    window<span class="token punctuation">.</span>webkitRequestAnimationFrame <span class="token operator">||</span>
    <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      window<span class="token punctuation">.</span><span class="token function">setTimeout</span><span class="token punctuation">(</span>callback<span class="token punctuation">,</span> <span class="token number">1000</span> <span class="token operator">/</span> <span class="token number">60</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">(</span>cb<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>`,3),g={href:"https://mp.weixin.qq.com/s/bAF4BgEe8mBjkpGKpRsH7A",target:"_blank",rel:"noopener noreferrer"};function f(y,h){const t=a("animation-live-praise-bubble-css3-render"),e=a("animation-live-praise-bubble-canvas-render"),c=a("ExternalLinkIcon");return l(),i("div",null,[k,p(t),d,p(e),v,n("details",b,[m,n("ul",null,[n("li",null,[n("a",g,[u("H5 直播的疯狂点赞动画是如何实现的？"),p(c)])])])])])}const _=o(r,[["render",f],["__file","H5直播点赞动画.html.vue"]]);export{_ as default};
