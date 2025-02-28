# 笔记

## 工具

- [nodemon](https://nodemon.io/) : 自动重启node应用的工具，当监听的文件或监听目录下的文件发生修改时，自动重启应用。
- Parcel 打包支持浏览器允许 ts 文件 : `npm install parcel-bundler --save-dev`

## 单例设计模式

### 定义

一个类对外有且仅有一个实例【只提供一个实例】

- 某个类对外始终只提供一个对象【实例】，并且在该类的内部提供了一个外部访问该对象的方法或该对象属性
- 一个类的任何外部，通过访问类提供的某个方法或某个属性，始终只能获取该类一个对象【实例】

应用场景：实际开发中，外部访问某个类的对象【实例】时，确保只能访问该类的唯一对象时才能保证逻辑的正确性时

- Vuex，React-Redux 中的**全局状态管理容器** store 对象在整个项目被设计成唯一的对象【实例】，把 store 对象所在 的类设计成单例设计模式将是最好的设计方案
- 前端项目需要进行**客户端本地数据存储**时，都会考虑使用 localStorage，localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份 localStorage 数据
- **项目日志记录**是一个项目中必不可少的环节，当我们为一个项目编写一个日志文件类，用来保存日志和阅读日志信息时

示例：

```typescript
export default class LocalStorage {
  static localstorage: LocalStorage;
  constructor() {}
  public static getInstance() {
    if (!this.localstorage) {
      this.localstorage = new LocalStorage();
    }
    return this.localstorage;
  }

  public setItem(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem(key: string) {
    let value = window.localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  }
}
```

## TypeScript 类 - 静态属性/方法

- 外部通过类名直接调用静态成员。格式：`类名.静态属性`、 `类名.静态方法`
- 类中静态方法可以通过 `this` 获取静态成员
- 类中静态方法**不能**访问到原型对象上的方法或对象属性。同时，类中原型对象上的方法或对象属性也**不能**访问类中的静态属性
- 类中的对象**不能**访问静态成员
- 一个静态方法改变了某个静态属性，其他静态方法或者类外部任何地方访问这个属性都会发生变化
- 任何一个 TypeScript 类中的静态成员存储在内存的静态区。运行一个 TypeScript 类，TypeScript **优先为静态成员开辟内存空间**，任何一个对象创建之前 TypeScript 就已经为静态成员分配好了空间。
  - 无论是否创建对象，创建多少个对象，是否调用该静态方法或静态属性，TypeScript 都会为这个静态方法或静态属性分配内存空间，注意：**静态成员和对象无关**。
  - 一旦为静态方法或静态属性分配好空间，就一直保存到内存中，直到服务器重启或者控制台程序执行结束才被释放。
- JavaScript 中 new 一个类（构造函数）内部定义的对象方法或静态方法，但 TypeScript 已屏蔽 new 一个类中的方法。**TypeScript 类可以访问 prototype 原型对象属性，但无法在 prototype 原型对象属性增加新的方法或属性**。只能在类的内部定义方法，防止回到 ES5 从前非面向类和对象的写法。
- 原型对象空间上的方法和属性，用来提供给该类的所有对象变量共用的方法或属性，没有对象和对象变量，而静态方法或静态属性属于类，可以通过类来直接访问。任何一个对象创建之前 TypeScript 就已经为静态成员分配好了空间，但一个静态方法或静态属性只会分配一个空间，而每一个对象都有自己独立的空间。
- 静态方法内部不能通过 this 来访问对象属性和方法，但可以通过调用静态方法时把对象变量传递给静态方法来使用。

  ```typescript
  // 将 JavaScript 的 Object 构造函数看成一个 Obejct 类，创建 Object 类的对象
  let obj01 = new Object({ username: "lrh", age: 23 })
  let obj02 = { username: "wangwu", age: 23 }

  // 将 obj 对象变量赋值给 keys 静态方法，obj 对象变量作为 keys 静态方法测参数
  Object.keys(obj02)
  ```

何时将一个方法定义成静态方法或静态属性：

- 单例设计模式。当外部不能创建对象，只能借助类内部的静态方法来获取类的对象。如果定义成原型对象属性的方法，就会导致外部无法被访问。只能定义这个方法为类的静态方法，因为外部根本不能创建对象，也就无法访问原型对象属性上的方法。
- 当一个类中，某个方法没有任何必要使用任何对象属性时，而且使用了对象属性反而让这个方法的逻辑不正确，就应该禁止这个方法访问任何对象属性和其他的对象方法，这时可以把这个方法定义为静态方法。

  例如：一个顾客类的购买方法【 buy 方法】中，需要访问顾客姓名或其他顾客微信的对象属性，这样的方法就需要定义在原型对象属性上。但如果顾客类中的阅读顾客积分公告方法【 readNotice 方法】是针对全体顾客的公告方法，就应该定义为静态方法。

- 当一个类中，某个方法只有一个或者 1-2个 对象属性，而创建这个类的对象毫无意义，只需要使用这个类的一个或者多方法就可以了，那么应该定义为静态方法。常见的工具类中的方法通常都应该定义为静态方法。比如 StringUtil, FileUtil 等。

  ```typescript
  class FileUtil {
    // 从指定文件中，将数据读出来打印在控制台或页面上的静态方法
    public static readFile(readonly fileName: string) {
      fs.readFile(fileName, (err: any, data: any) => {
        console.log('fs.readFile:', data.toString());
      });
    }
    // 把键盘输入的数据或页面上获取的数据，写入到指定文件上的静态方法
    public static writeFile(fileName: string) {
      fs.writeFile(fileName, 'lrh', function (error) {
        if (error) {
          console.log('写文件失败');
        } else {
          console.log('写文件成功');
        }
      });
    }
  }
  FileUtil.readFile('./log.txt');
  FileUtil.writeFile('./log5.txt');
  ```

## 实现方式

- 饿汉式单例设计模式：无论是否用到了对象【实例】，一开始就建立这个唯一的对象。实现步骤如下：

  - 构造器设置为私有的，不允许外部来创建类的实例【对象】
  - 建立一个静态引用属性，同时把这个静态引用属性直接指向一个对象 `new MyLocalStorage()`
  - 外部调用第二步提供的静态方法来获取一个对象

  ```typescript
  class MyLocalStorage {
    // 对象属性【对象的基本类型属性和对象的引用属性】
    // 静态属性【静态的基本类型属性和静态的引用属性】
    static localstorage: MyLocalStorage = new MyLocalStorage();
    static count: number = 3;
    private constructor() {}

    public setItem(key: string, value: any) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key: string) {
      let value = window.localStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    }
  }
  ```

- 懒汉式单例设计模式：等到需要使用对象时才创建对象,按需创建。实现步骤如下：

  - 构造器设置为私有的，不允许外部来创建类的实例【对象】
  - 至少应该提供一个外部访问的方法或属性，外部可以通过这个方法或属性来得到一个对象，将这个方法设置为静态方法
  - 外部调用第二步提供的静态方法来获取一个对象

  ```typescript
  class MyLocalStorage {
    // 静态属性和对象属性[实例属性】是类中两大成员
    static localstorage: MyLocalStorage; // 引用静态属性
    private constructor() {}
    public static getInstance() {
      if (!this.localstorage) {
        this.localstorage = new MyLocalStorage();
      }
      return this.localstorage;
    }

    public setItem(key: string, value: any) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    public getItem(key: string) {
      let value = localStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    }
  }
  ```
