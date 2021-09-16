const fs = require('fs'); // 文件系统：以一种模仿标准 POSIX（可移植操作系统接口） 函数的方式与文件系统进行交互
const path = require('path'); // 路径：用于处理文件和目录的路径
const zlib = require('zlib'); // 压缩：过 Gzip、Deflate/Inflate、和 Brotli 实现的压缩功能
const rollup = require('rollup'); // rollup：JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码
const terser = require('terser'); // terser：JavaScript 代码压缩和美化工具

if (!fs.existsSync('dist')) {
  // 使用同步方法判断 dist 目录是否存在
  // 如果不存在，则同步地创建目录 dist
  fs.mkdirSync('dist');
}

let builds = require('./config').getAllBuilds();

// filter builds via command line arg
// >>> 通过命令行参数过滤 builds
// process.argv 属性会返回一个数组，其中包含当 Node.js 进程被启动时传入的命令行参数。
// >>> node process-args.js 参数1 参数2 参数3
// >>> 0: /usr/local/bin/node
// >>> 1: /Users/mjr/work/node/process-args.js
// >>> 2: 参数1
// >>> 3: 参数2
// >>> 4: 参数3
if (process.argv[2]) {
  // 示例： npm run build -- web-runtime-cjs,web-server-renderer 执行如下命令
  const filters = process.argv[2].split(',');
  // 遍历 builds 数组，寻找 output.file 或者 _name 中任一个包含 filters 中任一个的配置项。
  builds = builds.filter((b) => {
    return filters.some(
      (f) => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1
    );
  });
} else {
  // filter out weex builds by default
  // node scripts/build.js 不存在 process.argv[2] 的内容，执行如下代码
  // 排除 weex 的代码，通过 output.file 是否包含 weex 字符串判断是否为 weex 代码
  builds = builds.filter((b) => {
    return b.output.file.indexOf('weex') === -1;
  });
}

build(builds);

function build(builds) {
  let built = 0; // 当前打包的序号
  const total = builds.length; // 需要打包的总次数
  const next = () => {
    buildEntry(builds[built])
      .then(() => {
        built++; // 打完包之后，需要自增 1
        if (built < total) {
          // 判断打包序号是否小于打包总次数，如果小于，则继续执行 next() 函数
          next();
        }
      })
      .catch(logError); // 输出错误信息
  };

  next(); // 调用 next 函数
}

function buildEntry(config) {
  const output = config.output; // 获取 rollup 打包配置的 output 配置项
  const { file, banner } = output; // 获取 output 配置项中的 file、 banner
  const isProd = /(min|prod)\.js$/.test(file); // 判断 file 是否以 min.js 结尾
  return rollup
    .rollup(config) // 执行 rollup 进行打包
    .then((bundle) => bundle.generate(output)) // 将打包的结果生成源码
    .then(({ output: [{ code }] }) => {
      // 获取打包生成的源码
      if (isProd) {
        const minified =
          (banner ? banner + '\n' : '') +
          // 执行代码最小化打包，并在代码标题处手动添加banner，因为最小化打包会导致注释被删除
          terser.minify(code, {
            toplevel: true,
            output: {
              ascii_only: true, // 只支持 ASCII 字符
            },
            compress: {
              pure_funcs: ['makeMap'], // 过滤 makeMap 函数
            },
          }).code; // 获取最小化打包的代码
        return write(file, minified, true); // 将代码写入输出的路径
      } else {
        return write(file, code); // 将代码写入输出路径
      }
    });
}

function write(dest, code, zip) {
  return new Promise((resolve, reject) => {
    // 输出日志函数
    function report(extra) {
      console.log(
        // path.relative(process.cwd(), dest)
        // 获取当前命令行路径到最终生成文件的相对路径
        blue(path.relative(process.cwd(), dest)) +
          ' ' +
          getSize(code) +
          (extra || '')
      );
      resolve();
    }

    fs.writeFile(dest, code, (err) => {
      // 如果出现错误，则调用 reject() 方法
      if (err) return reject(err);
      // 如果 isProd ，则进行 gzip 压缩测试
      if (zip) {
        // 通过 gzip 对源码进行压缩测试
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err);
          // 测试成功后获取 gzip字符串长度并输出 gizp 容量
          report(' (gzipped: ' + getSize(zipped) + ')');
        });
      } else {
        report();
      }
    });
  });
}

// 获取文件容量
function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
  console.log(e);
}

// 生成命令行蓝色的文本
function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
