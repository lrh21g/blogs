# 编写 Plugin

plugin 通过监听 `compiler` 的 `hook` 特定时机，然后处理 `stats` （主要包含 `modules`、`chunks` 和 `assets` 三个属性值的对象）。

- Webpack 的插件必须要是一个类
- 该类必须包含一个 `apply` 的函数，该函数接收 `compiler` 对象参数
- 该类可以使用 Webpack 的 `compiler` 和 `Compilation` 对象的钩子
- 可自定义自己的钩子系统

```javascript
// 使用了异步的 emit.tapAsync 钩子，然后在 Compilation 对象上增加了一个 assets 文件 fileList.md，内容为获取到的 compilation.assets 的文件名（filename）
class fileListPlugin {
  apply(compiler) {
    // emit 是异步 hook，使用 tapAsync 触及它，还可以使用 tapPromise/tap(同步)
    compiler.hooks.emit.tapAsync('fileListPlugin', (compilation, callback) => {
      // 在生成文件中，创建一个头部字符串：
      var fileList = 'In this build:\n\n';

      // 遍历所有编译过的资源文件，
      // 对于每个文件名称，都添加一行内容。
      for (var filename in compilation.assets) {
        fileList += '- ' + filename + '\n';
      }

      // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
      compilation.assets['fileList.md'] = {
        source: function () {
          return fileList;
        },
        size: function () {
          return fileList.length;
        },
      };

      callback();
    });
  }
}

module.exports = fileListPlugin;
```

## prefetch-webpack-plugin 编写

`prefetch-webpack-plugin` 将打包中遇见的 `import()` 或者 `require.ensure()` 这类异步懒加载的模块使用 `<link>` 标签的 `rel = prefetch` 进行预加载。即：将需要异步加载的模块，提前放到页面的 HTML 中进行预加载（需要浏览器支持）。

```javascript
// 通过魔法注释，实现 Prefetch 或者 Preload 标注。使用魔法注释，即可标注一个模块是否需要预取/预加载。
// 获取 chunk 对象的时候，获取到标注，从而根据这个注释给页面增加 <link rel="prefetch"> 标签
import(/* webpackPrefetch: true */ './lazy');
```

- `/* webpackPrefetch: true */` ：把主加载流程加载完毕，在空闲时在加载其它，等再点击其他时，只需要从缓存中读取即可，性能更好，推荐使用；能够提高代码利用率，把一些交互后才能用到的代码写到异步组件里，通过懒加载的形式，去把这块的代码逻辑加载进来，性能提升，页面访问速度更快。
- `/* webpackPreload: true */` : 和主加载流程一起并行加载。

### 实现原理

1. 利用 `compiler.compilation` 得到 `Compilation` 对象；
2. 在 `Compilation` 对象中监听 `html-webpack-plugin` 的钩子，拿到 HTML 对象。此处需要区分 `html-webpack-plugin` 的版本：
   - 在 3.x 版本，`html-webpack-plugin` 的钩子是直接挂在 `Compilation` 对象上的，使用的是 `compilation.hooks.htmlWebpackPluginAfterHtmlProcessing`；
   - 在 4.x 版本中，`html-webpack-plugin` 使用 `Tapable` 实现了自定义钩子，需要使用 `HtmlWebpackPlugin.getHooks(compilation)` 的方式获取自定义的钩子。
3. 从 `Compilation` 对象中读取当前 HTML 页面的所有 `chunks`，筛选异步加载的 `chunk` 模块，此处有两种情况：
   - **生成多个 HTML 页面**， `html-webpack-plugin` 插件会设置 `chunks` 选项，需要从 `Compilation.chunks` 来选取 HTML 页面真正用到的 `chunks`，然后在从 `chunks` 中过滤出 `Prefetch chunk`；
   - **单页应用**，不存在 `chunks` 选项，默认 `chunks='all'`，需要从全部 `Compilation.chunks` 中过滤出 `Prefetch chunk`。
4. 结合 Webpack 配置的 `publicPath` 得到异步 `chunk` 的实际线上地址，然后修改 `html-webpack-plugin` 钩子得到的 HTML 对象，给 HTML 的 `<head>` 添加 `<link rel="prefetch">` 内容。

### 代码实现

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');

class PrefetchPlugin {
  constructor() {
    this.name = 'prefetch-plugin';
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, (compilation) => {
      const run = this.run.bind(this, compilation);
      if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
        // html-webpack-plugin v3 插件
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.name, run);
      } else {
        // html-webpack-plugin v4
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(this.name, run);
      }
    });
  }
  // ========================================
  // run 函数主要处理：
  // 1. 获取 html-webpack-plugin 的配置，根据 chunks 的值从 Compilation.chunks 筛选当前 HTML 页面真正用到的 chunks
  // 2. 从当前页面获取 chunks 中需要预取的 chunk
  // 3. 生成 prefetch link 标签，添加到 HTML 片段
  // ========================================
  // run 函数的入参：
  // compilation : 本次编译的 Compilation 对象
  // data : 是 html-webpack-plugin 创建的一个给其插件使用的对象，里面包含页面的 HTML 判断和 html-webpack-plugin 插件实例化后的实例本身
  // + data.html : 生成 HTML 页面的 HTML 片段字符串；
  // + data.plugin : html-webpack-plugin 的实例，可以从 data.plugin.options 读取 html-webpack-plugin 插件的参数
  // callback : tapAsync 的回调函数，将 data 处理后的结果通过 callback 传递给下一个处理回调
  run(compilation, data, callback) {
    // 获取 chunks，默认不指定就是 all
    const chunkNames = data.plugin.options.chunks || 'all';
    // 排除需要排除的 chunks
    const excludeChunkNames = data.plugin.options.excludeChunks || [];

    // 所有 chunks 的 Map，用于根据 ID 查找 chunk
    const chunks = new Map();
    // 预取的 id
    const prefetchIds = new Set();
    compilation.chunks
      .filter((chunk) => {
        const { id, name } = chunk;
        // 添加到 map
        chunks.set(id, chunk);
        if (chunkNames === 'all') {
          // 全部的 chunks 都要过滤
          // 按照 exclude 过滤
          return excludeChunkNames.indexOf(name) === -1;
        }
        // 过滤想要的chunks
        return chunkNames.indexOf(name) !== -1 && excludeChunkNames.indexOf(name) === -1;
      })
      .map((chunk) => {
        const children = new Set();
        // 预取的内容只存在 children 内，不能 entry 就预取吧
        const childIdByOrder = chunk.getChildIdsByOrders();
        for (const chunkGroup of chunk.groupsIterable) {
          for (const childGroup of chunkGroup.childrenIterable) {
            for (const chunk of childGroup.chunks) {
              children.add(chunk.id);
            }
          }
        }
        if (Array.isArray(childIdByOrder.prefetch) && childIdByOrder.prefetch.length) {
          prefetchIds.add(...childIdByOrder.prefetch);
        }
      });

    // 获取 publicPath，保证路径正确
    const publicPath = compilation.outputOptions.publicPath || '';

    if (prefetchIds.size) {
      const prefetchTags = [];
      for (let id of prefetchIds) {
        const chunk = chunks.get(id);
        const files = chunk.files;
        files.forEach((filename) => {
          prefetchTags.push(`<link rel="prefetch" href="${publicPath}${filename}">`);
        });
      }
      // 开始生成 prefetch html片段
      const prefetchTagHtml = prefetchTags.join('\n');

      if (data.html.indexOf('</head>') !== -1) {
        // 有 head，就在 head 结束前添加 prefetch link
        data.html = data.html.replace('</head>', prefetchTagHtml + '</head>');
      } else {
        // 没有 head 就加上个 head
        data.html = data.html.replace('<body>', '<head>' + prefetchTagHtml + '</head><body>');
      }
    }

    callback(null, data);
  }
}

module.exports = PrefetchPlugin;
```
