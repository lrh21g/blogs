import { initMixin } from './init';
import { stateMixin } from './state';
import { renderMixin } from './render';
import { eventsMixin } from './events';
import { lifecycleMixin } from './lifecycle';
import { warn } from '../util/index';

// Vue 构造函数
// Vue 实际上是一个使用 Function 实现的类
function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  // 初始化
  this._init(options);
}

// 以下函数，通过将 Vue 当参数传入，将一些方法挂载到 Vue 的 prototype 上，可以将 Vue 的不同功能分散到不同模块中

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

export default Vue;
