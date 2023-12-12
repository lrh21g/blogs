import{_ as p}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as l,c as i,a as n,b as s,d as e,e as t}from"./app-VLgNDF8W.js";const c={},r=n("h1",{id:"编程规范",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#编程规范","aria-hidden":"true"},"#"),s(" 编程规范")],-1),u=n("h2",{id:"editorconfig",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#editorconfig","aria-hidden":"true"},"#"),s(" EditorConfig")],-1),d={href:"https://editorconfig.org/",target:"_blank",rel:"noopener noreferrer"},m=t(`<p>如果使用 Visual Studio Code 编辑器，需要安装 EditorConfig for VS Code 插件。</p><details class="hint-container details"><summary>.editorconfig</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># .editorconfig</span>
<span class="token comment"># https://editorconfig.org</span>
<span class="token comment"># 表示是最顶层的配置文件，发现设为true时，才会停止查找.editorconfig文件</span>
root <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token comment"># 表示所有文件适用</span>
<span class="token punctuation">[</span>*<span class="token punctuation">]</span>
<span class="token comment"># 设置编码，值为 latin1、utf-8、utf-8-bom、utf-16be和utf-16le，不建议使用 utf-8-bom</span>
charset <span class="token operator">=</span> utf-8
<span class="token comment"># 设置缩进风格(tab是硬缩进，space为软缩进)</span>
indent_style <span class="token operator">=</span> space
<span class="token comment"># 用一个整数定义的列数来设置缩进的宽度</span>
<span class="token comment"># 如果 indent_style 为 tab，则此属性默认为 tab_width</span>
indent_size <span class="token operator">=</span> <span class="token number">2</span>
<span class="token comment"># 设置换行符，值为lf、cr和crlf</span>
end_of_line <span class="token operator">=</span> lf
<span class="token comment"># 设为 true 表示使文件以一个空白行结尾</span>
insert_final_newline <span class="token operator">=</span> <span class="token boolean">true</span>
<span class="token comment"># 设为 true 表示会去除换行行首的任意空白字符</span>
trim_trailing_whitespace <span class="token operator">=</span> <span class="token boolean">true</span>

<span class="token comment"># 仅 .md 文件适用以下规则</span>
<span class="token punctuation">[</span>*.md<span class="token punctuation">]</span>
<span class="token comment"># 设为 true 表示使文件以一个空白行结尾</span>
insert_final_newline <span class="token operator">=</span> <span class="token boolean">false</span>
<span class="token comment"># 设为 true 表示会去除换行行首的任意空白字符</span>
trim_trailing_whitespace <span class="token operator">=</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="prettier" tabindex="-1"><a class="header-anchor" href="#prettier" aria-hidden="true">#</a> Prettier</h2><p>Prettier 可用于格式化代码，支持多种语言。</p><p>如果使用 Visual Studio Code 编辑器，需要安装 <code>Prettier - Code formatter</code> 插件。</p><h3 id="prettier-安装" tabindex="-1"><a class="header-anchor" href="#prettier-安装" aria-hidden="true">#</a> Prettier 安装</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> i <span class="token parameter variable">-D</span> prettier
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="prettier-命令" tabindex="-1"><a class="header-anchor" href="#prettier-命令" aria-hidden="true">#</a> Prettier 命令</h3><p>格式化所有文件（<code>·</code> 标识所有文件）命令如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;prettier&quot;</span><span class="token operator">:</span> <span class="token string">&quot;prettier --write .&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prettier-配置" tabindex="-1"><a class="header-anchor" href="#prettier-配置" aria-hidden="true">#</a> Prettier 配置</h3><details class="hint-container details"><summary>.prettierrc.js</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 一行最多 100 字符</span>
  <span class="token literal-property property">printWidth</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用 2 个空格缩进</span>
  <span class="token literal-property property">tabWidth</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token comment">// 不使用缩进符，而使用空格</span>
  <span class="token literal-property property">useTabs</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 行尾需要有分号</span>
  <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用单引号</span>
  <span class="token literal-property property">singleQuote</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 对象的 key 仅在必要时用引号</span>
  <span class="token literal-property property">quoteProps</span><span class="token operator">:</span> <span class="token string">&#39;as-needed&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// jsx 不使用单引号，而使用双引号</span>
  <span class="token literal-property property">jsxSingleQuote</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 末尾不需要逗号</span>
  <span class="token literal-property property">trailingComma</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 大括号内的首尾需要空格</span>
  <span class="token literal-property property">bracketSpacing</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// jsx 标签的反尖括号需要换行</span>
  <span class="token literal-property property">jsxBracketSameLine</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// (x) =&gt; {} 箭头函数参数只有一个时是否要有小括号</span>
  <span class="token comment">// avoid：省略括号  always：只有一个参数的时候，也需要括号</span>
  <span class="token literal-property property">arrowParens</span><span class="token operator">:</span> <span class="token string">&#39;avoid&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 每个文件格式化的范围是文件的全部内容</span>
  <span class="token literal-property property">rangeStart</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rangeEnd</span><span class="token operator">:</span> <span class="token number">Infinity</span><span class="token punctuation">,</span>
  <span class="token comment">// 不需要写文件开头的 @prettier</span>
  <span class="token literal-property property">requirePragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 不需要自动在文件开头插入 @prettier</span>
  <span class="token literal-property property">insertPragma</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用默认的折行标准</span>
  <span class="token literal-property property">proseWrap</span><span class="token operator">:</span> <span class="token string">&#39;preserve&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 根据显示样式决定 html 要不要折行</span>
  <span class="token literal-property property">htmlWhitespaceSensitivity</span><span class="token operator">:</span> <span class="token string">&#39;css&#39;</span><span class="token punctuation">,</span>
  <span class="token comment">// 换行符使用 lf</span>
  <span class="token literal-property property">endOfLine</span><span class="token operator">:</span> <span class="token string">&#39;lf&#39;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint" aria-hidden="true">#</a> ESLint</h2>`,13),k={href:"https://eslint.org/",target:"_blank",rel:"noopener noreferrer"},v={href:"https://cn.eslint.org/",target:"_blank",rel:"noopener noreferrer"},b=t("<p>ESLint 运行原理：</p><ul><li>使用 JavaScript 解析器 <code>Espree</code> 将 JavaScript 代码解析成 <code>AST</code>（抽象语法树，Abstract Syntax Tree）</li><li>深度遍历 <code>AST</code> ，监听匹配过程。在解析 <code>AST</code> 之后，ESLint 会以 &quot;从上至下&quot; 再 &quot;从下至上&quot; 的顺序遍历每个选择器两次</li><li>触发监听选择器的 <code>rule</code> 回调。在深度遍历的过程中，生效的每条规则都会对其中的某一个或多个选择器进行监听，每当匹配到选择器，监听该选择器的 <code>rule</code>，都会触发对应的回调</li><li>具体的检测规则等细节内容</li></ul>",2),g={href:"https://astexplorer.net/",target:"_blank",rel:"noopener noreferrer"},y=n("h3",{id:"eslint-配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#eslint-配置","aria-hidden":"true"},"#"),s(" ESLint 配置")],-1),h=n("h4",{id:"parseroptions-解析器配置",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#parseroptions-解析器配置","aria-hidden":"true"},"#"),s(" parserOptions - 解析器配置")],-1),f=n("p",null,[s("解析器选项可以在 "),n("code",null,".eslintrc.*"),s(" 文件使用 "),n("code",null,"parserOptions"),s(" 属性设置。可用选项有：")],-1),_=t("<li><code>parser</code></li><li><code>ecmaVersion</code> : 默认设置为 3，5（默认）,可使用 6、7、8、9 或 10 来指定使用的 ECMAScript 版本。</li><li><code>sourceType</code> : 设置为 <code>script</code> （默认） 或 <code>module</code>（如果代码是 ECMAScript 模块）</li><li><code>allowImportExportEverywhere</code> : 默认情况下，<code>import</code> 和 <code>export</code> 声明只能出现在代码头部。设置该选项为 <code>true</code> 时，则允许他们在代码的任何地方使用。</li>",4),x=n("code",null,"ecmaFeatures",-1),w=n("li",null,[n("code",null,"globalReturn"),s(" : 允许在全局作用域下使用 "),n("code",null,"return"),s(" 语句")],-1),j=n("li",null,[n("code",null,"impliedStrict"),s(" : 启用全局 "),n("code",null,"strict mode"),s(" (严格模式，如果 ecmaVersion 是 5 或更高)")],-1),q=n("code",null,"jsx",-1),S={href:"http://facebook.github.io/jsx/",target:"_blank",rel:"noopener noreferrer"},E=n("h4",{id:"extends-集成",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#extends-集成","aria-hidden":"true"},"#"),s(" extends - 集成")],-1),z=n("p",null,"从基础配置中继承已启用的规则,如果是数组后面继承前面的。",-1),C=n("p",null,[n("code",null,"extends"),s(" 属性值：")],-1),A=n("code",null,"eslint:recommended",-1),L=n("code",null,"eslint:all",-1),P=n("code",null,"eslint:recommended",-1),B={href:"https://eslint.org/docs/rules/",target:"_blank",rel:"noopener noreferrer"},N=n("strong",null,"✔",-1),V=t("<li>Vue.js 2.x 相关规则配置，需安装 <code>eslint-plugin-vue</code> 插件 <ul><li><code>plugin:vue/recommended</code> : 使用 Vue2.x 风格指南 中，规则归类为 <strong>优先级A:必要的</strong> 规则。</li><li><code>plugin:vue/strongly-recommended</code> : 使用 Vue2.x 风格指南 中，规则归类为 <strong>优先级 B：强烈推荐</strong> 规则。</li><li><code>plugin:vue/recommended</code> : 使用 Vue2.x 风格指南 中，规则归类为 <strong>优先级 C：推荐</strong> 规则。</li></ul></li><li>Vue.js 3.x 相关规则配置，需安装 <code>eslint-plugin-vue</code> 插件 <ul><li><code>plugin:vue/vue3-recommended</code> : 使用 Vue3.x 风格指南 中，规则归类为 <strong>优先级A:必要的</strong> 规则。</li><li><code>plugin:vue/vue3-strongly-recommended</code> : 使用 Vue3.x 风格指南 中，规则归类为 <strong>优先级 B：强烈推荐</strong> 规则。</li><li><code>plugin:vue/vue3-recommended</code> : 使用 Vue3.x 风格指南 中，规则归类为 <strong>优先级 C：推荐</strong> 规则。</li></ul></li><li>eslint-plugin-prettier <ul><li><code>plugin:prettier/recommended</code></li></ul></li>",3),$=n("li",null,"字符串数组：每个配置继承它前面的配置",-1),T=n("p",null,[n("code",null,"rules"),s(" 属性可以做下面的任何事情以扩展（或覆盖）规则：")],-1),I=n("ul",null,[n("li",null,"启用额外的规则"),n("li",null,"改变继承的规则级别而不改变它的选项"),n("li",null,"覆盖基础配置中的规则的选项")],-1),H=n("p",null,"注：",-1),G={href:"https://cn.vuejs.org/v2/style-guide/index.html",target:"_blank",rel:"noopener noreferrer"},O={href:"https://vue3js.cn/docs/zh/style-guide/",target:"_blank",rel:"noopener noreferrer"},D=n("h4",{id:"plugins-插件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#plugins-插件","aria-hidden":"true"},"#"),s(" plugins - 插件")],-1),F=n("p",null,[s("ESLint 支持使用第三方插件。在使用插件之前，必须使用 "),n("code",null,"npm"),s(" 安装它。")],-1),W=n("p",null,"相关插件：",-1),R={href:"https://eslint.vuejs.org/",target:"_blank",rel:"noopener noreferrer"},J={href:"https://github.com/prettier/eslint-config-prettier",target:"_blank",rel:"noopener noreferrer"},M={href:"https://github.com/prettier/eslint-plugin-prettier",target:"_blank",rel:"noopener noreferrer"},X=n("h4",{id:"rules-规则",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#rules-规则","aria-hidden":"true"},"#"),s(" rules - 规则")],-1),U=n("code",null,'"extends": "eslint:recommended"',-1),K={href:"https://eslint.org/docs/rules/",target:"_blank",rel:"noopener noreferrer"},Q=n("strong",null,"✔",-1),Y=t(`<h4 id="env-环境配置" tabindex="-1"><a class="header-anchor" href="#env-环境配置" aria-hidden="true">#</a> env - 环境配置</h4><p>在配置文件里指定环境，使用 <code>env</code> 关键字指定启用的环境，并设置为 <code>true</code>。常用的环境包括：</p><ul><li><code>browser</code> : 浏览器环境中的全局变量</li><li><code>node</code> : Node.js 全局变量和 Node.js 作用域。</li><li><code>es6</code> : 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）</li><li><code>jest</code> : Jest 全局变量。</li><li>...</li></ul><h4 id="命令行" tabindex="-1"><a class="header-anchor" href="#命令行" aria-hidden="true">#</a> 命令行</h4><p><code>eslint [options] file.js [file.js] [dir]</code> 可以通过运行 <code>eslint -h</code> 查看所有选项。</p><p><code>options</code> 相关配置如下：</p><ul><li><code>--fix</code> : 指示 ESLint 尝试修复尽可能多的问题，不是所有的问题都能使用这个选项进行修复。</li><li><code>--ext</code> : 指定 ESLint 在指定目录下查找 JavaScript 文件时，要使用的文件扩展名。</li></ul><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;lint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;eslint --fix --ext .js,.vue src&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="prettier-和-eslint-的冲突解决" tabindex="-1"><a class="header-anchor" href="#prettier-和-eslint-的冲突解决" aria-hidden="true">#</a> Prettier 和 ESLint 的冲突解决</h3><p>需要使用插件</p>`,10),Z={href:"https://github.com/prettier/eslint-config-prettier",target:"_blank",rel:"noopener noreferrer"},nn={href:"https://github.com/prettier/eslint-plugin-prettier",target:"_blank",rel:"noopener noreferrer"},sn=t(`<p>相关配置如下</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>
  <span class="token comment">// 添加 Prettier 相关插件 - plugin:prettier/recommended</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;plugin:vue/recommended&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;eslint:recommended&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;plugin:prettier/recommended&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 表示被 Prettier 标记的地方抛出错误信息</span>
    <span class="token string-property property">&#39;prettier/prettier&#39;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
    <span class="token operator">...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>相关 ESLint 规则冲突可通过调整 ESLint 规则 Rules 进行处理。</p><h3 id="eslint-配置示例" tabindex="-1"><a class="header-anchor" href="#eslint-配置示例" aria-hidden="true">#</a> ESLint 配置示例</h3><details class="hint-container details"><summary>.eslintrc.js</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 告知eslint是否要继续从父目录寻找配置文档，true表示停止在父级目录中寻找</span>
  <span class="token literal-property property">root</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token comment">// 解析器选项</span>
  <span class="token literal-property property">parserOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">parser</span><span class="token operator">:</span> <span class="token string">&#39;babel-eslint&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">sourceType</span><span class="token operator">:</span> <span class="token string">&#39;module&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 设置为 &quot;script&quot; (默认) 或 &quot;module&quot;（如果代码是 ECMAScript 模块)</span>
    <span class="token literal-property property">allowImportExportEverywhere</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 环境配置</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">browser</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">node</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token literal-property property">es6</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 继承 - 从基础配置中继承已启用的规则,如果是数组后面继承前面的</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;plugin:vue/recommended&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;eslint:recommended&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;plugin:prettier/recommended&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// add your custom rules here</span>
  <span class="token comment">// it is base on https://github.com/vuejs/eslint-config-vue</span>
  <span class="token comment">// 配置规则，继承或覆盖重复规则</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token string-property property">&#39;prettier/prettier&#39;</span><span class="token operator">:</span> <span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制执行每行的最大属性数</span>
    <span class="token string-property property">&#39;vue/max-attributes-per-line&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">singleline</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token literal-property property">multiline</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token literal-property property">max</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
          <span class="token literal-property property">allowFirstLine</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 如果为 true，它允许属性与标签名在同一行</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求在单行元素的内容前后都需要一个换行符</span>
    <span class="token string-property property">&#39;vue/singleline-html-element-content-newline&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求在多行元素的内容之前和之后需要一个换行符</span>
    <span class="token string-property property">&#39;vue/multiline-html-element-content-newline&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 改规则被弃用，由 vue/component-definition-name-casing 替代</span>
    <span class="token string-property property">&#39;vue/name-property-casing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;PascalCase&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// vue/component-definition-name-casing - 强制组件定义名称的特定大小写</span>
    <span class="token string-property property">&#39;vue/component-definition-name-casing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;PascalCase&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用v-html来防止XSS攻击</span>
    <span class="token string-property property">&#39;vue/no-v-html&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止修改 props 的值</span>
    <span class="token string-property property">&#39;vue/no-mutating-props&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制 getter 和 setter 在对象中成对出现</span>
    <span class="token string-property property">&#39;accessor-pairs&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">setWithoutGet</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">getWithoutSet</span><span class="token operator">:</span> <span class="token boolean">false</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制箭头函数的箭头前后使用一致的空格：(a) =&gt; {}</span>
    <span class="token string-property property">&#39;arrow-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">before</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">after</span><span class="token operator">:</span> <span class="token boolean">true</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止或强制在代码块中开括号前和闭括号后有空格</span>
    <span class="token string-property property">&#39;block-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在代码块中使用一致的大括号风格</span>
    <span class="token string-property property">&#39;brace-style&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&#39;1tbs&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 大括号风格: 1tbs 、 stroustrup 、 allman</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">allowSingleLine</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 允许块的开括号和闭括号在 同一行</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用骆驼拼写法命名约</span>
    <span class="token literal-property property">camelcase</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">0</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">properties</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span> <span class="token comment">//  强制属性名称为驼峰风格</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止末尾逗号 - never：禁用末尾逗号</span>
    <span class="token string-property property">&#39;comma-dangle&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在逗号前后使用一致的空格</span>
    <span class="token string-property property">&#39;comma-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">before</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 禁止在逗号前使用空格</span>
        <span class="token literal-property property">after</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 要求在逗号后使用一个或多个空格</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用一致的逗号风格 - last：要求逗号放在数组元素、对象属性或变量声明之后，且在同一行</span>
    <span class="token string-property property">&#39;comma-style&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;last&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求在构造函数中有 super() 的调用</span>
    <span class="token string-property property">&#39;constructor-super&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制所有控制语句使用一致的括号风格 - multi-line：允许在单行中省略大括号，而if、else if、else、for、while 和 do，在其他使用中依然会强制使用大括号</span>
    <span class="token literal-property property">curly</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;multi-line&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在点号之前和之后一致的换行 - property：表达式中的点号操作符应该和属性在同一行</span>
    <span class="token string-property property">&#39;dot-location&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;property&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止文件末尾存在空行</span>
    <span class="token string-property property">&#39;eol-last&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用 === 和 !== - always：强制在任何情况下都使用 === 和 !== ， 忽略 null</span>
    <span class="token literal-property property">eqeqeq</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;error&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token keyword">null</span><span class="token operator">:</span> <span class="token string">&#39;ignore&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制 generator 函数中 * 号周围使用一致的空格</span>
    <span class="token string-property property">&#39;generator-star-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">before</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 在 * 和 function 关键字之间有空格，要求有空格，否则不允许有空格</span>
        <span class="token literal-property property">after</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 在 * 和函数名之间有空格 (或匿名 generator 函数的左括号)，要求有空格，否则不允许有空格</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求回调函数中有容错处理</span>
    <span class="token string-property property">&#39;handle-callback-err&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;^(err|error)$&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用一致的缩进</span>
    <span class="token comment">// indent: [</span>
    <span class="token comment">//   2,</span>
    <span class="token comment">//   2, // 2 个空格缩进</span>
    <span class="token comment">//   {</span>
    <span class="token comment">//     // 强制 switch 语句中的 case 子句的缩进级别。</span>
    <span class="token comment">//     // SwitchCase: 1 - case 子句将相对于 switch 语句缩进 2 个空格</span>
    <span class="token comment">//     SwitchCase: 1</span>
    <span class="token comment">//   }</span>
    <span class="token comment">// ],</span>
    <span class="token literal-property property">indent</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在 JSX 属性中一致地使用双引号或单引号</span>
    <span class="token comment">// prefer-single - 强制所有不包含单引号的 JSX 属性值使用单引号</span>
    <span class="token comment">// &#39;jsx-quotes&#39;: [2, &#39;prefer-single&#39;],</span>
    <span class="token string-property property">&#39;jsx-quotes&#39;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在对象字面量的属性中键和值之间使用一致的间距</span>
    <span class="token string-property property">&#39;key-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">beforeColon</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 禁止在对象字面量的键和冒号之间存在空格</span>
        <span class="token literal-property property">afterColon</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 要求在对象字面量的冒号和值之间存在至少有一个空格</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在关键字前后使用一致的空格</span>
    <span class="token string-property property">&#39;keyword-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">before</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 要求在关键字之前至少有一个空格</span>
        <span class="token literal-property property">after</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 要求在关键字之后至少有一个空格</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 求构造函数首字母大写</span>
    <span class="token string-property property">&#39;new-cap&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">newIsCap</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 要求调用 new 操作符时有首字母大小的函数</span>
        <span class="token literal-property property">capIsNew</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 要求调用首字母大写的函数时有 new 操作符</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制或禁止调用无参构造函数时有圆括号 - 强制括号后的新构造函数没有参数（默认）</span>
    <span class="token string-property property">&#39;new-parens&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 Array 构造函数</span>
    <span class="token string-property property">&#39;no-array-constructor&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 arguments.caller 或 arguments.callee</span>
    <span class="token string-property property">&#39;no-caller&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 console</span>
    <span class="token string-property property">&#39;no-console&#39;</span><span class="token operator">:</span> <span class="token string">&#39;off&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止修改类声明的变量</span>
    <span class="token string-property property">&#39;no-class-assign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止条件表达式中出现赋值操作符</span>
    <span class="token string-property property">&#39;no-cond-assign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止修改 const 声明的变量</span>
    <span class="token string-property property">&#39;no-const-assign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在正则表达式中使用控制字符</span>
    <span class="token string-property property">&#39;no-control-regex&#39;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止删除变量</span>
    <span class="token string-property property">&#39;no-delete-var&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 function 定义中出现重名参数</span>
    <span class="token string-property property">&#39;no-dupe-args&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止类成员中出现重复的名称</span>
    <span class="token string-property property">&#39;no-dupe-class-members&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对象字面量中出现重复的 key</span>
    <span class="token string-property property">&#39;no-dupe-keys&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现重复的 case 标签</span>
    <span class="token string-property property">&#39;no-duplicate-case&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在正则表达式中使用空字符集</span>
    <span class="token string-property property">&#39;no-empty-character-class&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用空解构模式</span>
    <span class="token string-property property">&#39;no-empty-pattern&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 eval()</span>
    <span class="token string-property property">&#39;no-eval&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 catch 子句的参数重新赋值</span>
    <span class="token string-property property">&#39;no-ex-assign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止扩展原生类型</span>
    <span class="token string-property property">&#39;no-extend-native&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的 .bind() 调用</span>
    <span class="token string-property property">&#39;no-extra-bind&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的布尔转换</span>
    <span class="token string-property property">&#39;no-extra-boolean-cast&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的括号 - functions：在 函数表达式周围禁止不必要的圆括号</span>
    <span class="token string-property property">&#39;no-extra-parens&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;functions&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 case 语句落空</span>
    <span class="token string-property property">&#39;no-fallthrough&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止数字字面量中使用前导和末尾小数点</span>
    <span class="token string-property property">&#39;no-floating-decimal&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 function 声明重新赋值</span>
    <span class="token string-property property">&#39;no-func-assign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用类似 eval() 的方法</span>
    <span class="token string-property property">&#39;no-implied-eval&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在嵌套的块中出现变量声明或 function 声明 - functions：禁止 function 声明出现在嵌套的语句块中</span>
    <span class="token string-property property">&#39;no-inner-declarations&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;functions&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 RegExp 构造函数中存在无效的正则表达式字符串</span>
    <span class="token string-property property">&#39;no-invalid-regexp&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不规则的空白</span>
    <span class="token string-property property">&#39;no-irregular-whitespace&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 __iterator__ 属性</span>
    <span class="token string-property property">&#39;no-iterator&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 不允许标签与变量同名</span>
    <span class="token string-property property">&#39;no-label-var&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用标签语句</span>
    <span class="token string-property property">&#39;no-labels&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">allowLoop</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 如果这个选项被设置为 true，该规则忽略循环语句中的标签</span>
        <span class="token literal-property property">allowSwitch</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 如果这个选项被设置为 true，该规则忽略 switch 语句中的标签</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用不必要的嵌套块</span>
    <span class="token string-property property">&#39;no-lone-blocks&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止空格和 tab 的混合缩进</span>
    <span class="token string-property property">&#39;no-mixed-spaces-and-tabs&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用多个空格</span>
    <span class="token string-property property">&#39;no-multi-spaces&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止使用多行字符串</span>
    <span class="token string-property property">&#39;no-multi-str&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现多行空行</span>
    <span class="token string-property property">&#39;no-multiple-empty-lines&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">max</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token comment">// 强制最大连续空行数</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 在 ESLint v3.3.0 中已弃用，并由 no-global-assign 规则取代</span>
    <span class="token string-property property">&#39;no-native-reassign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对原生对象或只读的全局对象进行赋值</span>
    <span class="token string-property property">&#39;no-global-assign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 在 ESLint v3.3.0  中已弃用，并由 no-unsafe-negation 规则取代</span>
    <span class="token string-property property">&#39;no-negated-in-lhs&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对关系运算符的左操作数使用否定操作符</span>
    <span class="token string-property property">&#39;no-unsafe-negation&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 Object 的构造函数</span>
    <span class="token string-property property">&#39;no-new-object&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止调用 require 时使用 new 操作符</span>
    <span class="token string-property property">&#39;no-new-require&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止 Symbolnew 操作符和 new 一起使用</span>
    <span class="token string-property property">&#39;no-new-symbol&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 String，Number 和 Boolean 使用 new 操作符</span>
    <span class="token string-property property">&#39;no-new-wrappers&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止把全局对象作为函数调用</span>
    <span class="token string-property property">&#39;no-obj-calls&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用八进制字面量</span>
    <span class="token string-property property">&#39;no-octal&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在字符串中使用八进制转义序列</span>
    <span class="token string-property property">&#39;no-octal-escape&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止对 __dirname 和 __filename 进行字符串连接</span>
    <span class="token string-property property">&#39;no-path-concat&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止直接调用 Object.prototypes 的内置属性</span>
    <span class="token string-property property">&#39;no-proto&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止多次声明同一变量</span>
    <span class="token string-property property">&#39;no-redeclare&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止正则表达式字面量中出现多个空格</span>
    <span class="token string-property property">&#39;no-regex-spaces&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在 return 语句中使用赋值语句 - except-parens：禁止出现赋值语句，除非使用括号把它们括起来</span>
    <span class="token string-property property">&#39;no-return-assign&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;except-parens&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止自我赋值</span>
    <span class="token string-property property">&#39;no-self-assign&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止自身比较</span>
    <span class="token string-property property">&#39;no-self-compare&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用逗号操作符</span>
    <span class="token string-property property">&#39;no-sequences&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止将标识符定义为受限的名字</span>
    <span class="token string-property property">&#39;no-shadow-restricted-names&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 在 ESLint v3.3.0 中已弃用，并由 func-call-spacing 规则取代</span>
    <span class="token string-property property">&#39;no-spaced-func&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止在函数标识符和其调用之间有空格 - never&quot;(默认) 禁止在函数名和开括号之间有空格</span>
    <span class="token string-property property">&#39;func-call-spacing&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用稀疏数组</span>
    <span class="token string-property property">&#39;no-sparse-arrays&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在构造函数中，在调用 super() 之前使用 this 或 super</span>
    <span class="token string-property property">&#39;no-this-before-super&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止抛出异常字面量</span>
    <span class="token string-property property">&#39;no-throw-literal&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用行尾空格</span>
    <span class="token string-property property">&#39;no-trailing-spaces&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用未声明的变量，除非它们在 /*global */ 注释中被提到</span>
    <span class="token string-property property">&#39;no-undef&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止将变量初始化为 undefined</span>
    <span class="token string-property property">&#39;no-undef-init&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现令人困惑的多行表达式</span>
    <span class="token string-property property">&#39;no-unexpected-multiline&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用一成不变的循环条件</span>
    <span class="token string-property property">&#39;no-unmodified-loop-condition&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止可以在有更简单的可替代的表达式时使用三元操作符</span>
    <span class="token string-property property">&#39;no-unneeded-ternary&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">defaultAssignment</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 禁止条件表达式作为默认的赋值模式</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在 return、throw、continue 和 break 语句之后出现不可达代码</span>
    <span class="token string-property property">&#39;no-unreachable&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在 finally 语句块中出现控制流语句</span>
    <span class="token string-property property">&#39;no-unsafe-finally&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止出现未使用过的变量</span>
    <span class="token string-property property">&#39;no-unused-vars&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">vars</span><span class="token operator">:</span> <span class="token string">&#39;all&#39;</span><span class="token punctuation">,</span> <span class="token comment">// all - 检测所有变量，包括全局环境中的变量</span>
        <span class="token literal-property property">args</span><span class="token operator">:</span> <span class="token string">&#39;none&#39;</span> <span class="token comment">// none - 不检查参数</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止不必要的 .call() 和 .apply()</span>
    <span class="token string-property property">&#39;no-useless-call&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止在对象中使用不必要的计算属性</span>
    <span class="token string-property property">&#39;no-useless-computed-key&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用不必要的构造函数</span>
    <span class="token string-property property">&#39;no-useless-constructor&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用不必要的转义字符</span>
    <span class="token string-property property">&#39;no-useless-escape&#39;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止属性前有空白</span>
    <span class="token string-property property">&#39;no-whitespace-before-property&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 with 语句</span>
    <span class="token string-property property">&#39;no-with&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制函数中的变量要么一起声明要么分开声明</span>
    <span class="token string-property property">&#39;one-var&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">initialized</span><span class="token operator">:</span> <span class="token string">&#39;never&#39;</span> <span class="token comment">// 要求每个作用域的初始化的变量有多个变量声明</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制操作符使用一致的换行符</span>
    <span class="token string-property property">&#39;operator-linebreak&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&#39;after&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 要求把换行符放在操作符后面</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// 覆盖对指定的操作的全局设置</span>
        <span class="token literal-property property">overrides</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token string-property property">&#39;?&#39;</span><span class="token operator">:</span> <span class="token string">&#39;before&#39;</span><span class="token punctuation">,</span>
          <span class="token string-property property">&#39;:&#39;</span><span class="token operator">:</span> <span class="token string">&#39;before&#39;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止块内填充 - never：禁止块语句和类的开始或末尾有空行</span>
    <span class="token string-property property">&#39;padded-blocks&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制使用一致的反勾号、双引号或单引号</span>
    <span class="token literal-property property">quotes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&#39;single&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 要求尽可能地使用单引号</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">avoidEscape</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义</span>
        <span class="token literal-property property">allowTemplateLiterals</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 允许字符串使用反勾号</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止使用分号代替 ASI - never：禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)</span>
    <span class="token literal-property property">semi</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制分号之前和之后使用一致的空格</span>
    <span class="token string-property property">&#39;semi-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">before</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 分号之前禁止有空格</span>
        <span class="token literal-property property">after</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 分号之后强制有空格</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在块之前使用一致的空格 - always：块语句必须总是至少有一个前置空格</span>
    <span class="token string-property property">&#39;space-before-blocks&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// &#39;space-before-function-paren&#39;: [</span>
    <span class="token comment">//   2,</span>
    <span class="token comment">//   {</span>
    <span class="token comment">//     anonymous: &#39;always&#39;,</span>
    <span class="token comment">//     named: &#39;always&#39;,</span>
    <span class="token comment">//     asyncArrow: &#39;always&#39;</span>
    <span class="token comment">//   }</span>
    <span class="token comment">// ],</span>
    <span class="token comment">// 强制在 function的左括号之前使用一致的空格 - never：禁止在参数的 ( 前面有空格</span>
    <span class="token comment">// &#39;space-before-function-paren&#39;: [2, &#39;never&#39;],</span>
    <span class="token string-property property">&#39;space-before-function-paren&#39;</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在圆括号内使用一致的空格 - never：强制圆括号内没有空格</span>
    <span class="token string-property property">&#39;space-in-parens&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求操作符周围有空格</span>
    <span class="token string-property property">&#39;space-infix-ops&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在一元操作符前后使用一致的空格</span>
    <span class="token string-property property">&#39;space-unary-ops&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">words</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 适用于单词类一元操作符，操作符之后禁用空格。例如：new、delete、typeof、void、yield</span>
        <span class="token literal-property property">nonwords</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 操作符左右要求有空格，适用于这些一元操作符: -、+、--、++、!、!!</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在注释中 // 或 /* 使用一致的空格</span>
    <span class="token string-property property">&#39;spaced-comment&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span> <span class="token comment">// // 或 /* 必须跟随至少一个空白</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">markers</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;global&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;globals&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;eslint&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;eslint-disable&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;*package&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;!&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;,&#39;</span><span class="token punctuation">]</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止模板字符串中的嵌入表达式周围空格的使用 - never (默认) ：禁止花括号内出现空格</span>
    <span class="token string-property property">&#39;template-curly-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用 isNaN() 检查 NaN</span>
    <span class="token string-property property">&#39;use-isnan&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制 typeof 表达式与有效的字符串进行比较</span>
    <span class="token string-property property">&#39;valid-typeof&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求 IIFE 使用括号括起来 - any：强制总是包裹，但允许其它风格。</span>
    <span class="token string-property property">&#39;wrap-iife&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;any&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在 yield* 表达式中 * 周围使用空格</span>
    <span class="token string-property property">&#39;yield-star-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;both&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止 “Yoda” 条件</span>
    <span class="token literal-property property">yoda</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求使用 const 声明那些声明后不再被修改的变量</span>
    <span class="token string-property property">&#39;prefer-const&#39;</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁用 debugger</span>
    <span class="token string-property property">&#39;no-debugger&#39;</span><span class="token operator">:</span> process<span class="token punctuation">.</span>env<span class="token punctuation">.</span><span class="token constant">NODE_ENV</span> <span class="token operator">===</span> <span class="token string">&#39;production&#39;</span> <span class="token operator">?</span> <span class="token number">2</span> <span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制在大括号中使用一致的空格</span>
    <span class="token string-property property">&#39;object-curly-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 要求花括号内有空格 (除了 {})</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">objectsInObjects</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 要求以对象元素开始或结尾的对象的花括号中有空格 (当第一个选项为 always 时生效)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 强制数组方括号中使用一致的空格 - never：禁止在数组括号内出现空格</span>
    <span class="token string-property property">&#39;array-bracket-spacing&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&#39;never&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>.eslintignore</summary><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>build/*.js
src/assets
public
dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="stylelint" tabindex="-1"><a class="header-anchor" href="#stylelint" aria-hidden="true">#</a> Stylelint</h2>`,7),an={href:"https://stylelint.io/",target:"_blank",rel:"noopener noreferrer"},en={href:"https://stylelint.docschina.org/",target:"_blank",rel:"noopener noreferrer"},tn=t('<h3 id="相关插件" tabindex="-1"><a class="header-anchor" href="#相关插件" aria-hidden="true">#</a> 相关插件</h3><ul><li><code>stylelint-config-standard</code> : stylelint 标准(standard)配置</li><li><code>stylelint-config-css-modules</code> : 调整stylesint规则以接受css模块特定的语法。</li><li><code>stylelint-config-rational-order</code> : 一个用于规范css属性写作顺序的规则集成。配合stylelint-order插件使用。</li><li><code>stylelint-config-prettier</code> : 关闭所有不必要的或可能与 Prettier 冲突的规则</li><li><code>stylelint-no-unsupported-browser-features</code> : 检查正在使用的 CSS 是否被目标浏览器支持</li><li><code>stylelint-order</code> : 用于规范样式属性写作顺序的插件</li><li><code>stylelint-declaration-block-no-ignored-properties</code> : 用于提示写矛盾的样式。例如：<code>{ display: inline; width: 100px; }</code></li></ul><h3 id="相关配置" tabindex="-1"><a class="header-anchor" href="#相关配置" aria-hidden="true">#</a> 相关配置</h3>',3),pn={href:"https://stylelint.docschina.org/user-guide/rules/",target:"_blank",rel:"noopener noreferrer"},on=t(`<li><p>命令行使用</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;stylelint&quot;</span><span class="token operator">:</span> <span class="token string">&quot;stylelint &#39;src/**/*.{vue,scss,css}&#39; --fix&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>`,1),ln=t(`<h3 id="stylelint-配置示例" tabindex="-1"><a class="header-anchor" href="#stylelint-配置示例" aria-hidden="true">#</a> Stylelint 配置示例</h3><details class="hint-container details"><summary>.stylelintrc.js</summary><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;stylelint-config-standard&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;stylelint-config-css-modules&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;stylelint-config-rational-order&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;stylelint-config-prettier&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;stylelint-no-unsupported-browser-features&#39;</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;stylelint-order&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;stylelint-declaration-block-no-ignored-properties&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 禁止低优先级的选择器出现在高优先级的选择器之后</span>
    <span class="token string-property property">&#39;no-descending-specificity&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token comment">// https://github.com/stylelint/stylelint/issues/4114</span>
    <span class="token comment">// 允许在 calc 函数中使用无效的表达式</span>
    <span class="token string-property property">&#39;function-calc-no-invalid&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token comment">// 要求或禁止 url 使用引号</span>
    <span class="token string-property property">&#39;function-url-quotes&#39;</span><span class="token operator">:</span> <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止字体家族名称列表中缺少通用家族</span>
    <span class="token string-property property">&#39;font-family-no-missing-generic-family-keyword&#39;</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;plugin/declaration-block-no-ignored-properties&#39;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token comment">// 禁止未知单位</span>
    <span class="token string-property property">&#39;unit-no-unknown&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">ignoreUnits</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;rpx&#39;</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="commit-规范" tabindex="-1"><a class="header-anchor" href="#commit-规范" aria-hidden="true">#</a> Commit 规范</h2>`,3),cn={href:"https://www.conventionalcommits.org/zh-hans/v1.0.0/",target:"_blank",rel:"noopener noreferrer"},rn=t(`<h3 id="commit-message-格式" tabindex="-1"><a class="header-anchor" href="#commit-message-格式" aria-hidden="true">#</a> Commit message 格式</h3><p>Commit message 包含三个部分： <code>Header</code>、 <code>Body</code> 和 <code>Footer</code>。其中，<code>Header</code> 是必需的，<code>Body</code> 和 <code>Footer</code> 可以省略。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token operator">&lt;</span>type<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token operator">&lt;</span>scope<span class="token operator">&gt;</span><span class="token punctuation">)</span>: <span class="token operator">&lt;</span>subject<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>

<span class="token operator">&lt;</span>footer<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> Header</h4><p><code>Header</code> 部分只有一行，包括三个字段：<code>type</code>（必需）、<code>scope</code>（可选）和 <code>subject</code>（必需）。</p><ul><li><code>type</code> : 用于说明 commit 的类别，只允许使用下面7个标识。 <ul><li><code>feat</code>：新功能（feature）</li><li><code>fix</code>：修补bug</li><li><code>docs</code>：文档（documentation）</li><li><code>style</code>： 格式（不影响代码运行的变动）</li><li><code>refactor</code>：重构（即不是新增功能，也不是修改bug的代码变动）</li><li><code>test</code>：增加测试</li><li><code>chore</code>：构建过程或辅助工具的变动</li></ul></li><li><code>scope</code> : 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。</li><li><code>subject</code> : 用于说明 commit 目的的简短描述，不超过50个字符 <ul><li>以动词开头，使用第一人称现在时，比如change，而不是changed或changes</li><li>第一个字母小写</li><li>结尾不加句号（.）</li></ul></li></ul><h4 id="body" tabindex="-1"><a class="header-anchor" href="#body" aria-hidden="true">#</a> Body</h4><p><code>Body</code> 部分是对本次 commit 的详细描述，可以分成多行。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>More detailed explanatory text, <span class="token keyword">if</span> necessary.  Wrap it to about <span class="token number">72</span> characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有两个注意点。</p><ul><li>使用第一人称现在时，比如使用 change 而不是 changed 或 changes。</li><li>应该说明代码变动的动机，以及与以前行为的对比。</li></ul><h4 id="footer" tabindex="-1"><a class="header-anchor" href="#footer" aria-hidden="true">#</a> Footer</h4><p>Footer 部分只用于两种情况。</p><ul><li><p>不兼容变动</p><p>如果当前代码与上一个版本不兼容，则 Footer 部分以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动理由和迁移方法。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>BREAKING CHANGE: isolate scope bindings definition has changed.

  To migrate the code follow the example below:

  Before:

  scope: <span class="token punctuation">{</span>
    myAttr: <span class="token string">&#39;attribute&#39;</span>,
  <span class="token punctuation">}</span>

  After:

  scope: <span class="token punctuation">{</span>
    myAttr: <span class="token string">&#39;@&#39;</span>,
  <span class="token punctuation">}</span>

  The removed <span class="token variable"><span class="token variable">\`</span>inject<span class="token variable">\`</span></span> wasn&#39;t generaly useful <span class="token keyword">for</span> directives so there should be no code using it.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>关闭 Issue</p><p>如果当前 commit 针对某个issue，那么可以在 Footer 部分关闭这个 issue 。</p></li></ul><h4 id="revert" tabindex="-1"><a class="header-anchor" href="#revert" aria-hidden="true">#</a> Revert</h4><p>如果当前 commit 用于撤销以前的 commit，则必须以 revert: 开头，后面跟着被撤销 Commit 的 Header。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>revert: feat<span class="token punctuation">(</span>pencil<span class="token punctuation">)</span>: <span class="token function">add</span> <span class="token string">&#39;graphiteWidth&#39;</span> option

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Body部分的格式是固定的，必须写成 <code>This reverts commit &lt;hash&gt;</code>，其中的 hash 是被撤销 commit 的 SHA 标识符。</p><p>如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。如果两者在不同的发布，那么当前 commit，会出现在 Change log 的Reverts小标题下面。</p><h3 id="commitizen-规范提交代码" tabindex="-1"><a class="header-anchor" href="#commitizen-规范提交代码" aria-hidden="true">#</a> Commitizen 规范提交代码</h3>`,20),un={href:"http://commitizen.github.io/cz-cli/",target:"_blank",rel:"noopener noreferrer"},dn=n("code",null,"cz-cli",-1),mn=t(`<h4 id="commitizen-安装" tabindex="-1"><a class="header-anchor" href="#commitizen-安装" aria-hidden="true">#</a> Commitizen 安装</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 Commitizen</span>
$ <span class="token function">npm</span> <span class="token function">install</span> commitizen --save-dev

<span class="token comment"># 初始化项目</span>
$ npx commitizen init cz-conventional-changelog --save-dev --save-exact
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装 cz-conventional-changelog 初始化项目时，会在 package.json 中，添加如下配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;config&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;commitizen&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./node_modules/cz-conventional-changelog&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="commitizen-使用" tabindex="-1"><a class="header-anchor" href="#commitizen-使用" aria-hidden="true">#</a> Commitizen 使用</h4><p>将 <code>git commit</code> 命令修改为 <code>git cz</code>，则会出现相关选项，用来生成符合格式的 Commit message。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>$ <span class="token function">git</span> cz

cz-cli@4.2.3, cz-conventional-changelog@3.3.0

? Select the <span class="token builtin class-name">type</span> of change that you&#39;re committing: <span class="token punctuation">(</span>Use arrow keys<span class="token punctuation">)</span>
<span class="token operator">&gt;</span> feat:     A new feature
  fix:      A bug fix
  docs:     Documentation only changes
  style:    Changes that <span class="token keyword">do</span> not affect the meaning of the code <span class="token punctuation">(</span>white-space, formatting, missing semi-colons, etc<span class="token punctuation">)</span>
  refactor: A code change that neither fixes a bug nor adds a feature
  perf:     A code change that improves performance
  test:     Adding missing tests or correcting existing tests
<span class="token punctuation">(</span>Move up and down to reveal <span class="token function">more</span> choices<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>【注意】运行 <code>git cz</code> 时，如果提示 <code>git: &#39;cz&#39; is not a git command. See &#39;git --help&#39;.</code> ，可以将 commitizen 全局安装： <code>npm install -g commitizen</code></p><h3 id="cz-customizable-自定义配置" tabindex="-1"><a class="header-anchor" href="#cz-customizable-自定义配置" aria-hidden="true">#</a> cz-customizable 自定义配置</h3><h4 id="cz-customizable-初始化项目" tabindex="-1"><a class="header-anchor" href="#cz-customizable-初始化项目" aria-hidden="true">#</a> cz-customizable 初始化项目</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 使用 cz-customizable 初始化项目，需要加 --force 覆盖</span>
$ npx commitizen init cz-customizable --save-dev --save-exact <span class="token parameter variable">--force</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装 cz-customizable 初始化项目时，会在 package.json 中，添加如下配置</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;config&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;commitizen&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;path&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./node_modules/cz-customizable&quot;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cz-customizable-使用" tabindex="-1"><a class="header-anchor" href="#cz-customizable-使用" aria-hidden="true">#</a> cz-customizable 使用</h4>`,14),kn=n("code",null,".cz-config.js",-1),vn={href:"https://github.com/leoforfree/cz-customizable/blob/master/cz-config-EXAMPLE.js",target:"_blank",rel:"noopener noreferrer"},bn=t(`<p>公司内部的代码仓库也不需要管理 issue，可以把询问 body 和 footer 的步骤跳过（在 <code>.cz-config.js</code> 中修改成 <code>skipQuestions: [&#39;body&#39;, &#39;footer&#39;]</code>）。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// type 类型（定义之后，可通过上下键选择）</span>
  <span class="token literal-property property">types</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;feat&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;feat:     新增功能&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;fix&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;fix:      修复 bug&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;docs&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;docs:     文档变更&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;style:    代码格式（不影响功能，例如空格、分号等格式修正）&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;refactor&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;refactor: 代码重构（不包括 bug 修复、功能新增）&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;perf&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;perf:     性能优化&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;test:     添加、修改测试用例&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;build:    构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;ci&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;ci:       修改 CI 配置、脚本&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;chore&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;chore:    对构建过程或辅助工具和库的更改（不影响源文件、测试用例）&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">&#39;revert&#39;</span><span class="token punctuation">,</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">&#39;revert:   回滚 commit&#39;</span> <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">// scope 类型（定义之后，可通过上下键选择）</span>
  <span class="token literal-property property">scopes</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">[</span><span class="token string">&#39;components&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;组件相关&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;hooks&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;hook 相关&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;utils&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;utils 相关&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;element-ui&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;对 element-ui 的调整&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;styles&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;样式相关&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;deps&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;项目依赖&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;auth&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;对 auth 修改&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token punctuation">[</span><span class="token string">&#39;other&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;其他修改&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">// 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true</span>
    <span class="token punctuation">[</span><span class="token string">&#39;custom&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;以上都不是？我要自定义&#39;</span><span class="token punctuation">]</span>
  <span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">[</span>value<span class="token punctuation">,</span> description<span class="token punctuation">]</span></span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token punctuation">{</span>
      value<span class="token punctuation">,</span>
      <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token punctuation">.</span><span class="token function">padEnd</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> (</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>description<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">\`</span></span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>

  <span class="token comment">// 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。</span>
  <span class="token comment">// allowCustomScopes: true,</span>

  <span class="token comment">// allowTicketNumber: false,</span>
  <span class="token comment">// isTicketNumberRequired: false,</span>
  <span class="token comment">// ticketNumberPrefix: &#39;TICKET-&#39;,</span>
  <span class="token comment">// ticketNumberRegExp: &#39;\\\\d{1,5}&#39;,</span>

  <span class="token comment">// 针对每一个 type 去定义对应的 scopes，例如 fix</span>
  <span class="token comment">/*
  scopeOverrides: {
    fix: [
      { name: &#39;merge&#39; },
      { name: &#39;style&#39; },
      { name: &#39;e2eTest&#39; },
      { name: &#39;unitTest&#39; }
    ]
  },
  */</span>

  <span class="token comment">// 交互提示信息</span>
  <span class="token literal-property property">messages</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">&#39;确保本次提交遵循 Angular 规范！\\n选择你要提交的类型：&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">scope</span><span class="token operator">:</span> <span class="token string">&#39;\\n选择一个 scope（可选）：&#39;</span><span class="token punctuation">,</span>
    <span class="token comment">// 选择 scope: custom 时会出下面的提示</span>
    <span class="token literal-property property">customScope</span><span class="token operator">:</span> <span class="token string">&#39;请输入自定义的 scope：&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">subject</span><span class="token operator">:</span> <span class="token string">&#39;填写简短精炼的变更描述：\\n&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token string">&#39;填写更加详细的变更描述（可选）。使用 &quot;|&quot; 换行：\\n&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">breaking</span><span class="token operator">:</span> <span class="token string">&#39;列举非兼容性重大的变更（可选）：\\n&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">footer</span><span class="token operator">:</span> <span class="token string">&#39;列举出所有变更的 ISSUES CLOSED（可选）。 例如: #31, #34：\\n&#39;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">confirmCommit</span><span class="token operator">:</span> <span class="token string">&#39;确认提交？&#39;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token comment">// 设置只有 type 选择了 feat 或 fix，才询问 breaking message</span>
  <span class="token literal-property property">allowBreakingChanges</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;feat&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;fix&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>

  <span class="token comment">// 跳过要询问的步骤</span>
  <span class="token comment">// skipQuestions: [&#39;body&#39;, &#39;footer&#39;],</span>

  <span class="token comment">// subject 限制长度</span>
  <span class="token literal-property property">subjectLimit</span><span class="token operator">:</span> <span class="token number">100</span><span class="token punctuation">,</span>
  <span class="token literal-property property">breaklineChar</span><span class="token operator">:</span> <span class="token string">&#39;|&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 支持 body 和 footer</span>
  <span class="token comment">// footerPrefix : &#39;ISSUES CLOSED:&#39;</span>
  <span class="token comment">// askForBreakingChangeFirst : true,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="commitlint-提交信息验证" tabindex="-1"><a class="header-anchor" href="#commitlint-提交信息验证" aria-hidden="true">#</a> Commitlint 提交信息验证</h3>`,3),gn={href:"https://commitlint.js.org/#/",target:"_blank",rel:"noopener noreferrer"},yn=n("code",null,"git commit",-1),hn=t(`<h4 id="commitlint-安装" tabindex="-1"><a class="header-anchor" href="#commitlint-安装" aria-hidden="true">#</a> Commitlint 安装</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 commitlint</span>
$ <span class="token function">npm</span> i @commitlint/config-conventional @commitlint/cli <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="commitlint-配置" tabindex="-1"><a class="header-anchor" href="#commitlint-配置" aria-hidden="true">#</a> Commitlint 配置</h4><p>在项目根目录下，创建 <code>commitlint.config.js</code> 文件。配置如下：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// commitlint.config.js</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token comment">// 继承的规则</span>
  <span class="token keyword">extends</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;@commitlint/config-conventional&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 定义规则类型</span>
  <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// type 类型定义，表示 git 提交的 type 必须在以下类型范围内</span>
    <span class="token string-property property">&#39;type-enum&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token number">2</span><span class="token punctuation">,</span>
      <span class="token string">&#39;always&#39;</span><span class="token punctuation">,</span>
      <span class="token punctuation">[</span>
        <span class="token string">&#39;feat&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 新增功能</span>
        <span class="token string">&#39;fix&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 修复 bug</span>
        <span class="token string">&#39;docs&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 文档变更</span>
        <span class="token string">&#39;style&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 代码格式（不影响功能，例如空格、分号等格式修正）</span>
        <span class="token string">&#39;refactor&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 代码重构（不包括 bug 修复、功能新增）</span>
        <span class="token string">&#39;perf&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 性能优化</span>
        <span class="token string">&#39;test&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 添加、修改测试用例</span>
        <span class="token string">&#39;build&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等</span>
        <span class="token string">&#39;ci&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 修改 CI 配置、脚本</span>
        <span class="token string">&#39;chore&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 对构建过程或辅助工具和库的更改（不影响源文件、测试用例</span>
        <span class="token string">&#39;revert&#39;</span><span class="token punctuation">,</span> <span class="token comment">// 回滚 commit</span>
      <span class="token punctuation">]</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token string-property property">&#39;subject-case&#39;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token comment">// subject 大小写不做校验</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 husky 的 <code>commit-msg</code> hook 触发验证提交信息的命令。在 <code>.husky</code> 目录下，创建 <code>commit-msg</code> 文件，并执行添加 commit message 的验证命令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 添加执行 commit message 的验证命令</span>
$ npx husky <span class="token function">add</span> .husky/commit-msg <span class="token string">&quot;npx --no-install commitlint --edit <span class="token variable">$1</span>&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="集成-husky-和-lint-staged" tabindex="-1"><a class="header-anchor" href="#集成-husky-和-lint-staged" aria-hidden="true">#</a> 集成 husky 和 lint-staged</h2>`,8),fn={href:"https://typicode.github.io/husky/#/",target:"_blank",rel:"noopener noreferrer"},_n=n("code",null,"pre-commit",-1),xn=n("code",null,"commit-msg",-1),wn=n("code",null,"pre-push",-1),jn={href:"https://github.com/okonet/lint-staged",target:"_blank",rel:"noopener noreferrer"},qn=t("<p>常用 Git HOOK ：</p><ul><li><code>pre-commit</code>：<code>git commit</code> 执行前。 <ul><li>用于检查即将提交的快照，例如，检查是否有所遗漏，确保测试运行，以及核查代码。</li><li>如果该钩子以非零值退出，Git 将放弃此次提交。</li><li>可以用 <code>git commit --no-verify</code> 来绕过。</li></ul></li><li><code>commit-msg</code>：<code>git commit</code> 执行前。 <ul><li>可以用来在提交通过前验证项目状态或提交</li><li>如果该钩子以非零值退出，Git 将放弃此次提交。</li></ul></li></ul>",2),Sn={href:"https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90",target:"_blank",rel:"noopener noreferrer"},En=t(`<h3 id="husky" tabindex="-1"><a class="header-anchor" href="#husky" aria-hidden="true">#</a> husky</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 husky 依赖包，并初始化项目</span>
$ npx husky-init <span class="token operator">&amp;&amp;</span> <span class="token function">npm</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>安装并初始化命令，主要进行了如下操作：</p><ul><li><p>安装 <code>husky</code> 依赖包</p></li><li><p>在项目根目录下，创建 <code>.husky</code> 目录</p></li><li><p>在 <code>.husky</code> 目录下，创建了 <code>pre-commit</code> Hook 文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">.</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">dirname</span> <span class="token string">&quot;<span class="token variable">$0</span>&quot;</span><span class="token variable">)</span></span>/_/husky.sh&quot;</span>

<span class="token function">npm</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改 <code>package.json</code> 中的 <code>script</code> 中，增加 <code>&quot;prepare&quot;: &quot;husky install&quot;</code></p></li></ul><h4 id="pre-commit-hook文件配置" tabindex="-1"><a class="header-anchor" href="#pre-commit-hook文件配置" aria-hidden="true">#</a> pre-commit Hook文件配置</h4><p>当执行 <code>git commit -m &#39;xxx&#39;</code> 的时候，会先对 <code>src</code> 目录下的 <code>.vue</code>、 <code>.js</code>、 <code>.ts</code> 文件执行 <code>eslint --fx</code> 命令，如果 ESLint 检查通过，则成功 <code>commit</code> ，否则终止 <code>commit</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">.</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">dirname</span> <span class="token string">&quot;<span class="token variable">$0</span>&quot;</span><span class="token variable">)</span></span>/_/husky.sh&quot;</span>

eslint <span class="token parameter variable">--fix</span> ./src <span class="token parameter variable">--ext</span> .vue,.js,.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="commit-msg-hook文件配置" tabindex="-1"><a class="header-anchor" href="#commit-msg-hook文件配置" aria-hidden="true">#</a> commit-msg Hook文件配置</h4><p>当执行 <code>git commit -m &#39;xxx&#39;</code> 的时候，使用 <code>commitlint</code> 对提交信息进验证，不符合规范的 commit 将不能提交。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">.</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">dirname</span> <span class="token string">&quot;<span class="token variable">$0</span>&quot;</span><span class="token variable">)</span></span>/_/husky.sh&quot;</span>

npx --no-install commitlint <span class="token parameter variable">--edit</span> <span class="token variable">$1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lint-staegd" tabindex="-1"><a class="header-anchor" href="#lint-staegd" aria-hidden="true">#</a> lint-staegd</h3><p><code>lint-staged</code> 一般结合 husky 来使用，可以让 <code>husky</code> 的 hook 触发的命令只作用于 <code>git add</code> 的文件（即 git 暂存区的文件），而不会影响到其他文件。</p><ul><li><p>安装</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 安装 lint-staged 依赖包</span>
$ <span class="token function">npm</span> i lint-staged <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>配置: 在 <code>package.json</code> 中增加 <code>lint-staged</code> 配置项，配置如下，表示只对 git 暂存区的 <code>src</code> 目录下的 <code>.vue</code>、<code>.js</code>、<code>.ts</code> 文件执行 <code>eslint --fix</code></p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;lint-staged&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;src/**/*.{js,vue}&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token string">&quot;eslint --fix&quot;</span><span class="token punctuation">,</span>
      <span class="token string">&quot;git add&quot;</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改 <code>.husky/pre-commit</code> hook 的触发命令为：<code>npx lint-staged</code></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">.</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">dirname</span> <span class="token string">&quot;<span class="token variable">$0</span>&quot;</span><span class="token variable">)</span></span>/_/husky.sh&quot;</span>

npx lint-staged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h2 id="相关参考" tabindex="-1"><a class="header-anchor" href="#相关参考" aria-hidden="true">#</a> 相关参考</h2>`,14),zn={href:"https://eslint.org/",target:"_blank",rel:"noopener noreferrer"},Cn={href:"https://cn.eslint.org/",target:"_blank",rel:"noopener noreferrer"},An={href:"https://stylelint.io/",target:"_blank",rel:"noopener noreferrer"},Ln={href:"https://stylelint.docschina.org/",target:"_blank",rel:"noopener noreferrer"},Pn={href:"https://juejin.cn/post/6951649464637636622",target:"_blank",rel:"noopener noreferrer"},Bn={href:"https://mp.weixin.qq.com/s/nWpD2uXgoxYHNDtWW1W3yw",target:"_blank",rel:"noopener noreferrer"},Nn={href:"https://jsweibo.github.io/2019/10/17/Prettier%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6/",target:"_blank",rel:"noopener noreferrer"};function Vn($n,Tn){const a=o("ExternalLinkIcon");return l(),i("div",null,[r,u,n("p",null,[n("a",d,[s("EditorConfig"),e(a)]),s(" 可以在不同的编辑器和 ide 中，为同一个项目工作的多个开发人员维护一致的编码风格。")]),m,n("p",null,[n("a",k,[s("ESLint"),e(a)]),s(" 可组装的 JavaScript 和 JSX 检查工具。（ESLint中文文档 : "),n("a",v,[s("https://cn.eslint.org/"),e(a)]),s("）")]),b,n("p",null,[s("注： "),n("a",g,[s("astexplorer.net"),e(a)]),s(" 可查看代码解析为 AST")]),y,h,f,n("ul",null,[_,n("li",null,[x,s(" : 对象，表示使用的额外的语言特性 "),n("ul",null,[w,j,n("li",null,[q,s(" : 启用 "),n("a",S,[s("JSX"),e(a)])])])])]),E,z,C,n("ul",null,[n("li",null,[s("指定配置的字符串（配置文件的路径、可共享配置的名称、"),A,s(" 或 "),L,s("） "),n("ul",null,[n("li",null,[P,s(" : 启用 ESLint 核心规则。ESLint 核心规则为在 "),n("a",B,[s("规则列表 Rules"),e(a)]),s(" 中被标记为 "),N,s(" 的规则。")]),V])]),$]),T,I,H,n("ul",null,[n("li",null,[n("a",G,[s("Vue2.x 风格指南"),e(a)])]),n("li",null,[n("a",O,[s("Vue3.x 风格指南"),e(a)])])]),D,F,W,n("ul",null,[n("li",null,[n("a",R,[s("eslint-plugin-vue"),e(a)]),s(" : 用于检查 Vue.js 的 ESLint 插件")]),n("li",null,[n("a",J,[s("eslint-config-prettier"),e(a)]),s(" : 用于关闭所有不必要的或可能与Prettier冲突的规则")]),n("li",null,[n("a",M,[s("eslint-plugin-prettier"),e(a)]),s(" : 将 Prettier 作为 ESLint 规则，进行代码风格检查")])]),X,n("p",null,[s("所有的规则默认都是禁用的。在配置文件中，使用 "),U,s(" 来启用推荐的规则。（在 "),n("a",K,[s("规则列表 Rules"),e(a)]),s(" 中被标记为 "),Q,s(" 的规则）")]),Y,n("ul",null,[n("li",null,[n("a",Z,[s("eslint-config-prettier"),e(a)]),s(" : 用于关闭所有不必要的或可能与Prettier冲突的规则")]),n("li",null,[n("a",nn,[s("eslint-plugin-prettier"),e(a)]),s(" : 将 Prettier 作为 ESLint 规则，进行代码风格检查")])]),sn,n("p",null,[n("a",an,[s("stylelint"),e(a)]),s(" 一个强大的，现代的代码检查工具，可以避免错误并在样式中强制执行约定。（stylelint中文文档 : "),n("a",en,[s("https://stylelint.docschina.org/"),e(a)]),s("）")]),tn,n("ul",null,[n("li",null,[n("p",null,[n("a",pn,[s("Stylelint 规则"),e(a)])])]),on]),ln,n("p",null,[n("a",cn,[s("Conventional Commit（约定式提交）"),e(a)]),s(" ：一种用于给提交信息增加人机可读含义的规范")]),rn,n("p",null,[n("a",un,[s("Commitizen"),e(a)]),s(" 是一个帮助撰写规范 commit message 的工具。它有一个命令行工具 "),dn,s("。")]),mn,n("p",null,[s("在项目根目录创建 "),kn,s(" 文件，进行配置。"),n("a",vn,[s("官方示例"),e(a)])]),bn,n("p",null,[n("a",gn,[s("Commitlint"),e(a)]),s(" 在 "),yn,s(" 提交之前使用 git 钩子来验证信息。提交不符合规则的信息将会被阻止提交。")]),hn,n("ul",null,[n("li",null,[n("a",fn,[s("husky"),e(a)]),s(" : Git Hook 工具，可以设置在 git 各个阶段（"),_n,s("、"),xn,s("、"),wn,s(" 等）触发命令。")]),n("li",null,[n("a",jn,[s("lint-staged"),e(a)]),s(" : 在 git 暂存的文件上运行 linters 的工具。")])]),qn,n("p",null,[s("注：更多 Git Hook 请参考 "),n("a",Sn,[s("自定义 Git - Git 钩子"),e(a)])]),En,n("ul",null,[n("li",null,[n("a",zn,[s("ESLint"),e(a)])]),n("li",null,[n("a",Cn,[s("ESLint中文文档"),e(a)])]),n("li",null,[n("a",An,[s("stylelint"),e(a)])]),n("li",null,[n("a",Ln,[s("stylelint中文文档"),e(a)])]),n("li",null,[n("a",Pn,[s("从 0 开始手把手带你搭建一套规范的 Vue3.x 项目工程环境"),e(a)])]),n("li",null,[n("a",Bn,[s("一键格式化代码带来的快感 | 你还在为每个项目配置Stylelint和Eslint吗"),e(a)])]),n("li",null,[n("a",Nn,[s("Prettier的配置文件"),e(a)])])])])}const Gn=p(c,[["render",Vn],["__file","编程规范.html.vue"]]);export{Gn as default};
