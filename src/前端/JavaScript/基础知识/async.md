# async

## async / await 概述

async 函数是使用 `async` 关键字声明的函数。async 函数是 `AsyncFunction` 构造函数的实例，并且其中允许使用 `await` 关键字。

- `AsyncFunction` 对象为异步函数提供方法。该对象不是全局对象，是 `Function` 的子类型。可以通过 `const AsyncFunction = async function () {}.constructor;` 获取。
- `await` 表达式会暂停整个 `async` 函数的执行进程并出让其控制权，只有当其等待的基于 `Promise` 的异步操作被兑现或被拒绝之后才会恢复进程。

`async` 函数返回一个 `Promise` 对象，可以使用 `then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

- `async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数。如果没有 `return` 则会返回 `undefined` 。
- `async` 函数内部抛出错误，会导致返回的 `Promise` 对象变为 `reject` 状态，抛出的错误对象会被 `catch` 方法回调函数接收到。
- `await` 总会同步地对表达式求值并处理，处理的行为与 `Promise.resolve()` 一致，不属于原生 `Promise` 的值全都会被隐式地转换为 `Promise` 实例后等待。处理的规则为，若表达式：
  - 是一个 `Promise` 对象，则返回等待 `Promise` 对象的结果，该对象的 `then()` 不会被调用。如果不是 `Promise` 对象，就直接返回对应的值。
  - 是一个 `thenable` 对象，等同于 `Promise` 对象。（即，`thenable` 对象实现了 `.then()` 方法，该方法被调用时需要传入两个回调函数，一个用于 `Promise` 被兑现时调用，一个用于 `Promise` 被拒绝时调用。）
  - 不是 `thenable` 对象，会被包装进一个已兑现的 `Promise` 用于等待，其结果就是表达式的值。

```javascript
function resolveAfterOneSeconds(val) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(val)
    }, 1000)
  })
}

class SleepOneSeconds {
  constructor(val) {
    this.val = val
  }
  then(resolve, reject) {
    setTimeout(() => resolve(this.val), 1000)
  }
}

const foo = async function () {
  console.log('[2] fooFunc running')
  const fooA = await 'fooA'
  console.log('[7] fooFunc fooA : ', fooA)
  const fooB = await resolveAfterOneSeconds('fooB')
  console.log('[9] fooFunc fooB : ', fooB)
  

  return [fooA, fooB]
}

const bar = async function () {
  console.log('[5] barFunc running')
  const barA = await 'barA'
  console.log('[8] barFunc barA : ', barA)
  const barB = await new SleepOneSeconds('barB')
  console.log('[11] barFunc barB : ', barB)

  return [barA, barB]
}

console.log('[1] fooFunc before')
foo().then((res) => {
  console.log('[10] fooFunc then res : ', res)
})
console.log('[3] fooFunc after')
console.log('[4] barFunc before')
bar().then((res) => {
  console.log('[12] barFunc then res : ', res)
})
console.log('[6] barFunc after')

// 输出顺序如下：
// [1] fooFunc before
// [2] fooFunc running
// [3] fooFunc after
// [4] barFunc before
// [5] barFunc running
// [6] barFunc after
// [7] fooFunc fooA : fooA
// [8] barFunc barA : barA
// [9] fooFunc fooB : fooB
// [10] fooFunc then res : [ 'fooA', 'fooB' ]
// [11] barFunc barB : barB
// [12] barFunc then res : [ 'barA', 'barB' ]

// 输出顺序流程如下：
// 1、打印 '[1] fooFunc before'
// 2、调用异步函数 foo()
// 3、在 foo() 中，打印 '[2] fooFunc running'
// 4、在 foo() 中，await 关键字暂停执行，为立即可用的值 'fooA' 向消息队列中添加一个任务
// 5、foo() 退出
// 6、打印 '[3] fooFunc after'
// 7、打印 '[4] barFunc before'
// 8、调用异步函数 bar()
// 9、在 bar() 中，打印 '[5] barFunc running'
// 10、在 bar() 中，await 关键字暂停执行，为立即可用的值 'barA' 向消息队列中添加一个任务
// 11、bar() 退出
// 12、打印 '[6] barFunc after'
// 13、同步（顶级）线程代码执行完毕
// 14、JavaScript 运行时，从消息队列中取出已兑现 await 'fooA' 的处理程序，并提供已兑现的值 'fooA'
// 15、JavaScript 运行时，向消息队列中添加一个恢复执行 foo() 函数的任务
// 16、在 foo() 中，打印 '[7] fooFunc fooA : fooA'
// 17、在 foo() 中，await 关键字暂停执行，为 resolveAfterOneSeconds('fooB') 向消息队列中添加一个任务
// 18、JavaScript 运行时，从消息队列中取出已兑现 await 'barA' 的处理程序，并提供已兑现的值 'barA'
// 19、JavaScript 运行时，向消息队列中添加一个恢复执行 bar() 函数的任务
// 20、在 bar() 中，打印 '[8] barFunc barA : barA'
// 21、在 bar() 中，await 关键字暂停执行，为 new SleepOneSeconds('barB') 向消息队列中添加一个任务
// 22、JavaScript 运行时，异步任务完成，从消息队列中取出已兑现 await resolveAfterOneSeconds('fooB') 的处理程序，并提供已兑现的值 'fooB'
// 23、JavaScript 运行时，向消息队列中添加一个恢复执行 foo() 函数的任务
// 24、在 foo() 中，打印 '[9] fooFunc fooB : fooB'
// 25、foo() 返回
// 26、执行 foo() 异步函数的 then 回调，打印 '[10] fooFunc then res : [ 'fooA', 'fooB' ]'
// 22、JavaScript 运行时，异步任务完成，从消息队列中取出已兑现 await new SleepOneSeconds('barB') 的处理程序，并提供已兑现的值 'barB'
// 23、JavaScript 运行时，向消息队列中添加一个恢复执行 bar() 函数的任务
// 24、在 bar() 中，打印 '[11] barFunc barB : barB'
// 25、bar() 返回
// 26、执行 bar() 异步函数的 then 回调，打印 '[12] barFunc then res : [ 'barA', 'barB' ]'
```

```javascript
// 用作 IIFE（立即调用函数表达式） 的异步函数表达式
;(async function (x) {
  const p1 = resolveAfterOneSeconds(20)
  const p2 = resolveAfterOneSeconds(30)
  return x + (await p1) + (await p2)
})(10).then((val) => {
  console.log('IIFE async then val : ', val)
})
// 输出结果：
// 2 秒后打印 60
```

## async / await 使用注意点

- `await` 命令后面的 `Promise` 对象，运行结果可能是 `rejected` ，最好将 `await` 命令放在 `try...catch` 代码块中。

- 多个 `await` 命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。虽然 `Promise` 没有按照顺序执行，但 `await` 按顺序收到了每个 `Promise` 的值。

  ```javascript
  async function delay(val, sec) {
    const delay = sec * 1000
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`${val} finished`)
        resolve(val)
      }, delay)
    })
  }

  // ========== 写法一 ==========
  let [foo, bar] = await Promise.all([
    delay('foo', 2),
    delay('bar', 1),
  ])
  console.log('[foo, bar] : ', [foo, bar])

  // 输出结果如下：
  // bar finished
  // foo finished
  // [foo, bar] : ['foo', 'bar']

  // ========== 写法二 ==========
  let fooPromise = delay('foo', 2)
  let barPromise = delay('bar', 1)
  let foo = await fooPromise
  let bar = await barPromise
  console.log('[foo, bar] : ', [foo, bar])

  // 输出结果如下：
  // bar finished
  // foo finished
  // [foo, bar] : ['foo', 'bar']
  ```

- `await` 关键字只在 `async` 函数内有效。如果在 `async` 函数体之外使用它，就会抛出语法错误 `SyntaxError` 。

- `async` 函数可以保留运行堆栈。

  ```javascript
  const a = () => {
    b().then(() => c())
  }
  ```
  
  - 函数 `a` 内部运行了一个异步任务 `b()`。
  - 当 `b()` 运行的时候，函数 `a()` 不会中断，而是继续执行。
  - 等到 `b()` 运行结束，可能 `a()` 早就运行结束了，`b()` 所在的上下文环境已经消失了。
  - 如果 `b()` 或 `c()` 报错，错误堆栈将不包括 `a()` 。

  ```javascript
  const a = async () => {
    await b()
    c()
  }
  ```

  - `b()` 运行的时候，`a()` 是暂停执行，上下文环境都保存着。
  - 一旦 `b()` 或 `c()` 报错，错误堆栈将包括 `a()`。

## 错误处理

### try...catch

`await` 异步操作出错，等同于 `async` 函数返回的 `Promise` 对象被拒绝 `reject`。防止出错可以将其放在 `try...catch` 代码块之中。

- 不需要在 `await` 异常时进行中断，需要进行非空校验，控制台不会有报错信息。

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

  async function foo() {
    try {
      const firstStepVal = await sleep(100, 'foo', 'reject').catch((err) =>
        console.warn(err)
      )
      console.log('firstStepVal : ', firstStepVal)

      // 执行不中断
      if (!firstStepVal) {
        console.log('firstStepVal 非空校验')
        return
      }
    } catch (err) {
      console.log(err)
    }
  }
  ```

- 需要在 `await` 异常时中断，并且需要在控制台报错。

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

  async function foo() {
    try {
      const firstStepVal = await sleep(100, 'foo', 'reject')

      // 执行中断
      const secondStepVal = await sleep(100, firstStepVal, 'resolve')
      console.log('secondStepVal : ', secondStepVal)
    } catch (err) {
      console.log('foo err : ', err)
    }
  }

  // 使用 try...catch 结构，实现多次重复尝试
  const NUM_RETRIES = 3
  async function bar() {
    let i
    for (i = 0; i < NUM_RETRIES; ++i) {
      try {
        await sleep(100, 'bar', 'reject')
        break
      } catch (err) {
        console.log('bar err : ', err)
      }
    }
  }
  ```

- 需要在 `await` 异常时中断，但不需要在控制台报错。

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

  async function foo() {
    try {
      const firstStepVal = await sleep(100, 'foo', 'reject').catch(err => {
        console.warn('firstStepVal err', err)
        return Promise.reject(err)
      })

      // 执行中断
      const secondStepVal = await sleep(100, firstStepVal, 'resolve')
      console.log('secondStepVal : ', secondStepVal)
    } catch (err) {
      console.log('foo err : ', err)
    }
  }
  ```

### await-to-js

`await-to-js` 使用示例：

```javascript
import to from 'await-to-js'
// If you use CommonJS (i.e NodeJS environment), it should be:
// const to = require('await-to-js').default;

async function asyncTaskWithCb(cb) {
  let err, user, savedTask, notification

  ;[err, user] = await to(UserModel.findById(1))
  if (!user) return cb('No user found')

  ;[err, savedTask] = await to(
    TaskModel({ userId: user.id, name: 'Demo Task' })
  )
  if (err) return cb('Error occurred while saving task')

  if (user.notificationsEnabled) {
    ;[err] = await to(
      NotificationService.sendNotification(user.id, 'Task Created')
    )
    if (err) return cb('Error while sending notification')
  }

  if (savedTask.assignedUser.id !== user.id) {
    ;[err, notification] = await to(
      NotificationService.sendNotification(
        savedTask.assignedUser.id,
        'Task was created for you'
      )
    )
    if (err) return cb('Error while sending notification')
  }

  cb(null, savedTask)
}

async function asyncFunctionWithThrow() {
  const [err, user] = await to(UserModel.findById(1))
  if (!user) throw new Error('User not found')
}
```

`await-to-js` 使用源码：

```typescript
export function to<T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt)
        return [parsedError, undefined]
      }

      return [err, undefined]
    })
}

export default to
```

## async 函数实现原理

`async` 函数是 `Generator` 函数的语法糖，将 `Generator` 函数的星号（*）替换成 `async`，将 `yield` 替换成 `await`。

`async` 函数的实现原理是将 `Generator` 函数和自动执行器，包装在一个函数里。

```javascript
async function fn(args) {
  // ...
}

// ========== 等同于 ==========

function fn(args) {
  return spawn(function* () {
    // ...
  })
}

function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF()
    function step(nextF) {
      let next
      try {
        next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v)
          })
        },
        function (e) {
          step(function () {
            return gen.throw(e)
          })
        }
      )
    }
    step(function () {
      return gen.next(undefined)
    })
  })
}
```
