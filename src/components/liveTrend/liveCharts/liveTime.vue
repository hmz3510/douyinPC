<template>
  <div>
    <div id="liveChart" class="chats" />
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'LiveTime',
  props: {
    canvasData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  created() {
    // console.log(this.canvasData)
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('liveChart'))
      this.chart.clear()
      var xArr = this.canvasData.dateKeyList
      var liveTimeList = this.canvasData.liveTimeList
      var yArr = []
      for (var item of liveTimeList) {
        yArr.push({ value: item.value, label: item.label, total: item.value })
      }
      for (var i = 0; i < yArr.length; i++) {
        yArr[i].liveCount = this.canvasData.liveCountList[i]
      }
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: '30天直播时长和密度',
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
            htmlStr += '直播时长：' + liveTimeList[data[0].dataIndex].label + '<br/>'
            htmlStr += '直播场次：' + data[0].data.liveCount + '<br/>'
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
          axisTick: { onGap: false },
          splitLine: { show: false }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            formatter: function(data) {
              if (data !== 0) {
                return parseFloat(data / 3600).toFixed(1)
              }
            }
          }
        }],
        series: [{
          type: 'bar',
          barWidth: '60%',
          data: yArr,
          itemStyle: {
            emphasis: {
              color: '#678af3'
            },
            normal: {
              label: {
                show: true,		// 开启显示
                position: 'top',	// 在上方显示
                formatter: function(val) {
                  if (val.value === '0') {
                    return ''
                  } else {
                    return val.data.liveCount
                  }
                }
              }
            }
          }
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
