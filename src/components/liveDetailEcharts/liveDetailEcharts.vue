<template>
  <div v-if="chartsData.length !== 0" class="echarts-container">
    <div class="oneEcharts">
      <onlineCustome :canvas-data="chartsData" class="chartsCss" />
    </div>
    <div class="oneEcharts">
      <liveAddFans :canvas-data="chartsData" class="chartsCss" />
    </div>
    <div class="oneEcharts">
      <byte :canvas-data="chartsData" class="chartsCss" />
    </div>
    <div class="oneEcharts">
      <liveAddGood :canvas-data="chartsData" class="chartsCss" />
    </div>
    <div v-if="saleData.salesList.length!==0 && saleData.salesMoneyList.length!==0 " class="oneEcharts oneEchartsFooter" style="height: 325px;">
      <saleContainer :canvas-data="saleData" class="chartsCss" />
    </div>
  </div>
</template>

<script>
import onlineCustome from './liveRoom/onlineCustome.vue'
import liveAddFans from './liveRoom/liveAddFans.vue'
import byte from './liveRoom/byte.vue'
import liveAddGood from './liveRoom/liveAddGood.vue'
import saleContainer from './liveRoom/saleContiner.vue'
export default {
  name: 'LiveDetailEcharts',
  components: { onlineCustome, liveAddFans, byte, liveAddGood, saleContainer },
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
    initSaleData(data) {
      this.saleData = data
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

</style>
