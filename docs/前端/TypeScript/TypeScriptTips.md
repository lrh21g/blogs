# TypeScript Tips

## 可辨识联合类型保证每个 case 都被处理

把单例类型、联合类型、类型保护和类型别名这几种类型进行合并，来创建一个叫做可辨识联合的高级类型，它也可称作标签联合或代数数据类型。

可辨识联合要求具有两个要素：

+ 具有普通的单例类型属性（单例类型，符合单例模式的数据类型，比如枚举成员类型，字面量类型。）
+ 一个类型别名，包含了那些类型的联合（即把几个类型封装为联合类型，并起一个别名）。

### 利用 strictNullChecks

``` typescript
interface Square {
  kind: "square";
  size: number;
}
interface Rectangle {
  kind: "rectangle";
  height: number;
  width: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}
interface Triangle {
  kind: "triangle";
  bottom: number;
  height: number;
}
type Shape = Square | Rectangle | Circle | Triangle;
// Shape 联合有四种接口，但函数的 switch 里只包含三个 case，编译器并没有提示任何错误
// 因为当传入函数的是类型是 Triangle 时，没有任何一个 case 符合，则不会有 return 语句执行，那么函数是默认返回 undefined。
// 开启 strictNullChecks，然后让函数的返回值类型为 number，那么当返回 undefined 的时候，就会报错
function getArea(s: Shape) {
  // error Function lacks ending return statement and return type does not include 'undefined'
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
  }
}
```

### 使用 never 类型

当函数返回一个错误或者不可能有返回值的时候，返回值类型为 `never`。

可以给 `switch` 添加一个 `default` 流程，当前面的 `case` 都不符合的时候，会执行 `default` 后的逻辑。

采用这种方式，需要定义一个额外的 `asserNever` 函数，但是这种方式不仅能够在编译阶段提示遗漏了判断条件，而且在运行时也会报错。

``` typescript
function assertNever(value: never): never {
  throw new Error("Unexpected object: " + value);
}
function getArea(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.height * s.width;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      return assertNever(s); // error 类型“Triangle”的参数不能赋给类型“never”的参数
  }
}
```

## this

在 JavaScript 中，`this` 可以用来获取对全局对象、类实例对象、构建函数实例等的引用，在 TypeScript 中，`this` 也是一种类型

TypeScript 1.7+，编译器对有继承行为的类中 `this` 的类型有推断

对象的属性值可以是一个函数（也称为方法），在方法内如果访问`this`，`this` 的类型的规则有：

+ 如果该方法具有显式声明的此参数，则该参数具有该参数的类型。

  ``` typescript
  let info = {
    name: 'Tom',
    getName(this: { age: number }) {
      this; // 这里的this的类型是{ age: number }
    }
  };
  ```

+ 否则，如果该方法由具有此参数的签名进行上下文类型化，则该参数具有该参数的类型。

  ``` typescript
  let info = {
    name: 'Tom',
    getName () {
      return this.name // "Tom"
      // 这里this的类型为 { name: string; getName(): string; }
    }
  }
  ```

+ 否则，如果在 `tsconfig.json` 里将 `noImplicitThis` 设为 `true`，且包含的对象文字具有包含 `ThisType<T>` 的上下文类型，则其类型为 `T`。

  ``` typescript
  // 使用类型别名定义一个接口，这里用了泛型，两个泛型变量 D 和 M
  type ObjectDescriptor<D, M> = {
    data?: D; // 可选字段，类型为D
    // methods: 可选字段，类型为 M 和 ThisType<D & M> 组成的交叉类型；  
    // ThisType 是一个内置的接口，用来在对象字面量中键入 this
    // 这里指定this的类型为 D & M  
    methods?: M & ThisType<D & M>;  
  }

  // 参数desc的类型为 ObjectDescriptor<D, M>
  function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    // 返回对象的类型是 D & M，因为同时包含 D 和 M 两个类型的字段  
    return { ...data, ...methods } as D & M;
  }

  let obj = makeObject({
    // data 的类型是 ObjectDescriptor<D, M> 类型中的 D
    data: { x: 0, y: 0 },
    // methods 的类型是 ObjectDescriptor<D, M> 类型中的 M
    methods: {
      moveBy(dx: number, dy: number) {
        // 这里的 this 是通过 ThisType<D & M> 指定的
        // this的类型就是 D & M
        this.x += dx;
        this.y += dy;
      }
    }
  });
  obj.x = 10;
  obj.y = 20;
  obj.moveBy(5, 5);
  ```

+ 否则，如果启用了 `--noImplicitThis` 并且包含的对象文字具有不包含 `ThisType<T>` 的上下文类型，则它具有上下文类型。

  使用了 `ThisType<T>` 的例子中，`ObjectDescriptor<D, M>` 类型中指定 `methods` 的类型中的 `& ThisType<D & M>` 去掉

  会发现 `moveBy` 方法中 `this.x` 和 `this.y` 报错，因为此时 `this` 的类型是 `methods` 这个对象字面量的类型。

+ 否则，`this` 的类型为 `any` 任何类型。


## 使用模块封装代码

### export

`export` 能够导出声明、变量、函数、类，还包括 TypeScript 特有的类型别名和接口。

``` typescript
// funcInterface.ts
export interface Func {
  (arg: number): string;
}
export class C {
  constructor() {}
}
class B {}
export { B };
export { B as ClassB };

// main.ts
export * from "./moduleB";
// main.ts
export { name } from "./moduleB";
// main.ts
export { name as nameProp } from "./moduleB";
```

### import

使用 `import` 引入模块

``` typescript
// main.ts
import { name } from "./moduleB";
// main.ts
import * as info from "./moduleB";
// main.ts
import { name as nameProp } from "./moduleB";
// 使用 import 直接接模块名或文件路径，进行具有副作用的导入
import "./set-title.ts";
```

### export default

``` typescript
// 在 TypeScript 中使用 export default 默认导出
// moduleB.ts
export default "lison";
// main.ts
import name from "./moduleB.ts";
console.log(name); // 'lison'
```

### export = 和 import = require()

TypeScript 为了兼容 CommonJS 和 AMD 两种模块系统语法，使得编译后的声明文件同时支持这两种模块系统，增加了 `export =` 和 `import xx = require()` 两个语句。

使用 `export =` 导出的模块，必须使用 `import xx = require()` 来引入

``` typescript
// moduleC.ts
class C {}
export = C;

// 如果模块不需要同时支持这两种模块系统，可以不使用 export = 来导出内容
// main.ts
import ClassC = require("./moduleC");
const c = new ClassC();
```

### 相对和非相对模块导入

根据引入模块的路径是相对还是非相对，模块的导入会以不同的方式解析。

+ 相对导入
  
  相对导入是以 `./`（当前目录） 或 `../`（当前目录的上一级目录） 开头的。

  模块解析策略：

  ``` typescript
  import moduleA from "../module/moduleA";
  ```

  + 编译器在解析模块引用的时候，如果遇到**省略后缀**的情况，会依次查找以该名称为文件名的`.ts`、`.tsx`、`.d.ts`文件。
  + 如果没找到，会在当前文件夹下的 package.json 文件里查找 types 字段指定的模块路径，然后通过这个路径去查找模块
  + 如果没找到 package.json 文件或者 types 字段，则会将 moduleA 当做文件夹去查找，如果它确实是文件夹，将会在这个文件夹下依次查找 `index.ts`、`index.tsx`、`index.d.ts`。
  + 如果还没找到，会在上面例子中 module 文件夹的上级文件夹继续查找，查找规则和前面这些顺序一致。

+ 非相对导入
  
  除了 `./` 或 `../` 开头的路径，都被当做非相对路径。非相对模块的导入可以相对于 baseUrl，也可以通过路径映射，还可以解析为外部模块。

## 使用命名空间封装代码

命名空间与模块的区别：

+ 当在程序内部用于防止全局污染，把相关的内容都放在一起的时候，使用命名空间
+ 当封装了一个工具或者库，要适用于模块系统中引入使用时，适合使用模块。

### 定义和使用

命名空间的定义实际相当于定义了一个大的对象，里面可以定义变量、接口、类、方法等等，但是如果不使用 `export` 关键字指定此内容要对外可见的话，外部是没法访问到的。

命名空间如果不是使用 webpack 等工具编译，而是使用 tsc 编译，那只需要在使用外部命名空间的地方使用 `/// <reference path=“namespace.ts”/>` 来引入，注意三斜线 ”///“ 开头，然后在 path 属性指定相对于当前文件，这个命名空间文件的路径。编译时，需要指定一个参数 outFile（–outFile 用来指定输出的文件路径和文件名，最后指定要编译的文件）。

注意：使用 outFile 只支持amd和system两种模块标准，所以需要在tsconfig.json里，设置 module 编译选项。

``` typescript
// Validation.ts
namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/; // 定义正则
  // 定义正则，与 isLetterReg 的区别在于使用 export 导出了
  export const isNumberReg = /^[0-9]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}

// index.ts
// 命名空间在引入的时候，使用 tsc 命令行编译文件，命名空间的引入如下：
/// <reference path="validation.ts"/>
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter);
console.log(reg);

// 使用 tsc 命令行编译后的 js 文件
var Validation;
(function(Validation) {
  var isLetterReg = /^[A-Za-z]+$/;
  Validation.isNumberReg = /^[0-9]+$/;
  Validation.checkLetter = function(text) {
    return isLetterReg.test(text);
  };
})(Validation || (Validation = {}));
/// <reference path="namespace.ts"/>
var isLetter = Validation.checkLetter("sdfsd");
var reg = Validation.isNumberReg;
console.log(isLetter);
console.log(reg);

// 在项目中时时使用，需要使用 export 将命名空间导出
// 其实就是作为模块导出，然后在 index.ts 中引入
// 注意：命名空间本来就是防止变量污染，但是模块也可以。这种情况应该使用模块

// Validation.ts
export namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/;
  export const isNumberReg = /^[0-9]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}

// index.ts
import { Validation } from "./Validation.ts";
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter); // true
console.log(reg); // /^[0-9]+$/
```

### 拆分为多个文件

随着内容不断增多，可以将同一个命名空间拆成多个文件分开维护，但仍然是同一个命名空间。

使用 `reference` 引入的命名空间都会被编译在一个文件，而且是按照引入的顺序编译的。

``` typescript
// Validation.ts
namespace Validation {
  const isLetterReg = /^[A-Za-z]+$/;
  export const isNumberReg = /^[0-9]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}

// 将 Validation.ts 拆开成 LetterValidation.ts 和 NumberValidation.ts

// LetterValidation.ts
namespace Validation {
  export const isLetterReg = /^[A-Za-z]+$/;
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text);
  };
}
// NumberValidation.ts
namespace Validation {
  export const isNumberReg = /^[0-9]+$/;
  export const checkNumber = (text: any) => {
    return isNumberReg.test(text);
  };
}
// index.ts
/// <reference path="./LetterValidation.js"/>
/// <reference path="./NumberValidation.js"/>
let isLetter = Validation.checkLetter("sdfsd");
const reg = Validation.isNumberReg;
console.log(isLetter); // true
```

### 别名

可以使用 `import` 给常用的对象起一个别名。

注意，这个别名和类型别名不是一回事，而且这儿的 import 也只是为了创建别名不是引入模块。

使用 `import` 关键字来定义命名空间中某个输出元素的别名，可以减少我们深层次获取属性的成本。

``` typescript
namespace Shapes {
  export namespace Polygons {
    export class Triangle {}
    export class Squaire {}
  }
}
// 使用 import 关键字给 Shapes.Polygons 取一个别名 polygons
import polygons = Shapes.Polygons;
let sq = new polygons.Square();
```

## 声明合并

声明合并：将名字相同的多个声明合并为一个声明，合并后的声明同时拥有多个声明的特性。

TypeScript的所有声明概括起来，会创建这三种实体之一：

+ 命名空间: 创建一个对象，对象的属性是在命名空间里 export 导出的内容
+ 类型: 创建一个类型并赋给一个名字
+ 值: 创建一个在 JavaScript 中可以使用的值

| 声明类型            | 创建了命名空间 | 创建了类型 | 创建了值 |
| :------------------ | :------------: | :--------: | :------: |
| Namespace           |       √        |            |    √     |
| Class               |                |     √      |    √     |
| Enum                |                |     √      |    √     |
| Interface           |                |     √      |          |
| Type Alias 类型别名 |                |     √      |          |
| Function            |                |            |    √     |
| Variable            |                |            |    √     |

注意：`Variable` 是变量，不是常量，常量是可以作为类型使用的。

### 合并接口

多个同名接口，定义的非函数的成员命名应该是不重复的，如果重复了，类型应该是相同的，否则将会报错。

``` typescript
interface Info { name: string }
interface Info { age: number }
// error 后续属性声明必须属于同一类型。
// 属性“age”的类型必须为“number”，但此处却为类型“boolean”
interface Info { age: boolean }
```

对于函数成员，每个同名函数成员都会被当成这个函数的重载，且合并时后面的接口具有更高的优先级。

``` typescript
interface Res {
  getRes(input: string): number
}
interface Res {
  getRes(input: number): string
}
const res: Res = {
  getRes: (input: any): any => {
    if (typeof input === 'string') return input.length
    else return String(input)
  }
}
// error 类型“number”上不存在属性“length”
res.getRes('123').length
```

### 合并命名空间

同名命名空间最后会将多个命名空间导出的内容进行合并

``` typescript
namespace Validation {
  export const checkNumber = () => {}
}
namespace Validation {
  export const checkString = () => {}
}

// 等同于
namespace Validation {
  export const checkNumber = () => {}
  export const checkString = () => {}
}
```

在命名空间里，有时并不是把所有内容都对外部可见，对于没有导出的内容，在其它同名命名空间内是无法访问的

``` typescript
namespace Validation {
  const numberReg = /^[0-9]+$/
  export const stringReg = /^[A-Za-z]+$/
  export const checkString = () => {}
}
namespace Validation {
  export const checkNumber = (value: any) => {
    // error 找不到名称“numberReg”
    // numberReg没有使用 export 导出，所以在此同名命名空间内是无法使用的
    return numberReg.test(value)
  }
}
```

### 不同类型合并

+ 命名空间和类

  要求同名的类和命名空间在定义的时候，类的定义必须在命名空间前面，最后合并之后的效果，一个包含一些以命名空间导出内容为静态属性的类

  ``` typescript
  class Validation { checkType() {} }
  namespace Validation {
    export const numberReg = /^[0-9]+$/
    export const stringReg = /^[A-Za-z]+$/
    export const checkString = () => { }
  }
  namespace Validation {
    export const checkNumber = (value: any) => {
      return numberReg.test(value)
    }
  }
  console.log(Validation.prototype)
  // { checkType: fun () {} }
  console.log(Validation.prototype.constructor)
  /* {
    checkNumber: ...
    checkString: ...
    numberReg: ...
    stringReg: ...
  } */
  ```

+ 命名空间和函数

  在JavaScript中，函数也是对象，所以可以给一个函数设置属性，在TypeScript中，可以通过声明合并实现。要求函数的定义要在同名命名空间前面

  ``` typescript
  function countUp () {
    countUp.count++
  }
  namespace countUp {
    export let count = 0
  }
  countUp()
  countUp()
  console.log(countUp.count) // 2
  ```

+ 命名空间和枚举

  通过命名空间和枚举的合并，为枚举拓展内容，枚举和同名命名空间的先后顺序没有要求

  ``` typescript
  enum Colors { red, green, blue }
  namespace Colors {
    export const yellow = 3
  }
  console.log(Colors)
  /*
  {
    0: "red",
    1: "green",
    2: "blue",
    red: 0,
    green: 1,
    blue: 2,
    yellow: 3
  }
  */
  ```

## 混入

混入即把两个对象或者类的内容，混合起来，从而实现一些功能的复用。

``` typescript
class ClassAa {
  isA: boolean;
  funcA() {}
}
class ClassBb {
  isB: boolean;
  funcB() {}
}
// 定义一个类类型接口 AB
// 让类 AB 继承 ClassAa 和 ClassBb 的类型
// 所以使用 implements 关键字，而不是用 extends
// 类 AB 会同时拥有类 A 和 B 的类型定义，还有自身定义的一些类型和值。
class AB implements ClassAa, ClassBb {
  constructor() {}
  // 定义两个实例属性
  isA: boolean = false;
  isB: boolean = false;
  // 定义两个方法，并指定类型
  funcA: () => void;
  funcB: () => void;
}
// mixins 直接传入类，而非其原型对象
// base是最后要汇总而成的类
// from是数组，是要混入的源类组成的数组
function mixins(base: any, from: any[]) {
  from.forEach(fromItem => {
    // Object.getOwnPropertyNames方法获取一个对象自身的属性，
    // 这里自身指除去继承的属性，获取到属性后将属性赋值给目标对象。
    Object.getOwnPropertyNames(fromItem.prototype).forEach(key => {
      base.prototype[key] = fromItem.prototype[key];
    });
  });
}
mixins(AB, [ClassAa, ClassBb]);
const ab = new AB();
console.log(ab);
/*
{
  isA: false,
  isB: false,
  __proto__: {
    funcA: f ()
    funcB: f ()
    constructor: f
  }
}
*/
```

## Promise

``` typescript
// 定义接口，用来定义接口返回结果的结构
interface Res {
  data: {
    [key: string]: any;
  };
}
// 定义命名空间，用来模拟 axios 实现接口调用
namespace axios {
  // 函数返回类型使用TS内置的条件类型 Promise<T> 来指定返回类型
  // T 的类型就是在 resolve 回调函数中返回的值的类型
  export function post(url: string, config: object): Promise<Res> {
    // 返回值类型是一个Promise，resolve传的参数的类型是Res
    // 然后返回一个Promise
    return new Promise((resolve, reject) => {
      setTimeout(() => { // 通过setTimeout实现异步效果
        let res: Res = { data: {} };
        // 通过简单判断，来模拟调用不同接口返回不同数据的效果
        if (url === "/login") res.data.user_id = 111;
        else res.data.role = "admin";
        console.log(2);
        resolve(res); // 在这里传入res结果
      }, 1000);
    });
  }
}
interface Info {
  user_name: string;
  password: string;
}
// 使用async关键字修饰这个函数，内部就可以包含异步逻辑了
async function loginReq({ user_name, password }: Info) {
  try {
    console.log(1);
    // 调用 /login 接口
    const res = await axios.post("/login", { data: { user_name, password } });
    console.log(3);
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
async function getRoleReq(user_id: number) {
  try {
    const res = await axios.post("/user_roles", { data: { user_id } });
    return res;
  } catch (error) {
    throw new Error(error);
  }
}
loginReq({ user_name: "lison", password: "123" }).then(res => {
  const { data: { user_id } } = res;
  getRoleReq(user_id).then(res => {
    const { data: { role } } = res;
    console.log(role);
  });
});
```
