/* @flow */

import config from '../config';
import { initUse } from './use';
import { initMixin } from './mixin';
import { initExtend } from './extend';
import { initAssetRegisters } from './assets';
import { set, del } from '../observer/index';
import { ASSET_TYPES } from 'shared/constants';
import builtInComponents from '../components/index';
import { observe } from 'core/observer/index';

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive,
} from '../util/index';

// 初始化全局 API
export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef = {};
  configDef.get = () => config;
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 暴露 util 方法， 避免依赖 Vue.util 中的方法，可能存在变动
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive,
  };

  // Vue.set - 向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
  // >>> 必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 this.myObject.newProperty = 'hi')
  Vue.set = set;
  // Vue.delete - 删除对象的 property。如果对象是响应式的，确保删除能触发更新视图。
  // >>> 主要用于避开 Vue 不能检测到 property 被删除的限制，但是你应该很少会使用它。
  Vue.delete = del;
  // Vue.nextTick - 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
  // >>> Vue 在更新 DOM 时是异步执行的
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  // Vue.observable - 让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
  // >>> 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。
  // >>> 也可以作为最小化的跨组件状态存储器，用于简单的场景
  Vue.observable = <T>(obj: T): T => {
    observe(obj);
    return obj;
  };

  Vue.options = Object.create(null);
  // export const ASSET_TYPES = [
  //  'component',
  //  'directive',
  //  'filter'
  // ]
  // 添加 components 、 directives 、 filters 指令组件
  ASSET_TYPES.forEach((type) => {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  // _base 被用来标识基本构造函数（也就是Vue），以便在多场景下添加组件扩展
  Vue.options._base = Vue;

  // 将 builtInComponents 中的属性混合（存在属性覆盖）到 Vue.options.components 中
  extend(Vue.options.components, builtInComponents);

  // 初始化 Vue 安装插件函数
  initUse(Vue);
  // 初始化 Vue mixin 函数
  initMixin(Vue);
  // 初始化 Vue extend 函数
  initExtend(Vue);
  // 添加静态方法 component、directive、filter
  initAssetRegisters(Vue);
}
