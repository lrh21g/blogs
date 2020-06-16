# React基础

+ JSX
  + 变量、表达式
  + calss style
  + 子元素和组件
  + 判断条件
  + 渲染列表
+ React事件为何 bind this
  
  ``` javascript
  import React, { Component } from 'React';
  class Home extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: 'zhangsan',
        list: [
          { id: 'id-1', title: '标题1' },
          { id: 'id-2', title: '标题2' },
          { id: 'id-3', title: '标题3' }
        ]
      }
      this.clickHandle1 = this.clickHandle1.bind(this)
    }
    render() {
      return (
        <div>
          <p onClick={this.clickHandle1}>点击1</p>
          <p onClick={this.clickHandle2}>点击2</p>
          <a href="www.baidu.com" onClick={this.clickHandle3}>点击3</a>
          <ul>
            {this.state.list.map((item, index) => {
              return
                <li key={item.id} onClick={this.clickHandler4(item.id, item.title)}>
                  index {index}; title {item.title}
                </li>
            })}
          </ul>
        </div>
      )
    }
    // this - 使用 bind
    clickHandle1() {
      console.log('this', this) // this 默认为 undefined
      this.setState({
        name: '测试'
      })
    }
    // this - 使用静态方法
    clickHandle2 = () => {
      this.setState({
        name: '测试'
      })
    }
    // event
    clickHandle3 = (event) => {
      event.preventDefault() // 阻止默认行为
      event.stopPropagation() // 阻止冒泡
      console.log('target', event.target) // 指向当前元素，即当前元素触发
      console.log('current target', event.currentTarget) // 指向当前元素，假象！！！

      // 注意，event 其实是 React 封装的。可以看 __proto__.constructor 是 SyntheticEvent 组合事件
      console.log('event', event) // 不是原生的 Event ，原生的 MouseEvent
      console.log('event.__proto__.constructor', event.__proto__.constructor)

      // 原生 event 如下。其 __proto__.constructor 是 MouseEvent
      console.log('nativeEvent', event.nativeEvent)
      console.log('nativeEvent target', event.nativeEvent.target)  // 指向当前元素，即当前元素触发
      console.log('nativeEvent current target', event.nativeEvent.currentTarget) // 指向 document ！！！

      // 1. event 是 SyntheticEvent ，模拟出来 DOM 事件所有能力
      // 2. event.nativeEvent 是原生事件对象
      // 3. 所有的事件，都被挂载到 document 上
      // 4. 和 DOM 事件不一样，和 Vue 事件也不一样
    }

    // 传递参数
    clickHandler4(id, title, event) {
      console.log(id, title)
      console.log('event', event) // 最后追加一个参数，即可接收 event
    }
  }
  ```

+ React 表单
  + 受控组件：表单的值受到了 this.setState 的控制
  + input textarea select 用 value
  + checked radio 用 checked
+ React 父子组件通讯
  + props传递数据
  + props传递函数
  + props类型检查
+ setState
  + 不可变值：不能直接修改 state 的值
    + state 要在构造函数中定义
    + 不要直接修改 state ，使用不可变值（函数式编程，纯函数）
      + 不可变值 - 数组。(注意，不能直接对数组进行 push pop splice 等，这样违反不可变值)
      + 不可变值 - 对象。(注意，不能直接对对象进行属性设置，这样违反不可变值)
  + setState 可能是异步更新（有可能是同步更新）
    + 单独使用是异步的

      ``` javascript
      this.setState({
        count: this.state.count + 1
      }, () => {
        // 联想 Vue $nextTick - DOM
        console.log('count by callback', this.state.count) // 回调函数中可以拿到最新的 state
      })
      console.log('count', this.state.count) // 异步的，拿不到最新值
      ```

    + setTimeout 中 setState 是同步的

      ``` javascript
      setTimeout(() => {
        this.setState({
          count: this.state.count + 1
        })
        console.log('count in setTimeout', this.state.count)
      }, 0)
      ```

    + 自己定义的 DOM 事件，setState 是同步的。再 componentDidMount 中

      ``` javascript
      bodyClickHandler = () => {
        this.setState({
            count: this.state.count + 1
        })
        console.log('count in body event', this.state.count)
      }
      componentDidMount() {
        // 自己定义的 DOM 事件，setState 是同步的
        document.body.addEventListener('click', this.bodyClickHandler)
      }
      componentWillUnmount() {
        // 及时销毁自定义 DOM 事件
        document.body.removeEventListener('click', this.bodyClickHandler)
        // clearTimeout
      }
      ```

  + state 异步更新的话，更新前会被合并
    + 传入对象，会被合并（类似 Object.assign ）。执行结果只一次 +1

      ``` javascript
      this.setState({
        count: this.state.count + 1
      })
      this.setState({
        count: this.state.count + 1
      })
      this.setState({
        count: this.state.count + 1
      })
      ```

    + 传入函数，不会被合并。执行结果是 +3

      ```javascript
      this.setState((prevState, props) => {
        return {
          count: prevState.count + 1
        }
      })
      this.setState((prevState, props) => {
        return {
          count: prevState.count + 1
        }
      })
      this.setState((prevState, props) => {
        return {
          count: prevState.count + 1
        }
      })
      ```

+ [React 生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
+ React 高级特性
  + 函数组件
    + 纯函数，输入 props，输出 JSX
    + 没有实例，没有生命周期，没有 state
  + 非受控组件：不会随着 state 的改变而改变
    + ref （React.createRef()）
    + defaultValue  defaultChecked
    + 手动操作DOM元素
    + 使用场景
      + 必须手动操作 DOM 元素，setState 实现不了
      + 文件上传 `<input type="file" />`
      + 某些富文本编辑器，需要传入 DOM  元素
  + Portals 使用场景
    + overflow: hidden
    + 父组件 z-index 值太小
    + fixed 需要放在 body 第一层级
  + context
  + 异步组件
    + import()
    + React.lazy
    + React.Suspense
  + 性能优化
    + shouldComponentUpdate
      + 默认返回 true，即 React 默认重新渲染所有子组件 （React 默认：父组件有更新，子组件无条件更新）
      + 必须配合 “不可变值” 一起使用
      + 有性能问题时再考虑使用
    + PureComponent 和 React.memo
      + PureComponent - shouldComponentUpdate中实现了浅比较
      + memo，函数组件中的 PureComponent
      + 浅比较已使用大部分情况（尽量不要做深度比较）
    + 不可变值 immutable.js
      + 彻底拥抱“不可变值”
      + 基于共享数据（不是深拷贝），速度好
      + 需要一定学习成本
  + 高阶组件 HOC：不是一种功能，而是一种模式

    ``` javascript
    const HOCFactory = (Component) => {
      class HOC extends React.Component {
        // 在此定义多个组件的公用逻辑
        render() {
          return <Component {...this.props} /> // 返回拼装的结果
        }
      }
      return HOC
    }
    const EnhancedComponent1 = HOCFactory(WrappedComponent1)
    const EnhancedComponent2 = HOCFactory(WrappedComponent2)
    ```

  + Render Props
+ React 组件如何通讯
+ JSX本质是什么（可对比Vue的模板编译）
+ context是什么，有何用途
+ shouldComponentUpdate的用途
+ 描述redux单项数据流
+ setState是同步还是异步
