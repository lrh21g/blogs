# async

`async` 就是 `Generator` 函数的语法糖。就是将 `Generator` 函数的星号（*）替换成 `async`，将 `yield` 替换成 `await` ，仅此而已。

`async` 函数的实现原理，就是将 `Generator` 函数和自动执行器，包装在一个函数里。

`async` 函数返回一个 `Promise` 对象，可以使用then方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

+ `async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数。
+ `async` 函数内部抛出错误，会导致返回的 `Promise` 对象变为 `reject` 状态。抛出的错误对象会被 `catch` 方法回调函数接收到。
+ `await` 命令后面是一个 `Promise` 对象，返回该对象的结果。如果不是 `Promise` 对象，就直接返回对应的值。
+ `await` 命令后面是一个 `thenable` 对象（即定义then方法的对象），那么 `await` 会将其等同于 `Promise` 对象。
