# 编写 loader

loader 是本质上是一个函数，通过接受处理的内容，然后处理后返回结果。

```javascript
module.exports = function (content) {
  // 对 content 进行处理 ...
  // return content // 返回 loader 处理之后的数据。不推荐写法
  this.callback(null, content); // 推荐写法
};
```

`this.callback(error, content, sourceMap, ast)` 相关参数：

- `error` ：当 loader 出错时向外抛出一个 `Error` 对象，成功则传入 `null`；
- `content` ：经过 loader 编译后需要导出的内容，类型可以是为 `String` 或者 `Buffer`；
- `sourceMap` ：为方便调试生成的编译后内容的 `source map`；
- `ast` : 本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 `AST`，可以省去重复生成 `AST` 的过程。

> TIPS
>
> 编写 loader 的时候，如果要使用 `this.callback` 或者 `loader-utils` 的 `getOptions` 等方法， `this` 是 webpack 调用 loader 时候传入的自定义的特殊上下文，此时不应该使用箭头函数！

loader 中 `this` 其他相关的方法和属性：

- `this.context` : 当前处理转换的文件所在的目录；
- `this.resource` : 当前处理转换的文件完整请求路径，包括 `querystring`；
- `this.resourcePath` : 当前处理转换的文件的路径；
- `this.resourceQuery` : 当前处理文件的 `querystring`；
- `this.target` : Webpack 配置的 `target`；
- `this.loadMoudle` : 处理文件时，需要依赖其它文件的处理结果时，可以使用 `this.loadMoudle(request: string, callback: function(err, source, sourceMap, module))` 去获取到依赖文件的处理结果；
- `this.resolve` : 获取指定文件的完整路径；
- `this.addDependency` : 为当前处理文件添加依赖文件，以便依赖文件发生变化时重新调用 Loader 转换该文件，`this.addDependency(file: string)`；
- `this.addContextDependency` : 为当前处理文件添加依赖文件目录，以便依赖文件目录里文件发生变化时重新调用 Loader 转换该文件，`this.addContextDependency(dir: string)`；
- `this.clearDependencies` : 清除当前正在处理文件的所有依赖；
- `this.emitFile` : 输出一个文件，使用的方法为 `this.emitFile(name: string, content: Buffer | string, sourceMap: {...})`；
- `this.emitError` ：发送一个错误信息。

## loader 异步处理数据

- `async/await`

  ```javascript
  module.exports = async function (content) {
    function timeout(delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 模拟一些异步操作,处理 content
          resolve(content);
        }, delay);
      });
    }
    const data = await timeout(1000);
    return data;
  };
  ```

- `this.async` 获取一个异步的 `callback`，并进行返回

  ```javascript
  module.exports = function (content) {
    function timeout(delay) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // 模拟一些异步操作,处理 content
          resolve(content);
        }, delay);
      });
    }
    // this.async获取的 callback，参数与 this.callback的 参数一致，即 error，content，sourcemap 和 ast
    const callback = this.async();
    timeout(1000).then((data) => {
      callback(null, data);
    });
  };
  ```

## 处理二进制数据

```javascript
module.exports = function (source) {
  if (source instanceof Buffer) {
    // 进行相关操作
    return source; // 本身可以返回二进制数据提供给下一个 loader
  }
};

// 告诉 Webpack 给 loader 传入二进制格式的数据
// 如不设置，则会传入字符串
moudle.exports.raw = true;
```

## loader 的 pitch

loader 的执行顺序是 **从右到左** 的链式调用，实际说的是 loader 中 `module.exports` 出来的执行方法顺序。

在一些场景下，loader 并不依赖上一个 loader 的结果，而只关心原输入内容。需要拿到一开始的文件原内容，就需要使用 `module.exports.pitch = function();`

`pitch` 方法在 loader 中便是从左到右执行的，并且可以通过 `data` 变量来进行 `pitch` 和 `normal` 之间的传递。

```javascript
module.exports = function (content) {
  console.log('this data', this.data.value); // test
  return content;
};

module.exports.pitch = (remaining, preceding, data) => {
  // 将相关参数挂载至 data 上，一个 rule 中的所有 loader 在执行时，都能获取到该参数
  data.value = 'test';
};
```

## loader 的结果缓存

Webpack 增量编译机制会观察每次编译时的变更文件，在默认情况下，Webpack 会对 loader 的执行结果进行缓存，这样能够大幅度提升构建速度。同时，也可关闭 loader 缓存。

```javascript
module.exports = function (content) {
  this.cacheable(false); // 关闭 loader 缓存
  return content;
};
```

## Webpack 的 loader 工具库

### loader-utils

`loader-utils` 提供了各种跟 loader 选项（options）相关的工具函数。

```javascript
const { getOptions, stringifyRequest, parseQuery } = require('loader-utils');

module.exports = function (content) {
  // getOptions 用于在 loader 里获取传入的 options，返回的是对象值。
  const options = getOptions(this);

  // stringifyRequest转换路径，避免 require()或 import 时使用的绝对路径
  stringifyRequest(this, './test.js'); // Result =>  "\"./test.js\""

  // parseQuery 获取 query 参数的
  parseQuery('?name=kev&age=14'); // Result => {name: 'kev', age: '14'}
};
```

### schema-utils

`schema-utils` 是 loader 和 plugin 的参数认证器，检测传入的参数是否符合预期。

```javascript
const validateOptions = require('schema-utils');

// schema 描述
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    test: {
      anyOf: [{ type: 'array' }, { type: 'string' }, { instanceof: 'RegExp' }],
    },
    transform: {
      instanceof: 'Function',
    },
    sourceMap: {
      type: 'boolean',
    },
  },
  additionalProperties: false,
};

module.exports = function (source) {
  // 验证参数的类型是否正确
  validateOptions(schema, options, 'loader name');
};
```

## 实战

```javascript
// 将 markdown 语法的文件转换成 HTML
const showdown = require('showdown');
const loaderUtils = require('loader-utils');

module.exports = function (content) {
  // 获取 options
  const options = loaderUtils.getOptions(this);
  // 设置 cache
  this.cacheable();
  // 初始化 showdown 转换器
  const converter = new showdown.Converter(options);
  // 处理 content
  content = converter.makeHtml(content);
  // 返回结果
  this.callback(null, content);
};
```
