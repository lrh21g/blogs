/**
 * @description:
 * @param {row} 当前行的数据
 * @param {column} 当前列的数据
 * @param {index} 当前是第几行
 * @param {render} 具体的 render 函数内容
 * @return:
 */
export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    render: Function,
  },
  // h: createElement
  // ctx: 提供上下文信息
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.index,
    };

    return ctx.props.render(h, params);
  },
};
