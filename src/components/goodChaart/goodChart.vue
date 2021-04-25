<template>
  <div class="echarts-container">
    <div class="oneEcharts">
      <div id="goodChart" class="chats" />
    </div>
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'GoodChart',
  data() {
    return {
      chartsData: [],
      chart: null
    }
  },
  created() {
  },
  methods: {
    initData(data) {
      this.chartsData = data
      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('goodChart'))
      this.chart.clear()
      var xArr = this.chartsData.dateKeyList
      var yArr = this.chartsData.salesList
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: '每日销量趋势',
          textStyle: {
            color: '#606266',
            fontSize: '14'
          }
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.5)',
          borderWidth: 0,
          borderColor: 'gray',
          textStyle: {
            color: '#fff'
          },
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(data) {
            var htmlStr = '<div>'
            htmlStr += '每日销量：' + data[0].data.label + '<br/>'
            htmlStr += data[0].name + '</div>'
            return htmlStr
          }
        },
        grid: {
          right: '6%',
          borderWidth: 0,
          top: 60,
          bottom: 30,
          textStyle: {
            color: '#fff'
          }
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          data: xArr,
          boundaryGap: false,
          axisTick: { onGap: false },
          splitLine: { show: false }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: function(data) {
              const numStr = data.toString()
              if (numStr.length < 5) {
                return numStr
              } else if (numStr.length >= 5 && numStr.length <= 8) {
                const decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + 2)
                return parseFloat(parseInt(data / 10000) + '.' + decimal) + 'w'
              } else {
                const decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + 2)
                return parseFloat(parseInt(data / 100000000) + '.' + decimal) + 'e'
              }
            }
          }
        }],
        series: [{
          type: 'line',
          data: yArr,
          symbolSize: 3
        }]
      })
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
      width: 100%;
      background: #FFFFFF;
      border-radius: 4px;
      margin-bottom: 20px;
      padding: 14px 20px;
      .chartsCss {
        height: 100%;
      }
      .chats {
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
