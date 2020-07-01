# TypeScript基础

## 类型

``` typescript
let u: undefined = undefined
let n: null = null

let num: number = undefined // null、undefined为所有类型的子类型

let notSure: any = 4 // any类型
notSure = 'maybe it is a string'

let numberOrString: number | string = 234 // 联合类型
numberOrString = 'abc'

let arrOfNumbers: number[] = [1, 2, 3, 4] // Array
arrOfNumbers.push(5)

function test() {
  console.log(arguments) // 类数组 类似数组，但是不具有全部的数组方法
  console.log(arguments.length)
}

let user：[string, number] = ['viking', 1] // 元组 Tuple：允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
```

## Interface 接口

+ 对对象的形状（shape）进行描述
+ 对类（class）进行抽象
+ Duck Typing（鸭子类型）

``` typescript
interface Person {
  readonly id: number;
  name: string;
  age?: number;
}
let onePerson: Person = {
  id: 1234,
  name: 'lrh'
  // age: 12
}
```

## 函数

``` typescript
function add(x: number, y: number = 10, z?: number): number {
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}
let result = add(2, 3, 5)

const add = function add(x: number, y: number = 10, z?: number): number {
  if (typeof z === 'number') {
    return x + y + z
  } else {
    return x + y
  }
}
const add2: (x: number, y: number = 10, z?: number) => number = add // 类型推断
```

## 类 Class

+ 类(Class)：定义了一切事物的抽象特点
+ 对象(Obejct)：类的实例
+ 面向对象(OOP)三大特性：封装、继承、多态

`public` `private` `protected` `readonly` `static`

类 和 `Interface`

## 枚举 Enum

``` typescript
const enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'Right'
}
console.log(Direction.Up)
console.log(Direction[0])

// 解析之后
var Direction;
(function (Direction) {
  Direction[Direction["Up"] = 0] = "Up";
  Direction[Direction["Down"] = 0] = "Down";
  Direction[Direction["Left"] = 0] = "Left";
  Direction[Direction["Right"] = 0] = "Right";
})(Direction || (Direction = {}));
console.log(Direction.Up)
console.log(Direction[0])
```

## 泛型 Generics

在定义函数、接口、类的时候，不指定类型。而是在使用的时候指定类型的一种特征

``` javascript
function echo<T>(age: T): T {
  return age
}
const result = echo('123456')

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
const result = swap(['string', 123])

function echoWithArr<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
const arrs = echoWithArr([1, 2, 3])

interface IWithLength {
  length: number
}
function echoWithLength<T extends IWithLength>(arg: T): T {
  console.log(arg.length)
  return arg
}
const str = echoWithLength('123')

class Queue<T> {
  private data = [];
  push(item: T) {
    return this.data.push(item)
  }
  pop(): T {
    return this.data.shift()
  }
}
const queue = new Queue<number>()
queue.push(1)
console.log(queue.pop().toFixed())

interface KeyPair<T, U> {
  key: T;
  value: U;
}
let kp1: KeyPair<number, string> = {key: 123, value: 'str'}
let kp2: KeyPair<number, string> = {key: 'str', value: 123}

let arr: number[] = [1, 2, 3]
let arrTwo: Array<number> = [1, 2, 3]

interface IPlus<T> {
  (a: T, b: T): T
}
function plus(a: number, b: number): number {
  return a + b
}
const a: IPlus<number> = plus
```

## 类型别名和类型断言

``` javascript
// 类型别名
type PlusType = (x: number, y: number) => number
function sum(x: number, y: number): number {
  return x + y
}
const sum2: PlusType = sum

type NameResolver = () => string
type NameOrResolver = string | NameResolver
function getName(n: NameOrResolver): string {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}


// 类型断言
function getLength(input: string | number): number {
  // const str = input as String
  // if (str.length) {
  //   return str.length
  // } else {
  //   const number = input as Number
  //   return number.toString().length
  // }

  if((<string>input).length) {
    return (<string>input).length
  } else {
    return input.toString().length
  }
}
```

## 声明文件

``` javascript
// jQuery.d.ts
declare var jQuery: (selector: string) => any
```
