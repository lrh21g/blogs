<template>
  <div class="like-container">
    <canvas
      id="thumsCanvas"
      width="200"
      height="400"
      style="width:100px;height:200px"
    ></canvas>
    <div class="like-thumb" @click="clickLikeThumb"></div>
  </div>
</template>

<script>
import ThumbsUpAni from './canvas-praise-bubble.js';

export default {
  name: 'LivePraiseBubbleCanvasRender',
  methods: {
    clickLikeThumb() {
      const thumbsUpAni = new ThumbsUpAni();
      setInterval(() => {
        thumbsUpAni.start();
      }, 300);
    },
  },
};
</script>

<style lang="scss">
.like-container {
  width: 100px;
  padding: 10px 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
}

.like-thumb {
  width: 30px;
  height: 30px;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba($color: #000000, $alpha: 0.5);
  background-image: url(./images/like.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 30px 30px;
}
</style>
