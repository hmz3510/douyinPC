<template>
  <div ref="myAppContainer" class="app-container">
    <div class="anchorArea">
      <div class="page-title">主播详情</div>
      <div class="anchorInfo">
        <div class="imgArea">
          <div class="liveImg">
            <img v-if="userInfo.avatarUrl!==''" class="anchorImg objCss" :src="userInfo.avatarUrl">
            <img v-else class="anchorImg objCss" src="../../icons/images/error_cycle.png">
            <div v-if="userInfo.hasLive" class="tag-live tag-live1">
              <span class="zhibo_SUw">
                <span class="_nXfzR0HQ" style="background-color:#fff;" />
                <span style="background-color: #fff; margin-left: -1.5px; margin-right: -1.5px;" />
                <span class="_1uugB4t8" style="background-color:#fff;" />
              </span>
              live
            </div>
          </div>
          <div class="imgRight">
            <div class="dispalyCss1">
              <div class="title" style="margin-right: 7px;">{{ userInfo.nickname }}</div>
              <div class="codeDiv">
                <el-popover
                  v-if="userInfo.shareQrcodeUrl!==''"
                  placement="top-start"
                  width="220"
                  trigger="hover"
                  popper-class="myPopper"
                >
                  <div>
                    <div class="qrCodeContainer">
                      <img :src="userInfo.shareQrcodeUrl" class="propImg">
                      <div class="qrCodeText">抖音扫码看主播</div>
                    </div>
                  </div>
                  <img slot="reference" class="code" src="../../icons/images/ewm.png">
                </el-popover>
                <el-tooltip v-else placement="top" popper-class="myPopCss" effect="light">
                  <div slot="content">
                    <el-image>
                      <div slot="error" class="noCode">
                        暂时没有二维码
                      </div>
                    </el-image>
                  </div>
                  <img class="code" src="../../icons/images/ewm.png">
                </el-tooltip>
              </div>
            </div>
            <div class="subTitle dispalyPublic">
              <div class="subtitleName">抖音号：{{ userInfo.uniqueId }}</div>
              <div v-if="userInfo.tagsIdsLevelTwoList!==undefined && userInfo.tagsIdsLevelTwoList.length!==0" class="labelAll dispalyPublic">
                <div v-for="(item, index) of userInfo.tagsIdsLevelTwoList.slice(0, 2)" :key="index" class="oneLabel">{{ item.substring(0, 5) }}</div>
              </div>
            </div>
            <div v-if="userInfo.province!=='' || userInfo.city!==''" class="address">地区：<span class="addressName">{{ userInfo.province }} {{ userInfo.city }}</span></div>
          </div>
        </div>
        <div class="introduction">
          <el-popover
            v-if="userInfo.signature!==''"
            placement="top-start"
            width="400"
            trigger="hover"
            :content="'简介：' + userInfo.signature "
          >
            <div slot="reference" class="introductionText">简介：{{ userInfo.signature }}</div>
          </el-popover>
        </div>
        <div class="listBTn" :class="userInfo.fav ? 'listBTnEnjoy': ''" @click="handEnjoy(userInfo)">{{ userInfo.fav? '取消关注': '关注' }}</div>
      </div>
      <div class="liveInfo">
        <div class="liveInfo-left">
          <div class="left-title"><span>粉丝数：</span><span class="left-account">{{ userInfo.followerCountExplain }}</span></div>
          <div class="left-title"><span>7日涨粉：</span><span class="left-account">{{ userInfo.addFansExplain }}</span></div>
          <div class="left-title"><span>作品数：</span><span class="left-account">{{ userInfo.awemeCount }}</span></div>
          <div class="left-title"><span>获赞总数：</span><span class="left-account">{{ userInfo.totalFavorited }}</span></div>
          <div class="fans" @click="handClick(3)">粉丝分析</div>
        </div>
        <div class="liveInfor-right">
          <div class="right-nav">
            <div class="oneNav" :class="dataIndex === 0 ? 'active' : '' " @click="changeNavIndex(0)">7天直播数据</div>
            <div class="oneNav" :class="dataIndex === 1 ? 'active' : '' " @click="changeNavIndex(1)">15天直播数据</div>
            <div class="oneNav" :class="dataIndex === 2 ? 'active' : '' " @click="changeNavIndex(2)">30天直播数据</div>
          </div>
          <div class="right-itemData">
            <div class="item-left">
              <div class="right-pubilcTitle">
                <span class="dataPublic">直播场次：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.liveCount }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">带货场次：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.goodsLiveCount }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">互动率：</span>
                <span class="dataSbutitle">{{ userInfo.interateRateExplain }}</span>
              </div>
            </div>
            <div class="item-right">
              <div class="right-pubilcTitle">
                <span class="dataPublic">场均时长：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.liveTimeExplain }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">场均销售：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.salesMoneyExplain }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">小时销售：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.hoursSalesMoneyExplain }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">场均观众：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.userCount }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">场均销量：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.salesExplain }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">小时销量：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.hoursSalesExplain }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">场均获赞：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.likeCount }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">客单价：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.guestUnitPriceExplain }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">场均音浪：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.fanTicket }}</span>
              </div>
              <div class="right-pubilcTitle">
                <span class="dataPublic">人均贡献：</span>
                <span class="dataSbutitle">{{ userInfo.secodeInfo.userContributionExplain }}</span>
              </div>
            </div>
          </div>
          <div v-if="categoryInfo!==null && categoryInfo.salesList.length!==0" class="data-footer">
            <span class="dataPublic marLeft">带货销量：</span>
            <span v-for="(item, index) of categoryInfo.salesList.slice(0, 5)" :key="index" class="oneData">{{ item.name }} / {{ item.label }}</span>
          </div>
        </div>
      </div>
      <div class="contentBtn">
        <div class="oneBtn" :class="btnIndex == 0 ? 'btnActive' : '' " @click="handClick(0)">直播趋势分析</div>
        <div class="oneBtn" :class="btnIndex == 1 ? 'btnActive' : '' " @click="handClick(1)">直播记录</div>
        <div class="oneBtn" :class="btnIndex == 2 ? 'btnActive' : '' " @click="handClick(2)">电商分析</div>
        <div class="oneBtn" :class="btnIndex == 3 ? 'btnActive' : '' " @click="handClick(3)">粉丝分析</div>
      </div>
      <div class="contentArea">
        <liveTrend v-if="btnIndex===0" ref="liveTrend" />
        <liveRecord v-if="btnIndex===1" :user-sn="userSn" />
        <onlineArea v-if="btnIndex===2" ref="onlineArea" />
        <fansArea v-if="btnIndex===3" ref="fansArea" />
      </div>
      <copyView ref="copy" />
    </div>
  </div>
</template>
<script>
import liveTrend from '@/components/liveTrend/liveTrend.vue'
import liveRecord from '@/components/liveRecord/liveRecord.vue'
import fansArea from '@/components/fansArea/fansArea.vue'
import onlineArea from '@/components/onlineArea/onlineArea.vue'
import copyView from '@/components/copy/copy1.vue'
import { getDetail, getCanvasList, getUserFans, getUserCategory } from '@/api/anchor.js'
import { getLiveCharts } from '@/api/live.js'
import { enjoyOrNotEnjoyAnthor } from '@/api/fav.js'
export default {
  name: 'AnchorDetail',
  components: { liveTrend, liveRecord, onlineArea, fansArea, copyView },
  data() {
    return {
      listLoading: false,
      dataIndex: 0,
      btnIndex: 0,
      userSn: undefined,
      userInfo: {
        secodeInfo: {}
      },
      chartsAll: {},
      onLineData: {},
      fansData: {},
      categoryInfo: null
    }
  },
  created() {
    this.userSn = this.$route.query.userSn
    this.getDetail(0)
    this.getCanvasList()
    this.getLiveCharts()
    this.getUserCategory()
  },
  methods: {
    getDetail(data) {
      getDetail(this.userSn).then(res => {
        document.title = res.data.nickname + ' 主播详情' + ' - 热抖数据'
        this.userInfo = res.data || {}
        this.userInfo.secodeInfo = this.userInfo.sevenAlgoVO
      })
    },
    getCanvasList() {
      getCanvasList(this.userSn).then(res => {
        this.chartsAll = res.data
        this.$refs.liveTrend.initData(res.data)
      })
    },
    getUserCategory() {
      getUserCategory(this.userSn).then(res => {
        sessionStorage.setItem('categoryInfo', JSON.stringify(res.data))
        if (res.data.salesList.length !== 0) {
          for (var item of res.data.salesList) {
            const numStr = item.key.toString()
            if (numStr.length < 5) {
              item.label = item.key
            } else if (numStr.length >= 5 && numStr.length < 8) {
              const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + 2)
              item.label = parseFloat(parseInt(item.key / 10000) + '.' + decimal) + '万'
            } else if (numStr.length >= 8) {
              const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + 2)
              item.label = parseFloat(parseInt(item.key / 100000000) + '.' + decimal) + '亿'
            }
          }
        }
        this.categoryInfo = res.data
      })
    },
    getLiveCharts() {
      getLiveCharts(this.userSn).then(res => {
        this.onLineData = res.data
        this.getUserFans()
        this.$refs.liveTrend.initOnlinedata(res.data)
      })
    },
    getUserFans() {
      getUserFans(this.userSn).then(res => {
        if (res.data === null) {
          res.data = []
        }
        this.fansData = res.data
      })
    },
    handClick(data) {
      if (this.btnIndex !== data) {
        this.btnIndex = data
      }
      this.$nextTick(() => {
        if (this.btnIndex === 0) {
          this.$refs.liveTrend.initData(this.chartsAll)
          this.$refs.liveTrend.initOnlinedata(this.onLineData)
        } else if (this.btnIndex === 3) {
          this.$refs.fansArea.initData(this.chartsAll)
          this.$refs.fansArea.initFansData(this.fansData)
          this.$refs.fansArea.initUserIno(this.userInfo)
        } else if (this.btnIndex === 2) {
          this.$refs.onlineArea.initUserSn(this.userSn)
          this.$refs.onlineArea.initData(this.onLineData)
          this.$refs.onlineArea.initCateInfo(this.categoryInfo)
        }
      })
    },
    changeNavIndex(data) {
      if (this.dataIndex !== data) {
        this.dataIndex = data
        if (data === 0) {
          this.userInfo.secodeInfo = this.userInfo.sevenAlgoVO
        } else if (data === 1) {
          this.userInfo.secodeInfo = this.userInfo.fifteenAlgoVO
        } else {
          this.userInfo.secodeInfo = this.userInf
        }
      }
    },
    handEnjoy(data) {
      var name
      if (!data.fav) {
        name = 'add'
      } else {
        name = 'del'
      }
      enjoyOrNotEnjoyAnthor(name, data.userSn).then(res => {
        if (!data.fav) {
          this.$message({
            type: 'success',
            message: '关注成功!'
          })
          data.fav = true
        } else {
          this.$message({
            type: 'success',
            message: '取关成功!'
          })
          data.fav = false
        }
      })
    }
  }
}
</script>
<style scoped="scoped" lang="scss">
  .anchorArea {
    max-width: 1120px;
    margin: auto;
    .anchorInfo {
      margin: 20px 0px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      width: 100%;
      padding: 20px 30px 20px 20px;
      display: flex;
      justify-content: space-between;
      .imgArea {
        display: flex;
        align-items: center;
        .liveImg {
          position:relative;
          .tag-live1 {
            width: 50px;
            transform: translate(0);
            border-radius: 2px;
            bottom: 0px;
            left: 15px;
          }
        }
        .anchorImg {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin-right: 16px;
          min-width: 80px;
          border:1px solid #f9f9f9
        }
        .title {
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #232333;
          line-height: 22px;
        }
        .subtitleName {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          line-height: 20px;
          margin-right: 9px;
        }
        .oneLabel {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #0E71EB;
        }
        .oneLabel:not(:last-child) {
          margin-right: 9px;
        }
        .address {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #606266;
          line-height: 20px;
          .addressName {
            font-weight: bold;
          }
        }
      }
      .introductionText {
        max-width: 450px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #606266;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
        line-height: 20px;
        margin-right: 10px;
      }
    }
    .liveInfo {
      display: flex;
      justify-content: space-between;
      flex-flow: wrap;
    }
    .liveInfo-left {
      min-width: 256px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      padding: 30px 0px 86px 57px;
      .left-title {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #606266;
        line-height: 20px;
        margin-bottom: 10px;
        .left-account {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #232333;
          line-height: 20px;
          margin-left: 5px;
        }
      }
      .left-title>span:first-child {
        width: 70px;
        display: inline-block;
      }
      .fans {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #0E71EB;
        line-height: 20px;
        cursor: pointer;

      }
    }
    .liveInfor-right {
      flex: 1;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      margin-left: 20px;
      padding: 23px 64px;
      padding-right: 10px;
      .right-nav {
        display: flex;
        justify-content: center;
        padding-right: 54px;
        .oneNav {
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #606266;
          line-height: 22px;
          cursor: pointer;
        }
        .oneNav:not(:first-child) {
          margin-left: 47px;
        }
      }
      .right-itemData {
        margin: 28px 0;
        margin-bottom: 18px;
        display: flex;
        justify-content: space-between;
        flex-flow: wrap;
        .right-pubilcTitle {
          margin-bottom: 10px;
        }
        .item-right {
          display: flex;
          flex-flow: wrap;
          width: 75%;
          .right-pubilcTitle {
            width: 33.333%;
          }
        }

        .dataSbutitle {
          display: inline-block;
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #232333;
          line-height: 20px;
        }
      }
      .dataPublic {
        width: 70px;
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #606266;
        line-height: 20px;
        display: inline-block;
      }
      .marLeft {
        margin-right: 15px;
      }
      .oneData {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #232333;
        line-height: 20px;
        margin-right: 25px;
      }
    }

  }
  .contentBtn {
    margin-top: 40px;
    margin-bottom: 20px;
    display: flex;
    .oneBtn {
      width: 128px;
      height: 40px;
      border-radius: 2px;
      border: 1px solid #0E71EB;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #0E71EB;
      line-height: 40px;
      text-align: center;
      margin-right: 10px;
      cursor: pointer;
    }
  }
  .listBTn {
    height: 28px;
    line-height: 28px;
    padding: 0;
    width: 70px;
    text-align: center;
  }
  .dispalyPublic {
    display: flex;
    align-items: center;
    flex-flow: wrap;
  }
  .active {
    color: #0E71EB !important;
  }
  .btnActive {
    background: #0E71EB;
    color: #FFFFFF !important;
  }
  .labelAll {
    padding: 4px 9px;
    background: #E7F1FD;
    border-radius: 2px;
    border: 1px solid #CFE3FB;
  }
  @media screen and (max-width: 1260px) {
    .anchorArea .liveInfor-right .right-itemData .item-right {
      width: 100%;
    }
    .anchorArea .liveInfor-right .right-itemData .item-left {
      margin-right: 92px;
    }
  }
</style>
