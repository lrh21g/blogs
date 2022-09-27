import { defineUserConfig } from 'vuepress'
import { path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

import theme from './theme'

export default defineUserConfig({
  // ========== 站点配置 ==========
  base: '/blogs/', // 部署站点的基础路径
  lang: 'zh-CN', // 站点的语言
  title: 'Mr.LRH 博客', // 站点的标题
  description: '学习笔记，使用 VuePress + vuepress-theme-hope 搭建。', // 站点的描述
  head: [
    ['link', { rel: 'icon', href: '/blogs/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ], // 在最终渲染出的 HTML 的 <head> 标签内加入的额外标签
  // locales: {}, // 多语言支持的各个语言 locales

  // ========== 主题配置 ==========
  theme,

  // ========== Markdown 配置 ==========
  markdown: {
    // importCode : VuePress 内置的 markdown-it 导入代码插件的配置项。设置为 false 可以禁用该插件
    importCode: {
      // handleImportPath ： 用于处理导入代码语法中的文件导入路径
      handleImportPath: str =>
        str.replace(/^@docs/, path.resolve(__dirname, '..')),
    },
  },

  // ========== 插件 配置 ==========
  plugins: [
    registerComponentsPlugin({
      // 组件目录的绝对路径
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
})
