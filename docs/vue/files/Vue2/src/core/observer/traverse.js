/* @flow */

import { _Set as Set, isObject } from '../util/index';
import type { SimpleSet } from '../util/index';
import VNode from '../vdom/vnode';

// 用于存放 Oberser实例等 id，避免重复读取
const seenObjects = new Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 * 递归遍历一个对象，触发 getter
 * 以便对 对象 或者 数组 中的每个属性进行依赖收集
 * 形成一个“深（deep）”依赖关系
 */
export function traverse(val: any) {
  _traverse(val, seenObjects);
  seenObjects.clear(); // 从 seenObjects Set对象中删除所有元素
}

function _traverse(val: any, seen: SimpleSet) {
  let i, keys;
  // 判断 val 是否为数组
  const isA = Array.isArray(val);
  // isObject - 判断是否为对象
  // isFrozen - 判断一个对象是否被冻结
  // val instanceof VNode - 判断 val 是否被 VNode 实例化
  if (
    (!isA && !isObject(val)) ||
    Object.isFrozen(val) ||
    val instanceof VNode
  ) {
    return;
  }
  // __ob__ 对象用于存放 Observer 实例
  if (val.__ob__) {
    /* 避免重复读取 */
    const depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return;
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) _traverse(val[i], seen);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) _traverse(val[keys[i]], seen);
  }
}
