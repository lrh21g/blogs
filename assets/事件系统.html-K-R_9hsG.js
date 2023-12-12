import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const t={},p=e(`<h1 id="事件系统" tabindex="-1"><a class="header-anchor" href="#事件系统" aria-hidden="true">#</a> 事件系统</h1><h2 id="原生-dom-事件" tabindex="-1"><a class="header-anchor" href="#原生-dom-事件" aria-hidden="true">#</a> 原生 DOM 事件</h2><h3 id="注册事件" tabindex="-1"><a class="header-anchor" href="#注册事件" aria-hidden="true">#</a> 注册事件</h3><ul><li><p>设置事件目标的事件属性。事件处理属性由 <code>on</code> + 事件名组成（比如：<code>onchange</code>、<code>onload</code>、<code>onmouseover</code>等）。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> shippingAddressDOM <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;shippingAddress&#39;</span><span class="token punctuation">)</span>
  shippingAddressDOM<span class="token punctuation">.</span><span class="token function-variable function">onsubmit</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>设置 HTML 标签元素的事件属性。</p><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span><span class="token value javascript language-javascript"><span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">&#39;Hello World!&#39;</span><span class="token punctuation">)</span></span><span class="token punctuation">&quot;</span></span></span><span class="token punctuation">&gt;</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当指定一串 JavaScript 代码作为 HTML 事件处理程序属性的值时，浏览器会把代码转换为类似如下的函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">with</span><span class="token punctuation">(</span>document<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">with</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>form <span class="token operator">||</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">with</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/* ... 这里是编码 */</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>EventTarget.addEventListener()</code>：将指定的监听器注册到 <code>EventTarget</code> 上，当该对象触发指定的事件时，指定的回调函数就会被执行。事件目标可以是一个文档上的元素 <code>Element</code>、<code>Document</code> 和 <code>Window</code>，以及任何支持事件的对象（比如 <code>XMLHttpRequest</code>）。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token function">addEventListener</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> listener<span class="token punctuation">,</span> useCapture<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>type</code> : 监听的事件类型（名称），大小写敏感。</li><li><code>listener</code> : 监听函数。当所监听的事件类型触发时，会调用该监听函数。</li><li><code>useCapture</code> : 可选，布尔值。<code>true</code> 表示监听函数将在捕获阶段（capture）触发，默认值为 <code>false</code>（监听函数只在冒泡阶段被触发）。</li></ul></li></ul><h3 id="事件流" tabindex="-1"><a class="header-anchor" href="#事件流" aria-hidden="true">#</a> 事件流</h3><p>事件流分为 3 个阶段：</p><ul><li>捕获阶段（Capturing phase） ：从 <code>window</code> 对象传导到目标节点。</li><li>目标阶段（Target phase） ：在目标节点上触发。</li><li>冒泡阶段（Bubbling phase） ：从目标节点传导回 <code>window</code> 对象（从底层传回上层）。并不是所有的事件都会冒泡，有些事件并不存在冒泡事件，如：<code>blur</code>、<code>focus</code>、<code>mouseenter</code> 等</li></ul><p>阻止事件冒泡：</p><ul><li><code>event.stopPropagation()</code> ：如果当前元素上存在其他处理程序都会继续运行。同时，不能防止任何默认行为的发生，可以使用 <code>event.preventDefault()</code> 阻止事件触发后默认动作的发生。</li><li><code>event.stopImmediatePropagation()</code> : 如果多个事件监听器被附加到相同元素的相同事件类型上，当此事件触发时，它们会按其被添加的顺序被调用。如果在其中一个事件监听器中执行 <code>stopImmediatePropagation()</code> ，那么剩下的事件监听器都不会被调用。</li></ul><p><code>event.eventPhase</code> 获取事件流当前处于的阶段，返回一个代表当前执行阶段的整数值。</p><ul><li><code>0</code> : 没有事件正在被处理</li><li><code>1</code> : 表示处于捕获阶段（Capturing phase）</li><li><code>2</code> : 表示处于目标阶段（Target phase）</li><li><code>3</code> : 表示处于冒泡阶段（Bubbling phase）</li></ul><h3 id="事件委托-代理" tabindex="-1"><a class="header-anchor" href="#事件委托-代理" aria-hidden="true">#</a> 事件委托（代理）</h3><p>由于事件会在冒泡阶段向上传播到父节点，可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">&#39;ul&#39;</span><span class="token punctuation">)</span>

ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>tagName<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">&#39;li&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// do something ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="react-合成事件-syntheticevent" tabindex="-1"><a class="header-anchor" href="#react-合成事件-syntheticevent" aria-hidden="true">#</a> React 合成事件（SyntheticEvent）</h2><p>合成事件（SyntheticEvent）：React 跨浏览器原生事件包装器。具有与浏览器原生事件相同的接口，包括 <code>stopPropagation()</code> 和 <code>preventDefault()</code> ，除了事件在所有浏览器中他们工作方式都相同。</p><p>采用合成事件模式的好处：</p><ul><li>兼容性，跨平台。每个浏览器的内核都不相同，React 通过顶层事件代理机制，保证冒泡的统一性，抹平不同浏览器事件对象之间的差异，将不同平台的事件进行模拟成合成事件，使其能够跨浏览器执行。</li><li>将所有事件统一管理。在原生事件中，所有的事件都绑定在对应的 DOM 上，如果页面复杂，绑定的事件会非常多，这样就会造成一些不可控的问题。</li><li>避免垃圾回收。事件会被频繁的创建和回收，会影响性能。为了解决这个问题，React 引入事件池，通过事件池来获取和释放事件。所有的事件并不会被释放，而是存入到一个数组中，如果这个事件触发，则直接在这个数组中弹出即可，避免了频繁创建和销毁。</li></ul><h3 id="与原生事件的区别" tabindex="-1"><a class="header-anchor" href="#与原生事件的区别" aria-hidden="true">#</a> 与原生事件的区别</h3><ul><li><p>React 事件使用驼峰命名，而不是全部小写（比如：<code>onClick</code>）；原生事件使用纯小写命名（比如：<code>onclick</code>）。</p></li><li><p>通过 JSX , 传递一个函数作为事件处理程序；原生事件传递的是字符串。</p></li><li><p>事件源不同，阻止默认事件的方式不同。</p><p>在 React 中，获取到的事件源（<code>event</code>）并非是真正的事件 <code>event</code>，而是经过 React 单独处理的 <code>event</code>。</p><ul><li>在合成事件中，事件处理程序返回 false 将不再停止事件冒泡。 应该根据需要手动 <code>e.stopPropagation()</code> 或 <code>e.preventDefault()</code> 。</li><li>在原生事件中，可以通过 <code>e.preventDefault()</code> 和 <code>return false</code> 来阻止默认事件。</li></ul></li><li><p>处理捕获阶段的注册事件。</p><p>在 React 中，所有的绑定事件（如：<code>onClick</code>、<code>onChange</code>）都是冒泡阶段执行。为捕获阶段注册事件处理程序，需要将 <code>Capture</code> 附加到事件名称中（如：<code>onClickCapture</code>）。</p></li></ul><h3 id="合成事件与原生事件的执行顺序" tabindex="-1"><a class="header-anchor" href="#合成事件与原生事件的执行顺序" aria-hidden="true">#</a> 合成事件与原生事件的执行顺序</h3><ul><li>React 16.x : <code>document</code> 捕获 --&gt; 原生事件捕获 --&gt; 原生事件冒泡 --&gt; React 合成事件捕获 --&gt; React 合成事件冒泡 --&gt; <code>document</code> 冒泡</li><li>React 17.x / 18.x : <code>document</code> 捕获 --&gt; React 合成事件捕获 --&gt; 原生事件捕获 --&gt; 原生事件冒泡 --&gt; React 合成事件冒泡 --&gt; <code>document</code> 冒泡</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">EventCompound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">useEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;div&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> button <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">&#39;button&#39;</span><span class="token punctuation">)</span>

    div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原生冒泡：div元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    button<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原生冒泡：button元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原生捕获：div元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    button<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
      <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;原生捕获：button元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token boolean">true</span>
    <span class="token punctuation">)</span>

    document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;document元素冒泡&#39;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>
      <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;document元素捕获&#39;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token boolean">true</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div
      id<span class="token operator">=</span><span class="token string">&quot;div&quot;</span>
      onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React冒泡：div元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      onClickCapture<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React捕获：div元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button
        id<span class="token operator">=</span><span class="token string">&quot;button&quot;</span>
        onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React冒泡：button元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
        onClickCapture<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React捕获：button元素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">&gt;</span>
        执行顺序 v16<span class="token operator">/</span>v17<span class="token operator">/</span>v18
      <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="react-16-事件系统" tabindex="-1"><a class="header-anchor" href="#react-16-事件系统" aria-hidden="true">#</a> React 16 事件系统</h2><h3 id="事件池" tabindex="-1"><a class="header-anchor" href="#事件池" aria-hidden="true">#</a> 事件池</h3><div class="hint-container warning"><p class="hint-container-title">注意</p><p>事件池仅适用于 React 16 及更早版本，Web 端的 React 17+ 不再使用事件池。</p></div><h4 id="事件池简介" tabindex="-1"><a class="header-anchor" href="#事件池简介" aria-hidden="true">#</a> 事件池简介</h4><p>React 合成事件（SyntheticEvent）对象会被放入事件池中统一管理，不同类型的合成事件对应不同的事件池。</p><p>合成事件（SyntheticEvent）对象可以被复用，当所有事件处理函数被调用之后，其所有属性都会被置空。如果需要在事件处理函数运行之后获取事件对象的属性，需要调用 <code>e.persist()</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">ExampleEventCompound</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">handleChange</span> <span class="token operator">=</span> <span class="token parameter">event</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    event<span class="token punctuation">.</span><span class="token function">persist</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;input value&#39;</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">/* 如果未调用 e.persist() ，会提示警告，event 属性被设置为空。 */</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setTimeout input value&#39;</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span>target<span class="token punctuation">.</span>value<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token operator">&lt;</span>input onChange<span class="token operator">=</span><span class="token punctuation">{</span>handleChange<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="事件池分析" tabindex="-1"><a class="header-anchor" href="#事件池分析" aria-hidden="true">#</a> 事件池分析</h4><p>在点击事件中，实际上会调用 <code>SimpleEventPlugin</code> 中 <code>extractEvents</code> 方法，返回 <code>event</code>。其中，<code>event</code> 通过调用 <code>EventConstructor.getPooled</code> 方法生成。</p><details class="hint-container details"><summary>SimpleEventPlugin</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\SimpleEventPlugin.js</span>

<span class="token keyword">const</span> <span class="token literal-property property">SimpleEventPlugin</span><span class="token operator">:</span> PluginModule<span class="token operator">&lt;</span>MouseEvent<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// simpleEventPluginEventTypes gets populated from</span>
  <span class="token comment">// the DOMEventProperties module.</span>
  <span class="token literal-property property">eventTypes</span><span class="token operator">:</span> simpleEventPluginEventTypes<span class="token punctuation">,</span>
  <span class="token function-variable function">extractEvents</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> TopLevelType<span class="token punctuation">,</span>
    <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber<span class="token punctuation">,</span>
    <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> MouseEvent<span class="token punctuation">,</span>
    <span class="token literal-property property">nativeEventTarget</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> EventTarget<span class="token punctuation">,</span>
    <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags</span>
  <span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> ReactSyntheticEvent <span class="token punctuation">{</span>
    <span class="token keyword">const</span> dispatchConfig <span class="token operator">=</span> topLevelEventsToDispatchConfig<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>dispatchConfig<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">let</span> EventConstructor
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_KEY_PRESS</span><span class="token operator">:</span>
        <span class="token comment">// Firefox creates a keypress event for function keys too. This removes</span>
        <span class="token comment">// the unwanted keypress events. Enter is however both printable and</span>
        <span class="token comment">// non-printable. One would expect Tab to be as well (but it isn&#39;t).</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getEventCharCode</span><span class="token punctuation">(</span>nativeEvent<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>
      <span class="token comment">/* falls through */</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_KEY_DOWN</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_KEY_UP</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticKeyboardEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_BLUR</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_FOCUS</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticFocusEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_CLICK</span><span class="token operator">:</span>
        <span class="token comment">// Firefox creates a click event on right mouse clicks. This removes the</span>
        <span class="token comment">// unwanted click events.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nativeEvent<span class="token punctuation">.</span>button <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>
      <span class="token comment">/* falls through */</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_AUX_CLICK</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DOUBLE_CLICK</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_MOUSE_DOWN</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_MOUSE_MOVE</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_MOUSE_UP</span><span class="token operator">:</span>
      <span class="token comment">// TODO: Disabled elements should not respond to mouse events</span>
      <span class="token comment">/* falls through */</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_MOUSE_OUT</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_MOUSE_OVER</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_CONTEXT_MENU</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticMouseEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DRAG</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DRAG_END</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DRAG_ENTER</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DRAG_EXIT</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DRAG_LEAVE</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DRAG_OVER</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DRAG_START</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_DROP</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticDragEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_TOUCH_CANCEL</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_TOUCH_END</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_TOUCH_MOVE</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_TOUCH_START</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticTouchEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_ANIMATION_END</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_ANIMATION_ITERATION</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_ANIMATION_START</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticAnimationEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_TRANSITION_END</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticTransitionEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_SCROLL</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticUIEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_WHEEL</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticWheelEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_COPY</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_CUT</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_PASTE</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticClipboardEvent
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_GOT_POINTER_CAPTURE</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_LOST_POINTER_CAPTURE</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_POINTER_CANCEL</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_POINTER_DOWN</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_POINTER_MOVE</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_POINTER_OUT</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_POINTER_OVER</span><span class="token operator">:</span>
      <span class="token keyword">case</span> DOMTopLevelEventTypes<span class="token punctuation">.</span><span class="token constant">TOP_POINTER_UP</span><span class="token operator">:</span>
        EventConstructor <span class="token operator">=</span> SyntheticPointerEvent
        <span class="token keyword">break</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token comment">// HTML Events</span>
        <span class="token comment">// @see http://www.w3.org/TR/html5/index.html#events-0</span>
        EventConstructor <span class="token operator">=</span> SyntheticEvent
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> event <span class="token operator">=</span> EventConstructor<span class="token punctuation">.</span><span class="token function">getPooled</span><span class="token punctuation">(</span>
      dispatchConfig<span class="token punctuation">,</span>
      targetInst<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      nativeEventTarget
    <span class="token punctuation">)</span>
    <span class="token function">accumulateTwoPhaseDispatches</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
    <span class="token keyword">return</span> event
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> SimpleEventPlugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><code>EventConstructor.getPooled</code> 实际调用为 <code>SyntheticEvent</code> 中的 <code>getPooledEvent</code> 方法，当 <code>EventConstructor.eventPool</code> 存在时会复用事件对象，否则会创建新的对象。</p><p>在 <code>getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst)</code> 方法中：</p><ul><li><code>dispatchConfig</code> ：该参数将事件对应的 React 元素实例、原生事件、原生事件对应的 DOM 封装成了一个合成事件。比如，冒泡事件中的 <code>onClick</code> 和捕获事件中的 <code>onClickCapture</code></li><li><code>targetInst</code> ：组件的实例，通过 <code>e.target</code>(事件源) 得到对应的 <code>ReactDomComponent</code></li><li><code>nativeEvent</code> ：对应原生事件对象</li><li><code>nativeInst</code> ：原生的事件源</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\legacy-events\\SyntheticEvent.js</span>

<span class="token keyword">function</span> <span class="token function">getPooledEvent</span><span class="token punctuation">(</span><span class="token parameter">dispatchConfig<span class="token punctuation">,</span> targetInst<span class="token punctuation">,</span> nativeEvent<span class="token punctuation">,</span> nativeInst</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> EventConstructor <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>EventConstructor<span class="token punctuation">.</span>eventPool<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> EventConstructor<span class="token punctuation">.</span>eventPool<span class="token punctuation">.</span><span class="token function">pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token function">EventConstructor</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>
      instance<span class="token punctuation">,</span>
      dispatchConfig<span class="token punctuation">,</span>
      targetInst<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      nativeInst
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> instance
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">EventConstructor</span><span class="token punctuation">(</span>
    dispatchConfig<span class="token punctuation">,</span>
    targetInst<span class="token punctuation">,</span>
    nativeEvent<span class="token punctuation">,</span>
    nativeInst
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>事件池填充合成事件对象时，会调用 <code>SyntheticEvent</code> 中的 <code>releasePooledEvent</code> 方法。会执行 <code>event.destructor()</code> 方法重置 <code>event</code> 的部分属性，如果事件池没有满，则会填充进去。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\legacy-events\\SyntheticEvent.js</span>

<span class="token keyword">const</span> <span class="token constant">EVENT_POOL_SIZE</span> <span class="token operator">=</span> <span class="token number">10</span>

<span class="token keyword">function</span> <span class="token function">releasePooledEvent</span><span class="token punctuation">(</span><span class="token parameter">event</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> EventConstructor <span class="token operator">=</span> <span class="token keyword">this</span>
  <span class="token function">invariant</span><span class="token punctuation">(</span>
    event <span class="token keyword">instanceof</span> <span class="token class-name">EventConstructor</span><span class="token punctuation">,</span>
    <span class="token string">&#39;Trying to release an event instance into a pool of a different type.&#39;</span>
  <span class="token punctuation">)</span>
  event<span class="token punctuation">.</span><span class="token function">destructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>EventConstructor<span class="token punctuation">.</span>eventPool<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> <span class="token constant">EVENT_POOL_SIZE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    EventConstructor<span class="token punctuation">.</span>eventPool<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事件插件初始化" tabindex="-1"><a class="header-anchor" href="#事件插件初始化" aria-hidden="true">#</a> 事件插件初始化</h3><p>React 将合成事件与原生事件的对应关系存放在 React 事件插件（EventPlugin）中。事件插件可以认为是 React 将不同的合成事件处理函数封装成了一个模块，每个模块处理对应的合成事件。例如：</p><ul><li><code>onClick</code> 事件通过 <code>SimpleEventPlugin</code> 插件进行处理</li><li><code>onChange</code> 事件通过 <code>ChangeEventPlugin</code> 插件进行处理</li><li><code>onMouseEnter</code>、<code>onMouseLeave</code> 通过 <code>EnterLeaveEventPlugin</code> 插件进行处理</li><li>......</li></ul><h4 id="注册事件插件" tabindex="-1"><a class="header-anchor" href="#注册事件插件" aria-hidden="true">#</a> 注册事件插件</h4><p>为处理合成事件与原生事件的对应关系，React 采用了初始化注册事件插件的方式。通过执行 <code>EventPluginRegistry</code> 中的 <code>injectEventPluginsByName()</code> 方法进行相关事件插件注册。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\client\\ReactDOMClientInjection.js</span>

<span class="token doc-comment comment">/**
 * Some important event plugins included by default (without having to require
 * them).
 */</span>
<span class="token function">injectEventPluginsByName</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">SimpleEventPlugin</span><span class="token operator">:</span> SimpleEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">EnterLeaveEventPlugin</span><span class="token operator">:</span> EnterLeaveEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">ChangeEventPlugin</span><span class="token operator">:</span> ChangeEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">SelectEventPlugin</span><span class="token operator">:</span> SelectEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">BeforeInputEventPlugin</span><span class="token operator">:</span> BeforeInputEventPlugin<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>执行 <code>EventPluginRegistry</code> 中的 <code>injectEventPluginsByName()</code> 函数生成 <code>namesToPlugins</code>，然后执行 <code>recomputePluginOrdering</code>。生成的 <code>namesToPlugins</code> 如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> namesToPlugins <span class="token operator">=</span> <span class="token punctuation">{</span>
  SimpleEventPlugin<span class="token punctuation">,</span>
  EnterLeaveEventPlugin<span class="token punctuation">,</span>
  ChangeEventPlugin<span class="token punctuation">,</span>
  SelectEventPlugin<span class="token punctuation">,</span>
  BeforeInputEventPlugin<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="hint-container details"><summary>injectEventPluginsByName(injectedNamesToPlugins) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\legacy-events\\EventPluginRegistry.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">injectEventPluginsByName</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">injectedNamesToPlugins</span><span class="token operator">:</span> NamesToPlugins</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> isOrderingDirty <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> pluginName <span class="token keyword">in</span> injectedNamesToPlugins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>injectedNamesToPlugins<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> pluginModule <span class="token operator">=</span> injectedNamesToPlugins<span class="token punctuation">[</span>pluginName<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token operator">!</span>namesToPlugins<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">)</span> <span class="token operator">||</span>
      namesToPlugins<span class="token punctuation">[</span>pluginName<span class="token punctuation">]</span> <span class="token operator">!==</span> pluginModule
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">invariant</span><span class="token punctuation">(</span>
        <span class="token operator">!</span>namesToPlugins<span class="token punctuation">[</span>pluginName<span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token string">&#39;EventPluginRegistry: Cannot inject two different event plugins &#39;</span> <span class="token operator">+</span>
          <span class="token string">&#39;using the same name, \`%s\`.&#39;</span><span class="token punctuation">,</span>
        pluginName
      <span class="token punctuation">)</span>
      namesToPlugins<span class="token punctuation">[</span>pluginName<span class="token punctuation">]</span> <span class="token operator">=</span> pluginModule
      isOrderingDirty <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isOrderingDirty<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">recomputePluginOrdering</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>执行 <code>recomputePluginOrdering()</code> 函数生成 <code>plugins</code> 数组（存储注册的所有插件列表，初始化为空），然后执行 <code>publishEventForPlugin</code>。生成的 <code>plugins</code> 如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> plugins <span class="token operator">=</span> <span class="token punctuation">[</span>LegacySimpleEventPlugin<span class="token punctuation">,</span> LegacyEnterLeaveEventPlugin<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="hint-container details"><summary>recomputePluginOrdering 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\legacy-events\\EventPluginRegistry.js</span>

<span class="token keyword">function</span> <span class="token function">recomputePluginOrdering</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>eventPluginOrder<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Wait until an \`eventPluginOrder\` is injected.</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> pluginName <span class="token keyword">in</span> namesToPlugins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> pluginModule <span class="token operator">=</span> namesToPlugins<span class="token punctuation">[</span>pluginName<span class="token punctuation">]</span>
    <span class="token keyword">const</span> pluginIndex <span class="token operator">=</span> eventPluginOrder<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>pluginName<span class="token punctuation">)</span>
    <span class="token function">invariant</span><span class="token punctuation">(</span>
      pluginIndex <span class="token operator">&gt;</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token string">&#39;EventPluginRegistry: Cannot inject event plugins that do not exist in &#39;</span> <span class="token operator">+</span>
        <span class="token string">&#39;the plugin ordering, \`%s\`.&#39;</span><span class="token punctuation">,</span>
      pluginName
    <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>plugins<span class="token punctuation">[</span>pluginIndex<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">continue</span>
    <span class="token punctuation">}</span>
    <span class="token function">invariant</span><span class="token punctuation">(</span>
      pluginModule<span class="token punctuation">.</span>extractEvents<span class="token punctuation">,</span>
      <span class="token string">&#39;EventPluginRegistry: Event plugins must implement an \`extractEvents\` &#39;</span> <span class="token operator">+</span>
        <span class="token string">&#39;method, but \`%s\` does not.&#39;</span><span class="token punctuation">,</span>
      pluginName
    <span class="token punctuation">)</span>
    plugins<span class="token punctuation">[</span>pluginIndex<span class="token punctuation">]</span> <span class="token operator">=</span> pluginModule
    <span class="token keyword">const</span> publishedEvents <span class="token operator">=</span> pluginModule<span class="token punctuation">.</span>eventTypes
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> eventName <span class="token keyword">in</span> publishedEvents<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">invariant</span><span class="token punctuation">(</span>
        <span class="token function">publishEventForPlugin</span><span class="token punctuation">(</span>
          publishedEvents<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">,</span>
          pluginModule<span class="token punctuation">,</span>
          eventName
        <span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token string">&#39;EventPluginRegistry: Failed to publish event \`%s\` for plugin \`%s\`.&#39;</span><span class="token punctuation">,</span>
        eventName<span class="token punctuation">,</span>
        pluginName
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>执行 <code>publishEventForPlugin()</code> 函数生成 <code>registrationNameModules</code>对象（React 合成事件与对应事件插件的映射关系） 和 <code>registrationNameDependencies</code>（React 合成事件到原生事件的映射关系）。</p><details class="hint-container details"><summary>publishEventForPlugin(dispatchConfig, pluginModule, eventName) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\legacy-events\\EventPluginRegistry.js</span>

<span class="token keyword">function</span> <span class="token function">publishEventForPlugin</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">dispatchConfig</span><span class="token operator">:</span> DispatchConfig<span class="token punctuation">,</span>
  <span class="token literal-property property">pluginModule</span><span class="token operator">:</span> PluginModule<span class="token operator">&lt;</span>AnyNativeEvent<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">eventName</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token function">invariant</span><span class="token punctuation">(</span>
    <span class="token operator">!</span>eventNameDispatchConfigs<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>eventName<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token string">&#39;EventPluginRegistry: More than one plugin attempted to publish the same &#39;</span> <span class="token operator">+</span>
      <span class="token string">&#39;event name, \`%s\`.&#39;</span><span class="token punctuation">,</span>
    eventName
  <span class="token punctuation">)</span>
  eventNameDispatchConfigs<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span> <span class="token operator">=</span> dispatchConfig

  <span class="token keyword">const</span> phasedRegistrationNames <span class="token operator">=</span> dispatchConfig<span class="token punctuation">.</span>phasedRegistrationNames
  <span class="token keyword">if</span> <span class="token punctuation">(</span>phasedRegistrationNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> phaseName <span class="token keyword">in</span> phasedRegistrationNames<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>phasedRegistrationNames<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>phaseName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> phasedRegistrationName <span class="token operator">=</span> phasedRegistrationNames<span class="token punctuation">[</span>phaseName<span class="token punctuation">]</span>
        <span class="token function">publishRegistrationName</span><span class="token punctuation">(</span>
          phasedRegistrationName<span class="token punctuation">,</span>
          pluginModule<span class="token punctuation">,</span>
          eventName
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>dispatchConfig<span class="token punctuation">.</span>registrationName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">publishRegistrationName</span><span class="token punctuation">(</span>
      dispatchConfig<span class="token punctuation">.</span>registrationName<span class="token punctuation">,</span>
      pluginModule<span class="token punctuation">,</span>
      eventName
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul><p>在 <code>EventPluginRegistry</code> 中，定义的全局对象：</p><ul><li><p><code>registrationNameModule</code> 全局对象：用于存储 React 合成事件与对应事件插件的映射关系。包含了 React 所支持的所有事件类型，在处理原生组件的 <code>props</code> 时，可用于判断一个组件的 <code>prop</code> 是否为事件类型，会根据不同的事件名称，找到对应的事件插件，然后统一绑定在 <code>document</code> 上。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">onBlur</span><span class="token operator">:</span> SimpleEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">onClick</span><span class="token operator">:</span> SimpleEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">onClickCapture</span><span class="token operator">:</span> SimpleEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">onChange</span><span class="token operator">:</span> ChangeEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">onChangeCapture</span><span class="token operator">:</span> ChangeEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">onMouseEnter</span><span class="token operator">:</span> EnterLeaveEventPlugin<span class="token punctuation">,</span>
  <span class="token literal-property property">onMouseLeave</span><span class="token operator">:</span> EnterLeaveEventPlugin<span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>registrationNameDependencies</code> 全局对象：用于存储 React 合成事件到原生事件的映射关系。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token literal-property property">onBlur</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;blur&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">onClick</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">onClickCapture</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;click&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">onChange</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;blur&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;change&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;click&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;focus&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;input&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;keydown&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;keyup&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;selectionchange&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">onMouseEnter</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;mouseout&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;mouseover&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">onMouseLeave</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;mouseout&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;mouseover&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p><code>plugins</code> 全局对象：用于存储注册的所有插件列表，初始化为空。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> plugins <span class="token operator">=</span> <span class="token punctuation">[</span>LegacySimpleEventPlugin<span class="token punctuation">,</span> LegacyEnterLeaveEventPlugin<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="事件插件结构" tabindex="-1"><a class="header-anchor" href="#事件插件结构" aria-hidden="true">#</a> 事件插件结构</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> type DispatchConfig <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token operator">|</span>
  <span class="token comment">// 依赖的原生事件，即与之相关联的原生事件。注意，大多数事件一般只对应一个，复杂的事件会对应多个（如：onChange）</span>
  <span class="token literal-property property">dependencies</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>TopLevelType<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token comment">// 对应的事件名称，React 会根据该参数查找对应的事件类型。</span>
  phasedRegistrationNames<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token operator">|</span>
    <span class="token literal-property property">bubbled</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token comment">// 对应冒泡阶段</span>
    <span class="token literal-property property">captured</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token comment">// 对应捕获阶段</span>
  <span class="token operator">|</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// props事件注册名称，并不是所有的事件都具有冒泡事件的（比如：onMouseEnter），如果不支持冒泡，只会有 registrationName，而不会有 phasedRegistrationNames</span>
  registrationName<span class="token operator">?</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">eventPriority</span><span class="token operator">:</span> EventPriority<span class="token punctuation">,</span> <span class="token comment">// 用来处理事件的优先级</span>
<span class="token operator">|</span><span class="token punctuation">}</span>

<span class="token keyword">export</span> type EventTypes <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>key<span class="token operator">:</span> string<span class="token punctuation">]</span><span class="token operator">:</span> DispatchConfig<span class="token punctuation">,</span> <span class="token operator">...</span> <span class="token punctuation">}</span>

<span class="token keyword">export</span> type PluginModule<span class="token operator">&lt;</span>NativeEvent<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">eventTypes</span><span class="token operator">:</span> EventTypes<span class="token punctuation">,</span> <span class="token comment">// 声明插件的事件类型</span>
  <span class="token comment">// 事件进行处理的参数</span>
  <span class="token function-variable function">extractEvents</span><span class="token operator">:</span> <span class="token punctuation">(</span>
    <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> TopLevelType<span class="token punctuation">,</span>
    <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber<span class="token punctuation">,</span>
    <span class="token literal-property property">nativeTarget</span><span class="token operator">:</span> NativeEvent<span class="token punctuation">,</span>
    <span class="token literal-property property">nativeEventTarget</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> EventTarget<span class="token punctuation">,</span>
    <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
    container<span class="token operator">?</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node</span>
  <span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token operator">?</span>ReactSyntheticEvent<span class="token punctuation">,</span>
  tapMoveThreshold<span class="token operator">?</span><span class="token operator">:</span> number<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="事件绑定流程" tabindex="-1"><a class="header-anchor" href="#事件绑定流程" aria-hidden="true">#</a> 事件绑定流程</h3><h4 id="事件绑定处理逻辑" tabindex="-1"><a class="header-anchor" href="#事件绑定处理逻辑" aria-hidden="true">#</a> 事件绑定处理逻辑</h4><ul><li><p><code>diffProperties</code> 处理 React 合成事件</p><ul><li><p>在 React 的调和过程（Reconcilliation）中，通过 JSX 编译转换为 React Element 对象的每一个子节点都会形成一个与之对应的 <code>fiber</code> 对象。事件最终保存在 <code>fiber</code> 中的 <code>memoizedProps</code> 和 <code>pendingProps</code> 中。</p></li><li><p>React 在调合子节点后，进入 diff 阶段，会用 diff props 函数 <code>diffProperties</code> 单独处理。如果发现是 React 合成事件就会调用 <code>legacyListenToEvent</code> 函数，注册事件监听器。</p><details class="hint-container details"><summary>diffProperties(domElement, tag, lastRawProps, nextRawProps, rootContainerElement) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\client\\ReactDOMComponent.js</span>

<span class="token keyword">function</span> <span class="token function">ensureListeningTo</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">rootContainerElement</span><span class="token operator">:</span> Element <span class="token operator">|</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">registrationName</span><span class="token operator">:</span> string</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> isDocumentOrFragment <span class="token operator">=</span>
    rootContainerElement<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> <span class="token constant">DOCUMENT_NODE</span> <span class="token operator">||</span>
    rootContainerElement<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> <span class="token constant">DOCUMENT_FRAGMENT_NODE</span>
  <span class="token keyword">const</span> doc <span class="token operator">=</span> isDocumentOrFragment
    <span class="token operator">?</span> rootContainerElement
    <span class="token operator">:</span> rootContainerElement<span class="token punctuation">.</span>ownerDocument
  <span class="token function">legacyListenToEvent</span><span class="token punctuation">(</span>registrationName<span class="token punctuation">,</span> doc<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// Calculate the diff between the two objects.</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">diffProperties</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">domElement</span><span class="token operator">:</span> Element<span class="token punctuation">,</span>
  <span class="token literal-property property">tag</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">lastRawProps</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">nextRawProps</span><span class="token operator">:</span> Object<span class="token punctuation">,</span>
  <span class="token literal-property property">rootContainerElement</span><span class="token operator">:</span> Element <span class="token operator">|</span> Document</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Array<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// ......</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span>propKey <span class="token keyword">in</span> nextProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> nextProp <span class="token operator">=</span> nextProps<span class="token punctuation">[</span>propKey<span class="token punctuation">]</span>
    <span class="token keyword">const</span> lastProp <span class="token operator">=</span> lastProps <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> lastProps<span class="token punctuation">[</span>propKey<span class="token punctuation">]</span> <span class="token operator">:</span> <span class="token keyword">undefined</span>

    <span class="token comment">//......</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>registrationNameModules<span class="token punctuation">.</span><span class="token function">hasOwnProperty</span><span class="token punctuation">(</span>propKey<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nextProp <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">ensureListeningTo</span><span class="token punctuation">(</span>rootContainerElement<span class="token punctuation">,</span> propKey<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>updatePayload <span class="token operator">&amp;&amp;</span> lastProp <span class="token operator">!==</span> nextProp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// This is a special case. If any listener updates we need to ensure</span>
        <span class="token comment">// that the &quot;current&quot; props pointer gets updated so we need a commit</span>
        <span class="token comment">// to update this element.</span>
        updatePayload <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ......</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// ......</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul></li><li><p><code>legacyListenToEvent</code> 注册事件监听器。</p><p>在 <code>legacyListenToEvent</code> 函数中，</p><ul><li>首先，获取 React 合成事件对应的原生事件集合。比如：<code>onClick</code> 对应 <code>[click]</code>；<code>onChange</code> 对应 <code>[blur , change , input , keydown , keyup]</code>。</li><li>然后，遍历依赖项的数组，调用 <code>legacyListenToTopLevelEvent</code> 绑定事件。 <ul><li>基础事件（比如：<code>click</code> 等），会默认按照事件冒泡处理（调用 <code>trapBubbledEvent</code> 函数处理）。</li><li>特殊事件（比如：<code>scroll</code>、<code>focus</code>、<code>blur</code> 等），会按照事件捕获处理（调用 <code>trapCapturedEvent</code> 函数处理）。</li></ul></li></ul><details class="hint-container details"><summary>legacyListenToEvent(registrationName, mountAt) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">legacyListenToEvent</span><span class="token punctuation">(</span>
  <span class="token literal-property property">registrationName</span><span class="token operator">:</span> string<span class="token punctuation">,</span> <span class="token comment">// 合成事件名</span>
  <span class="token literal-property property">mountAt</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> listenerMap <span class="token operator">=</span> <span class="token function">getListenerMapForElement</span><span class="token punctuation">(</span>mountAt<span class="token punctuation">)</span>
  <span class="token keyword">const</span> dependencies <span class="token operator">=</span> registrationNameDependencies<span class="token punctuation">[</span>registrationName<span class="token punctuation">]</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dependencies<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> dependency <span class="token operator">=</span> dependencies<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token comment">// 合成事件所依赖的事件组</span>
    <span class="token function">legacyListenToTopLevelEvent</span><span class="token punctuation">(</span>dependency<span class="token punctuation">,</span> mountAt<span class="token punctuation">,</span> listenerMap<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">legacyListenToTopLevelEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">,</span>
  <span class="token literal-property property">mountAt</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">listenerMap</span><span class="token operator">:</span> Map<span class="token operator">&lt;</span>DOMTopLevelEventType <span class="token operator">|</span> string<span class="token punctuation">,</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token parameter">any</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">)</span><span class="token operator">&gt;</span></span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>listenerMap<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_SCROLL</span><span class="token operator">:</span>
        <span class="token function">trapCapturedEvent</span><span class="token punctuation">(</span><span class="token constant">TOP_SCROLL</span><span class="token punctuation">,</span> mountAt<span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_FOCUS</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_BLUR</span><span class="token operator">:</span>
        <span class="token function">trapCapturedEvent</span><span class="token punctuation">(</span><span class="token constant">TOP_FOCUS</span><span class="token punctuation">,</span> mountAt<span class="token punctuation">)</span>
        <span class="token function">trapCapturedEvent</span><span class="token punctuation">(</span><span class="token constant">TOP_BLUR</span><span class="token punctuation">,</span> mountAt<span class="token punctuation">)</span>
        <span class="token comment">// We set the flag for a single dependency later in this function,</span>
        <span class="token comment">// but this ensures we mark both as attached rather than just one.</span>
        listenerMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token constant">TOP_BLUR</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        listenerMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token constant">TOP_FOCUS</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_CANCEL</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_CLOSE</span><span class="token operator">:</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isEventSupported</span><span class="token punctuation">(</span><span class="token function">getRawEventName</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">trapCapturedEvent</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">,</span> mountAt<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_INVALID</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_SUBMIT</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token constant">TOP_RESET</span><span class="token operator">:</span>
        <span class="token comment">// We listen to them on the target DOM elements.</span>
        <span class="token comment">// Some of them bubble so we don&#39;t want them to fire twice.</span>
        <span class="token keyword">break</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token comment">// By default, listen on the top level to all non-media events.</span>
        <span class="token comment">// Media events don&#39;t bubble so adding the listener wouldn&#39;t do anything.</span>
        <span class="token keyword">const</span> isMediaEvent <span class="token operator">=</span> mediaEventTypes<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token operator">-</span><span class="token number">1</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMediaEvent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">trapBubbledEvent</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">,</span> mountAt<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    listenerMap<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>trapBubbledEvent(topLevelType, element) 函数 / trapCapturedEvent(topLevelType, element) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\ReactDOMEventListener.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trapBubbledEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">,</span>
  <span class="token literal-property property">element</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token function">trapEventForPluginEventSystem</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> topLevelType<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">trapCapturedEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">,</span>
  <span class="token literal-property property">element</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token function">trapEventForPluginEventSystem</span><span class="token punctuation">(</span>element<span class="token punctuation">,</span> topLevelType<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>绑定事件统一处理函数 <code>dispatchEvent</code>，进行事件监听。</p><p>对合成事件进行冒泡/捕获处理，会调用 <code>trapEventForPluginEventSystem()</code> 函数。在函数中：</p><ul><li>判断事件类型，并绑定事件统一处理函数 <code>dispatchEvent</code>，对 <code>listerner</code> 进行赋值。</li><li>然后，判断是否为捕获，调用 <code>addEventCaptureListener(container, rawEventName, listener)</code> 或 <code>addEventBubbleListener(container, rawEventName, listener)</code> 进行事件绑定。</li></ul><p>实际上，所有的事件都绑定到 <code>document</code> 容器上。</p><details class="hint-container details"><summary>trapEventForPluginEventSystem(container, topLevelType, capture) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\ReactDOMEventListener.js</span>

<span class="token keyword">function</span> <span class="token function">trapEventForPluginEventSystem</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">container</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">topLevelType</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">,</span>
  <span class="token literal-property property">capture</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> listener
  <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token function">getEventPriorityForPluginSystem</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">DiscreteEvent</span><span class="token operator">:</span>
      listener <span class="token operator">=</span> <span class="token function">dispatchDiscreteEvent</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        topLevelType<span class="token punctuation">,</span>
        <span class="token constant">PLUGIN_EVENT_SYSTEM</span><span class="token punctuation">,</span>
        container
      <span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">UserBlockingEvent</span><span class="token operator">:</span>
      listener <span class="token operator">=</span> <span class="token function">dispatchUserBlockingUpdate</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        topLevelType<span class="token punctuation">,</span>
        <span class="token constant">PLUGIN_EVENT_SYSTEM</span><span class="token punctuation">,</span>
        container
      <span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ContinuousEvent</span><span class="token operator">:</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      listener <span class="token operator">=</span> <span class="token function">dispatchEvent</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        topLevelType<span class="token punctuation">,</span>
        <span class="token constant">PLUGIN_EVENT_SYSTEM</span><span class="token punctuation">,</span>
        container
      <span class="token punctuation">)</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> rawEventName <span class="token operator">=</span> <span class="token function">getRawEventName</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>capture<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">addEventCaptureListener</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> rawEventName<span class="token punctuation">,</span> listener<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">addEventBubbleListener</span><span class="token punctuation">(</span>container<span class="token punctuation">,</span> rawEventName<span class="token punctuation">,</span> listener<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// packages\\react-dom\\src\\events\\EventListener.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">addEventBubbleListener</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">element</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">eventType</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">listener</span><span class="token operator">:</span> Function</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>eventType<span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">addEventCaptureListener</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">element</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">eventType</span><span class="token operator">:</span> string<span class="token punctuation">,</span>
  <span class="token literal-property property">listener</span><span class="token operator">:</span> Function</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  element<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span>eventType<span class="token punctuation">,</span> listener<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul><h4 id="事件绑定流程总结" tabindex="-1"><a class="header-anchor" href="#事件绑定流程总结" aria-hidden="true">#</a> 事件绑定流程总结</h4><ul><li>在 React 中，将元素转换为与之对应的 <code>fiber</code> 对象，如果发现 <code>props</code> 是合成事件（如：<code>onClick</code>），则会按照事件系统逻辑进行处理</li><li>根据 React 合成事件类型，获取到对应的原生事件类型。比如：<code>onClick</code> 对应 <code>[click]</code>；<code>onChange</code> 对应 <code>[blur , change , input , keydown , keyup]</code>。</li><li>判断原生事件类型，进行事件冒泡/事件捕获逻辑处理。大部分事件（如：<code>onClick</code>）都按照冒泡逻辑处理，少数事件（如：<code>scroll</code>）会按照捕获逻辑处理。</li><li>调用 <code>trapEventForPluginEventSystem()</code> 函数进行事件绑定。事件绑定在 <code>document</code> 上，并绑定事件统一处理函数 <code>dispatchEvent</code>。</li></ul><p>注：并不是捕获事件就会走捕获的阶段（如：<code>onClickCapture</code>），实际上，<code>onClickCapture</code> 与 <code>onClick</code> 一样，都是走的冒泡阶段。<code>onScroll</code>、<code>onBlur</code>、<code>onFocus</code>等在事件捕获阶段发生的。</p><h3 id="事件触发流程" tabindex="-1"><a class="header-anchor" href="#事件触发流程" aria-hidden="true">#</a> 事件触发流程</h3><h4 id="事件触发处理逻辑" tabindex="-1"><a class="header-anchor" href="#事件触发处理逻辑" aria-hidden="true">#</a> 事件触发处理逻辑</h4><ul><li><p><code>dispatchEvent</code> 处理事件触发</p><p>React 进行事件绑定的时候，会绑定事件统一处理函数 <code>dispatchEvent</code>，进行事件监听。当触发事件之后，会执行 <code>dispatchEvent</code> 函数。其中，会调用 <code>attemptToDispatchEvent()</code> 函数调度事件。</p><ul><li>首先，根据事件源（即：<code>nativeEvent</code>），调用 <code>const nativeEventTarget = getEventTarget(nativeEvent)</code> 找到真实 DOM 元素（即：<code>nativeEventTarget</code>）</li><li>然后，调用 <code>let targetInst = getClosestInstanceFromNode(nativeEventTarget)</code> ，根据该 DOM 元素，找到与之对应的 <code>fiber</code> ，并赋值给 <code>targetInst</code>。React 在初始化真实 DOM 时，会使用一个随机的 key <code>internalInstanceKey</code> 指针指向当前 DOM 对应的 fiber 对象，fiber 对象用 <code>stateNode</code> 指向了当前的 DOM 元素。</li><li>最后，执行 <code>dispatchEventForLegacyPluginEventSystem</code> 函数，进入 legacy 模式的事件处理函数系统</li></ul><details class="hint-container details"><summary>dispatchEvent(topLevelType, eventSystemFlags, container, nativeEvent) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\ReactDOMEventListener.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">dispatchEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">container</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>_enabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hasQueuedDiscreteEvents</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isReplayableDiscreteEvent</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// If we already have a queue of discrete events, and this is another discrete</span>
    <span class="token comment">// event, then we can&#39;t dispatch it regardless of its target, since they</span>
    <span class="token comment">// need to dispatch in order.</span>
    <span class="token function">queueDiscreteEvent</span><span class="token punctuation">(</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token comment">// Flags that we&#39;re not actually blocked on anything as far as we know.</span>
      topLevelType<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> blockedOn <span class="token operator">=</span> <span class="token function">attemptToDispatchEvent</span><span class="token punctuation">(</span>
    topLevelType<span class="token punctuation">,</span>
    eventSystemFlags<span class="token punctuation">,</span>
    container<span class="token punctuation">,</span>
    nativeEvent
  <span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>blockedOn <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// We successfully dispatched this event.</span>
    <span class="token function">clearIfContinuousEvent</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">,</span> nativeEvent<span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isReplayableDiscreteEvent</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// This this to be replayed later once the target is available.</span>
    <span class="token function">queueDiscreteEvent</span><span class="token punctuation">(</span>
      blockedOn<span class="token punctuation">,</span>
      topLevelType<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    <span class="token function">queueIfContinuousEvent</span><span class="token punctuation">(</span>
      blockedOn<span class="token punctuation">,</span>
      topLevelType<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      container<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// We need to clear only if we didn&#39;t queue because</span>
  <span class="token comment">// queueing is accummulative.</span>
  <span class="token function">clearIfContinuousEvent</span><span class="token punctuation">(</span>topLevelType<span class="token punctuation">,</span> nativeEvent<span class="token punctuation">)</span>

  <span class="token comment">// This is not replayable so we&#39;ll invoke it but without a target,</span>
  <span class="token comment">// in case the event system needs to trace it.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableDeprecatedFlareAPI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">PLUGIN_EVENT_SYSTEM</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">dispatchEventForLegacyPluginEventSystem</span><span class="token punctuation">(</span>
        topLevelType<span class="token punctuation">,</span>
        eventSystemFlags<span class="token punctuation">,</span>
        nativeEvent<span class="token punctuation">,</span>
        <span class="token keyword">null</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">RESPONDER_EVENT_SYSTEM</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// React Flare event system</span>
      <span class="token function">DEPRECATED_dispatchEventForResponderEventSystem</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span>topLevelType<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        nativeEvent<span class="token punctuation">,</span>
        <span class="token function">getEventTarget</span><span class="token punctuation">(</span>nativeEvent<span class="token punctuation">)</span><span class="token punctuation">,</span>
        eventSystemFlags
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">dispatchEventForLegacyPluginEventSystem</span><span class="token punctuation">(</span>
      topLevelType<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      <span class="token keyword">null</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Attempt dispatching an event. Returns a SuspenseInstance or Container if it&#39;s blocked.</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">attemptToDispatchEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">container</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> Node<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Container <span class="token operator">|</span> SuspenseInstance <span class="token punctuation">{</span>
  <span class="token comment">// TODO: Warn if _enabled is false.</span>

  <span class="token keyword">const</span> nativeEventTarget <span class="token operator">=</span> <span class="token function">getEventTarget</span><span class="token punctuation">(</span>nativeEvent<span class="token punctuation">)</span>
  <span class="token keyword">let</span> targetInst <span class="token operator">=</span> <span class="token function">getClosestInstanceFromNode</span><span class="token punctuation">(</span>nativeEventTarget<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>targetInst <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> nearestMounted <span class="token operator">=</span> <span class="token function">getNearestMountedFiber</span><span class="token punctuation">(</span>targetInst<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nearestMounted <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// This tree has been unmounted already. Dispatch without a target.</span>
      targetInst <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> tag <span class="token operator">=</span> nearestMounted<span class="token punctuation">.</span>tag
      <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> SuspenseComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token function">getSuspenseInstanceFromFiber</span><span class="token punctuation">(</span>nearestMounted<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// Queue the event to be replayed later. Abort dispatching since we</span>
          <span class="token comment">// don&#39;t want this event dispatched twice through the event system.</span>
          <span class="token comment">// TODO: If this is the first discrete event in the queue. Schedule an increased</span>
          <span class="token comment">// priority for this boundary.</span>
          <span class="token keyword">return</span> instance
        <span class="token punctuation">}</span>
        <span class="token comment">// This shouldn&#39;t happen, something went wrong but to avoid blocking</span>
        <span class="token comment">// the whole system, dispatch the event without a target.</span>
        <span class="token comment">// TODO: Warn.</span>
        targetInst <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> HostRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot <span class="token operator">=</span> nearestMounted<span class="token punctuation">.</span>stateNode
        <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>hydrate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// If this happens during a replay something went wrong and it might block</span>
          <span class="token comment">// the whole system.</span>
          <span class="token keyword">return</span> <span class="token function">getContainerFromFiber</span><span class="token punctuation">(</span>nearestMounted<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        targetInst <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>nearestMounted <span class="token operator">!==</span> targetInst<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// If we get an event (ex: img onload) before committing that</span>
        <span class="token comment">// component&#39;s mount, ignore it for now (that is, treat it as if it was an</span>
        <span class="token comment">// event on a non-React tree). We might also consider queueing events and</span>
        <span class="token comment">// dispatching them after the mount.</span>
        targetInst <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableDeprecatedFlareAPI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">PLUGIN_EVENT_SYSTEM</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">dispatchEventForLegacyPluginEventSystem</span><span class="token punctuation">(</span>
        topLevelType<span class="token punctuation">,</span>
        eventSystemFlags<span class="token punctuation">,</span>
        nativeEvent<span class="token punctuation">,</span>
        targetInst
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">RESPONDER_EVENT_SYSTEM</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// React Flare event system</span>
      <span class="token function">DEPRECATED_dispatchEventForResponderEventSystem</span><span class="token punctuation">(</span>
        <span class="token punctuation">(</span>topLevelType<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">,</span>
        targetInst<span class="token punctuation">,</span>
        nativeEvent<span class="token punctuation">,</span>
        nativeEventTarget<span class="token punctuation">,</span>
        eventSystemFlags
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">dispatchEventForLegacyPluginEventSystem</span><span class="token punctuation">(</span>
      topLevelType<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      targetInst
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// We&#39;re not blocked on anything.</span>
  <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>legacy 事件处理系统与批量更新</p><p>在 <code>dispatchEventForLegacyPluginEventSystem</code> 函数中：</p><ul><li><p>首先，根据 <code>getTopLevelCallbackBookKeeping</code> 函数找到事件池中对应的属性，将 <code>topLevelType</code> ，<code>targetInst</code> 等属性赋予给事件。</p></li><li><p>然后，通过 <code>batchedEventUpdates</code> 函数处理批量更新。</p><p>实际上，React 是通过 <code>isBatchingEventUpdates</code> 控制是否进行批量更新。</p><p><code>batchedEventUpdates</code> 会打开批量渲染开关（<code>isBatchingEventUpdates</code>）并调用 <code>handleTopLevel</code> 执行事件处理插件。</p><p>事件的执行是在 <code>handleTopLevel(bookKeeping)</code> 中执行的。</p><details class="hint-container details"><summary>batchedEventUpdates(fn, a, b) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\legacy-events\\ReactGenericBatching.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">batchedEventUpdates</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isBatchingEventUpdates<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// If we are currently inside another batch, we need to wait until it</span>
    <span class="token comment">// fully completes before restoring state.</span>
    <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  isBatchingEventUpdates <span class="token operator">=</span> <span class="token boolean">true</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">batchedEventUpdatesImpl</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    isBatchingEventUpdates <span class="token operator">=</span> <span class="token boolean">false</span>
    <span class="token function">finishEventHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在函数中触发 <code>setState</code> ，<code>isBatchingEventUpdates</code> 为 <code>true</code>，则具备了批量更新的能力。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ExampleComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  state <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  <span class="token function-variable function">handleClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 0</span>

    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count <span class="token operator">+</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>state<span class="token punctuation">.</span>count<span class="token punctuation">)</span> <span class="token comment">// 2</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleClick<span class="token punctuation">}</span><span class="token operator">&gt;</span>点击<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例中：</p><ul><li>执行第一个 <code>setState</code> ：符合批量更新的条件，<code>isBatchingEventUpdates</code> 为 <code>true</code> ，则打印的值不是最新数值（即：<code>setState</code> 为异步）。</li><li>执行第二个 <code>setState</code> ：在 <code>eventLoop</code> 事件循环中，<code>setTimeout</code> 在下一次事件循环中执行，此时 <code>isBatchingEventUpdates</code> 为 <code>false</code> ，则能获取到最新值，打印为最新数值。</li></ul></li><li><p>最终，通过 <code>releaseTopLevelCallbackBookKeeping</code> 来释放事件池。</p></li></ul><details class="hint-container details"><summary>dispatchEventForLegacyPluginEventSystem(topLevelType, eventSystemFlags, nativeEvent, targetInst) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMLegacyEventPluginSystem.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">dispatchEventForLegacyPluginEventSystem</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent<span class="token punctuation">,</span>
  <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> bookKeeping <span class="token operator">=</span> <span class="token function">getTopLevelCallbackBookKeeping</span><span class="token punctuation">(</span>
    topLevelType<span class="token punctuation">,</span>
    nativeEvent<span class="token punctuation">,</span>
    targetInst<span class="token punctuation">,</span>
    eventSystemFlags
  <span class="token punctuation">)</span>

  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token comment">// Event queue being processed in the same cycle allows</span>
    <span class="token comment">// \`preventDefault\`.</span>
    <span class="token function">batchedEventUpdates</span><span class="token punctuation">(</span>handleTopLevel<span class="token punctuation">,</span> bookKeeping<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token function">releaseTopLevelCallbackBookKeeping</span><span class="token punctuation">(</span>bookKeeping<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>执行事件插件函数</p><p>在进行事件处理系统与批量更新中，调用 <code>handleTopLevel</code> 函数主要是获取对应事件处理插件，比如 <code>onClick</code> 对应 <code>SimpleEventPlugin</code>，调用流程：</p><p><code>handleTopLevel</code> --&gt; <code>runExtractedPluginEventsInBatch</code> --&gt; <code>extractPluginEvents</code> --&gt; <code>runEventsInBatch</code></p><p>获取事件处理插件后，调用事件插件的处理函数 <code>extractEvents</code> 。通过 <code>extractEvents</code> 可以不需要考虑浏览器兼容问题，交给 React 底层统一处理。</p><details class="hint-container details"><summary>handleTopLevel(bookKeeping) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMLegacyEventPluginSystem.js</span>

<span class="token keyword">function</span> <span class="token function">extractPluginEvents</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> TopLevelType<span class="token punctuation">,</span>
  <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEventTarget</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>ReactSyntheticEvent<span class="token operator">&gt;</span> <span class="token operator">|</span> ReactSyntheticEvent <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> events <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> plugins<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Not every plugin in the ordering may be loaded at runtime.</span>
    <span class="token keyword">const</span> <span class="token literal-property property">possiblePlugin</span><span class="token operator">:</span> PluginModule<span class="token operator">&lt;</span>AnyNativeEvent<span class="token operator">&gt;</span> <span class="token operator">=</span> plugins<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>possiblePlugin<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> extractedEvents <span class="token operator">=</span> possiblePlugin<span class="token punctuation">.</span><span class="token function">extractEvents</span><span class="token punctuation">(</span>
        topLevelType<span class="token punctuation">,</span>
        targetInst<span class="token punctuation">,</span>
        nativeEvent<span class="token punctuation">,</span>
        nativeEventTarget<span class="token punctuation">,</span>
        eventSystemFlags
      <span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>extractedEvents<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        events <span class="token operator">=</span> <span class="token function">accumulateInto</span><span class="token punctuation">(</span>events<span class="token punctuation">,</span> extractedEvents<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> events
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">runExtractedPluginEventsInBatch</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">topLevelType</span><span class="token operator">:</span> TopLevelType<span class="token punctuation">,</span>
  <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEventTarget</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> events <span class="token operator">=</span> <span class="token function">extractPluginEvents</span><span class="token punctuation">(</span>
    topLevelType<span class="token punctuation">,</span>
    targetInst<span class="token punctuation">,</span>
    nativeEvent<span class="token punctuation">,</span>
    nativeEventTarget<span class="token punctuation">,</span>
    eventSystemFlags
  <span class="token punctuation">)</span>
  <span class="token function">runEventsInBatch</span><span class="token punctuation">(</span>events<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">handleTopLevel</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">bookKeeping</span><span class="token operator">:</span> BookKeepingInstance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> targetInst <span class="token operator">=</span> bookKeeping<span class="token punctuation">.</span>targetInst

  <span class="token comment">// Loop through the hierarchy, in case there&#39;s any nested components.</span>
  <span class="token comment">// It&#39;s important that we build the array of ancestors before calling any</span>
  <span class="token comment">// event handlers, because event handlers can modify the DOM, leading to</span>
  <span class="token comment">// inconsistencies with ReactMount&#39;s node cache. See #1105.</span>
  <span class="token keyword">let</span> ancestor <span class="token operator">=</span> targetInst
  <span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>ancestor<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> ancestors <span class="token operator">=</span> bookKeeping<span class="token punctuation">.</span>ancestors
      <span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token punctuation">(</span>ancestors<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>ancestor<span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token function">findRootContainerNode</span><span class="token punctuation">(</span>ancestor<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>root<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">const</span> tag <span class="token operator">=</span> ancestor<span class="token punctuation">.</span>tag
    <span class="token keyword">if</span> <span class="token punctuation">(</span>tag <span class="token operator">===</span> HostComponent <span class="token operator">||</span> tag <span class="token operator">===</span> HostText<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      bookKeeping<span class="token punctuation">.</span>ancestors<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>ancestor<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    ancestor <span class="token operator">=</span> <span class="token function">getClosestInstanceFromNode</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>ancestor<span class="token punctuation">)</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> bookKeeping<span class="token punctuation">.</span>ancestors<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    targetInst <span class="token operator">=</span> bookKeeping<span class="token punctuation">.</span>ancestors<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token keyword">const</span> eventTarget <span class="token operator">=</span> <span class="token function">getEventTarget</span><span class="token punctuation">(</span>bookKeeping<span class="token punctuation">.</span>nativeEvent<span class="token punctuation">)</span>
    <span class="token keyword">const</span> topLevelType <span class="token operator">=</span>
      <span class="token punctuation">(</span><span class="token punctuation">(</span>bookKeeping<span class="token punctuation">.</span>topLevelType<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> DOMTopLevelEventType<span class="token punctuation">)</span>
    <span class="token keyword">const</span> nativeEvent <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>bookKeeping<span class="token punctuation">.</span>nativeEvent<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> AnyNativeEvent<span class="token punctuation">)</span>
    <span class="token keyword">let</span> eventSystemFlags <span class="token operator">=</span> bookKeeping<span class="token punctuation">.</span>eventSystemFlags

    <span class="token comment">// If this is the first ancestor, we mark it on the system flags</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>i <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      eventSystemFlags <span class="token operator">|=</span> <span class="token constant">IS_FIRST_ANCESTOR</span>
    <span class="token punctuation">}</span>

    <span class="token function">runExtractedPluginEventsInBatch</span><span class="token punctuation">(</span>
      topLevelType<span class="token punctuation">,</span>
      targetInst<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      eventTarget<span class="token punctuation">,</span>
      eventSystemFlags
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p><code>extractEvents</code> 形成事件对象 <code>event</code> 和事件处理函数队列</p><ul><li>首先，形成 React 合成事件源对象，保存整个事件的信息。将作为参数传递给真正的事件处理函数。</li><li>然后，声明事件执行队列，按照冒泡和捕获逻辑，从事件源开始逐渐向上，查找子节点与之对应的 <code>fiber</code> 对象 ，收集上面的 React 合成事件（例如： <code>onClick</code> / <code>onClickCapture</code>）。 <ul><li>对于冒泡阶段的事件（如：<code>onClick</code>），将 <code>push</code> 到执行队列后面</li><li>对于捕获阶段的事件（如：<code>onClickCapture</code>），将 <code>unShift</code> 到执行队列的前面。</li></ul></li><li>最后，将事件执行队列，保存到 React 事件源对象上，等待执行。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">class</span> <span class="token class-name">ExampleComponent</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">handleDivClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React冒泡：div元素&#39;</span><span class="token punctuation">)</span>
  <span class="token function-variable function">handleDivClickCapture</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React捕获：div元素&#39;</span><span class="token punctuation">)</span>
  <span class="token function-variable function">handleButtonClick</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React冒泡：button元素&#39;</span><span class="token punctuation">)</span>
  <span class="token function-variable function">handleButtonClickCapture</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;React捕获：button元素&#39;</span><span class="token punctuation">)</span>

  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>
      <span class="token operator">&lt;</span>div
        id<span class="token operator">=</span><span class="token string">&quot;div&quot;</span>
        onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleDivClick<span class="token punctuation">}</span>
        onClickCapture<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleDivClickCapture<span class="token punctuation">}</span>
      <span class="token operator">&gt;</span>
        <span class="token operator">&lt;</span>button
          id<span class="token operator">=</span><span class="token string">&quot;button&quot;</span>
          onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleButtonClick<span class="token punctuation">}</span>
          onClickCapture<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>handleButtonClickCapture<span class="token punctuation">}</span>
        <span class="token operator">&gt;</span>
          按钮
        <span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 输出为：</span>
<span class="token comment">// React捕获：div元素</span>
<span class="token comment">// React捕获：button元素</span>
<span class="token comment">// React冒泡：button元素</span>
<span class="token comment">// React冒泡：div元素</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在示例中：</p><ul><li>首先，遍历 <code>button</code> 对应的 fiber 。将 <code>onClickCapture</code> 事件处理程序 <code>handleButtonClickCapture</code>，添加到事件队列最前面；将 <code>onClick</code> 事件处理程序 <code>handleButtonClick</code>，添加到事件队列中。形成结构为 <code>[handleButtonClickCapture, handleButtonClick]</code></li><li>然后，向上遍历 <code>div</code> 对应的 fiber ，将 <code>onClickCapture</code> 事件处理程序 <code>handleDivClickCapture</code>，添加到事件队列最前面；将 <code>onClick</code> 事件处理程序 <code>handleDivClick</code>，添加到事件队列中。形成结构为 <code>[handleDivClickCapture, handleButtonClickCapture, handleButtonClick, handleDivClick]</code></li></ul></li><li><p>事件触发</p><p>形成事件对象 <code>event</code> 和事件处理函数队列之后，通过 <code>runEventsInBatch</code> 函数进行批量执行，触发事件。同时，如果发现有阻止冒泡，则会跳出循环，重置事件源。</p><details class="hint-container details"><summary>runEventsInBatch(events) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\legacy-events\\EventBatching.js</span>

<span class="token keyword">let</span> <span class="token literal-property property">eventQueue</span><span class="token operator">:</span> <span class="token operator">?</span><span class="token punctuation">(</span>Array<span class="token operator">&lt;</span>ReactSyntheticEvent<span class="token operator">&gt;</span> <span class="token operator">|</span> ReactSyntheticEvent<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token keyword">null</span>

<span class="token keyword">const</span> <span class="token function-variable function">executeDispatchesAndRelease</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">event</span><span class="token operator">:</span> ReactSyntheticEvent</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">executeDispatchesInOrder</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>event<span class="token punctuation">.</span><span class="token function">isPersistent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      event<span class="token punctuation">.</span>constructor<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> <span class="token function-variable function">executeDispatchesAndReleaseTopLevel</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token function">executeDispatchesAndRelease</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">runEventsInBatch</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">events</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>ReactSyntheticEvent<span class="token operator">&gt;</span> <span class="token operator">|</span> ReactSyntheticEvent <span class="token operator">|</span> <span class="token keyword">null</span></span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>events <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    eventQueue <span class="token operator">=</span> <span class="token function">accumulateInto</span><span class="token punctuation">(</span>eventQueue<span class="token punctuation">,</span> events<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Set \`eventQueue\` to null before processing it so that we can tell if more</span>
  <span class="token comment">// events get enqueued while processing.</span>
  <span class="token keyword">const</span> processingEventQueue <span class="token operator">=</span> eventQueue
  eventQueue <span class="token operator">=</span> <span class="token keyword">null</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>processingEventQueue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token function">forEachAccumulated</span><span class="token punctuation">(</span>
    processingEventQueue<span class="token punctuation">,</span>
    executeDispatchesAndReleaseTopLevel
  <span class="token punctuation">)</span>
  <span class="token function">invariant</span><span class="token punctuation">(</span>
    <span class="token operator">!</span>eventQueue<span class="token punctuation">,</span>
    <span class="token string">&#39;processEventQueue(): Additional events were enqueued while processing &#39;</span> <span class="token operator">+</span>
      <span class="token string">&#39;an event queue. Support for this has not yet been implemented.&#39;</span>
  <span class="token punctuation">)</span>
  <span class="token comment">// This would be a good time to rethrow if any of the event handlers threw.</span>
  <span class="token function">rethrowCaughtError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// packages\\legacy-events\\forEachAccumulated.js</span>

<span class="token keyword">function</span> forEachAccumulated<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token literal-property property">arr</span><span class="token operator">:</span> <span class="token operator">?</span><span class="token punctuation">(</span>Array<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token function-variable function">cb</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">elem</span><span class="token operator">:</span> <span class="token constant">T</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token literal-property property">scope</span><span class="token operator">:</span> <span class="token operator">?</span>any
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">isArray</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    arr<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>cb<span class="token punctuation">,</span> scope<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>arr<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">cb</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>scope<span class="token punctuation">,</span> arr<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul><h4 id="事件触发流程总结" tabindex="-1"><a class="header-anchor" href="#事件触发流程总结" aria-hidden="true">#</a> 事件触发流程总结</h4><ul><li>首先通过统一事件处理函数 <code>dispatchEvent</code>，进行批量更新 <code>batchedEventUpdates</code></li><li>根据事件源找到与之匹配的 DOM 元素 <code>fiber</code>，执行事件对应的处理插件中的 <code>extractEvents</code>，并进行遍历，形成一个事件执行队列，React 使用该队列模拟 <code>事件捕获</code> --&gt; <code>事件源</code> --&gt; <code>事件冒泡</code> 过程。</li><li>最后通过 <code>runEventsInBatch</code> 执行事件队列，完成整个触发流程。如果发现有阻止事件冒泡，则会跳出循环，重置事件源，放回到事件池中，完成整个流程。</li></ul><h2 id="react-17、18-事件系统" tabindex="-1"><a class="header-anchor" href="#react-17、18-事件系统" aria-hidden="true">#</a> React 17、18 事件系统</h2><p>React 17、18 事件系统的相关调整：</p><ul><li>事件统一绑定到 <code>container</code> 上 （<code>ReactDOM.render(app， container)</code>） ，而不是 <code>document</code> 上。有利于微前端，如果同时存在多个子应用，全部绑定在 <code>document</code> 上，可能会出现问题。</li><li>对齐原生浏览器事件。React 17 中支持原生捕获事件，对齐了浏览器原生标准。同时，<code>onScroll</code> 事件不再进行事件冒泡，<code>onFocus</code> 和 <code>onBlur</code> 使用原生 <code>focusin</code>， <code>focusout</code> 合成。</li><li>取消事件池。React 17 取消事件池复用，也就解决了在 React 16 中，如果需要在事件处理函数运行之后获取事件对象的属性需要调用 <code>e.persist()</code> 的问题。</li></ul><h3 id="事件绑定流程-1" tabindex="-1"><a class="header-anchor" href="#事件绑定流程-1" aria-hidden="true">#</a> 事件绑定流程</h3><p>React 事件系统，在 <code>createRoot</code> 中，通过 <code>listenToAllSupportedEvents</code> 会向外层容器注册全部事件。</p><details class="hint-container details"><summary>createRoot(container, options) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\client\\ReactDOMRoot.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createRoot</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">container</span><span class="token operator">:</span> Element <span class="token operator">|</span> Document <span class="token operator">|</span> DocumentFragment<span class="token punctuation">,</span>
  options<span class="token operator">?</span><span class="token operator">:</span> CreateRootOptions</span>
<span class="token punctuation">)</span><span class="token operator">:</span> RootType <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isValidContainer</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;createRoot(...): Target container is not a DOM element.&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">warnIfReactDOMContainerInDEV</span><span class="token punctuation">(</span>container<span class="token punctuation">)</span>

  <span class="token keyword">let</span> isStrictMode <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">let</span> concurrentUpdatesByDefaultOverride <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">let</span> identifierPrefix <span class="token operator">=</span> <span class="token string">&#39;&#39;</span>
  <span class="token keyword">let</span> onRecoverableError <span class="token operator">=</span> defaultOnRecoverableError
  <span class="token keyword">let</span> transitionCallbacks <span class="token operator">=</span> <span class="token keyword">null</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>options <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> options <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>unstable_strictMode <span class="token operator">===</span> <span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      isStrictMode <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      allowConcurrentByDefault <span class="token operator">&amp;&amp;</span>
      options<span class="token punctuation">.</span>unstable_concurrentUpdatesByDefault <span class="token operator">===</span> <span class="token boolean">true</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      concurrentUpdatesByDefaultOverride <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>identifierPrefix <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      identifierPrefix <span class="token operator">=</span> options<span class="token punctuation">.</span>identifierPrefix
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>onRecoverableError <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      onRecoverableError <span class="token operator">=</span> options<span class="token punctuation">.</span>onRecoverableError
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>options<span class="token punctuation">.</span>transitionCallbacks <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      transitionCallbacks <span class="token operator">=</span> options<span class="token punctuation">.</span>transitionCallbacks
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token function">createContainer</span><span class="token punctuation">(</span>
    container<span class="token punctuation">,</span>
    ConcurrentRoot<span class="token punctuation">,</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    isStrictMode<span class="token punctuation">,</span>
    concurrentUpdatesByDefaultOverride<span class="token punctuation">,</span>
    identifierPrefix<span class="token punctuation">,</span>
    onRecoverableError<span class="token punctuation">,</span>
    transitionCallbacks
  <span class="token punctuation">)</span>
  <span class="token function">markContainerAsRoot</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>current<span class="token punctuation">,</span> container<span class="token punctuation">)</span>

  <span class="token keyword">const</span> <span class="token literal-property property">rootContainerElement</span><span class="token operator">:</span> Document <span class="token operator">|</span> Element <span class="token operator">|</span> DocumentFragment <span class="token operator">=</span>
    container<span class="token punctuation">.</span>nodeType <span class="token operator">===</span> <span class="token constant">COMMENT_NODE</span>
      <span class="token operator">?</span> <span class="token punctuation">(</span>container<span class="token punctuation">.</span>parentNode<span class="token operator">:</span> any<span class="token punctuation">)</span>
      <span class="token operator">:</span> container
  <span class="token function">listenToAllSupportedEvents</span><span class="token punctuation">(</span>rootContainerElement<span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">ReactDOMRoot</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><code>listenToAllSupportedEvents</code> 通过 <code>listenToNativeEvent</code> 绑定浏览器事件。</p><ul><li>常规事件，则执行两次 <code>listenToNativeEvent</code>，分别在冒泡和捕获阶段绑定事件。</li><li>不冒泡事件，则执行 <code>listenToNativeEvent(domEventName, true, rootContainerElement)</code>。</li></ul><p>在 <code>listenToAllSupportedEvents(rootContainerElement)</code> 函数中：</p><ul><li><code>rootContainerElement</code> : 根节点 <code>root</code>。</li><li><code>allNativeEvents</code> 常量 : <code>Set</code> 集合，保存了 81 个浏览器常用事件。</li><li><code>nonDelegatedEvents</code> 常量 : <code>Set</code> 集合，保存了浏览器中不会冒泡的事件，一般指媒体事件（比如：<code>pause</code>、<code>play</code>、<code>playing</code> 等），还有一些特殊事件（比如：<code>cancel</code>、<code>close</code>、<code>invalid</code>、<code>load</code>、<code>scroll</code>、<code>toggle</code>）。</li></ul><details class="hint-container details"><summary>listenToAllSupportedEvents(rootContainerElement) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMPluginEventSystem.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">listenToAllSupportedEvents</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">rootContainerElement</span><span class="token operator">:</span> EventTarget</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>rootContainerElement<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>listeningMarker<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">;</span><span class="token punctuation">(</span>rootContainerElement<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>listeningMarker<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
    allNativeEvents<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">domEventName</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
      <span class="token comment">// We handle selectionchange separately because it</span>
      <span class="token comment">// doesn&#39;t bubble and needs to be on the document.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>domEventName <span class="token operator">!==</span> <span class="token string">&#39;selectionchange&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/* nonDelegatedEvents 保存了浏览器中不会冒泡的事件 */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>nonDelegatedEvents<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">/* 在冒泡阶段绑定事件 */</span>
          <span class="token function">listenToNativeEvent</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> rootContainerElement<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token comment">/* 在捕获阶段绑定事件 */</span>
        <span class="token function">listenToNativeEvent</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> rootContainerElement<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> ownerDocument <span class="token operator">=</span>
      <span class="token punctuation">(</span>rootContainerElement<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>nodeType <span class="token operator">===</span> <span class="token constant">DOCUMENT_NODE</span>
        <span class="token operator">?</span> rootContainerElement
        <span class="token operator">:</span> <span class="token punctuation">(</span>rootContainerElement<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>ownerDocument
    <span class="token keyword">if</span> <span class="token punctuation">(</span>ownerDocument <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// The selectionchange event also needs deduplication</span>
      <span class="token comment">// but it is attached to the document.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token punctuation">(</span>ownerDocument<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>listeningMarker<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token punctuation">;</span><span class="token punctuation">(</span>ownerDocument<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">[</span>listeningMarker<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">listenToNativeEvent</span><span class="token punctuation">(</span><span class="token string">&#39;selectionchange&#39;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> ownerDocument<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><code>listenToNativeEvent</code> 本质上是向原生 DOM 中注册事件，进行事件监听。</p><p>在 <code>listenToNativeEvent</code> 中，调用 <code>addTrappedEventListener</code> 函数根据事件获取对应的优先级，不同的优先级在容器 DOM 节点注册不同的事件回调函数。</p><p>在 <code>listenToNativeEvent(domEventName, isCapturePhaseListener, target)</code> 函数中：</p><ul><li><code>domEventName</code> 入参对应的事件名（如：<code>click</code>）</li><li><code>isCapturePhaseListener</code> 入参表示是否捕获：<code>true</code> 为捕获，<code>false</code> 为冒泡</li></ul><details class="hint-container details"><summary>listenToNativeEvent(domEventName, isCapturePhaseListener, target) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMPluginEventSystem.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">listenToNativeEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">isCapturePhaseListener</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
  <span class="token literal-property property">target</span><span class="token operator">:</span> EventTarget</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> eventSystemFlags <span class="token operator">=</span> <span class="token number">0</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isCapturePhaseListener<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    eventSystemFlags <span class="token operator">|=</span> <span class="token constant">IS_CAPTURE_PHASE</span>
  <span class="token punctuation">}</span>
  <span class="token function">addTrappedEventListener</span><span class="token punctuation">(</span>
    target<span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    eventSystemFlags<span class="token punctuation">,</span>
    isCapturePhaseListener
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 <code>addTrappedEventListener</code> 中，调用 <code>createEventListenerWrapperWithPriority</code> 函数判断事件执行的优先级，并返回对应的监听器。</p><p>在 <code>createEventListenerWrapperWithPriority</code> 函数中，根据 <code>eventPriority</code> 来判断优先级，不同的优先级返回不同的监听函数。</p><ul><li><code>dispatchDiscreteEvent</code> ：离散事件监听器，优先级为 <code>0</code></li><li><code>dispatchContinuousEvent</code> ：用户阻塞事件监听器，优先级为 <code>1</code></li><li><code>dispatchEvent</code> ：连续事件或其他事件监听器，优先级为 <code>2</code></li></ul><details class="hint-container details"><summary>addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener, isDeferredListenerForLegacyFBSupport) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMPluginEventSystem.js</span>

<span class="token keyword">function</span> <span class="token function">addTrappedEventListener</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">targetContainer</span><span class="token operator">:</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">isCapturePhaseListener</span><span class="token operator">:</span> boolean<span class="token punctuation">,</span>
  isDeferredListenerForLegacyFBSupport<span class="token operator">?</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> listener <span class="token operator">=</span> <span class="token function">createEventListenerWrapperWithPriority</span><span class="token punctuation">(</span>
    targetContainer<span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    eventSystemFlags
  <span class="token punctuation">)</span>
  <span class="token comment">// If passive option is not supported, then the event will be</span>
  <span class="token comment">// active and not passive.</span>
  <span class="token keyword">let</span> isPassiveListener <span class="token operator">=</span> <span class="token keyword">undefined</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>passiveBrowserEventsSupported<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Browsers introduced an intervention, making these events</span>
    <span class="token comment">// passive by default on document. React doesn&#39;t bind them</span>
    <span class="token comment">// to document anymore, but changing this now would undo</span>
    <span class="token comment">// the performance wins from the change. So we emulate</span>
    <span class="token comment">// the existing behavior manually on the roots now.</span>
    <span class="token comment">// https://github.com/facebook/react/issues/19651</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      domEventName <span class="token operator">===</span> <span class="token string">&#39;touchstart&#39;</span> <span class="token operator">||</span>
      domEventName <span class="token operator">===</span> <span class="token string">&#39;touchmove&#39;</span> <span class="token operator">||</span>
      domEventName <span class="token operator">===</span> <span class="token string">&#39;wheel&#39;</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      isPassiveListener <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  targetContainer <span class="token operator">=</span>
    enableLegacyFBSupport <span class="token operator">&amp;&amp;</span> isDeferredListenerForLegacyFBSupport
      <span class="token operator">?</span> <span class="token punctuation">(</span>targetContainer<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>ownerDocument
      <span class="token operator">:</span> targetContainer

  <span class="token keyword">let</span> unsubscribeListener
  <span class="token comment">// When legacyFBSupport is enabled, it&#39;s for when we</span>
  <span class="token comment">// want to add a one time event listener to a container.</span>
  <span class="token comment">// This should only be used with enableLegacyFBSupport</span>
  <span class="token comment">// due to requirement to provide compatibility with</span>
  <span class="token comment">// internal FB www event tooling. This works by removing</span>
  <span class="token comment">// the event listener as soon as it is invoked. We could</span>
  <span class="token comment">// also attempt to use the {once: true} param on</span>
  <span class="token comment">// addEventListener, but that requires support and some</span>
  <span class="token comment">// browsers do not support this today, and given this is</span>
  <span class="token comment">// to support legacy code patterns, it&#39;s likely they&#39;ll</span>
  <span class="token comment">// need support for such browsers.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableLegacyFBSupport <span class="token operator">&amp;&amp;</span> isDeferredListenerForLegacyFBSupport<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> originalListener <span class="token operator">=</span> listener
    <span class="token function-variable function">listener</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>p</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">removeEventListener</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        unsubscribeListener<span class="token punctuation">,</span>
        isCapturePhaseListener
      <span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token function">originalListener</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> p<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// TODO: There are too many combinations here. Consolidate them.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isCapturePhaseListener<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isPassiveListener <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventCaptureListenerWithPassiveFlag</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener<span class="token punctuation">,</span>
        isPassiveListener
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventCaptureListener</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isPassiveListener <span class="token operator">!==</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventBubbleListenerWithPassiveFlag</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener<span class="token punctuation">,</span>
        isPassiveListener
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      unsubscribeListener <span class="token operator">=</span> <span class="token function">addEventBubbleListener</span><span class="token punctuation">(</span>
        targetContainer<span class="token punctuation">,</span>
        domEventName<span class="token punctuation">,</span>
        listener
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>createEventListenerWrapperWithPriority(targetContainer, domEventName, eventSystemFlags) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\ReactDOMEventListener.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">createEventListenerWrapperWithPriority</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">targetContainer</span><span class="token operator">:</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Function <span class="token punctuation">{</span>
  <span class="token keyword">const</span> eventPriority <span class="token operator">=</span> <span class="token function">getEventPriority</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">)</span>
  <span class="token keyword">let</span> listenerWrapper
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>eventPriority<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">DiscreteEventPriority</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchDiscreteEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ContinuousEventPriority</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchContinuousEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">DefaultEventPriority</span><span class="token operator">:</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      listenerWrapper <span class="token operator">=</span> dispatchEvent
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token function">listenerWrapper</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>
    <span class="token keyword">null</span><span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    eventSystemFlags<span class="token punctuation">,</span>
    targetContainer
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">dispatchDiscreteEvent</span><span class="token punctuation">(</span>
  <span class="token parameter">domEventName<span class="token punctuation">,</span>
  eventSystemFlags<span class="token punctuation">,</span>
  container<span class="token punctuation">,</span>
  nativeEvent</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> previousPriority <span class="token operator">=</span> <span class="token function">getCurrentUpdatePriority</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> prevTransition <span class="token operator">=</span> ReactCurrentBatchConfig<span class="token punctuation">.</span>transition
  ReactCurrentBatchConfig<span class="token punctuation">.</span>transition <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token function">setCurrentUpdatePriority</span><span class="token punctuation">(</span>DiscreteEventPriority<span class="token punctuation">)</span>
    <span class="token function">dispatchEvent</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">,</span> eventSystemFlags<span class="token punctuation">,</span> container<span class="token punctuation">,</span> nativeEvent<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    <span class="token function">setCurrentUpdatePriority</span><span class="token punctuation">(</span>previousPriority<span class="token punctuation">)</span>
    ReactCurrentBatchConfig<span class="token punctuation">.</span>transition <span class="token operator">=</span> prevTransition
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">dispatchEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">targetContainer</span><span class="token operator">:</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>_enabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay</span><span class="token punctuation">(</span>
      domEventName<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">dispatchEventOriginal</span><span class="token punctuation">(</span>
      domEventName<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="事件触发流程-1" tabindex="-1"><a class="header-anchor" href="#事件触发流程-1" aria-hidden="true">#</a> 事件触发流程</h3><p>触发事件时，首先会执行 <code>dispatchEvent</code> 函数，最终会通过 <code>batchedUpdates</code>（批量更新） 来处理 <code>dispatchEventsForPlugins</code>。</p><p>执行流程为：<code>dispatchEvent</code> --&gt; <code>dispatchEventOriginal</code> / <code>dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay</code> --&gt; <code>dispatchEventForPluginEventSystem</code> --&gt; <code>batchedUpdates</code> --&gt; <code>dispatchEventsForPlugins</code></p><details class="hint-container details"><summary>dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">dispatchEvent</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">targetContainer</span><span class="token operator">:</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>_enabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay</span><span class="token punctuation">(</span>
      domEventName<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">dispatchEventOriginal</span><span class="token punctuation">(</span>
      domEventName<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 <code>dispatchEventsForPlugins</code> 函数中：</p><ul><li>相关入参 <ul><li><code>domEventName</code> ：事件名称</li><li><code>eventSystemFlags</code> ：事件处理的阶段。（<code>0</code> - 冒泡阶段， <code>4</code> - 捕获阶段）</li><li><code>nativeEvent</code> ：原生事件的事件源（<code>event</code>）</li><li><code>targetInst</code> ：DOM 元素对应的节点，即 fiber 节点</li><li><code>targetContainer</code> ：根节点</li></ul></li><li>首先，通过 <code>const nativeEventTarget = getEventTarget(nativeEvent)</code> 获取到发生事件的元素，即事件源。</li><li>然后，创建事件队列 <code>const dispatchQueue = []</code>，用于存储待更新的事件队列</li><li>接着，通过 <code>extractEvents</code> 收集事件</li><li>最后，通过 <code>processDispatchQueue</code> 执行事件</li></ul><details class="hint-container details"><summary>dispatchEventsForPlugins(domEventName, eventSystemFlags, nativeEvent, targetInst, targetContainer) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMPluginEventSystem.js</span>

<span class="token keyword">function</span> <span class="token function">dispatchEventsForPlugins</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent<span class="token punctuation">,</span>
  <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">targetContainer</span><span class="token operator">:</span> EventTarget</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> nativeEventTarget <span class="token operator">=</span> <span class="token function">getEventTarget</span><span class="token punctuation">(</span>nativeEvent<span class="token punctuation">)</span>
  <span class="token keyword">const</span> <span class="token literal-property property">dispatchQueue</span><span class="token operator">:</span> DispatchQueue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token function">extractEvents</span><span class="token punctuation">(</span>
    dispatchQueue<span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    targetInst<span class="token punctuation">,</span>
    nativeEvent<span class="token punctuation">,</span>
    nativeEventTarget<span class="token punctuation">,</span>
    eventSystemFlags<span class="token punctuation">,</span>
    targetContainer
  <span class="token punctuation">)</span>
  <span class="token function">processDispatchQueue</span><span class="token punctuation">(</span>dispatchQueue<span class="token punctuation">,</span> eventSystemFlags<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><code>extractEvents</code> 收集事件，以 <code>SimpleEventPlugin.extractEvents</code> 为例。在 <code>SimpleEventPlugin</code> 中的 <code>extractEvents</code> 中：</p><ul><li>通过 <code>topLevelEventsToReactNames.get(domEventName)</code> 来获取对应的合成事件名称，如: <code>onMouseOver</code>。</li><li><code>SyntheticEventCtor()</code> 是合成函数的构造函数。</li><li>然后，通过 <code>switch case</code> 来匹配对应的合成事件的构造函数。</li><li><code>inCapturePhase</code> 判断是否捕获阶段。</li><li>通过 <code>accumulateSinglePhaseListeners()</code> 函数来获取当前阶段的所有事件。在该函数中，会获取存储在 Fiber 上的 Props 的对应事件，然后通过 <code>createDispatchListener</code> 返回的对象加入到监听集合上，如果是不会冒泡的函数则会停止（比如：<code>scroll</code>），反之，则会向上递归。</li><li>最后，通过 <code>new SyntheticEventCtor()</code> 生成对应的事件源，插入队列中。</li></ul><details class="hint-container details"><summary>extractEvents(dispatchQueue, domEventName, targetInst, nativeEvent, nativeEventTarget, eventSystemFlags, targetContainer) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMPluginEventSystem.js</span>

<span class="token keyword">function</span> <span class="token function">extractEvents</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">dispatchQueue</span><span class="token operator">:</span> DispatchQueue<span class="token punctuation">,</span>
  <span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEventTarget</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">targetContainer</span><span class="token operator">:</span> EventTarget</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// TODO: we should remove the concept of a &quot;SimpleEventPlugin&quot;.</span>
  <span class="token comment">// This is the basic functionality of the event system. All</span>
  <span class="token comment">// the other plugins are essentially polyfills. So the plugin</span>
  <span class="token comment">// should probably be inlined somewhere and have its logic</span>
  <span class="token comment">// be core the to event system. This would potentially allow</span>
  <span class="token comment">// us to ship builds of React without the polyfilled plugins below.</span>
  SimpleEventPlugin<span class="token punctuation">.</span><span class="token function">extractEvents</span><span class="token punctuation">(</span>
    dispatchQueue<span class="token punctuation">,</span>
    domEventName<span class="token punctuation">,</span>
    targetInst<span class="token punctuation">,</span>
    nativeEvent<span class="token punctuation">,</span>
    nativeEventTarget<span class="token punctuation">,</span>
    eventSystemFlags<span class="token punctuation">,</span>
    targetContainer
  <span class="token punctuation">)</span>
  <span class="token keyword">const</span> shouldProcessPolyfillPlugins <span class="token operator">=</span>
    <span class="token punctuation">(</span>eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">SHOULD_NOT_PROCESS_POLYFILL_EVENT_PLUGINS</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span>
  <span class="token comment">// We don&#39;t process these events unless we are in the</span>
  <span class="token comment">// event&#39;s native &quot;bubble&quot; phase, which means that we&#39;re</span>
  <span class="token comment">// not in the capture phase. That&#39;s because we emulate</span>
  <span class="token comment">// the capture phase here still. This is a trade-off,</span>
  <span class="token comment">// because in an ideal world we would not emulate and use</span>
  <span class="token comment">// the phases properly, like we do with the SimpleEvent</span>
  <span class="token comment">// plugin. However, the plugins below either expect</span>
  <span class="token comment">// emulation (EnterLeave) or use state localized to that</span>
  <span class="token comment">// plugin (BeforeInput, Change, Select). The state in</span>
  <span class="token comment">// these modules complicates things, as you&#39;ll essentially</span>
  <span class="token comment">// get the case where the capture phase event might change</span>
  <span class="token comment">// state, only for the following bubble event to come in</span>
  <span class="token comment">// later and not trigger anything as the state now</span>
  <span class="token comment">// invalidates the heuristics of the event plugin. We</span>
  <span class="token comment">// could alter all these plugins to work in such ways, but</span>
  <span class="token comment">// that might cause other unknown side-effects that we</span>
  <span class="token comment">// can&#39;t foresee right now.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>shouldProcessPolyfillPlugins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    EnterLeaveEventPlugin<span class="token punctuation">.</span><span class="token function">extractEvents</span><span class="token punctuation">(</span>
      dispatchQueue<span class="token punctuation">,</span>
      domEventName<span class="token punctuation">,</span>
      targetInst<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      nativeEventTarget<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer
    <span class="token punctuation">)</span>
    ChangeEventPlugin<span class="token punctuation">.</span><span class="token function">extractEvents</span><span class="token punctuation">(</span>
      dispatchQueue<span class="token punctuation">,</span>
      domEventName<span class="token punctuation">,</span>
      targetInst<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      nativeEventTarget<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer
    <span class="token punctuation">)</span>
    SelectEventPlugin<span class="token punctuation">.</span><span class="token function">extractEvents</span><span class="token punctuation">(</span>
      dispatchQueue<span class="token punctuation">,</span>
      domEventName<span class="token punctuation">,</span>
      targetInst<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      nativeEventTarget<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer
    <span class="token punctuation">)</span>
    BeforeInputEventPlugin<span class="token punctuation">.</span><span class="token function">extractEvents</span><span class="token punctuation">(</span>
      dispatchQueue<span class="token punctuation">,</span>
      domEventName<span class="token punctuation">,</span>
      targetInst<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">,</span>
      nativeEventTarget<span class="token punctuation">,</span>
      eventSystemFlags<span class="token punctuation">,</span>
      targetContainer
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>SimpleEventPlugin.extractEvents 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\plugins\\SimpleEventPlugin.js</span>

<span class="token keyword">function</span> <span class="token function">extractEvents</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">dispatchQueue</span><span class="token operator">:</span> DispatchQueue<span class="token punctuation">,</span>
  <span class="token literal-property property">domEventName</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">,</span>
  <span class="token literal-property property">targetInst</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEvent</span><span class="token operator">:</span> AnyNativeEvent<span class="token punctuation">,</span>
  <span class="token literal-property property">nativeEventTarget</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> EventTarget<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags<span class="token punctuation">,</span>
  <span class="token literal-property property">targetContainer</span><span class="token operator">:</span> EventTarget</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> reactName <span class="token operator">=</span> topLevelEventsToReactNames<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>domEventName<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>reactName <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> SyntheticEventCtor <span class="token operator">=</span> SyntheticEvent
  <span class="token keyword">let</span> <span class="token literal-property property">reactEventType</span><span class="token operator">:</span> string <span class="token operator">=</span> domEventName
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>domEventName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;keypress&#39;</span><span class="token operator">:</span>
      <span class="token comment">// Firefox creates a keypress event for function keys too. This removes</span>
      <span class="token comment">// the unwanted keypress events. Enter is however both printable and</span>
      <span class="token comment">// non-printable. One would expect Tab to be as well (but it isn&#39;t).</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getEventCharCode</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span>nativeEvent<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> KeyboardEvent<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
    <span class="token comment">/* falls through */</span>
    <span class="token keyword">case</span> <span class="token string">&#39;keydown&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;keyup&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticKeyboardEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;focusin&#39;</span><span class="token operator">:</span>
      reactEventType <span class="token operator">=</span> <span class="token string">&#39;focus&#39;</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticFocusEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;focusout&#39;</span><span class="token operator">:</span>
      reactEventType <span class="token operator">=</span> <span class="token string">&#39;blur&#39;</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticFocusEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;beforeblur&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;afterblur&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticFocusEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;click&#39;</span><span class="token operator">:</span>
      <span class="token comment">// Firefox creates a click event on right mouse clicks. This removes the</span>
      <span class="token comment">// unwanted click events.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>nativeEvent<span class="token punctuation">.</span>button <span class="token operator">===</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
    <span class="token comment">/* falls through */</span>
    <span class="token keyword">case</span> <span class="token string">&#39;auxclick&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;dblclick&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;mousedown&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;mousemove&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;mouseup&#39;</span><span class="token operator">:</span>
    <span class="token comment">// TODO: Disabled elements should not respond to mouse events</span>
    <span class="token comment">/* falls through */</span>
    <span class="token keyword">case</span> <span class="token string">&#39;mouseout&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;mouseover&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;contextmenu&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticMouseEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;drag&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;dragend&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;dragenter&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;dragexit&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;dragleave&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;dragover&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;dragstart&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;drop&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticDragEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;touchcancel&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;touchend&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;touchmove&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;touchstart&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticTouchEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token constant">ANIMATION_END</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token constant">ANIMATION_ITERATION</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token constant">ANIMATION_START</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticAnimationEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token constant">TRANSITION_END</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticTransitionEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;scroll&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticUIEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;wheel&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticWheelEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;copy&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;cut&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;paste&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticClipboardEvent
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token string">&#39;gotpointercapture&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;lostpointercapture&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;pointercancel&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;pointerdown&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;pointermove&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;pointerout&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;pointerover&#39;</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token string">&#39;pointerup&#39;</span><span class="token operator">:</span>
      SyntheticEventCtor <span class="token operator">=</span> SyntheticPointerEvent
      <span class="token keyword">break</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token comment">// Unknown event. This is used by createEventHandle.</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> inCapturePhase <span class="token operator">=</span> <span class="token punctuation">(</span>eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">IS_CAPTURE_PHASE</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token number">0</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    enableCreateEventHandleAPI <span class="token operator">&amp;&amp;</span>
    eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">IS_EVENT_HANDLE_NON_MANAGED_NODE</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> listeners <span class="token operator">=</span> <span class="token function">accumulateEventHandleNonManagedNodeListeners</span><span class="token punctuation">(</span>
      <span class="token comment">// TODO: this cast may not make sense for events like</span>
      <span class="token comment">// &quot;focus&quot; where React listens to e.g. &quot;focusin&quot;.</span>
      <span class="token punctuation">(</span><span class="token punctuation">(</span>reactEventType<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> DOMEventName<span class="token punctuation">)</span><span class="token punctuation">,</span>
      targetContainer<span class="token punctuation">,</span>
      inCapturePhase
    <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>listeners<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Intentionally create event lazily.</span>
      <span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SyntheticEventCtor</span><span class="token punctuation">(</span>
        reactName<span class="token punctuation">,</span>
        reactEventType<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        nativeEvent<span class="token punctuation">,</span>
        nativeEventTarget
      <span class="token punctuation">)</span>
      dispatchQueue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> event<span class="token punctuation">,</span> listeners <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// Some events don&#39;t bubble in the browser.</span>
    <span class="token comment">// In the past, React has always bubbled them, but this can be surprising.</span>
    <span class="token comment">// We&#39;re going to try aligning closer to the browser behavior by not bubbling</span>
    <span class="token comment">// them in React either. We&#39;ll start by not bubbling onScroll, and then expand.</span>
    <span class="token keyword">const</span> accumulateTargetOnly <span class="token operator">=</span>
      <span class="token operator">!</span>inCapturePhase <span class="token operator">&amp;&amp;</span>
      <span class="token comment">// TODO: ideally, we&#39;d eventually add all events from</span>
      <span class="token comment">// nonDelegatedEvents list in DOMPluginEventSystem.</span>
      <span class="token comment">// Then we can remove this special list.</span>
      <span class="token comment">// This is a breaking change that can wait until React 18.</span>
      domEventName <span class="token operator">===</span> <span class="token string">&#39;scroll&#39;</span>

    <span class="token keyword">const</span> listeners <span class="token operator">=</span> <span class="token function">accumulateSinglePhaseListeners</span><span class="token punctuation">(</span>
      targetInst<span class="token punctuation">,</span>
      reactName<span class="token punctuation">,</span>
      nativeEvent<span class="token punctuation">.</span>type<span class="token punctuation">,</span>
      inCapturePhase<span class="token punctuation">,</span>
      accumulateTargetOnly<span class="token punctuation">,</span>
      nativeEvent
    <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>listeners<span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Intentionally create event lazily.</span>
      <span class="token keyword">const</span> event <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SyntheticEventCtor</span><span class="token punctuation">(</span>
        reactName<span class="token punctuation">,</span>
        reactEventType<span class="token punctuation">,</span>
        <span class="token keyword">null</span><span class="token punctuation">,</span>
        nativeEvent<span class="token punctuation">,</span>
        nativeEventTarget
      <span class="token punctuation">)</span>
      dispatchQueue<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> event<span class="token punctuation">,</span> listeners <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><code>processDispatchQueue</code> 执行事件。在该函数中，遍历对应的合成事件，获取对应的事件源和监听的函数，最后会调用 <code>processDispatchQueueItemsInOrder</code> 函数。</p><p>在 <code>processDispatchQueueItemsInOrde</code> 函数中，通过 <code>inCapturePhase</code> 来模拟对应的冒泡与捕获。</p><ul><li><code>event.isPropagationStopped()</code> ：用于判断是否阻止冒泡（<code>e.stopPropagation</code>），如果阻止冒泡，则会退出，从而模拟事件流的过程。</li><li><code>executeDispatch()</code> ：执行事件的函数。</li></ul><details class="hint-container details"><summary>processDispatchQueue(dispatchQueue, eventSystemFlags) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// packages\\react-dom\\src\\events\\DOMPluginEventSystem.js</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">processDispatchQueue</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">dispatchQueue</span><span class="token operator">:</span> DispatchQueue<span class="token punctuation">,</span>
  <span class="token literal-property property">eventSystemFlags</span><span class="token operator">:</span> EventSystemFlags</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> inCapturePhase <span class="token operator">=</span> <span class="token punctuation">(</span>eventSystemFlags <span class="token operator">&amp;</span> <span class="token constant">IS_CAPTURE_PHASE</span><span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token number">0</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dispatchQueue<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> <span class="token punctuation">{</span> event<span class="token punctuation">,</span> listeners <span class="token punctuation">}</span> <span class="token operator">=</span> dispatchQueue<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
    <span class="token function">processDispatchQueueItemsInOrder</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> listeners<span class="token punctuation">,</span> inCapturePhase<span class="token punctuation">)</span>
    <span class="token comment">//  event system doesn&#39;t use pooling.</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// This would be a good time to rethrow if any of the event handlers threw.</span>
  <span class="token function">rethrowCaughtError</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">processDispatchQueueItemsInOrder</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">event</span><span class="token operator">:</span> ReactSyntheticEvent<span class="token punctuation">,</span>
  <span class="token literal-property property">dispatchListeners</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>DispatchListener<span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">inCapturePhase</span><span class="token operator">:</span> boolean</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> previousInstance
  <span class="token keyword">if</span> <span class="token punctuation">(</span>inCapturePhase<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> dispatchListeners<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">--</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> instance<span class="token punctuation">,</span> currentTarget<span class="token punctuation">,</span> listener <span class="token punctuation">}</span> <span class="token operator">=</span> dispatchListeners<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">!==</span> previousInstance <span class="token operator">&amp;&amp;</span> event<span class="token punctuation">.</span><span class="token function">isPropagationStopped</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token function">executeDispatch</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> listener<span class="token punctuation">,</span> currentTarget<span class="token punctuation">)</span>
      previousInstance <span class="token operator">=</span> instance
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> dispatchListeners<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> <span class="token punctuation">{</span> instance<span class="token punctuation">,</span> currentTarget<span class="token punctuation">,</span> listener <span class="token punctuation">}</span> <span class="token operator">=</span> dispatchListeners<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">!==</span> previousInstance <span class="token operator">&amp;&amp;</span> event<span class="token punctuation">.</span><span class="token function">isPropagationStopped</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      <span class="token function">executeDispatch</span><span class="token punctuation">(</span>event<span class="token punctuation">,</span> listener<span class="token punctuation">,</span> currentTarget<span class="token punctuation">)</span>
      previousInstance <span class="token operator">=</span> instance
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,97),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","事件系统.html.vue"]]);export{d as default};
