# JS模块化

随着前端项目的逻辑越来越复杂，会导致很多问题，比如：全局变量冲突、依赖关系管理麻烦等。模块化带来的好处如下：

+ 解决命名污染，全局污染，变量冲突等问题，减少全局变量污染
+ 内聚私有，变量不能被外面访问到
+ 控制依赖
+ 增强代码的可维护性
+ 增加代码的复用性
+ 分治思想的实践

## 原生JS组织

+ function 模式：根据功能将代码封装为全局函数。该方案会污染全局命名空间， 容易引起命名冲突和数据不安全，同时，无法看出模块之间的依赖关系。
+ 对象模式：通过对象进行封装。该方案减少了全局变量，一定程度上解决了命名冲突的问题，但是还是存在数据安全的问题，从外部可以直接修改模块内部的数据。
+ IIFE（立即调用函数表达式）模式：通过立即调用函数封装。
  + 第一部分是包围在 `圆括号运算符 ()` 里的一个匿名函数。这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。
  + 第二部分再一次使用 `()` 创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。

  ``` javascript
  var calculator = (function () {
    function add(a, b) {
      return a + b;
    }
    return { add };
  })();
  calculator.add(1, 2);

  (function (window) {
    //...
    // Expose jQuery to the global object
    window.jQuery = window.$ = jQuery;
  })(window);
  ```

## CommonJS

CommonJS 是 Node.js 使用的模块规范，在 Node.js 模块系统中，每个文件都被视为独立的模块(对象)，模块的本地变量将是私有的，因为在执行模块代码之前，Node.js 将使用 `IIFE` 的方式对其进行封装。

``` javascript
(function(exports, require, module, __filename, __dirname) {
  // 模块代码实际存在于此处
});
```

规范：

+ 模块的标识应遵循一定的书写规则。
+ 定义全局函数 `require(dependency)`，通过传入模块标识来引入其他依赖模块，执行的结果即为别的模块暴漏出来的 API。
+ 如果被 `require` 函数引入的模块中也包含外部依赖，则依次加载这些依赖。
+ 如果引入模块失败，那么 `require` 函数应该抛出一个异常。
+ 模块通过变量 `exports` 来向外暴露 API，`exports` 只能是一个 `Object` 对象，暴露的 API 须作为该对象的属性。

使用方式：

``` javascript
// 【定义模块】 math.js
function add(a, b) {
  return a + b;
}
module.exports = { add: add };

// 【使用模块】
var math = require('./math');
math.add(1, 2); // 3
```

优点：

+ 简单易用。
+ 解决了模块依赖的问题。
+ 减少了全局变量污染。

缺点：

+ 无法在浏览器端使用。
+ 无法非阻塞的并行加载多个模块。

## CMD（Common Module Definition）: Sea.js

CMD 是 sea.js 在推广过程中对模块定义的规范化产出，属于 CommonJS 的一种规范。

使用方式：

``` javascript
// 【定义模块】
define(function (require, exports, module) {
  var add = function (a, b) {
    return a + b;
  };
  exports.add = add;
});

// 【使用模块】
seajs.use(['math.js'], function (math) {
  var sum = math.add(1, 2);
});
```

优点：

+ 实现了浏览器端的模块化加载。
+ 可以按需加载。
+ 依赖就近，延迟执行。

缺点

+ 依赖 SPM 打包，模块加载逻辑偏重。

## AMD（Async Module Definition）: RequireJS

在浏览器执行时，`RequireJS` 会对每一个模块创建一个 `Script` 标签，同时带上 `async` 参数（表示立即开始下载脚本，但不阻止其他页面动作），加载完所有依赖的模块之后，再通过 `load` 事件回调去执行最终输出的JS逻辑(类似 `Promise.all`)

AMD 模块实现的核心是**用函数包装模块定义**。可以防止声明全局变量，并允许加载器库控制何时加载模块。包装函数便于模块代码的移植，因为包装函数内部的所有模块代码使用的都是原生 JavaScript 结构。

对于 CMD/AMD 而言，浏览器需要下载了对应的 `require.js` 或者 `sea.js` 文件之后，才能进行模块依赖关系的分析，等于说整个过程放在了线上去执行，这必然会延长前端页面的加载时间，影响用户体验，同时在加载过程中突然生出了众多 `script` 标签 `http` 请求也影响页面性能。

规范：

+ 模块的标识遵循 CommonJS Module Identifiers。
+ 定义全局函数 `define(id, dependencies, factory)`，用于定义模块。`dependencies` 为依赖的模块数组，在 `factory` 中需传入形参与之一一对应。
+ 如果 `dependencies` 的值中有 `require`、`exports` 或 `module`，则与 CommonJS 中的实现保持一致。
+ 如果 `dependencies` 省略不写，则默认为 `['require', 'exports', 'module']`，`factory` 中也会默认传入三者。
+ 如果 `factory` 为函数，模块可以通过以下三种方式对外暴漏 API：
  + `return` 任意类型
  + `exports.XModule = XModule`
  + `module.exports = XModule`
+ 如果 `factory` 为对象，则该对象即为模块的导出值。

使用方式：

``` javascript
// 【定义模块】
// ========== 独立模块 ==========
define({
  method1: function () {},
  method2: function () {},
});

// 函数的返回值就是输出的模块
define(function () {
  return {
    method1: function () {},
    method2: function () {},
  };
});

// ========== 有依赖的模块 ==========
// module1 模块和 module2 模块指的是：当前目录下的 module1.js 文件和 module2.js 文件
// 等同于写成['./module1', './module2']
define(['module1', 'module2'], function (m1, m2) {
  // ...
});

// 【调用模块】
require(['foo', 'bar'], function (foo, bar) {
  foo.doSomething();
});
```

优点：

+ 可以用于浏览器。
+ 异步加载模块。
+ 可以并行加载多个模块。

缺点：

+ 提高了开发成本。
+ 不能按需加载，而是提前加载所有的依赖。

注： RequireJS 从 2.0 开始，也改成了可以延迟执行。

## UMD （Universal Module Definition）

UMD 是一种 JavaScript 通用模块定义规范，让模块能在 JavaScript 所有运行环境中发挥作用。

规定如下：

+ 优先判断是否存在 `exports` 方法，如果存在，则采用 `CommonJS` 方式加载模块；
+ 其次判断是否存在 `define` 方法，如果存在，则采用 `AMD` 方式加载模块；
+ 最后判断 `global` 对象上是否定义了所需依赖，如果存在，则直接使用；反之，则抛出异常。

## ES6 Module

完全支持 ES6 Module 的浏览器可以从顶级模块加载整个依赖图，且是异步完成的。浏览器会解析入口模块，确定依赖，并发送对依赖模块的请求。这些文件通过网络返回后，浏览器就会解析它们的内容，确定它们的依赖，如果这些二级依赖还没有加载，则会发送更多请求。这个异步递归加载过程会持续到整个应用程序的依赖图都解析完成。解析完依赖图，应用程序就可以正式加载模块了。

ES6 Module 特点：

+ 只能作为模块顶层的语句出现
+ `import` 的模块名只能是字符串常量
+ `import` binding 是 `immutable` 的

ES6 Module 的特点，可以在运行前就能确定ES6模块依赖关系。在 CommonJS 中，可以动态 require 一个模块，所以只能在运行时确定。

ES6 模块的设计思想是尽量的**静态化**，其模块依赖关系是确定的，和运行时的状态无关。在编译过程通过识别 `import` 很容易就能得出使用了哪些模块，也正是因为ES6的特性让 `tree-shaking` 成为可能。

静态分析（不执行代码，从字面量上对代码进行分析），JS Engine 的编译过程如下：

+ 词法分析(Tokenizing/Lexing)：将由字符组成的字符串分解成(对编程语言来说)有意义的代码块，这些代码块被称为**词法单元**。

  `var a = 2;` 这段程序通常会被分解成为下面这些词法单元：`var`、`a`、`=`、`2`
+ 解析/语法分析(Parsing)：将词法单元流(数组)转换成一个由元素逐级嵌套所组成的代表了程序语法结构的树，被称为“抽象语法树”(Abstract Syntax Tree，AST)。

  `var a = 2;` 的抽象语法树中可能会有一个叫作 `VariableDeclaration` 的顶级节点，接下来是一个叫作 `Identifier` (它的值是 a)的子节点，以及一个叫作 `AssignmentExpression` 的子节点。`AssignmentExpression` 节点有一个叫作 `NumericLiteral` (它的值是 2)的子节点。
+ 代码生成：将 AST 转换为可执行代码的过程被称为代码生成。

  通过某种方法可以将 `var a = 2;` 的 AST 转化为一组机器指令，用来创建一个叫作 `a` 的变量(包括分配内存等)，并将一个值储存在 `a` 中。

使用方式：

``` javascript
// 【导出模块】
export function hello() {}
export default {
  // ...
};

// 【引入模块】
import { readFile } from 'fs';
import React from 'react';
```

优点：语法层面的支持，使用简单。

缺点：浏览器还没有完全兼容，必须通过工具转换成标准的 ES5 后才能正常运行。

## 比对

### CommonJS 和 AMD 的对比

+ CommonJS 一般用于服务端比如 Node，AMD一般用于浏览器环境，并且允许非同步加载模块，可以根据需要动态加载模块
+ CommonJS 和 AMD 都是运行时加载

### AMD 和 CMD 的比对

+ AMD 定义模块时，指定所有的依赖，依赖模块加载后会执行回调并通过参数传到这回调方法中
+ CMD 规范中一个模块就是一个文件，模块更接近于 Node 对 CommonJS 规范的定义

### ES6 Module、CommonJS 和 AMD 的区别

+ 编译时加载 和 运行时加载
  + ES6 Module 的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。所以ES6是编译时加载。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。
  + CommonJS 实质是整体加载 `fs模块`（即加载fs的所有方法），生成一个对象（_fs），然后再从这个对象上面读取 3 个方法。这种加载称为 **运行时加载”**，因为只有运行时才能得到这个对象，导致完全没办法在编译时做 **静态优化**。
  + ES6 Module 实质是从 `fs模块` 加载 3 个方法，其他方法不加载。这种加载称为 **编译时加载（或静态加载）**，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。
+ 值拷贝 和 引用拷贝
  + CommonJS 是**值拷贝**，模块加载完并输出一个值，模块内部的变化就影响不到这个值。因为这个值是一个原始类型的值，**会被缓存**。
  + ES6 Module 是**动态引用**，并且**不会缓存值**，模块里面的变量绑定其所在的模块。JS 引擎对脚本静态分析的时候，遇到模块加载命令 `import`，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

## 参考

+ [写给前端新手看的一些模块化知识](https://mp.weixin.qq.com/s/tVy0meFSWUysGYTX_DmlBg)
+ [详细了解前端模块化](https://mp.weixin.qq.com/s/pPXuuq3igeG1Tl3in6AkXw)
+ [简单的复习下前端模块化相关的知识](https://mp.weixin.qq.com/s/wfqrGsGyOKYULb9gNg1o6w)
+ [掌握前端模块化](https://mp.weixin.qq.com/s/moJ6NSO47_FJRw5io0uidw)
