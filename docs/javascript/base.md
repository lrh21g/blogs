# JavaSript 基础

## 数据类型概述

+ 基本类型：最基本的数据类型，不能再细分了
  + 特点：
    + 基本数据类型 **存放在栈中**
    + 基本数据类型 **值不可变**
    + 基本类型的比较：**值的比较**
    + 基本类型的赋值：**赋值的两个变量是两个独立相互不影响的变量**。在内存中新开辟一段栈内存，然后再把再将值赋值到新的栈中
  + 主要分为：
    + `String`
    + `Boolean`
    + `Number`
    + `BigInt`：可以用任意精度表示整数。通过在整数末尾附加 n 或调用构造函数来创建的。
    + `Symbol`：符号类型。是唯一的并且是不可修改的。
    + 特殊值
      + `undefined`：表示 **此处无定义** 的原始值，转为数值时为`NaN`
      + `null`：表示 **空** 对象，转换为数值时为`0`
  
        注：不同对象在底层都表示为二进制，在JavaScript中二进制前三位都为 0 的话会被判断为 object 类型，null的二进制表示是全 0，所以只需 typeof 时会返回 object —— 《你不知道的JavaScript（上卷）》
+ 引用类型：一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。
  + 特点：
    + 引用类型 **存放在堆中**
    + 引用类型 **值可变**
    + 引用类型的比较：**引用的比较**
    + 引用类型的赋值：**传址**，只是改变指针的指向，即对象保存在栈中的地址的赋值。例如，两个变量就指向同一个对象，两者之间操作互相会有影响。
  + `Object`：最复杂的数据类型，可分为三个子类型
    + `狭义的对象(Object)`
    + `Array`：一种特殊的对象。特殊性体现 -- 在它的键名是按次序排列的一组整数（0，1，2...）
    + `function`：特殊引用类型，但不用于存储数据，所以没有“拷贝、复制函数”一说。

## 堆栈

堆和栈都是内存中划分出来用来存储的区域。

+ `栈(stack)`：自动分配的内存空间，它由系统自动释放；
+ `堆(heap)`：动态分配的内存，大小不定也不会自动释放。

## typeof 与 instanceof

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

## 浅拷贝与深拷贝

|        | 和原数据是否指向同一对象 | 第一层数据为基本数据类型，改变是否会使原数据改变 | 原数据中包含子对象，改变是否会使原数据改变 |
| ------ | :----------------------: | :----------------------------------------------: | :----------------------------------------: |
| 赋值   |            是            |                        会                        |                     会                     |
| 浅拷贝 |            否            |                       不会                       |                     会                     |
| 深拷贝 |            否            |                       不会                       |                    不会                    |

+ 浅拷贝：**只拷贝第一层的原始类型值，和第一层的引用类型地址**
  + 对象的 `Object.assign`：用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。
  + 数组的 `Array.prototype.slice()` 和 `Array.prototype.concat()`
  + ES6 扩展运算符 `...`
+ 深拷贝：**拷贝所有的属性值，以及属性地址指向的值的内存空间**
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

  注：深拷贝还需要考虑到 **引用丢失** 和 **递归爆栈** 的问题
  + 引用丢失

    ``` javascript
    var b = {};
    var a = {a1: b, a2: b};
    a.a1 === a.a2 // true
    var c = clone(a); // 深拷贝
    c.a1 === c.a2 // false
    ```
  
  + 递归爆栈：当数据的层次很深是就会栈溢出

  参考：[深拷贝的终极探索](https://yanhaijing.com/javascript/2018/10/10/clone-deep/)

## 类型转换

+ 类型转换
  
  ![base_type_change](./files/images/base_type_change.png)
  注： 图片来源于 [前端面试之道](https://juejin.im/book/5bdc715fe51d454e755f75ef)

  在JavaScript中类型转换只有三种情况：转换为布尔值、转换为数字、转换为字符串

  + 转为`Boolean`

    在条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 true，包括所有对象。
  + `对象` 转换为 `原始类型`

    对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：
    + 已经是原始类型 --> 不进行转换
    + 转字符串类型 --> 调用 `x.toString()` --> 转换为基础类型 --> 返回转换的值。
    + 不是字符串类型 --> 调用 `valueOf` -->
      + 结果不是基础类型 --> 调用 `toString`
      + 结果基础类型 --> 返回转换的值
      + 没有返回基础类型 --> 报错
  + 四则运算符
    + 加法
      + 运其中一方为字符串，那么就会把另一方也转换为字符串
      + 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串
    + 不是加法的运算符：只要其中一方是数字，那么另一方就会被转为数字
  + 比较运算符
    + 如果是**对象**，就通过 `toPrimitive` 转换对象
    + 如果是**字符串**，就通过 `unicode` 字符索引来比较
+ `==` 和 `===`
  
  对于 `==` 来说，如果对比双方类型不一致，就会发生类型转换。规则如下：
  ![base_double_equal](./files/images/base_double_equal.png)
  注： 图片来源于 [前端面试之道](https://juejin.im/book/5bdc715fe51d454e755f75ef)

  ``` javascript
  console.log([] == ![]); // true
  // 根据运算符优先级, ! 的优先级是大于 == ，所以先会执行 ![]
  // [] == ![] --> [] == false --> [] == 0 --> '' == 0 -> 0 == 0 --> true

  console.log({} == !{}); // false
  // {} == !{} --> {} == false --> {} == 0 --> NAN == 0 --> false
  ```

  除了 `== null` 之外，其他都一律用 `===`

  ``` javascript
  const obj = { x: 100 }
  if (obj.a == null) {}
  // 相当于
  // if (obj.a === null || obj.a === undefined) {}
  ```

+ `if语句` 类型转换
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

## DOM

`DOM` 是 JavaScript 操作网页的接口，全称为“文档对象模型”（Document Object Model）。它的作用是将网页转为一个 JavaScript 对象，从而可以用脚本进行各种操作（比如增删内容）。**DOM 只是一个接口规范，可以用各种语言实现。**

浏览器会根据 `DOM` 模型，将结构化文档（比如 `HTML` 和 `XML`）解析成一系列的节点，再由这些节点组成一个树状结构（DOM Tree）。所有的节点和最终的树状结构，都有规范的对外接口。

### 节点

`DOM` 的最小组成单位叫做节点（`node`）。文档的树形结构（`DOM` 树），就是由各种不同类型的节点组成。每个节点可以看作是文档树的一片叶子。

节点的类型有七种：

+ `Document`：整个文档树的顶层节点
+ `DocumentType`：doctype标签（比如`<!DOCTYPE html>`）
+ `Element`：网页的各种HTML标签（比如`<body>`、`<a>`等）
+ `Attr`：网页元素的属性（比如`class="right"`）
+ `Text`：标签之间或标签包含的文本
+ `Comment`：注释
+ `DocumentFragment`：文档的片段

浏览器提供一个原生的节点对象 `Node`，上面这七种节点都继承了 `Node`，因此具有一些共同的属性和方法。

### 节点数

一个文档的所有节点，按照所在的层级，可以抽象成一种树状结构。这种树状结构就是 `DOM` 树。它有一个顶层节点，下一层都是顶层节点的子节点，然后子节点又有自己的子节点，就这样层层衍生出一个金字塔结构，又像一棵树。

浏览器原生提供 `document` 节点，代表整个文档。

文档的第一层有两个节点，第一个是文档类型节点（`<!doctype html>`），第二个是 `HTML` 网页的顶层容器标签`<html>`。后者构成了树结构的根节点（`root node`），其他 `HTML` 标签节点都是它的下级节点。

除了根节点，其他节点都有三种层级关系。

+ 父节点关系（parentNode）：直接的那个上级节点
+ 子节点关系（childNodes）：直接的下级节点
+ 同级节点关系（sibling）：拥有同一d个父节点的节点

`DOM` 提供操作接口，用来获取这三种关系的节点。比如，子节点接口包括`firstChild`（第一个子节点）和`lastChild`（最后一个子节点）等属性，同级节点接口包括`nextSibling`（紧邻在后的那个同级节点）和`previousSibling`（紧邻在前的那个同级节点）属性。

property 和 attribute

+ property：修改对象属性，不会体现到 html 结构中
+ attribute：修改 html 属性，会改变 html 结构
+ 两者都有可能引起 DOM 重新渲染

## BOM

## 事件绑定

## ajax

## 存储
