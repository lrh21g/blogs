# Vue 项目规范搭建

## EditorConfig

[EditorConfig](https://editorconfig.org/) 可以在不同的编辑器和 ide 中，为同一个项目工作的多个开发人员维护一致的编码风格。

::: details .editorconfig

``` bash
# .editorconfig
# https://editorconfig.org
# 表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件
root = true

# 表示所有文件适用
[*]
# 设置编码，值为 latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用 utf-8-bom
charset = utf-8
# 设置缩进风格(tab是硬缩进，space为软缩进)
indent_style = space
# 用一个整数定义的列数来设置缩进的宽度
# 如果 indent_style 为 tab，则此属性默认为 tab_width
indent_size = 2
# 设置换行符，值为lf、cr和crlf
end_of_line = lf
# 设为 true 表示使文件以一个空白行结尾
insert_final_newline = true
# 设为 true 表示会去除换行行首的任意空白字符
trim_trailing_whitespace = true

# 仅 .md 文件适用以下规则
[*.md]
# 设为 true 表示使文件以一个空白行结尾
insert_final_newline = false
# 设为 true 表示会去除换行行首的任意空白字符
trim_trailing_whitespace = false 
```

:::

## prettier

### 格式化命令

``` json
{
  "scripts": {
    "prettier": "prettier --write ."
  }
}
```

### 相关配置

::: details .prettierrc.js

``` javascript
module.exports = {
  // 一行最多 100 字符
  printWidth: 100,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾需要有分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // jsx 标签的反尖括号需要换行
  jsxBracketSameLine: false,
  // (x) => {} 箭头函数参数只有一个时是否要有小括号
  // avoid：省略括号  always：只有一个参数的时候，也需要括号
  arrowParens: 'avoid',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
}
```

:::

## ESLint

[ESLint](https://eslint.org/) 可组装的 JavaScript 和 JSX 检查工具。（ESLint中文文档 : <https://cn.eslint.org/>）

ESLint 运行原理：

+ 使用 JavaScript 解析器 `Espree` 将 JavaScript 代码解析成 `AST`（抽象语法树，Abstract Syntax Tree）
+ 深度遍历 `AST` ，监听匹配过程。在解析 `AST` 之后，ESLint 会以 "从上至下" 再 "从下至上" 的顺序遍历每个选择器两次
+ 触发监听选择器的 `rule` 回调。在深度遍历的过程中，生效的每条规则都会对其中的某一个或多个选择器进行监听，每当匹配到选择器，监听该选择器的 `rule`，都会触发对应的回调
+ 具体的检测规则等细节内容

注： [astexplorer.net](https://astexplorer.net/) 可查看代码解析为 AST

### 相关配置

#### parserOptions - 解析器配置

解析器选项可以在 `.eslintrc.*` 文件使用 `parserOptions` 属性设置。可用选项有：

+ `parser`
+ `ecmaVersion` : 默认设置为 3，5（默认）,可使用 6、7、8、9 或 10 来指定使用的 ECMAScript 版本。
+ `sourceType` : 设置为 `script` （默认） 或 `module`（如果代码是 ECMAScript 模块）
+ `allowImportExportEverywhere` : 默认情况下，`import` 和 `export` 声明只能出现在代码头部。设置该选项为 `true` 时，则允许他们在代码的任何地方使用。
+ `ecmaFeatures` : 对象，表示使用的额外的语言特性
  + `globalReturn` : 允许在全局作用域下使用 `return` 语句
  + `impliedStrict` : 启用全局 `strict mode` (严格模式，如果 ecmaVersion 是 5 或更高)
  + `jsx` : 启用 [JSX](http://facebook.github.io/jsx/)

#### extends - 集成

从基础配置中继承已启用的规则,如果是数组后面继承前面的。

`extends` 属性值：

+ 指定配置的字符串（配置文件的路径、可共享配置的名称、`eslint:recommended` 或 `eslint:all`）
  + `eslint:recommended` : 启用 ESLint 核心规则。ESLint 核心规则为在 [规则列表 Rules](https://eslint.org/docs/rules/) 中被标记为 **✔** 的规则。
  + Vue.js 2.x 相关规则配置，需安装 `eslint-plugin-vue` 插件
    + `plugin:vue/recommended` : 使用 Vue2.x 风格指南 中，规则归类为 **优先级A:必要的** 规则。
    + `plugin:vue/strongly-recommended` : 使用 Vue2.x 风格指南 中，规则归类为 **优先级 B：强烈推荐** 规则。
    + `plugin:vue/recommended` : 使用 Vue2.x 风格指南 中，规则归类为 **优先级 C：推荐** 规则。
  + Vue.js 3.x 相关规则配置，需安装 `eslint-plugin-vue` 插件
    + `plugin:vue/vue3-recommended` : 使用 Vue3.x 风格指南 中，规则归类为 **优先级A:必要的** 规则。
    + `plugin:vue/vue3-strongly-recommended` : 使用 Vue3.x 风格指南 中，规则归类为 **优先级 B：强烈推荐** 规则。
    + `plugin:vue/vue3-recommended` : 使用 Vue3.x 风格指南 中，规则归类为 **优先级 C：推荐** 规则。
  + eslint-plugin-prettier
    + `plugin:prettier/recommended`
+ 字符串数组：每个配置继承它前面的配置

`rules` 属性可以做下面的任何事情以扩展（或覆盖）规则：

+ 启用额外的规则
+ 改变继承的规则级别而不改变它的选项
+ 覆盖基础配置中的规则的选项

注：

+ [Vue2.x 风格指南](https://cn.vuejs.org/v2/style-guide/index.html)
+ [Vue3.x 风格指南](https://vue3js.cn/docs/zh/style-guide/)

#### plugins - 插件

ESLint 支持使用第三方插件。在使用插件之前，必须使用 `npm` 安装它。

相关插件：

+ [eslint-plugin-vue](https://eslint.vuejs.org/) : 用于检查 Vue.js 的 ESLint 插件
+ [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) : 用于关闭所有不必要的或可能与Prettier冲突的规则
+ [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) : 将 Prettier 作为 ESLint 规则，进行代码风格检查

#### rules - 规则

所有的规则默认都是禁用的。在配置文件中，使用 `"extends": "eslint:recommended"` 来启用推荐的规则。（在 [规则列表 Rules](https://eslint.org/docs/rules/) 中被标记为 **✔** 的规则）

#### env - 环境配置

在配置文件里指定环境，使用 `env` 关键字指定启用的环境，并设置为 `true`。常用的环境包括：

+ `browser` : 浏览器环境中的全局变量
+ `node` : Node.js 全局变量和 Node.js 作用域。
+ `es6` : 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
+ `jest` : Jest 全局变量。
+ ...

#### 命令行

`eslint [options] file.js [file.js] [dir]` 可以通过运行 `eslint -h` 查看所有选项。

`options` 相关配置如下：

+ `--fix` : 指示 ESLint 尝试修复尽可能多的问题，不是所有的问题都能使用这个选项进行修复。
+ `--ext` : 指定 ESLint 在指定目录下查找 JavaScript 文件时，要使用的文件扩展名。

``` json
{
  "scripts": {
    "lint": "eslint --fix --ext .js,.vue src"
  }
}
```

### Prettier 和 ESLint 的冲突解决

需要使用插件

+ [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) : 用于关闭所有不必要的或可能与Prettier冲突的规则
+ [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier) : 将 Prettier 作为 ESLint 规则，进行代码风格检查

相关配置如下

``` javascript
module.exports = {
  ...
  // 添加 Prettier 相关插件 - plugin:prettier/recommended
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    // 表示被 Prettier 标记的地方抛出错误信息
    'prettier/prettier': 'error',
    ...
  }
}
```

相关 ESLint 规则冲突可通过调整 ESLint 规则 Rules 进行处理。

### 配置文件示例

::: details .eslintrc.js

``` javascript
module.exports = {
  // 告知eslint是否要继续从父目录寻找配置文档，true表示停止在父级目录中寻找
  root: true,
  // 解析器选项
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module', // 设置为 "script" (默认) 或 "module"（如果代码是 ECMAScript 模块)
    allowImportExportEverywhere: true
  },
  // 环境配置
  env: {
    browser: true,
    node: true,
    es6: true
  },
  // 继承 - 从基础配置中继承已启用的规则,如果是数组后面继承前面的
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'plugin:prettier/recommended'],
  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  // 配置规则，继承或覆盖重复规则
  rules: {
    'prettier/prettier': 'error',
    // 强制执行每行的最大属性数
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false // 如果为 true，它允许属性与标签名在同一行
        }
      }
    ],
    // 要求在单行元素的内容前后都需要一个换行符
    'vue/singleline-html-element-content-newline': 'off',
    // 要求在多行元素的内容之前和之后需要一个换行符
    'vue/multiline-html-element-content-newline': 'off',
    // 改规则被弃用，由 vue/component-definition-name-casing 替代
    'vue/name-property-casing': ['error', 'PascalCase'],
    // vue/component-definition-name-casing - 强制组件定义名称的特定大小写
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    // 禁止使用v-html来防止XSS攻击
    'vue/no-v-html': 'off',
    // 禁止修改 props 的值
    'vue/no-mutating-props': 'off',
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': [
      2,
      {
        setWithoutGet: true,
        getWithoutSet: false
      }
    ],
    // 强制箭头函数的箭头前后使用一致的空格：(a) => {}
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 禁止或强制在代码块中开括号前和闭括号后有空格
    'block-spacing': [2, 'always'],
    // 强制在代码块中使用一致的大括号风格
    'brace-style': [
      2,
      '1tbs', // 大括号风格: 1tbs 、 stroustrup 、 allman
      {
        allowSingleLine: true // 允许块的开括号和闭括号在 同一行
      }
    ],
    // 强制使用骆驼拼写法命名约
    camelcase: [
      0,
      {
        properties: 'always' //  强制属性名称为驼峰风格
      }
    ],
    // 要求或禁止末尾逗号 - never：禁用末尾逗号
    'comma-dangle': [2, 'never'],
    // 强制在逗号前后使用一致的空格
    'comma-spacing': [
      2,
      {
        before: false, // 禁止在逗号前使用空格
        after: true // 要求在逗号后使用一个或多个空格
      }
    ],
    // 强制使用一致的逗号风格 - last：要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'comma-style': [2, 'last'],
    // 要求在构造函数中有 super() 的调用
    'constructor-super': 2,
    // 强制所有控制语句使用一致的括号风 - multi-line：允许在单行中省略大括号，而if、else if、else、for、while 和 do，在其他使用中依然会强制使用大括号
    curly: [2, 'multi-line'],
    // 强制在点号之前和之后一致的换行 - property：表达式中的点号操作符应该和属性在同一行
    'dot-location': [2, 'property'],
    // 要求或禁止文件末尾存在空行
    'eol-last': 2,
    // 要求使用 === 和 !== - always：强制在任何情况下都使用 === 和 !== ， 忽略 null
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // 强制 generator 函数中 * 号周围使用一致的空格
    'generator-star-spacing': [
      2,
      {
        before: true, // 在 * 和 function 关键字之间有空格，要求有空格，否则不允许有空格
        after: true // 在 * 和函数名之间有空格 (或匿名 generator 函数的左括号)，要求有空格，否则不允许有空格
      }
    ],
    // 要求回调函数中有容错处理
    'handle-callback-err': [2, '^(err|error)$'],
    // 强制使用一致的缩进
    // indent: [
    //   2,
    //   2, // 2 个空格缩进
    //   {
    //     // 强制 switch 语句中的 case 子句的缩进级别。
    //     // SwitchCase: 1 - case 子句将相对于 switch 语句缩进 2 个空格
    //     SwitchCase: 1
    //   }
    // ],
    indent: 0,
    // 强制在 JSX 属性中一致地使用双引号或单引号
    // prefer-single - 强制所有不包含单引号的 JSX 属性值使用单引号
    // 'jsx-quotes': [2, 'prefer-single'],
    'jsx-quotes': 0,
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [
      2,
      {
        beforeColon: false, // 禁止在对象字面量的键和冒号之间存在空格
        afterColon: true // 要求在对象字面量的冒号和值之间存在至少有一个空格
      }
    ],
    // 强制在关键字前后使用一致的空格
    'keyword-spacing': [
      2,
      {
        before: true, // 要求在关键字之前至少有一个空格
        after: true // 要求在关键字之后至少有一个空格
      }
    ],
    // 求构造函数首字母大写
    'new-cap': [
      2,
      {
        newIsCap: true, // 要求调用 new 操作符时有首字母大小的函数
        capIsNew: false // 要求调用首字母大写的函数时有 new 操作符
      }
    ],
    // 强制或禁止调用无参构造函数时有圆括号 - 强制括号后的新构造函数没有参数（默认）
    'new-parens': 2,
    // 禁用 Array 构造函数
    'no-array-constructor': 2,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 禁用 console
    'no-console': 'off',
    // 禁止修改类声明的变量
    'no-class-assign': 2,
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 2,
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 禁止在正则表达式中使用控制字符
    'no-control-regex': 0,
    // 禁止删除变量
    'no-delete-var': 2,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': 2,
    // 禁止使用空解构模式
    'no-empty-pattern': 2,
    // 禁用 eval()
    'no-eval': 2,
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 2,
    // 禁止扩展原生类型
    'no-extend-native': 2,
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 2,
    // 禁止不必要的布尔转换
    'no-extra-boolean-cast': 2,
    // 禁止不必要的括号 - functions：在 函数表达式周围禁止不必要的圆括号
    'no-extra-parens': [2, 'functions'],
    // 禁止 case 语句落空
    'no-fallthrough': 2,
    // 禁止数字字面量中使用前导和末尾小数点
    'no-floating-decimal': 2,
    // 禁止对 function 声明重新赋值
    'no-func-assign': 2,
    // 禁止使用类似 eval() 的方法
    'no-implied-eval': 2,
    // 禁止在嵌套的块中出现变量声明或 function 声明 - functions：禁止 function 声明出现在嵌套的语句块中
    'no-inner-declarations': [2, 'functions'],
    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': 2,
    // 禁止不规则的空白
    'no-irregular-whitespace': 2,
    // 禁用 __iterator__ 属性
    'no-iterator': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    // 禁用标签语句
    'no-labels': [
      2,
      {
        allowLoop: false, // 如果这个选项被设置为 true，该规则忽略循环语句中的标签
        allowSwitch: false // 如果这个选项被设置为 true，该规则忽略 switch 语句中的标签
      }
    ],
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止使用多行字符串
    'no-multi-str': 2,
    // 禁止出现多行空行
    'no-multiple-empty-lines': [
      2,
      {
        max: 1 // 强制最大连续空行数
      }
    ],
    // 在 ESLint v3.3.0 中已弃用，并由 no-global-assign 规则取代
    'no-native-reassign': 2,
    // 禁止对原生对象或只读的全局对象进行赋值
    'no-global-assign': 2,
    // 在 ESLint v3.3.0  中已弃用，并由 no-unsafe-negation 规则取代
    'no-negated-in-lhs': 2,
    // 禁止对关系运算符的左操作数使用否定操作符
    'no-unsafe-negation': 2,
    // 禁用 Object 的构造函数
    'no-new-object': 2,
    // 禁止调用 require 时使用 new 操作符
    'no-new-require': 2,
    // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-symbol': 2,
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 2,
    // 禁止把全局对象作为函数调用
    'no-obj-calls': 2,
    // 禁用八进制字面量
    'no-octal': 2,
    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': 2,
    // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-path-concat': 2,
    // 禁止直接调用 Object.prototypes 的内置属性
    'no-proto': 2,
    // 禁止多次声明同一变量
    'no-redeclare': 2,
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 2,
    // 禁止在 return 语句中使用赋值语句 - except-parens：禁止出现赋值语句，除非使用括号把它们括起来
    'no-return-assign': [2, 'except-parens'],
    // 禁止自我赋值
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    // 禁用逗号操作符
    'no-sequences': 2,
    // 禁止将标识符定义为受限的名字
    'no-shadow-restricted-names': 2,
    // 在 ESLint v3.3.0 中已弃用，并由 func-call-spacing 规则取代
    'no-spaced-func': 2,
    // 要求或禁止在函数标识符和其调用之间有空格 - never"(默认) 禁止在函数名和开括号之间有空格
    'func-call-spacing': 2,
    // 禁用稀疏数组
    'no-sparse-arrays': 2,
    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-this-before-super': 2,
    // 禁止抛出异常字面量
    'no-throw-literal': 2,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 2,
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止出现令人困惑的多行表达式
    'no-unexpected-multiline': 2,
    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 2,
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false // 禁止条件表达式作为默认的赋值模式
      }
    ],
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 2,
    // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-finally': 2,
    // 禁止出现未使用过的变量
    'no-unused-vars': [
      2,
      {
        vars: 'all', // all - 检测所有变量，包括全局环境中的变量
        args: 'none' // none - 不检查参数
      }
    ],
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 2,
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 2,
    // 禁用不必要的构造函数
    'no-useless-constructor': 2,
    // 禁用不必要的转义字符
    'no-useless-escape': 0,
    // 禁止属性前有空白
    'no-whitespace-before-property': 2,
    // 禁用 with 语句
    'no-with': 2,
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': [
      2,
      {
        initialized: 'never' // 要求每个作用域的初始化的变量有多个变量声明
      }
    ],
    // 强制操作符使用一致的换行符
    'operator-linebreak': [
      2,
      'after', // 要求把换行符放在操作符后面
      {
        // 覆盖对指定的操作的全局设置
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    // 要求或禁止块内填充 - never：禁止块语句和类的开始或末尾有空行
    'padded-blocks': [2, 'never'],
    // 强制使用一致的反勾号、双引号或单引号
    quotes: [
      2,
      'single', // 要求尽可能地使用单引号
      {
        avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
        allowTemplateLiterals: true // 允许字符串使用反勾号
      }
    ],
    // 要求或禁止使用分号代替 ASI - never：禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
    semi: [2, 'never'],
    // 强制分号之前和之后使用一致的空格
    'semi-spacing': [
      2,
      {
        before: false, // 分号之前禁止有空格
        after: true // 分号之后强制有空格
      }
    ],
    // 强制在块之前使用一致的空格 - always：块语句必须总是至少有一个前置空格
    'space-before-blocks': [2, 'always'],
    // 'space-before-function-paren': [
    //   2,
    //   {
    //     anonymous: 'always',
    //     named: 'always',
    //     asyncArrow: 'always'
    //   }
    // ],
    // 强制在 function的左括号之前使用一致的空格 - never：禁止在参数的 ( 前面有空格
    // 'space-before-function-paren': [2, 'never'],
    'space-before-function-paren': 0,
    // 强制在圆括号内使用一致的空格 - never：强制圆括号内没有空格
    'space-in-parens': [2, 'never'],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': [
      2,
      {
        words: true, // 适用于单词类一元操作符，操作符之后禁用空格。例如：new、delete、typeof、void、yield
        nonwords: false // 操作符左右要求有空格，适用于这些一元操作符: -、+、--、++、!、!!
      }
    ],
    // 强制在注释中 // 或 /* 使用一致的空格
    'spaced-comment': [
      2,
      'always', // // 或 /* 必须跟随至少一个空白
      {
        markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
      }
    ],
    // 要求或禁止模板字符串中的嵌入表达式周围空格的使用 - never (默认) ：禁止花括号内出现空格
    'template-curly-spacing': [2, 'never'],
    // 要求使用 isNaN() 检查 NaN
    'use-isnan': 2,
    // 强制 typeof 表达式与有效的字符串进行比较
    'valid-typeof': 2,
    // 要求 IIFE 使用括号括起来 - any：强制总是包裹，但允许其它风格。
    'wrap-iife': [2, 'any'],
    // 强制在 yield* 表达式中 * 周围使用空格
    'yield-star-spacing': [2, 'both'],
    // 要求或禁止 “Yoda” 条件
    yoda: [2, 'never'],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 2,
    // 	禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 强制在大括号中使用一致的空格
    'object-curly-spacing': [
      2,
      'always', // 要求花括号内有空格 (除了 {})
      {
        objectsInObjects: true // 要求以对象元素开始或结尾的对象的花括号中有空格 (当第一个选项为 always 时生效)
      }
    ],
    // 强制数组方括号中使用一致的空格 - never：禁止在数组括号内出现空格
    'array-bracket-spacing': [2, 'never']
  }
}
```

:::

::: details .eslintignore

``` txt
build/*.js
src/assets
public
dist
```

:::

## stylelint

[stylelint](https://stylelint.io/) 一个强大的，现代的代码检查工具，可以避免错误并在样式中强制执行约定。（stylelint中文文档 : <https://stylelint.docschina.org/>）

### 相关插件

+ `stylelint-config-standard` : stylelint 标准(standard)配置
+ `stylelint-config-css-modules` : 调整stylesint规则以接受css模块特定的语法。
+ `stylelint-config-rational-order` : 一个用于规范css属性写作顺序的规则集成。配合stylelint-order插件使用。
+ `stylelint-config-prettier` : 关闭所有不必要的或可能与 Prettier 冲突的规则
+ `stylelint-no-unsupported-browser-features` : 检查正在使用的 CSS 是否被目标浏览器支持
+ `stylelint-order` : 用于规范样式属性写作顺序的插件
+ `stylelint-declaration-block-no-ignored-properties` : 用于提示写矛盾的样式。例如：`{ display: inline; width: 100px; }`

### 相关配置

+ [stylelint 规则](https://stylelint.docschina.org/user-guide/rules/)
+ 命令行使用

  ``` json
  {
    "scripts": {
      "stylelint": "stylelint 'src/**/*.{vue,scss,css}' --fix"
    }
  }
  ```

### 配置文件示例

::: details .stylelintrc.js

``` javascript
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-css-modules',
    'stylelint-config-rational-order',
    'stylelint-config-prettier',
    'stylelint-no-unsupported-browser-features'
  ],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  rules: {
    // 禁止低优先级的选择器出现在高优先级的选择器之后
    'no-descending-specificity': null,
    // https://github.com/stylelint/stylelint/issues/4114
    // 允许在 calc 函数中使用无效的表达式
    'function-calc-no-invalid': null,
    // 要求或禁止 url 使用引号
    'function-url-quotes': 'always',
    // 禁止字体家族名称列表中缺少通用家族
    'font-family-no-missing-generic-family-keyword': null,
    'plugin/declaration-block-no-ignored-properties': true,
    // 禁止未知单位
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }]
  }
}
```

:::

## 相关参考

+ [ESLint](https://eslint.org/)
+ [ESLint中文文档](https://cn.eslint.org/)
+ [stylelint](https://stylelint.io/)
+ [stylelint中文文档](https://stylelint.docschina.org/)
+ [从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境](https://juejin.cn/post/6951649464637636622)
+ [一键格式化代码带来的快感 | 你还在为每个项目配置Stylelint和Eslint吗](https://mp.weixin.qq.com/s/nWpD2uXgoxYHNDtWW1W3yw)
+ [Prettier的配置文件](https://jsweibo.github.io/2019/10/17/Prettier%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/)
