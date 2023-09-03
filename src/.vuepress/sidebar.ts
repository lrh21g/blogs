import { sidebar } from 'vuepress-theme-hope'

export default sidebar({
  '/前端/HTML_CSS/': [
    {
      text: 'CSS基础', // 必要的，分组的标题文字
      // icon: 'brackets-curly', // 可选的, 分组标题对应的图标
      // link: '/foo/', // 可选的, 分组标题对应的链接
      prefix: 'CSS基础/', // 可选的，会添加到每个 item 链接地址之前
      collapsible: true, // 可选的, 设置分组是否可以折叠，默认值是 false
      // 必要的，分组的子项目
      children: [
        '内联元素',
        'BFC',
        'x-height',
        'line-height',
        'vertical-align',
        'float',
      ],
    },
    {
      text: 'CSS布局',
      prefix: 'CSS布局/',
      collapsible: true,
      children: [
        '页面等比适配',
        '水平垂直居中',
        '多列布局',
        '栅格布局',
        '全屏布局',
        'Flex布局',
        'Grid布局',
        '自适应布局',
        'StickyFooter',
      ],
    },
    {
      text: 'CSS相关',
      prefix: 'CSS相关/',
      collapsible: true,
      children: ['CSS常用封装', 'CSS实现长宽比'],
    },
    {
      text: 'Canvas基础',
      prefix: 'Canvas基础/',
      collapsible: true,
      children: [
        'canvas基础',
        'canvas绘制形状',
        'canvas添加样式',
        'canvas绘制文本',
        'canvas使用图像',
        'canvas变形',
        'canvas合成与裁剪',
        'canvas基本动画',
        'canvas像素操作',
        'canvas优化',
      ],
    },
    {
      text: 'Canvas实战',
      prefix: 'Canvas实战/',
      collapsible: true,
      children: [],
    },
    {
      text: 'SVG',
      prefix: 'svg/',
      collapsible: true,
      children: ['svg基础', 'svg动画', 'svgSMIL动画', '基于anime.js的svg动画'],
    },
  ],
  '/前端/H5/': [
    {
      text: '移动端H5',
      prefix: '',
      collapsible: true,
      children: [
        '移动端基本概念',
        '移动端适配',
        '1px边框问题',
        '图片模糊问题',
        '移动端常见问题',
      ],
    },
  ],
  '/前端/动效/': [
    {
      text: '动效',
      prefix: '',
      collapsible: true,
      children: ['H5直播点赞动画'],
    },
  ],
  '/前端/JavaScript/': [
    {
      text: 'Javascript',
      icon: 'ri:javascript-fill',
      prefix: '基础知识/',
      collapsible: true,
      children: [
        {
          text: "类型概述",
          link: "类型概述",
          icon: "material-symbols:arrow-circle-right",
        },
        {
          text: "基础类型",
          link: "基础类型",
          icon: "material-symbols:arrow-circle-right",
        },
        {
          text: 'Object',
          icon: 'material-symbols:data-object-rounded',
          collapsible: true,
          children: ['对象', '原型与继承', 'Reflect'],
        },
        {
          text: "Class",
          link: "Class",
          icon: "material-symbols:arrow-circle-right",
        },
        {
          text: 'Array',
          icon: 'material-symbols:data-array-rounded',
          collapsible: true,
          children: ['数组', 'ArrayBuffer'],
        },
        {
          text: "Set和Map",
          link: "Set和Map",
          icon: "material-symbols:arrow-circle-right",
        },
        {
          text: '函数',
          icon: 'material-symbols:function',
          collapsible: true,
          children: ['函数', '作用域与闭包'],
        },
        {
          text: '异步编程',
          icon: 'material-symbols:update-rounded',
          collapsible: true,
          children: ['异步', 'EventLoop', 'Promise', 'Generator', 'async'],
        },
        {
          text: '正则表达式',
          icon: 'material-symbols:regular-expression-rounded',
          collapsible: true,
          children: [],
        }
      ],
    },
    {
      text: '设计模式',
      prefix: '设计模式/',
      collapsible: true,
      children: ['JavaScript设计模式'],
    },
    {
      text: '实用技巧',
      prefix: '',
      collapsible: true,
      children: ['JavaScript常用封装', '手写系列'],
    },
    {
      text: '混合开发',
      prefix: '',
      collapsible: true,
      children: ['混合开发'],
    },
    {
      text: '其他',
      prefix: '其他/',
      collapsible: true,
      children: ['JavaScript实现网页截屏'],
    },
  ],
  '/前端/TypeScript/': [
    {
      text: 'TypeScript 类型系统',
      prefix: '',
      collapsible: true,
      children: [
        'TypeScript基础类型',
        'TypeScript其他类型',
        'TypeScript装饰器',
        'TypeScript控制反转和依赖注入',
      ],
    },
    {
      text: 'TypeScript 项目配置',
      prefix: '',
      collapsible: true,
      children: ['TypeScript声明文件', 'tsconfig配置'],
    },
    {
      text: 'TypeScript 实战',
      prefix: '',
      collapsible: true,
      children: ['TypeScript实现Promise', 'TypeScript实现Vuex'],
    },
  ],
  '/前端/Node/': [
    {
      text: '基础',
      prefix: '',
      collapsible: true,
      children: ['基础知识'],
    },
  ],
  '/前端框架/项目搭建/': [
    {
      text: '项目规范',
      prefix: '',
      collapsible: true,
      children: ['编程规范'],
    },
  ],
  '/前端框架/Vue/': [
    {
      text: 'Vue2.x',
      prefix: 'Vue2/',
      collapsible: true,
      children: [
        'Vue2基础',
        'Vue2组件通信方式',
        'Vue2相关组件实现',
        'Vue2实用技巧',
        'Vue2实现原理',
        'VueRouter',
        'Vuex',
      ],
    },
    {
      text: 'Vue2.x 源码解析',
      prefix: 'Vue2源码解析/',
      collapsible: true,
      children: [
        '数据驱动',
        '组件化',
        '响应式',
        '编译',
        {
          text: 'Vue 相关扩展',
          prefix: '相关扩展/',
          collapsible: true,
          children: ['event', 'v-model', 'slot', 'keep-alive', 'transition'],
        },
        'vue-router',
        'vue-vuex',
      ],
    },
    {
      text: 'Vue3.x',
      prefix: 'Vue3/',
      collapsible: true,
      children: ['Vue3CompositionAPI'],
    },
  ],
  '/前端框架/React/': [
    {
      text: 'React 基础',
      prefix: 'React基础/',
      collapsible: true,
      children: [
        'JSX',
        'React组件',
        'State',
        'Props',
        'LifeCycle',
        'Ref',
        'Context',
        '模块化CSS',
        '高阶组件',
        '自定义Hooks',
        'Transition',
        'useSyncExternalStore',
      ],
    },
    {
      text: 'React 优化',
      prefix: 'React优化/',
      collapsible: true,
      children: ['渲染控制', '渲染调优', '处理海量数据', '其他优化'],
    },
    {
      text: 'React 原理',
      prefix: 'React原理/',
      collapsible: true,
      children: [
        'Fiber',
        'Scheduler',
        'Reconciler',
        '事件系统',
        'React位运算',
        'Hooks',
        'Context',
      ],
    },
    {
      text: 'React 生态',
      prefix: 'React生态/',
      collapsible: true,
      children: ['react-router', 'react-redux'],
    },
  ],
  '/前端框架/Webpack/': [
    {
      text: 'Webpack',
      prefix: 'Webpack基础/',
      collapsible: true,
      children: [
        'JS模块化',
        'CSS模块化',
        '核心概念',
        'babel',
        'loaders',
        'plugins',
        '多页面配置',
        'devServer',
      ],
    },
    {
      text: 'Webpack优化',
      prefix: 'Webpack优化/',
      collapsible: true,
      children: ['Webpack优化'],
    },
    {
      text: 'Webpack实战',
      prefix: 'Webpack实战/',
      collapsible: true,
      children: ['编写loader', '编写plugin'],
    },
    {
      text: 'Webpack原理',
      prefix: 'Webpack原理/',
      collapsible: true,
      children: ['Webpack原理'],
    },
    {
      text: 'Webpack Q&A',
      prefix: '',
      collapsible: true,
      children: ['Q_A'],
    },
  ],
  '/架构/微前端/': [
    {
      text: '微前端简介',
      link: '/架构/微前端/',
    },
    {
      text: '实现方式',
      prefix: '实现方式/',
      collapsible: true,
      children: ['qiankun', 'single-spa', 'Garfish', 'EMP'],
    },
    {
      text: '基础模块实现',
      link: '/架构/微前端/基础模块实现.md',
    },
  ],
  '/服务端/Linux/': [
    {
      text: 'Linux基础',
      prefix: '',
      collapsible: true,
      children: ['基础知识'],
    },
  ],
  '/数据库/SQL语言/': [
    {
      text: '基础',
      prefix: '',
      collapsible: true,
      children: ['SQL基础'],
    },
  ],
  '/数据库/MongoDB/': [
    {
      text: '基础',
      prefix: '',
      collapsible: true,
      children: ['基础知识'],
    },
  ],
  '/其他/Git/': [
    {
      text: 'Git',
      collapsible: true,
      children: [
        'git基础',
        'git命令',
        'git_head',
        'git技巧',
        'git对象',
        'git忽略提交',
        'git相关问题',
      ],
    },
  ],
  '/其他/工具/': [
    {
      text: '工具相关',
      collapsible: true,
      children: ['VSCode插件', 'whistle'],
    },
  ],
  '/代码规范/': [
    {
      text: '代码规范',
      collapsible: true,
      children: ['BEM'],
    },
  ],
})
