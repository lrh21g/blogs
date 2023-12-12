import{_ as n}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as s,c as a,e}from"./app-VLgNDF8W.js";const i="/blogs/assets/gitrebase.drawio-VX9aClUQ.png",l={},t=e(`<h1 id="git-命令" tabindex="-1"><a class="header-anchor" href="#git-命令" aria-hidden="true">#</a> Git 命令</h1><h2 id="基础配置" tabindex="-1"><a class="header-anchor" href="#基础配置" aria-hidden="true">#</a> 基础配置</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 缺省等同于 local</span>
$ <span class="token function">git</span> config

<span class="token comment"># local 只对某个仓库有效</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--local</span>

<span class="token comment"># global 对当前用户所有仓库有效</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span>

<span class="token comment"># system 对系统所有登陆的用户有效</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--system</span>

<span class="token comment"># 显示 config 的配置，使用 --list</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--list</span> <span class="token parameter variable">--local</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--list</span> <span class="token parameter variable">--global</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--list</span> <span class="token parameter variable">--system</span>

<span class="token comment"># 对当前用户所有仓库，设置用户名</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.name <span class="token string">&#39;your_name&#39;</span>

<span class="token comment"># 对当前用户所有仓库，设置电子邮箱地址</span>
$ <span class="token function">git</span> config <span class="token parameter variable">--global</span> user.email <span class="token string">&#39;your_email@domain.com&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="初始化版本库" tabindex="-1"><a class="header-anchor" href="#初始化版本库" aria-hidden="true">#</a> 初始化版本库</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 克隆远程版本库</span>
$ <span class="token function">git</span> clone <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>

<span class="token comment"># 初始化本地版本库</span>
$ <span class="token function">git</span> init

<span class="token comment"># 添加源</span>
$ <span class="token function">git</span> remote <span class="token function">add</span> origin <span class="token operator">&lt;</span>SSH/HTTP<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="远程同步" tabindex="-1"><a class="header-anchor" href="#远程同步" aria-hidden="true">#</a> 远程同步</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看所有的远程仓库</span>
$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>

<span class="token comment"># 查看指定某个远程仓库的信息</span>
$ <span class="token function">git</span> remote show <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span>

<span class="token comment"># 设置远程仓库</span>
$ <span class="token function">git</span> remote set-url <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>

<span class="token comment"># 添加远程仓库</span>
$ <span class="token function">git</span> remote set-url <span class="token parameter variable">--add</span> <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>

<span class="token comment"># 添加一个远程仓库，并命名</span>
$ <span class="token function">git</span> remote <span class="token function">add</span> <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>url<span class="token operator">&gt;</span>

<span class="token comment"># 下载远程仓库的所有变动</span>
$ <span class="token function">git</span> remote fetch <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span>

<span class="token comment"># 取回远程仓库的变化，并与本地分支合并</span>
$ <span class="token function">git</span> remote pull <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 上传本地指定分支到远程仓库</span>
$ <span class="token function">git</span> remote push <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 删除远程分支或标签</span>
$ <span class="token function">git</span> remote push <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> :<span class="token operator">&lt;</span>branch-name/tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 从远程仓库获取所有的变动，获取之后需要自己合并</span>
$ <span class="token function">git</span> fetch <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span>

<span class="token comment"># [pull = fetch + merge]</span>
$ <span class="token function">git</span> pull <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span>

<span class="token comment"># 获取远程仓库的变化，并与本地分支合并</span>
$ <span class="token function">git</span> pull <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>local-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 默认将当前分支的更新，推送当前分支的远程主机</span>
$ <span class="token function">git</span> push

<span class="token comment"># 将本地 master 分支推送到 origin</span>
<span class="token comment"># 当前分支与多个主机存在追踪关系，使用 -u 选项指定一个默认主机</span>
$ <span class="token function">git</span> push <span class="token parameter variable">-u</span> origin master

<span class="token comment"># 强行推送当前分支到远程仓库，即使有冲突</span>
$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token parameter variable">--force</span>

<span class="token comment"># 推送所有分支到远程仓库</span>
$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token parameter variable">--all</span>

<span class="token comment"># 上传所有标签</span>
$ <span class="token function">git</span> push <span class="token parameter variable">--tags</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改和提交" tabindex="-1"><a class="header-anchor" href="#修改和提交" aria-hidden="true">#</a> 修改和提交</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 显示修改文件清单</span>
$ <span class="token function">git</span> status
<span class="token comment"># -s 选项，可以不显示讲解</span>
$ <span class="token function">git</span> status <span class="token parameter variable">-s</span>
<span class="token comment"># -b 选项，不显示讲解，但显示分支的名称</span>
$ <span class="token function">git</span> status <span class="token parameter variable">-b</span>

<span class="token comment"># 添加文件或者目录到索引</span>
<span class="token comment"># 指令 &quot;.”，可以将子目录里的所有文件添加到索引</span>
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>

<span class="token comment"># 将指定的文件 file-name 添加到索引</span>
$ <span class="token function">git</span> <span class="token function">add</span> <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 修改文件名</span>
$ <span class="token function">git</span> <span class="token function">mv</span> <span class="token operator">&lt;</span>old-file-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>new-file-name<span class="token operator">&gt;</span>
<span class="token comment"># git mv 相当于运行下面三条命令</span>
<span class="token comment"># $ mv README.md README</span>
<span class="token comment"># $ git rm README.md</span>
<span class="token comment"># $ git add README</span>

<span class="token comment"># 删除：删除文件</span>
$ <span class="token function">git</span> <span class="token function">rm</span> <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 删除：从索引中移除文件，但不删除文件</span>
$ <span class="token function">git</span> <span class="token function">rm</span> <span class="token parameter variable">--cached</span> <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 删除：删除 log/ 目录下扩展名为 .log 的所有文件</span>
$ <span class="token function">git</span> <span class="token function">rm</span> log/<span class="token punctuation">\\</span>*.log

<span class="token comment"># 删除：删除以 ~ 结尾的所有文件</span>
$ <span class="token function">git</span> <span class="token function">rm</span> <span class="token punctuation">\\</span>*~

<span class="token comment"># 提交：追加到索引的文件，会启动修改提交信息的编辑器</span>
$ <span class="token function">git</span> commit

<span class="token comment"># 提交：-a 选项，可以检测出修改的文件 (不包括新添加的文件)，将其添加至索引并提交</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span>

<span class="token comment"># 提交：-m 选项，指定提交“提交信息”</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&#39;commit-message&#39;</span>

<span class="token comment"># 提交：对最后一次提交的 message 进行变更</span>
$ <span class="token function">git</span> commit <span class="token parameter variable">--amend</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看提交记录" tabindex="-1"><a class="header-anchor" href="#查看提交记录" aria-hidden="true">#</a> 查看提交记录</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 查看提交记录</span>
$ <span class="token function">git</span> log

<span class="token comment"># 查看指定文件的提交记录</span>
$ <span class="token function">git</span> log <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 显示历史提交记录，以及每次commit发生变更的文件</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--stat</span>

<span class="token comment"># 根据关键词搜索提交历史</span>
$ <span class="token function">git</span> log <span class="token parameter variable">-S</span> <span class="token operator">&lt;</span>keyword<span class="token operator">&gt;</span>

<span class="token comment"># 仅显示最近的 n 条提交</span>
$ <span class="token function">git</span> log <span class="token parameter variable">-n</span>

<span class="token comment"># 查看历史提交记录的简洁版本</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--oneline</span>

<span class="token comment"># 在日志旁以 ASCII 图形显示分支与合并历史</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--graph</span>

<span class="token comment"># 查看各个分支的历史提交记录</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--all</span>

<span class="token comment"># 仅显示提交说明中包含指定字符串的提交</span>
$ <span class="token function">git</span> log <span class="token parameter variable">--grep</span>

<span class="token comment"># 以列表的方式查看指定文件的提交记录</span>
$ <span class="token function">git</span> blame <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 通过图形界面工具来查看版本历史</span>
$ gitk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="分支" tabindex="-1"><a class="header-anchor" href="#分支" aria-hidden="true">#</a> 分支</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 切换到指定的分支或者标签</span>
$ <span class="token function">git</span> checkout <span class="token operator">&lt;</span>branch-name/tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 切换到上一个分支</span>
$ <span class="token function">git</span> checkout -

<span class="token comment"># 查看所有的本地分支</span>
$ <span class="token function">git</span> branch

<span class="token comment"># 查看所有的远程分支</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-r</span>

<span class="token comment"># 查看所有的分支，包括远程分支</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-a</span>

<span class="token comment"># 建立追踪关系，在现有分支与指定的远程分支之间</span>
$ <span class="token function">git</span> branch --set-upstream <span class="token operator">&lt;</span>local-branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>remote-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 创建新的分支，但仍然停留在当前分支</span>
$ <span class="token function">git</span> branch <span class="token operator">&lt;</span>new-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 创建新的分支，并切换到新分支</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>new-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 创建新的分支，指向指定的 commit</span>
$ <span class="token function">git</span> branch <span class="token operator">&lt;</span>new-branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>

<span class="token comment"># 创建新的分支，与指定的远程分支建立追踪关系</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">--track</span> <span class="token operator">&lt;</span>local-branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>remote-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 强制将 &lt;branch-name&gt; 分支指向到指定 &lt;commit&gt;</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-f</span> <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>

<span class="token comment"># 重命名分支</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-m</span> <span class="token operator">&lt;</span>old-branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>new-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 查看每一个分支的最后一次提交</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-v</span>

<span class="token comment"># 将所有的本地分支列出来并且包含更多的信息</span>
<span class="token comment"># 如每一个分支正在跟踪哪个远程分支与本地分支是否是领先、落后或是都有。</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-vv</span>

<span class="token comment"># 查看已经合并到当前分支的分支</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">--merge</span>

<span class="token comment"># 查看未合并到当前分支的分支</span>
$ <span class="token function">git</span> branch --no-merge

<span class="token comment"># 删除本地分支，如果无法删除，则可使用 git branch -D &lt;branch-name&gt;</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 删除远程分支</span>
$ <span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> <span class="token operator">&lt;</span>remote-branch-name<span class="token operator">&gt;</span>
$ <span class="token function">git</span> branch <span class="token parameter variable">-dr</span> remote/<span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="合并" tabindex="-1"><a class="header-anchor" href="#合并" aria-hidden="true">#</a> 合并</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 合并指定分支到当前分支</span>
$ <span class="token function">git</span> merge <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 忽略任意数量的已有空白的修改进行合并</span>
$ <span class="token function">git</span> merge -Xignore-all-change

<span class="token comment"># 忽略所有空白的修改进行合并</span>
$ <span class="token function">git</span> merge -Xignore-space-change

<span class="token comment"># 重置到运行合并前的状态</span>
<span class="token comment"># 当运行命令前，在工作目录中有未储藏、未提交的修改时它不能完美处理</span>
$ <span class="token function">git</span> merge <span class="token parameter variable">--abort</span>

<span class="token comment"># 将两个不相干的分支进行合并</span>
$ <span class="token function">git</span> mrege --allow-unrelated-histories <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>other-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 指定一个 commit，合并进当前分支</span>
<span class="token comment"># 然后尝试将作为一个新的提交引入到你当前分支上</span>
<span class="token comment"># 可用于从一个分支提取一个或者两个提交记录，合并到当前分支</span>
$ <span class="token function">git</span> cherry-pick <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>

<span class="token comment"># 想使用图形化工具来解决冲突</span>
$ <span class="token function">git</span> mergetool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="变基" tabindex="-1"><a class="header-anchor" href="#变基" aria-hidden="true">#</a> 变基</h2><p><code>rebase</code> 命令将提交到某一分支上的所有修改都移至另一分支上，这种操作叫<strong>变基</strong>。</p><p><code>rebase</code> 的优势就是可以创造更线性的提交历史。如果有冲突，需要逐个解冲突，使合并变复杂。</p><p><code>rebase</code> 的准则：<strong>不要对在你的仓库外有副本的分支执行变基。（即只对本地未推送的commit上或自己的分支上进行）</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将当前分支变基到目标分支（goals-branch）</span>
$ <span class="token function">git</span> rebase <span class="token operator">&lt;</span>goals-branch<span class="token operator">&gt;</span>

<span class="token comment"># 将分支（branch）变基到目标分支（goals-branch）</span>
$ <span class="token function">git</span> rebase <span class="token operator">&lt;</span>goals-branch<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>branch<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>示例：使用变基合并 bugFix 分支上的变更 commit04</p><p><img src="`+i+`" alt="gitrebase"></p><h2 id="标签" tabindex="-1"><a class="header-anchor" href="#标签" aria-hidden="true">#</a> 标签</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 切换到指定的标签</span>
$ <span class="token function">git</span> checkout <span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 显示所有的本地标签</span>
$ <span class="token function">git</span> tag

<span class="token comment"># 查看指定tag信息</span>
$ <span class="token function">git</span> show <span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 基于最新的提交创建 tag</span>
$ <span class="token function">git</span> tag <span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 创建一个 tag 在指定 commit</span>
$ <span class="token function">git</span> tag <span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>

<span class="token comment"># 提交指定 tag</span>
$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 提交所有tag</span>
$ <span class="token function">git</span> push <span class="token operator">&lt;</span>remote-name<span class="token operator">&gt;</span> <span class="token parameter variable">--tags</span>

<span class="token comment"># 创建一个分支，指向某个tag</span>
$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 删除本地标签</span>
$ <span class="token function">git</span> tag <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span>

<span class="token comment"># 删除远程 tag</span>
$ <span class="token function">git</span> push origin :refs/tags/<span class="token operator">&lt;</span>tag-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="比较差异" tabindex="-1"><a class="header-anchor" href="#比较差异" aria-hidden="true">#</a> 比较差异</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 比较工作区与暂存区的区别，即查看变更的内容</span>
$ <span class="token function">git</span> <span class="token function">diff</span>

<span class="token comment"># 查看具体文件工作区与暂存区的区别</span>
$ <span class="token function">git</span> <span class="token function">diff</span> -- <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 查看已暂存的将要添加到下次提交里的内容的差异</span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--cached</span>

<span class="token comment"># 比较两个分支的差异</span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>other-branch-name<span class="token operator">&gt;</span>

<span class="token comment"># 比较指定文件在两个分支上的差异</span>
$ <span class="token function">git</span> <span class="token function">diff</span> <span class="token operator">&lt;</span>branch-name<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>other-branch-name<span class="token operator">&gt;</span> -- <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重置-撤销" tabindex="-1"><a class="header-anchor" href="#重置-撤销" aria-hidden="true">#</a> 重置/撤销</h2><p><code>reset</code>：将当前分支的状态（指工作区，暂存区，本地仓库）重置到指定的状态。</p><p><code>reset</code> 语法： <code>git reset --重置方式(hard/mixed/soft) 提交引用(commit/branch/origin-branch/tag/HEAD)</code></p><ul><li><code>--hard</code>：将当前分支，重置到与指定引用一样的状态，丢弃在这之后的提交，以及工作区和暂存区的提交。</li><li><code>--soft</code>：将指定提交之后的提交内容，都放到暂存区</li><li><code>--mixed</code>：将指定提交之后的提交内容，以及暂存区中的内容，放到工作区</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 恢复暂存区的所有文件到工作区</span>
$ <span class="token function">git</span> reset HEAD
$ <span class="token function">git</span> checkout <span class="token builtin class-name">.</span>

<span class="token comment"># 恢复暂存区的指定文件到工作区</span>
$ <span class="token function">git</span> reset HEAD -- <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 恢复暂存区的指定文件到工作区</span>
$ <span class="token function">git</span> checkout <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 恢复暂存区的指定文件到工作区</span>
$ <span class="token function">git</span> checkout -- <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 恢复某个 commit 的指定文件到暂存区和工作区</span>
$ <span class="token function">git</span> checkout <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>file-name<span class="token operator">&gt;</span>

<span class="token comment"># 重置暂存区与工作区，使其与上一次 commit 保持一致</span>
$ <span class="token function">git</span> reset <span class="token parameter variable">--hard</span>

<span class="token comment"># 重置工作区中所未提交的修改内容</span>
$ <span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD

<span class="token comment"># 重置当前分支的 HEAD 为指定的 commit，同时重置暂存区和工作区，与指定commit一致</span>
$ <span class="token function">git</span> reset <span class="token parameter variable">--hard</span> <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>

<span class="token comment"># 撤销提交</span>
<span class="token comment"># 原理：在当前提交后面，新增一次提交，抵消掉上一次提交导致的所有变化</span>
$ <span class="token function">git</span> revert HEAD

<span class="token comment"># 撤销指定的提交</span>
<span class="token comment"># 当撤销 commit 为合并分支的 merge-commit 时，可以使用 -m 参数</span>
<span class="token comment"># git revert -m &lt;parent-merge-commit-num&gt; &lt;commit&gt;</span>
<span class="token comment"># 一般为两个分支合并，所以 &lt;parent-merge-commit-num&gt; 可选内容为 1 和 2</span>
<span class="token comment"># 可以使用 git show 命令，查看一个 merge 节点的父节点，前者为 1，后者为 2</span>
$ <span class="token function">git</span> revert <span class="token operator">&lt;</span>commit<span class="token operator">&gt;</span>

<span class="token comment"># 执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息</span>
$ <span class="token function">git</span> revert --no-edit

<span class="token comment"># 只抵消暂存区和工作区的文件变化，不产生新的提交</span>
$ <span class="token function">git</span> revert --no-commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="储藏" tabindex="-1"><a class="header-anchor" href="#储藏" aria-hidden="true">#</a> 储藏</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 储藏未提交的变更内容，并移除未提交的变更内容</span>
$ <span class="token function">git</span> stash

<span class="token comment"># 不储藏任何通过 git add 命令已暂存的变更内容</span>
$ <span class="token function">git</span> stash --keep-index

<span class="token comment"># 查看储藏列表</span>
$ <span class="token function">git</span> stash list

<span class="token comment"># 将储藏的内容重新应用</span>
$ <span class="token function">git</span> stash apply

<span class="token comment"># 将指定的储藏内容重新应用</span>
$ <span class="token function">git</span> stash apply <span class="token operator">&lt;</span>stash<span class="token operator">&gt;</span>

<span class="token comment"># 将储藏的内容重新应用，并从堆栈中移除</span>
$ <span class="token function">git</span> stash pop

<span class="token comment"># 移除指定的储藏内容</span>
$ <span class="token function">git</span> stash drop <span class="token operator">&lt;</span>stash<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,33),c=[t];function o(p,r){return s(),a("div",null,c)}const v=n(l,[["render",o],["__file","git命令.html.vue"]]);export{v as default};
