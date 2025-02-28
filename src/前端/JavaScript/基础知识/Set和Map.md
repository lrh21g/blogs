# Set 和 Map

## Set

### Set 的基本含义

`Set` 对象允许存储任何类型的**唯一值**，无论是原始值或者是对象引用。可以按照插入的顺序迭代它的元素。

- 在 `Set` 中， `+0` 和 `-0` 是同一个的值，在严格相等（`===`）中也是严格相等。
- `NaN` 在 `Set` 中被认为是同一个值，但在严格相等（`===`）中 `NaN` 不等于自身。
- `null` 和 `undefined` 都可以被存储在 `Set` 中。

`new Set(iterable)` 创建 `Set` 对象。如果传递一个可迭代对象 `iterable` ，它的所有元素将不重复地被添加到新的 `Set` 中。如果不指定 `iterable` 参数或其值为 `null`，则新的 `Set` 为空。

```javascript
let setInstance = new Set()

setInstance.add(1) // Set(1) {1}
setInstance.add('hello world') // Set(2) {1, 'hello world'}

let obj = { a: '1'}
setInstance.add(obj) // Set(3) {1, 'hello world', { a: '1'}}

setInstance.add(NaN) // Set(4) {1, 'hello world', { a: '1'}, NaN}
setInstance.add(NaN) // Set(4) {1, 'hello world', { a: '1'}, NaN}

setInstance.add(+0) // Set(5) {1, 'hello world', { a: '1'}, NaN, 0}
setInstance.add(-0) // Set(5) {1, 'hello world', { a: '1'}, NaN, 0}

setInstance.has(1) // true
setInstance.has('Hello World'.toLowerCase()) // true
setInstance.has(obj) // true
setInstance.has(NaN) // true

setInstance.delete(1) // true
setInstance.has(1) // false

let arr1 = [1, 2, 3]
// 当 new Set 的参数是一个数组，数组的元素会自动成为 Set 的元素
console.log(new Set(arr1)) // Set(3) {1, 2, 3}

// 数组去重
let elementRepeatArr = [1, 2, 3, 3, 3, 4, 4, 4]
let elementRepeatArrToSet = new Set(elementRepeatArr)
console.log(elementRepeatArrToSet.size) // 4
console.log([...elementRepeatArrToSet]) // [1, 2, 3, 4]

// 字符去重
console.log([...new Set('abcccddd')].join('')) // 'abcd'

// 大小写敏感
let textStr = 'hello L'
let textStrToSet = new Set(textStr)
console.log(textStrToSet.size) // 6
console.log(textStrToSet) // Set(6) {'h', 'e', 'l', 'o', ' ', 'L'}
```

### Set 的实例属性和方法

- `Set.prototype.constructor` 属性 ：构造函数，默认是 `Set` 函数。

- `Set.prototype.size` 属性 ：只读属性。返回 `Set` 对象的成员数量。

  ```javascript
  const setInstance = new Set()

  setInstance.add(1)
  setInstance.add('hello')

  setInstance.size // 2
  ```

- `Set.prototype.add()`

  **语法：** `setInstance.add(value)`

  **描述：** 添加指定元素 `value` 到 `Set` 对象中，并返回 `Set` 对象本身。

  ```javascript
  let set = new Set()

  set.add(1) // Set(1) {1}
  // 链式调用
  set.add('hello world').add({ a: '1'}) // Set(3) {1, 'hello world', { a: '1'}}

  set.add(NaN) // Set(4) {1, 'hello world', { a: '1'}, NaN}
  set.add(NaN) // Set(4) {1, 'hello world', { a: '1'}, NaN}

  set.add(+0) // Set(5) {1, 'hello world', { a: '1'}, NaN, 0}
  set.add(-0) // Set(5) {1, 'hello world', { a: '1'}, NaN, 0}
  ```

- `Set.prototype.delete()`

  **语法：** `setInstance.delete(value)`

  **描述：** 从 `Set` 对象中删除指定的值 `value`（如果该值在 `Set` 中），成功删除返回 `true`，否则返回 `false`。

  - 对象是通过引用比较的，如果需要删除，则需要提供原始对象的引用，否则就需要通过检查对象的对应属性进行删除。

  ```javascript
  let set = new Set()

  set.add(1) // Set(1) {1}
  set.add('hello world') // Set(2) {1, 'hello world'}

  let obj = { a: '1'}
  set.add(obj) // Set(3) {1, 'hello world', { a: '1'}}

  set.delete(1) // true
  set.delete(obj) // true

  set.has(1) // false
  set.has(obj) // false
  ```

- `Set.prototype.has()`

  **语法：** `setInstance.has(value)`

  **描述：** 返回一个布尔值，表示对应的值 `value` 是否存在于 `Set` 对象中。

  ```javascript
  let set = new Set()

  set.add(1) // Set(1) {1}
  set.add('hello world') // Set(2) {1, 'hello world'}

  let obj = { a: '1'}
  set.add(obj) // Set(3) {1, 'hello world', { a: '1'}}

  set.has(1) // true
  set.has('foo') // false
  set.has(obj) // false
  set.has({ a: '1'}) // false ，不同的对象引用
  ```

- `Set.prototype.clear()`

  **语法：** `setInstance.clear(value)`

  **描述：** 移除 Set 对象中所有元素，返回为 `undefined` 。

  ```javascript
  let set = new Set()

  set.add(1) // Set(1) {1}
  set.add('hello world') // Set(2) {1, 'hello world'}

  set.size // 2
  set.clear()
  set.size // 0
  ```

- `Set.prototype.keys()` / `Set.prototype.values()`

  **语法：** `setInstance.keys()` / `setInstance.values()`

  **描述：** 按照插入顺序，返回元素的**键名**（或**键值**）迭代器对象。

  由于 `Set` 结构没有键名，只有键值（或者说键名和键值是同一个值），所以 `keys()` 方法和 `values()` 方法的行为完全一致。

  ```javascript
  let set = new Set(['red', 'blue'])

  set.add(1)
  set.add('hello world')
  set.add({ a: 1 })
  set.add(['yellow', 'black'])

  for (let item of set.keys()) {
    console.log(item)
  }
  // red
  // blue
  // 1
  // hello world
  // { a: 1 }
  // ['yellow', 'black']
  ```

- `Set.prototype.entries()`

  **语法：** `setInstance.entries()`

  **描述：** 按照插入顺序，返回元素的**键值对**迭代器对象，该对象包含的元素是类似 `[value, value]` 形式的数组。

  ```javascript
  let set = new Set(['red', 'blue'])

  set.add(1)
  set.add('hello world')
  set.add(['yellow', 'black'])

  for (let item of set.entries()) {
    console.log(item)
  }
  // ['red', 'red']
  // ['blue', 'blue']
  // [1, 1]
  // ['hello world', 'hello world']
  // [['yellow', 'black'], ['yellow', 'black']]

  let setIterator = set.entries()
  setIterator.next() // {value: ['red', 'red'], done: false}
  setIterator.next() // {value: ['blue', 'blue'], done: false}
  ```

- `Set.prototype.forEach()`

  **语法：** `setInstance.forEach(callbackFn, thisArg)`

  **描述：** 对 `Set` 对象中的每个值，按插入顺序执行一次提供的函数 `callbackFn`。

  **参数：**

  - `callback` ：为集合中每个元素执行的回调函数，该函数接收如下参数：

    - `value` ：当前正在处理的 `Set` 元素的键值。
    - `key` ：当前正在处理的 `Set` 的元素键名。

      由于 `Set` 对象中没有键（`key`），该值为 `Set` 中元素的值，为了和 `Map` 以及 `Array` 的 `forEach()` 函数用法保持一致。

    - `set` ：调用 `forEach()` 的 `Set` 对象。

  - `thisArg` ：在执行 `callbackFn` 时作为 `this` 使用。

  ```javascript
  let set = new Set(['red', 'blue'])

  set.add(1)
  set.add('hello world')
  set.add(['yellow', 'black'])

  set.forEach((value, key, set) => {
    console.log(value,  key)
  })
  // red red
  // blue blue
  // 1 1
  // hello world hello world
  // ['yellow', 'black'] ['yellow', 'black']
  ```

### Set 的应用

- 实现并集（Union）、交集（Intersect）和差集（Difference）

  ```javascript
  let a = new Set([1, 2, 3])
  let b = new Set([4, 3, 2])

  // 并集
  let union = new Set([...a, ...b])
  // Set {1, 2, 3, 4}

  // 交集
  let intersect = new Set([...a].filter((x) => b.has(x)))
  // set {2, 3}

  // （a 相对于 b 的）差集
  let difference = new Set([...a].filter((x) => !b.has(x)))
  // Set {1}
  ```

- 进行数组和字符串去重

  ```javascript
  // 数组去重
  let elementRepeatArr = [1, 2, 3, 3, 3, 4, 4, 4]
  let elementRepeatArrToSet = new Set(elementRepeatArr)
  console.log(elementRepeatArrToSet.size) // 4
  console.log([...elementRepeatArrToSet]) // [1, 2, 3, 4]

  // 字符去重
  console.log([...new Set('abcccddd')].join('')) // 'abcd'
  ```

## WeakSet

### WeakSet 的基本含义

`WeakSet` 对象允许将弱引用对象存储在一个集合中。

- `WeakSet` 的成员**只能是对象和 `Symbol` 值**，而不能是其他类型的值。
- `WeakSet` 集合中**对象的引用为弱引用**，即：垃圾回收机制不考虑 `WeakSet` 对该对象的引用。（也就是说，如果其他对象都不再引用该对象，垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中）

  垃圾回收机制根据对象的可达性（reachability）来判断回收，如果对象还能被访问到，垃圾回收机制就不会释放这块内存。结束使用该值之后，有时会忘记取消引用，导致内存无法释放，进而可能会引发内存泄漏。`WeakSet` 里面的引用，都不计入垃圾回收机制，所以就不存在这个问题。

  `WeakSet` 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 `WeakSet` 里面的引用就会自动消失。

- `WeakSet` 中没有存储当前对象的列表。正因为这样，**WeakSet 是不可枚举**。

`new WeakSet(iterable)` 创建 `WeakSet` 对象。如果传递一个可迭代对象 `iterable` ，它的所有元素将不重复地被添加到新的 `WeakSet` 中。如果不指定 `iterable` 参数或其值为 `null`，则新的 `WeakSet` 为空。

```javascript
new WeakSet([1, 2]) // 数组成员不是对象，加入 WeakSet 会报错： Uncaught TypeError: Invalid value used in weak set
new WeakSet([[1, 2], [3, 4]]) // WeakSet {[1, 2], [3, 4]}
```

### WeakSet 的实例方法

- `WeakSet.prototype.add()`

  **语法：** `weakSetInstance.add(value)`

  **描述：** 添加指定元素 `value` 到 `WeakSet` 对象中，并返回 `WeakSet` 对象本身。

- `WeakSet.prototype.delete()`

  **语法：** `weakSetInstance.delete(value)`

  **描述：** 从 `WeakSet` 对象中删除指定的值 `value`，成功删除返回 `true`，如果在 `WeakSet` 中找不到该成员或者该成员不是对象则返回 `false`。

- `WeakSet.prototype.has()`

  **语法：** `weakSetInstance.has(value)`

  **描述：** 返回一个布尔值，表示对应的值 `value` 是否存在于 `WeakSet` 对象中。

```javascript
const weakSetInstance = new WeakSet()
let obj = {}

weakSetInstance.add(window) // WeakSet {Window
weakSetInstance.add(obj) // WeakSet {{}, Window}

weakSetInstance.has(window) // true
weakSetInstance.has({}) // false ：不是同一个引用

weakSetInstance.delete(window) // true
weakSetInstance.has(window) // false
```

### WeakSet 的应用

- 储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

  ```javascript
  // 通过查询元素在不在 disabledElements 中，可以知道是否被禁用，
  // 假如元素从 DOM 树中被删除了，它的引用却仍然保存在 Set 中，垃圾回收程序也不能回收它
  const disabledElements = new Set()
  const loginButton = document.querySelector('#login')
  // 通过加入对应集合，给这个节点打上“禁用”标签
  disabledElements.add(loginButton)

  // 只要 WeakSet 中任何元素从 DOM 树中被删除，垃圾回收程序就可以忽略其存在，
  // 而立即释放其内存（假设没有其他地方引用这个对象）。
  const disabledElements = new WeakSet()
  const loginButton = document.querySelector('#login')
  // 通过加入对应集合，给这个节点打上“禁用”标签
  disabledElements.add(loginButton)
  ```

## Map

### Map 的基本含义

`Map` 对象是键/值对的集合，并且能够记住键的原始插入顺序。**任何值（对象或者基本类型）都可以作为一个键或一个值**。

**`Map` 中的键是唯一的**。如果对同一个键多次赋值，后面的值将覆盖前面的值。

- 如果 `Map` 的键是基础类型的值（`Number`、`String`、`Boolean`），则只要两个值严格相等（`===`），`Map` 将其视为一个键。

  - 布尔值 `true` 和字符串 `'true'` 是两个不同的键
  - `undefined` 和 `null` 也是两个不同的键。
  - `0` 和 `-0` 是同一个键
  - `NaN` 虽然不严格等于自身，但是 `Map` 将其视为同一个键。

- 如果 `Map` 的键是对象，只有对同一个对象的引用，`Map` 才将其视为同一个键。

```javascript
let mapInstance = new Map()

mapInstance.set('a', 'alpha')
mapInstance.set('b', 'beta')

mapInstance.set(undefined, 'undefined')
mapInstance.set(null, 'null')

const helloFn = function () {
  console.log('hello')
}
mapInstance.set(helloFn, 'hello')

console.log(mapInstance)
// Map {
//   'a' => 'alpha',
//   'b' => 'beta',
//   undefined => 'undefined',
//   null => 'null',
//   function () { console.log('hello') } => "hello",
// }

mapInstance.size // 5
mapInstance.has(helloFn) // true
mapInstance.get(helloFn) // 'hello'
mapInstance.get(null) // 'null'
mapInstance.delete('a')
mapInstance.get('a') // undefined
```

**`Object` 和 `Map` 的比较**

- `Map` 默认情况下不包含任何键，只包含显示插入的键；`Object` 原型链上的键名可能和自身对象上的键名冲突。（`Object.create(null)` 可以创建一个没有原型的对象）
- `Map` 的键可以是任意值；`Object` 的键必须是 `String` 或者 `Symbol`。
- `Map` 的键是有序的，迭代的时候按照插入的顺序返回键值；`Object` 是有序的，排序比较复杂，没有可以迭代对象所有属性的机制，迭代机制只包含了属性的不同子集，比如使用 `for...in` 仅包含以字符串为键的属性 ，使用 `Object.keys` 仅包含对象自身可枚举的以字符串为键的属性，等等。
- `Map` 的键值对个数可以通过 `size` 属性获取；`Object` 的键值对个数需要手动计算。
- `Map` 是可迭代的；`Object` 没有实现迭代，可以使用 `for..in` 并不能直接迭代对象，或者使用 `Object.keys` 和 `Object.entries` 实现迭代协议。
- `Map` 在频繁增删键值对的场景性能更好。
- `Map` 没有元素序列化和解析的支持，但可以使用携带 `replacer` 参数的 `JSON.stringify()` 创建对 `Map` 的序列化和解析；`Object` 可以使用 `JSON.stringify()` 进行 JSON 序列化，使用 `JSON.parse()` 进行解析。

  ```javascript
  // 使用携带 replacer 参数的 JSON.stringify() 创建对 Map 的序列化和解析
  function replacer(key, value) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()),
        // 或者使用 value: [...value]
      }
    } else {
      return value
    }
  }

  function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value)
      }
    }
    return value
  }

  const originalValue = new Map([['a', 1]])
  const str = JSON.stringify(originalValue, replacer)
  console.log(str) // '{"dataType":"Map","value":[["a",1]]}'

  const newValue = JSON.parse(str, reviver)
  console.log(newValue) // Map(1) {'a' => 1}
  ```

### Map 的实例属性和方法

- `Map.prototype.size` 属性：只读属性。返回 `Map` 对象的成员数量。

  ```javascript
  const mapInstance = new Map()

  mapInstance.set('a', 'alpha')
  mapInstance.set('b', 'beta')

  mapInstance.size // 2
  ```

- `Map.prototype.set()`

  **语法：** `mapInstance.set(key, value)`

  **描述：** 为 `Map` 对象添加或更新一个指定了键（`key`）和值（`value`）的（新）键值对，并返回当前的 `Map` 对象。键和值可以是任何数据类型（任何原始值或任何类型的对象）。

  ```javascript
  const mapInstance = new Map()
  mapInstance.set('a', 'alpha')
  mapInstance.set(1, 123)

  // 更新键为 'a' 的值
  mapInstance.set('a', 'abc')
  // 链式调用
  mapInstance.set(2, 'b').set(2, 'c')
  ```

- `Map.prototype.get()`

  **语法：** `mapInstance.get(key)`

  **描述：** 从 `Map` 对象中读取指定 `key` 的键值。如果查找不到 `key`，则返回 `undefined`。

  ```javascript
  const mapInstance = new Map()

  const helloFn = function () {
    console.log('hello')
  }

  mapInstance.set(helloFn, 'hello')
  mapInstance.get(helloFn) // 'hello'
  mapInstance.get('123') // undefined
  ```

- `Map.prototype.has()`

  **语法：** `mapInstance.has(key)`

  **描述：** 返回一个布尔值，表示指定键 `key` 的元素是否在当前 `Map` 对象中。存在返回 `true`，否则返回 `false`。

  ```javascript
  const mapInstance = new Map()

  mapInstance.set('a', 'alpha')
  mapInstance.set(1, 123)

  mapInstance.has('a') // true
  mapInstance.has('b') // false
  ```

- `Map.prototype.delete()`

  **语法：** `mapInstance.delete(key)`

  **描述：** 用于移除 `Map` 对象中指定键 `key` 的元素。移除成功返回 `true`，否则返回 `false` 。

  ```javascript
  const mapInstance = new Map()

  mapInstance.set('a', 'alpha')
  mapInstance.set(1, 123)

  mapInstance.delete('a') // true
  ```

- `Map.prototype.clear()`

  **语法：** `mapInstance.clear()`

  **描述：** 移除 `Map` 对象中的所有元素，返回 `undefined`。

  ```javascript
  const mapInstance = new Map()

  mapInstance.set('a', 'alpha')
  mapInstance.set(1, 123)

  mapInstance.clear()

  mapInstance.size // 0
  mapInstance.has('a') // false
  ```

- `Map.prototype.keys()`

  **语法：** `mapInstance.keys()`

  **描述：** 按照插入顺序，返回元素的**键名**迭代器对象。

  ```javascript
  const mapInstance = new Map()
  mapInstance.set('0', 'foo')
  mapInstance.set(1, 'bar')
  mapInstance.set({}, 'baz')

  const mapKeyIterator = mapInstance.keys()

  mapKeyIterator.next() // {value: '0', done: false}
  mapKeyIterator.next() // {value: 1, done: false}
  mapKeyIterator.next() // {value: {}, done: false}
  mapKeyIterator.next() // {value: undefined, done: true}

  console.log([...mapInstance.keys()]) // ['0', 1, {}}]
  ```

- `Map.prototype.values()`

  **语法：** `mapInstance.values()`

  **描述：** 按照插入顺序，返回元素的**键值**迭代器对象。

  ```javascript
  const mapInstance = new Map()
  mapInstance.set('0', 'foo')
  mapInstance.set(1, 'bar')
  mapInstance.set({}, 'baz')

  const mapKeyIterator = mapInstance.values()

  mapKeyIterator.next() // {value: 'foo', done: false}
  mapKeyIterator.next() // {value: 'bar', done: false}
  mapKeyIterator.next() // {value: 'baz', done: false}
  mapKeyIterator.next() // {value: undefined, done: true}

  console.log([...mapInstance.values()]) // ['foo', 'bar', 'baz']
  ```

- `Map.prototype.entries()`

  **语法：** `mapInstance.entries()`

  **描述：** 按照插入顺序，返回元素的**键值对**迭代器对象，该对象包含的元素是类似 `[value, value]` 形式的数组。

  ```javascript
  const mapInstance = new Map()
  mapInstance.set('0', 'foo')
  mapInstance.set(1, 'bar')
  mapInstance.set({}, 'baz')

  const mapKeyIterator = mapInstance.entries()

  mapKeyIterator.next() // {value: ['0', 'foo'], done: false}
  mapKeyIterator.next() // {value: [1, 'bar'], done: false}
  mapKeyIterator.next() // {value: [{}, 'baz'], done: false}
  mapKeyIterator.next() // {value: undefined, done: true}

  console.log([...mapInstance.entries()])
  // [['0', 'foo'], [1, 'bar'], [{}, 'baz']]
  ```

- `Map.prototype.forEach()`

  **语法：** `mapInstance.forEach(callbackFn, thisArg)`

  **描述：** 对 `Map` 对象中的每个值，按插入顺序执行一次提供的函数 `callbackFn`。

  **参数：**

  - `callback` ：为集合中每个元素执行的回调函数，该函数接收如下参数：
    - `value` ：当前正在处理的 `Map` 元素的键值。
    - `key` ：当前正在处理的 `Map` 的元素键名。
    - `set` ：调用 `forEach()` 的 `Map` 对象。
  - `thisArg` ：在执行 `callbackFn` 时作为 `this` 使用。

  ```javascript
  const mapInstance = new Map()
  mapInstance.set('0', 'foo')
  mapInstance.set(1, 'bar')
  mapInstance.set({}, 'baz')

  mapInstance.forEach((value, key, set) => {
    console.log(value, key)
  })
  // foo 0
  // bar 1
  // baz {}
  ```

### Map 的应用

```javascript
// Map 转为数组：使用扩展运算符（...）
const myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc'])
console.log([...myMap]) // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// 数组 转为 Map ：将数组传入 Map 构造函数
new Map([
  [true, 7],
  [{ foo: 3 }, ['abc']],
])
// Map {
//   true => 7,
//   Object {foo: 3} => ['abc']
// }

// ========================================

// Map 转为对象
// 如果所有 Map 的键都是字符串，可以无损地转为对象。
// 如果有非字符串的键名，键名会被转成字符串，再作为对象的键名。
function strMapToObj(strMap) {
  let obj = Object.create(null)
  for (let [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}
const myMap = new Map().set('yes', true).set('no', false)
strMapToObj(myMap) // { yes: true, no: false }

// 对象转为 Map ： 使用 Object.entries()
let obj = { a: 1, b: 2 }
let map = new Map(Object.entries(obj))
// Map {'a' => 1, 'b' => 2}

// 对象转为 Map ： 定义转化函数
function objToStrMap(obj) {
  let strMap = new Map()
  for (let k of Object.keys(obj)) {
    strMap.set(k, obj[k])
  }
  return strMap
}
objToStrMap({ yes: true, no: false })
// Map {"yes" => true, "no" => false}

// ========================================

// Map 转为 JSON ：Map 的键名都是字符串，可以选择转为对象 JSON。
function strMapToJson(strMap) {
  return JSON.stringify(strMapToObj(strMap))
}
let myMap = new Map().set('yes', true).set('no', false)
strMapToJson(myMap) // '{"yes":true,"no":false}'

// Map 转为 JSON ：Map 的键名有非字符串，可以选择转为数组 JSON
function mapToArrayJson(map) {
  return JSON.stringify([...map])
}
let myMap = new Map().set(true, 7).set({ foo: 3 }, ['abc'])
mapToArrayJson(myMap) // '[[true,7],[{"foo":3},["abc"]]]'

// JSON 转为 Map ：正常情况下，所有键名都是字符串
function jsonToStrMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr))
}
jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

// JSON 转为 Map ：特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。
function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr))
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
// Map {true => 7, Object {foo: 3} => ['abc']}
```

## WeakMap

### WeakMap 的基本含义

`WeakMap` 对象是一组键/值对的集合。**键是弱引用的，键值是正常引用的**。

- `WeakMap` 只接受对象（`null`除外）和 `Symbol` 值作为键名，不接受其他类型的值作为键名。
- `WeakMap` 的键名所指向的对象，不计入垃圾回收机制。

  只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要， `WeakMap` 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

- 正因为 `WeakMap` 的键是弱引用的，`WeakMap` 的 `key` 是不可枚举的。

如果需要在对象上添加数据，又不想干扰垃圾回收机制，则可以使用 `WeakMap` 。`WeakMap` 结构有助于防止内存泄漏。

```javascript
let weakMapInstance = new WeakMap()

let fooObj = { foo: 'foo' }
let barArr = ['bar1', 'bar2']

weakMapInstance.set(fooObj, 'fooObj')
weakMapInstance.set(barArr, [barArr, 'barArr'])
weakMapInstance.set(Symbol(), 'symbol')

// 在 WeakMap 外部消除了obj的引用，WeakMap 内部的引用依然存在
const wm = new WeakMap()
let key = {}
let obj = { foo: 1 }

wm.set(key, obj)
obj = null
wm.get(key) // {foo: 1}
```

### WeakMap 的实例方法

- `WeakMap.prototype.get(key)`

  **语法：** `weakMapInstance.get(key)`

  **描述：** 根据指定的 `key` 返回 `WeakMap` 的元素。如果找不到对应的键，则返回 `undefined`。

- `WeakMap.prototype.set()`

  **语法：** `weakMapInstance.set(key, value)`

  **描述：** 根据指定的 `key` 和 `value` 在 `WeakMap` 对象中添加新元素或更新元素，并返回 `WeakMap` 当前对象。

- `WeakMap.prototype.has(key)`

  **语法：** `weakMapInstance.has(key)`

  **描述：** 返回一个布尔值，表示指定键 `key` 的元素是否在当前 `Map` 对象中。存在返回 `true`，否则返回 `false`。

- `WeakMap.prototype.delete()`

  **语法：** `weakMapInstance.delete(key)`

  **描述：** 用于移除 `WeakMap` 对象中指定键 `key` 的元素。移除成功返回 `true`，否则返回 `false` 。

```javascript
let weakMapInstance = new WeakMap()

let fooObj = { foo: 'foo' }
let barArr = ['bar1', 'bar2']

weakMapInstance.set(fooObj, 'fooObj')
weakMapInstance.set(barArr, [barArr, 'barArr'])
weakMapInstance.set(Symbol(), 'alpha')

weakMapInstance.has(fooObj) // true
weakMapInstance.get(fooObj) // 'fooObj'

weakMapInstance.delete(fooObj) // true
weakMapInstance.has(fooObj) // false
```

### WeakMap 的应用

- 在 DOM 元素上添加数据，可以使用 `WeakMap` 结构。当该 DOM 元素被清除，其所对应的 `WeakMap` 记录就会自动被移除。

  ```javascript
  // 在 #logo DOM 节点上，每次触发 click 事件，就会更新状态
  // 将这个状态（该DOM 节点对象）作为键名存放在 WeakMap 中
  // 一旦 DOM 节点被删除，该状态会自动消失，不会存在内存泄漏的风险

  let myWeakMap = new WeakMap()

  myWeakMap.set(document.getElementById('logo'), { timesClicked: 0 })

  document.getElementById('logo').addEventListener(
    'click',
    function () {
      let logoData = myWeakMap.get(document.getElementById('logo'))
      logoData.timesClicked++
    },
    false
  )
  ```

- 部署私有属性

  ```javascript
  const _counter = new WeakMap()
  const _action = new WeakMap()

  // Countdown 类的两个内部属性 _counter 和 _action，是实例的弱引用，
  // 如果删除实例，它们也就随之消失，不会造成内存泄漏。
  class Countdown {
    constructor(counter, action) {
      _counter.set(this, counter)
      _action.set(this, action)
    }
    dec() {
      let counter = _counter.get(this)
      if (counter < 1) return
      counter--
      _counter.set(this, counter)
      if (counter === 0) {
        _action.get(this)()
      }
    }
  }

  const c = new Countdown(2, () => console.log('DONE'))

  c.dec()
  c.dec()
  // DONE
  ```

## WeakRef

- `new WeakRef(target)` 创建对象的弱引用。允许保留对原始对象 `target` 的弱引用，而不会阻止 原始对象 `target` 被垃圾回收（GC）。

- `WeakRef.prototype.deref()` 方法返回 `WeakRef` 实例的原始对象。如果原始对象存在，该方法返回原始对象；如果目标对象已被垃圾收集，则返回 `undefined` 。

```javascript
let target = { a: 1 }
let weakRefInstance = new WeakRef(target)

let obj = weakRefInstance.deref()
if (obj) {
  // target 未被垃圾回收机制清除
  // ...
}
```

弱引用对象可以作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。

```javascript
// makeWeakCached() 用于建立一个缓存，缓存里面保存对原始文件的弱引用。
function makeWeakCached(f) {
  const cache = new Map()
  return (key) => {
    const ref = cache.get(key)
    if (ref) {
      const cached = ref.deref()
      if (cached !== undefined) return cached
    }

    const fresh = f(key)
    cache.set(key, new WeakRef(fresh))
    return fresh
  }
}

const getImageCached = makeWeakCached(getImage)
```

注意：标准规定，一旦使用 `WeakRef()` 创建了原始对象的弱引用，在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除。

## FinalizationRegistry

- `new FinalizationRegistry(callbackFn)` ：声明一个清理器注册表实例，用于指定目标对象被垃圾回收机制清除以后，所要执行的回调函数 `callbackFn`。

- `FinalizationRegistry.prototype.register(target, heldValue, unregisterToken)` ：用于注册所要观察的对象 `target`。对 `target` 属于**弱引用**。

  - 一旦该对象被垃圾回收机制清除，注册表就会在清除完成后，调用注册的回调函数 `callbackFn` ，并将 `heldValue` （可以是任意类型的值）作为参数传入回调函数。
  - `unregisterToken` 作为标记值，用于标记已经注册的回调函数。标记值必须是对象，一般使用原始对象 `target`，属于**弱引用**。

- `FinalizationRegistry.prototype.unregister(unregisterToken)` ：用于取消观察的目标对象 `target`

```javascript
let originalObj = {}

const registry = new FinalizationRegistry((heldValue) => {
  // ....
})

registry.register(originalObj, 'some value', originalObj)
// ... 其他操作
registry.unregister(originalObj)
```

由于无法知道清理器何时会执行，所以最好避免使用它。另外，如果浏览器窗口关闭或者进程意外退出，清理器则不会运行。

```javascript
// 使用清理器注册表功能 FinalizationRegistry 进行缓存处理
// 一旦缓存的原始对象被垃圾回收机制清除，会自动执行一个回调函数。
// 该回调函数会清除缓存里面已经失效的键。

function makeWeakCached(f) {
  const cache = new Map()
  const cleanup = new FinalizationRegistry((key) => {
    const ref = cache.get(key)
    if (ref && !ref.deref()) cache.delete(key)
  })

  return (key) => {
    const ref = cache.get(key)
    if (ref) {
      const cached = ref.deref()
      if (cached !== undefined) return cached
    }

    const fresh = f(key)
    cache.set(key, new WeakRef(fresh))
    cleanup.register(fresh, key)
    return fresh
  }
}

const getImageCached = makeWeakCached(getImage)
```
