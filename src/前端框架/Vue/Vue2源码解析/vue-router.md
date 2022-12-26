# Vue Router（3.x）

Vue.js 的设计是一个渐进式 JavaScript 框架，核心是解决视图渲染的问题，其他能通过插件的方式进行扩展。Vue Router 就是路由插件。

::: details 使用 Vue Router

```javascript
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>

// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

:::

## 路由注册

### Vue.use 安装插件

Vue.js 提供 `Vue.use` 全局 API 进行安装 Vue.js 插件。

如果插件是一个对象，必须提供 `install` 方法；如果插件是一个函数，它会被作为 `install` 方法。`install` 方法调用时，会将 Vue 作为参数传入。

`Vue.use` 需要在调用 `new Vue()` 之前被调用。当 `install` 方法被同一个插件多次调用，插件将只会被安装一次。

::: details 【Vue.use】方法的实现

```typescript
// src\core\global-api\use.ts

import type { GlobalAPI } from 'types/global-api'
import { toArray, isFunction } from '../util/index'

export function initUse(Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | any) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = [])
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (isFunction(plugin.install)) {
      plugin.install.apply(plugin, args)
    } else if (isFunction(plugin)) {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

:::

在 `Vue.use(plugin: Function | any)` 方法中：

- `Vue.use(plugin: Function | any)` 接受一个 `plugin` 参数，并且通过 `const installedPlugins = this._installedPlugins || (this._installedPlugins = [])` 维护了一个 `this._installedPlugins` 用于存储所有注册过的 `plugin`。
- 接着，会判断 `plugin` 有没有定义 `install` 方法。如果有，则调用该方法，并且该方法执行的第一个参数是 Vue ，这样对于插件的编写方不需要再额外去`import Vue` 了。
- 最后，把 `plugin` 存储到 `installedPlugins` 中。

### VueRouter 路由插件安装

Vue Router 的入口文件是 `src\index.js`，其中定义了 `VueRouter` 类，实现了 `install` 静态方法：`VueRouter.install = install`。`install` 方法定义在 `src\install.js` 模块中。

::: details 【VueRouter install】方法：VueRouter 类定义的 install

```typescript
// src\install.js
import View from './components/view'
import Link from './components/link'

export let _Vue

export function install(Vue) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

  const isDef = v => v !== undefined

  const registerInstance = (vm, callVal) => {
    let i = vm.$options._parentVnode
    if (
      isDef(i) &&
      isDef((i = i.data)) &&
      isDef((i = i.registerRouteInstance))
    ) {
      i(vm, callVal)
    }
  }

  Vue.mixin({
    beforeCreate() {
      if (isDef(this.$options.router)) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
      }
      registerInstance(this, this)
    },
    destroyed() {
      registerInstance(this)
    },
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot._router
    },
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get() {
      return this._routerRoot._route
    },
  })

  Vue.component('RouterView', View)
  Vue.component('RouterLink', Link)

  const strats = Vue.config.optionMergeStrategies
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter =
    strats.beforeRouteLeave =
    strats.beforeRouteUpdate =
      strats.created
}
```

:::

当用户执行 `Vue.use(VueRouter)` 时，实际上是在执行 Vue Router `install` 函数。在 `install` 函数中：

- 首先，为保证 `install` 只执行一次，使用了 `install.installed` 变量做已安装的标志位。
- 接着，使用全局 `_Vue` 接受参数 `Vue`，因为作为 Vue 插件对 `Vue` 对象是由依赖的，但又不能单独 `import Vue`，否则会增加包体积，所以通过这种方式获取到 `Vue` 对象。
- 接着，利用 `Vue.mixin` 将 `beforeCreate` 和 `destroyed` 钩子函数注入到每一个组件中。

  - 在 `beforeCreate` 钩子函数中
    - 对于根 `Vue` 实例而言，执行该钩子函数时
      - 定义 `this._routerRoot` 表示它自身
      - 定义 `this._router` 表示 `VueRouter` 的实例 `router`，它是在 `new Vue` 的时候传入的
      - 执行 `this._router.init()` 方法初始化 `router`
      - 执行 `Vue.util.defineReactive(this, '_route', this._router.history.current)` 将 `this._route` 变成响应式对象
    - 对于子组件而言，由于组件是树状结构，在遍历组件树的过程中，它们在执行该钩子函数的时候 `this._routerRoot` 始终指向的离它最近的传入了 `router` 对象作为配置而实例化的父实例
    - 执行 `registerInstance(this, this)` 方法
  - 在 `destroyed` 钩子函数中，执行 `registerInstance(this)` 方法

  `Vue.mixin` 方法，会把混入的对象通过 `mergeOptions` 合并到 `Vue` 的 `options` 中，由于每个组件的构造函数都会在 `extend` 阶段合并 `Vue.options` 到自身的 `options` 中，相当于每个组件都定义了 `mixin` 定义的选项。

  ::: details 【Vue.mixin】方法的实现

  ```typescript
  // src\core\global-api\mixin.ts

  import type { GlobalAPI } from 'types/global-api'
  import { mergeOptions } from '../util/index'

  export function initMixin(Vue: GlobalAPI) {
    Vue.mixin = function (mixin: Object) {
      this.options = mergeOptions(this.options, mixin)
      return this
    }
  }

  // src\core\util\options.ts

  /**
   * Merge two option objects into a new one.
   * Core utility used in both instantiation and inheritance.
   */
  export function mergeOptions(
    parent: Record<string, any>,
    child: Record<string, any>,
    vm?: Component | null
  ): ComponentOptions {
    if (__DEV__) {
      checkComponents(child)
    }

    if (isFunction(child)) {
      // @ts-expect-error
      child = child.options
    }

    normalizeProps(child, vm)
    normalizeInject(child, vm)
    normalizeDirectives(child)

    // Apply extends and mixins on the child options,
    // but only if it is a raw options object that isn't
    // the result of another mergeOptions call.
    // Only merged options has the _base property.
    if (!child._base) {
      if (child.extends) {
        parent = mergeOptions(parent, child.extends, vm)
      }
      if (child.mixins) {
        for (let i = 0, l = child.mixins.length; i < l; i++) {
          parent = mergeOptions(parent, child.mixins[i], vm)
        }
      }
    }

    const options: ComponentOptions = {} as any
    let key
    for (key in parent) {
      mergeField(key)
    }
    for (key in child) {
      if (!hasOwn(parent, key)) {
        mergeField(key)
      }
    }
    function mergeField(key: any) {
      const strat = strats[key] || defaultStrat
      options[key] = strat(parent[key], child[key], vm, key)
    }
    return options
  }
  ```

  :::

- 接着，给 Vue 原型上定义了 `$router` 和 `$route` 2 个属性的 `get` 方法
- 接着，通过 `Vue.component` 方法定义了全局的 `<router-link>` 和 `<router-view>` 2 个组件
- 最后，定义了路由中的钩子函数的合并策略，和普通的钩子函数一样

## VueRouter 对象

::: details 【VueRouter】类

```typescript
export default class VueRouter {
  static install: () => void
  static version: string
  static isNavigationFailure: Function
  static NavigationFailureType: any
  static START_LOCATION: Route

  app: any
  apps: Array<any>
  ready: boolean
  readyCbs: Array<Function>
  options: RouterOptions
  mode: string
  history: HashHistory | HTML5History | AbstractHistory
  matcher: Matcher
  fallback: boolean
  beforeHooks: Array<?NavigationGuard>
  resolveHooks: Array<?NavigationGuard>
  afterHooks: Array<?AfterNavigationHook>

  constructor(options: RouterOptions = {}) {
    if (process.env.NODE_ENV !== 'production') {
      warn(
        this instanceof VueRouter,
        `Router must be called with the new operator.`
      )
    }
    this.app = null
    this.apps = []
    this.options = options
    this.beforeHooks = []
    this.resolveHooks = []
    this.afterHooks = []
    this.matcher = createMatcher(options.routes || [], this)

    let mode = options.mode || 'hash'
    this.fallback =
      mode === 'history' && !supportsPushState && options.fallback !== false
    if (this.fallback) {
      mode = 'hash'
    }
    if (!inBrowser) {
      mode = 'abstract'
    }
    this.mode = mode

    switch (mode) {
      case 'history':
        this.history = new HTML5History(this, options.base)
        break
      case 'hash':
        this.history = new HashHistory(this, options.base, this.fallback)
        break
      case 'abstract':
        this.history = new AbstractHistory(this, options.base)
        break
      default:
        if (process.env.NODE_ENV !== 'production') {
          assert(false, `invalid mode: ${mode}`)
        }
    }
  }

  match(raw: RawLocation, current?: Route, redirectedFrom?: Location): Route {
    return this.matcher.match(raw, current, redirectedFrom)
  }

  get currentRoute(): ?Route {
    return this.history && this.history.current
  }

  init(app: any /* Vue component instance */) {
    process.env.NODE_ENV !== 'production' &&
      assert(
        install.installed,
        `not installed. Make sure to call \`Vue.use(VueRouter)\` ` +
          `before creating root instance.`
      )

    this.apps.push(app)

    // set up app destroyed handler
    // https://github.com/vuejs/vue-router/issues/2639
    app.$once('hook:destroyed', () => {
      // clean out app from this.apps array once destroyed
      const index = this.apps.indexOf(app)
      if (index > -1) this.apps.splice(index, 1)
      // ensure we still have a main app or null if no apps
      // we do not release the router so it can be reused
      if (this.app === app) this.app = this.apps[0] || null

      if (!this.app) this.history.teardown()
    })

    // main app previously initialized
    // return as we don't need to set up new history listener
    if (this.app) {
      return
    }

    this.app = app

    const history = this.history

    if (history instanceof HTML5History || history instanceof HashHistory) {
      const handleInitialScroll = routeOrError => {
        const from = history.current
        const expectScroll = this.options.scrollBehavior
        const supportsScroll = supportsPushState && expectScroll

        if (supportsScroll && 'fullPath' in routeOrError) {
          handleScroll(this, routeOrError, from, false)
        }
      }
      const setupListeners = routeOrError => {
        history.setupListeners()
        handleInitialScroll(routeOrError)
      }
      history.transitionTo(
        history.getCurrentLocation(),
        setupListeners,
        setupListeners
      )
    }

    history.listen(route => {
      this.apps.forEach(app => {
        app._route = route
      })
    })
  }

  beforeEach(fn: Function): Function {
    return registerHook(this.beforeHooks, fn)
  }

  beforeResolve(fn: Function): Function {
    return registerHook(this.resolveHooks, fn)
  }

  afterEach(fn: Function): Function {
    return registerHook(this.afterHooks, fn)
  }

  onReady(cb: Function, errorCb?: Function) {
    this.history.onReady(cb, errorCb)
  }

  onError(errorCb: Function) {
    this.history.onError(errorCb)
  }

  push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.push(location, resolve, reject)
      })
    } else {
      this.history.push(location, onComplete, onAbort)
    }
  }

  replace(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.replace(location, resolve, reject)
      })
    } else {
      this.history.replace(location, onComplete, onAbort)
    }
  }

  go(n: number) {
    this.history.go(n)
  }

  back() {
    this.go(-1)
  }

  forward() {
    this.go(1)
  }

  getMatchedComponents(to?: RawLocation | Route): Array<any> {
    const route: any = to
      ? to.matched
        ? to
        : this.resolve(to).route
      : this.currentRoute
    if (!route) {
      return []
    }
    return [].concat.apply(
      [],
      route.matched.map(m => {
        return Object.keys(m.components).map(key => {
          return m.components[key]
        })
      })
    )
  }

  resolve(
    to: RawLocation,
    current?: Route,
    append?: boolean
  ): {
    location: Location
    route: Route
    href: string
    // for backwards compat
    normalizedTo: Location
    resolved: Route
  } {
    current = current || this.history.current
    const location = normalizeLocation(to, current, append, this)
    const route = this.match(location, current)
    const fullPath = route.redirectedFrom || route.fullPath
    const base = this.history.base
    const href = createHref(base, fullPath, this.mode)
    return {
      location,
      route,
      href,
      // for backwards compat
      normalizedTo: location,
      resolved: route,
    }
  }

  getRoutes() {
    return this.matcher.getRoutes()
  }

  addRoute(parentOrRoute: string | RouteConfig, route?: RouteConfig) {
    this.matcher.addRoute(parentOrRoute, route)
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation())
    }
  }

  addRoutes(routes: Array<RouteConfig>) {
    if (process.env.NODE_ENV !== 'production') {
      warn(
        false,
        'router.addRoutes() is deprecated and has been removed in Vue Router 4. Use router.addRoute() instead.'
      )
    }
    this.matcher.addRoutes(routes)
    if (this.history.current !== START) {
      this.history.transitionTo(this.history.getCurrentLocation())
    }
  }
}
```

:::

在 `VueRouter` 类的构造函数中

- `this.app` 表示根 `Vue` 实例
- `this.apps` 保存持有 `$options.router` 属性的 `Vue` 实例
- `this.options` 保存传入的路由配置
- `this.beforeHooks`、 `this.resolveHooks`、`this.afterHooks` 表示一些定义的钩子函数
- `this.matcher` 表示路由匹配器
- `this.fallback` 表示在浏览器不支持 `history.pushState` 的情况下，根据传入的 `fallback` 配置参数，决定是否回退到 `hash` 模式
- `this.mode` 表示路由创建的模式
- `this.history` 表示路由历史的具体的实现实例，它是根据 `this.mode` 的不同实现不同，它有 `History` 基类，然后不同的 `history` 实现都是继承 `History`

实例化 `VueRouter` 后，会返回它的实例 `router`，在 `new Vue` 的时候，会把 `router` 作为配置的属性传入。在进行 Vue Router 插件安装的过程中，通过 `Vue.mixin` 将 `beforeCreate` 钩子函数注入到每一个组件中，组件在执行 `beforeCreate` 钩子函数的时候，如果传入了 `router` 实例，都会执行 `router.init` 方法。

在 `router.init` 方法中：

- 接收到传入的参数是 `Vue` 实例，并通过 `this.apps.push(app)` 存储到 `this.apps` 中。只有根 `Vue` 实例会保存到 `this.app` 中。
- 获取到当前的 `this.history`，根据它的不同类型来执行不同逻辑。

  - 首先，定义 `setupListeners` 函数
  - 接着，执行 `history.transitionTo` 方法，其定义在 `History` 基类中。

    `transitionTo` 方法中，会执行 `route = this.router.match(location, this.current)` ，调用 `this.matcher.match` 方法进行匹配。

    `this.matcher` 在 `VueRouter` 类的构造函数中，通过 `this.matcher = createMatcher(options.routes || [], this)` 定义。

    ::: details 【History 基类 transitionTo】方法

    ```typescript
    // src\history\base.js

    export class History {
      // ...

      transitionTo(
        location: RawLocation,
        onComplete?: Function,
        onAbort?: Function
      ) {
        let route
        // catch redirect option https://github.com/vuejs/vue-router/issues/3201
        try {
          route = this.router.match(location, this.current)
        } catch (e) {
          this.errorCbs.forEach(cb => {
            cb(e)
          })
          // Exception should still be thrown
          throw e
        }
        const prev = this.current
        this.confirmTransition(
          route,
          () => {
            this.updateRoute(route)
            onComplete && onComplete(route)
            this.ensureURL()
            this.router.afterHooks.forEach(hook => {
              hook && hook(route, prev)
            })

            // fire ready cbs once
            if (!this.ready) {
              this.ready = true
              this.readyCbs.forEach(cb => {
                cb(route)
              })
            }
          },
          err => {
            if (onAbort) {
              onAbort(err)
            }
            if (err && !this.ready) {
              // Initial redirection should not mark the history as ready yet
              // because it's triggered by the redirection instead
              // https://github.com/vuejs/vue-router/issues/3225
              // https://github.com/vuejs/vue-router/issues/3331
              if (
                !isNavigationFailure(err, NavigationFailureType.redirected) ||
                prev !== START
              ) {
                this.ready = true
                this.readyErrorCbs.forEach(cb => {
                  cb(err)
                })
              }
            }
          }
        )
      }

      // ...
    }
    ```

    :::

## matcher 路由匹配

`matcher` 为路由匹配器，定义在 `src\create-matcher.js` 模块中，通过 `createMatcher` 方法创建。

::: details 【createMatcher】方法：路由匹配器

```typescript
export type Matcher = {
  match: (raw: RawLocation, current?: Route, redirectedFrom?: Location) => Route
  addRoutes: (routes: Array<RouteConfig>) => void
  addRoute: (
    parentNameOrRoute: string | RouteConfig,
    route?: RouteConfig
  ) => void
  getRoutes: () => Array<RouteRecord>
}

export function createMatcher(
  routes: Array<RouteConfig>,
  router: VueRouter
): Matcher {
  const { pathList, pathMap, nameMap } = createRouteMap(routes)

  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap, nameMap)
  }

  function addRoute(parentOrRoute, route) {
    const parent =
      typeof parentOrRoute !== 'object' ? nameMap[parentOrRoute] : undefined
    // $flow-disable-line
    createRouteMap([route || parentOrRoute], pathList, pathMap, nameMap, parent)

    // add aliases of parent
    if (parent && parent.alias.length) {
      createRouteMap(
        // $flow-disable-line route is defined if parent is
        parent.alias.map(alias => ({ path: alias, children: [route] })),
        pathList,
        pathMap,
        nameMap,
        parent
      )
    }
  }

  function getRoutes() {
    return pathList.map(path => pathMap[path])
  }

  function match(
    raw: RawLocation,
    currentRoute?: Route,
    redirectedFrom?: Location
  ): Route {
    const location = normalizeLocation(raw, currentRoute, false, router)
    const { name } = location

    if (name) {
      const record = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        warn(record, `Route with name '${name}' does not exist`)
      }
      if (!record) return _createRoute(null, location)
      const paramNames = record.regex.keys
        .filter(key => !key.optional)
        .map(key => key.name)

      if (typeof location.params !== 'object') {
        location.params = {}
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (const key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key]
          }
        }
      }

      location.path = fillParams(
        record.path,
        location.params,
        `named route "${name}"`
      )
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {}
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const record = pathMap[path]
        if (matchRoute(record.regex, location.path, location.params)) {
          return _createRoute(record, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect(record: RouteRecord, location: Location): Route {
    const originalRedirect = record.redirect
    let redirect =
      typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect

    if (typeof redirect === 'string') {
      redirect = { path: redirect }
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, `invalid redirect option: ${JSON.stringify(redirect)}`)
      }
      return _createRoute(null, location)
    }

    const re: Object = redirect
    const { name, path } = re
    let { query, hash, params } = location
    query = re.hasOwnProperty('query') ? re.query : query
    hash = re.hasOwnProperty('hash') ? re.hash : hash
    params = re.hasOwnProperty('params') ? re.params : params

    if (name) {
      // resolved named direct
      const targetRecord = nameMap[name]
      if (process.env.NODE_ENV !== 'production') {
        assert(
          targetRecord,
          `redirect failed: named route "${name}" not found.`
        )
      }
      return match(
        {
          _normalized: true,
          name,
          query,
          hash,
          params,
        },
        undefined,
        location
      )
    } else if (path) {
      // 1. resolve relative redirect
      const rawPath = resolveRecordPath(path, record)
      // 2. resolve params
      const resolvedPath = fillParams(
        rawPath,
        params,
        `redirect route with path "${rawPath}"`
      )
      // 3. rematch with existing query and hash
      return match(
        {
          _normalized: true,
          path: resolvedPath,
          query,
          hash,
        },
        undefined,
        location
      )
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, `invalid redirect option: ${JSON.stringify(redirect)}`)
      }
      return _createRoute(null, location)
    }
  }

  function alias(
    record: RouteRecord,
    location: Location,
    matchAs: string
  ): Route {
    const aliasedPath = fillParams(
      matchAs,
      location.params,
      `aliased route with path "${matchAs}"`
    )
    const aliasedMatch = match({
      _normalized: true,
      path: aliasedPath,
    })
    if (aliasedMatch) {
      const matched = aliasedMatch.matched
      const aliasedRecord = matched[matched.length - 1]
      location.params = aliasedMatch.params
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute(
    record: ?RouteRecord,
    location: Location,
    redirectedFrom?: Location
  ): Route {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match,
    addRoute,
    getRoutes,
    addRoutes,
  }
}
```

:::

`createMatcher(routes, router)` 方法接收 2 个参数，返回 1 个对象。

- 接收参数
  - `routes` : 用户定义的路由配置
  - `router` : `new VueRouter` 返回的实例
- 返回对象，对外暴露方法为
  - `match`
  - `addRoute` : 添加一条新路由规则。如果该路由规则有 `name`，并且已经存在一个与之相同的名字，则会覆盖它。
  - `getRoutes` : 获取所有活跃的路由记录列表。
  - `addRoutes`

在 `createMatcher(routes, router)` 方法中：

- 首先，执行 `const { pathList, pathMap, nameMap } = createRouteMap(routes)` 创建一个路由映射表，`createRouteMap` 定义在 `src\create-route-map.js` 模块中。

  ::: details 【createRouteMap】方法

  ```typescript
  export function createRouteMap(
    routes: Array<RouteConfig>,
    oldPathList?: Array<string>,
    oldPathMap?: Dictionary<RouteRecord>,
    oldNameMap?: Dictionary<RouteRecord>,
    parentRoute?: RouteRecord
  ): {
    pathList: Array<string>
    pathMap: Dictionary<RouteRecord>
    nameMap: Dictionary<RouteRecord>
  } {
    // the path list is used to control path matching priority
    const pathList: Array<string> = oldPathList || []
    // $flow-disable-line
    const pathMap: Dictionary<RouteRecord> = oldPathMap || Object.create(null)
    // $flow-disable-line
    const nameMap: Dictionary<RouteRecord> = oldNameMap || Object.create(null)

    routes.forEach(route => {
      addRouteRecord(pathList, pathMap, nameMap, route, parentRoute)
    })

    // ensure wildcard routes are always at the end
    for (let i = 0, l = pathList.length; i < l; i++) {
      if (pathList[i] === '*') {
        pathList.push(pathList.splice(i, 1)[0])
        l--
        i--
      }
    }

    if (process.env.NODE_ENV === 'development') {
      // warn if routes do not include leading slashes
      const found = pathList
        // check for missing leading slash
        .filter(
          path => path && path.charAt(0) !== '*' && path.charAt(0) !== '/'
        )

      if (found.length > 0) {
        const pathNames = found.map(path => `- ${path}`).join('\n')
        warn(
          false,
          `Non-nested routes must include a leading slash character. Fix the following routes: \n${pathNames}`
        )
      }
    }

    return {
      pathList,
      pathMap,
      nameMap,
    }
  }
  ```

  :::

  `createRouteMap` 方法是把用户的路由配置转换成一张路由映射表，包括 3 个部分：

  - `pathList` 存储所有的 `path`
  - `pathMap` 表示一个 `path` 到 `RouteRecord` 的映射关系
  - `nameMap` 表示 `name` 到 `RouteRecord` 的映射关系

  在 `createRouteMap` 方法创建路由记录 `RouteRecord` ，是通过遍历 `routes` 为每一个 `route` 执行 `addRouteRecord(pathList, pathMap, nameMap, route, parentRoute)` 方法生成一条记录。

  由于 `pathList`、`pathMap`、`nameMap` 都是引用类型，所以在遍历整个 `routes` 过程中去执行 `addRouteRecord` 方法，会不断给他们添加数据。经过整个 `createRouteMap` 方法的执行，得到的就是 `pathList`、`pathMap` 和 `nameMap`

  ::: details 【addRouteRecord】方法

  ```typescript
  // src\create-route-map.js

  function addRouteRecord(
    pathList: Array<string>,
    pathMap: Dictionary<RouteRecord>,
    nameMap: Dictionary<RouteRecord>,
    route: RouteConfig,
    parent?: RouteRecord,
    matchAs?: string
  ) {
    const { path, name } = route
    if (process.env.NODE_ENV !== 'production') {
      assert(path != null, `"path" is required in a route configuration.`)
      assert(
        typeof route.component !== 'string',
        `route config "component" for path: ${String(
          path || name
        )} cannot be a ` + `string id. Use an actual component instead.`
      )

      warn(
        // eslint-disable-next-line no-control-regex
        !/[^\u0000-\u007F]+/.test(path),
        `Route with path "${path}" contains unencoded characters, make sure ` +
          `your path is correctly encoded before passing it to the router. Use ` +
          `encodeURI to encode static segments of your path.`
      )
    }

    const pathToRegexpOptions: PathToRegexpOptions =
      route.pathToRegexpOptions || {}
    const normalizedPath = normalizePath(
      path,
      parent,
      pathToRegexpOptions.strict
    )

    if (typeof route.caseSensitive === 'boolean') {
      pathToRegexpOptions.sensitive = route.caseSensitive
    }

    const record: RouteRecord = {
      path: normalizedPath,
      regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
      components: route.components || { default: route.component },
      alias: route.alias
        ? typeof route.alias === 'string'
          ? [route.alias]
          : route.alias
        : [],
      instances: {},
      enteredCbs: {},
      name,
      parent,
      matchAs,
      redirect: route.redirect,
      beforeEnter: route.beforeEnter,
      meta: route.meta || {},
      props:
        route.props == null
          ? {}
          : route.components
          ? route.props
          : { default: route.props },
    }

    if (route.children) {
      // Warn if route is named, does not redirect and has a default child route.
      // If users navigate to this route by name, the default child will
      // not be rendered (GH Issue #629)
      if (process.env.NODE_ENV !== 'production') {
        if (
          route.name &&
          !route.redirect &&
          route.children.some(child => /^\/?$/.test(child.path))
        ) {
          warn(
            false,
            `Named Route '${route.name}' has a default child route. ` +
              `When navigating to this named route (:to="{name: '${route.name}'}"), ` +
              `the default child route will not be rendered. Remove the name from ` +
              `this route and use the name of the default child route for named ` +
              `links instead.`
          )
        }
      }
      route.children.forEach(child => {
        const childMatchAs = matchAs
          ? cleanPath(`${matchAs}/${child.path}`)
          : undefined
        addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs)
      })
    }

    if (!pathMap[record.path]) {
      pathList.push(record.path)
      pathMap[record.path] = record
    }

    if (route.alias !== undefined) {
      const aliases = Array.isArray(route.alias) ? route.alias : [route.alias]
      for (let i = 0; i < aliases.length; ++i) {
        const alias = aliases[i]
        if (process.env.NODE_ENV !== 'production' && alias === path) {
          warn(
            false,
            `Found an alias with the same value as the path: "${path}". You have to remove that alias. It will be ignored in development.`
          )
          // skip in dev to make it work
          continue
        }

        const aliasRoute = {
          path: alias,
          children: route.children,
        }
        addRouteRecord(
          pathList,
          pathMap,
          nameMap,
          aliasRoute,
          parent,
          record.path || '/' // matchAs
        )
      }
    }

    if (name) {
      if (!nameMap[name]) {
        nameMap[name] = record
      } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
        warn(
          false,
          `Duplicate named routes definition: ` +
            `{ name: "${name}", path: "${record.path}" }`
        )
      }
    }
  }
  ```

  :::

  在 `addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs)` 方法中：

  - 首先，创建 `RouteRecord`。定义了 `record` 对象变量，其中：

    - `path` 是规范化后的路径，会根据 `parent` 的 `path` 做计算
    - `regex` 是一个正则表达式的扩展，它利用了 `path-to-regexp` 工具库，把 `path` 解析成一个正则表达式的扩展

      ```typescript
      var keys = []
      var re = pathToRegexp('/foo/:bar', keys)
      // re = /^\/foo\/([^\/]+?)\/?$/i
      // keys = [{ name: 'bar', prefix: '/', delimiter: '/', optional: false, repeat: false, pattern: '[^\\/]+?' }]
      ```

    - `components` 是一个对象，在用户配置中的 `component` 实际上会被转换成 `{ components: route.component }`
    - `instances` 表示组件的实例，也是一个对象类型
    - `parent` 表示父的 `RouteRecord`，因为在配置的时，可能会配置子路由，所以整个 `RouteRecord` 也就是一个树型结构

  - 如果配置了 `children`，则递归执行 `addRouteRecord` 方法，并把当前的 `record` 作为 `parent` 传入，通过深度遍历，可以获取到 `route` 下的完整记录。并为 `pathList` 和 `pathMap` 各添加一条记录。

  - 如果配置了 `name`，则给 `nameMap` 添加一条记录。

- 接着，定义了一系列方法，最后返回了一个对象。

## 路由切换

当进行切换路由线路的时候，会执行 `history.transitionTo`，其定义在 `History` 基类中。

::: details 【History 基类】 - 【transitionTo】方法

```typescript
// src\history\base.js

export class History {
  // ...

  transitionTo(
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    let route
    // catch redirect option https://github.com/vuejs/vue-router/issues/3201
    try {
      route = this.router.match(location, this.current)
    } catch (e) {
      this.errorCbs.forEach(cb => {
        cb(e)
      })
      // Exception should still be thrown
      throw e
    }
    const prev = this.current
    this.confirmTransition(
      route,
      () => {
        this.updateRoute(route)
        onComplete && onComplete(route)
        this.ensureURL()
        this.router.afterHooks.forEach(hook => {
          hook && hook(route, prev)
        })

        // fire ready cbs once
        if (!this.ready) {
          this.ready = true
          this.readyCbs.forEach(cb => {
            cb(route)
          })
        }
      },
      err => {
        if (onAbort) {
          onAbort(err)
        }
        if (err && !this.ready) {
          // Initial redirection should not mark the history as ready yet
          // because it's triggered by the redirection instead
          // https://github.com/vuejs/vue-router/issues/3225
          // https://github.com/vuejs/vue-router/issues/3331
          if (
            !isNavigationFailure(err, NavigationFailureType.redirected) ||
            prev !== START
          ) {
            this.ready = true
            this.readyErrorCbs.forEach(cb => {
              cb(err)
            })
          }
        }
      }
    )
  }

  // ...
}
```

:::

在 `transitionTo` 方法中：

- 首先，根据目标 `location` 和当前路径 `this.current` 执行 `this.router.match` 方法去匹配到目标的路径。

  `this.current` 是 `history` 维护的当前路径，它的初始值是在 `history` 的构造函数中初始化的。这样就创建了一个初始的 `Route`，而 `transitionTo` 实际上也就是在切换 `this.current`。

  ```typescript
  // src\util\route.js
  // the starting route that represents the initial state
  export const START = createRoute(null, {
    path: '/',
  })

  // src\history\base.js
  export class History {
    constructor(router: Router, base: ?string) {
      this.current = START
    }
  }
  ```

- 获取到新路径后，执行 `confirmTransition` 方法进行真正的切换，由于这个过程可能有一些异步的操作（如异步组件），所以整个 `confirmTransition` API 设计成带有成功回调函数和失败回调函数。

  - 首先，定义了 `abort` 函数
  - 然后，判断如果满足计算后的 `route` 和 `current` 是相同的路径，则直接调用 `this.ensureURL` 和 `abort`
  - 接着，根据 `current.matched` 和 `route.matched` 执行了 `resolveQueue` 方法解析出 3 个队列。

    `route.matched` 是一个 `RouteRecord` 的数组，由于路径是由 `current` 变向 `route`，则遍历对比两边的 `RouteRecord`，找到一个不一样的位置 `i`

    - `updated` 部分：`next` 中从 `0` 到 `i` 的 `RouteRecord` 是两边都一样，则为 `updated` 部分
    - `activated` 部分：从 `i` 到最后的 `RouteRecord` 是 `next` 独有的，则为 `activated` 部分
    - `deactivated` 部分：`current` 中从 `i` 到最后的 `RouteRecord` 则没有了，则为 `deactivated` 部分

  ::: details 【History 基类】 - 【confirmTransition】方法

  ```typescript
  export class History {
    // ...

    confirmTransition(route: Route, onComplete: Function, onAbort?: Function) {
      const current = this.current
      this.pending = route
      const abort = err => {
        // changed after adding errors with
        // https://github.com/vuejs/vue-router/pull/3047 before that change,
        // redirect and aborted navigation would produce an err == null
        if (!isNavigationFailure(err) && isError(err)) {
          if (this.errorCbs.length) {
            this.errorCbs.forEach(cb => {
              cb(err)
            })
          } else {
            if (process.env.NODE_ENV !== 'production') {
              warn(false, 'uncaught error during route navigation:')
            }
            console.error(err)
          }
        }
        onAbort && onAbort(err)
      }
      const lastRouteIndex = route.matched.length - 1
      const lastCurrentIndex = current.matched.length - 1
      if (
        isSameRoute(route, current) &&
        // in the case the route map has been dynamically appended to
        lastRouteIndex === lastCurrentIndex &&
        route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]
      ) {
        this.ensureURL()
        if (route.hash) {
          handleScroll(this.router, current, route, false)
        }
        return abort(createNavigationDuplicatedError(current, route))
      }

      const { updated, deactivated, activated } = resolveQueue(
        this.current.matched,
        route.matched
      )

      const queue: Array<?NavigationGuard> = [].concat(
        // in-component leave guards
        extractLeaveGuards(deactivated),
        // global before hooks
        this.router.beforeHooks,
        // in-component update hooks
        extractUpdateHooks(updated),
        // in-config enter guards
        activated.map(m => m.beforeEnter),
        // async components
        resolveAsyncComponents(activated)
      )

      const iterator = (hook: NavigationGuard, next) => {
        if (this.pending !== route) {
          return abort(createNavigationCancelledError(current, route))
        }
        try {
          hook(route, current, (to: any) => {
            if (to === false) {
              // next(false) -> abort navigation, ensure current URL
              this.ensureURL(true)
              abort(createNavigationAbortedError(current, route))
            } else if (isError(to)) {
              this.ensureURL(true)
              abort(to)
            } else if (
              typeof to === 'string' ||
              (typeof to === 'object' &&
                (typeof to.path === 'string' || typeof to.name === 'string'))
            ) {
              // next('/') or next({ path: '/' }) -> redirect
              abort(createNavigationRedirectedError(current, route))
              if (typeof to === 'object' && to.replace) {
                this.replace(to)
              } else {
                this.push(to)
              }
            } else {
              // confirm transition and pass on the value
              next(to)
            }
          })
        } catch (e) {
          abort(e)
        }
      }

      runQueue(queue, iterator, () => {
        // wait until async components are resolved before
        // extracting in-component enter guards
        const enterGuards = extractEnterGuards(activated)
        const queue = enterGuards.concat(this.router.resolveHooks)
        runQueue(queue, iterator, () => {
          if (this.pending !== route) {
            return abort(createNavigationCancelledError(current, route))
          }
          this.pending = null
          onComplete(route)
          if (this.router.app) {
            this.router.app.$nextTick(() => {
              handleRouteEntered(route)
            })
          }
        })
      })
    }

    // ...
  }
  ```

  :::

- 最后，获取到 `updated`、`activated`、`deactivated` 3 个 `ReouteRecord` 数组后，执行一系列的钩子函数。

### 导航守卫钩子函数执行逻辑

导航守卫，其实是在路由路径切换的时候，执行的一系列钩子函数。

- 首先，构造一个队列 `queue` ，实际上是一个数组（`NavigationGuard` 类型）

  ::: details 【queue】：定义 queue 队列

  ```typescript
  // src\history\base.js
  export class History {
    // ...

    confirmTransition(route: Route, onComplete: Function, onAbort?: Function) {
      // ...
      const queue: Array<?NavigationGuard> = [].concat(
        // in-component leave guards
        extractLeaveGuards(deactivated),
        // global before hooks
        this.router.beforeHooks,
        // in-component update hooks
        extractUpdateHooks(updated),
        // in-config enter guards
        activated.map(m => m.beforeEnter),
        // async components
        resolveAsyncComponents(activated)
      )
      // ...
    }
  }

  function extractLeaveGuards(
    deactivated: Array<RouteRecord>
  ): Array<?Function> {
    return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
  }

  function extractUpdateHooks(updated: Array<RouteRecord>): Array<?Function> {
    return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
  }

  function extractGuards(
    records: Array<RouteRecord>,
    name: string,
    bind: Function,
    reverse?: boolean
  ): Array<?Function> {
    const guards = flatMapComponents(records, (def, instance, match, key) => {
      const guard = extractGuard(def, name)
      if (guard) {
        return Array.isArray(guard)
          ? guard.map(guard => bind(guard, instance, match, key))
          : bind(guard, instance, match, key)
      }
    })
    return flatten(reverse ? guards.reverse() : guards)
  }
  ```

  :::

- 然后，再定义一个迭代器函数 `iterator`

  在迭代器函数中，会执行每一个导航守卫 `hook`，并传入 `route`、 `current` 和匿名函数，这些参数对应着导航守卫的 `to`、`from`、`next`。当执行了匿名函数，会根据一些条件执行 `abort` 或 `next`，只有执行 `next` 的时候，才会前进到下一个导航守卫钩子函数中。

  ::: details 【iterator】：迭代器函数

  ```typescript
  export class History {
    // ...

    confirmTransition(route: Route, onComplete: Function, onAbort?: Function) {
      // ...

      const iterator = (hook: NavigationGuard, next) => {
        if (this.pending !== route) {
          return abort(createNavigationCancelledError(current, route))
        }
        try {
          hook(route, current, (to: any) => {
            if (to === false) {
              // next(false) -> abort navigation, ensure current URL
              this.ensureURL(true)
              abort(createNavigationAbortedError(current, route))
            } else if (isError(to)) {
              this.ensureURL(true)
              abort(to)
            } else if (
              typeof to === 'string' ||
              (typeof to === 'object' &&
                (typeof to.path === 'string' || typeof to.name === 'string'))
            ) {
              // next('/') or next({ path: '/' }) -> redirect
              abort(createNavigationRedirectedError(current, route))
              if (typeof to === 'object' && to.replace) {
                this.replace(to)
              } else {
                this.push(to)
              }
            } else {
              // confirm transition and pass on the value
              next(to)
            }
          })
        } catch (e) {
          abort(e)
        }
      }

      // ...
    }
  }
  ```

  :::

- 最后，再执行 `runQueue` 方法来执行这个队列。在 `runQueue(queue, fn, cb)` 方法中：

  - 定义了 `step` 函数，每次根据 `index` 从 `queue` 中取一个 `guard`，执行 `fn` 函数（即：迭代器函数 `iterator`）。

    在 `fn` 函数（即：迭代器函数 `iterator`）中：

    - 第一个参数：将 `queue` 中取出的 `guard` 作为参数传入
    - 第二个参数：是一个函数，当这个函数执行的时候，再递归执行 `step` 函数，前进到下一个。

  - 当 `queue` 对立执行完成之后，执行 `cb()`

  ::: details 【runQueue】方法

  ```typescript
  export function runQueue(
    queue: Array<?NavigationGuard>,
    fn: Function,
    cb: Function
  ) {
    const step = index => {
      if (index >= queue.length) {
        cb()
      } else {
        if (queue[index]) {
          fn(queue[index], () => {
            step(index + 1)
          })
        } else {
          step(index + 1)
        }
      }
    }
    step(0)
  }
  ```

  :::

### 导航守卫解析流程

::: details 【queue】：定义 queue 队列

```typescript
// src\history\base.js
export class History {
  // ...

  confirmTransition(route: Route, onComplete: Function, onAbort?: Function) {
    // ...
    const queue: Array<?NavigationGuard> = [].concat(
      // in-component leave guards
      extractLeaveGuards(deactivated),
      // global before hooks
      this.router.beforeHooks,
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      resolveAsyncComponents(activated)
    )
    // ...
  }
}
```

:::

队列执行顺序如下：

- 导航被触发
- 在失活的组件里调用 `beforeRouteLeave` 守卫

  通过执行 `extractLeaveGuards(deactivated)` 方法，调用 `extractGuards` 通用方法，可以从 `RouteRecord` 路由记录数组中提取各个阶段的守卫。

  ::: details 【extractLeaveGuards】方法

  ```typescript
  // src\history\base.js

  function extractLeaveGuards(
    deactivated: Array<RouteRecord>
  ): Array<?Function> {
    return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
  }

  function extractGuards(
    records: Array<RouteRecord>,
    name: string,
    bind: Function,
    reverse?: boolean
  ): Array<?Function> {
    const guards = flatMapComponents(records, (def, instance, match, key) => {
      const guard = extractGuard(def, name)
      if (guard) {
        return Array.isArray(guard)
          ? guard.map(guard => bind(guard, instance, match, key))
          : bind(guard, instance, match, key)
      }
    })
    return flatten(reverse ? guards.reverse() : guards)
  }

  function extractGuard(
    def: Object | Function,
    key: string
  ): NavigationGuard | Array<NavigationGuard> {
    if (typeof def !== 'function') {
      // extend now so that global mixins are applied.
      def = _Vue.extend(def)
    }
    return def.options[key]
  }

  function bindGuard(
    guard: NavigationGuard,
    instance: ?_Vue
  ): ?NavigationGuard {
    if (instance) {
      return function boundRouteGuard() {
        return guard.apply(instance, arguments)
      }
    }
  }

  // src\util\resolve-components.js

  export function flatMapComponents(
    matched: Array<RouteRecord>,
    fn: Function
  ): Array<?Function> {
    return flatten(
      matched.map(m => {
        return Object.keys(m.components).map(key =>
          fn(m.components[key], m.instances[key], m, key)
        )
      })
    )
  }

  export function flatten(arr: Array<any>): Array<any> {
    return Array.prototype.concat.apply([], arr)
  }
  ```

  :::

  在 `extractGuards(records, name, bind, reverse)` 通用方法中：

  - 通过 `flatMapComponents` 方法从 `records` 中获取所有的导航。

    `flatMapComponents` 的作用就是返回一个数组，数组的元素是从 `matched` 里获取到所有组件的 `key`，然后返回 `fn` 函数执行的结果

    `flatten` 作用是把二维数组拍平成一维数组。

  - 调用 `flatMapComponents` 执行每个 `fn` 时，通过 `extractGuard(def, name)` 获取到组件中对应 `name` 的导航守卫。

  - 通过 `extractGuard` 获取到 `guard` 后，调用 `bind` 方法把组件的实例 `instance` 作为函数执行的上下文绑定到 `guard` 上。`bind` 方法的对应的是 `bindGuard`。

- 调用全局的 `beforeEach` 守卫

  当用户使用 `router.beforeEach` 注册了一个全局守卫，就会往 `router.beforeHooks` 添加一个钩子函数。

  `this.router.beforeHooks` 获取的就是用户注册的全局 `beforeEach` 守卫

  ::: details 【VueRouter】类 - 【beforeEach】方法

  ```typescript
  // src\router.js

  export default class VueRouter {
    // ...

    beforeEach(fn: Function): Function {
      return registerHook(this.beforeHooks, fn)
    }

    // ...
  }

  function registerHook(list: Array<any>, fn: Function): Function {
    list.push(fn)
    return () => {
      const i = list.indexOf(fn)
      if (i > -1) list.splice(i, 1)
    }
  }
  ```

  :::

- 在重用的组件里调用 `beforeRouteUpdate` 守卫

  与 `extractLeaveGuards(deactivated)` 类似。通过执行 `extractUpdateHooks(updated)` 方法，调用 `extractGuards` 通用方法，可以从 `RouteRecord` 路由记录数组中，获取到所有重用的组件中定义的 `beforeRouteUpdate` 钩子函数。

- 在激活的路由配置里调用 `beforeEnter` 守卫

  执行 `activated.map(m => m.beforeEnter)`，获取的是在激活的路由配置中定义的 `beforeEnter` 函数。

- 解析异步路由组件

  执行 `resolveAsyncComponents(activated)` 解析异步组件。

  `resolveAsyncComponents(matched)` 方法，返回的是一个导航守卫函数，有标准的 `to`、`from`、`next` 参数。

  该方法利用了 `flatMapComponents` 方法从 `matched` 中获取到每个组件的定义，判断如果是异步组件，则执行异步组件加载逻辑，加载成功后会执行 `match.components[key] = resolvedDef` 把解析好的异步组件放到对应的 `components` 上，并且执行 `next` 函数。

  ::: details 【resolveAsyncComponents】方法

  ```typescript
  export function resolveAsyncComponents(
    matched: Array<RouteRecord>
  ): Function {
    return (to, from, next) => {
      let hasAsync = false
      let pending = 0
      let error = null

      flatMapComponents(matched, (def, _, match, key) => {
        // if it's a function and doesn't have cid attached,
        // assume it's an async component resolve function.
        // we are not using Vue's default async resolving mechanism because
        // we want to halt the navigation until the incoming component has been
        // resolved.
        if (typeof def === 'function' && def.cid === undefined) {
          hasAsync = true
          pending++

          const resolve = once(resolvedDef => {
            if (isESModule(resolvedDef)) {
              resolvedDef = resolvedDef.default
            }
            // save resolved on async factory in case it's used elsewhere
            def.resolved =
              typeof resolvedDef === 'function'
                ? resolvedDef
                : _Vue.extend(resolvedDef)
            match.components[key] = resolvedDef
            pending--
            if (pending <= 0) {
              next()
            }
          })

          const reject = once(reason => {
            const msg = `Failed to resolve async component ${key}: ${reason}`
            process.env.NODE_ENV !== 'production' && warn(false, msg)
            if (!error) {
              error = isError(reason) ? reason : new Error(msg)
              next(error)
            }
          })

          let res
          try {
            res = def(resolve, reject)
          } catch (e) {
            reject(e)
          }
          if (res) {
            if (typeof res.then === 'function') {
              res.then(resolve, reject)
            } else {
              // new syntax in Vue 2.3
              const comp = res.component
              if (comp && typeof comp.then === 'function') {
                comp.then(resolve, reject)
              }
            }
          }
        }
      })

      if (!hasAsync) next()
    }
  }
  ```

  :::

- 在被激活的组件里调用 `beforeRouteEnter`

  `runQueue` 执行完成 `queue` 队列之后，在回调函数中，执行 `const enterGuards = extractEnterGuards(activated)`。通过利用 `extractGuards` 方法提取组件中的 `beforeRouteEnter` 导航钩子函数。

  ::: details 【extractEnterGuards】方法

  ```typescript
  // src\history\base.js

  function extractEnterGuards(activated: Array<RouteRecord>): Array<?Function> {
    return extractGuards(
      activated,
      'beforeRouteEnter',
      (guard, _, match, key) => {
        return bindEnterGuard(guard, match, key)
      }
    )
  }

  function bindEnterGuard(
    guard: NavigationGuard,
    match: RouteRecord,
    key: string
  ): NavigationGuard {
    return function routeEnterGuard(to, from, next) {
      return guard(to, from, cb => {
        if (typeof cb === 'function') {
          if (!match.enteredCbs[key]) {
            match.enteredCbs[key] = []
          }
          match.enteredCbs[key].push(cb)
        }
        next(cb)
      })
    }
  }
  ```

  :::

  在 `beforeRouteEnter` 钩子函数中，是获取不到组件实例的，因为当守卫执行前，组件实例还没被创建，但是可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

  ```typescript
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  }
  ```

- 调用全局的 `beforeResolve` 守卫

  当用户使用 `router.beforeResolve` 注册了一个全局守卫，就会往 `router.resolveHooks` 添加一个钩子函数。

  `this.router.resolveHooks` 获取的就是用户注册的全局 `beforeResolve` 守卫

- 导航被确认
- 调用全局的 `afterEach` 钩子

  在 `runQueue` 中，会执行 `onComplete(route)` 回调函数。

  当用户使用 `router.afterEach` 注册了一个全局守卫，就会往 `router.afterHooks` 添加一个钩子函数。

  `this.router.afterHooks` 获取的就是用户注册的全局 `afterHooks` 守卫。

  ::: details

  ```typescript
  this.confirmTransition(
    route,
    // onComplete(route)
    () => {
      this.updateRoute(route)
      onComplete && onComplete(route)
      this.ensureURL()
      this.router.afterHooks.forEach(hook => {
        hook && hook(route, prev)
      })

      // fire ready cbs once
      if (!this.ready) {
        this.ready = true
        this.readyCbs.forEach(cb => {
          cb(route)
        })
      }
    },
    err => {
      if (onAbort) {
        onAbort(err)
      }
      if (err && !this.ready) {
        // Initial redirection should not mark the history as ready yet
        // because it's triggered by the redirection instead
        // https://github.com/vuejs/vue-router/issues/3225
        // https://github.com/vuejs/vue-router/issues/3331
        if (
          !isNavigationFailure(err, NavigationFailureType.redirected) ||
          prev !== START
        ) {
          this.ready = true
          this.readyErrorCbs.forEach(cb => {
            cb(err)
          })
        }
      }
    }
  )
  ```

  :::

- 触发 DOM 更新
- 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入

### URL 路由切换

当点击 `router-link` 时，最终会执行 `router.push` 方法，调动 `this.history.push` 方法。

::: details 【VueRouter】类 - 【push】方法

```typescript
export default class VueRouter {
  // ...

  push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    // $flow-disable-line
    if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
      return new Promise((resolve, reject) => {
        this.history.push(location, resolve, reject)
      })
    } else {
      this.history.push(location, onComplete, onAbort)
    }
  }

  // ...
}
```

:::

对于 `this.history.push` 方法，是子类实现的，不同模式下该函数实现会有不同。

`hash` 模式下，`push` 方法会先执行 `this.transitionTo` 进行路径切换，在切换完成的回调函数中，执行 `pushHash` 方法。

在 `pushHash` 方法中，会通过 `supportsPushState` 判断是否支持，如果支持，则获取当前完整的 `url`，执行 `pushState` 方法。

::: details 【HashHistory】类 - 【push】方法

```typescript
// src\history\hash.js

export class HashHistory extends History {
  // ...

  push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
    const { current: fromRoute } = this
    this.transitionTo(
      location,
      route => {
        pushHash(route.fullPath)
        handleScroll(this.router, route, fromRoute, false)
        onComplete && onComplete(route)
      },
      onAbort
    )
  }

  // ...
}

function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path))
  } else {
    window.location.hash = path
  }
}

// src\util\push-state.js

export const supportsPushState =
  inBrowser &&
  (function () {
    const ua = window.navigator.userAgent

    if (
      (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1
    ) {
      return false
    }

    return window.history && typeof window.history.pushState === 'function'
  })()
```

:::

在 `pushState` 方法中，会调用浏览器原生的 `history` 的 `pushState` 接口或者 `replaceState` 接口，更新浏览器的 `url` 地址，并把当前 `url` 压入历史栈中。

::: details 【pushState】方法

```typescript
// src\util\push-state.js

export function pushState(url?: string, replace?: boolean) {
  saveScrollPosition()
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  const history = window.history
  try {
    if (replace) {
      // preserve existing history state as it could be overriden by the user
      const stateCopy = extend({}, history.state)
      stateCopy.key = getStateKey()
      history.replaceState(stateCopy, '', url)
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, '', url)
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url)
  }
}
```

:::

在 `history` 的初始化中，会设置一个监听器，监听历史栈的变化。当点击浏览器返回按钮的时候，如果已经有 `url` 被压入历史栈，则会触发 `popstate` 事件，然后拿到当前要跳转的 `hash`，执行 `transtionTo` 方法做一次路径转换。

::: details 【HashHistory】类 - 【setupListeners】方法

```typescript
// src\history\hash.js

export class HashHistory extends History {
  // ...

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  setupListeners() {
    if (this.listeners.length > 0) {
      return
    }

    const router = this.router
    const expectScroll = router.options.scrollBehavior
    const supportsScroll = supportsPushState && expectScroll

    if (supportsScroll) {
      this.listeners.push(setupScroll())
    }

    const handleRoutingEvent = () => {
      const current = this.current
      if (!ensureSlash()) {
        return
      }
      this.transitionTo(getHash(), route => {
        if (supportsScroll) {
          handleScroll(this.router, route, current, true)
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath)
        }
      })
    }
    const eventType = supportsPushState ? 'popstate' : 'hashchange'
    window.addEventListener(eventType, handleRoutingEvent)
    this.listeners.push(() => {
      window.removeEventListener(eventType, handleRoutingEvent)
    })
  }

  // ...
}
```

:::

当在浏览器中输入 `http://localhost:8080` 后会自动把 url 修改为 `http://localhost:8080/#/`。主要原因是因为在实例化 `HashHistory` 的时候，构造函数会执行 `ensureSlash()` 方法。

- 首先，判断 `path` 为空，则执行 `replaceHash('/' + path)`
- 然后，内部会执行一次 `getUrl`，计算出来的新的 `url` 为 `http://localhost:8080/#/`
- 最终，会执行 `pushState(url, true)`，这就是 url 会改变的原因

::: details 【ensureSlash】方法

```typescript
// src\history\hash.js

function ensureSlash(): boolean {
  const path = getHash()
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path)
  return false
}

export function getHash(): string {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  let href = window.location.href
  const index = href.indexOf('#')
  // empty path
  if (index < 0) return ''

  href = href.slice(index + 1)

  return href
}

function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path))
  } else {
    window.location.replace(getUrl(path))
  }
}

function getUrl(path) {
  const href = window.location.href
  const i = href.indexOf('#')
  const base = i >= 0 ? href.slice(0, i) : href
  return `${base}#${path}`
}

// src\util\push-state.js

export function replaceState(url?: string) {
  pushState(url, true)
}
```

:::

### router-view 组件路由切换

Vue Router 内置 `<router-view>` 组件。

::: details Vue Router 内置组件 router-view

```typescript
export default {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default',
    },
  },
  render(_, { props, children, parent, data }) {
    // used by devtools to display a router-view badge
    data.routerView = true

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    const h = parent.$createElement
    const name = props.name
    const route = parent.$route
    const cache = parent._routerViewCache || (parent._routerViewCache = {})

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    let depth = 0
    let inactive = false
    while (parent && parent._routerRoot !== parent) {
      const vnodeData = parent.$vnode ? parent.$vnode.data : {}
      if (vnodeData.routerView) {
        depth++
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true
      }
      parent = parent.$parent
    }
    data.routerViewDepth = depth

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      const cachedData = cache[name]
      const cachedComponent = cachedData && cachedData.component
      if (cachedComponent) {
        // #2301
        // pass props
        if (cachedData.configProps) {
          fillPropsinData(
            cachedComponent,
            data,
            cachedData.route,
            cachedData.configProps
          )
        }
        return h(cachedComponent, data, children)
      } else {
        // render previous empty view
        return h()
      }
    }

    const matched = route.matched[depth]
    const component = matched && matched.components[name]

    // render empty node if no matched route or no config component
    if (!matched || !component) {
      cache[name] = null
      return h()
    }

    // cache component
    cache[name] = { component }

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = (vm, val) => {
      // val could be undefined for unregistration
      const current = matched.instances[name]
      if ((val && current !== vm) || (!val && current === vm)) {
        matched.instances[name] = val
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = (_, vnode) => {
      matched.instances[name] = vnode.componentInstance
    }

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = vnode => {
      if (
        vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance
      }

      // if the route transition has already been confirmed then we weren't
      // able to call the cbs during confirmation as the component was not
      // registered yet, so we call it here.
      handleRouteEntered(route)
    }

    const configProps = matched.props && matched.props[name]
    // save route and configProps in cache
    if (configProps) {
      extend(cache[name], {
        route,
        configProps,
      })
      fillPropsinData(component, data, route, configProps)
    }

    return h(component, data, children)
  },
}
```

:::

`<router-view>` 是一个 `functional` 组件，其渲染是依赖于 `render` 函数。

在 `render`函数中：

- 首先，获取当前的路径 `const route = parent.$route`

  在 Vue Router 插件 `install` 函数中，给 Vue 的原型上定义了 `$route`

  ```typescript
  // src\install.js
  export function install(Vue) {
    // ...
    Object.defineProperty(Vue.prototype, '$route', {
      get() {
        return this._routerRoot._route
      },
    })
    // ...
  }
  ```

  然后，在 VueRouter 的实例执行 `router.init` 方法时，会执行 `history.listen`。并在 `updateRoute` 时执行 `this.cb`。

  - 执行 `transitionTo` 方法，最后执行 `updateRoute` 的时候会执行回调
  - 然后，会更新 `this.apps` 保存的组件实例的 `_route` 值
    - `this.apps` 数组保存的实例的特点都是在初始化的时候传入了 `router` 配置项，一般的场景数组只会保存根 `Vue` 实例，因为是在 `new Vue` 传入了 `router` 实例。
    - `$route` 是定义在 `Vue.prototype` 上。每个组件实例访问 `$route` 属性，就是访问根实例的 `_route`，也就是当前的路由线路。

  ```typescript
  // src\router.js
  export default class VueRouter {
    // ...
    init(app: any /* Vue component instance */) {
      history.listen(route => {
        this.apps.forEach(app => {
          app._route = route
        })
      })
    }
  }

  // src\history\base.js
  export class History {
    // ...
    listen(cb: Function) {
      this.cb = cb
    }

    updateRoute(route: Route) {
      this.current = route
      this.cb && this.cb(route)
    }
  }
  ```

- `render` 函数中，定义了 `depth`，表示 `<router-view>` 嵌套的深度，因为 `<router-view>` 是支持嵌套的。每个 `<router-view>` 在渲染时，执行逻辑如下：

  - 通过执行 `while (parent && parent._routerRoot !== parent)` 循环，从当前的 `<router-view>` 的父节点向上找，一直找到根 Vue 实例。
  - 在循环过程中，如果碰到父节点也是 `<router-view>` 时候，说明 `<router-view>` 嵌套，`depth++`
  - 循环遍历完成之后，根据当前线路匹配的路径和 `depth` 找到对应的 `RouteRecord`，进而找到该渲染的组件。

- `render` 函数中，还定义了一个注册路由实例的方法 `data.registerRouteInstance`

  给 `vnode` 的 `data` 定义了 `registerRouteInstance` 方法，在 Vue Router 插件 `install` 函数中，会调用该方法去注册路由的实例。

  在混入的 `beforeCreate` 钩子函数中，会执行 `registerInstance` 方法，进而执行 `render` 函数中定义的 `registerRouteInstance` 方法，从而给 `matched.instances[name]` 赋值当前组件的 `vm` 实例。

  ```typescript
  // src\install.js
  export function install(Vue) {
    // ...
    const registerInstance = (vm, callVal) => {
      let i = vm.$options._parentVnode
      if (
        isDef(i) &&
        isDef((i = i.data)) &&
        isDef((i = i.registerRouteInstance))
      ) {
        i(vm, callVal)
      }
    }

    Vue.mixin({
      beforeCreate() {
        // ...
        registerInstance(this, this)
      },
      destroyed() {
        registerInstance(this)
      },
    })
    // ...
  }
  ```

- `render` 函数最后通过 `return h(component, data, children)`，根据 `component` 渲染出对应的组件 `vnode`

当执行 `transitionTo` 来更改路由线路后，组件重新渲染逻辑如下：

- Vue Router 插件 `install` 函数中，在通过 `Vue.mixin` 混入的 `beforeCreate` 钩子函数中，会执行 `Vue.util.defineReactive(this, '_route', this._router.history.current)` 将根 `Vue` 实例的 `_route` 属性定义成响应式
- 在每个 `<router-view>` 执行 `render` 函数的时候，都会访问 `parent.$route`，触发了它的 `getter`
- 在执行完 `transitionTo` 后，修改 `app._route` 的时候，又触发了 `setter`
- 因此，会通知 `<router-view>` 的渲染 `watcher` 更新，重新渲染组件。

### router-link 组件路由切换

`<router-link>` 组件支持用户在具有路由功能的应用中（点击）导航。 通过 `to` 属性指定目标地址，默认渲染成带有正确链接的 `<a>` 标签，可以通过配置 `tag` 属性生成其他的标签。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 `CSS` 类名。

`<router-link>` 比起写死的 `<a href="...">` 会好一些，理由如下：

- 无论是 HTML5 `history` 模式还是 `hash` 模式，它的表现行为一致，所以，当要切换路由模式，或者在 IE9 降级使用 `hash` 模式，无须作任何变动。
- 在 HTML5 `history` 模式下，`router-link` 会守卫点击事件，让浏览器不再重新加载页面。
- 在 HTML5 `history` 模式下使用 `base` 选项之后，所有的 `to` 属性都不需要写（基路径）了。

::: details Vue Router 内置组件 router-link

```typescript
export default {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true,
    },
    tag: {
      type: String,
      default: 'a',
    },
    custom: Boolean,
    exact: Boolean,
    exactPath: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: {
      type: String,
      default: 'page',
    },
    event: {
      type: eventTypes,
      default: 'click',
    },
  },
  render(h: Function) {
    const router = this.$router
    const current = this.$route
    const { location, route, href } = router.resolve(
      this.to,
      current,
      this.append
    )

    const classes = {}
    const globalActiveClass = router.options.linkActiveClass
    const globalExactActiveClass = router.options.linkExactActiveClass
    // Support global empty active class
    const activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass
    const exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass
    const activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass
    const exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass

    const compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route

    classes[exactActiveClass] = isSameRoute(
      current,
      compareTarget,
      this.exactPath
    )
    classes[activeClass] =
      this.exact || this.exactPath
        ? classes[exactActiveClass]
        : isIncludedRoute(current, compareTarget)

    const ariaCurrentValue = classes[exactActiveClass]
      ? this.ariaCurrentValue
      : null

    const handler = e => {
      if (guardEvent(e)) {
        if (this.replace) {
          router.replace(location, noop)
        } else {
          router.push(location, noop)
        }
      }
    }

    const on = { click: guardEvent }
    if (Array.isArray(this.event)) {
      this.event.forEach(e => {
        on[e] = handler
      })
    } else {
      on[this.event] = handler
    }

    const data: any = { class: classes }

    const scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href,
        route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass],
      })

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on
      data.attrs = { href, 'aria-current': ariaCurrentValue }
    } else {
      // find the first <a> child and apply listener and href
      const a = findAnchor(this.$slots.default)
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false
        const aData = (a.data = extend({}, a.data))
        aData.on = aData.on || {}
        // transform existing events in both objects into arrays so we can push later
        for (const event in aData.on) {
          const handler = aData.on[event]
          if (event in on) {
            aData.on[event] = Array.isArray(handler) ? handler : [handler]
          }
        }
        // append new listeners for router-link
        for (const event in on) {
          if (event in aData.on) {
            // on[event] is always a function
            aData.on[event].push(on[event])
          } else {
            aData.on[event] = handler
          }
        }

        const aAttrs = (a.data.attrs = extend({}, a.data.attrs))
        aAttrs.href = href
        aAttrs['aria-current'] = ariaCurrentValue
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on
      }
    }

    return h(this.tag, data, this.$slots.default)
  },
}
```

:::

`<router-link>` 标签的渲染也是基于 `render` 函数

- 首先，通过 `router.resolve` 进行路由解析

  ```typescript
  const router = this.$router
  const current = this.$route
  const { location, route, href } = router.resolve(
    this.to,
    current,
    this.append
  )
  ```

  `router.resolve` 是 `VueRouter` 的实例方法。

  - 首先规范生成目标 `location`
  - 再根据 `location` 和 `match` 通过 `this.match` 方法计算生成目标路径 `route`，
  - 然后，再根据 `base`、`fullPath` 和 `this.mode` 通过 `createHref` 方法计算出最终跳转的 `href`。

  ::: details 【VueRouter】类 - 【resolve】方法

  ```typescript
  // src\router.js
  export default class VueRouter {
    // ...
    resolve(
      to: RawLocation,
      current?: Route,
      append?: boolean
    ): {
      location: Location
      route: Route
      href: string
      // for backwards compat
      normalizedTo: Location
      resolved: Route
    } {
      current = current || this.history.current
      const location = normalizeLocation(to, current, append, this)
      const route = this.match(location, current)
      const fullPath = route.redirectedFrom || route.fullPath
      const base = this.history.base
      const href = createHref(base, fullPath, this.mode)
      return {
        location,
        route,
        href,
        // for backwards compat
        normalizedTo: location,
        resolved: route,
      }
    }
  }

  function createHref(base: string, fullPath: string, mode) {
    var path = mode === 'hash' ? '#' + fullPath : fullPath
    return base ? cleanPath(base + '/' + path) : path
  }
  ```

  :::

- 解析完 `router` 获得目标 `location`、`route`、`href` 后，对 `exactActiveClass` 和 `activeClass` 做处理。当配置 `exact` 为 `true` 时，只有当目标路径和当前路径完全匹配的时候，会添加 `exactActiveClass`；当目标路径包含当前路径的时候，会添加 `activeClass`。
- 接着，创建一个守卫函数 `handler`
- 然后，会监听点击事件或者其它可以通过 `prop` 传入的事件类型，执行 `hanlder` 函数，最终执行 `router.push` 或者 `router.replace` 函数，实际上执行了 `history` 的 `push` 和 `replace` 方法进行路由跳转

  ::: details router.push 和 router.replace 函数

  ```typescript
  // src\router.js

  export default class VueRouter {
    // ...

    push(location: RawLocation, onComplete?: Function, onAbort?: Function) {
      // $flow-disable-line
      if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
          this.history.push(location, resolve, reject)
        })
      } else {
        this.history.push(location, onComplete, onAbort)
      }
    }

    replace(location: RawLocation, onComplete?: Function, onAbort?: Function) {
      // $flow-disable-line
      if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
          this.history.replace(location, resolve, reject)
        })
      } else {
        this.history.replace(location, onComplete, onAbort)
      }
    }
  }
  ```

  :::

- 最后，判断当前 `tag` 是否是 `<a>` 标签，`<router-link>` 默认会渲染成 `<a>` 标签，也可以通过修改 `tag` 的 `prop` 渲染成其他节点，该情况下，会尝试找它子元素的 `<a>` 标签，如果有，则把事件绑定到 `<a>` 标签上并添加 `href` 属性，否则绑定到外层元素本身。

### 总结

`transitionTo` 路径切换是路由中最重要的功能：

- 路由始终会维护当前的线路
- 路由切换的时候，会把当前线路切换到目标线路
- 路由切换过程中，会执行一系列的导航守卫钩子函数，会更改 url，同样也会渲染对应的组件
- 路由切换完毕后，会把目标线路更新替换当前线路，这样就会作为下一次的路径切换的依据。
