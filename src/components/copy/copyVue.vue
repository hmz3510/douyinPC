<template>
  <div ref="copy" class="disNone" :class="isOver? 'urlLink': 'urlLink1'">©2020 HOTDOGDATA.CN <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"> 浙ICP备2020032298号-1</a><span class="aboutUs" @click="gotoAbout">关于我们  服务条款</span></div>
</template>

<script>
export default {
  props: {
    onlyOne: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOver: false
    }
  },
  methods: {
    resetCss(domData) {
      this.$nextTick(() => {
        var timer = setTimeout(() => {
          var screenHeight = document.documentElement.clientHeight
          var domHeight = domData.getBoundingClientRect().height
          if (domHeight > screenHeight) {
            this.isOver = true
          } else {
            this.isOver = false
          }
          if (this.onlyOne) {
            if (screenHeight < 800) {
              this.isOver = true
              return
            }
          }
          if (!this.isOver) {
            this.$refs.copy.style.top = (parseInt(document.documentElement.clientHeight) - 36) + 'px'
          }
          clearTimeout(timer)
        }, 500)
      })
    },
    gotoAbout() {
      this.$router.push({ path: 'about' })
    }
  }
}
</script>

<style scoped lang="scss">
  .disNone {
    position: fixed;
    top: -100px;
  }
  .urlLink{
    margin-top: 100px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #C7C7C7;
    line-height: 20px;
    text-align: center;
    position: initial;
  }
  .urlLink1{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #B5B5B5;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
  }
  .aboutUs {
    margin-left: 20px;
    cursor: pointer;
  }
</style>
