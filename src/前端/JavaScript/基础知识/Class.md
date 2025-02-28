# Class

在面向对象的编程中，`Class` 是用于创建对象的可扩展的程序代码模版，它为对象提供了状态（成员变量）的初始值和行为（成员函数或方法）的实现。

## Class 的使用

类（class）的属性和方法，除非显式定义在其本身（即定义在 `this` 对象上），否则都是定义在原型上（即定义在 `class` 上）。

类（class）通过 `static` 关键字定义静态方法。

- 不能在类的实例上调用静态方法，而应该通过类本身调用。
- 静态方法中，调用同一个类中的其他静态方法，可使用 `this` 关键字。
- 非静态方法中，不能直接使用 `this` 关键字来访问静态方法。而是要用类名或者用构造函数的属性来调用：
  - 使用类名调用：`CLASSNAME.STATIC_METHOD_NAME()`
  - 使用构造函数的属性调用：`this.constructor.STATIC_METHOD_NAME()`

通过 `new` 命令生成对象实例时，自动调用类的构造函数（默认返回实例对象（即 `this`））会执行如下操作:

- 在内存中创建一个新对象。
- 这个新对象内部的 `[[Prototype]]` 指针被赋值为构造函数的 `prototype` 属性。
- 构造函数内部的 `this` 被赋值为这个新对象（即 `this` 指向新对象）。
- 执行构造函数内部的代码（给新对象添加属性）。
- 如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。

```javascript
let getUserPrivateProp

// 类声明：类声明不会变量提升。首先需要声明类，然后再访问它，否则将抛出 ReferenceError 。
class User {
  // 将实例属性定义在类的顶部，比较清晰明了

  publicProp = 'publicProp' // 公有属性声明
  /**
   * 私有属性声明：增加哈希前缀 # 的方法来定义私有类字段
   * > 只能在类的内部使用（ this.#privateProp ）。如果在类的外部使用，就会报错。
   * > 使用 this['#privateProp'] 不起作用
   */
  #privateProp = 'privateProp' // 私有属性声明
  static staticProp = 'staticProp' // 静态属性

  // 取值函数（getter）
  get prop() {
    return 'getter prop'
  }

  // 设置值函数（setter）
  set prop(value) {
    console.log('setter prop: ', value)
  }

  /**
   * 构造函数：类的默认方法，用于创建和初始化一个由 class 创建的对象。
   * > 通过 new 命令生成对象实例时，自动调用该方法。默认返回实例对象（即 this）
   * > 如果构造函数返回一个全新的对象，则会导致实例对象不是该 Class 类的实例
   */
  constructor(...args) {
    /**
     * new.target
     * 该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数，在函数外部，使用 new.target 会报错。
     * > 如果构造函数不是通过 new 命令或 Reflect.construct() 调用的，new.target 会返回 undefined
     * > 注：子类继承父类时，new.target 会返回子类
     * > new 是从构造函数生成实例对象的命令，ES6 为 new 命令引入了一个 new.target 属性
     */
    if (new.target === undefined) {
      // 或者 new.target !== User
      throw new Error('必须使用 new 命令生成实例')
    }

    this.publicProp = 'publicProp' // 公有属性声明
    this.#privateProp = 'privateProp' // 私有属性声明

    this.args = args

    // 非静态方法中，使用类名或者用构造函数的属性来调用
    User.staticMethod()
    this.constructor.staticMethod()
  }

  /**
   * 静态块
   * > 允许在类的内部设置一个代码块，在类生成时运行且只运行一次。
   * > 每个类允许有多个静态块，每个静态块中只能访问之前声明的静态属性。
   * > 主要作用是对静态属性进行初始化。同时，可以将私有属性与类的外部代码分享。
   * > 静态块内部可以使用类名或 this，指代当前类。内部不能有return语句。
   */
  static {
    console.log('this.publicProp: ', this.publicProp) // 使用 this 获取相关属性
    console.log('User.publicProp: ', User.publicProp) // 使用 类名 获取相关属性

    getUserPrivateProp = instance => instance.#privateProp // 获取私有属性
  }

  // 私有属性不限于从 this 引用，只要是在类的内部，实例也可以引用私有属性
  static staticGetPrivateProp(userInstance) {
    return userInstance.#privateProp
  }

  // 静态方法：该方法不会被实例继承，而是直接通过类来调用。
  static staticMethod() {
    return 'static method'
  }

  static anotherStaticMethod() {
    // 静态方法中，调用同一个类中的其他静态方法，可使用 this 关键字。
    return this.staticMethod() + ' from another static method'
  }

  // 公有方法
  publicMethod() {
    return 'publicMethod'
  }

  /**
   * 私有方法
   * > 增加哈希前缀 # 的方法来定义私有类字段。
   * > 只能在类的内部使用（ this.#privateMethod() ）。如果在类的外部使用，就会报错。
   * > 使用 this['#privateMethod']() 不起作用
   */
  #privateMethod() {
    return 'privateMethod'
  }

  // 计算属性名称
  ['method' + 'Name']() {
    return 'method Name'
  }

  // 在某方法名之前添加 * 号，表示该方法是一个 Generator 函数
  *[Symbol.iterator]() {
    for (let arg of this.args) {
      yield arg
    }
  }
}

User.name // 'User'，返回紧跟在 class 关键字后面的类名

User.staticMethod() // 'static method'，调用类的静态方法
User.staticGetPrivateProp(new User()) // 'privateProp'，调用类的静态方法获取私有属性
User.staticProp // 'staticProp'，调用类的静态属性

getUserPrivateProp(new User()) // 'privateProp'，获取类的私有属性

let userInstance = new User() // 实例化。类必需使用 new 调用，否则会报错
// userInstance.staticMethod() // 通过实例调用类的静态方法会报错。TypeError: userInstance.staticMethod is not a function
// userInstance.staticProp // undefined，通过实例调用类的静态属性

// 类表达式
// 类表达式中的类可以有一个名字。如果类表达式有名字，该名字仅在类内部可见。
let User = class {}
// let User = class MyClass {} // MyClass 类名仅在类内部可见，外部使用会报错
let userInstance = new User()
```

## Class 继承

ES6 类支持单继承。使用 `extends` 关键字，可以继承任何拥有 `[[Construct]]` 和原型的对象。

### super

派生类的方法可以通过 `super` 关键字引用它们的原型。这个关键字只能在派生类中使用，而且仅限于类构造函数、实例方法和静态方法内部。

使用 `super` 的注意事项：

- `super` 只能在派生类构造函数和静态方法中使用。
- 不能单独引用 `super` 关键字，要么用它调用构造函数，要么用它引用静态方法。
- 在类构造函数中，不能在调用 `super()` 之前引用 `this`。
- 调用 `super()` 会调用父类构造函数，并将返回的实例赋值给 `this`，将父类的实例属性和方法放到 `this` 对象上。
- `super()` 的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。
- 如果没有定义类构造函数，在实例化派生类时会调用 `super()`，而且会传入所有传给派生类的参数。
- 如果在派生类中显式定义了构造函数，则要么必须在其中调用 `super()`，要么必须在其中返回一个对象。
- `super` 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

### Class 继承示例

```javascript
class Parent {
  publicSameNameProp = 'parentPublicSameNameProp' // 父类同名属性
  #parentPrivateProp = 'parentPrivateProp' // 父类私有属性
  static parentStaticProp = 'parentStaticProp' // 静态属性
  static parentStaticObj = {}

  // 父类私有方法
  #parentPrivateMethod() {
    return 'parentPrivateMethod'
  }

  constructor(param) {
    this.param = param
  }

  static parentStaticMethod() {
    return 'parentStaticMethod'
  }

  // 公有方法
  parentPublicMethod() {
    return 'parentPublicMethod'
  }

  getParentPrivateProp() {
    return this.#parentPrivateProp
  }

  getParamByParent() {
    console.log(this.param)
  }
}

class Child extends Parent {
  publicSameNameProp = 'childPublicSameNameProp'

  constructor(param) {
    // 不要在调用 super()之前引用 this，否则会抛出 ReferenceError

    super(param)
    // 相当于 super.constructor()
    // 相当于 A.prototype.constructor.call(this)

    // super 普通方法之中指向父类的原型对象
    super.parentPublicMethod() // 'parentPublicMethod'

    this.parentPublicMethod() // 'parentPublicMethod'
    this.getParentPrivateProp() // 'parentPrivateProp'，通过父类定义的私有属性读写方法获取父类私有属性

    // 父类的静态属性和静态方法，也会被子类继承
    Child.parentStaticProp // 'parentStaticProp'
    Child.parentStaticMethod() // 'parentStaticMethod'
    // 子类继承父类静态属性时，会采用浅拷贝。
    // 如果父类静态属性是一个对象，浅拷贝只会拷贝对象的内存地址，修改对象则会影响到父类
    Child.parentStaticObj // {}

    // 子类无法继承父类的私有属性
    // console.log(this.#parentPrivateProp) // 报错
    // this.#parentPrivateMethod() // 报错
  }

  static childStaticMethod() {
    // super 在静态方法之中指向父类
    // 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例
    super.parentStaticMethod() // 'parentStaticMethod'
  }

  childPublicMethod() {
    // super 普通方法之中指向父类的原型对象
    super.parentPublicMethod() // 'parentPublicMethod'
  }
}

let child = new Child()
child.parentPublicMethod() // 'parentPublicMethod'
child.getParentPrivateProp() // 'parentPrivateProp'

// 父类的静态属性和静态方法，也会被子类继承
Child.parentStaticProp // 'parentStaticProp'
Child.parentStaticMethod() // 'parentStaticMethod'
Child.parentStaticObj // {}

child instanceof Parent // true

class Child2 extends Parent {
  publicSameNameProp = 'child2PublicSameNameProp'
}

// 由于 super() 在子类构造方法中执行时，子类的属性和方法还没有绑定到 this，所以如果存在同名属性，此时拿到的是父类的属性
let child2 = new Child2()
child2.publicSameNameProp // 'parentPublicSameNameProp'
```

### 类的原型与原型链

Class 作为构造函数的语法糖，同时有 `prototype` 属性和 `__proto__` 属性，因此同时存在两条继承链。

- 子类的 `__proto__` 属性，表示构造函数的继承，总是指向父类。
- 子类 `prototype` 属性的 `__proto__` 属性，表示方法的继承，总是指向父类的 `prototype` 属性。

```javascript
class Parent {}

class Child extends Parent {}

Child.__proto__ === Parent // true
Child.prototype.__proto__ === Parent.prototype // true

// 类的继承是按照下面的模式实现
class Parent {}
class Child {}
Object.setPrototypeOf(Child.prototype, Parent.prototype)
// 等同于 Child.prototype.__proto__ = Parent.prototype
Object.setPrototypeOf(Child, Parent)
// 等同于 Child.__proto__ = Parent
```

`extends` 关键字后面可以跟多种类型的值。

- 子类继承 `Object` 类

  ```javascript
  // 该场景下， A 其实是构造函数 Object 的复制，A 的实例就是 Object 的实例。
  class A extends Object {}

  A.__proto__ === Object // true
  A.prototype.__proto__ === Object.prototype // true
  ```

- 不存在任何继承

  ```javascript
  // 该场景下，A作为一个基类（即不存在任何继承），就是一个普通函数，直接继承 Function.prototype
  // A 调用后返回一个空对象（即 Object 实例），所以 A.prototype.__proto__ 指向构造函数（Object）的 prototype 属性。
  class A {}

  A.__proto__ === Function.prototype // true
  A.prototype.__proto__ === Object.prototype // true
  ```

子类实例的 `__proto__` 属性的 `__proto__` 属性，指向父类实例的 `__proto__` 属性。也就是说，子类的原型的原型，是父类的原型。

通过子类实例的 `__proto__.__proto__` 属性，可以修改父类实例的行为。

```javascript
var p1 = new Point(2, 3)
var p2 = new ColorPoint(2, 3, 'red') // ColorPoint 继承 Point

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true

p2.__proto__.__proto__.printName = function () {
  console.log('Ha')
}

p1.printName() // "Ha"
```

### 原生构造函数的继承

ECMAScript 的原生构造函数大致包括 `Boolean()`、`Number()`、`String()`、`Array()`、`Date()`、`Function()`、`RegExp()`、`Error()`、`Object()`。

在 ES5 中，是先新建子类的实例对象 `this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，`Array` 构造函数有一个内部属性 `[[DefineOwnProperty]]` ，用来定义新属性时，更新 `length` 属性，这个内部属性无法在子类获取，导致子类的 `length` 属性行为不正常。

在 ES6 中，允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象 `this`，然后再用子类的构造函数修饰 `this`，使得父类的所有行为都可以继承。

`extends` 不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。

- 继承 `Array` ，定义了一个带版本功能的数组

  ```javascript
  class VersionedArray extends Array {
    constructor() {
      super()
      this.history = [[]]
    }
    commit() {
      this.history.push(this.slice())
    }
    revert() {
      this.splice(0, this.length, ...this.history[this.history.length - 1])
    }
  }

  var arr = new VersionedArray()
  arr.push(1);
  arr.push(2);
  arr // [1, 2]
  arr.history // [[]]

  arr.commit();
  arr.history // [[], [1, 2]]

  arr.push(3);
  arr // [1, 2, 3]
  arr.history // [[], [1, 2]]

  arr.revert();
  arr // [1, 2]
  ```

- 继承 `Error` ，定制报错时的行为

  ```javascript
  class ExtendableError extends Error {
    constructor(message) {
      super()
      this.message = message
      this.stack = new Error().stack
      this.name = this.constructor.name
    }
  }

  class MyError extends ExtendableError {
    constructor(m) {
      super(m)
    }
  }

  var myerror = new MyError('ll')
  myerror.message // "ll"
  myerror instanceof Error // true
  myerror.name // "MyError"
  myerror.stack
  // Error
  //     at MyError.ExtendableError
  //     ...
  ```

- 继承 `Object`

  继承 `Object` 存在行为差异。`NewObj` 继承了 `Object`，但是无法通过 `super` 方法向父类 `Object` 传参。
  []
  因为 ES6 改变了 `Object` 构造函数的行为，一旦发现 `Object` 方法不是通过 `new Object()` 形式调用，ES6 规定 `Object` 构造函数会忽略参数。

  ```javascript
  class NewObj extends Object {
    constructor() {
      super(...arguments)
    }
  }
  var o = new NewObj({ attr: true })
  o.attr === true // false
  ```

### Mixin 模式

- 将多个类的接口“混入”（mixin）另一个类

  ```javascript
  function mix(...mixins) {
    class Mix {
      constructor() {
        for (let mixin of mixins) {
          copyProperties(this, new mixin()) // 拷贝实例属性
        }
      }
    }

    for (let mixin of mixins) {
      copyProperties(Mix, mixin) // 拷贝静态属性
      copyProperties(Mix.prototype, mixin.prototype) // 拷贝原型属性
    }

    return Mix
  }

  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        let desc = Object.getOwnPropertyDescriptor(source, key)
        Object.defineProperty(target, key, desc)
      }
    }
  }

  // 使用
  class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
  }
  ```

- 构造一个拥有实用方法的对象，将这些实用的方法合并到任何类的原型中，需要注意 Mixins 覆盖现有类的方法。

  ```javascript
  let eventMixin = {
    /**
     * 订阅事件
     * 用法： menu.on('select', function(item) { ... }
     */
    on(eventName, handler) {
      if (!this._eventHandlers) this._eventHandlers = {}
      if (!this._eventHandlers[eventName]) {
        this._eventHandlers[eventName] = []
      }
      this._eventHandlers[eventName].push(handler)
    },

    /**
     * 取消订阅
     * 用法： menu.off('select', handler)
     */
    off(eventName, handler) {
      let handlers = this._eventHandlers?.[eventName]
      if (!handlers) return
      for (let i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          handlers.splice(i--, 1)
        }
      }
    },

    /**
     * 生成具有给定名称和数据的事件
     * 用法： this.trigger('select', data1, data2);
     */
    trigger(eventName, ...args) {
      if (!this._eventHandlers?.[eventName]) {
        return // 该事件名称没有对应的事件处理程序（handler）
      }

      // 调用事件处理程序（handler）
      this._eventHandlers[eventName].forEach(handler => handler.apply(this, args))
    },
  }

  // 将实用的方法合并到任何类的原型中

  // 创建一个 class
  class Menu {
    choose(value) {
      this.trigger('select', value)
    }
  }
  // 添加带有事件相关方法的 mixin
  Object.assign(Menu.prototype, eventMixin)

  let menu = new Menu()

  // 添加一个事件处理程序（handler），在被选择时被调用：
  menu.on('select', value => alert(`Value selected: ${value}`))

  // 触发事件 => 运行上述的事件处理程序（handler）并显示：
  // 被选中的值：123
  menu.choose('123')
  ```
