<template>
  <div v-if="giftList.length!==0 || chartsData.length!==0" class="audience-contianer">
    <div class="page-title">观众分析</div>
    <div class="echarts-container">
      <div v-if="chartsData.length!==0" class="oneEcharts">
        <fansSex :canvas-data="chartsData[1]" class="chartsCss" />
      </div>
      <div v-if="chartsData.length!==0" class="oneEcharts">
        <fansAge :canvas-data="chartsData[0]" class="chartsCss" />
      </div>
      <div v-if="chartsData.length!==0" class="oneEcharts">
        <fansAddress :canvas-data="chartsData[3]" class="chartsCss" />
      </div>
      <div v-if="giftList.length!==0" class="oneEcharts">
        <div class="title">粉丝送礼榜</div>
        <div class="fansArea">
          <div v-for="item of giftList.slice(0, 5)" :key="item.rank" class="oneGift">
            <div class="gift-left">
              <div class="leftNumber">{{ item.rank }}</div>
              <div class="giftLeft">
                <el-image class="giftImg borderImg" fit="cover" :src="item.avatarUrl" lazy>
                  <div slot="error">
                    <img class="giftImg" fit="cover" src="../../icons/images/error_small_cycle.png">
                  </div>
                </el-image>
                <div class="giftName">{{ item.nickname }}</div>
              </div>
            </div>
            <div class="giftNumber">{{ item.score }}音浪</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fansSex from '../fansArea/fansChars/fansSex.vue'
import fansAge from '../fansArea/fansChars/fansAge.vue'
import fansAddress from '../fansArea/fansChars/fansAddress.vue'
export default {
  name: 'AudienContainer',
  components: { fansSex, fansAge, fansAddress },
  props: {
    giftList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      listLoading: false,
      chartsData: []
    }
  },
  created() {
  },
  methods: {
    initData(data) {
      console.log(data)
      this.chartsData = data
    }
  }
}
</script>

<style lang="scss" scoped>
  .audience-contianer {
    margin-top: 40px;
  }
  .echarts-container {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    margin-top: 20px;
    .oneEcharts {
      max-width: 550px;
      width: 100%;
      height: 400px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      margin-bottom: 20px;
      padding: 14px 20px;
      .chartsCss {
        height: 100%;
      }
      .title {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #606266;
        line-height: 20px;
      }
      .fansArea {
        margin-top: 20px;
        .oneGift {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #EBEEF5;
          padding-bottom: 8px;
          .gift-left, .giftLeft {
            display: flex;
            align-items: center;
          }
          .leftNumber {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #606266;
            line-height: 20px;
            margin-right: 19px;

          }
          .giftImg {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 19px;
            min-width: 30px;
          }
          .giftName {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #606266;
            line-height: 20px;
          }
          .giftNumber {
            height: 20px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #606266;
            line-height: 20px;
          }
        }
        .oneGift:not(:first-child) {
          margin-top: 9px;
        }
      }
    }
  }

</style>
