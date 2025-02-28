# Loaders

**loader** 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。

在处理模块时，将符合规则条件的模块，提交给对应的处理器来处理，通常用来配置 loader，其类型是一个数组，数组里每一项都描述了如何去处理部分文件。每一项 rule 大致可以由以下三部分组成：

- 条件匹配：通过 `test`、`include`、`exclude` 等配置来命中可以应用规则的模块文件；
- 应用规则：对匹配条件通过后的模块，使用 `use` 配置项来应用 loader，可以应用一个 loader 或者按照**从后往前的顺序**应用一组 loader，还可以分别给对应 loader 传入不同参数；
- 重置顺序：一组 loader 的执行顺序默认是**从后到前（或者从右到左）**执行，通过 `enforce` 选项可以让其中一个 loader 的执行顺序放到**最前（pre）**或者是**最后（post）**。

Loaders : <https://webpack.docschina.org/loaders/>

## 语法转换

- [babel-loader](https://webpack.docschina.org/loaders/babel-loader) ：使用 Babel 加载 ES2015+ 代码并将其转换为 ES5
- [ts-loader](https://github.com/TypeStrong/ts-loader) ：像加载 JavaScript 一样加载 TypeScript

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
};
```

## 模板处理

- [html-loader](https://webpack.docschina.org/loaders/html-loader) ：将 HTML 导出为字符串，需要传入静态资源的引用路径

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
};
```

## 样式处理

- [style-loader](https://webpack.docschina.org/loaders/style-loader/) ：将模块导出的内容作为样式并添加到 DOM 中。
- [css-loader](https://webpack.docschina.org/loaders/css-loader) ：加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码，支持模块化、压缩、文件导入等特性。
- [postcss-loader](https://webpack.docschina.org/loaders/postcss-loader) ：使用 PostCSS（CSS 处理工具） 加载并处理 CSS
- [less-loader](https://webpack.docschina.org/loaders/less-loader) ：加载并编译 less 文件
- [sass-loader](https://webpack.docschina.org/loaders/sass-loader) ： 加载并编译 sass/scss 文件
- [stylus-loader](https://webpack.docschina.org/loaders/stylus-loader/) ：加载并编译 stylus 文件

```javascript
module.exports = {
  module: {
    rules: [
      {
        // 对于 pure CSS - /\.css$/i,
        // 对于 Sass/SCSS - /\.((c|sa|sc)ss)$/i,
        // 对于 Less - /\.((c|le)ss)$/i,
        test: /\.((c|sa|sc)ss)$/i, // 匹配资源
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 每一个 CSS 的 `@import` 与 CSS 模块/ICSS 都会运行 `postcss-loader`，不要忘了 `sass-loader` 将不属于 CSS 的 `@import` 编译到一个文件中
              // 如果您需要在每个 CSS 的 `@import` 上运行 `sass-loader` 和 `postcss-loader`，请将其设置为 `2`。
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // postcss-preset-env 允许将现代CSS转换为大多数浏览器可以理解的东西，根据设置目标浏览器或运行时环境确定所需的 Polyfill（垫片）。
                    // postcss-preset-env 包含 autoprefixer（添加李浏览器内核前缀），无需单独使用 autoprefixer
                    'postcss-preset-env',
                    {
                      /* postcss-preset-env pluginOptions */
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader', // 对于 less 使用 less-loader
            options: {
              // additionalData 在实际的文件之前要添加的 Sass / SCSS 代码。
              // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
              // eg: additionalData: '$env: ' + process.env.NODE_ENV + ';',
            },
          },
        ],
      },
    ],
  },
};
```

## 文件处理

### webpack 5 之前

- [file-loader](https://v4.webpack.js.org/loaders/file-loader/) ：将文件发送到输出文件夹，并返回（相对）URL 。
- [url-loader](https://v4.webpack.js.org/loaders/url-loader/) ：像 `file-loader` 一样工作，但如果文件小于限制，可以返回 `data URL` 。
- [raw-loader](https://v4.webpack.js.org/loaders/raw-loader/)将文件导入为字符串。

```javascript
module.exports = {
  module: {
    rules: [
      {
        // 处理图片文件
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'img/[name].[hash:6].[ext]',
              limit: 100 * 1024,
            },
          },
        ],
      },
      {
        // 处理字体文件
        test: /\.(eot|woff2|woff|ttf|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'font/[name].[hash:6].[ext]',
              limit: 100 * 1024,
            },
          },
        ],
      },
    ],
  },
};
```

### webpack 5

在 webpack 5 之前，通常使用 `url-loader` 、 `file-loader` 、 `raw-loader` 进行文件处理。webpack 5 新增 **资源模块类型** （asset module type，允许使用资源文件（字体，图标等）而无需配置额外 loader ），通过添加 4 种新的模块类型，来替换所有这些 loader 。

- `asset/resource` ：发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` ：导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` ：导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` ：在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

```javascript
module.exports = {
  module: {
    rules: [
      {
        // 处理图片文件
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[name].[hash:6].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024,
          },
        },
      },
      {
        // 处理字体文件
        test: /\.(eot|woff2|woff|ttf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[hash:6].[ext]',
        },
      },
    ],
  },
};
```
