const { config } = require('vuepress-theme-hope');
const nav = require('./navConfig');
const sidebar = require('./sidebar');

module.exports = config({
  title: 'Mr. LRH blogs',
  description: '个人博客，使用 VuePress + vuepress-theme-hope 搭建。',

  dest: './dist',

  head: [
    [
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js' },
    ],
    [
      'script',
      {
        src:
          'https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js',
      },
    ],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/vue/dist/vue.min.js' }],
    [
      'script',
      { src: 'https://cdn.jsdelivr.net/npm/@babel/standalone/babel.min.js' },
    ],
  ],

  // vuepress 提供多语言支持的语言配置。
  // https://vuepress.vuejs.org/zh/guide/i18n.html#%E7%AB%99%E7%82%B9%E5%A4%9A%E8%AF%AD%E8%A8%80%E9%85%8D%E7%BD%AE
  // locales: {},

  themeConfig: {
    logo: '/hero.png',
    hostname: 'https://vuepress-theme-hope-demo.mrhope.site',

    author: 'Mr.LRH',
    repo: 'https://github.com/vuepress-theme-hope/vuepress-theme-hope',

    nav: nav, // 导航栏链接
    sidebar: sidebar, // 侧边栏导航

    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'https://github.com/lrh21g/blogs',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'GitHub',
    // 是否在导航栏右侧显示仓库链接，默认为 `true`
    repoDisplay: true,
    // 默认是 false, 设置为 true 来启用
    editLinks: false,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',

    // 主题的多语言配置，主要需要配置各语言的 nav 与 sidebar。
    // locales: {
    //   '/zh/': {
    //     nav: [],
    //     sidebar: {
    //       '/zh/': [],
    //     },
    //   },
    // },

    // 主题功能配置 - 博客配置
    blog: {
      // 博主的个人介绍地址
      intro: '/intro/',
      // 是否在侧边栏展示博主信息
      // mobile: 在移动视图中显示在侧边栏中；always: 总是展示在侧边栏中；none: 永远不在侧边栏展示
      sidebarDisplay: 'mobile',
      // 设置当前页面的页脚社交链接
      // 配置地址： https://vuepress-theme-hope.github.io/zh/config/page/#medialink
      // links: {
      //   Zhihu: 'https://zhihu.com',
      //   Baidu: 'https://baidu.com',
      //   Github: 'https://github.com',
      // },
    },

    // 主题功能配置 - 页脚设置
    footer: {
      display: false, // 是否默认显示页脚
      content: '默认页脚', // 页脚的默认内容
      copyright: false, // 默认的版权信息，设置为 false 来默认禁用它
    },

    // 主题插件配置 - 评论系统
    // 配置文档： https://vuepress-theme-hope.github.io/comment/zh/config/
    // comment: {
    //   type: 'valine',
    //   appId: '2vSLKb0SqFKKWEgrOPGy3sp1-gzGzoHsz',
    //   appKey: 'vma8Ewk61WeNkI81O3CGpT2i',
    // },

    // 处理你的 VuePress 站点中的复制操作
    // 配置： https://github.com/vuepress/vuepress-plugin-copyright
    copyright: {
      status: true, // 是否全局启用该功能
      minLength: 100, // 触发版权信息或禁止复制动作的最少字符数
      noCopy: false, // 是否禁止复制
      noSelect: false, // 是否禁止选中文字
    },

    git: {
      // 当前时区，使用 CI 部署时很有用
      // 详细的时区列表: https://www.zeitverschiebung.net/cn/all-time-zones.html
      // timezone: 'Asia/Changsha',
    },

    // Markdown 功能增强
    // 配置文档： https://vuepress-theme-hope.github.io/md-enhance/zh/config/
    mdEnhance: {
      lineNumbers: true, // 在每个代码块的左侧显示行号
      imageFix: true, // 修复包含特殊字符的图片的引用
      align: true, // 启用自定义对齐格式支持
      sup: true, // 启用上角标格式支持
      sub: true, // 启用下角标格式支持
      footnote: true, // 启用脚注格式支持
      mark: true, // 开启标记
      tex: true, // 启用 TeX 支持
      mermaid: true, // 启用 Mermaid (opens new window)支持
      flowchart: true, // 启用 流程图 语法支持
      demo: {
        codepen: false,
        jsfiddle: false,
      }, // 启用代码演示
      // enableAll: true, // 启用全部功能
      // // 是否启用幻灯片支持
      // presentation: {
      //   // 启用的 Reveal.js 插件
      //   plugins: [
      //     'highlight',
      //     'math',
      //     'search',
      //     'notes',
      //     'zoom',
      //     'anything',
      //     'audio',
      //     'chalkboard',
      //   ],
      // },
    },

    // 渐进式网络应用程序支持
    pwa: {
      favicon: '/favicon.ico', // 填入 favicon 地址，(绝对路径)
      cachePic: true, // 是否缓存图片
      // 针对苹果的特殊设置
      apple: {
        icon: '/assets/icon/apple-icon-152.png', // 苹果使用的图标地址，推荐 152×152 大小
        statusBarColor: 'black', // 苹果的状态栏颜色
      },
      // 针对微软磁贴的特殊设置
      msTile: {
        image: '/assets/icon/ms-icon-144.png', // 磁贴图标
        color: '#ffffff', // 磁贴颜色，缺省会自动回退到主题色
      },
      // 填充一个将被解析为 manifest.webmanifest 的对象。
      manifest: {
        icons: [
          {
            src: '/assets/icon/chrome-mask-512.png',
            sizes: '512x512',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-mask-192.png',
            sizes: '192x192',
            purpose: 'maskable',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/assets/icon/chrome-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
        shortcuts: [
          {
            name: 'Guide',
            short_name: 'Guide',
            url: '/guide/',
            icons: [
              {
                src: '/assets/icon/guide-maskable.png',
                sizes: '192x192',
                purpose: 'maskable',
                type: 'image/png',
              },
              {
                src: '/assets/icon/guide-monochrome.png',
                sizes: '192x192',
                purpose: 'monochrome',
                type: 'image/png',
              },
            ],
          },
        ],
      },
    },
  },
});
