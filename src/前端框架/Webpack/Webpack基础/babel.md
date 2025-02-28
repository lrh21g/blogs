# Babel

Babel 是一个工具链，主要用于在当前和旧的浏览器或环境中，将 ECMAScript 2015+ 代码转换为 JavaScript 向后兼容版本的代码。主要用于处理一下事情：

- **转换语法**。用来把代码中的 ESNext 的新的语法、TypeScript 和 Flow 的语法转成基于目标环境支持的语法的实现。并且还可以把目标环境不支持的 API 进行 **Polyfill**（垫片，用来为旧浏览器提供它没有原生支持的较新的功能）。
- **特定用途的代码转换**。通过 Babel 暴露的 API 可以完成代码到 AST 的 解析（Parse），AST 的转换（Transform），以及目标代码的生成（Generate）。可完成一些特定用途的转换，比如：
  - 函数插桩（函数中自动插入一些代码，例如埋点代码）
  - 自动国际化
  - default import 形式 （`import A from './A'`）转 named import形式（`import {A} from './A'`）
- **代码的静态分析**。对代码进行 AST 的 解析（Parse）之后，能够进行转换，是因为通过 AST 的结构能够理解代码。除了进行转换然后生成目标代码之外，同样可以用于分析代码的信息，进行一些检查：
  - linter 工具：分析 AST 的结构，对代码规范进行检查。
  - api 文档自动生成工具：可以提取源码中的注释，然后生成文档。
  - type checker ：根据从 AST 中提取的或者推导的类型信息，对 AST 进行类型是否一致的检查，从而减少运行时因类型导致的错误。
  - 压缩混淆工具：分析代码结构，进行删除死代码、变量名混淆、常量折叠等各种编译优化，生成体积更小、性能更优的代码。
  - js 解释器：除了对 AST 进行各种信息的提取和检查以外，可以直接解释执行 AST。

## 配置文件

配置文件支持两种：

- 使用 package.json 的 `babel` 属性
- 项目根目录下 `.babelrc` / `.babelrc.js` / `babel.config.js` 文件

```javascript
module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false, // 默认值，可以不写
        helpers: true, // 默认，可以不写
        regenerator: false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
        useESModules: true, // 使用 es modules helpers, 减少 commonJS 语法代码
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {}, // 根据实际 browserslist 设置，设置目标浏览器
        corejs: 3, // 指定 core-js 版本
        modules: false, // 设置为 false ，表示模块使用 es modules，不使用 commonJS 规范。
        useBuiltIns: 'usage', // useBuiltIns 默认 false, 可选 entry , usage
      },
    ],
  ]
};
```

`plugin-transform-runtime`

Babel 在每个需要转换的代码前面都会插入一些 helpers 代码，这可能会导致多个文件都会有重复的 helpers 代码。 `@babel/plugin-transform-runtime` 的 `helpers` 选项就可以把这些代码抽离出来。

`preset-env` 的选项：

- `target` ：为了设置目标浏览器或者对应的环境（browser/node）
- `useBuiltIns` ：设置浏览器 polyfill
  - `false` ：打包后的文件不使用 polyfill 来进行适配。
  - `usage` ：会根据源代码中出现的语言特性，自动检测所需要的 polyfill ，可以确保最终包里的polyfill数量的最小化，打包的包相对会小一些。
  - `entry` ：表示替换 `import "@babel/polyfill";` 的全局声明，然后根据 `targets` 中浏览器版本的支持，将 Polyfill 拆分引入，仅引入有浏览器不支持的 Polyfill，所以 `entry` 相对 `usage` 使用起来相对麻烦一些，首先需要手动显性的引入 `@babel/polyfill`，而且根据配置 `targets` 来确定输出，这样会导致代码实际用不到的 polyfill 也会被打包到输出文件，导致文件比较大。

注：

- 自 Babel 7.4.0 起，`@babel/polyfill` 已被废弃，在模拟完整 ES2015+ 环境的入口文件中应首先导入 `core-js` (polyfill ECMAScript 功能) 和 `regenerator runtime` (只有在转换 `generators` 时才需要)

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

- 当编写一个工具库，这个工具库需要使用 polyfill。项目中使用该工具库时，工具库通过 polyfill （默认情况添加的所有特性都是全局的） 添加的特性，可能会污染它们的代码。当编写工具时，babel 更推荐使用： `@babel/plugin-transform-runtime` 插件来完成 polyfill 的功能。

## Babel 原理

Babel 是一个 JavaScript 的**静态分析编译器**。**静态分析**指的是在不需要执行代码的前提下对代码进行分析和处理的过程（执行时进行代码分析叫**动态分析**）

> Tips
>
> 一般编译器 Compiler 是指高级语言到低级语言的转换工具，对于高级语言到高级语言的转换工具，被叫做转换编译器，简称转译器 (Transpiler)。

### Babel 的编译流程

Babel 从一个语法转换成另外一个语法，整体编译流程分为三步：

- **解析（Parse）** ：将源码经过词法解析和语法解析，转成**抽象语法树（AST）**。在 Babel 中，语法解析器是 `@babel/parser`。
- **转换（Transform）** ：对解析得到的 AST 进行遍历，在此过程中对节点进行添加、更新及移除等操作。在 Babel 中， AST 遍历工具是 `@babel/traverse`。
- **生成（Generate）** ：将转换后的 AST 生成目标代码以及 sourcemap 。在 Babel 中，生成工具是 `@babel/generator`。

> Tips
>
> 在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。之所以说语法是“抽象”的，是因为这里的语法并不会表示出真实语法中出现的每个细节。比如，嵌套括号被隐含在树的结构中，并没有以节点的形式呈现；而类似于 if-condition-then 这样的条件跳转语句，可以使用带有两个分支的节点来表示。 ——维基百科
>
> [AST Explorer](https://astexplorer.net/) 可以在线解析 JavaScript 代码的 AST 结构

```javascript
// source.js
function square(n) {
  return n * n;
}

// index.js
const fs = require('fs');
const babel = require('@babel/core');
const traverse = require('@babel/traverse').default;
const gen = require('@babel/generator').default;

// 读取 source.js内容
let source = fs.readFileSync('./source.js');

babel.parse(source, (err, ast) => {
  let indent = '';
  // 遍历的时候
  // 进入（Enter） 某个节点时，会调用对应的 enter 函数
  // 退出（Exit） 某个节点时，会调用对应的 exit 函数
  traverse(ast, {
    // 进入节点
    // path 是表示两个节点之间连接的对象。通过操作 path 对象就可以对 AST 产生影响（对象引用类型）。
    // path.parent 为当前节点的父节点信息
    // path.node 则是当前节点的信息
    enter(path) {
      console.log(indent + '<' + path.node.type + '>');
      indent += '  ';
    },
    // 退出节点
    exit(path) {
      indent = indent.slice(0, -2);
      console.log(indent + '<' + '/' + path.node.type + '>');
    },
  });
  // 生成新的 ast，然后使用generator生成 code
  gen(ast).code;
});
```

### Babel 插件编写

可参考 Github 项目：[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)

## Browserslist

Browserslist 是一个在不同的前端工具之间，共享目标浏览器和 Node.js 版本的配置：

- Autoprefixer
- Babel
- postcss-preset-env
- eslint-plugin-compat
- stylelint-no-unsupported-browser-features
- postcss-normalize
- obsolete-webpack-plugin

Browserslist 实际上就是声明了一段浏览器的集合，我工具可以根据这段集合描述，针对性的输出兼容性代码。

### 配置

可以放在 `package.json` 中，也可以单独放在配置文件 `.browserslistrc` 中。所有的工具都会主动查找 browserslist 的配置文件，根据 browserslist 配置找出对应的目标浏览器集合。

可直接通过命令查询某些条件所匹配到的浏览器：`npx browserslist ">1%, last 2 version, not dead"`

```json
// package.json
{
  "browserslist": ["last 2 version", "> 1%", "maintained node versions", "not ie < 11"]
}
```

```shell
# .browerslistrc 文件
last 2 version
> 1%
maintained node versions
not ie < 11
```

### 常见集合

- `last 2 versions` ：caniuse.com网站跟踪的最新两个版本，假如 iOS 12 是最新版本，那么向后兼容两个版本就是 iOS 11 和 iOS 12
- `> 1%` ：全球超过 1%人使用的浏览器，类似> 5% in US则指代美国 5%以上用户
- `cover 99.5%` ：覆盖 99.5%主流浏览器
- `chrome > 50 ie 6-8` ：指定某个浏览器版本范围
- `unreleased versions` ：说有浏览器的 beta 版本
- `not ie < 11` ：排除 ie11 以下版本不兼容
- `since 2013 last 2 years` ：某时间范围发布的所有浏览器版本
- `maintained node versions` ：所有被 node 基金会维护的 node 版本
- `current node` ：当前环境的 node 版本
- `dead` ：通过last 2 versions筛选的浏览器中，全球使用率低于0.5%且官方声明不在维护或者事实上已经两年没有再更新的版本
- `defaults` ：默认配置，`> 0.5% last 2 versions Firefox ESR not dead`

浏览器名称列表（大小写不敏感）：

- `Android` ：安卓 webview 浏览器
- `Baidu` ：百度浏览器
- `BlackBerry / bb` ：黑莓浏览器
- `Chrome` ：chrome 浏览器
- `ChromeAndroid/and_chr` ：chrome 安卓移动浏览器
- `Edge` ：微软 Edge 浏览器
- `Electron` ：Electron
- `Explorer/ie` ：ie 浏览器
- `ExplorerMobile/ie_mob` ：ie 移动浏览器
- `Firefox/ff` ：火狐浏览器； \*FirefoxAndroid/and_ff：火狐安卓浏览器
- `iOS/ios_saf` ：iOS Safari 浏览器
- `Node` ：nodejs
- `Opera` ：opera 浏览器
- `OperaMini/op_mini` ：operaMini 浏览器
- `OperaMobile/op_mob` ：opera 移动浏览器
- `QQAndroid/and_qq` ：QQ 安卓浏览器
- `Samsung` ：三星浏览器
- `Safari` ：桌面版本 Safari
- `UCAndroid/and_uc` ：UC 安卓浏览器

### Browserslist 的环境变量

通过设置 `BROWSERSLIST_ENV` 或者 `NODE_ENV` 可以配置不同的环境变量。默认情况下会优先从 production 对应的配置项加载。

```json
// package.json
{
  "browserslist": {
    "production": ["> 1%", "ie 10"],
    "development": ["last 1 chrome version", "last 1 firefox version"]
  }
}
```

```shell
# .browerslistrc 文件
[production staging]
> 1%
ie 10

[development]
last 1 chrome version
last 1 firefox version
```
