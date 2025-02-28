# TypeScript 装饰器

## 基础

- 装饰器定义

  装饰器能够作用于类声明、方法、访问符、属性和参数上。使用 `@` 符号加一个名字来定义，如 `@decorat`， `decorat` 必须**是一个函数或者求值后是一个函数**。函数在运行的时候被调用，被装饰的声明作为参数会自动传入。

  注意：装饰器要紧挨着要修饰的内容的前面，而且所有的装饰器不能用在 `.d.ts` （声明文件）中，和任何外部上下文中。

- 装饰器工厂

  装饰器工厂是一个函数，它的返回值是**一个函数**，返回的函数作为装饰器的调用函数。如果使用装饰器工厂，那么在使用的时候，就要加上函数调用。

- 装饰器组合（对于同一个目标，引用多个装饰器），多个装饰器的执行顺序如下：

  - 装饰器工厂从上到下依次执行，但是只是用于返回函数但不调用函数；
  - 装饰器函数从下到上依次执行，也就是执行工厂函数返回的函数。

  ```typescript
  function setName () {
    console.log('get setName')
    return function (target) {
      console.log('setName')
    }
  }
  function setAge () {
    console.log('get setAge')
    return function (target) {
      console.log('setAge')
    }
  }

  @setName()
  @setAge()
  class Test {}
  // 打印出来的内容如下：
  // 'get setName -> get setAge -> setAge -> setName
  ```

- 装饰器求值

  类的定义中,不同声明上的装饰器将按以下规定的顺序引用：

  - 参数装饰器，方法装饰器，访问符装饰器或属性装饰器应用到每个实例成员；
  - 参数装饰器，方法装饰器，访问符装饰器或属性装饰器应用到每个静态成员；
  - 参数装饰器应用到构造函数；
  - 类装饰器应用到类。

- 装饰器 JavaScript 实现

  ```typescript
  function FirstClassDecorator(targetClass: any) {
    console.log(targetClass.prototype.constructor.name + '信息');
    Object.keys(targetClass.prototype).forEach((methodname) => {
      console.log('方法', methodname);
      let dataprop = Object.getOwnPropertyDescriptor(targetClass.prototype, methodname);
      console.log('方法数据属性:', dataprop);
    });
  }

  @FirstClassDecorator
  class CustomerService {
    name: string = '名字';
    constructor() {}
    buy() {
      console.log(this.name + '购买');
    }
    placeOrder() {
      console.log(this.name + '下单购买');
    }
  }

  // ========== JavaScript 实现 ==========

  'use strict';
  var __decorate =
    (this && this.__decorate) ||
    // decorators : 接收数组，包含多个装饰器函数
    // target : 表示被装饰的类
    // key
    // desc
    function (decorators, target, key, desc) {
      // 参数数量
      // > argsNum = 2, 装饰器修饰的是【类】或者【构造器参数】, targetInfo = target[类名]
      // > argsNum = 3, 装饰器修饰的是【方法参数】或者【属性】, targetInfo = undefined
      // > argsNum = 4, 装饰器修饰的是【方法】（第四个参数 desc 等于 null）, targetInfo = 该方法的数据属性 [desc = Object.getOwnPropertyDescriptor(target, key)]
      var argsNum = arguments.length;
      // targetInfo : 被装饰器修饰的目标 - 类、属性、方法、方法参数
      var targetInfo =
        argsNum < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc;
      var decorator; // 保存装饰器数组元素

      // Reflect.decorate : ES6是没有提供 Reflect.decorate 方法，元数据信息,支持 reflect-metadata 元数据
      if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
        targetInfo = Reflect.decorate(decorators, target, key, desc);
      else
        for (var i = decorators.length - 1; i >= 0; i--)
          if ((decorator = decorators[i]))
            // argsNum < 3, decorator 为【类装饰器】或者【构造器参数装饰器】，执行 decorator(targetInfo), 直接执行 decorator 装饰器，并传递目标 targetInfo
            // argsNum > 3, decorator 为【方法装饰器】，直接执行 decorator(target, key, targetInfo)
            // argsNum = 3, decorator 为【方法参数装饰器】或者【属性装饰器】，直接执行 decorator(target, key)
            // targetInfo 最终为各个装饰器执行后的返回值,但如果没有返回值
            targetInfo =
              (argsNum < 3
                ? decorator(targetInfo)
                : argsNum > 3
                ? decorator(target, key, targetInfo)
                : decorator(target, key)) || targetInfo;
      return argsNum > 3 && targetInfo && Object.defineProperty(target, key, targetInfo), targetInfo;
    };
  var __metadata =
    (this && this.__metadata) ||
    function (k, v) {
      if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
        return Reflect.metadata(k, v);
    };

  function FirstClassDecorator(targetClass) {
    console.log(targetClass.prototype.constructor.name + '信息');
    Object.keys(targetClass.prototype).forEach((methodname) => {
      console.log('方法', methodname);
      let dataprop = Object.getOwnPropertyDescriptor(targetClass.prototype, methodname);
      console.log('方法数据属性:', dataprop);
    });
  }
  let CustomerService = class CustomerService {
    constructor() {
      this.name = '姓名';
    }
    buy() {
      console.log(this.name + '购买');
    }
    placeOrder() {
      console.log(this.name + '下单购买');
    }
  };
  CustomerService = __decorate(
    [FirstClassDecorator, __metadata('design:paramtypes', [])],
    // 【注意】：类装饰器，此处为类的实例
    CustomerService
  );
  ```

## 类装饰器

类装饰器在类声明之前声明，类装饰器应用于类的声明。

类装饰器表达式会在运行时，当做函数被调用，它有唯一一个参数，就是装饰的这个类。

通过装饰器，可以修改类的原型对象和构造函数。

```typescript
// 装饰器，返回一个类，这个类继承要修饰的类
// 所以最后创建的实例不仅包含原 Greeter 类中定义的实例属性，还包含装饰器中定义的实例属性。
// 在装饰器里给实例添加的属性，设置的属性值会覆盖被修饰的类里定义的实例属性
// 所以创建实例的时候虽然传入了字符串，但是 hello 还是装饰器里设置的"override"。
function classDecorator<T extends { new (...args: any[]): {} }>(target: T) {
  return class extends target {
    newProperty = "new property";
    hello = "override";
  };
}

@classDecorator
class Greeter {
  property = "property";
  hello: string;
  constructor(m: string) {
    this.hello = m;
  }
}
console.log(new Greeter("world"));
/*
{
  hello: "override"
  newProperty: "new property"
  property: "property"
}
*/
```

## 方法装饰器

方法装饰器用来处理类中方法，它可以处理方法的**属性描述符**，可以处理**方法定义**。方法装饰器在运行时，也是被当做函数调用，含 3 个参数：

- 装饰静态成员时，是类的**构造函数**；装饰实例成员时，是类的**原型对象**。
- 成员的名字。
- 成员的属性描述符。

  对象可以设置属性，如果属性值是函数，那这个函数称为方法。每一个属性和方法在定义的时候，都伴随三个属性描述符 `configurable`、 `writable` 和 `enumerable`，分别用来描述这个属性的可配置性、可写性和可枚举性。这三个描述符，需要使用 ES5 的 `Object.defineProperty` 方法来设置。

  - `writable` : 设置为 false 时，为无法修改它起初定义的属性值的
  - `enumerable` : 设置为 false 时，为不可枚举的，就遍历不到了
  - `configurable` : 设置为 false 时，为无法通过 `Object.defineProperty` 修改该属性的三个描述符的值了，所以这是个不可逆的设置
  - `value` : 该属性对应的值。

如果方法装饰器返回一个值，那么会用这个值作为方法的**属性描述符对象**。

```typescript
function log(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log('wrapped function: before invoking ' + propertyKey);
    let result = originalMethod.apply(this, args);
    console.log('wrapped function: after invoking ' + propertyKey);
    return result;
  };
}
class Task {
  @log
  runTask(arg: any): any {
    console.log('runTask invoked, args: ' + arg);
    return 'finished';
  }
}
let task = new Task();
let result = task.runTask('learn ts');
console.log('result: ' + result);

// wrapped function: before invoking runTask
// runTask invoked, args: learn ts
// wrapped function: after invoking runTask
// result: finished
```

方法拦截器示例：

```typescript
class StringUtil {
  public static trimSpace(str: string): string {
    return str.replace(/\s+/g, '');
  }
}

class RoleService {
  public roleName: string = '管理员';
  constructor() {}

  @MethodInterceptor('DistribRoles方法')
  DistribRoles(userName: string, isValid: boolean) {
    console.log('>>> 分配角色.....');
  }
}

function MethodInterceptor(paramsValue: any) {
  return function (targetClassPrototype: any, methodName: any, methodDecri: PropertyDescriptor) {
    // ========== 【方法前置拦截器】 ==========
    // 1、保存目标类的方法到 targetMethodSave
    let targetMethodSave = methodDecri.value;
    console.log('targetMethodSave:', targetMethodSave);

    // 2、value 函数建立新得函数对象空间。
    // > value 建立一个新的函数后, RoleService 对象调用 DistribRoles 会执行 value 指向的新函数，
    // > 并不会执行原来 RoleService 目标类中 DistribRoles 方法
    methodDecri.value = function (...args: any[]) {
      // 迭代所有参数
      args = args.map((arg) => {
        if (typeof arg === 'string') {
          return StringUtil.trimSpace(arg);
        }
        return arg;
      });

      // 3、使用 apply 执行 targetMethodSave 原来函数
      // > 这是一种典型的用方法装饰器扩大原来方法功能的案例。
      // > 但如果增强原来方法功能后,还想继续执行原来 RoleService 类中 DistribRoles 方法
      // ========== 【方法执行】 ==========
      targetMethodSave.apply(this, args);
    };

    // ========== 【方法后置拦截器】 ==========
    // Do something ...
  };
}

// ========== JavaScript 实现 ==========
'use strict';
var __decorate =
  (this && this.__decorate) ||
  // decorators : 接收数组，包含多个装饰器函数
  // target : 表示被装饰的类
  // key
  // desc
  function (decorators, target, key, desc) {
    // 参数数量
    // > argsNum = 2, 装饰器修饰的是【类】或者【构造器参数】, targetInfo = target[类名]
    // > argsNum = 3, 装饰器修饰的是【方法参数】或者【属性】, targetInfo = undefined
    // > argsNum = 4, 装饰器修饰的是【方法】（第四个参数 desc 等于 null）, targetInfo = 该方法的数据属性 [desc = Object.getOwnPropertyDescriptor(target, key)]
    var argsNum = arguments.length;
    var targetInfo =
      argsNum < 3
        ? target
        : desc === null
        ? (desc = Object.getOwnPropertyDescriptor(target, key))
        : desc;
    var decorator;

    // Reflect.decorate : ES6是没有提供 Reflect.decorate 方法，元数据信息,支持 reflect-metadata 元数据
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      targetInfo = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((decorator = decorators[i]))
          // argsNum < 3, decorator 为【类装饰器】或者【构造器参数装饰器】，执行 decorator(targetInfo), 直接执行 decorator 装饰器，并传递目标 targetInfo
          // argsNum > 3, decorator 为【方法装饰器】，直接执行 decorator(target, key, targetInfo)
          // argsNum = 3, decorator 为【方法参数装饰器】或者【属性装饰器】，直接执行 decorator(target, key)
          // targetInfo 最终为各个装饰器执行后的返回值,但如果没有返回值
          targetInfo =
            (argsNum < 3
              ? decorator(targetInfo)
              : argsNum > 3
              ? decorator(target, key, targetInfo)
              : decorator(target, key)) || targetInfo;
    return argsNum > 3 && targetInfo && Object.defineProperty(target, key, targetInfo), targetInfo;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
class StringUtil {
  static trimSpace(str) {
    return str.replace(/\s+/g, '');
  }
}
class RoleService {
  constructor() {
    this.roleName = '管理员';
  }
  DistribRoles(userName, isValid) {
    console.log('>>> 分配角色.....');
  }
}
__decorate(
  [
    MethodInterceptor('DistribRoles方法'),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [String, Boolean]),
    __metadata('design:returntype', void 0),
  ],
  // 【注意】：方法装饰器，此处为类原型对象（类的方法挂载在原型对象上）。
  RoleService.prototype,
  'DistribRoles',
  null
);
function MethodInterceptor(paramsValue) {
  return function (targetClassPrototype, methodName, methodDecri) {
    // ========== 【方法前置拦截器】 ==========
    // 1、保存目标类的方法到targetMethodSave
    let targetMethodSave = methodDecri.value;
    console.log('targetMethodSave:', targetMethodSave);
    // 2、value 函数建立新得函数对象空间。
    // > value 建立一个新的函数后, RoleService 对象调用 DistribRoles 会执行 value 指向的新函数，
    // > 并不会执行原来 RoleService 目标类中 DistribRoles 方法
    methodDecri.value = function (...args) {
      // 迭代所有参数
      args = args.map((arg) => {
        if (typeof arg === 'string') {
          return StringUtil.trimSpace(arg);
        }
        return arg;
      });
      // 3、使用 apply 执行 targetMethodSave 原来函数
      // > 这是一种典型的用方法装饰器扩大原来方法功能的案例。
      // > 但如果增强原来方法功能后,还想继续执行原来 RoleService 类中 DistribRoles 方法
      // ========== 【方法执行】 ==========
      targetMethodSave.apply(this, args);
    };
    // ========== 【方法后置拦截器】 ==========
    // Do something ...
  };
}
```

## 访问器装饰器

访问器也就是 `set` 和 `get` 方法，一个在设置属性值的时候触发，一个在获取属性值的时候触发。

TypeScript 不允许同时装饰一个成员的 `get` 和 `set` 访问器，只需要这个成员 `get` / `set` 访问器中定义在前面的一个即可。

访问器装饰器也有三个参数，和方法装饰器是一样。如果访问器装饰器有返回值，这个值会被作为属性的属性描述符。

- 装饰静态成员时，是类的**构造函数**；装饰实例成员时，是类的**原型对象**。
- 成员的名字。
- 成员的属性描述符。

```typescript
function enumerable(bool: boolean) {
  return function(
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    descriptor.enumerable = bool;
  };
}
class Info {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }
  @enumerable(false)
  get name() {
    return this._name;
  }
  @enumerable(false) // error 不能向多个同名的 get/set 访问器应用修饰器
  set name(name) {
    this._name = name;
  }
}
```

## 属性装饰器

属性装饰器声明在属性声明之前，它有 2 个参数：

- 装饰静态成员时，是类的**构造函数**；装饰实例成员时，是类的**原型对象**。
- 成员的名字。

属性装饰器无法操作属性的属性描述符，它只能用来**判断某各类中是否声明了某个名字的属性**。

```typescript
function logProperty(target: any, key: string) {
  delete target[key];
  const backingField = '_' + key;
  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true,
  });
  // property getter
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };
  // property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };
  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person {
  @logProperty
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
}
const p1 = new Person('semlinker');
p1.name = 'kakuqo';

// Set: name => semlinker
// Set: name => kakuqo
```

## 参数装饰器

参数装饰器有 3 个参数：

- 装饰静态成员时，是类的**构造函数**；装饰实例成员时，是类的**原型对象**。
- 成员的名字。
- 参数在函数参数列表中的索引。

```typescript
function required(target: any, propertName: string, index: number) {
  console.log(`修饰的是${propertName}的第${index + 1}个参数`);
}
class Info {
  name: string = "lison";
  age: number = 18;
  getInfo(prefix: string, @required infoType: string): any {
    return prefix + " " + this[infoType];
  }
}

interface Info {
  [key: string]: string | number | Function;
}
const info = new Info();
info.getInfo("hihi", "age"); // 修饰的是getInfo的第2个参数
```

## 多个装饰器声明的执行顺序

类中不同声明上的装饰器将按以下规定的顺序应用：

1. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。
2. 参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。
3. 参数装饰器应用到构造函数。
4. 类装饰器应用到类。

当存在多个装饰器来装饰同一个声明时，则会有以下的顺序：

- 首先，由上至下依次对装饰器表达式求值，得到返回的真实函数（如果有的话）。
- 而后，求值的结果会由下至上依次调用。

```typescript
function firstMethodDecorator(
  targetClassPrototype: any,
  methodName: string,
  methodDescriptor: PropertyDescriptor
) {
  console.log('========== 执行第一个【方法装饰器】 ==========');
  console.log('类的原型对象: ', targetClassPrototype); // 类的原型对象
  console.log('方法名: ', methodName); // key
  console.log('属性描述符: ', methodDescriptor); // 属性描述符
}

function secondMethodDecorator(params: string) {
  return function (
    targetClassPrototype: any,
    methodName: string,
    methodDescriptor: PropertyDescriptor
  ) {
    console.log('========== 执行第二个【方法装饰器】 ==========');
    console.log('类的原型对象: ', targetClassPrototype); // 类的原型对象
    console.log('方法名: ', methodName); // key
    console.log('属性描述符: ', methodDescriptor); // 属性描述符
  };
}

function paramDecorator(targetClassPrototype: any, paramName: string, paramIndex: number) {
  console.log('========== 执行【参数装饰器】 ==========');
  console.log('类的原型对象: ', targetClassPrototype);
  console.log('参数名: ', paramName);
  console.log('参数在函数参数列表中的索引: ', paramIndex);
}

function UrlPropDecorator(targetClassPrototype: any, attrName: any) {
  console.log('========== 执行【属性装饰器】 ==========');
  console.log('类的原型对象: ', targetClassPrototype);
  console.log('属性名: ', attrName);
}

function URLInfoDecorator(targetClassPrototype: any) {
  console.log('========== 执行【类装饰器】 ==========');
  console.log('类的原型对象: ', targetClassPrototype);
}

function constructorDecorator(params: any) {
  return function (targetClassPrototype: any, paramName: string, paramIndex: number) {
    console.log('========== 执行【构造器参数装饰器】 ==========');
    console.log('类: ', targetClassPrototype);
    console.log('构造器参数名为: ', paramName);
    console.log('构造器参数索引位置: ', paramIndex);
  };
}

@URLInfoDecorator
class URLInfo {
  constructor(@constructorDecorator('url') public uri: string) {}

  @UrlPropDecorator
  public url: string = 'https://www.imooc.com';

  @firstMethodDecorator
  methodOne(@paramDecorator data: string) {
    console.log('this:', this);
    console.log('目标类:', this.uri);
  }

  @secondMethodDecorator('yes')
  methodTwo(@paramDecorator address: string) {
    console.log(address);
  }
}

// 执行顺序如下：
// ========== 执行【属性装饰器】 ==========
// ========== 执行【参数装饰器】 ==========
// ========== 执行第一个【方法装饰器】 ==========
// ========== 执行【参数装饰器】 ==========
// ========== 执行第二个【方法装饰器】 ==========
// ========== 执行【构造器参数装饰器】 ==========
// ========== 执行【类装饰器】 ==========
```

## Reflect Metadata

元数据用于描述数据的数据，如某个对象的键、键值、类型等等就可称之为该对象的元数据。

为类或类属性添加了元数据后，构造函数的原型（或是构造函数，根据静态成员还是实例成员决定）会具有 `[[Metadata]]` 属性，该属性内部包含一个 `Map` 结构，**键为属性键，值为元数据键值对**。

npm 库：`npm install reflect-metadata`

```typescript
// Reflect.defineMetadata : 在对象或属性上定义元数据值
// 在【类】或者【对象】上定义元数据值
Reflect.defineMetadata(metadataKey, metadataValue, target);
// 在【方法】或者【属性】定义元数据值
Reflect.defineMetadata(metadataKey, metadataValue, targetPrototype, propertyKey);

// Reflect.hasMetadata : 检查对象或属性的原型链上是否存在某个元数据值
// 检查【对象】上是否存在某个元数据值
let result = Reflect.hasMetadata(metadataKey, target);
// 检查【属性的原型链】上是否存在某个元数据值
let result = Reflect.hasMetadata(metadataKey, targetPrototype, propertyKey);

// Reflect.hasOwnMetadata : 检查对象或属性上是否存在自己元数据键
// 检查【对象】上是否存在自己元数据键
let result = Reflect.hasOwnMetadata(metadataKey, target);
// 检查【属性的原型链】上是否存在自己元数据键
let result = Reflect.hasOwnMetadata(metadataKey, targetPrototype, propertyKey);

// Reflect.getMetadata : 获取对象或属性的原型链上的元数据键的元数据值
// 获取【对象】上的元数据键的元数据值
// 获取【属性的原型链】上的元数据键的元数据值
let result = Reflect.getMetadata(metadataKey, target);
let result = Reflect.getMetadata(metadataKey, targetPrototype, propertyKey);

// Reflect.getOwnMetadata : 获取对象或属性上自己的元数据密钥的元数据值
// 获取【对象】上自己的元数据密钥的元数据值
let result = Reflect.getOwnMetadata(metadataKey, target);
// 获取【属性的原型链】上自己的元数据密钥的元数据值
let result = Reflect.getOwnMetadata(metadataKey, targetPrototype, propertyKey);

// Reflect.getMetadataKeys : 获取对象或属性的原型链上的所有元数据键
// 获取【对象】上的所有元数据键
let result = Reflect.getMetadataKeys(target);
// 获取【属性的原型链】上的所有元数据键
let result = Reflect.getMetadataKeys(targetPrototype, propertyKey);

// Reflect.getOwnMetadataKeys : 获取对象或属性的原型链上自己的所有元数据键
// 获取【对象】上自己的所有元数据键
let result = Reflect.getOwnMetadataKeys(target);
// 获取【属性的原型链】上自己的所有元数据键
let result = Reflect.getOwnMetadataKeys(targetPrototype, propertyKey);

// Reflect.deleteMetadata : 从对象或属性原型链中删除元数据
// 从【对象】中删除元数据
let result = Reflect.deleteMetadata(metadataKey, target);
// 从【属性原型链】中删除元数据
let result = Reflect.deleteMetadata(metadataKey, targetPrototype, propertyKey);

// 通过装饰器应用元数据到构造函数
@Reflect.metadata(metadataKey, metadataValue)
class C {
  // 通过装饰器将元数据应用于方法（属性）
  @Reflect.metadata(metadataKey, metadataValue)
  method() {}
}

// ========== reflect-metadata 【内置元数据】 key ==========
// 获取【类属性】或者【类方法参数】的数据类型
function Type(type) {
  return Reflect.metadata('design:type', type);
}
// 获取【构造器所有参数】或者【类中方法全部参数】的数据类型组成的数组
function ParamTypes(...types) {
  return Reflect.metadata('design:paramtypes', types);
}
// 获取【类方法】返回值的数据类型
function ReturnType(type) {
  return Reflect.metadata('design:returntype', type);
}
// Decorator application
@ParamTypes(String, Number)
class C {
  constructor(text, i) {}

  @Type(String)
  get name() {
    return 'text';
  }

  @Type(Function)
  @ParamTypes(Number, Number)
  @ReturnType(Number)
  add(x, y) {
    return x + y;
  }
}
// Metadata introspection
let obj = new C('a', 1);
let paramTypes = Reflect.getMetadata('design:paramtypes', inst, 'add'); // [Number, Number]
```
