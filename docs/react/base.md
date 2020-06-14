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

+ React 组件如何通讯
+ JSX本质是什么（可对比Vue的模板编译）
+ context是什么，有何用途
+ shouldComponentUpdate的用途
+ 描述redux单项数据流
+ setState是同步还是异步
