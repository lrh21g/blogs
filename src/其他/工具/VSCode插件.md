# Visual Studio Code

## 快捷键

<kbd>Ctrl</kbd> + <kbd>K</kbd> <kbd>Ctrl</kbd> + <kbd>S</kbd> 打开快捷键列表

+ <kbd>Ctrl</kbd> + <kbd>P</kbd>：转到文件
+ <kbd>Ctrl</kbd> + <kbd>`</kbd>：在 VS Code 中打开 terminal
+ <kbd>Alt</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>：代码格式化（推荐使用 Prettier）
+ <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>↑ / ↓</kbd>：向上/下同时编辑
  
  可在属性的单词前添加好同时编辑鼠标点后，可配合 <kbd>Ctrl</kbd> + <kbd>→</kbd> 使用跳转到行末
+ <kbd>Shift</kbd> + <kbd>Alt</kbd>：多行选中同时编辑
+ <kbd>Alt</kbd> + <kbd>Down</kbd>：下移一行
+ <kbd>Alt</kbd> + <kbd>Up</kbd>：上移一行
+ <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Down</kbd>：向下复制行
+ <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>Up</kbd>：向上复制行
+ <kbd>Ctrl</kbd> + <kbd>D</kbd>：将选定的字符移动到下一个匹配字符串上
+ <kbd>Ctrl</kbd> + <kbd>Space</kbd>：触发建议
+ <kbd>Ctrl </kbd> + <kbd>Shift</kbd> + <kbd>T</kbd>：重新打开最新关闭的窗口

## 字体

`JetBrains Mono` 带有连字支持的免费字体。

## 基础配置

``` json
{
  // ==================== 【search 查找】 ====================
  "search.followSymlinks": false,
  // 配置glob模式以在全文本搜索和快速打开中排除文件和文件夹
  "search.exclude": {
    "**/node_modules": false,
    "**/bower_components": true,
    "**/*.code-search": true
  },
  // ==================== 【search 查找】 ====================
  // ==================== 【files 文件】 ====================
  "files.autoSave": "onFocusChange", // 当编辑器失去焦点时，将自动保存未保存的编辑器
  // 配置语言的文件关联 (如: "*.extension": "html")。这些关联的优先级高于已安装语言的默认关联
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  // ==================== 【files 文件】 ====================
  // ==================== 【editor 文本编辑器】 ====================
  "workbench.colorTheme": "One Dark Pro", // 指定用在工作台中的颜色主题
  "workbench.iconTheme": "vscode-icons", // 指定工作台中使用的文件图标主题
  "workbench.colorCustomizations": {
    // 编辑器活动缩进参考线的颜色
    "editorIndentGuide.activeBackground": "#00ffea"
  },
  "editor.fontFamily": "'JetBrains Mono', Consolas, 'Courier New', monospace", // 控制字体系列
  "editor.fontLigatures": true, // 启用/禁用字体连字("calt" 和 "liga" 字体特性)。将此更改为字符串，可对 "font-feature-settings" CSS 属性进行精细控制。
  "editor.fontSize": 14, // 控制字体大小(像素)
  "editor.lineHeight": 22, // 控制行高。为 0 时则通过字体大小自动计算
  "editor.letterSpacing": 0.5, // 控制字母间距（像素）
  "editor.fontWeight": "400", // 控制字体粗细。接受关键字“正常”和“加粗”，或者接受介于 1 至 1000 之间的数字。
  "editor.cursorStyle": "line", // 控制光标样式
  // "editor.cursorWidth": 2, // 当 #editor.cursorStyle# 设置为 line 时，控制光标的宽度。
  "editor.cursorBlinking": "solid", // 控制光标的动画样式
  "editor.tabSize": 2, // 一个制表符等于的空格数。在 #editor.detectIndentation# 启用时，根据文件内容，该设置可能会被覆盖
  "editor.suggestSelection": "first", // 控制在建议列表中如何预先选择建议
  "editor.formatOnPaste": true, // 控制编辑器是否自动格式化粘贴的内容。格式化程序必须可用，并且能针对文档中的某一范围进行格式化。
  "editor.formatOnSave": true, // 在保存时格式化文件。格式化程序必须可用，延迟后文件不能保存，并且编辑器不能关闭。
  "editor.codeActionsOnSave": {
    // 在保存时运行的代码操作类型
    "source.fixAll.eslint": true // 自动修复
  },
  "diffEditor.ignoreTrimWhitespace": true, // 启用后，差异编辑器将忽略前导空格或尾随空格中的更改
  // ==================== 【editor 文本编辑器】 ====================
  // ==================== 【Terminal 终端】 ====================
  // "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "terminal.integrated.shell.windows": "D:\\Programming\\Git\\bin\\bash.exe", // 终端在 Windows 上使用的 shell 的路径
  "terminal.integrated.fontSize": 12, // 控制终端的字号(以像素为单位)
  // ==================== 【Terminal 终端】 ====================
}
```

## 插件推荐

### Git 相关

#### GitLens - 版本管理工具

#### Git Blame - 谁写的代码

### Project Manager - 多项目管理

### Emmet - 快速编写代码

Emmet语法文档：[Emmet Documentation](https://docs.emmet.io/cheat-sheet/)

### Auto Rename Tag - 自动重命名配对标签

自动重命名配对的 HTML / XML 标签，也可以在 JSX 中使用。

``` json
{
  // ==================== 【Auto Rename Tag】 ====================
  // 设置扩展名将被激活的语言。默认情况下，它是**[“ *”]**，将为所有语言激活。
  "auto-rename-tag.activationOnLanguage": ["html", "xml", "php", "javascript"],
  // ==================== 【Auto Rename Tag】 ====================
}
```

### JavaScript (ES6) code snippets - JavaScript 代码片段

### javascript console utils - console.log相关变量

选中变量之后，按住快捷键 `Ctrl + Shift + L` console.log 变量

### Visual Studio IntelliCode - AI 辅助开发

通过 AI 赋能，根据上下文给出编程建议和智能提示，提高开发者的效率。

### Version Lens - 查看npm包版本

### Code Runner - 一键运行代码

### Quokka.js - 实时运行代码

Quokka.js 是一个用于 JavaScript 和 TypeScript 的实时运行代码平台。

### Live Server - 实时查看

### any-rule - 正则表达式

### Path Intellisense - 路径感知

### Npm Intellisense - 自动完成导入语句中的npm模块

### Vetur - Vue开发工具

``` json
{
  // 配置格式化 html 文件的时候使用 Prettier 插件
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置格式化 javascript 文件的时候使用 Prettier 插件
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置格式化 javascriptreact 文件的时候使用 Prettier 插件
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置格式化 json 文件的时候使用 Prettier 插件
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 配置格式化 vue 文件的时候使用 Prettier 插件
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 【开始】配置相关语言的默认格式化工具
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.pug": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.stylus": "stylus-supremacy",
  // 禁用vetur的JS格式化，交给eslint处理
  "vetur.format.defaultFormatter.js": "none",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatter.sass": "sass-formatter",
  // 【结束】配置相关语言的默认格式化工具
}

```

### ESLint - 代码检测工具

ESLint 官网： <https://eslint.bootcss.com/>

### Prettier - 格式化代码

Prettier 官网： <https://prettier.io/>

``` json
{
  // ==================== 【prettier】 ====================
  "prettier.singleQuote": true, // 如果为 true，将使用单引号而不是双引号
  "prettier.jsxSingleQuote": true, // 在JSX中使用单引号而不是双引号
  // ==================== 【prettier】 ====================
}
```

### EditorConfig for VS Code - 编辑器配置

EditorConfig 可以在不同编辑器和 IDE 中，维护一致的编码风格。

通配符

| 属性         | 说明                                  |
| :----------- | :------------------------------------ |
| `*`          | 匹配除/之外的任意字符串               |
| `**`         | 匹配任意字符串                        |
| `?`          | 匹配任意单个字符                      |
| `[name]`     | 匹配 name 字符                        |
| `[!name]`    | 匹配非 name 字符                      |
| `{s1,s3,s3}` | 匹配任意给定的字符串（0.11.0 起支持） |

支持属性：

``` md
# .editorconfig 文件
# 表示为根文件，不用继续往上查找
root = true

# 匹配全部文件
[*]
# 缩进风格，可选 "space"、"tab"
indent_style = space
# 缩进的空格数
indent_size = 2
# 设置整数用于指定替代 tab 的列数。默认值为 indent_size 的值，一般无需指定。
# tab_width = 2
# 结尾换行符，可选"lf"、"cr"、"crlf"
end_of_line = lf
# 设置字符集，支持 latin1、utf-8、utf-8-bom、utf-16be 和 utf-16le
charset = utf-8
# 删除一行中的前后空格
trim_trailing_whitespace = true
# 在文件结尾插入新行
insert_final_newline = true

# 匹配 .md 文件
[*.md]
# 删除一行中的前后空格
trim_trailing_whitespace = false
```

### Manta's Stylus Supremacy - 格式化Stylus

``` json
{
  "stylusSupremacy.insertColons": false, // 是否插入冒号（默认是true）
  "stylusSupremacy.insertSemicolons": false, // 是否插入分号
  "stylusSupremacy.insertBraces": false, // 是否插入大括号
  "stylusSupremacy.insertNewLineAroundImports": false, // import之后是否换行
  "stylusSupremacy.insertNewLineAroundBlocks": false, // 两个选择器中是否换行
}
```

### Better Align - 代码对齐

### koroFileHeader - 注释

在 VS code 中用于生成文件头部注释和函数注释的插件。

``` json
// ==================== 【koroFileHeader】 ====================
  // https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
  "fileheader.configObj": {
    "autoAdd": false, // 自动添加头部注释开启才能自动添加
    "autoAlready": false // 默认开启
  },
  // 头部注释
  "fileheader.customMade": {},
  // 函数注释
  "fileheader.cursorMode": {},
  // ==================== 【koroFileHeader】 ====================
```

### Indent Rainbow - 颜色区分缩进

### Highlight Matching Tag - 实时高亮匹配标签

### DotENV - 高亮显示.env文件中键值对

### Bracket Pair Colorizer 2 - 不同颜色高亮显示匹配的括号

``` json
{
  "workbench.colorCustomizations": {
    // 编辑器活动缩进参考线的颜色
    "editorIndentGuide.activeBackground": "#00ffea"
  },
}
```

### Color Highlight - 高亮颜色

### Image preview - 图片预览

### SVG Viewer - SVG 查看

### CSS Peek - CSS样式查看器

### Partial Diff - 文件比较

### Drow.io Integration - 绘图

### Polacode-2020 - 代码转换为图片

### Power Mode - 敲代码特效

``` json
{
  // ==================== 【Power Mode】 ====================
  "powermode.enabled": true, // 开启 power mode
  "powermode.enableShake": false, // 去除震动
  "powermode.presets": "particles", // 动效类型
  // ==================== 【Power Mode】 ====================
}
```
