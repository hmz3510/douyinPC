<template>
  <div v-if="chartsData.length !== 0 && onLineData.length !==0" class="echarts-container">
    <div class="oneEcharts">
      <liveTime v-if="chartsData.liveTimeList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">30天直播时长和密度</div>
        <div class="no-data">近30天无直播收录</div>
      </div>
    </div>
    <div class="oneEcharts">
      <custome v-if="onLineData.totalUserList.length!=0" :canvas-data="onLineData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">观众趋势</div>
        <div class="no-data">近30天无直播收录</div>
      </div>
    </div>
    <div class="oneEcharts">
      <soundByte v-if="onLineData.fanTicketList.length!=0" :canvas-data="onLineData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">音浪趋势</div>
        <div class="no-data">近30天无直播收录</div>
      </div>
    </div>
    <div class="oneEcharts">
      <peakOnline v-if="onLineData.userCountList.length!=0" :canvas-data="onLineData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">最高在线人数趋势</div>
        <div class="no-data">近30天无直播收录</div>
      </div>
    </div>
    <div class="oneEcharts">
      <saleAccountChart v-if="onLineData.salesMoneyList.length!=0" :canvas-data="onLineData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">销售额趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
    <div class="oneEcharts">
      <saleChart v-if="onLineData.salesList.length!=0" :canvas-data="onLineData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">销量趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
  </div>
</template>

<script>
import liveTime from './liveCharts/liveTime.vue'
import custome from './liveCharts/custome.vue'
import soundByte from './liveCharts/soundByte.vue'
import peakOnline from './liveCharts/peakOnline.vue'
import saleAccountChart from '../onlineArea/onLineChart/saleAccountChart.vue'
import saleChart from '../onlineArea//onLineChart/saleChart.vue'
export default {
  name: 'LiveTrend',
  components: {
    liveTime,
    custome,
    soundByte,
    peakOnline,
    saleAccountChart,
    saleChart
  },
  data() {
    return {
      chartsData: [],
      onLineData: []
    }
  },
  created() {
  },
  methods: {
    initData(data) {
      this.chartsData = data
    },
    initOnlinedata(data) {
      this.onLineData = data
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
