import { hopeTheme } from 'vuepress-theme-hope'
import { getDirname, path } from 'vuepress/utils'

import navbar from './navbar.ts'
import sidebar from './sidebar.ts'

const __dirname = getDirname(import.meta.url)

export default hopeTheme({
  // ========== 主题基本选项 ==========
  hostname: 'https://lrh21g.github.io', // 当前网站部署到的域名
  author: {
    name: 'Mr.LRH',
    url: 'https://lrh21g.github.io/blogs/',
  }, // 文章显示的默认作者
  // 主题的多语言配置
  // locales: {
  //   '/': {
  //     navbar: enNavbar,
  //     sidebar: enSidebar,
  //     footer: 'Default footer',
  //     displayFooter: true,
  //     blog: {
  //       description: 'A FrontEnd programmer',
  //       intro: '/intro.html',
  //     },
  //     metaLocales: {
  //       editLink: 'Edit this page on GitHub',
  //     },
  //   },
  //   '/zh/': {
  //     navbar: zhNavbar,
  //     sidebar: zhSidebar,
  //     footer: '默认页脚',
  //     displayFooter: true,
  //     blog: {
  //       description: '一个前端开发者',
  //       intro: '/zh/intro.html',
  //     },
  //     metaLocales: {
  //       editLink: '在 GitHub 上编辑此页',
  //     },
  //   },
  // },

  // ========== 主题外观选项 ==========
  darkmode: 'switch', // 深色模式选项。switch - 在深色模式，浅色模式和自动之间切换
  themeColor: true, // 主题色选项配置
  fullscreen: false, // 是否显示全屏按钮
  pure: false, // 是否开启纯净模式

  // ========== 主题布局选项 - 导航栏 ==========
  navbar: navbar, // 导航栏配置
  // navbarIcon: true, // 是否在导航栏显示图标
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

  // Disable features you don't want here
  markdown: {
    // Markdown 行为配置
    // gfm: true, // 是否支持完整的 GFM 语法
    // vPre: true, // 是否启用 v-pre 容器
    // breaks: true, // 是否将段落中的 \n 转换为 <br>
    // linkify: true, // 是否将文本中的 URL 转换为链接
    // figure: true, // 是否将独立的 <img> 转换为 <figure>
    // imgLazyload: true, // 是否启用图片懒加载
    // highlighter: "shiki", // Markdown 代码块高亮器。可以选择 "prismjs"、"shiki"、false 或一个带有 type 字段的对象，声明高亮器名称和其他插件选项。
    // linksCheck: true, // 是否启用 @vuepress/plugin-links-check 插件，提供 Markdown 链接检查

    // Markdown 语法配置
    component: true, // 是否启用组件支持
    footnote: true, // 是否启用脚注格式支持
    // imgMark: true, // 是否启用图片标记
    imgSize: true, // 是否启用图片大小
    // obsidianImgSize: true, // 是否启用 Obsidian 图片大小
    // include: true, // 是否启用 Markdown 导入支持
    include: {
      resolvePath: (file) => {
        if (file.startsWith("@src"))
          return file.replace("@src", path.resolve(__dirname, ".."));

        return file;
      },
    },
    tabs: true, // 是否启用选项卡支持
    tasklist: true, // 是否启用任务列表格式支持
    // math: true, // 是否启用数学公式支持，设置 true 来自动检测已安装的 katex/mathjax，或提供插件选项
    // revealjs: true, // 控制 @vuepress/plugin-revealjs，提供幻灯片支持。设置 true 来直接启用它，或提供插件选项

    // Markdown 样式化配置
    align: true, // 是否启用自定义对齐
    // attrs: true, // 是否启用属性自定义支持
    mark: true, // 是否启用标记支持
    hint: true, // 是否启用自定义容器支持
    sup: true, // 是否启用上标支持
    sub: true, // 是否启用下标支持
    // spoiler: true, // 是否启用隐藏内容支持
    // stylize: true, // 样式化内联标记以创建所需的片段
    // 对行内语法进行样式化以创建代码片段
    stylize: [
      {
        matcher: 'Recommanded',
        replacer: ({ tag }) => {
          if (tag === 'em')
            return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: 'Recommended',
            }
        },
      },
    ],

    // Markdown 图表配置
    // chartjs: true, // 是否启用 Chart.js 支持
    // echarts: true, // 是否启用 ECharts 支持
    // flowchart: true, // 是否启用流程图支持
    // mermaid: true, // 是否启用 Mermaid 支持，可以传入一个对象作为 Mermaid 的配置选项
    // plantuml: true, // 是否启用 plantuml 支持
    
    // Markdown 代码配置  
    codeTabs: true, // 是否启用选项卡支持
    playground: {
      presets: ['ts', 'vue', 'unocss'],
    }, // 交互演示
    vuePlayground: true, // 是否启用 Vue 交互演示支持
    // sandpack: true, // 是否启用 Sandpack 交互演示支持
    demo: {
      // jsLib: [], // CodePen, JsFiddle 需要引入的外部 JS 库
      // cssLib: [], // CodePen, JsFiddle 需要引入的外部 CSS 库
      jsfiddle: false, // 是否显示 JSFiddle 按钮
      codepen: false, // 是否显示 CodePen 按钮
      // codepenLayout: "left", // CodePen 编辑器布局 "top" | "left" | "right"
      // codepenEditors: "101", // CodePen 编辑器状态
      // editors: "101", // CodePen 编辑器显示情况，第一位代表 HTML ，第二位代表 JS，第三位代表演示页面
    }, // 是否启用代码演示支持   
  },

  plugins: {
    // 博客配置
    blog: true, // 启用博客功能
    // blog: {
    //   autoExcerpt: true, // 是否为每个页面生成摘录
    // },

    // 图标设置
    icon: {
      assets: 'iconify', // 要使用的图标资源。内置关键字 "iconify"、"fontawesome" 和 "fontawesome-with-brand 支持
      // prefix: '', // 图标组件的前缀。默认情况下，插件将使用 iconfont icon- 用于 iconfont 类型，空字符串用于所有其他类型
    },

    // 搜索插件配置
    slimsearch: true, // @vuepress/plugin-slimsearch

    // 版权信息插件配置
    copyright: true, // 默认行为是全局启用插件并使用主题选项中的作者和协议名称

    // shiki: {
    //   // 你想要使用的主题
    //   themes: {
    //     light: "one-light",
    //     dark: "one-dark-pro",
    //   },
    // },
  },
})
