# Plugins

**Plugin（插件）** 目的在于解决 loader 无法实现的其他事。参与打包整个过程、打包优化和压缩、配置编译时的变量、极其灵活。

+ Plugin 是一个独立的模块，模块对外暴露一个 JavaScript 函数
+ 函数的原型 (prototype) 上定义了一个注入 `compiler` 对象的 `apply` 方法。 `apply` 函数中，需要有通过 `compiler` 对象挂载的 webpack 事件钩子，钩子的回调中，能拿到当前编译的 `compilation` 对象，如果是异步编译插件的话可以拿到回调 `callback`
+ 完成自定义子编译流程并处理 `complition` 对象的内部数据
+ 如果异步编译插件的话，数据处理完成后执行 `callback` 回调

## CleanWebpackPlugin

在打包前清理上一次项目生成的 bundle 文件，它会根据 `output.path` 自动清理文件夹。

``` javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin()
  ],
};
```

## HotModuleReplacementPlugin

热替换模块(Hot Module Replacement)，也被称为 **HMR**。

HotModuleReplacementPlugin 是 webpack 模块自带的。

``` javascript
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
  ],
};
```

## HtmlWebpackPlugin

生成一个 HTML5 文件。将 webpack 中 `entry` 配置的相关入口 `chunk`，以及  `extract-text-webpack-plugin` 抽取的 css 样式 插入到该插件提供的 `template` 或者 `templateContent` 配置项指定的内容基础上，生成一个 html 文件。

``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 文件名
      template: path.join(__dirname, '/index.html'), // 模板
      minify: {
        // 压缩HTML文件
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true, // 压缩内联css
      },
      // inject 属性值：
      // > true ：默认值，script 标签位于 html 文件的 body 底部
      // > body ：script 标签位于 html 文件的 body 底部（同 true）
      // > head ：script 标签位于 head 标签内
      // > false ：不插入生成的 js 文件，只是单纯的生成一个 html 文件
      inject: true,
    }),
  ],
};
```

## MiniCssExtractPlugin

自 webpack v4 之后， `ExtractTextWebpackPlugin` 不应该用于抽离 css，应该使用 `MiniCssExtractPlugin`。

`MiniCssExtractPlugin` 基于 webpack v5 的新特性构建，并且需要 webpack 5 才能正常工作。

与 `ExtractTextWebpackPlugin` 相比：

+ 异步加载
+ 没有重复的编译（性能）
+ 更容易使用
+ 针对 CSS 开发

**不要同时使用 `style-loader` 与 `MiniCssExtractPlugin`**

``` javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [].concat(isDevMode ? [] : [new MiniCssExtractPlugin()]),
};
```

使用 `ExtractTextWebpackPlugin`

``` javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['sass-loader', 'postcss-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[hash:6].css',
      allChunks: true,
    }),
  ],
};
```

## CssMinimizerWebpackPlugin

使用 [cssnano](https://cssnano.co/) 优化和压缩 CSS。

``` javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDevMode = process.env.NODE_ENV !== 'production';

module.exports = {
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              // 移除所有注释（包括以 /*! 开头的注释）。
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
};
```

## TerserWebpackPlugin

压缩 JavaScript。

``` javascript
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js代码

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
        cache: true, // 是否缓存
        sourceMap: false,
        // 删除注释
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false, // 是否将注释剥离到单独的文件中
      }),
    ],
  },
};
```

## CompressionWebpackPlugin

将前端打包好的资源文件进一步压缩，生成指定的、体积更小的压缩文件。

``` javascript
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin({
      // gzip 压缩配置
      test: /\.js$|\.html$|\.css/, // 匹配文件名
      threshold: 10 * 1024, // 对超过 10kb 的数据进行压缩
      deleteOriginalAssets: false, // 是否删除原文件
    }),
  ],
};
```

## DefinePlugin

允许在编译时 (compile time) 配置全局常量。

传递给 `DefinePlugin` 的每个键都是一个标识符或多个以 `.` 连接的标识符。

+ 如果该值为字符串，它将被作为代码片段来使用。
+ 如果该值不是字符串，则将被转换成字符串（包括函数方法）。
+ 如果值是一个对象，则它所有的键将使用相同方法定义。
+ 如果键添加 `typeof` 作为前缀，它会被定义为 `typeof` 调用。

``` javascript
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true),
      VERSION: JSON.stringify('5fa3b9'),
      BROWSER_SUPPORTS_HTML5: true,
      TWO: '1+1',
      'typeof window': JSON.stringify('object'),
    }),
  ],
};
```

在为 `process` 定义值时，`'process.env.NODE_ENV': JSON.stringify('production')` 会比 `process: { env: { NODE_ENV: JSON.stringify('production') } }` 更好，后者会覆盖 `process` 对象，这可能会破坏与某些模块的兼容性，因为这些模块会在 `process` 对象上定义其他值。

注意：插件直接执行文本替换，给定的值必须包含字符串本身内的实际引号。通常，有两种方式来达到这个效果，使用 `'"production"'`, 或者使用 `JSON.stringify('production')`。

## ProvidePlugin

自动加载模块，而不必到处 `import` 或 `require`。

``` javascript
new webpack.ProvidePlugin({
  identifier: ['module1', 'property1'],
});
```

任何时候，当 `identifier` 被当作未赋值的变量时，`module` 就会自动被加载，并且 `identifier` 会被这个 `module` 输出的内容所赋值。（模块的 `property` 用于支持命名导出(named export)）。

``` javascript
const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      _map: ['lodash', 'map'], // 使用 Lodash Map
      Vue: ['vue/dist/vue.esm.js', 'default'] // 使用 Vue.js
    }),
  ],
}
```

## DLLPlugin

`DllPlugin` 和 `DllReferencePlugin` 用某种方法实现了拆分 bundles，同时还大幅度提升了构建的速度。`DLL` 一词代表微软最初引入的动态链接库。

+ `DllPlugin` ：用于在单独的 webpack 配置中创建一个 `dll-only-bundle`。 此插件会生成一个名为 `manifest.json` 的文件，这个文件是用于让 `DllReferencePlugin` 能够映射到相应的依赖上。
+ `DllReferencePlugin` ：把 `dll-only-bundles` 引用到需要的预编译的依赖中。
+ `AddAssetHtmlPlugin` ：将打包的 `DLL` 库引入到 HTML 模块中。

```javascript
// webpack.dll.config.js
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
// webpack.prod.conf.js
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
{
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js",
    "build:dll": "webpack --config build/webpack.dll.conf.js"
  }
}
```

## HappyPack

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

## CopyWebpackPlugin

`CopyWebpackPlugin` 将单个文件或整个目录复制到构建目录中。

```javascript
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/js/*.js',
          to: path.resolve(__dirname, './dist/js'),
          flatten: true,
        },
      ],
    }),
  ],
};
```

## IgnorePlugin

`IgnorePlugin` 忽略第三方包指定目录，让这些指定目录不要被打包进去。

示例：优化 `moment.js` 的体积

```javascript
// webpack.config.js
const webpack = require('webpack');

module.exports = {
  plugins: [
    // 方法一：使用 IgnorePlugin 。忽略 moment.js 的所有本地文件，但需要引入所需要的语言包
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // 方法二：使用 ContextReplacementPlugin 。会告诉 webpack 会使用到哪些文件，则不需要手动引入所需要的语言包
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/),
  ],
};
```

```javascript
import moment from 'moment'

// 手动引入所需要的语言包
import 'moment/locale/zh-cn'
moment.locale('zh-cn')
```
