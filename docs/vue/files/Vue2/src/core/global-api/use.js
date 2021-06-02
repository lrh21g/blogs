/* @flow */

import { toArray } from '../util/index';

// 初始化 Vue 安装插件函数
export function initUse(Vue: GlobalAPI) {
  Vue.use = function(plugin: Function | Object) {
    const installedPlugins =
      this._installedPlugins || (this._installedPlugins = []);
    // 判断插件是否已安装，如果已安装，则不再重复安装
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }

    // additional parameters - 额外的参数
    // toArray 将一个类似数组的对象转换为一个真正的数组
    const args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      // 如果 plugin 是一个对象，存在 install 属性，并且该属性为一个函数
      // >>> 即：如果插件是一个对象，必须提供 install 方法
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      // 如果 plugin 为一个函数
      // >>> 即：如果插件是一个函数，它会被作为 install 方法
      plugin.apply(null, args);
    }
    // 将已安装过的插件添加到队列中
    installedPlugins.push(plugin);
    return this;
  };
}
