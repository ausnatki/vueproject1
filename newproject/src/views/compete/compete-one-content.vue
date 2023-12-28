<template>
  <div class="main-box">
    <div class="top">
      <!-- <el-button type="primary" round @click="Enroll(competeid)">报名比赛</el-button> -->
      <!-- <span>这是头部</span> -->
      <div class="top-left">
        <div class="top-left-img">
          <el-image
            style="width: 300px; height: 200px ;position: relative; left:12%; top: 50px;"
            :src="`api/Tool/20231228111450.jpg`"
            fit="fill"
          />
        </div>
      </div>
      <div class="top-right">
        <!-- 比赛名称 -->
        <div class="top-right-one">
          <div class="top-right-one-left">
            <h3>比赛名称:</h3>
          </div>
          <div class="top-right-one-right">
            <p>青春飞扬，歌唱比赛</p>
            <p class="font-suffix">-------青春歌唱比赛</p>
          </div>
          <div style="margin: 73px 0;">
            <el-divider content-position="right">比赛名称</el-divider>
          </div>
        </div>

        <!-- 比赛主题 -->
        <div class="top-right-two">
          <div class="top-right-two-left">
            <h3>比赛主题:</h3>
          </div>
          <div class="top-right-two-right">
            <p>早晨还是微弱的太阳，可是到了中午太阳却射出火焰般的光线，让人像是烈火焚身，浑身上下都被烤焦了！我们就在这个时候举行了歌唱比赛。我们都搬着凳子坐在了操场上，排得整整齐齐，看着别人班唱得那么好，我不由得害怕起来，想：我们到底能不能取得冠军呢？</p>
          </div>
          <div style="margin: 90px 0;">
            <el-divider content-position="right">比赛主题</el-divider>
          </div>
        </div>
        <!-- 起止时间 -->
        <div class="top-right-three">
          <div class="top-right-three-left">
            <h3>起止时间:</h3>
          </div>
          <div class="top-right-three-right">
            <p>2023/12/10-----2023/12/19</p>
          </div>
        </div>
        <div class="top-right-four">
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="info">信息按钮</el-button>
        </div>
      </div>
    </div>
    <!-- <el-divider content-position="left">这是分割线</el-divider> -->
    <div class="buttom">
      <div id="mychartsbox" class="mychartsbox" />
      <div class="mycompetebox">
        <div class="mycompete">
          <div class="competelist">
            <div class="competelist-img">
              <el-image
                style="width: 78%; height: 70% ;position: relative; left:9%; top: 18px;"
                src=""
                fit="fill"
              />
            </div>
            <div class="competelistcontent">
              <div class="competelisttitle">
                标题
              </div>
              <div class="competelistbtn">
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
              </div>
            </div>
          </div>
          <el-divider content-position="right">初赛</el-divider>
        </div>
        <div class="mycompete">
          <div class="competelist">
            <div class="competelist-img">
              <el-image
                style="width: 78%; height: 70% ;position: relative; left:9%; top: 18px;"
                src=""
                fit="fill"
              />
            </div>
            <div class="competelistcontent">
              <div class="competelisttitle">
                标题
              </div>
              <div class="competelistbtn">
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
              </div>
            </div>
          </div>
          <el-divider content-position="right">复赛</el-divider>
        </div>
        <div class="mycompete">
          <div class="competelist">
            <div class="competelist-img">
              <el-image
                style="width: 78%; height: 70% ;position: relative; left:9%; top: 18px;"
                src=""
                fit="fill"
              />
            </div>
            <div class="competelistcontent">
              <div class="competelisttitle">
                标题
              </div>
              <div class="competelistbtn">
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'CompeteOneContent',
  data() {
    return {
      competeid: 0
    }
  },
  created() {
    this.competeid = this.$route.params.competeid // 这是我的比赛id
  },
  mounted() {
    this.initChart() // 在组件挂载后初始化图表
  },
  methods: {
    initChart() {
      // 虚拟数据
      const testData = [
        ['product', 'amount'],
        ['选手1', 10], // 不再使用引号包裹
        ['选手2', 20],
        ['选手3', 30],
        ['选手4', 12],
        ['选手5', 50]
      ]

      const testTopicJsonS = {
        num: 35 // 根据你的需求修改
      }
      // 初始化图表
      const myChart = echarts.init(document.getElementById('mychartsbox'))

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
            // 如果需要，可以添加更多颜色

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
                // const dataIndex = params.dataIndex
                const amount = params.value[1] // 假设 'amount' 在第二个位置
                return `  ${params.name}: ${amount}人   ${amount}`
              },
              show: true
            },
            encode: {
              x: 'amount', // 修改这里，对应数据中的 'amount'
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
    },
    Enroll(id) {
      this.$router.push({ name: 'CompeteEnroll', params: { competeid: id }})
    }
  }
}
</script>

<style scoped>
 .main-box{
  padding: 10px;
 }
 .top {
  box-shadow: 5px 5px 8px rgb(234, 234, 234);
  width: 100%;
  height: 300px;
  display: flex;
}

.top h3{
  font-weight: 400;
  font-style:italic;
}

.top-left {
  flex: 1;
}

.top-right{
  flex: 2;
  display: flex;
  flex-direction:column;
}
/* 第一层开始 */
.top-right-one {
 flex: 1;
 max-height: 25%;
  /* border:2px black solid; */
}

.top-right-one-left{
  float: left;
  padding: 0 20px;
}

.top-right-one-right{
  float: left;
  margin: -10px 0 0 0;
  position: relative;
}

.top-right-one-right p{
  font-weight: 100;
  font-style: italic;
  font-size: 20px;
}
.font-suffix{
  font-weight: 100 !important;
  font-size: 15px !important;
  position: absolute;
  width: 100%;
  left: 147px;
  top: 34px;
}
.top-right-two {
 flex:2;
 max-height: 35%;
  /* border:2px black solid; */
}
/* 第一层结束 */

/* 第二层开始 */
.top-right-two-left{
  float: left;
  padding: 0 20px;
}

.top-right-two-right{
  float: left;
  max-width: 70%;
  letter-spacing: 2px;
  text-indent: 2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 3; /* 设置显示的行数 */
  max-height: 3 * 1.2em; /* 行高的估计值，可以根据需要调整 */
}

/* 第二层结束 */

/* 第三层开始 */
.top-right-three {
 flex: 1;
 max-height: 15%;
  /* border:2px black solid; */
}

.top-right-three-left {
 float: left;
 padding: 0 20px;
}

.top-right-three-right {
  float: left;
}

.top-right-three-left >h3 {
  margin: 10px 0;
}

.top-right-three-right p {
  font-family: 'Fangzheng Biaosong', serif; /* 添加方正标宋字体，使用通用的 serif 字体作为备用 */
  font-weight: 100;
  font-size: 20px;
  font-style: italic;
  margin: 10px 0;
}

/* 第三层结束 */

/* 第四层开始 */
.top-right-four {
  flex: 1;
  max-height: 20%;
  padding: 10px 20px;
}

/* Add styles for el-divider if needed */

.buttom {
  display: flex;
  height: 500px;
  margin: 20px 0;
  border: 1px black solid;
  justify-content: center; /* 将内容水平居中 */
}

.mychartsbox{
  flex: 1;
}

.mycompetebox{
  flex: 1;
  display: flex;
  /* border: 1px black solid; */
  flex-direction:column;
}

.mycompete{
 flex:1;
 /* border: 1px black solid; */
}

.competelist{
  display: flex;
  box-shadow: 5px 5px 8px rgb(234, 234, 234);
  border-radius: 5px;
  margin: 20px;
  height: 75%;
}

.competelist-img{
  flex: 3;
}

.competelistcontent{
  flex: 4;
  display: flex;
  flex-direction: column;
}
.competelisttitle{
  flex: 4;
  font-size: 20px;
  font-style: italic;
  font-weight: 500;
}

.competelistbtn{
  flex: 3;
}
.line{
  width: 100%;
  height: 90px;
  margin: 0 40px;
}
</style>
