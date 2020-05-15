module.exports = {
  '/html/': [
    {
      title: 'HTML',
      collapsable: false,
      children: [
        'base',
        'adaptive'
      ]
    }
  ],
  '/css/': [
    {
      title: 'CSS',
      collapsable: false,
      children: [
        'base',
        'common'
      ]
    }
  ],
  '/javascript/': [
    {
      title: '基础',
      collapsable: false,
      children: [
        'base', // JavaScript基础
        'prototype', // 原型与继承
        'scope', // 作用域
        'async', // 异步
      ]
    },
    {
      title: '实用技巧',
      collapsable: false,
      children: [
        'common', // 通用封装
      ]
    },
    {
      title: '混合开发',
      collapsable: false,
      children: [
        'hybrid' // 混合开发
      ]
    }
  ],
  '/typescript/': [
    {
      title: '基础',
      collapsable: false,
      children: [
        'base'
      ]
    }
  ],
  '/node/': [
    {
      title: '基础',
      collapsable: false,
      children: [
        'base'
      ]
    }
  ],
  '/vue/': [
    {
      title: 'Vue',
      collapsable: false,
      children: [
        'base',
        'component',
        'component-communication',
        'skill'
      ]
    },
    {
      title: 'Vue源码',
      collapsable: false,
      children: []
    }
  ],
  '/react/': [
    {
      title: 'React',
      collapsable: false,
      children: [
        'base'
      ]
    }
  ]
}