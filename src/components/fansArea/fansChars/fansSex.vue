<template>
  <div>
    <div id="fansSex" class="chats" />
  </div>
</template>

<script>
const echarts = require('echarts')
export default {
  name: 'FansSex',
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
      this.chart = echarts.init(document.getElementById('fansSex'))
      this.chart.clear()
      var xArr = []
      var oldData = this.canvasData.distribution_list
      for (var item of oldData) {
        xArr.unshift({ value: item.distribution_value, name: item.distribution_key === 'male' || item.distribution_key === '男性' ? '男性' : '女性' })
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
          top: 100,
          bottom: 0,
          textStyle: {
            color: '#fff'
          }
        },
        series: [{
          type: 'pie',
          data: xArr,
          radius: ['40%', '70%'],
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          avoidLabelOverlap: false,
          color: ['#0E71EB', '#89BBF9']
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
