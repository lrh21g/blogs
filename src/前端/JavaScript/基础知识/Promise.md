# Promise

## Promise 的状态

`Promise` 对象表示异步操作最终的完成（或失败）以及其结果值。`Promise` 是一个有状态的对象，必然处于以下几种状态之一：

- **待定（`pending`）** ：初始状态，既没有被兑现，也没有被拒绝。
- **已兑现（`fulfilled`，也称为“解决”，`resolved`）** ：意味着操作成功完成。
- **已拒绝（`rejected`）** ：意味着操作失败。

在待定（`pending`）状态下，`Promise` 可以落定（`settled`）为代表成功的兑现（`fulfilled`）状态，或者代表失败的拒绝（`rejected`）状态。

- **无论落定为哪种状态都是不可逆的**。只要从待定转换为兑现或拒绝， `Promise` 的状态就不再改变。
- 不能保证 `Promise` 必然会脱离待定状态。因此，组织合理的代码无论 `Promise` 是解决（`resolve`）还是拒绝（`reject`），甚至永远处于待定（`pending`）状态，都应该具有恰当的行为。

**`Promise` 的状态是私有的**，不能直接通过 JavaScript 检测到以及被外部 JavaScript 代码修改。主要是为了避免根据读取到的 `Promise` 状态，以同步方式处理 `Promise` 对象。

## Promise 构造函数

```javascript
const promiseInstance = new Promise(function (resolve, reject) {
  if (/* 异步操作成功 */) {
    resolve(res)
  } else {
    reject(err)
  }
})
promiseInstance.then(
  (res) => { /* onResolved 处理程序 */ },
  (err) => { /* onRejected 处理程序 */ }
)
```

`new Promise(executor)` 通过 `new` 关键字调用 `Promise` 构造函数时，它会返回一个 `Promise` 对象。构造函数接受一个函数（`executor`）作为参数。

- `executor` 函数接受两个参数分别是 `resolve` 和 `reject` 函数。

  - `resolve` 函数：将 `Promise` 对象的状态从 **待定（`pending`）** 变为 **已兑现（`resolved`）**。在异步操作成功时调用，并将异步操作的结果，作为参数传递出去。

    `resolve` 函数的参数除了异步操作的结果，还可能是另外一个 `Promise` 对象（即，一个异步操作的结果是返回另一个异步操作）。示例如下：

    ```javascript
    const p1 = new Promise(function (resolve, reject) {
      // ...
    })

    const p2 = new Promise(function (resolve, reject) {
      // ...
      resolve(p1)
    })

    // p1 和 p2 都是 Promise 对象，p2 的 resolve 方法将 p1 作为参数
    // 此时，p1 的状态就会传递给 p2，即 p1 的状态决定了 p2 的状态
    // > p1 的状态是 pending，则 p2 的回调函数就会等待 p1 的状态改变
    // > p1 的状态已经是 resolved 或者 rejected，则 p2 的回调函数将会立刻执行
    ```

  - `reject` 函数：将 `Promise` 对象的状态从 **待定（`pending`）** 变为 **已拒绝（`rejected`）**。在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。参数通常是 `Error` 对象的实例，表示抛出的错误。

- **调用 `resolve` 函数或 `reject` 函数并不会终结 `Promise` 的参数函数的执行**。调用 `resolve` 函数或 `reject` 函数之后，后继操作应该放到 `then` 方法里面，不应该直接写在 `resolve` 函数或 `reject` 函数的后面。所以，最好在它们前面加上 `return` 语句。

  ```javascript
  new Promise((resolve, reject) => {
    resolve(1)
    console.log(2) // resolve 后的代码继续执行，并且会立即执行
  }).then((err) => {
    console.log(err)
  })

  // 输出顺序如下：
  // 2
  // 1

  new Promise((resolve, reject) => {
    return resolve(1)
    // 后续的代码不会执行
    console.log(2)
  })
  ```

- 如果 `executor` 函数抛出错误，则 `Promise` 被拒绝。如果 `resolve` 函数或 `reject` 函数中的一个已经被调用（`Promise` 已经被解决），则忽略该错误。

- **`Promise` 无法取消，一旦新建就会立即执行，无法中途取消**。

  ```javascript
  let promise = new Promise(function (resolve, reject) {
    console.log('Promise')
    resolve()
  })
  promise.then(function () {
    console.log('resolved')
  })
  console.log('Hi!')

  // Promise
  // Hi!
  // resolved
  ```

- 如果不设置回调函数，`Promise` 内部抛出的错误，不会反应到外部。

`Promise` 对象生成以后，可以用 `then` 方法分别指定 `resolved` 状态和 `rejected` 状态的回调函数。`then` 方法可以接受两个回调函数作为参数。

- `onResolved` 回调函数：`Promise` 对象的状态变为 **已兑现（`resolved`）** 时调用。
- `onRejected` 回调函数：可选。`Promise` 对象的状态变为 **已拒绝（`rejected`）** 时调用。

## Promise 实例方法

### Promise.prototype.then()

`then()` 方法用于为 `Promise` 对象添加状态改变时的回调函数。

- `then(onResolved, onRejected)` 方法最多接受两个参数，用于 `Promise` 兑现和拒绝情况的回调函数。

  - `onResolved(result)` 回调函数：`Promise` 对象 **被兑现时** 异步执行的函数。`result` 为 `Promise` 对象的兑现值，函数返回值将成为 `then()` 返回 `Promise` 对象的兑现值。
  - `onRejected(error)` 回调函数：`Promise` 对象 **被拒绝时** 异步执行的函数。`error` 为 `Promise` 对象被拒绝的值，函数返回值将成为 `catch()` 返回 `Promise` 对象的兑现值。

- `then()` 方法返回一个 **新的 `Promise` 对象**，从而实现链式调用。返回的 `Promise` 对象的行为取决于处理函数的执行结果，遵循一组特定的规则。
  - 返回一个值：`Promise` 对象以该返回值作为其兑现值。
  - 没有返回任何值：`Promise` 对象以 `undefined` 作为其兑现值。
  - 抛出一个错误：`Promise` 对象抛出的错误作为其拒绝值。
  - 返回一个已兑现的 `Promise` 对象：`Promise` 对象以该 `Promise` 的值作为其兑现值。
  - 返回一个已拒绝的 `Promise` 对象：`Promise` 对象以该 `Promise` 的值作为其拒绝值。
  - 返回另一个待定的 `Promise` 对象：`Promise` 对象保持待定状态，并在该 `Promise` 对象被兑现/拒绝后立即以该 `Promise` 的值作为其兑现/拒绝值。

### Promise.prototype.catch()

`catch()` 方法是 `.then(null, onRejected)` 或 `.then(undefined, onRejected)` 的别名，用于 `Promise` 实例被拒绝时调用的函数。

- `catch(onRejected)` 方法接受一个 `onRejected(error)` 回调函数参数，用于 `Promise` 对象 **被拒绝时** 异步执行的函数。`error` 为 `Promise` 对象被拒绝的值。
- `catch()` 方法返回的是一个 **新的 `Promise` 对象**，从而实现链式调用。

以下场景均会被 `catch()` 捕获：

- 异步操作抛出错误，`Promise` 对象状态改变为 **已拒绝（`rejected`）**
- `then()` 方法运行指定回调函数中抛出错误
- `Promise` 抛出一个错误，或者使用 `reject()` 方法（等同于抛出错误）

`Promise` 对象的错误具有**冒泡性质**，会一直向后传递，直到被捕获为止。即，错误总是会被下一个 `catch` 语句捕获。

```javascript
getJSON('/post/1.json')
  .then(function (post) {
    return getJSON(post.commentURL)
  })
  .then(function (comments) {
    // some code
  })
  .catch(function (error) {
    // 处理前面三个 Promise 产生的错误
    // 任何一个抛出的错误，都会被最后一个 catch() 捕获
  })
```

如果没有使用 `catch()` 方法指定错误处理的回调函数，`Promise` 对象抛出的错误不会传递到外层代码，即不会有任何反应。

- 一般建议，在 `Promise` 对象后使用 `catch()` 方法，可以捕获 `Promise` 内部的错误。
- `catch()` 方法返回一个 **新的 `Promise` 对象**，所以可以紧接着调用 `then()` 方法。如果没有报错，则会跳过 `catch()` 方法。

```javascript
const someAsyncThing = function () {
  return new Promise(function (resolve, reject) {
    // 下面一行会报错，因为 x 没有声明
    resolve(x + 2)
  })
}
someAsyncThing().then(function () {
  console.log('everything is great')
})
setTimeout(() => {
  console.log(123)
}, 2000)

// someAsyncThing() 函数产生的 Promise 对象，内部有语法错误
// 但，不会退出进程、终止脚本执行。2 秒后继续输出 123
// 输出结果如下：
// Uncaught (in promise) ReferenceError: x is not defined
// 123

const promise = new Promise(function (resolve, reject) {
  resolve('ok')
  setTimeout(function () {
    throw new Error('test')
  }, 0)
})
promise.then(function (value) {
  console.log(value)
})

// Promise 指定在下一轮 “事件循环” 再抛出错误
// 下一轮 “事件循环” 执行时， Promise 运行已经结束，
// 则该错误会在 Promise 函数体外抛出，冒泡到最外层，成了未捕获的错误
// 输出结果如下：
// ok
// Uncaught Error: test

```

### Promise.prototype.finally()

`finally()` 方法用于 `Promise` 敲定状态（`resolved` 或 `rejected`）时调用的回调函数。

- `finally(onFinally)` 方法法接受一个 `onFinally` 回调函数参数，该回到函数不带任何参数。
- `finally()` 方法立即返回一个等效的 `Promise` 对象，从而实现链式调用。处理程序的返回值不会影响原始 `Promise` 的状态。

`finally()` 方法本质上是 `then()` 方法的特例：

```javascript
promise.finally(() => {
  // 语句
})

// 等同于
promise.then(
  (result) => {
    // 语句
    return result
  },
  (error) => {
    // 语句
    throw error
  }
)
```

`finally()` 方法的实现：

```javascript
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}
```

`finally()` 方法总是会返回原来的值：

```javascript
// resolve 的值是 undefined
Promise.resolve(2).then(
  () => {},
  () => {}
)

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(
  () => {},
  () => {}
)

// reject 的值是 3
Promise.reject(3).finally(() => {})
```

## API

### Promise.all()

`Promise.all(iterable)` 方法接受一个 `Promise` 可迭代对象 `iterable` 作为输入，并返回一个 `Promise`。可用于聚合多个 `Promise` 的结果，任何一个输入的 `Promise` 被拒绝时立即拒绝。通常在有多个相关的异步任务并且整个代码依赖于这些任务成功完成时使用。

- `iterable` 参数：一个 `Promise` 可迭代对象（例如 `Array`）。如果 `iterable` 包含非 `Promise` 的值，将会被忽略，但仍包含在返回的 `Promise` 数值中。
- 方法返回一个 `Promise`，其状态为：
  - **已兑现（already fulfilled）**，如果传入的 `iterable` 为空。
  - **异步兑现（asynchronously fulfilled）**
    - 如果给定的 `iterable` 中所有的 `Promise` 都已兑现。返回的兑现值是一个与传入的 `Promise` 顺序一致的数组。
    - 如果传入的 `iterable` 是一个非空但不包含待定的 `Promise`，返回的 `Promise` 依然是异步兑现，而非同步兑现。
  - **异步拒绝（asynchronously rejected）**
    - 如果给定的 `iterable` 中任意 `Promise` 被拒绝，拒绝的原因是第一个拒绝的 `Promise` 的拒绝原因。

注意：**如果作为参数的 `Promise` 实例，自己定义了 `catch` 方法，那么它一旦被 `rejected`，并不会触发 `Promise.all()` 的 `catch` 方法**。

```javascript
const p1 = Promise.resolve()
const p2 = Promise.resolve('p2')
const p3 = 'p3'
const p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p4')
  }, 100)
})
Promise.all([p1, p2, p3, p4]).then((values) => {
  console.log(values) // [undefined, 'p2', 'p3', 'p4']
})

// 所有的值都不是 Promise，因此返回的 Promise 将被兑现
const p1 = Promise.all([1, 2, 3])
// 输入中唯一的 Promise 已经被兑现，因此返回的 Promise 将被兑现
const p2 = Promise.all([1, 2, 3, Promise.resolve(4)])
// 一个（也是唯一的一个）输入 Promise 被拒绝，因此返回的 Promise 将被拒绝
const p3 = Promise.all([1, 2, 3, Promise.reject(5)])
// 使用 setTimeout，可以在队列为空后执行代码
setTimeout(() => {
  console.log(p1) // Promise {<fulfilled>: Array(3)}
  console.log(p2) // Promise {<fulfilled>: Array(4)}
  console.log(p3) // Promise {<rejected>: 555}
})

const p1 = new Promise((resolve, reject) => {
  resolve('hello')
})
  .then((result) => result)
  .catch((e) => e)
const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了')
})
  .then((result) => result)
  .catch((e) => e)
Promise.all([p1, p2])
  .then((result) => console.log('Promise.all then : ', result))
  .catch((e) => console.log('Promise.all then : ', e))
// 输出结果如下：
// Promise.all then :  [ 'hello', Error: 报错了 ]
```

### Promise.race()

`Promise.race(iterable)` 方法接受一个 `Promise` 可迭代对象 `iterable` 作为输入，并返回一个 `Promise`。**返回的 `Promise` 会随着第一个 `Promise` 的敲定（`resolved` 或 `rejected`）而敲定。**

- `iterable` 参数：一个 `Promise` 可迭代对象（例如 `Array`）。
- 方法返回一个 `Promise`，会以 `iterable` 中第一个敲定的 `Promise` 的状态异步敲定。
  - 如果第一个敲定的 `Promise` 被兑现，那么返回的 `Promise` 也会被兑现。
  - 如果第一个敲定的 `Promise` 被拒绝，那么返回的 `Promise` 也会被拒绝。
  - 如果传入的 `iterable` 为空，返回的 `Promise` 就会一直保持待定状态。
  - 如果传入的 `iterable` 非空但其中没有任何一个 `Promise` 是待定状态，返回的 `Promise` 仍会异步敲定（而不是同步敲定）。

```javascript
function sleep(time, value, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'resolve') {
        return resolve(value)
      } else {
        return reject(new Error(value))
      }
    }, time)
  })
}

const p1_100ms_resolve = sleep(100, 'p1_value_resolve', 'resolve')
const p2_200ms_resolve = sleep(200, 'p2_value_resolve', 'resolve')
const p3_300ms_reject = sleep(300, 'p3_value_reject', 'reject')
const p4_100ms_reject = sleep(100, 'p4_value_reject', 'reject')

Promise.race([p1_100ms_resolve, p2_200ms_resolve]).then((res) => {
  console.log('[p1, p2] race res : ', res)
  // [p1, p2] race res : p1_value_resolve
})

Promise.race([p2_200ms_resolve, p3_300ms_reject]).then((res) => {
  console.log('[p2, p3] race res : ', res)
  // [p2, p3] race res : p2_value_resolve
})

Promise.race([p2_200ms_resolve, p4_100ms_reject]).then(
  (res) => {
    // 不会被调用
    console.log('[p2, p4] race res : ', res)
  },
  (err) => {
    console.log('[p2, p4] race err : ', err.message)
    // [p2, p4] race err : p4_value_reject
  }
)
```

```javascript
const foreverPendingPromise = Promise.race([])
console.log(foreverPendingPromise)

setTimeout(() => {
  console.log('此时堆栈为空')
  console.log(foreverPendingPromise)
})

// 输出顺序如下 :
// Promise {<pending>}
// 此时堆栈为空
// Promise {<pending>}
```

注：如果可迭代对象中包含一个或多个非 `Promise` 值和/或已敲定的 `Promise`，则 `Promise.race()` 将以可迭代对象中找到的第一个此类值敲定。

```javascript
const foreverPendingPromise = Promise.race([])
const alreadyFulfilledProm = Promise.resolve(100)

const arr = [foreverPendingPromise, alreadyFulfilledProm, '非 Promise 值']
const arr2 = [foreverPendingPromise, '非 Promise 值', Promise.resolve(100)]
const p1 = Promise.race(arr)
const p2 = Promise.race(arr2)

console.log(p1)
console.log(p2)
setTimeout(() => {
  console.log('此时堆栈为空')
  console.log(p1)
  console.log(p2)
})

// 输出顺序如下：
// Promise {<pending>}
// Promise {<pending>}
// 此时堆栈为空
// Promise {<fulfilled>: 100}
// Promise {<fulfilled>: '非 Promise 值'}
```

### Promise.allSettled()

`Promise.allSettled(iterable)` 方法接受一个 `Promise` 可迭代对象 `iterable` 作为输入，并返回一个 `Promise`。**当所有输入的 `Promise` 都已敲定（`resolved` 或 `rejected`）时（包括传入空的可迭代对象时），返回的 `Promise` 将被兑现，并带有描述每个 `Promise` 结果的对象数组。**

- `iterable` 参数：一个 `Promise` 可迭代对象（例如 `Array`）。
- 方法返回一个 `Promise`，其状态为：
  - **已兑现（already fulfilled）**，如果传入的 `iterable` 为空的话。
  - **异步兑现（asynchronously fulfill）**
    - 当给定的 `iterable` 中所有 `Promise` 已经敲定时（`resolved` 或 `rejected`）。返回的兑现值是一个与传入的 `Promise` 顺序一致的对象数组。
      - `{ status: 'fulfilled', value: value }` ：`Promise` 状态为 `"fulfilled"` 时返回的对象，`value` 为 `Promise` 兑现的值。
      - `{ status: 'rejected', reason: reason }` ：`Promise` 状态为 `"rejected"` 时返回的对象，`reason` 为 `Promise` 拒绝的原因。
    - 如果传入的 `iterable` 非空但不包含任何一个 `Promise` 是待定状态，返回的 `Promise` 仍会异步敲定（而不是同步敲定）。

```javascript
Promise.allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error('一个错误')),
]).then((values) => console.log(values))

// 输出结果如下：
// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: 一个错误 }
// ]
```

### Promise.any()

`Promise.any(iterable)` 方法接受一个 `Promise` 可迭代对象 `iterable` 作为输入，并返回一个 `Promise`。**一旦有一个 `Promise` 兑现，它就会立即返回，因此不会等待其他 `Promise` 完成。**

- `iterable` 参数：一个 `Promise` 可迭代对象（例如 `Array`）。
- 方法返回一个 `Promise`，其状态为：
  - **已拒绝（already rejected）**，如果传入的 `iterable` 为空的话。
  - **异步兑现（asynchronously fulfilled）**，当给定的 `iterable` 中的任何一个 `Promise` 被兑现时，返回的 `Promise` 就会被兑现。其兑现值是第一个兑现的 `Promise` 的兑现值。
  - **异步拒绝（asynchronously rejected）**
    - 当给定的 `iterable` 中的所有 `Promise` 都被拒绝时。拒绝原因是一个 `AggregateError` 对象（代表了包装了多个错误对象的单个错误对象），其中 `errors` 属性包含一个与传入的 `Promise` 顺序一致的拒绝原因数组。
    - 如果传递的 `iterable` 是非空的，但不包含待定的 `Promise`，则返回的 `Promise` 仍然是异步拒绝的（而不是同步拒绝的）。

```javascript
function sleep(time, value, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'resolve') {
        return resolve(value)
      } else {
        return reject(new Error(value))
      }
    }, time)
  })
}

const p1_100ms_resolve = sleep(100, 'p1_value_resolve', 'resolve')
const p2_200ms_resolve = sleep(200, 'p2_value_resolve', 'resolve')
const p3_300ms_reject = sleep(300, 'p3_value_reject', 'reject')
const p4_100ms_reject = sleep(100, 'p4_value_reject', 'reject')

Promise.any([p1_100ms_resolve, p2_200ms_resolve, p3_300ms_reject]).then(
  (value) => {
    console.log('[p1, p2, p3] any res : ', value)
    // [p1, p2, p3] any res :  p1_value_resolve
  }
)

Promise.any([p3_300ms_reject, p4_100ms_reject])
  .then((value) => {
    console.log('[p3, p4] any res : ', value)
  })
  .catch((err) => {
    console.log('[p1, p2, p3] any err : ', err)
    // [p1, p2, p3] any err :  AggregateError: All promises were rejected
    console.log(err.errors)
    // [Error: p3_value_reject, Error: p4_value_reject]
  })
```

### Promise.resolve()

`Promise.resolve(value)` 方法将给定的值 `value` 转换为一个 `Promise`。

- 如果 `value` 本身就是一个 `Promise`，那么该 `Promise` 将被返回。

  `Promise.resolve()` 方法会重用已存在的 `Promise` 实例。如果它正在解决一个原生的 `Promise`，它将返回同一 `Promise` 实例，而不会创建一个封装对象。

  ```javascript
  const original = Promise.resolve(33)
  const cast = Promise.resolve(original)
  cast.then((value) => {
    console.log(`cast then : `, value)
  })
  console.log(`original === cast : `, original === cast)

  // 输出顺序如下：
  // original === cast : true
  // cast then : 33
  ```

- 如果 `value` 是一个 `thenable` 对象，`Promise.resolve()` 将调用其 `then()` 方法及其两个回调函数。

  `thenable` 对象实现了 `.then()` 方法，该方法被调用时需要传入两个回调函数，一个用于 `Promise` 被兑现时调用，一个用于 `Promise` 被拒绝时调用。

  对于嵌套的 `thenable` 对象将被“深度展平”为单个 `Promise` 对象。

  不要在一个解决为自身的 `thenable` 对象上调用 `Promise.resolve()`。这将导致无限递归，因为它试图展平一个无限嵌套的 `Promise`。

  ```javascript
  let thenable = {
    then: function (resolve, reject) {
      resolve(42)
    },
  }

  let p1 = Promise.resolve(thenable)
  p1.then(function (value) {
    console.log(value) // 42
  })
  ```

  ```javascript
  const nestedThenable = {
    then(onFulfilled, onRejected) {
      onFulfilled({
        // 该 thenable 对象将兑现为另一个 thenable 对象
        then(onFulfilled, onRejected) {
          onFulfilled(42)
        },
      })
    },
  }

  Promise.resolve(nestedThenable).then((value) => {
    console.log(value) // 42
  })

  const nestedFulfilledThenable = {
    then(onFulfilled, onRejected) {
      onFulfilled(thenable)
    },
  }

  // 将会导致无限递归
  Promise.resolve(nestedFulfilledThenable)
  ```

- 如果 `value` 不是一个 `thenable` 对象，返回的 `Promise` 将会以 `value` 值兑现。

  ```javascript
  const p = Promise.resolve('Hello')

  p.then(function (s) {
    console.log(s) // Hello
  })
  ```

- `Promise.resolve()` 不带任何参数，直接返回一个 `resolved` 状态的 `Promise` 对象。

  **立即 `resolve()` 的 `Promise` 对象，是在本轮“事件循环”（event loop）的结束时执行**，而不是在下一轮“事件循环”的开始时。

  ```javascript
  setTimeout(function () {
    console.log('[3] setTimeout')
  }, 0)

  Promise.resolve().then(function () {
    console.log('[2] Promise.resolve then')
  })

  console.log('[1] console.log')

  // 输出顺序如下：
  // [1] console.lo
  // [2] Promise.resolve the
  // [3] setTimeout

  // setTimeout(fn, 0) 在下一轮 “事件循环” 开始时执行
  // Promise.resolve() 在本轮 “事件循环” 结束时执行
  // console.log() 则是立即执行，因此最先输出
  ```

### Promise.reject()

`Promise.reject(reason)` 方法返回一个已拒绝（`rejected`）的 `Promise` 对象，拒绝原因为给定的参数 `reason`。通过使用 `Error` 的实例获取错误原因 `reason` 对调试和选择性错误捕捉很有帮助。

注意：与 `Promise.resolve()` 不同，即使 `reason` 已经是一个 `Promise` 对象，`Promise.reject()` 方法也始终会将其封装在一个新的 `Promise` 对象中。

```javascript
Promise.reject(new Error('失败')).then(
  () => {
    // 不会被调用
  },
  (error) => {
    console.error('error : ', error)
    // error :  Error: 失败
  }
)
```

```javascript
// reject 一个 Promise 对象
const resolvedPromise = Promise.resolve(1)
const rejectedPromise = Promise.reject(resolvedPromise)

console.log(rejectedPromise === resolvedPromise) // false
rejectedPromise.catch((error) => {
  console.log(error === resolvedPromise) // true
})
```

## Promise 应用

### 加载图片

```javascript
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image()
    image.onload = resolve
    image.onerror = reject
    image.src = path
  })
}
```

### 与 Generator 函数结合管理流程

使用 `Generator` 函数管理流程，遇到异步操作的时候，通常返回一个`Promise`对象。

```javascript
function getFoo() {
  return new Promise(function (resolve, reject) {
    resolve('foo')
  })
}

const g = function* () {
  try {
    const foo = yield getFoo()
    console.log(foo)
  } catch (e) {
    console.log(e)
  }
}

function run(generator) {
  const it = generator()

  function go(result) {
    if (result.done) return result.value

    return result.value.then(
      function (value) {
        return go(it.next(value))
      },
      function (error) {
        return go(it.throw(error))
      }
    )
  }

  go(it.next())
}

run(g)
```

## Promise.try()

Promise 库 `Bluebird` 、 `Q` 、 `when` 和 `es6-promise-try` 提供了 `Promise.try()` API ，让同步函数同步执行，异步函数异步执行。

```javascript
var Promise = require('bluebird')

function getUsername(userId) {
  return Promise.try(function () {
    return database.users.get({ id: userID })
  }).then(function (user) {
    return user.name
  }).catch(err => {
    return ''
  })
}
```

`Promise.try()` 的其他实现方式

- 使用 `async` 函数

```javascript
const func = () => console.log('now')
// 立即执行匿名函数，会立即执行里面的 async 函数
// > 如果 func 是同步的，就会得到同步的结果
// > 如果 func 是异步的，可以使用 then 指定下一步
// async () => fun() 会吃掉 fun() 抛出的错误，捕获错，要使用 Promise.catch 方法。
;(async () => func())()
  .then((res) => {
    // ...
  })
  .catch((err) => {
    // ...
  })

console.log('next')

// 输出顺序如下：
// now
// next
```

- 使用 `new Promise()`

```javascript
const func = () => console.log('now')
;(() => new Promise((resolve) => resolve(func())))()
console.log('next')

// 输出顺序如下：
// now
// next
```
