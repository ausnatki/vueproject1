<template>
  <div class="main-box">
    <div class="top">
      <!-- <el-button type="primary" round @click="Enroll(competeid)">报名比赛</el-button> -->
      <!-- <span>这是头部</span> -->
      <div class="top-left">
        <div class="top-left-img">
          <el-image
            style="width: 300px; height: 200px ;position: relative; left:12%; top: 50px;"
            :src="`api/Tool/${compete.Img}`"
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
            <p>{{ compete.Name }}</p>
            <p class="font-suffix">-------{{ compete.Topic }}</p>
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
            <p>{{ compete.Description }}</p>
          </div>
          <div style="margin: 90px 0;">
            <el-divider content-position="right">比赛主题</el-divider>
          </div>
        </div>
        <!-- 起止时间 -->
        <div class="top-right-three">
          <div class="top-right-three-left">
            <h3>报名截止时间:</h3>
          </div>
          <div class="top-right-three-right">
            <p>{{ (compete.StartTime ? compete.StartTime.replace("T", " ") : "") }}</p>

          </div>
        </div>
        <div class="top-right-four">
          <el-button v-if="!competeState" type="primary" :disabled="compete.State!==0" @click="Enroll(competeid)">比赛报名</el-button>
          <el-button v-if="competeState" type="success" @click="flage=true">查看报名信息</el-button>
        </div>
        <EnrollVIew
          v-if="flage"
          :dialogflag.sync="flage"
          :name="name"
          :competelist="competelist"
          :stage="compete.Stage"
          :competeid="competeid"
        />
      </div>
    </div>
    <!-- <el-divider content-position="left">这是分割线</el-divider> -->
    <div class="buttom">
      <div id="mychartsbox" class="mychartsbox">
        <!-- 这里是我的图表部分 -->
        <div v-if="mychartsdata === ''" style="width: 100%; height: 100%;position: relative;">
          <h2 style="font-weight: 700;position: absolute; top: 45%;left: 45%; font-size: 30px;font-style: italic;color: rgb(224, 224, 224); ">暂无数据</h2>
        </div>
        <mycharts v-if="mychartsdata !== '' " :competelist="mychartsdata" />
      </div>
      <!-- 比赛列表 -->
      <div class="mycompetebox">
        <div v-for="item,index in competelist" :key="item.ID" class="mycompete" @click="getcharts(item.ID)">
          <div class="competelist">
            <div class="competelist-img">
              <el-image
                style="width: 78%; height: 73% ; position: relative; left:9%; top: 18px;"
                :src="`/api/Tool/${item.Img}`"
              />
            </div>
            <div class="competelistcontent">
              <div class="competelisttitle">
                <!--  -->
                <p style="display: inline-block;">比赛阶段----{{ getStageDisplay(item.Stage) }}</p>
                <p style="display: inline-block;padding: 0 20px; font-size: 10px; font-weight: 400; color: rgb(182, 182, 182);">{{ getStateDisplay(item.State) }}</p>
              </div>
              <div class="competelistbtn">
                <el-button type="primary" :disabled="item.State !== 1" @click="Vote(item.ID)">比赛投票</el-button>
                <el-button v-if="roles.includes('admin')" type="warning" @click="flagerc=true,flageIndex=index">比赛管理</el-button>
                <el-button type="success" @click="getResult(item.ID),resultflage=true,passcount=item.PassCount">比赛结果</el-button>
              </div>
            </div>
          </div>
          <el-divider v-if="item.Stage!=compete.Stage" style="margin: 0px 0px !important;" content-position="right">{{ getStageDisplay(item.Stage) }}</el-divider>
        </div>

        <!-- 这里是我的结果表格 -->
        <el-dialog title="投票结果" :visible.sync="resultflage">
          <el-table :data="resulttable">
            <el-table-column label="排名">
              <template slot-scope="scope">
                <span v-if="scope.$index>2">{{ scope.$index + 1 }}</span>
                <img v-if="scope.$index===0" src="./img/0001.png" alt="" style="width: 20px; height: 20px;">
                <img v-if="scope.$index===1" src="./img/0002.png" alt="" style="width: 20px; height: 20px;">
                <img v-if="scope.$index===2" src="./img/0003.png" alt="" style="width: 20px; height: 20px;">
              </template>
            </el-table-column>
            <el-table-column property="name" label="姓名" width="200" />
            <el-table-column property="iphone" label="电话" />
            <el-table-column property="songnage" label="参赛曲目" />
            <el-table-column property="count" label="得票数" />
            <el-table-column label="是否晋级">
              <template slot-scope="scope">
                <img v-if="scope.$index<passcount" src="./img/00010.png" style="width: 20px; height: 20px;" alt="">
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
        <EditRCompete
          v-if="flagerc"
          :dialogflag.sync="flagerc"
          :competestage="compete.Stage"
          :compete="competelist[flageIndex]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import mycharts from '@/views/compete/components/Carts.vue'
import { getState } from '@/api/compete'
import EnrollVIew from '@/views/compete/components/EnrollView.vue'
import EditRCompete from '@/views/compete/components/EditRegulationCompete.vue'
import { GetResult } from '@/api/vote'

export default {
  name: 'CompeteOneContent',
  components: {
    mycharts,
    EnrollVIew,
    EditRCompete
  },
  data() {
    return {
      competeid: 0,
      compete: {},
      competelist: [],
      competeState: '',
      flage: false, // 这个标志是查看个人信息的
      flagerc: false, // 这个标志是管理比赛的
      flageIndex: 0,
      resulttable: '',
      resultflage: false,
      mychartsdata: '',
      passcount: ''
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  watch: {
    flagerc(newVal) {
      this.stateInit()
    },
    flage() {
      this.stateInit()
    }
  },
  created() {
    this.competeid = this.$route.query.competeid // 这是我的比赛id
    this.stateInit()
  },
  mounted() {
  },
  methods: {
    getStageDisplay(stage) {
      switch (stage) {
        case 1:
          return '初赛'
        case 2:
          return '半决赛'
        case 3:
          return '决赛'
        default:
          return 'Unknown Stage'
      }
    },
    getStateDisplay(state) {
      switch (state) {
        case 0:
          return '未开始'
        case 1:
          return '正在比赛中'
        case 2:
          return '比赛结束'
        default:
          return 'Unknown State'
      }
    },
    Enroll(id) {
      if (this.competeState) {
        this.$message({
          message: '你已经报名无需重复报名',
          type: 'success'
        })
        return
      }
      this.$router.push({ name: 'CompeteEnroll', params: { competeid: id }})
    },
    stateInit() {
      getState(this.competeid, this.name)
        .then(response => {
          if (response.code === 20000) {
            const dataObject = JSON.parse(response.data)
            console.log('这是我的相关信息', dataObject)
            this.compete = dataObject.compete
            this.competelist = dataObject.rcompete.$values
            this.competeState = dataObject.competeState
            this.getcharts(this.competelist[0].ID)
          } else {
            // 查询失败，输出错误信息
            console.error(response.message)
          }
        }).catch(error => {
          console.log(error)
        })
    },
    Vote(id) {
      this.$router.push({ path: '/compete/voting', query: { competeid: id }})
    },
    getResult(id) {
      GetResult(id)
        .then(result => {
          console.log(result)
          this.resulttable = result.result
        })
        .catch(response => {
          console.error(response)
        })
    },
    getcharts(id) {
      GetResult(id)
        .then(result => {
          console.log('我点击了', result.result)
          const ttt = result.result
          console.log(ttt.length)
          if (ttt.length !== 0) { this.mychartsdata = result.result }
          this.$forceUpdate()
        })
        .catch(response => {
          console.error(response)
        })
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
  width: 200px;
  left: 100%;
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
  /* border: 1px black solid; */
  justify-content: center; /* 将内容水平居中 */
}

.mychartsbox{
  flex: 1;
}

.mycompetebox{
  flex: 1;
  display: -webkit-box;  flex-direction:column;
}

.mycompete{
 flex:1;
 transition: transform 0.5s, box-shadow 0.5s;
}

.mycompete:hover{
  transform: translateX(-10px);
}

.competelist{
  display: flex;
  box-shadow: 5px 5px 8px rgb(234, 234, 234);
  border-radius: 5px;
  margin: 20px;
  height: 75%;
}
.competelist-img {
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
.el-divider--horizontal{
  margin: 0;
}
</style>
