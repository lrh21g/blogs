import Vue from './instance/index';
import { initGlobalAPI } from './global-api/index';
import { isServerRendering } from 'core/util/env';
import { FunctionalRenderContext } from 'core/vdom/create-functional-component';

// 初始化全局 API
initGlobalAPI(Vue);

// 在 Vue.prototype 上，添加 $isServer 只读属性
// 判断当前 Vue 实例是否运行于服务器
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering,
});

// 在 Vue.prototype 上，添加 $ssrContext 只读属性
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  },
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
});

Vue.version = '__VERSION__';

export default Vue;
