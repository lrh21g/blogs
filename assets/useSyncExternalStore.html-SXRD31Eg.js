import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const t={},o=e(`<h1 id="usesyncexternalstore-订阅外部数据源" tabindex="-1"><a class="header-anchor" href="#usesyncexternalstore-订阅外部数据源" aria-hidden="true">#</a> useSyncExternalStore 订阅外部数据源</h1><h2 id="usesyncexternalstore-的使用" tabindex="-1"><a class="header-anchor" href="#usesyncexternalstore-的使用" aria-hidden="true">#</a> useSyncExternalStore 的使用</h2><p><code>useSyncExternalStore</code> 能够让 React 组件在 <code>concurrent</code> 模式下安全地有效地读取外接数据源，在组件渲染过程中能够检测到变化，并且在数据源发生变化的时候，能够调度更新。当读取到外部状态发生了变化，会触发一个强制更新，来保证结果的一致性。</p><p><code>const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)</code></p><ul><li><p><code>subscribe</code> ：订阅函数，当数据改变的时候，会触发 <code>subscribe</code>，在 <code>useSyncExternalStore</code> 会通过带有记忆性的 <code>getSnapshot</code> 来判别数据是否发生变化，如果发生变化，那么会强制更新数据。</p></li><li><p><code>getSnapshot</code> ：一个带有记忆功能的选择器。当 <code>store</code> 变化的时候，会通过 <code>getSnapshot</code> 生成新的状态值，这个状态值可提供给组件作为数据源使用，<code>getSnapshot</code> 可以检查订阅的值是否改变，改变的话则会触发更新。</p></li><li><p><code>getServerSnapshot</code> ：用于 <code>hydration</code> 模式下的 <code>getSnapshot</code>。</p></li></ul><p>正常的 React 开发者在开发过程中不需要使用这个 api ，这个 Hooks 主要是对于 React 的一些状态管理库（比如： redux） ，通过它可以合理管理外部的 <code>store</code>，保证数据读取的一致。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> combineReducers<span class="token punctuation">,</span> createStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;redux&#39;</span>

<span class="token comment">// number Reducer</span>
<span class="token keyword">function</span> <span class="token function">numberReducer</span><span class="token punctuation">(</span><span class="token parameter">state <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> action</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>action<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&#39;ADD&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state <span class="token operator">+</span> <span class="token number">1</span>
    <span class="token keyword">case</span> <span class="token string">&#39;DEL&#39;</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state <span class="token operator">-</span> <span class="token number">1</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">return</span> state
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 注册reducer</span>
<span class="token keyword">const</span> rootReducer <span class="token operator">=</span> <span class="token function">combineReducers</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">number</span><span class="token operator">:</span> numberReducer <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 创建 store</span>
<span class="token keyword">const</span> store <span class="token operator">=</span> <span class="token function">createStore</span><span class="token punctuation">(</span>rootReducer<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">number</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 点击按钮，会触发 reducer ，</span>
<span class="token comment">// 然后会触发 store.subscribe 订阅函数，执行 getSnapshot 得到新的 number ，</span>
<span class="token comment">// 判断 number 是否发生变化，如果变化，触发更新。</span>
<span class="token keyword">function</span> <span class="token function">Index</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 订阅外部数据源</span>
  <span class="token keyword">const</span> state <span class="token operator">=</span> <span class="token function">useSyncExternalStore</span><span class="token punctuation">(</span>
    store<span class="token punctuation">.</span>subscribe<span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>number
  <span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>state<span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token punctuation">{</span>state<span class="token punctuation">}</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> store<span class="token punctuation">.</span><span class="token function">dispatch</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;ADD&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>点击<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="usesyncexternalstore-实现原理" tabindex="-1"><a class="header-anchor" href="#usesyncexternalstore-实现原理" aria-hidden="true">#</a> useSyncExternalStore 实现原理</h2><p>在 <code>mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)</code> 函数中：</p><ul><li>创建一个 Hook 。Hook 更新分两个阶段，在初始化 Hook 阶段会创建一个 Hook ，在更新阶段会更新这个 Hook。</li><li>调用 <code>getSnapshot</code> 产生一个状态值，并保存起来。</li><li>用一个 <code>effect</code> 来订阅状态 <code>subscribeToStore</code> 发起订阅 。</li><li>用一个 <code>useEffect</code> 来监听组件 <code>render</code> ，只要组件渲染就会调用 <code>updateStoreInstance</code> 。在 <code>concurrent</code> 模式下渲染会中断，如果中断恢复 <code>render</code> ，<code>effect</code> 就解决了这个问题。当 <code>render</code> 就会触发 <code>updateStoreInstance</code> 。</li></ul><details class="hint-container details"><summary>mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">subscribeToStore</span><span class="token punctuation">(</span><span class="token parameter">fiber<span class="token punctuation">,</span> inst<span class="token punctuation">,</span> subscribe</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token function-variable function">handleStoreChange</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token comment">// The store changed. Check if the snapshot changed since the last time we</span>
    <span class="token comment">// read from the store.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">checkIfSnapshotChanged</span><span class="token punctuation">(</span>inst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Force a re-render.</span>
      <span class="token function">forceStoreRerender</span><span class="token punctuation">(</span>fiber<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// Subscribe to the store and return a clean-up function.</span>
  <span class="token keyword">return</span> <span class="token function">subscribe</span><span class="token punctuation">(</span>handleStoreChange<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> updateStoreInstance<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token literal-property property">fiber</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">inst</span><span class="token operator">:</span> StoreInstance<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">nextSnapshot</span><span class="token operator">:</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getSnapshot</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// These are updated in the passive phase</span>
  inst<span class="token punctuation">.</span>value <span class="token operator">=</span> nextSnapshot
  inst<span class="token punctuation">.</span>getSnapshot <span class="token operator">=</span> getSnapshot

  <span class="token comment">// Something may have been mutated in between render and commit. This could</span>
  <span class="token comment">// have been in an event that fired before the passive effects, or it could</span>
  <span class="token comment">// have been in a layout effect. In that case, we would have used the old</span>
  <span class="token comment">// snapsho and getSnapshot values to bail out. We need to check one more time.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">checkIfSnapshotChanged</span><span class="token punctuation">(</span>inst<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Force a re-render.</span>
    <span class="token function">forceStoreRerender</span><span class="token punctuation">(</span>fiber<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> mountSyncExternalStore<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token function-variable function">subscribe</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getSnapshot</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  getServerSnapshot<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> fiber <span class="token operator">=</span> currentlyRenderingFiber
  <span class="token comment">// 创建一个 hook</span>
  <span class="token keyword">const</span> hook <span class="token operator">=</span> <span class="token function">mountWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">let</span> nextSnapshot
  <span class="token keyword">const</span> isHydrating <span class="token operator">=</span> <span class="token function">getIsHydrating</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isHydrating<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>getServerSnapshot <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
        <span class="token string">&#39;Missing getServerSnapshot, which is required for &#39;</span> <span class="token operator">+</span>
          <span class="token string">&#39;server-rendered content. Will revert to client rendering.&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    nextSnapshot <span class="token operator">=</span> <span class="token function">getServerSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    nextSnapshot <span class="token operator">=</span> <span class="token function">getSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 产生快照</span>
    <span class="token comment">// Unless we&#39;re rendering a blocking lane, schedule a consistency check.</span>
    <span class="token comment">// Right before committing, we will walk the tree and check if any of the</span>
    <span class="token comment">// stores were mutated.</span>
    <span class="token comment">//</span>
    <span class="token comment">// We won&#39;t do this if we&#39;re hydrating server-rendered content, because if</span>
    <span class="token comment">// the content is stale, it&#39;s already visible anyway. Instead we&#39;ll patch</span>
    <span class="token comment">// it up in a passive effect.</span>
    <span class="token keyword">const</span> <span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token function">getWorkInProgressRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
        <span class="token string">&#39;Expected a work-in-progress root. This is a bug in React. Please file an issue.&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">includesBlockingLane</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">pushStoreConsistencyCheck</span><span class="token punctuation">(</span>fiber<span class="token punctuation">,</span> getSnapshot<span class="token punctuation">,</span> nextSnapshot<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Read the current snapshot from the store on every render. This breaks the</span>
  <span class="token comment">// normal rules of React, and only works because store updates are</span>
  <span class="token comment">// always synchronous.</span>
  <span class="token comment">// 把快照记录下来</span>
  hook<span class="token punctuation">.</span>memoizedState <span class="token operator">=</span> nextSnapshot
  <span class="token comment">// 快照记录在 inst 属性上</span>
  <span class="token keyword">const</span> <span class="token literal-property property">inst</span><span class="token operator">:</span> StoreInstance<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> nextSnapshot<span class="token punctuation">,</span>
    getSnapshot<span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  hook<span class="token punctuation">.</span>queue <span class="token operator">=</span> inst

  <span class="token comment">// Schedule an effect to subscribe to the store.</span>
  <span class="token comment">// 用一个 effect 来订阅状态 ，subscribeToStore 发起订阅</span>
  <span class="token function">mountEffect</span><span class="token punctuation">(</span><span class="token function">subscribeToStore</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> fiber<span class="token punctuation">,</span> inst<span class="token punctuation">,</span> subscribe<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>subscribe<span class="token punctuation">]</span><span class="token punctuation">)</span>

  <span class="token comment">// Schedule an effect to update the mutable instance fields. We will update</span>
  <span class="token comment">// this whenever subscribe, getSnapshot, or value changes. Because there&#39;s no</span>
  <span class="token comment">// clean-up function, and we track the deps correctly, we can call pushEffect</span>
  <span class="token comment">// directly, without storing any additional state. For the same reason, we</span>
  <span class="token comment">// don&#39;t need to set a static flag, either.</span>
  <span class="token comment">// TODO: We can move this to the passive phase once we add a pre-commit</span>
  <span class="token comment">// consistency check. See the next comment.</span>
  fiber<span class="token punctuation">.</span>flags <span class="token operator">|=</span> PassiveEffect
  <span class="token comment">// 用一个 useEffect 来监听组件 render ，只要组件渲染就会调用 updateStoreInstance</span>
  <span class="token function">pushEffect</span><span class="token punctuation">(</span>
    HookHasEffect <span class="token operator">|</span> HookPassive<span class="token punctuation">,</span>
    <span class="token function">updateStoreInstance</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> fiber<span class="token punctuation">,</span> inst<span class="token punctuation">,</span> nextSnapshot<span class="token punctuation">,</span> getSnapshot<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">undefined</span><span class="token punctuation">,</span>
    <span class="token keyword">null</span>
  <span class="token punctuation">)</span>

  <span class="token keyword">return</span> nextSnapshot
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> updateSyncExternalStore<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>
  <span class="token function-variable function">subscribe</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token keyword">void</span><span class="token punctuation">,</span>
  <span class="token function-variable function">getSnapshot</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span><span class="token punctuation">,</span>
  getServerSnapshot<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token constant">T</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token constant">T</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> fiber <span class="token operator">=</span> currentlyRenderingFiber
  <span class="token keyword">const</span> hook <span class="token operator">=</span> <span class="token function">updateWorkInProgressHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token comment">// Read the current snapshot from the store on every render. This breaks the</span>
  <span class="token comment">// normal rules of React, and only works because store updates are</span>
  <span class="token comment">// always synchronous.</span>
  <span class="token keyword">const</span> nextSnapshot <span class="token operator">=</span> <span class="token function">getSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> prevSnapshot <span class="token operator">=</span> hook<span class="token punctuation">.</span>memoizedState
  <span class="token keyword">const</span> snapshotChanged <span class="token operator">=</span> <span class="token operator">!</span><span class="token function">is</span><span class="token punctuation">(</span>prevSnapshot<span class="token punctuation">,</span> nextSnapshot<span class="token punctuation">)</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>snapshotChanged<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    hook<span class="token punctuation">.</span>memoizedState <span class="token operator">=</span> nextSnapshot
    <span class="token function">markWorkInProgressReceivedUpdate</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> inst <span class="token operator">=</span> hook<span class="token punctuation">.</span>queue

  <span class="token function">updateEffect</span><span class="token punctuation">(</span><span class="token function">subscribeToStore</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> fiber<span class="token punctuation">,</span> inst<span class="token punctuation">,</span> subscribe<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>subscribe<span class="token punctuation">]</span><span class="token punctuation">)</span>

  <span class="token comment">// Whenever getSnapshot or subscribe changes, we need to check in the</span>
  <span class="token comment">// commit phase if there was an interleaved mutation. In concurrent mode</span>
  <span class="token comment">// this can happen all the time, but even in synchronous mode, an earlier</span>
  <span class="token comment">// effect may have mutated the store.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    inst<span class="token punctuation">.</span>getSnapshot <span class="token operator">!==</span> getSnapshot <span class="token operator">||</span>
    snapshotChanged <span class="token operator">||</span>
    <span class="token comment">// Check if the susbcribe function changed. We can save some memory by</span>
    <span class="token comment">// checking whether we scheduled a subscription effect above.</span>
    <span class="token punctuation">(</span>workInProgressHook <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
      workInProgressHook<span class="token punctuation">.</span>memoizedState<span class="token punctuation">.</span>tag <span class="token operator">&amp;</span> HookHasEffect<span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fiber<span class="token punctuation">.</span>flags <span class="token operator">|=</span> PassiveEffect
    <span class="token function">pushEffect</span><span class="token punctuation">(</span>
      HookHasEffect <span class="token operator">|</span> HookPassive<span class="token punctuation">,</span>
      <span class="token function">updateStoreInstance</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> fiber<span class="token punctuation">,</span> inst<span class="token punctuation">,</span> nextSnapshot<span class="token punctuation">,</span> getSnapshot<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token keyword">undefined</span><span class="token punctuation">,</span>
      <span class="token keyword">null</span>
    <span class="token punctuation">)</span>

    <span class="token comment">// Unless we&#39;re rendering a blocking lane, schedule a consistency check.</span>
    <span class="token comment">// Right before committing, we will walk the tree and check if any of the</span>
    <span class="token comment">// stores were mutated.</span>
    <span class="token keyword">const</span> <span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span> <span class="token function">getWorkInProgressRoot</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span>root <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
        <span class="token string">&#39;Expected a work-in-progress root. This is a bug in React. Please file an issue.&#39;</span>
      <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">includesBlockingLane</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> renderLanes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">pushStoreConsistencyCheck</span><span class="token punctuation">(</span>fiber<span class="token punctuation">,</span> getSnapshot<span class="token punctuation">,</span> nextSnapshot<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> nextSnapshot
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,12),p=[o];function c(i,l){return s(),a("div",null,p)}const d=n(t,[["render",c],["__file","useSyncExternalStore.html.vue"]]);export{d as default};
