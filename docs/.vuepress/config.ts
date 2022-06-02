import { defineUserConfig } from 'vuepress';
import theme from './theme';

const { path } = require('@vuepress/utils');
const { registerComponentsPlugin } = require('@vuepress/plugin-register-components');

export default defineUserConfig({
  lang: 'zh-CN',
  title: 'Mr.LRH 博客',
  description: '学习笔记，使用 VuePress + vuepress-theme-hope 搭建。',

  base: '/blogs/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],

  markdown: {
    importCode: {
      handleImportPath: (str) => str.replace(/^@docs/, path.resolve(__dirname, '..')),
    },
  },

  plugins: [
    registerComponentsPlugin({
      // 组件目录的绝对路径
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],

  theme,
});
