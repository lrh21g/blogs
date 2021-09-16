const path = require('path');
// buble 插件 - 在rollup.js打包的过程中进行代码编译，将ES6+代码编译成ES2015标准
const buble = require('rollup-plugin-buble');
// alias 插件 - 替换模块路径中的别名
const alias = require('rollup-plugin-alias');
// commonjs 插件 - 支持CommonJS模块
const cjs = require('rollup-plugin-commonjs');
// replace 插件 - 在打包时动态替换代码中的内容
const replace = require('rollup-plugin-replace');
// resolve 插件 - 集成外部模块代码
const node = require('rollup-plugin-node-resolve');
// flow 插件 - 用于在rollup.js打包过程中，清除flow类型检查部分的代码
const flow = require('rollup-plugin-flow-no-whitespace');
// 从 package.json 中获取 Vue 的版本号
const version = process.env.VERSION || require('../package.json').version;
// 从 package.json 中获取 Weex 版本号
const weexVersion =
  process.env.WEEX_VERSION ||
  require('../packages/weex-vue-framework/package.json').version;
const featureFlags = require('./feature-flags');

const banner =
  '/*!\n' +
  ` * Vue.js v${version}\n` +
  ` * (c) 2014-${new Date().getFullYear()} Evan You\n` +
  ' * Released under the MIT License.\n' +
  ' */';

// 仅用于打包 weex-factory 源码时使用
const weexFactoryPlugin = {
  // 在代码块内添加代码注释
  intro() {
    return 'module.exports = function weexFactory (exports, document) {';
  },
  outro() {
    return '}';
  },
};

const aliases = require('./alias'); // 获取 alias 配置
const resolve = (p) => {
  // 将传入参数 p 通过 / 进行分割成字符串数组，并取货第一个元素设置为 base
  const base = p.split('/')[0];
  // 匹配别名，判断别名是否存在
  if (aliases[base]) {
    // 如果别名存在，则将别名对应的路径与文件名进行合并
    // aliases[base] 为匹配 alias 配置，通过 alias 配置中的 resolve 函数找到 vue.js 的源码目录
    // 最终通过 path.resolve(aliases[base], p.slice(base.length + 1)) 找到最终路径
    // 例如： web/entry-runtime.js
    // >>> web/entry-runtime.js => aliases['web']
    // >>> aliases['web'] => path.resolve(__dirname, '../', 'src/platforms/web')
    // >>> path.resolve(aliases['web'], p.slice(base.length + 1))
    //     => path.resolve(aliases['web'], entry-runtime.js)
    // >>> 最终 web/entry-runtime.js 配置对应的入口路径为 src/platforms/web/entry-runtime.js
    return path.resolve(aliases[base], p.slice(base.length + 1));
  } else {
    // 如果别名不存在，则将项目根路径与传入路径进行合并
    return path.resolve(__dirname, '../', p);
  }
};

const builds = {
  // Runtime only (CommonJS). Used by bundlers e.g. Webpack & Browserify
  'web-runtime-cjs-dev': {
    // entry：表示构建入口的 JavaScript 文件地址
    entry: resolve('web/entry-runtime.js'),
    // dest：表示构建后的 JavaScript 文件地址
    dest: resolve('dist/vue.runtime.common.dev.js'),
    // format：表示构建的格式
    // >>> cjs：表示构建出来的文件遵循 CommonJS 规范
    // >>> es：表示构建出来的文件遵循 ES Module 规范
    // >>> umd：表示构建出来的文件遵循 UMD 规范
    format: 'cjs',
    // env：环境
    env: 'development',
    banner,
  },
  'web-runtime-cjs-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.common.prod.js'),
    format: 'cjs',
    env: 'production',
    banner,
  },
  // Runtime+compiler CommonJS build (CommonJS)
  'web-full-cjs-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.dev.js'),
    format: 'cjs',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner,
  },
  'web-full-cjs-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.common.prod.js'),
    format: 'cjs',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner,
  },
  // Runtime only ES modules build (for bundlers)
  'web-runtime-esm': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.esm.js'),
    format: 'es',
    banner,
  },
  // Runtime+compiler ES modules build (for bundlers)
  'web-full-esm': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.js'),
    format: 'es',
    alias: { he: './entity-decoder' },
    banner,
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.js'),
    format: 'es',
    transpile: false,
    env: 'development',
    alias: { he: './entity-decoder' },
    banner,
  },
  // Runtime+compiler ES modules build (for direct import in browser)
  'web-full-esm-browser-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.esm.browser.min.js'),
    format: 'es',
    transpile: false,
    env: 'production',
    alias: { he: './entity-decoder' },
    banner,
  },
  // runtime-only build (Browser)
  'web-runtime-dev': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.js'),
    format: 'umd',
    env: 'development',
    banner,
  },
  // runtime-only production build (Browser)
  'web-runtime-prod': {
    entry: resolve('web/entry-runtime.js'),
    dest: resolve('dist/vue.runtime.min.js'),
    format: 'umd',
    env: 'production',
    banner,
  },
  // Runtime+compiler development build (Browser)
  'web-full-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.js'),
    format: 'umd',
    env: 'development',
    alias: { he: './entity-decoder' },
    banner,
  },
  // Runtime+compiler production build  (Browser)
  'web-full-prod': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
    dest: resolve('dist/vue.min.js'),
    format: 'umd',
    env: 'production',
    alias: { he: './entity-decoder' },
    banner,
  },
  // Web compiler (CommonJS).
  'web-compiler': {
    entry: resolve('web/entry-compiler.js'),
    dest: resolve('packages/vue-template-compiler/build.js'),
    format: 'cjs',
    external: Object.keys(
      require('../packages/vue-template-compiler/package.json').dependencies
    ),
  },
  // Web compiler (UMD for in-browser use).
  'web-compiler-browser': {
    entry: resolve('web/entry-compiler.js'),
    dest: resolve('packages/vue-template-compiler/browser.js'),
    format: 'umd',
    env: 'development',
    moduleName: 'VueTemplateCompiler',
    plugins: [node(), cjs()],
  },
  // Web server renderer (CommonJS).
  'web-server-renderer-dev': {
    entry: resolve('web/entry-server-renderer.js'),
    dest: resolve('packages/vue-server-renderer/build.dev.js'),
    format: 'cjs',
    env: 'development',
    external: Object.keys(
      require('../packages/vue-server-renderer/package.json').dependencies
    ),
  },
  'web-server-renderer-prod': {
    entry: resolve('web/entry-server-renderer.js'),
    dest: resolve('packages/vue-server-renderer/build.prod.js'),
    format: 'cjs',
    env: 'production',
    external: Object.keys(
      require('../packages/vue-server-renderer/package.json').dependencies
    ),
  },
  'web-server-renderer-basic': {
    entry: resolve('web/entry-server-basic-renderer.js'),
    dest: resolve('packages/vue-server-renderer/basic.js'),
    format: 'umd',
    env: 'development',
    moduleName: 'renderVueComponentToString',
    plugins: [node(), cjs()],
  },
  'web-server-renderer-webpack-server-plugin': {
    entry: resolve('server/webpack-plugin/server.js'),
    dest: resolve('packages/vue-server-renderer/server-plugin.js'),
    format: 'cjs',
    external: Object.keys(
      require('../packages/vue-server-renderer/package.json').dependencies
    ),
  },
  'web-server-renderer-webpack-client-plugin': {
    entry: resolve('server/webpack-plugin/client.js'),
    dest: resolve('packages/vue-server-renderer/client-plugin.js'),
    format: 'cjs',
    external: Object.keys(
      require('../packages/vue-server-renderer/package.json').dependencies
    ),
  },
  // Weex runtime factory
  'weex-factory': {
    weex: true,
    entry: resolve('weex/entry-runtime-factory.js'),
    dest: resolve('packages/weex-vue-framework/factory.js'),
    format: 'cjs',
    plugins: [weexFactoryPlugin],
  },
  // Weex runtime framework (CommonJS).
  'weex-framework': {
    weex: true,
    entry: resolve('weex/entry-framework.js'),
    dest: resolve('packages/weex-vue-framework/index.js'),
    format: 'cjs',
  },
  // Weex compiler (CommonJS). Used by Weex's Webpack loader.
  'weex-compiler': {
    weex: true,
    entry: resolve('weex/entry-compiler.js'),
    dest: resolve('packages/weex-template-compiler/build.js'),
    format: 'cjs',
    external: Object.keys(
      require('../packages/weex-template-compiler/package.json').dependencies
    ),
  },
};

function genConfig(name) {
  const opts = builds[name];
  const config = {
    input: opts.entry, // 包的入口点
    // 外链：external 接受一个模块名称的数组或一个接受模块名称的函数，如果它被视为外部引用（externals）则返回 true。
    external: opts.external,
    // 插件
    plugins: [flow(), alias(Object.assign({}, aliases, opts.alias))].concat(
      opts.plugins || []
    ),
    output: {
      file: opts.dest, // 输出文件路径
      format: opts.format, // 输出文件的格式：amd/cjs/esm
      banner: opts.banner, // 文件头部添加的内容
      name: opts.moduleName || 'Vue', // 指定文件名称
    },
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    },
  };

  // built-in vars
  const vars = {
    __WEEX__: !!opts.weex,
    __WEEX_VERSION__: weexVersion,
    __VERSION__: version,
  };
  // feature flags
  Object.keys(featureFlags).forEach((key) => {
    vars[`process.env.${key}`] = featureFlags[key];
  });
  // build-specific env
  // 判断传入的 opts 中，是否存在 env 参数
  if (opts.env) {
    // 如果存在，则将代码中的 process.env.NODE_ENV 部分替换为 JSON.stringify(opts.env)
    vars['process.env.NODE_ENV'] = JSON.stringify(opts.env);
  }
  config.plugins.push(replace(vars));

  if (opts.transpile !== false) {
    config.plugins.push(buble());
  }

  Object.defineProperty(config, '_name', {
    enumerable: false,
    value: name,
  });

  return config;
}

// 判断环境变量 TARGET 是否定义
// 执行 build 构建命令中，没有 TARGET 环境变量
if (process.env.TARGET) {
  module.exports = genConfig(process.env.TARGET);
} else {
  exports.getBuild = genConfig;
  // 获取 builds 对象的 key 数组，进行遍历并调用 genConfig 方法生成配置对象
  exports.getAllBuilds = () => Object.keys(builds).map(genConfig);
}
