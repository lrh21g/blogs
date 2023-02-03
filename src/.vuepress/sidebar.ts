import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/前端/HTML_CSS/': [
    {
      text: 'CSS基础', // 目录标题
      collapsible: true, // 目录是否可折叠
      children: [
        '/前端/HTML_CSS/CSS基础/内联元素',
        '/前端/HTML_CSS/CSS基础/BFC',
        '/前端/HTML_CSS/CSS基础/x-height',
        '/前端/HTML_CSS/CSS基础/line-height',
        '/前端/HTML_CSS/CSS基础/vertical-align',
        '/前端/HTML_CSS/CSS基础/float',
      ],
    },
    {
      text: 'CSS布局',
      collapsible: true,
      children: [
        '/前端/HTML_CSS/CSS布局/页面等比适配',
        '/前端/HTML_CSS/CSS布局/水平垂直居中',
        '/前端/HTML_CSS/CSS布局/多列布局',
        '/前端/HTML_CSS/CSS布局/栅格布局',
        '/前端/HTML_CSS/CSS布局/全屏布局',
        '/前端/HTML_CSS/CSS布局/Flex布局',
        '/前端/HTML_CSS/CSS布局/Grid布局',
        '/前端/HTML_CSS/CSS布局/自适应布局',
        '/前端/HTML_CSS/CSS布局/StickyFooter',
      ],
    },
    {
      text: 'CSS相关',
      collapsible: true,
      children: [
        '/前端/HTML_CSS/CSS相关/CSS常用封装',
        '/前端/HTML_CSS/CSS相关/CSS实现长宽比',
      ],
    },
    {
      text: 'Canvas基础',
      collapsible: true,
      children: [
        '/前端/HTML_CSS/Canvas基础/canvas基础',
        '/前端/HTML_CSS/Canvas基础/canvas绘制形状',
        '/前端/HTML_CSS/Canvas基础/canvas添加样式',
        '/前端/HTML_CSS/Canvas基础/canvas绘制文本',
        '/前端/HTML_CSS/Canvas基础/canvas使用图像',
        '/前端/HTML_CSS/Canvas基础/canvas变形',
        '/前端/HTML_CSS/Canvas基础/canvas合成与裁剪',
        '/前端/HTML_CSS/Canvas基础/canvas基本动画',
        '/前端/HTML_CSS/Canvas基础/canvas像素操作',
        '/前端/HTML_CSS/Canvas基础/canvas优化',
      ],
    },
    {
      text: 'Canvas实战',
      collapsible: true,
      children: [],
    },
    {
      text: 'SVG',
      collapsible: true,
      children: [
        '/前端/HTML_CSS/svg/svg基础',
        '/前端/HTML_CSS/svg/svg动画',
        '/前端/HTML_CSS/svg/svgSMIL动画',
        '/前端/HTML_CSS/svg/基于anime.js的svg动画',
      ],
    },
  ],
  '/前端/H5/': [
    {
      text: '移动端H5',
      collapsible: true,
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
      collapsible: true,
      children: ['/前端/动效/H5直播点赞动画'],
    },
  ],
  '/前端/JavaScript/': [
    {
      text: 'JavaScript基础',
      collapsible: true,
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
      collapsible: true,
      children: ['/前端/设计模式/JavaScript设计模式'],
    },
    {
      text: '实用技巧',
      collapsible: true,
      children: [
        '/前端/JavaScript/JavaScript常用封装',
        '/前端/JavaScript/手写系列',
      ],
    },
    {
      text: '混合开发',
      collapsible: true,
      children: ['/前端/JavaScript/混合开发'],
    },
    {
      text: '其他',
      collapsible: true,
      children: ['/前端/JavaScript/其他/JavaScript实现网页截屏'],
    },
  ],
  '/前端/TypeScript/': [
    {
      text: 'TypeScript 类型系统',
      collapsible: true,
      children: [
        '/前端/TypeScript/TypeScript基础类型',
        '/前端/TypeScript/TypeScript其他类型',
        '/前端/TypeScript/TypeScript装饰器',
        '/前端/TypeScript/TypeScript控制反转和依赖注入',
      ],
    },
    {
      text: 'TypeScript 项目配置',
      collapsible: true,
      children: [
        '/前端/TypeScript/TypeScript声明文件',
        '/前端/TypeScript/tsconfig配置',
      ],
    },
    {
      text: 'TypeScript 实战',
      collapsible: true,
      children: [
        '/前端/TypeScript/TypeScript实现Promise',
        '/前端/TypeScript/TypeScript实现Vuex',
      ],
    },
  ],
  '/前端/Node/': [
    {
      text: '基础',
      collapsible: true,
      children: ['/前端/Node/基础知识'],
    },
  ],
  '/前端框架/项目搭建/': [
    {
      text: '项目规范',
      collapsible: true,
      children: ['/前端框架/项目搭建/编程规范'],
    },
  ],
  '/前端框架/Vue/': [
    {
      text: 'Vue2.x',
      collapsible: true,
      children: [
        '/前端框架/Vue/Vue2/Vue2基础',
        '/前端框架/Vue/Vue2/Vue2组件通信方式',
        '/前端框架/Vue/Vue2/Vue2相关组件实现',
        '/前端框架/Vue/Vue2/Vue2实用技巧',
        '/前端框架/Vue/Vue2/Vue2实现原理',
        '/前端框架/Vue/Vue2/VueRouter',
        '/前端框架/Vue/Vue2/Vuex',
      ],
    },
    {
      text: 'Vue2.x 源码解析',
      collapsible: true,
      children: [
        '/前端框架/Vue/Vue2源码解析/数据驱动',
        '/前端框架/Vue/Vue2源码解析/组件化',
        '/前端框架/Vue/Vue2源码解析/响应式',
        '/前端框架/Vue/Vue2源码解析/编译',
        {
          text: 'Vue 相关扩展',
          collapsible: true,
          children: [
            '/前端框架/Vue/Vue2源码解析/相关扩展/event',
            '/前端框架/Vue/Vue2源码解析/相关扩展/v-model',
            '/前端框架/Vue/Vue2源码解析/相关扩展/slot',
            '/前端框架/Vue/Vue2源码解析/相关扩展/keep-alive',
            '/前端框架/Vue/Vue2源码解析/相关扩展/transition',
          ],
        },
        '/前端框架/Vue/Vue2源码解析/vue-router',
        '/前端框架/Vue/Vue2源码解析/vue-vuex',
      ],
    },
    {
      text: 'Vue3.x',
      collapsible: true,
      children: ['/前端框架/Vue/Vue3/Vue3CompositionAPI'],
    },
  ],
  '/前端框架/React/': [
    {
      text: 'React 基础',
      collapsible: true,
      children: [
        '/前端框架/React/React基础/JSX',
        '/前端框架/React/React基础/React组件',
        '/前端框架/React/React基础/State',
        '/前端框架/React/React基础/Props',
        '/前端框架/React/React基础/LifeCycle',
        '/前端框架/React/React基础/Ref',
        '/前端框架/React/React基础/Context',
        '/前端框架/React/React基础/模块化CSS',
        '/前端框架/React/React基础/高阶组件',
      ],
    },
    {
      text: 'React 优化',
      collapsible: true,
      children: [
        '/前端框架/React/React优化/渲染控制',
        '/前端框架/React/React优化/渲染调优',
        '/前端框架/React/React优化/处理海量数据',
        '/前端框架/React/React优化/其他优化',
      ],
    },
    {
      text: 'React 原理',
      collapsible: true,
      children: [
        '/前端框架/React/React原理/Fiber',
        '/前端框架/React/React原理/Scheduler',
        '/前端框架/React/React原理/Reconciler',
        '/前端框架/React/React原理/事件系统',
      ],
    },
  ],
  '/前端框架/Webpack/': [
    {
      text: 'Webpack',
      collapsible: true,
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
      collapsible: true,
      children: ['/前端框架/Webpack/Webpack优化/Webpack优化'],
    },
    {
      text: 'Webpack实战',
      collapsible: true,
      children: [
        '/前端框架/Webpack/Webpack实战/编写loader',
        '/前端框架/Webpack/Webpack实战/编写plugin',
      ],
    },
    {
      text: 'Webpack原理',
      collapsible: true,
      children: ['/前端框架/Webpack/Webpack原理/Webpack原理'],
    },
    {
      text: 'Webpack Q&A',
      collapsible: true,
      children: ['/前端框架/Webpack/Q&A'],
    },
  ],
  '/架构/微前端/': [
    {
      text: '微前端简介',
      link: '/架构/微前端/',
    },
    {
      text: '实现方式',
      collapsible: true,
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
      collapsible: true,
      children: ['/服务端/Linux/基础知识'],
    },
  ],
  '/数据库/SQL语言/': [
    {
      text: '基础',
      collapsible: true,
      children: ['/数据库/SQL语言/SQL基础'],
    },
  ],
  '/数据库/MongoDB/': [
    {
      text: '基础',
      collapsible: true,
      children: ['/数据库/MongoDB/基础知识'],
    },
  ],
  '/其他/Git/': [
    {
      text: 'Git',
      collapsible: true,
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
      collapsible: true,
      children: ['/其他/工具/VSCode插件', '/其他/工具/whistle'],
    },
  ],
  '/代码规范/': [
    {
      text: '代码规范',
      collapsible: true,
      children: ['/代码规范/BEM'],
    },
  ],
})
