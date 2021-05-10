# Vue Router基础

## 基本使用

``` javascript
// router/index.js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 1. 定义（路由）组件，可以从其他文件 import 进来
import routerComponentA from './routerComponentA.vue'
import routerComponentB from './routerComponentB.vue'
// 路由懒加载
const routerComponentC = () => import('./routerComponentC.vue')

// 2. 定义路由
const routes = [
  {
    // 对应当前路由的路径，总是解析为绝对路径
    path: string,
    // 路由组件
    component?: Component,
    // 路由懒加载
    // component：resolve => (require(['需要加载的路由的地址'])，resolve)
    // 命名路由：通过 <router-link> 的 to 属性 或者 router.push 进行路由导航是，可以传递一个对象 { name: '命令路由的名字', params: {} }
    name?: string,
    // 命名视图组件
    // 在界面中可以拥有多个单独命名的视图，而不是只有一个单独的出口。<router-view> 标签未设置名字，默认为 default
    // 一个视图使用一个组件渲染，对于同个路由，多个视图就需要多个组件。
    // <router-view class="view one"></router-view>
    // <router-view class="view two" name="a"></router-view>
    components?: { [name: string]: Component },
    // 重定向路由
    // 如果是 Function，则接受 目标路由 作为参数，return 重定向的 字符串路径/路径对象
    // 注意：导航守卫并没有应用在跳转路由上，而仅仅应用在其目标上。
    redirect?: string | Location | Function,
    props?: boolean | Object | Function,
    // 别名
    // /a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。
    alias?: string | Array<string>,
    // 嵌套路由
    // 注意：以 / 开头的嵌套路径会被当作根路径。
    children?: Array<RouteConfig>,
    // 路由独享守卫
    beforeEnter?: (to: Route, from: Route, next: Function) => void,
    // 路由元信息
    meta?: any,

    // 2.6.0+
    // 匹配规则是否大小写敏感？(默认值：false)
    caseSensitive?: boolean,
    // 编译正则的选项
    pathToRegexpOptions?: Object
  }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
})

export default router

// main.js
import router from './router'
// 4. 创建和挂载根实例
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## 路由模式（mode）

+ hash 模式
  
  使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器。

  实现原理：
  + hash（#）是 URL 的锚点，代表的是网页中的一个位置，单单改变 # 后的部分，浏览器只会加载相应位置的内容，不会重新加载网页。（# 是用来指导浏览器动作的，对服务器端完全无用，HTTP 请求中不包括 #）
  + 每一次改变 # 后的部分，都会在浏览器的访问历史中增加一个记录，使用“后退”按钮，可以回到上一个位置
  + **hash 模式通过锚点值的改变，根据不同的值，渲染指定DOM位置的不同数据。**

  ![vue_router_hash](../files/images/vue_router_hash.png)

  参考：[VueRouter 源码深度解析](https://yuchengkai.cn/blog/2018-07-27.html)
+ HTML5 History 模式

  利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。
  
  ![vue_router_history](../files/images/vue_router_history.png)

  参考：[VueRouter 源码深度解析](https://yuchengkai.cn/blog/2018-07-27.html)

  需要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是 app 依赖的页面。参考：[HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html)

  警告：配置服务器就不再返回 404 错误页面，对所有路径都会返回 `index.html` 文件。
  + 为了避免这种情况，应该在 Vue 应用里面覆盖所有的路由情况，然后给出一个 404 页面。

    ``` javascript
    const router = new VueRouter({
      mode: 'history',
      routes: [
        { path: '*', component: NotFoundComponent }
      ]
    })
    ```
  
  + 如果使用 Node.js 服务器，你可以用服务端路由匹配到来的 URL，并在没有匹配到路由的时候返回 404，以实现回退。更多详情请查阅 [Vue 服务端渲染文档](https://ssr.vuejs.org/zh/)

+ abstract 模式

  支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式。

## 编程式导航

+ `router.push(location, onComplete?, onAbort?)`

  会向 history 栈添加一个新的记录，当用户点击浏览器后退按钮时，则回到之前的 URL。在 Vue 实例内部，可以通过 `$router` 访问路由实例。因此可以调用 `this.$router.push`。

  |          声明式           |       编程式       |
  | :-----------------------: | :----------------: |
  | `<router-link :to="...">` | `router.push(...)` |
  
  ``` javascript
  router.push('home') // 字符串
  router.push({ path: 'home' }) // 对象
  // 命名的路由
  router.push({ name: 'user', params: { userId: '123' }})
  // 带查询参数，变成 /register?plan=private
  router.push({ path: 'register', query: { plan: 'private' }})
  ```

  在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。
  
  在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，`router.push` 或 `router.replace` 将返回一个 Promise。

  + `query`方式传参，其参数拼接在 URL 后，使用 `this.$route.query` 接受参数
  + `params`方式传参，其参数不会显示在地址栏，使用 `this.$route.params` 接受参数

  注意：
  + **如果提供了 `path`，`params` 会被忽略**
  + 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 /users/1 -> /users/2)，需要使用 `beforeRouteUpdate` 来响应这个变化 (比如抓取用户信息)

  同样的规则也适用于 `router-link` 组件的 `to` 属性。

+ `router.replace(location, onComplete?, onAbort?)`

  不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录
  
  |              声明式               |        编程式         |
  | :-------------------------------: | :-------------------: |
  | `<router-link :to="..." replace>` | `router.replace(...)` |

+ `router.go(n)`

  在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`。

  ``` javascript
  router.go(1) // 在浏览器记录中前进一步，等同于 history.forward()
  router.go(-1) // 后退一步记录，等同于 history.back()
  router.go(3) // 前进 3 步记录
  // 如果 history 记录不够用，则失败
  router.go(-100)
  router.go(100)
  ```

## 路由组件传参

``` javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    // 布尔值模式：props 被设置为 true，route.params 将会被设置为组件属性
    { path: '/user/:id', component: User, props: true },

    // 对象模式：props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用
    { path: '/user', component: User, props: { age: 18 } }

    // 函数模式：创建一个函数返回 props。尽可能保持 props 函数为无状态的，因为它只会再路由发生变化时起作用
    {
      path: '/search',
      component: SearchUser,
      props: (route) => ({ query: route.query.q })
    }

    // 对于包含命名视图的路由，必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

## 导航守卫

`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。**参数或查询的改变并不会触发进入/离开的导航守卫。**

守卫是异步解析执行，此时导航在所有守卫 `resolve` 完之前一直处于**等待中**。

每个守卫方法接受是三个参数：

+ `to: Route`： 即将要进入的目标路由对象
+ `from: Route` ：当前导航正要离开的路由
+ `next: Funcion`：一定要调用该方法来 `resolve` 钩子。执行效果依赖 `next` 方法的调用参数。
  + `next()`：进入管道中的下一个钩子。如果全部钩子执行完了，则导航的状态是 **confirmed（确认的）**
  + `next(false)`：中断当前的导航。如果浏览器的 URL 改变了（可能触发了后退按钮），那么 URL 地址会重置到 from 路由对应的地址
  + `next('/')` / `next({ path: '/' })`：跳转到一个不同的地址。
  + `next(error)`：如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调

  **确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。**

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave`(组件内的路由离开守卫) 守卫。
3. 调用全局的 `beforeEach`(全局前置守卫) 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate`(组件内的路由更新守卫) 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`(路由独享的守卫)。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`(组件内的路由进入守卫)。
8. 调用全局的 `beforeResolve`(全局解析守卫) 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach`(全局后置钩子) 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter`(组件内的路由进入守卫) 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 全局守卫

``` javascript
const router = new VueRouter({ ... })
// 全局前置守卫
router.beforeEach((to, from, next) => {})
// 全局解析守卫：同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
router.beforeResolve((to, from, next) => {})
// 全局后置钩子：不会接受 next 函数也不会改变导航本身
router.afterEach((to, from) => {})
```

### 路由独享守卫

``` javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => { //... }
    }
  ]
})
```

### 组件内守卫

``` javascript
const Foo = {
  template: `...`,
  // 组件路由进入守卫
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`，因为当守卫执行前，组件实例还没被创建
    // 可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回到，并且组件实例作为回调方法的参数
    next(vm => {
      // 通过 vm 访问组件实例
    })
  },
  // 组件路由更新守卫
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  // 组件路由离开守卫：通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

## 数据获取

有时候，进入某个路由后，需要从服务器获取数据。可以通过两种方式实现：

+ **导航完成之后获取**：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。

  ``` html
  <template>
    <div class="post">
      <div v-if="loading" class="loading">
        Loading...
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>

      <div v-if="post" class="content">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </template>

  <script>
  export default {
    data () {
      return {
        loading: false,
        post: null,
        error: null
      }
    },
    created () {
      // 组件创建完后获取数据，此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.error = this.post = null
        this.loading = true
        getPost(this.$route.params.id, (err, post) => {
          this.loading = false
          if (err) {
            this.error = err.toString()
          } else {
            this.post = post
          }
        })
      }
    }
  }
  </script>
  ```

+ **导航完成之前获取**：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

  ``` javascript
  export default {
    data () {
      return {
        post: null,
        error: null
      }
    },
    beforeRouteEnter (to, from, next) {
      getPost(to.params.id, (err, post) => {
        next(vm => vm.setData(err, post))
      })
    },
    // 路由改变前，组件就已经渲染完了,逻辑稍稍不同
    beforeRouteUpdate (to, from, next) {
      this.post = null
      getPost(to.params.id, (err, post) => {
        this.setData(err, post)
        next()
      })
    },
    methods: {
      setData (err, post) {
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      }
    }
  }
  ```
