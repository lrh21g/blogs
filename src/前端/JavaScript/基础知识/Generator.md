# Generator

## Generator 概述

`Generator` 对象由生成器函数（`function* name([param[, param[, ... param]]]) { statements }`）返回并且它符合可迭代协议和迭代器协议。

- `Generator` 对象是一个**状态机**，封装了多个内部状态。
- `Generator` 对象是一个**迭代器对象**，可以依次遍历 `Generator` 对象内部的每一个状态。
- `Generator` 对象是一个**普通函数**，包含特征如下：
  - `function` 关键字后跟一个星号： `function* name([param[, param[, ... param]]]) { statements }` 。
  - 函数体内部使用 `yield` 表达式，定义不同的内部状态。

可以使用构造函数 `GeneratorFunction` 或  `function*` 定义一个生成器函数（generator function），返回一个 `Generator` 对象。

- 构造函数 `GeneratorFunction`

  ```javascript
  const GeneratorFunction = function* () {}.constructor
  // new GeneratorFunction(arg0, arg1, /* … ,*/ argN, functionBody)
  const gen = new GeneratorFunction('a', 'yield a * 2')

  const iterator = gen(10)
  iterator.next() // { value: 20, done: false }
  iterator.next() // { value: undefined, done: true }
  ```

- `function*` 声明

  ```javascript
  function* helloWorldGenerator() {
    yield 'hello'
    yield 'world'
    return 'ending'
  }

  var hwGenerator = helloWorldGenerator()

  hwGenerator.next() // { value: 'hello', done: false }
  hwGenerator.next() // { value: 'world', done: false }
  hwGenerator.next() // { value: 'ending', done: true }
  hwGenerator.next() // { value: undefined, done: true }

  // 其他形式：作为对象属性
  let obj = {
    * myGeneratorMethod() {
    }
  }
  ```

调用 `Generator` 函数后并不会立即执行，会返回一个生成器的迭代器（iterator）对象。

- 每次调用 `next` 方法，会从函数头部或上一次停下来的地方开始执行，直到遇到下一个 `yield` 表达式（或 `return` 语句）为止。**`Generator` 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。**
- 每次调用迭代器对象的 `next` 方法，会返回一个具有 `value` 和 `done` 两个属性的对象。
  - `value`属性：表示当前的内部状态的值，是 `yield` 表达式后面那个表达式的值。
  - `done`属性：布尔值，表示是否遍历结束。

与 `Iterator` 接口的关系

- 任意一个对象的 `Symbol.iterator` 方法，等于该对象的迭代器生成函数，调用该函数会返回该对象的一个迭代器对象。

  ```javascript
  const myIterable = {}

  myIterable[Symbol.iterator] = function* () {
    yield 1
    yield 2
    yield 3
  }

  console.log([...myIterable]) // [1, 2, 3]

  // Generator 函数赋值给 Symbol.iterator 属性
  // 从而使得 myIterable 对象具有了 Iterator 接口，可以被 ... 运算符遍历了
  ```

- `Generator` 函数执行后，返回一个迭代器对象。该对象本身也具有 `Symbol.iterator` 属性，执行后返回自身。

  ```javascript
  function* generator() {}

  const gen = generator()
  gen[Symbol.iterator]() === gen // true

  // generator 是一个 Generator 函数，调用它会生成一个迭代器对象 gen 。
  // 它的 Symbol.iterator 属性，也是一个迭代器对象生成函数，执行后返回它自己。
  ```

- `for...of` 循环可以自动遍历 `Generator` 函数运行时生成的 `Iterator` 对象，且此时不再需要调用 `next` 方法。

  注意：**一旦 `next` 方法的返回对象的 `done` 属性为 `true`，`for...of` 循环就会中止，且不包含该返回对象**

  ```javascript
  function* numbersGenerator() {
    yield 1
    yield 2
    return 3
    yield 4
  }

  const numbersGen = numbersGenerator()

  console.log([...numbersGenerator()]) // [ 1, 2 ]
  console.log(Array.from(numbersGenerator())) // [ 1, 2 ]

  const [x, y] = numbersGenerator()
  console.log([x, y]) // [ 1, 2 ]

  for (let n of numbersGenerator()) {
    console.log(n)
  }
  // 1 2
  ```

  ```javascript
  function* objectEntries() {
    let propKeys = Object.keys(this)

    for (let propKey of propKeys) {
      yield [propKey, this[propKey]]
    }
  }

  let jane = { first: 'Jane', last: 'Doe' }

  jane[Symbol.iterator] = objectEntries

  for (let [key, value] of jane) {
    console.log(`${key}: ${value}`)
  }

  // first: Jane
  // last: Doe
  ```

## Generator API

### Generator.prototype.next()

`gen.next(value)` 方法返回一个包含属性 `done` 和 `value` 的对象。

- 参数 `value` ： 向生成器传递的值。
- 返回值 ： 返回一个包含属性 `done` 和 `value` 的对象。
  - `done` 属性
    - 如果迭代器超过迭代序列的末尾，则为 `true` 。
    - 如果迭代器能够生成序列中的下一个值，则为 `false` 。
  - `value` 属性：迭代器返回的任意 JavaScript 值。当 `done` 属性值为 `true` 时，`value` 为 `undefined` 。

由于 `next` 方法的参数表示上一个 `yield` 表达式的返回值，所以在第一次使用 `next` 方法时，传递参数是无效的。V8 引擎直接忽略第一次使用 `next` 方法时的参数，只有从第二次使用 `next` 方法开始，参数才是有效的。从语义上讲，第一个 `next` 方法用来启动迭代器对象，所以不用带有参数。

如果想要第一次调用 `next` 方法时，就能够输入值，可以在 `Generator` 函数外面再包一层。

```javascript
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args)
    generatorObject.next()
    return generatorObject
  }
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`)
  return 'DONE'
})
wrapped().next('hello!')
// First input: hello!
```

### Generator.prototype.return()

`gen.return(value)` 方法返回给定的值（`value`）并结束生成器。

- `return` 方法调用时，不提供参数，则返回值的 `value` 属性为 `undefined`。

  ```javascript
  function* numbersGenerator() {
    yield 1
    yield 2
    yield 3
  }

  const numbersGen = numbersGenerator()
  numbersGen.next() // { value: 1, done: false }
  numbersGen.return() // { value: undefined, done: true }
  ```

- 如果 `Generator` 函数内部有 `try...finally` 代码块，且正在执行 `try` 代码块，`return` 方法会导致立刻进入 `finally` 代码块，执行完以后，整个函数才会结束。

  ```javascript
  function* numbersGenerator() {
    yield 1
    try {
      yield 2
      yield 3
    } finally {
      yield 4
      yield 5
    }
    yield 6
  }

  const numbersGen = numbersGenerator()
  numbersGen.next() // { value: 1, done: false }
  numbersGen.next() // { value: 2, done: false }
  numbersGen.return(7) // { value: 4, done: false }
  numbersGen.next() // { value: 5, done: false }
  numbersGen.next() // { value: 7, done: true }
  ```

### Generator.prototype.throw()

`gen.throw(exception)` 方法用于向生成器抛出异常，并恢复生成器的执行，包含属性 `done` 和 `value` 的对象。

- 参数 `exception` ： 用于抛出的异常，建议抛出 `Error` 对象的实例。
- 返回值 ： 返回一个包含属性 `done` 和 `value` 的对象。
  - `done` 属性
    - 如果迭代器超过迭代序列的末尾，则为 `true` 。
    - 如果迭代器能够生成序列中的下一个值，则为 `false` 。
  - `value` 属性：迭代器返回的任意 JavaScript 值。当 `done` 属性值为 `true` 时，`value` 为 `undefined` 。

```javascript
const generator = function* () {
  try {
    yield
  } catch (e) {
    console.log('Generator 内部捕获 : ', e)
  }
}

var gen = generator()
gen.next()

try {
  gen.throw('a')
  gen.throw('b')
} catch (e) {
  console.log('外部捕获 : ', e)
}

// Generator 内部捕获 :  a
// 外部捕获 :  b

// 第一个错误被 Generator 函数体内的 catch 语句捕获
// 由于 Generator 函数内部的 catch 语句已经执行过了，不会再捕捉到这个错误了
// 所以这个错误就被抛出了 Generator 函数体，被函数体外的 catch 语句捕获。
```

生成器使用 `throw` 方法抛出异常：

- `throw` 方法抛出的错误要被内部捕获，前提是必须至少执行过一次 `next` 方法。
- `throw` 方法被捕获以后，会附带执行下一条 `yield` 表达式（即：会附带执行一次 `next` 方法）。

  ```javascript
  const generator = function* () {
    try {
      yield 1
    } catch (e) {
      yield 2
    }
    yield 3
  }

  const gen = generator()
  gen.next() // { value: 1, done: false }
  gen.throw() // { value: 2, done: false }
  gen.next() // { value: 3, done: false }
  gen.next() // { value: undefined, done: true }
  ```

- `Generator` 函数内部没有部署 `try...catch` 代码块，`throw` 方法抛出的错误，将被外部 `try...catch` 代码块捕获。

  ```javascript
  const generator = function* () {
    while (true) {
      yield
      console.log('Generator 内部捕获 : ', e)
    }
  }

  const gen = generator()
  gen.next()

  try {
    gen.throw('a')
    gen.throw('b')
  } catch (e) {
    console.log('外部捕获 : ', e)
  }

  // 外部捕获 : a
  ```

- `Generator` 函数内部和外部都没有部署 `try...catch` 代码块，程序将报错，直接中断执行。

  ```javascript
  const helloWorldGenerator = function* () {
    yield console.log('hello')
    yield console.log('world')
  }

  const helloWorldGen = helloWorldGenerator()
  helloWorldGen.next() // hello
  helloWorldGen.throw() // Uncaught undefined
  ```

- `Generator` 执行过程中抛出错误，且没有被内部捕获，则不会再执行下去了。如果此后还调用了 `next` 方法，则将返回一个 `{ value: undefined, done: true }` 的对象（即， JavaScript 引擎认为这个 `Generator` 已经运行结束了） 。

  ```javascript
  function* generator() {
    yield 1
    console.log('throwing an exception !')
    throw new Error('generator broke !')
    yield 2
    yield 3
  }

  function log(generator) {
    var v
    console.log('starting generator !')
    try {
      v = generator.next()
      console.log('第一次运行 next 方法 : ', v)
    } catch (err) {
      console.log('第一次 next 捕捉错误 : ', v)
    }
    try {
      v = generator.next()
      console.log('第二次运行 next 方法 : ', v)
    } catch (err) {
      console.log('第二次 next 捕捉错误 : ', v)
    }
    try {
      v = generator.next()
      console.log('第三次运行 next 方法 : ', v)
    } catch (err) {
      console.log('第三次 next 捕捉错误 : ', v)
    }
    console.log('caller done !')
  }

  log(generator())

  // starting generator !
  // 第一次运行 next 方法 : { value: 1, done: false }
  // throwing an exception !
  // 第二次 next 捕捉错误 : { value: 1, done: false }
  // 第三次运行 next 方法 : { value: undefined, done: true }
  // caller done !
  ```

## yield 关键字

`yield` 关键字用于暂停和恢复生成器函数。实际返回一个 `IteratorResult` 对象，它有两个属性： `value` 和 `done` 。

- `value` 属性：是对 `yield` 表达式求值的结果。
- `done` 属性： `false` 表示生成器函数尚未完全完成。

迭代器对象的 `next` 方法的运行逻辑如下：

- 遇到 `yield` 表达式，则暂停执行后面的操作，并将紧跟在 `yield` 后面的那个表达式的值，作为返回的对象的 `value` 属性值。
- 下一次调用 `next` 方法时，再继续往下执行，直到遇到下一个 `yield` 表达式。
- 如果没有再遇到新的 `yield` 表达式，就一直运行到函数结束，直到 `return` 语句为止，并将 `return` 语句后面的表达式的值，作为返回的对象的 `value` 属性值。
- 如果该函数没有 `return` 语句，则返回的对象的 `value` 属性值为 `undefined` 。

注意：

- **`yield` 表达式只能用在 `Generator` 函数中使用。在 `Generator` 函数中的普通函数中使用也无法使用。**
- `yield` 表达式如果用在表达式之中，必须放在圆括号里面。

  ```javascript
  function* demo() {
    console.log('Hello' + yield); // SyntaxError
    console.log('Hello' + yield 123); // SyntaxError
    console.log('Hello' + (yield)); // OK
    console.log('Hello' + (yield 123)); // OK
  }
  ```

- `yield` 表达式用作函数参数或放在赋值表达式的右边，可以不加括号。

  ```javascript
  function* demo() {
    foo(yield 'a', yield 'b') // OK
    let input = yield // OK
  }
  ```

## yield\* 表达式

`yield*` 表达式用于委托给另一个 `Generator` 或可迭代对象。

```javascript
function* inner() {
  yield '[inner] hello!'
}

function* outer1() {
  yield '[outer1] open'
  yield inner()
  yield '[outer1] close'
}

var gen = outer1()
gen.next().value // '[outer1] open'
gen.next().value // 返回生成器对象 : { [Generator] } 
gen.next().value // '[outer1] close'

function* outer2() {
  yield '[outer2] open'
  yield* inner()
  yield '[outer2] close'
}

var gen = outer2()
gen.next().value // '[outer2] open'
gen.next().value // '[inner] hello!'
gen.next().value // '[outer2] close'

// ========== 生成器 outer2 等同于 ==========
function* outer2() {
  yield '[outer2] open'
  yield '[inner] hello!'
  yield '[outer2] close'
}

function* outer2() {
  yield '[outer2] open'
  for (let v of inner()) {
    yield v
  }
  yield '[outer2] close'
}

for (let v of outer2()) {
  console.log(v)
}
```

任何数据结构只要有迭代器（Iterator）接口，就可以被 `yield*` 遍历。

```javascript
function* arrGenerator() {
  yield* ['a', 'b', 'c']
}
arrGenerator().next() // { value: 'a', done: false }

const strGenerator = (function* () {
  yield 'hello'
  yield* 'hello'
})()
strGenerator.next() // { value: 'hello', done: false }
strGenerator.next() // { value: 'h', done: false }
```

如果被代理的 `Generator` 函数有 `return` 语句，可以向代理它的 `Generator` 函数返回数据。

```javascript
function* fooGenerator() {
  yield 2
  yield 3
  return 'foo'
}

function* barGenerator() {
  yield 1
  var v = yield* fooGenerator()
  console.log('v : ', v)
  yield 4
}

var barGen = barGenerator()

barGen.next()
// { value: 1, done: false }
barGen.next()
// { value: 2, done: false }
barGen.next()
// { value: 3, done: false }
barGen.next()
// v :  foo
// { value: 4, done: false }
barGen.next()
// { value: undefined, done: true }
```

`yield*` 表达式的应用：

- 提取嵌套数组成员

  ```javascript
  function* iterTree(tree) {
    if (Array.isArray(tree)) {
      for (let i = 0; i < tree.length; i++) {
        yield* iterTree(tree[i])
      }
    } else {
      yield tree
    }
  }

  const tree = ['a', ['b', 'c'], ['d', 'e']]

  for (let x of iterTree(tree)) {
    console.log(x)
  }
  // a, b, c, d, e

  // 由于扩展运算符（ ... ）默认调用 Iterator 接口
  [...iterTree(tree)] // [ 'a', 'b', 'c', 'd', 'e' ]
  ```

- 遍历完全二叉树

  ```javascript
  // > left : 左树
  // > label : 当前节点
  // > right : 右树
  function Tree(left, label, right) {
    this.left = left
    this.label = label
    this.right = right
  }

  // 中序（inorder）遍历函数
  // 由于返回的是一个遍历器，则需要使用 generator 函数
  // 函数体内采用递归算法，所以左树和右树要用 yield* 遍历
  function* inorder(t) {
    if (t) {
      yield* inorder(t.left)
      yield t.label
      yield* inorder(t.right)
    }
  }

  // 生成二叉树
  function make(array) {
    // 判断是否为叶节点
    if (array.length == 1) return new Tree(null, array[0], null)
    return new Tree(make(array[0]), array[1], make(array[2]))
  }
  let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]])

  // 遍历二叉树
  var result = []
  for (let node of inorder(tree)) {
    result.push(node)
  }

  result // ['a', 'b', 'c', 'd', 'e', 'f', 'g']
  ```

## Generator 函数的 this

`Generator` 函数总是返回一个迭代器（Iterator）对象，该迭代器是 `Generator` 函数的实例，也继承了 `Generator` 函数的 `prototype` 对象上的方法。

在 `Generator` 函数实例中在 `this` 对象上添加属性，在实例中无法获取到该属性，因为 `Generator` 函数总是返回迭代器（Iterator）对象。可通过以下方法获取一个正常的对象实例：

- 将 `Generator` 函数的原型（`prototype`），使用 `call` 方法绑定 `Generator` 函数内部的 `this`。同时，可使用构造函数进行封装，则可使用 `new` 命令。

```javascript
function* generator() {
  this.a = 1
  yield (this.b = 2)
  yield (this.c = 3)
}

function Gen() {
  return generator.call(generator.prototype)
}

var gen = new Gen()

gen.next() // Object { value: 2, done: false }
gen.next() // Object { value: 3, done: false }
gen.next() // Object { value: undefined, done: true }

gen.a // 1
gen.b // 2
gen.c // 3
```

## Generator 应用

### 异步操作的同步化表达

- 请求 loading 开启/关闭控制

  ```javascript
  function* loadUI() {
    showLoadingScreen()
    yield loadUIDataAsynchronously()
    hideLoadingScreen()
  }
  var loader = loadUI()

  loader.next() // 加载 UI

  loader.next() // 卸载 UI
  ```

- 使用同步方式处理异步请求

  ```javascript
  function* main() {
    var result = yield request('http://some.url')
    var resp = JSON.parse(result)
    console.log(resp.value)
  }

  function request(url) {
    makeAjaxCall(url, function (response) {
      it.next(response)
    })
  }

  var it = main()
  it.next()
  ```

- 逐行读取文本文件

  ```javascript
  function* numbers() {
    let file = new FileReader('numbers.txt')
    try {
      while (!file.eof) {
        yield parseInt(file.readLine(), 10)
      }
    } finally {
      file.close()
    }
  }
  ```

### 控制流管理

利用 `for...of` 循环会自动依次执行 `yield` 命令的特性，可进行控制流管理。

```javascript
function* iterateSteps(steps) {
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i]
    yield step()
  }
}

function* iterateJobs(jobs) {
  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i]
    yield* iterateSteps(job.steps)
  }
}

const jobs = [
  {
    id: 'job1',
    steps: [
      function job1Step1Func() {
        return { id: 'job1_step1' }
      },
      function job1Step2Func() {
        return { id: 'job1_step2' }
      },
    ],
  },
  {
    id: 'job2',
    steps: [
      function job1Step1Func() {
        return { id: 'job2_step1' }
      },
      function job1Step2Func() {
        return { id: 'job2_step2' }
      },
    ],
  },
]

for (var step of iterateJobs(jobs)) {
  console.log(step.id)
}

// job1_step1
// job1_step2
// job2_step1
// job2_step2
```

### 部署 Iterator 接口

利用 `Generator` 函数，可以在任意对象上部署 `Iterator` 接口。

```javascript
function* iterEntries(obj) {
  let keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    yield [key, obj[key]]
  }
}

let myObj = { foo: 3, bar: 7 }

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value)
}

// foo 3
// bar 7
```

### 作为数据结构

`Generator` 可以看作是数据结构，对任意表达式，提供类似数组的接口。

```javascript
function* doStuff() {
  yield fs.readFile.bind(null, 'hello.txt')
  yield fs.readFile.bind(null, 'world.txt')
  yield fs.readFile.bind(null, 'and-such.txt')
}

for (let task of doStuff()) {
  // task是一个函数，可以像回调函数一样使用
  console.log('task : ', task)
}
```

## 异步 AsyncGenerator

可以使用构造函数 `AsyncGeneratorFunction` 或  `async function*` 定义一个异步生成器函数（async generator function），返回一个 `AsyncGenerator` 对象。

- 构造函数 `AsyncGeneratorFunction`

  ```javascript
  const AsyncGeneratorFunction = async function* () {}.constructor

  const asyncGenerator = new AsyncGeneratorFunction(`
      yield await Promise.resolve('a');
      yield await Promise.resolve('b');
    `)

  const asyncGen = asyncGenerator()
  asyncGen.next().then(res => {
    console.log(res) // { value: 'a', done: false }
  })
  asyncGen.next().then(res => {
    console.log(res) // { value: 'b', done: false }
  })
  asyncGen.next().then(res => {
    console.log(res) // { value: undefined, done: true }
  })

  // 使用 for await...of 循环遍历异步迭代器
  let str = ''
  async function generate() {
    for await (const val of asyncGenerator()) {
      str = str + val
    }
    console.log(str)
  }
  generate() // abc
  ```

- `async function*` 声明

  ```javascript
  async function* asyncGenerator() {
    yield await Promise.resolve('a')
    yield await Promise.resolve('b')
  }

  const asyncGen = asyncGenerator()
  asyncGen.next().then(res => {
    console.log(res) // { value: 'a', done: false }
  })
  asyncGen.next().then(res => {
    console.log(res) // { value: 'b', done: false }
  })
  asyncGen.next().then(res => {
    console.log(res) // { value: undefined, done: true }
  })

  // 使用 for await...of 循环遍历异步迭代器
  let str = ''
  async function generate() {
    for await (const val of asyncGenerator()) {
      str = str + val
    }
    console.log(str)
  }
  generate() // abc
  ```

`AsyncGenerator` 函数返回一个异步迭代器（asyncIterator）对象。调用异步迭代器对象的 `next` 方法，返回一个 `Promise` 对象。

- 可以使用 `then` 方法指定该 `Promise` 对象状态为 `resolve` 的回调函数。该回调函数的参数，是具有 `value` 和 `done` 两个属性的对象。
  - `value`属性：表示当前的内部状态的值，是 `yield` 表达式后面那个表达式的值。
  - `done`属性：布尔值，表示是否遍历结束。
- `next` 方法是可以连续调用的，不必等到上一步产生的 `Promise` 对象 `resolve` 以后再调用。`next` 方法会累积起来，自动按照每一步的顺序运行下去。
  
  ```javascript
  async function* asyncGenerator() {
    yield await Promise.resolve('a')
    yield await Promise.resolve('b')
  }

  const asyncGen = asyncGenerator()
  const all = await Promise.all([asyncGen.next(), asyncGen.next()])
  console.log(all)
  // [ { value: 'a', done: false }, { value: 'b', done: false } ]
  ```

`for...of` 循环用于遍历同步的 Iterator 接口。`for await...of` 循环，则可以用于遍历异步的 Iterator 接口

对象的同步遍历器的接口，部署在 `Symbol.iterator` 属性上面。对象的异步遍历器接口，部署在 `Symbol.asyncIterator` 属性上面。不管是什么样的对象，只要它的 `Symbol.asyncIterator` 属性有值，就表示应该对它进行异步遍历。
