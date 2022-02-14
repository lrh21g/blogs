# TypeScript 实现 Vuex

``` typescript
import { App, inject } from 'vue';

// provide / inject
// provide 设置一个可以被注入到应用范围内所有组件中的值。组件使用 inject 来接收 provide 的值。
const injectKey = 'store';

export function useStore<S>(): Store<S> {
  return inject(injectKey) as any;
}

export function createStore<S>(options: StoreOptions<S>) {
  return new Store<S>(options);
}

class Store<S = any> {
  moduleCollection: ModuleCollection<S>;
  mutations: Record<string, any> = {};
  actions: Record<string, any> = {};
  getters: GetterTree<any, S> = {};
  commit: Commit;
  dispatch: Dispatch;
  constructor(options: StoreOptions<S>) {
    // 初始化模块集合：添加子模块到父模块中，并对模块进行包装
    this.moduleCollection = new ModuleCollection<S>(options);
    console.log('this.moduleCollection: ', this.moduleCollection);
    var store = this;
    var ref = this;
    var commit = ref.commit_;
    var dispatch = ref.dispatch_;

    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload);
    };
    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload);
    };

    // 获取根 Store 的 state
    var rootState = this.moduleCollection.root.state;
    // 注册模块
    installModule(store, rootState, [], this.moduleCollection.root);
  }

  install(app: App) {
    app.provide(injectKey, this);
  }

  commit_(type: string, payload: any) {
    if (!this.mutations[type]) {
      console.error('[vuex] unknown mutation type: ' + type);
    }
    this.mutations[type](payload);
  }

  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) {
      console.error('[vuex] unknown actions type: ' + type);
    }
    this.actions[type](payload);
  }
}
/**
 *
 * @param store
 * @param rootState_ 根 state
 * @param path 保存模块名【命名空间名】的数组
 * @param module 当前模块
 */
function installModule<R>(
  store: Store<R>,
  rootState_: R,
  path: string[],
  module: ModuleWrapper<any, R>
) {
  var isRoot = !path.length;
  let namespace = store.moduleCollection.getNamespace(path);
  let actionContext: ActionContext<any, R> = makeLocalContext(store, namespace);
  if (!isRoot) {
    // 1、如果不是根模块，则获取父级的 state 对象
    var parentState: Record<string, any> = getParentState(rootState_, path.slice(0, -1));
    // 2、将当前模块的 state对象 和 当前模块名 合成一个对象，加到父级 state对象 上
    parentState[path[path.length - 1]] = module.state;
  }
  // 遍历 父模块 中的 子模块
  module.forEachChild(function (child, key) {
    installModule(store, rootState_, path.concat(key), child);
  });

  // 遍历模块中的 getter
  module.forEachGetter(function (getter, key) {
    let namespaceType = namespace + key;
    Object.defineProperty(store.getters, namespaceType, {
      get: () => {
        return getter(module.state);
      },
    });
    console.log('store.getters: ', store.getters);
  });
  // 遍历模块中的 mutation
  module.forEachMutation(function (mutation, key) {
    let namespaceType = namespace + key;
    store.mutations[namespaceType] = function (payload: any) {
      mutation.call(store, module.state, payload);
    };
    console.log('store.mutations: ', store.mutations);
  });
  // 遍历模块中的 action
  module.forEachAction(function (action, key) {
    let namespaceType = namespace + key;
    store.actions[namespaceType] = function (payload: any) {
      action.call(store, { commit: actionContext.commit }, payload);
    };
    console.log('store.actions: ', store.actions);
  });
}

function makeLocalContext<R>(store: Store<R>, namespace: string) {
  let noNamespace = namespace === ''; // 根模块没有命名空间
  let actionContext: ActionContext<any, R> = {
    commit: noNamespace
      ? store.commit
      : function (type, payload) {
          type = namespace + type;
          store.commit(type, payload);
        },
  };
  return actionContext;
}

function getParentState<R>(rootState: R, path: string[]) {
  return path.reduce((state, key) => {
    return (state as any)[key];
  }, rootState);
}

// path: ["foodSortModule", "foodModule", "foodDetailModule"]
// rootState:
// {
//   "navList": 根state对象数据,
//   "foodSortModule": {
//     foodSortList: { 美食分类对象数据 },
//     "foodModule": {
//       "美食state对象数据",
//       "foodDetailModule": { 美食详情对象数据 }
//     }
//   },
//   "hotelSortModule": 酒店分类state数据对象 //酒店分类 state
// }
// rootState对象结束
// 处理模块集合
class ModuleCollection<R> {
  root!: ModuleWrapper<any, R>;
  constructor(rawRootModule: Module<any, R>) {
    this.register([], rawRootModule); // 注册模块
  }
  register(path: string[], rawModule: Module<any, R>) {
    let newModule = new ModuleWrapper<any, R>(rawModule);
    if (path.length === 0) {
      // path 长度等于 0 为根模块
      this.root = newModule;
    } else {
      // 添加 子模块 到 父模块 中
      // 1、获取 父模块 的 ModuleWrapper 对象
      let parentModule = this.get(path.slice(0, -1));
      // 2、将 子模块 添加到 父模块 中
      parentModule.addChild(path[path.length - 1], newModule);
    }

    if (rawModule.modules) {
      let sonModules = rawModule.modules; // 获取子模块
      // 遍历子模块，并进行注册
      Util.forEachValue(sonModules, (modules: Module<any, R>, key: string) => {
        this.register(path.concat(key), modules);
      });
    }
  }

  get(path: string[]) {
    let module = this.root;
    return path.reduce((moduleWrapper: ModuleWrapper<any, R>, key: string) => {
      return module.getChild(key);
    }, module);
  }

  getNamespace(path: string[]) {
    let moduleWrapper = this.root;
    return path.reduce(function (namespace, key) {
      moduleWrapper = moduleWrapper.getChild(key);
      return namespace + (moduleWrapper.namespaced ? key + '/' : '');
    }, '');
  }
}

class Util {
  static forEachValue(obj: object, fn: Function) {
    Object.keys(obj).forEach((key) => {
      fn((obj as any)[key], key);
    });
  }
}

// 模块包装
class ModuleWrapper<S, R> {
  children: Record<string, ModuleWrapper<any, R>> = {};
  rawModule: Module<any, R>;
  state: S;
  namespaced: boolean;
  constructor(rawModule_: Module<any, R>) {
    // rawModule 原始模块： namespaced 、 state 、 getter 、 mutations 、 actions
    this.rawModule = rawModule_;
    this.state = rawModule_.state || Object.create(null);
    this.namespaced = rawModule_.namespaced || false;
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper;
  }
  getChild(key: string) {
    return this.children[key];
  }
  forEachChild(fn: ChldMdleWrperToKey<R>) {
    Util.forEachValue(this.children, fn);
  }
  forEachGetter(fn: GetterToKey<R>) {
    if (this.rawModule.getters) {
      Util.forEachValue(this.rawModule.getters, fn);
    }
  }
  forEachMutation(fn: MutationToKey<S>) {
    if (this.rawModule.mutations) {
      Util.forEachValue(this.rawModule.mutations, fn);
    }
  }
  forEachAction(fn: ActionToKey<S, R>) {
    if (this.rawModule.actions) {
      Util.forEachValue(this.rawModule.actions, fn);
    }
  }
}

type Dispatch = (type: string, payload?: any) => any;
type Commit = (type: string, payload?: any) => any;
interface ActionContext<S, R> {
  //dispatch: Dispatch;
  commit: Commit;
  //state: S;
}

// type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
type Getter<S, R> = (state: S) => any;
type Mutation<S> = (state: S, payload?: any) => void;
type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any;

type GetterToKey<R> = (getter: Getter<any, R>, key: string) => any;
type MutationToKey<S> = (getter: Mutation<S>, key: string) => any;
type ActionToKey<S, R> = (action: Action<S, R>, key: string) => any;
type ChldMdleWrperToKey<R> = (moduleWrapper: ModuleWrapper<any, R>, key: string) => void;

// 【start】 StoreOptions 接口增加多模块管理属性
interface GetterTree<S, R> {
  [key: string]: Getter<S, R>;
}
interface MutationTree<S> {
  [key: string]: Mutation<S>;
}
interface ActionTree<S, R> {
  [key: string]: Action<S, R>;
}
interface ModuleTree<R> {
  [key: string]: Module<any, R>;
}

interface StoreOptions<S> {
  state?: S;
  getters?: GetterTree<S, S>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, S>;
  modules?: ModuleTree<S>;
}

export interface Module<S, R> {
  namespaced?: boolean;
  state?: S;
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: ModuleTree<R>;
}
// 【end】 StoreOptions 接口增加多模块管理属性
```
