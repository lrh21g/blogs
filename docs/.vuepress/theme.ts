import { hopeTheme } from 'vuepress-theme-hope'
import navbar from './navbar'
import sidebar from './sidebar'

const { path } = require('@vuepress/utils')

export default hopeTheme({
  hostname: 'https://vuepress-theme-hope-v2-demo.mrhope.site',

  author: {
    name: 'Mr.LRH',
    url: 'https://lrh21g.github.io/blogs/',
  },

  // iconAssets: '//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css',
  iconAssets: 'iconfont',

  logo: '/hero.png',

  // 默认为 GitHub. 同时也可以是一个完整的 URL
  repo: 'https://github.com/lrh21g/blogs',
  // 自定义仓库链接文字。
  // 默认从 `repo` 中自动推断为 "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
  repoLabel: 'GitHub',
  // 是否在导航栏内显示仓库链接，默认为 `true`
  repoDisplay: true,

  // 默认是 false, 设置为 true 来启用
  editLink: false,
  // 默认为 "Edit this page"
  // editLinkText: '帮助我们改善此页面！',

  docsDir: 'blogs/docs', // 文档在仓库中的目录

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  footer: '知足且上进，温柔而坚定', // 页脚的默认内容，可输入 HTMLString

  displayFooter: true, // 是否默认显示页脚

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

  blog: {
    name: 'Mr.LRH', // 博主姓名
    // avatar: '', // 博主头像
    description: '知足且上进，温柔而坚定。', // 口号、座右铭或介绍语
    intro: '/intro.html', // 博主的个人介绍地址，填写后将可以点击“博主信息”中的头像或姓名进入个人介绍页
    medias: {}, // 博主的媒体链接配置
    roundAvatar: true, // 是否剪裁头像为圆形形状
    sidebarDisplay: 'mobile', // 是否在侧边栏展示博主信息： mobile - 在移动视图中显示在侧边栏中, always - 总是展示在侧边栏中, none - 永远不在侧边栏展示
    articleInfo: [
      'Author',
      'Original',
      'Date',
      'PageView',
      'Category',
      'Tag',
      'ReadingTime',
    ],
  },

  // 加密配置
  encrypt: {
    config: {}, // 加密配置，为一个对象，键名为匹配的路径，键值为对应的密码，接受字符串或字符串数组。
  },

  plugins: {
    blog: {
      autoExcerpt: true, // 是否为每个页面生成摘录
    },

    mdEnhance: {
      // enableAll: true, // 启用 md-enhance 插件的所有功能，启用不需要的功能将增加开发和构建时间
      tabs: true, // Markdown 文件 - 添加选项卡支持
      tex: true, // Markdown 文件 - 支持 TeX 语法
      sub: true, // Markdown 文件 - 启用下角标功能
      sup: true, // Markdown 文件 - 启用上角标
      // playground: true, // Markdown 文件 - 支持代码交互 2.0.0-beta.92 已移除
      // playground: {
      //   mode: 'external', // 使用外置模式
      //   external: {
      //     base: 'https://sfc.vuejs.org/', // 使用 vue sfc playground.
      //     defaultImportsMap: 'import-map.json',
      //   },
      //   internal: {
      //     defaultImportsMap: 'import-map.json',
      //     showCode: false, // 不显示代码
      //     showCompileOutput: false, // 不显示 js, css, ssr 面板
      //     showImportMap: true, // 显示 import map
      //     clearConsole: false, // 不清空控制台
      //   },
      // },
      codetabs: true, // Markdown 文件 - 支持代码块分组
      demo: {
        codepen: false,
        jsfiddle: false,
      },
      tasklist: true, // Markdown 文件 - 支持任务列表
      imageMark: true, // Markdown 文件 - 启用图片标记
      imageSize: true, // Markdown 文件 - 启用图片大小
      // Markdown 文件 - 支持导入其他文件
      // include: {
      //   getPath: file => {
      //     if (file.startsWith('@docs'))
      //       return file.replace('@docs', path.resolve(__dirname, '../'))
      //     return file
      //   },
      // },
      attrs: true, // Markdown 元素添加属性
      mark: true, // Markdown 文件 - 支持标记
      stylize: [], // Markdown 文件 - 创建行内 snippet，对内联标记进行样式化，包括更改标签、添加属性和修改内容
      flowchart: true, //  Markdown 文件 - 支持流程图
      footnote: true, //  Markdown 文件 - 支持脚注
      container: true, // Markdown 文件 - 添加提示、注释、信息、注意、警告和详情自定义容器的支持
      align: true, // Markdown 文件 - 对段落对齐进行自定义,
      // Markdown 文件 - 支持幻灯片
      // presentation: {
      //   plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
      // },
    },

    // 处理你的 VuePress 站点中的复制操作
    // 配置： https://vuepress-theme-hope.github.io/v2/zh/config/plugins/copyright.html#%E6%8F%92%E4%BB%B6%E9%80%89%E9%A1%B9
    copyright: {
      // hostname: '', // 部署的域名
      // author: '', // 作者信息
      // license: '', // 协议信息
      global: true, // 是否全局启用
      triggerWords: 1000, // 触发附加版权的最小字数
      disableCopy: false, // 是否禁止复制
      disableSelection: false, // 是否禁止选中文字
    },

    // 如果你不需要评论，可以直接删除 comment 配置，
    // 以下配置仅供体验，如果你需要评论，请自行配置并使用自己的环境，详见文档。
    // 为了避免打扰主题开发者以及消耗他的资源，请不要在你的正式环境中直接使用下列配置!!!!!
    // comment: {
    //   /**
    //    * Using giscus
    //    */
    //   type: 'giscus',
    //   repo: 'vuepress-theme-hope/giscus-discussions',
    //   repoId: 'R_kgDOG_Pt2A',
    //   category: 'Announcements',
    //   categoryId: 'DIC_kwDOG_Pt2M4COD69',

    //   /**
    //    * Using twikoo
    //    */
    //   // type: "twikoo",
    //   // envId: "https://twikoo.ccknbc.vercel.app",

    //   /**
    //    * Using Waline
    //    */
    //   // type: "waline",
    //   // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    // },
  },
})
