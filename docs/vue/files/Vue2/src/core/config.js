/* @flow */

// no ： 总是返回 false
// noop ; 不执行任何操作
// identity ： 返回相同的值
import { no, noop, identity } from 'shared/util';

import { LIFECYCLE_HOOKS } from 'shared/constants';

export type Config = {
  // user
  optionMergeStrategies: { [key: string]: Function },
  silent: boolean,
  productionTip: boolean,
  performance: boolean,
  devtools: boolean,
  errorHandler: ?(err: Error, vm: Component, info: string) => void,
  warnHandler: ?(msg: string, vm: Component, trace: string) => void,
  ignoredElements: Array<string | RegExp>,
  keyCodes: { [key: string]: number | Array<number> },

  // platform
  isReservedTag: (x?: string) => boolean,
  isReservedAttr: (x?: string) => boolean,
  parsePlatformTagName: (x: string) => string,
  isUnknownElement: (x?: string) => boolean,
  getTagNamespace: (x?: string) => string | void,
  mustUseProp: (tag: string, type: ?string, name: string) => boolean,

  // private
  async: boolean,

  // legacy
  _lifecycleHooks: Array<string>,
};

export default ({
  /**
   * Option merge strategies (used in core/util/options)
   * 自定义合并策略选项
   * 合并策略选项分别接收在父实例和子实例上定义的该选项的值作为第一个和第二个参数，Vue 实例上下文被作为第三个参数传入
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   * 取消 Vue 所有的日志与警告，默认为 false
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   * 设置为 false 以阻止 vue 在启动时生成生产提示
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   * 配置是否允许 vue-devtools 检查代码。开发版本默认为 true，生产版本默认为 false。生产版本设为 true 可以启用检查
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   * 设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。
   * 只适用于开发模式和支持 performance.mark API （在浏览器的性能缓冲区中使用给定名称添加一个timestamp(时间戳)） 的浏览器上
   */
  performance: false,

  /**
   * Error handler for watcher errors
   * 指定组件的渲染和观察期间未捕获错误的处理函数。这个处理函数被调用时，可获取错误信息和 Vue 实例。
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   * 为 Vue 的运行时警告赋予一个自定义处理函数。注意这只会在开发者环境下生效，在生产环境下它会被忽略
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   * 须使 Vue 忽略在 Vue 之外的自定义元素 (e.g. 使用了 Web Components APIs)。
   * 否则，它会假设你忘记注册全局组件或者拼错了组件名称，从而抛出一个关于 Unknown custom element 的警告
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   * 给 v-on 自定义键位别名
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   * 检查标签是否被保留，以便不能将其注册为组件
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   * 检查属性是否被保留，以便不能将其注册为组件。这是平台相关的，可能会被覆盖。
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   * 检查标记是否是未知元素。与平台相关
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   * 获取元素的名称空间
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   * 解析特定平台的实际标记名
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   * 检查属性是否必须使用属性进行绑定，例如 value
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   * 异步执行更新。预期由Vue Test Utils 使用。如果设置为false，这将大大降低性能。
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS,
}: Config);
