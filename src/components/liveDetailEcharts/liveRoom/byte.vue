<template>
  <div>
    <div id="byte" class="chats" />
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'Byte',
  props: {
    canvasData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      chart_title: '音浪'
    }
  },
  created() {
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('byte'))
      this.chart.clear()
      var xArr = this.canvasData.dateKeyList
      var yArr = this.canvasData.fanTicketList
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: this.chart_title + '趋势',
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
            var date
            xArr.map((item, index) => {
              if (item.value === data[0].name) {
                date = item.label
              }
            })

            var htmlStr = '<div>'
            htmlStr += '音浪收入总数：' + data[0].data.label + '<br/>'
            htmlStr += date + '</div>'
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
          axisTick: { onGap: false, interval: 150 },
          splitLine: { show: false },
          axisLabel: {
            interval: 0,
            formatter: function(data, index) {
              if (data === xArr[0].value && index === 0) {
                return data
              } else if (data === xArr[xArr.length - 1].value && index === xArr.length - 1) {
                return data
              }
            }
          }
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
  .chats {
    width: 100%;
    height: 100%;
  }
</style>
