const nav = require("./navConfig");
const sidebar = require("./sidebar");

module.exports = {
  base: "/blogs/", // 部署站点的基础路径
  title: "LRH的个人博客", // 网站的标题
  description: "用于记录笔记", // 网站的描述
  // 额外的需要被注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css' }],
    ['link', { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css" }]
  ],
  extendMarkdown (md) {
    md.set({html: true})
    // 使用更多的 markdown-it 插件!
    md.use(require("markdown-it-katex"))
  },
  markdown: {
    lineNumbers: true, // 代码块显示行号
    extractHeaders: ['h2', 'h3', 'h4'], // 默认情况下，VuePress 会提取 h2 和 h3 标题。可以通过这个选项来修改提取出的标题级别。
    extendMarkdown: md => {
      md.set({html: true})
      // 使用更多的 markdown-it 插件!
      md.use(require("markdown-it-katex"))
    },
  },
  themeConfig: {
    sidebarDepth: 2, // 默认的深度是 1，它将提取到 h2 的标题，设置成 0 将会禁用标题（headers）链接，同时，最大的深度为 2，它将同时提取 h2 和 h3 标题。
    lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
    nav: nav, // 导航栏链接
    sidebar: sidebar, // 侧边栏导航
  },
  plugins: [
    "@vuepress/active-header-links",
    "@vuepress/back-to-top",
    "@vuepress/nprogress",
    "@vuepress/medium-zoom",
    "demo-container"
  ],
};
