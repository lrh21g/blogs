# Webpack优化

## 速度优化

### 减少查找过程

#### 使用 resolve.alias 减少查找过程

`resolve.alias` 配置项通过别名（alias）来把原导入路径映射成一个新的导入路径。

``` javascript
module.exports = {
  resolve: {
    // 使用 alias 把导入 react 的语句换成直接使用单独完整的 react.min.js 文件
    // 减少耗时的递归解析操作
    // 大多数库发布到 npm 仓库中时，都会包含打包好的完整文件，对于这些库也可以配置 alias
    alias: {
      react: path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
      '@lib': path.resolve(__dirname, './src/lib/'),
    },
  },
};
```

对于有些库使用本优化方法后会影响到 Tree-Shaking 去除无效代码的优化，因为打包好的完整文件中有部分代码你的项目可能永远用不上。 一般对整体性比较强的库采用本方法优化，因为完整文件中的代码是一个整体，每一行都是不可或缺的。但是对于一些工具类的库，例如 lodash，项目可能只用到了其中几个工具函数，则不能使用本方法去优化，因为会导致输出代码中包含很多永远不会执行的代码。

#### 使用 resolve.extensions 优先查找

在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试询问文件是否存在，查询的顺序是按照我们配置的 `resolve.extensions` 顺序从前到后查找。

配置 `resolve.extensions= ['js', 'json']`，那么会先找 xxx.js 然后没有再查找 xxx.json，所以应该把常用到的文件后缀写在前面，或者导入模块时，尽量带上文件后缀名。

#### 使用 module.noParse 排除不需要递归解析的模块

`module.noParse` 配置项可以让 Webpack 忽略对部分没采用模块化的文件递归解析处理。

``` javascript
const path = require('path');

module.exports = {
  module: {
    // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
    noParse: [/react\.min\.js$/],
  },
};
```

注：被忽略掉的文件里不应该包含 `import`、`require`、`define` 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

#### 合理配置 rule 的查找范围

在 `rule` 配置上，有 `test`、`include`、`exclude` 三个可以控制范围的配置，最佳实践是:

+ 只在 `test` 和 文件名匹配中使用正则表达式；
+ 在 `include` 和 `exclude` 中使用绝对路径数组；
+ 尽量避免 `exclude`，更倾向于使用 `include`。

注：`exclude` 优先级要优于 `include` 和 `test` ，所以当三者配置有冲突时，`exclude` 会优先于其他两个配置。

``` javascript
rules: [
  {
    // test 使用正则
    test: /\.js$/,
    loader: 'babel-loader',
    // 排除路径使用数组
    exclude: [path.resolve(__dirname, './node_modules')],
    // 查找路径使用数组
    include: [path.resolve(__dirname, './src')],
  },
];
```

### 利用多线程提升构建速度

#### thread-loader

`thread-loader` 是针对 loader 进行优化的，它会将 loader 放置在一个 worker 池里面运行，以达到多线程构建。`thread-loader` 在使用的时候，需要将其放置在其他 loader 之前。

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          'thread-loader',
          // 高开销的 loader 放置在此 (e.g babel-loader)
        ],
      },
    ],
  },
};
```

#### HappyPack

`HappyPack` 让 webpack  把任务分解给多个子进程去并发的执行，子进程处理完后再把结果发送给主进程，提升构建速度。

注：

+ `HappyPack` 对 `file-loader`、`url-loader` 支持的不友好，所以不建议对这些 `loader` 使用。
+ 由于 JavaScript 是单线程模型，要想发挥多核 CPU 的能力，只能通过多进程去实现，而无法通过多线程实现。

```javascript
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
// 构造出共享进程池，进程池中包含 5 个子进程
const happyThreadPool = HappyPack.ThreadPool({ size: 5 });

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
        use: ['happypack/loader?id=babel'],
        // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['happypack/loader?id=css'],
        }),
      },
    ],
  },
  plugins: [
    new HappyPack({
      // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
      id: 'babel',
      // 如何处理 .js 文件，用法和 Loader 配置中一样
      loaders: ['babel-loader?cacheDirectory'],
      // 使用共享进程池中的子进程去处理任务。即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'css',
      // 如何处理 .css 文件，用法和 Loader 配置中一样
      loaders: ['css-loader'],
      // 使用共享进程池中的子进程去处理任务
      threadPool: happyThreadPool,
    }),
    new ExtractTextPlugin({
      filename: `[name].css`,
    }),
  ],
};
```

## 利用 Webpack 缓存

Webpack 构建项目时，可以做到自动更新，但 Webpack 使用的不是版本号，而是指定哈希值（hash），Webpack 的 hash 值有三种：

+ `hash`：每次编译 `Compilation` 对象的 `hash`，全局一致，跟单次编译有关，跟单个文件无关，不推荐使用；
+ `chunkhash`：`chunk` 的 `hash`，根据不同的 `chunk` 及其包含的模块计算出来的 `hash`，`chunk` 中包含的任意模块发生变化，则 `chunkhash` 发生变化，**推荐使用**；
+ `contenthash`：CSS 文件特有的 `hash` 值，是根据 CSS 文件内容计算出来的，CSS 发生变化则其值发生变化，**推荐 CSS 导出中使用**。

## 使用 DLLPlugin

`DllPlugin` 和 `DllReferencePlugin` 用某种方法实现了拆分 bundles，同时还大幅度提升了构建的速度。`DLL` 一词代表微软最初引入的动态链接库。

+ `DllPlugin` ：用于在单独的 webpack 配置中创建一个 `dll-only-bundle`。 此插件会生成一个名为 `manifest.json` 的文件，这个文件是用于让 `DllReferencePlugin` 能够映射到相应的依赖上。
+ `DllReferencePlugin` ：把 `dll-only-bundles` 引用到需要的预编译的依赖中。
+ `AddAssetHtmlPlugin` ：将打包的 `DLL` 库引入到 HTML 模块中。

```txt
目录结构

├── config
│   ├── webpack.dll.js
│   ├── webpack.prod.js
│── package.json
```

```javascript
// config/webpack.dll.js
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: {
    vendor: [
      'vue-router',
      'vuex',
      'vue/dist/vue.common.js',
      'vue/dist/vue.js',
      'vue-loader/lib/component-normalizer.js',
      'vue',
      'axios',
      'echarts',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    filename: '[name].dll.js',
    // library 的值必须与 dllplugin 中的 name 一致
    library: '[name]_library',
  },
  optimization: {
    minimizer: [
      // 代码压缩
      new TerserPlugin({
        extractComments: false
      })
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      // manifest.json 文件的绝对路径
      path: path.resolve(__dirname, './dll/[name].manifest.json'),
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 暴露出的 DLL 的函数名 ： name 字段的值也就是输出的 manifest.json 文件中 name 字段的值
      name: '[name]_library',
    }),
  ],
};
```

```javascript
// config/webpack.prod.js
const webpack = require('webpack');
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");

module.exports = {
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/vendor.manifest.json'),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './dll/vendor.dll.js'),
    })
  ],
};
```

```json
// package.json
{
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config config/webpack.dev.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node config/build.js",
    "build:dll": "webpack --config config/webpack.dll.js"
  }
}
```

## splitChunks（代码拆分）

使用 `splitChunks` 配置来抽取公共代码。

+ `module` ：不同文件类型的模块。Webpack 就是用来对模块进行打包的工具，这些模块各种各样，比如：js 模块、css 模块、sass 模块、vue 模块等等不同文件类型的模块。这些文件都会被 loader 转换为有效的模块，然后被应用所使用并且加入到依赖关系图中。
+ `chunk` ：数据块。
  + 非初始化的数据块。例如在打包时，对于一些动态导入的异步代码，Webpack 分割出共用的代码，可以是写的代码模块，也可以是第三方库，这些被分割的代码文件就可以理解为 `chunk`。
  + 初始化的的数据块。入口文件处 (entry point) 的各种文件或者说模块依赖，就是 `chunk` ，它们最终会被捆在一起打包成一个输出文件，输出文件可以理解为 `bundle`，当然它其实也是 `chunk`。
+ `bundle` ：包含一个或多个 `chunk`，是源码经过 webpack 处理后的最终版本

``` javascript
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'async', // 三选一： "initial" | "all" | "async" (默认)
      minSize: 30000, // 最小尺寸，30K，development 下是 10k，越大那么单个文件越大，chunk 数就会变少（针对于提取公共 chunk 的时候，不管再大也不会把动态加载的模块合并到初始化模块中）当这个值很大的时候，就不会做公共部分的抽取了
      maxSize: 0, // 文件的最大尺寸，0 为不限制，优先级：maxInitialRequest/maxAsyncRequests < maxSize < minSize
      minChunks: 1, // 默认 1，被提取的一个模块至少需要在几个 chunk 中被引用，这个值越大，抽取出来的文件就越小
      maxAsyncRequests: 5, // 在做一次按需加载的时候最多有多少个异步请求，为 1 的时候就不会抽取公共 chunk 了
      maxInitialRequests: 3, // 针对一个 entry 做初始化模块分隔的时候的最大文件数，优先级高于 cacheGroup，所以为 1 的时候就不会抽取 initial common 了
      automaticNameDelimiter: '~', // 打包文件名分隔符
      name: true, // 拆分出来文件的名字，默认为 true，表示自动生成文件名，如果设置为固定的字符串那么所有的 chunk 都会被合并成一个
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 正则规则，如果符合就提取 chunk
          priority: -10, // 缓存组优先级，当一个模块可能属于多个 chunkGroup，这里是优先级
        },
        default: {
          minChunks: 2,
          priority: -20, // 优先级
          reuseExistingChunk: true, // 如果该 chunk 包含的 modules 都已经另一个被分割的 chunk 中存在，那么直接引用已存在的 chunk，不会再重新产生一个
        },
      },
    },
  },
};
```

`splitChunks.chunks` 的三个值有：`initial`、 `all`、 `async`， 默认值为 `async`。

``` javascript
// a.js
import $ from 'jquery'; // 静态导入 jquery
import react from 'react'; // 静态导入 react
// 魔法注释（/* webpackChunkName: "a-lodash" */），保证输出的 bundle 名称
import(/* webpackChunkName: "a-lodash" */ 'lodash'); // 动态导入 lodash
const a = 'I am a.js';
export default a;

// b.js
import $ from 'jquery'; // 静态导入 jquery
import(/* webpackChunkName: "b-react" */ 'react'); // 动态导入 react
import(/* webpackChunkName: "b-lodash" */ 'lodash'); // 动态导入 lodash
const b = 'I am b.js';
export default b;

// webpack.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  mode: 'development',
  entry: {
    a: './default/a.js',
    b: './default/b.js',
  },
  plugins: [new BundleAnalyzerPlugin()],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          chunks: 'async', // async | initial | all
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
};
```

+ `chunks='async'`
  + `jquery` 模块：`a.js` 和 `b.js` 都同步引入 `jquery`，被打包进了各自的 `bundle` 中没有拆分出来共用，说明在这种配置下只会针对**动态引入**的的代码进行拆分；
  + `react` 模块
    + `a.js` 中，`react` 为静态引入，所以不会被拆除出去
    + `b.js` 中，`react` 为动态引入，所以会被单独拆到 `vendors~b-react.js` （命中名字为 `vendors` 的 `cacheGroups` 规则） 中
  + `lodash` 模块：`a.js` 和 `b.js` 都是动态引入，所以都被拆分到 `vendors~a-lodash.js`
+ `chunks='initial'`：有共用的情况即发生拆分。动态引入的模块不受影响，它是无论如何都会被拆分出去的。对于同步引入的代码，可通过 `minChunks` 配置共同引用多少次会被拆分。
  + `jquery` 模块：`a.js` 和 `b.js` 都同步引入 `jquery`，所以单独拆除来放到 `vendors~a~b.js` （`vendors` 和分隔符（`automaticNameDelimiter`）以及实际被共用的  `bundle` 的名称） 中
  + `react` 模块
    + `a.js` 中 `react` 为静态引入，则被拆到 `vendors~a.js`
    + `b.js` 中 `react` 为动态引入，则被拆分为 `b-react.js`
  + `lodash` 模块：`a.js` 和 `b.js` 都是动态引入，则被拆到了 `a-lodash.js`
+ `chunks='all'`：最大程度的生成复用代码。
  + `react` 模块：`chunks='initial'` 中，`react` 模块应不同引入方式被拆分在两个文件中。在该模式下，`react` 模块拆分在一个文件中。

## Tree-Shaking（摇树优化）

Tree-Shaking 能够在 Webpack 实现，得益于 `ES6 Modules` **静态解析**的特性。ES6 的模块声明保证了依赖关系是提前确定的，使得静态分析成为可能，这样在 Webpack 中代码不需要执行就可以知道是否被使用，自然就知道哪些是无用的代码了。

ES6 Modules 特点：

+ ES6 中 `import` 和 `export` 是显性声明的；
+ `import` 的模块名只能是字符串常量；
+ ES6 模块的依赖关系是可以根据 `import` 引用关系推导出来的。
+ ES6 模块的依赖关系与运行时状态无关

使用 `Tree-Shaking`（摇树优化）注意事项：

+ 要使用 `Tree-Shaking` 必然要保证引用的模块都是 **ES6 规范**的，很多工具库或者类库都提供了 ES6 语法的库，例如 lodash 的 ES6 版本是 lodash-es；
+ **按需引入模块，避免「一把梭」**，例如，使用 lodash 的 isNumber，可以使用 `import isNumber from 'lodash-es/isNumber';`，而不是 `import {isNumber} from 'lodash-es'`；
+ **减少代码中的副作用代码**。
