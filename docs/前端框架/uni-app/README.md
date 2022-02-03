# uni-app

## 使用特定前缀的方式引用图片路径

### scss 中使用特定前缀引用图片路径

+ 创建 `globalVar.scss` 文件，并在 `uni.scss` 文件中引入

::: details globalVar.scss

``` scss
$src: "https://csxbank.oss-cn-shanghai-finance-1-pub.aliyuncs.com/sxf/";
```

:::

::: details uni.scss

``` scss
@import '@/styles/globalVar.scss';
```

:::

+ 在 `vue.config.js` 文件中，修改 `globalVar.scss` 文件内容

::: details vue.config.js

``` javascript
const globalVarScssPath = './src/styles/globalVar.scss'
let globalVarScss = fs.readFileSync(globalVarScssPath, { encoding: 'utf-8' })

function replaceScss(path, value) {
  let arr = path.split('.')
  arr = arr.map(item => encodeURIComponent(item))

  const len = arr.length
  const lastItem = arr[len - 1]

  let i = 0
  let ScssArr = globalVarScss.split(/\n/)
  ScssArr = ScssArr.map(item => encodeURIComponent(item))

  for (let index = 0; index < ScssArr.length; index++) {
    const item = ScssArr[index]
    if (new RegExp(`${arr[i]}`).test(item)) ++i

    if (i === len) {
      const hasComma = /%3B/.test(item)
      ScssArr[index] = item.replace(
        new RegExp(`${lastItem}[\\s\\S]*[\\s\\S]*`),
        `${lastItem}: ${value}${hasComma ? ';' : ''}`
      )
      break
    }
  }
  ScssArr = ScssArr.map(item => decodeURIComponent(item))
  globalVarScss = ScssArr.join('\n')
}

replaceScss('$src', `"${process.env.VUE_APP_IMAGE_OSS_SRC}"`)
fs.writeFileSync(globalVarScssPath, globalVarScss, {
  flag: 'w'
})
```

:::

+ 在 `vue` 文件中使用

::: details uni.scss

``` vue
<style lang="scss" scoped>
.login-container {
  height: 100%;
  box-sizing: border-box;
  padding: 160rpx 60rpx;
  background: url('$src/login_bg.png') no-repeat center center;
  background-size: 100% 100%;
</style>
```

:::

### 自定义 webpack loader 处理，使用特定前缀引用图片路径

实现逻辑: 自定义一个 `loader`, 接受源码并处理, 返回源码, 交给 `vue-loader` 继续进行原本的处理逻辑。

+ 修改 `vue.config.js` 配置文件，在 `vue-loader` 前增加自定义 `loader` 处理内容

::: details vue.config.js

``` javascript
const path = require('path')
module.exports = {
  transpileDependencies: ['uview-ui'],
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .end()
      .use('customLoader')
      .loader(path.resolve(__dirname, './customLoader.js'))
      .end()
  }
}
```

:::

+ 创建 `customLoader.js` 使用正则匹配替换 `vue` 文件中所有指定格式的图片路径前缀

::: details customLoader.js

``` javascript
module.exports = function (source) {
  return source.replace(/\$src\//g, `${process.env.VUE_APP_IMAGE_OSS_SRC}`)
}
```

:::


### 修改 vue.config.js 中 css loader 相关配置（不生效）

::: details vue.config.js

``` javascript
module.exports = {
  css: {
    // extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          $src: "${process.env.VUE_APP_IMAGE_OSS_SRC}";
        `
      }
    }
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       // 向全局 sass 样式传入共享的全局变量, $src可以配置图片 CDN 前缀
  //       // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
  //       prependData: Object.keys(globalVarScss)
  //         .map(k => `\$${k.replace('_', '-')}: ${globalVarScss[k]};`)
  //         .join('\n')
  //     }
  //   }
  // }
}
```

:::
