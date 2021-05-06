# Git 相关问题

## Please make sure you have the correct access rights and the repository exists

原因： ssh key 有问题，连接不上服务器

解决方法：重新设置用户名（user.name）和邮箱（user.email），再重新生成 ssh公钥 即可。

``` bash
# 1、重新设置用户名（user.name）和邮箱（user.email）
# 对当前用户所有仓库，设置用户名
$ git config --global user.name 'your_name'
# 对当前用户所有仓库，设置电子邮箱地址
$ git config --global user.email 'your_email@domain.com'

# 2、生成 ssh公钥
$ ssh-keygen -t rsa -C "your_email@domain.com"

# 3、设置 github/gitee/gitlab 等 ssh公钥
```

## git push 报错 failed to push some refs to git

原因：远程库与本地库不一致导致

解决方案：将远程库同步到本地库

``` bash
# 将远程库中的更新合并到本地库中
# --rebash 取消掉本地库中刚刚的 commit，并将 commit 接到更新后的版本库中
$ git pull --rebash origin master

# 将本地 master 分支推送到 origin
# 当前分支与多个主机存在追踪关系，使用 -u 选项指定一个默认主机
$ git push -u origin master
```

## git add 遇到 warning: LF will be replaced by CRLF in 警告

原因：存在符号转义的问题

解决方法：windows 中的换行符为 CRLF，而在 Linux/Mac 下的换行符为 LF

``` bash
# core.autocrlf 设置 false 不转换符号。默认为 true
$ git config --global core.autocrlf false
```

## .git 目录过大的问题

解决方法：

+ 找到 `.git` 目录下体积比较大的文件，进行重建索引(将 xxxx.pack 替换你实际需要删除的pack) : `git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch .git/objects/pack/xxxxx.pack' --prune-empty`
+ 删除和重建的索引 : `git for-each-ref --format='delete %(refname)' refs/original | git update-ref --stdin`
+ 设置reflog过期 : `git reflog expire --expire=now --all`
+ 清理垃圾 : `git gc --aggressive --prune=now`
