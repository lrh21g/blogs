<script>
import Tree from './tree.vue'

export default {
  components: { Tree },
  data() {
    return {
      data: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                },
                {
                  title: 'leaf 1-1-2',
                },
              ],
            },
            {
              title: 'parent 1-2',
              children: [
                {
                  title: 'leaf 1-2-1',
                },
                {
                  title: 'leaf 1-2-1',
                },
              ],
            },
          ],
        },
      ],
    }
  },
  methods: {
    handleToggleExpand(data) {
      console.log(data)
    },
    handleCheckChange(data) {
      console.log(data)
    },
  },
}
</script>

<template>
  <div>
    <Tree
      :data="data"
      show-checkbox
      @on-toggle-expand="handleToggleExpand"
      @on-check-change="handleCheckChange"
    />
  </div>
</template>
