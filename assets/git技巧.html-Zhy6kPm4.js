import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as e,e as a}from"./app-VLgNDF8W.js";const i="/blogs/assets/gitskill03.drawio-pMxMa1zi.png",t="/blogs/assets/gitskill01.drawio-FQXdU50K.png",c="/blogs/assets/gitskill02.drawio-V9EgNdsf.png",l={},m=a(`<h1 id="git-技巧" tabindex="-1"><a class="header-anchor" href="#git-技巧" aria-hidden="true">#</a> Git 技巧</h1><h2 id="git-修改分支名称" tabindex="-1"><a class="header-anchor" href="#git-修改分支名称" aria-hidden="true">#</a> Git 修改分支名称</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 老分支名: oldBranchName 新分支名: newBranchName</span>

<span class="token comment"># 1、本地分支重命名（未推送至远程）</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-m</span> oldBranchName newBranchName

<span class="token comment"># 2、远程分支重命名（推送至远程）</span>
<span class="token comment"># 2.1、删除远程分支</span>
$ <span class="token function">git</span> push <span class="token parameter variable">--delete</span> origin oldBranchName
<span class="token comment"># 2.2、上传新分支名</span>
$ <span class="token function">git</span> push origin newBranchName
<span class="token comment"># 2.3、将修改后的本地分支与远程分支关联</span>
$ <span class="token function">git</span> branch --set-upstream-to origin/newBranchName
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="恢复删除分支中指定的提交" tabindex="-1"><a class="header-anchor" href="#恢复删除分支中指定的提交" aria-hidden="true">#</a> 恢复删除分支中指定的提交</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1、使用 git reflog 查看提交记录，找到需要回复的 commit</span>
$ <span class="token function">git</span> reflog

<span class="token comment"># 2、使用 cherry-pick 指定一个 commit，合并进当前分支</span>
$ <span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>

<span class="token comment"># 如果删除提交记录较多，可以创建新的分支，并指向指定的 commit</span>
$ <span class="token function">git</span> branch <span class="token operator">&lt;</span>new-branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="取消合并了错误的分支" tabindex="-1"><a class="header-anchor" href="#取消合并了错误的分支" aria-hidden="true">#</a> 取消合并了错误的分支</h2><p>场景：基于当前分支 bugFix 进行开发，在中途合并了 dev 分支，并提交了几次变更，此时，需要取消合并 dev 的操作。</p><p><img src="`+i+`" alt="gitskill03"></p><h2 id="整理历史提交记录" tabindex="-1"><a class="header-anchor" href="#整理历史提交记录" aria-hidden="true">#</a> 整理历史提交记录</h2><p>Git 没有改变历史的工具，可以使用变基工具来变基一系列提交，基于它们原来的 HEAD 而不是将其移动到另一个新的上面。通过交互式变基工具，可以在任何想要修改的提交后停止，然后修改信息、添加文件或做任何想做的事情。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 如果想要修改提交，则需要指定到修改提交的父提交</span>
<span class="token function">git</span> rebase <span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>commit-parentid<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>修改历史提交记录中提交信息：使用 <code>reword</code> 指令</p></li><li><p>将连续多个 commit 整理成1个：使用 <code>squash</code> 指令</p><p>基于需要合并的多个 commit 中的第一个，将其他的 commit 前的 <code>pick</code> 指令修改为 <code>squash</code> 指令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pick 97664e1452 fix <span class="token comment">#74622.</span>
pick 0ef0d2d65a fix <span class="token comment">#109765.</span>
pick 67f3113760 terminal: update typeahead tests -- change <span class="token builtin class-name">test</span>
pick 2aaff002dd fix <span class="token comment">#40713.</span>

<span class="token comment"># 将 97664e1452、0ef0d2d65a、67f3113760、2aaff002dd 合并成一个 commit</span>
<span class="token comment"># 则将 97664e1452 保持不变，0ef0d2d65a、67f3113760、2aaff002dd 前的指令修改为 squash</span>
pick 97664e1452 fix <span class="token comment">#74622.</span>
squash 0ef0d2d65a fix <span class="token comment">#109765.</span>
squash 67f3113760 terminal: update typeahead tests -- change <span class="token builtin class-name">test</span>
squash 2aaff002dd fix <span class="token comment">#40713.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>将间隔的 commit 整理成1个：使用 <code>squash</code> 指令</p><p>基于需要合并间隔的 commit 中的第一个，将其他的 commit 前的移动到第一个后面，并将 <code>pick</code> 指令修改为 <code>squash</code> 指令。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pick 97664e1452 fix <span class="token comment">#74622.</span>
pick 0ef0d2d65a fix <span class="token comment">#109765.</span>
pick 67f3113760 terminal: update typeahead tests -- change <span class="token builtin class-name">test</span>
pick 2aaff002dd fix <span class="token comment">#40713.</span>

<span class="token comment"># 将 97664e1452、2aaff002dd 合并成一个 commit</span>
<span class="token comment"># 则将原有的 pick 2aaff002dd 移动到 pick 97664e1452 后面，并修改为 squash 2aaff002dd</span>
pick 97664e1452 fix <span class="token comment">#74622.</span>
squash 2aaff002dd fix <span class="token comment">#40713.</span>
pick 0ef0d2d65a fix <span class="token comment">#109765.</span>
pick 67f3113760 terminal: update typeahead tests -- change <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>示例：修改历史提交记录中提交信息</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看最近3条的提交记录简洁版本</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">-n3</span>
67817c33a1 <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master, origin/master, origin/HEAD<span class="token punctuation">)</span> fix <span class="token comment">#40713.</span>
bb8d5f1842 terminal: update typeahead tests
0ef0d2d65a fix <span class="token comment">#109765.</span>

<span class="token comment"># 修改 bb8d5f1842 commit 提交信息，则需要指定到他的父提交 0ef0d2d65a commit</span>
<span class="token comment"># 注意：相对于正常使用的 log 命令，这些提交显示的顺序是相反的</span>
<span class="token comment"># 交互式变基给你一个它将会运行的脚本。它将会从你在命令行中指定的提交（0ef0d2d65a）开始，从上到下的依次重演每一个提交引入的修改。</span>
$ <span class="token function">git</span> rebase <span class="token parameter variable">-i</span> 0ef0d2d65a
pick bb8d5f1842 terminal: update typeahead tests
pick 67817c33a1 fix <span class="token comment">#40713.</span>

<span class="token comment"># Rebase 0ef0d2d65a..67817c33a1 onto 0ef0d2d65a (2 commands)</span>
<span class="token comment">#</span>
<span class="token comment"># Commands:</span>
<span class="token comment"># p, pick &lt;commit&gt; = use commit</span>
<span class="token comment"># r, reword &lt;commit&gt; = use commit, but edit the commit message</span>
<span class="token comment"># e, edit &lt;commit&gt; = use commit, but stop for amending</span>
<span class="token comment"># s, squash &lt;commit&gt; = use commit, but meld into previous commit</span>
<span class="token comment"># f, fixup &lt;commit&gt; = like &quot;squash&quot;, but discard this commit&#39;s log message</span>
<span class="token comment"># x, exec &lt;command&gt; = run command (the rest of the line) using shell</span>
<span class="token comment"># b, break = stop here (continue rebase later with &#39;git rebase --continue&#39;)</span>
<span class="token comment"># d, drop &lt;commit&gt; = remove commit</span>
<span class="token comment"># l, label &lt;label&gt; = label current HEAD with a name</span>
<span class="token comment"># t, reset &lt;label&gt; = reset HEAD to a label</span>
<span class="token comment"># m, merge [-C &lt;commit&gt; | -c &lt;commit&gt;] &lt;label&gt; [# &lt;oneline&gt;]</span>
<span class="token comment"># .       create a merge commit using the original merge commit&#39;s</span>
<span class="token comment"># .       message (or the oneline, if no original merge commit was</span>
<span class="token comment"># .       specified). Use -c &lt;commit&gt; to reword the commit message.</span>
<span class="token comment">#</span>
<span class="token comment"># These lines can be re-ordered; they are executed from top to bottom.</span>
<span class="token comment">#</span>
<span class="token comment"># If you remove a line here THAT COMMIT WILL BE LOST.</span>
<span class="token comment">#</span>
<span class="token comment"># However, if you remove everything, the rebase will be aborted.</span>
<span class="token comment">#</span>

<span class="token comment"># 将想要修改的提交前面的 pick 修改为 reword</span>
<span class="token comment"># 使用 :wq 保存退出。此时 Git 会弹出另外一个交互页面</span>
terminal: update typeahead tests

<span class="token comment"># Please enter the commit message for your changes. Lines starting</span>
<span class="token comment"># with &#39;#&#39; will be ignored, and an empty message aborts the commit.</span>
<span class="token comment">#</span>
<span class="token comment"># Author:    Connor Peet &lt;connor@peet.io&gt;</span>
<span class="token comment"># Date:      Wed Nov 11 14:37:54 2020 -0800</span>
<span class="token comment">#</span>
<span class="token comment"># interactive rebase in progress; onto 0ef0d2d65a</span>
<span class="token comment"># Last command done (1 command done):</span>
<span class="token comment">#    reword bb8d5f1842 terminal: update typeahead tests</span>
<span class="token comment"># Next command to do (1 remaining command):</span>
<span class="token comment">#    pick 67817c33a1 fix #40713.</span>
<span class="token comment"># You are currently editing a commit while rebasing branch &#39;master&#39; on &#39;0ef0d2d65a&#39;.</span>
<span class="token comment">#</span>
<span class="token comment"># Changes to be committed:</span>
<span class="token comment">#       modified:   src/vs/workbench/contrib/terminal/test/browser/terminalTypeahead.test.ts</span>
<span class="token comment">#</span>

<span class="token comment"># 修改提交信息，修改为 ”terminal: update typeahead tests -- change test“</span>
<span class="token comment"># 使用 :wq 保存退出。提示如下信息，则表示修改成功。</span>
<span class="token comment"># $ git rebase -i 0ef0d2d65a</span>
<span class="token comment"># Rebasing (1/2)</span>
<span class="token comment"># &gt; husky - npm run -s precommit</span>
<span class="token comment"># &gt; husky - node v12.18.1</span>
<span class="token comment">#</span>
<span class="token comment"># [detached HEAD 67f3113760] terminal: update typeahead tests -- change test</span>
<span class="token comment">#  Author: Connor Peet &lt;connor@peet.io&gt;</span>
<span class="token comment">#  Date: Wed Nov 11 14:37:54 2020 -0800</span>
<span class="token comment">#  1 file changed, 17 insertions(+), 13 deletions(-)</span>
<span class="token comment"># Successfully rebased and updated refs/heads/master.</span>

<span class="token comment"># 查看提交记录</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span> <span class="token parameter variable">-n3</span>
2aaff002dd <span class="token punctuation">(</span>HEAD -<span class="token operator">&gt;</span> master<span class="token punctuation">)</span> fix <span class="token comment">#40713.</span>
67f3113760 terminal: update typeahead tests -- change <span class="token builtin class-name">test</span>
0ef0d2d65a fix <span class="token comment">#109765.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="只提取一个提交记录" tabindex="-1"><a class="header-anchor" href="#只提取一个提交记录" aria-hidden="true">#</a> 只提取一个提交记录</h2><p>场景：基于 commit02 新建 bugFix 分支进行 bug 修复，提交了两次变更记录，分别在 commit03 、 commit04 中增加调试代码。在 commit05 中完成 bug 修复。此时，想去除调试代码进行提交。</p><p><img src="`+t+'" alt="gitskill01"></p><h2 id="修改提交记录-尽管不是最新的" tabindex="-1"><a class="header-anchor" href="#修改提交记录-尽管不是最新的" aria-hidden="true">#</a> 修改提交记录（尽管不是最新的）</h2><p>场景：基于 commit02 新建 newTopic 分支，提交一次记录 commit03 。基于 commit03 新建 topicDetail 分支，提交了一次记录 commit04 。此时，需要对 commit03 提交记录进行调整，尽管 commit03 提交记录不是最新的。</p><p><img src="'+c+'" alt="gitskill02"></p>',20),d=[m];function o(p,r){return s(),e("div",null,d)}const b=n(l,[["render",o],["__file","git技巧.html.vue"]]);export{b as default};
