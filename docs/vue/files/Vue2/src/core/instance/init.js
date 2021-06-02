/* @flow */

import config from '../config';
import { initProxy } from './proxy';
import { initState } from './state';
import { initRender } from './render';
import { initEvents } from './events';
import { mark, measure } from '../util/perf';
import { initLifecycle, callHook } from './lifecycle';
import { initProvide, initInjections } from './inject';
import { extend, mergeOptions, formatComponentName } from '../util/index';

let uid = 0;

// 在 Vue 原型上添加 _init 方法，构造 Vue 实例的时候，会调用 _init 方法来初始化 Vue实例
export function initMixin(Vue: Class<Component>) {
  Vue.prototype._init = function(options?: Object) {
    const vm: Component = this;
    // a uid
    vm._uid = uid++;

    let startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`;
      endTag = `vue-perf-end:${vm._uid}`;
      mark(startTag);
    }

    // a flag to avoid this being observed
    // 防止 vm 实例自身被观察的标记位
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // 判断是否为子组件

      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      // 优化内部组件实例化
      // 因为动态选项合并非常缓慢，而且没有任何内部组件选项需要特殊处理。
      initInternalComponent(vm, options);
    } else {
      // mergeOptions : 将 resolveConstructorOptions(vm.constructor) 的返回值和 options 做合并
      // resolveConstructorOptions : 判断父类的 options 是否发生变化，如果发生变化，则继承相关 options
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    // 初始化生命周期
    initLifecycle(vm);
    // 初始化事件
    initEvents(vm);
    // 初始化 Render
    initRender(vm);
    // 调用 beforeCreate 钩子函数并触发 beforeCreate 钩子事件
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    // 初始化 props、methods、data、computed 与 watch
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    // 调用 created 钩子函数并触发 created 钩子事件
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(`vue ${vm._name} init`, startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

// 初始化内部组件
export function initInternalComponent(
  vm: Component, // Vue 组件实例
  options: InternalComponentOptions // Vue 组件实例选项
) {
  // vm.constructor : 子组件的构造函数 Sub , 相当于 vm.$options = Object.create(Sub.options)
  const opts = (vm.$options = Object.create(vm.constructor.options));
  // doing this because it's faster than dynamic enumeration.
  // options = {
  //  _isComponent: true, // 是否为组件
  //  parent: parent, // 子组件的父 Vue 实例
  //  _parentVnode: vnode,
  // }
  const parentVnode = options._parentVnode;
  opts.parent = options.parent; // 子组件的父 Vue 实例
  opts._parentVnode = parentVnode;

  const vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

// 判断父类的 options 是否发生变化，如果发生变化，则继承相关 options
export function resolveConstructorOptions(Ctor: Class<Component>) {
  let options = Ctor.options;
  if (Ctor.super) {
    // 如果存在 super，则表示 Ctor 是通过 Vue.extend 构建的子类

    // superOptions : 通过 resolveConstructorOptions 获取父类最新 的 options
    const superOptions = resolveConstructorOptions(Ctor.super);
    // cachedSuperOptions : 原有的父类 options
    const cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      // 父类的 options 已发生改变，需要对新的 options 进行处理

      // 替换为最新的父类 options
      Ctor.superOptions = superOptions;

      // check if there are any late-modified/attached options (#4976)
      // 检查当前是否有任何后期修改/附加的选项，并返回
      const modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      // 更新基于扩展的选项
      if (modifiedOptions) {
        // 将 modifiedOptions 中的属性混合（存在属性覆盖）到目标对象 Ctor.extendOptions 中
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}

// 检查是否有任何后期修改/附加的选项，并返回
function resolveModifiedOptions(Ctor: Class<Component>): ?Object {
  let modified;
  // latest : 最新的 options
  const latest = Ctor.options;
  // 执行 Vue.extend 时的 options
  const sealed = Ctor.sealedOptions;
  // 遍历 latest （最新的 options） ，返回后期修改/附加选项
  for (const key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
