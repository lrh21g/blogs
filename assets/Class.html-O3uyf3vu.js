import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const t={},p=e(`<h1 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> Class</h1><p>在面向对象的编程中，<code>Class</code> 是用于创建对象的可扩展的程序代码模版，它为对象提供了状态（成员变量）的初始值和行为（成员函数或方法）的实现。</p><h2 id="class-的使用" tabindex="-1"><a class="header-anchor" href="#class-的使用" aria-hidden="true">#</a> Class 的使用</h2><p>类（class）的属性和方法，除非显式定义在其本身（即定义在 <code>this</code> 对象上），否则都是定义在原型上（即定义在 <code>class</code> 上）。</p><p>类（class）通过 <code>static</code> 关键字定义静态方法。</p><ul><li>不能在类的实例上调用静态方法，而应该通过类本身调用。</li><li>静态方法中，调用同一个类中的其他静态方法，可使用 <code>this</code> 关键字。</li><li>非静态方法中，不能直接使用 <code>this</code> 关键字来访问静态方法。而是要用类名或者用构造函数的属性来调用： <ul><li>使用类名调用：<code>CLASSNAME.STATIC_METHOD_NAME()</code></li><li>使用构造函数的属性调用：<code>this.constructor.STATIC_METHOD_NAME()</code></li></ul></li></ul><p>通过 <code>new</code> 命令生成对象实例时，自动调用类的构造函数（默认返回实例对象（即 <code>this</code>））会执行如下操作:</p><ul><li>在内存中创建一个新对象。</li><li>这个新对象内部的 <code>[[Prototype]]</code> 指针被赋值为构造函数的 <code>prototype</code> 属性。</li><li>构造函数内部的 <code>this</code> 被赋值为这个新对象（即 <code>this</code> 指向新对象）。</li><li>执行构造函数内部的代码（给新对象添加属性）。</li><li>如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> getUserPrivateProp

<span class="token comment">// 类声明：类声明不会变量提升。首先需要声明类，然后再访问它，否则将抛出 ReferenceError 。</span>
<span class="token keyword">class</span> <span class="token class-name">User</span> <span class="token punctuation">{</span>
  <span class="token comment">// 将实例属性定义在类的顶部，比较清晰明了</span>

  publicProp <span class="token operator">=</span> <span class="token string">&#39;publicProp&#39;</span> <span class="token comment">// 公有属性声明</span>
  <span class="token doc-comment comment">/**
   * 私有属性声明：增加哈希前缀 # 的方法来定义私有类字段
   * &gt; 只能在类的内部使用（ this.#privateProp ）。如果在类的外部使用，就会报错。
   * &gt; 使用 this[&#39;#privateProp&#39;] 不起作用
   */</span>
  #privateProp <span class="token operator">=</span> <span class="token string">&#39;privateProp&#39;</span> <span class="token comment">// 私有属性声明</span>
  <span class="token keyword">static</span> staticProp <span class="token operator">=</span> <span class="token string">&#39;staticProp&#39;</span> <span class="token comment">// 静态属性</span>

  <span class="token comment">// 取值函数（getter）</span>
  <span class="token keyword">get</span> <span class="token function">prop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;getter prop&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 设置值函数（setter）</span>
  <span class="token keyword">set</span> <span class="token function">prop</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;setter prop: &#39;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 构造函数：类的默认方法，用于创建和初始化一个由 class 创建的对象。
   * &gt; 通过 new 命令生成对象实例时，自动调用该方法。默认返回实例对象（即 this）
   * &gt; 如果构造函数返回一个全新的对象，则会导致实例对象不是该 Class 类的实例
   */</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * new.target
     * 该属性一般用在构造函数之中，返回 new 命令作用于的那个构造函数，在函数外部，使用 new.target 会报错。
     * &gt; 如果构造函数不是通过 new 命令或 Reflect.construct() 调用的，new.target 会返回 undefined
     * &gt; 注：子类继承父类时，new.target 会返回子类
     * &gt; new 是从构造函数生成实例对象的命令，ES6 为 new 命令引入了一个 new.target 属性
     */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">new</span><span class="token punctuation">.</span>target <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 或者 new.target !== User</span>
      <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;必须使用 new 命令生成实例&#39;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>publicProp <span class="token operator">=</span> <span class="token string">&#39;publicProp&#39;</span> <span class="token comment">// 公有属性声明</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>#privateProp <span class="token operator">=</span> <span class="token string">&#39;privateProp&#39;</span> <span class="token comment">// 私有属性声明</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span>args <span class="token operator">=</span> args

    <span class="token comment">// 非静态方法中，使用类名或者用构造函数的属性来调用</span>
    User<span class="token punctuation">.</span><span class="token function">staticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>constructor<span class="token punctuation">.</span><span class="token function">staticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 静态块
   * &gt; 允许在类的内部设置一个代码块，在类生成时运行且只运行一次。
   * &gt; 每个类允许有多个静态块，每个静态块中只能访问之前声明的静态属性。
   * &gt; 主要作用是对静态属性进行初始化。同时，可以将私有属性与类的外部代码分享。
   * &gt; 静态块内部可以使用类名或 this，指代当前类。内部不能有return语句。
   */</span>
  <span class="token keyword">static</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;this.publicProp: &#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>publicProp<span class="token punctuation">)</span> <span class="token comment">// 使用 this 获取相关属性</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;User.publicProp: &#39;</span><span class="token punctuation">,</span> User<span class="token punctuation">.</span>publicProp<span class="token punctuation">)</span> <span class="token comment">// 使用 类名 获取相关属性</span>

    <span class="token function-variable function">getUserPrivateProp</span> <span class="token operator">=</span> <span class="token parameter">instance</span> <span class="token operator">=&gt;</span> instance<span class="token punctuation">.</span>#privateProp <span class="token comment">// 获取私有属性</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 私有属性不限于从 this 引用，只要是在类的内部，实例也可以引用私有属性</span>
  <span class="token keyword">static</span> <span class="token function">staticGetPrivateProp</span><span class="token punctuation">(</span><span class="token parameter">userInstance</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> userInstance<span class="token punctuation">.</span>#privateProp
  <span class="token punctuation">}</span>

  <span class="token comment">// 静态方法：该方法不会被实例继承，而是直接通过类来调用。</span>
  <span class="token keyword">static</span> <span class="token function">staticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;static method&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">anotherStaticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 静态方法中，调用同一个类中的其他静态方法，可使用 this 关键字。</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">staticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&#39; from another static method&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 公有方法</span>
  <span class="token function">publicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;publicMethod&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token doc-comment comment">/**
   * 私有方法
   * &gt; 增加哈希前缀 # 的方法来定义私有类字段。
   * &gt; 只能在类的内部使用（ this.#privateMethod() ）。如果在类的外部使用，就会报错。
   * &gt; 使用 this[&#39;#privateMethod&#39;]() 不起作用
   */</span>
  <span class="token function">#privateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;privateMethod&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 计算属性名称</span>
  <span class="token punctuation">[</span><span class="token string">&#39;method&#39;</span> <span class="token operator">+</span> <span class="token string">&#39;Name&#39;</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;method Name&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 在某方法名之前添加 * 号，表示该方法是一个 Generator 函数</span>
  <span class="token operator">*</span><span class="token punctuation">[</span>Symbol<span class="token punctuation">.</span>iterator<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> arg <span class="token keyword">of</span> <span class="token keyword">this</span><span class="token punctuation">.</span>args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">yield</span> arg
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

User<span class="token punctuation">.</span>name <span class="token comment">// &#39;User&#39;，返回紧跟在 class 关键字后面的类名</span>

User<span class="token punctuation">.</span><span class="token function">staticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;static method&#39;，调用类的静态方法</span>
User<span class="token punctuation">.</span><span class="token function">staticGetPrivateProp</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &#39;privateProp&#39;，调用类的静态方法获取私有属性</span>
User<span class="token punctuation">.</span>staticProp <span class="token comment">// &#39;staticProp&#39;，调用类的静态属性</span>

<span class="token function">getUserPrivateProp</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// &#39;privateProp&#39;，获取类的私有属性</span>

<span class="token keyword">let</span> userInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 实例化。类必需使用 new 调用，否则会报错</span>
<span class="token comment">// userInstance.staticMethod() // 通过实例调用类的静态方法会报错。TypeError: userInstance.staticMethod is not a function</span>
<span class="token comment">// userInstance.staticProp // undefined，通过实例调用类的静态属性</span>

<span class="token comment">// 类表达式</span>
<span class="token comment">// 类表达式中的类可以有一个名字。如果类表达式有名字，该名字仅在类内部可见。</span>
<span class="token keyword">let</span> User <span class="token operator">=</span> <span class="token keyword">class</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// let User = class MyClass {} // MyClass 类名仅在类内部可见，外部使用会报错</span>
<span class="token keyword">let</span> userInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="class-继承" tabindex="-1"><a class="header-anchor" href="#class-继承" aria-hidden="true">#</a> Class 继承</h2><p>ES6 类支持单继承。使用 <code>extends</code> 关键字，可以继承任何拥有 <code>[[Construct]]</code> 和原型的对象。</p><h3 id="super" tabindex="-1"><a class="header-anchor" href="#super" aria-hidden="true">#</a> super</h3><p>派生类的方法可以通过 <code>super</code> 关键字引用它们的原型。这个关键字只能在派生类中使用，而且仅限于类构造函数、实例方法和静态方法内部。</p><p>使用 <code>super</code> 的注意事项：</p><ul><li><code>super</code> 只能在派生类构造函数和静态方法中使用。</li><li>不能单独引用 <code>super</code> 关键字，要么用它调用构造函数，要么用它引用静态方法。</li><li>在类构造函数中，不能在调用 <code>super()</code> 之前引用 <code>this</code>。</li><li>调用 <code>super()</code> 会调用父类构造函数，并将返回的实例赋值给 <code>this</code>，将父类的实例属性和方法放到 <code>this</code> 对象上。</li><li><code>super()</code> 的行为如同调用构造函数，如果需要给父类构造函数传参，则需要手动传入。</li><li>如果没有定义类构造函数，在实例化派生类时会调用 <code>super()</code>，而且会传入所有传给派生类的参数。</li><li>如果在派生类中显式定义了构造函数，则要么必须在其中调用 <code>super()</code>，要么必须在其中返回一个对象。</li><li><code>super</code> 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。</li></ul><h3 id="class-继承示例" tabindex="-1"><a class="header-anchor" href="#class-继承示例" aria-hidden="true">#</a> Class 继承示例</h3><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  publicSameNameProp <span class="token operator">=</span> <span class="token string">&#39;parentPublicSameNameProp&#39;</span> <span class="token comment">// 父类同名属性</span>
  #parentPrivateProp <span class="token operator">=</span> <span class="token string">&#39;parentPrivateProp&#39;</span> <span class="token comment">// 父类私有属性</span>
  <span class="token keyword">static</span> parentStaticProp <span class="token operator">=</span> <span class="token string">&#39;parentStaticProp&#39;</span> <span class="token comment">// 静态属性</span>
  <span class="token keyword">static</span> parentStaticObj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

  <span class="token comment">// 父类私有方法</span>
  <span class="token function">#parentPrivateMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;parentPrivateMethod&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>param <span class="token operator">=</span> param
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">parentStaticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;parentStaticMethod&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// 公有方法</span>
  <span class="token function">parentPublicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">&#39;parentPublicMethod&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">getParentPrivateProp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#parentPrivateProp
  <span class="token punctuation">}</span>

  <span class="token function">getParamByParent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>param<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  publicSameNameProp <span class="token operator">=</span> <span class="token string">&#39;childPublicSameNameProp&#39;</span>

  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">param</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 不要在调用 super()之前引用 this，否则会抛出 ReferenceError</span>

    <span class="token keyword">super</span><span class="token punctuation">(</span>param<span class="token punctuation">)</span>
    <span class="token comment">// 相当于 super.constructor()</span>
    <span class="token comment">// 相当于 A.prototype.constructor.call(this)</span>

    <span class="token comment">// super 普通方法之中指向父类的原型对象</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">parentPublicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentPublicMethod&#39;</span>

    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">parentPublicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentPublicMethod&#39;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getParentPrivateProp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentPrivateProp&#39;，通过父类定义的私有属性读写方法获取父类私有属性</span>

    <span class="token comment">// 父类的静态属性和静态方法，也会被子类继承</span>
    Child<span class="token punctuation">.</span>parentStaticProp <span class="token comment">// &#39;parentStaticProp&#39;</span>
    Child<span class="token punctuation">.</span><span class="token function">parentStaticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentStaticMethod&#39;</span>
    <span class="token comment">// 子类继承父类静态属性时，会采用浅拷贝。</span>
    <span class="token comment">// 如果父类静态属性是一个对象，浅拷贝只会拷贝对象的内存地址，修改对象则会影响到父类</span>
    Child<span class="token punctuation">.</span>parentStaticObj <span class="token comment">// {}</span>

    <span class="token comment">// 子类无法继承父类的私有属性</span>
    <span class="token comment">// console.log(this.#parentPrivateProp) // 报错</span>
    <span class="token comment">// this.#parentPrivateMethod() // 报错</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">static</span> <span class="token function">childStaticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// super 在静态方法之中指向父类</span>
    <span class="token comment">// 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">parentStaticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentStaticMethod&#39;</span>
  <span class="token punctuation">}</span>

  <span class="token function">childPublicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// super 普通方法之中指向父类的原型对象</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">parentPublicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentPublicMethod&#39;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> child <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
child<span class="token punctuation">.</span><span class="token function">parentPublicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentPublicMethod&#39;</span>
child<span class="token punctuation">.</span><span class="token function">getParentPrivateProp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentPrivateProp&#39;</span>

<span class="token comment">// 父类的静态属性和静态方法，也会被子类继承</span>
Child<span class="token punctuation">.</span>parentStaticProp <span class="token comment">// &#39;parentStaticProp&#39;</span>
Child<span class="token punctuation">.</span><span class="token function">parentStaticMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &#39;parentStaticMethod&#39;</span>
Child<span class="token punctuation">.</span>parentStaticObj <span class="token comment">// {}</span>

child <span class="token keyword">instanceof</span> <span class="token class-name">Parent</span> <span class="token comment">// true</span>


<span class="token keyword">class</span> <span class="token class-name">Child2</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span>
  publicSameNameProp <span class="token operator">=</span> <span class="token string">&#39;child2PublicSameNameProp&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 由于 super() 在子类构造方法中执行时，子类的属性和方法还没有绑定到 this，所以如果存在同名属性，此时拿到的是父类的属性</span>
<span class="token keyword">let</span> child2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Child2</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
child2<span class="token punctuation">.</span>publicSameNameProp <span class="token comment">// &#39;parentPublicSameNameProp&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="类的原型与原型链" tabindex="-1"><a class="header-anchor" href="#类的原型与原型链" aria-hidden="true">#</a> 类的原型与原型链</h3><p>Class 作为构造函数的语法糖，同时有 <code>prototype</code> 属性和 <code>__proto__</code> 属性，因此同时存在两条继承链。</p><ul><li>子类的 <code>__proto__</code> 属性，表示构造函数的继承，总是指向父类。</li><li>子类 <code>prototype</code> 属性的 <code>__proto__</code> 属性，表示方法的继承，总是指向父类的 <code>prototype</code> 属性。</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

Child<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> Parent <span class="token comment">// true</span>
<span class="token class-name">Child</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Parent</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>

<span class="token comment">// 类的继承是按照下面的模式实现</span>
<span class="token keyword">class</span> <span class="token class-name">Parent</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span><span class="token class-name">Child</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token class-name">Parent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
<span class="token comment">// 等同于 Child.prototype.__proto__ = Parent.prototype</span>
Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span>Child<span class="token punctuation">,</span> Parent<span class="token punctuation">)</span>
<span class="token comment">// 等同于 Child.__proto__ = Parent</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>extends</code> 关键字后面可以跟多种类型的值。</p><ul><li><p>子类继承 <code>Object</code> 类</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 该场景下， A 其实是构造函数 Object 的复制，A 的实例就是 Object 的实例。</span>
<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token keyword">extends</span> <span class="token class-name">Object</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token constant">A</span><span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> Object <span class="token comment">// true</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>不存在任何继承</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 该场景下，A作为一个基类（即不存在任何继承），就是一个普通函数，直接继承 Function.prototype</span>
<span class="token comment">// A 调用后返回一个空对象（即 Object 实例），所以 A.prototype.__proto__ 指向构造函数（Object）的 prototype 属性。</span>
<span class="token keyword">class</span> <span class="token class-name">A</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token constant">A</span><span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Function</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
<span class="token class-name">A</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> <span class="token class-name">Object</span><span class="token punctuation">.</span>prototype <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>子类实例的 <code>__proto__</code> 属性的 <code>__proto__</code> 属性，指向父类实例的 <code>__proto__</code> 属性。也就是说，子类的原型的原型，是父类的原型。</p><p>通过子类实例的 <code>__proto__.__proto__</code> 属性，可以修改父类实例的行为。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">var</span> p1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Point</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> p2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ColorPoint</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token string">&#39;red&#39;</span><span class="token punctuation">)</span> <span class="token comment">// ColorPoint 继承 Point</span>

p2<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> p1<span class="token punctuation">.</span>__proto__ <span class="token comment">// false</span>
p2<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__ <span class="token operator">===</span> p1<span class="token punctuation">.</span>__proto__ <span class="token comment">// true</span>

p2<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span>__proto__<span class="token punctuation">.</span><span class="token function-variable function">printName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;Ha&#39;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

p1<span class="token punctuation">.</span><span class="token function">printName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// &quot;Ha&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="原生构造函数的继承" tabindex="-1"><a class="header-anchor" href="#原生构造函数的继承" aria-hidden="true">#</a> 原生构造函数的继承</h3><p>ECMAScript 的原生构造函数大致包括 <code>Boolean()</code>、<code>Number()</code>、<code>String()</code>、<code>Array()</code>、<code>Date()</code>、<code>Function()</code>、<code>RegExp()</code>、<code>Error()</code>、<code>Object()</code>。</p><p>在 ES5 中，是先新建子类的实例对象 <code>this</code>，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，<code>Array</code> 构造函数有一个内部属性 <code>[[DefineOwnProperty]]</code> ，用来定义新属性时，更新 <code>length</code> 属性，这个内部属性无法在子类获取，导致子类的 <code>length</code> 属性行为不正常。</p><p>在 ES6 中，允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象 <code>this</code>，然后再用子类的构造函数修饰 <code>this</code>，使得父类的所有行为都可以继承。</p><p><code>extends</code> 不仅可以用来继承类，还可以用来继承原生的构造函数。因此可以在原生数据结构的基础上，定义自己的数据结构。</p><ul><li><p>继承 <code>Array</code> ，定义了一个带版本功能的数组</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">VersionedArray</span> <span class="token keyword">extends</span> <span class="token class-name">Array</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>history <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
  <span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">revert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>length<span class="token punctuation">,</span> <span class="token operator">...</span><span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">[</span><span class="token keyword">this</span><span class="token punctuation">.</span>history<span class="token punctuation">.</span>length <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">VersionedArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arr <span class="token comment">// [1, 2]</span>
arr<span class="token punctuation">.</span>history <span class="token comment">// [[]]</span>

arr<span class="token punctuation">.</span><span class="token function">commit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arr<span class="token punctuation">.</span>history <span class="token comment">// [[], [1, 2]]</span>

arr<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arr <span class="token comment">// [1, 2, 3]</span>
arr<span class="token punctuation">.</span>history <span class="token comment">// [[], [1, 2]]</span>

arr<span class="token punctuation">.</span><span class="token function">revert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
arr <span class="token comment">// [1, 2]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>继承 <code>Error</code> ，定制报错时的行为</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">ExtendableError</span> <span class="token keyword">extends</span> <span class="token class-name">Error</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">message</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>message <span class="token operator">=</span> message
    <span class="token keyword">this</span><span class="token punctuation">.</span>stack <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>stack
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>constructor<span class="token punctuation">.</span>name
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">MyError</span> <span class="token keyword">extends</span> <span class="token class-name">ExtendableError</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">m</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span>m<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> myerror <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MyError</span><span class="token punctuation">(</span><span class="token string">&#39;ll&#39;</span><span class="token punctuation">)</span>
myerror<span class="token punctuation">.</span>message <span class="token comment">// &quot;ll&quot;</span>
myerror <span class="token keyword">instanceof</span> <span class="token class-name">Error</span> <span class="token comment">// true</span>
myerror<span class="token punctuation">.</span>name <span class="token comment">// &quot;MyError&quot;</span>
myerror<span class="token punctuation">.</span>stack
<span class="token comment">// Error</span>
<span class="token comment">//     at MyError.ExtendableError</span>
<span class="token comment">//     ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>继承 <code>Object</code></p><p>继承 <code>Object</code> 存在行为差异。<code>NewObj</code> 继承了 <code>Object</code>，但是无法通过 <code>super</code> 方法向父类 <code>Object</code> 传参。 [] 因为 ES6 改变了 <code>Object</code> 构造函数的行为，一旦发现 <code>Object</code> 方法不是通过 <code>new Object()</code> 形式调用，ES6 规定 <code>Object</code> 构造函数会忽略参数。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">class</span> <span class="token class-name">NewObj</span> <span class="token keyword">extends</span> <span class="token class-name">Object</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token operator">...</span>arguments<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> o <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NewObj</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">attr</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
o<span class="token punctuation">.</span>attr <span class="token operator">===</span> <span class="token boolean">true</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="mixin-模式" tabindex="-1"><a class="header-anchor" href="#mixin-模式" aria-hidden="true">#</a> Mixin 模式</h3><ul><li><p>将多个类的接口“混入”（mixin）另一个类</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">mix</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>mixins</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">class</span> <span class="token class-name">Mix</span> <span class="token punctuation">{</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> mixin <span class="token keyword">of</span> mixins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">copyProperties</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">mixin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 拷贝实例属性</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> mixin <span class="token keyword">of</span> mixins<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">copyProperties</span><span class="token punctuation">(</span>Mix<span class="token punctuation">,</span> mixin<span class="token punctuation">)</span> <span class="token comment">// 拷贝静态属性</span>
    <span class="token function">copyProperties</span><span class="token punctuation">(</span><span class="token class-name">Mix</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> mixin<span class="token punctuation">.</span>prototype<span class="token punctuation">)</span> <span class="token comment">// 拷贝原型属性</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> Mix
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">copyProperties</span><span class="token punctuation">(</span><span class="token parameter">target<span class="token punctuation">,</span> source</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> key <span class="token keyword">of</span> Reflect<span class="token punctuation">.</span><span class="token function">ownKeys</span><span class="token punctuation">(</span>source<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!==</span> <span class="token string">&#39;constructor&#39;</span> <span class="token operator">&amp;&amp;</span> key <span class="token operator">!==</span> <span class="token string">&#39;prototype&#39;</span> <span class="token operator">&amp;&amp;</span> key <span class="token operator">!==</span> <span class="token string">&#39;name&#39;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> desc <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>source<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
      Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> key<span class="token punctuation">,</span> desc<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 使用</span>
<span class="token keyword">class</span> <span class="token class-name">DistributedEdit</span> <span class="token keyword">extends</span> <span class="token class-name">mix</span><span class="token punctuation">(</span>Loggable<span class="token punctuation">,</span> Serializable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>构造一个拥有实用方法的对象，将这些实用的方法合并到任何类的原型中，需要注意 Mixins 覆盖现有类的方法。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> eventMixin <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token doc-comment comment">/**
   * 订阅事件
   * 用法： menu.on(&#39;select&#39;, function(item) <span class="token punctuation">{</span> ... <span class="token punctuation">}</span>
   */</span>
  <span class="token function">on</span><span class="token punctuation">(</span><span class="token parameter">eventName<span class="token punctuation">,</span> handler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers<span class="token punctuation">)</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>handler<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token doc-comment comment">/**
   * 取消订阅
   * 用法： menu.off(&#39;select&#39;, handler)
   */</span>
  <span class="token function">off</span><span class="token punctuation">(</span><span class="token parameter">eventName<span class="token punctuation">,</span> handler</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> handlers <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers<span class="token operator">?.</span><span class="token punctuation">[</span>eventName<span class="token punctuation">]</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>handlers<span class="token punctuation">)</span> <span class="token keyword">return</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> handlers<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>handlers<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">===</span> handler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        handlers<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span>i<span class="token operator">--</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>

  <span class="token doc-comment comment">/**
   * 生成具有给定名称和数据的事件
   * 用法： this.trigger(&#39;select&#39;, data1, data2);
   */</span>
  <span class="token function">trigger</span><span class="token punctuation">(</span><span class="token parameter">eventName<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers<span class="token operator">?.</span><span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token comment">// 该事件名称没有对应的事件处理程序（handler）</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 调用事件处理程序（handler）</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_eventHandlers<span class="token punctuation">[</span>eventName<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">handler</span> <span class="token operator">=&gt;</span> <span class="token function">handler</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// 将实用的方法合并到任何类的原型中</span>

<span class="token comment">// 创建一个 class</span>
<span class="token keyword">class</span> <span class="token class-name">Menu</span> <span class="token punctuation">{</span>
  <span class="token function">choose</span><span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">trigger</span><span class="token punctuation">(</span><span class="token string">&#39;select&#39;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 添加带有事件相关方法的 mixin</span>
Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">(</span><span class="token class-name">Menu</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> eventMixin<span class="token punctuation">)</span>

<span class="token keyword">let</span> menu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Menu</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 添加一个事件处理程序（handler），在被选择时被调用：</span>
menu<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">&#39;select&#39;</span><span class="token punctuation">,</span> <span class="token parameter">value</span> <span class="token operator">=&gt;</span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">Value selected: </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>value<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">// 触发事件 =&gt; 运行上述的事件处理程序（handler）并显示：</span>
<span class="token comment">// 被选中的值：123</span>
menu<span class="token punctuation">.</span><span class="token function">choose</span><span class="token punctuation">(</span><span class="token string">&#39;123&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,34),c=[p];function o(i,l){return s(),a("div",null,c)}const d=n(t,[["render",o],["__file","Class.html.vue"]]);export{d as default};
