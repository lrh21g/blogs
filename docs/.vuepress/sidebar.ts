import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/前端/HTML+CSS/': [
    {
      text: 'CSS基础',
      collapsable: true,
      children: [
        '/前端/HTML+CSS/CSS基础/内联元素',
        '/前端/HTML+CSS/CSS基础/BFC',
        '/前端/HTML+CSS/CSS基础/x-height',
        '/前端/HTML+CSS/CSS基础/line-height',
        '/前端/HTML+CSS/CSS基础/vertical-align',
        '/前端/HTML+CSS/CSS基础/float',
      ],
    },
    {
      text: 'CSS布局',
      collapsable: true,
      children: [
        '/前端/HTML+CSS/CSS布局/页面等比适配',
        '/前端/HTML+CSS/CSS布局/水平垂直居中',
        '/前端/HTML+CSS/CSS布局/多列布局',
        '/前端/HTML+CSS/CSS布局/栅格布局',
        '/前端/HTML+CSS/CSS布局/全屏布局',
        '/前端/HTML+CSS/CSS布局/Flex布局',
        '/前端/HTML+CSS/CSS布局/Grid布局',
        '/前端/HTML+CSS/CSS布局/自适应布局',
        '/前端/HTML+CSS/CSS布局/StickyFooter',
      ],
    },
    {
      text: 'CSS相关',
      collapsable: true,
      children: [
        '/前端/HTML+CSS/CSS相关/CSS常用封装',
        '/前端/HTML+CSS/CSS相关/CSS实现长宽比',
      ],
    },
    {
      text: 'Canvas基础',
      collapsable: true,
      children: [
        '/前端/HTML+CSS/Canvas基础/canvas基础',
        '/前端/HTML+CSS/Canvas基础/canvas绘制形状',
        '/前端/HTML+CSS/Canvas基础/canvas添加样式',
        '/前端/HTML+CSS/Canvas基础/canvas绘制文本',
        '/前端/HTML+CSS/Canvas基础/canvas使用图像',
        '/前端/HTML+CSS/Canvas基础/canvas变形',
        '/前端/HTML+CSS/Canvas基础/canvas合成与裁剪',
        '/前端/HTML+CSS/Canvas基础/canvas基本动画',
        '/前端/HTML+CSS/Canvas基础/canvas像素操作',
        '/前端/HTML+CSS/Canvas基础/canvas优化',
      ],
    },
    {
      text: 'Canvas实战',
      collapsable: true,
      children: [],
    },
    {
      text: 'SVG',
      collapsable: true,
      children: [
        '/前端/HTML+CSS/svg/svg基础',
        '/前端/HTML+CSS/svg/svg动画',
        '/前端/HTML+CSS/svg/svgSMIL动画',
        '/前端/HTML+CSS/svg/基于anime.js的svg动画',
      ],
    },
  ],
  '/前端/H5/': [
    {
      text: '移动端H5',
      collapsable: true,
      children: [
        '/前端/H5/移动端基本概念',
        '/前端/H5/移动端适配',
        '/前端/H5/1px边框问题',
        '/前端/H5/图片模糊问题',
        '/前端/H5/移动端常见问题',
      ],
    },
  ],
  '/前端/动效/': [
    {
      text: '动效',
      collapsable: true,
      children: ['/前端/动效/H5直播点赞动画'],
    },
  ],
  '/前端/JavaScript/': [
    {
      text: 'JavaScript基础',
      collapsable: true,
      children: [
        '/前端/JavaScript/基础知识',
        '/前端/JavaScript/数组',
        '/前端/JavaScript/原型与继承',
        '/前端/JavaScript/作用域与闭包',
        '/前端/JavaScript/异步',
      ],
    },
    {
      text: '设计模式',
      collapsable: true,
      children: ['/前端/设计模式/JavaScript设计模式'],
    },
    {
      text: '实用技巧',
      collapsable: true,
      children: [
        '/前端/JavaScript/JavaScript常用封装',
        '/前端/JavaScript/手写系列',
      ],
    },
    {
      text: '混合开发',
      collapsable: true,
      children: ['/前端/JavaScript/混合开发'],
    },
    {
      text: '其他',
      collapsable: true,
      children: ['/前端/JavaScript/其他/JavaScript实现网页截屏'],
    },
  ],
  '/前端/TypeScript/': [
    {
      text: 'TypeScript 类型系统',
      collapsable: true,
      children: [
        '/前端/TypeScript/TypeScript基础类型',
        '/前端/TypeScript/TypeScript其他类型',
        '/前端/TypeScript/TypeScript装饰器',
        '/前端/TypeScript/TypeScript控制反转和依赖注入',
      ],
    },
    {
      text: 'TypeScript 项目配置',
      collapsable: true,
      children: [
        '/前端/TypeScript/TypeScript声明文件',
        '/前端/TypeScript/tsconfig配置',
      ],
    },
    {
      text: 'TypeScript 实战',
      collapsable: true,
      children: [
        '/前端/TypeScript/TypeScript实现Promise',
        '/前端/TypeScript/TypeScript实现Vuex',
      ],
    },
  ],
  '/前端/Node/': [
    {
      text: '基础',
      collapsable: true,
      children: ['/前端/Node/基础知识'],
    },
  ],
  '/前端框架/项目搭建/': [
    {
      text: '项目规范',
      collapsable: true,
      children: ['/前端框架/项目搭建/编程规范'],
    },
  ],
  '/前端框架/Vue/': [
    {
      text: 'Vue2',
      collapsable: true,
      children: [
        '/前端框架/Vue/Vue2/Vue2基础',
        '/前端框架/Vue/Vue2/Vue组件通信方式',
        '/前端框架/Vue/Vue2/Vue组件',
        '/前端框架/Vue/Vue2/Vue实用技巧',
        '/前端框架/Vue/Vue2/Vue原理',
      ],
    },
    {
      text: 'Vue3',
      collapsable: true,
      children: ['/前端框架/Vue/Vue3/Vue3CompositionAPI'],
    },
    {
      text: 'Vuex',
      collapsable: true,
      children: ['/前端框架/Vue/Vuex/Vuex基础'],
    },
    {
      text: 'VueRouter',
      collapsable: true,
      children: ['/前端框架/Vue/VueRouter/VueRouter基础'],
    },
    {
      text: 'Vue2解析',
      collapsable: true,
      children: [
        '/前端框架/Vue/Vue2解析/目录结构',
        '/前端框架/Vue/Vue2解析/项目构建',
      ],
    },
  ],
  '/前端框架/React/': [
    {
      text: 'React',
      collapsable: true,
      children: ['/前端框架/React/基础知识'],
    },
  ],
  '/前端框架/Webpack/': [
    {
      text: 'Webpack',
      collapsable: true,
      children: [
        '/前端框架/Webpack/Webpack基础/JS模块化',
        '/前端框架/Webpack/Webpack基础/CSS模块化',
        '/前端框架/Webpack/Webpack基础/核心概念',
        '/前端框架/Webpack/Webpack基础/babel',
        '/前端框架/Webpack/Webpack基础/loaders',
        '/前端框架/Webpack/Webpack基础/plugins',
        '/前端框架/Webpack/Webpack基础/多页面配置',
        '/前端框架/Webpack/Webpack基础/devServer',
      ],
    },
    {
      text: 'Webpack优化',
      collapsable: true,
      children: ['/前端框架/Webpack/Webpack优化/Webpack优化'],
    },
    {
      text: 'Webpack实战',
      collapsable: true,
      children: [
        '/前端框架/Webpack/Webpack实战/编写loader',
        '/前端框架/Webpack/Webpack实战/编写plugin',
      ],
    },
    {
      text: 'Webpack原理',
      collapsable: true,
      children: ['/前端框架/Webpack/Webpack原理/Webpack原理'],
    },
  ],
  '/架构/微前端/': [
    {
      text: '微前端简介',
      link: '/架构/微前端/',
    },
    {
      text: '实现方式',
      collapsable: true,
      children: [
        '/架构/微前端/实现方式/qiankun',
        '/架构/微前端/实现方式/single-spa',
        '/架构/微前端/实现方式/Garfish',
        '/架构/微前端/实现方式/EMP',
      ],
    },
    {
      text: '基础模块实现',
      link: '/架构/微前端/基础模块实现.md',
    },
  ],
  '/服务端/Linux/': [
    {
      text: 'Linux基础',
      collapsable: true,
      children: ['/服务端/Linux/基础知识'],
    },
  ],
  '/数据库/SQL语言/': [
    {
      text: '基础',
      collapsable: true,
      children: ['/数据库/SQL语言/SQL基础'],
    },
  ],
  '/数据库/MongoDB/': [
    {
      text: '基础',
      collapsable: true,
      children: ['/数据库/MongoDB/基础知识'],
    },
  ],
  '/其他/Git/': [
    {
      text: 'Git',
      collapsable: true,
      children: [
        '/其他/Git/git基础',
        '/其他/Git/git命令',
        '/其他/Git/git_head',
        '/其他/Git/git技巧',
        '/其他/Git/git对象',
        '/其他/Git/git忽略提交',
        '/其他/Git/git相关问题',
      ],
    },
  ],
  '/其他/工具/': [
    {
      text: '工具相关',
      collapsable: true,
      children: ['/其他/工具/VSCode插件', '/其他/工具/whistle'],
    },
  ],
  '/代码规范/': [
    {
      text: '代码规范',
      collapsable: true,
      children: ['/代码规范/BEM'],
    },
  ],
})
