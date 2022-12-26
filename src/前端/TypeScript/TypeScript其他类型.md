# TypeScript 接口、函数、泛型、类

## 接口（interface）

使用 interface 来定义接口。在定义接口的时候，`{}` 括号包裹的是一个代码块，是声明类型的语句。使用冒号指定类型，每条声明之间使用换行分隔，也可以使用分号或逗号。

``` javascript
interface Say {
  (words: string) : string
}

interface User {
  name: string
  age?: number // 可选属性
  readonly isMale: boolean // 只读属性
  say: (words: string) => string // 函数类型描述方法一：在 interface 内部描述函数
  // say: Say // 函数类型描述方法二：先用接口直接描述函数类型，然后再 User 内使用
}
const getUserName = (user: User) => user.name
```

### 多余属性检查

对于多余属性检查，定义的变量比接口少了一些或者多了一些属性是不允许的。

绕开多余属性检查的方法如下：

+ 使用类型断言

  ``` typescript
  interface Vegetables {
    color?: string;
    type: string;
  }
  const getVegetables = ({ color, type }: Vegetables) => {
    return `A ${color ? color + " " : ""}${type}`;
  };
  getVegetables({
    type: "tomato",
    size: 12,
    price: 1.2
  } as Vegetables);
  ```

+ 添加索引签名

  ``` typescript
  interface Vegetables {
    color: string;
    type: string;
    [prop: string]: any;
  }
  const getVegetables = ({ color, type }: Vegetables) => {
    return `A ${color ? color + " " : ""}${type}`;
  };
  getVegetables({
    color: "red",
    type: "tomato",
    size: 12,
    price: 1.2
  });
  ```

+ 利用类型兼容性

  ``` typescript
  interface Vegetables {
    type: string;
  }
  const getVegetables = ({ type }: Vegetables) => {
    return `A ${type}`;
  };
  const option = { type: "tomato", size: 12 };
  getVegetables(option);
  ```

### readonly

使用接口描述索引的类型和通过索引得到的值的类型，也可以给索引设置 `readonly`，从而防止索引返回值被修改。

``` typescript
interface RoleDic {
  readonly [id: number]: string;
}
const role1: RoleDic = {
  0: "super_admin",
  1: "admin"
};
role1[0] = "admin"; // error 类型"RoleDic"中的索引签名仅允许读取
const role2: RoleDic = {
  s: "super_admin",  // error 不能将类型"{ s: string; a: string; }"分配给类型 "RoleDic"。
  a: "admin"
};
// role3 定义了一个数组，索引为数值类型，值为字符串类型
const role3: RoleDic = ["super_admin", "admin"];
```

注意：如果设置索引类型为字符串类型，即便属性名设置的是数值类型，也没有问题。因为 JavaScript 在访问属性值的时候，如果属性名是数值类型，会先将数值类型转为字符串，然后再去访问。

``` javascript
const obj = {
  123: "a", // 定义一个数值类型的123这个属性
  // 在定义一个字符串类型的 123 这个属性
  // 这里会报错：标识符“"123"”重复。
  "123": "b"
};
console.log(obj); // { '123': 'b' }
```

### 继承接口

接口可以继承，和类一样，提高了接口的可复用性。一个接口可以被多个接口继承，同样，一个接口也可以继承多个接口，多个接口用逗号隔开。

``` typescript
interface Vegetables {
  color: string;
}
interface Food {
  type: string;
}
interface Tomato extends Food, Vegetables {
  radius: number;
}
const tomato: Tomato = {
  type: "vegetables",
  color: "red",
  radius: 1.2
};  // 在定义tomato变量时将继承过来的color和type属性同时声明
```

### 混合类型接口

在 JavaScript 中，函数是对象类型，对象可以有属性，所以有时一个对象既是一个函数，也包含一些属性。TypeScript 3.1+ 支持直接给函数添加属性

``` typescript
interface Counter {
  // 函数，函数的要求是无参数，返回值为void，即无返回值
  (): void;
  // 值的类型为 number 类型的属性
  count: number;
}
// 定义一个函数用来返回这个计数器
const getCounter = (): Counter => {
  const c = () => { c.count++; };
  c.count = 0; // 给函数添加一个 count 属性初始值为 0
  return c; // 返回函数对象
};
// 通过 getCounter 函数得到这个计数器
const counter: Counter = getCounter();
counter();
console.log(counter.count); // 1
counter();
console.log(counter.count); // 2
```

## 函数（Function）

### 函数类型

+ 为函数定义类型

  ``` typescript
  function add(arg1: number, arg2: number): number {
    return x + y;
  }
  // 或者
  const add = (arg1: number, arg2: number): number => {
    return x + y;
  };
  ```

+ 完整的函数类型

  一个函数的定义包括函数名、参数、逻辑和返回值。

  ``` typescript
  let add: (x: number, y: number) => number;
  add = (arg1: number, arg2: number): number => arg1 + arg2;
  // error
  add = (arg1: string, arg2: string): string => arg1 + arg2;
  ```

+ 使用接口定义函数类型

  ``` typescript
  interface Add {
    (x: number, y: number): number;
  }
  // error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
  let add: Add = (arg1: string, arg2: string): string => arg1 + arg2;
  ```

+ 使用类型别名

  ``` typescript
  type Add = (x: number, y: number) => number;
  // error 不能将类型“(arg1: string, arg2: string) => string”分配给类型“Add”
  let add: Add = (arg1: string, arg2: string): string => arg1 + arg2;
  ```

### 参数相关

``` typescript
const add = (
  // 必选参数
  a: number,
  // 可选参数
  // 接口类型定义的函数类型必选参数和可选参数位置是无所谓的
  // 但是此方式需要将必选参数不能位于可选参数后。
  b?: number,
  // 默认参数：放在必选参数前后都可以
  c = 3,
  // 剩余参数：使用 ... 来表示剩余参数
  ...rest: number[]
) => { // 函数操作... }
```

### 函数重载

在其他一些强类型语言中，函数重载指定义几个函数名相同，但是参数个数或类型不同的函数，在调用时传入不同的参数，编译器会自动调用适合的函数。

TypeScript 的函数重载是在类型系统层面的，是为了更好地进行类型推断。与其他一些强类型语言中的定义不同。

TypeScript 的函数重载通过为一个函数指定多个函数类型定义，从而对函数调用的返回值进行检查。

**重载只能用 function 来定义，不能使用接口、类型别名等。**

``` typescript
// 重载的一部分，指定当参数类型为string时，返回值为string类型的元素构成的数组
function handleData(x: string): string[];
// 重载的一部分，指定当参数类型为number时，返回值类型为string
function handleData(x: number): string;
// 重载的内容，是实体函数，不算做重载的部分
function handleData(x: any): any {
  if (typeof x === "string") {
    return x.split("");
  } else {
    return x
      .toString()
      .split("")
      .join("_");
  }
}
handleData("abc").join("_");
handleData(123).join("_"); // error 类型"string"上不存在属性"join"
handleData(false); // error 类型"boolean"的参数不能赋给类型"number"的参数。
```

#### 函数重载的规则

+ 由一个**实现签名**和一个或多个**重载签名**合成。**函数签名** (function signature) = 函数名称 + 函数参数 + 函数参数类型 + 返回值类型。在 TS 函数重载中，包含了实现签名和重载签名，实现签名和重载签名都是函数签名。
+ 外部调用函数重载定义的函数时，只能调用重载签名，不能调用实现签名。实现签名下的函数体是给重载签名编写的，实现签名只是在定义时，起到了统领所有重载签名的作用，在执行调用时就看不到实现签名了。
+ 调用函数重载时，会根据传递的参数来判断调用的是哪一个函数
+ 只有一个函数体，只有实现签名配备了函数体，所有的重载签名都只有签名，没有配备函数体。
+ 参数类型规则：实现签名参数个数可以少于重载签名的参数个数，但实现签名如果准备包含重载签名的某个位置的参数，那实现签名就必须兼容所有重载签名该位置的参数类型【`联合类型` 或 `any` 或 `unknown` 类型的一种】。
+ 返回值类型规则
  + 必须给重载签名提供返回值类型，TS 无法默认推导。
  + 提供给重载签名的返回值类型不一定为其执行时的真实返回值类型，可以为重载签名提供真实返回值类型，也可以提供 `void` 或 `unknown` 或 `any` 类型。
  + 如果重载签名的返回值类型是 `void` 或 `unknown` 或 `any` 类型，那么将由实现签名来决定重载签名执行时的真实返回值类型。建议为重载签名提供真实返回值类型。

#### 构造器重载

构造器重载和函数重载使基本相同，主要区别是：

+ TS 类构造器重载签名和实现签名都不需要管理返回值
+ TS 构造器是在对象创建出来之后，但是还没有赋值给对象变量之前被执行，一般用来给对象属性赋值

``` typescript
type type_ChartParam = {
  width?: number;
  height?: number;
  radius?: number;
};

class Square {
  public width: number;
  public height: number;

  constructor(width_: number, height_: number); // 重载签名
  constructor(paramObj: type_ChartParam); // 重载签名
  // 实现签名
  constructor(paramObjOrWidth_: any, height_: number = 0) {
    // constructor(paramObjOrWidth_: any, height_?: number) { // 实现签名
    if (typeof paramObjOrWidth_ === 'object') {
      this.width = paramObjOrWidth_.width;
      this.height = paramObjOrWidth_.height;
    } else {
      this.width = paramObjOrWidth_;
      this.height = height_;
    }
  }

  public getArea(): number {
    return this.height * this.width;
  }
}

let square01 = new Square(40, 50);
console.log(square01.getArea());

let chartParamObj: type_ChartParam = { width: 50, height: 90 };
let square02 = new Square(chartParamObj);
console.log(square02.getArea());
```

## 泛型（generic）

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

+ 定义时不明确，使用时必须明确成某种具体数据类型的数据类型。
+ 编译期间，进行数据类型安全检查的数据类型。

扩展：

+ `Object` 为什么不能替代泛型？
  + 编译期间 `Object` 无法进行类型安全检查，而泛型在编译期间可以进行类型安全检查
  + `Object` 类型数据无法接受非 `Object` 类型的变量，只能接受 `Object` 类型的变量，泛型能做到
  + `Object` 类型数据获取属性和方法时无自动提示，泛型有自动提示
+ `Any` 为什么不能替代泛型？
  + 编译期间 `Any` 无法进行类型安全检查，而泛型在编译期间可以进行类型安全检查
  + `Any` 类型可以获取任意数据类型的任何属性和任意方法，而不会出现编译错误，导致潜在错误风险。而泛型却有效的避免了此类问题发生
  + `Any` 类型数据获取属性和方法时无自动提示，泛型有自动提示

### 泛型变量

使用 `<T>` 符号定义了一个泛型变量 T

+ `T` 代表某一种类型，可以是基础类型、联合类型等高级类型
+ 定义泛型变量之后，在函数中任何地方指定类型使用 `T`，都代表这一种类型

常⻅泛型变量：

+ `T (Type)`：在定义泛型时，通常⽤作第⼀个类型变量名称。
+ `K (Key)`：表示对象中的键类型。
+ `V (Value)`：表示对象中的值类型。
+ `E (Element)`：表示元素类型。

**当使用泛型的时候，必须在处理类型，涉及到泛型的数据的时候，把这个数据当做任意类型来处理。** 这就意味着，不是所有类型都能做的操作不能做，不是所有类型都能调用的方法不能调用。

``` typescript
const getArray = <T>(value: T, times: number = 5): T[] => {
  return new Array(times).fill(value);
};

// 使用
getArray<number[]>([1, 2], 3).forEach(item => {
  console.log(item.length);
});
// 可省略 <number[]>，TypeScript会根据传入函数的 value 值的类型进行推断
getArray([1, 2], 3).forEach(item => {
  console.log(item.length);
});

const getLength = <T>(param: T): number => {
  return param.length; // error 类型“T”上不存在属性“length”
};
```

### 泛型接口

``` typescript
interface Identities<V, M> {
  value: V;
  message: M;
}

function identity<T, U>(value: T, message: U): Identities<T, U> {
  console.log(value + ': ' + typeof value);
  console.log(message + ': ' + typeof message);
  let identities: Identities<T, U> = {
    value,
    message,
  };
  return identities;
}
console.log(identity(68, 'Semlinker'));
```

### 泛型类

``` typescript
// 4、对于 GenericInterface<U> 接⼝来说，类型变量 U 也变成了 Number 。
interface GenericInterface<U> {
  value: U;
  getIdentity: () => U;
}

// 2、在 IdentityClass 类中，类型变量 T 的值变成 Number 类型
// 3、IdentityClass 类实现了 GenericInterface<T> ，⽽此时 T 表示 Number 类型，因此等价于
该类实现了 GenericInterface<Number> 接⼝
class IdentityClass<T> implements GenericInterface<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }
  getIdentity(): T {
    return this.value;
  }
}
// 1、实例化 IdentityClass 对象时，传⼊ Number 类型和构造函数参数值 68 ；
const myNumberClass = new IdentityClass<Number>(68);
console.log(myNumberClass.getIdentity()); // 68

const myStringClass = new IdentityClass<string>('Semlinker!');
console.log(myStringClass.getIdentity()); // Semlinker!
```

### 泛型函数

``` typescript
// 简单定义
const getArray: <T>(arg: T, times: number) => T[] = (arg, times) => {
  return new Array(times).fill(arg);
};

// 使用类型别名
type GetArray = <T>(arg: T, times: number) => T[];
const getArray: GetArray = <T>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg);
};

// 使用接口形式
interface GetArray {
  <T>(arg: T, times: number): T[];
}
const getArray: GetArray = <T>(arg: T, times: number): T[] => {
  return new Array(times).fill(arg);
};

// 将接口中泛型变量提升到接口最外层
// 接口中所有属性和方法都能使用这个泛型变量
interface GetArray<T> {
  (arg: T, times: number): T[];
  tag: T;
}
const getArray: GetArray<number> = <T>(arg: T, times: number): T[] => {
  // error 不能将类型“{ <T>(arg: T, times: number): T[]; tag: string; }”分配给类型“GetArray<number>”。
  // 属性“tag”的类型不兼容。
  return new Array(times).fill(arg);
};
getArray.tag = "a"; // 不能将类型“"a"”分配给类型“number”
getArray("a", 1); // 不能将类型“"a"”分配给类型“number”


function cross<T extends object, U extends object>(objOne: T, objTwo: U): T & U;
function cross<T extends object, U extends object, V extends object>(
  objOne: T,
  objTwo: U,
  objThree: V
): T & U & V;
function cross<T extends object, U extends object, V extends object>(
  objOne: T,
  objTwo: U,
  objThree?: V
) {
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

### 泛型约束

泛型约束就是使用一个类型和 `extends` 对泛型进行约束。

``` typescript
interface ValueWithLength {
  length: number;
}

// 泛型变量 T 受到约束，必须满足接口 ValueWithLength，即不管是什么类型，但必须有一个 length 属性，且类型为数值类型。
const getLength = <T extends ValueWithLength>(param: T): number => {
  return param.length;
};
getLength("abc"); // 3
getLength([1, 2, 3]); // 3
getLength({ length: 3 }); // 3
getLength(123); // error 类型“123”的参数不能赋给类型“ValueWithLength”的参数
```

+ 场景：当定义一个对象，想要只能访问对象上存在的属性时

  使用 K 来继承索引类型 `keyof T`，`keyof T` 相当于一个由泛型变量 T 的属性名构成的联合类型。

  ``` typescript
  const getProp = <T, K extends keyof T>(object: T, propName: K) => {
    return object[propName];
  };
  const obj = { a: "aa", b: "bb" };
  getProp(obj, "c"); // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
  ```

+ 场景：当泛型需要被所规定接口约束时

  ``` typescript
  interface FirstInterface {
    doSomething(): number
  }
  interface SecondInterface {
    doSomethingElse(): string
  }

  // 方法一：将接口 FirstInterface 与 SecondInterface 作为超接口来解决问题
  interface ChildInterface extends FirstInterface, SecondInterface {}
  class Demo<T extends ChildInterface> {
    private genericProperty: T

    useT() {
      this.genericProperty.doSomething()
      this.genericProperty.doSomethingElse()
    }
  }

  // 方法二：利用交叉类型进行多类型约束
  class Demo<T extends FirstInterface & SecondInterface> {
    private genericProperty: T
    useT() {
      this.genericProperty.doSomething() // ok
      this.genericProperty.doSomethingElse() // ok
    }
  }
  ```

+ 场景：当声明一个泛型拥有构造函数时

  问题：编译器会提示表达式不能构造，因为没有声明这个泛型 T 是构造函数

  ``` typescript
  function factory<T>(type: T): T {
    return new type(); // error: This expression is not constructable
  }

  // 解决方法：使用 new
  // 参数 type 的类型 { new(): T }
  // 表示此泛型 T 是可被构造的，在被实例化后的类型是泛型 T
  function factory<T>(type: {new(): T}): T {
    return new type() // ok
  }
  ```

### 泛型参数默认类型

语法：`<T = DefaultType>`

``` typescript
interface A<T = string> {
  name: T;
}
const strA: A = { name: 'Semlinker' };
const numB: A<number> = { name: 101 };
```

泛型参数的默认类型遵循以下规则：

+ 有默认类型的类型参数被认为是**可选的**。
+ 必选的类型参数不能在可选的类型参数后。
+ 如果类型参数有约束，类型参数的默认类型必须满⾜这个约束。
+ 当指定类型实参时，只需要指定必选类型参数的类型实参。未指定的类型参数会被解析为它们的默认类型。
+ 如果指定了默认类型，且类型推断⽆法选择⼀个候选类型，那么将使⽤默认类型作为推断结果。
+ ⼀个被现有类或接⼝合并的类或者接⼝的声明可以为现有类型参数引⼊默认类型。
+ ⼀个被现有类或接⼝合并的类或者接⼝的声明可以引⼊新的类型参数，只要它指定了默认类型。

### 泛型条件类型

条件类型会以⼀个条件表达式进⾏类型关系检测，从⽽在两种类型中选择其⼀：`T extends U ? X : Y` （若 `T` 能够赋值给 `U` ，那么类型是 `X` ，否则为 `Y` 。）

``` typescript
interface Dictionary<T = any> {
  [key: string]: T;
}

// 当类型 T 满⾜ T extends Dictionary 约束时，我们会使⽤ infer 关键字声明了⼀个类型变量 V，并返回该类型，否则返回 never 类型
type DictMember<T> = T extends Dictionary<infer V> ? V : never;
type StrDict = Dictionary<string>;

type StrDictMember = DictMember<StrDict>; // string
```

## 类（class）

TypeScript 的类与 ES 中的类并无差异，可参考 ES6 标准类

### 修饰符

+ `public`: 表示**公共的**，用来指定在创建实例后可以通过实例访问的，也就是类定义的外部可以访问的属性和方法
+ `private`: 表示**私有的**，它修饰的属性在类的定义外面是无法访问的
+ `protected`: 表示**受保护的**，它修饰的成员在继承该类的子类中可以访问

  `protected` 可以用来修饰 `constructor` 构造函数，加了 `protected` 修饰符之后，这个类不能再用来创建实例，只能被子类继承。
+ `readonly`: 将属性设置为**只读**，实例只能读取这个属性，但不能修改

``` typescript
class Parent {
  public name: string; // 公共属性
  private sex: string; // 私有属性
  protected age: number; // 受保护的属性
  readonly card: string; // 只读属性
  constructor (age: number) {
    this.age = age
  }
  protected getAge() { return this.age; }
  // constructor 加了 `protected` 修饰符之后，这个类不能再用来创建实例，只能被子类继承。
  // protected constructor () {}
}
const p = new Parent(18);
class Child extends Parent {
  constructor (age: number) {
    super(age);
    console.log(super.age) // undefined
    console.log(super.getAge()); // 18
  }
}
new Child(18);
```

### 属性与存取器

+ 参数属性: 在 `constructor` 构造函数的参数前面加上访问限定符（即`public`、`private`、`protected`、`readonly`中的任意一个）
+ 静态属性: 使用 `static` 关键字来指定属性或方法是静态的，实例将不会添加这个静态属性，也不会继承这个静态方法。也可以使用修饰符和 `static` 关键字来指定一个属性或方法
+ 可选类属性: 使用 `?` 符号来标记
+ 存取器
  + 存值函数 - 在设置属性值的时候调用的函数
  + 取值函数 - 在访问属性值的时候调动的函数

``` typescript
class Parent {
  private _fullName: string = "";
  sex?: string;
  public static age: number = 18;
  public static getAge() { return Parent.age }
  constructor (public name: string, sex?: string, public card?: string) {
    this.name = name;
    this.sex = sex;
  }
  get fullName() { return this._fullName }
  set fullName(value) { this._fullName = value }
}
const p1 = new Parent('Tom')
const p2 = new Parent('Tom', '男')
const p3 = new Parent('Tom', '男', '101')
p1.fullName = "Jerry"; // setter: Jerry
console.log(p1.fullName); // Jerry
console.log(p1.age); // error Property 'age' is a static member of type 'Parent'
console.log(Parent.age); // 18
```

### 抽象类

抽象类一般用来被其他类继承，而不直接用它创建实例。抽象类和类内部定义抽象方法，使用 `abstract` 关键字

``` typescript
abstract class People {
  constructor(public name: string) {}
  abstract printName(): void;
}
class Man extends People {
  constructor(name: string) {
    super(name);
    this.name = name;
  }
  // 在抽象类里定义的抽象方法，在子类中是不会继承的，所以在子类中必须实现该方法的定义。
  // error 非抽象类“Man”不会实现继承自“People”类的抽象成员"printName"
  // printName() { console.log(this.name); }
}
const m = new Man("lison");
m.printName(); // error m.printName is not a function
```

### 实例类型

定义一个类并创建实例后，这个实例的类型就是创建他的类。如果想实现对创建实例的类的判断，需要用到 `instanceof` 关键字

``` typescript
class People {
  constructor(public name: string) {}
}
let p: People = new People("lison");
```

### 其他

+ 类类型接口: 使用接口可以强制一个类的定义必须包含某些内容

  + `implements` 关键字：用来指定一个类要继承的接口（类继承接口）
  + `extends` 关键字：用于接口和接口、类和类直接的继承

  ``` typescript
  interface FoodInterface {
    type: string;
  }
  class FoodClass implements FoodInterface {
    // error Property 'type' is missing in type 'FoodClass' but required in type 'FoodInterface'
    // 定义了静态属性 type，但静态属性不会添加到实例上，所以还是报错
    static type: string;
    constructor() {}
  }

  // 错误解决方法一：
  interface FoodInterface {
    type: string;
  }
  class FoodClass implements FoodInterface {
    constructor(public type: string) {}
  }
  // 错误解决方法二：
  abstract class FoodAbstractClass {
    abstract type: string;
  }
  class Food extends FoodAbstractClass {
    constructor(public type: string) {
      super();
    }
  }
  ```

+ 接口继承类

  接口可以继承一个类，当接口继承了该类后，会继承类的成员，但是不包括其实现，也就是**只继承成员以及成员类型**。

  接口还会**继承类的 `private` 和 `protected` 修饰的成员**，当接口继承的这个类中包含这两个修饰符修饰的成员时，这个接口**只可被这个类或他的子类实现**。

  ``` typescript
  class A {
    protected name: string;
  }
  interface I extends A {}
  class B implements I {} // error Property 'name' is missing in type 'B' but required in type 'I'
  class C implements I {
    // error 属性“name”受保护，但类型“C”并不是从“A”派生的类
    name: string;
  }
  class D extends A implements I {
    getName() {
      return this.name;
    }
  }
  ```

+ 在泛型中使用类类型

  ``` typescript
  // 参数 c 的类型定义中，new()代表调用类的构造函数
  // 他的类型也就是类创建实例后的实例的类型。
  const create = <T>(c: { new (): T }): T => {
    // 使用传进来的类 c 创建一个实例并返回
    // 返回的实例类型也就是函数的返回值类型。
    return new c();
  };
  class Info {
    age: number;
  }
  // 通过定义 create，TS 就知道:
  // 调用 create 函数，传入的和返回的值都应该是同一个类类型。
  create(Info).age;
  create(Info).name; // error 类型“Info”上不存在属性“name”
  ```

## 类型兼容性

### 函数兼容性

+ 函数参数个数: 对函数 y 进行赋值，要求 x 中的每个参数都应在 y 中有对应，也就是参数个数小于等于 y 的参数个数。
+ 函数参数类型: 除了参数个数，参数的类型需要对应。
+ 剩余参数和可选参数: 当要被赋值的函数参数中包含剩余参数（...arg）时，赋值的函数可以用任意个数参数代替，但是类型需要对应。
+ 函数参数双向协变: 参数类型无需绝对相同。

  ``` typescript
  let funcA = function(arg: number | string): void {};
  let funcB = function(arg: number): void {};
  // funcA = funcB 和 funcB = funcA都可以
  ```

+ 函数返回值类型

  ``` typescript
  let x = (a: number): string | number => 0;
  let y = (b: number) => "a";
  let z = (c: number) => false;
  x = y;
  x = z; // 不能将类型“(c: number) => boolean”分配给类型“(a: number) => string | number”
  ```

+ 函数重载: 带有重载的函数，要求被赋值的函数的每个重载都能在用来赋值的函数上找到对应的签名

  ``` typescript
  function merge(arg1: number, arg2: number): number; // merge函数重载的一部分
  function merge(arg1: string, arg2: string): string; // merge函数重载的一部分
  function merge(arg1: any, arg2: any) { // merge函数实体
    return arg1 + arg2;
  }
  function sum(arg1: number, arg2: number): number; // sum函数重载的一部分
  function sum(arg1: any, arg2: any): any { // sum函数实体
    return arg1 + arg2;
  }
  let func = merge;
  func = sum; // error 不能将类型“(arg1: number, arg2: number) => number”分配给类型“{ (arg1: number, arg2: number): number; (arg1: string, arg2: string): string; }”
  ```

### 枚举

+ 数字枚举成员类型与数字类型互相兼容，但是不同枚举值之间是不兼容的

  ``` typescript
  enum Status { On, Off }
  enum Color { White, Black }
  let s = Status.On;
  s = Color.White; // error Type 'Color.White' is not assignable to type 'Status'
  ```

+ 字符串枚举成员类型和字符串类型是不兼容的

  ``` typescript
  enum Status { On = 'on', Off = 'off' }
  let s = Status.On
  s = 'Lison' // error 不能将类型“"Lison"”分配给类型“Status”
  ```

### 类

+ 比较两个类类型的值的兼容性时，**只比较实例的成员**，类的静态成员和构造函数不进行比较

  ``` typescript
  class Animal {
    static age: number;
    constructor(public name: string) {}
  }
  class People {
    static age: string;
    constructor(public name: string) {}
  }
  class Food {
    constructor(public name: number) {}
  }
  let a: Animal;
  let p: People;
  let f: Food;
  a = p; // right
  a = f; // error Type 'Food' is not assignable to type 'Animal'
  ```

+ 类的私有成员和受保护成员会影响兼容性。当检查类的实例兼容性时，如果目标（也就是要被赋值的那个值）类型（这里实例类型就是创建它的类）包含一个私有成员，那么源（也就是用来赋值的值）类型必须包含**来自同一个类的这个私有成员**，这就允许子类赋值给父类。

  ``` typescript
  class Parent {
    private age: number;
    constructor() {}
  }
  class Children extends Parent {
    constructor() {
      super();
    }
  }
  class Other {
    private age: number;
    constructor() {}
  }
  // Children类继承Parent类，且实例属性没有差异，Parent类有私有属性age
  // 但因为Children类继承了Parent类，所以可以赋值。
  const children: Parent = new Children();
  // 不能将类型“Other”分配给类型“Parent”。类型具有私有属性“age”的单独声明
  // Parent 的 age 属性是私有成员，外界是无法访问到的，所以会类型不兼容
  const other: Parent = new Other();
  ```

### 泛型

泛型包含类型参数，这个类型参数可能是任意类型，使用时类型参数会被指定为特定的类型，而这个类型**只影响使用了类型参数的部分**。

``` typescript
interface Data<T> {
  data: T;
}
let data1: Data<number>;
let data2: Data<string>;
data1 = data2; // error 不能将类型“Data<string>”分配给类型“Data<number>”。不能将类型“string”分配给类型“number”
```
