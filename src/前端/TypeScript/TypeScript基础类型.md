# TypeScript 基础类型

## 类型

### 基础类型

``` typescript
// ===== 【Boolean】 - true / false =====
let bool: boolean = false;

// ===== 【Number】 =====
// 支持二、八、十、十六进制的数值
let num: number = 6;

// ===== 【String】 =====
// 单引号/双引号/模板字符串包裹的内容、字符串字面量类型
let str1: string = "Bob";
str1 = 'Tom'
// 字符串字面量类型，即把一个字符串字面量作为一种类型
// 当把一个变量指定为字符串类型的时候，就不能再赋值为其他字符串值
let str2:'Bob'
str2 = 'Jerry' // error 不能将类型 "Jerry"，分配给类型 "Bob"

// ===== 【Array】 =====
// 格式: type[] 或 Array<type> - type为元素类型
// 设置元素类型均为 number 类型的数组类型，如下所示：
let arr1: number[] = [1, 2, 3]; // type[] 格式 - 推荐使用格式
let arr2: Array<number> = [1, 2, 3]; // Array<type> 格式
// 指定数组里的元素既可以是数值也是字符串，如下所示：
let arr3: number|string[] = [1, 'str'];

// ===== 【Object】 =====
// 希望一个变量或者函数的参数的类型是一个对象时，使用此类型
let obj: object
obj = { name: 'Tom' }

// 问题一: 访问对象中的某个属性，会报错，提示类型 object 上没有这个属性
obj.name // error: 类型 object 上不存在属性 name
// 问题一解决方法：可以使用接口（interface）
interface User {
  name: string;
}
let obj: User = { name: 'Tom' }

// 问题二: 当定义一个函数，参数必须为对象，此时需要用到 object 类型，
function getValue(obj: object, key: string) {
  return obj[key]; // error
}
getValue(obj, 'name')
// 问题二解决方法：使用泛型
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

// ===== 【null 和 undefined】 =====
// 默认情况下， undefined 和 null 可以赋值给任意类型的值
// 在 tsconfig.json 的"compilerOptions"里设置了"strictNullChecks": true时，
// >>> undefined 和 null 将只能赋值给它们自身和 void 类型
let u: undefined = undefined;
let n: null = null;

// ===== 【Symbol】 =====
// 表示独一无二的值，通过 Symbol 函数生成
// 注意：使用 Symbol 的时候，必须添加 es6 的编译辅助库
// tsconfig.json - "lib": ["es6", "dom"]
let sym1 = Symbol('key');

//  ===== 【BigInt】 =====
// 可以安全地存储和操作大整数。（即超出 Number 能够表示的安全整数范围）
// 使用 BigInt(number) 把 Number 转换为 BigInt
// 如果类型是 BigInt，那么数字后面需要加 n。
// eg: const max1 = max + 1n
// 注意：使用 BigInt 的时候，必须添加 ESNext 的编译辅助库
// tsconfig.json - "lib": ["es6", "dom", "ESNext"]
// declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
declare let foo: number;
declare let bar: bigint;
foo = bar; // error: Type 'bigint' is not assignable to type 'number'.
bar = foo; // error: Type 'number' is not assignable to type 'bigint'.
```

### Tuple (元组) 类型

`Tuple` (元组) 类型 表示一个已知元素数量和类型的数组。确切地说，是已知数组中每一个位置上元素的类型。

``` typescript
// TypeScript 2.6+ 要求元组赋值必须类型和个数都对应。
let tuple: [string, number] = ['hello', 10];

// TypeScript 2.6+ [string, number]元组类型的声明效果上可以看做等同于下面的声明：
interface Tuple extends Array<number | string> {
  0: string;
  1: number;
  length: 2;
}

// 可变元组
let [username, age]: [string, number, string, string, string] = ['lrh', 24, '1', '1', '1']

let [username, age, ...rest]: [string, number, ...any[]] = ['lrh', 24, '1', '1', '1']
console.log("username:", username) // lrh
console.log("age:", age) // 24
console.log("rest:", rest) // ['1', '1', '1']

// 元组标签

// 因添加 descri_: string ，数组最后一位需为 字符串 类型
let [username, age, ...rest]: [name_: string, age_: number,...rest: any[], descri_: string] = ['lrh', 24, '1', '1', '1', '1', 1, '1']
console.log("username:", username) // lrh
console.log("age:", age) // 24
console.log("rest:", rest) // ['1', '1', '1', '1', 1, '1']

const arr: (string | number)[] = ['lrh', 21, '1', '1'] as const;
// error: 类型 "readonly ["lrh", 21, "1", "1"]" 为 "readonly"，不能分配给可变类型 "(string | number)[]"。
// 可添加 readonly
// readonly 和 as const 都是表示固定不变的，包括数组和元组中每一个元素都不能改变
const arr: readonly (string | number)[] = ['lrh', 21, '1', '1'] as const;
```

### enum (枚举) 类型

枚举使用 `enum` 关键字定义，支持数字和字符串枚举。

``` typescript
// ===== 【枚举（enum）】 =====
// 默认情况下，从 0 开始为元素编号
enum Color { Red, Green, Blue };
let c: Color = Color.Green; // 1
console.log(Color[1]) // 'Green'
// 也可以为每个值都赋予不同的、不按顺序排列的值
enum Color { Red = 1, Green = 2, Blue = 4 }
let c: Color = Color.Green; // 2
```

+ 数字枚举

  枚举默认为数字类型，从 `0` 开始一次累加。

  数字枚举在定义的时候，可以使用计算值和常量。如果某个字段使用了计算值或常量，那么该字段后面紧接着的字段必须设置初始值，不能使用默认的递增值。

  ``` typescript
  // 指定部分字段，其他使用默认递增索引
  enum Status {
    Ok = 200,
    Created, // 201
    Accepted, // 202
    BadRequest = 400,
    Unauthorized // 401
  }

  const Start = 1;
  enum Index {
    a = Start,
    b, // error 枚举成员必须具有初始化的值
    c
  }
  ```

+ 反向映射

  定义一个枚举值的时候，可以通过 `Enum['key']` 或者 `Enum.key` 的形式获取对应的值 value。**TypeScript 支持反向映射，但是只支持数字枚举**。

  ``` typescript
  enum Status {
    Success = 200,
    NotFound = 404,
    Error = 500
  }
  console.log(Status["Success"]); // 200
  console.log(Status[200]); // 'Success'
  console.log(Status[Status["Success"]]); // 'Success'

  // 编译为 JavaScript 为
  var Status;
  (function (Status) {
    Status[Status["Success"] = 200] = "Success";
    Status[Status["NotFound"] = 404] = "NotFound";
    Status[Status["Error"] = 500] = "Error";
  })(Status || (Status = {}));
  // 执行结构为
  // {
  //   "200": "Success",
  //   "404": "NotFound",
  //   "500": "Error",
  //   "Success": 200,
  //   "NotFound": 404,
  //   "Error": 500
  // }
  ```

+ 字符串枚举

  字符串枚举值要求每个字段的值都必须是**字符串字面量**，或者是**该枚举值中另一个字符串枚举成员**。

  枚举值中可以使用其他枚举成员。**其他枚举成员指的是同一个枚举值中的枚举成员**，因为字符串枚举不能使用常量或者计算值，所以不能使用其他枚举值中的成员。

  ``` typescript
  enum Message {
    Error = "Sorry, error",
    Success = "Hoho, success"
  }

  enum Message {
    Error = "error message",
    ServerError = Error,
    ClientError = Error
  }
  console.log(Message.Error); // 'error message'
  console.log(Message.ServerError); // 'error message'
  ```

+ 异构枚举

  异构枚举是指枚举值中既有数字类型又有字符串类型。**不建议使用**，因为枚举值的特点往往是相似的。

  ``` typescript
  enum Result {
    Faild = 0,
    Success = "Success"
  }
  ```

+ 枚举成员类型和联合枚举类型

  如果枚举值里**所有成员的值都是字面量类型的值**，那么这个枚举的每个成员和枚举值本身都可作为类型来使用。满足条件的枚举成员的值有：
  + 不带初始值的枚举成员: `enum E { A }`
  + 值为字符串字面量: `enum E { A = 'a' }`
  + 值为数值字面量，或者带 `-` 符号的数值字面量：`enum E { A = 1 }`、`enum E { A = -1 }`

  1. 枚举成员类型

     ``` typescript
      enum Animal {
        Dog = 1,
        Cat = 2
      }
      interface Dog {
        type: Animal.Dog; // 这里使用Animal.Dog作为类型，指定接口Dog的必须有一个type字段，且类型为Animal.Dog
      }
      let dog: Dog = {
        type: Animal.Dog
      };
      ```

  2. 联合枚举类型

    ``` typescript
    enum Status {
      Off,
      On
    }
    interface Light {
      status: Status;
    }
    const light1: Light = {
      status: Status.Off
    };
    ```

+ const enum

  如果使用枚举只是为了让程序可读性好，而不需要编译后的对象，则可以使用 `const enum`（完全嵌入的枚举），在代码编译后不会创建这个对象，只会从枚举里拿到相应的值进行替换。

  ``` typescript
  const enum Animal {
    Dog,
    Cat
  }
  const animal = Animal.Dog;
  ```

### Any

在编程阶段，不清楚为一个变量指定什么类型，则需要用到 `Any` 类型。任何类型都可以被归为 `Any` 类型。

``` typescript
let notSure: any = 4;
notSure = 'maybe a string instead';
// 使用 any 来指定数组中元素类型为任意类型
let list: any[] = [1, true, 'free'];
```

### Void

`void` 类型表示没有任何类型。声明一个 `void` 类型的变量，只能赋予 `undefined` 和 `null` 。

使用场景：当一个函数没有返回值时，通常返回值类型是 void。

``` typescript
function warnUser(): void {
  console.log('This is my warning message');
}
```

### Never

`never` 类型：永不存在的值的类型。使用场景有：

+ 抛出异常的返回值类型
+ 根本不会有返回值的函数表达式 或 箭头函数表达式的返回值类型
+ 变量被用不为真的类型保护所约束时

`never` 是任何类型的子类型，可以赋值给任何类型。没有任何类型是 `never` 的子类型或可以赋值给 `never` 类型（除了 `never` 本身之外）。 `any` 也不可以赋值给 `never`。

``` typescript
// 示例一：抛出异常场景
const errorFunc = (message: string): never => {
  throw new Error(message); // 抛出异常
}
// 示例二：根本不会有返回值的函数，需要区分在定义函数时没有给返回值的情况
const infiniteFunc = (): never => {
  while (true) {}
}
// 示例三：
// 右边的函数体内是一个死循环，所以此函数调用后的返回值类型为 never
// 当给 neverVariable 赋值就会报错
let neverVariable = (() => { while (true) {}; })();
neverVariable = 123; // error 不能将类型"number"分配给类型"never"
```

### Unknown

`unknown` 类型：表示未知类型，相对于 `any` 是安全的。

``` typescript
// 1、任何类型的值都可以赋值给 unknown 类型
let value1: unknown;
value1 = "a";
value1 = 123;

// 2、如果没有类型断言或基于控制流的类型细化时， unknown 不可以赋值给其它类型，此时它只能赋值给 unknown 和 any 类型
let value2: unknown;
let value3: string = value2; // error 不能将类型 “unknown” 分配给类型 “string”
value1 = value2;

// 3、如果没有类型断言或基于控制流的类型细化，则不能在它上面进行任何操作
let value4: unknown;
value4 += 1; // error 对象的类型为 "unknown"

// 4、unknown 与任何其它类型组成的交叉类型，最后都等于其它类型
type type1 = unknown & string; // type1 => string
type type2 = number & unknown; // type2 => number
type type3 = unknown & unknown; // type3 => unknown
type type4 = unknown & string[]; // type4 => string[]

// 5、unknown 与任何其它类型组成的联合类型，都等于 unknown 类型，但只有 any 例外，unknown 与 any 组成的联合类型等于 any
type type5 = string | unknown; // type5 => unknown
type type6 = any | unknown; // type6 => any
type type7 = number[] | unknown; // type7 => unknown

// 6、never 类型是 unknown 的子类型
type type8 = never extends unknown ? true : false; // type8 => true

// 7、keyof unknown 等于类型 never
type type9 = keyof unknown; // type9 => never

// 8、只能对 unknown 进行等或不等操作，不能进行其它操作
value1 === value2;
value1 !== value2;
value1 += value2; // error

// 9、unknown 类型的值不能访问其属性、作为函数调用和作为类创建实例
let value5: unknown;
value5.age; // error
value5(); // error
new value5(); // error

// 10、使用映射类型时，如果遍历的是 unknown 类型，则不会映射任何属性
type Types<T> = { [P in keyof T]: number };
type type10 = Types<any>; // type10 => { [x: string]: number }
type type11 = Types<unknown>; // type10 => {}
```

### 交叉类型

取多个类型的并集。使用 `&` 符号，被 `&` 符链接的多个类型构成一个交叉类型

``` typescript
const merge = <T, U>(arg1: T, arg2: U): T & U => {
  let res = <T & U>{}; // 指定返回值的类型兼备T和U两个类型变量代表的类型的特点
  res = Object.assign(arg1, arg2); // 使用 Object.assign 方法，返回一个合并后的对象；
  return res;
};
```

### 联合类型

使用 `|` 符号，只要符合联合类型中的任何一种类型即可

``` typescript
const getLength = (content: string | number): number => {
  if (typeof content === "string") return content.length;
  else return content.toString().length;
};
```

### null 和 undefined 知识点补充

+ 严格模式下，null和undefined赋值给其它类型值

  在 `tsconfig.json` 中将 `strictNullChecks` 设为 `true` 后，**不能**再将 `undefined` 和 `null` **赋值给除它们自身和void 之外的任意类型值**，但有时需要给一个其它类型的值设置初始值为空，然后再进行赋值，这时可以自己**使用联合类型**来实现 `null` 或 `undefined` 赋值给其它类型

  注意：`string | undefined`、`string | null` 和 `string | undefined | null` 是三种不同的类型。

  ``` typescript
  let str = "lison";
  str = null; // error 不能将类型“null”分配给类型“string”
  // string | null - 表示既可以是 string 类型也可以是 null 类型
  let strNull: string | null = "lison";
  strNull = null; // right
  strNull = undefined; // error 不能将类型“undefined”分配给类型“string | null”
  ```

+ 可选参数和可选属性

  开启了 `strictNullChecks`，可选参数会被自动加上 `| undefined`

  ``` typescript
  const sum = (x: number, y?: number) => {
    return x + (y || 0);
  };
  sum(1, 2); // 3
  sum(1); // 1
  sum(1, undefined); // 1
  sum(1, null); // error Argument of type 'null' is not assignable to parameter of type 'number | undefined'
  ```

## 类型别名和字面量类型

### type (类型别名)

**使用 type 关键字定义类型别名**，之后只要使用这个类型的地方，都可以用类型别名替代，但并不是创建了一个新类型。

``` typescript
// 基本使用
type TypeString = string;
let str: TypeString;
str = 123; // error Type '123' is not assignable to type 'string'

// 使用泛型
type PositionType<T> = { x: T; y: T };
const position: PositionType<number> = {
  x: 1,
  y: -1
};

// 在属性中引用自己
type Child<T> = {
  current: T;
  child?: Child<T>;
};
let ccc: Child<string> = {
  current: "first",
  child: {
    // error
    current: "second",
    child: {
      current: "third",
      child: "test" // 这个地方不符合type，造成最外层child处报错
    }
  }
};
```

注意：

+ 只能在对象属性中引用自己，不能直接使用。
+ 当类型别名为接口起别名时，不能使用 `extends` 和 `implements`

接口和类型别名有时可以起到同样的作用，什么时候用类型别名，什么时候用接口：

+ 当定义的类型要用于拓展，即使用 `implements` 等修饰符时，用接口。
+ 当无法通过接口，并且需要使用联合类型或元组类型时，用类型别名。

### 字面量类型

字面量类型的要和实际的值的字面量一一对应,如果不一致就会报错。

当字面量类型与联合类型结合的时候,可以模拟一个类似于枚举的效果。

+ 字符串字面量类型：即字符串常量，与字符串类型不同的是它是**具体的值**。

  ``` typescript
  type Name = "Tom";
  const name1: Name = "test"; // error 不能将类型“"test"”分配给类型“"Tom"”
  const name2: Name = "Tom";

  type Direction = "north" | "east" | "south" | "west";
  function getDirectionFirstLetter(direction: Direction) {
    return direction.substr(0, 1);
  }
  getDirectionFirstLetter("test"); // error 类型“"test"”的参数不能赋给类型“Direction”的参数
  getDirectionFirstLetter("east");
  ```

+ 数字字面量类型：指定类型为**具体的值**。

  ``` typescript
  type Age = 18;
  interface Info {
    name: string;
    age: Age;
  }
  const info: Info = {
    name: "Lison",
    age: 28 // error 不能将类型“28”分配给类型“18”
  };

  // 经典逻辑错误示例
  function getValue(index: number) {
    // 在判断逻辑处使用了 || 符号
    // 当 index !== 0 不成立时，则 index 就是 0，不应该再判断 index !== 1
    // 当 index !== 0 成立时，后面的判断也不会执行
    // 所以这个地方报错
    if (index !== 0 || index !== 1) {
      // error This condition will always return 'true' since the types '0' and '1' have no overlap
      // ...
    }
  }
  ```

## 类型推断

在一些定义中如果没有明确指定类型，编译器会自动推断出适合的类型。

+ 基础推论: 根据右侧的值推断左侧变量的类型。

  ``` typescript
  let name = "lison";
  name = 123; // error 不能将类型“123”分配给类型“string”
  ```

+ 多类型联合: 当定义一个数组或元组这种包含多个元素的值的时候，多个元素可以有不同的类型，TypeScript 会将多个类型合并起来，组成一个联合类型。

  ``` typescript
  let arr = [1, "a"];
  arr = ["b", 2, false]; // error 不能将类型“false”分配给类型“string | number”
  ```

+ 上下文类型: 根据左侧的类型推断右侧的一些类型。

  ``` typescript
  // 表达式左侧是 window.onmousedown(鼠标按下时发生事件)
  // 因此 TypeScript 会推断赋值表达式右侧函数的参数是事件对象
  // 表达式左侧是 mousedown 事件，所以 TypeScript 推断 mouseEvent 的类型是 MouseEvent。
  // 在回调函数中使用 mouseEvent 的时候，可以访问鼠标事件对象的所有属性和方法，当访问不存在属性的时候，就会报错。
  window.onmousedown = function(mouseEvent) {
    console.log(mouseEvent.a); // error 类型“MouseEvent”上不存在属性“a”
  };
  ```

## 索引类型

### keyof（索引类型查询操作符）

`keyof` 操作符，连接一个类型，会返回一个由这个类型的所有属性名组成的联合类型。支持用 `number` 和 `symbol` 命名的属性

通过和泛型结合使用，TypeScript 就可以检查使用了动态属性名的代码。

``` typescript
// 使用泛型，并且约束泛型变量 K 的类型是 "keyof T"
// 即：类型 T 的所有字段名组成的联合类型
function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  // 指定 getValue 的返回值类型为 T[K][]
  // 即：类型为 T 的值的属性值组成的数组
  return names.map(n => obj[n]);
}
const info = {
  name: "lison",
  age: 18
};
let values: string[] = getValue(info, ["name"]);
// error 不能将类型 “number[]” 分配给类型 “string[]”
values = getValue(info, ["age"]);
```

### [] (索引访问操作符)

索引访问操作符 —— `[]`，与访问对象的某个属性值是一样的语法，但是在 TS 中它可以用来访问某个属性的类型。

当 `tsconfig.json` 里 `strictNullChecks` 设为 `false` 时，通过索引访问操作符和索引类型查询操作符可以选出类型不为 `never & undefined & null` 的类型。

``` typescript
// 接口的索引类型是 string 类型
// 实现该接口的对象的属性名可以设置为 数值类型 的值
interface Obj<T> {
  [key: string]: T;
}
// 因为 数值 最后会先转换为 字符串
// 则 keyof Obj<number> 等同于类型 number | string：
let key: keyof Obj<number>;
key = 123; // right

// 使用访问操作符，获取索引签名的类型
interface Obj<T> {
  [key: string]: T;
}
const obj: Obj<number> = { age: 18 };
// value 的类型是 number，也就是 name 的属性值 18 的类型
let value: Obj<number>["age"];

interface Type {
  a: never;
  b: never;
  c: string;
  d: number;
  e: undefined;
  f: null;
  g: object;
}
// test的类型是 string | number | object
type test = Type[keyof Type];
```

## 断言

### value as type (类型断言)

TypeScript 有时不如我们了解一个值的类型，这时希望 TypeScript 进行类型检查，而是交给我们自己进行处理，则需要用到**类型断言**。

类型断言，把某个值强行指定为特定类型。主要形式有:

+ `<type>value` 形式: 这种形式在 JSX 代码中不可以使用，而且也是 TSLint 不建议的写法
+ `value as type` 形式: **推荐写法**

``` typescript
const getStrLength = (target: string | number): number => {
  // 当 TypeScript 不确定一个联合类型的变量是哪个类型的时候
  // 而此时只能访问此联合类型的所有类型里共有的属性或方法
  // 所以需要用到了类型断言进行判断
  if ((<string>target).length) {
    return (target as string).length;
  } else {
    return target.toString().length;
  }
};
```

类型断言涉及的两种数据类型必须具有**重叠关系** ：

+ A、B 两者都是类，且**具有**继承关系（ `extends` 关系）。在绝大多数场景下，都是把父类的对象变量断言成子类。
+ A、B 两者都是类，但**没有**继承关系。A、B 两个类中的任意一个类上的所有 `public` 实例属性（不包括静态属性）和实例方法，与另外一个类上的所有 `public` 实例属性（不包括静态属性）和实例方法**完全相同或者是另一个类的子集**，则两个类可互相断言，否则不能互相断言。
+ A 是类，B 是接口，并且 A 类**实现了** B 接口 `implements` (用来指定一个类要继承的接口 - 类继承接口)。则 A 的对象变量可以断言程 B 接口类型，同样 B 接口类型的对象变量可以断言成 A 类型。
+ A 是类，B 是接口，并且 A 类**没有实现** B 接口 `implements`。则两者的断言需要满足类的 `public` 实例属性（不包括静态属性）和实例方法**完全相同或者是另一个类的子集**。
+ A 是类，B 是 `type` 定义的数据类型，并且 A 类**实现了** B `type` 定义的数据类型 `implements`。则 A 的对象变量可以断言成 B `type` 定义的对象数据类型，同样，B `type` 定义的对象数据类型的对象变量也可以断言成 A 类型。
+ A 是类，B 是 `type` 定义的数据类型，并且 A 类**没有实现** B `type` 定义的数据类型。则两者的断言需要满足类的 `public` 实例属性（不包括静态属性）和实例方法**完全相同或者是另一个类的子集**。
+ A 是一个函数上参数变量的**联合类型** （例如 `string | number`）。则，函数内部可以断言成 string 或 number 类型。
+ 多个类组成的**联合类型** ，例如：`let vechile: Car | Bus | Trunck` ，vechile 可以断言成其中任意一种数据类型，例如： `vechile as Ca`
+ 任何数据类型都可以断言成 `any` 或 `unknown` 类型。 `any` 或 `unknown` 类型也可以断言成任何其他数据类型。

应用场景：

+ 调用每一个类型独有的方法

  ``` typescript
  class Vechile {
    static count: number = 3;
    public brand: string; // 品牌
    public vechileNo: string; // 车牌号
    public days: number; // 租赁天数
    public deposit: number; // 押金
    public total: number = 0; // 支付的租赁总费用
    constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number) {
      this.brand = brand_;
      this.vechileNo = vechileNo_;
      this.days = days_;
      this.deposit = deposit_;
    }
    // 计算租赁车的价格 - calculateRent
    public calculateRent() {}
    // 支付押金的方法 - payDesposit
    payDesposit() {}
    // 安全检测方法（safeShow)
    public safeShow() {}
  }

  // 子类Car类 独有属性为type_
  class Car extends Vechile {
    public type: string; //车的型号
    constructor(brand_: string, vechileNo_: string, days_: number, deposit_: number, type_: string) {
      super(brand_, vechileNo_, days_, deposit_);
      this.type = type_;
    }
    // 根据车的型号来获取租用一天该型号车的租金
    public getPriceByType() {}
    public calculateRent() {}
    public checkIsWeigui(isOverWeight: boolean) {}
  }

  class Bus extends Vechile {
    public seatNum: number; // 座位数
    constructor(
      brand_: string,
      vechileNo_: string,
      days_: number,
      deposit_: number,
      seatNum_: number
    ) {
      super(brand_, vechileNo_, days_, deposit_);
      this.seatNum = seatNum_;
      if (this.seatNum > 200) {
        throw new Error('座位数不能超过200');
      }
    }
    //计算租赁价格
    public getPriceBySeatNum() {}
    public calculateRent() {
      super.calculateRent();
    }
    public checkIsOverNum() {}
  }

  class Truck extends Vechile {
    ton!: number; // 座位数
    constructor(brand_: string, type_: string, days_: number, deposit_: number, ton_: number) {
      super(brand_, type_, days_, deposit_);
      this.ton = ton_;
    }

    checkIsOverWeight() {}
    // 计算租赁价格
    CalRentPrice() {}
    public calRent() {}
    public calDesposit() {}
  }

  class Customer {
    rentVechile(vechile: Bus | Truck | Car) {
      (vechile as Bus).checkIsOverNum()
    }
  }

  export { Customer };
  ```

+ 对象中的 `Symbol` 数据类型取值问题

  ``` typescript
  let symid = Symbol('objid');
  let obj = { [symid]: 101, username: 'wangwu', age: 23 };
  let username = obj['username'];
  // let objid = obj[symid] // error: 类型 “symbol” 不能作为索引类型使用

  // 解决:
  let objid = obj[symid as any];
  // let objid2 = obj[symid as unknown]// error: 类型 “unknown” 不能作为索引类型使用
  // let symidunknown = symid as unknown// 可以转换成 unknown,正确
  ```

+ 加法计算

  ``` typescript
  function add(a: string | number, b: string | number ) {
    return (a as any) + (b as any)
  }
  ```

### x! (⾮空断⾔)

当开启 `strictNullChecks` 时，有些情况下，编译器无法在声明一些变量前知道一个值是否是 `null` 的，所以需要使用非空断言指明该值不为 `null`。

⾮空断言，写法为：**`x!` - 将从 x 值域中排除 `null` 和 `undefined`**。

``` typescript
function getSplicedStr(num: number | null): string {

  // 在函数 getSplicedStr 里定义一个函数 getRes
  // 最后调用 getSplicedStr 返回的值，实际是 getRes 运行后的返回值
  function getRes(prefix: string) {
    // 使用参数 num，num的类型为 number 或 null
    // 在运行前编译器是无法知道在运行时 num 参数的实际类型
    // 所以这里会报错，因为 num 参数可能为 null
    return prefix + num.toFixed().toString();

    // 调整之后：
    return prefix + num!.toFixed().toString();
  }

  // 如果 num 为 null ，则会将 0.1 赋给 num，
  // 所以实际调用 getRes 的时候，getRes 里的 num 拿到的始终不为 null
  num = num || 0.1;
  return getRes("lison");
}
```

## 类型保护

当使用联合类型时，我们必须尽量把当前值的类型收窄为当前值的实际类型，而类型保护就是实现类型收窄的一种手段。

类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。

``` typescript
const valueList = [123, "abc"];

const getRandomValue = () => {
  // 取一个[0, 10)范围内的随机值
  const number = Math.random() * 10;
  // 如果随机数小于5则返回valueList里的第一个值，也就是123
  if (number < 5) return valueList[0];
  else return valueList[1]; // 否则返回"abc"
};

function isString(value: number | string): value is string {
  const number = Math.random() * 10
  return number < 5;
}

const item = getRandomValue();
// 使用类型保护后，if 的判断逻辑和代码块无需对类型做指定工作
// 定义一个函数用于判断类型是否为字符串类型，进行类型保护
if (isString(item)) {
  console.log(item.length); // 此时item是string类型
} else {
  console.log(item.toFixed()); // 此时item是number类型
}
```

### in

对于 `n in x` 表达式，其中 `n` 是字符串文字或字符串文字类型，而 `x` 是联合类型。

``` typescript
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}
type UnknownEmployee = Employee | Admin;
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}
```

### typeof

在 TypeScript 中，如果是基础类型，而不是复杂的类型判断，可以直接使用 `typeof` 来做类型保护。

对 `typeof` 的处理有特殊要求：**只能使用 `=` 和 `!` 两种形式来比较**。`type` 只能是`number`、`string`、`boolean`和`symbol`四种类型

``` typescript
if (typeof item === "string") {
  console.log(item.length);
} else {
  console.log(item.toFixed());
}
```

### instanceof

`instanceof` 用来判断一个实例是不是某个构造函数创建的，或者是不是使用 ES6 语法的某个类创建的。

``` typescript
class CreateByClass1 {
  public age = 18;
  constructor() {}
}
class CreateByClass2 {
  public name = "lison";
  constructor() {}
}
function getRandomItem() {
  // 如果随机数小于0.5就返回CreateByClass1的实例，否则返回CreateByClass2的实例
  return Math.random() < 0.5 ? new CreateByClass1() : new CreateByClass2();
}
const item = getRandomItem();
// 判断item是否是CreateByClass1的实例
if (item instanceof CreateByClass1) {
  console.log(item.age);
} else {
  console.log(item.name);
}
```

### is 关键字

``` typescript
// test is string
// 判断 test 是不是 string 类型，并根据结果返回 boolean 相关类型
function isString(test: any): test is string {
  return typeof test === 'string';
}
// 如果修改为 function isString(test: any): boolean
// 会直接报错
// 因为 is 为关键字的「类型谓语」把参数的类型范围缩小了
// 当使用了 test is string 之后,
// 通过 isString(foo) === true 明确知道其中的参数是 string,而 boolean 并没有这个能力,这就是 is 关键字存在的意义.

function example(foo: number | string){
  if(isString(foo)){
    console.log('it is a string' + foo);
    console.log(foo.length); // string function
  }
}
example('hello world');
```

## 映射类型

TypeScript 借助旧类型创建一个新类型的方式，就是映射类型，它可以用相同的形式去转换旧类型中的每个属性。TypeScript 2.9+，支持用 `number` 和 `symbol` 命名的属性

``` typescript
const stringIndex = "a";
const numberIndex = 1;
const symbolIndex = Symbol();

type Obj = {
  [stringIndex]: string;
  [numberIndex]: number;
  [symbolIndex]: symbol;
};

type keys = keyof Obj;
let key: keys = 2; // error
let key: keys = 1; // right
let key: keys = "b"; // error
let key: keys = "a"; // right
let key: keys = Symbol(); // error
let key: keys = symbolIndex; // right
```

### 由映射类型进行推断

使用映射类型包装一个类型的属性后，也可以进行逆向操作，也就是拆包

``` typescript
// 定义映射类型，将一个属性拆分成get/set方法
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};
// 定义映射类型
// 将一个对象的所有属性值类型都变为Proxy<T>处理之后的类型
type Proxify<T> = { [P in keyof T]: Proxy<T[P]> };
// 定义 proxify 函数
// 用来将对象中所有属性的属性值改为一个包含get和set方法的对象
function proxify<T>(obj: T): Proxify<T> {
  let result = {} as Proxify<T>;
  for (const key in obj) {
    result[key] = {
      get: () => obj[key],
      set: value => (obj[key] = value)
    };
  }
  return result;
}
let props = {
  name: "lison",
  age: 18
};
let proxyProps = proxify(props);
console.log(proxyProps.name.get()); // "lison"
proxyProps.name.set("li");

// 拆包函数
// 利用每个属性的get方法获取到当前属性值
// 然后将原本是包含get和set方法的对象改为这个属性值
function unproxify<T>(t: Proxify<T>): T {
  let result = {} as T;
  for (const k in t) {
    // 通过调用属性值这个对象的get方法获取到属性值
    // 然后赋给这个属性，替换掉这个对象
    result[k] = t[k].get();
  }
  return result;
}
let originalProps = unproxify(proxyProps);
```

### 增加或移除特定修饰符

使用 `+` 和 `-` 符号作为前缀来指定增加还是删除修饰符

``` typescript
interface Info { name: string; age: number; }
// 经过 ReadonlyInfo 创建的接口类型，属性是可选且只读的
type ReadonlyInfo<T> = { +readonly [P in keyof T]+?: T[P] };
// 等同于 type ReadonlyInfo = { readonly [P in keyof T]?: T[P] }
let info: ReadonlyInfo<Info> = { name: "lison" };
info.name = ""; // error：因为每个属性是只读额

type RemoveModifier<T> = { -readonly [P in keyof T]-?: T[p] };
// Readonly<Partial<Info>> 是返回一个既属性可选又只读的接口类型
// 所以 InfoType 类型则表示属性必含而且非只读。
type InfoType = RemoveModifier<Readonly<Partial<Info>>>;
let info1: InfoType = { name: "lison" }; // error missing "age"
let info2: InfoType = { name: "lison", age: 18 };
info2.name = ""; // right, can edit
```

### 元组和数组上的映射类型

在元组和数组上的映射类型会生成新的元组和数组，并不会创建一个新的类型，这个类型上会具有 `push`、`pop` 等数组方法和数组属性。

``` typescript
// MapToPromise 返回一个将传入的类型的所有字段的值转为 Promise，
// 且 Promise 的 resolve 回调函数的参数类型为这个字段类型
type MapToPromise<T> = { [K in keyof T]: Promise<T[K]> };
type Tuple = [number, string, boolean];
type promiseTuple = MapToPromise<Tuple>;
// 当指定变量 tuple 的类型为 promiseTuple 后，
// 它的三个元素类型都是一个Promise，
// 且 resolve 的参数类型依次为 number、string 和 boolean。
let tuple: promiseTuple = [
  new Promise((resolve, reject) => resolve(1)),
  new Promise((resolve, reject) => resolve("a")),
  new Promise((resolve, reject) => resolve(false))
];
```

## T extends U ? X : Y (条件类型)

以一个条件表达式进行类型关系检测，然后在后面两种类型中选择一个。

``` typescript
// 如果 T 可以赋值给 U 类型，则是 X 类型，否则是 Y 类型。
T extends U ? X : Y
```

### 分布式条件类型

当待检测的类型是联合类型，则该条件类型被称为“分布式条件类型”，在实例化时会自动分发成联合类型

``` typescript
// 条件类型的作用：找出从 T 中出去 U 中存在的类型，得到剩下的类型
type Diff<T, U> = T extends U ? never : T;
type Test = Diff<string | number | boolean, undefined | number>;
// Test的类型为 string | boolean


// [K in keyof T] 用于遍历 T 的所有属性名
// 如果属性值为 Function 类型，则值为属性名字面量类型，否则为 never 类型
// 使用 keyof T 获取 T 的属性名
// 通过索引访问类型 [keyof T] 获取不为 never 的类型
type Type<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}
type Test = Type<Part>; // Test的类型为"updatePart"
```

### infer（条件类型的类型推断）

+ 如果传入的类型是一个数组，则返回它元素的类型；
+ 如果是一个普通类型，则直接返回这个类型。

``` typescript
// 需要通过索引访问类型 T[number] 来获取类型的
type Type<T> = T extends any[] ? T[number] : T;
type test1 = Type<string[]>; // test1 的类型为 string
type test2 = Type<string>; // test2 的类型为 string

// 使用 infer 关键字，则无需手动获取
// infer 能够推断出 U 的类型，并且供后面使用
// 可以理解为定义了一个变量 U 来接收数组元素的类型
type Type<T> = T extends Array<infer U> ? U : T;
type test1 = Type<string[]>; // test1 的类型为 string
type test2 = Type<string>; // test2 的类型为 string

// ========================================
interface Customer {
  custname: string;
  buymoney: number;
}
type inferType<T> = T extends (param: infer P) => any ? P : T;
type custFuncType = (cust: Customer) => void;
type inferMiddleType = inferType<custFuncType>;
const cust: inferMiddleType = { custname: 'lrh', buymoney: 2022 };
// ========================================

// infer R 表示声明⼀个变量来承载传⼊函数签名的返回值类型，简单说就是⽤它取到函数返回值的类型⽅便之后使⽤。
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// ========================================
class StudentClass {
  public name: string;
  public classNo: number;
  constructor(name: string, classNo: number) {
    this.name = name;
    this.classNo = classNo;
  }
  getInfo() {
    console.log(`姓名: ${this.name} 班级：${this.classNo}`);
  }
}

// 构造函数的通用类型
type Constructor<T> = new (...args: any[]) => T;
// 传递构造函数的参数类型
type ConstructorParametersType<T extends new (...args: any[]) => any> = T extends new (
  ...args: infer P
) => any
  ? P
  : never;
// 创建实例
function createInstance<T, C extends new (...args: any[]) => any>(
  constructor: Constructor<T>,
  ...args: ConstructorParametersType<C>
) {
  return new constructor(args[0], args[1]);
}

type classType = typeof StudentClass;
createInstance<StudentClass, classType>(StudentClass, 'lrh01', 25).getInfo();
createInstance(StudentClass, ['lrh02', 25]).getInfo();
// ========================================
```

## 实用工具类型

### `Readonly<Type>`

`Readonly<Type>` 适用于将一个对象中的每一个属性转换为**只读**的场景

``` typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
}

interface User {
  username: string
  id: number
  avatar: string
}
type ReadonlyUser = Readonly<User>
// { readonly username: string; readonly id: number; readonly avatar: string; }
```

### `Partial<Type>`

`Partial<Type>`: 适用于将一个对象中的每一个属性转换为**可选**的场景

``` typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
}

interface User {
  username: string
  id: number
  avatar: string
}
type PartialUser = Partial<User>
// { username?: string; id?: number; avatar?: string; }
```

### `Pick<Type, Keys>`

`Pick<Type, Keys>`: 返回一个对象中指定字段的值组成的对象

``` typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}

interface User {
  username: string
  id: number
  avatar: string
}
type PickUser = Pick<User, "username" | "id">
// { username: string; id: number; }
```

### `Record<Keys, Type>`

`Record<Keys, Type>`: 适用于将一个对象中的每一个属性转换为**其他值**的场景

``` typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
}

function mapObject<K extends string | number, T, U>(
  obj: Record<K, T>,
  f: (x: T) => U
): Record<K, U> {
  let res = {} as Record<K, U>;
  for (const key in obj) {
    res[key] = f(obj[key]);
  }
  return res;
}
const names = { 0: "hello", 1: "world", 2: "bye" };
const lengths = mapObject(names, s => s.length);
// { 0: 5, 1: 5, 2: 3 }
```

注意：

同态：两个相同类型的代数结构之间的结构保持映射。`Readonly`、`Partial` 和 `Pick` 是同态的，而 `Record` 不是，因为 `Record` 映射出的对象属性值是新的，和输入的值的属性值不同。

### `Omit<Type, Keys>`

`Omit<Type, Keys>`：从类型 Type 中获取所有属性，然后从中剔除 Keys 属性后构造一个类型。

``` typescript
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

// ==============================
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
type TodoPreview = Omit<Todo, 'description'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};
```

### `Exclude<Type, ExcludedUnion>`

`Exclude<Type, ExcludedUnion>`: 从 Type 中去掉可以赋值给 ExcludedUnion 的类型

``` typescript
type Exclude<T, U> = T extends U ? never : T;

type Type = Exclude<"a" | "b" | "c", "a" | "b">;
// Type => 'c'
type Type2 = Exclude<string | number | boolean, string | number>;
// Type2 => boolean
```

### `Extract<Type, Union>`

`Extract<Type, Union>`: 选取 Type 中可以赋值给 Union 的类型

``` typescript
type Extract<T, U> = T extends U ? T : never;

type Type = Extract<"a" | "b" | "c", "a" | "c" | "f">;
// Type => 'a' | 'c'
type Type2 = Extract<number | string | boolean, string | boolean>;
// Type2 => string | boolean

type CrossType<T> = Extract<T, object>;
function cross<T, U>(objOne: CrossType<T>, objTwo: CrossType<U>): T & U;
function cross<T, U, V>(objOne: CrossType<T>, objTwo: CrossType<U>, objThree: CrossType<V>): T & U & V;
function cross<T, U, V>(objOne: CrossType<T>, objTwo: CrossType<U>, objThree?: CrossType<V>) {
  let obj = {};
  let combine = obj as T & U;

  Object.keys(objOne).forEach((key) => {
    combine[key] = objOne[key];
  });
  Object.keys(objTwo).forEach((key) => {
    if (!combine.hasOwnProperty(key)) {
      combine[key] = objTwo[key];
    }
  });
  if (objThree) {
    let combine2 = combine as typeof combine & V;
    Object.keys(objThree).forEach((key) => {
      if (!combine2.hasOwnProperty(key)) {
        combine2[key] = objThree[key];
      }
    });
    return combine2;
  }
  return combine;
}
```

### `NonNullable<Type>`

`NonNullable<Type>`: 从 Type 中去掉 `null` 和 `undefined`

``` typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Type = NonNullable<string | number | undefined | null>;
// Type => string | number
```

### `ReturnType<Type>`

`ReturnType<Type>`: 获取函数类型返回值类型

``` typescript
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

type Type = ReturnType<() => string>;
// Type => string
type Type2 = ReturnType<(arg: number) => void)>
// Type2 => void
```

### `InstanceType<Type>`

`InstanceType<Type>`: 获取构造函数类型的实例类型

InstanceType 条件类型要求泛型变量 T 类型是创建实例为 any 类型的构造函数，而它本身则通过判断 T 是否是构造函数类型来确定返回的类型。如果是构造函数，使用 infer 可以自动推断出 R 的类型，即实例类型；否则返回的是 any 类型。

``` typescript
type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

class A {
  constructor() {}
}
// T1 的定义中，typeof A返回的的是类 A 的类型，也就是 A
// 不能使用 A 因为它是值不是类型，类型 A 是构造函数
// 所以 T1 是 A 构造函数的实例类型，也就是 A
type T1 = InstanceType<typeof A>; // T1的类型为 A
// T2 传入的类型为 any，因为 any 是任何类型的子类型
// 所以它满足 T extends new (…args: any[]) => infer R，这里 infer 推断的 R 为 any
type T2 = InstanceType<any>; // T2的类型为 any
// 传入 never 和 any 同理。
// 传入 string 时因为 string 不能不给构造函数类型，所以报错。
type T3 = InstanceType<never>; // T3的类型为 never
type T4 = InstanceType<string>; // error
```
