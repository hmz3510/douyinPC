<template>
  <div ref="myAppContainer" class="app-container">
    <div class="app-top">
      <div class="app-top-l"><img src="../../icons/images/about-img.png" alt=""></div>
      <div class="app-top-r">
        <div class="conpamyTitle">公司介绍</div>
        <div class="compamyInfo">
          热抖数据（热狗数据旗下产品），隶属于热狗云（杭州）科技有限公司。是一家用人工智能进行大数据分析的科技公司。<br>
          团队核心成员皆来自Google、Alibaba、Tencent等知名企业。公司致力于为客户提供一站式整合营销数据服务，以大数据驱动，集智能技术，运营优化能力，挖掘数据背后的趋势。不断打磨数据产品，让数据的使用更加简单，让数据产品也有温度。
        </div>
        <div class="wechatUs">联系我们</div>
        <div class="emial">contact@hotdogdata.cn</div>
        <div class="law">法律条款</div>
        <div class="lawList">
          <router-link target="_blank" :to="{path:'/userNeedKnow',query:{type:1}}">用户注册协议</router-link>
          <router-link target="_blank" :to="{path:'/userNeedKnow',query:{type:2}}">个人信息和隐私保护政策</router-link>
          <router-link target="_blank" :to="{path:'/userNeedKnow',query:{type:3}}">知识产权保护声明</router-link>
          <router-link target="_blank" :to="{path:'/userNeedKnow',query:{type:4}}">会员管理规则</router-link>
        </div>
      </div>
    </div>
    <copyView ref="copy" :only-one="false" />
  </div>
</template>

<script>
import copyView from '@/components/copy/copyVue.vue'
export default {
  components: {
    copyView
  },
  data() {
    return {
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'userNeedKnow') {
      document.documentElement.style.fontSize = 'initial'
    }
    next()
  },
  mounted() {
    this.$refs.copy.resetCss(this.$refs.myAppContainer)
  }
}
</script>

<style scoped="scoped" lang="scss">
  .app-top{
    background: #FFFFFF;
    max-width: 1120px;
    margin: auto;
    border-radius:4px;
    display: flex;
    margin-top: 34px;
  }
  .app-top-l>img{
    width:434px;
    height: 289px;
    margin-right: 25px;
  }
  .conpamyTitle{
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #3F3F3F;
    line-height: 25px;
  }
  .compamyInfo{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #484848;
    line-height: 20px;
    margin-top: 4px;
  }
  .wechatUs{
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #515151;
    line-height: 25px;
    margin-top: 17px;
  }
  .emial{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #484848;
    line-height: 20px;
    margin-top: 4px;
  }
  .law{
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #5C5C5C;
    line-height: 25px;
    margin-top: 17px;
    margin-bottom: 4px;
  }
  .lawList{
    display: flex;
    flex-wrap: wrap;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F7593;
    line-height: 20px;
  }
  .lawList>a{
    margin-right: 16px;
    margin-bottom: 4px;
  }
</style>
