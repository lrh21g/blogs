import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as o,d as i,o as n}from"./app-54gzBNNV.js";const c={};function a(l,t){return n(),o("div",null,t[0]||(t[0]=[i('<h1 id="git-head" tabindex="-1"><a class="header-anchor" href="#git-head"><span>Git HEAD</span></a></h1><h2 id="head-简介" tabindex="-1"><a class="header-anchor" href="#head-简介"><span>HEAD 简介</span></a></h2><p><code>HEAD</code> 是当前分支引用的指针，它总是指向该分支上的最后一次提交。当做分支切换的时候，<code>HEAD</code> 是会跟着切换的，指针就会指向新的分支，其最终会落脚到某一个 commit 上。</p><h2 id="相对引用-n-n" tabindex="-1"><a class="header-anchor" href="#相对引用-n-n"><span>相对引用（^n / ~n）</span></a></h2><ul><li><code>(&lt;commit&gt; | HEAD)^n</code>：指 HEAD 的第 n 个父提交（HEAD存在多个父提交的情况下）。如果 HEAD 存在 N 个父提交，那么 n &lt; N</li><li><code>(&lt;commit&gt; | HEAD)~n</code>：指的是 HEAD 的第n个祖先提交</li><li><code>(&lt;commit&gt; | HEAD)~n = (&lt;commit&gt; | HEAD)^^^...(^的个数为n)</code></li></ul><p>示例：</p><ul><li><code>HEAD^</code> 代表 “第一父提交”，也就是 “HEAD的父提交”。也可以使用 <code>~</code> ，同样指向父提交，<code>HEAD^</code> 和 <code>HEAD~</code> 是等价的。</li><li><code>HEAD~2</code> 代表 “第一父提交的第一父提交”，也就是 “祖父提交” —— Git 会根据你指定的次数获取对应的第一父提交。</li><li><code>HEAD^^^</code> / <code>HEAD~3</code>，也是第一父提交的第一父提交的第一父提交</li></ul><h2 id="分离头指针-dastached-head" tabindex="-1"><a class="header-anchor" href="#分离头指针-dastached-head"><span>分离头指针（dastached HEAD）</span></a></h2><p><code>HEAD</code> 不仅仅可以指代当前分支的最后一次提交，还可以不与分支挂钩。在分离头指针的情况下，就指代到了具体的 commit 上。</p><p>分离头指针表示目前正工作在没有分支的状态下，即指向了某个具体的提交记录。</p><p>当在分离头指针的情况下，做了 commit 以及变更，如果后续再进行分支切换的时候，没有与分支挂钩的 commit 以及变更很有可能被 Git 当做垃圾给清除掉。</p><ul><li>如果需要做变更需要和某一个分支进行挂钩。</li><li>如果只是做一些尝试性的变更，则可以使用到分离头指针，后续不需要这些变更，就可以使用 git checkout 切换分支即可。</li></ul>',12)]))}const r=e(c,[["render",a]]),h=JSON.parse('{"path":"/%E5%85%B6%E4%BB%96/Git/git_head.html","title":"Git HEAD","lang":"zh-CN","frontmatter":{"description":"Git HEAD HEAD 简介 HEAD 是当前分支引用的指针，它总是指向该分支上的最后一次提交。当做分支切换的时候，HEAD 是会跟着切换的，指针就会指向新的分支，其最终会落脚到某一个 commit 上。 相对引用（^n / ~n） (<commit> | HEAD)^n：指 HEAD 的第 n 个父提交（HEAD存在多个父提交的情况下）。如果 H...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Git HEAD\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-28T08:18:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.LRH\\",\\"url\\":\\"https://lrh21g.github.io/blogs/\\"}]}"],["meta",{"property":"og:url","content":"https://lrh21g.github.io/blogs/%E5%85%B6%E4%BB%96/Git/git_head.html"}],["meta",{"property":"og:site_name","content":"Mr.LRH 博客"}],["meta",{"property":"og:title","content":"Git HEAD"}],["meta",{"property":"og:description","content":"Git HEAD HEAD 简介 HEAD 是当前分支引用的指针，它总是指向该分支上的最后一次提交。当做分支切换的时候，HEAD 是会跟着切换的，指针就会指向新的分支，其最终会落脚到某一个 commit 上。 相对引用（^n / ~n） (<commit> | HEAD)^n：指 HEAD 的第 n 个父提交（HEAD存在多个父提交的情况下）。如果 H..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-28T08:18:46.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-28T08:18:46.000Z"}]]},"git":{"createdTime":1618649014000,"updatedTime":1740730726000,"contributors":[{"name":"lrh21g","username":"lrh21g","email":"837233792@qq.com","commits":2,"url":"https://github.com/lrh21g"},{"name":"lingronghai","username":"lingronghai","email":"lingronghai@foxmail.com","commits":1,"url":"https://github.com/lingronghai"},{"name":"lrh","username":"lrh","email":"lingronghai@foxmail.com","commits":1,"url":"https://github.com/lrh"}]},"readingTime":{"minutes":1.52,"words":457},"filePathRelative":"其他/Git/git_head.md","excerpt":"\\n<h2>HEAD 简介</h2>\\n<p><code>HEAD</code> 是当前分支引用的指针，它总是指向该分支上的最后一次提交。当做分支切换的时候，<code>HEAD</code> 是会跟着切换的，指针就会指向新的分支，其最终会落脚到某一个 commit 上。</p>\\n<h2>相对引用（^n / ~n）</h2>\\n<ul>\\n<li><code>(&lt;commit&gt; | HEAD)^n</code>：指 HEAD 的第 n 个父提交（HEAD存在多个父提交的情况下）。如果 HEAD 存在 N 个父提交，那么 n &lt; N</li>\\n<li><code>(&lt;commit&gt; | HEAD)~n</code>：指的是 HEAD 的第n个祖先提交</li>\\n<li><code>(&lt;commit&gt; | HEAD)~n = (&lt;commit&gt; | HEAD)^^^...(^的个数为n)</code></li>\\n</ul>","autoDesc":true}');export{r as comp,h as data};
