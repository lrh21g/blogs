# JavaSript 基础

## 变量类型和计算

### 值类型和引用类型

+ 值类型: `undefined`、`String`、`Number`、`Boolean`、`Symbol`
+ 引用类型: `Object`、`Array`、`null`(特殊引用类型，指针指向为空地址)、`function`(特殊引用类型，但不用于存储数据，所以没有“拷贝、复制函数”一说)

栈从上往下，堆从下往上。

+ 值类型通过栈进行存储，暂用空间较小
+ 引用类型通过堆进行存储，如果使用栈进行存储引用类型，当引用类型数据量大的时候，进行复制则会很慢。

### `typeof` 与 `instanceof`

+ `typeof`：能识别所有值类型、函数；判断是否是引用类型（不可再细分）
  
  ``` javascript
  // 能判断所有值类型
  let a;              typeof a // 'undefined'
  const str = 'abc';  typeof str // 'string'
  const n = 100;      typeof n // 'number'
  const b = true;     typeof b // 'boolean'
  const Symbol('s');  typeof s // 'symbol'
  // 能判断函数
  typeof console.log // 'function'
  typeof function () {} // 'function'
  // 能识别引用类型（不能再继续识别）
  typeof null // 'object'
  typeof ['a', 'b'] // 'object'
  typeof { x: 100 } // 'object'
  ```

+ `instanceof`：用于实例和构造函数的对应。
  
  判断一个变量是否是数组，使用 `typeof` 无法判断，但可以使用 `[1, 2] instanceof Array` 来判断。因为，[1, 2]是数组，它的构造函数就是Array。

  ``` javascript
  function Foo(name) {
    this.name = name
  }
  var foo = new Foo('bar')
  console.log(foo instanceof Foo) // true
  ```

### 浅拷贝与深拷贝

+ 浅拷贝的方式
  + `Object.assign`
  + 展开运算符 `...`
+ 深拷贝
  + `JSON.parse(JSON.stringify(object))`

    局限性：会忽略 `undefined`、会忽略 `symbol`、不能序列化函数（会忽略函数）、不能解决循环引用的对象（会报错）
  + `MessageChannel`
  
    `MessageChannel`创建了一个通信的管道，这个管道有两个端口，每个端口都可以通过 `postMessage` 发送数据，而一个端口只要绑定了 `onmessage` 回调方法，就可以接收从另一个端口传过来的数据。
  
    局限性：不能包含函数，否则会报错

    ``` javascript
    // 注：该方法是异步，可以处理 undefined 和循环引用对象
    function structuralClone(obj) {
      return new Promise(resolve => {
        const { port1, port2 } = new MessageChannel()
        port2.onmessage = ev => resolve(ev.data)
        port1.postMessage(obj)
      })
    }
    ```
  
  + 简易版深拷贝和 `lodash` 的深拷贝函数

    实现深拷贝需要考虑很多边界情况，比如原型链如何处理、DOM 如何处理等等。可以使用 `lodash` 的深拷贝函数

    简易版深拷贝

    ``` javascript
    function deepClone(obj) {
      function isObject(o) {
        return (typeof o === 'object' || typeof o === 'function') && o !== null
      }
      if (!isObject(obj)) {
        throw new Error('非对象')
      }
      let isArray = Array.isArray(obj)
      let newObj = isArray ? [...obj] : { ...obj }
      // Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组
      Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
      })
      return newObj
    }
    ```

### 类型转换

+ 字符串拼接
+ `==` 和 `===`
  除了 `== null` 之外，其他都一律用 `===`

  ``` javascript
  const obj = { x: 100 }
  if (obj.a == null) {}
  // 相当于
  // if (obj.a === null || obj.a === undefined) {}
  ```

+ `if`语句
  + truely变量：`!!a === true` 的变量
  + falsely变量：`!!a === false` 的变量
  
    ``` javascript
    // 以下是 falsely 变量。除此之外都是 truely 变量
    !!0 === false
    !!NaN === false
    !!'' === false
    !!null === false
    !!undefined == false
    !! false === false
    ```
