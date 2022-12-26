<template>
  <div class="like-container">
    <div class="praise-bubble" ref="praiseBubbleRef">
      <div
        v-for="item in praiseBubbleList"
        :class="`bubble b${item.bubbleBgIndex} bl${item.bubbleAnimationIndex}`"
        :data-current-time="item.currentTime"
      ></div>
    </div>
    <div class="like-thumb" @click="clickLikeThumb"></div>
  </div>
</template>

<script>
export default {
  name: 'LivePraiseBubbleCSS3Render',
  data() {
    return {
      praiseBubbleList: [],
    };
  },
  mounted() {
    // setInterval(() => {
    //   this.addPraise();
    // }, 300);
  },
  methods: {
    clickLikeThumb() {
      this.addPraise();
    },
    addPraise() {
      const bubbleBgIndex = Math.floor(Math.random() * 6) + 1;
      const bubbleAnimationIndex = Math.floor(Math.random() * 11) + 1; // bl1 - bl11
      this.praiseBubbleList.push({
        bubbleBgIndex,
        bubbleAnimationIndex,
        currentTime: String(Date.now()),
      });
    },
  },
};
</script>

<style lang="scss">
@import './css3-render-style.scss';
</style>
