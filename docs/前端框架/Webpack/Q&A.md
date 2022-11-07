# Webpack Q&A

## css `import` 使用 alias 相对路径

在 less, sass, stylus 中，使用 `@import "@/style/theme"` 的语法引用相对 `@` 的目录确会报错: 找不到 `@` 目录。说明 webpack 没有正确识别资源相对路径。

【原因】

css 文件会被用 `css-loader` 处理，css `@import` 后的字符串会被 `css-loader` 视为 **绝对路径** 解析，因为并没有添加 `css-loader` 的 `alias`，所以会报找不到 `@` 目录。

【解决方法】

- 直接为 `css-loader`添加 `ailas` 的路径，比较麻烦
- 在引用路径的字符串最前面添加上 `~` 符号，如 `@import "~@/style/global"`；webpack 会将以 `~` 符号作为前缀的路径视作依赖模块而去解析，这样 `@` 的 `alias` 配置就能生效了。
  - css module 中：`@import "~@/style/global"`
  - css 属性中： `background: url("~@/assets/xxx.jpg")`
  - html 标签中： `<img src="~@/assets/xxx.jpg" alt="xxx">`
