/* @flow */

import config from 'core/config';
import { warn, cached } from 'core/util/index';
import { mark, measure } from 'core/util/perf';

import Vue from './runtime/index';
import { query } from './util/index';
import { compileToFunctions } from './compiler/index';
import {
  shouldDecodeNewlines,
  shouldDecodeNewlinesForHref,
} from './util/compat';

// 通过 id 获取 template （即通过 id 获取对应的 DOM），然后获取对应的 innerHTML。
const idToTemplate = cached((id) => {
  const el = query(id);
  return el && el.innerHTML;
});

// 将不进行编译的 $mount 方法 进行缓存
const mount = Vue.prototype.$mount;

// 挂载组件，如果是运行时编译（即：不存在 render function 但是存在 template 的情况），需要进行【编译】步骤
Vue.prototype.$mount = function(
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    // 如果 el 为 <body> 元素 或者 根元素 <html>，则抛出警告
    process.env.NODE_ENV !== 'production' &&
      warn(
        `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
      );
    return this;
  }

  // 获取当前 Vue 实例的初始化选项
  const options = this.$options;

  // resolve template/el and convert to render function
  // 解析 template字符串模板 / el ，并转换为渲染函数

  // 判断是否包含 render 函数
  if (!options.render) {
    // 当前 Vue 实例的初始化选项中，不包含 render 渲染函数，则处理 template 字符串模板

    // 获取 template 字符串模板
    let template = options.template;
    if (template) {
      // 当前 Vue 实例的初始化选项中，存在 template 字符串模板的时候
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          // template 字符串模板为字符串并以 # 字符开始，则它将被用作选择符，并使用匹配元素的 innerHTML 作为模板。
          // 例如： template: '#template-id'
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            );
          }
        }
        // template 字符串模板为字符串，并不以 # 字符开始，则不做处理
      } else if (template.nodeType) {
        // template 字符串模板为 DOM 节点。
        // 例如： template: document.querySelector('#template')
        template = template.innerHTML;
      } else {
        // 抛出警告
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this);
        }
        return this;
      }
    } else if (el) {
      // 当前 Vue 实例的初始化选项中，不存在 template 字符串模板，存在 el 的时候
      // 获取 el DOM节点 的 outerHTML（获取描述元素（包括其后代）的序列化HTML片段）
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile');
      }

      // 将 template 字符串模板 编译为 render 渲染函数
      // 此处返回 render、staticRenderFns ，这是 Vue 编译时的性能优化。
      // >>> staticRender 为静态渲染，不需要在 VNode 更新的时候进行 patch（比对两个 VNode 节点，将「差异」更新到视图上）
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          outputSourceRange: process.env.NODE_ENV !== 'production',
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(`vue ${this._name} compile`, 'compile', 'compile end');
      }
    }
  }
  // 调用 const mount = Vue.prototype.$mount 中，保存的不带编译的 mount
  return mount.call(this, el, hydrating);
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 * 获取 el DOM节点 的 outerHTML（获取描述元素（包括其后代）的序列化HTML片段）
 */
function getOuterHTML(el: Element): string {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
}

Vue.compile = compileToFunctions;

export default Vue;
