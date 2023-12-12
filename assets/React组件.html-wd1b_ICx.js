import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as t,c as o,e as a,a as n,b as s}from"./app-VLgNDF8W.js";const c={},l=a(`<h1 id="react-组件" tabindex="-1"><a class="header-anchor" href="#react-组件" aria-hidden="true">#</a> React 组件</h1><p>React 组件可以定义为 <code>class</code> 组件 或 函数组件 两种形式。</p><p>React 组件本质上就是类和函数，与常规的类和函数不同的是，组件承载了渲染视图的 UI 和更新视图的 <code>setState</code> 、 <code>useState</code> 等方法。</p><p>React 在底层逻辑上会像正常实例化类和正常执行函数那样处理的组件。因此，函数与类上的特性在 React 组件上同样具有，比如原型链，继承，静态属性等。</p><details class="hint-container details"><summary>类组件与函数组件示例</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 类组件</span>
<span class="token keyword">class</span> <span class="token class-name">Welcome</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Hello World!</span><span class="token template-punctuation string">\`</span></span> <span class="token punctuation">}</span>
  <span class="token function-variable function">sayHelloJs</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">&#39;Hello JavaScript!&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">marginTop</span><span class="token operator">:</span> <span class="token string">&#39;20px&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>sayHelloJs<span class="token punctuation">}</span><span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>message<span class="token punctuation">}</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 函数组件</span>
<span class="token keyword">function</span> <span class="token function">FunComponent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>message<span class="token punctuation">,</span> setMessage<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;Hello World!&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setMessage</span><span class="token punctuation">(</span><span class="token string">&#39;Hello JavaScript!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token punctuation">{</span>message<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="类组件" tabindex="-1"><a class="header-anchor" href="#类组件" aria-hidden="true">#</a> 类组件</h2><h3 id="类组件的组成部分" tabindex="-1"><a class="header-anchor" href="#类组件的组成部分" aria-hidden="true">#</a> 类组件的组成部分</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Welcome</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>arg</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 执行 react 底层 Component 函数 */</span>
    <span class="token comment">/* 如果在 super 中，没有传入相关参数（例如：props），则在 constructor 执行上下文中就获取不到 props */</span>
    <span class="token comment">/* 因为绑定 props 是在父类 Component 构造函数中，执行 super 等于执行 Component 函数，此时 props 没有作为第一个参数传给 super() ，在 Component 中就会找不到 props 参数 */</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token operator">...</span>arg<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">/* state */</span>
  <span class="token keyword">static</span> number <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">/* 内置静态属性 */</span>

  <span class="token comment">/* 生命周期 */</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 在组件挂载后（插入 DOM 树中）立即调用</span>
  <span class="token function">componentDidUpdate</span><span class="token punctuation">(</span><span class="token parameter">prevProps<span class="token punctuation">,</span> prevState<span class="token punctuation">,</span> snapshot</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 在更新后会被立即调用</span>
  <span class="token function">componentWillUnmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 在组件卸载及销毁之前直接调用</span>
  <span class="token comment">// ... 省略其他的生命周期函数的执行</span>

  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;handleClick&#39;</span><span class="token punctuation">)</span> <span class="token comment">/* 方法：箭头函数方法直接绑定在 this 实例上 */</span>
  <span class="token punctuation">}</span>

  <span class="token comment">/* 渲染函数 */</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token punctuation">{</span><span class="token comment">/* 触发 onClick 之后，此时输出结果为 handleClick，因为实例对象上方法属性 &gt; 原型链对象上方法属性 */</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span>div style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">marginTop</span><span class="token operator">:</span> <span class="token string">&#39;50px&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">}</span> onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handerClick<span class="token punctuation">}</span><span class="token operator">&gt;</span>
        hello<span class="token punctuation">,</span>React<span class="token operator">!</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">/* 外置静态属性 */</span>
Welcome<span class="token punctuation">.</span>number1 <span class="token operator">=</span> <span class="token number">2</span>
<span class="token comment">/* 方法: 绑定在 Welcome 原型链上的方法*/</span>
<span class="token class-name">Welcome</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Welcome.prototype.handleClick&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类组件的继承" tabindex="-1"><a class="header-anchor" href="#类组件的继承" aria-hidden="true">#</a> 类组件的继承</h3><p>在类组件的继承中，<code>state</code> 和生命周期会被继承后的组件修改。</p><blockquote><p>在 Facebook，我们在成百上千个组件中使用 React。我们并没有发现需要使用继承来构建组件层次的情况。</p><p>Props 和组合提供了清晰而安全地定制组件外观和行为的灵活方式。注意：组件可以接受任意 props，包括基本数据类型，React 元素以及函数。</p><p>想要在组件间复用非 UI 的功能，建议将其提取为一个单独的 JavaScript 模块，如函数、对象或者类。组件可以直接引入（import）而无需通过 extend 继承它们。</p></blockquote><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>

<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// componentDidMount : 在组件挂载后（插入 DOM 树中）立即调用</span>
  <span class="token comment">// 被继承后，componentDidMount 生命周期将不会被执行</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Person componentDidMount&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;person&quot;</span><span class="token operator">&gt;</span>Person Class Component<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Programmer</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// componentDidMount : 在组件挂载后（插入 DOM 树中）立即调用</span>
  <span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Programmer componentDidMount&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;programmer&quot;</span><span class="token operator">&gt;</span>
        <span class="token punctuation">{</span><span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>Programmer Class Component<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类组件的实现" tabindex="-1"><a class="header-anchor" href="#类组件的实现" aria-hidden="true">#</a> 类组件的实现</h3>`,13),p=n("ul",null,[n("li",null,[n("p",null,[s("在 "),n("code",null,"beginWork(current, workInProgress, renderLanes)"),s(" （创建当前节点的子 "),n("code",null,"Fiber"),s(" 节点）中，通过 "),n("code",null,"case ClassComponent"),s(" 调用 "),n("code",null,"updateClassComponent"),s(" 对未初始化的类组件进行初始化，对已初始化的组件更新重用。")]),n("details",{class:"hint-container details"},[n("summary",null,"【beginWork】函数: 创建当前节点的子 Fiber 节点"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberBeginWork.old.js"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"beginWork"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"current"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token keyword"},"switch"),s(),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},"."),s("tag"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"IndeterminateComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"LazyComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"FunctionComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"ClassComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"const"),s(" Component "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`type
      `),n("span",{class:"token keyword"},"const"),s(" unresolvedProps "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`pendingProps
      `),n("span",{class:"token keyword"},"const"),s(" resolvedProps "),n("span",{class:"token operator"},"="),s(`
        workInProgress`),n("span",{class:"token punctuation"},"."),s("elementType "),n("span",{class:"token operator"},"==="),s(` Component
          `),n("span",{class:"token operator"},"?"),s(` unresolvedProps
          `),n("span",{class:"token operator"},":"),s(),n("span",{class:"token function"},"resolveDefaultProps"),n("span",{class:"token punctuation"},"("),s("Component"),n("span",{class:"token punctuation"},","),s(" unresolvedProps"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"updateClassComponent"),n("span",{class:"token punctuation"},"("),s(`
        current`),n("span",{class:"token punctuation"},","),s(`
        workInProgress`),n("span",{class:"token punctuation"},","),s(`
        Component`),n("span",{class:"token punctuation"},","),s(`
        resolvedProps`),n("span",{class:"token punctuation"},","),s(`
        renderLanes
      `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"HostRoot"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"HostComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token comment"},"// .."),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token comment"},"// ..."),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("details",{class:"hint-container details"},[n("summary",null,"【updateClassComponent】函数：对未初始化的类组件进行初始化，对已初始化的组件更新重用"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberBeginWork.old.js"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"updateClassComponent"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"current"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"Component"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"nextProps"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// Push context providers early to prevent context stack mismatches."),s(`
  `),n("span",{class:"token comment"},"// During mounting we don't know the child context yet as the instance doesn't exist."),s(`
  `),n("span",{class:"token comment"},"// We will invalidate the child context in finishClassComponent() right after rendering."),s(`
  `),n("span",{class:"token keyword"},"let"),s(` hasContext
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"isLegacyContextProvider"),n("span",{class:"token punctuation"},"("),s("Component"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    hasContext `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"true"),s(`
    `),n("span",{class:"token function"},"pushLegacyContextProvider"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    hasContext `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"false"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token function"},"prepareToReadContext"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" instance "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`stateNode
  `),n("span",{class:"token keyword"},"let"),s(` shouldUpdate
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("instance "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"resetSuspendedCurrentOnMountInLegacyMode"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},")"),s(`

    `),n("span",{class:"token comment"},"// In the initial pass we might need to construct the instance."),s(`
    `),n("span",{class:"token function"},"constructClassInstance"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" Component"),n("span",{class:"token punctuation"},","),s(" nextProps"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token function"},"mountClassInstance"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" Component"),n("span",{class:"token punctuation"},","),s(" nextProps"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
    shouldUpdate `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"true"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("current "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// In a resume, we'll already have an instance we can reuse."),s(`
    shouldUpdate `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"resumeMountClassInstance"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      Component`),n("span",{class:"token punctuation"},","),s(`
      nextProps`),n("span",{class:"token punctuation"},","),s(`
      renderLanes
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    shouldUpdate `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"updateClassInstance"),n("span",{class:"token punctuation"},"("),s(`
      current`),n("span",{class:"token punctuation"},","),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      Component`),n("span",{class:"token punctuation"},","),s(`
      nextProps`),n("span",{class:"token punctuation"},","),s(`
      renderLanes
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token keyword"},"const"),s(" nextUnitOfWork "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"finishClassComponent"),n("span",{class:"token punctuation"},"("),s(`
    current`),n("span",{class:"token punctuation"},","),s(`
    workInProgress`),n("span",{class:"token punctuation"},","),s(`
    Component`),n("span",{class:"token punctuation"},","),s(`
    shouldUpdate`),n("span",{class:"token punctuation"},","),s(`
    hasContext`),n("span",{class:"token punctuation"},","),s(`
    renderLanes
  `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token keyword"},"return"),s(` nextUnitOfWork
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("li",null,[n("p",null,[s("在 "),n("code",null,"updateClassComponent"),s(" 函数中：")]),n("ul",null,[n("li",null,[n("p",null,[s("未创建类组件实例，则表示第一渲染（即："),n("code",null,"instance === null"),s("）")]),n("ul",null,[n("li",null,[n("p",null,[s("调用 "),n("code",null,"constructClassInstance(workInProgress, Component, nextProps)"),s(" 函数，通过 "),n("code",null,"let instance = new ctor(props, context)"),s(" 执行构造函数，并返回类组件实例 "),n("code",null,"instance")]),n("details",{class:"hint-container details"},[n("summary",null,"【constructClassInstance】函数：创建一个类组件实例 instance"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{js:"",class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberClassComponent.old.js"),s(`

`),n("span",{class:"token keyword"},"const"),s(" classComponentUpdater "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),s(`
  isMounted`),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token function"},"enqueueSetState"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("inst"),n("span",{class:"token punctuation"},","),s(" payload"),n("span",{class:"token punctuation"},","),s(" callback")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token function"},"enqueueReplaceState"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("inst"),n("span",{class:"token punctuation"},","),s(" payload"),n("span",{class:"token punctuation"},","),s(" callback")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token function"},"enqueueForceUpdate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("inst"),n("span",{class:"token punctuation"},","),s(" callback")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token punctuation"},"}"),n("span",{class:"token punctuation"},","),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"adoptClassInstance"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"instance"),n("span",{class:"token operator"},":"),s(" any")]),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// 类组件实例设置 updater"),s(`
  `),n("span",{class:"token comment"},"// 组件中调用 setState 和 forceUpdate 本质上是调用了 updater 对象上的 enqueueSetState 和 enqueueForceUpdate 方法"),s(`
  instance`),n("span",{class:"token punctuation"},"."),s("updater "),n("span",{class:"token operator"},"="),s(` classComponentUpdater
  workInProgress`),n("span",{class:"token punctuation"},"."),s("stateNode "),n("span",{class:"token operator"},"="),s(` instance
  `),n("span",{class:"token comment"},"// The instance needs access to the fiber so that it can schedule updates"),s(`
  `),n("span",{class:"token function"},"setInstance"),n("span",{class:"token punctuation"},"("),s("instance"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"constructClassInstance"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"ctor"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"props"),n("span",{class:"token operator"},":"),s(" any")]),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" any "),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// ..."),s(`

  `),n("span",{class:"token keyword"},"let"),s(" instance "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"ctor"),n("span",{class:"token punctuation"},"("),s("props"),n("span",{class:"token punctuation"},","),s(" context"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" state "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},"."),s("memoizedState "),n("span",{class:"token operator"},"="),s(`
    instance`),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(" instance"),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"undefined"),s(`
      `),n("span",{class:"token operator"},"?"),s(" instance"),n("span",{class:"token punctuation"},"."),s(`state
      `),n("span",{class:"token operator"},":"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token function"},"adoptClassInstance"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" instance"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token comment"},"// Cache unmasked context so we can avoid recreating masked context unless necessary."),s(`
  `),n("span",{class:"token comment"},"// ReactFiberContext usually updates this cache but can't for newly-created instances."),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("isLegacyContextConsumer"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"cacheContext"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" unmaskedContext"),n("span",{class:"token punctuation"},","),s(" context"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"return"),s(` instance
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("details",{class:"hint-container details"},[n("summary",null,"【Component】构造函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react\\src\\ReactBaseClasses.js"),s(`

`),n("span",{class:"token doc-comment comment"},`/**
 * Base class helpers for the updating state of a component.
 */`),s(`
`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"Component"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("props"),n("span",{class:"token punctuation"},","),s(" context"),n("span",{class:"token punctuation"},","),s(" updater")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("props "),n("span",{class:"token operator"},"="),s(` props
  `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("context "),n("span",{class:"token operator"},"="),s(` context
  `),n("span",{class:"token comment"},"// If a component has string refs, we will assign a different object later."),s(`
  `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("refs "),n("span",{class:"token operator"},"="),s(` emptyObject
  `),n("span",{class:"token comment"},"// We initialize the default updater but the real one gets injected by the"),s(`
  `),n("span",{class:"token comment"},"// renderer."),s(`
  `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("updater "),n("span",{class:"token operator"},"="),s(" updater "),n("span",{class:"token operator"},"||"),s(` ReactNoopUpdateQueue
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token class-name"},"Component"),n("span",{class:"token punctuation"},"."),s("prototype"),n("span",{class:"token punctuation"},"."),s("isReactComponent "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"{"),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token doc-comment comment"},[s(`/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat \`this.state\` as immutable.
 *
 * There is no guarantee that \`this.state\` will be immediately updated, so
 * accessing \`this.state\` after calling this method may return the old value.
 *
 * There is no guarantee that calls to \`setState\` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * `),n("span",{class:"token keyword"},"@param"),s(),n("span",{class:"token class-name"},[n("span",{class:"token punctuation"},"{"),s("object"),n("span",{class:"token operator"},"|"),n("span",{class:"token keyword"},"function"),n("span",{class:"token punctuation"},"}")]),s(),n("span",{class:"token parameter"},"partialState"),s(` Next partial state or function to
 *        produce next partial state to be merged with current state.
 * `),n("span",{class:"token keyword"},"@param"),s(),n("span",{class:"token class-name"},[n("span",{class:"token punctuation"},"{"),n("span",{class:"token operator"},"?"),n("span",{class:"token keyword"},"function"),n("span",{class:"token punctuation"},"}")]),s(),n("span",{class:"token parameter"},"callback"),s(` Called after state is updated.
 * `),n("span",{class:"token keyword"},"@final"),s(`
 * `),n("span",{class:"token keyword"},"@protected"),s(`
 */`)]),s(`
`),n("span",{class:"token class-name"},"Component"),n("span",{class:"token punctuation"},"."),s("prototype"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function-variable function"},"setState"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[s("partialState"),n("span",{class:"token punctuation"},","),s(" callback")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" partialState "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token string"},"'object'"),s(),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" partialState "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"&&"),s(`
    partialState `),n("span",{class:"token operator"},"!="),s(),n("span",{class:"token keyword"},"null"),s(`
  `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"throw"),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"Error"),n("span",{class:"token punctuation"},"("),s(`
      `),n("span",{class:"token string"},"'setState(...): takes an object of state variables to update or a '"),s(),n("span",{class:"token operator"},"+"),s(`
        `),n("span",{class:"token string"},"'function which returns an object of state variables.'"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("updater"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"enqueueSetState"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},","),s(" partialState"),n("span",{class:"token punctuation"},","),s(" callback"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'setState'"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`

`),n("span",{class:"token doc-comment comment"},[s(`/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but \`setState\` was not called.
 *
 * This will not invoke \`shouldComponentUpdate\`, but it will invoke
 * \`componentWillUpdate\` and \`componentDidUpdate\`.
 *
 * `),n("span",{class:"token keyword"},"@param"),s(),n("span",{class:"token class-name"},[n("span",{class:"token punctuation"},"{"),n("span",{class:"token operator"},"?"),n("span",{class:"token keyword"},"function"),n("span",{class:"token punctuation"},"}")]),s(),n("span",{class:"token parameter"},"callback"),s(` Called after update is complete.
 * `),n("span",{class:"token keyword"},"@final"),s(`
 * `),n("span",{class:"token keyword"},"@protected"),s(`
 */`)]),s(`
`),n("span",{class:"token class-name"},"Component"),n("span",{class:"token punctuation"},"."),s("prototype"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function-variable function"},"forceUpdate"),s(),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"callback"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},"."),s("updater"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"enqueueForceUpdate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"this"),n("span",{class:"token punctuation"},","),s(" callback"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token string"},"'forceUpdate'"),n("span",{class:"token punctuation"},")"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("li",null,[n("p",null,[s("调用 "),n("code",null,"mountClassInstance(workInProgress, Component, nextProps, renderLanes)"),s(" ，挂载类组件实例，主要是更新 "),n("code",null,"instance.state"),s("，并且执行一些生命周期")]),n("details",{class:"hint-container details"},[n("summary",null,"【mountClassInstance】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberClassComponent.old.js"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"mountClassInstance"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"ctor"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"newProps"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token keyword"},"void"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"const"),s(" instance "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`stateNode
  instance`),n("span",{class:"token punctuation"},"."),s("props "),n("span",{class:"token operator"},"="),s(` newProps
  instance`),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  instance`),n("span",{class:"token punctuation"},"."),s("refs "),n("span",{class:"token operator"},"="),s(` emptyRefsObject

  `),n("span",{class:"token function"},"initializeUpdateQueue"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" contextType "),n("span",{class:"token operator"},"="),s(" ctor"),n("span",{class:"token punctuation"},"."),s(`contextType
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" contextType "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'object'"),s(),n("span",{class:"token operator"},"&&"),s(" contextType "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    instance`),n("span",{class:"token punctuation"},"."),s("context "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"readContext"),n("span",{class:"token punctuation"},"("),s("contextType"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("disableLegacyContext"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    instance`),n("span",{class:"token punctuation"},"."),s("context "),n("span",{class:"token operator"},"="),s(` emptyContextObject
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"const"),s(" unmaskedContext "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getUnmaskedContext"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" ctor"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},")"),s(`
    instance`),n("span",{class:"token punctuation"},"."),s("context "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getMaskedContext"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" unmaskedContext"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  instance`),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState

  `),n("span",{class:"token comment"},"// 判断是否有 getDerivedStateFromProps 生命周期并且执行，这个生命周期可能改变State"),s(`
  `),n("span",{class:"token comment"},"// getDerivedStateFromProps 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。"),s(`
  `),n("span",{class:"token keyword"},"const"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"="),s(" ctor"),n("span",{class:"token punctuation"},"."),s(`getDerivedStateFromProps
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"applyDerivedStateFromProps"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      ctor`),n("span",{class:"token punctuation"},","),s(`
      getDerivedStateFromProps`),n("span",{class:"token punctuation"},","),s(`
      newProps
    `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token comment"},"// 更新成最新的state"),s(`
    instance`),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token comment"},"// In order to support react-lifecycles-compat polyfilled components,"),s(`
  `),n("span",{class:"token comment"},"// Unsafe lifecycles should not be invoked for components using the new APIs."),s(`
  `),n("span",{class:"token comment"},"// // 判断是否有 componentWillMount 生命周期并且执行，该生命周期也可能改变 state"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" ctor"),n("span",{class:"token punctuation"},"."),s("getDerivedStateFromProps "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("getSnapshotBeforeUpdate "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("UNSAFE_componentWillMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"||"),s(`
      `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentWillMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"callComponentWillMount"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" instance"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token comment"},"// If we had additional state updates during this life-cycle, let's"),s(`
    `),n("span",{class:"token comment"},"// process them now."),s(`
    `),n("span",{class:"token comment"},"// 如果改变了 state，就有新的 update 加入 updateQueue"),s(`
    `),n("span",{class:"token function"},"processUpdateQueue"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" newProps"),n("span",{class:"token punctuation"},","),s(" instance"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
    instance`),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentDidMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"let"),s(),n("span",{class:"token literal-property property"},"fiberFlags"),n("span",{class:"token operator"},":"),s(" Flags "),n("span",{class:"token operator"},"="),s(` Update
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSuspenseLayoutEffectSemantics"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      fiberFlags `),n("span",{class:"token operator"},"|="),s(` LayoutStatic
    `),n("span",{class:"token punctuation"},"}"),s(`
    workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` fiberFlags
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("li",null,[n("p",null,[s("组件渲染被中断（即："),n("code",null,"instance !== null"),s(" 且 "),n("code",null,"current === null"),s("），调用 "),n("code",null,"resumeMountClassInstance(workInProgress, Component, nextProps, renderLanes)"),s(" 函数，复用实例并调用首次渲染的生命周期。该函数返回为 "),n("code",null,"false"),s("，则表示组件无需更新。")]),n("details",{class:"hint-container details"},[n("summary",null,"【resumeMountClassInstance】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberClassComponent.old.js"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"resumeMountClassInstance"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"ctor"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"newProps"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" boolean "),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"const"),s(" instance "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`stateNode

  `),n("span",{class:"token keyword"},"const"),s(" oldProps "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedProps
  instance`),n("span",{class:"token punctuation"},"."),s("props "),n("span",{class:"token operator"},"="),s(` oldProps

  `),n("span",{class:"token keyword"},"const"),s(" oldContext "),n("span",{class:"token operator"},"="),s(" instance"),n("span",{class:"token punctuation"},"."),s(`context
  `),n("span",{class:"token keyword"},"const"),s(" contextType "),n("span",{class:"token operator"},"="),s(" ctor"),n("span",{class:"token punctuation"},"."),s(`contextType
  `),n("span",{class:"token keyword"},"let"),s(" nextContext "),n("span",{class:"token operator"},"="),s(` emptyContextObject
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" contextType "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'object'"),s(),n("span",{class:"token operator"},"&&"),s(" contextType "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    nextContext `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"readContext"),n("span",{class:"token punctuation"},"("),s("contextType"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),s("disableLegacyContext"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"const"),s(" nextLegacyUnmaskedContext "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getUnmaskedContext"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      ctor`),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token boolean"},"true"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
    nextContext `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getMaskedContext"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      nextLegacyUnmaskedContext
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"="),s(" ctor"),n("span",{class:"token punctuation"},"."),s(`getDerivedStateFromProps
  `),n("span",{class:"token keyword"},"const"),s(" hasNewLifecycles "),n("span",{class:"token operator"},"="),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"||"),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("getSnapshotBeforeUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(`

  `),n("span",{class:"token comment"},"// Note: During these life-cycles, instance.props/instance.state are what"),s(`
  `),n("span",{class:"token comment"},'// ever the previously attempted to render - not the "current". However,'),s(`
  `),n("span",{class:"token comment"},'// during componentDidUpdate we pass the "current" props.'),s(`

  `),n("span",{class:"token comment"},"// In order to support react-lifecycles-compat polyfilled components,"),s(`
  `),n("span",{class:"token comment"},"// Unsafe lifecycles should not be invoked for components using the new APIs."),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token operator"},"!"),s("hasNewLifecycles "),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("UNSAFE_componentWillReceiveProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"||"),s(`
      `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentWillReceiveProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("oldProps "),n("span",{class:"token operator"},"!=="),s(" newProps "),n("span",{class:"token operator"},"||"),s(" oldContext "),n("span",{class:"token operator"},"!=="),s(" nextContext"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"callComponentWillReceiveProps"),n("span",{class:"token punctuation"},"("),s(`
        workInProgress`),n("span",{class:"token punctuation"},","),s(`
        instance`),n("span",{class:"token punctuation"},","),s(`
        newProps`),n("span",{class:"token punctuation"},","),s(`
        nextContext
      `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token function"},"resetHasForceUpdateBeforeProcessing"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" oldState "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  `),n("span",{class:"token keyword"},"let"),s(" newState "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),s("instance"),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(" oldState"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token function"},"processUpdateQueue"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" newProps"),n("span",{class:"token punctuation"},","),s(" instance"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
  newState `),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
    oldProps `),n("span",{class:"token operator"},"==="),s(" newProps "),n("span",{class:"token operator"},"&&"),s(`
    oldState `),n("span",{class:"token operator"},"==="),s(" newState "),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token operator"},"!"),n("span",{class:"token function"},"hasContextChanged"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token operator"},"!"),n("span",{class:"token function"},"checkHasForceUpdateAfterProcessing"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// If an update was already in progress, we should schedule an Update"),s(`
    `),n("span",{class:"token comment"},"// effect even though we're bailing out, so that cWU/cDU are called."),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentDidMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"let"),s(),n("span",{class:"token literal-property property"},"fiberFlags"),n("span",{class:"token operator"},":"),s(" Flags "),n("span",{class:"token operator"},"="),s(` Update
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSuspenseLayoutEffectSemantics"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fiberFlags `),n("span",{class:"token operator"},"|="),s(` LayoutStatic
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
        __DEV__ `),n("span",{class:"token operator"},"&&"),s(`
        enableStrictEffects `),n("span",{class:"token operator"},"&&"),s(`
        `),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},"."),s("mode "),n("span",{class:"token operator"},"&"),s(" StrictEffectsMode"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"!=="),s(` NoMode
      `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fiberFlags `),n("span",{class:"token operator"},"|="),s(` MountLayoutDev
      `),n("span",{class:"token punctuation"},"}"),s(`
      workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` fiberFlags
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"false"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"applyDerivedStateFromProps"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      ctor`),n("span",{class:"token punctuation"},","),s(`
      getDerivedStateFromProps`),n("span",{class:"token punctuation"},","),s(`
      newProps
    `),n("span",{class:"token punctuation"},")"),s(`
    newState `),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" shouldUpdate "),n("span",{class:"token operator"},"="),s(`
    `),n("span",{class:"token function"},"checkHasForceUpdateAfterProcessing"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"||"),s(`
    `),n("span",{class:"token function"},"checkShouldComponentUpdate"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      ctor`),n("span",{class:"token punctuation"},","),s(`
      oldProps`),n("span",{class:"token punctuation"},","),s(`
      newProps`),n("span",{class:"token punctuation"},","),s(`
      oldState`),n("span",{class:"token punctuation"},","),s(`
      newState`),n("span",{class:"token punctuation"},","),s(`
      nextContext
    `),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("shouldUpdate"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// In order to support react-lifecycles-compat polyfilled components,"),s(`
    `),n("span",{class:"token comment"},"// Unsafe lifecycles should not be invoked for components using the new APIs."),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
      `),n("span",{class:"token operator"},"!"),s("hasNewLifecycles "),n("span",{class:"token operator"},"&&"),s(`
      `),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("UNSAFE_componentWillMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"||"),s(`
        `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentWillMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentWillMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        instance`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"componentWillMount"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("UNSAFE_componentWillMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        instance`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"UNSAFE_componentWillMount"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentDidMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"let"),s(),n("span",{class:"token literal-property property"},"fiberFlags"),n("span",{class:"token operator"},":"),s(" Flags "),n("span",{class:"token operator"},"="),s(` Update
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSuspenseLayoutEffectSemantics"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fiberFlags `),n("span",{class:"token operator"},"|="),s(` LayoutStatic
      `),n("span",{class:"token punctuation"},"}"),s(`
      workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` fiberFlags
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// If an update was already in progress, we should schedule an Update"),s(`
    `),n("span",{class:"token comment"},"// effect even though we're bailing out, so that cWU/cDU are called."),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentDidMount "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"let"),s(),n("span",{class:"token literal-property property"},"fiberFlags"),n("span",{class:"token operator"},":"),s(" Flags "),n("span",{class:"token operator"},"="),s(` Update
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSuspenseLayoutEffectSemantics"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        fiberFlags `),n("span",{class:"token operator"},"|="),s(` LayoutStatic
      `),n("span",{class:"token punctuation"},"}"),s(`
      workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` fiberFlags
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},"// If shouldComponentUpdate returned false, we should still update the"),s(`
    `),n("span",{class:"token comment"},"// memoized state to indicate that this work can be reused."),s(`
    workInProgress`),n("span",{class:"token punctuation"},"."),s("memoizedProps "),n("span",{class:"token operator"},"="),s(` newProps
    workInProgress`),n("span",{class:"token punctuation"},"."),s("memoizedState "),n("span",{class:"token operator"},"="),s(` newState
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token comment"},"// Update the existing instance's state, props, and context pointers even"),s(`
  `),n("span",{class:"token comment"},"// if shouldComponentUpdate returns false."),s(`
  instance`),n("span",{class:"token punctuation"},"."),s("props "),n("span",{class:"token operator"},"="),s(` newProps
  instance`),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(` newState
  instance`),n("span",{class:"token punctuation"},"."),s("context "),n("span",{class:"token operator"},"="),s(` nextContext

  `),n("span",{class:"token keyword"},"return"),s(` shouldUpdate
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("li",null,[n("p",null,[s("更新组件（即："),n("code",null,"instance !== null"),s(" 且 "),n("code",null,"current !== null"),s("），调用 "),n("code",null,"updateClassInstance"),s(" 函数，并调用 "),n("code",null,"didUpdate"),s(" 和 "),n("code",null,"componentWillReceiveProp"),s(" 生命周期。该函数返回为 "),n("code",null,"false"),s("，则表示组件无需更新。")]),n("details",{class:"hint-container details"},[n("summary",null,"【updateClassInstance】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberClassComponent.old.js"),s(`

`),n("span",{class:"token comment"},"// Invokes the update life-cycles and returns false if it shouldn't rerender."),s(`
`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"updateClassInstance"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"current"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"ctor"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"newProps"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" boolean "),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"const"),s(" instance "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`stateNode

  `),n("span",{class:"token function"},"cloneUpdateQueue"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" unresolvedOldProps "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedProps
  `),n("span",{class:"token keyword"},"const"),s(" oldProps "),n("span",{class:"token operator"},"="),s(`
    workInProgress`),n("span",{class:"token punctuation"},"."),s("type "),n("span",{class:"token operator"},"==="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`elementType
      `),n("span",{class:"token operator"},"?"),s(` unresolvedOldProps
      `),n("span",{class:"token operator"},":"),s(),n("span",{class:"token function"},"resolveDefaultProps"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},"."),s("type"),n("span",{class:"token punctuation"},","),s(" unresolvedOldProps"),n("span",{class:"token punctuation"},")"),s(`
  instance`),n("span",{class:"token punctuation"},"."),s("props "),n("span",{class:"token operator"},"="),s(` oldProps
  `),n("span",{class:"token keyword"},"const"),s(" unresolvedNewProps "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`pendingProps

  `),n("span",{class:"token keyword"},"const"),s(" oldContext "),n("span",{class:"token operator"},"="),s(" instance"),n("span",{class:"token punctuation"},"."),s(`context
  `),n("span",{class:"token keyword"},"const"),s(" contextType "),n("span",{class:"token operator"},"="),s(" ctor"),n("span",{class:"token punctuation"},"."),s(`contextType
  `),n("span",{class:"token keyword"},"let"),s(" nextContext "),n("span",{class:"token operator"},"="),s(` emptyContextObject
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" contextType "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'object'"),s(),n("span",{class:"token operator"},"&&"),s(" contextType "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    nextContext `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"readContext"),n("span",{class:"token punctuation"},"("),s("contextType"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),s("disableLegacyContext"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"const"),s(" nextUnmaskedContext "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getUnmaskedContext"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      ctor`),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token boolean"},"true"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
    nextContext `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getMaskedContext"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" nextUnmaskedContext"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"="),s(" ctor"),n("span",{class:"token punctuation"},"."),s(`getDerivedStateFromProps
  `),n("span",{class:"token keyword"},"const"),s(" hasNewLifecycles "),n("span",{class:"token operator"},"="),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"||"),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("getSnapshotBeforeUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(`

  `),n("span",{class:"token comment"},"// Note: During these life-cycles, instance.props/instance.state are what"),s(`
  `),n("span",{class:"token comment"},'// ever the previously attempted to render - not the "current". However,'),s(`
  `),n("span",{class:"token comment"},'// during componentDidUpdate we pass the "current" props.'),s(`

  `),n("span",{class:"token comment"},"// In order to support react-lifecycles-compat polyfilled components,"),s(`
  `),n("span",{class:"token comment"},"// Unsafe lifecycles should not be invoked for components using the new APIs."),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token operator"},"!"),s("hasNewLifecycles "),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("UNSAFE_componentWillReceiveProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"||"),s(`
      `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentWillReceiveProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
      unresolvedOldProps `),n("span",{class:"token operator"},"!=="),s(" unresolvedNewProps "),n("span",{class:"token operator"},"||"),s(`
      oldContext `),n("span",{class:"token operator"},"!=="),s(` nextContext
    `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"callComponentWillReceiveProps"),n("span",{class:"token punctuation"},"("),s(`
        workInProgress`),n("span",{class:"token punctuation"},","),s(`
        instance`),n("span",{class:"token punctuation"},","),s(`
        newProps`),n("span",{class:"token punctuation"},","),s(`
        nextContext
      `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token function"},"resetHasForceUpdateBeforeProcessing"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" oldState "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  `),n("span",{class:"token keyword"},"let"),s(" newState "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),s("instance"),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(" oldState"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token function"},"processUpdateQueue"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" newProps"),n("span",{class:"token punctuation"},","),s(" instance"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
  newState `),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
    unresolvedOldProps `),n("span",{class:"token operator"},"==="),s(" unresolvedNewProps "),n("span",{class:"token operator"},"&&"),s(`
    oldState `),n("span",{class:"token operator"},"==="),s(" newState "),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token operator"},"!"),n("span",{class:"token function"},"hasContextChanged"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token operator"},"!"),n("span",{class:"token function"},"checkHasForceUpdateAfterProcessing"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token operator"},"!"),n("span",{class:"token punctuation"},"("),s(`
      enableLazyContextPropagation `),n("span",{class:"token operator"},"&&"),s(`
      current `),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(`
      current`),n("span",{class:"token punctuation"},"."),s("dependencies "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(`
      `),n("span",{class:"token function"},"checkIfContextChanged"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},"."),s("dependencies"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// If an update was already in progress, we should schedule an Update"),s(`
    `),n("span",{class:"token comment"},"// effect even though we're bailing out, so that cWU/cDU are called."),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentDidUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
        unresolvedOldProps `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s("memoizedProps "),n("span",{class:"token operator"},"||"),s(`
        oldState `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s(`memoizedState
      `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` Update
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("getSnapshotBeforeUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
        unresolvedOldProps `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s("memoizedProps "),n("span",{class:"token operator"},"||"),s(`
        oldState `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s(`memoizedState
      `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` Snapshot
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token boolean"},"false"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" getDerivedStateFromProps "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"applyDerivedStateFromProps"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      ctor`),n("span",{class:"token punctuation"},","),s(`
      getDerivedStateFromProps`),n("span",{class:"token punctuation"},","),s(`
      newProps
    `),n("span",{class:"token punctuation"},")"),s(`
    newState `),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`memoizedState
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" shouldUpdate "),n("span",{class:"token operator"},"="),s(`
    `),n("span",{class:"token function"},"checkHasForceUpdateAfterProcessing"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"||"),s(`
    `),n("span",{class:"token function"},"checkShouldComponentUpdate"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      ctor`),n("span",{class:"token punctuation"},","),s(`
      oldProps`),n("span",{class:"token punctuation"},","),s(`
      newProps`),n("span",{class:"token punctuation"},","),s(`
      oldState`),n("span",{class:"token punctuation"},","),s(`
      newState`),n("span",{class:"token punctuation"},","),s(`
      nextContext
    `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"||"),s(`
    `),n("span",{class:"token comment"},"// TODO: In some cases, we'll end up checking if context has changed twice,"),s(`
    `),n("span",{class:"token comment"},"// both before and after `shouldComponentUpdate` has been called. Not ideal,"),s(`
    `),n("span",{class:"token comment"},"// but I'm loath to refactor this function. This only happens for memoized"),s(`
    `),n("span",{class:"token comment"},"// components so it's not that common."),s(`
    `),n("span",{class:"token punctuation"},"("),s("enableLazyContextPropagation "),n("span",{class:"token operator"},"&&"),s(`
      current `),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(`
      current`),n("span",{class:"token punctuation"},"."),s("dependencies "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(`
      `),n("span",{class:"token function"},"checkIfContextChanged"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},"."),s("dependencies"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("shouldUpdate"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// In order to support react-lifecycles-compat polyfilled components,"),s(`
    `),n("span",{class:"token comment"},"// Unsafe lifecycles should not be invoked for components using the new APIs."),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
      `),n("span",{class:"token operator"},"!"),s("hasNewLifecycles "),n("span",{class:"token operator"},"&&"),s(`
      `),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("UNSAFE_componentWillUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),s(),n("span",{class:"token operator"},"||"),s(`
        `),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentWillUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentWillUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        instance`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"componentWillUpdate"),n("span",{class:"token punctuation"},"("),s("newProps"),n("span",{class:"token punctuation"},","),s(" newState"),n("span",{class:"token punctuation"},","),s(" nextContext"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("UNSAFE_componentWillUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        instance`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"UNSAFE_componentWillUpdate"),n("span",{class:"token punctuation"},"("),s(`
          newProps`),n("span",{class:"token punctuation"},","),s(`
          newState`),n("span",{class:"token punctuation"},","),s(`
          nextContext
        `),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentDidUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` Update
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("getSnapshotBeforeUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` Snapshot
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// If an update was already in progress, we should schedule an Update"),s(`
    `),n("span",{class:"token comment"},"// effect even though we're bailing out, so that cWU/cDU are called."),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("componentDidUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
        unresolvedOldProps `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s("memoizedProps "),n("span",{class:"token operator"},"||"),s(`
        oldState `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s(`memoizedState
      `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` Update
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" instance"),n("span",{class:"token punctuation"},"."),s("getSnapshotBeforeUpdate "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
        unresolvedOldProps `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s("memoizedProps "),n("span",{class:"token operator"},"||"),s(`
        oldState `),n("span",{class:"token operator"},"!=="),s(" current"),n("span",{class:"token punctuation"},"."),s(`memoizedState
      `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` Snapshot
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},"// If shouldComponentUpdate returned false, we should still update the"),s(`
    `),n("span",{class:"token comment"},"// memoized props/state to indicate that this work can be reused."),s(`
    workInProgress`),n("span",{class:"token punctuation"},"."),s("memoizedProps "),n("span",{class:"token operator"},"="),s(` newProps
    workInProgress`),n("span",{class:"token punctuation"},"."),s("memoizedState "),n("span",{class:"token operator"},"="),s(` newState
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token comment"},"// Update the existing instance's state, props, and context pointers even"),s(`
  `),n("span",{class:"token comment"},"// if shouldComponentUpdate returns false."),s(`
  instance`),n("span",{class:"token punctuation"},"."),s("props "),n("span",{class:"token operator"},"="),s(` newProps
  instance`),n("span",{class:"token punctuation"},"."),s("state "),n("span",{class:"token operator"},"="),s(` newState
  instance`),n("span",{class:"token punctuation"},"."),s("context "),n("span",{class:"token operator"},"="),s(` nextContext

  `),n("span",{class:"token keyword"},"return"),s(` shouldUpdate
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("li",null,[n("p",null,[s("最终执行 "),n("code",null,"finishClassComponent"),s("，进行错误判断处理和判断是否可以跳过更新的过程，重新调和子节点 "),n("code",null,"reconcileChildren")]),n("details",{class:"hint-container details"},[n("summary",null,"【finishClassComponent】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberBeginWork.old.js"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"finishClassComponent"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"current"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"Component"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"shouldUpdate"),n("span",{class:"token operator"},":"),s(" boolean"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"hasContext"),n("span",{class:"token operator"},":"),s(" boolean"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// Refs should update even if shouldComponentUpdate returns false"),s(`
  `),n("span",{class:"token function"},"markRef"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" didCaptureError "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"&"),s(" DidCapture"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"!=="),s(` NoFlags

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),s("shouldUpdate "),n("span",{class:"token operator"},"&&"),s(),n("span",{class:"token operator"},"!"),s("didCaptureError"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// Context providers should defer to sCU for rendering"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("hasContext"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"invalidateContextProvider"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" Component"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"bailoutOnAlreadyFinishedWork"),n("span",{class:"token punctuation"},"("),s(`
      current`),n("span",{class:"token punctuation"},","),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      renderLanes
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"const"),s(" instance "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`stateNode

  `),n("span",{class:"token comment"},"// Rerender"),s(`
  ReactCurrentOwner`),n("span",{class:"token punctuation"},"."),s("current "),n("span",{class:"token operator"},"="),s(` workInProgress
  `),n("span",{class:"token keyword"},"let"),s(` nextChildren
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
    didCaptureError `),n("span",{class:"token operator"},"&&"),s(`
    `),n("span",{class:"token keyword"},"typeof"),s(" Component"),n("span",{class:"token punctuation"},"."),s("getDerivedStateFromError "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token string"},"'function'"),s(`
  `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// If we captured an error, but getDerivedStateFromError is not defined,"),s(`
    `),n("span",{class:"token comment"},"// unmount all the children. componentDidCatch will schedule an update to"),s(`
    `),n("span",{class:"token comment"},"// re-render a fallback. This is temporary until we migrate everyone to"),s(`
    `),n("span",{class:"token comment"},"// the new API."),s(`
    `),n("span",{class:"token comment"},"// TODO: Warn in a future release."),s(`
    nextChildren `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`

    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableProfilerTimer"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"stopProfilerTimerIfRunning"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSchedulingProfiler"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"markComponentRenderStarted"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("__DEV__"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"setIsRendering"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},")"),s(`
      nextChildren `),n("span",{class:"token operator"},"="),s(" instance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
        debugRenderPhaseSideEffectsForStrictMode `),n("span",{class:"token operator"},"&&"),s(`
        workInProgress`),n("span",{class:"token punctuation"},"."),s("mode "),n("span",{class:"token operator"},"&"),s(` StrictLegacyMode
      `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"setIsStrictModeForDevtools"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"try"),s(),n("span",{class:"token punctuation"},"{"),s(`
          instance`),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"finally"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token function"},"setIsStrictModeForDevtools"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token function"},"setIsRendering"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
      nextChildren `),n("span",{class:"token operator"},"="),s(" instance"),n("span",{class:"token punctuation"},"."),n("span",{class:"token function"},"render"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSchedulingProfiler"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token function"},"markComponentRenderStopped"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token comment"},"// React DevTools reads this flag."),s(`
  workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` PerformedWork
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("current "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(" didCaptureError"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// If we're recovering from an error, reconcile without reusing any of"),s(`
    `),n("span",{class:"token comment"},"// the existing children. Conceptually, the normal children and the children"),s(`
    `),n("span",{class:"token comment"},"// that are shown on error are two different sets, so we shouldn't reuse"),s(`
    `),n("span",{class:"token comment"},"// normal children even if their identities match."),s(`
    `),n("span",{class:"token function"},"forceUnmountCurrentAndReconcile"),n("span",{class:"token punctuation"},"("),s(`
      current`),n("span",{class:"token punctuation"},","),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      nextChildren`),n("span",{class:"token punctuation"},","),s(`
      renderLanes
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"reconcileChildren"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},","),s(" nextChildren"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token comment"},"// Memoize state using the values we just used to render."),s(`
  `),n("span",{class:"token comment"},"// TODO: Restructure so we never read values from the instance."),s(`
  workInProgress`),n("span",{class:"token punctuation"},"."),s("memoizedState "),n("span",{class:"token operator"},"="),s(" instance"),n("span",{class:"token punctuation"},"."),s(`state

  `),n("span",{class:"token comment"},"// The context might have changed so we need to recalculate it."),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("hasContext"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"invalidateContextProvider"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" Component"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"return"),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`child
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])])])])])])],-1),i=a(`<h2 id="函数组件" tabindex="-1"><a class="header-anchor" href="#函数组件" aria-hidden="true">#</a> 函数组件</h2><h3 id="函数组件的组成部分" tabindex="-1"><a class="header-anchor" href="#函数组件的组成部分" aria-hidden="true">#</a> 函数组件的组成部分</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Welcome</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Welcome<span class="token punctuation">.</span>number<span class="token punctuation">)</span> <span class="token comment">// 输出结果为 1</span>

  <span class="token comment">/* Hook API */</span>
  <span class="token comment">/* useState hook：返回一个 state，以及更新 state 的函数 */</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>message<span class="token punctuation">,</span> setMessage<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;hello,world&#39;</span><span class="token punctuation">)</span>
  <span class="token comment">/* useEffect hook：接收一个包含命令式、且可能有副作用代码的函数 */</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    document<span class="token punctuation">.</span>title <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">You clicked </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>count<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> times</span><span class="token template-punctuation string">\`</span></span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token comment">// ... 省略相关 Hook API 的使用</span>

  <span class="token comment">/* return 返回值作为渲染 UI */</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setMessage</span><span class="token punctuation">(</span><span class="token string">&#39;let us learn React!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>message<span class="token punctuation">}</span> <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
Welcome<span class="token punctuation">.</span>number <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">/* 绑定静态属性 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：不要尝试给函数组件 <code>prototype</code> 绑定属性或方法，即使绑定了也没有任何作用，因为通过上面源码中 React 对函数组件的调用，是采用直接执行函数的方式，而不是通过 <code>new</code> 的方式。</p><p>类组件与函数组件的区别：</p><ul><li>在类组件中，底层只需要实例化一次，实例中保存了组件的 <code>state</code> 等状态。对于每一次更新只需要调用 <code>render</code> 方法以及对应的生命周期就可以了</li><li>在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明</li></ul><h3 id="函数组件的实现" tabindex="-1"><a class="header-anchor" href="#函数组件的实现" aria-hidden="true">#</a> 函数组件的实现</h3>`,7),r=n("ul",null,[n("li",null,[n("p",null,[s("在 "),n("code",null,"beginWork(current, workInProgress, renderLanes)"),s(" （创建当前节点的子 "),n("code",null,"Fiber"),s(" 节点）中，通过 "),n("code",null,"case ClassComponent"),s(" 调用 "),n("code",null,"updateFunctionComponent"),s(" 函数")]),n("details",{class:"hint-container details"},[n("summary",null,"【beginWork】函数: 创建当前节点的子 Fiber 节点"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberBeginWork.old.js"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"beginWork"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"current"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token keyword"},"switch"),s(),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},"."),s("tag"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"IndeterminateComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"LazyComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"FunctionComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"const"),s(" Component "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`type
      `),n("span",{class:"token keyword"},"const"),s(" unresolvedProps "),n("span",{class:"token operator"},"="),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`pendingProps
      `),n("span",{class:"token keyword"},"const"),s(" resolvedProps "),n("span",{class:"token operator"},"="),s(`
        workInProgress`),n("span",{class:"token punctuation"},"."),s("elementType "),n("span",{class:"token operator"},"==="),s(` Component
          `),n("span",{class:"token operator"},"?"),s(` unresolvedProps
          `),n("span",{class:"token operator"},":"),s(),n("span",{class:"token function"},"resolveDefaultProps"),n("span",{class:"token punctuation"},"("),s("Component"),n("span",{class:"token punctuation"},","),s(" unresolvedProps"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"updateFunctionComponent"),n("span",{class:"token punctuation"},"("),s(`
        current`),n("span",{class:"token punctuation"},","),s(`
        workInProgress`),n("span",{class:"token punctuation"},","),s(`
        Component`),n("span",{class:"token punctuation"},","),s(`
        resolvedProps`),n("span",{class:"token punctuation"},","),s(`
        renderLanes
      `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"ClassComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"HostRoot"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token literal-property property"},"HostComponent"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token comment"},"// ..."),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token comment"},"// .."),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token comment"},"// ..."),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("details",{class:"hint-container details"},[n("summary",null,"【updateFunctionComponent】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberBeginWork.old.js"),s(`

`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"updateFunctionComponent"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[s("current"),n("span",{class:"token punctuation"},","),s(`
  workInProgress`),n("span",{class:"token punctuation"},","),s(`
  Component`),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"nextProps"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  renderLanes`)]),s(`
`),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"let"),s(` context
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),s("disableLegacyContext"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"const"),s(" unmaskedContext "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getUnmaskedContext"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      Component`),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token boolean"},"true"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
    context `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"getMaskedContext"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" unmaskedContext"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"let"),s(` nextChildren
  `),n("span",{class:"token keyword"},"let"),s(` hasId
  `),n("span",{class:"token function"},"prepareToReadContext"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSchedulingProfiler"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"markComponentRenderStarted"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("__DEV__"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    nextChildren `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"renderWithHooks"),n("span",{class:"token punctuation"},"("),s(`
      current`),n("span",{class:"token punctuation"},","),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      Component`),n("span",{class:"token punctuation"},","),s(`
      nextProps`),n("span",{class:"token punctuation"},","),s(`
      context`),n("span",{class:"token punctuation"},","),s(`
      renderLanes
    `),n("span",{class:"token punctuation"},")"),s(`
    hasId `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"checkDidRenderIdHook"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableSchedulingProfiler"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"markComponentRenderStopped"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("current "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(),n("span",{class:"token operator"},"!"),s("didReceiveUpdate"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"bailoutHooks"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"bailoutOnAlreadyFinishedWork"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getIsHydrating"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"&&"),s(" hasId"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token function"},"pushMaterializedTreeId"),n("span",{class:"token punctuation"},"("),s("workInProgress"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token comment"},"// React DevTools reads this flag."),s(`
  workInProgress`),n("span",{class:"token punctuation"},"."),s("flags "),n("span",{class:"token operator"},"|="),s(` PerformedWork
  `),n("span",{class:"token function"},"reconcileChildren"),n("span",{class:"token punctuation"},"("),s("current"),n("span",{class:"token punctuation"},","),s(" workInProgress"),n("span",{class:"token punctuation"},","),s(" nextChildren"),n("span",{class:"token punctuation"},","),s(" renderLanes"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token keyword"},"return"),s(" workInProgress"),n("span",{class:"token punctuation"},"."),s(`child
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("li",null,[n("p",null,[s("在 "),n("code",null,"updateFunctionComponent"),s(" 函数中：")]),n("ul",null,[n("li",null,[n("p",null,[s("通过调用 "),n("code",null,"renderWithHooks"),s(" 函数，执行 "),n("code",null,"let children = Component(props, secondArg)"),s(" 调用函数组件（即：用户编写的函数组件），获得一个 "),n("code",null,"ReactElement"),s(" （即： "),n("code",null,"nextChildren"),s("）")]),n("details",{class:"hint-container details"},[n("summary",null,"【renderWithHooks】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{js:"",class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactFiberHooks.old.js"),s(`

`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"function"),s(" renderWithHooks"),n("span",{class:"token operator"},"<"),s("Props"),n("span",{class:"token punctuation"},","),s(" SecondArg"),n("span",{class:"token operator"},">"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token literal-property property"},"current"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token function-variable function"},"Component"),n("span",{class:"token operator"},":"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"p"),n("span",{class:"token operator"},":"),s(" Props"),n("span",{class:"token punctuation"},","),s(),n("span",{class:"token literal-property property"},"arg"),n("span",{class:"token operator"},":"),s(" SecondArg")]),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"=>"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"props"),n("span",{class:"token operator"},":"),s(" Props"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"secondArg"),n("span",{class:"token operator"},":"),s(" SecondArg"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"nextRenderLanes"),n("span",{class:"token operator"},":"),s(` Lanes
`),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" any "),n("span",{class:"token punctuation"},"{"),s(`
  renderLanes `),n("span",{class:"token operator"},"="),s(` nextRenderLanes
  currentlyRenderingFiber `),n("span",{class:"token operator"},"="),s(` workInProgress

  workInProgress`),n("span",{class:"token punctuation"},"."),s("memoizedState "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`
  workInProgress`),n("span",{class:"token punctuation"},"."),s("updateQueue "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`
  workInProgress`),n("span",{class:"token punctuation"},"."),s("lanes "),n("span",{class:"token operator"},"="),s(` NoLanes

  `),n("span",{class:"token comment"},"// The following should have already been reset"),s(`
  `),n("span",{class:"token comment"},"// currentHook = null;"),s(`
  `),n("span",{class:"token comment"},"// workInProgressHook = null;"),s(`

  `),n("span",{class:"token comment"},"// didScheduleRenderPhaseUpdate = false;"),s(`
  `),n("span",{class:"token comment"},"// localIdCounter = 0;"),s(`

  `),n("span",{class:"token comment"},"// TODO Warn if no hooks are used at all during mount, then some are used during update."),s(`
  `),n("span",{class:"token comment"},"// Currently we will identify the update render as a mount because memoizedState === null."),s(`
  `),n("span",{class:"token comment"},"// This is tricky because it's valid for certain types of components (e.g. React.lazy)"),s(`

  `),n("span",{class:"token comment"},"// Using memoizedState to differentiate between mount/update only works if at least one stateful hook is used."),s(`
  `),n("span",{class:"token comment"},"// Non-stateful hooks (e.g. context) don't get added to memoizedState,"),s(`
  `),n("span",{class:"token comment"},"// so memoizedState would be null during updates and mounts."),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("__DEV__"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// ..."),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    ReactCurrentDispatcher`),n("span",{class:"token punctuation"},"."),s("current "),n("span",{class:"token operator"},"="),s(`
      current `),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"||"),s(" current"),n("span",{class:"token punctuation"},"."),s("memoizedState "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token keyword"},"null"),s(`
        `),n("span",{class:"token operator"},"?"),s(` HooksDispatcherOnMount
        `),n("span",{class:"token operator"},":"),s(` HooksDispatcherOnUpdate
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"let"),s(" children "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"Component"),n("span",{class:"token punctuation"},"("),s("props"),n("span",{class:"token punctuation"},","),s(" secondArg"),n("span",{class:"token punctuation"},")"),s(`

  `),n("span",{class:"token comment"},"// Check if there was a render phase update"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("didScheduleRenderPhaseUpdateDuringThisPass"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// Keep rendering in a loop for as long as render phase updates continue to"),s(`
    `),n("span",{class:"token comment"},"// be scheduled. Use a counter to prevent infinite loops."),s(`
    `),n("span",{class:"token keyword"},"let"),s(),n("span",{class:"token literal-property property"},"numberOfReRenders"),n("span",{class:"token operator"},":"),s(" number "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),s(`
    `),n("span",{class:"token keyword"},"do"),s(),n("span",{class:"token punctuation"},"{"),s(`
      didScheduleRenderPhaseUpdateDuringThisPass `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"false"),s(`
      localIdCounter `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token number"},"0"),s(`

      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("numberOfReRenders "),n("span",{class:"token operator"},">="),s(),n("span",{class:"token constant"},"RE_RENDER_LIMIT"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"throw"),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"Error"),n("span",{class:"token punctuation"},"("),s(`
          `),n("span",{class:"token string"},"'Too many re-renders. React limits the number of renders to prevent '"),s(),n("span",{class:"token operator"},"+"),s(`
            `),n("span",{class:"token string"},"'an infinite loop.'"),s(`
        `),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`

      numberOfReRenders `),n("span",{class:"token operator"},"+="),s(),n("span",{class:"token number"},"1"),s(`

      `),n("span",{class:"token comment"},"// Start over from the beginning of the list"),s(`
      currentHook `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`
      workInProgressHook `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`

      workInProgress`),n("span",{class:"token punctuation"},"."),s("updateQueue "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`

      ReactCurrentDispatcher`),n("span",{class:"token punctuation"},"."),s("current "),n("span",{class:"token operator"},"="),s(` __DEV__
        `),n("span",{class:"token operator"},"?"),s(` HooksDispatcherOnRerenderInDEV
        `),n("span",{class:"token operator"},":"),s(` HooksDispatcherOnRerender

      children `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"Component"),n("span",{class:"token punctuation"},"("),s("props"),n("span",{class:"token punctuation"},","),s(" secondArg"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"while"),s(),n("span",{class:"token punctuation"},"("),s("didScheduleRenderPhaseUpdateDuringThisPass"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token comment"},"// We can assume the previous dispatcher is always this one, since we set it"),s(`
  `),n("span",{class:"token comment"},"// at the beginning of the render phase and there's no re-entrance."),s(`
  ReactCurrentDispatcher`),n("span",{class:"token punctuation"},"."),s("current "),n("span",{class:"token operator"},"="),s(` ContextOnlyDispatcher

  `),n("span",{class:"token comment"},"// This check uses currentHook so that it works the same in DEV and prod bundles."),s(`
  `),n("span",{class:"token comment"},"// hookTypesDev could catch more cases (e.g. context) but only in DEV bundles."),s(`
  `),n("span",{class:"token keyword"},"const"),s(" didRenderTooFewHooks "),n("span",{class:"token operator"},"="),s(`
    currentHook `),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(" currentHook"),n("span",{class:"token punctuation"},"."),s("next "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(`

  renderLanes `),n("span",{class:"token operator"},"="),s(` NoLanes
  currentlyRenderingFiber `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"null"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},")"),s(`

  currentHook `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`
  workInProgressHook `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"null"),s(`

  didScheduleRenderPhaseUpdate `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token boolean"},"false"),s(`
  `),n("span",{class:"token comment"},"// This is reset by checkDidRenderIdHook"),s(`
  `),n("span",{class:"token comment"},"// localIdCounter = 0;"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("didRenderTooFewHooks"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"throw"),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"Error"),n("span",{class:"token punctuation"},"("),s(`
      `),n("span",{class:"token string"},"'Rendered fewer hooks than expected. This may be caused by an accidental '"),s(),n("span",{class:"token operator"},"+"),s(`
        `),n("span",{class:"token string"},"'early return statement.'"),s(`
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("enableLazyContextPropagation"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("current "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token operator"},"!"),n("span",{class:"token function"},"checkIfWorkInProgressReceivedUpdate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token comment"},"// If there were no changes to props or state, we need to check if there"),s(`
        `),n("span",{class:"token comment"},"// was a context change. We didn't already do this because there's no"),s(`
        `),n("span",{class:"token comment"},"// 1:1 correspondence between dependencies and hooks. Although, because"),s(`
        `),n("span",{class:"token comment"},"// there almost always is in the common case (`readContext` is an"),s(`
        `),n("span",{class:"token comment"},"// internal API), we could compare in there. OTOH, we only hit this case"),s(`
        `),n("span",{class:"token comment"},"// if everything else bails out, so on the whole it might be better to"),s(`
        `),n("span",{class:"token comment"},"// keep the comparison out of the common path."),s(`
        `),n("span",{class:"token keyword"},"const"),s(" currentDependencies "),n("span",{class:"token operator"},"="),s(" current"),n("span",{class:"token punctuation"},"."),s(`dependencies
        `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
          currentDependencies `),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(`
          `),n("span",{class:"token function"},"checkIfContextChanged"),n("span",{class:"token punctuation"},"("),s("currentDependencies"),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
          `),n("span",{class:"token function"},"markWorkInProgressReceivedUpdate"),n("span",{class:"token punctuation"},"("),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token punctuation"},"}"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
  `),n("span",{class:"token keyword"},"return"),s(` children
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("li",null,[n("p",null,[s("调用 "),n("code",null,"reconcileChildren"),s(" 函数，改变 "),n("code",null,"workInProgress.child")]),n("ul",null,[n("li",null,[n("p",null,[s("当前节点为 "),n("code",null,"null"),s(" （即："),n("code",null,"current === null"),s("），则表示第一次渲染，调用 "),n("code",null,"mountChildFibers"),s(" 函数，并将函数返回值赋值给 "),n("code",null,"workInProgress.child")]),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactChildFiber.old.js"),s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"const"),s(" mountChildFibers "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"ChildReconciler"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("li",null,[n("p",null,[s("当前节点不为 "),n("code",null,"null"),s(" （即："),n("code",null,"current !== null"),s("），则表示更新节点，调用 "),n("code",null,"reconcileChildFibers"),s(" 函数，并将函数返回值赋值给 "),n("code",null,"workInProgress.child")]),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactChildFiber.old.js"),s(`
`),n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"const"),s(" reconcileChildFibers "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"ChildReconciler"),n("span",{class:"token punctuation"},"("),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},")"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])]),n("details",{class:"hint-container details"},[n("summary",null,"【reconcileChildren】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token keyword"},"export"),s(),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"reconcileChildren"),n("span",{class:"token punctuation"},"("),s(`
  `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"current"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"workInProgress"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"nextChildren"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
  `),n("span",{class:"token literal-property property"},"renderLanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
`),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("current "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// 第一次渲染"),s(`
    `),n("span",{class:"token comment"},"// If this is a fresh new component that hasn't been rendered yet, we"),s(`
    `),n("span",{class:"token comment"},"// won't update its child set by applying minimal side-effects. Instead,"),s(`
    `),n("span",{class:"token comment"},"// we will add them all to the child before it gets rendered. That means"),s(`
    `),n("span",{class:"token comment"},"// we can optimize this reconciliation pass by not tracking side-effects."),s(`
    workInProgress`),n("span",{class:"token punctuation"},"."),s("child "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"mountChildFibers"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      `),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
      nextChildren`),n("span",{class:"token punctuation"},","),s(`
      renderLanes
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(),n("span",{class:"token keyword"},"else"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// 更新组件"),s(`
    `),n("span",{class:"token comment"},"// If the current child is the same as the work in progress, it means that"),s(`
    `),n("span",{class:"token comment"},"// we haven't yet started any work on these children. Therefore, we use"),s(`
    `),n("span",{class:"token comment"},"// the clone algorithm to create a copy of all the current children."),s(`

    `),n("span",{class:"token comment"},"// If we had any progressed work already, that is invalid at this point so"),s(`
    `),n("span",{class:"token comment"},"// let's throw it out."),s(`
    workInProgress`),n("span",{class:"token punctuation"},"."),s("child "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token function"},"reconcileChildFibers"),n("span",{class:"token punctuation"},"("),s(`
      workInProgress`),n("span",{class:"token punctuation"},","),s(`
      current`),n("span",{class:"token punctuation"},"."),s("child"),n("span",{class:"token punctuation"},","),s(`
      nextChildren`),n("span",{class:"token punctuation"},","),s(`
      renderLanes
    `),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("details",{class:"hint-container details"},[n("summary",null,"【ChildReconciler】函数"),n("div",{class:"language-javascript line-numbers-mode","data-ext":"js"},[n("pre",{class:"language-javascript"},[n("code",null,[n("span",{class:"token comment"},"// packages\\react-reconciler\\src\\ReactChildFiber.old.js"),s(`

`),n("span",{class:"token comment"},"// This wrapper function exists because I expect to clone the code in each path"),s(`
`),n("span",{class:"token comment"},"// to be able to optimize each path individually by branching early. This needs"),s(`
`),n("span",{class:"token comment"},"// a compiler or we can do it manually. Helpers that don't need this branching"),s(`
`),n("span",{class:"token comment"},"// live outside of this function."),s(`
`),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"ChildReconciler"),n("span",{class:"token punctuation"},"("),n("span",{class:"token parameter"},"shouldTrackSideEffects"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
  `),n("span",{class:"token comment"},"// ..."),s(`

  `),n("span",{class:"token comment"},"// This API will tag the children with the side-effect of the reconciliation"),s(`
  `),n("span",{class:"token comment"},"// itself. They will be added to the side-effect list as we pass through the"),s(`
  `),n("span",{class:"token comment"},"// children and the parent."),s(`
  `),n("span",{class:"token keyword"},"function"),s(),n("span",{class:"token function"},"reconcileChildFibers"),n("span",{class:"token punctuation"},"("),s(`
    `),n("span",{class:"token parameter"},[n("span",{class:"token literal-property property"},"returnFiber"),n("span",{class:"token operator"},":"),s(" Fiber"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"currentFirstChild"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"newChild"),n("span",{class:"token operator"},":"),s(" any"),n("span",{class:"token punctuation"},","),s(`
    `),n("span",{class:"token literal-property property"},"lanes"),n("span",{class:"token operator"},":"),s(" Lanes")]),s(`
  `),n("span",{class:"token punctuation"},")"),n("span",{class:"token operator"},":"),s(" Fiber "),n("span",{class:"token operator"},"|"),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token punctuation"},"{"),s(`
    `),n("span",{class:"token comment"},"// This function is not recursive."),s(`
    `),n("span",{class:"token comment"},"// If the top level item is an array, we treat it as a set of children,"),s(`
    `),n("span",{class:"token comment"},"// not as a fragment. Nested arrays on the other hand will be treated as"),s(`
    `),n("span",{class:"token comment"},"// fragment nodes. Recursion happens at the normal flow."),s(`

    `),n("span",{class:"token comment"},"// Handle top level unkeyed fragments as if they were arrays."),s(`
    `),n("span",{class:"token comment"},"// This leads to an ambiguity between <>{[...]}</> and <>...</>."),s(`
    `),n("span",{class:"token comment"},"// We treat the ambiguous cases above the same."),s(`
    `),n("span",{class:"token keyword"},"const"),s(" isUnkeyedTopLevelFragment "),n("span",{class:"token operator"},"="),s(`
      `),n("span",{class:"token keyword"},"typeof"),s(" newChild "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'object'"),s(),n("span",{class:"token operator"},"&&"),s(`
      newChild `),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),s(),n("span",{class:"token operator"},"&&"),s(`
      newChild`),n("span",{class:"token punctuation"},"."),s("type "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token constant"},"REACT_FRAGMENT_TYPE"),s(),n("span",{class:"token operator"},"&&"),s(`
      newChild`),n("span",{class:"token punctuation"},"."),s("key "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token keyword"},"null"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("isUnkeyedTopLevelFragment"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      newChild `),n("span",{class:"token operator"},"="),s(" newChild"),n("span",{class:"token punctuation"},"."),s("props"),n("span",{class:"token punctuation"},"."),s(`children
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},"// Handle object types"),s(`
    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" newChild "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'object'"),s(),n("span",{class:"token operator"},"&&"),s(" newChild "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token keyword"},"null"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"switch"),s(),n("span",{class:"token punctuation"},"("),s("newChild"),n("span",{class:"token punctuation"},"."),s("$$"),n("span",{class:"token keyword"},"typeof"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token constant"},"REACT_ELEMENT_TYPE"),n("span",{class:"token operator"},":"),s(`
          `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"placeSingleChild"),n("span",{class:"token punctuation"},"("),s(`
            `),n("span",{class:"token function"},"reconcileSingleElement"),n("span",{class:"token punctuation"},"("),s(`
              returnFiber`),n("span",{class:"token punctuation"},","),s(`
              currentFirstChild`),n("span",{class:"token punctuation"},","),s(`
              newChild`),n("span",{class:"token punctuation"},","),s(`
              lanes
            `),n("span",{class:"token punctuation"},")"),s(`
          `),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token constant"},"REACT_PORTAL_TYPE"),n("span",{class:"token operator"},":"),s(`
          `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"placeSingleChild"),n("span",{class:"token punctuation"},"("),s(`
            `),n("span",{class:"token function"},"reconcileSinglePortal"),n("span",{class:"token punctuation"},"("),s(`
              returnFiber`),n("span",{class:"token punctuation"},","),s(`
              currentFirstChild`),n("span",{class:"token punctuation"},","),s(`
              newChild`),n("span",{class:"token punctuation"},","),s(`
              lanes
            `),n("span",{class:"token punctuation"},")"),s(`
          `),n("span",{class:"token punctuation"},")"),s(`
        `),n("span",{class:"token keyword"},"case"),s(),n("span",{class:"token constant"},"REACT_LAZY_TYPE"),n("span",{class:"token operator"},":"),s(`
          `),n("span",{class:"token keyword"},"const"),s(" payload "),n("span",{class:"token operator"},"="),s(" newChild"),n("span",{class:"token punctuation"},"."),s(`_payload
          `),n("span",{class:"token keyword"},"const"),s(" init "),n("span",{class:"token operator"},"="),s(" newChild"),n("span",{class:"token punctuation"},"."),s(`_init
          `),n("span",{class:"token comment"},"// TODO: This function is supposed to be non-recursive."),s(`
          `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"reconcileChildFibers"),n("span",{class:"token punctuation"},"("),s(`
            returnFiber`),n("span",{class:"token punctuation"},","),s(`
            currentFirstChild`),n("span",{class:"token punctuation"},","),s(`
            `),n("span",{class:"token function"},"init"),n("span",{class:"token punctuation"},"("),s("payload"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},","),s(`
            lanes
          `),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`

      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"isArray"),n("span",{class:"token punctuation"},"("),s("newChild"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"reconcileChildrenArray"),n("span",{class:"token punctuation"},"("),s(`
          returnFiber`),n("span",{class:"token punctuation"},","),s(`
          currentFirstChild`),n("span",{class:"token punctuation"},","),s(`
          newChild`),n("span",{class:"token punctuation"},","),s(`
          lanes
        `),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`

      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token function"},"getIteratorFn"),n("span",{class:"token punctuation"},"("),s("newChild"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"reconcileChildrenIterator"),n("span",{class:"token punctuation"},"("),s(`
          returnFiber`),n("span",{class:"token punctuation"},","),s(`
          currentFirstChild`),n("span",{class:"token punctuation"},","),s(`
          newChild`),n("span",{class:"token punctuation"},","),s(`
          lanes
        `),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`

      `),n("span",{class:"token function"},"throwOnInvalidObjectType"),n("span",{class:"token punctuation"},"("),s("returnFiber"),n("span",{class:"token punctuation"},","),s(" newChild"),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s(`
      `),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" newChild "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'string'"),s(),n("span",{class:"token operator"},"&&"),s(" newChild "),n("span",{class:"token operator"},"!=="),s(),n("span",{class:"token string"},"''"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token operator"},"||"),s(`
      `),n("span",{class:"token keyword"},"typeof"),s(" newChild "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'number'"),s(`
    `),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"placeSingleChild"),n("span",{class:"token punctuation"},"("),s(`
        `),n("span",{class:"token function"},"reconcileSingleTextNode"),n("span",{class:"token punctuation"},"("),s(`
          returnFiber`),n("span",{class:"token punctuation"},","),s(`
          currentFirstChild`),n("span",{class:"token punctuation"},","),s(`
          `),n("span",{class:"token string"},"''"),s(),n("span",{class:"token operator"},"+"),s(" newChild"),n("span",{class:"token punctuation"},","),s(`
          lanes
        `),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},")"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),s("__DEV__"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
      `),n("span",{class:"token keyword"},"if"),s(),n("span",{class:"token punctuation"},"("),n("span",{class:"token keyword"},"typeof"),s(" newChild "),n("span",{class:"token operator"},"==="),s(),n("span",{class:"token string"},"'function'"),n("span",{class:"token punctuation"},")"),s(),n("span",{class:"token punctuation"},"{"),s(`
        `),n("span",{class:"token function"},"warnOnFunctionType"),n("span",{class:"token punctuation"},"("),s("returnFiber"),n("span",{class:"token punctuation"},")"),s(`
      `),n("span",{class:"token punctuation"},"}"),s(`
    `),n("span",{class:"token punctuation"},"}"),s(`

    `),n("span",{class:"token comment"},"// Remaining cases are all treated as empty."),s(`
    `),n("span",{class:"token keyword"},"return"),s(),n("span",{class:"token function"},"deleteRemainingChildren"),n("span",{class:"token punctuation"},"("),s("returnFiber"),n("span",{class:"token punctuation"},","),s(" currentFirstChild"),n("span",{class:"token punctuation"},")"),s(`
  `),n("span",{class:"token punctuation"},"}"),s(`

  `),n("span",{class:"token keyword"},"return"),s(` reconcileChildFibers
`),n("span",{class:"token punctuation"},"}"),s(`
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])]),n("p",null,[s("在 "),n("code",null,"ChildReconciler"),s(" 函数中，最后会返回 "),n("code",null,"reconcileChildFibers"),s(" 函数。")]),n("p",null,[s("在 "),n("code",null,"reconcileChildFibers(returnFiber, currentFirstChild, newChild, lanes)"),s(" 函数中：")]),n("ul",null,[n("li",null,[n("p",null,[s("判断 "),n("code",null,"newChild"),s(" 节点（调用函数组件返回的新 "),n("code",null,"child"),s("）的类型，并执行不同的操作。")]),n("ul",null,[n("li",null,[n("code",null,"newChild"),s(" 为 "),n("code",null,"object"),s(" 且不为 "),n("code",null,"null"),s(" 的情况下 "),n("ul",null,[n("li",null,[n("code",null,"newChild.$$typeof"),s(" 为 "),n("code",null,"REACT_ELEMENT_TYPE"),s("，则调用 "),n("code",null,"placeSingleChild(reconcileSingleElement())")]),n("li",null,[n("code",null,"newChild.$$typeof"),s(" 为 "),n("code",null,"REACT_PORTAL_TYPE"),s("，则调用 "),n("code",null,"placeSingleChild(reconcileSinglePortal())")]),n("li",null,[n("code",null,"newChild.$$typeof"),s(" 为 "),n("code",null,"REACT_LAZY_TYPE"),s("，则调用 "),n("code",null,"reconcileChildFibers()")]),n("li",null,[n("code",null,"newChild"),s(" 为 "),n("code",null,"Array"),s("，则调用 "),n("code",null,"reconcileChildrenArray()")]),n("li",null,[n("code",null,"newChild"),s(" 为 "),n("code",null,"Iterator"),s("，则调用 "),n("code",null,"reconcileChildrenIterator()")]),n("li",null,[s("否则，调用 "),n("code",null,"throwOnInvalidObjectType"),s(" 抛出错误")])])]),n("li",null,[n("code",null,"newChild"),s(" 为 "),n("code",null,"string"),s(" （不为空字符串）或者 "),n("code",null,"number"),s("，则调用 "),n("code",null,"placeSingleChild(reconcileSingleTextNode())")])]),n("p",null,[s("更新渲染时 "),n("code",null,"placeSingleChild"),s(" 会把新创建的 "),n("code",null,"fiber"),s(" 节点标记为 "),n("code",null,"Placement"),s(", 待到 "),n("code",null,"commit"),s(" 阶段处理，其中 "),n("code",null,"ReactElement"),s(", "),n("code",null,"Portal"),s(", "),n("code",null,"TextNode"),s(" 三种类型的节点需要进行处理")])]),n("li",null,[n("p",null,[s("然后，调用 "),n("code",null,"deleteRemainingChildren"),s(" 删除掉所有子节点。因为，最后只有可能"),n("code",null,"newChild === null"),s("，说明新的更新清空掉了所有子节点。")]),n("p",null,[s("在 "),n("code",null,"deleteRemainingChildren"),s(" 函数中，通过调用 "),n("code",null,"deleteChild"),s(" 逐个删除子节点，但删除子节点并不是真的删除这个对象，而是通过 "),n("code",null,"firstEffect"),s("、"),n("code",null,"lastEffect"),s("、"),n("code",null,"nextEffect"),s(" 属性来维护一个 "),n("code",null,"EffectList"),s("（链表结构），通过 "),n("code",null,"effectTag"),s(" 标记当前删除操作，在后续 "),n("code",null,"commit"),s(" 阶段会使用到。")])])])]),n("li",null,[n("p",null,[s("最终，返回 "),n("code",null,"workInProgress.child")])])])])],-1),u=a(`<h2 id="react-组件通信方式" tabindex="-1"><a class="header-anchor" href="#react-组件通信方式" aria-hidden="true">#</a> React 组件通信方式</h2><h3 id="props-callback-方式" tabindex="-1"><a class="header-anchor" href="#props-callback-方式" aria-hidden="true">#</a> props / callback 方式</h3><ul><li><p>父组件：通过 <code>props</code> 将信息传递给子组件</p><p>【父组件】 -&gt; 通过自身 <code>state</code> 改变，重新渲染，传递 <code>props</code> -&gt; 通知【子组件】</p></li><li><p>子组件：通过执行 <code>props</code> 中的回调函数 <code>callback</code> 来触发父组件的方法</p><p>【子组件】 -&gt; 通过调用【父组件】 <code>props</code> 方法 -&gt; 通知【父组件】</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>

<span class="token keyword">function</span> <span class="token function">Child</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> parentVal<span class="token punctuation">,</span> onChangeParentVal <span class="token punctuation">}</span> <span class="token operator">=</span> props
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;child&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【子组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>父组件 parentVal ：<span class="token punctuation">{</span>parentVal<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>input
        placeholder<span class="token operator">=</span><span class="token string">&quot;修改 childVal 的值&quot;</span>
        onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token function">onChangeParentVal</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>parentVal<span class="token punctuation">,</span> setParentVal<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>childVal<span class="token punctuation">,</span> setChildVal<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;parent&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【父组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>子组件 childVal <span class="token operator">:</span> <span class="token punctuation">{</span>childVal<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>input
        placeholder<span class="token operator">=</span><span class="token string">&quot;修改 parentVal 的值&quot;</span>
        onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token function">setParentVal</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Child parentVal<span class="token operator">=</span><span class="token punctuation">{</span>parentVal<span class="token punctuation">}</span> onChangeParentVal<span class="token operator">=</span><span class="token punctuation">{</span>setChildVal<span class="token punctuation">}</span><span class="token operator">&gt;</span><span class="token operator">&lt;</span><span class="token operator">/</span>Child<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ref-方式" tabindex="-1"><a class="header-anchor" href="#ref-方式" aria-hidden="true">#</a> ref 方式</h3><p>React 支持一个特殊的、可以附加到任何组件上的 <code>ref</code> 属性。此属性可以是一个由 <code>React.createRef()</code> 函数创建的对象、或者一个回调函数、或者一个字符串（遗留 API）。</p><p>当 <code>ref</code> 属性是一个回调函数时，此函数会（根据元素的类型）接收底层 DOM 元素或 <code>class</code> 实例作为其参数，能够直接访问 DOM 元素或组件实例。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// React.forwardRef 接受渲染函数作为参数。React 将使用 props 和 ref 作为参数来调用此函数。此函数应返回 React 节点。</span>
<span class="token keyword">const</span> Child <span class="token operator">=</span> <span class="token function">forwardRef</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">props<span class="token punctuation">,</span> ref</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> inputRef <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// useImperativeHandle: 配合 forwardRef 自定义暴露给父组件的实例值</span>
  <span class="token comment">// useImperativeHandle(ref, createHandle, deps) 接受三个参数：</span>
  <span class="token comment">// &gt; ref : 接受 forWardRef 传递过来的 ref</span>
  <span class="token comment">// &gt; createHandle : 处理函数，返回值作为暴露给父组件的ref对象</span>
  <span class="token comment">// &gt; deps : 依赖项 deps，依赖项更改形成新的ref对象</span>
  <span class="token function">useImperativeHandle</span><span class="token punctuation">(</span>ref<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token function-variable function">focus</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      inputRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;child&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【子组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>input type<span class="token operator">=</span><span class="token string">&quot;text&quot;</span> ref<span class="token operator">=</span><span class="token punctuation">{</span>inputRef<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">Parent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> childRef <span class="token operator">=</span> <span class="token function">useRef</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;parent&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【父组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> childRef<span class="token punctuation">.</span>current<span class="token punctuation">.</span><span class="token function">focus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
        调用子组件方法获取焦点
      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Child ref<span class="token operator">=</span><span class="token punctuation">{</span>childRef<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="context-方式" tabindex="-1"><a class="header-anchor" href="#context-方式" aria-hidden="true">#</a> Context 方式</h3><p><code>Context</code> 设计目的是为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。主要应用场景在于很多不同层级的组件需要访问同样一些的数据。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>

<span class="token keyword">const</span> themes <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">light</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">foreground</span><span class="token operator">:</span> <span class="token string">&#39;#000000&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">&#39;#eeeeee&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">dark</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">foreground</span><span class="token operator">:</span> <span class="token string">&#39;#ffffff&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">background</span><span class="token operator">:</span> <span class="token string">&#39;#222222&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> ThemeContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>themes<span class="token punctuation">.</span>light<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token function-variable function">Child</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// useContext hook : 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。</span>
  <span class="token comment">// 当前的 context 值由上层组件中距离当前组件最近的 &lt;MyContext.Provider&gt; 的 value prop 决定。</span>
  <span class="token comment">// 当组件上层最近的 &lt;MyContext.Provider&gt; 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> foreground<span class="token punctuation">,</span> background<span class="token punctuation">,</span> setThemeContext <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useContext</span><span class="token punctuation">(</span>ThemeContext<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>button
      style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> foreground<span class="token punctuation">,</span> <span class="token literal-property property">background</span><span class="token operator">:</span> background <span class="token punctuation">}</span><span class="token punctuation">}</span>
      onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">setThemeContext</span><span class="token punctuation">(</span>themes<span class="token punctuation">.</span>light<span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token operator">&gt;</span>
      <span class="token constant">I</span> am styled by theme context<span class="token operator">!</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token function-variable function">Parent</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>themeContextValue<span class="token punctuation">,</span> setThemeContext<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span>themes<span class="token punctuation">.</span>dark<span class="token punctuation">)</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token comment">// Context.Provider : 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。</span>
    <span class="token comment">// Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。</span>
    <span class="token comment">// 当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。</span>
    <span class="token operator">&lt;</span>ThemeContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token operator">...</span>themeContextValue<span class="token punctuation">,</span> setThemeContext <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Child <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>ThemeContext<span class="token punctuation">.</span>Provider<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="event-bus-事件总线方式" tabindex="-1"><a class="header-anchor" href="#event-bus-事件总线方式" aria-hidden="true">#</a> Event Bus 事件总线方式</h3><p>在绝大多数情况下，不鼓励使用全局的事件总线在组件之间进行通信。在短期内往往是最简单的解决方案，从长期来看，它维护起来比较困难。</p><p>事件总线模式可以使用 npm 库进行处理，例如 <code>mitt</code> 或 <code>tiny-emitter</code>。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useState<span class="token punctuation">,</span> useEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react&#39;</span>
<span class="token keyword">import</span> mitt <span class="token keyword">from</span> <span class="token string">&#39;mitt&#39;</span>

<span class="token keyword">const</span> emitter <span class="token operator">=</span> <span class="token function">mitt</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>parentVal<span class="token punctuation">,</span> setParentVal<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    emitter<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;parentChange&#39;</span><span class="token punctuation">,</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">setParentVal</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;child&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【子组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>父组件 parentVal ：<span class="token punctuation">{</span>parentVal<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>input
        placeholder<span class="token operator">=</span><span class="token string">&quot;子组件通过 Event Bus 触发父组件的事件&quot;</span>
        onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;childChange&#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>childVal<span class="token punctuation">,</span> setChildVal<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>

  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    emitter<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;childChange&#39;</span><span class="token punctuation">,</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token function">setChildVal</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;parent&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【父组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>子组件 childVal <span class="token operator">:</span> <span class="token punctuation">{</span>childVal<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>input
        placeholder<span class="token operator">=</span><span class="token string">&quot;修改 parentVal 的值&quot;</span>
        onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> emitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">&#39;parentChange&#39;</span><span class="token punctuation">,</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Child <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="react-redux-react-mobx-状态管理方式" tabindex="-1"><a class="header-anchor" href="#react-redux-react-mobx-状态管理方式" aria-hidden="true">#</a> React-redux / React-mobx 状态管理方式</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> configureStore<span class="token punctuation">,</span> createSlice <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@reduxjs/toolkit&#39;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Provider<span class="token punctuation">,</span> useSelector<span class="token punctuation">,</span> useDispatch<span class="token punctuation">,</span> shallowEqual <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;react-redux&#39;</span>

<span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">parentVal</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">childVal</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span> welcomeSlice <span class="token operator">=</span> <span class="token function">createSlice</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;welcome&#39;</span><span class="token punctuation">,</span>
  initialState<span class="token punctuation">,</span>
  <span class="token literal-property property">reducers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token function">changeParentVal</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> <span class="token punctuation">{</span> payload <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>parentVal <span class="token operator">=</span> payload
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token function">changeChildVal</span><span class="token punctuation">(</span><span class="token parameter">state<span class="token punctuation">,</span> <span class="token punctuation">{</span> payload <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      state<span class="token punctuation">.</span>childVal <span class="token operator">=</span> payload
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">extraReducers</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">configureStore</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">reducer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">welcome</span><span class="token operator">:</span> welcomeSlice<span class="token punctuation">.</span>reducer<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">function</span> <span class="token function">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> parentVal <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useSelector</span><span class="token punctuation">(</span><span class="token parameter">state</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>welcome<span class="token punctuation">,</span> shallowEqual<span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> changeChildVal <span class="token punctuation">}</span> <span class="token operator">=</span> welcomeSlice<span class="token punctuation">.</span>actions
  <span class="token keyword">const</span> dispatch <span class="token operator">=</span> <span class="token function">useDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;child&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【子组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>父组件 parentVal ：<span class="token punctuation">{</span>parentVal<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>input
        placeholder<span class="token operator">=</span><span class="token string">&quot;修改 childVal 的值&quot;</span>
        onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeChildVal</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> childVal <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useSelector</span><span class="token punctuation">(</span><span class="token parameter">state</span> <span class="token operator">=&gt;</span> state<span class="token punctuation">.</span>welcome<span class="token punctuation">,</span> shallowEqual<span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token punctuation">{</span> changeParentVal <span class="token punctuation">}</span> <span class="token operator">=</span> welcomeSlice<span class="token punctuation">.</span>actions
  <span class="token keyword">const</span> dispatch <span class="token operator">=</span> <span class="token function">useDispatch</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;parent&quot;</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>【父组件】<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>子组件 childVal <span class="token operator">:</span> <span class="token punctuation">{</span>childVal<span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>input
        placeholder<span class="token operator">=</span><span class="token string">&quot;修改 parentVal 的值&quot;</span>
        onChange<span class="token operator">=</span><span class="token punctuation">{</span><span class="token parameter">e</span> <span class="token operator">=&gt;</span> <span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token function">changeParentVal</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Child <span class="token operator">/</span><span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Provider store<span class="token operator">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span><span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>Parent <span class="token operator">/</span><span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17),k=[l,p,i,r,u];function d(m,v){return t(),o("div",null,k)}const w=e(c,[["render",d],["__file","React组件.html.vue"]]);export{w as default};
