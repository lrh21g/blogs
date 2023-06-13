# Promise

## 概述

`Promise`，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

``` javascript
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`Promise`构造函数 接受一个函数作为参数，该函数的两个参数分别是 `resolve` 和 `reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

+ `resolve`函数：将 `Promise`对象 的状态从 **未完成** 变为 **成功**（`pending` --> `resolved`），在异步操作**成功**时调用，并将异步操作的结果，作为参数传递出去。
+ `reject`函数：将 `Promise`对象 的状态从 **未完成** 变为 **失败** （`pending` --> `rejected`），在异步操作**失败**时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例 生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数。`then`方法可以接受两个回调函数作为参数。

+ 第一个回调函数是：`Promise` 对象的状态变为 `resolved` 时调用。
+ 第二个回调函数是：`Promise` 对象的状态变为 `rejected` 时调用。可选的。

特点：

+ **对象的状态不受外界影响**。`Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态
+ **一旦状态改变，就不会再变，任何时候都可以得到这个结果**。`Promise` 对象的状态改变，只有两种可能：从 `pending` 变为 `fulfilled` 和 从 `pending` 变为 `rejected`。

缺点：

+ 无法取消 `Promise`,**一旦新建它就会立即执行**，无法中途取消
  
  ``` javascript
  let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
  });
  promise.then(function() {
    console.log('resolved');
  });
  console.log('Hi!');
  // 输出：Promise  Hi!  resolved
  ```

+ 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
+ 当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

注意：**调用 `resolve`或 `reject` 并不会终结 `Promise` 的参数函数的执行**。

``` javascript
new Promise((resolve, reject) => {
  resolve(1);
  console.log(2);
}).then(r => {
  console.log(r);
});
// 2 1
// 调用resolve(1)以后，后面的console.log(2)还是会执行，并且会首先打印出来。
// 因为立即 resolved 的 Promise 是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
```

## API

### Promise.prototype.then()

`then` 方法是定义在原型对象 `Promise.prototype` 上的。它的作用是为 `Promise` 实例添加状态改变时的回调函数。

`then` 方法返回的是一个**新的 `Promise`实例**（注意，不是原来那个Promise实例）。可以采用链式写法。

### Promise.prototype.catch()

`Promise.prototype.catch()` 方法是 `.then(null, rejection)` 或 `.then(undefined, rejection)` 的别名，用于指定发生错误时的回调函数。

`catch()`方法返回的一个 `Promise` 对象，因此后面还可以接着调用 `then()` 方法。如果没有报错，则会跳过 `catch()` 方法。

+ 如果异步操作抛出错误，状态就会变为`rejected`，就会调用 `catch()` 方法指定的回调函数，处理这个错误。
+ `then()` 方法指定的回调函数，如果运行中抛出错误，会被 `catch()` 方法捕获
+ `promise` 抛出一个错误，或者使用 `reject()` 方法（等同于抛出错误），会被 `catch()` 方法指定的回调函数捕获

`Promise` 对象的错误具有**冒泡性质**，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

如果没有使用 `catch()` 方法指定错误处理的回调函数，`Promise` 对象抛出的错误不会传递到外层代码，即不会有任何反应。

### Promise.prototype.finally()

`finally()` 方法用于指定不管 `Promise` 对象最后状态如何，都会执行的操作。

`finally()` 方法的回调函数不接受任何参数。与状态无关的，不依赖于 `Promise` 的执行结果。

### Promise.all()

`Promise.all()` 方法用于将多个 `Promise` 实例，**包装成一个新的 `Promise` 实例**。

``` javascript
const p = Promise.all([p1, p2, p3]);
```

+ `p1`、`p2`、`p3` 都是 `Promise` 实例，如果不是，就会先调用 `Promise.resolve` 方法，将参数转为 `Promise` 实例，再进一步处理。
+ `Promise.all()` 方法的参数可以不是数组，但必须具有 `Iterator` 接口，且返回的每个成员都是 `Promise` 实例。
+ `p` 的状态由 `p1`、`p2`、`p3` 决定，分成两种情况
  + 只有 `p1`、`p2`、`p3` 的状态都变成 `fulfilled`，`p` 的状态才会变成 `fulfilled`，此时 `p1`、`p2`、`p3` 的返回值组成一个数组，传递给 `p` 的回调函数。
  + 只要 `p1`、`p2`、`p3` 之中有一个被 `rejected`，`p` 的状态就变成 `rejected`，此时**第一个被 `reject` 的实例的返回值**，会传递给p的回调函数。

注意：**如果作为参数的 `Promise` 实例，自己定义了 `catch` 方法，那么它一旦被 `rejected`，并不会触发 `Promise.all()` 的 `catch` 方法**。

### Promise.race()

``` javascript
const p = Promise.race([p1, p2, p3]);
```

只要 `p1`、`p2`、`p3` 之中**有一个实例率先改变状态，`p` 的状态就跟着改变**。那个率先改变的 `Promise` 实例的返回值，就传递给 `p` 的回调函数。

``` javascript
// 如果指定时间内没有获得结果，就将 Promise 的状态变为reject，否则变为resolve。
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000)
  })
]);
p.then(console.log)
.catch(console.error);
```

### Promise.allSettled()

`Promise.allSettled()`方法接受一组 `Promise` 实例作为参数，包装成一个新的 `Promise` 实例。**只有等到所有这些参数实例都返回结果**，不管是`fulfilled`还是`rejected`，包装实例才会结束。

**`Promise.allSettled()`方法返回的新的 `Promise` 实例，一旦结束，状态总是 `fulfilled`，不会变成 `rejected`。**

### Promise.any()

`Promise.any()` 方法接受一组 `Promise` 实例作为参数，包装成一个新的 `Promise` 实例。只要参数实例有一个变成 `fulfilled` 状态，包装实例就会变成 `fulfilled` 状态；如果所有参数实例都变成 `rejected` 状态，包装实例就会变成 `rejected` 状态。

`Promise.any()` 抛出的错误，不是一个一般的错误，而是一个 `AggregateError` 实例。它相当于一个数组，每个成员对应一个被 `rejected` 的操作所抛出的错误。

### Promise.resolve()

`Promise.resolve()` 方法，将现有对象转为 Promise 对象。

注意：**立即 `resolve()` 的 `Promise` 对象，是在本轮“事件循环”（event loop）的结束时执行，而不是在下一轮“事件循环”的开始时。**

`Promise.resolve()` 方法的参数分成四种情况：

+ **参数是一个 Promise 实例**
  
  如果参数是 `Promise` 实例，`Promise.resolve`将不做任何修改、原封不动地返回这个实例。

+ **参数是一个 `thenable` 对象**

  `thenable`对象指的是具有`then`方法的对象。

  ``` javascript
  let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };
  ```

  `Promise.resolve` 方法会将这个对象转为 `Promise` 对象，然后就立即执行 `thenable` 对象的 `then` 方法。

+ **参数不是具有`then`方法的对象，或根本就不是对象**
  
  如果参数是一个原始值，或者是一个不具有 `then` 方法的对象，则 `Promise.resolve` 方法返回一个新的 `Promise` 对象，状态为 `resolved`。

  `Promise.resolve` 方法的参数，会同时传给回调函数。

  ``` javascript
  const p = Promise.resolve('Hello');
  p.then(function (s){
    console.log(s)
  });
  // 由于字符串Hello不属于异步操作（判断方法是字符串对象不具有 then 方法），返回 Promise 实例的状态从一生成就是resolved，所以回调函数会立即执行。
  // Hello
  ```

+ **不带有任何参数**

  `Promise.resolve()` 方法允许调用时不带参数，直接返回一个 `resolved` 状态的 `Promise` 对象。

  ``` javascript
  setTimeout(function () {
    console.log('three');
  }, 0);
  Promise.resolve().then(function () {
    console.log('two');
  });
  console.log('one');

  // one
  // two
  // three

  // 解析：上面代码中，setTimeout(fn, 0)在下一轮“事件循环”开始时执行，Promise.resolve()在本轮“事件循环”结束时执行，console.log('one')则是立即执行，因此最先输出。
  ```

### Promise.reject()

`Promise.reject(reason)`方法返回一个新的 `Promise` 实例，该实例的状态为`rejected`。

注意：**`Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。这一点与`Promise.resolve`方法不一致。**

``` javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};
Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```

## 应用

### 应用 - 加载图片

``` javascript
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};
```

### 应用 - 管理流程

使用 `Generator` 函数管理流程，遇到异步操作的时候，通常返回一个`Promise`对象。

``` javascript
function getFoo () {
  return new Promise(function (resolve, reject){
    resolve('foo');
  });
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
};

function run (generator) {
  const it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(error));
    });
  }

  go(it.next());
}

run(g);
```
