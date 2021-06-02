/* @flow */

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  noop,
} from '../util/index';

import { traverse } from './traverse';
import { queueWatcher } from './scheduler';
import Dep, { pushTarget, popTarget } from './dep';

import type { SimpleSet } from '../util/index';

let uid = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 * 观察者解析表达式，收集依赖项并在表达式更新的时候触发回调
 * 用于 $watch() API 和 指令（directives）
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  lazy: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: ?Function;
  getter: Function;
  value: any;

  constructor(
    vm: Component, // 组件实例
    expOrFn: string | Function, // 观察 Vue 实例上的一个表达式或者一个函数计算结果
    cb: Function, // 回调函数。回调函数得到的参数为新值和旧值
    options?: ?Object, // options 相关选项
    isRenderWatcher?: boolean // 是否渲染 Watcher 观察者
  ) {
    this.vm = vm;
    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watchers.push(this);
    // options
    if (options) {
      this.deep = !!options.deep; // 深度监听
      this.user = !!options.user; // 使用者
      this.lazy = !!options.lazy; // lazy Watcher
      this.sync = !!options.sync; // 不将更新的 Watcher 放到 nextTick 队列中，而是立即执行更新
      this.before = options.before;
    } else {
      this.deep = this.user = this.lazy = this.sync = false;
    }
    this.cb = cb; // 回调函数
    this.id = ++uid; // uid for batching
    this.active = true; // 是否激活
    this.dirty = this.lazy; // for lazy watchers
    this.deps = []; // 观察者队列
    this.newDeps = []; // 新的观察者队列
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression =
      process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';
    // parse expression for getter
    // 把 Vue 实例上的表达式或者函数 expOrFn 解析成 getter
    if (typeof expOrFn === 'function') {
      // 如果 Watcher 观察的是 Vue 实例上的一个函数的计算结果，则直接赋值给 getter
      this.getter = expOrFn;
    } else {
      // 如果 Watcher 观察的是 Vue 实例上的一个表达式，则进行路径解析
      // parsePath 返回为一个函数
      this.getter = parsePath(expOrFn);
      if (!this.getter) {
        // noop - 不进行任何操作
        // >>> export function noop(a?: any, b?: any, c?: any) {}
        this.getter = noop;
        // 观察者只接受简单的点分隔的路径。比如： a.b.c
        process.env.NODE_ENV !== 'production' &&
          warn(
            `Failed watching path: "${expOrFn}" ` +
              'Watcher only accepts simple dot-delimited paths. ' +
              'For full control, use a function instead.',
            vm
          );
      }
    }
    this.value = this.lazy ? undefined : this.get();
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   * 获得 getter 的值并且重新进行依赖收集
   */
  get() {
    // 订阅者 Dep 依赖收集
    // 将 Dep.target 设置为 Watcher实例，用于依赖收集，并存入 target 栈中
    pushTarget(this);
    let value;
    const vm = this.vm;
    try {
      // 获取 Vue 实例中对应的值
      value = this.getter.call(vm, vm);
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`);
      } else {
        throw e;
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      // 深度监听
      // 如果存在 deep ，则触发每个深层对象的依赖，并追踪变化
      if (this.deep) {
        // 递归每一个对象或者数组，触发它们的 getter
        // 使得对象或数组的每一个成员都被依赖收集，形成一个“深（deep）”依赖关系
        traverse(value);
      }
      // 将 Wathcer 观察者实例从 target 栈中取出，并将 Dep.target 设置为该实例
      popTarget();
      this.cleanupDeps();
    }
    return value;
  }

  /**
   * Add a dependency to this directive.
   * 添加一个依赖项
   */
  addDep(dep: Dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      // 如果 newDepIds 中不存在 id
      this.newDepIds.add(id); // 向 newDepIds 添加 Dep id
      this.newDeps.push(dep); // 添加 newDeps 添加 Dep
      if (!this.depIds.has(id)) {
        dep.addSub(this); // 依赖收集
      }
    }
  }

  /**
   * Clean up for dependency collection.
   * 清除依赖收集
   */
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        // 删除 Dep subs 中的一个 Watcher 观察者对象
        dep.removeSub(this);
      }
    }
    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear();
    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0;
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   * 调度者接口，当依赖发生改变的时候进行回调
   */
  update() {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      // 同步执行 run 渲染视图
      this.run();
    } else {
      // 异步推送至观察者队列中，下一个 nextTick 时调用
      queueWatcher(this);
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   * 调度者工作接口，将被调度者回调。
   */
  run() {
    if (this.active) {
      // 获取 getter 的值并且重新进行依赖收集，从而可以调用 update 更新视图
      const value = this.get();
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        // 即便值相同
        // 拥有 Deep 属性的观察者以及在对象／数组上的观察者应该被触发更新
        // 因为它们的值可能发生改变。
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value;
        this.value = value; // 设置新的值
        // 触发回调
        if (this.user) {
          try {
            this.cb.call(this.vm, value, oldValue);
          } catch (e) {
            handleError(
              e,
              this.vm,
              `callback for watcher "${this.expression}"`
            );
          }
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   * 获取 Watcher 观察者的值。只适用于 lazy watchers
   */
  evaluate() {
    this.value = this.get();
    this.dirty = false;
  }

  /**
   * Depend on all deps collected by this watcher.
   * 收集该 Watcher 的所有 Deps 的依赖
   */
  depend() {
    let i = this.deps.length;
    while (i--) {
      // Deps 依赖收集
      this.deps[i].depend();
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   * 将自身从所有依赖收集的订阅列表中删除
   */
  teardown() {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      // 从 vm 实例的 Watcher 观察者列表中移除自身
      // 由于该操作比较耗费资源，所以如果 vm 实例正在被销毁则跳过该步骤
      if (!this.vm._isBeingDestroyed) {
        // _isBeingDestroyed - vm 是否已被销毁的标志
        // remove - 从一个数组中移除一个元素
        remove(this.vm._watchers, this);
      }
      let i = this.deps.length;
      while (i--) {
        // removeSub - 删除 Dep subs 中的一个 Watcher 观察者对象
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  }
}
