import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as a,e}from"./app-VLgNDF8W.js";const t={},p=e(`<h1 id="模块化-css" tabindex="-1"><a class="header-anchor" href="#模块化-css" aria-hidden="true">#</a> 模块化 CSS</h1><p>在样式开发过程中，存在以下问题：</p><ul><li><p>全局污染</p><p>CSS 使用全局选择器机制来设置样式，优点是方便重写样式。缺点是所有的样式都是全局生效，样式可能被错误覆盖，为了提高样式权重会应用 <code>!important</code> 、 <code>行内样式</code> 或者 复杂的选择器权重进行处理。Web Components 标准中的 <code>Shadow DOM</code> 能彻底解决这个问题，但它的做法有点极端，样式彻底局部化，造成外部无法重写样式，损失了灵活性。</p></li><li><p>命名混乱</p><p>多人协同开发时为了避免样式冲突，选择器越来越复杂，容易形成不同的命名风格，很难统一。样式变多后，命名将更加混乱。</p></li><li><p>依赖管理不彻底</p><p>组件应该相互独立，引入一个组件时，应该只引入它所需要的 CSS 样式。Saas/Less 很难实现对每个组件都编译出单独的 CSS，引入所有模块的 CSS 又造成浪费。使用 JS 的模块化来管理 CSS 依赖是很好的解决办法，Webpack 的 <code>css-loader</code> 提供了这种能力。</p></li><li><p>无法共享变量</p><p>复杂组件要使用 JS 和 CSS 来共同处理样式，就会造成有些变量在 JS 和 CSS 中冗余，Sass/PostCSS/CSS 等都不提供跨 JS 和 CSS 共享变量这种能力。</p></li><li><p>代码压缩不彻底</p></li></ul><p>为了解决如上问题， CSS 模块化应运而生。对于 React 使用 CSS 模块化主要有两种方式：</p><ul><li><code>CSS Modules</code> ：依赖于 webpack 构建和 <code>css-loader</code> 等 loader 处理，将 css 交给 js 来动态加载。对每个类名（非 <code>:global</code> 声明的）按照一定规则进行转换，保证它的唯一性。</li><li><code>CSS IN JS</code> ：用 JavaScript 对象方式编写 CSS 。</li></ul><h2 id="css-modules" tabindex="-1"><a class="header-anchor" href="#css-modules" aria-hidden="true">#</a> CSS Modules</h2><p>CSS Modules ，使得项目中可以像加载 js 模块一样加载 css ，本质上通过一定自定义的命名规则生成唯一性的 css 类名，从根本上解决 css 全局污染，样式覆盖的问题。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack.config.js</span>
<span class="token comment">// webpack 使用 css-loader 启用 CSS 模块</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span> <span class="token comment">// 匹配 .css 资源</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;css-loader?modules&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* index.module.css */</span>
<span class="token selector">.text_color</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.jsx</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./index.module.css&#39;</span>

<span class="token keyword">function</span> <span class="token function">CSSModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>text_color<span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token constant">CSS</span> Modules<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>src-components-CSSModules-index-module__text_color--bdxf5<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  CSS Modules
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="自定义命名规则" tabindex="-1"><a class="header-anchor" href="#自定义命名规则" aria-hidden="true">#</a> 自定义命名规则</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack 使用 css-loader 处理 CSS Modules 的基础配置</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span> <span class="token comment">// 匹配 .css 资源</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">// 自定义类名命名规则</span>
                <span class="token comment">// &gt; 开发环境使用  [path][name]__[local]</span>
                <span class="token comment">// &gt; 生产环境使用  [hash:base64]</span>
                <span class="token literal-property property">localIdentName</span><span class="token operator">:</span> <span class="token string">&#39;[path][name]__[local]--[hash:base64:5]&#39;</span><span class="token punctuation">,</span>

                <span class="token comment">// 其他配置项如下：</span>
                <span class="token comment">// mode: &#39;local&#39;, // 控制应用于输入样式的编译级别</span>
                <span class="token comment">// auto: true, // 当 modules 配置项为对象时允许基于文件名自动启用 CSS 模块或者 ICSS</span>
                <span class="token comment">// exportGlobals: true, // 允许 css-loader 从全局类或 ID 导出名称</span>
                <span class="token comment">// localIdentName: &#39;[path][name]__[local]--[hash:base64:5]&#39;, // 允许配置生成的本地标识符(ident)</span>
                <span class="token comment">// localIdentContext: path.resolve(__dirname, &#39;src&#39;), // 允许为本地标识符名称重新定义基本的 loader 上下文</span>
                <span class="token comment">// localIdentHashSalt: &#39;my-custom-hash&#39;, // 允许添加自定义哈希值以生成更多唯一类</span>
                <span class="token comment">// namedExport: true, // 本地环境启用 / 禁用 export 的 ES 模块</span>
                <span class="token comment">// exportLocalsConvention: &#39;camelCase&#39;, // 导出的类名称的样式</span>
                <span class="token comment">// exportOnlyLocals: false, // 仅导出局部环境</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="局部作用域" tabindex="-1"><a class="header-anchor" href="#局部作用域" aria-hidden="true">#</a> 局部作用域</h3><p>CSS 的规则都是全局的，任何一个组件的样式规则，都对整个页面有效。</p><p>CSS Modules 的做法是产生局部作用域的唯一方法，就是使用一个独一无二的 class 的名字，不会与其他选择器重名。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* index.module.css */</span>
<span class="token selector">.text_color</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">/* ===== 等价于 ===== */</span>
<span class="token selector">:local(.color)</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.jsx</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./index.module.css&#39;</span>

<span class="token keyword">function</span> <span class="token function">CSSModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>text_color<span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token constant">CSS</span> Modules<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>src-components-CSSModules-index-module__text_color--bdxf5<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
  CSS Modules
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="全局作用域" tabindex="-1"><a class="header-anchor" href="#全局作用域" aria-hidden="true">#</a> 全局作用域</h3><p>CSS Modules 允许使用 <code>:global(.className)</code> 的语法，声明一个全局规则。凡是这样声明的 class，都不会被编译成哈希字符串。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* index.module.css */</span>
<span class="token selector">:global(.text_color)</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #008000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.text_color</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.text_bg</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.jsx</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./index.module.css&#39;</span>

<span class="token keyword">function</span> <span class="token function">CSSModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token punctuation">{</span><span class="token comment">/* 全局作用域样式，直接使用样式名 */</span><span class="token punctuation">}</span>
      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token string">&quot;text_color&quot;</span><span class="token operator">&gt;</span> <span class="token constant">CSS</span> Modules <span class="token operator">-</span> <span class="token operator">:</span><span class="token function">global</span><span class="token punctuation">(</span><span class="token punctuation">.</span>className<span class="token punctuation">)</span> <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;text_color &#39;</span> <span class="token operator">+</span> styles<span class="token punctuation">.</span>text_color<span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token constant">CSS</span> Modules<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-ext="html"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text_color src-components-CSSModules-index-module__text_color--bdxf5<span class="token punctuation">&quot;</span></span>
  <span class="token punctuation">&gt;</span></span>
    CSS Modules
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text_color<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>CSS Modules - :global(.className)<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合样式" tabindex="-1"><a class="header-anchor" href="#组合样式" aria-hidden="true">#</a> 组合样式</h3><p>在 CSS Modules 中，一个选择器可以继承另一个选择器的规则，称为 <code>组合（composition）</code>。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* index.module.css */</span>
<span class="token selector">.text_bg</span> <span class="token punctuation">{</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.plain_text</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 继承其他模块中对应样式的规则 */</span>
  <span class="token property">composes</span><span class="token punctuation">:</span> other_text_color from <span class="token string">&#39;./other.modules.css&#39;</span><span class="token punctuation">;</span>
  <span class="token comment">/* 继承本模块中 .text_bg 样式的规则 */</span>
  <span class="token property">composes</span><span class="token punctuation">:</span> text_bg<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* other.module.css */</span>
<span class="token selector">.other_text_color</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> yellow<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.jsx</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./index.module.css&#39;</span>

<span class="token keyword">function</span> <span class="token function">CSSModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>plain_text<span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token constant">CSS</span> Modules <span class="token operator">-</span> composes <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用变量" tabindex="-1"><a class="header-anchor" href="#使用变量" aria-hidden="true">#</a> 使用变量</h3><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* color.module.css */</span>
<span class="token atrule"><span class="token rule">@value</span> <span class="token property">blue</span><span class="token punctuation">:</span> #0c77f8<span class="token punctuation">;</span></span>
<span class="token atrule"><span class="token rule">@value</span> <span class="token property">red</span><span class="token punctuation">:</span> #ff0000<span class="token punctuation">;</span></span>
<span class="token atrule"><span class="token rule">@value</span> <span class="token property">green</span><span class="token punctuation">:</span> #aaf200<span class="token punctuation">;</span></span>

<span class="token comment">/* index.module.css */</span>
<span class="token atrule"><span class="token rule">@value</span> <span class="token property">colors</span><span class="token punctuation">:</span> <span class="token string">&quot;./colors.css&quot;</span><span class="token punctuation">;</span></span>
<span class="token atrule"><span class="token rule">@value</span> blue<span class="token punctuation">,</span> red<span class="token punctuation">,</span> green from colors<span class="token punctuation">;</span></span>

<span class="token selector">.plain_text</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// index.jsx</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./index.module.css&#39;</span>

<span class="token keyword">function</span> <span class="token function">CSSModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>div className<span class="token operator">=</span><span class="token punctuation">{</span>styles<span class="token punctuation">.</span>plain_text<span class="token punctuation">}</span><span class="token operator">&gt;</span> <span class="token constant">CSS</span> Modules <span class="token operator">-</span> 使用变量 <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置-less-和-sass" tabindex="-1"><a class="header-anchor" href="#配置-less-和-sass" aria-hidden="true">#</a> 配置 less 和 sass</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// webpack 使用 css-loader 处理 CSS Modules 的基础配置</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">module</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.css$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">i</span></span><span class="token punctuation">,</span> <span class="token comment">// 匹配 .css 资源</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            <span class="token literal-property property">loader</span><span class="token operator">:</span> <span class="token string">&#39;css-loader&#39;</span><span class="token punctuation">,</span>
            <span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token literal-property property">modules</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token comment">// 自定义类名命名规则</span>
                <span class="token comment">// &gt; 开发环境使用  [path][name]__[local]</span>
                <span class="token comment">// &gt; 生产环境使用  [hash:base64]</span>
                <span class="token literal-property property">localIdentName</span><span class="token operator">:</span> <span class="token string">&#39;[path][name]__[local]--[hash:base64:5]&#39;</span><span class="token punctuation">,</span>

                <span class="token comment">// 其他配置项如下：</span>
                <span class="token comment">// mode: &#39;local&#39;, // 控制应用于输入样式的编译级别</span>
                <span class="token comment">// auto: true, // 当 modules 配置项为对象时允许基于文件名自动启用 CSS 模块或者 ICSS</span>
                <span class="token comment">// exportGlobals: true, // 允许 css-loader 从全局类或 ID 导出名称</span>
                <span class="token comment">// localIdentName: &#39;[path][name]__[local]--[hash:base64:5]&#39;, // 允许配置生成的本地标识符(ident)</span>
                <span class="token comment">// localIdentContext: path.resolve(__dirname, &#39;src&#39;), // 允许为本地标识符名称重新定义基本的 loader 上下文</span>
                <span class="token comment">// localIdentHashSalt: &#39;my-custom-hash&#39;, // 允许添加自定义哈希值以生成更多唯一类</span>
                <span class="token comment">// namedExport: true, // 本地环境启用 / 禁用 export 的 ES 模块</span>
                <span class="token comment">// exportLocalsConvention: &#39;camelCase&#39;, // 导出的类名称的样式</span>
                <span class="token comment">// exportOnlyLocals: false, // 仅导出局部环境</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            <span class="token comment">// ... 使用其他 loader</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token string">&#39;less-loader&#39;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组合方案" tabindex="-1"><a class="header-anchor" href="#组合方案" aria-hidden="true">#</a> 组合方案</h3><p>React 项目可能在使用 CSS 处理样式之外，还可以使用 scss 或者 less 进行预处理。</p><ul><li>可以约定对于全局样式或者是公共组件样式，可以使用 <code>.css</code> 文件 ，不需要做 CSS Modules 处理，这样就不需要写 <code>:global</code> 等繁琐语法。</li><li>对于项目中开发的页面和业务组件，统一用 scss 或者 less 等做 CSS Module，即 CSS 全局样式 + less / scss CSS Modules 方案。</li></ul><h3 id="动态添加-class" tabindex="-1"><a class="header-anchor" href="#动态添加-class" aria-hidden="true">#</a> 动态添加 class</h3><p>CSS Modules 可以配合 <code>classNames 库</code> 实现更灵活的动态添加类名。</p><div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token comment">/* index.module.css */</span>
<span class="token selector">.plain_text</span> <span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 16px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.dark</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.light</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span>
  <span class="token property">background</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> classnames <span class="token keyword">from</span> <span class="token string">&#39;classnames&#39;</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">&#39;./index.module.css&#39;</span>

<span class="token keyword">function</span> <span class="token function">CSSModules</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> <span class="token punctuation">[</span>theme<span class="token punctuation">,</span> setTheme<span class="token punctuation">]</span> <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">useState</span><span class="token punctuation">(</span><span class="token string">&#39;light&#39;</span><span class="token punctuation">)</span>

  <span class="token keyword">const</span> <span class="token function-variable function">changeTheme</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    <span class="token function">setTheme</span><span class="token punctuation">(</span>theme <span class="token operator">===</span> <span class="token string">&#39;light&#39;</span> <span class="token operator">?</span> <span class="token string">&#39;dark&#39;</span> <span class="token operator">:</span> <span class="token string">&#39;light&#39;</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>div
        className<span class="token operator">=</span><span class="token punctuation">{</span><span class="token function">classnames</span><span class="token punctuation">(</span>
          styles<span class="token punctuation">.</span>plain_text<span class="token punctuation">,</span>
          theme <span class="token operator">===</span> <span class="token string">&#39;light&#39;</span> <span class="token operator">?</span> styles<span class="token punctuation">.</span>light <span class="token operator">:</span> styles<span class="token punctuation">.</span>dark
        <span class="token punctuation">)</span><span class="token punctuation">}</span>
      <span class="token operator">&gt;</span>
        <span class="token constant">CSS</span> Modules <span class="token operator">-</span> classnames 动态添加 <span class="token keyword">class</span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>button onClick<span class="token operator">=</span><span class="token punctuation">{</span>changeTheme<span class="token punctuation">}</span><span class="token operator">&gt;</span>切换主题<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用技巧" tabindex="-1"><a class="header-anchor" href="#使用技巧" aria-hidden="true">#</a> 使用技巧</h3><p>CSS Modules 是对现有的 CSS 做减法。为了追求简单可控，作者建议遵循如下原则：</p><ul><li>不使用选择器，只使用 <code>class</code> 名来定义样式</li><li>不层叠多个 <code>class</code>，只使用一个 <code>class</code> 把所有样式定义好</li><li>所有样式通过 <code>composes</code> 组合来实现复用</li><li>不嵌套</li></ul><h2 id="css-in-js" tabindex="-1"><a class="header-anchor" href="#css-in-js" aria-hidden="true">#</a> CSS-in-JS</h2><p>CSS-in-JS 的实现原理，以 styled-components 为例：</p><ul><li>通过 styled-components，可以使用 ES6 的标签模板字符串语法（Tagged Templates）为需要 styled 的 Component 定义一系列 CSS 属性。</li><li>当该组件的 JS 代码被解析执行的时候，styled-components 会动态生成一个 CSS 选择器，并把对应的 CSS 样式通过 style 标签的形式插入到 head 标签里面。</li><li>动态生成的 CSS 选择器会有一小段哈希值来保证全局唯一性来避免样式发生冲突。</li><li>这种模式下，本质上是动态生成 style 标签。</li></ul><p>CSS-in-JS 特点:</p><ul><li>CSS-in-JS 本质上放弃了 css ，变成了 css in line 形式，所以根本上解决了全局污染，样式混乱等问题。</li><li>运用起来灵活，可以运用 js 特性，更灵活地实现样式继承，动态添加样式等场景。</li><li>由于编译器对 js 模块化支持度更高，使得可以在项目中更快地找到 style.js 样式文件，以及快捷引入文件中的样式常量。</li><li>无须 webpack 额外配置 css，less 等文件类型。</li></ul><h3 id="styled-components" tabindex="-1"><a class="header-anchor" href="#styled-components" aria-hidden="true">#</a> styled-components</h3><h4 id="基础用法" tabindex="-1"><a class="header-anchor" href="#基础用法" aria-hidden="true">#</a> 基础用法</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>

<span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  background: #6a8bad;
  color: #fff;
  min-width: 96px;
  height: 36px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 20px !important;
</span><span class="token template-punctuation string">\`</span></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token constant">CSSINJS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Button<span class="token operator">&gt;</span><span class="token constant">CSS</span><span class="token operator">-</span><span class="token keyword">in</span><span class="token operator">-</span><span class="token constant">JS</span><span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="基于-props-动态添加样式" tabindex="-1"><a class="header-anchor" href="#基于-props-动态添加样式" aria-hidden="true">#</a> 基于 props 动态添加样式</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">import</span> styled <span class="token keyword">from</span> <span class="token string">&#39;styled-components&#39;</span>

<span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  background: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token parameter">props</span> <span class="token operator">=&gt;</span> <span class="token punctuation">(</span>props<span class="token punctuation">.</span>theme <span class="token operator">?</span> props<span class="token punctuation">.</span>theme <span class="token operator">:</span> <span class="token string">&#39;#6a8bad&#39;</span><span class="token punctuation">)</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">;
  color: #fff;
  min-width: 96px;
  height: 36px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 20px !important;
</span><span class="token template-punctuation string">\`</span></span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token constant">CSSINJS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>Button theme<span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">&#39;#fc4838&#39;</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>props主题按钮<span class="token operator">&lt;</span><span class="token operator">/</span>Button<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="继承样式" tabindex="-1"><a class="header-anchor" href="#继承样式" aria-hidden="true">#</a> 继承样式</h4><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Button <span class="token operator">=</span> styled<span class="token punctuation">.</span>button<span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  background: #6a8bad;
  color: #fff;
  min-width: 96px;
  height: 36px;
  border: none;
  border-radius: 18px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 20px !important;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">const</span> NewButton <span class="token operator">=</span> <span class="token function">styled</span><span class="token punctuation">(</span>Button<span class="token punctuation">)</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">
  background: #fc4838;
  color: white;
</span><span class="token template-punctuation string">\`</span></span>

<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">function</span> <span class="token constant">CSSINJS</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">&gt;</span>
      <span class="token operator">&lt;</span>NewButton<span class="token operator">&gt;</span> 继承按钮<span class="token operator">&lt;</span><span class="token operator">/</span>NewButton<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">&gt;</span>
  <span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,55),o=[p];function l(c,i){return n(),a("div",null,o)}const d=s(t,[["render",l],["__file","模块化CSS.html.vue"]]);export{d as default};
