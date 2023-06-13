# Generator

`Generator` 函数有多种理解角度。

+ 语法上：`Generator` 函数是一个状态机，封装了多个内部状态。还是一个**遍历器对象生成函数**。返回的遍历器对象，可以依次遍历 `Generator` 函数内部的每一个状态。
+ 形式上：`Generator` 函数是一个普通函数，但是有两个特征。
  + `function` 关键字与函数名之间有一个星号
  + 函数体内部使用 `yield` 表达式，定义不同的内部状态

调用 `Generator` 函数后，该函数并不执行，返回的是一个指向内部状态的指针对象。必须调用遍历器对象的 `next` 方法，使得指针移向下一个状态。

**`Generator` 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。**

每次调用遍历器对象的 `next` 方法，就会返回一个有着 `value` 和 `done` 两个属性的对象：

+ `value`属性：表示当前的内部状态的值，是 `yield` 表达式后面那个表达式的值
+ `done`属性：是一个布尔值，表示是否遍历结束。

## API

### yield 表达式

`Generator` 函数，只有调用 `next` 方法时，函数才会执行。

注意：

+ **`yield` 表达式只能用在 `Generator` 函数里面**
+ `yield` 表达式如果用在另一个表达式之中，必须放在圆括号里面。

  ``` javascript
  function* demo() {
    console.log('Hello' + yield); // SyntaxError
    console.log('Hello' + yield 123); // SyntaxError

    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
  }
  ```

+ `yield` 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
  
  ``` javascript
  function* demo() {
    foo(yield 'a', yield 'b'); // OK
    let input = yield; // OK
  }
  ```

遍历器对象的next方法的运行逻辑如下：

+ 遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。
+ 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。
+ 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。
+ 如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined` 。

`yield` 表达式与 `return` 语句的异同：

+ 相似之处：
  + 返回紧跟在语句后面的那个表达式的值
+ 区别：
  + 遇到 `yield`，函数暂停执行，下一次再从该位置继续向后执行；`return`语句不具备位置记忆的功能。
  + 一个函数里面，只能执行一次（或者说一个）`return`语句，但是可以执行多次（或者说多个）`yield` 表达式
  + 正常函数只能返回一个值，因为只能执行一次 `return`；`Generator` 函数可以返回一系列的值，因为可以有任意多个 `yield`。

### 与 Iterator 接口的关系

任意一个对象的 `Symbol.iterator` 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

``` javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]
// Generator 函数赋值给 Symbol.iterator 属性
// 从而使得myIterable对象具有了 Iterator 接口，可以被...运算符遍历了。
```

`Generator` 函数执行后，返回一个遍历器对象。该对象本身也具有 `Symbol.iterator` 属性，执行后返回自身。

``` javascript
function* gen(){}
var g = gen();
g[Symbol.iterator]() === g
// true

// gen是一个 Generator 函数，调用它会生成一个遍历器对象g。
// 它的Symbol.iterator属性，也是一个遍历器对象生成函数，执行后返回它自己。
```

### next 方法的参数

`yield` 表达式本身没有返回值，或者说总是返回 `undefined`。`next` 方法可以带一个参数，该参数就会被当作上一个 `yield` 表达式的返回值。

注意：由于 `next` 方法的参数表示上一个 `yield` 表达式的返回值，所以在第一次使用 `next` 方法时，传递参数是无效的。V8 引擎直接忽略第一次使用 `next` 方法时的参数，只有从第二次使用 `next` 方法开始，参数才是有效的。从语义上讲，第一个 `next` 方法用来启动遍历器对象，所以不用带有参数。

如果想要第一次调用 `next` 方法时，就能够输入值，可以在 `Generator` 函数外面再包一层。

``` javascript
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}
const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});
wrapped().next('hello!')
// First input: hello!
```

### for...of 循环

`for...of` 循环可以自动遍历 `Generator` 函数运行时生成的 `Iterator` 对象，且此时不再需要调用 `next` 方法。

注意：**一旦 `next` 方法的返回对象的 `done` 属性为 `true`，`for...of` 循环就会中止，且不包含该返回对象**

``` javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

### Generator.prototype.throw()

`Generator` 函数返回的遍历器对象，都有一个 `throw` 方法，可以在函数体外抛出错误，然后在 `Generator` 函数体内捕获。

`throw` 方法可以接受一个参数，该参数会被 `catch` 语句接收，建议抛出 `Error` 对象的实例。

`throw` 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 `next` 方法。

`throw` 方法被捕获以后，会附带执行下一条 `yield` 表达式。也就是说，会附带执行一次 `next` 方法。

如果 `Generator` 函数内部没有部署 `try...catch` 代码块，那么throw方法抛出的错误，将被外部 `try...catch` 代码块捕获。

如果 `Generator` 函数内部和外部，都没有部署 `try...catch` 代码块，那么程序将报错，直接中断执行。

一旦 `Generator` 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。如果此后还调用 `next` 方法，将返回一个 `value` 属性等于 `undefined` 、 `done` 属性等于 `true` 的对象，即 JavaScript 引擎认为这个 Generator 已经运行结束了。

``` javascript
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};
var i = g();
i.next();
try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// 内部捕获 a --> 第一个错误被 Generator 函数体内的catch语句捕获。
// 外部捕获 b --> 由于 Generator 函数内部的catch语句已经执行过了，不会再捕捉到这个错误了,所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。
```

### Generator.prototype.return()

可以返回给定的值，并且终结遍历 Generator 函数。

如果 `return` 方法调用时，不提供参数，则返回值的 `value` 属性为 `undefined`。

如果 `Generator` 函数内部有 `try...finally` 代码块，且正在执行 `try` 代码块，那么 `return` 方法会导致立刻进入 `finally` 代码块，执行完以后，整个函数才会结束。

### yield* 表达式

`yield*` 表达式用来在一个 `Generator` 函数里面执行另一个 `Generator` 函数。

从语法角度看，如果 `yield` 表达式后面跟的是一个遍历器对象，需要在 `yield` 表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为 `yield*` 表达式。

## Generator 函数的异步应用

整个 `Generator` 函数就是一个封装的异步任务，或者说是异步任务的容器。异步操作需要暂停的地方，都用 `yield` 语句注明。`Generator` 函数的执行方法如下。

``` javascript
function* gen(x) {
  var y = yield x + 2;
  return y;
}
var g = gen(1);
g.next() // { value: 3, done: false }
g.next() // { value: undefined, done: true }
```

`next` 方法的作用是分阶段执行 `Generator` 函数。每次调用 `next` 方法，会返回一个对象，表示当前阶段的信息（`value`属性和`done`属性）。

+ `value` 属性是： `yield` 语句后面表达式的值，表示当前阶段的值
+ `done` 属性：是一个布尔值，表示 `Generator` 函数是否执行完毕，即是否还有下一个阶段。