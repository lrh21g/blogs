# Reflect

`Reflect` 是一个内置的对象，它提供拦截 JavaScript 操作的方法。

## 概述

- 将 `Object` 对象的一些明显属于语言内部的方法（比如 `Object.defineProperty`），放到 `Reflect` 对象上。
- 修改某些 `Object` 方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)` 在无法定义属性时，会抛出错误，而 `Reflect.defineProperty(obj, name, desc)` 则会返回 `false` 。
- 让 `Object` 操作都变成函数行为。某些 `Object` 操作是命令式，比如 `name in obj` 和 `delete obj[name]` ，而 `Reflect.has(obj, name)` 和 `Reflect.deleteProperty(obj, name)` 让它们变成了函数行为。
- `Reflect` 对象的方法与 `Proxy` 对象的方法一一对应。在 `Proxy` 修改默认行为，都可以在 `Reflect` 上获取默认行为。

## 静态方法

### Reflect.apply()

`Reflect.apply(target, thisArgument, argumentsList)` ：通过指定的参数列表发起对目标 (`target`) 函数的调用。等同于 `Function.prototype.apply.call(func, thisArg, args)`

- 参数
  - `target` ：目标函数。
  - `thisArgument` ：`target` 函数调用时，绑定的 `this` 对象。
  - `argumentsList` ：`target` 函数调用时，传入的实参列表。该参数应该是一个类数组的对象。
- 返回值：调用完带着指定参数和 `this` 值的给定的函数后返回的结果。
- 异常：如果 `target` 对象不可调用，抛出 `TypeError` 异常。

```javascript
const ages = [11, 33, 12, 54, 18, 96]

// 旧写法
const youngest = Math.min.apply(Math, ages)
const oldest = Math.max.apply(Math, ages)
const type = Object.prototype.toString.call(youngest)

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages)
const oldest = Reflect.apply(Math.max, Math, ages)
const type = Reflect.apply(Object.prototype.toString, youngest, [])
```

### Reflect.construct()

`Reflect.construct(target, argumentsList[, newTarget])` ：相当于运行 `new target(...args)`。供了一种不使用 `new`，来调用构造函数的方法。

- 参数
  - `target` ：目标构造函数。
  - `argumentsList` ：类数组，目标构造函数调用时的参数。
  - `newTarget` ：可选，作为新创建对象的原型对象的 `constructor` 属性，参考 `new.target` 操作符，默认值为 `target`。
- 返回值：以 `target` （如果 `newTarget` 存在，则为 `newTarget` ）函数为构造函数，`argumentList` 为其初始化参数的对象实例。
- 异常：如果 `target` 或者 `newTarget` 不是构造函数，抛出 `TypeError` 异常。

```javascript
function Greeting(name) {
  this.name = name
}

// new 的写法
const instance = new Greeting('张三')

// Reflect.construct 的写法
const instance = Reflect.construct(Greeting, ['张三'])
```

### Reflect.get()

`Reflect.get(target, propertyKey[, receiver])` ：查找并返回 `target` 对象的 `name` 属性，如果没有该属性，则返回 `undefined` 。

- 参数
  - `target` ：需要取值的目标对象。
  - `propertyKey` ：需要获取的值的键值。
  - `receiver` ：可选，如果 `target` 对象中指定了 `getter`，`receiver` 则为 `getter` 调用时的 `this` 值。
- 返回值：属性的值。
- 异常：如果目标值类型不是 `Object`，抛出 `TypeError` 异常。

```javascript
var myObject = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  },
}

var myReceiverObject = {
  foo: 4,
  bar: 4,
}

Reflect.get(myObject, 'foo') // 1
Reflect.get(myObject, 'bar') // 2
Reflect.get(myObject, 'baz') // 3
Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

### Reflect.set()

`Reflect.set(target, propertyKey, value[, receiver])` ：设置 `target` 对象的 `name` 属性等于 `value` 。

- 参数
  - `target` ：设置属性的目标对象。
  - `propertyKey` ：设置的属性的名称。
  - `value` ：设置的值。
  - `receiver` ：如果遇到 `setter`，`receiver` 则为 `setter` 调用时的 `this` 值。
- 返回值：返回一个 `Boolean` 值，表明是否成功设置属性。
- 异常：如果目标值类型不是 `Object`，抛出 `TypeError` 异常。
- 注意：如果 `Proxy` 对象和 `Reflect` 对象联合使用，`Proxy` 拦截赋值操作，`Reflect` 完成赋值的默认行为，而且传入了 `receiver` ，那么 `Reflect.set` 会触发 `Proxy.defineProperty` 拦截。

```javascript
var myObject = {
  foo: 4,
  set bar(value) {
    return (this.foo = value)
  },
}

var myReceiverObject = {
  foo: 0,
}

Reflect.set(myObject, 'bar', 1, myReceiverObject)
myObject.foo // 4
myReceiverObject.foo // 1

// ==============================

let p = {
  a: 'a',
}

let obj = new Proxy(p, {
  set(target, key, value, receiver) {
    console.log('set')
    // 传入 receiver ，会触发 Proxy.defineProperty 拦截
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, attribute) {
    console.log('defineProperty')
    Reflect.defineProperty(target, key, attribute)
  },
})

obj.a = 'A'
// set
// defineProperty
```

### Reflect.defineProperty()

`Reflect.defineProperty(target, propertyKey, attributes)` ：等同于 `Object.defineProperty` ，用来为对象定义属性。唯一不同是返回 `Boolean` 值。

- 参数
  - `target` ：目标对象。
  - `propertyKey` ：要定义或修改的属性的名称。
  - `attributes` ：要定义或修改的属性的描述。
- 返回值：返回一个 `Boolean` 值，表明属性是否被成功定义。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。
- 与 `Object.defineProperty` 的区别：
  - `Object.defineProperty` ：如果成功则返回一个对象，否则抛出一个 `TypeError` 异常。可以使用 `try...catch` 捕获其中任何的错误。
  - `Reflect.defineProperty` ：返回 `Boolean` 值，作为是否成功的标识。可以使用 `if...else` 判断是否成功。

```javascript
function MyDate() {}

// 旧写法
Object.defineProperty(MyDate, 'now', {
  value: () => Date.now(),
})

// 新写法
Reflect.defineProperty(MyDate, 'now', {
  value: () => Date.now(),
})
```

### Reflect.deleteProperty()

`Reflect.deleteProperty(target, propertyKey)` ：等同于 `delete obj[name]`，用于删除对象的属性。

- 参数
  - `target` ：删除属性的目标对象。
  - `propertyKey` ：需要删除的属性的名称。
- 返回值：返回一个 `Boolean` 值，表明属性是否被成功删除。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。

```javascript
const myObj = { foo: 'bar' }

// 旧写法
delete myObj.foo

// 新写法
Reflect.deleteProperty(myObj, 'foo')
```

### Reflect.has()

`Reflect.has(target, propertyKey)` ：对应 `name in obj` 中的 `in` 运算符。

- 参数
  - `target` ：目标对象。
  - `propertyKey` ：属性名，需要检查目标对象是否存在此属性。
- 返回值：返回一个 `Boolean` 值，表明是否存在此属性。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。

```javascript
var myObject = {
  foo: 1,
}

// 旧写法
'foo' in myObject // true

// 新写法
Reflect.has(myObject, 'foo') // true
```

### Reflect.ownKeys()

`Reflect.ownKeys(target)` ：返回一个由目标对象自身的属性键组成的数组。基本等同于 `Object.getOwnPropertyNames` 与 `Object.getOwnPropertySymbols` 之和。

- 参数
  - `target` ：获取自身属性键的目标对象。
- 返回值：由目标对象的自身属性键组成的 `Array`。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。

```javascript
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for('baz')]: 3,
  [Symbol.for('bing')]: 4,
}

// 旧写法
Object.getOwnPropertyNames(myObject) // ['foo', 'bar']
Object.getOwnPropertySymbols(myObject) //[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject) // ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

### Reflect.isExtensible()

`Reflect.isExtensible(target)` ：判断一个对象是否可扩展（即是否能够添加新的属性）。对应 `Object.isExtensible` 。

- 参数
  - `target` ：检查是否可扩展的目标对象。
- 返回值：返回一个 `Boolean` 值，表明该对象是否可扩展。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。
- 与 `Object.isExtensible` 的区别：
  - `Object.isExtensible(target)` ：如果目标对象 `target` 不是一个对象（原始值），则被强制转换为一个对象。
  - `Reflect.isExtensible(target)` ：如果目标对象 `target` 不是一个对象（原始值），则会抛出 `TypeError` 异常。

```javascript
const myObject = {}

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true

Object.isExtensible(1) // false
Reflect.isExtensible(1) // 报错
```

### Reflect.preventExtensions()

`Reflect.preventExtensions(target)` ：阻止新属性添加到对象 (例如：防止将来对对象的扩展被添加到对象中)。对应 `Object.preventExtensions` 。

- 参数
  - `target` ：阻止扩展的目标对象。
- 返回值：返回一个 `Boolean` 值，表明目标对象是否成功被设置为不可扩展。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。
- 与 `Object.preventExtensions` 的区别：
  - `Object.preventExtensions(target)` ：如果目标对象 `target` 不是一个对象（原始值）
    - ES5 环境下，报错。
    - ES6 环境下，返回传入的非对象 `target` 参数。
  - `Reflect.preventExtensions(target)` ：如果目标对象 `target` 不是一个对象（原始值），则会抛出 `TypeError` 异常。

```javascript
var myObject = {}

// 旧写法
Object.preventExtensions(myObject) // Object {}

// 新写法
Reflect.preventExtensions(myObject) // true

Object.preventExtensions(1) // 报错，ES5 环境下报错
Object.preventExtensions(1) // 1。ES6 环境下返回传入参数
Reflect.preventExtensions(1) // 报错
```

### Reflect.getOwnPropertyDescriptor()

`Reflect.getOwnPropertyDescriptor(target, propertyKey)` ：如果属性在对象中存在，则返回给定的属性的属性描述符，否则返回 `undefined`。等同于 `Object.getOwnPropertyDescriptor` 。

- 参数
  - `target` ：需要寻找属性的目标对象。
  - `propertyKey` ：获取属性描述符的属性名称。
- 返回值：如果属性存在于给定的目标对象中，则返回属性描述符；否则，返回 `undefined`。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。
- 与 `Object.getOwnPropertyDescriptor` 的区别：
  - `Object.getOwnPropertyDescriptor()` ：如果目标对象 `target` 不是一个对象（原始值），返回 `undefined` 。
  - `Reflect.getOwnPropertyDescriptor()` ：如果目标对象 `target` 不是一个对象（原始值），抛出 `TypeError` 异常。

```javascript
var myObject = {}
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
})

// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden')

// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden')
```

### Reflect.getPrototypeOf()

`Reflect.getPrototypeOf(target)` ：返回指定对象的原型（即内部的 `[[Prototype]]` 属性的值）。等同于 `Object.getPrototypeOf()` 。

- 参数
  - `target` ：获取原型的目标对象。
- 返回值：给定对象的原型。如果给定对象没有继承的属性，则返回 `null`。
- 异常：如果目标对象不是 `Object`，抛出 `TypeError` 异常。
- 与 `Object.getPrototypeOf` 的区别：
  - `Object.getPrototypeOf()` ：如果目标对象 `target` 不是一个对象（原始值），则会被强制转换为一个对象。
  - `Reflect.getPrototypeOf()` ：如果目标对象 `target` 不是一个对象（原始值），则会抛出 `TypeError` 异常。

```javascript
const myObj = new FancyThing()

// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype

// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype

Object.getPrototypeOf(1) // 报错，ES5 环境下
Object.getPrototypeOf(1) // Number {[[PrimitiveValue]]: 0}，ES5 环境下
Reflect.getPrototypeOf(1) // 报错
```

### Reflect.setPrototypeOf()

`Reflect.setPrototypeOf(target, prototype)` ：设置目标对象的原型（即内部的 `[[Prototype]]` 属性），如果操作成功返回 `true`，否则返回 `false`。等同于 `Object.setPrototypeOf()` 。

- 参数
  - `target` ：设置原型的目标对象。
  - `prototype` ：对象的新原型（一个对象或 `null`）。
- 返回值：返回一个 `Boolean` 值，表明是否设置成功。
- 异常：如果目标对象不是 `Object`，或者设置的 `prototype` 既不是对象也不是 `null` ，抛出 `TypeError` 异常。
- 与 `Object.setPrototypeOf()` 的区别
  - `Object.setPrototypeOf()` ：如果目标对象 `target` 不是一个对象（原始值），则会返回目标对象本身。
  - `Reflect.setPrototypeOf()` ：如果目标对象 `target` 不是一个对象（原始值），则会抛出 `TypeError` 异常。

```javascript
const myObj = {}

// 旧写法
Object.setPrototypeOf(myObj, Array.prototype)
// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype)
myObj.length // 0

// 设置目标对象的原型，如果操作成功返回 true，否则返回 false
Reflect.setPrototypeOf({}, null) // true
Reflect.setPrototypeOf(Object.freeze({}), null) // false

// 如果目标对象不是一个对象（原始值）
Object.setPrototypeOf(1, {}) // 1
Reflect.setPrototypeOf(1, {}) // TypeError: Reflect.setPrototypeOf called on non-object

// 传入的目标对象为 null 或者 undefined
Object.setPrototypeOf(null, {}) // TypeError: Object.setPrototypeOf called on null or undefined
Reflect.setPrototypeOf(null, {}) // TypeError: Reflect.setPrototypeOf called on non-object
```
