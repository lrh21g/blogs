import { navbar } from 'vuepress-theme-hope'

export default navbar([
  {
    text: '前端',
    // icon: 'info',
    // prefix: '/zh/basic/', // 为分组的每一个子链接添加一个前缀
    children: [
      {
        text: 'HTML + CSS',
        link: '/前端/HTML_CSS/',
      },
      {
        text: 'H5',
        link: '/前端/H5/',
      },
      {
        text: '动效',
        link: '/前端/动效/',
      },
      {
        text: 'JavaScript',
        link: '/前端/JavaScript/',
      },
      {
        text: 'TypeScript',
        link: '/前端/TypeScript/',
      },
      {
        text: 'Node',
        link: '/前端/Node/',
      },
    ],
  },
  {
    text: '前端框架',
    children: [
      {
        text: '项目搭建',
        link: '/前端框架/项目搭建/',
      },
      {
        text: 'Vue',
        link: '/前端框架/Vue/',
      },
      {
        text: 'React',
        link: '/前端框架/React/',
      },
      {
        text: 'Electron',
        link: '/前端框架/Electron/',
      },
      {
        text: 'Webpack',
        link: '/前端框架/Webpack/',
      },
    ],
  },
  {
    text: '移动端',
    children: [
      {
        text: 'ReactNative',
        link: '/移动端/ReactNative/',
      },
      {
        text: 'Flutter',
        link: '/移动端/Flutter/',
      },
    ],
  },
  {
    text: '架构',
    children: [
      {
        text: '微前端',
        link: '/架构/微前端/',
      },
    ],
  },
  {
    text: '服务端',
    children: [
      {
        text: 'Linux',
        link: '/服务端/Linux/',
      },
    ],
  },
  {
    text: '数据库',
    children: [
      {
        text: 'SQL',
        link: '/数据库/SQL语言/',
      },
      {
        text: 'MongoDB',
        link: '/数据库/MongoDB/',
      },
    ],
  },
  {
    text: '其他',
    children: [
      {
        text: '代码规范',
        link: '/代码规范/',
      },
      {
        text: 'Git',
        link: '/其他/Git/',
      },
      {
        text: '工具',
        link: '/其他/工具/',
      },
    ],
  },
  {
    text: '书签',
    link: '/书签',
  },
])
