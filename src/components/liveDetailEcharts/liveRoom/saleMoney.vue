<template>
  <div>
    <div id="saleMonry" class="chats" />
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'SaleMonry',
  props: {
    canvasList: {
      type: Array,
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
      var oldData = this.canvasList.splice(0, 5)
      this.chart = echarts.init(document.getElementById('saleMonry'))
      this.chart.clear()
      var xArr = []; var yArr = []
      for (var item of oldData) {
        xArr.unshift(item.value)
        yArr.push(item.name)
      }
      this.chart.setOption({
        backgroundColor: '#fff',
        title: {
          text: '销售额品类分布',
          textStyle: {
            color: '#606266',
            fontSize: '14'
          }
        },
        grid: {
          left: 20,
          right: '12%',
          borderWidth: 0,
          top: 40,
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
          barGap: '38%',
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
                if (Number(data.value) === 0) {
                  return ''
                } else {
                  return data.value + '%'
                }
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
              position: [0, '-33'],
              formatter: function(data) {
                if (Number(data.value) !== 0) {
                  for (var item of oldData) {
                    if (item.value === data.value) {
                      return item.name
                    }
                  }
                } else {
                  return ''
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
