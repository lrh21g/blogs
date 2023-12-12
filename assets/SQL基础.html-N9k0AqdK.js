import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const p={},t=e(`<h1 id="sql-基础" tabindex="-1"><a class="header-anchor" href="#sql-基础" aria-hidden="true">#</a> SQL 基础</h1><ul><li>创建数据库： <code>CREATE DATABASE &lt;database_name&gt;</code></li><li>删除数据库： <code>DROP DATABASE &lt;database_name&gt;</code></li><li>创建数据库中的表： <code>CREATE TABLE &lt;table_name&gt;</code></li><li>删除数据库中的表： <code>DROP TABLE &lt;table_name&gt;</code></li></ul><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 使用 Navicat 设计表。导出 SQL 文件如下：</span>

<span class="token comment">-- 数据表和字段使用反引号，是为了避免它们名称与 MySQL 保留字段相同</span>
<span class="token comment">-- 先删除 player 表（如果数据库中存在该表的话），然后再创建 player 表</span>
<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">\`</span>player<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token comment">-- 创建球员表</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>player<span class="token punctuation">\`</span></span>  <span class="token punctuation">(</span>
  <span class="token comment">-- player_id      球员ID</span>
  <span class="token comment">-- int(11)        整数类型，显示长度为 11 位</span>
  <span class="token comment">-- NOT NULL       表示整个字段不能是空值</span>
  <span class="token comment">-- AUTO_INCREMENT 表示主键自动增长</span>
  <span class="token identifier"><span class="token punctuation">\`</span>player_id<span class="token punctuation">\`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token comment">-- team_id        球队ID</span>
  <span class="token comment">-- int(11)        整数类型，显示长度为 11 位</span>
  <span class="token comment">-- NOT NULL       表示整个字段不能是空值</span>
  <span class="token identifier"><span class="token punctuation">\`</span>team_id<span class="token punctuation">\`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token comment">-- player_name    球员姓名</span>
  <span class="token comment">-- varchar(255)   可变字符串类型，最大长度为 255</span>
  <span class="token comment">-- CHARACTER SET  指定数据库采用的字符集，utf8 不能写为 utf-8</span>
  <span class="token comment">-- COLLATE        指定数据库字符集的排序规则。utf8 的默认排序规则为 utf8_general_ci （表示对大小写不铭感， utf8_bin 表示对大小写敏感）</span>
  <span class="token comment">-- NOT NULL       表示整个字段不能是空值</span>
  <span class="token identifier"><span class="token punctuation">\`</span>player_name<span class="token punctuation">\`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> utf8 <span class="token keyword">COLLATE</span> utf8_general_ci <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  <span class="token comment">-- height         球员身高</span>
  <span class="token comment">-- float(size, d) 带有浮动小数点的小数字。size 表示规定显示最大位数， d 表示规定小数点右侧的最大位数</span>
  <span class="token comment">-- NULL           如果表中的某个列是可选的，那么可以在不向该列添加值的情况下插入新记录或更新已有的记录</span>
  <span class="token comment">--                意味着该字段将以 NULL 值保存。用作未知的或不适用的值的占位符。</span>
  <span class="token comment">-- DEFAULT        约束用于向列中插入默认值</span>
  <span class="token identifier"><span class="token punctuation">\`</span>height<span class="token punctuation">\`</span></span> <span class="token keyword">float</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token number">0.00</span><span class="token punctuation">,</span>
  <span class="token comment">-- PRIMARY KEY    约束唯一标识数据库表中的每条记录</span>
  <span class="token comment">--                主键必须包含唯一的值。主键列不能包含 NULL 值</span>
  <span class="token comment">--                每个表都应该有一个主键，并且每个表只能有一个主键</span>
  <span class="token comment">-- USING BTREE    索引方法采用 BTREE</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>player_id<span class="token punctuation">\`</span></span><span class="token punctuation">)</span> <span class="token keyword">USING</span> <span class="token keyword">BTREE</span><span class="token punctuation">,</span>
  <span class="token comment">-- UNIQUE         约束唯一标识数据库表中的每条记录</span>
  <span class="token comment">--                UNIQUE 和 PRIMARY KEY 约束均为列或列集合提供了唯一性的保证</span>
  <span class="token comment">--                PRIMARY KEY 约束拥有自动定义的 UNIQUE 约束</span>
  <span class="token comment">--                每个表可以有多个 UNIQUE 约束，但是每个表只能有一个 PRIMARY KEY 约束</span>
  <span class="token comment">-- UNIQUE INDEX   唯一索引。可设置其他索引方式 NORMAL INDEX（普通索引）</span>
  <span class="token comment">--                唯一索引和普通索引的区别在于它对字段进行了唯一性的约束</span>
  <span class="token keyword">UNIQUE</span> <span class="token keyword">INDEX</span> <span class="token identifier"><span class="token punctuation">\`</span>player_name<span class="token punctuation">\`</span></span><span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>player_name<span class="token punctuation">\`</span></span><span class="token punctuation">)</span> <span class="token keyword">USING</span> <span class="token keyword">BTREE</span>
<span class="token punctuation">)</span> 
<span class="token comment">-- ENGINE = InnoDB  存储规则采用 InnoDB</span>
<span class="token comment">-- ROW_FORMAT       设置行格式。Dynamic 基于compact格式，提高存储容量，支持大索引（large index）3072字节，由innodb_large_prefix参数控制。</span>
<span class="token keyword">ENGINE</span> <span class="token operator">=</span> <span class="token keyword">InnoDB</span> <span class="token keyword">CHARACTER</span> <span class="token keyword">SET</span> <span class="token operator">=</span> utf8 <span class="token keyword">COLLATE</span> <span class="token operator">=</span> utf8_general_ci ROW_FORMAT <span class="token operator">=</span> Dynamic<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SQL 大小写问题：</p><ul><li>表名、表别名、字段名、字段别名等都小写</li><li>SQL保留字、函数名、绑定变量等都大写</li></ul><p>注：数据表的字段名推荐使用<strong>下划线</strong>命名。</p>`,6),o=[t];function c(l,i){return s(),a("div",null,o)}const u=n(p,[["render",c],["__file","SQL基础.html.vue"]]);export{u as default};
