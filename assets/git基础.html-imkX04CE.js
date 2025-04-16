import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,d as o,o as n}from"./app-54gzBNNV.js";const r="/blogs/assets/gitflow.drawio-BN5Fqs6U.png",l={};function a(s,t){return n(),e("div",null,t[0]||(t[0]=[o('<h1 id="git-基础" tabindex="-1"><a class="header-anchor" href="#git-基础"><span>Git 基础</span></a></h1><h2 id="git-的三种状态" tabindex="-1"><a class="header-anchor" href="#git-的三种状态"><span>Git 的三种状态</span></a></h2><ul><li><strong>已提交</strong>（committed）：表示数据已经安全的保存在本地数据库中</li><li><strong>已修改</strong>（modified）：表示修改了文件，但还没保存到数据库中</li><li><strong>已暂存</strong>（staged）：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中</li></ul><p>由此，引入 Git 项目的三个工作区域的概念：</p><ul><li><strong>Git仓库</strong>：Git 用来保存项目的元数据和对象数据库的地方。从其它计算机克隆仓库时，拷贝的就是这里的数据</li><li><strong>工作目录</strong>：对项目的某个版本独立提取出来的内容。这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改</li><li><strong>暂存区域</strong>：一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中</li></ul><h2 id="基本的-git-工作流程" tabindex="-1"><a class="header-anchor" href="#基本的-git-工作流程"><span>基本的 Git 工作流程</span></a></h2><ul><li>在工作目录中修改文件</li><li>暂存文件，将文件的快照放入暂存区</li><li>提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录</li></ul><p><img src="'+r+'" alt="gitflow"></p>',8)]))}const c=i(l,[["render",a]]),p=JSON.parse('{"path":"/%E5%85%B6%E4%BB%96/Git/git%E5%9F%BA%E7%A1%80.html","title":"Git 基础","lang":"zh-CN","frontmatter":{"description":"Git 基础 Git 的三种状态 已提交（committed）：表示数据已经安全的保存在本地数据库中 已修改（modified）：表示修改了文件，但还没保存到数据库中 已暂存（staged）：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中 由此，引入 Git 项目的三个工作区域的概念： Git仓库：Git 用来保存项目的元数据和对象...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Git 基础\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-28T08:18:46.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.LRH\\",\\"url\\":\\"https://lrh21g.github.io/blogs/\\"}]}"],["meta",{"property":"og:url","content":"https://lrh21g.github.io/blogs/%E5%85%B6%E4%BB%96/Git/git%E5%9F%BA%E7%A1%80.html"}],["meta",{"property":"og:site_name","content":"Mr.LRH 博客"}],["meta",{"property":"og:title","content":"Git 基础"}],["meta",{"property":"og:description","content":"Git 基础 Git 的三种状态 已提交（committed）：表示数据已经安全的保存在本地数据库中 已修改（modified）：表示修改了文件，但还没保存到数据库中 已暂存（staged）：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中 由此，引入 Git 项目的三个工作区域的概念： Git仓库：Git 用来保存项目的元数据和对象..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-28T08:18:46.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-28T08:18:46.000Z"}]]},"git":{"createdTime":1618649014000,"updatedTime":1740730726000,"contributors":[{"name":"lrh21g","username":"lrh21g","email":"837233792@qq.com","commits":2,"url":"https://github.com/lrh21g"},{"name":"lingronghai","username":"lingronghai","email":"lingronghai@foxmail.com","commits":1,"url":"https://github.com/lingronghai"},{"name":"lrh","username":"lrh","email":"lingronghai@foxmail.com","commits":1,"url":"https://github.com/lrh"}]},"readingTime":{"minutes":0.99,"words":296},"filePathRelative":"其他/Git/git基础.md","excerpt":"\\n<h2>Git 的三种状态</h2>\\n<ul>\\n<li><strong>已提交</strong>（committed）：表示数据已经安全的保存在本地数据库中</li>\\n<li><strong>已修改</strong>（modified）：表示修改了文件，但还没保存到数据库中</li>\\n<li><strong>已暂存</strong>（staged）：表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中</li>\\n</ul>\\n<p>由此，引入 Git 项目的三个工作区域的概念：</p>\\n<ul>\\n<li><strong>Git仓库</strong>：Git 用来保存项目的元数据和对象数据库的地方。从其它计算机克隆仓库时，拷贝的就是这里的数据</li>\\n<li><strong>工作目录</strong>：对项目的某个版本独立提取出来的内容。这些从 Git 仓库的压缩数据库中提取出来的文件，放在磁盘上供你使用或修改</li>\\n<li><strong>暂存区域</strong>：一个文件，保存了下次将提交的文件列表信息，一般在 Git 仓库目录中</li>\\n</ul>","autoDesc":true}');export{c as comp,p as data};
