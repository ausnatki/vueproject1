<template>
  <div id="mycharts" class="mychartsbox" />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'CompeteCarts',
  props: {
    competelist: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
    }
  },
  watch: {
    competelist(newVal) {
      console.log('监听到了')
      this.initChart()
    }
  },
  mounted() {
    this.initChart() // 在组件挂载后初始化图表
  },
  methods: {
    initChart() {
      const tdata = this.competelist.map(element => ({ product: element.name, amount: element.count }))
      // 取前十个
      const mydata = tdata.slice(0, 10).reverse()
      let number = 0
      tdata.forEach(element => {
        number += element.amount
      })
      // 初始化图表
      const myChart = echarts.init(document.getElementById('mycharts'))
      const cnt = mydata.length
      const maxamount = mydata[cnt - 1].amount
      // 配置项
      const optionDIY = {
        title: { text: '          投票人数: ' + number },
        dataset: {
          source: mydata
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
          max: maxamount,
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
                const amount = params.data.amount
                return `  ${amount}票`
              },
              show: true
            },
            encode: {
              x: 'amount',
              y: 'name'
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

