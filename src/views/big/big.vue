<template>
  <div class="big-content">
    <iframe ref="myIframe" class="iframeCss" scrolling="no" frameborder="0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      url: undefined,
      type: undefined
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.type = this.$route.query.hasLive
  },
  mounted() {
    this.initData(this.type)
  },
  methods: {
    initData(type) {
      if (this.type === 'true') {
        this.url = 'https://datav.aliyuncs.com/share/f8a8b31c637bd0dff47d2fee388e3862?roomSn=' + this.$route.query.roomSn + '&cookie=' + this.token
      } else {
        this.url = 'https://datav.aliyuncs.com/share/a0a12306dac347f6e30a89e584594e28?roomSn=' + this.$route.query.roomSn + '&cookie=' + this.token
      }
      this.$refs.myIframe.src = this.url
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .iframeCss {
    width: calc(100vw);
    height: calc(100vh);

  }
</style>
