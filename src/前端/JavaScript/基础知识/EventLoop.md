# Event Loop

## call-stack 调用栈(执行栈)

JavaScript 调用栈是一种**后进先出**的数据结构。当函数被调用时，会被添加到栈中的顶部，执行完成之后就从栈顶部移出该函数，直到栈内被清空。

栈可存放的函数是有限制的，一旦存放了过多的函数且没有得到释放的话，就会出现爆栈的问题。

## 浏览器的 Event Loop

![async_01](../files/images/async_01.png)

Event Loop 执行顺序：

+ 首先执行同步代码，这属于宏任务
+ 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行
+ 执行所有微任务
+ 当执行完所有微任务后，如有必要会渲染页面
+ 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

示例：

``` javascript
console.log('script start');

setTimeout(function() {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(function() {
  console.log('promise1');
}).then(function() {
  console.log('promise2');
});

console.log('script end');

// script start --> script end --> promise1 --> promise2 --> setTimeout
```

![async_02](../files/images/async_02.gif)

`setTimeout(...)` 设置一个定时器，当定时器到时后，环境会把回调函数放在事件循环中。在未来某个时候的 tick（在事件循环中，每进行一次循环操作称为tick）会摘下并执行这个回调。

严格说来，`setTimeout(..., 0)` 并不直接把项目插入到事件循环队列。定时器会在有机会的时候插入事件。

## Node 中的 Event Loop

`Node` 的 `Event Loop` 分为 6 个阶段，它们会按照顺序反复运行。每当进入某一个阶段的时候，都会从对应的回调队列中取出函数去执行。当队列为空或者执行的回调函数数量到达系统设定的阈值，就会进入下一阶段。

Node的Event loop一共分为6个阶段，每个细节具体如下：

+ `timers`: 执行 `setTimeout` 和 `setInterval` 中到期的 `callback`。
+ `pending callback`: 上一轮循环中少数的 `callback` 会放在这一阶段执行。
+ `idle`, `prepare`: 仅在内部使用。
+ `poll`: 最重要的阶段，执行 `pending callback`，在适当的情况下会阻塞在这个阶段。
+ `check`: 执行 `setImmediate` (`setImmediate()` 是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行 `setImmediate` 指定的回调函数)的 `callback`。
+ `close callbacks`: 执行 `close` 事件的 `callback`，例如 `socket.on('close'[,fn])` 或者 `http.server.on('close, fn)`。

Tick 就代表了 MicroTask（微任务）
![async_03](../files/images/async_03.png)

**`process.nextTick()`**：函数其实是独立于 Event Loop 之外的，它有一个自己的队列，当每个阶段完成后，如果存在 `nextTick` 队列，就会清空队列中的所有回调函数，并且优先于其他 MicroTask（微任务） 执行。
