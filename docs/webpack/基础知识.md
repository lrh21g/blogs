# webpack

+ 基本配置
  + 拆分配置 和 merge -- webpack-merge
  + 启动本地服务 —— webpack-dev-server
  + 处理ES6 -- babel
  + 处理样式 —— style-loader、css-loader、postcss-loader（less-loader）
  + 处理图片 —— url-loader
+ 高级配置
  + 配置多入口
  + 抽离CSS文件
  + 抽离公共代码
  + 异步加载js
  + 处理 jxs、vue
+ webpack 性能优化 - 构建速度
  + 优化 babel-loader

    ``` javascript
    {
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory'], // 开启缓存
      include: path.resolve(__dirname, 'src'), // 明确范围
      // // 排除范围，include 和 exclude 两者选一个即可
      // exclude: path.resolve(__dirname, 'node_modules')
    }
    ```

  + IgnorePlugin
  + noParse
  + happyPack 多进程打包
    + JS 单线程，开启多线程打包
    + 提高构建速度（特别是多核CPU）
  + ParallelUglifyPlugin 多进程压缩 JS
    + webpack 内置 Uglify 工具压缩 js
    + JS 单线程，开启多线程压缩更快
    + 和 happyPack 同理
    + 关于开启多线程
      + 项目较大，打包较慢，开启多线程能提高速度
      + 项目较小，打包很快，开启多线程会降低速度（进程开销）
      + 按需使用
  + 自动刷新：速度较慢，状态会丢失
  + 热更新：新代码生效，网页不刷新，状态不丢失
  + DllPlugin 动态链接库插件
    + 前端框架如 Vue React, 体积大，构建慢
    + 较稳定，不常升级版本
    + 同一版本只构建一次即可，不用每次都重新构建
    + webpack 已内置 DllPlugin 支持
    + DllPlugin - 打包出 dll 文件
    + DllReferencePlugin - 使用 dll 文件
+ webpack 优化构建速度
  + 可用于生产环境
    + 优化 babel-loader
    + IgnorePlugin
    + noParse
    + happyPack
    + ParallelUglifyPlugin
  + 不用于生产环境
    + 自动刷新
    + 热更新
    + DllPlugin
+ webpack 性能优化 - 产出代码
  + 优点：体积更小；合理分包，不重复加载；速度更快，内存使用更少
  + 小图片base64编码
  + bundle 加 hash
  + 懒加载
  + 提取公共代码
  + IngorePlugin
  + 使用 CDN 加速
  + 使用 production 模式
    + 自动开启代码压缩
    + Vue React 等会自动删掉调试代码（如开发环境的 warning）
    + 启动 Tree-Shaking （E6 Module才能让 tree-shaking 生效，commonjs就不行）
      + ES6 Module 静态引入，编译时引入
      + Commonjs 动态引入，执行时引入
      + 只有 ES6 Module 才能静态分析，实现 Tree-Shaking
  + Scope Hosting：代码体积更小、创建函数作用域更少、代码可读性更好
+ babel
  + 环境搭建 & 基本配置
    + 环境搭建
    + .babelrc配置
    + presets 和 plugins
  + babel-polyfill
    + Polyfill
    + core-js 和 regenerator
    + 问题：污染全局环境
  + babel-runtime：不会污染全局，产出第三方lib要用 babel-runtime

+ 前端代码为何要进行构建和打包
  + 体积更小（Tree-Shaking、压缩、合并），加载更快
  + 编译高级语言或语法（TS、ES6+、模块化、scss）
  + 兼容性和错误检查（Polyfill、postcss、eslint）
  + 统一、高效的开发环境
  + 统一的构建流程和产出标准
  + 集成公司构建规范（提测、上线等）
+ module chunk bundle 分别是什么意思，有何区别
  + module - 各个源码文件，webpack中一切皆模块
  + chunk - 多模块合并成的，如 entry import() splitChunk
  + bundle - 最终的输出文件
+ loader 和 plugin 的区别
  + loader 模块转换器，如 less -> css
  + plugin 扩展插件，如 HtmlWebpackPlugin
  + 常用 loader 和 plugin
+ 如何产出一个 lib
+ webpack 如何实现懒加载
  + import()
  + 结合 Vue React 异步组件
  + 结合 Vue-router React-router 异步加载路由
+ 为何 Proxy 不能被 Polyfill
  + Class 可以用 function 模拟
  + Promise 可以用 callback 来模拟
  + Proxy 功能用 Object.defineProperty 无法模拟
+ webpack 常见性能优化
+ babel-runtime 和 babel-polyfill 的区别
