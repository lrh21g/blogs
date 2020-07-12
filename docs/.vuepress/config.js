const nav = require("./navConfig");
const sidebar = require("./sidebar");

module.exports = {
  base: "/blogs/", // 部署站点的基础路径
  title: "LRH的个人博客", // 网站的标题
  description: "用于记录笔记", // 网站的描述
  // 额外的需要被注入到当前页面的 HTML <head> 中的标签
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 2, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
    nav: nav, // 导航栏链接
    sidebar: sidebar, // 侧边栏导航
  },
  plugins: [
    "@vuepress/active-header-links",
    "@vuepress/back-to-top",
    "@vuepress/nprogress",
    "@vuepress/medium-zoom",
  ],
};
