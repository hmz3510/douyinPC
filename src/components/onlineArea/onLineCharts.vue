<template>
  <div v-if="chartsData.length!==0" class="echarts-container">
    <div class="oneEcharts">
      <saleAccountChart v-if="chartsData.salesMoneyList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">销售额趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
    <div class="oneEcharts">
      <saleChart v-if="chartsData.salesList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">销量趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
    <div class="oneEcharts">
      <unitPrice v-if="chartsData.guestUnitPriceList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">客单价趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
    <div class="oneEcharts">
      <contribution v-if="chartsData.userContributionList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">观众人均贡献趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
    <div class="oneEcharts">
      <hourByte v-if="chartsData.hoursSalesMoneyList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">小时销售额趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
    <div class="oneEcharts">
      <hourSale v-if="chartsData.hoursSalesList.length!=0" :canvas-data="chartsData" class="chartsCss" />
      <div v-else class="noFns">
        <div class="title">小时销量趋势</div>
        <div class="no-data">近30天无销售</div>
      </div>
    </div>
    <div v-if="saleData.salesList.length!==0 && saleData.salesMoneyList.length!==0" class="oneEcharts oneEchartsFooter" style="height: 325px;">
      <saleContainer class="chartsCss" />
    </div>
  </div>
</template>

<script>
import saleAccountChart from './onLineChart/saleAccountChart.vue'
import saleChart from './onLineChart/saleChart.vue'
import unitPrice from './onLineChart/unitPrice.vue'
import contribution from './onLineChart/contribution.vue'
import hourByte from './onLineChart/hourByte.vue'
import hourSale from './onLineChart/hourSale.vue'
import saleContainer from '../liveDetailEcharts/liveRoom/saleContiner.vue'
export default {
  name: 'OnLineCharts',
  components: { saleAccountChart, saleChart, unitPrice, contribution, hourByte, hourSale, saleContainer },
  data() {
    return {
      chartsData: [],
      saleData: []
    }
  },
  created() {
  },
  methods: {
    initData(data) {
      this.chartsData = data
    },
    initDataCate() {
      this.saleData = JSON.parse(sessionStorage.getItem('categoryInfo'))
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
    .oneEchartsFooter {
      width: 100%;
      max-width: 100%;
      margin-bottom: 0;
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
