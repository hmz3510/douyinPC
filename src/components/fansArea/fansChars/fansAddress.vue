<template>
  <div>
    <div id="fansAddress" class="chats" />
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'FansAddress',
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
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById('fansAddress'))
      this.chart.clear()
      var oldData = JSON.parse(JSON.stringify(this.canvasData.distribution_list))
      var xArr = []; var yArr = []
      for (var item of oldData.slice(0, 5)) {
        xArr.unshift(item.distribution_value)
        yArr.unshift(item.distribution_key)
      }
      var sum = 0
      for (var secodeItem of this.canvasData.distribution_list) {
        sum += secodeItem.distribution_value
      }
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: this.canvasData.type_display,
          subtext: this.canvasData.description,
          textStyle: {
            color: '#606266',
            fontSize: '14'
          }
        },
        grid: {
          left: 20,
          right: '12%',
          borderWidth: 0,
          top: 65,
          bottom: 0,
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: {
          type: 'value',
          show: false,
          splitLine: { show: false }
        },
        yAxis: {
          type: 'category',
          axisLine: { show: false },
          splitLine: { show: false }
        },
        series: [{
          type: 'bar',
          data: xArr,
          barWidth: 12,
          barGap: '40%',
          itemStyle: {
            normal: {
              color: 'rgba(14, 113, 235, 0.5)'
            }
          },
          label: {
            normal: {
              show: true, // 是否显示
              position: 'right', // 文字位置
              formatter: function(data) {
                return Math.round(data.value / sum * 100) + '%'
              }
            }
          }
        }, {
          type: 'bar',
          data: xArr,
          itemStyle: {
            normal: {
              color: 'transparent'
            }
          },
          label: {
            normal: {
              show: true, // 是否显示
              textStyle: {
                fontSize: 14,
                color: '#606266'
              },
              position: [0, '-36'],
              formatter: function(data) {
                for (var item of oldData) {
                  if (Number(item.distribution_value) === Number(data.value)) {
                    return item.distribution_key
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
