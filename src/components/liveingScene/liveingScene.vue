<template>
  <div class="big-content">
    <div v-if="isShow" v-drag class="video-content">
      <div v-show="bgShow" class="content">
        <img class="closeImage" src="../../icons/images/icon_pro_close.png" @click="closeVideo">
      </div>
      <div class="videoConter">
        <video id="videoElement" ref="videoElement" class="videoConter" autoplay />
      </div>
    </div>
  </div>
</template>

<script>
import flvjs from 'flv.js'
export default {
  directives: {
    drag: function(el) {
      const dragBox = el
      dragBox.onmousedown = e => {
        // 算出鼠标相对元素的位置
        const disX = e.clientX - dragBox.offsetLeft
        const disY = e.clientY - dragBox.offsetTop
        document.onmousemove = e => {
          // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
          const left = e.clientX - disX
          const top = e.clientY - disY
          // 移动当前元素
          dragBox.style.left = left + 'px'
          dragBox.style.top = top + 'px'
        }
        document.onmouseup = e => {
          // 鼠标弹起来的时候不再移动
          document.onmousemove = null
          // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null
        }
      }
    }
  },
  data() {
    return {
      isShow: false,
      bgShow: false,
      player: null
    }
  },
  mounted() {
  },
  methods: {
    initData(data) {
      this.$nextTick(() => {
        var video = this.$refs.videoElement
        this.player = flvjs.createPlayer({
          type: 'flv',
          url: data.liveUrl
        })
        this.player.attachMediaElement(video)
        this.player.load()
        this.player.play()
        this.bgShow = true
      })
    },
    closeVideo() {
      this.player.detachMediaElement()
      this.player.destroy()
      this.player = null
      this.isShow = false
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .video-content {
    width: 287px;
    height: 510px;
    position: fixed;
    top: 15%;
    right: 10%;
    z-index: 9999;
  }
  .videoConter {
    width: 287px;
    height: 510px;
    background: #000000;
  }
  .content {
    height: 20px;
    background: rgb(26, 32, 41);
    width: 287px;
    position: relative;
    cursor: move;
  }
  .closeImage {
    width: 18px;
    height: 18px;
    cursor: pointer;
    position: absolute;
    top: 2px;
    right: 5px;
  }
</style>
