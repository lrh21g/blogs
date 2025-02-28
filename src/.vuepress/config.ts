import { defineUserConfig } from 'vuepress'
import { getDirname, path } from 'vuepress/utils'

import theme from './theme.js'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  host: '0.0.0.0',
  port: 8080,
  base: '/blogs/',

  lang: 'zh-CN', // 站点的语言
  title: 'Mr.LRH 博客', // 站点的标题
  description: '学习笔记，使用 VuePress + vuepress-theme-hope 搭建。', // 站点的描述
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/blogs/favicon.ico',
      },
    ], // 增加一个自定义的 favicon(网页标签的图标)
  ], // 在最终渲染出的 HTML 的 <head> 标签内加入的额外标签

  // 多语言支持的各个语言 locales
  // locales: {
  //   '/': {
  //     lang: 'en-US',
  //     title: 'Blog Demo',
  //     description: 'A blog demo for vuepress-theme-hope',
  //   },
  //   '/zh/': {
  //     lang: 'zh-CN',
  //     title: '博客演示',
  //     description: 'vuepress-theme-hope 的博客演示',
  //   },
  // },

  // ========== Markdown 配置 ==========
  markdown: {
    // importCode : VuePress 内置的 markdown-it 导入代码插件的配置项。设置为 false 可以禁用该插件
    importCode: {
      // handleImportPath ： 用于处理导入代码语法中的文件导入路径
      handleImportPath: str =>
        str.replace(/^@src/, path.resolve(__dirname, '..')),
    },
    headers: {
      level: [2, 3, 4],
    },
  },

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
})
