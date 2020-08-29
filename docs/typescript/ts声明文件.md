# 声明文件

## 识别库类型

### 全局库

全局库：不需要我们引入什么变量，只需要将库引入即可使用的库。

可以通过看库的源码，来判断它是什么类型，一个全局库，通常会包含下面内容中的一个或多个：

+ 顶级的 `var` 语句或 `function` 声明: 顶级的 `var` 或 `function` 是直接在全局环境声明变量或函数，不使用立即执行函数包裹会影响到全局，所以有这种一般会是全局库
+ 一个或多个赋值给 `window.someName` 的赋值语句: 当出现给 `window` 设置某个属性名 `someName` ，然后给这个属性赋值的语句时，是在给全局对象 `window` 赋值。引入这个库后直接通过 `window.someName` 即可在全局任何地方访问到这个属性值
+ 判断 `document` 或 `window` 是否存在的判断逻辑: 出现 `if` 语句或三元操作符这种判断 `document` 或 `window` 是否存在的语句，也有可能是要给这两个全局对象添加内容，所以也有可能是全局库。

官方为每一种库类型都提供了响应的声明文件模板，全局库的模板是global.d.ts。

``` typescript
// 如果这个库有一个全局暴露的函数，可能可以传入不同类型的参数，返回不同的值，所以可以为它定义函数重载
declare function myLib(a: string): string;
declare function myLib(a: number): number;
// 如果想让这个库名作为一种类型，可以定义一个接口
declare interface myLib {
  name: string;
  length: number;
  extras?: string[];
}
// 如果这个库有一些需要在全局暴露的属性，可以定义这个命名空间，将值、接口和类型别名等定义在这里
// 这样，在下面命名空间中没有列出的内容，通过myLib.xxx访问时在编译阶段会报错，但是运行时是可以访问的，只要这个JS库里定义了。
declare namespace myLib {
  let timeout: number; // 通过myLib.timeout访问，也可以修改: myLib.timeout = 123
  const version: string; // 可通过myLib.version访问，但不能修改，因为是const声明的
  class Cat {
    constructor(n: number);
    readonly age: number;
    purr(): void;
  }
  interface CatSettings {
    weight: number;
    name: string;
    tailLength?: number;
  }
  type VetID = string | number;
  function checkCat(c: Cat, s?: VetID);
}
```

示例：

``` typescript
// handle-title.js
function setTitle(title) {
  document && (document.title = title);
}
function getTitle() {
  return (document && document.title) || "";
}
let documentTitle = getTitle();

// handle-title.js 库的声明文件
// handle-title.d.ts
declare function setTitle(title: string | number): void;
declare function getTitle(): string;
declare let documentTitle: string;

// 在 tsconfig.json 里，通过设置 include 来让编译器自动引入"./src/"文件夹下的所有声明文件：
// 定义在src/types文件夹下的所有声明文件就会起作用了
"include": [
  "./src/**/*.ts",
  "./src/**/*.d.ts"
]
```

### 模块化库

模块化库：即依赖模块解析器的库。

判断一个库是模块化库 —— 在模块库代码中，一般会看到下面的情况之一：

+ 无条件地调用 `require` 或 `define` 方法：因为模块化库依赖模块解析器环境，在使用这种库的时候，就已经引入模块解析器的 `require` 或 `define` 等方法了，所以模块化库会直接调用这些方法来加载代码。
+ 包括 `import * as a from 'b’` 或者 `export c` 这样的声明；
+ 赋值给 `exports.someName` 或 `module.exports`。

针对模块，官方有三个模板声明文件，分别是 `module.d.ts`、`module-class.d.ts` 和 `module-function.d.ts`：

+ 如果这个模块引入后，可以直接当做函数调用，可以参考 `module-function.d.ts` 文件；
+ 如果模块引入后，可以直接当做类使用 `new` 关键字创建实例，可以参考 `module-class.d.ts` 文件；
+ 如果模块不能被调用也不能当做类，参考 `module.d.ts`。

### UMD库

UMD 库将全局库和模块库的功能进行了结合，它会先判断环境中有没有模块加载器的一些特定方法。

+ 如果有，说明是模块加载器环境，UMD 库就会使用模块的方式导出；
+ 如果没有检测到这些方法，则会将内容添加到全局环境。

现在很多库都是 UMD 库，比如 jQuery、moment 等，你既可以在 html 文件中直接通过 `<script>` 标签引入它，也可以通过模块的形式引入。

一般你会在 UMD 库中看到这种逻辑判断：

``` typescript
(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["libName"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("libName"));
  } else {
    root.returnExports = factory(root.libName);
  }
})(this, function(b) {
  // ...
});
```

## 为不同类型书写声明文件

### 模块插件或 UMD 插件

一些模块和插件是支持插件机制的，比如我们常见的 jQuery，它的插件有非常多。我们可以为库书写声明文件的同时，为库的插件定义声明文件，可以参考官方模板 `module-plugin.d.ts`。

### 全局插件

全局插件往往会修改全局中一些对象，在这些对象上添加或修改属性方法。可以参考官方的 `global-plugin.d.ts` 模板来书写声明文件。

``` typescript
// add-methods-to-string.js
String.prototype.getFirstLetter = function() {
  return this[0];
};

// global-plugin.d.ts
interface String {
  getFirstLetter(): number;
}
// index.ts
var str = "Lison";
console.log(str.getFirstLetter()); // "L"
```

### 修改全局的模块

一些影响全局的全局模块，这些模块除了导出一些东西，还会直接修改全局的一些对象。这类全局模块，可以参考官方的 `global-modifying-module.d.ts` 模板来书写声明文件。

``` typescript
// add-methods-to-string模块
String.prototype.getFirstLetter = function() {
  return this[0];
};
// index.js
require("add-methods-to-string");
const name = "Lison";
console.log(name.getFirstLetter()); // "L"

// 声明文件 global-modifying-module.d.ts
// 注意: 如果声明文件没有需要导出的东西，必须在末尾加上export {}，TS 编译器才会把这个声明文件当做一个模块声明。
declare global {
  interface String {
    getFirstLetter(): number;
  }
}
export {};
```

### 使用依赖

库多数会依赖其它库，所以可以在定义库声明文件的时候，声明对其它库的依赖，从而加载其它库的内容。

+ 如果是依赖全局库，可以使用 `///<reference types=“UMDModuleName” />` 三斜线指令来指定加载了某个全局库：

  ``` typescript
  /// <reference types="globalLib" />
  function func(): globalLib.someName;
  ```

+ 如果依赖的是模块库，可以使用 import 语句

  有些库是没有 `default` 默认输出的，所以如果在使用 `import xxx from 'xxx’` 语句引入一个库报错时，可以使用 `import * as xxx from 'xxx’` 的形式引入。

  ``` typescript
  import * as moment from "moment";
  function func(): moment;
  ```

+ 如果是全局库依赖于某个 UMD 模块，也可以使用 `///<reference types=“UMDModuleName” />` 三斜线指令来指定对某个 UMD 模块的依赖：

  ``` typescript
  // globals.d.ts
  /// <reference types="moment"/>
  function getMoment(): moment;
  ```

+ 如果模块或一个 UMD 库依赖于一个 UMD 库，使用 `import * as` 语句引入模块

  ``` typescript
  // module.d.ts
  import * as moment from "moment";
  export default function(m: typeof moment): void;
  ```

注意：

+ 防止命名冲突: 在写全局声明时，在全局范围定义大量类型，有时会导致命名冲突。所以建议相关的定义放到命名空间内。
+ ES6 模块插件影响: 一些开发者为一些库开发了插件，用在原有库的基础上添加更多功能，这往往需要修改原有库导出的模块。ES6 模块标准中，导出的模块是不允许修改的；在 CommonJS 和其它一些加载器里是允许的，所以要使用 ES6 模块的话要注意这一点。
+ ES6 模块调用: 在使用一些库的时候，引入的模块可以作为函数直接调用。ES6 的模块顶层对象是一个对象，它不能作为函数调用。想导出一个直接可以调用的函数，又要使用 ES6 模块，则可以用 `export default` 来导出一个函数

  ``` typescript
  // moduleB.js
  export const age = 10;
  export let name = "lison";
  // main.js
  import info from "./moduleB.js";
  console.log(info.name); // 'lison'
  // index.js
  import { name, age } from "./moduleB.js";
  console.log(name); // 'lison'
  ```

### 快捷外部模块声明

如果使用一个新模块不想花时间精力为这个模块写声明，TS 2.0+ 版本支持了快捷外部模块声明。

比如使用 moment 模块，就可以在 typings 创建一个 moment 文件夹，并在这个 moment 文件夹创建一个 index.d.ts 文件，写如下内容：

``` typescript
// index.d.ts
declare module "moment";
```

## 官方声明文件模板

+ `global-modifying-module.d.ts`：适合修改全局的模块。
+ `global-plugin.d.ts`：适合全局插件。
+ `global.d.ts`：适合全局库。
+ `module-class.d.ts`：适合引入后可以直接当做类使用new关键字创建实例的模块。
+ `module-function.d.t`s：适合引入后可以直接当做函数的模块，
+ `module-plugin.d.ts`：适合模块插件或UMD插件。
+ `module.d.ts`：适合引入后既不能当做类直接使用，也不能直接当做函数调用的模块
