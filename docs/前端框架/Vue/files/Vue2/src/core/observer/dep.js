/* @flow */

import type Watcher from './watcher';
import { remove } from '../util/index';
import config from '../config';

let uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 * 订阅者 Dep 主要用于存放 Watcher 观察者对象
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    // 用户存放 Watcher 对象的数组
    this.subs = [];
  }

  // 向 subs 中添加一个 Watcher 观察者对象
  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  // 删除 subs 中的一个 Watcher 观察者对象
  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }

  // 依赖收集
  // 当存在 Dep.target 时，添加 Watcher 观察者对象
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  // 通知所有订阅者
  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id);
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
const targetStack = [];

// 将 Dep.target 设置为 Watcher 观察者实例，用于依赖收集，并将该实例例存入 target 栈中
export function pushTarget(target: ?Watcher) {
  targetStack.push(target);
  Dep.target = target;
}

// 将 Wathcer 观察者实例从 target 栈中取出，并将 Dep.target 设置为该实例
export function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
