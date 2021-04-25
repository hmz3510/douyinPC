<template>
  <div ref="myAppContainer" class="app-container">
    <div class="you-card">
      <el-row class="you-card-title">当前版本</el-row>
      <el-row class="you-card-subtitle" :class="userInfomation.vipType==1? 'isPro': ''">{{ userInfomation.vipType==0?'基础版':'专业版' }}</el-row>
      <div class="you-card-body">
        <el-row class="subtitle-info" :class="userInfomation.vipType==1? 'isPro': ''">
          {{ userInfomation.vipType == 1 ? '有效期：'+ userInfomation.expiredAtDate : '当前账号类型为基础版，仅能使用部分功能，建议您升级至专业版，体验完整功能。' }}
        </el-row>
      </div>
      <el-row class="update">
        <div class="golden-btn-container1">
          <el-button size="mini" class="updataBtn" type="primary" plain @click="clickFree">
            {{ userInfomation.vipType==1?'续费':'即刻升级' }}
          </el-button>
        </div>
      </el-row>
      <el-row class="card-type">
        <div class="card-list">
          <div class="m-membership-type">
            <div class="m-membership-type-header">
              <el-row><img class="m-membership-type-name-img" src="../../icons/images/pro-bg.png" alt=""></el-row>
              <el-row class="m-membership-type-name">专业版月卡</el-row>
              <el-row class="m-membership-type-discount">￥228</el-row>
            </div>
            <el-row class="m-membership-type-price">￥1299</el-row>
            <el-row>
              <div class="golden-btn-container">
                <el-button size="mini" type="primary" plain style="margin-top: 32px;font-size: 14px;" @click="clickFree">立即购买</el-button>
              </div>
            </el-row>
          </div>
          <div class="m-membership-type">
            <div class="m-membership-type-header">
              <el-row><img class="m-membership-type-name-img" src="../../icons/images/pro-bg.png" alt=""></el-row>
              <el-row class="m-membership-type-name">专业版季卡</el-row>
              <el-row class="m-membership-type-discount">￥699</el-row>
            </div>
            <el-row class="m-membership-type-price">3899元</el-row>
            <el-row>
              <div class="golden-btn-container">
                <el-button size="mini" type="primary" plain style="margin-top: 32px;font-size: 14px;" @click="clickFree">立即购买</el-button>
              </div>
            </el-row>
          </div>
          <div class="m-membership-type">
            <el-row style="width: 100%">
              <img class="m-membership-tag-image" src="../../icons/images/pro-tui.png">
            </el-row>
            <div class="m-membership-type-header">
              <el-row><img class="m-membership-type-name-img" src="../../icons/images/pro-bg.png" alt=""></el-row>
              <el-row class="m-membership-type-name">专业版年卡</el-row>
              <el-row class="m-membership-type-discount">￥1699</el-row>
            </div>
            <el-row class="m-membership-type-price">12000元</el-row>
            <el-row class="m-membership-type-on-sale">低至4.5元/天</el-row>
            <el-row>
              <div class="golden-btn-container">
                <el-button size="mini" type="primary" plain style="margin-top: 8px;font-size: 14px;" @click="clickFree">立即购买</el-button>
              </div>
            </el-row>
          </div>
          <div class="m-membership-type">
            <div class="m-membership-type-header">
              <el-row><img class="m-membership-type-name-img" src="../../icons/images/pro-bg.png" alt=""></el-row>
              <el-row class="m-membership-type-name">专业版年卡</el-row>
              <el-row class="m-membership-type-discount">￥3688</el-row>
            </div>
            <el-row class="m-membership-type-price">39999元</el-row>
            <el-row>
              <div class="golden-btn-container">
                <el-button size="mini" type="primary" style="margin-top: 32px;font-size: 14px;" plain @click="clickFree">立即购买</el-button>
              </div>
            </el-row>
          </div>
        </div>
      </el-row>
    </div>
    <div class="you-card m-pro-rights-content">
      <div class="m-pro-rights-content-item-head">
        <el-row class="m-pro-rights-title">基础版</el-row>
        <div class="header-left">
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>5维度实时直播榜 前25 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>带货主播榜 前5 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>热门商品榜 前5</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>管理我的抖音号 </span>
          </el-row>
        </div>
      </div>
      <div class="m-pro-rights-content-item" />
      <div class="m-pro-rights-content-item-head">
        <el-row class="m-pro-rights-title">专业版</el-row>
        <div class="header-left">
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>5维度实时直播榜 前100条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>12维度带货主播榜 前200条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>小时音浪榜 前100条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>小时带货榜 前100条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>12维度直播排行榜 前200条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>16维度历史直播数据库 前200条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>17维度主播数据库 前200条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>9维度商品榜 前200条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>7维度店铺榜 前200条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>我的抖音号管理 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>自定义直播监控 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>实时数据大屏看板 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>详细直播数据趋势分析</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>详细直播带货数据趋势 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>主播直播数据趋势和分析 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>主播带货数据趋势和分析 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>商品销量趋势 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>商品关联直播 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>小店销量趋势 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>多维度主播搜索 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>多维度直播间搜索 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>全网主播搜索  </span>
          </el-row>
        </div>
      </div>
      <div class="m-pro-rights-content-item" />
      <div class="m-pro-rights-content-item-head">
        <el-row class="m-pro-rights-title">团队版</el-row>
        <div class="header-left">
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>5维度实时直播榜 前100条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>12维度带货主播榜 前200条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>小时音浪榜 前100条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>小时带货榜 前100条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>12维度直播排行榜 前200条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>16维度历史直播数据库 前200条</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>17维度主播数据库 前200条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>9维度商品榜 前200条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>7维度店铺榜 前200条 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>我的抖音号管理 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>自定义直播监控 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>实时数据大屏看板 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>详细直播数据趋势分析</span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>详细直播带货数据趋势 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>主播直播数据趋势和分析 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>主播带货数据趋势和分析 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>商品销量趋势 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>商品关联直播 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>小店销量趋势 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>多维度主播搜索 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>多维度直播间搜索 </span>
          </el-row>
          <el-row class="item-bottom">
            <el-image class="m-pro-rights-item-il" src="https://cod-resource.oss-cn-shanghai.aliyuncs.com/website/icon_checkbox_selected.png" />
            <span>全网主播搜索  </span>
          </el-row>
        </div>
      </div>
    </div>
    <copyView ref="copy" />
    <custome ref="custome" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import custome from '@/components/custome/custome.vue'
import copyView from '@/components/copy/copy1.vue'
export default {
  name: 'Pro',
  components: { custome, copyView },
  data() {
    return {
      showDialogTitle: '',
      showDialogName: '',
      showDialogFootValut: false,
      showFreeDialog: false,
      myHistory: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfomation'
    ])
  },
  methods: {
    clickFree() {
      this.$refs.custome.initData(true)
    },
    clickConsult() {
      this.showDialogTitle = '请加项目经理咨询'
      this.showDialogName = '我们的团队 靠谱 专业'
      this.showDialogFootValut = false
      this.showFreeDialog = true
    },
    lookHistory() {
      this.myHistory = true
    }
  }
}
</script>
<style lang="scss" scoped="scoped">
  .you-card {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .you-card-title {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #202224;
      line-height: 28px;
    }
    .you-card-subtitle {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0E71EB;
      line-height: 20px;
      margin-top: 9px;
    }
    .you-card-body {
      display: flex;
      align-items: center;
      .subtitle-info {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #202224;
        line-height: 20px;
        margin-top: 8px;
      }
    }
    .update {
      margin-top: 16px;
      .updataBtn {
        width: 104px;
        height: 32px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
      }
    }
    .card-type {
      margin-top: 44px;
      margin-bottom: 53px;
      .card-list {
        display: flex; flex-direction: row;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }
  .golden-btn-container1 .is-plain {
    color: #FFFFFF;
    background: #DCAF60;
    border-color: #DCAF60 !important;
    width: 104px;
    height: 32px;
  }
  .golden-btn-container .is-plain {
    color: #DCAF60;
    background: #FFFFFF;
    padding: 9px 30px;
    border-color: #DCAF60 !important;
  }
  .m-pro-rights-content {
    font-size:14px;
    font-weight:400;
    color: #202224;
    line-height:20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    .m-pro-rights-content-item {
      background-color: #EAEAEA;
      width: 1px;
      height: 650px;
      margin-top: 50px;
    }
    .m-pro-rights-content-item-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 378px;
      // margin:0 36px;
    }
  }

  .m-pro-rights-title {
    font-size:20px;
    font-weight:400;
    color: #202224;
    line-height:28px;
    margin-bottom: 24px;
    width: 100%;
    text-align: center;
  }

  .m-pro-rights-item-il {
    margin-right: 12px;
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    display: inline-block;
  }

  .m-membership-type {
    width: 210px;
    height: 256px;
    border: 1px solid #EAEAEA;
    border-radius: 4px;
    margin-left: 12px;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    padding-bottom: 0;
    position: relative;
    margin-bottom: 20px;
  }
  .m-membership-type-header {
    position: relative;
    width: 100%;
    height: 116px;
    .m-membership-type-name-img {
      width: 100%;
      height: 116px;
      position: absolute;
    }
  }
  @media screen and (min-width:1500px) and (max-width:1550px){
    .m-membership-type{
      width: 195px;
    }
  }
  @media screen and (min-width:1400px) and (max-width:1500px){
    .m-membership-type{
      width: 192px;
      margin-left: 6px;
      margin-right: 6px;
    }
  }
  @media screen and (min-width:1300px) and (max-width:1400px){
    .m-membership-type{
      width:173px;
      margin-left: 6px;
      margin-right: 6px;
    }
  }

  @media screen and (min-width:1200px) and (max-width:1300px){
    .m-membership-type{
      width:160px;
      margin-left: 3px;
      margin-right: 3px;
    }
  }

  .m-membership-type:hover {
    box-shadow: 0px 1px 6px 0px #FFE9C4;
    border: 1px solid #FFE7BD;
  }

  .m-membership-type-name {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 22px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .m-membership-tag-image {
    position: absolute;
    width: 55px;
    height: 55px;
    left: -10px;
    top: -10px;
    border-radius: 4px 0px 0px 0px;
    z-index: 9;
  }

  .m-membership-type-discount {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #DCAF60;
    line-height: 22px;
    position: absolute;
    bottom: 8px;
    right: 12px;
  }

  .m-membership-type-unit {
    font-size:14px;
    font-weight:400;
    color: #6E7276;
    line-height:20px;
  }

  .m-membership-type-on-sale {
    font-size:14px;
    font-weight:400;
    color: #DCAF60;
    line-height:20px;
    margin-top: 4px;
  }

  .m-membership-type-price {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #AFB4BA;
    line-height: 20px;
    text-decoration:line-through;
    margin-top: 12px;
  }
  .item-bottom {
    margin-bottom: 8px;
  }
  .m-grad-bg {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .m-img-icon {
    width: 40px;
    height: 40px;
  }

  .m-img-icon-2 {
    width: 24px;
    height: 24px;
  }

  .m-img-icon-3 {
    width: 65px;
    height: 65px;
    position: absolute;
    top: -32.5px;
    right: 0;
  }

  .m-grad-text {
    display: flex;
    flex-direction: column;
    color: #383838;
    font-weight: bold;
    margin-top: 8px;
    font-size: 14px;
  }

  .m-grad-text-2 {
    margin-top: 3px;
  }

  .m-page-bg {
    flex: 1;
    max-width: 300px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    height: 520px;
    background-color: #f6f6f6;
    padding-top: 20px;
    padding-left: 8px;
    padding-right: 8px;
  }

  .m-page-title-bg {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .m-page-title {
    margin-left: 5px;
    color: #333333;
    font-size: 18px;
    font-weight: bold;
  }

  .m-page-price {
    color: #ea3721;
    font-size: 28px;
    font-weight: bold;
  }

  .m-page-price2 {
    color: #333333;
    font-size: 13px;
    font-weight: bold;
    margin-top: 4px;
    margin-left: 2px;
  }

  .m-page-price-3 {
    font-size: 12px;
    color: #737373;
    margin-top: 4px;
    text-decoration: line-through;
  }

  .m-page-desc {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 15px;
    color: #333333;
    font-size: 14px;
    line-height: 22px;
  }

  .csr-img {
    width: 160px;
    height: 160px;
  }

  .consulte-text-button {
    color: #3B9CFF;
    font-size: 14px;
    font-weight: normal;
    margin-left: 26px;
  }
  .isPro {
    color: #DCAF60 !important;
  }
  .header-left {
    padding-left: 72px;
  }
</style>
