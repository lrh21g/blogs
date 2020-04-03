<template>
  <div>
    <tree-node
      v-for="(item, index) in cloneData"
      :key="index"
      :data="item"
      :show-checkbox="showCheckbox"
    ></tree-node>
  </div>
</template>
<script>
import TreeNode from "./node.vue";
import { deepCopy } from "../utils/assist.js";
export default {
  name: "Tree",
  components: { TreeNode },
  props: {
    //  data 是一个 Object 而非 Array，因为它只负责渲染当前的一个节点，并递归渲染下一个子节点（即 children）
    // 所以对 cloneData 进行循环，将每一项节点数据赋给了 tree-node 组件。
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否显示选择框，只进行数据传递
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cloneData: []
    };
  },
  methods: {
    // 为了不破坏使用者传递的源数据 data，所以会克隆一份数据（cloneData）
    rebuildData() {
      this.cloneData = deepCopy(this.data);
    },
    emitEvent(eventName, data) {
      this.$emit(eventName, data, this.cloneData);
    }
  },
  created() {
    this.rebuildData();
  },
  watch: {
    data() {
      this.rebuildData();
    }
  }
};
</script>