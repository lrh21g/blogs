# Vuex（3.x）

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex 应用的核心就是 `store`（仓库）。`store` 基本上就是一个容器，它包含着应用中大部分的状态 (`state`)。Vuex 和单纯的全局对象有以下两点不同：

- Vuex 的状态存储是响应式的。当 Vue 组件从 `store` 中读取状态的时候，若 `store` 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 不能直接改变 `store` 中的状态。改变 `store` 中的状态的唯一途径就是显式地提交 `(commit) mutation`。这样可以方便地跟踪每一个状态的变化，从而让能够实现一些工具帮助更好地了解应用。

## Vuex 初始化

### Vuex 插件安装

Vuex 的入口文件是 `src\index.js`，通过 `import Vuex from 'vuex'` 引入 Vuex 时，实际上是引用了一个对象。

::: details Vuex 入口文件

```typescript
// src\index.js

import { Store, install } from './store'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
} from './helpers'
import createLogger from './plugins/logger'

export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
  createLogger,
}
```

:::

当用户执行 `Vue.use(Vuex)` 时，实际上是在执行 Vuex 的 `install` 函数。在 `install(_Vue)` 函数中，会将传入的 `_Vue` 复制给 `Vue` 变量，并执行引入的 `applyMixin(Vue)` 方法，其定义在 `src\mixin.js` 模块中。

::: details 【Vuex install】方法

```typescript
// src\store.js

import applyMixin from './mixin'

let Vue // bind on install

// ...

export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```

:::

在 Vuex `install` 函数中，执行的 `applyMixin` 方法是 `src\mixin.js` 模块导出的方法。在该方法中，如果 Vue 为 2.x 的版本，通过 `Vue.mixin` 全局混入一个 `beforeCreate` 钩子函数。

全局混入的 `beforeCreate` 钩子函数，通过把 `options.store` 保存在所有组件的 `this.$store` 中，`options.store` 是在实例化 `Store` 对象的实例。

::: details 【Vuex mixin】模块

```typescript
// src\mixin.js

export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit() {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store =
        typeof options.store === 'function' ? options.store() : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

:::

### Store 实例化

在 `import Vuex from 'vuex'` 之后，会实例化其中的 `Store` 对象，返回 `store` 实例并传入 `new Vue` 的 `options` 中（即：`options.store`）。

`Store` 对象的构造函数接收一个对象参数，它包含 `actions`、`getters`、`state`、`mutations`、`modules` 等 Vuex 的核心概念。

`Store` 的实例化过程可拆成为 3 个部分，分别是初始化模块，安装模块和初始化 `store._vm`。

::: details 【Store】类

```typescript
export class Store {
  constructor(options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    if (__DEV__) {
      assert(Vue, `must call Vue.use(Vuex) before creating a store instance.`)
      assert(
        typeof Promise !== 'undefined',
        `vuex requires a Promise polyfill in this browser.`
      )
      assert(
        this instanceof Store,
        `store must be called with the new operator.`
      )
    }

    const { plugins = [], strict = false } = options

    // store internal state
    this._committing = false
    this._actions = Object.create(null)
    this._actionSubscribers = []
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()
    this._makeLocalGettersCache = Object.create(null)

    // bind commit and dispatch to self
    const store = this
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    // strict mode
    this.strict = strict

    const state = this._modules.root.state

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVM(this, state)

    // apply plugins
    plugins.forEach(plugin => plugin(this))

    const useDevtools =
      options.devtools !== undefined ? options.devtools : Vue.config.devtools
    if (useDevtools) {
      devtoolPlugin(this)
    }
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    if (__DEV__) {
      assert(false, `use store.replaceState() to explicit replace store state.`)
    }
  }

  commit(_type, _payload, _options) {
    // check object-style commit
    const { type, payload, options } = unifyObjectStyle(
      _type,
      _payload,
      _options
    )

    const mutation = { type, payload }
    const entry = this._mutations[type]
    if (!entry) {
      if (__DEV__) {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }
    this._withCommit(() => {
      entry.forEach(function commitIterator(handler) {
        handler(payload)
      })
    })

    this._subscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .forEach(sub => sub(mutation, this.state))

    if (__DEV__ && options && options.silent) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
          'Use the filter functionality in the vue-devtools'
      )
    }
  }

  dispatch(_type, _payload) {
    // check object-style dispatch
    const { type, payload } = unifyObjectStyle(_type, _payload)

    const action = { type, payload }
    const entry = this._actions[type]
    if (!entry) {
      if (__DEV__) {
        console.error(`[vuex] unknown action type: ${type}`)
      }
      return
    }

    try {
      this._actionSubscribers
        .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
        .filter(sub => sub.before)
        .forEach(sub => sub.before(action, this.state))
    } catch (e) {
      if (__DEV__) {
        console.warn(`[vuex] error in before action subscribers: `)
        console.error(e)
      }
    }

    const result =
      entry.length > 1
        ? Promise.all(entry.map(handler => handler(payload)))
        : entry[0](payload)

    return new Promise((resolve, reject) => {
      result.then(
        res => {
          try {
            this._actionSubscribers
              .filter(sub => sub.after)
              .forEach(sub => sub.after(action, this.state))
          } catch (e) {
            if (__DEV__) {
              console.warn(`[vuex] error in after action subscribers: `)
              console.error(e)
            }
          }
          resolve(res)
        },
        error => {
          try {
            this._actionSubscribers
              .filter(sub => sub.error)
              .forEach(sub => sub.error(action, this.state, error))
          } catch (e) {
            if (__DEV__) {
              console.warn(`[vuex] error in error action subscribers: `)
              console.error(e)
            }
          }
          reject(error)
        }
      )
    })
  }

  subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options)
  }

  subscribeAction(fn, options) {
    const subs = typeof fn === 'function' ? { before: fn } : fn
    return genericSubscribe(subs, this._actionSubscribers, options)
  }

  watch(getter, cb, options) {
    if (__DEV__) {
      assert(
        typeof getter === 'function',
        `store.watch only accepts a function.`
      )
    }
    return this._watcherVM.$watch(
      () => getter(this.state, this.getters),
      cb,
      options
    )
  }

  replaceState(state) {
    this._withCommit(() => {
      this._vm._data.$$state = state
    })
  }

  registerModule(path, rawModule, options = {}) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
      assert(
        path.length > 0,
        'cannot register the root module by using registerModule.'
      )
    }

    this._modules.register(path, rawModule)
    installModule(
      this,
      this.state,
      path,
      this._modules.get(path),
      options.preserveState
    )
    // reset store to update getters...
    resetStoreVM(this, this.state)
  }

  unregisterModule(path) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
    }

    this._modules.unregister(path)
    this._withCommit(() => {
      const parentState = getNestedState(this.state, path.slice(0, -1))
      Vue.delete(parentState, path[path.length - 1])
    })
    resetStore(this)
  }

  hasModule(path) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
    }

    return this._modules.isRegistered(path)
  }

  hotUpdate(newOptions) {
    this._modules.update(newOptions)
    resetStore(this, true)
  }

  _withCommit(fn) {
    const committing = this._committing
    this._committing = true
    fn()
    this._committing = committing
  }
}
```

:::

#### 初始化模块

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，`store` 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 `store` 分割成模块（module）。每个模块拥有自己的 `state`、`mutation`、`action`、`getter`、甚至是嵌套子模块——从上至下进行同样方式的分割。

```typescript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

从数据结构上来看，模块的设计是一个树型结构，`store` 本身可以理解为一个 `root module`，它下面的 `modules` 就是子模块，Vuex 需要完成这颗树的构建，构建过程的入口就是： `this._modules = new ModuleCollection(options)`。

`ModuleCollection` 实例化的过程就是执行了 `register` 方法， `register(path, rawModule, runtime = true)` 接收 3 个参数：

- `path` 表示路径，因为整体目标是要构建一颗模块树，`path` 是在构建树的过程中维护的路径
- `rawModule` 表示定义模块的原始配置
- `runtime` 表示是否是一个运行时创建的模块

在 `register` 方法中：

- 首先，通过 `const newModule = new Module(rawModule, runtime)` 创建了一个 `Module` 的实例，`Module` 是用来描述单个模块的类。

  在 `Module` 类的构造函数中，对于每个模块而言

  - `this._rawModule` 表示模块的配置
  - `this._children` 表示它的所有子模块
  - `this.state` 表示这个模块定义的 `state`

- 在实例化一个 `Module` 后，判断当前的 `path` 的长度

  - 如果为 `0`，则说明它是一个根模块，所以把 `newModule` 赋值给了 `this.root`
  - 否则，就建立父子关系。根据路径获取到父模块，然后再调用父模块的 `addChild` 方法建立父子关系

  在建立父子关系的过程中：

  - 首先，执行 `this.get(path.slice(0, -1)` 方法，传入的 `path` 是它的父模块的 `path`
  - 然后，从根模块开始，通过 `reduce` 方法一层层去找到对应的模块。查找的过程中，执行的是 `module.getChild(key)` 方法，返回当前模块的 `_children` 中对应 `key` 的模块。

    每个模块的 `_children` 是通过执行 `parent.addChild(path[path.length - 1], newModule)` 方法

- 最后，遍历当前模块定义中的所有 `modules`，根据 `key` 作为 `path`，递归调用 `register` 方法

::: details 【ModuleCollection】类

```typescript
// src\module\module-collection.js

export default class ModuleCollection {
  constructor(rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }

  get(path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }

  getNamespace(path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.namespaced ? key + '/' : '')
    }, '')
  }

  update(rawRootModule) {
    update([], this.root, rawRootModule)
  }

  register(path, rawModule, runtime = true) {
    if (__DEV__) {
      assertRawModule(path, rawModule)
    }

    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }

  unregister(path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    const child = parent.getChild(key)

    if (!child) {
      if (__DEV__) {
        console.warn(
          `[vuex] trying to unregister module '${key}', which is ` +
            `not registered`
        )
      }
      return
    }

    if (!child.runtime) {
      return
    }

    parent.removeChild(key)
  }

  isRegistered(path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]

    if (parent) {
      return parent.hasChild(key)
    }

    return false
  }
}
```

:::

::: details 【Module】类

```typescript
// src\module\module.js

// Base data struct for store's module, package with some attribute and method
export default class Module {
  constructor(rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }

  get namespaced() {
    return !!this._rawModule.namespaced
  }

  addChild(key, module) {
    this._children[key] = module
  }

  removeChild(key) {
    delete this._children[key]
  }

  getChild(key) {
    return this._children[key]
  }

  hasChild(key) {
    return key in this._children
  }

  update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters
    }
  }

  forEachChild(fn) {
    forEachValue(this._children, fn)
  }

  forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn)
    }
  }

  forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn)
    }
  }

  forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn)
    }
  }
}
```

:::

对于 `root module` 的下一层 `modules` 来说，它们的 `parent` 就是 `root module`，它们会被添加的 `root module` 的 `_children` 中。每个子模块通过路径找到它的父模块，然后通过父模块的 `addChild` 方法建立父子关系，递归执行这样的过程，最终就建立一颗完整的模块树。

#### 安装模块

初始化模块后，通过执行 `installModule(this, state, [], this._modules.root)` 进行安装模块的相关逻辑，对模块中的 `state`、`getters`、`mutations`、`actions` 进行初始化工作。

::: details State installModule 初始化 state、getters、mutations、actions

```typescript
// src\store.js

export class Store {
  constructor(options = {}) {
    // ...
    const state = this._modules.root.state

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)
    // ...
  }
}

function installModule(store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && __DEV__) {
      console.error(
        `[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join(
          '/'
        )}`
      )
    }
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      if (__DEV__) {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join(
              '.'
            )}"`
          )
        }
      }
      Vue.set(parentState, moduleName, module.state)
    })
  }

  const local = (module.context = makeLocalContext(store, namespace, path))

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}
```

:::

`installModule(store, rootState, path, module, hot)` 方法接受 5 个参数：

- `store` 表示 `root store`
- `state` 表示 `root state`
- `path` 表示模块的访问路径
- `module` 表示当前的模块
- `hot` 表示是否是热更新

默认情况下，模块内部的 `action`、`mutation` 和 `getter` 是注册在全局命名空间的——这样使得多个模块能够对同一 `mutation` 或 `action` 作出响应。如果希望模块具有更高的封装度和复用性，可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 `getter`、`action` 及 `mutation` 都会自动根据模块注册的路径调整命名。

在 `installModule` 方法中：

- 首先，根据 `path` 执行 `const namespace = store._modules.getNamespace(path)` 获取 `namespace`

  在 `getNamespace(path)` 中，从 `root module` 开始，通过 `reduce` 方法一层层找子模块，如果发现该模块配置了 `namespaced: true`，则把该模块的 `key` 拼接到 `namespace` 中，最终返回完整的 `namespace` 字符串。

  ::: details 【ModuleCollection】类 - 【getNamespace】方法

  ```typescript
  // src\module\module-collection.js

  export default class ModuleCollection {
    // ...
    getNamespace(path) {
      let module = this.root
      return path.reduce((namespace, key) => {
        module = module.getChild(key)
        return namespace + (module.namespaced ? key + '/' : '')
      }, '')
    }
    // ...
  }
  ```

  :::

- 接着，对于设置了 `namespaced: true` 的模块，通过 `store._modulesNamespaceMap[namespace] = module` 将 `namespace` 对应的模块保存下来，为了方便以后能根据 `namespace` 查找模块
- 接着，判断非 `root module` 且非 `hot` 的情况，并执行一些逻辑处理

  - 初始化 `state`

    在 `getNestedState` 方法中，从 `root state` 开始，一层层根据模块名能访问到对应 `path` 的 `state`，那么它每一层关系的建立实际上就是通过这段 `state` 的初始化逻辑

- 接着，通过 `const local = module.context = makeLocalContext(store, namespace, path)` 构造一个本地上下文环境。

  `makeLocalContext(store, namespace, path)` 方法接受 3 个参数：

  - `store` 表示 `root store`
  - `namespace` 表示模块的命名空间
  - `path` 表示模块的 `path`

  ::: details 【makeLocalContext】方法

  ```typescript
  // src\store.js

  /**
   * make localized dispatch, commit, getters and state
   * if there is no namespace, just use root ones
   */
  function makeLocalContext(store, namespace, path) {
    const noNamespace = namespace === ''

    const local = {
      dispatch: noNamespace
        ? store.dispatch
        : (_type, _payload, _options) => {
            const args = unifyObjectStyle(_type, _payload, _options)
            const { payload, options } = args
            let { type } = args

            if (!options || !options.root) {
              type = namespace + type
              if (__DEV__ && !store._actions[type]) {
                console.error(
                  `[vuex] unknown local action type: ${args.type}, global type: ${type}`
                )
                return
              }
            }

            return store.dispatch(type, payload)
          },

      commit: noNamespace
        ? store.commit
        : (_type, _payload, _options) => {
            const args = unifyObjectStyle(_type, _payload, _options)
            const { payload, options } = args
            let { type } = args

            if (!options || !options.root) {
              type = namespace + type
              if (__DEV__ && !store._mutations[type]) {
                console.error(
                  `[vuex] unknown local mutation type: ${args.type}, global type: ${type}`
                )
                return
              }
            }

            store.commit(type, payload, options)
          },
    }

    // getters and state object must be gotten lazily
    // because they will be changed by vm update
    Object.defineProperties(local, {
      getters: {
        get: noNamespace
          ? () => store.getters
          : () => makeLocalGetters(store, namespace),
      },
      state: {
        get: () => getNestedState(store.state, path),
      },
    })

    return local
  }
  ```

  :::

  在 `makeLocalContext(store, namespace, path)` 方法定义了 `local` 对象并返回。其中：

  - 对于 `dispatch` 和 `commit` 方法，如果没有 `namespace`，它们就直接指向了 `root store` 的 `dispatch` 和 `commit` 方法，否则会创建方法，把 `type` 自动拼接上 `namespace`，然后执行 `store` 上对应的方法。
  - 对于 `getters` 而言，如果没有 `namespace`，则直接返回 `root store` 的 `getters`，否则返回 `makeLocalGetters(store, namespace)` 的返回值

    在 `makeLocalGetters(store, namespace)` 方法中：

    - 首先，定义 `gettersProxy` 变量
    - 接着，通过 `const splitPos = namespace.length` 获取了 `namespace` 的长度
    - 接着，遍历 `root store` 下的所有 `getters`。判断它的类型是否匹配 `namespace`
      - 如果未匹配，则直接 `return`
      - 如果匹配的，则从 `namespace` 的位置截取后面的字符串得到 `localType`，接着用 `Object.defineProperty` 定义了 `gettersProxy`，获取 `localType` 实际上是访问了 `store.getters[type]`
    - 最后，返回 `gettersProxy`

    ::: details 【makeLocalGetters】方法

    ```typescript
    // getNestedState

    function makeLocalGetters(store, namespace) {
      if (!store._makeLocalGettersCache[namespace]) {
        const gettersProxy = {}
        const splitPos = namespace.length
        Object.keys(store.getters).forEach(type => {
          // skip if the target getter is not match this namespace
          if (type.slice(0, splitPos) !== namespace) return

          // extract local getter type
          const localType = type.slice(splitPos)

          // Add a port to the getters proxy.
          // Define as getter property because
          // we do not want to evaluate the getters in this time.
          Object.defineProperty(gettersProxy, localType, {
            get: () => store.getters[type],
            enumerable: true,
          })
        })
        store._makeLocalGettersCache[namespace] = gettersProxy
      }

      return store._makeLocalGettersCache[namespace]
    }
    ```

    :::

  - 对于 `state` 而言，它的获取是通过 `getNestedState(store.state, path)` 方法

    在 `getNestedState(state, path)` 方法中，从 `root state` 开始，通过 `path.reduce` 方法一层层查找子模块 `state`，最终找到目标模块的 `state`

    ::: details 【getNestedState】方法

    ```typescript
    // getNestedState

    function getNestedState(state, path) {
      return path.reduce((state, key) => state[key], state)
    }
    ```

    :::

- 完成构造 local 上下文环境后，会遍历模块中定义的 `mutations`、`actions`、`getters`，分别执行它们的注册工作，它们的注册逻辑都大同小异。

  - registerMutation : 注册 mutations

    - 首先，遍历模块中的 `mutations` 的定义，拿到每一个 `mutation` 和 `key`，并把 `key` 拼接上 `namespace`
    - 然后，执行 `registerMutation` 方法。该方法实际上就是给 `root store` 上的 `_mutations[types]` 添加 `wrappedMutationHandler` 方法。注意，同一 `type` 的 `_mutations` 可以对应多个方法。

    ::: details 【registerMutation】方法

    ```typescript
    // registerGetter
    function registerMutation(store, type, handler, local) {
      const entry = store._mutations[type] || (store._mutations[type] = [])
      entry.push(function wrappedMutationHandler(payload) {
        handler.call(store, local.state, payload)
      })
    }
    ```

    :::

  - registerAction : 注册 actions

    - 首先，遍历模块中的 `actions` 的定义，拿到每一个 `action` 和 `key`，并判断 `action.root`，如果为否，则把 `key` 拼接上 `namespace`
    - 然后，执行 `registerAction` 方法。该方法实际上就是给 `root store` 上的 `_actions[types]` 添加 `wrappedActionHandler` 方法。注意，同一 `type` 的 `_actions` 可以对应多个方法。

    ::: details 【registerAction】方法

    ```typescript
    // registerGetter
    function registerAction(store, type, handler, local) {
      const entry = store._actions[type] || (store._actions[type] = [])
      entry.push(function wrappedActionHandler(payload) {
        let res = handler.call(
          store,
          {
            dispatch: local.dispatch,
            commit: local.commit,
            getters: local.getters,
            state: local.state,
            rootGetters: store.getters,
            rootState: store.state,
          },
          payload
        )
        if (!isPromise(res)) {
          res = Promise.resolve(res)
        }
        if (store._devtoolHook) {
          return res.catch(err => {
            store._devtoolHook.emit('vuex:error', err)
            throw err
          })
        } else {
          return res
        }
      })
    }
    ```

    :::

  - registerGetter : 注册 getters

    - 首先，遍历模块中的 `getters` 的定义，拿到每一个 `getter` 和 `key`，并把 `key` 拼接上 `namespace`
    - 然后，执行 `registerGetter` 方法。该方法实际上就是给 `root store` 上的 `_wrappedGetters[key]` 指定 `wrappedGetter` 方法。注意，同一 `type` 的 `_wrappedGetters` 只能定义一个。

      在 `wrappedGetter` 方法中，返回 `rawGetter` 的执行函数。`rawGetter` 是用户定义的 `getter` 函数，接收的参数是 `local` `state` 、 `local getters`、 `root state` 和 `root getters`。

    ::: details 【registerGetter】方法

    ```typescript
    // resetStoreVM
    function registerGetter(store, type, rawGetter, local) {
      if (store._wrappedGetters[type]) {
        if (__DEV__) {
          console.error(`[vuex] duplicate getter key: ${type}`)
        }
        return
      }
      store._wrappedGetters[type] = function wrappedGetter(store) {
        return rawGetter(
          local.state, // local state
          local.getters, // local getters
          store.state, // root state
          store.getters // root getters
        )
      }
    }
    ```

    :::

- 最后，遍历模块中的所有子 `modules`，递归执行 `installModule` 方法

#### 初始化 `store._vm`

完成安装模块后，通过执行 `resetStoreVM(this, this.state)` 初始化 `store._vm` 逻辑。

`resetStoreVM` 方法的作用实际上是建立 `getters` 和 `state` 的联系，因为从设计上 `getters` 的获取就依赖了 `state`，并且希望它的依赖能被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。因此这里利用了 Vue 中用 `computed` 计算属性来实现。

::: details 【resetStoreVM】方法

```typescript
// src\store.js
function resetStoreVM(store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true, // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed,
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

:::

在 `resetStoreVM (store, state, hot)` 方法中：

- 首先，遍历了 `store._wrappedGetters` 获得每个 `getter` 的函数 `fn` 和 `key`，并定义了 `computed[key] = partial(fn, store)`。

  `_wrappedGetters` 是在安装模块 `installModule` 的过程中，通过 `registerGetter` 方法完成初始化

- 接着，实例化一个 Vue 实例 `store._vm`，并把 `computed` 传入。

  ```typescript
  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed,
  })
  ```

  在 `data` 选项里定义了 `$$state` 属性，在访问 `store.state` 的时候，实际上会访问 `Store` 类上定义的 `state` 的 `get` 方法，最终访问了 `store._vm._data.$$state`。

  ```typescript
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true, // for local getters
    })
  })
  ```

  建立 `getters` 和 `state` 的依赖逻辑：

  - 在 `wrappedGetters` （即：`store._wrappedGetters`）的遍历过程中，根据 `key` 访问 `store.getters` 的某一个 `getter` 的时候，实际上就是访问了 `store._vm[key]`，也就是 `computed[key]`
  - 在执行 `computed[key]` 对应的函数的时候，最终会执行在通过 `registerGetter` 注册 `getter` 返回的 `rawGetter` 的执行函数。那么就会访问到 `store.state`，进而访问到 `store._vm._data.$$state`，这样就建立了一个依赖关系。
  - 当 `store.state` 发生变化的时候，下一次再访问 `store.getters` 的时候会重新计算。

- 对于 `strict mode` 严格模式而言

  在严格模式下，通过执行 `enableStrictMode(store)` 在 `store._vm` 添加一个 `watcher` 来观测 `this._data.$$state` 的变化，也就是当 `store.state` 被修改的时候, `store._committing` 必须为 `true`，否则在开发阶段会报警告。 `store._committing` 默认值是 `false`。

  ::: details 【enableStrictMode】方法

  ```typescript
  // src\store.js
  function enableStrictMode(store) {
    store._vm.$watch(
      function () {
        return this._data.$$state
      },
      () => {
        if (__DEV__) {
          assert(
            store._committing,
            `do not mutate vuex store state outside mutation handlers.`
          )
        }
      },
      { deep: true, sync: true }
    )
  }
  ```

  :::

  `Store` 定义了 `_withCommit` 实例方法，对 `fn` 包装了一个环境，确保在 `fn` 中执行任何逻辑的时候 `this._committing = true`。所以外部任何非通过 Vuex 提供的接口直接操作修改 `state` 的行为都会在开发阶段触发警告。

  ```typescript
  export class Store {
    // ...
    _withCommit(fn) {
      const committing = this._committing
      this._committing = true
      fn()
      this._committing = committing
    }
  }
  ```

## API

### 数据获取

Vuex 最终存储的数据是在 `state` 上的，`store.state` 存储的是 `root state`。

#### state

通过 `store.state.xxx` 或者 `store.state.moduleKey.xxx` 的方式进行获取 `state` 数据

在安装模块 `installModule(this, state, [], this._modules.root)` 的过程中，递归执行 `installModule` 完成了整个 `state` 的建设，这样就可以通过 `module` 名的 `path` 去访问到一个深层 `module` 的 `state`。

#### getters

通过 `store.getters.xxx` 方式获取 `getters` 数据

- 在安装模块 `installModule(this, state, [], this._modules.root)` 的过程中，递归执行所有 `getters` 定义，通过 `registerGetter` 方法完成注册。
- 之后，在 `resetStoreVM(this, state)` 初始化过程中，执行了 `store.getters` 的初始化工作。
- 当访问 `store.getters.xxx` 的时候，实际上就是执行在通过 `registerGetter` 注册 `getter` 返回的 `rawGetter(local.state, local.getters, store.state, store.getters)` 的执行函数，也就是定义的 `getter` 方法。

### 数据存储

#### mutation

Vuex 对数据存储的存储本质上就是对 `state` 做修改，并且只允许我们通过提交 `mutation` 的形式去修改 `state`。

`mutations` 的初始化在 `installModule` 安装模块过程中，同时，`Store` 提供了 `commit` 方法可以提交一个 `mutation`。

在 `commit(_type, _payload, _options)` 方法中：

- 传入的 `_type` 就是 `mutation` 的 `type`
- 可以从 `store._mutations` 找到对应的函数数组，遍历它们执行获取到每个 `handler` 然后执行，实际上就是执行了 `wrappedMutationHandler(payload)`，
- 接着，会执行我们定义的 `mutation` 函数，并传入当前模块的 `state`，所以 `mutation` 函数也就是对当前模块的 `state` 做修改。

::: details 【Store】类 - 【commit】方法

```typescript
// src\store.js

export class Store {
  // ...

  commit(_type, _payload, _options) {
    // check object-style commit
    const { type, payload, options } = unifyObjectStyle(
      _type,
      _payload,
      _options
    )

    const mutation = { type, payload }
    const entry = this._mutations[type]
    if (!entry) {
      if (__DEV__) {
        console.error(`[vuex] unknown mutation type: ${type}`)
      }
      return
    }
    this._withCommit(() => {
      entry.forEach(function commitIterator(handler) {
        handler(payload)
      })
    })

    this._subscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .forEach(sub => sub(mutation, this.state))

    if (__DEV__ && options && options.silent) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
          'Use the filter functionality in the vue-devtools'
      )
    }
  }

  // ...
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  if (__DEV__) {
    assert(
      typeof type === 'string',
      `expects string as the type, but found ${typeof type}.`
    )
  }

  return { type, payload, options }
}
```

:::

`mutation` 必须是同步函数，但是在开发实际项目中，经常会遇到要先去发送一个请求，然后根据请求的结果去修改 `state`，只通过 `mutation` 是无法完成需求，因此 Vuex 设计了一个 `action` 的概念。

#### action

`action` 类似于 `mutation`，不同在于 `action` 提交的是 `mutation`，而不是直接操作 `state`，并且它可以包含任意异步操作。

`action` 的初始化在 `installModule` 安装模块过程中，同时，`Store` 提供了 `dispatch` 方法可以提交一个 `action`。

在 `dispatch (_type, _payload)` 方法中：

- 传入的 `_type` 就是 `action` 的 `type`
- 可以从 `store._actions` 找到对应的函数数组，遍历它们执行获取到每个 `handler` 然后执行，实际上就是执行了 `wrappedActionHandler(payload)`
- 接着，会执行我们定义的 `action` 函数，并传入一个对象，包含了当前模块下的 `dispatch`、`commit`、`getters`、`state`，以及全局的 `rootState` 和 `rootGetters`，所以我们定义的 `action` 函数能拿到当前模块下的 `commit` 方法。

`action` 比自己写一个函数执行异步操作，然后提交 `mutation` 的好处是在于它可以在参数中获取到当前模块的一些方法和状态。

::: details 【Store】类 - 【dispatch】方法

```typescript
// src\store.js

export class Store {
  // ...
  dispatch(_type, _payload) {
    // check object-style dispatch
    const { type, payload } = unifyObjectStyle(_type, _payload)

    const action = { type, payload }
    const entry = this._actions[type]
    if (!entry) {
      if (__DEV__) {
        console.error(`[vuex] unknown action type: ${type}`)
      }
      return
    }

    try {
      this._actionSubscribers
        .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
        .filter(sub => sub.before)
        .forEach(sub => sub.before(action, this.state))
    } catch (e) {
      if (__DEV__) {
        console.warn(`[vuex] error in before action subscribers: `)
        console.error(e)
      }
    }

    const result =
      entry.length > 1
        ? Promise.all(entry.map(handler => handler(payload)))
        : entry[0](payload)

    return new Promise((resolve, reject) => {
      result.then(
        res => {
          try {
            this._actionSubscribers
              .filter(sub => sub.after)
              .forEach(sub => sub.after(action, this.state))
          } catch (e) {
            if (__DEV__) {
              console.warn(`[vuex] error in after action subscribers: `)
              console.error(e)
            }
          }
          resolve(res)
        },
        error => {
          try {
            this._actionSubscribers
              .filter(sub => sub.error)
              .forEach(sub => sub.error(action, this.state, error))
          } catch (e) {
            if (__DEV__) {
              console.warn(`[vuex] error in error action subscribers: `)
              console.error(e)
            }
          }
          reject(error)
        }
      )
    })
  }

  // ...
}
```

:::

### 语法糖

当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。同样这些问题也在存于 `getter`、`mutation` 和 `action`。为了解决这个问题，Vuex 提供了一系列 `mapXXX` 辅助函数，实现在组件中可以很方便的注入 `store` 的属性和方法。

#### mapState

```typescript
import { mapState } from 'vuex'

export default {
  // ...
  computed: {
    ...mapState({
      a: state => state.some.nested.module.a,
    }),
  },
  // computed: {
  //   ...mapState('some/nested/module', {
  //     a: state => state.a
  //   })
  // },
}
```

当执行 `mapState(map)` 函数的时候，实际上就是执行 `normalizeNamespace` 包裹的函数，然后把 `map` 作为参数 `states` 传入。包裹的函数接收 2 个参数，其中 `namespace` 表示命名空间，`map` 表示具体的对象，`namespace` 可不传。

`mapState` 最终是要构造一个对象，每个对象的元素都是一个方法，因为这个对象是要扩展到组件的 `computed` 计算属性中的。

- 首先，执行 `normalizeMap` 方法，把 `states` 变成一个数组，数组的每个元素都是 `{key, val}` 的形式
- 接着，函数的内部，获取到 `$store.getters` 和 `$store.state`
- 然后，再判断数组的 `val`。如果是一个函数，执行该函数，传入 `state` 和 `getters`，否则直接访问 `state[val]`。

在 `mapState` 的实现中，如果有 `namespace`，则尝试通过 `getModuleByNamespace(this.$store, 'mapState', namespace)` 获取对应的 `module`，然后把 `state` 和 `getters` 修改为 `module` 对应的 `state` 和 `getters`。

::: details 【mapState】方法

```typescript
// src\helpers.js

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
export const mapState = normalizeNamespace((namespace, states) => {
  const res = {}
  if (__DEV__ && !isValidMap(states)) {
    console.error(
      '[vuex] mapState: mapper parameter must be either an Array or an Object'
    )
  }
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState() {
      let state = this.$store.state
      let getters = this.$store.getters
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace)
        if (!module) {
          return
        }
        state = module.context.state
        getters = module.context.getters
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace(fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace
      namespace = ''
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/'
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace(store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace]
  if (__DEV__ && !module) {
    console.error(
      `[vuex] module namespace not found in ${helper}(): ${namespace}`
    )
  }
  return module
}
```

:::

#### mapGetters

```typescript
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  },
}
```

`mapGetters` 和 `mapState` 类似，`mapGetters` 是将 `store` 中的 `getter` 映射到局部计算属性。

`mapGetters` 同样支持 `namespace`，如果不写 `namespace` ，访问一个子 `module` 的属性需要写很长的 `key`，一旦使用了 `namespace`，就可以方便书写。每个 `mappedGetter` 的实现实际上就是取 `this.$store.getters[val]`

::: details 【mapGetters】方法

```typescript
// src\helpers.js

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {}
  if (__DEV__ && !isValidMap(getters)) {
    console.error(
      '[vuex] mapGetters: mapper parameter must be either an Array or an Object'
    )
  }
  normalizeMap(getters).forEach(({ key, val }) => {
    // The namespace has been mutated by normalizeNamespace
    val = namespace + val
    res[key] = function mappedGetter() {
      if (
        namespace &&
        !getModuleByNamespace(this.$store, 'mapGetters', namespace)
      ) {
        return
      }
      if (__DEV__ && !(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`)
        return
      }
      return this.$store.getters[val]
    }
    // mark vuex getter for devtools
    res[key].vuex = true
  })
  return res
})
```

:::

#### mapMutations

```typescript
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy', // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment', // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    }),
  },
}
```

在组件中，可使用 `this.$store.commit('xxx')` 提交 `mutation`，或者使用 `mapMutations` 辅助函数（支持传入一个数组或者一个对象）将组件中的 `methods` 映射为 `store.commit` 调用。

`mappedMutation` 同样支持 `namespace`，并且支持了传入额外的参数 `args`，作为提交 `mutation` 的 `payload`，最终就是执行了 `store.commit` 方法，并且这个 `commit` 会根据传入的 `namespace` 映射到对应 `module` 的 `commit` 上。

::: details 【mapMutations】方法

```typescript
// src\helpers.js

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {}
  if (__DEV__ && !isValidMap(mutations)) {
    console.error(
      '[vuex] mapMutations: mapper parameter must be either an Array or an Object'
    )
  }
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation(...args) {
      // Get the commit method from store
      let commit = this.$store.commit
      if (namespace) {
        const module = getModuleByNamespace(
          this.$store,
          'mapMutations',
          namespace
        )
        if (!module) {
          return
        }
        commit = module.context.commit
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
```

:::

#### mapActions

```typescript
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy', // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment', // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    }),
  },
}
```

在组件中，可使用 `this.$store.dispatch('xxx')` 提交 `action`，或者使用 `mapActions` 辅助函数将组件中的 `methods` 映射为 `store.dispatch` 的调用。

::: details 【mapActions】方法

```typescript
// src\helpers.js

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {}
  if (__DEV__ && !isValidMap(actions)) {
    console.error(
      '[vuex] mapActions: mapper parameter must be either an Array or an Object'
    )
  }
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction(...args) {
      // get dispatch function from store
      let dispatch = this.$store.dispatch
      if (namespace) {
        const module = getModuleByNamespace(
          this.$store,
          'mapActions',
          namespace
        )
        if (!module) {
          return
        }
        dispatch = module.context.dispatch
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    }
  })
  return res
})
```

:::

### 动态更新模块

#### registerModule

在 Vuex 初始化阶段构造了模块树，初始化了模块上各个部分。在有一些场景下，需要动态去注入一些新的模块，Vuex 提供了模块动态注册功能，在 `store` 上提供了一个 `registerModule` 的 API。

`registerModule(path, rawModule, options = {})` 支持传入一个 `path` 模块路径和 `rawModule` 模块定义。

- 首先，执行 `register` 方法扩展我们的模块树
- 接着，执行 `installModule` 去安装模块
- 最后，执行 `resetStoreVM` 重新实例化 `store._vm`，并销毁旧的 `store._vm`

::: details 【Store】类 - 【registerModule】方法

```typescript
// src\store.js

export class Store {
  // ...

  registerModule(path, rawModule, options = {}) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
      assert(
        path.length > 0,
        'cannot register the root module by using registerModule.'
      )
    }

    this._modules.register(path, rawModule)
    installModule(
      this,
      this.state,
      path,
      this._modules.get(path),
      options.preserveState
    )
    // reset store to update getters...
    resetStoreVM(this, this.state)
  }
}
```

:::

#### unregisterModule

Vuex 提供了模块动态卸载功能，在 `store` 上提供了一个 `unregisterModule` 的 API。

`unregisterModule` 支持传入一个 `path` 模块路径。

- 首先，执行 `unregister` 方法去修剪我们的模块树。（注：对于模块的移除，只会移除运行时动态创建的模块。）
- 接着，会删除 `state` 在该路径下的引用
- 最后，执行 `resetStore` 方法。该方法把 `store` 下的对应存储的 `_actions`、`_mutations`、`_wrappedGetters` 和 `_modulesNamespaceMap` 都清空，然后重新执行 `installModule` 安装所有模块以及 `resetStoreVM` 重置 `store._vm`

::: details 【Store】类 - 【unregisterModule】方法

```typescript
// src\store.js

export class Store {
  // ...

  unregisterModule(path) {
    if (typeof path === 'string') path = [path]

    if (__DEV__) {
      assert(Array.isArray(path), `module path must be a string or an Array.`)
    }

    this._modules.unregister(path)
    this._withCommit(() => {
      const parentState = getNestedState(this.state, path.slice(0, -1))
      Vue.delete(parentState, path[path.length - 1])
    })
    resetStore(this)
  }
}

function resetStore(store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  // init all modules
  installModule(store, state, [], store._modules.root, true)
  // reset vm
  resetStoreVM(store, state, hot)
}

// src\module\module-collection.js

export default class ModuleCollection {
  // ...

  unregister(path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    const child = parent.getChild(key)

    if (!child) {
      if (__DEV__) {
        console.warn(
          `[vuex] trying to unregister module '${key}', which is ` +
            `not registered`
        )
      }
      return
    }

    if (!child.runtime) {
      return
    }

    parent.removeChild(key)
  }
}
```

:::

## 插件

Vuex 除了提供的存取能力，还提供了一种插件能力，可以监控 `store` 的变化过程来做一些事情。

Vuex 的 `store` 接受 `plugins` 选项，在实例化 `Store` 的时候可以传入插件，它是一个数组，然后在执行 `Store` 构造函数的时候，会执行这些插件

```typescript
export class Store {
  constructor(options = {}) {
    const { plugins = [], strict = false } = options

    // ...

    // apply plugins
    plugins.forEach(plugin => plugin(this))
  }
}
```

### Logger 插件

Vuex 内置的 `Logger` 插件，它能够追踪 `state` 变化，然后输出一些格式化日志。

- `Logger` 插件函数接收的参数是 `store` 实例，它执行了 `store.subscribe` 方法。

  在 `subscribe` 方法中，通过执行 `genericSubscribe` 方法，往 `this._subscribers` 去添加一个函数，并返回一个 `unsubscribe` 的方法。

  在执行 `store.commit` 的方法时，会遍历 `this._subscribers` 执行它们对应的回调函数。

  ::: details 【Store】类 - 【subscribe】方法

  ```typescript
  // src\store.js

  export class Store {
    subscribe(fn, options) {
      return genericSubscribe(fn, this._subscribers, options)
    }
  }

  function genericSubscribe(fn, subs, options) {
    if (subs.indexOf(fn) < 0) {
      options && options.prepend ? subs.unshift(fn) : subs.push(fn)
    }
    return () => {
      const i = subs.indexOf(fn)
      if (i > -1) {
        subs.splice(i, 1)
      }
    }
  }
  ```

  :::

- `Logger` 函数，它相当于订阅了 `mutation` 的提交

  - `prevState` 表示之前的 `state`
  - `nextState` 表示提交 `mutation` 后的 `state`

  这两个 `state` 都需要执行 `deepCopy` 方法拷贝一份对象的副本，对他们的修改就不会影响原始 `store.state`。

- 接者，会构造一些格式化的消息。打印出一些时间消息 `message`， 之前的状态 `prevState`，对应的 `mutation` 操作 `formattedMutation` 以及下一个状态 `nextState`。
- 最后，更新 `prevState = nextState`，为下一次提交 `mutation` 输出日志做准备。

::: details Logger 插件函数 - 【createLogger】方法

```typescript
export default function createLogger({
  collapsed = true,
  filter = (mutation, stateBefore, stateAfter) => true,
  transformer = state => state,
  mutationTransformer = mut => mut,
  actionFilter = (action, state) => true,
  actionTransformer = act => act,
  logMutations = true,
  logActions = true,
  logger = console,
} = {}) {
  return store => {
    let prevState = deepCopy(store.state)

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe((mutation, state) => {
        const nextState = deepCopy(state)

        if (filter(mutation, prevState, nextState)) {
          const formattedTime = getFormattedTime()
          const formattedMutation = mutationTransformer(mutation)
          const message = `mutation ${mutation.type}${formattedTime}`

          startMessage(logger, message, collapsed)
          logger.log(
            '%c prev state',
            'color: #9E9E9E; font-weight: bold',
            transformer(prevState)
          )
          logger.log(
            '%c mutation',
            'color: #03A9F4; font-weight: bold',
            formattedMutation
          )
          logger.log(
            '%c next state',
            'color: #4CAF50; font-weight: bold',
            transformer(nextState)
          )
          endMessage(logger)
        }

        prevState = nextState
      })
    }

    if (logActions) {
      store.subscribeAction((action, state) => {
        if (actionFilter(action, state)) {
          const formattedTime = getFormattedTime()
          const formattedAction = actionTransformer(action)
          const message = `action ${action.type}${formattedTime}`

          startMessage(logger, message, collapsed)
          logger.log(
            '%c action',
            'color: #03A9F4; font-weight: bold',
            formattedAction
          )
          endMessage(logger)
        }
      })
    }
  }
}

function repeat(str, times) {
  return new Array(times + 1).join(str)
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}
```

:::
