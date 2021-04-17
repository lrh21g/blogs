module.exports = {
  '/git/': [
    {
      title: 'Git',
      collapsable: true,
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
  '/htmlcss/': [
    {
      title: 'HTML',
      collapsable: true,
      children: ['页面等比适配'],
    },
    {
      title: 'CSS基础',
      collapsable: true,
      children: [
        '/htmlcss/CSS基础/内联元素',
        '/htmlcss/CSS基础/BFC',
        '/htmlcss/CSS基础/float',
      ],
    },
    {
      title: 'CSS布局',
      collapsable: true,
      children: [
        '/htmlcss/CSS布局/水平垂直居中',
        '/htmlcss/CSS布局/多列布局',
        '/htmlcss/CSS布局/栅格布局',
        '/htmlcss/CSS布局/全屏布局',
        '/htmlcss/CSS布局/Flex布局',
        '/htmlcss/CSS布局/Grid布局',
        '/htmlcss/CSS布局/自适应布局',
        '/htmlcss/CSS布局/StickyFooter',
      ],
    },
    {
      title: 'CSS相关',
      collapsable: true,
      children: [
        '/htmlcss/CSS相关/CSS常用封装',
        '/htmlcss/CSS相关/CSS实现长宽比',
      ],
    },
    {
      title: 'CSS动效',
      collapsable: true,
      children: [],
    },
  ],
  '/H5/': [
    {
      title: '移动端H5',
      collapsable: true,
      children: [
        '移动端基本概念',
        '移动端适配',
        '1px边框问题',
        '图片模糊问题',
        '移动端常见问题',
      ],
    },
  ],
  '/javascript/': [
    {
      title: '基础',
      collapsable: true,
      children: ['基础知识', '数组', '原型与继承', '作用域与闭包', '异步'],
    },
    {
      title: '前端训练营',
      path: '/javascript/前端训练营/',
      collapsable: true,
      children: [
        '/javascript/前端训练营/01.编程语言通识',
        '/javascript/前端训练营/02.JavaScript词法和类型',
        '/javascript/前端训练营/03.表达式和类型转换',
        '/javascript/前端训练营/04.语句和对象',
      ],
    },
    {
      title: '设计模式',
      collapsable: true,
      children: ['JavaScript设计模式'],
    },
    {
      title: '实用技巧',
      collapsable: true,
      children: ['JavaScript常用封装', '手写系列'],
    },
    {
      title: '混合开发',
      collapsable: true,
      children: ['混合开发'],
    },
  ],
  '/typescript/': [
    {
      title: '基础',
      collapsable: true,
      children: ['基础知识', 'tsconfig配置', 'ts声明文件'],
    },
  ],
  '/node/': [
    {
      title: '基础',
      collapsable: true,
      children: ['基础知识'],
    },
  ],
  '/MongoDB/': [
    {
      title: '基础',
      collapsable: true,
      children: ['基础知识'],
    },
  ],
  '/linux/': [
    {
      title: '基础',
      collapsable: true,
      children: ['基础知识'],
    },
  ],
  '/vue/': [
    {
      title: 'Vue',
      collapsable: true,
      children: [
        '基础知识',
        'Vue生命周期',
        'Vue组件通信方式',
        'VueRouter',
        'Vuex',
        'Vue组件',
        'Vue实用技巧',
        'Vue原理',
      ],
    },
    {
      title: 'Vue源码',
      collapsable: true,
      children: [],
    },
  ],
  '/react/': [
    {
      title: 'React',
      collapsable: true,
      children: ['基础知识'],
    },
  ],
  '/tools/': [
    {
      title: '编辑器',
      collapsable: true,
      children: ['vscode插件'],
    },
  ],
};
