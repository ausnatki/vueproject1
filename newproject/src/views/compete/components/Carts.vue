<template>
  <div id="mycharts" class="mychartsbox" />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'CompeteCarts',
  props: {
    competeid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      tcompeteid: ''
    }
  },
  mounted() {
    this.initChart() // 在组件挂载后初始化图表
  },
  methods: {
    initChart() {
      // 虚拟数据
      const testData = [
        ['product', 'amount'],
        ['选手1', 10],
        ['选手2', 20],
        ['选手3', 30],
        ['选手4', 12],
        ['选手5', 50],
        ['选手6', 90]
      ]

      const testTopicJsonS = {
        num: 35
      }

      // 初始化图表
      const myChart = echarts.init(document.getElementById('mycharts'))

      // 配置项
      const optionDIY = {
        title: { text: '          投票人数: ' + testTopicJsonS.num },
        dataset: {
          source: testData
        },
        legend: {
          height: 10
        },
        grid: { containLabel: true },
        xAxis: { name: '' },
        yAxis: { type: 'category' },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 0,
          max: 100,
          text: ['High ticket ', 'Low ticket '],
          dimension: 1,
          inRange: {
            color: ['#65B581', '#FFCE34', '#FD665F']
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 43,
            label: {
              fontSize: 15,
              fontWeight: 'bold',
              stack: 'samestack',
              position: 'insideLeft',
              formatter: (params) => {
                const amount = params.value[1]
                return `  ${amount}票`
              },
              show: true
            },
            encode: {
              x: 'amount',
              y: 'product'
            }
          }
        ]
      }

      // 设置图表配置项
      myChart.setOption(optionDIY)

      // 窗口大小变化时自适应
      window.onresize = function() {
        myChart.resize()
      }
    }
  }
}
</script>

<style scoped>
.mychartsbox{
width: 100%;
height: 100%;
}
</style>

