<template>
  <div v-if="chartsData.length !== 0" class="echarts-container">
    <div class="oneEcharts">
      <fansAdd v-if="chartsData.followerCountList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">粉丝增长趋势</div>
        <div class="no-data">数据暂未收录</div>
      </div>
    </div>
    <div class="oneEcharts">
      <workGood v-if="chartsData.awemeCountList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">作品赞趋势</div>
        <div class="no-data">数据暂未收录</div>
      </div>
    </div>
    <div class="oneEcharts">
      <WorkNumber v-if="chartsData.favoritedList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">作品数趋势</div>
        <div class="no-data">数据暂未收录</div>
      </div>
    </div>
    <div v-if="fansData.length!==0" class="oneEcharts" style="height: 400px;">
      <fansSex :canvas-data="fansData[1]" class="chartsCss" />
    </div>
    <div v-if="fansData.length!==0" class="oneEcharts" style="height: 400px;">
      <fansAge :canvas-data="fansData[0]" class="chartsCss" />
    </div>
    <div v-if="fansData.length!==0" class="oneEcharts" style="height: 400px;">
      <fansAddress :canvas-data="fansData[3]" class="chartsCss" />
    </div>
  </div>
</template>

<script>
import fansAdd from './fansChars/fansAdd.vue'
import workGood from './fansChars/workGood.vue'
import WorkNumber from './fansChars/workNumber.vue'
import fansSex from './fansChars/fansSex.vue'
import fansAge from './fansChars/fansAge.vue'
import fansAddress from './fansChars/fansAddress.vue'
export default {
  name: 'FansArea',
  components: { fansAdd, workGood, WorkNumber, fansSex, fansAge, fansAddress },
  data() {
    return {
      chartsData: [],
      fansData: [],
      userInfo: null
    }
  },
  created() {

  },
  methods: {
    initData(data) {
      this.chartsData = data
    },
    initFansData(data) {
      this.fansData = data
    },
    initUserIno(data) {
      this.userInfo = data
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
  .echarts-container {
    display: flex;
    flex-flow: wrap;
    justify-content: space-between;
    .oneEcharts {
      max-width: 550px;
      width: 100%;
      height: 285px;
      background: #FFFFFF;
      border-radius: 4px;
      border: 1px solid #EBEEF5;
      margin-bottom: 20px;
      padding: 14px 20px;
      position: relative;
      .chartsCss {
        height: 100%;
      }
    }
  }
  .noFns {
    .title {
      color: #606266;
      font-size: 14px;
      font-weight: bold;
    }
    .no-data {
      color: #909399;
      font-size: 14px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

</style>
