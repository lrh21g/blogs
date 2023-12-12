import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const t="/blogs/assets/scheduler.drawio-PNWWMdSh.png",o={},p=e(`<h1 id="scheduler" tabindex="-1"><a class="header-anchor" href="#scheduler" aria-hidden="true">#</a> Scheduler</h1><p>对于 React v15 版本，在 Reconciler 中，<code>mount</code> 的组件会调用 <code>mountComponent</code>，<code>update</code> 的组件会调用 <code>updateComponent</code>，这两个方法都会递归更新子组件。由于递归执行，所以更新一旦开始，中途就无法中断，当层级很深时，递归更新时间超过了 16ms，用户交互就会卡顿。</p><p>以浏览器每一帧渲染的时间中是否有剩余时间作为任务中断的标准，可以通过 <code>window.requestIdleCallback()</code> API ，该 API 通过插入一个函数，这个函数将在浏览器空闲时期被调用。部分浏览器已实现该 API （即：<code>requestIdleCallback</code>），但是该 API 以下问题：</p><ul><li>浏览器兼容性</li><li>触发频率不稳定，受很多因素影响。如，当浏览器切换标签后，之前标签页注册的 <code>requestIdleCallback</code> 触发的频率会变得很低</li></ul><p>React 实现了功能更完备的 <code>requestIdleCallback</code> polyfill （即 Scheduler），除了在空闲时触发回调的功能外，Scheduler 还提供了多种调度优先级供任务设置。</p><p>Scheduler 主要包含两个功能：时间切片、优先级调度。</p><h2 id="时间切片" tabindex="-1"><a class="header-anchor" href="#时间切片" aria-hidden="true">#</a> 时间切片</h2><p>时间切片的本质是模拟实现 <code>requestIdleCallback</code> ，在 “浏览器重排/重绘” 后，如果当前帧还有空余时间时被调用的。</p><p>Scheduler 的时间切片功能是通过 <code>task</code>（宏任务）实现的，将需要被执行的回调函数作为 <code>MessageChannel</code> 的回调执行。</p><ul><li>如果当前宿主环境不支持 <code>MessageChannel</code>，则使用 <code>setTimeout</code>。</li><li>当在 Node.js 和老 IE 环境下，使用 <code>setImmediate</code> ，与 <code>MessageChannel</code> 不同，它不会阻止 Node.js 进程的退出。</li></ul><p><code>MessageChannel</code> 接口允许创建一个新的消息通道，并通过它的两个 MessagePort 属性发送数据。</p><ul><li><code>MessageChannel.port1</code> : 返回 channel 的 port1。</li><li><code>MessageChannel.port2</code> : 返回 channel 的 port2。</li></ul><blockquote><p>Q：为什么用 <code>MessageChannel</code> ，而不首选 <code>setTimeout</code></p><ul><li><code>MessageChannel</code> 是以 DOM Event 的形式发送消息，所以它是一个宏任务，会在下一个事件循环的开头执行。浏览器的宏任务队列是一个有序集合，意味着队列里到期的事件不一定会按入队的顺序执行，DOM Event 的优先级比计时器高，<code>MessageChannel</code> 比 <code>setTimeout</code> 执行时机更靠前。</li><li>通 <code>setTimeout(fn,0)</code> 所创建的宏任务，会有至少 4ms 左右的执行时差。</li></ul></blockquote><p>使用 <code>ReactDOM.createRoot(rootNode).render(&lt;App /&gt;)</code> 开启 Concurrent Mode 时，每次遍历前，都会通过 Scheduler 提供的 <code>shouldYield</code> 方法判断是否需要中断遍历，使浏览器有时间渲染。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">workLoopConcurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Perform work until Scheduler asks us to yield</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>workInProgress <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">shouldYield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Schdeduler 中，时间切片周期默认为 5ms （<code>export const frameYieldMs = 5;</code>），如果一个 task 运行超过该周期, 下一个 task 执行之前, 会把控制权归还浏览器。</p><h2 id="优先级调度" tabindex="-1"><a class="header-anchor" href="#优先级调度" aria-hidden="true">#</a> 优先级调度</h2><p>Scheduler 是独立于 React 的，其优先级也是独立于 React 的优先级的。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> NoPriority <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// 无优先级任务</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> ImmediatePriority <span class="token operator">=</span> <span class="token number">1</span> <span class="token comment">// 立即执行任务</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> UserBlockingPriority <span class="token operator">=</span> <span class="token number">2</span> <span class="token comment">// 用户阻塞任务</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> NormalPriority <span class="token operator">=</span> <span class="token number">3</span> <span class="token comment">// 正常任务</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> LowPriority <span class="token operator">=</span> <span class="token number">4</span> <span class="token comment">// 低优先级任务</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> IdlePriority <span class="token operator">=</span> <span class="token number">5</span> <span class="token comment">// 空闲执行任务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="scheduler-任务调度" tabindex="-1"><a class="header-anchor" href="#scheduler-任务调度" aria-hidden="true">#</a> Scheduler 任务调度</h2><p>Scheduler 中有两个任务队列：<code>taskQueue</code> 和 <code>timerQueue</code>。</p><ul><li><code>taskQueue</code> ：用于保存调度任务队列。依据任务的过期时间（expirationTime）排序，需要在调度的 <code>workLoop</code> 中循环执行完这些任务。</li><li><code>timerQueue</code> ：用于保存待调度任务队列（延时任务）。依据任务的开始时间（startTime）排序，在调度 <code>workLoop</code> 中，会用 <code>advanceTimers</code> 检查任务是否过期，如果过期了，放入 <code>taskQueue</code> 队列。</li></ul><p>为了能在 <code>O(1)</code> 复杂度找到两个队列中时间最早的那个任务， Scheduler 使用 <code>小顶堆</code> 实现了优先级队列。</p><blockquote><p>堆是一种非线性结构，可以把堆看作一个数组，也可以被看作一个完全二叉树，通俗来讲堆其实就是利用完全二叉树的结构来维护的一维数组。按照堆的特点可以把堆分为大顶堆和小顶堆:</p><ul><li>大顶堆：每个结点的值都大于或等于其左右孩子结点的值</li><li>小顶堆：每个结点的值都小于或等于其左右孩子结点的值</li></ul></blockquote><p><img src="`+t+`" alt="scheduler"></p><h3 id="创建任务" tabindex="-1"><a class="header-anchor" href="#创建任务" aria-hidden="true">#</a> 创建任务</h3><p>Scheduler 对外暴露 <code>unstable_scheduleCallback</code> 方法，负责调度任务的创建和分配，以及调度的启动。</p><p>在 <code>unstable_scheduleCallback(priorityLevel, callback, options)</code> 方法中：</p><ul><li><p>获取当前时间 <code>var currentTime = getCurrentTime()</code></p></li><li><p>根据传入的优先级 <code>priorityLevel</code>, 设置超时时间 <code>timeout</code>。则，任务过期时间为 <code>expirationTime = startTime + timeout</code></p></li><li><p>创建新任务 <code>newTask</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> taskIdCounter <span class="token operator">=</span> <span class="token number">1</span>

<span class="token comment">// 创建新任务</span>
<span class="token keyword">var</span> newTask <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> taskIdCounter<span class="token operator">++</span><span class="token punctuation">,</span> <span class="token comment">// id 编号自增</span>
  callback<span class="token punctuation">,</span> <span class="token comment">// 传入的回调函数</span>
  priorityLevel<span class="token punctuation">,</span> <span class="token comment">// 优先级等级</span>
  startTime<span class="token punctuation">,</span> <span class="token comment">// 创建 task 时的当前时间</span>
  expirationTime<span class="token punctuation">,</span> <span class="token comment">// task 的过期时间（startTime + timeout）。优先级越高，时间越小</span>
  <span class="token literal-property property">sortIndex</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 任务排序索引</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>比较任务开始时间 <code>startTime</code> 和当前时间 <code>currentTime</code>。</p><ul><li><code>startTime &gt; currentTime</code> ，任务延时。 <ul><li>依据任务的开始时间 <code>startTime</code> 进行任务排序索引： <code>newTask.sortIndex = startTime</code></li><li>通过 <code>push(timerQueue, newTask)</code> 添加至待调度任务队列（延时任务） <code>timerQueue</code></li><li>判断调度任务队列 <code>taskQueue</code> 中是否已执行完所有的任务，并判断新任务 <code>newTask</code> 是否为待调度任务队列（延时任务） <code>timerQueue</code> 中的最早延时的任务。 <ul><li>判断当前是否有延时任务正在调度。如有，则停止，避免多个 <code>requestHostTimeout</code> 一起运行，造成资源的不必要浪费。</li><li>调用 <code>requestHostTimeout(handleTimeout, startTime - currentTime)</code> 使延时任务延迟 <code>startTime - currentTime</code> 毫秒，使其到达恰好过期的状态。延时指定时间后，调用 <code>handleTimeout</code> 函数，将任务通过 <code>requestHostCallback(flushWork)</code> 创建一个调度者开始调度任务。</li></ul></li></ul></li><li><code>startTime &lt;= currentTime</code> ，任务到期。 <ul><li>依据任务的过期时间 <code>expirationTime</code> 进行任务排序索引： <code>newTask.sortIndex = expirationTime</code>。</li><li>通过 <code>push(taskQueue, newTask)</code> 添加至调度任务队列 <code>taskQueue</code></li><li>判断是否已有 Scheduled 正在调度任务，并且是否正在执行工作 <code>!isHostCallbackScheduled &amp;&amp; !isPerformingWork</code>。 <ul><li>若无，则设置正在调度任务 <code>isHostCallbackScheduled = true</code>, 并调用 <code>requestHostCallback(flushWork)</code> 创建一个调度者开始调度任务。</li><li>若有，则直接使用上一个调度者调度任务。</li></ul></li></ul></li></ul></li></ul><details class="hint-container details"><summary>unstable_scheduleCallback(priorityLevel, callback, options)</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// Max 31 bit integer. The max integer size in V8 for 32-bit systems.</span>
<span class="token comment">// Math.pow(2, 30) - 1</span>
<span class="token comment">// 0b111111111111111111111111111111</span>
<span class="token keyword">var</span> maxSigned31BitInt <span class="token operator">=</span> <span class="token number">1073741823</span>

<span class="token comment">// Times out immediately</span>
<span class="token keyword">var</span> <span class="token constant">IMMEDIATE_PRIORITY_TIMEOUT</span> <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token comment">// 立即执行任务</span>
<span class="token comment">// Eventually times out</span>
<span class="token keyword">var</span> <span class="token constant">USER_BLOCKING_PRIORITY_TIMEOUT</span> <span class="token operator">=</span> <span class="token number">250</span> <span class="token comment">// 用户阻塞任务，超时时间</span>
<span class="token keyword">var</span> <span class="token constant">NORMAL_PRIORITY_TIMEOUT</span> <span class="token operator">=</span> <span class="token number">5000</span> <span class="token comment">// 正常任务，超时时间</span>
<span class="token keyword">var</span> <span class="token constant">LOW_PRIORITY_TIMEOUT</span> <span class="token operator">=</span> <span class="token number">10000</span> <span class="token comment">// 低优先级任务，超时时间</span>
<span class="token comment">// Never times out</span>
<span class="token keyword">var</span> <span class="token constant">IDLE_PRIORITY_TIMEOUT</span> <span class="token operator">=</span> maxSigned31BitInt <span class="token comment">// 空闲执行任务永不超时</span>

<span class="token comment">// Tasks are stored on a min heap</span>
<span class="token comment">// taskQueue 用于保存调度任务队列</span>
<span class="token comment">// 依据任务的过期时间（expirationTime）排序，需要在调度的 workLoop 中循环执行完这些任务</span>
<span class="token keyword">var</span> taskQueue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token comment">// timerQueue 用于保存待调度任务队列（延时任务）</span>
<span class="token comment">// 依据任务的开始时间（startTime）排序，在调度 workLoop 中 会用advanceTimers检查任务是否过期，如果过期了，放入 taskQueue 队列。</span>
<span class="token keyword">var</span> timerQueue <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token comment">// Incrementing id counter. Used to maintain insertion order.</span>
<span class="token keyword">var</span> taskIdCounter <span class="token operator">=</span> <span class="token number">1</span>

<span class="token comment">// This is set while performing work, to prevent re-entrance.</span>
<span class="token keyword">var</span> isPerformingWork <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 是否正在执行工作</span>

<span class="token keyword">var</span> isHostCallbackScheduled <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 是否有调度任务正在执行</span>
<span class="token keyword">var</span> isHostTimeoutScheduled <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 是否有延时任务正在调度</span>

<span class="token keyword">let</span> isMessageLoopRunning <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 是否已开始消息轮询</span>
<span class="token keyword">let</span> scheduledHostCallback <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 用于存储将要被调度的函数</span>
<span class="token keyword">let</span> taskTimeoutID <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span>

<span class="token keyword">function</span> <span class="token function">requestHostCallback</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  scheduledHostCallback <span class="token operator">=</span> callback
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMessageLoopRunning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    isMessageLoopRunning <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">schedulePerformWorkUntilDeadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">requestHostTimeout</span><span class="token punctuation">(</span><span class="token parameter">callback<span class="token punctuation">,</span> ms</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  taskTimeoutID <span class="token operator">=</span> <span class="token function">localSetTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">callback</span><span class="token punctuation">(</span><span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> ms<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">advanceTimers</span><span class="token punctuation">(</span><span class="token parameter">currentTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Check for tasks that are no longer delayed and add them to the queue.</span>
  <span class="token comment">// 检查调度任务队列（延时任务）中，是否有到期的任务</span>
  <span class="token comment">// 如有，则将待调度任务队列（延时任务） timerQueue 的任务添加到调度任务队列 taskQueue</span>

  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token function">peek</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">)</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>timer <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">.</span>callback <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Timer was cancelled.</span>
      <span class="token function">pop</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>timer<span class="token punctuation">.</span>startTime <span class="token operator">&lt;=</span> currentTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Timer fired. Transfer to the task queue.</span>
      <span class="token function">pop</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">)</span>
      timer<span class="token punctuation">.</span>sortIndex <span class="token operator">=</span> timer<span class="token punctuation">.</span>expirationTime
      <span class="token function">push</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">,</span> timer<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">markTaskStart</span><span class="token punctuation">(</span>timer<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>
        timer<span class="token punctuation">.</span>isQueued <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Remaining timers are pending.</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    timer <span class="token operator">=</span> <span class="token function">peek</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">handleTimeout</span><span class="token punctuation">(</span><span class="token parameter">currentTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  isHostTimeoutScheduled <span class="token operator">=</span> <span class="token boolean">false</span>

  <span class="token comment">// 将待调度任务队列（延时任务） timerQueue 中到期的任务，放入调度任务队列 taskQueue</span>
  <span class="token function">advanceTimers</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isHostCallbackScheduled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 无延时任务调度</span>

    <span class="token comment">// 从调度任务队列 taskQueue 中，获取任务</span>
    <span class="token comment">// 判断 taskQueue 是否有任务</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">peek</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span> <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 调度任务队列 taskQueue 中，【有任务】</span>

      <span class="token comment">// 将 isHostCallbackScheduled 设置为 true,表示有调度任务正在执行</span>
      isHostCallbackScheduled <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token comment">// 通过 requestHostCallback 开始执行 flushWork</span>
      <span class="token function">requestHostCallback</span><span class="token punctuation">(</span>flushWork<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 调度任务队列 taskQueue 中，【无任务】</span>

      <span class="token comment">// 从待调度任务队列（延时任务） timerQueue 中，获取任务</span>
      <span class="token keyword">const</span> firstTimer <span class="token operator">=</span> <span class="token function">peek</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>firstTimer <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// requestHostTimeout 通过 setTimeout 延时指定时间。</span>
        <span class="token comment">// 可以使一个延时任务能够到达恰好过期的状态，将其延迟 startTime - currentTime 毫秒</span>
        <span class="token function">requestHostTimeout</span><span class="token punctuation">(</span>handleTimeout<span class="token punctuation">,</span> firstTimer<span class="token punctuation">.</span>startTime <span class="token operator">-</span> currentTime<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">unstable_scheduleCallback</span><span class="token punctuation">(</span><span class="token parameter">priorityLevel<span class="token punctuation">,</span> callback<span class="token punctuation">,</span> options</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 获取当前时间</span>
  <span class="token keyword">var</span> currentTime <span class="token operator">=</span> <span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token keyword">var</span> startTime
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> options <span class="token operator">===</span> <span class="token string">&#39;object&#39;</span> <span class="token operator">&amp;&amp;</span> options <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 延时任务</span>
    <span class="token keyword">var</span> delay <span class="token operator">=</span> options<span class="token punctuation">.</span>delay
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> delay <span class="token operator">===</span> <span class="token string">&#39;number&#39;</span> <span class="token operator">&amp;&amp;</span> delay <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      startTime <span class="token operator">=</span> currentTime <span class="token operator">+</span> delay
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      startTime <span class="token operator">=</span> currentTime
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    startTime <span class="token operator">=</span> currentTime
  <span class="token punctuation">}</span>

  <span class="token comment">// 根据传入的优先级, 设置任务超时时间，</span>
  <span class="token keyword">var</span> timeout
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>priorityLevel<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ImmediatePriority</span><span class="token operator">:</span>
      timeout <span class="token operator">=</span> <span class="token constant">IMMEDIATE_PRIORITY_TIMEOUT</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">UserBlockingPriority</span><span class="token operator">:</span>
      timeout <span class="token operator">=</span> <span class="token constant">USER_BLOCKING_PRIORITY_TIMEOUT</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">IdlePriority</span><span class="token operator">:</span>
      timeout <span class="token operator">=</span> <span class="token constant">IDLE_PRIORITY_TIMEOUT</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">LowPriority</span><span class="token operator">:</span>
      timeout <span class="token operator">=</span> <span class="token constant">LOW_PRIORITY_TIMEOUT</span>
      <span class="token keyword">break</span>
    <span class="token keyword">case</span> <span class="token literal-property property">NormalPriority</span><span class="token operator">:</span>
    <span class="token keyword">default</span><span class="token operator">:</span>
      timeout <span class="token operator">=</span> <span class="token constant">NORMAL_PRIORITY_TIMEOUT</span>
      <span class="token keyword">break</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 计算任务过期时间 expirationTime</span>
  <span class="token keyword">var</span> expirationTime <span class="token operator">=</span> startTime <span class="token operator">+</span> timeout

  <span class="token comment">// 创建新任务</span>
  <span class="token keyword">var</span> newTask <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> taskIdCounter<span class="token operator">++</span><span class="token punctuation">,</span> <span class="token comment">// id 编号自增</span>
    callback<span class="token punctuation">,</span> <span class="token comment">// 传入的回调函数</span>
    priorityLevel<span class="token punctuation">,</span> <span class="token comment">// 优先级等级</span>
    startTime<span class="token punctuation">,</span> <span class="token comment">// 创建 task 时的当前时间</span>
    expirationTime<span class="token punctuation">,</span> <span class="token comment">// task 的过期时间（startTime + timeout）。优先级越高，时间越小</span>
    <span class="token literal-property property">sortIndex</span><span class="token operator">:</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token comment">// 任务排序索引</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    newTask<span class="token punctuation">.</span>isQueued <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>startTime <span class="token operator">&gt;</span> currentTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// This is a delayed task.</span>
    <span class="token comment">// 延时任务</span>

    <span class="token comment">// 延时任务排序索引, 全等于创建任务的当前时间</span>
    newTask<span class="token punctuation">.</span>sortIndex <span class="token operator">=</span> startTime
    <span class="token function">push</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">,</span> newTask<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">peek</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> newTask <span class="token operator">===</span> <span class="token function">peek</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// All tasks are delayed, and this is the task with the earliest delay.</span>
      <span class="token comment">// 当调度任务队列中执行完所有的任务</span>
      <span class="token comment">// 则需要不断遍历延时队列中的任务，一旦有任务过期则需要立即添加到过期任务队列中进行执行</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>isHostTimeoutScheduled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 判断当前是否是否有延时任务正在调度</span>
        <span class="token comment">// 如有，则停止，避免多个 requestHostTimeout 一起运行，造成资源的不必要浪费</span>

        <span class="token comment">// Cancel an existing timeout.</span>
        <span class="token function">cancelHostTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        isHostTimeoutScheduled <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// Schedule a timeout.</span>
      <span class="token comment">// 创建一个 timeout 作为调度者</span>

      <span class="token comment">// requestHostTimeout 通过 setTimeout 延时指定时间。</span>
      <span class="token comment">// 可以使一个延时任务能够到达恰好过期的状态，将其延迟 startTime - currentTime 毫秒</span>
      <span class="token function">requestHostTimeout</span><span class="token punctuation">(</span>handleTimeout<span class="token punctuation">,</span> startTime <span class="token operator">-</span> currentTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调度任务</span>

    <span class="token comment">// 新的调度任务排序索引, 全等于任务过期时间</span>
    newTask<span class="token punctuation">.</span>sortIndex <span class="token operator">=</span> expirationTime
    <span class="token comment">// 加入任务队列</span>
    <span class="token function">push</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">,</span> newTask<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">markTaskStart</span><span class="token punctuation">(</span>newTask<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>
      newTask<span class="token punctuation">.</span>isQueued <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Schedule a host callback, if needed. If we&#39;re already performing work,</span>
    <span class="token comment">// wait until the next time we yield.</span>
    <span class="token comment">// 判断是否已有 Scheduled 正在调度任务</span>
    <span class="token comment">// 没有的话，则创建一个调度者开始调度任务；有的话，则直接使用上一个调度者调度任务</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isHostCallbackScheduled <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>isPerformingWork<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 设置正在调度任务</span>
      isHostCallbackScheduled <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token comment">// 创建一个调度者开始调度任务</span>
      <span class="token function">requestHostCallback</span><span class="token punctuation">(</span>flushWork<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> newTask
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="任务管理" tabindex="-1"><a class="header-anchor" href="#任务管理" aria-hidden="true">#</a> 任务管理</h3><p>创建任务之后，通过 <code>requestHostCallback(callback)</code> 函数请求调度。<code>flushWork</code> 函数作为参数被传入调度中心等待回调。</p><p>在 <code>requestHostCallback(callback)</code> 函数中：</p><ul><li><p>通过 <code>scheduledHostCallback = callback</code> ，将 <code>flushWork</code> 赋值给全局变量 <code>scheduledHostCallback</code> 存储将要被调度的函数。</p></li><li><p>判断 <code>isMessageLoopRunning</code> 是否已开始消息轮询，防止同一时间调用多次 <code>schedulePerformWorkUntilDeadline</code> 函数。</p></li><li><p>在 <code>schedulePerformWorkUntilDeadline</code> 函数中，通过 <code>MessageChannel</code> 消息通道的 <code>port2</code> 端口发送消息 <code>port2.postMessage(null)</code>，并触发 <code>port1</code> 的监听消息函数 <code>channel.port1.onmessage = performWorkUntilDeadline</code> 。</p><p><code>MessageChannel</code> 在事件循环中是宏任务，是异步的，所以调度流程也是异步的。</p></li><li><p>通过 <code>performWorkUntilDeadline</code> 处理任务中的 <code>callback</code>，直到任务超过最大可执行时长。</p></li></ul><details class="hint-container details"><summary>requestHostCallback(callback) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> scheduledHostCallback <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 用于存储将要被调度的函数</span>

<span class="token keyword">let</span> schedulePerformWorkUntilDeadline
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> localSetImmediate <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Node.js and old IE.</span>
  <span class="token comment">// There&#39;s a few reasons for why we prefer setImmediate.</span>
  <span class="token comment">//</span>
  <span class="token comment">// Unlike MessageChannel, it doesn&#39;t prevent a Node.js process from exiting.</span>
  <span class="token comment">// (Even though this is a DOM fork of the Scheduler, you could get here</span>
  <span class="token comment">// with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)</span>
  <span class="token comment">// https://github.com/facebook/react/issues/20756</span>
  <span class="token comment">//</span>
  <span class="token comment">// But also, it runs earlier which is the semantic we want.</span>
  <span class="token comment">// If other browsers ever implement it, it&#39;s better to use it.</span>
  <span class="token comment">// Although both of these would be inferior to native scheduling.</span>
  <span class="token function-variable function">schedulePerformWorkUntilDeadline</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">localSetImmediate</span><span class="token punctuation">(</span>performWorkUntilDeadline<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> MessageChannel <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// DOM and Worker environments.</span>
  <span class="token comment">// We prefer MessageChannel because of the 4ms setTimeout clamping.</span>
  <span class="token keyword">const</span> channel <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MessageChannel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> port <span class="token operator">=</span> channel<span class="token punctuation">.</span>port2
  channel<span class="token punctuation">.</span>port1<span class="token punctuation">.</span>onmessage <span class="token operator">=</span> performWorkUntilDeadline
  <span class="token function-variable function">schedulePerformWorkUntilDeadline</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    port<span class="token punctuation">.</span><span class="token function">postMessage</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
  <span class="token comment">// We should only fallback here in non-browser environments.</span>
  <span class="token function-variable function">schedulePerformWorkUntilDeadline</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">localSetTimeout</span><span class="token punctuation">(</span>performWorkUntilDeadline<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">requestHostCallback</span><span class="token punctuation">(</span><span class="token parameter">callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// scheduledHostCallback：全局变量，存储将要被调度的函数</span>
  scheduledHostCallback <span class="token operator">=</span> callback
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isMessageLoopRunning<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 判断是否已开始消息轮询</span>

    <span class="token comment">// 设置已开始消息轮询状态，防止同一时间调用多次 schedulePerformWorkUntilDeadline</span>
    isMessageLoopRunning <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token function">schedulePerformWorkUntilDeadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 <code>performWorkUntilDeadline</code> 函数中：</p><ul><li>调用 <code>scheduledHostCallback(hasTimeRemaining, currentTime)</code> 函数（即：<code>flushWork(hasTimeRemaining, currentTime)</code>），返回 <code>workLoop(hasTimeRemaining, initialTime)</code> 函数值，赋值给 <code>hasMoreWork</code> （表示是否还有任务需要进行）</li><li><code>hasMoreWork</code> 为 <code>true</code> ，表示调度任务队列 <code>taskQueue</code> 还有任务，则执行 <code>schedulePerformWorkUntilDeadline</code></li><li><code>hasMoreWork</code> 为 <code>false</code> ，表示调度任务队列 <code>taskQueue</code> 中的任务都执行完成，需要将调度者释放，设置 <code>isMessageLoopRunning = false</code> <code>scheduledHostCallback = null</code>，为下一次调度做准备。</li></ul><details class="hint-container details"><summary>performWorkUntilDeadline 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> isMessageLoopRunning <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 是否已开始消息轮询，防止同一时间调用多次 schedulePerformWorkUntilDeadline</span>
<span class="token keyword">let</span> scheduledHostCallback <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 用于存储将要被调度的函数</span>

<span class="token keyword">let</span> startTime <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token comment">// 记录批任务的开始时间，而不是单个任务的开始时间</span>

<span class="token keyword">const</span> <span class="token function-variable function">performWorkUntilDeadline</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>scheduledHostCallback <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> currentTime <span class="token operator">=</span> <span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token comment">// Keep track of the start time so we can measure how long the main thread</span>
    <span class="token comment">// has been blocked.</span>
    startTime <span class="token operator">=</span> currentTime
    <span class="token keyword">const</span> hasTimeRemaining <span class="token operator">=</span> <span class="token boolean">true</span>

    <span class="token comment">// If a scheduler task throws, exit the current browser task so the</span>
    <span class="token comment">// error can be observed.</span>
    <span class="token comment">//</span>
    <span class="token comment">// Intentionally not using a try-catch, since that makes some debugging</span>
    <span class="token comment">// techniques harder. Instead, if \`scheduledHostCallback\` errors, then</span>
    <span class="token comment">// \`hasMoreWork\` will remain true, and we&#39;ll continue the work loop.</span>
    <span class="token keyword">let</span> hasMoreWork <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      hasMoreWork <span class="token operator">=</span> <span class="token function">scheduledHostCallback</span><span class="token punctuation">(</span>hasTimeRemaining<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>hasMoreWork<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// If there&#39;s more work, schedule the next message event at the end</span>
        <span class="token comment">// of the preceding one.</span>
        <span class="token function">schedulePerformWorkUntilDeadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        isMessageLoopRunning <span class="token operator">=</span> <span class="token boolean">false</span>
        scheduledHostCallback <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    isMessageLoopRunning <span class="token operator">=</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// Yielding to the browser will give it a chance to paint, so we can</span>
  <span class="token comment">// reset this.</span>
  needsPaint <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 flushWork(hasTimeRemaining, initialTime) 函数中：</p><ul><li>通过全局变量 <code>isHostTimeoutScheduled</code> 判断是否有延时任务正在调度，如果有，则通过 <code>cancelHostTimeout</code> 取消延时任务调度</li><li>通过全局变量 <code>isPerformingWork = true</code> 标识正在执行工作</li><li>通过 <code>const previousPriorityLevel = currentPriorityLevel</code> 保存当前优先级</li><li>调用 <code>workLoop(hasTimeRemaining, initialTime)</code> 进行任务中断与恢复</li><li>执行完成后，标记当前无任务执行 <code>currentTask = null</code>，恢复优先级 <code>currentPriorityLevel = previousPriorityLevel</code>，标记执行结束 <code>isPerformingWork = false</code></li></ul><details class="hint-container details"><summary>flushWork(hasTimeRemaining, initialTime) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// hasTimeRemaining: 代表当前帧是否还有时间</span>
<span class="token comment">// initialTime: 即 currentTime</span>
<span class="token keyword">function</span> <span class="token function">flushWork</span><span class="token punctuation">(</span><span class="token parameter">hasTimeRemaining<span class="token punctuation">,</span> initialTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">markSchedulerUnsuspended</span><span class="token punctuation">(</span>initialTime<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// We&#39;ll need a host callback the next time work is scheduled.</span>
  isHostCallbackScheduled <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 全局变量，是否有调度任务正在执行</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>isHostTimeoutScheduled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// We scheduled a timeout but it&#39;s no longer needed. Cancel it.</span>
    <span class="token comment">// 判断是否有延时任务正在调度</span>
    <span class="token comment">// 如果有延时任务执行，则先暂停延时任务</span>

    isHostTimeoutScheduled <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 全局变量，是否有延时任务正在调度</span>
    <span class="token function">cancelHostTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  isPerformingWork <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token comment">// 全局变量，标记正在执行工作</span>
  <span class="token keyword">const</span> previousPriorityLevel <span class="token operator">=</span> currentPriorityLevel <span class="token comment">// 保存当前执行任务的优先级</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">workLoop</span><span class="token punctuation">(</span>hasTimeRemaining<span class="token punctuation">,</span> initialTime<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>currentTask <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> currentTime <span class="token operator">=</span> <span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          <span class="token function">markTaskErrored</span><span class="token punctuation">(</span>currentTask<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>
          currentTask<span class="token punctuation">.</span>isQueued <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">throw</span> error
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// No catch in prod code path.</span>
      <span class="token comment">// 调用 workLoop ，执行调度任务</span>
      <span class="token keyword">return</span> <span class="token function">workLoop</span><span class="token punctuation">(</span>hasTimeRemaining<span class="token punctuation">,</span> initialTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    currentTask <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 设置当前任务为空</span>
    currentPriorityLevel <span class="token operator">=</span> previousPriorityLevel <span class="token comment">// 恢复优先级</span>
    isPerformingWork <span class="token operator">=</span> <span class="token boolean">false</span> <span class="token comment">// 全局变量，标记执行工作结束</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> currentTime <span class="token operator">=</span> <span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token function">markSchedulerSuspended</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 <code>workLoop(hasTimeRemaining, initialTime)</code> 函数中：</p><ul><li>通过 <code>advanceTimers(currentTime)</code> 将待调度任务队列（延时任务） <code>timerQueue</code> 中到期的任务，放入调度任务队列 <code>taskQueue</code></li><li>获取调度任务队列 <code>taskQueue</code> 中，优先级最高的任务作为第一个处理的任务</li><li>开始 <code>while</code> 循环，进行调度任务队列处理 <ul><li>进入循环，在执行任务前，判断当前任务 <code>currentTask</code> 是否到期，并判断是否还有剩余时间或是否应该中断任务 <ul><li>当前任务未过期（延时任务），并且无剩余时间或者需要中断任务，则跳出循环， <code>currentTask</code> 不为 <code>null</code>，返回为 <code>true</code> 标明需要恢复任务。</li><li>当前任务到期，并且还有剩余时间或者不需要中断任务，则正常执行任务。</li></ul></li><li>获取当前任务回调函数 <code>const callback = currentTask.callback</code>，并判断回调函数是否为函数 <code>typeof callback === &#39;function&#39;</code>。 <ul><li>任务回调函数不是函数，表示任务已经执行完成，从队列中移除当前任务。</li><li>任务回调函数为函数，表示为有效任务。</li></ul></li><li>执行当前任务 <code>const continuationCallback = callback(didUserCallbackTimeout)</code>，并判断返回值 <code>continuationCallback</code> 是否为函数 <code>typeof continuationCallback === &#39;function&#39;</code><ul><li>任务执行完成后，返回为非函数，表示当前任务已执行完成。则判断当前任务 <code>currentTask</code> 是否与任务队列中最高优先级任务是否一致，一致则删除当前任务。</li><li>任务执行完成后，返回为函数，表示当前任务未执行完成，则将这个函数作为当前任务新的回调函数，在下一次 <code>while</code> 循环时调用。</li></ul></li><li>每个任务执行后（不一定执行完成），都通过 <code>advanceTimers</code> 将待调度任务队列（延时任务） <code>timerQueue</code> 中到期的任务，放入调度任务队列 <code>taskQueue</code>，因为在执行过程中有可能部分任务也过期了。</li><li>获取调度任务队列 <code>taskQueue</code> 中，优先级最高的任务作为第一个处理的任务，执行 <code>while</code> 循环</li></ul></li><li>结束 <code>while</code> 循环</li><li>判断 <code>currentTask</code> 是否不为 <code>null</code> 。 <ul><li><code>currentTask</code> 不为 <code>null</code>，当前任务被中断，则返回 <code>true</code> 需要恢复任务</li><li><code>currentTask</code> 为 <code>null</code>，当前调度任务队列 <code>taskQueue</code> 执行完毕 <ul><li>获取待调度任务队列 <code>timerQueue</code> 最高优先级任务 <code>const firstTimer = peek(timerQueue)</code></li><li>判断获取最高优先级延时任务是否不为 <code>null</code>，则执行 <code>requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime)</code> 将延时任务延迟 <code>(startTime - currentTime)</code> 毫秒，使其到达恰好过期的状态。延时指定时间后，调用 <code>handleTimeout</code> 函数，将任务通过 <code>requestHostCallback(flushWork)</code> 创建一个调度者开始调度任务</li><li>返回 <code>false</code> 不需要恢复任务</li></ul></li></ul></li></ul><details class="hint-container details"><summary>workLoop(hasTimeRemaining, initialTime) 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> frameYieldMs <span class="token operator">=</span> <span class="token number">5</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> continuousYieldMs <span class="token operator">=</span> <span class="token number">50</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> maxYieldMs <span class="token operator">=</span> <span class="token number">300</span>

<span class="token comment">// isInputPending 作用是检测用户的输入事件</span>
<span class="token comment">// 例如：鼠标点击，键盘输入等，如果有用户输入测返回 true，没有则返回 false。</span>
<span class="token keyword">const</span> isInputPending <span class="token operator">=</span>
  <span class="token keyword">typeof</span> navigator <span class="token operator">!==</span> <span class="token string">&#39;undefined&#39;</span> <span class="token operator">&amp;&amp;</span>
  navigator<span class="token punctuation">.</span>scheduling <span class="token operator">!==</span> <span class="token keyword">undefined</span> <span class="token operator">&amp;&amp;</span>
  navigator<span class="token punctuation">.</span>scheduling<span class="token punctuation">.</span>isInputPending <span class="token operator">!==</span> <span class="token keyword">undefined</span>
    <span class="token operator">?</span> navigator<span class="token punctuation">.</span>scheduling<span class="token punctuation">.</span><span class="token function">isInputPending</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span>navigator<span class="token punctuation">.</span>scheduling<span class="token punctuation">)</span>
    <span class="token operator">:</span> <span class="token keyword">null</span>

<span class="token comment">// Scheduler periodically yields in case there is other work on the main</span>
<span class="token comment">// thread, like user events. By default, it yields multiple times per frame.</span>
<span class="token comment">// It does not attempt to align with frame boundaries, since most tasks don&#39;t</span>
<span class="token comment">// need to be frame aligned; for those that do, use requestAnimationFrame.</span>
<span class="token keyword">let</span> frameInterval <span class="token operator">=</span> frameYieldMs
<span class="token keyword">const</span> continuousInputInterval <span class="token operator">=</span> continuousYieldMs
<span class="token keyword">const</span> maxInterval <span class="token operator">=</span> maxYieldMs
<span class="token keyword">let</span> startTime <span class="token operator">=</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token comment">// 记录批任务的开始时间，而不是单个任务的开始时间</span>

<span class="token keyword">let</span> needsPaint <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token comment">// 判断是否中断任务</span>
<span class="token comment">// 检查当前任务的使用时间是否小于帧间隔时间。小于，则返回 false 表示无需中断</span>
<span class="token keyword">function</span> <span class="token function">shouldYieldToHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// startTime 是在调用 performWorkUntilDeadline 时赋的值，即任务开始调度的时候的开始时间</span>
  <span class="token keyword">const</span> timeElapsed <span class="token operator">=</span> <span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> startTime
  <span class="token keyword">if</span> <span class="token punctuation">(</span>timeElapsed <span class="token operator">&lt;</span> frameInterval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// The main thread has only been blocked for a really short amount of time;</span>
    <span class="token comment">// smaller than a single frame. Don&#39;t yield yet.</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// The main thread has been blocked for a non-negligible amount of time. We</span>
  <span class="token comment">// may want to yield control of the main thread, so the browser can perform</span>
  <span class="token comment">// high priority tasks. The main ones are painting and user input. If there&#39;s</span>
  <span class="token comment">// a pending paint or a pending input, then we should yield. But if there&#39;s</span>
  <span class="token comment">// neither, then we can yield less often while remaining responsive. We&#39;ll</span>
  <span class="token comment">// eventually yield regardless, since there could be a pending paint that</span>
  <span class="token comment">// wasn&#39;t accompanied by a call to \`requestPaint\`, or other main thread tasks</span>
  <span class="token comment">// like network events.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableIsInputPending<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>needsPaint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// There&#39;s a pending paint (signaled by \`requestPaint\`). Yield now.</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>timeElapsed <span class="token operator">&lt;</span> continuousInputInterval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// We haven&#39;t blocked the thread for that long. Only yield if there&#39;s a</span>
      <span class="token comment">// pending discrete input (e.g. click). It&#39;s OK if there&#39;s pending</span>
      <span class="token comment">// continuous input (e.g. mouseover).</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isInputPending <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">isInputPending</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>timeElapsed <span class="token operator">&lt;</span> maxInterval<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Yield if there&#39;s either a pending discrete or continuous input.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>isInputPending <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">isInputPending</span><span class="token punctuation">(</span>continuousOptions<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// We&#39;ve blocked the thread for a long time. Even if there&#39;s no pending</span>
      <span class="token comment">// input, there may be some other scheduled work that we don&#39;t know about,</span>
      <span class="token comment">// like a network event. Yield now.</span>
      <span class="token keyword">return</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \`isInputPending\` isn&#39;t available. Yield now.</span>
  <span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">workLoop</span><span class="token punctuation">(</span><span class="token parameter">hasTimeRemaining<span class="token punctuation">,</span> initialTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> currentTime <span class="token operator">=</span> initialTime

  <span class="token comment">// 将待调度任务队列（延时任务） timerQueue 中到期的任务，放入调度任务队列 taskQueue</span>
  <span class="token function">advanceTimers</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span>

  <span class="token comment">// 从调度任务队列 taskQueue 中获取任务</span>
  currentTask <span class="token operator">=</span> <span class="token function">peek</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>
    currentTask <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span>enableSchedulerDebugging <span class="token operator">&amp;&amp;</span> isSchedulerPaused<span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      currentTask<span class="token punctuation">.</span>expirationTime <span class="token operator">&gt;</span> currentTime <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span><span class="token operator">!</span>hasTimeRemaining <span class="token operator">||</span> <span class="token function">shouldYieldToHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// This currentTask hasn&#39;t expired, and we&#39;ve reached the deadline.</span>

      <span class="token comment">// 判断当前任务过期时间是否大于当前时间：大于，表示没有过期，则不需要立即执行</span>
      <span class="token comment">// hasTimeRemaining: 表示是否还有剩余时间，剩余时间不足，则需要中断当前任务，让其他任务先执行</span>
      <span class="token comment">// shouldYieldToHost: 是否应该中断当前任务</span>

      <span class="token comment">// 任务还没有过期（任务延时），但是已经到运行截止时间，则跳出循环，任务会在下个周期执行</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> callback <span class="token operator">=</span> currentTask<span class="token punctuation">.</span>callback
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> callback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 只有当前任务 currentTask 的回调函数 callback 为函数时，才会被识别为有效任务</span>

      currentTask<span class="token punctuation">.</span>callback <span class="token operator">=</span> <span class="token keyword">null</span> <span class="token comment">// 设置回掉函数为 null，表示任务执行完成，会从任务队列中删除</span>
      currentPriorityLevel <span class="token operator">=</span> currentTask<span class="token punctuation">.</span>priorityLevel <span class="token comment">// 设置执行任务的优先级</span>

      <span class="token comment">// 判断当前任务是否过期（是否还有剩余时间）</span>
      <span class="token keyword">const</span> didUserCallbackTimeout <span class="token operator">=</span> currentTask<span class="token punctuation">.</span>expirationTime <span class="token operator">&lt;=</span> currentTime

      <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">markTaskRun</span><span class="token punctuation">(</span>currentTask<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 执行当前任务 callback 回调</span>
      <span class="token keyword">const</span> continuationCallback <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span>didUserCallbackTimeout<span class="token punctuation">)</span>
      currentTime <span class="token operator">=</span> <span class="token function">getCurrentTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> continuationCallback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 任务执行完成后返回的函数，表示当前任务没有完成</span>
        <span class="token comment">// 则，将这个函数作为当前任务新的回调函数，在下一次 While 循环时调用</span>

        <span class="token comment">// newCallbackNode = scheduleCallback(</span>
        <span class="token comment">//   schedulerPriorityLevel,</span>
        <span class="token comment">//   performConcurrentWorkOnRoot.bind(null, root)</span>
        <span class="token comment">// )</span>
        <span class="token comment">// 在 React Concurrent 模式下，</span>
        <span class="token comment">// callback 是 performConcurrentWorkOnRoot 函数，函数内部 originalCallbackNode 为当前正在执行的任务</span>
        <span class="token comment">// 会与 root.callbackNode 上挂载的任务比较，如果不相同，则表示任务执行完毕，如果相同，则表示任务没有执行完成</span>
        <span class="token comment">// 返回自身，作为当前任务新的回调函数。接下来，则会让出执行权给优先级更高的任务先执行</span>

        currentTask<span class="token punctuation">.</span>callback <span class="token operator">=</span> continuationCallback
        <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">markTaskYield</span><span class="token punctuation">(</span>currentTask<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfiling<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">markTaskCompleted</span><span class="token punctuation">(</span>currentTask<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>
          currentTask<span class="token punctuation">.</span>isQueued <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>currentTask <span class="token operator">===</span> <span class="token function">peek</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">pop</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span> <span class="token comment">// 删除当前任务</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// 将待调度任务队列（延时任务） timerQueue 中到期的任务，放入调度任务队列 taskQueue</span>
      <span class="token function">advanceTimers</span><span class="token punctuation">(</span>currentTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">pop</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span> <span class="token comment">// 删除当前任务</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 从taskQueue中继续获取任务，如果上一次任务没有完成，那么不会从taskQueue中删除，获取的还是上一次任务</span>
    <span class="token comment">// 接下来会继续执行它</span>
    currentTask <span class="token operator">=</span> <span class="token function">peek</span><span class="token punctuation">(</span>taskQueue<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Return whether there&#39;s additional work</span>
  <span class="token comment">// 当前任务被中断，currentTask 不为 null，则会返回 true，</span>
  <span class="token comment">// scheduler 会继续发起调度，执行任务</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>currentTask <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> firstTimer <span class="token operator">=</span> <span class="token function">peek</span><span class="token punctuation">(</span>timerQueue<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>firstTimer <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">requestHostTimeout</span><span class="token punctuation">(</span>handleTimeout<span class="token punctuation">,</span> firstTimer<span class="token punctuation">.</span>startTime <span class="token operator">-</span> currentTime<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="时间切片原理" tabindex="-1"><a class="header-anchor" href="#时间切片原理" aria-hidden="true">#</a> 时间切片原理</h3><p>消费任务队列的过程中, 可以消费 <code>1~n</code> 个 <code>task</code>, 甚至清空整个调度任务队列 <code>taskQueue</code> 。在每一次具体执行 <code>task.callback</code> 之前，都会进行超时检测。如果超时，会立即退出循环并等待下一次调用。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">workLoop</span><span class="token punctuation">(</span><span class="token parameter">hasTimeRemaining<span class="token punctuation">,</span> initialTime</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>
    currentTask <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token punctuation">(</span>enableSchedulerDebugging <span class="token operator">&amp;&amp;</span> isSchedulerPaused<span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      currentTask<span class="token punctuation">.</span>expirationTime <span class="token operator">&gt;</span> currentTime <span class="token operator">&amp;&amp;</span>
      <span class="token punctuation">(</span><span class="token operator">!</span>hasTimeRemaining <span class="token operator">||</span> <span class="token function">shouldYieldToHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> callback <span class="token operator">=</span> currentTask<span class="token punctuation">.</span>callback

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> callback <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 执行当前任务 callback 回调</span>
      <span class="token keyword">const</span> continuationCallback <span class="token operator">=</span> <span class="token function">callback</span><span class="token punctuation">(</span>didUserCallbackTimeout<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 省略部分代码</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 省略部分代码</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可中断渲染原理" tabindex="-1"><a class="header-anchor" href="#可中断渲染原理" aria-hidden="true">#</a> 可中断渲染原理</h3><p>在时间切片的基础之上，如果单个 <code>task.callback</code> 执行时间就很长(假设 200ms)，则需要 <code>task.callback</code> 自己能够检测是否超时。</p><p>在 <code>Fiber</code> 树构造过程中，每构造完成一个单元，都会检测一次超时。如遇超时，就退出 <code>Fiber</code> 树构造循环，并返回一个新的回调函数（即：执行当前任务 <code>callback</code> 回调的返回值 <code>continuationCallback</code>）并等待下一次回调继续未完成的 <code>Fiber</code> 树构造。</p><h2 id="react-节流防抖" tabindex="-1"><a class="header-anchor" href="#react-节流防抖" aria-hidden="true">#</a> React 节流防抖</h2><p><code>ensureRootIsScheduled</code> 函数会与 <code>scheduler</code> 包通信, 最后注册一个 <code>task</code> 并等待回调。</p><ul><li>在 <code>task</code> 注册完成之后, 会设置 <code>fiberRoot</code> 对象上的属性，代表现在已经处于调度进行中。</li><li>再次进入 <code>ensureRootIsScheduled</code> 时（比如：连续 2 次 <code>setState</code>, 第 2 次 <code>setState</code> 同样会触发 <code>reconciler</code> 运作流程中的调度阶段）。如果发现处于调度中, 则需要一些节流和防抖措施, 进而保证调度性能。 <ul><li>节流（判断条件: <code>existingCallbackPriority === newCallbackPriority</code>, 新旧更新的优先级相同, 如连续多次执行 <code>setState</code>）, 则无需注册新 <code>task</code> （继续沿用上一个优先级相同的 <code>task</code>）, 直接退出调用。</li><li>防抖（判断条件: <code>existingCallbackPriority !== newCallbackPriority</code>, 新旧更新的优先级不同）, 则取消旧 <code>task</code>, 重新注册新 <code>task</code>。</li></ul></li></ul><details class="hint-container details"><summary>ensureRootIsScheduled</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// ensureRootIsScheduled 用于 rootFiber 的任务调度。一个 root 只有一个任务在执行，每次更新和任务退出前都会调用此函数。</span>
<span class="token comment">// 1. 计算新任务的过期时间、优先级</span>
<span class="token comment">// 2. 无新任务，退出调度</span>
<span class="token comment">// 3. 有历史任务：</span>
<span class="token comment">//    3.1 新旧任务的优先级相同，继续执行旧任务，（新任务会在旧任务执行完成之后的同步刷新钩子中执行）</span>
<span class="token comment">//    3.2 新旧任务的优先级不相同，取消旧任务</span>
<span class="token comment">// 4. 根据不同的 Priority （优先级） 执行不同的调度(scheduleSyncCallback(同步) 或 scheduleCallback（异步）), 最后将返回值设置到 fiberRoot.callbackNode</span>
<span class="token keyword">function</span> <span class="token function">ensureRootIsScheduled</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span> <span class="token literal-property property">currentTime</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> existingCallbackNode <span class="token operator">=</span> root<span class="token punctuation">.</span>callbackNode

  <span class="token comment">// Check if any lanes are being starved by other work. If so, mark them as</span>
  <span class="token comment">// expired so we know to work on those next.</span>
  <span class="token function">markStarvedLanesAsExpired</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> currentTime<span class="token punctuation">)</span>

  <span class="token comment">// Determine the next lanes to work on, and their priority.</span>
  <span class="token keyword">const</span> nextLanes <span class="token operator">=</span> <span class="token function">getNextLanes</span><span class="token punctuation">(</span>
    root<span class="token punctuation">,</span>
    root <span class="token operator">===</span> workInProgressRoot <span class="token operator">?</span> workInProgressRootRenderLanes <span class="token operator">:</span> NoLanes
  <span class="token punctuation">)</span>

  <span class="token comment">// 节流防抖</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>nextLanes <span class="token operator">===</span> NoLanes<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Special case: There&#39;s nothing to work on.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>existingCallbackNode <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">cancelCallback</span><span class="token punctuation">(</span>existingCallbackNode<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    root<span class="token punctuation">.</span>callbackNode <span class="token operator">=</span> <span class="token keyword">null</span>
    root<span class="token punctuation">.</span>callbackPriority <span class="token operator">=</span> NoLane
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// We use the highest priority lane to represent the priority of the callback.</span>
  <span class="token keyword">const</span> newCallbackPriority <span class="token operator">=</span> <span class="token function">getHighestPriorityLane</span><span class="token punctuation">(</span>nextLanes<span class="token punctuation">)</span>

  <span class="token comment">// Check if there&#39;s an existing task. We may be able to reuse it.</span>
  <span class="token keyword">const</span> existingCallbackPriority <span class="token operator">=</span> root<span class="token punctuation">.</span>callbackPriority
  <span class="token keyword">if</span> <span class="token punctuation">(</span>
    existingCallbackPriority <span class="token operator">===</span> newCallbackPriority <span class="token operator">&amp;&amp;</span>
    <span class="token comment">// Special case related to \`act\`. If the currently scheduled task is a</span>
    <span class="token comment">// Scheduler task, rather than an \`act\` task, cancel it and re-scheduled</span>
    <span class="token comment">// on the \`act\` queue.</span>
    <span class="token operator">!</span><span class="token punctuation">(</span>
      __DEV__ <span class="token operator">&amp;&amp;</span>
      ReactCurrentActQueue<span class="token punctuation">.</span>current <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span>
      existingCallbackNode <span class="token operator">!==</span> fakeActCallbackNode
    <span class="token punctuation">)</span>
  <span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// The priority hasn&#39;t changed. We can reuse the existing task. Exit.</span>
    <span class="token keyword">return</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span>existingCallbackNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Cancel the existing callback. We&#39;ll schedule a new one below.</span>
    <span class="token function">cancelCallback</span><span class="token punctuation">(</span>existingCallbackNode<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Schedule a new callback.</span>
  <span class="token keyword">let</span> newCallbackNode
  <span class="token keyword">if</span> <span class="token punctuation">(</span>newCallbackPriority <span class="token operator">===</span> SyncLane<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Special case: Sync React callbacks are scheduled on a special</span>
    <span class="token comment">// internal queue</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>tag <span class="token operator">===</span> LegacyRoot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">scheduleLegacySyncCallback</span><span class="token punctuation">(</span><span class="token function">performSyncWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">scheduleSyncCallback</span><span class="token punctuation">(</span><span class="token function">performSyncWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>supportsMicrotasks<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">scheduleMicrotask</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token comment">// In Safari, appending an iframe forces microtasks to run.</span>
        <span class="token comment">// https://github.com/facebook/react/issues/22459</span>
        <span class="token comment">// We don&#39;t support running callbacks in the middle of render</span>
        <span class="token comment">// or commit so we need to check against that.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          <span class="token punctuation">(</span>executionContext <span class="token operator">&amp;</span> <span class="token punctuation">(</span>RenderContext <span class="token operator">|</span> CommitContext<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">===</span>
          NoContext
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// Note that this would still prematurely flush the callbacks</span>
          <span class="token comment">// if this happens outside render or commit phase (e.g. in an event).</span>
          <span class="token function">flushSyncCallbacks</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Flush the queue in an Immediate task.</span>
      <span class="token function">scheduleCallback</span><span class="token punctuation">(</span>ImmediateSchedulerPriority<span class="token punctuation">,</span> flushSyncCallbacks<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    newCallbackNode <span class="token operator">=</span> <span class="token keyword">null</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> schedulerPriorityLevel
    <span class="token comment">// lanesToEventPriority ： 将 lane 优先级转换为 event 优先级</span>
    <span class="token comment">// 以区间的形式，根据传入的 lane 返回对应的 event 优先级。比如，传入的优先级不大于 Discrete 优先级，就返回 Discrete 优先级，以此类推</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token function">lanesToEventPriority</span><span class="token punctuation">(</span>nextLanes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token literal-property property">DiscreteEventPriority</span><span class="token operator">:</span>
        <span class="token comment">// DiscreteEventPriority 离散事件优先级。click、keydown、focusin等，事件的触发不是连续，可以做到快速响应</span>
        schedulerPriorityLevel <span class="token operator">=</span> ImmediateSchedulerPriority
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token literal-property property">ContinuousEventPriority</span><span class="token operator">:</span>
        <span class="token comment">// ContinuousEventPriority 连续事件优先级。drag、scroll、mouseover等，事件的是连续触发的，快速响应可能会阻塞渲染，优先级较离散事件低</span>
        schedulerPriorityLevel <span class="token operator">=</span> UserBlockingSchedulerPriority
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token literal-property property">DefaultEventPriority</span><span class="token operator">:</span>
        <span class="token comment">// DefaultEventPriority 默认的事件优先级</span>
        schedulerPriorityLevel <span class="token operator">=</span> NormalSchedulerPriority
        <span class="token keyword">break</span>
      <span class="token keyword">case</span> <span class="token literal-property property">IdleEventPriority</span><span class="token operator">:</span>
        <span class="token comment">// IdleEventPriority 空闲的优先级</span>
        schedulerPriorityLevel <span class="token operator">=</span> IdleSchedulerPriority
        <span class="token keyword">break</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        schedulerPriorityLevel <span class="token operator">=</span> NormalSchedulerPriority
        <span class="token keyword">break</span>
    <span class="token punctuation">}</span>
    newCallbackNode <span class="token operator">=</span> <span class="token function">scheduleCallback</span><span class="token punctuation">(</span>
      schedulerPriorityLevel<span class="token punctuation">,</span>
      <span class="token function">performConcurrentWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  root<span class="token punctuation">.</span>callbackPriority <span class="token operator">=</span> newCallbackPriority
  root<span class="token punctuation">.</span>callbackNode <span class="token operator">=</span> newCallbackNode
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="react-lane-模型" tabindex="-1"><a class="header-anchor" href="#react-lane-模型" aria-hidden="true">#</a> React Lane 模型</h2><p><code>Lane</code> 模型使用 31 位二进制来表示优先级车道共 31 条, 位数越小（1 的位置越靠右）表示优先级越高。</p><details class="hint-container details"><summary>Lane 模型优先级</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> type Lanes <span class="token operator">=</span> number
<span class="token keyword">export</span> type Lane <span class="token operator">=</span> number
<span class="token keyword">export</span> type LaneMap<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span> <span class="token operator">=</span> Array<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span>

<span class="token comment">// Lane 使用 31 位二进制来表示优先级车道共 31 条, 位数越小（1的位置越靠右）表示优先级越高</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> TotalLanes <span class="token operator">=</span> <span class="token number">31</span>

<span class="token comment">// 没有优先级</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">NoLanes</span><span class="token operator">:</span> Lanes <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000000000000000</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">NoLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                          */</span> <span class="token number">0b0000000000000000000000000000000</span>

<span class="token comment">// 同步优先级，表示同步的任务一次只能执行一个，例如：用户的交互事件产生的更新任务</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">SyncLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000000000000001</span>

<span class="token comment">// 连续触发优先级，例如：滚动事件，拖动事件等</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">InputContinuousHydrationLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*    */</span> <span class="token number">0b0000000000000000000000000000010</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">InputContinuousLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*             */</span> <span class="token number">0b0000000000000000000000000000100</span>

<span class="token comment">// 默认优先级，例如使用 setTimeout，请求数据返回等造成的更新</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">DefaultHydrationLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*            */</span> <span class="token number">0b0000000000000000000000000001000</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">DefaultLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                     */</span> <span class="token number">0b0000000000000000000000000010000</span>

<span class="token comment">// 过度优先级，例如: Suspense、useTransition、useDeferredValue等拥有的优先级</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionHydrationLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                */</span> <span class="token number">0b0000000000000000000000000100000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLanes</span><span class="token operator">:</span> Lanes <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000001111111111111111000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane1</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000000001000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane2</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000000010000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane3</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000000100000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane4</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000001000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane5</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000010000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane6</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000000100000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane7</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000001000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane8</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000010000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane9</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0000000000000000100000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane10</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000000000001000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane11</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000000000010000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane12</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000000000100000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane13</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000000001000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane14</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000000010000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane15</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000000100000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">TransitionLane16</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b0000000001000000000000000000000</span>

<span class="token keyword">const</span> <span class="token literal-property property">RetryLanes</span><span class="token operator">:</span> Lanes <span class="token operator">=</span> <span class="token comment">/*                            */</span> <span class="token number">0b0000111110000000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">RetryLane1</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                             */</span> <span class="token number">0b0000000010000000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">RetryLane2</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                             */</span> <span class="token number">0b0000000100000000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">RetryLane3</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                             */</span> <span class="token number">0b0000001000000000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">RetryLane4</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                             */</span> <span class="token number">0b0000010000000000000000000000000</span>
<span class="token keyword">const</span> <span class="token literal-property property">RetryLane5</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                             */</span> <span class="token number">0b0000100000000000000000000000000</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">SomeRetryLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> RetryLane1

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">SelectiveHydrationLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*          */</span> <span class="token number">0b0001000000000000000000000000000</span>

<span class="token keyword">const</span> <span class="token literal-property property">NonIdleLanes</span><span class="token operator">:</span> Lanes <span class="token operator">=</span> <span class="token comment">/*                          */</span> <span class="token number">0b0001111111111111111111111111111</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">IdleHydrationLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*               */</span> <span class="token number">0b0010000000000000000000000000000</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">IdleLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                        */</span> <span class="token number">0b0100000000000000000000000000000</span>

<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token literal-property property">OffscreenLane</span><span class="token operator">:</span> Lane <span class="token operator">=</span> <span class="token comment">/*                   */</span> <span class="token number">0b1000000000000000000000000000000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 React 中，<code>render</code> 阶段可能被中断，在这个期间会产生一个更高优先级的任务，会再次更新 <code>Lane</code> 属性，多个更新就会合并，则需要 <code>Lane</code> 表现出多个更新优先级。通过位运算，可以让多个优先级的任务合并，也可以通过位运算分离出高优先级和低优先级的任务。</p><p>React 调用 <code>getHighestPriorityLanes(lanes)</code> 函数，通过 <code>getHighestPriorityLane(lanes)</code> 执行 <code>lanes &amp; -lanes</code> 分离出高优先级任务。</p><div class="hint-container note"><p class="hint-container-title">示例</p><p>例如：<code>SyncLane</code> 和 <code>InputContinuousLane</code> 优先级合并后，通过 <code>lane &amp; -lane</code> 分离的结果是 <code>SyncLane</code></p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>SyncLane <span class="token operator">=</span> <span class="token comment">/*                */</span><span class="token number">0b0000000000000000000000000000001</span>
InputContinuousLane <span class="token operator">=</span> <span class="token comment">/*     */</span><span class="token number">0b0000000000000000000000000000100</span>
lane <span class="token operator">=</span> SyncLane ｜ InputContinuousLane <span class="token comment">// SyncLane 和 InputContinuousLane 优先级合并</span>
lane <span class="token operator">=</span> <span class="token comment">/*                    */</span><span class="token number">0b0000000000000000000000000000101</span>
<span class="token operator">-</span>lane <span class="token operator">=</span> <span class="token comment">/*                   */</span><span class="token number">0b1111111111111111111111111111011</span>
lanes <span class="token operator">&amp;</span> <span class="token operator">-</span>lanes <span class="token comment">/*            */</span><span class="token number">0b0000000000000000000000000000001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><details class="hint-container details"><summary>getHighestPriorityLanes 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getHighestPriorityLane</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">lanes</span><span class="token operator">:</span> Lanes</span><span class="token punctuation">)</span><span class="token operator">:</span> Lane <span class="token punctuation">{</span>
  <span class="token keyword">return</span> lanes <span class="token operator">&amp;</span> <span class="token operator">-</span>lanes
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">getHighestPriorityLanes</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">lanes</span><span class="token operator">:</span> Lanes <span class="token operator">|</span> Lane</span><span class="token punctuation">)</span><span class="token operator">:</span> Lanes <span class="token punctuation">{</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span><span class="token function">getHighestPriorityLane</span><span class="token punctuation">(</span>lanes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">SyncLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> SyncLane
    <span class="token keyword">case</span> <span class="token literal-property property">InputContinuousHydrationLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> InputContinuousHydrationLane
    <span class="token keyword">case</span> <span class="token literal-property property">InputContinuousLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> InputContinuousLane
    <span class="token keyword">case</span> <span class="token literal-property property">DefaultHydrationLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> DefaultHydrationLane
    <span class="token keyword">case</span> <span class="token literal-property property">DefaultLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> DefaultLane
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionHydrationLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> TransitionHydrationLane
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane1</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane2</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane3</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane4</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane5</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane6</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane7</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane8</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane9</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane10</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane11</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane12</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane13</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane14</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane15</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">TransitionLane16</span><span class="token operator">:</span>
      <span class="token keyword">return</span> lanes <span class="token operator">&amp;</span> TransitionLanes
    <span class="token keyword">case</span> <span class="token literal-property property">RetryLane1</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">RetryLane2</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">RetryLane3</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">RetryLane4</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">RetryLane5</span><span class="token operator">:</span>
      <span class="token keyword">return</span> lanes <span class="token operator">&amp;</span> RetryLanes
    <span class="token keyword">case</span> <span class="token literal-property property">SelectiveHydrationLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> SelectiveHydrationLane
    <span class="token keyword">case</span> <span class="token literal-property property">IdleHydrationLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> IdleHydrationLane
    <span class="token keyword">case</span> <span class="token literal-property property">IdleLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> IdleLane
    <span class="token keyword">case</span> <span class="token literal-property property">OffscreenLane</span><span class="token operator">:</span>
      <span class="token keyword">return</span> OffscreenLane
    <span class="token keyword">default</span><span class="token operator">:</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>__DEV__<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>
          <span class="token string">&#39;Should have found matching lanes. This is a bug in React.&#39;</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token comment">// This shouldn&#39;t be reachable, but as a fallback, return the entire bitmask.</span>
      <span class="token keyword">return</span> lanes
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,61),l=[p];function c(i,r){return s(),a("div",null,l)}const k=n(o,[["render",c],["__file","Scheduler.html.vue"]]);export{k as default};
