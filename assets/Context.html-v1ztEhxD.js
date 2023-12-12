import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const t={},o=e(`<h1 id="context-原理" tabindex="-1"><a class="header-anchor" href="#context-原理" aria-hidden="true">#</a> Context 原理</h1><ul><li><p><code>Provider</code> 传递流程：<code>Provider</code> 的更新，会深度遍历子代 <code>Fiber</code>，消费 <code>context</code> 的 <code>Fiber</code> 和父级链都会提升更新优先级。对于类组件的 <code>Fiber</code> ，会 <code>forceUpdate</code> 处理。接下来所有消费的 <code>Fiber</code>，都会 <code>beginWork</code> 。</p></li><li><p><code>context</code> 订阅流程： <code>contextType</code>、<code>useContext</code>、<code>Consumer</code> 会内部调用 <code>readContext</code>。<code>readContext</code> 会把 <code>Fiber</code> 上的 <code>dependencies</code> 属性和 <code>context</code> 对象建立起关联。</p></li></ul><h2 id="context-对象" tabindex="-1"><a class="header-anchor" href="#context-对象" aria-hidden="true">#</a> Context 对象</h2><p><code>React.createContext(defaultValue)</code> 创建一个 <code>Context</code> 对象。接受一个 <code>defaultValue</code> 参数，作为默认值。</p><p><code>Context</code> 对象通过调用 <code>createContext</code> 函数进行创建。</p><details class="hint-container details"><summary>createContext(defaultValue) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// react\\packages\\react\\src\\ReactContext.js</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> <span class="token constant">REACT_PROVIDER_TYPE</span><span class="token punctuation">,</span> <span class="token constant">REACT_CONTEXT_TYPE</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;shared/ReactSymbols&#39;</span>
<span class="token comment">// export const REACT_PROVIDER_TYPE = Symbol.for(&#39;react.provider&#39;);</span>
<span class="token comment">// export const REACT_CONTEXT_TYPE = Symbol.for(&#39;react.context&#39;);</span>

<span class="token keyword">import</span> type <span class="token punctuation">{</span> ReactContext <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;shared/ReactTypes&#39;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> createContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>defaultValue<span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token literal-property property">context</span><span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    $$<span class="token keyword">typeof</span><span class="token operator">:</span> <span class="token constant">REACT_CONTEXT_TYPE</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_currentValue</span><span class="token operator">:</span> defaultValue<span class="token punctuation">,</span> <span class="token comment">// 用来保存传递给 Provider 的 value</span>
    <span class="token literal-property property">_currentValue2</span><span class="token operator">:</span> defaultValue<span class="token punctuation">,</span>
    <span class="token comment">// Used to track how many concurrent renderers this context currently</span>
    <span class="token comment">// supports within in a single renderer. Such as parallel server rendering.</span>
    <span class="token literal-property property">_threadCount</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// These are circular</span>
    <span class="token literal-property property">Provider</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">Consumer</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">,</span>

    <span class="token comment">// Add these to use same hidden class in VM as ServerContext</span>
    <span class="token literal-property property">_defaultValue</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_globalName</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">null</span><span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  context<span class="token punctuation">.</span>Provider <span class="token operator">=</span> <span class="token punctuation">{</span>
    $$<span class="token keyword">typeof</span><span class="token operator">:</span> <span class="token constant">REACT_PROVIDER_TYPE</span><span class="token punctuation">,</span>
    <span class="token literal-property property">_context</span><span class="token operator">:</span> context<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> hasWarnedAboutUsingNestedContextConsumers <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">let</span> hasWarnedAboutUsingConsumerProvider <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token keyword">let</span> hasWarnedAboutDisplayNameOnConsumer <span class="token operator">=</span> <span class="token boolean">false</span>

  context<span class="token punctuation">.</span>Consumer <span class="token operator">=</span> context

  <span class="token keyword">return</span> context
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="provider-提供者" tabindex="-1"><a class="header-anchor" href="#provider-提供者" aria-hidden="true">#</a> Provider 提供者</h2><p>每个 <code>Context</code> 对象都会返回一个 <code>Provider</code> React 组件，它允许消费组件订阅 <code>context</code> 的变化。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token operator">&lt;</span>MyContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token punctuation">{</span><span class="token comment">/* 某个值 */</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>Context.Provider</code> 本质上是一个类型为 <code>REACT_PROVIDER_TYPE</code> 特殊的 React Element 对象，转化为 <code>Fiber</code> 的类型为 <code>ContextProvider</code>。</p><p>对于 <code>ContextProvider</code> 类型的 <code>Fiber</code>，在 Reconciler render 阶段（调和阶段）的 <code>beginWork</code> 流程中会调用 <code>updateContextProvider(current, workInProgress, renderLanes)</code> 函数进行处理。</p><p>在 <code>updateContextProvider(current, workInProgress, renderLanes)</code> 函数中：</p><ul><li>调用 <code>pushProvider(workInProgress, context, newValue)</code> 将 <code>Provider</code> 的 <code>value</code> 属性，赋值给 <code>context</code> 对象（即：<code>workInProgress.type</code> 属性上的 <code>_context</code>）的 <code>_currentValue</code> 属性上</li><li>如果 <code>Context</code> 的 <code>value</code> 值没有改变，则会调用 <code>bailoutOnAlreadyFinishedWork(current, workInProgress, renderLanes)</code> 函数复用节点</li><li>如果 <code>Context</code> 的 <code>value</code> 值发生改变，则会调用 <code>propagateContextChange(workInProgress, context, renderLanes)</code> 函数更新节点</li></ul><details class="hint-container details"><summary>updateContextProvider(current, workInProgress, renderLanes) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">updateContextProvider</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">current</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">workInProgress</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">renderLanes</span><span class="token operator">:</span> Lanes</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token literal-property property">providerType</span><span class="token operator">:</span> ReactProviderType<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>type
  <span class="token keyword">const</span> <span class="token literal-property property">context</span><span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">=</span> providerType<span class="token punctuation">.</span>_context

  <span class="token keyword">const</span> newProps <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>pendingProps
  <span class="token keyword">const</span> oldProps <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>memoizedProps

  <span class="token keyword">const</span> newValue <span class="token operator">=</span> newProps<span class="token punctuation">.</span>value

  <span class="token comment">// 获取 Provider 上的 value 值</span>
  <span class="token function">pushProvider</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> context<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableLazyContextPropagation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// In the lazy propagation implementation, we don&#39;t scan for matching</span>
    <span class="token comment">// consumers until something bails out, because until something bails out</span>
    <span class="token comment">// we&#39;re going to visit those nodes, anyway. The trade-off is that it shifts</span>
    <span class="token comment">// responsibility to the consumer to track whether something has changed.</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 更新 Context</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>oldProps <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> oldValue <span class="token operator">=</span> oldProps<span class="token punctuation">.</span>value
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">is</span><span class="token punctuation">(</span>oldValue<span class="token punctuation">,</span> newValue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// No change. Bailout early if children are the same.</span>
        <span class="token comment">// context value 没有改变，如果 children 是一样的，则不需要更新</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          oldProps<span class="token punctuation">.</span>children <span class="token operator">===</span> newProps<span class="token punctuation">.</span>children <span class="token operator">&amp;&amp;</span>
          <span class="token operator">!</span><span class="token function">hasLegacyContextChanged</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">bailoutOnAlreadyFinishedWork</span><span class="token punctuation">(</span>
            current<span class="token punctuation">,</span>
            workInProgress<span class="token punctuation">,</span>
            renderLanes
          <span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// The context value changed. Search for matching consumers and schedule</span>
        <span class="token comment">// them to update.</span>
        <span class="token comment">// context value 改变，搜索匹配 consumers 并进行调度更新</span>
        <span class="token function">propagateContextChange</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> context<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">const</span> newChildren <span class="token operator">=</span> newProps<span class="token punctuation">.</span>children
  <span class="token function">reconcileChildren</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> workInProgress<span class="token punctuation">,</span> newChildren<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
  <span class="token keyword">return</span> workInProgress<span class="token punctuation">.</span>child
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 <code>propagateContextChange(workInProgress, context, renderLanes)</code> 函数中</p><ul><li>对于 <code>CacheComponent</code>，调用 <code>propagateContextChanges</code> 来寻找匹配的 <code>consumers</code></li><li>对于其它类型的组件，则调用 <code>propagateContextChange_eager</code> 来寻找匹配的 <code>consumers</code></li></ul><p><code>propagateContextChanges</code> 和 <code>propagateContextChange_eager</code> 的功能差不多</p><ul><li><p>深度遍历所有的子代 <code>Fiber</code>，获取 <code>Fiber</code> 节点的 <code>dependencies</code> 的属性</p><p><code>dependencies</code> 属性可以把当前的 <code>Fiber</code> 节点和 <code>context</code> 建立起关联，即使用了当前 <code>context</code> 的 <code>Fiber</code> 节点 会把 <code>context</code> 放在 <code>dependencies</code> 中。</p><p><code>dependencies</code> 属性本身是一个链表结构，一个 <code>Fiber</code> 节点可以有多个 <code>context</code> 与之对应</p></li><li><p>对比 <code>dependencies</code> 中的 <code>context</code> 和当前 <code>Provider</code> 的 <code>context</code> 是否是同一个。如果是同一个，并且当前 <code>Fiber</code> 是类组件 <code>ClassComponent</code>，则绑定一个 <code>forceUpdate</code> 标识。提高 <code>Fiber</code> 的更新优先级，让 <code>Fiber</code> 在接下来的调和过程中，处于一个高优先级待更新的状态。</p></li><li><p>将当前 <code>Fiber</code> 节点的 <code>update</code> 优先级标记为高优先级，并修改当前 <code>Fiber</code> 节点父路径上所有节点的 <code>childLanes</code> 属性。</p></li></ul><details class="hint-container details"><summary>propagateContextChange(workInProgress, context, renderLanes) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> propagateContextChange<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token literal-property property">workInProgress</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">renderLanes</span><span class="token operator">:</span> Lanes
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableLazyContextPropagation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// TODO: This path is only used by Cache components. Update</span>
    <span class="token comment">// lazilyPropagateParentContextChanges to look for Cache components so they</span>
    <span class="token comment">// can take advantage of lazy propagation.</span>
    <span class="token keyword">const</span> forcePropagateEntireTree <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">propagateContextChanges</span><span class="token punctuation">(</span>
      workInProgress<span class="token punctuation">,</span>
      <span class="token punctuation">[</span>context<span class="token punctuation">]</span><span class="token punctuation">,</span>
      renderLanes<span class="token punctuation">,</span>
      forcePropagateEntireTree
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token function">propagateContextChange_eager</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> context<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>propagateContextChanges(workInProgress, [context], renderLanes, forcePropagateEntireTree) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> propagateContextChange_eager<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token literal-property property">workInProgress</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">context</span><span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">renderLanes</span><span class="token operator">:</span> Lanes
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// Only used by eager implementation</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableLazyContextPropagation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> fiber <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>child
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Set the return pointer of the child to the work-in-progress fiber.</span>
    <span class="token comment">// 将 fiber 的 return 属性指向当前工作的 workInProgress</span>
    <span class="token comment">// fiber 节点的 return 属性指向父节点</span>
    fiber<span class="token punctuation">.</span>return <span class="token operator">=</span> workInProgress
  <span class="token punctuation">}</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>fiber <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> nextFiber

    <span class="token comment">// Visit this fiber.</span>
    <span class="token comment">// 在 readContext() 中创建了 context 的依赖列表，并将依赖列表添加到了 fiber 节点上</span>
    <span class="token comment">// 这里从 fiber 节点上取出 context 的依赖列表，对依赖列表进行检查</span>
    <span class="token keyword">const</span> list <span class="token operator">=</span> fiber<span class="token punctuation">.</span>dependencies
    <span class="token keyword">if</span> <span class="token punctuation">(</span>list <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      nextFiber <span class="token operator">=</span> fiber<span class="token punctuation">.</span>child

      <span class="token keyword">let</span> dependency <span class="token operator">=</span> list<span class="token punctuation">.</span>firstContext
      <span class="token keyword">while</span> <span class="token punctuation">(</span>dependency <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Check if the context matches.</span>
        <span class="token comment">// 查找匹配的 consumers</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>dependency<span class="token punctuation">.</span>context <span class="token operator">===</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// Match! Schedule an update on this fiber.</span>
          <span class="token comment">// 查找到匹配的 context，则安排调度</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>tag <span class="token operator">===</span> ClassComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Schedule a force update on the work-in-progress.</span>
            <span class="token comment">// 设置 update 为 高优先级</span>
            <span class="token keyword">const</span> lane <span class="token operator">=</span> <span class="token function">pickArbitraryLane</span><span class="token punctuation">(</span>renderLanes<span class="token punctuation">)</span>
            <span class="token comment">// 将当前 fiber 设置为 ForceUpdate，保证 class 组件一定执行 render</span>
            <span class="token keyword">const</span> update <span class="token operator">=</span> <span class="token function">createUpdate</span><span class="token punctuation">(</span>NoTimestamp<span class="token punctuation">,</span> lane<span class="token punctuation">)</span>
            update<span class="token punctuation">.</span>tag <span class="token operator">=</span> ForceUpdate
            <span class="token comment">// TODO: Because we don&#39;t have a work-in-progress, this will add the</span>
            <span class="token comment">// update to the current fiber, too, which means it will persist even if</span>
            <span class="token comment">// this render is thrown away. Since it&#39;s a race condition, not sure it&#39;s</span>
            <span class="token comment">// worth fixing.</span>

            <span class="token comment">// Inlined \`enqueueUpdate\` to remove interleaved update check</span>
            <span class="token keyword">const</span> updateQueue <span class="token operator">=</span> fiber<span class="token punctuation">.</span>updateQueue
            <span class="token keyword">if</span> <span class="token punctuation">(</span>updateQueue <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// Only occurs if the fiber has been unmounted.</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> <span class="token literal-property property">sharedQueue</span><span class="token operator">:</span> SharedQueue<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">(</span>updateQueue<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token punctuation">.</span>shared
              <span class="token keyword">const</span> pending <span class="token operator">=</span> sharedQueue<span class="token punctuation">.</span>pending
              <span class="token keyword">if</span> <span class="token punctuation">(</span>pending <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// This is the first update. Create a circular list.</span>
                update<span class="token punctuation">.</span>next <span class="token operator">=</span> update
              <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                update<span class="token punctuation">.</span>next <span class="token operator">=</span> pending<span class="token punctuation">.</span>next
                pending<span class="token punctuation">.</span>next <span class="token operator">=</span> update
              <span class="token punctuation">}</span>
              sharedQueue<span class="token punctuation">.</span>pending <span class="token operator">=</span> update
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>

          <span class="token comment">// 标记优先级</span>
          fiber<span class="token punctuation">.</span>lanes <span class="token operator">=</span> <span class="token function">mergeLanes</span><span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>lanes<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
          <span class="token keyword">const</span> alternate <span class="token operator">=</span> fiber<span class="token punctuation">.</span>alternate
          <span class="token keyword">if</span> <span class="token punctuation">(</span>alternate <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            alternate<span class="token punctuation">.</span>lanes <span class="token operator">=</span> <span class="token function">mergeLanes</span><span class="token punctuation">(</span>alternate<span class="token punctuation">.</span>lanes<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
          <span class="token comment">// 修改当前fiber节点父路径上所有节点的 childLanes 属性</span>
          <span class="token function">scheduleContextWorkOnParentPath</span><span class="token punctuation">(</span>
            fiber<span class="token punctuation">.</span>return<span class="token punctuation">,</span>
            renderLanes<span class="token punctuation">,</span>
            workInProgress
          <span class="token punctuation">)</span>

          <span class="token comment">// Mark the updated lanes on the list, too.</span>
          <span class="token comment">// 标记优先级</span>
          list<span class="token punctuation">.</span>lanes <span class="token operator">=</span> <span class="token function">mergeLanes</span><span class="token punctuation">(</span>list<span class="token punctuation">.</span>lanes<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>

          <span class="token comment">// Since we already found a match, we can stop traversing the</span>
          <span class="token comment">// dependency list.</span>
          <span class="token comment">// 已经找到了匹配的 context，退出遍历依赖列表</span>
          <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        dependency <span class="token operator">=</span> dependency<span class="token punctuation">.</span>next
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>tag <span class="token operator">===</span> ContextProvider<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Don&#39;t scan deeper if this is a matching provider</span>
      nextFiber <span class="token operator">=</span> fiber<span class="token punctuation">.</span>type <span class="token operator">===</span> workInProgress<span class="token punctuation">.</span>type <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> fiber<span class="token punctuation">.</span>child
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>tag <span class="token operator">===</span> DehydratedFragment<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// If a dehydrated suspense boundary is in this subtree, we don&#39;t know</span>
      <span class="token comment">// if it will have any context consumers in it. The best we can do is</span>
      <span class="token comment">// mark it as having updates.</span>
      <span class="token keyword">const</span> parentSuspense <span class="token operator">=</span> fiber<span class="token punctuation">.</span>return

      <span class="token keyword">if</span> <span class="token punctuation">(</span>parentSuspense <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
          <span class="token string">&#39;We just came from a parent so we must have had a parent. This is a bug in React.&#39;</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      parentSuspense<span class="token punctuation">.</span>lanes <span class="token operator">=</span> <span class="token function">mergeLanes</span><span class="token punctuation">(</span>parentSuspense<span class="token punctuation">.</span>lanes<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
      <span class="token keyword">const</span> alternate <span class="token operator">=</span> parentSuspense<span class="token punctuation">.</span>alternate
      <span class="token keyword">if</span> <span class="token punctuation">(</span>alternate <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        alternate<span class="token punctuation">.</span>lanes <span class="token operator">=</span> <span class="token function">mergeLanes</span><span class="token punctuation">(</span>alternate<span class="token punctuation">.</span>lanes<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// This is intentionally passing this fiber as the parent</span>
      <span class="token comment">// because we want to schedule this fiber as having work</span>
      <span class="token comment">// on its children. We&#39;ll use the childLanes on</span>
      <span class="token comment">// this fiber to indicate that a context has changed.</span>
      <span class="token function">scheduleContextWorkOnParentPath</span><span class="token punctuation">(</span>
        parentSuspense<span class="token punctuation">,</span>
        renderLanes<span class="token punctuation">,</span>
        workInProgress
      <span class="token punctuation">)</span>
      nextFiber <span class="token operator">=</span> fiber<span class="token punctuation">.</span>sibling
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Traverse down.</span>
      nextFiber <span class="token operator">=</span> fiber<span class="token punctuation">.</span>child
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextFiber <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Set the return pointer of the child to the work-in-progress fiber.</span>
      nextFiber<span class="token punctuation">.</span>return <span class="token operator">=</span> fiber
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// No child. Traverse to next sibling.</span>
      nextFiber <span class="token operator">=</span> fiber
      <span class="token keyword">while</span> <span class="token punctuation">(</span>nextFiber <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>nextFiber <span class="token operator">===</span> workInProgress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// We&#39;re back to the root of this subtree. Exit.</span>
          nextFiber <span class="token operator">=</span> <span class="token keyword">null</span>
          <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">const</span> sibling <span class="token operator">=</span> nextFiber<span class="token punctuation">.</span>sibling
        <span class="token keyword">if</span> <span class="token punctuation">(</span>sibling <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// Set the return pointer of the sibling to the work-in-progress fiber.</span>
          sibling<span class="token punctuation">.</span>return <span class="token operator">=</span> nextFiber<span class="token punctuation">.</span>return
          nextFiber <span class="token operator">=</span> sibling
          <span class="token keyword">break</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// No more siblings. Traverse up.</span>
        nextFiber <span class="token operator">=</span> nextFiber<span class="token punctuation">.</span>return
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    fiber <span class="token operator">=</span> nextFiber
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="消费者" tabindex="-1"><a class="header-anchor" href="#消费者" aria-hidden="true">#</a> 消费者</h2><h3 id="订阅者-context-consumer-方式" tabindex="-1"><a class="header-anchor" href="#订阅者-context-consumer-方式" aria-hidden="true">#</a> 订阅者 Context.Consumer 方式</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> MyContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>MyContext<span class="token punctuation">.</span>Consumer<span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token comment">/* 将 contextValue 内容转化成 props  */</span><span class="token punctuation">}</span>
      <span class="token punctuation">{</span><span class="token parameter">contextValue</span> <span class="token operator">=&gt;</span> <span class="token operator">&lt;</span>ConsumerComponent <span class="token punctuation">{</span><span class="token operator">...</span>contextValue<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>MyContext<span class="token punctuation">.</span>Consumer<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>Context.Consumer</code> 方式采取 render props 函数方式。</p><ul><li>接收组件树中匹配最近的 <code>&lt;MyContext.Provider&gt;</code> 提供的 Context <code>value</code> 值，作为 render props 函数的参数。</li><li>将接受的参数取出，作为函数返回的 React 节点的 <code>props</code> 传入。</li></ul><p><code>Context.Consumer</code> 本质上是一个类型为 <code>REACT_CONTEXT_TYPE</code> 的 React Element 对象。转化为 <code>Fiber</code> 的类型为 <code>ContextConsumer</code>。</p><p>对于 <code>ContextConsumer</code> 类型的 <code>Fiber</code>，在 Reconciler render 阶段（调和阶段）的 <code>beginWork</code> 流程中会调用 <code>updateContextConsumer(current, workInProgress, renderLanes)</code> 函数进行处理。</p><p>在 <code>updateContextConsumer(current, workInProgress, renderLanes)</code> 函数中：</p><ul><li><p>调用 <code>readContext(context)</code> 函数获取最新的 <code>value</code></p><p>在 <code>readContext(context)</code> 函数中：</p><ul><li><p>创建一个 <code>contextItem</code></p></li><li><p><code>Fiber</code> 节点上会存在多个 <code>dependencies</code> 以链表的形式联系到一起</p><ul><li><p>如果不存在最后一个 <code>context dependency</code> ，则 <code>context dependencies</code> 为空，创建第一个 <code>dependency</code></p></li><li><p>如果存在最后一个 <code>dependency</code> ，则<code>contextItem</code> 会以链表形式保存，并变成最后一个 <code>lastContextDependency</code></p></li></ul></li></ul><details class="hint-container details"><summary>readContext(context) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> readContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>context<span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> value <span class="token operator">=</span> isPrimaryRenderer
    <span class="token operator">?</span> context<span class="token punctuation">.</span>_currentValue
    <span class="token operator">:</span> context<span class="token punctuation">.</span>_currentValue2

  <span class="token keyword">if</span> <span class="token punctuation">(</span>lastFullyObservedContext <span class="token operator">===</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Nothing to do. We already observe everything in this context.</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> contextItem <span class="token operator">=</span> <span class="token punctuation">{</span>
      <span class="token literal-property property">context</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>context<span class="token operator">:</span> any<span class="token punctuation">)</span><span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token literal-property property">memoizedValue</span><span class="token operator">:</span> value<span class="token punctuation">,</span>
      <span class="token literal-property property">next</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>lastContextDependency <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>currentlyRenderingFiber <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
          <span class="token string">&#39;Context can only be read while React is rendering. &#39;</span> <span class="token operator">+</span>
            <span class="token string">&#39;In classes, you can read it in the render method or getDerivedStateFromProps. &#39;</span> <span class="token operator">+</span>
            <span class="token string">&#39;In function components, you can read it directly in the function body, but not &#39;</span> <span class="token operator">+</span>
            <span class="token string">&#39;inside Hooks like useReducer() or useMemo().&#39;</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// This is the first dependency for this component. Create a new list.</span>
      lastContextDependency <span class="token operator">=</span> contextItem
      currentlyRenderingFiber<span class="token punctuation">.</span>dependencies <span class="token operator">=</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">lanes</span><span class="token operator">:</span> NoLanes<span class="token punctuation">,</span>
        <span class="token literal-property property">firstContext</span><span class="token operator">:</span> contextItem<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>enableLazyContextPropagation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        currentlyRenderingFiber<span class="token punctuation">.</span>flags <span class="token operator">|=</span> NeedsPropagation
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Append a new context item.</span>
      lastContextDependency <span class="token operator">=</span> lastContextDependency<span class="token punctuation">.</span>next <span class="token operator">=</span> contextItem
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> value
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p>通过 <code>render(newValue)</code> 函数，传入最新的 <code>value</code>，得到最新的 <code>newChildren</code></p></li><li><p>调和 <code>newChildren</code></p></li></ul><details class="hint-container details"><summary>updateContextConsumer(current, workInProgress, renderLanes) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">updateContextConsumer</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">current</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">workInProgress</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">renderLanes</span><span class="token operator">:</span> Lanes</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> <span class="token literal-property property">context</span><span class="token operator">:</span> ReactContext<span class="token operator">&lt;</span>any<span class="token operator">&gt;</span> <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>type

  <span class="token keyword">const</span> newProps <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>pendingProps
  <span class="token keyword">const</span> render <span class="token operator">=</span> newProps<span class="token punctuation">.</span>children

  <span class="token comment">// 读取 context</span>
  <span class="token function">prepareToReadContext</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
  <span class="token comment">// 得到最新的新的 context value</span>
  <span class="token keyword">const</span> newValue <span class="token operator">=</span> <span class="token function">readContext</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableSchedulingProfiler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">markComponentRenderStarted</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">let</span> newChildren
  <span class="token comment">// 得到最新的 children element</span>
  newChildren <span class="token operator">=</span> <span class="token function">render</span><span class="token punctuation">(</span>newValue<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableSchedulingProfiler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">markComponentRenderStopped</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// React DevTools reads this flag.</span>
  workInProgress<span class="token punctuation">.</span>flags <span class="token operator">|=</span> PerformedWork
  <span class="token comment">// 调和 children</span>
  <span class="token function">reconcileChildren</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> workInProgress<span class="token punctuation">,</span> newChildren<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span>
  <span class="token keyword">return</span> workInProgress<span class="token punctuation">.</span>child
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="函数组件-usecontext-方式" tabindex="-1"><a class="header-anchor" href="#函数组件-usecontext-方式" aria-hidden="true">#</a> 函数组件 useContext 方式</h3><p>函数组件 <code>useContext</code> 方式本质上调用 <code>readContext</code> 方法。</p><p>函数组件通过 <code>readContext</code> ，将函数组件的 <code>dependencies</code> 和当前 <code>context</code> 建立起关联，<code>context</code> 改变，将当前函数组件设置高优先级，促使其渲染。</p><h3 id="类组件-class-contexttype-方式" tabindex="-1"><a class="header-anchor" href="#类组件-class-contexttype-方式" aria-hidden="true">#</a> 类组件 Class.contextType 方式</h3><p>类组件 <code>Class.contextType</code> 方式 和 <code>useContext</code> 一样，本质上就是调用 <code>readContext</code> 方法。</p><p>静态属性 <code>contextType</code>，在类组件实例化的时候被使用，本质上也是调用 <code>readContext</code> 将 <code>context</code> 和 <code>Fiber</code> 上的 <code>dependencies</code> 建立起关联。</p>`,36),p=[o];function c(l,i){return s(),a("div",null,p)}const u=n(t,[["render",c],["__file","Context.html.vue"]]);export{u as default};
