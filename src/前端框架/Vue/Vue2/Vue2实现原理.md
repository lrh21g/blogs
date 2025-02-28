# Vue 2.x 实现原理

## 全局概览

![vue_render](../files/images/vue2_render.drawio.png)

Vue 2.x 基于 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 实现**响应式系统**。

## Object.defineProperty

`Object.defineProperty(obj, prop, descriptor)` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

- **参数**
  - `obj` : 要定义属性的对象。
  - `prop` : 需要操作的目标对象的属性名。
  - `descriptor` : 要定义或修改的属性描述符。
    - `enumerable` : 属性是否可枚举，默认 false 。
    - `configurable` : 属性是否可以被修改或者删除，默认 false 。
    - `writable` : 当且仅当该属性为 true 时，属性的值，才能被赋值运算符改变。属性值假如是数组时，将不受 push, splice 等方法的影响。默认为 false。
    - `value` : 该属性对应的值。
    - `get` : 属性的 getter 函数，如果没有 getter，则为 undefined。当访问该属性时，会调用此函数，默认为 undefined。
    - `set` : 属性的 setter 函数，如果没有 setter，则为 undefined。当属性值被修改时，会调用此函数，默认为 undefined。
- **返回值** ：被传递给函数的对象。
- **API 存在的缺陷**
  - 深度监听，需要递归到底，一次性计算量大
  - 对于对象，无法检测到属性的添加或移除。
  - 对于数组，无法检测到利用索引直接设置一个数组项和修改数组的长度。

## 响应式简单实现

::: details 基于 Object.defineProperty 响应式简单实现

```javascript
/* 订阅者 Dep：用来存放 Watcher 观察者对象 */
class Dep {
  constructor() {
    this.subs = []; /* 用来存放 Watcher 对象的数组 */
  }
  addSub(sub) {
    this.subs.push(sub); /* 在 subs 中添加一个 Watcher对象 */
  }
  /* 通知所有 Watcher 对象更新视图 */
  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

class Watcher {
  constructor() {
    /* 在 new 一个 Watcher 对象时，将该对象赋值给 Dep.target，在 get 中会用到 */
    Dep.target = this;
  }
  /* 更新视图的方法 */
  update() { console.log("视图更新啦～"); }
}

/**
 * 通过遍历需要【响应式】化的对象的所有属性
 * 对该对象的每一个属性都通过 defineReactive 函数处理
 * 注：实际上 observer 会进行递归调用，为了便于理解去掉了递归的过程
 * @param value 需要【响应式】化的对象
 */
function observer(value) {
  if (!value || typeof value !== "object") return;
  Object.keys(value).forEach((key) => {
    defineReactive(value, key, value[key]);
  });
}

/**
 * 通过 Object.defineProperty 来实现对对象的「响应式」化
 * @param obj 需要绑定的对象
 * @param key obj的某一个属性
 * @param val 具体的值
 * obj 的 key 属性在【读】的时候会触发 reactiveGetter 方法
 * obj 的 key 属性在【写】的时候会触发 reactiveSetter 方法
 */
function defineReactive(obj, key, val) {
  /**
   * 一个Dep类对象，用来收集 Watcher 对象。
   * 对象被【读】的时候，会触发 get: reactiveGetter 函数，进行【依赖收集】
   * 对象被【写】的时候，会触发 set: reactiveSetter 函数，进行【更新视图】
   */
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true, /* 属性可枚举 */
    configurable: true, /* 属性可被修改或删除 */
    get: function reactiveGetter() {
      /* 把当前的 Watcher 对象（存放在 Dep.target 中）收集到 Dep 类中去。 */
      dep.addSub(Dep.target);
      return val;
    },
    set: function reactiveSetter(newVal) {
      if (newVal === val) return;
      val = newVal;
      /* 通知 Dep 类调用 notify 来触发所有 Watcher 对象的 update 方法更新对应视图。 */
      dep.notify();
    },
  });
}

class Vue {
  /* Vue构造类 */
  constructor(options) {
    this._data = options.data;
    observer(this._data);
    /* 新建一个 Watcher 观察者对象，Dep.target 会指向这个 Watcher 对象 */
    new Watcher();
     /* 模拟 render 的过程，为了触发 test 属性的 get 函数 */
    console.log("render~", this._data.test);
  }
}

let o = new Vue({
  data: { test: "I am test." },
});
o._data.test = "hello,test.";
Dep.target = null;
```

:::

## Virtual DOM

Virtual DOM 其实是一棵以 JavaScript 对象（VNode 节点）作为基础的树，用对象属性来描述节点，实际上它只是一层对真实 DOM 的抽象。最终可以通过一系列操作使这棵树映射到真实环境上。

由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

::: details Virtual DOM

```vue
<template>
  <span class="demo" v-show="isShow">
    This is a span.
  </span>
</template>

<script>
// VNode
class VNode {
  constructor (tag, data, children, text, elm) {
    /*当前节点的标签名*/
    this.tag = tag;
    /*当前节点的一些数据信息，比如props、attrs等数据*/
    this.data = data;
    /*当前节点的子节点，是一个数组*/
    this.children = children;
    /*当前节点的文本*/
    this.text = text;
    /*当前虚拟节点对应的真实dom节点*/
    this.elm = elm;
  }
}

// JavaScript 代码形式为
function render () {
  return new VNode(
    'span',
    {
      /* 指令集合数组 */
      directives: [
        {
          /* v-show指令 */
          rawName: 'v-show',
          expression: 'isShow',
          name: 'show',
          value: true
        }
      ],
      /* 静态class */
      staticClass: 'demo'
    },
    [ new VNode(undefined, undefined, undefined, 'This is a span.') ]
  );
}

// 转化文 VNode
// {
//   tag: 'span',
//   data: {
//     /* 指令集合数组 */
//     directives: [
//       {
//         /* v-show指令 */
//         rawName: 'v-show',
//         expression: 'isShow',
//         name: 'show',
//         value: true
//       }
//     ],
//     /* 静态class */
//     staticClass: 'demo'
//   },
//   text: undefined,
//   children: [
//     /* 子节点是一个文本VNode节点 */
//     {
//       tag: undefined,
//       data: undefined,
//       text: 'This is a span.',
//       children: undefined
//     }
//   ]
// }
</script>
```

:::

因为使用 Virtual DOM 的原因，Vue.js 具有了跨平台的能力，Virtual DOM 终归是 JavaScript 对象。调用不同平台的 API,需要依赖适配层，将不同的 API 封装在内，以同样的接口对外提供。

使用 `nodeOps` 对象做适配，根据 platform 区分不同平台来执行当前平台对应的API，而对外则是提供了一致的接口，供 Virtual DOM 来调用。

```javascript
const nodeOps = {
  setTextContent (text) {
    if (platform === 'weex') {
      node.parentNode.setAttr('value', text);
    } else if (platform === 'web') {
      node.textContent = text;
    }
  },
  parentNode () {
    //......
  },
  removeChild () {
    //......
  },
  nextSibling () {
    //......
  },
  insertBefore () {
    //......
  }
}
```

## Compile 编译 template 模板

`compile` 编译可以分成 `parse`、`optimize` 与 `generate` 三个阶段，最终需要得到 `render` function。

- `parse` : 用正则表达式解析 template 模板中的指令、class、style 等数据形成 AST
- `optimize` : 标记 static 静态节点。当 update 更新界面时，会有一个 patch 的过程，diff 算法会直接跳过静态节点，从而减少比较过程，优化 patch 的性能
- `generate` : AST 转换为 render function 字符串的过程，得到结构是 render 的字符串以及 staticRenderFns 字符串

::: details Compile 编译 template 模板 Demo

@[code js](../files/Vue2/Compile编译template模板.js)

:::

## diff 算法

### diff 算法以及patch 机制

`patch` 的核心是 `diff` 算法。diff 算法是通过**同层的树节点进行比较**而非对树进行逐层搜索遍历的方式。所以时间复杂度只有 `O(n)` 。

diff 算法特点：

- 只会做同级比较，不跨级比较
- tag 不相同，则直接删除重建，不再深度比较
- tag 和 key，两者都相同，则认为是相同节点，不再深度比较

`patch`过程中需要使用到的 API：

- `insert`: 在 `parent` 这个父节点下插入一个子节点，如果指定了 `ref` 则插入到 `ref` 这个子节点前面

  ```javascript
  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        if (ref.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref);
        }
      } else {
        nodeOps.appendChild(parent, elm)
      }
    }
  }
  ```

- `createElm`: 用来新建一个节点， `tag` 存在创建一个标签节点，否则创建一个文本节点。

  ```javascript
  function createElm (vnode, parentElm, refElm) {
    if (vnode.tag) {
      insert(parentElm, nodeOps.createElement(vnode.tag), refElm);
    } else {
      insert(parentElm, nodeOps.createTextNode(vnode.text), refElm);
    }
  }
  ```

- `addVnodes`: 用来批量调用 `createElm` 新建节点。

  ```javascript
  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], parentElm, refElm);
    }
  }
  ```

- `removeNode`: 用来移除一个节点。

  ```javascript
  function removeNode (el) {
    const parent = nodeOps.parentNode(el);
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }
  ```

- `removeVnodes`: 会批量调用 `removeNode` 移除节点。

  ```javascript
  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (ch) {
        removeNode(ch.elm);
      }
    }
  }
  ```

- `sameVnode`: 判断两个 VNode 是否属于相同的节点。只需要判断 `key`、 `tag`、 `isComment`（是否为注释节点）、 `data`同时定义（或不定义），同时满足当标签类型为 `input` 的时候 `type` 相同（某些浏览器不支持动态修改`<input>`类型，所以他们被视为不同类型）即可

  ```javascript
  function sameVnode () {
    return (
      a.key === b.key &&
      a.tag === b.tag &&
      a.isComment === b.isComment &&
      (!!a.data) === (!!b.data) &&
      sameInputType(a, b)
    )
  }

  function sameInputType (a, b) {
    if (a.tag !== 'input') return true
    let i
    const typeA = (i = a.data) && (i = i.attrs) && i.type
    const typeB = (i = b.data) && (i = i.attrs) && i.type
    return typeA === typeB
  }
  ```

`patch` 的主要功能是比对两个 VNode 节点，将**差异**更新到视图上。`patch` 的过程很复杂，其简单代码如下：

```javascript
/*
  oldVnode: 老的 VNode
  vnode: 新的 VNode
  parentElm: 父节点的 element
*/
function patch (oldVnode, vnode, parentElm) {
  if (!oldVnode) {
    // oldVnode（老 VNode 节点）不存在的时候，相当于新的 VNode 替代原本没有的节点
    // 直接用 addVnodes 将这些节点批量添加到 parentElm 上。
    // addVnodes 用来批量调用 createElm 新建节点。
    addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
  } else if (!vnode) {
    // 在 vnode（新 VNode 节点）不存在的时候，相当于要把老的节点删除
    // 直接使用 removeVnodes 进行批量的节点删除即可。
    // removeVnodes 会批量调用 removeNode 移除节点
    removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
  } else {
    // 当 oldVNode 与 vnode 都存在的时候
    // 需要判断它们是否属于 sameVnode（相同的节点）。
    // >>> 是: 则进行 patchVnode（比对VNode）操作
    // >>> 否: 则删除老节点，增加新节点。
    if (sameVnode(oldVNode, vnode)) {
      patchVnode(oldVNode, vnode);
    } else {
      removeVnodes(parentElm, oldVnode, 0, oldVnode.length - 1);
      addVnodes(parentElm, null, vnode, 0, vnode.length - 1);
    }
  }
}
```

### patchVnode 函数

`patchVnode` 函数只有在符合 `sameVnode` 的条件下触发进行比对。用于比较新旧 VNode 节点，根据不同的状态对 DOM 做合理的更新操作（添加、移动、删除）。

::: details patchVnode 函数实现

```javascript
function patchVnode (oldVnode, vnode) {
  // 新老 VNode 节点相同，不做任何改变，直接 return
  if (oldVnode === vnode) {
    return;
  }

  // 新老 VNode 节点都是 isStatic（静态的），并且 key 相同时
  // 只要将 componentInstance（当前节点对应的组件的实例） 与 elm（当前虚拟节点对应的真实dom节点） 从老VNode节点“拿过来”即可
  // isStatic 为之前编译的时候会将静态节点标记出来
  if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm;
    vnode.componentInstance = oldVnode.componentInstance;
    return;
  }

  const elm = vnode.elm = oldVnode.elm;
  const oldCh = oldVnode.children;
  const ch = vnode.children;

  if (vnode.text) {
    // 当新 VNode 节点是文本节点的时候，直接用 setTextContent 来设置 text
    // nodeOps 为适配层，根据不同平台提供不同的操作平台 DOM 的方法，实现跨平台
    nodeOps.setTextContent(elm, vnode.text);
  } else {
    // 当新 VNode 节点是非文本节点当时候
    if (oldCh && ch && (oldCh !== ch)) {
      // oldCh 与 ch 都存在不相同时，使用 updateChildren 函数来更新子节点
      updateChildren(elm, oldCh, ch);
    } else if (ch) {
      // 只有 ch 存在的时候
      // 如果老节点是文本节点则先将节点的文本清楚
      // 然后将 ch 批量插入插入到节点 elm 下
      if (oldVnode.text) nodeOps.setTextContent(elm, '');
      addVnodes(elm, null, ch, 0, ch.length - 1);
    } else if (oldCh) {
      // 当只有 oldCh 存在时，说明需要将老节点通过 removeVnodes 全部清除
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    } else if (oldVnode.text) {
      // 当只有老节点是文本节点的时候，清除其节点文本内容
      nodeOps.setTextContent(elm, '')
    }
  }
}
```

:::

### updateChildren 函数

更新子节点

![vue_updateChildren](../files/images/vue_updateChildren.png)

::: details updateChildren 函数实现

```javascript
function updateChildren(parentElm, oldCh, newCh) {
  let oldStartIdx = 0; // 老VNode的开始索引
  let newStartIdx = 0; // 新VNode的开始索引
  let oldEndIdx = oldCh.length - 1; // 老VNode的结尾索引
  let newEndIdx = newCh.length - 1; // 新VNode的结尾索引
  let oldStartVnode = oldCh[0];
  let oldEndVnode = oldCh[oldEndIdx];
  let newStartVnode = newCh[0];
  let newEndVnode = newCh[newEndIdx];
  let oldKeyToIdx, idxInOld, elmToMove, refElm;

  // while 循环中，oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 会逐渐向中间靠拢
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {

    // 当 oldStartVnode 或者 oldEndVnode 不存在的时候
    // oldStartIdx 与 oldEndIdx 继续向中间靠拢，并更新对应的 oldStartVnode 与 oldEndVnode 的指向
    if (!oldStartVnode) {
      oldStartVnode = oldCh[++oldStartIdx];
    } else if (!oldEndVnode) {
      oldEndVnode = oldCh[--oldEndIdx];
    }

    // 将 oldStartIdx、newStartIdx、oldEndIdx 以及 newEndIdx 两两比对的过程

    // 当新老 VNode 节点的头部符合 sameVnode
    // 直接进行 patchVnode（比较新老 VNode 节点）操作
    else if (sameVnode(oldStartVnode, newStartVnode)) {
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx];
      newStartVnode = newCh[++newStartIdx];
    }

    // 当新老 VNode 节点的结尾符合 sameVnode
    // 直接进行 patchVnode（比较新老 VNode 节点）操作
    // 并将 oldEndVnode 与 newEndVnode 向前移动一位
    else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx];
      newEndVnode = newCh[--newEndIdx];
    }

    // 当老 VNode 节点的头部与新 VNode 节点的尾部符合 sameVnode
    // 将 oldStartVnode.elm 直接移动到 oldEndVnode.elm 后面
    // 然后将 oldStartIdx 向后移动一位，newEndIdx 向前移动一位
    else if (sameVnode(oldStartVnode, newEndVnode)) {
      patchVnode(oldStartVnode, newEndVnode);
      nodeOps.insertBefore(
        parentElm,
        oldStartVnode.elm,
        nodeOps.nextSibling(oldEndVnode.elm)
      );
      oldStartVnode = oldCh[++oldStartIdx];
      newEndVnode = newCh[--newEndIdx];
    }

    // 当老 VNode 节点的尾部与新 VNode 节点的头部符合 sameVnode
    // 将 oldEndVnode.elm 插入到 oldStartVnode.elm 前面。
    // 然后将 oldEndIdx 向前移动一位，newStartIdx 向后移动一位。
    else if (sameVnode(oldEndVnode, newStartVnode)) {
      patchVnode(oldEndVnode, newStartVnode);
      nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
      oldEndVnode = oldCh[--oldEndIdx];
      newStartVnode = newCh[++newStartIdx];
    }

    // 不符合以上情况的处理方式
    else {
      let elmToMove = oldCh[idxInOld];
      if (!oldKeyToIdx)
        // createKeyToOldIdx 的作用：产生 key 与 index 索引对应的一个 map 表
        // [{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}]
        // 经过 createKeyToOldIdx 转化为 { key0: 0, key1: 1}
        oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
      // 根据某一个 key 值，快速地从 oldKeyToIdx 中获取相同 key 的节点的索引 idxInOld,然后找到相同的节点
      idxInOld = newStartVnode.key ? oldKeyToIdx[newStartVnode.key] : null;

      // 如果没有找到相同的节点
      // 则通过 createElm 创建一个新节点，并将 newStartIdx 向后移动一位
      if (!idxInOld) {
        createElm(newStartVnode, parentElm);
        newStartVnode = newCh[++newStartIdx];
      }

      // 找到了相同的节点
      else {
        elmToMove = oldCh[idxInOld];

        // 如果符合 sameVnode
        // 将这两个节点进行 patchVnode（比较新老 VNode 节点）操作
        // 将该位置的老节点赋值 undefined（之后如果还有新节点与该节点key相同可以检测出来提示已有重复的 key）
        // 将 newStartVnode.elm 插入到 oldStartVnode.elm 的前面
        // newStartIdx 往后移动一位
        if (sameVnode(elmToMove, newStartVnode)) {
          patchVnode(elmToMove, newStartVnode);
          oldCh[idxInOld] = undefined;
          nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        }

        // 如果不符合 sameVnode
        // 创建一个新节点插入到 parentElm 的子节点中
        // newStartIdx 往后移动一位
        else {
          createElm(newStartVnode, parentElm);
          newStartVnode = newCh[++newStartIdx];
        }
      }
    }
  }

  // while 循环结束以后
  // oldStartIdx > oldEndIdx
  // 说明老节点比对完了，但是新节点还有多的，需要将新节点插入到真实 DOM 中去，调用 addVnodes 将这些节点插入即可。
  if (oldStartIdx > oldEndIdx) {
    refElm = newCh[newEndIdx + 1] ? newCh[newEndIdx + 1].elm : null;
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx);
  }

  // newStartIdx > newEndIdx
  // 说明新节点比对完了，老节点还有多，将这些无用的老节点通过 removeVnodes 批量删除即可
  else if (newStartIdx > newEndIdx) {
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
  }
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
```

:::

## 批量异步更新策略

Vue 在更新 DOM 时是**异步**执行的。

只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 `watcher` 被多次触发，只会被推入到队列中一次。可以避免不必要的计算和 DOM 操作。然后，在下一个的事件循环【**tick**】中，Vue 刷新队列并执行实际 (已去重的) 工作。

Vue 在内部对异步队列尝试使用原生的 `Promise.then`、`MutationObserver` 和 `setImmediate`，如果执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。

为了在数据变化之后，等待 Vue 完成更新 DOM，可以在数据变化之后立即使用 `Vue.nextTick(callback)`。这样回调函数将在 DOM 更新完成后被调用。

## Vue.nextTick

### Vue.nextTick API简介

`Vue.nextTick( [callback, context] )` ： 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```javascript
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

### Vue.nextTick 实现源码

Vue.js 中分别使用 `Promise` 、 `setTimeout` 、 `MutationObserver` 、 `setImmediate` 等方式在 **microtask（或是task）** 中创建一个事件，目的是在当前调用栈执行完毕以后（不一定立即）才会去执行这个事件。

- 首先定义一个 `callbacks` 数组，用于存储 `nextTick`，在下一个 **microtask（或是task）** 处理这些回调函数之前，所有 `cb` 都会被存储在 `callbacks` 数组中。
- 在 **microtask（或是task）** 中创建一个事件 `flushCallbacks` 。 `flushCallbacks` 则会在执行时，将 `callbacks` 中的所有 `cb` 依次执行。

::: details nextTick 实现源码

```javascript
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false

const callbacks: Array<Function> = []
let pending = false // 标记位，代表一个等待的状态

function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
let timerFunc

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (
  !isIE &&
  typeof MutationObserver !== 'undefined' &&
  (isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]')
) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

export function nextTick(): Promise<void>
export function nextTick<T>(this: T, cb: (this: T, ...args: any[]) => any): void
export function nextTick<T>(cb: (this: T, ...args: any[]) => any, ctx: T): void
/**
 * @internal
 */
export function nextTick(cb?: (...args: any[]) => any, ctx?: object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e: any) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending) {
    pending = true
    timerFunc()
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```

:::

## Vue.set

### Vue.set API简介

`Vue.set( target, propertyName/index, value )` : 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

- Vue 在初始化实例时，对属性执行 `getter/setter` 转化，属性必须在 `data` 对象上存在才能让 Vue 将它转换为响应式。
- 解决方法：
  - 单个属性：`Vue.set()`(或者`vm.$set`) / `Vue.delete()`
  - 多个属性：使用原对象与要混合进去的对象的属性一起创建一个新的对象。

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
// Vue.set / vm.$set
Vue.set(vm.items, indexOfItem, newValue)
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

### Vue.set 实现源码

::: details Vue.set 实现源码

```typescript
export function set<T>(array: T[], key: number, value: T): T
export function set<T>(object: object, key: string | number, value: T): T
export function set(
  target: any[] | Record<string, any>,
  key: any,
  val: any
): any {
  if (__DEV__ && (isUndef(target) || isPrimitive(target))) {
    warn(
      `Cannot set reactive property on undefined, null, or primitive value: ${target}`
    )
  }
  if (isReadonly(target)) {
    __DEV__ && warn(`Set operation on key "${key}" failed: target is readonly.`)
    return
  }
  const ob = (target as any).__ob__
  // 判断目标值是否为【数组】，并且 key值 是否为有效的数组索引
  if (isArray(target) && isValidArrayIndex(key)) {
    // 对比数组的 key 值和数组长度，取较大值设置为数组的长度
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    // when mocking for SSR, array methods are not hijacked
    if (ob && !ob.shallow && ob.mock) {
      observe(val, false, true)
    }
    return val
  }
  // 判断目标值是否为【对象】， key值 是目标值存在的有效key值，并且不是原型上的key值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  if ((target as any)._isVue || (ob && ob.vmCount)) {
    __DEV__ &&
      warn(
        'Avoid adding reactive properties to a Vue instance or its root $data ' +
          'at runtime - declare it upfront in the data option.'
      )
    return val
  }
  // 如果目标值不是响应式的，那么直接给对应的 key 赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 其他情况，目标值是响应式的，则通过 Object.defineProperty 进行数据监听
  defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock)
  if (__DEV__) {
    ob.dep.notify({
      type: TriggerOpTypes.ADD,
      target: target,
      key,
      newValue: val,
      oldValue: undefined
    })
  } else {
    ob.dep.notify() // 通知更新
  }
  return val
}
```

:::

## 监听数组的变化

Vue.js 内部通过重写 `push` 、 `pop` 、 `shift` 、 `unshift` 、 `splice` 、 `sort` 、 `reverse` 函数的方式进行派发更新。

::: details 监听数组变化

```javascript
/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { TriggerOpTypes } from '../../v3'

import { def } from '../util/index'
// export function def(obj: Object, key: string, val: any, enumerable?: boolean) {
//   Object.defineProperty(obj, key, {
//     value: val,
//     enumerable: !!enumerable,
//     writable: true,
//     configurable: true
//   })
// }

const arrayProto = Array.prototype // 获取数组原型
export const arrayMethods = Object.create(arrayProto)

// 重写以下函数
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method - 缓存原生函数
  const original = arrayProto[method]
  // 重写函数
  def(arrayMethods, method, function mutator(...args) {
    // 调用原生函数获取结果
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    // 调用以下函数时，监听新数据
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    if (__DEV__) {
      ob.dep.notify({
        type: TriggerOpTypes.ARRAY_MUTATION,
        target: this,
        key: method
      })
    } else {
      // 手动派生更新
      ob.dep.notify()
    }
    return result
  })
})

```

:::
