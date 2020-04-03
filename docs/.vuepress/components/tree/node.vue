<template>
  <ul class="tree-ul">
    <li class="tree-li">
      <!-- 是否展开标识 - 条件： -->
      <!-- 当前节点不含子节点（即：没有 children 字段或 children 的长度是 0） -->
      <!-- 是否设置子节点展开 expand -->
      <span class="tree-expand" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">-</span>
      </span>
      <!-- 此处，将 prop: value 和事件 @input 分开绑定，没有使用 v-model 语法糖 -->
      <!-- 原因: @input 里要额外做一些处理，不是单纯的修改数据。 -->
      <i-checkbox v-if="showCheckbox" :value="data.checked" @input="handleCheck"></i-checkbox>
      <span>{{ data.title }}</span>
      <tree-node
        v-if="data.expand"
        v-for="(item, index) in data.children"
        :key="index"
        :data="item"
        :show-checkbox="showCheckbox"
      ></tree-node>
    </li>
  </ul>
</template>
<script>
import iCheckbox from "../checkbox/checkbox.vue";
import { findComponentUpward } from "../utils/assist.js";
export default {
  name: "TreeNode",
  components: { iCheckbox },
  props: {
    // data 包含当前节点的所有信息
    // >>> expand: 是否展开子节点标识
    // >>> checked: 是否选中
    // >>> children: 子节点数据
    data: {
      type: Object,
      default() {
        return {};
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 此处使用，findComponentUpward 向上查找 Tree 实例，而不用 $parent
      // 原因：因为它是递归组件，父级有可能还是自己
      tree: findComponentUpward(this, "Tree")
    };
  },
  methods: {
    // 子节点展开操作：
    // 点击 + 号时，会展开直属子节点，点击 - 号关闭
    handleExpand() {
      this.$set(this.data, "expand", !this.data.expand);
      if (this.tree) {
        this.tree.emitEvent("on-toggle-expand", this.data);
      }
    },
    // 节点选中或取消选中操作：(考虑上下级关系)
    // 当选中（或取消选中）一个节点时：
    // >>> 1. 它下面的所有子节点都会被选中
    // >>> 2. 如果同一级所有子节点选中时，它的父级也自动选中，一直递归判断到根节点
    
    // 节点选中或取消选中操作 1：当选中（或取消选中）一个节点时, 【它下面的所有子节点都会被选中】:
    // 只要递归地遍历它下面所属的所有子节点数据，修改所有的 checked 字段即可
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked);
      if (this.tree) {
        this.tree.emitEvent("on-check-change", this.data);
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, "checked", checked);
      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked);
        });
      }
    }
  },
  watch: {
    // 节点选中或取消选中操作 2：当选中（或取消选中）一个节点时，【如果同一级所有子节点选中时，它的父级也自动选中，一直递归判断到根节点】
    // >>> 如果这个节点的所有直属子节点（就是它的第一级子节点）都选中（或反选）时，这个节点就自动被选中（或反选），递归地，可以一级一级响应上去。
    // 当前组件为递归组件，每个组件都会监听【data.children】
    // >>> 【data.children】有两个"身份": 它既是下属节点的父节点，同时也是上级节点的子节点
    // >>> 【data.children】作为下属节点的父节点被修改的同时，也会触发上级节点中的 watch 监听函数
    "data.children": {
      handler(data) {
        if (data) {
          // 返回当前子节点是否【都被选中】
          const checkedAll = !data.some(item => !item.checked); 
          this.$set(this.data, "checked", checkedAll);
        }
      },
      deep: true
    }
  }
};
</script>
<style>
.tree-ul,
.tree-li {
  list-style: none;
  padding-left: 10px;
}
.tree-expand {
  cursor: pointer;
}
</style>