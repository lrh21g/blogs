/* @flow */

import type Watcher from './watcher';
import config from '../config';
import { callHook, activateChildComponent } from '../instance/lifecycle';

import { warn, nextTick, devtools, inBrowser, isIE } from '../util/index';

export const MAX_UPDATE_COUNT = 100;

const queue: Array<Watcher> = []; // Watcher 队列
const activatedChildren: Array<Component> = []; // 活跃的 Component
// 哈希表，用于存放 Watcher 对象的 id，防止重复的 Watcher 对象多次加入
let has: { [key: number]: ?true } = {};
// 持续循环的次数，如果超过 100 次，则认为进入死循环，报错
let circular: { [key: number]: number } = {};
// Watcher 进行更新数据时的标识
let waiting = false;
// nextTick 执行回调函数的标识
let flushing = false;
let index = 0;

/**
 * Reset the scheduler's state.
 * 重置调度者的状态
 */
function resetSchedulerState() {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
// Async 边缘案例（#6566） - 需要在附加事件侦听器保存时间戳。
// 然而，调用 performance.now() 会产生性能消耗，当页面存在数千个事件侦听器的时候，
// 相反，每次调度程序刷新时，都会获取一个时间戳，将其用于该刷新期间附加的所有事件侦听器
export let currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
// 修复 Async 边界情况，需要存储事件侦听器的附加时间错
let getNow: () => number = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  const performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = () => performance.now();
  }
}

/**
 * Flush both queues and run the watchers.
 * nextTick 的回调函数，在下一个 tick 时，刷新两个队列，并同时运行 Watchers
 */
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  let watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  // 刷新队列前进行排序，可以确保：
  // 1、组件更新顺序：组件更新从父组件到子组件，因为父组件总是比子组件先创建
  // 2、组件的 user watchers 比 render watcher 先执行：因为user watchers 比 render watcher 先创建
  // 3、如果组件在父组件 Watcher 运行期间被销毁，可以跳过组件的 Watcher
  queue.sort((a, b) => a.id - b.id);

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  // for(index = queue.length; index > 0; index--)
  // >>> 不使用上述 for 循环方式缓存队列长度，
  // >>> 是因为在执行处理现有 watcher 对象期间，更多的 watcher对象可能会被 push 进 queue 队列
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before(); // 执行 beforeUpdate 钩子函数
    }
    id = watcher.id;
    has[id] = null;
    watcher.run(); // 执行 watcher
    // in dev build, check and stop circular updates.
    // 在测试环境中，检查并且停止循环更新。循环执行 100 次，则表示可能存在死循环。如：
    // watch: { test () { this.test++ } }
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' +
            (watcher.user
              ? `in watcher with expression "${watcher.expression}"`
              : `in a component render function.`),
          watcher.vm
        );
        break;
      }
    }
  }

  // keep copies of post queues before resetting state
  // 在重置状态之前，保留队列的副本
  const activatedQueue = activatedChildren.slice();
  const updatedQueue = queue.slice();

  // 重置调度者的状态
  resetSchedulerState();

  // call component updated and activated hooks
  // 调用 activate 钩子函数 （keep-alive）
  callActivatedHooks(activatedQueue);
  // 调用 update 钩子函数
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

// 调用 update 钩子函数
function callUpdatedHooks(queue) {
  let i = queue.length;
  while (i--) {
    const watcher = queue[i];
    // 获取虚拟 DOM
    const vm = watcher.vm;
    // >>> watcher 与 vm._watcher 相等，
    // >>> _isMounted: 是否触发 mounted 钩子函数
    // >>> _isDestroyed: 是否触发 destoryed 钩子函数
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 * 在 patch (比对两个 VNode 节点，将「差异」更新到视图上) 期间
 * 将被激活（activated）的 keep-alive 组件保存在队列当中
 * 在 patch 结束之后，队列将会被处理
 */
export function queueActivatedComponent(vm: Component) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  // 设置 _inactive 为 false，以便于渲染函数可以在非活动树（inactive tree）中进行检测
  vm._inactive = false;
  activatedChildren.push(vm);
}

// 调用 activate 钩子函数 （keep-alive）
function callActivatedHooks(queue) {
  for (let i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 * 将一个 Watcher 观察者对象 push 进入 观察者队列
 * 在观察者队列中，如果已存在相同的 Watcher.id 观察者Id，则该观察者对会被跳过，除非它在队列被刷新时推送
 */
export function queueWatcher(watcher: Watcher) {
  // 获取 Watcher 观察者id
  const id = watcher.id;
  // 校验  Watcher.id 是否存在
  // >>> 已存在，则直接跳过
  // >>> 不存在，则标记哈希表 has，用于下次校验
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if (process.env.NODE_ENV !== 'production' && !config.async) {
        flushSchedulerQueue();
        return;
      }
      nextTick(flushSchedulerQueue);
    }
  }
}
