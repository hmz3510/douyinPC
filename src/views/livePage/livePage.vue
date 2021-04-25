<template>
  <div class="big-content">
    <div class="video-content">
      <video id="videoElement" ref="videoElement" class="videoConter" autoplay />
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  data() {
    return {
      linkUrl: undefined
    }
  },
  created() {
    this.linkUrl = this.$route.query.linkUrl
  },
  mounted() {
    var video = this.$refs.videoElement
    this.player = flvjs.createPlayer({
      type: 'flv',
      url: this.linkUrl
    })
    this.player.attachMediaElement(video)
    this.player.load()
    this.player.play()
  }
}
</script>

<style scoped="scoped" lang="scss">
  .video-content {
    width: 375px;
    height: 510px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .videoConter {
     width: 375px;
     height: 510px;

  }
</style>
