import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const t="/blogs/assets/fiber_reconciler_render_beginWork.drawio-1WEo0PGr.png",o="/blogs/assets/fiber_reconciler_render_completeWork.drawio-AvHl9H9h.png",p={},c=e(`<h1 id="reconciler" tabindex="-1"><a class="header-anchor" href="#reconciler" aria-hidden="true">#</a> Reconciler</h1><p>在 React v16+ 中， Reconciler 与 Renderer 不再是交替工作。</p><ul><li>当 Scheduler 将任务交给 Reconciler 后，Reconciler 会为变化的虚拟 DOM 打上代表增/删/更新的标记。</li><li>整个 Scheduler 与 Reconciler 的工作都在内存中进行，只有当所有组件都完成 Reconciler 的工作，才会统一交给 Renderer。</li></ul><h2 id="reconciler-render-阶段" tabindex="-1"><a class="header-anchor" href="#reconciler-render-阶段" aria-hidden="true">#</a> Reconciler render 阶段</h2><p>Reconciler <code>render</code> 阶段开始于 <code>performSyncWorkOnRoot</code> 或 <code>performConcurrentWorkOnRoot</code> 函数的调用。</p><ul><li><code>performSyncWorkOnRoot</code> （<code>Legacy Sync</code> 模式）：执行同步渲染任务。</li><li><code>performConcurrentWorkOnRoot</code> （<code>Concurrent</code> 模式）：执行并发渲染任务。在函数中，会调用 <code>shouldYield</code> 函数判断是否需要中断遍历，使浏览器有时间渲染。如果当前浏览器帧没有剩余时间，则会终止循环，直到浏览器有空闲时间后再继续遍历。</li></ul><details class="hint-container details"><summary>performSyncWorkOnRoot 与 performConcurrentWorkOnRoot 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// react\\packages\\react-reconciler\\src\\ReactFiberWorkLoop.old.js</span>

<span class="token comment">// ensureRootIsScheduled 用于 rootFiber 的任务调度。一个 root 只有一个任务在执行，每次更新和任务退出前都会调用此函数。</span>
<span class="token comment">// 1. 计算新任务的过期时间、优先级</span>
<span class="token comment">// 2. 无新任务，退出调度</span>
<span class="token comment">// 3. 有历史任务：</span>
<span class="token comment">//    3.1 新旧任务的优先级相同，继续执行旧任务，（新任务会在旧任务执行完成之后的同步刷新钩子中执行）</span>
<span class="token comment">//    3.2 新旧任务的优先级不相同，取消旧任务</span>
<span class="token comment">// 4. 根据不同的 Priority （优先级） 执行不同的调度(scheduleSyncCallback(同步) 或 scheduleCallback（异步）), 最后将返回值设置到 fiberRoot.callbackNode</span>
<span class="token keyword">function</span> <span class="token function">ensureRootIsScheduled</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span> <span class="token literal-property property">currentTime</span><span class="token operator">:</span> number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ......</span>

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
    <span class="token comment">// ......</span>
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
<span class="token punctuation">}</span>

<span class="token comment">// 执行同步渲染任务</span>
<span class="token keyword">function</span> <span class="token function">performSyncWorkOnRoot</span><span class="token punctuation">(</span><span class="token parameter">root</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> exitStatus <span class="token operator">=</span> <span class="token function">renderRootSync</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span>

  <span class="token comment">// ... 省略部分代码</span>

  <span class="token function">commitRoot</span><span class="token punctuation">(</span>
    root<span class="token punctuation">,</span>
    workInProgressRootRecoverableErrors<span class="token punctuation">,</span>
    workInProgressTransitions
  <span class="token punctuation">)</span>

  <span class="token comment">// Before exiting, make sure there&#39;s a callback scheduled for the next</span>
  <span class="token comment">// pending level.</span>
  <span class="token comment">// 退出前再次检测, 是否还有其他更新, 是否需要发起新调度</span>
  <span class="token function">ensureRootIsScheduled</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行并发渲染任务</span>
<span class="token keyword">function</span> <span class="token function">performConcurrentWorkOnRoot</span><span class="token punctuation">(</span><span class="token parameter">root<span class="token punctuation">,</span> didTimeout</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> shouldTimeSlice <span class="token operator">=</span>
    <span class="token operator">!</span><span class="token function">includesBlockingLane</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token operator">!</span><span class="token function">includesExpiredLane</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
    <span class="token punctuation">(</span>disableSchedulerTimeoutInWorkLoop <span class="token operator">||</span> <span class="token operator">!</span>didTimeout<span class="token punctuation">)</span>

  <span class="token comment">// 退出状态</span>
  <span class="token comment">// 默认情况下，并发更新总是使用时间切片</span>
  <span class="token keyword">let</span> exitStatus <span class="token operator">=</span> shouldTimeSlice
    <span class="token operator">?</span> <span class="token function">renderRootConcurrent</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span> <span class="token comment">// 执行可中断更新</span>
    <span class="token operator">:</span> <span class="token function">renderRootSync</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span> <span class="token comment">// 循环调用 workLoopSync 进行同步更新</span>

  <span class="token comment">// ......</span>

  <span class="token comment">// 退出前再次检测, 是否还有其他更新, 是否需要发起新调度</span>
  <span class="token function">ensureRootIsScheduled</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> <span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

  <span class="token comment">// 下一个要渲染的任务，递归调用 performConcurrentWorkOnRoot自身 继续执行调度</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>root<span class="token punctuation">.</span>callbackNode <span class="token operator">===</span> originalCallbackNode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// The task node scheduled for this root is the same one that&#39;s</span>
    <span class="token comment">// currently executed. Need to return a continuation.</span>
    <span class="token comment">// 渲染被阻断, 返回一个新的 performConcurrentWorkOnRoot 函数, 等待下一次调用</span>
    <span class="token keyword">return</span> <span class="token function">performConcurrentWorkOnRoot</span><span class="token punctuation">.</span><span class="token function">bind</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> root<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行同步更新</span>
<span class="token keyword">function</span> <span class="token function">renderRootSync</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span> <span class="token literal-property property">lanes</span><span class="token operator">:</span> Lanes</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ......</span>

  <span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">workLoopSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>thrownValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">handleError</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> thrownValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

  <span class="token comment">// ......</span>
<span class="token punctuation">}</span>

<span class="token comment">// 执行可中断更新</span>
<span class="token keyword">function</span> <span class="token function">renderRootConcurrent</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span> <span class="token literal-property property">lanes</span><span class="token operator">:</span> Lanes</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ......</span>

  <span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">workLoopConcurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">break</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>thrownValue<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">handleError</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> thrownValue<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>

  <span class="token comment">// ......</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">workLoopSync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Already timed out, so perform work without checking if we need to yield.</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>workInProgress <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">workLoopConcurrent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// Perform work until Scheduler asks us to yield</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>workInProgress <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token function">shouldYield</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">unitOfWork</span><span class="token operator">:</span> Fiber</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// The current, flushed, state of this fiber is the alternate. Ideally</span>
  <span class="token comment">// nothing should rely on this, but relying on it here means that we don&#39;t</span>
  <span class="token comment">// need an additional field on the work in progress.</span>
  <span class="token keyword">const</span> current <span class="token operator">=</span> unitOfWork<span class="token punctuation">.</span>alternate
  <span class="token function">setCurrentDebugFiberInDEV</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">)</span>

  <span class="token keyword">let</span> next
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfilerTimer <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>unitOfWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode<span class="token punctuation">)</span> <span class="token operator">!==</span> NoMode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">startProfilerTimer</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">)</span>
    next <span class="token operator">=</span> <span class="token function">beginWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> unitOfWork<span class="token punctuation">,</span> subtreeRenderLanes<span class="token punctuation">)</span>
    <span class="token function">stopProfilerTimerIfRunningAndRecordDelta</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    next <span class="token operator">=</span> <span class="token function">beginWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> unitOfWork<span class="token punctuation">,</span> subtreeRenderLanes<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">resetCurrentDebugFiberInDEV</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  unitOfWork<span class="token punctuation">.</span>memoizedProps <span class="token operator">=</span> unitOfWork<span class="token punctuation">.</span>pendingProps
  <span class="token keyword">if</span> <span class="token punctuation">(</span>next <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// If this doesn&#39;t spawn new work, complete the current work.</span>
    <span class="token function">completeUnitOfWork</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    workInProgress <span class="token operator">=</span> next
  <span class="token punctuation">}</span>

  ReactCurrentOwner<span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 <code>performSyncWorkOnRoot</code> 或 <code>performConcurrentWorkOnRoot</code> 函数中，最终会调用 <code>performUnitOfWork(workInProgress)</code> 函数。</p><ul><li><code>workInProgress</code> 表示当前已创建的 <code>workInProgress fiber</code> 。</li><li><code>performUnitOfWork(workInProgress)</code> 函数会创建下一个 <code>Fiber 节点</code> 并赋值给 <code>workInProgress</code>，并将 <code>workInProgress</code> 与已创建的 <code>Fiber 节点</code> 连接起来构成 Fiber 树。</li></ul><p>Fiber Reconciler 通过遍历的方式实现可中断的递归，对于 <code>performUnitOfWork</code> 的工作可以分为两部分：“递”和“归”。“递”和“归”阶段会交错执行，直到“归”到 <code>rootFiber</code>，此时 Reconciler render 阶段完成。</p><ul><li><p>“递”阶段</p><p>从 <code>rootFiber</code> 开始向下深度优先遍历，为遍历到的每个 <code>Fiber 节点</code> 调用 <code>beginWork</code> 方法。该方法根据传入的 <code>Fiber 节点</code> 创建 <code>子 Fiber 节点</code>，并将两个 <code>Fiber 节点</code> 连接起来。</p></li><li><p>“归”阶段</p><p>当遍历到叶子节点（即：没有子组件的组件）时，会进入“归”阶段，会调用 <code>completeWork</code> 方法处理 <code>Fiber 节点</code>。</p><ul><li>当某个 <code>Fiber 节点</code> 执行完 <code>completeWork</code>，如果其存在 <code>兄弟 Fiber 节点</code>（即 : <code>fiber.sibling !== null</code>），会进入其 <code>兄弟 Fiber</code> 的“递”阶段。</li><li>如果不存在 <code>兄弟 Fiber</code>，会进入 <code>父级 Fiber</code> 的“归”阶段。</li></ul></li></ul><details class="hint-container details"><summary>performUnitOfWork 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">performUnitOfWork</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">unitOfWork</span><span class="token operator">:</span> Fiber</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// The current, flushed, state of this fiber is the alternate. Ideally</span>
  <span class="token comment">// nothing should rely on this, but relying on it here means that we don&#39;t</span>
  <span class="token comment">// need an additional field on the work in progress.</span>
  <span class="token keyword">const</span> current <span class="token operator">=</span> unitOfWork<span class="token punctuation">.</span>alternate
  <span class="token function">setCurrentDebugFiberInDEV</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">)</span>

  <span class="token keyword">let</span> next
  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableProfilerTimer <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>unitOfWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode<span class="token punctuation">)</span> <span class="token operator">!==</span> NoMode<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">startProfilerTimer</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">)</span>
    next <span class="token operator">=</span> <span class="token function">beginWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> unitOfWork<span class="token punctuation">,</span> subtreeRenderLanes<span class="token punctuation">)</span>
    <span class="token function">stopProfilerTimerIfRunningAndRecordDelta</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    next <span class="token operator">=</span> <span class="token function">beginWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> unitOfWork<span class="token punctuation">,</span> subtreeRenderLanes<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">resetCurrentDebugFiberInDEV</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  unitOfWork<span class="token punctuation">.</span>memoizedProps <span class="token operator">=</span> unitOfWork<span class="token punctuation">.</span>pendingProps
  <span class="token keyword">if</span> <span class="token punctuation">(</span>next <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// If this doesn&#39;t spawn new work, complete the current work.</span>
    <span class="token function">completeUnitOfWork</span><span class="token punctuation">(</span>unitOfWork<span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    workInProgress <span class="token operator">=</span> next
  <span class="token punctuation">}</span>

  ReactCurrentOwner<span class="token punctuation">.</span>current <span class="token operator">=</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">completeUnitOfWork</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">unitOfWork</span><span class="token operator">:</span> Fiber</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token comment">// Attempt to complete the current unit of work, then move to the next</span>
  <span class="token comment">// sibling. If there are no more siblings, return to the parent fiber.</span>
  <span class="token keyword">let</span> completedWork <span class="token operator">=</span> unitOfWork
  <span class="token keyword">do</span> <span class="token punctuation">{</span>
    <span class="token comment">// The current, flushed, state of this fiber is the alternate. Ideally</span>
    <span class="token comment">// nothing should rely on this, but relying on it here means that we don&#39;t</span>
    <span class="token comment">// need an additional field on the work in progress.</span>
    <span class="token keyword">const</span> current <span class="token operator">=</span> completedWork<span class="token punctuation">.</span>alternate
    <span class="token keyword">const</span> returnFiber <span class="token operator">=</span> completedWork<span class="token punctuation">.</span>return

    <span class="token comment">// Check if the work completed or if something threw.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>completedWork<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> Incomplete<span class="token punctuation">)</span> <span class="token operator">===</span> NoFlags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">setCurrentDebugFiberInDEV</span><span class="token punctuation">(</span>completedWork<span class="token punctuation">)</span>
      <span class="token keyword">let</span> next
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token operator">!</span>enableProfilerTimer <span class="token operator">||</span>
        <span class="token punctuation">(</span>completedWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode<span class="token punctuation">)</span> <span class="token operator">===</span> NoMode
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        next <span class="token operator">=</span> <span class="token function">completeWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> completedWork<span class="token punctuation">,</span> subtreeRenderLanes<span class="token punctuation">)</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">startProfilerTimer</span><span class="token punctuation">(</span>completedWork<span class="token punctuation">)</span>
        next <span class="token operator">=</span> <span class="token function">completeWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> completedWork<span class="token punctuation">,</span> subtreeRenderLanes<span class="token punctuation">)</span>
        <span class="token comment">// Update render duration assuming we didn&#39;t error.</span>
        <span class="token function">stopProfilerTimerIfRunningAndRecordDelta</span><span class="token punctuation">(</span>completedWork<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token function">resetCurrentDebugFiberInDEV</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>next <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Completing this fiber spawned new work. Work on that next.</span>
        workInProgress <span class="token operator">=</span> next
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// This fiber did not complete because something threw. Pop values off</span>
      <span class="token comment">// the stack without entering the complete phase. If this is a boundary,</span>
      <span class="token comment">// capture values if possible.</span>
      <span class="token keyword">const</span> next <span class="token operator">=</span> <span class="token function">unwindWork</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> completedWork<span class="token punctuation">,</span> subtreeRenderLanes<span class="token punctuation">)</span>

      <span class="token comment">// Because this fiber did not complete, don&#39;t reset its lanes.</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>next <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// If completing this work spawned new work, do that next. We&#39;ll come</span>
        <span class="token comment">// back here again.</span>
        <span class="token comment">// Since we&#39;re restarting, remove anything that is not a host effect</span>
        <span class="token comment">// from the effect tag.</span>
        next<span class="token punctuation">.</span>flags <span class="token operator">&amp;=</span> HostEffectMask
        workInProgress <span class="token operator">=</span> next
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        enableProfilerTimer <span class="token operator">&amp;&amp;</span>
        <span class="token punctuation">(</span>completedWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode<span class="token punctuation">)</span> <span class="token operator">!==</span> NoMode
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Record the render duration for the fiber that errored.</span>
        <span class="token function">stopProfilerTimerIfRunningAndRecordDelta</span><span class="token punctuation">(</span>completedWork<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>

        <span class="token comment">// Include the time spent working on failed children before continuing.</span>
        <span class="token keyword">let</span> actualDuration <span class="token operator">=</span> completedWork<span class="token punctuation">.</span>actualDuration
        <span class="token keyword">let</span> child <span class="token operator">=</span> completedWork<span class="token punctuation">.</span>child
        <span class="token keyword">while</span> <span class="token punctuation">(</span>child <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          actualDuration <span class="token operator">+=</span> child<span class="token punctuation">.</span>actualDuration
          child <span class="token operator">=</span> child<span class="token punctuation">.</span>sibling
        <span class="token punctuation">}</span>
        completedWork<span class="token punctuation">.</span>actualDuration <span class="token operator">=</span> actualDuration
      <span class="token punctuation">}</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>returnFiber <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// Mark the parent fiber as incomplete and clear its subtree flags.</span>
        returnFiber<span class="token punctuation">.</span>flags <span class="token operator">|=</span> Incomplete
        returnFiber<span class="token punctuation">.</span>subtreeFlags <span class="token operator">=</span> NoFlags
        returnFiber<span class="token punctuation">.</span>deletions <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// We&#39;ve unwound all the way to the root.</span>
        workInProgressRootExitStatus <span class="token operator">=</span> RootDidNotComplete
        workInProgress <span class="token operator">=</span> <span class="token keyword">null</span>
        <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> siblingFiber <span class="token operator">=</span> completedWork<span class="token punctuation">.</span>sibling
    <span class="token keyword">if</span> <span class="token punctuation">(</span>siblingFiber <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// If there is more work to do in this returnFiber, do that next.</span>
      workInProgress <span class="token operator">=</span> siblingFiber
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// Otherwise, return to the parent</span>
    completedWork <span class="token operator">=</span> returnFiber
    <span class="token comment">// Update the next thing we&#39;re working on in case something throws.</span>
    workInProgress <span class="token operator">=</span> completedWork
  <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>completedWork <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>

  <span class="token comment">// We&#39;ve reached the root.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>workInProgressRootExitStatus <span class="token operator">===</span> RootInProgress<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    workInProgressRootExitStatus <span class="token operator">=</span> RootCompleted
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="递-阶段-beginwork" tabindex="-1"><a class="header-anchor" href="#递-阶段-beginwork" aria-hidden="true">#</a> “递”阶段 - beginWork</h3><p><img src="`+t+`" alt="fiber_reconciler_render_beginWork"></p><details class="hint-container details"><summary>beginWork 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> <span class="token literal-property property">didReceiveUpdate</span><span class="token operator">:</span> boolean <span class="token operator">=</span> <span class="token boolean">false</span>

<span class="token keyword">function</span> <span class="token function">beginWork</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">current</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">workInProgress</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">renderLanes</span><span class="token operator">:</span> Lanes</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">/* 更新流程 */</span>

    <span class="token comment">// current 树上上一次渲染后的 props</span>
    <span class="token keyword">const</span> oldProps <span class="token operator">=</span> current<span class="token punctuation">.</span>memoizedProps
    <span class="token comment">// workInProgress 树上这一次更新的 props</span>
    <span class="token keyword">const</span> newProps <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>pendingProps

    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      oldProps <span class="token operator">!==</span> newProps <span class="token operator">||</span>
      <span class="token function">hasLegacyContextChanged</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span>
      <span class="token comment">// Force a re-render if the implementation changed due to hot reload:</span>
      <span class="token punctuation">(</span>__DEV__ <span class="token operator">?</span> workInProgress<span class="token punctuation">.</span>type <span class="token operator">!==</span> current<span class="token punctuation">.</span>type <span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// If props or context changed, mark the fiber as having performed work.</span>
      <span class="token comment">// This may be unset if the props are determined to be equal later (memo).</span>
      didReceiveUpdate <span class="token operator">=</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// Neither props nor legacy context changes. Check if there&#39;s a pending</span>
      <span class="token comment">// update or context change.</span>

      <span class="token comment">// props 和 context 没有发生变化，检查是否更新来自自身或者 context 改变</span>
      <span class="token keyword">const</span> hasScheduledUpdateOrContext <span class="token operator">=</span> <span class="token function">checkScheduledUpdateOrContext</span><span class="token punctuation">(</span>
        current<span class="token punctuation">,</span>
        renderLanes
      <span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        <span class="token operator">!</span>hasScheduledUpdateOrContext <span class="token operator">&amp;&amp;</span>
        <span class="token comment">// If this is the second pass of an error or suspense boundary, there</span>
        <span class="token comment">// may not be work scheduled on \`current\`, so we check for this flag.</span>
        <span class="token punctuation">(</span>workInProgress<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> DidCapture<span class="token punctuation">)</span> <span class="token operator">===</span> NoFlags
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// No pending updates or context. Bail out now.</span>
        didReceiveUpdate <span class="token operator">=</span> <span class="token boolean">false</span>

        <span class="token comment">// attemptEarlyBailoutIfNoScheduledUpdate 函数会处理部分 Context 逻辑</span>
        <span class="token comment">// 在函数内部，调用了 bailoutOnAlreadyFinishedWork</span>
        <span class="token keyword">return</span> <span class="token function">attemptEarlyBailoutIfNoScheduledUpdate</span><span class="token punctuation">(</span>
          current<span class="token punctuation">,</span>
          workInProgress<span class="token punctuation">,</span>
          renderLanes
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>current<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> ForceUpdateForLegacySuspense<span class="token punctuation">)</span> <span class="token operator">!==</span> NoFlags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// This is a special case that only exists for legacy mode.</span>
        <span class="token comment">// See https://github.com/facebook/react/pull/19216.</span>
        didReceiveUpdate <span class="token operator">=</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// An update was scheduled on this fiber, but there are no new props</span>
        <span class="token comment">// nor legacy context. Set this to false. If an update queue or context</span>
        <span class="token comment">// consumer produces a changed value, it will set this to true. Otherwise,</span>
        <span class="token comment">// the component will assume the children have not changed and bail out.</span>
        didReceiveUpdate <span class="token operator">=</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    didReceiveUpdate <span class="token operator">=</span> <span class="token boolean">false</span>

    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getIsHydrating</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isForkedChild</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Check if this child belongs to a list of muliple children in</span>
      <span class="token comment">// its parent.</span>
      <span class="token comment">//</span>
      <span class="token comment">// In a true multi-threaded implementation, we would render children on</span>
      <span class="token comment">// parallel threads. This would represent the beginning of a new render</span>
      <span class="token comment">// thread for this subtree.</span>
      <span class="token comment">//</span>
      <span class="token comment">// We only use this for id generation during hydration, which is why the</span>
      <span class="token comment">// logic is located in this special branch.</span>
      <span class="token keyword">const</span> slotIndex <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>index
      <span class="token keyword">const</span> numberOfForks <span class="token operator">=</span> <span class="token function">getForksAtLevel</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
      <span class="token function">pushTreeId</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">,</span> numberOfForks<span class="token punctuation">,</span> slotIndex<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// Before entering the begin phase, clear pending update priority.</span>
  <span class="token comment">// TODO: This assumes that we&#39;re about to evaluate the component and process</span>
  <span class="token comment">// the update queue. However, there&#39;s an exception: SimpleMemoComponent</span>
  <span class="token comment">// sometimes bails out later in the begin phase. This indicates that we should</span>
  <span class="token comment">// move this assignment out of the common path and into each branch.</span>
  workInProgress<span class="token punctuation">.</span>lanes <span class="token operator">=</span> NoLanes

  <span class="token keyword">switch</span> <span class="token punctuation">(</span>workInProgress<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">IndeterminateComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">LazyComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">FunctionComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ClassComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ... 省略部分 case 相关代码</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><code>beginWork(current, workInProgress, renderLanes)</code> 函数的作用是传入当前 <code>Fiber 节点</code>，创建 <code>子 Fiber 节点</code> 。在该函数中：</p><ul><li><p><code>update</code>（即： <code>current !== null</code>） 时</p><p>如果 <code>current</code> 存在（即 <code>current !== null</code>），在满足一定条件时可以复用 <code>current</code> 节点，就能克隆 <code>current.child</code> 作为 <code>workInProgress.child</code>，而不需要新建 <code>workInProgress.child</code> 。</p><p>满足如下情况时，<code>didReceiveUpdate === false</code>，即可以直接复用前一次更新的 <code>子 Fiber</code>，不需要新建 <code>子 Fiber</code></p><ul><li><code>oldProps === newProps &amp;&amp; workInProgress.type === current.type</code> ，即 <code>props</code> 与 <code>fiber.type</code> 不变</li><li><code>!includesSomeLane(renderLanes, updateLanes)</code>，即当前 <code>Fiber 节点</code> 优先级不够</li></ul><p>注：<code>didReceiveUpdate</code> 标识当前更新是否来源于父级的更新，自身并没有更新。比如：更新父组件，其子组件也会跟着更新，这个情况下 <code>didReceiveUpdate = true</code>。</p></li><li><p><code>mount</code>（即： <code>current == null</code>） 时</p><p>组件 <code>mount</code> 时，除 <code>fiberRoot</code> 以外，满足如下情况，会根据 <code>fiber.tag</code> 不同，创建不同类型的子 <code>Fiber 节点</code> 。</p><ul><li>首次渲染，不存在当前组件对应 <code>Fiber 节点</code> 在上一次更新时的 <code>Fiber 节点</code>（即 <code>current === null</code>）</li><li>当不满足优化路径时</li></ul></li><li><p><code>reconcileChildren(current, workInProgress, nextChildren, renderLanes)</code></p><p>对于常见的组件类型，如（<code>FunctionComponent</code> / <code>ClassComponent</code> / <code>HostComponent</code>），创建新的 <code>子 Fiber 节点</code>，会进入 <code>reconcileChildren</code> 方法。</p><p>该方法会生成新的 <code>子 Fiber 节点</code> 并赋值给 <code>workInProgress.child</code>，作为本次 <code>beginWork</code> 返回值，并作为下次 <code>performUnitOfWork</code> 执行时 <code>workInProgress</code> 的传参。</p><ul><li>对于 <code>mount</code> 的组件，创建新的 <code>子 Fiber 节点</code></li><li>对于 <code>update</code> 的组件，将当前组件与该组件在上次更新时对应的 <code>Fiber 节点</code> 比较（即 Diff 算法），将比较的结果生成新 <code>Fiber 节点</code></li></ul><details class="hint-container details"><summary>reconcileChildren 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">reconcileChildren</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">current</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">workInProgress</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">nextChildren</span><span class="token operator">:</span> any<span class="token punctuation">,</span>
  <span class="token literal-property property">renderLanes</span><span class="token operator">:</span> Lanes</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// If this is a fresh new component that hasn&#39;t been rendered yet, we</span>
    <span class="token comment">// won&#39;t update its child set by applying minimal side-effects. Instead,</span>
    <span class="token comment">// we will add them all to the child before it gets rendered. That means</span>
    <span class="token comment">// we can optimize this reconciliation pass by not tracking side-effects.</span>
    workInProgress<span class="token punctuation">.</span>child <span class="token operator">=</span> <span class="token function">mountChildFibers</span><span class="token punctuation">(</span>
      workInProgress<span class="token punctuation">,</span>
      <span class="token keyword">null</span><span class="token punctuation">,</span>
      nextChildren<span class="token punctuation">,</span>
      renderLanes
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token comment">// If the current child is the same as the work in progress, it means that</span>
    <span class="token comment">// we haven&#39;t yet started any work on these children. Therefore, we use</span>
    <span class="token comment">// the clone algorithm to create a copy of all the current children.</span>

    <span class="token comment">// If we had any progressed work already, that is invalid at this point so</span>
    <span class="token comment">// let&#39;s throw it out.</span>
    workInProgress<span class="token punctuation">.</span>child <span class="token operator">=</span> <span class="token function">reconcileChildFibers</span><span class="token punctuation">(</span>
      workInProgress<span class="token punctuation">,</span>
      current<span class="token punctuation">.</span>child<span class="token punctuation">,</span>
      nextChildren<span class="token punctuation">,</span>
      renderLanes
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li><li><p><code>EffectTag</code></p><p><code>render</code> 阶段是在内存中进行，结束后会通知 <code>Renderer</code> 执行 DOM 操作，执行 DOM 操作的具体类型保存在 <code>fiber.effectTag</code> 中。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 通过二进制表示 effectTag，可以方便的使用位操作为 fiber.effectTag 赋值多个 effect</span>

<span class="token comment">// DOM 需要插入到页面中</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> Placement <span class="token operator">=</span> <span class="token comment">/*                    */</span> <span class="token number">0b00000000000000000000000010</span>
<span class="token comment">// DOM 需要更新</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> Update <span class="token operator">=</span> <span class="token comment">/*                       */</span> <span class="token number">0b00000000000000000000000100</span>
<span class="token comment">// DOM 需要删除</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> Deletion <span class="token operator">=</span> <span class="token comment">/*                     */</span> <span class="token number">0b00000000000000000000001000</span>
<span class="token comment">// ......</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要通知 <code>Renderer</code> 将 <code>Fiber 节点</code> 对应的 DOM 节点插入页面中，需要满足两个条件：</p><ul><li><code>fiber.stateNode</code> 存在，即 <code>Fiber 节点</code> 中保存了对应的 DOM 节点。</li><li><code>(fiber.effectTag &amp; Placement) !== 0</code>，即 <code>Fiber 节点</code> 存在 <code>Placement effectTag</code> 。</li></ul><p><code>mount</code> 时，<code>fiber.stateNode === null</code>，且在 <code>reconcileChildren</code> 中调用的 <code>mountChildFibers</code> 不会为 <code>Fiber 节点</code> 赋值 <code>effectTag</code>。在首屏渲染中：</p><ul><li><code>fiber.stateNode</code> 会在 <code>completeWork</code> 中创建。</li><li>假设 <code>mountChildFibers</code> 也会赋值 <code>effectTag</code>，可以预见 <code>mount</code> 时整棵 <code>Fiber</code> 树所有节点都会有 <code>Placement effectTag</code>。在 <code>mount</code> 时，只有 <code>rootFiber</code> 会赋值 <code>Placement effectTag</code>，在 <code>commit</code> 阶段只会执行一次插入操作。</li></ul></li></ul><h3 id="归-阶段-completework" tabindex="-1"><a class="header-anchor" href="#归-阶段-completework" aria-hidden="true">#</a> “归”阶段 - completeWork</h3><p><img src="`+o+`" alt="fiber_reconciler_render_completeWork"></p><p><code>completeWork(current, workInProgress, renderLanes)</code> 针对不同 <code>fiber.tag</code> 的 <code>Fiber 节点</code> 执行对应操作。主要分析页面渲染所必须的 <code>HostComponent</code>（即，原生 DOM 组件对应的 Fiber 节点）</p><details class="hint-container details"><summary>completeWork 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">completeWork</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">current</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">workInProgress</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">renderLanes</span><span class="token operator">:</span> Lanes</span>
<span class="token punctuation">)</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> newProps <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>pendingProps
  <span class="token comment">// Note: This intentionally doesn&#39;t check if we&#39;re hydrating because comparing</span>
  <span class="token comment">// to the current tree provider fiber is just as fast and less error-prone.</span>
  <span class="token comment">// Ideally we would have a special version of the work loop only</span>
  <span class="token comment">// for hydration.</span>
  <span class="token function">popTreeContext</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>workInProgress<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">IndeterminateComponent</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">LazyComponent</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">SimpleMemoComponent</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">FunctionComponent</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ForwardRef</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">Fragment</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">Mode</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">Profiler</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ContextConsumer</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">MemoComponent</span><span class="token operator">:</span>
      <span class="token function">bubbleProperties</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ClassComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">HostRoot</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
      <span class="token function">updateHostContainer</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> workInProgress<span class="token punctuation">)</span>
      <span class="token comment">// ... 省略部分代码</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">HostComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">popHostContext</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
      <span class="token keyword">const</span> rootContainerInstance <span class="token operator">=</span> <span class="token function">getRootHostContainer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token keyword">const</span> type <span class="token operator">=</span> workInProgress<span class="token punctuation">.</span>type
      <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> workInProgress<span class="token punctuation">.</span>stateNode <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">updateHostComponent</span><span class="token punctuation">(</span>
          current<span class="token punctuation">,</span>
          workInProgress<span class="token punctuation">,</span>
          type<span class="token punctuation">,</span>
          newProps<span class="token punctuation">,</span>
          rootContainerInstance
        <span class="token punctuation">)</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>current<span class="token punctuation">.</span>ref <span class="token operator">!==</span> workInProgress<span class="token punctuation">.</span>ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">markRef</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>newProps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>workInProgress<span class="token punctuation">.</span>stateNode <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
              <span class="token string">&#39;We must have new props for new mounts. This error is likely &#39;</span> <span class="token operator">+</span>
                <span class="token string">&#39;caused by a bug in React. Please file an issue.&#39;</span>
            <span class="token punctuation">)</span>
          <span class="token punctuation">}</span>

          <span class="token comment">// This can happen when we abort work.</span>
          <span class="token function">bubbleProperties</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
          <span class="token keyword">return</span> <span class="token keyword">null</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">const</span> currentHostContext <span class="token operator">=</span> <span class="token function">getHostContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// TODO: Move createInstance to beginWork and keep it on a context</span>
        <span class="token comment">// &quot;stack&quot; as the parent. Then append children as we go in beginWork</span>
        <span class="token comment">// or completeWork depending on whether we want to add them top-&gt;down or</span>
        <span class="token comment">// bottom-&gt;up. Top-&gt;down is faster in IE11.</span>
        <span class="token keyword">const</span> wasHydrated <span class="token operator">=</span> <span class="token function">popHydrationState</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>wasHydrated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// TODO: Move this and createInstance step into the beginPhase</span>
          <span class="token comment">// to consolidate.</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>
            <span class="token function">prepareToHydrateHostInstance</span><span class="token punctuation">(</span>
              workInProgress<span class="token punctuation">,</span>
              rootContainerInstance<span class="token punctuation">,</span>
              currentHostContext
            <span class="token punctuation">)</span>
          <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// If changes to the hydrated node need to be applied at the</span>
            <span class="token comment">// commit-phase we mark this as such.</span>
            <span class="token function">markUpdate</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> instance <span class="token operator">=</span> <span class="token function">createInstance</span><span class="token punctuation">(</span>
            type<span class="token punctuation">,</span>
            newProps<span class="token punctuation">,</span>
            rootContainerInstance<span class="token punctuation">,</span>
            currentHostContext<span class="token punctuation">,</span>
            workInProgress
          <span class="token punctuation">)</span>

          <span class="token function">appendAllChildren</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> workInProgress<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>

          workInProgress<span class="token punctuation">.</span>stateNode <span class="token operator">=</span> instance

          <span class="token comment">// Certain renderers require commit-time effects for initial mount.</span>
          <span class="token comment">// (eg DOM renderer supports auto-focus for certain elements).</span>
          <span class="token comment">// Make sure such renderers get scheduled for later work.</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>
            <span class="token function">finalizeInitialChildren</span><span class="token punctuation">(</span>
              instance<span class="token punctuation">,</span>
              type<span class="token punctuation">,</span>
              newProps<span class="token punctuation">,</span>
              rootContainerInstance<span class="token punctuation">,</span>
              currentHostContext
            <span class="token punctuation">)</span>
          <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">markUpdate</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>workInProgress<span class="token punctuation">.</span>ref <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// If there is a ref on a host node we need to schedule a callback</span>
          <span class="token function">markRef</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token function">bubbleProperties</span><span class="token punctuation">(</span>workInProgress<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">HostText</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
      <span class="token keyword">return</span> <span class="token keyword">null</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ... 省略部分 case 代码</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><ul><li><p><code>update</code> 时</p><p><code>update</code> 时（即 <code>current !== null &amp;&amp; workInProgress.stateNode != null</code>），<code>Fiber 节点</code> 已经存在对应 DOM 节点，所以不需要生成 DOM 节点，要做的主要是处理 <code>props</code> 。</p><ul><li><code>onClick</code>、<code>onChange</code> 等回调函数的注册</li><li>处理 <code>style prop</code></li><li>处理 <code>DANGEROUSLY_SET_INNER_HTML prop</code></li><li>处理 <code>children prop</code></li><li>......</li></ul><p>主要的逻辑是调用 <code>updateHostComponent</code> 方法。在该方法中，被处理完的 <code>props</code> 会被赋值给 <code>workInProgress.updateQueue</code>，并最终会在 <code>commit</code> 阶段被渲染在页面上。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>workInProgress<span class="token punctuation">.</span>updateQueue <span class="token operator">=</span> <span class="token punctuation">(</span>updatePayload<span class="token operator">:</span> any<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code>updatePayload</code> 为数组形式，他的偶数索引的值为变化的 <code>prop key</code>，奇数索引的值为变化的 <code>prop value</code>。</p></li><li><p><code>mount</code> 时</p><p><code>mount</code> 时的主要逻辑包括：</p><ul><li>为 <code>Fiber 节点</code> 生成对应的 DOM 节点。通过调用 <code>createInstance</code> 方法为 <code>Fiber 节点</code> 创建 DOM 节点，创建好的 DOM 节点会赋值给 <code>fiber.stateNode</code> 。</li><li>将子孙 DOM 节点插入刚生成的 DOM 节点中。<code>completeWork</code> 属于“归”阶段调用的函数，每次调用 <code>appendAllChildren</code> 方法时，都会将已生成的子孙 DOM 节点插入当前生成的 DOM 节点下。当“归”到 rootFiber 时，已经有一个构建好的离屏 DOM 树。</li><li>与 update 逻辑中的 <code>updateHostComponent</code> 类似的处理 props 的过程。通过调用 <code>finalizeInitialChildren</code> 方法，初始化 DOM 对象的事件监听器和内部属性。</li></ul></li><li><p><code>EffectList</code></p><p><code>EffectList</code> 作为 DOM 操作的依据，<code>commit</code> 阶段需要找到所有有 <code>EffectTag</code> 的 <code>Fiber 节点</code> 并依次执行 <code>EffectTag</code> 对应操作。</p><p>在 <code>completeWork</code> 的上层函数 <code>completeUnitOfWork</code> 中，每个执行完 <code>completeWork</code> 且存在 <code>EffectTag</code> 的 <code>Fiber 节点</code> 会被保存在 <code>EffectList</code> 的单向链表中。<code>EffectList</code> 中第一个 <code>Fiber 节点</code> 保存在 <code>fiber.firstEffect</code>，最后一个元素保存在 <code>fiber.lastEffect</code>。</p><p>在“归”阶段，所有有 <code>EffectTag</code> 的 <code>Fiber 节点</code> 都会被追加在 <code>EffectList</code> 中，最终形成一条以 <code>rootFiber.firstEffect</code> 为起点的单向链表。在 <code>commit</code> 阶段只需要遍历 <code>EffectList</code> 就能执行所有 <code>effect</code> 了。</p></li><li><p><code>commitRoot(root)</code></p><p>在 <code>performSyncWorkOnRoot</code> 函数中 <code>fiberRoot</code> 被传递给 <code>commitRoot</code> 方法，开启 <code>commit</code> 阶段工作流程。</p><details class="hint-container details"><summary>commitRoot 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">commitRoot</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span>
  <span class="token literal-property property">recoverableErrors</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> Array<span class="token operator">&lt;</span>CapturedValue<span class="token operator">&lt;</span>mixed<span class="token operator">&gt;&gt;</span><span class="token punctuation">,</span>
  <span class="token literal-property property">transitions</span><span class="token operator">:</span> Array<span class="token operator">&lt;</span>Transition<span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span></span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// TODO: This no longer makes any sense. We already wrap the mutation and</span>
  <span class="token comment">// layout phases. Should be able to remove.</span>
  <span class="token keyword">const</span> previousUpdateLanePriority <span class="token operator">=</span> <span class="token function">getCurrentUpdatePriority</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token keyword">const</span> prevTransition <span class="token operator">=</span> ReactCurrentBatchConfig<span class="token punctuation">.</span>transition

  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    ReactCurrentBatchConfig<span class="token punctuation">.</span>transition <span class="token operator">=</span> <span class="token keyword">null</span>
    <span class="token function">setCurrentUpdatePriority</span><span class="token punctuation">(</span>DiscreteEventPriority<span class="token punctuation">)</span>
    <span class="token function">commitRootImpl</span><span class="token punctuation">(</span>
      root<span class="token punctuation">,</span>
      recoverableErrors<span class="token punctuation">,</span>
      transitions<span class="token punctuation">,</span>
      previousUpdateLanePriority
    <span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
    ReactCurrentBatchConfig<span class="token punctuation">.</span>transition <span class="token operator">=</span> prevTransition
    <span class="token function">setCurrentUpdatePriority</span><span class="token punctuation">(</span>previousUpdateLanePriority<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token keyword">null</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul><h2 id="reconciler-commit-阶段" tabindex="-1"><a class="header-anchor" href="#reconciler-commit-阶段" aria-hidden="true">#</a> Reconciler commit 阶段</h2><p><code>performSyncWorkOnRoot</code> 函数中调用 <code>commitRoot(root)</code> 是 <code>commit</code> 阶段的起点，<code>fiberRoot</code> 会作为入参。</p><p>Reconciler commit 阶段（即 <code>Renderer</code> 的工作流程）主要分为三部分：</p><ul><li><code>before mutation</code> 阶段（执行 DOM 操作前）</li><li><code>mutation</code> 阶段（执行 DOM 操作）</li><li><code>layout</code> 阶段（执行 DOM 操作后）</li></ul><p>在 <code>before mutation</code> 阶段之前和 <code>layout</code> 阶段之后还有一些额外工作，比如 <code>useEffect</code> 的触发、优先级相关的重置、<code>ref</code> 的绑定/解绑。</p><p>在 <code>render</code> 阶段，会遍历 <code>Fiber</code> 树，收集需要更新的地方，打不同的标志，标志会在 <code>commit</code> 阶段执行。</p><ul><li>更新相关 <ul><li>Update ：组件更新标志</li><li>Ref ：处理绑定元素和组件实例</li></ul></li><li>元素相关 <ul><li>Placement ：插入元素</li><li>Update ：更新元素</li><li>ChildDeletion ：删除元素</li><li>Snapshot ：元素快照</li><li>Visibility-offscreen ：新特性</li><li>ContentReset ：文本内容更新</li></ul></li><li>更新回调，执行 effect： <ul><li>Callback-root 回调函数</li><li>类组件回调</li><li>Passive-useEffect 的钩子函数</li><li>Layout-useLayoutEffect 的钩子函数</li><li>Insertion-useInsertionEffect 的钩子函数</li></ul></li></ul><h3 id="before-mutation" tabindex="-1"><a class="header-anchor" href="#before-mutation" aria-hidden="true">#</a> before mutation</h3><p><code>before mutation</code> 阶段，遍历 <code>EffectList</code> 并调用 <code>commitBeforeMutationEffects</code> 函数处理。</p><p>主要调用函数调用链路：<code>commitRoot</code> 函数 --&gt; <code>commitRootImpl</code> 函数 --&gt; <code>commitBeforeMutationEffects</code> 函数 --&gt; <code>commitBeforeMutationEffects_begin</code> 函数 --&gt; <code>commitBeforeMutationEffects_complete</code> 函数 --&gt; <code>commitBeforeMutationEffectsOnFiber</code> 函数</p><ul><li><p>处理 DOM 节点渲染/删除后的 <code>autoFocus</code>、<code>blur</code> 逻辑。</p></li><li><p>调用 <code>getSnapshotBeforeUpdate</code> 生命周期钩子。</p><p><code>commitBeforeMutationEffectsOnFiber</code> 函数，主要用与处理 <code>Snapshot</code>，获取 DOM 更新前的快照信息，对于 <code>ClassComponent</code> 会调用实例的 <code>getSnapShotBeforeUpdate</code> 函数。</p><p>从 React v16 开始，<code>componentWillXXX</code> 钩子函数前增加了 <code>UNSAFE_</code> 前缀，是因为 Stack Reconciler 重构为 Fiber Reconciler 后，<code>render</code> 阶段的任务可能中断/重新开始，对应的组件在 <code>render</code> 阶段的生命周期钩子（即 <code>componentWillXXX</code>）可能触发多次。为此，React 提供了替代的生命周期钩子 <code>getSnapshotBeforeUpdate</code>。</p><p><code>getSnapshotBeforeUpdate</code> 是在 <code>commit</code> 阶段内的 <code>before mutation</code> 阶段调用的，由于 <code>commit</code> 阶段是同步的，所以不会遇到多次调用的问题。</p></li><li><p>调度 useEffect</p><p>在 <code>flushPassiveEffects</code> 方法内部会从全局变量 <code>rootWithPendingPassiveEffects</code> 获取 <code>EffectList</code>。</p><p><code>EffectList</code> 中保存了需要执行副作用的 <code>Fiber 节点</code>。其中副作用包括：插入 DOM 节点（Placement）、更新 DOM 节点（Update）、删除 DOM 节点（Deletion）。除此外，当一个 <code>FunctionComponent</code> 含有 <code>useEffect</code> 或 <code>useLayoutEffect</code>，对应的 <code>Fiber 节点</code> 也会被赋值 <code>effectTag</code>。</p><p>整个<code>useEffect</code>异步调用分为三步：</p><ul><li><code>before mutation</code> 阶段之前，在 <code>scheduleCallback</code> 中调度 <code>flushPassiveEffects</code> 注册回调函数</li><li><code>layout</code> 阶段之后，将 <code>EffectList</code> 赋值给 <code>rootWithPendingPassiveEffects</code> 全局变量，回调函数执行的时候才有值</li><li><code>scheduleCallback</code> 触发 <code>flushPassiveEffects</code>，<code>flushPassiveEffects</code> 内部遍历 <code>rootWithPendingPassiveEffects</code></li></ul><p>与 <code>componentDidMount</code>、<code>componentDidUpdate</code> 不同的是，在浏览器完成布局与绘制之后，传给 <code>useEffect</code> 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。可见，<code>useEffect</code> 异步执行的原因主要是防止同步执行时阻塞浏览器渲染。</p><details class="hint-container details"><summary>flushPassiveEffects 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">flushPassiveEffects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> boolean <span class="token punctuation">{</span>
  <span class="token comment">// Returns whether passive effects were flushed.</span>
  <span class="token comment">// TODO: Combine this check with the one in flushPassiveEFfectsImpl. We should</span>
  <span class="token comment">// probably just combine the two functions. I believe they were only separate</span>
  <span class="token comment">// in the first place because we used to wrap it with</span>
  <span class="token comment">// \`Scheduler.runWithPriority\`, which accepts a function. But now we track the</span>
  <span class="token comment">// priority within React itself, so we can mutate the variable directly.</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>rootWithPendingPassiveEffects <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Cache the root since rootWithPendingPassiveEffects is cleared in</span>
    <span class="token comment">// flushPassiveEffectsImpl</span>
    <span class="token keyword">const</span> root <span class="token operator">=</span> rootWithPendingPassiveEffects
    <span class="token comment">// Cache and clear the remaining lanes flag; it must be reset since this</span>
    <span class="token comment">// method can be called from various places, not always from commitRoot</span>
    <span class="token comment">// where the remaining lanes are known</span>
    <span class="token keyword">const</span> remainingLanes <span class="token operator">=</span> pendingPassiveEffectsRemainingLanes
    pendingPassiveEffectsRemainingLanes <span class="token operator">=</span> NoLanes

    <span class="token keyword">const</span> renderPriority <span class="token operator">=</span> <span class="token function">lanesToEventPriority</span><span class="token punctuation">(</span>pendingPassiveEffectsLanes<span class="token punctuation">)</span>
    <span class="token keyword">const</span> priority <span class="token operator">=</span> <span class="token function">lowerEventPriority</span><span class="token punctuation">(</span>DefaultEventPriority<span class="token punctuation">,</span> renderPriority<span class="token punctuation">)</span>
    <span class="token keyword">const</span> prevTransition <span class="token operator">=</span> ReactCurrentBatchConfig<span class="token punctuation">.</span>transition
    <span class="token keyword">const</span> previousPriority <span class="token operator">=</span> <span class="token function">getCurrentUpdatePriority</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      ReactCurrentBatchConfig<span class="token punctuation">.</span>transition <span class="token operator">=</span> <span class="token keyword">null</span>
      <span class="token function">setCurrentUpdatePriority</span><span class="token punctuation">(</span>priority<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token function">flushPassiveEffectsImpl</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
      <span class="token function">setCurrentUpdatePriority</span><span class="token punctuation">(</span>previousPriority<span class="token punctuation">)</span>
      ReactCurrentBatchConfig<span class="token punctuation">.</span>transition <span class="token operator">=</span> prevTransition

      <span class="token comment">// Once passive effects have run for the tree - giving components a</span>
      <span class="token comment">// chance to retain cache instances they use - release the pooled</span>
      <span class="token comment">// cache at the root (if there is one)</span>
      <span class="token function">releaseRootPooledCache</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> remainingLanes<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul><details class="hint-container details"><summary>commitBeforeMutationEffects 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">commitBeforeMutationEffects</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span>
  <span class="token literal-property property">firstChild</span><span class="token operator">:</span> Fiber</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  focusedInstanceHandle <span class="token operator">=</span> <span class="token function">prepareForCommit</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>containerInfo<span class="token punctuation">)</span>

  nextEffect <span class="token operator">=</span> firstChild
  <span class="token function">commitBeforeMutationEffects_begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

  <span class="token comment">// We no longer need to track the active instance fiber</span>
  <span class="token keyword">const</span> shouldFire <span class="token operator">=</span> shouldFireAfterActiveInstanceBlur
  shouldFireAfterActiveInstanceBlur <span class="token operator">=</span> <span class="token boolean">false</span>
  focusedInstanceHandle <span class="token operator">=</span> <span class="token keyword">null</span>

  <span class="token keyword">return</span> shouldFire
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">commitBeforeMutationEffects_begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>nextEffect <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> fiber <span class="token operator">=</span> nextEffect

    <span class="token comment">// This phase is only used for beforeActiveInstanceBlur.</span>
    <span class="token comment">// Let&#39;s skip the whole loop if it&#39;s off.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enableCreateEventHandleAPI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// TODO: Should wrap this in flags check, too, as optimization</span>
      <span class="token keyword">const</span> deletions <span class="token operator">=</span> fiber<span class="token punctuation">.</span>deletions
      <span class="token keyword">if</span> <span class="token punctuation">(</span>deletions <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> deletions<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> deletion <span class="token operator">=</span> deletions<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
          <span class="token function">commitBeforeMutationEffectsDeletion</span><span class="token punctuation">(</span>deletion<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">const</span> child <span class="token operator">=</span> fiber<span class="token punctuation">.</span>child
    <span class="token keyword">if</span> <span class="token punctuation">(</span>
      <span class="token punctuation">(</span>fiber<span class="token punctuation">.</span>subtreeFlags <span class="token operator">&amp;</span> BeforeMutationMask<span class="token punctuation">)</span> <span class="token operator">!==</span> NoFlags <span class="token operator">&amp;&amp;</span>
      child <span class="token operator">!==</span> <span class="token keyword">null</span>
    <span class="token punctuation">)</span> <span class="token punctuation">{</span>
      child<span class="token punctuation">.</span>return <span class="token operator">=</span> fiber
      nextEffect <span class="token operator">=</span> child
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">commitBeforeMutationEffects_complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">commitBeforeMutationEffects_complete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">while</span> <span class="token punctuation">(</span>nextEffect <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> fiber <span class="token operator">=</span> nextEffect
    <span class="token function">setCurrentDebugFiberInDEV</span><span class="token punctuation">(</span>fiber<span class="token punctuation">)</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token function">commitBeforeMutationEffectsOnFiber</span><span class="token punctuation">(</span>fiber<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">captureCommitPhaseError</span><span class="token punctuation">(</span>fiber<span class="token punctuation">,</span> fiber<span class="token punctuation">.</span>return<span class="token punctuation">,</span> error<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token function">resetCurrentDebugFiberInDEV</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">const</span> sibling <span class="token operator">=</span> fiber<span class="token punctuation">.</span>sibling
    <span class="token keyword">if</span> <span class="token punctuation">(</span>sibling <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      sibling<span class="token punctuation">.</span>return <span class="token operator">=</span> fiber<span class="token punctuation">.</span>return
      nextEffect <span class="token operator">=</span> sibling
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>

    nextEffect <span class="token operator">=</span> fiber<span class="token punctuation">.</span>return
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">commitBeforeMutationEffectsOnFiber</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">finishedWork</span><span class="token operator">:</span> Fiber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> current <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>alternate
  <span class="token keyword">const</span> flags <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>flags

  <span class="token keyword">if</span> <span class="token punctuation">(</span>enableCreateEventHandleAPI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>shouldFireAfterActiveInstanceBlur <span class="token operator">&amp;&amp;</span> focusedInstanceHandle <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// Check to see if the focused element was inside of a hidden (Suspense) subtree.</span>
      <span class="token comment">// TODO: Move this out of the hot path using a dedicated effect tag.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        finishedWork<span class="token punctuation">.</span>tag <span class="token operator">===</span> SuspenseComponent <span class="token operator">&amp;&amp;</span>
        <span class="token function">isSuspenseBoundaryBeingHidden</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> finishedWork<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span>
        <span class="token function">doesFiberContain</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">,</span> focusedInstanceHandle<span class="token punctuation">)</span>
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        shouldFireAfterActiveInstanceBlur <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token function">beforeActiveInstanceBlur</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>flags <span class="token operator">&amp;</span> Snapshot<span class="token punctuation">)</span> <span class="token operator">!==</span> NoFlags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setCurrentDebugFiberInDEV</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>

    <span class="token keyword">switch</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token literal-property property">FunctionComponent</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token literal-property property">ForwardRef</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token literal-property property">SimpleMemoComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">case</span> <span class="token literal-property property">ClassComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> prevProps <span class="token operator">=</span> current<span class="token punctuation">.</span>memoizedProps
          <span class="token keyword">const</span> prevState <span class="token operator">=</span> current<span class="token punctuation">.</span>memoizedState
          <span class="token keyword">const</span> instance <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>stateNode
          <span class="token comment">// We could update instance props and state here,</span>
          <span class="token comment">// but instead we rely on them being set during last render.</span>
          <span class="token comment">// TODO: revisit this when we implement resuming.</span>
          <span class="token keyword">const</span> snapshot <span class="token operator">=</span> instance<span class="token punctuation">.</span><span class="token function">getSnapshotBeforeUpdate</span><span class="token punctuation">(</span>
            finishedWork<span class="token punctuation">.</span>elementType <span class="token operator">===</span> finishedWork<span class="token punctuation">.</span>type
              <span class="token operator">?</span> prevProps
              <span class="token operator">:</span> <span class="token function">resolveDefaultProps</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>type<span class="token punctuation">,</span> prevProps<span class="token punctuation">)</span><span class="token punctuation">,</span>
            prevState
          <span class="token punctuation">)</span>
          instance<span class="token punctuation">.</span>__reactInternalSnapshotBeforeUpdate <span class="token operator">=</span> snapshot
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">case</span> <span class="token literal-property property">HostRoot</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>supportsMutation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> root <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>stateNode
          <span class="token function">clearContainer</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>containerInfo<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">case</span> <span class="token literal-property property">HostComponent</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token literal-property property">HostText</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token literal-property property">HostPortal</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token literal-property property">IncompleteClassComponent</span><span class="token operator">:</span>
        <span class="token comment">// Nothing to do for these component types</span>
        <span class="token keyword">break</span>
      <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
          <span class="token string">&#39;This unit of work tag should not have side-effects. This error is &#39;</span> <span class="token operator">+</span>
            <span class="token string">&#39;likely caused by a bug in React. Please file an issue.&#39;</span>
        <span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token function">resetCurrentDebugFiberInDEV</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="mutation" tabindex="-1"><a class="header-anchor" href="#mutation" aria-hidden="true">#</a> mutation</h3><p><code>mutation</code> 阶段，遍历 <code>EffectList</code> ，执行函数。</p><p>主要调用函数调用链路：<code>commitRoot</code> 函数 --&gt; <code>commitRootImpl</code> 函数 --&gt; <code>commitMutationEffects</code> 函数 --&gt; <code>commitMutationEffectsOnFiber</code> 函数</p><p>在 <code>commitMutationEffectsOnFiber(finishedWork.tag, root, lanes)</code> 函数中，根据 <code>finishedWork.tag</code> 执行不同的操作，对新增元素，更新元素，删除元素进行真实的 DOM 操作。</p><details class="hint-container details"><summary>详情</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">commitMutationEffectsOnFiber</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">finishedWork</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span>
  <span class="token literal-property property">lanes</span><span class="token operator">:</span> Lanes</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> current <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>alternate
  <span class="token keyword">const</span> flags <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>flags

  <span class="token comment">// The effect flag should be checked *after* we refine the type of fiber,</span>
  <span class="token comment">// because the fiber tag is more specific. An exception is any flag related</span>
  <span class="token comment">// to reconcilation, because those can be set on all fiber types.</span>
  <span class="token keyword">switch</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token literal-property property">FunctionComponent</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ForwardRef</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">MemoComponent</span><span class="token operator">:</span>
    <span class="token keyword">case</span> <span class="token literal-property property">SimpleMemoComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">ClassComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">recursivelyTraverseMutationEffects</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> finishedWork<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span>
      <span class="token function">commitReconciliationEffects</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>flags <span class="token operator">&amp;</span> Ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// 清空 ref</span>
          <span class="token function">safelyDetachRef</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> current<span class="token punctuation">.</span>return<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">HostComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">recursivelyTraverseMutationEffects</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> finishedWork<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span>
      <span class="token function">commitReconciliationEffects</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>flags <span class="token operator">&amp;</span> Ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">safelyDetachRef</span><span class="token punctuation">(</span>current<span class="token punctuation">,</span> current<span class="token punctuation">.</span>return<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>supportsMutation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// TODO: ContentReset gets cleared by the children during the commit</span>
        <span class="token comment">// phase. This is a refactor hazard because it means we must read</span>
        <span class="token comment">// flags the flags after \`commitReconciliationEffects\` has already run;</span>
        <span class="token comment">// the order matters. We should refactor so that ContentReset does not</span>
        <span class="token comment">// rely on mutating the flag during commit. Like by setting a flag</span>
        <span class="token comment">// during the render phase instead.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> ContentReset<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> <span class="token literal-property property">instance</span><span class="token operator">:</span> Instance <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>stateNode
          <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">resetTextContent</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">captureCommitPhaseError</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">,</span> finishedWork<span class="token punctuation">.</span>return<span class="token punctuation">,</span> error<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>flags <span class="token operator">&amp;</span> Update<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> <span class="token literal-property property">instance</span><span class="token operator">:</span> Instance <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>stateNode
          <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// Commit the work prepared earlier.</span>
            <span class="token keyword">const</span> newProps <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>memoizedProps
            <span class="token comment">// For hydration we reuse the update path but we treat the oldProps</span>
            <span class="token comment">// as the newProps. The updatePayload will contain the real change in</span>
            <span class="token comment">// this case.</span>
            <span class="token keyword">const</span> oldProps <span class="token operator">=</span> current <span class="token operator">!==</span> <span class="token keyword">null</span> <span class="token operator">?</span> current<span class="token punctuation">.</span>memoizedProps <span class="token operator">:</span> newProps
            <span class="token keyword">const</span> type <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>type
            <span class="token comment">// TODO: Type the updateQueue to be specific to host components.</span>
            <span class="token keyword">const</span> <span class="token literal-property property">updatePayload</span><span class="token operator">:</span> <span class="token keyword">null</span> <span class="token operator">|</span> UpdatePayload <span class="token operator">=</span>
              <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>updateQueue<span class="token operator">:</span> any<span class="token punctuation">)</span>
            finishedWork<span class="token punctuation">.</span>updateQueue <span class="token operator">=</span> <span class="token keyword">null</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>updatePayload <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token function">commitUpdate</span><span class="token punctuation">(</span>
                  instance<span class="token punctuation">,</span>
                  updatePayload<span class="token punctuation">,</span>
                  type<span class="token punctuation">,</span>
                  oldProps<span class="token punctuation">,</span>
                  newProps<span class="token punctuation">,</span>
                  finishedWork
                <span class="token punctuation">)</span>
              <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">captureCommitPhaseError</span><span class="token punctuation">(</span>
                  finishedWork<span class="token punctuation">,</span>
                  finishedWork<span class="token punctuation">.</span>return<span class="token punctuation">,</span>
                  error
                <span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">HostText</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// ... 省略部分代码</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">case</span> <span class="token literal-property property">HostRoot</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">recursivelyTraverseMutationEffects</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> finishedWork<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span>
      <span class="token function">commitReconciliationEffects</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>

      <span class="token keyword">if</span> <span class="token punctuation">(</span>flags <span class="token operator">&amp;</span> Update<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>supportsMutation <span class="token operator">&amp;&amp;</span> supportsHydration<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">const</span> <span class="token literal-property property">prevRootState</span><span class="token operator">:</span> RootState <span class="token operator">=</span> current<span class="token punctuation">.</span>memoizedState
            <span class="token keyword">if</span> <span class="token punctuation">(</span>prevRootState<span class="token punctuation">.</span>isDehydrated<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token function">commitHydratedContainer</span><span class="token punctuation">(</span>root<span class="token punctuation">.</span>containerInfo<span class="token punctuation">)</span>
              <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">captureCommitPhaseError</span><span class="token punctuation">(</span>
                  finishedWork<span class="token punctuation">,</span>
                  finishedWork<span class="token punctuation">.</span>return<span class="token punctuation">,</span>
                  error
                <span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>supportsPersistence<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> containerInfo <span class="token operator">=</span> root<span class="token punctuation">.</span>containerInfo
          <span class="token keyword">const</span> pendingChildren <span class="token operator">=</span> root<span class="token punctuation">.</span>pendingChildren
          <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">replaceContainerChildren</span><span class="token punctuation">(</span>containerInfo<span class="token punctuation">,</span> pendingChildren<span class="token punctuation">)</span>
          <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">captureCommitPhaseError</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">,</span> finishedWork<span class="token punctuation">.</span>return<span class="token punctuation">,</span> error<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// ... 省略部分 case 代码</span>
    <span class="token keyword">default</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token function">recursivelyTraverseMutationEffects</span><span class="token punctuation">(</span>root<span class="token punctuation">,</span> finishedWork<span class="token punctuation">,</span> lanes<span class="token punctuation">)</span>
      <span class="token function">commitReconciliationEffects</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>

      <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h3 id="layout" tabindex="-1"><a class="header-anchor" href="#layout" aria-hidden="true">#</a> layout</h3><p><code>layout</code> 阶段，在 DOM 渲染完成（<code>mutation</code> 阶段完成）后执行的，触发的生命周期钩子和 <code>Hook</code> 可以直接访问到已经改变后的 DOM，即可以参与 DOM layout 的阶段。</p><p>主要调用函数调用链路：<code>commitRoot</code> 函数 --&gt; <code>commitRootImpl</code> 函数 --&gt; <code>commitLayoutEffects</code> 函数 --&gt; <code>commitLayoutEffects_begin</code> 函数 --&gt; <code>commitLayoutMountEffects_complete</code> 函数 --&gt; <code>commitLayoutEffectOnFiber</code> 函数</p><p>在 <code>commitLayoutEffectOnFiber(finishedRoot, current, finishedWork, committedLanes)</code> 方法中：</p><ul><li><p>根据 <code>fiber.tag</code> 对不同类型的节点分别处理。</p><ul><li>对于 <code>ClassComponent</code>，通过 <code>current === null</code> 区分是 <code>mount</code> 与 <code>update</code>，调用 <code>componentDidMount</code> 或 <code>componentDidUpdate</code> 。</li><li>对于 <code>FunctionComponent</code> 及相关类型（指特殊处理后的 <code>FunctionComponent</code>，比如 <code>ForwardRef</code>、<code>React.memo</code> 包裹的 <code>FunctionComponent</code>），调用 <code>useLayoutEffect Hook</code> 回调函数，调度 <code>useEffect</code> 的销毁与回调函数</li><li>......</li></ul></li><li><p>通过调用 <code>commitAttachRef</code> 函数获取 DOM 实例，更新 ref 。</p><details class="hint-container details"><summary>commitAttachRef 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">commitAttachRef</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">finishedWork</span><span class="token operator">:</span> Fiber</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> ref <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>ref
  <span class="token keyword">if</span> <span class="token punctuation">(</span>ref <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> instance <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>stateNode
    <span class="token keyword">let</span> instanceToUse
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token literal-property property">HostComponent</span><span class="token operator">:</span>
        instanceToUse <span class="token operator">=</span> <span class="token function">getPublicInstance</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span>
        <span class="token keyword">break</span>
      <span class="token keyword">default</span><span class="token operator">:</span>
        instanceToUse <span class="token operator">=</span> instance
    <span class="token punctuation">}</span>
    <span class="token comment">// Moved outside to ensure DCE works with this flag</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enableScopeAPI <span class="token operator">&amp;&amp;</span> finishedWork<span class="token punctuation">.</span>tag <span class="token operator">===</span> ScopeComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      instanceToUse <span class="token operator">=</span> instance
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> ref <span class="token operator">===</span> <span class="token string">&#39;function&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> retVal
      <span class="token keyword">if</span> <span class="token punctuation">(</span>
        enableProfilerTimer <span class="token operator">&amp;&amp;</span>
        enableProfilerCommitHooks <span class="token operator">&amp;&amp;</span>
        finishedWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode
      <span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token function">startLayoutEffectTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
          retVal <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>instanceToUse<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
          <span class="token function">recordLayoutEffectDuration</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        retVal <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span>instanceToUse<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      ref<span class="token punctuation">.</span>current <span class="token operator">=</span> instanceToUse
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></li></ul><details class="hint-container details"><summary>commitLayoutEffectOnFiber 函数</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">commitLayoutEffectOnFiber</span><span class="token punctuation">(</span>
  <span class="token parameter"><span class="token literal-property property">finishedRoot</span><span class="token operator">:</span> FiberRoot<span class="token punctuation">,</span>
  <span class="token literal-property property">current</span><span class="token operator">:</span> Fiber <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">finishedWork</span><span class="token operator">:</span> Fiber<span class="token punctuation">,</span>
  <span class="token literal-property property">committedLanes</span><span class="token operator">:</span> Lanes</span>
<span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> LayoutMask<span class="token punctuation">)</span> <span class="token operator">!==</span> NoFlags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">case</span> <span class="token literal-property property">FunctionComponent</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token literal-property property">ForwardRef</span><span class="token operator">:</span>
      <span class="token keyword">case</span> <span class="token literal-property property">SimpleMemoComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>
          <span class="token operator">!</span>enableSuspenseLayoutEffectSemantics <span class="token operator">||</span>
          <span class="token operator">!</span>offscreenSubtreeWasHidden
        <span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// At this point layout effects have already been destroyed (during mutation phase).</span>
          <span class="token comment">// This is done to prevent sibling component effects from interfering with each other,</span>
          <span class="token comment">// e.g. a destroy function in one component should never override a ref set</span>
          <span class="token comment">// by a create function in another component during the same commit.</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>
            enableProfilerTimer <span class="token operator">&amp;&amp;</span>
            enableProfilerCommitHooks <span class="token operator">&amp;&amp;</span>
            finishedWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode
          <span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
              <span class="token function">startLayoutEffectTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token function">commitHookEffectListMount</span><span class="token punctuation">(</span>
                HookLayout <span class="token operator">|</span> HookHasEffect<span class="token punctuation">,</span>
                finishedWork
              <span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
              <span class="token function">recordLayoutEffectDuration</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token function">commitHookEffectListMount</span><span class="token punctuation">(</span>HookLayout <span class="token operator">|</span> HookHasEffect<span class="token punctuation">,</span> finishedWork<span class="token punctuation">)</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">case</span> <span class="token literal-property property">ClassComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> instance <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>stateNode
        <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> Update<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>offscreenSubtreeWasHidden<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">===</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token comment">// We could update instance props and state here,</span>
              <span class="token comment">// but instead we rely on them being set during last render.</span>
              <span class="token comment">// TODO: revisit this when we implement resuming.</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>
                enableProfilerTimer <span class="token operator">&amp;&amp;</span>
                enableProfilerCommitHooks <span class="token operator">&amp;&amp;</span>
                finishedWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode
              <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                  <span class="token function">startLayoutEffectTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                  instance<span class="token punctuation">.</span><span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                  <span class="token function">recordLayoutEffectDuration</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                instance<span class="token punctuation">.</span><span class="token function">componentDidMount</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
              <span class="token keyword">const</span> prevProps <span class="token operator">=</span>
                finishedWork<span class="token punctuation">.</span>elementType <span class="token operator">===</span> finishedWork<span class="token punctuation">.</span>type
                  <span class="token operator">?</span> current<span class="token punctuation">.</span>memoizedProps
                  <span class="token operator">:</span> <span class="token function">resolveDefaultProps</span><span class="token punctuation">(</span>
                      finishedWork<span class="token punctuation">.</span>type<span class="token punctuation">,</span>
                      current<span class="token punctuation">.</span>memoizedProps
                    <span class="token punctuation">)</span>
              <span class="token keyword">const</span> prevState <span class="token operator">=</span> current<span class="token punctuation">.</span>memoizedState
              <span class="token comment">// We could update instance props and state here,</span>
              <span class="token comment">// but instead we rely on them being set during last render.</span>
              <span class="token comment">// TODO: revisit this when we implement resuming.</span>
              <span class="token keyword">if</span> <span class="token punctuation">(</span>
                enableProfilerTimer <span class="token operator">&amp;&amp;</span>
                enableProfilerCommitHooks <span class="token operator">&amp;&amp;</span>
                finishedWork<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> ProfileMode
              <span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                  <span class="token function">startLayoutEffectTimer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                  instance<span class="token punctuation">.</span><span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>
                    prevProps<span class="token punctuation">,</span>
                    prevState<span class="token punctuation">,</span>
                    instance<span class="token punctuation">.</span>__reactInternalSnapshotBeforeUpdate
                  <span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
                  <span class="token function">recordLayoutEffectDuration</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                instance<span class="token punctuation">.</span><span class="token function">componentDidUpdate</span><span class="token punctuation">(</span>
                  prevProps<span class="token punctuation">,</span>
                  prevState<span class="token punctuation">,</span>
                  instance<span class="token punctuation">.</span>__reactInternalSnapshotBeforeUpdate
                <span class="token punctuation">)</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// TODO: I think this is now always non-null by the time it reaches the</span>
        <span class="token comment">// commit phase. Consider removing the type check.</span>
        <span class="token keyword">const</span> <span class="token literal-property property">updateQueue</span><span class="token operator">:</span> UpdateQueue<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span>
          <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>updateQueue<span class="token operator">:</span> any<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>updateQueue <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token comment">// We could update instance props and state here,</span>
          <span class="token comment">// but instead we rely on them being set during last render.</span>
          <span class="token comment">// TODO: revisit this when we implement resuming.</span>
          <span class="token function">commitUpdateQueue</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">,</span> updateQueue<span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>
      <span class="token keyword">case</span> <span class="token literal-property property">HostRoot</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// TODO: I think this is now always non-null by the time it reaches the</span>
        <span class="token comment">// commit phase. Consider removing the type check.</span>
        <span class="token keyword">const</span> <span class="token literal-property property">updateQueue</span><span class="token operator">:</span> UpdateQueue<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">&gt;</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">=</span>
          <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>updateQueue<span class="token operator">:</span> any<span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>updateQueue <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">null</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>child <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">switch</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>child<span class="token punctuation">.</span>tag<span class="token punctuation">)</span> <span class="token punctuation">{</span>
              <span class="token keyword">case</span> <span class="token literal-property property">HostComponent</span><span class="token operator">:</span>
                instance <span class="token operator">=</span> <span class="token function">getPublicInstance</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>child<span class="token punctuation">.</span>stateNode<span class="token punctuation">)</span>
                <span class="token keyword">break</span>
              <span class="token keyword">case</span> <span class="token literal-property property">ClassComponent</span><span class="token operator">:</span>
                instance <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>child<span class="token punctuation">.</span>stateNode
                <span class="token keyword">break</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
          <span class="token function">commitUpdateQueue</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">,</span> updateQueue<span class="token punctuation">,</span> instance<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// ... 省略部分 case 代码</span>

      <span class="token keyword">case</span> <span class="token literal-property property">HostComponent</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token keyword">const</span> <span class="token literal-property property">instance</span><span class="token operator">:</span> Instance <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>stateNode

        <span class="token comment">// Renderers may schedule work to be done after host components are mounted</span>
        <span class="token comment">// (eg DOM renderer may schedule auto-focus for inputs and form controls).</span>
        <span class="token comment">// These effects should only be committed when components are first mounted,</span>
        <span class="token comment">// aka when there is no current/alternate.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>current <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> finishedWork<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> Update<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">const</span> type <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>type
          <span class="token keyword">const</span> props <span class="token operator">=</span> finishedWork<span class="token punctuation">.</span>memoizedProps
          <span class="token function">commitMount</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> type<span class="token punctuation">,</span> props<span class="token punctuation">,</span> finishedWork<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">break</span>
      <span class="token punctuation">}</span>

      <span class="token comment">// ... 省略部分 case 代码</span>

      <span class="token keyword">default</span><span class="token operator">:</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span>
          <span class="token string">&#39;This unit of work tag should not have side-effects. This error is &#39;</span> <span class="token operator">+</span>
            <span class="token string">&#39;likely caused by a bug in React. Please file an issue.&#39;</span>
        <span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>enableSuspenseLayoutEffectSemantics <span class="token operator">||</span> <span class="token operator">!</span>offscreenSubtreeWasHidden<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>enableScopeAPI<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// TODO: This is a temporary solution that allowed us to transition away</span>
      <span class="token comment">// from React Flare on www.</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> Ref <span class="token operator">&amp;&amp;</span> finishedWork<span class="token punctuation">.</span>tag <span class="token operator">!==</span> ScopeComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">commitAttachRef</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>finishedWork<span class="token punctuation">.</span>flags <span class="token operator">&amp;</span> Ref<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">commitAttachRef</span><span class="token punctuation">(</span>finishedWork<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>在 <code>mutation</code> 阶段结束后，<code>layout</code> 阶段开始前，会执行 <code>root.current = finishedWork</code> 切换 <code>fiberRoot</code> 指向的 <code>current Fiber</code> 树（<code>workInProgress Fiber</code> 树在 <code>commit</code> 阶段完成渲染后会变为 <code>current Fiber</code> 树）。原因如下：</p><ul><li><code>componentWillUnmount</code> 会在 <code>mutation</code> 阶段执行。此时 <code>current Fiber</code> 树还指向前一次更新的 <code>Fiber</code> 树，在生命周期钩子内获取的 DOM 还是更新前的。</li><li><code>componentDidMount</code> 和 <code>componentDidUpdate</code> 会在 <code>layout</code> 阶段执行。此时 <code>current Fiber</code> 树已经指向更新后的 <code>Fiber</code> 树，在生命周期钩子内获取的 DOM 就是更新后的。</li></ul>`,47),i=[c];function l(r,u){return s(),a("div",null,i)}const v=n(p,[["render",l],["__file","Reconciler.html.vue"]]);export{v as default};
