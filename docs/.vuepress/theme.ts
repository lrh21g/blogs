import { hopeTheme } from 'vuepress-theme-hope'

import navbar from './navbar'
import sidebar from './sidebar'

export default hopeTheme({
  // ========== 主题基本选项 ==========
  hostname: 'https://lrh21g.github.io', // 当前网站部署到的域名
  author: {
    name: 'Mr.LRH',
    url: 'https://lrh21g.github.io/blogs/',
  }, // 文章显示的默认作者
  // locales: {}, // 主题的多语言配置

  // ========== 主题外观选项 ==========
  iconAssets: 'iconfont', // 字体图标资源链接，支持 'iconfont' 和 'fontawesome' 关键字。
  // iconPrefix: '', // 通常情况下，它可以识别 iconAssets 并自动设置，如果识别失败，你可以手动设置图标的 FontClass 前缀。
  darkmode: 'switch', // 深色模式选项。switch - 在深色模式，浅色模式和自动之间切换
  themeColor: {
    blue: '#2196f3',
    red: '#f26d6d',
    green: '#3eaf7c',
    orange: '#fb9b5f',
  }, // 主题色选项配置
  fullscreen: false, // 是否显示全屏按钮
  backToTop: true, // 是否显示返回顶部按钮。如果设置为数字，则该数字为触发临界值 (默认临界值为 300px)
  pure: false, // 是否开启纯净模式

  // ========== 主题布局选项 - 导航栏 ==========
  navbar: navbar, // 导航栏配置
  navbarIcon: true, // 是否在导航栏显示图标
  // navbarLayout: {
  //   left: ['Brand'],
  //   center: ['Links'],
  //   right: ['Language', 'Repo', 'Outlook', 'Search'],
  // }, // 自定义导航栏布局
  logo: '/hero.png', // 导航栏图标，应为基于 .vuepress/public 文件夹的绝对路径
  logoDark: '', // 夜间模式下导航栏图标，应为基于 .vuepress/public 文件夹的绝对路径
  repo: 'https://github.com/lrh21g/blogs', // 仓库配置，用于在导航栏中显示仓库链接
  repoDisplay: true, // 是否在导航栏显示仓库链接
  // 用于导航栏仓库按钮的无障碍标签，主题可以正确识别 GitHub, Gitlab, Gitee, Bitbucket 的链接
  repoLabel: 'GitHub',
  // navbarAutoHide: 'mobile', // 是否在向下滚动时自动隐藏导航栏
  // hideSiteNameonMobile: true, // 是否在移动视图下隐藏站点名称

  // ========== 主题布局选项 - 侧边栏 ==========
  sidebar: sidebar, // 侧边栏配置
  sidebarIcon: true, // 是否在侧边栏显示图标
  // sidebarSorter: ["readme", "order", "title"], // 结构侧边栏排序器
  headerDepth: 2, // 侧边栏嵌套的标题深度

  // ========== 主题布局选项 - 路径导航 ==========
  breadcrumb: true, // 是否全局启用路径导航
  breadcrumbIcon: true, // 是否在路径导航显示图标
  prevLink: true, // 是否在页面底部显示上一篇链接
  nextLink: true, // 是否在页面底部显示下一篇链接

  // ========== 主题布局选项 - 标题 ==========
  titleIcon: true, // 是否在页面标题旁显示图标
  // pageInfo - 文章信息，可以填入数组，数组的顺序是各条目显示的顺序。填入 false 使其被禁用。
  // "Author": 作者
  // "Date": 写作日期
  // "Original": 是否原创
  // "Category": 分类
  // "Tag": 标签
  // "ReadingTime": 预计阅读时间
  // "Word": 字数
  // "PageView": 页面浏览量
  pageInfo: ['Author', 'Original', 'Date', 'Category', 'Tag', 'ReadingTime'],

  // ========== 主题布局选项 - Meta ==========
  lastUpdated: true, // 是否显示页面最后更新时间
  contributors: true, // 是否显示页面贡献者
  editLink: false, // 是否展示编辑此页链接
  // editLinkPattern: '', // 编辑链接的匹配。其中 :repo :branch :path 会被自动替换为 docsRepo docsBranch 和 docsDir + filePath 。主题已经为 GitHub、Gitlab、Gitee 和 Bitbucket 提供了内置支持
  // docsRepo: '', // 文档仓库。默认值: repo
  // docsBranch: '', // 文档所在分支。默认值: "main"
  docsDir: 'docs', // 文档在仓库中的目录

  // ========== 主题布局选项 - 页脚 ==========
  footer: '知足且上进，温柔而坚定', // 页脚的默认内容，可输入 HTMLString
  // copyright: false, // 默认的版权信息，设置为 false 来默认禁用它
  displayFooter: true, // 是否默认显示页脚

  // ========== 主题布局选项 - 杂项 ==========
  // home: '', 默认当前 locale 的键名。当前语言的主页路径，用于导航栏图标和返回主页按钮的链接
  // toc: true, // 是否在桌面模式下右侧展示标题列表

  // ========== 主题功能选项 - 博客选项 ==========
  blog: {
    name: 'Mr.LRH', // 博主姓名
    // avatar: '', // 博主头像
    description: '知足且上进，温柔而坚定。', // 口号、座右铭或介绍语
    intro: '/intro.html', // 博主的个人介绍地址，填写后将可以点击“博主信息”中的头像或姓名进入个人介绍页
    medias: {}, // 博主的媒体链接配置
    roundAvatar: true, // 是否剪裁头像为圆形形状
    sidebarDisplay: 'mobile', // 是否在侧边栏展示博主信息： mobile - 在移动视图中显示在侧边栏中, always - 总是展示在侧边栏中, none - 永远不在侧边栏展示
    timeline: '昨日不在', // 时间轴的顶部文字
    articlePerPage: 10, // 每页的文章数量
    articleInfo: [
      'Author',
      'Original',
      'Date',
      'PageView',
      'Category',
      'Tag',
      'ReadingTime',
    ], // 文章列表中展示的文章信息
  },

  // ========== 主题功能选项 - 加密配置 ==========
  // encrypt: {
  //   config: {
  //     // '/demo/encrypt.html': ['1234'],
  //     // '/zh/demo/encrypt.html': ['1234'],
  //   }, // 加密配置，为一个对象，键名为匹配的路径，键值为对应的密码，接受字符串或字符串数组。
  // },

  plugins: {
    blog: {
      autoExcerpt: true, // 是否为每个页面生成摘录
    },

    // Disable features you don't want here
    mdEnhance: {
      align: true, // 是否启用自定义对齐格式支持
      attrs: true, // 添加属性
      chart: true,
      codetabs: true, // 是否启用代码
      container: true, // 是否启用自定义容器支持
      demo: true, // 是否启用代码案例支持
      echarts: true,
      flowchart: true, // 是否启用流程图支持
      gfm: true, // 是否支持完整的 GFM 语法
      imageSize: true, // 是否启用图片大小
      include: true, // 支持导入其他文件
      katex: true, // 是否通过 KaTeX\KaTeXKATEX 启用 TeX\TeXTEX 语法支持
      lazyLoad: true, // 是否使用原生方式懒加载页面图片
      mark: true, // 是否启用图片标注支持
      mermaid: true, // 是否启用 Mermaid 支持
      // 交互演示
      playground: {
        presets: ['ts', 'vue'],
      },
      // 是否启用幻灯片支持
      // presentation: {
      //   plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      // },
      // 对行内语法进行样式化以创建代码片段
      stylize: [
        {
          matcher: 'Recommanded',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommanded',
              }
          },
        },
      ],
      sub: true, // 是否启用下角标功能
      sup: true, // 是否启用上角标
      tabs: true, // 添加选项卡支持
      footnote: true, //  是否支持脚注
      vpre: true, // 启用 v-pre 容器
      vuePlayground: true, // 是否启用 Vue 交互演示支持
      tasklist: true, // 是否启用任务列表格式支持,
    },

    // If you don't need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    // comment: {
    //   /**
    //    * Using Giscus
    //    */
    //   provider: 'Giscus',
    //   repo: 'vuepress-theme-hope/giscus-discussions',
    //   repoId: 'R_kgDOG_Pt2A',
    //   category: 'Announcements',
    //   categoryId: 'DIC_kwDOG_Pt2M4COD69',

    //   /**
    //    * Using Twikoo
    //    */
    //   // provider: "Twikoo",
    //   // envId: "https://twikoo.ccknbc.vercel.app",

    //   /**
    //    * Using Waline
    //    */
    //   // provider: "Waline",
    //   // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },
  },
})
