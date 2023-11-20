# JSON

## 概述

JSON （JavaScript Object Notation） 是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 `null` 。

JSON 语法支持 3 种类型的值：

- 简单值：字符串、数值、布尔值和 `null` ，但是 `undefined` 不可以。
  - 数值：禁止出现前导零（`JSON.stringify` 方法自动忽略前导零，而在 `JSON.parse` 方法中将会抛出 `SyntaxError`）；如果存在小数点，则后面至少跟一位数字。
  - 字符串：必须使用双引号。禁止某些控制字符；Unicode 行分隔符（`U+2028`）和段分隔符（`U+2029`）被允许。
- 对象：表示有序的键/值对。值可以是简单值，也可以是复杂类型。
- 数组：表示可以通过数值索引访问值的有序列表。数组的值可以是任意类型。

## JSON.stringify()

**语法** ： `JSON.stringify(value[, replacer[, space]])`

**描述** ： 将一个 JavaScript 值（对象或数组）转换为一个 JSON 字符串。

- 转化值如果有 `toJSON()` 方法，则调用该方法，然后对返回值进行序列化。
- 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
- 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
- `undefined`、任意的函数以及 `symbol` 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。函数、`undefined` 被单独转换时，会返回 `undefined`，如 `JSON.stringify(function(){})` 或 `JSON.stringify(undefined)` 。
- 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
- 所有以 `symbol` 为属性键的属性都会被完全忽略掉。
- `Date` 日期调用了 `toJSON()` 将其转换为了 `string` 字符串（同 `Date.toISOString()`），因此会被当做字符串处理。
- `NaN` 和 `Infinity` 格式的数值及 `null` 都会被当做 `null`。
- 其他类型的对象，包括 `Map` / `Set` / `WeakMap` / `WeakSet`，仅会序列化可枚举的属性。

**参数** ：

- `value` ： 将要序列化成一个 JSON 字符串的值。
- `replacer` ： 可选值。
  - 如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理。
  - 如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中。
  - 如果该参数为 `null` 或者未提供，则对象所有的属性都会被序列化。
- `space` ： 可选值。用于美化输出（添加缩进、空格和换行）。
  - 如果该参数是一个数值，则表示每个级别缩进的空格数。上限为 `10`，该值若小于 `1`，则意味着没有空格。
  - 如果该参数是一个字符串，则该字符串将被作为空格。如果该字符串的长度超过 `10` 个字符，则取其前 `10` 个字符。
  - 如果该参数为 `null` 或者未提供，则没有空格。

```javascript
JSON.stringify({}) // '{}'
JSON.stringify(true) // 'true'
JSON.stringify('foo') // '"foo"'
JSON.stringify([1, 'false', false]) // '[1,"false",false]'
JSON.stringify({ x: 5 }) // '{"x":5}'

JSON.stringify({ x: 5, y: 6 })
// "{"x":5,"y":6}"

JSON.stringify([new Number(1), new String('false'), new Boolean(false)])
// '[1,"false",false]'

JSON.stringify({ x: undefined, y: Object, z: Symbol('') })
// '{}'

JSON.stringify([undefined, Object, Symbol('')])
// '[null,null,null]'

JSON.stringify({ [Symbol('foo')]: 'foo' })
// '{}'

JSON.stringify({ [Symbol.for('foo')]: 'foo' }, [Symbol.for('foo')])
// '{}'

JSON.stringify({ [Symbol.for('foo')]: 'foo' }, function (k, v) {
  if (typeof k === 'symbol') {
    return 'a symbol'
  }
})

// undefined

// 不可枚举的属性默认会被忽略：
JSON.stringify(
  Object.create(null, {
    x: { value: 'x', enumerable: false },
    y: { value: 'y', enumerable: true },
  })
)

// "{"y":"y"}"
```

```javascript
function replacer(key, value) {
  if (typeof value === 'string') {
    return undefined
  }
  return value
}

var foo = {
  foundation: 'Mozilla',
  model: 'box',
  week: 45,
  transport: 'car',
  month: 7,
}

JSON.stringify(foo, replacer) 
// {"week":45,"month":7}

JSON.stringify(foo, ['week', 'month'])
// '{"week":45,"month":7}', 只保留 “week” 和 “month” 属性值
```

```javascript
var obj = {
  foo: 'foo',
  toJSON: function () {
    return 'bar'
  },
}

JSON.stringify(obj) // '"bar"'
JSON.stringify({ x: obj }) // '{"x":"bar"}'
```

## JSON.parse()

**语法** ： `JSON.parse(text[, reviver])`

**描述** ： 解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。

**参数** ：

- `text` ： 要被解析成 JavaScript 值的字符串，它是一个 JSON 格式的字符串。
- `reviver` ： 可选值。
  - 如果指定了 `reviver` 函数，则解析出的 JavaScript 值（解析值）会经过一次转换后才将被最终返回（返回值）。

    解析值本身以及它所包含的所有属性，会按照一定的顺序（从最最里层的属性开始，一级级往外，最终到达顶层，也就是解析值本身）分别的去调用 `reviver` 函数。

    当遍历到最顶层的值（解析值）时，传入 `reviver` 函数的参数会是空字符串 `""`（因为此时已经没有真正的属性）和当前的解析值（有可能已经被修改过了）。

  - 如果 `reviver` 返回 `undefined`，则当前属性会从所属对象中删除；如果返回了其他值，则返回的值会成为当前属性新的属性值。

```javascript
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

JSON.parse('{"p": 5}', function (k, v) {
  if (k === '') return v // 如果到了最顶层，则直接返回属性值，
  return v * 2 // 否则将属性值变为原来的 2 倍。
}) 
// { p: 10 }

JSON.parse('{"1": 1, "2": 2,"3": {"4": 4, "5": {"6": 6}}}', function (key, value) {
  // 输出当前的属性名，从而得知遍历顺序是从内向外的，
  // 最后一个属性名会是个空字符串。
  console.log(key) 
  
  return value // 返回原始属性值，相当于没有传递 reviver 参数。
})
// 输出结果如下：
// 1
// 2
// 4
// 6
// 5
// 3
// ""
```
